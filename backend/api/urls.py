from django.urls import path

from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
   # Signup path 
    path('signup/', views.signup, name="signup"),
   # Login path
    path('login/',views.login, name='login'),
   # Verifying a user
    path('verify/', views.verify, name='verify'),
   # Upload image of event
    path('upload_image/',views.upload_image, name='upload_image'),
   # Save data of the image uploaded earlier
    path('save_data/',views.save_data, name="save-data"),
   # Get all the data about events
    path('get_data/',views.get_data, name="get_data"),
   # Get likes of user
    path('get_likes/',views.get_likes, name='get_likes'),
   # Update likes of user
    path('update_likes/',views.update_likes, name="update_likes"),
    path('logout/',views.logout, name='logout'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
