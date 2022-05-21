from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('account/' , views.signup, name="account"),
    path('login-home/' , auth_views.LoginView.as_view(template_name='signup/login.html'),name='login-home'),
    path('logout/' , auth_views.LogoutView.as_view(template_name='signup/logout.html'),name='logout'),
    path('ajax_addworkclass/', views.ajax_warkClass_add, name='ajax_addworkclass'),
    path('ajax_delworkclass/', views.ajax_warkClass_del, name='ajax_delworkclass'),
    # path('ajax_addDefaulWorkContent/', views.ajax_addDefaulWorkContent, name='ajax_addDefaulWorkContent'),
    # path('ajax_delDefaulWorkContent/', views.ajax_addDefaulWorkContent, name='ajax_delDefaulWorkContent'),
]


