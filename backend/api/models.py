from django.db import models
from django_mysql.models import ListCharField
# Create your models here.

# Model to store user information
class  Users(models.Model):

    # Username for the user which is unique for every user
    name = models.CharField(max_length=60, unique=True)
    # Password stored in sha-256 for security reasons
    passwd = models.CharField(max_length=256)
    # Session IDs to verify with cookis
    SID = models.CharField(max_length=60)
    # Array with IDs of liked events
    liked  = ListCharField( 
        base_field=models.CharField(max_length=10),
        size=6,
        max_length=(6 * 11))
    def __str__(self):
        return self.name


# Model to store data of events
class Data(models.Model):
    # Name of the event
    event_name = models.CharField(max_length=60)
    data = models.CharField(max_length=60)
    time = models.CharField(max_length=60)
    location = models.CharField(max_length=60)
    image = models.ImageField(upload_to="images")
    is_liked = models.BooleanField(default=False)
    user_id = models.CharField(max_length=60)
    def __str__(self):
        return self.name
