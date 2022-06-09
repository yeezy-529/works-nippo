from django.urls import path
from . import views
urlpatterns = [
    path('report/' , views.ReportViews, name="report"),
    path('search_matter/' , views.Search_matter, name="search_matter"),
    path('report_table/' , views.Report_tableViews, name="report_table"),
    path('get_data/' , views.Get_data, name="get_data"),
    path('edit_data/' , views.Edit_data, name="edit_data"),
]