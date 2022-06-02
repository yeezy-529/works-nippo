var obj = new Object();
var obj = {};
// var date_obj = new Date();
var today_data = TodayDate().replace(/-/g,"/");
var break_13_00 = new Date(today_data + " " + 13 + ":" + 00 + ":00")
var time_22_00 = new Date(today_data + " " + 22 + ":" + 00 + ":00")
var time_0_00 = new Date(today_data + " " + 00 + ":" + 00 + ":00")
var time_23_59 = new Date(today_data + " " + 23 + ":" + 59 + ":00")
var time_5_00 = new Date(today_data + " " + 5 + ":" + 00 + ":00")
var totalManageElement = document.querySelector("#id_rows");
var Row_Count = parseInt(totalManageElement.value);
$(document).on("click", "select[id^=id_rowend_time],select[id^=id_rowstart_time],select[id^=id_break_time]", function () {
        var id = $(this).attr('id');
        Time_calculation(id)
    })
    
function Time_calculation(This_ID){
    var data = $(This_ID).val()
    var area_number = $("#area").val()

    if (This_ID in obj){
        if (obj[This_ID] != data && data){
            data = Number(data);
            obj[This_ID] = data;
            }
        else{obj[This_ID] = '';}
    }else{
        if (!data){
            data = Number(data);
            obj[This_ID] = data;}
        }
    if (area_number == "1"){
        var morning_break = new Date(today_data + " " + 10 + ":" + 10 + ":00")
        var afternoon_break = new Date(today_data + " " + 15 + ":" + 10 + ":00")
        var work_break1 = 80
        var work_break2 = 70
        var work_break3 = 60
        var work_break4 = 10
    }else if (area_number == "2"){
        var morning_break = new Date(today_data + " " + 10 + ":" + 15 + ":00")
        var afternoon_break = new Date(today_data + " " + 15 + ":" + 15 + ":00")
        var work_break1 = 90
        var work_break2 = 75
        var work_break3 = 60
        var work_break4 = 15
    }
    var id_len = This_ID.length
    var id_number = This_ID.substring(id_len-1,id_len)
    var f_h = $("#id_rowstart_time_h_"+ id_number).val()
    var f_m = $("#id_rowstart_time_m_" + id_number).val()
    var e_h = $("#id_rowend_time_h_" + id_number).val()
    var e_m = $("#id_rowend_time_m_" + id_number).val()
    var e_h_index = $("#id_rowend_time_h_" + id_number).prop("selectedIndex")
    var e_m_index = $("#id_rowend_time_m_" + id_number).prop("selectedIndex")

    if ((f_h)  && (f_m) && (e_h) && (e_m)){
        $("#id_work_contents_" + id_number).attr('required', true);
        $("#id_work_class_" + id_number).attr('required', true);
        var start_time = new Date(today_data + " " + f_h + ":" + f_m + ":00")
        var end_time = new Date(today_data + " " + e_h + ":" + e_m + ":00")
        var end_time_k = end_time
    if (String(time_0_00) == String(end_time)){
        end_time = time_23_59
        var t = 1
    }
    // 12 14 -60
    // 
    var total = end_time - start_time
    total = ((total/60)/1000)
    if ($("#break_status").val() == 0){
        if (morning_break > start_time){
            if (afternoon_break <= end_time){
            total -= work_break1
            }else if (break_13_00 <= end_time){
            total -= work_break2
            }else if (morning_break <= end_time){
            total -= work_break4
            }
        }else if (break_13_00 > start_time){
            if (afternoon_break <= end_time){
                total -= work_break2
            }else if (afternoon_break > end_time){
                // 12 14 60
                total -= work_break3
        }else if (break_13_00 <= end_time &&  afternoon_break >= end_time){
                total -= work_break3
        }else if (afternoon_break > start_time){
            if (afternoon_break < end_time){total -= work_break4}
        }
    }
    }else if ($("#break_status").val() == 1){
        var break_value = $("#id_break_time_" + id_number).val()
        if (break_value === undefined){break_value = 0}
        total -= break_value
        }
    if (t == 1){total += 1}
    $("#id_total_time_" + id_number).val(total)
    $("#id_start_time_" + id_number).val(f_h + ":" + f_m + ":00")
    $("#id_end_time_" + id_number).val(e_h + ":" + e_m + ":00")
    if (end_time_k <= time_5_00){}
    var i=0
    if (end_time > time_22_00){
        if (t==1){var i=1}
        var nightshift_time = end_time - time_22_00
        $("#id_night_time_" + id_number).val(nightshift_time/60/1000 + i)
    }else if (end_time_k <= time_5_00 && start_time <= time_5_00){
        var nightshift_time = end_time - start_time
        $("#id_night_time_" + id_number).val(nightshift_time/60/1000 + i)
    }else if (end_time_k > time_5_00 && start_time < time_5_00){
        var nightshift_time = time_5_00 - start_time
        $("#id_night_time_" + id_number).val(nightshift_time/60/1000 + i)
    }else{$("#id_night_time_" + id_number).val(0)}
    }
    // 下の行へコピー
    if ((e_h) && (e_m)){
        try{
        end_h = document.getElementById("id_rowstart_time_h_" + (Number(id_number) + 1))
        end_m = document.getElementById("id_rowstart_time_m_" + (Number(id_number) + 1))
        end_h.options[e_h_index].selected = true;
        end_m.options[e_m_index].selected = true;
        }catch(e){}
    }
    totalTime()
    // console.log();
    }
