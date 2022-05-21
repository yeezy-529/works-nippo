from .forms import *
from .models import *
from account.models import *
from django.shortcuts import render,redirect
import datetime
import re
import pykintone
from django.http import JsonResponse

# 参考サイト
# https://freeheroblog.com/django-update/
# def kintone_settingViews(request):
#     """kintone設定ビュー"""
#     obj = kintone_setting_model.objects.get(id=1)
#     if request.method == "GET":
#         item = {
#             "kintone_input_API":obj.kintone_input_API,
#             "kintone_output_API":obj.kintone_output_API,
#             "kintone_input_domain":obj.kintone_domain,
#             "kintone_input_appID":obj.kintone_input_appID,
#             "kintone_output_appID":obj.kintone_output_appID,
#         }
#         form = kintone_setting_form(initial=item)
# 参考サイト（レコード更新）
# https://ymgsapo.com/2018/09/21/update_record/
    # elif request.method == 'POST':
    #     if 'matter_get' in request.POST:
    #         form = kintone_setting_form(request.POST, instance=obj)
    #     if form.is_valid():
    #         form.save()
    # return render(request, "setting/kintone_setting.html",{'form':form})

# 工場設定画面
# https://yura2.hateblo.jp/entry/2015/04/04/Django%E3%81%A7%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E5%86%85%E3%81%A7%E3%82%AF%E3%83%AA%E3%83%83%E3%82%AF%E3%81%95%E3%82%8C%E3%81%9F%E3%83%9C%E3%82%BF%E3%83%B3%E3%81%AB%E3%82%88%E3%81%A3%E3%81%A6%E7%95%B0
def app_settingsViews(request):
    if request.method == 'POST':
        # 0の時表示
        if 'matter_in' in request.POST:
            code_input('matter_code_in',0,request)
            return redirect('app_settings')
        
        elif 'matter_del' in request.POST:
            code_input('matter_code_del',1,request)
            return redirect('app_settings')
        
        elif 'kintone_input' in request.POST:
            number = kintone_input("工番",0)
            name = kintone_input("品名",0)
            deadline = kintone_input("納期",0)
            today = datetime.datetime.today()
            infoList = [[number[i] ,re.sub("\u3000","",name[i]) ,deadline[i]] for i in range(len(number)) if datetime.datetime.strptime(deadline[0], '%Y-%m-%d') <= today]
            all_code = [i.matter_code for i in Matter_code.objects.all()]
            for i in range(len(infoList)):
                if not infoList[i][0] in all_code:
                    l = Matter_code(
                        matter_code=infoList[i][0],
                        matter_name=infoList[i][1],
                        matter_displayinfo=0,
                        )
                    l.save()
            return redirect('app_settings')
        
        elif 'matter_para_save' in request.POST:
            i = kintone_setting_model.objects.get(id=1)
            i.matter_update_number = request.POST.get("Matter_update_number")
            num = request.POST.get("auto-update-check")
            if num == "1": i.automation_update_mode = "1"
            else: i.automation_update_mode = "0"
            i.save()
            return redirect('app_settings')

        else:
            number = request.POST.get('Matter_update_number')
            i = kintone_setting_model.objects.get(id=1)
            objnum = i.matter_update_number
            if objnum != number:
                i.matter_update_number = number
                i.save()
            return return_fun(request)
    elif request.method == 'GET':
        obj = Matter_code.objects.filter(matter_displayinfo = 0)
        setting_obj = kintone_setting_model.objects.get(pk=1)
        update_mode = int(setting_obj.matter_update_number)
        auto_number = int(setting_obj.automation_update_mode)
        today = datetime.date.today()
        params = {"auto_number":auto_number,"update_mode":update_mode}
        for i in obj:
            deadline = i.matter_deadline
            para = i.matter_code
                # 当日
            if update_mode == 0:
                days = 0
                del_deadline = today + datetime.timedelta(days)
                try:
                    if del_deadline > deadline:
                        db_save(para,1)
                except IndentationError and TypeError:
                    pass
            # 1週間
            elif update_mode == 1:
                days = 7
                del_deadline = today + datetime.timedelta(days)
                try:
                    if del_deadline > deadline:
                        db_save(para,1)
                except IndentationError and TypeError:
                    pass
            # 1か月
            elif update_mode == 2:
                days = 30
                del_deadline = today + datetime.timedelta(days)
                try:
                    if del_deadline > deadline:
                        db_save(para,1)
                except IndentationError and TypeError:
                    pass
            # 3か月
            elif update_mode == 3:
                days = 90
                del_deadline = today + datetime.timedelta(days)
                try:
                    if del_deadline > deadline:
                        db_save(para,1)
                except IndentationError and TypeError:
                    pass
            # 半年
            elif update_mode == 4:
                days = 180
                del_deadline = today + datetime.timedelta(days)
                try:
                    if del_deadline > deadline:
                        db_save(para,1)
                except IndentationError and TypeError:
                    pass
        """kintoneAPI取得"""
        obj = kintone_setting_model.objects.get(pk=1)
        item = {
            "kintone_input_API":obj.kintone_input_API,
            "kintone_output_API":obj.kintone_output_API,
            "kintone_domain":obj.kintone_domain,
            "kintone_input_appID":obj.kintone_input_appID,
            "kintone_output_appID":obj.kintone_output_appID,
        }
        form = kintone_setting_form(initial=item)            
        
        """作業区分 設定"""
        Dept = User_Dept.objects.all()
        # workcontent = obj.contents
        
        return render(request, 'setting/app_settings.html',{
            "form":form,
            "matter":matter_code("-"),
            "params":params,
            "Dept":Dept,
            })

