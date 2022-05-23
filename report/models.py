from django.db import models

class reports(models.Model):
    """日報モデル"""
    Report_User_name =     models.CharField("名前", max_length=30, blank=False, null=False)
    Report_User_dept =     models.CharField("部署", max_length=30, blank=False, null=False)
    Report_User_area =     models.CharField("エリア", max_length=30, blank=False, null=False)
    Report_Row_date =      models.CharField("日付", max_length=30, blank=True, null=True)
    Report_Matter_code =   models.CharField("工番", max_length=30, blank=True, null=True)
    Report_Work_class =    models.CharField("作業区分", max_length=30, blank=True, null=True)
    Report_Work_contents = models.CharField("作業番号", max_length=30, blank=True, null=True)
    Report_Rowstart_time = models.TimeField("開始時間",max_length=30, blank=False, null=False)
    Report_Rowend_time =   models.TimeField("終了時間",max_length=30, blank=False, null=False)
    Report_Total_time =    models.IntegerField("所要時間", blank=False, null=False)
    Report_Over_time =     models.IntegerField("残業時間", blank=True, null=True)
    Report_Night_time =    models.IntegerField("夜勤時間", blank=True, null=True)
    Report_Check_number =  models.IntegerField("チェック", default=0, blank=True,null=True)


