from django import forms
from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth import get_user_model
from .models import CustomUser,User_Dept,User_Area
# User = get_user_model()

class SignUpForm(UserCreationForm):
    username = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={'placeholder':'  ユーザー名'})
    )
    last_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={'placeholder':'  姓'})
    )
    fast_name = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.TextInput(attrs={'placeholder':'  名'})
    )
    dept = forms.ModelChoiceField(
        queryset=User_Dept.objects.all(),
        empty_label='-所属部署-',
        required=True,
    )
    area = forms.ModelChoiceField(
        queryset=User_Area.objects.all(),
        empty_label='-所属エリア-',
        required=True,
    )
    password1 = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.PasswordInput(attrs={'placeholder':'  パスワード'})
    )
    
    password2 = forms.CharField(
        max_length=30,
        required=True,
        widget=forms.PasswordInput(attrs={'placeholder':'  パスワードの確認入力'})
    )
    class Meta:
        # model = User
        model = CustomUser
        fields = (
            'username', 
            'last_name', 
            'fast_name', 
            'dept',
            'area', 
            'password1', 
            'password2',
            )



    # class Meta:
    #     model = App_setting
    #     fields = (
    #         "kintone_input_API",
    #         "kintone_output_API",
    #         "kintone_input_domain",
    #         "kintone_output_domain",
    #         "kintone_input_appID",
    #         "kintone_output_appID",
    #     )
    #     edit_only=True,




