from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   
    path('signup/', views.signup, name="signup"),
    path('login/',views.login, name='login'),
    path('verify/', views.verify, name='verify'),
    path('upload_image/',views.upload_image, name='upload_image'),
    path('save_data/',views.save_data, name="save-data"),
    path('get_data/',views.get_data, name="get_data"),
    path('get_likes/',views.get_likes, name='get_likes'),
    path('update_likes/',views.update_likes, name="update_likes"),
    path('logout/',views.logout, name='logout'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)