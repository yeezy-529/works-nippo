from django import forms
from .models import *
import pykintone

def kintone_input_info_GET():
    obj = kintone_setting_model.objects.get(id=1)
    appID = obj.kintone_input_appID
    input_API = obj.kintone_input_API
    domain = obj.kintone_input_domain
    return pykintone.app(domain, appID, input_API)

def kintone_input(fieldname):
    app = kintone_input_info_GET()
    result = app.select("order by $id asc")
    if result.ok:
        records = result.records
        x_list = [(record[fieldname]["value"],record[fieldname]["value"]) for record in records]
    return x_list

class kintone_setting_form(forms.ModelForm):
    kintone_input_API = forms.CharField(
        max_length=50,
        required=True,
        )
    kintone_output_API = forms.CharField(
        max_length=50,
        required=True,
        )
    kintone_domain = forms.CharField(
        max_length=30,
        required=True,
        )
    kintone_input_appID = forms.CharField(
        max_length=2,
        required=True,
        )
    kintone_output_appID = forms.CharField(
        max_length=2,
        required=True,
        )

    class Meta:
        model = kintone_setting_model
        fields = (
            "kintone_input_API",
            "kintone_output_API",
            "kintone_domain",
            "kintone_input_appID",
            "kintone_output_appID",
        )
        edit_only=True,