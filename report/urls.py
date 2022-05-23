from django.urls import path
from . import views
urlpatterns = [
    path('report/' , views.ReportViews, name="report"),
    path('report_table/' , views.Report_tableViews, name="report_table"),
    path('get_data/' , views.Get_data, name="get_data"),
    path('edit_data/' , views.Edit_data, name="edit_data"),
]