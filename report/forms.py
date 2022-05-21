from .models import reports
from django import forms

time_h = (("","時"),("8","8"),("9","9"),("10","10"),
        ("11","11"),("12","12"),("13","13"),("14","14"),
        ("15","15"),("16","16"),("17","17"),("18","18"),
        ("19","19"),("20","20"),("21","21"),("22","22"),
        ("23","23"),("0","0"),("1","1"),("2","2"),
        ("3","3"),("4","4"),("5","5"),("6","6"),("7","7"),)

time_m = (("","分"),
        ("00","00"),
        ("10","10"),
        ("20","20"),
        ("30","30"),
        ("40","40"),
        ("50","50"),)

class  report_form(forms.ModelForm):
    rowfarst_time_h_0 = forms.ChoiceField(
        required=True,
        choices = time_h,
        widget= forms.Select(attrs = {
        'onclick' : "func('id_farst_time_h_0'); selectChangeColor(this);",}),
    )

    rowfarst_time_m_0 = forms.ChoiceField(
        required=True,
        choices = time_m,
        widget= forms.Select(attrs = {
        'onclick' : "func('id_farst_time_m_0'); selectChangeColor(this);",}),
    )

    rowend_time_h_0 = forms.ChoiceField(
        required=True,
        choices = time_h,
        widget= forms.Select(attrs = {
        'onclick' : "func('id_end_time_h_0'); selectChangeColor(this);",}),
    )

    rowend_time_m_0 = forms.ChoiceField(
        required=True,
        choices = time_m,
        widget= forms.Select(attrs = {
        'onclick' : "func('id_end_time_m_0'); selectChangeColor(this);",
        }),
    )

    class Meta:
        model = reports
        fields = (
            'Report_Work_class',
            'Report_Work_contents',
            )
    
    
    
    
    
    
    
    
    
    
    
        # try:
    #     work_class_choice = [(i.Work_Class, i.Work_Class) for i in Work_class.objects.all()]
    # except AttributeError:
    #     work_class_choice = [("None","None")]
    
    
    
    
    # try:
    #     # dept = (dept = self.user_dept)
    #     wark_content = DefaulWorkContent.objects.filter(dept__dept = dept = self.user_dept)
    #     work_contents_choice = [(i.Contents, i.Contents) for i in DefaulWorkContent.objects.all()]
    # except AttributeError:
    #     work_contents_choice = [("None","None")]
        
    # work_class_0 = forms.ChoiceField(
    #     label='作業',
    #     required=False,
    #     choices = work_class_choice,
    #     widget= forms.Select(attrs = {
    #     'onclick' : "selectChangeColor(this);",})
    # )

    # work_contents_0 = forms.ChoiceField(
    #     required=False,
    #     # choices = work_contents_choice,
    #     choices = (1,1),
    #     widget= forms.Select(attrs = {
    #     'onclick' : "selectChangeColor(this);",})
    # )