// 合計時間、残業時間
function totalTime(){
    var timeList = []
    var night_timeList = []
    var count = Row_Count;
    for (var i = 0; i < count; i++){
        var time = Number($("#id_total_time_"+i).val());
        var night_time = Number($("#id_night_time_"+i).val());
        if (time > 0){
            timeList.push(time);
            $("#id-all-total-time").val(sum(timeList));
            var time_i = sum(timeList);
        }
        if (night_time > 0){
            night_timeList.push(night_time);
            $("#id-all-night-time").val(sum(night_timeList));
        }
    }
    if (time_i > 480){
        $("#id-all-over-time").val(time_i -= 480)
    }else{
        $("#id-all-over-time").val(0)
    }
};
  //今日の日時を表示
function TodayDate() {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var toTwoDigits = function (num, digit) {
    num += ''
    if (num.length < digit) {
        num = '0' + num
    }
    return num
    }
    var yyyy = toTwoDigits(year, 4)
    var mm = toTwoDigits(month, 2)
    var dd = toTwoDigits(day, 2)
    var ymd = todaydata = yyyy + "-" + mm + "-" + dd
    $("#today").val(ymd)

    return todaydata
};

function row_add(){
    if (Row_Count == 100) { return; }
    var ChildrenClass
    var ChildrenID
    var ChildrenName
    var ChildrenType
    var ClassName
    var IDName
    var LabelText
    var ChildrenElement
    var element
    var Row =  $("#rows_0")[0]
    var Row_ID = "rows_" + Row_Count

    $("#rows_wrapper").append(
        $("<div>",{
            id:Row_ID,
            class:Row.classList,
        }))

    var RowInfoChild = $("#rows_0").children()
    for(var l = 0; l < RowInfoChild.length; l++){
        ClassName = RowInfoChild[l].className
        IDName = RowInfoChild[l].id.substring(0, RowInfoChild[l].id.length-1)+Row_Count
        LabelText = RowInfoChild[l].children[0].innerText
        ChildrenElement = RowInfoChild[l].children[1]
        
        // 親クラス作成
        $("#"+Row_ID).append(
            $("<div>",{
                id:IDName,
                class:ClassName,
            }))

        if (! ChildrenElement){
            ChildrenElement = RowInfoChild[l].children[0]
        }else{
            //ラベル追加 
            $("#"+IDName).append(
                $("<label>",{
                    text:LabelText,
                    class:"iphone_class"
                }))
        }
        element = ChildrenElement.nodeName
        if (element == "INPUT"){
            ChildrenType = ChildrenElement.type
            ChildrenID = ChildrenElement.id.substring(0, ChildrenElement.id.length-1) + Row_Count
            ChildrenName = ChildrenElement.name.substring(0, ChildrenElement.name.length-1) + Row_Count
            ChildrenClass = ChildrenElement.classList
            

            $("#"+IDName).append(
                $("<input>",{
                    type:ChildrenType,
                    id:ChildrenID,
                    name:ChildrenName,
                    class:ChildrenClass,
                }))
            if ($('#'+ChildrenElement.id).prop('disabled')){$("#"+ChildrenID).prop('disabled', true);}
            if ($('#'+ChildrenElement.id).prop('readonly')){$("#"+ChildrenID).prop('readonly', true);}

        }else if (element == "SELECT"){

            ChildrenClass = ChildrenElement.classList
            ChildrenID = ChildrenElement.id.substring(0, ChildrenElement.id.length-1) + Row_Count
            ChildrenName = ChildrenElement.name.substring(0, ChildrenElement.name.length-1) + Row_Count
            ChildrenType = ChildrenElement.type

            var childrenOption = ChildrenElement.children

            $("#"+IDName).append(
                $("<select>",{
                    type:ChildrenType,
                    id:ChildrenID,
                    name:ChildrenName,
                    class:ChildrenClass,
                }))
                // オプション追加
            for (var t = 0; t < childrenOption.length; t++ ){
            $("#"+ChildrenID).append(
                $("<option>").val(childrenOption[t].value).text(childrenOption[t].label)
                )
            }
            if ($('#'+ChildrenElement.id).prop('disabled')){$("#"+ChildrenID).prop('disabled', true);}
            if ($('#'+ChildrenElement.id).prop('readonly')){$("#"+ChildrenID).prop('readonly', true);}

        }else if (element == "DIV"){
            ChildrenClass = ChildrenElement.classList
            ChildrenID = ChildrenElement.id.substring(0, ChildrenElement.id.length-1) + Row_Count
            // 親クラス追加
            $("#"+IDName).append(
                $("<div>",{
                    id:ChildrenID,
                    class:ChildrenClass,
                }))
            // 子クラス追加
            var time_row_h = $("#"+ChildrenElement.id).children()[0]
            var time_ChildrenID = time_row_h.id.substring(0, time_row_h.id.length-1) + Row_Count
            var time_ChildrenClass = time_row_h.classList
            $("#"+ChildrenID).append(
                $("<div>",{
                    id:time_ChildrenID,
                    class:time_ChildrenClass,
                }))
            // 孫セレクト追加
            var time_select = $("#"+time_row_h.id).children()[0]
            var time_Select_id = time_select.id.substring(0, time_select.id.length-1) + Row_Count
            var time_SelectClass = time_select.classList
            $("#"+time_ChildrenID).append(
                $("<select>",{
                    id:time_Select_id,
                    class:time_SelectClass,
                }))
            // オプション追加
            for (var t = 0; t < $("#"+time_row_h.id).children()[0].length; t++ ){
                $("#"+time_Select_id).append(
                    $("<option>").val(time_select[t].value).text(time_select[t].label)
                    )
                }
            // 子クラス追加
            var time_row_m = $("#"+ChildrenElement.id).children()[1]
            time_ChildrenID = time_row_m.id.substring(0, time_row_m.id.length-1) + Row_Count
            time_ChildrenClass = time_row_m.classList
            $("#"+ChildrenID).append(
                $("<div>",{
                    id:time_ChildrenID,
                    class:time_ChildrenClass,
                }))
            // 孫セレクト追加
            var time_select = $("#"+time_row_m.id).children()[0]
            var time_Select_id = time_select.id.substring(0, time_select.id.length-1) + Row_Count
            var time_SelectClass = time_select.classList
            $("#"+time_ChildrenID).append(
                $("<select>",{
                    id:time_Select_id,
                    class:time_SelectClass,
                }))
            // オプション追加
            for (var t = 0; t < $("#"+time_row_m.id).children()[0].length; t++ ){
                $("#"+time_Select_id).append(
                    $("<option>").val(time_select[t].value).text(time_select[t].label)
                )
            }
        }else if (element == "P"){
            ChildrenType = ChildrenElement.type
            ChildrenID = ChildrenElement.id.substring(0, ChildrenElement.id.length-1) + Row_Count
            ChildrenClass = ChildrenElement.classList

            $("#"+IDName).append(
                $("<p>",{
                    type:ChildrenType,
                    id:ChildrenID,
                    class:ChildrenClass,
                    text:Row_Count+1
                }))
        }
    }

    Row_Count += 1;
    totalManageElement.setAttribute('value', Row_Count);
    sessionStorage.setItem("rows",Row_Count);
};

