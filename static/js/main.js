var obj = new Object();
var obj = {};
var date_obj = new Date();
var today_data = TodayDate()
var break_13_00 = new Date(today_data + " " + 13 + ":" + 00 + ":00")
var time_22_00 = new Date(today_data + " " + 22 + ":" + 00 + ":00")
var time_0_00 = new Date(today_data + " " + 00 + ":" + 00 + ":00")
var time_23_59 = new Date(today_data + " " + 23 + ":" + 59 + ":00")
var time_5_00 = new Date(today_data + " " + 5 + ":" + 00 + ":00")
var totalManageElement = document.querySelector("#id_rows");
var currentChoiceCount = parseInt(totalManageElement.value);

function func(idtime){
    var data = $(idtime).val()
    var area_number = $("#area").val()
    if (idtime in obj){
        if (obj[idtime] != data && data){
            data = Number(data);
            obj[idtime] = data;
            }
        else{obj[idtime] = '';}
    }else{
        if (!data){
            data = Number(data);
            obj[idtime] = data;}
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
    var id_len = idtime.length
    var id_number = idtime.substring(id_len-1,id_len)
    var f_h = $("#id_rowfarst_time_h_"+ id_number).val()
    var f_m = $("#id_rowfarst_time_m_" + id_number).val()
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
        end_h = document.getElementById("id_rowfarst_time_h_" + (Number(id_number) + 1))
        end_m = document.getElementById("id_rowfarst_time_m_" + (Number(id_number) + 1))
        end_h.options[e_h_index].selected = true;
        end_m.options[e_m_index].selected = true;
        }catch(e){}
    }
    totalTime()

    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();
    // console.log();


















};
// 合計時間、残業時間
function totalTime(){
    var timeList = []
    var night_timeList = []
    var count = currentChoiceCount;
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
function get_id(className) {
    var cs=document.getElementsByClassName(className);
    // idd
    var idd= new Array();
    var id= new Array();
    // var o= new Array();
    for (var i=0; i< cs.length;i++){ 
        idd[i]=cs[i].getAttribute("id");
    }
    for (i=0; i< idd.length;i++){ 
        id[i]=idd[i];
        l = id[i].lastIndexOf('_',);
        if (isNaN(Number(idd[i].substr(l+1,l+5)))){
            id[i] = id[i]
        }else{
            id[i] = id[i].substr(3,l)
            l = id[i].lastIndexOf('_',);
            id[i] = id[i].substr(0,l) + "_0"
        }
    }
    id.filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
    var set = new Set(id);
    let setToArr = [...set];
    return setToArr
};
function makeTag(makeID,makeClass,OutID){
    var time_tags = {id:makeID,class:makeClass}
            var time_make_tags = $("<div>",time_tags)
            $("#"+ OutID).append(time_make_tags);
};
function row_add(){
    var id_list = get_id("select_get_class")
    
    if ( currentChoiceCount == 100 ) { return; }

        var rowsid = 'rows_' + currentChoiceCount
        var div = $('<div id='+ rowsid +'></div>');
        $("#rows_wrapper").append(div);
        $("#"+rowsid).addClass($("#rows_0").attr("class"));
    
        for(var i = 0; i < id_list.length; i++) {
        var str_len = id_list[i].length
        var id_name = id_list[i].substring(0, str_len-1)
        //id,name変更
        var id_content = "id_" + id_list[i]
        var nameElement_name = id_name + currentChoiceCount
        var nameElement_id = "id_"+ id_name + currentChoiceCount
        
        var select = $("#"+id_content);

        //クラス取得
        var class_all =select.attr("class");
        //タグ取得
        var tag_name = select.prop("tagName") ;
        //タイプ取得
        var tag_type = select.attr("type");
        //属性取得
        if (tag_name == "SELECT"){
            //select生成 id,name,関数含む
            var tags = {id:nameElement_id,name:nameElement_name}

            if (nameElement_name.includes('farst_time_h')||
                nameElement_name.includes('farst_time_m')||
                nameElement_name.includes('end_time_h')||
                nameElement_name.includes('end_time_m')){

                var class0 =  $("start_time_item_0").attr("class")
                var class1 =  $("#start_time_itemchild_0").attr("class")
                var class2 =  $("#end_time_itemGrandchild_h_0").attr("class")

                var startID_0 = "start_time_item_"+currentChoiceCount
                var startID_1 = "start_time_itemchild_" + currentChoiceCount
                var startID_2 = "start_time_itemGrandchild_h_" + currentChoiceCount
                var startID_3 = "start_time_itemGrandchild_m_" + currentChoiceCount
                
                var endID_0 = "end_time_item_"+currentChoiceCount
                var endID_1 = "end_time_itemchild_" + currentChoiceCount
                var endID_2 = "end_time_itemGrandchild_h_" + currentChoiceCount
                var endID_3 = "end_time_itemGrandchild_m_" + currentChoiceCount

                if (! $("#"+startID_0)[0]){
                    makeTag(startID_0,class0,rowsid)
                    makeTag(startID_1,class1,startID_0)
                    makeTag(startID_2,class2,startID_1)
                    makeTag(startID_3,class2,startID_1)
                    
                    makeTag(endID_0,class0,rowsid)
                    makeTag(endID_1,class1,endID_0)
                    makeTag(endID_2,class2,endID_1)
                    makeTag(endID_3,class2,endID_1)
                    }
                if (nameElement_name.includes('farst_time_h')){
                    tags.onclick = "func('"+ nameElement_id +"')";
                    make_tag = $('<SELECT>',tags);
                    make_tag.attr('required', true);
                    $("#"+startID_2).append(make_tag)

                }else if (nameElement_name.includes('farst_time_m')){
                    tags.onclick = "func('"+ nameElement_id +"')";
                    make_tag = $('<SELECT>',tags);
                    make_tag.attr('required', true);
                    $("#"+startID_3).append(make_tag);

                }else if (nameElement_name.includes('end_time_h')){
                    tags.onclick = "func('"+ nameElement_id +"')";
                    make_tag = $('<SELECT>',tags);
                    make_tag.attr('required', true);
                    $("#"+endID_2).append(make_tag);

                }else if (nameElement_name.includes('end_time_m')){
                    tags.onclick = "func('"+ nameElement_id +"')";
                    make_tag = $('<SELECT>',tags);
                    make_tag.attr('required', true);
                    $("#"+endID_3).append(make_tag);
                }
                
            }else{
                var make_tag = $('<SELECT>',tags);
                // make_tag.required = true;
                if (nameElement_name.includes('break_time')){
                    $(make_tag).attr({'onclick':"func('"+ nameElement_name +"')"});
                    if ($("#break_status").val() == 0){
                        make_tag.prop("disabled", true);
                        make_tag.attr("disabled","disabled");
                    }
                }
                //select追加
                $("#"+rowsid).append(make_tag);
                }
            //オプション追加
            var selectOptions = $("#"+nameElement_id);
            options = $('select[id='+id_content+']').children('option')
            for(var l = 0; l < options.length; l++) {
                option = {value: options[l].value, text:options[l].text};
                option = $("<OPTION>",option)
                selectOptions.append(option);
                }
        }else if (tag_name == "INPUT"){
            var tags={id:nameElement_id ,name:nameElement_name}
            var make_tag = $('<INPUT>',tags);

            if (tag_type == "hidden"){
                make_tag.attr("type","hidden");
            }else if(tag_type == "date"){
                if ($("#date_status").val() == 0){
                    make_tag.prop("disabled", true);
                    make_tag.attr("disabled","disabled");
                }
                make_tag.attr("type","date");
            }
                if (nameElement_name.includes('total_time')){
                    make_tag.readonly = true;
                    make_tag.attr("readonly","readonly");
            }else if (nameElement_name.includes('anydate') && $("#date_status").val() == 0){
                make_tag.prop("disabled", true);
                make_tag.attr("disabled","disabled");
            }
            $("#"+rowsid).append(make_tag);
        }
        //クラス追加
        $("#"+nameElement_id).addClass(class_all);
    }
    currentChoiceCount += 1;
    totalManageElement.setAttribute('value', currentChoiceCount);
    sessionStorage.setItem("rows",currentChoiceCount);
};
function del(){
    if ( currentChoiceCount == 1 ) { return; }
    $("#rows_"+ (currentChoiceCount-1)).empty()
    $("#rows_"+ (currentChoiceCount-1)).remove();
    currentChoiceCount -= 1;
    func('id_rowend_time_m_0')
    totalManageElement.setAttribute('value', currentChoiceCount);
    sessionStorage.setItem("rows",currentChoiceCount);
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
    func("id_rowend_time_m_0")
};
function selectChangeColor(val){
    val.style.color = 'black';
    if( val.value == 0 ){
        val.style.color = '#75757588';
        return
    }else{
        val.style.color = 'black';
    }
};
function get_text() {
    var tagElement = $(".hisory-record-p");
    var tagLen = tagElement.length;
    while (tagLen > currentChoiceCount) {row_add()}
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
    while (copyRows > currentChoiceCount) {
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
    func("id_rowend_time_m_0")
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
    // func("id_rowend_time_m_0")
})
$(function () {
    $('#button-nav-var-jp').on('click', function () {        // js-btnクラスをクリックすると、
        $('.menu-nav-bar').toggleClass('open'); // メニューとバーガーの線にopenクラスをつけ外しする
    })
});
function  userArea_timeChange(){
    if ($("#area").val() == "1"){
        $('#id_rowfarst_time_h_0').val("8").change();
        $('#id_rowfarst_time_m_0').val("10").change();

    }else if ($("#area").val() == "2"){
        $('#id_rowfarst_time_h_0').val("8").change();
        $('#id_rowfarst_time_m_0').val("00").change();
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


$('#button1').click (function() {
    console.log(1)
    alert("クリックされました");
});