def usersettingViews(request):
    """ユーザー設定画面"""
    if request.method == 'POST':
        # if 'user_save_button' in request.POST:
        #     area = request.POST.get("user_area")
        #     dept = request.POST.get("user_dept")
        #     # うまくクエリセットを取得できない
        #     i0 = CustomUser.objects.all()
        #     i1 = UserWorkclass.objects.all()
        #     # print(i0.pk)
        #     print(i0[0].pk)
            # print(i1)
            # i = i0.values()
            # print(i)
            # i.area = area
            # i.dept = dept
            # i.save()
            # return
        return render(request, 'setting/user_setting.html')

    elif request.method == 'GET':
        dept = User_Dept.objects.all()
        area = User_Area.objects.all()
        workclass = UserWorkclass.objects.filter(user = request.user)
        params = {"dept":dept,"area":area,"workclass":workclass}
        return render(request, 'setting/user_setting.html',params)

def ajax_addDefaulWorkContent(request):
    js_dept = request.POST.get("value_dept")
    js_number = request.POST.get("value_number")
    js_value = request.POST.get("value_content")
    add_obj = DefaulWorkContent.objects.filter(dept__dept = js_dept)
    obj_list = [i.contents for i in add_obj]
    obj_list_number = [int(i.number) for i in add_obj]
    
    if (not js_value == "" and 
        not js_number =="" and 
        not js_value == None and
        not js_number == None and 
        not js_value in obj_list and
        not int(js_number) in obj_list_number 
        ):

        obj = User_Dept.objects.get(dept = js_dept)
        obj = DefaulWorkContent(dept = obj, contents = js_value, number = js_number)
        obj.save()
        add_obj = DefaulWorkContent.objects.filter(dept__dept = js_dept)
        obj_list = [i.contents for i in add_obj]
        obj_list_number = [int(i.number) for i in add_obj]

        return JsonResponse({"obj_list":obj_list,"dept_number":obj_list_number})
    else:
        return JsonResponse({"obj_list":obj_list,"dept_number":obj_list_number})