function del(){
    if ( Row_Count == 1 ) { return; }
    $("#rows_"+ (Row_Count-1)).empty()
    $("#rows_"+ (Row_Count-1)).remove();
    Row_Count -= 1;
    
    Time_calculation('id_rowend_time_m_0')
    totalManageElement.setAttribute('value', Row_Count);
    sessionStorage.setItem("rows",Row_Count);
};
function loadFunc(){
    var row = sessionStorage.getItem('rows');
    for(var i = 1; i < row; i++) {
        row_add()
    }
};
function sum(nums) {
	var tol = 0;
	for (var i = 0, len = nums.length; i < len; i++) tol += nums[i];
	return tol;
};
function oneClickbutton(){
    // var select_h = $("#id_rowend_time_h_0").val()
    // var select_m = $("#id_rowend_time_m_0").val()
    var select_h = document.getElementById("id_rowend_time_h_0");
    var select_m = document.getElementById("id_rowend_time_m_0");
// ユーザー設定モードで変更
    select_h.options[10].selected = true;
    select_m.options[4].selected = true;
    select_h.style.color = select_m.style.color = 'black';
    // select_m.style.color = 'black';
    // 
    Time_calculation("id_rowend_time_m_0")
};

function get_text() {
    var tagElement = $(".hisory-record-p");
    var tagLen = tagElement.length;
    while (tagLen > Row_Count) {row_add()}
    for(var i = 0; i < tagLen; i++){
        var table= tagElement[i].children;
        name1("id_constr_number_" + i,table[1].outerText)
        name1("id_work_class_" + i,table[2].outerText)
        name1("id_work_contents_" + i,table[3].outerText)
    }
};
function name1(selectID,selectItem) {
    var select_1 = document.getElementById(selectID)
    var selectLen = select_1.length
    var l = new Array();
    for(var i = 0; i < selectLen; i++){
        l[i] = select_1[i].label
    }
    var selectOptions = l.indexOf(selectItem)
    if(selectOptions > 0 ){
        select_1.options[selectOptions].selected = true;
    }
}
function getRowCol(){
    // var tabelElement = $("#past-report");
    var tabelElement = table = document.getElementById('past-report');
    var copyRows = tabelElement.childElementCount -1
    while (copyRows > Row_Count) {
        row_add()
    }
    var tag = document.getElementsByClassName('hisory-record-p');

    for(var i = 0; i < copyRows; i++){
        var table_0 = table.rows[i+1].cells[0].innerText;
        name1("id_constr_number_" + i,table_0)
        
        var table_1 = table.rows[i+1].cells[1].innerText;
        name1("id_work_class_" + i,table_1)
        
        var table_2 = table.rows[i+1].cells[2].innerText;
        name1("id_work_contents_" + i,table_2)
    }
};
$('#copy-btn').on('click', function() {
});
$("#change_breakMode").click(function(){
    if($("#break_status").val() == 0){
        $(".break_select").prop("disabled", false);
        $("#break_status").val(1)
    }else if($("#break_status").val() == 1){{
        $(".break_select").prop("disabled", true);
        $("#break_status").val(0)
        }
    }
    
    Time_calculation("id_rowend_time_m_0")
})
$("#change_dateMode").click(function(){
    if($("#date_status").val() == 0){
        $(".date_select").prop("disabled", false);
        $("#date_status").val(1)
        $("#today").prop("disabled", true);
    }else if($("#date_status").val() == 1){{
        $(".date_select").prop("disabled", true);
        $("#date_status").val(0)
        $("#today").prop("disabled", false);
        }
    }
    // 
    Time_calculation("id_rowend_time_m_0")
})

