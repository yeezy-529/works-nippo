from .forms import SignUpForm
from .models import *
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

    # https://teratail.com/questions/35233
@login_required
def signup(request):
    """サインアップビュー"""
    if not request.user.is_staff:
        return redirect('login-home')

    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login-home')
    else:
        form = SignUpForm()
    return render(request, 'signup/index.html', {'form': form})
@login_required
def usersettingViews(request):
    """ユーザー設定画面"""
    if request.method == 'POST':
        # 部署、エリア変更
        if 'user_save_button' in request.POST:
            user_obj = CustomUser.objects.get(username = request.user)
            user_obj.area_id = request.POST.get("user_area")
            user_obj.dept_id = request.POST.get("user_dept")
            user_obj.save()
        return redirect("user_setting")
    elif request.method == 'GET':
        dept = User_Dept.objects.all()
        area = User_Area.objects.all()
        workclass = UserWorkclass.objects.filter(user = request.user)
        params = {
            "dept":dept,
            "area":area,
            "workclass":workclass
            }
        return render(request, 'setting/user_setting.html',params)

def ajax_warkClass_add(request):
    """ユーザー作業区分 追加"""
    js_workclass = request.POST.get("work_class")
    add_obj = UserWorkclass.objects.filter(user = request.user)
    obj_list = [i.contents for i in add_obj]

    if not js_workclass == "" and not js_workclass == " " and not js_workclass in obj_list:
        obj = UserWorkclass(user = request.user, contents = js_workclass)
        obj.save()
        add_obj = UserWorkclass.objects.filter(user = request.user)
        obj_list = [i.contents for i in add_obj]
        return JsonResponse({"obj_list":obj_list})
    else:
        return JsonResponse({"obj_list":obj_list})

def ajax_warkClass_del(request):
    """ユーザー作業区分 削除"""
    js_workclass = request.POST.get("work_class")
    add_obj = UserWorkclass.objects.filter(user = request.user)
    obj_list = [i.contents for i in add_obj]
    if not js_workclass == "":
        js_workclass = request.POST.get("work_class")
        obj = UserWorkclass.objects.filter(user = request.user, contents = js_workclass)
        obj.delete()
        add_obj = UserWorkclass.objects.filter(user = request.user)
        obj_list = [i.contents for i in add_obj]
        return JsonResponse({"obj_list":obj_list})
    else:
        return JsonResponse({"obj_list":obj_list})