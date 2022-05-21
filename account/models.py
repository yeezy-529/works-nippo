from django.db import models
from app_setting.models import User_Area, User_Dept
import app_setting.models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    """カスタムユーザーモデル"""
    fast_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    area = models.ForeignKey(User_Area,on_delete=models.SET_NULL, null=True)
    dept = models.ForeignKey(User_Dept,on_delete=models.SET_NULL, null=True)
    class meta:
        verbose_name_plural ='account.CustomUser'

class UserWorkclass(models.Model):
    """ユーザー作業区分モデル"""
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE, null=False)
    contents = models.CharField("作業区分",max_length=50, blank=False, null=False)

