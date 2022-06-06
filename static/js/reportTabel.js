// 参考サイト
// https://office54.net/python/django/django-ajax
// Ajax
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
// 部署選択で表示内容変更
$("#id_select_dept").change (function (e){
    e.preventDefault();
    if ($("#id_select_dept").val() !== null){$('#id_select_work_content').children().remove();}
    $.ajax({
        'url': "/ajax_addDefaulWorkContent/",
        'type': 'POST',
        'data': {
            'value_dept': $("#id_select_dept").val(),
        },
        'dataType': 'json'
    })
    .done(function(response){
        $('#id_select_work_content').children().remove();
        obj = response.obj_list
        obj_number = response.dept_number
        for (var i = 0; i < obj.length; i++) {
            $("#id_select_work_content").append($('<option>').attr({ value: obj[i] }).text(obj_number[i]+ " " + obj[i]));
        }
    })
})

$("#id_button_work_content").click (function (e){
    e.preventDefault();
    if (
        $("#id_input_work_content").val()!== "" &&
        $("#id_input_work_content").val()!== " " &&
        $("#id_input_work_content").val()!== null &&
        $("#id_input_work_content").val() &&
        $("#id_input_work_contentNumber").val()!== "" &&
        $("#id_input_work_contentNumber").val()!== " " &&
        $("#id_input_work_contentNumber").val()!== null &&
        $("#id_input_work_contentNumber").val() &&
        $("#id_select_dept").val() !== null
        ){
    $.ajax({
        'url': "/ajax_addDefaulWorkContent/",
        'type': 'POST',
        'data': {
            'value_number': $("#id_input_work_contentNumber").val(),
            'value_content': $("#id_input_work_content").val(),
            'value_dept': $("#id_select_dept").val(),
        },
        'dataType': 'json'
    })
    .done(function(response){
        $('#id_select_work_content').children().remove();
        obj = response.obj_list
        obj_number = response.dept_number
        for (var i = 0; i < obj.length; i++) {
            $("#id_select_work_content").append($('<option>').attr({ value:  obj[i] }).text(Number(obj_number[i])+ " " + obj[i]));
        }
        $("#id_input_work_content").val("")
        $("#id_input_work_contentNumber").val("")
    })
    .fail(function(response){
        console.log(400)
    })};
});

$("#id_button_work_content_del").click (function (e){
    e.preventDefault();
    
    if ($('#id_select_work_content').val() !== null ||
        $('#id_select_dept').val() !== null
    ){
    $.ajax({
        'url': "/ajax_delDefaulWorkContent/",
        'type': 'POST',
        'data': {
            'value': $('#id_select_work_content').val(),
            'dept': $('#id_select_dept').val()
        },
        'dataType': 'json'
    })
    .done(function(response){
        $('#id_select_work_content').children().remove();
        obj = response.obj_list
        obj_number = response.dept_number
        for (var i = 0; i < obj.length; i++) {
            $("#id_select_work_content").append($('<option>').attr({ value:  obj[i] }).text(Number(obj_number[i])+ " " + obj[i]));
        }
        $("#id_input_work_content").val("")
        $("#id_input_work_contentNumber").val("")
    })
    .fail(function(response){
        console.log(400)
    })}
});

// セレクトで作業区分取得
$("#id_select_wark_class_dept").change (function (e){
    e.preventDefault();
    if ($("#id_select_wark_class_dept").val() !== null){$('#id_select_work_content').children().remove();}
    $.ajax({
        'url': "/ajax_addDefaulWorkClass/",
        'type': 'POST',
        'data': {
            'value_dept': $("#id_select_wark_class_dept").val(),
        },
        'dataType': 'json'
    })
    .done(function(response){
        $('#id_select_work_class').children().remove();
        obj = response.obj_list
        for (var i = 0; i < obj.length; i++) {
            $("#id_select_work_class").append($('<option>').attr({ value: obj[i] }).text( obj[i]));
        }
    })
})

// 作業区追加
$("#id_button_wark_class").click (function (e){
    e.preventDefault();
    if (
        $("#id_input_work_class").val()!== "" &&
        $("#id_input_work_class").val()!== " " &&
        $("#id_input_work_class").val()!== null &&
        $("#id_input_work_class").val() &&
        $("#id_select_wark_class_dept").val() !== null
        ){
        $.ajax({
            'url': "/ajax_addDefaulWorkClass/",
            'type': 'POST',
            'data': {
                'value_class': $("#id_input_work_class").val(),
                'value_dept': $("#id_select_wark_class_dept").val(),
            },
            'dataType': 'json'
        })
        .done(function(response){
            $('#id_select_work_class').children().remove();
            obj = response.obj_list
            obj_number = response.dept_number
            for (var i = 0; i < obj.length; i++) {
                $("#id_select_work_class").append($('<option>').attr({ value:  obj[i] }).text(obj[i]));
            }
            $("#id_input_work_class").val("")
        })
        .fail(function(response){
            console.log(401)
    })};
});

$("#id_button_work_class_del").click (function (e){
        e.preventDefault();
    
    if ($('#id_select_work_class').val() !== null ||
        $('#id_select_wark_class_dept').val() !== null
    ){
    $.ajax({
        'url': "/ajax_delDefaulWorkclass/",
        'type': 'POST',
        'data': {
            'value': $('#id_select_work_class').val(),
            'dept': $('#id_select_wark_class_dept').val()
        },
        'dataType': 'json'
    })
    .done(function(response){
        $('#id_select_work_class').children().remove();
        obj = response.obj_list
        for (var i = 0; i < obj.length; i++) {
            $("#id_select_work_class").append($('<option>').attr({ value:  obj[i] }).text(obj[i]));
        }
        $("#id_input_work_class").val("")
    })
    .fail(function(response){
        console.log(400)
    })}
});