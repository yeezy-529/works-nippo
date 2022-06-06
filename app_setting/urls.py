from django.urls import path
from . import views    
    
urlpatterns = [
    path('app_settings/' , views.app_settingsViews, name="app_settings"),
    path('ajax_addDefaulWorkContent/', views.ajax_addDefaulWorkContent, name='ajax_addDefaulWorkContent'),
    path('ajax_delDefaulWorkContent/', views.ajax_delDefaulWorkContent, name='ajax_delDefaulWorkContent'),
    path('ajax_addDefaulWorkClass/', views.ajax_addDefaulWorkClass, name='ajax_addDefaulWorkClass'),
    path('ajax_delDefaulWorkclass/', views.ajax_delDefaulWorkclass, name='ajax_delDefaulWorkclass'),
    ]
    
    
    
    
    
    
    
    
    
    
    
    