def ajax_delDefaulWorkContent(request):
    js_value = request.POST.get("value")
    js_dept = request.POST.get("dept")
    obj = DefaulWorkContent.objects.filter(dept__dept = js_dept, contents = js_value)
    obj.delete()
    add_obj = DefaulWorkContent.objects.filter(dept__dept = js_dept)
    obj_list = [i.contents for i in add_obj]
    obj_list_number = [i.number for i in add_obj]
    return JsonResponse({"obj_list":obj_list,"dept_number":obj_list_number})

def ajax_addDefaulWorkClass(request):
    js_dept = request.POST.get("value_dept")
    # js_number = request.POST.get("value_number")
    # js_value = request.POST.get("value_content")
    add_obj = DefaultWorkclass.objects.filter(dept__dept = js_dept)
    obj_list = [i.contents for i in add_obj]
    # obj_list_number = [int(i.number) for i in add_obj]
    
    # if (not js_value == "" and 
    #     not js_number =="" and 
    #     not js_value == None and
    #     not js_number == None and 
    #     not js_value in obj_list and
    #     not int(js_number) in obj_list_number 
    #     ):

    # obj = User_Dept.objects.get(dept = js_dept)
    # obj = DefaultWorkclass(dept = obj, contents = js_value, number = js_number)
    # obj.save()
    # add_obj = DefaultWorkclass.objects.filter(dept__dept = js_dept)
    obj_list = [i.contents for i in add_obj]
    # obj_list_number = [int(i.number) for i in add_obj]

    return JsonResponse({"obj_list":obj_list})
# else:
#     return JsonResponse({"obj_list":obj_list,"dept_number":obj_list_number})
# ---------------関数定義---------------
def return_fun(requ):
    return render(requ, 'setting/app_settings.html',{"matter":matter_code("-")})

def code_input(para,number,request):
    code = request.POST.get(para)
    try:
        i = Matter_code.objects.get(matter_code = code)
        i.matter_displayinfo = number
        if number == 0:i.matter_deadline = None
        elif number == 1:i.matter_deadline = datetime.date.today()
        i.save()
    except Matter_code.DoesNotExist and ValueError:
        pass

def db_save(code,number):
    try:
        i = Matter_code.objects.get(matter_code = code)
        i.matter_displayinfo = number
        if number == 0:i.matter_deadline = None
        elif number == 1:i.matter_deadline = datetime.date.today()
        i.save()
    except Matter_code.DoesNotExist and ValueError:
        pass

def matter_code(kye = ""):
    in_value = [{"Value":i.matter_code,"Label":i.matter_code + " " + str(i.matter_name),"Deadline":i.matter_deadline} for i in Matter_code.objects.filter(matter_displayinfo = 0).order_by(kye +'matter_code')]
    out_value =[{"Value":i.matter_code,"Label":i.matter_code + " " + str(i.matter_name),"Deadline":i.matter_deadline} for i in Matter_code.objects.filter(matter_displayinfo = 1).order_by(kye +'matter_code')]
    params = {"in_data":in_value,"out_data":out_value}
    return params

# 参考サイト
# https://python.hotexamples.com/jp/examples/pykintone/-/app/python-app-function-examples.html
# def input_kintone(date1, dept, name,number,cla,warks,sta_t,end_t,total_time_all,overtime,naittime):
#     app = kintone_info_GET()
#     record = register()
#     record.日付=str(date1)
#     record.部署=dept
#     record.名前=str(name)
#     record.工番=str(number)
#     record.作業区分=str(cla)
#     record.作業内容=str(warks)
#     record.開始時間=str(sta_t)
#     record.終了時間=str(end_t)
#     record.所要時間=str(total_time_all)
#     record.残業時間=overtime
#     record.夜勤時間=naittime
#     app.create(record)

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

def kintone_input(fieldname,info):
    app = kintone_info_GET(info)
    result = app.select("order by $id asc")
    if result.ok:
        records = result.records
        value_list = [(record[fieldname]["value"]) for record in records]
        return value_list