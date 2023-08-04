# from rest_framework import viewsets
# from .serializers import UsersSerializer
# from .models import Users



# # Create your views here.
# class UserViewSet(viewsets.ModelViewSet):
#     queryset = Users.objects.all().order_by('name')
#     serializer_class = UsersSerializer


# Mainly sending json responses
from django.http import JsonResponse
# Imported both the models
from .models import Users
from .models import Data
# Imported json for deserialization and serialization
import json
# Hashlib to convert raw passwd to sha-256
import hashlib
# create unique session ids
from uuid import uuid4

def signup(request):
    # Function for signup
    # Get all the data in dictionary
    data = json.loads(request.body.decode('utf-8'))
    # Get name
    name = data["name"]
    # Get password
    passwd = data["passwd"]
    # Hash password to sha256
    passwd = hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    # Put new data to buffer
    user = Users(name=name, passwd = passwd)
    # Save data to memory
    user.save()
    return JsonResponse({"test":"re"}, safe=False)

def login(request):
    # data loaded
    data = json.loads(request.body.decode('utf-8'))
    name = data["name"]
    passwd = data["passwd"]
    # Hash the raw password
    passwd = hashlib.sha256(passwd.encode('utf-8')).hexdigest()
    # Search user
    found = Users.objects.filter(name=name).first().__dict__
    # Vweify passowd
    if (found["passwd"] == passwd):
        update = Users.objects.get(name=name)
        # Create new Session Token
        sid = uuid4()
        update.SID = sid
        update.save()
        returns = JsonResponse({"Pass": True})
        # set cookies id and SID
        returns.set_cookie('SID', sid)
        returns.set_cookie('id', update.id)
        return returns
    else:
        return JsonResponse({"Pass": False})
    
def verify(request):
    try:
        # verifying if user is valid so that they don't need to  sign in again and again
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
    # Solely save image
    data = Data(image=(request.FILES['file']), user_id=request.COOKIES.get('id'))
    data.save()
    # Return id where image is stored
    return JsonResponse({"id": data.id})

def save_data(request):
    # Save the remaining data about events
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
    # Get all the data about events
    data = Data.objects.all().values()    
    return JsonResponse({"data": list(data)})
def get_likes(request):
    # Get array with likes by the user
    data = Users.objects.filter(id=request.COOKIES.get('id')).first().__dict__
    return JsonResponse({"liked": data['liked'], "id":request.COOKIES.get('id')})


def update_likes(request):
    # Updating likes
    data = json.loads(request.body.decode('utf-8'))
    id = request.COOKIES.get('id')
    users = Users.objects.get(id=id)
    users.liked = data['liked']

    users.save()
    return JsonResponse({"dsa":"dss"})

def logout(request):
    # For logout just delete those cookies
    returns = JsonResponse({"logout" : True})
    returns.delete_cookie('id')
    returns.delete_cookie('SID')
    return returns
