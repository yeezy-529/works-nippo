from .forms import SignUpForm
from .models import *
from django.shortcuts import render, redirect
from django.http import JsonResponse

def signup(request):
    """サインアップビュー"""
    # https://teratail.com/questions/35233
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login-home')
    else:
        form = SignUpForm()
    return render(request, 'signup/index.html', {'form': form})

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