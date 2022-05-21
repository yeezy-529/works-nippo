from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import *
from account.models import *

@receiver(post_save, sender=CustomUser)
def work_class_save(instance, created,**kwargs):
    if created:
        user_data = CustomUser.objects.get(username = instance)
        signup_user = instance
        signup_dept = user_data.dept_id
        obj = DefaultWorkclass.objects.filter(dept = signup_dept)
        obj_list = [i.contents for i in obj]
        for i in range(len(obj_list)):
            data = UserWorkclass(user =  signup_user, contents = obj_list[i])
            data.save()