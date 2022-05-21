from .forms import report_form
from .models import reports
from app_setting.models import *
from account.models import *
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.shortcuts import redirect, render
import re
import pykintone
from pykintone import model as pykintone_model
from django.http import JsonResponse

time_h =(("","時"),("8","8"),("9","9"),("10","10"),
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

@login_required
def ReportViews(request):
    if  request.method == 'POST':
        dateList = []
        Matter_numberList = []
        work_classList = []
        work_contentsList = []
        start_timeList = []
        end_timeList = []
        total_timeList = []
        form = report_form(request.POST)
        if form.is_valid():
            for i in request.POST.items():
                if re.match(r'Reportdate_*'    ,i[0]):dateList.append(i[1])
                if re.match(r'constr_number_*' ,i[0]):Matter_numberList.append(i[1])
                if re.match(r'work_class_*'    ,i[0]):work_classList.append(i[1])
                if re.match(r'work_contents_*' ,i[0]):work_contentsList.append(i[1])
                if re.match(r'start_time_*'    ,i[0]):start_timeList.append(i[1])
                if re.match(r'end_time_*'      ,i[0]):end_timeList.append(i[1])
                if re.match(r'total_time_*'    ,i[0]):total_timeList.append(i[1])
                if re.match(r'date_status'     ,i[0]):date_status = int(i[1])
                if re.match(r'rows'            ,i[0]):rows_count = int(i[1])
            
            user_name = request.user.last_name + request.user.fast_name
            for l in range(rows_count):
                if date_status == 0:
                    Date = dateList[0]
                else:
                    Date = dateList[l]
                Reports = reports(
                    Report_User_name = user_name,
                    Report_User_dept = request.user.dept,
                    Report_User_area = request.user.area,
                    Report_Row_date = Date,
                    Report_Matter_code = Matter_numberList[l],
                    Report_Work_class = work_classList[l],
                    Report_Work_contents = work_contentsList[l],
                    Report_Rowstart_time = start_timeList[l],
                    Report_Rowend_time = end_timeList[l],
                    Report_Total_time = int(total_timeList[l]),
                    Report_Over_time = int(0),
                    Report_Night_time = int(0),
                    Report_Check_number = 1,
                )
                Reports.save()
            return redirect("report")
        else:
            params = {'form': form,"erorr":form.errors}
        return render(request, 'report/index.html',params)            
    
    elif request.method == 'GET':
        myuser = (str(request.user.last_name) +  str(request.user.fast_name))
        user_record = reports.objects.filter(Report_User_name = myuser).order_by('-Report_Row_date').first()
        try:
            user_record_date = user_record.Report_Row_date
        except UnboundLocalError:
            user_record_date = None
        except AttributeError:
            user_record_date = None

        wark_class = UserWorkclass.objects.filter(user__username = request.user.username)
        wark_content = DefaulWorkContent.objects.filter(dept__dept = request.user.dept)
        record = reports.objects.filter(Report_User_name = myuser,Report_Row_date = user_record_date).order_by('-Report_Row_date')
        form = report_form()
        try:
            params = {'form': form ,"record":record,"record_date":record[0],"matter":matter_code(),"workclass":wark_class,"wark_content":wark_content}
        except IndexError:
            params = {'form': form ,"record":record,"matter":matter_code(),"workclass":wark_class,"wark_content":wark_content}
    return render(request, 'report/index.html',params)












































# 日報テーブルビュー
@login_required
def Report_tableViews(request):
    check_area = request.GET.get('plant_checkbox')
    user_select_date = request.GET.get('date_checkbox')
    user_select_dept = request.GET.get('dept_checkbox')
    date_check = request.GET.get('date_check')

    GETparams = {
                "return_data_0":check_area, 
                "return_data_1":user_select_date,
                "return_data_2":user_select_dept,
                "return_data_3":date_check,
                }
    if request.method == 'POST':
        data = reports.objects.filter(check_number_0='1')
        for i in data:
            input_kintone(
                        i.Report_Row_date, 
                        i.Report_User_dept, 
                        i.Report_User_name, 
                        i.Report_Matter_code, 
                        i.Report_Work_class, 
                        i.Report_Work_contents, 
                        i.Report_Rowstart_time, 
                        i.Report_Rowend_time, 
                        i.Report_Total_time, 
                        i.Report_Over_time, 
                        i.Report_Night_time,
                        )
            i.Report_Check_number = "0"
            i.save()
            
    else:
        return render(request, 'report/report_table.html', )


def Get_data(request):
    area =        request.POST.get("erea_val")
    dept =  request.POST.get('dept_val')
    day =  request.POST.get('day_val')
    if dept == "製造部":
        dept_number = 1
    elif dept == "設計部":
        dept_number = 2
    elif dept == "営業部":
        dept_number = 3
    elif dept == "調達部":
        dept_number = 4
    elif dept == "総務部":
        dept_number = 5

    if area == "本社工場":
        area_number = 1
    elif area == "関東工場":
        area_number = 2
    users_lis = [i.last_name + i.fast_name for i in CustomUser.objects.filter(area=area_number,dept=dept_number)]
    GETparams = {
                "return_data_0":area, 
                "return_data_1":dept,
                "return_data_2":day,
                }
    data = reports.objects.all().order_by('-Report_Row_date')
    if day != None and dept != None and area != None:
        data = reports.objects.filter(
            Report_User_dept = dept,
            Report_User_area = area,
            Report_Row_date = day
            ).order_by('-Report_Row_date')
    json_data = list(data.values())

    # 未提出者抽出
    ReportUser = list(set([i.Report_User_name for i in data]))
    ReturnUser = [i for i in users_lis if not i in ReportUser]


    return JsonResponse({"data":json_data,"GETparams":GETparams,"Noreport_user":ReturnUser})

















    # params = {'data':data.values(),"GETparams":GETparams}
    # return render(request, 'report/report_table.html', params)
    # and
    #     if date_check != "0":
    #         data = reports.objects.filter(
    #             Report_Row_date = user_select_date,
    #             Report_User_dept = user_select_dept 
    #             ).order_by('-Report_Row_date')
    # else:
    #     data = reports.objects.all().order_by('-Report_Row_date')
    # DATA_1 = {"data1":data}

















































# 日報登録
class register(pykintone_model.kintoneModel):
    def __init__(self):
        super(register, self).__init__()
        self.日付=""
        self.名前=""
        self.部署=""
        self.工番=""
        self.作業区分=""
        self.作業内容=""
        self.開始時間=""
        self.終了時間=""
        self.所要時間=0
        self.残業時間=0
        self.夜勤時間=0


# ----------------　関数定義　----------------
# 参考サイト
# https://python.hotexamples.com/jp/examples/pykintone/-/app/python-app-function-examples.html
def input_kintone(date1, dept, name,number,cla,warks,sta_t,end_t,total_time_all,overtime,naittime):
    app = kintone_info_GET()
    record = register()
    record.日付=str(date1)
    record.部署=dept
    record.名前=str(name)
    record.工番=str(number)
    record.作業区分=str(cla)
    record.作業内容=str(warks)
    record.開始時間=str(sta_t)
    record.終了時間=str(end_t)
    record.所要時間=str(total_time_all)
    record.残業時間=overtime
    record.夜勤時間=naittime
    app.create(record)

# kintoneInputAPI取得
def kintone_info_GET(info = 1):
    if info == 1:
        obj = kintone_setting_model.objects.get(id=1)
        appID = obj.kintone_output_appID
        output_API = obj.kintone_output_API
        domain = obj.kintone_domain
        return pykintone.app(domain, appID, output_API)
    elif info == 0:
        obj = kintone_setting_model.objects.get(id=1)
        appID = obj.kintone_input_appID
        output_API = obj.kintone_input_API
        domain = obj.kintone_domain
        return pykintone.app(domain, appID, output_API)

# kintoneValue取得    
def kintone_input(fieldname,info):
    app = kintone_info_GET(info)
    result = app.select("order by $id asc")
    if result.ok:
        records = result.records
        value_list = [(record[fieldname]["value"]) for record in records]
        return value_list

# 工番表示番号変更

def db_save(code,number):
    try:
        i = Matter_code.objects.get(matter_code = code)
        i.matter_displayinfo = number
        i.save()
    except Matter_code.DoesNotExist:
        pass
    except ValueError:
        pass
# db工番取得
def matter_code(kye = ""):
    matterCode_choice_in_value = [i.matter_code for i in Matter_code.objects.filter(matter_displayinfo = 1).order_by(kye +'matter_code')]
    matterCode_choice_in_label = [i.matter_code + " " + str(i.matter_name) for i in Matter_code.objects.filter(matter_displayinfo = 1).order_by(kye +'matter_code')]
    matterCode_choice_out_value = [i.matter_code for i in Matter_code.objects.filter(matter_displayinfo = 0).order_by(kye +'matter_code')]
    matterCode_choice_out_label = [i.matter_code + " " + str(i.matter_name) for i in Matter_code.objects.filter(matter_displayinfo = 0).order_by(kye +'matter_code')]
    params = {"matteOutValue":matterCode_choice_out_value,"matteOutLabel":matterCode_choice_out_label,"matteInValue":matterCode_choice_in_value,"matteInLabel":matterCode_choice_in_label}
    return params

