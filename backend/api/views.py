# from rest_framework import viewsets
# from .serializers import UsersSerializer
# from .models import Users



# # Create your views here.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = Users.objects.all().order_by('name')
#     serializer_class = UsersSerializer



from django.http import JsonResponse
from .models import Users
from .models import Data
import json
import hashlib
from uuid import uuid4

def signup(request):
    data = json.loads(request.body.decode('utf-8'))
    name = data["name"]
    passwd = data["passwd"]
    passwd = hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    user = Users(name=name, passwd = passwd)
    user.save()
    return JsonResponse({"test":"re"}, safe=False)

def login(request):
    data = json.loads(request.body.decode('utf-8'))
    name = data["name"]
    passwd = data["passwd"]
    passwd = hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    found = Users.objects.filter(name=name).first().__dict__
    
    if (found["passwd"] == passwd):
        update = Users.objects.get(name=name)
        sid = uuid4()
        update.SID = sid
        update.save()
        returns = JsonResponse({"Pass": True})
        returns.set_cookie('SID', sid)
        returns.set_cookie('id', update.id)
        return returns
    else:
        return JsonResponse({"Pass": False})
    
def verify(request):
    try:
        name = (request.COOKIES.get('id'))
        sid = request.COOKIES.get('SID')
        found = Users.objects.filter(id=name).first().__dict__
        if found["SID"] == sid:
            return JsonResponse({"Pass": True})
        else:
            return JsonResponse({"Pass": False})
    except:
        return JsonResponse({"Pass": False})



def upload_image(request):
    data = Data(image=(request.FILES['file']), user_id=request.COOKIES.get('id'))
    data.save()
    return JsonResponse({"id": data.id})

def save_data(request):
    data = json.loads(request.body.decode('utf-8'))
    id = data['id']
    event_name = data['event_name']
    time = data['event_time']
    data1 = data['data']
    location = data['location']
    main = Data.objects.get(id=id)
    main.event_name = event_name
    main.time = time
    main.location = location
    main.data = data1
    main.save()
    return JsonResponse({"saved": True})

def get_data(request):
    data = Data.objects.all().values()    
    return JsonResponse({"data": list(data)})
def get_likes(request):
    data = Users.objects.filter(id=request.COOKIES.get('id')).first().__dict__
    return JsonResponse({"liked": data['liked'], "id":request.COOKIES.get('id')})


def update_likes(request):
    data = json.loads(request.body.decode('utf-8'))
    id = request.COOKIES.get('id')
    users = Users.objects.get(id=id)
    users.liked = data['liked']

    users.save()
    return JsonResponse({"dsa":"dss"})

def logout(request):
    returns = JsonResponse({"logout" : True})
    returns.delete_cookie('id')
    returns.delete_cookie('SID')
    return returns