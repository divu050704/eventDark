from django.db import models
from django_mysql.models import ListCharField
# Create your models here.
class  Users(models.Model):
    name = models.CharField(max_length=60, unique=True)
    passwd = models.CharField(max_length=256)
    SID = models.CharField(max_length=60)
    liked  = ListCharField( 
        base_field=models.CharField(max_length=10),
        size=6,
        max_length=(6 * 11))
    def __str__(self):
        return self.name
    
class Data(models.Model):
    event_name = models.CharField(max_length=60)
    data = models.CharField(max_length=60)
    time = models.CharField(max_length=60)
    location = models.CharField(max_length=60)
    image = models.ImageField(upload_to="images")
    is_liked = models.BooleanField(default=False)
    user_id = models.CharField(max_length=60)
    def __str__(self):
        return self.name