from django.db import models

class User_Dept(models.Model):
    """部署名モデル"""
    number = models.IntegerField("番号",blank=False, null=False)
    dept = models.CharField("部署",max_length=30, blank=False, null=False)
    
    def __str__(self):
        return str(self.dept)

class User_Area(models.Model):
    """エリアモデル"""
    number = models.IntegerField("番号",blank=False, null=False)
    area = models.CharField("場所",max_length=10, blank=False, null=False)
    
    def __str__(self):
        return str(self.area)

class Matter_code(models.Model):
    """工事番号モデル"""
    matter_code = models.CharField("工番", max_length=10, blank=True, null=True)
    matter_name = models.CharField("案件名", max_length=100, blank=True, null=True)
    client_name = models.CharField("取引名", max_length=100, blank=True, null=True)
    matter_deadline = models.DateField("納期", blank=True, null=True)
    matter_displayinfo = models.IntegerField("表示情報", blank=True,null=True)

class DefaultWorkclass(models.Model):
    """ディフォルト作業区分モデル"""
    dept = models.ForeignKey(User_Dept,on_delete=models.CASCADE, null=False)
    contents = models.CharField("作業区分",max_length=50, blank=False, null=False)

class DefaulWorkContent(models.Model):
    """作業内容モデル"""
    dept = models.ForeignKey(User_Dept,on_delete=models.CASCADE, null=False)
    contents = models.CharField("作業内容",max_length=50, blank=False, null=False)
    number = models.IntegerField("番号", blank=False, null=False)

class kintone_setting_model(models.Model):
    """kintoneAPIモデル"""
    kintone_domain = models.CharField("ドメイン", max_length=30, blank=False, null=False)
    kintone_input_API = models.CharField("入力API", max_length=50, blank=False, null=False)
    kintone_input_appID = models.CharField("入力アプリID", max_length=3, blank=False, null=False)
    kintone_output_API = models.CharField("出力API", max_length=50, blank=False, null=False)
    kintone_output_appID = models.CharField("出力アプリID", max_length=3, blank=False, null=False)
    matter_update_number = models.CharField("工番更新頻度",max_length=5, blank=False, null=False)
    automation_update_mode = models.IntegerField("自動取得")