// 参考サイト
// https://office54.net/python/django/django-ajax
// Ajax
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
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
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
// ここから
// --------------------追加--------------------
$("#work_class_add_button").click (function (e){
    // form送信を防止する
    e.preventDefault();
    //$.ajax：サーバに送信するデータの設定
    //.done：通信成功時の処理
    //.fail：通信失敗時の処理
    
    var url = $('#url_class_add').val()
    if (
        $("#work_class_add").val()!== "" &&
        $("#work_class_add").val()!== " " &&
        $("#work_class_add").val()!== null &&
        $("#work_class_add").val()
        ){
        $.ajax({
            'url': url,
            'type': 'POST',
            'data': {
                'work_class': $("#work_class_add").val(),
            },
            'dataType': 'json'
        })
        
    .done(function(response){
        
        $('#work_class_select').children().remove();
        obj = response.obj_list
        for (var i = 0; i < obj.length; i++) {
            $("#work_class_select").append($('<option>').attr({ value: obj[i] }).text(obj[i]));
        }
        $("#work_class_add").val("")
    })
    .fail(function(response){
        console.log(400)
        // $("#erorr_message").append($('<p>').text("通信エラーが発生しました"));
    })}
});


// -------------------削除--------------------
$("#work_class_del_button").click (function (e){
    e.preventDefault();
    var url = $('#url_class_del').val()
    if ($('#work_class_select').val() !== null){
    $.ajax({
        'url': url,
        'type': 'POST',
        'data': {
            'work_class': $('#work_class_select').val(),
        },
        'dataType': 'json'
    })
    .done(function(response){
        console.log(200)
        $('#work_class_select').children().remove();
        obj = response.obj_list
        for (var i = 0; i < obj.length; i++) {
            $("#work_class_select").append($('<option>').attr({ value: obj[i] }).text(obj[i]));
        }
    })
    .fail(function(response){
        console.log(400)
    })}
});