function  userArea_timeChange(){
    if ($("#area").val() == "1"){
        $('#id_rowstart_time_h_0').val("8").change();
        $('#id_rowstart_time_m_0').val("10").change();

    }else if ($("#area").val() == "2"){
        $('#id_rowstart_time_h_0').val("8").change();
        $('#id_rowstart_time_m_0').val("00").change();
        // $("#id_rowfarst_time_m_0").val(00)
    
    }
}








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
$('#ajax_addworkclass').on('#work_class_add_button', function(e) {
    // form送信を防止する
    e.preventDefault();
    //$.ajax：サーバに送信するデータの設定
    //.done：通信成功時の処理
    //.fail：通信失敗時の処理
    var text_value = $('#work_class_add').val()
    $.ajax({
        'url': '{% url "ajax_addworkclass" %}',
        'type': 'POST',
        'data': {
            'work_class': "text_value",
        },
        'dataType': 'json'
    })
    // console.log($('#work_class_add').val())
    .done(function(response){
        $("#123").val(response.workclass)
    })
    .fail(function(response){
        console.log(400)
    });
});

$('form').submit(function() {
    console.log($('input[name="Reportdate_0"]').val())
    console.log($("#Row_date").val())
    if ($('input[name="Reportdate_0"]').val() == $("#Row_date").val()){
        if($("#submit-stock").val() == 1){
            return true
        }
        modal_open()
        return false
    }else{
        return true
    }
});

$('#edit-submit').on('click',function(){
    $("#submit-stock").val(1)
    console.log(400)
    $('#report-form').submit();
});




var open = $('.modal-open'),
    close = $('.modal-close'),
    container = $('.modal-container');
function modal_open(){
    container.addClass('active');
}
close.on('click',function(){	
    container.removeClass('active');
});
// return false