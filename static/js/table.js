window.onload = function () {
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var toTwoDigits = function (num, digit) {
        num += ''
        if (num.length < digit) {num = '0' + num}
        return num
        }
    var yyyy = toTwoDigits(year, 4)
    var mm = toTwoDigits(month, 2)
    var dd = toTwoDigits(day, 2)
    $("#today").val(yyyy + "-" + mm + "-" + dd)
}
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
$("#chengeinfo").click (function (e){
    $.ajax({
        'url': "/get_data/",
        'type': 'POST',
        'data': {
            'erea_val': $("#area_select").val(),
            'dept_val': $("#dept_select").val(),
            'day_val':  $("#today").val(),
        },
        'dataType': 'json'
    })

    .done(function(response){
        $('#area_select').val(response.GETparams.return_data_0);
        $('#dept_select').val(response.GETparams.return_data_1);
        $("#today").val(response.GETparams.return_data_2)
        var PastUser = response.PastUser
        $("#p_id").remove();
        $("#past_user").append($("<p id='p_id'>"+"過去に提出された日報があります: " + PastUser[0].date + "</p>"))
        
        
        var data = response.data
        var table = document.getElementById("id");
        while (table.rows.length > 1) table.deleteRow(1);
        if (data != ""){
            for (var i = 0; i < data.length; i++) {
                    if(data[i].Report_Over_time == 0){var l = "×"}else{var l = "〇"}
                    $("#id").append(
                    $("<tr></tr>")
                    .append($("<td></td>").text(data[i].Report_Row_date))
                    .append($("<td></td>").text(data[i].Report_User_name))
                    .append($("<td></td>").text(data[i].Report_User_dept))
                    .append($("<td></td>").text(data[i].Report_Matter_code))
                    .append($("<td></td>").text(data[i].Report_Work_class))
                    .append($("<td></td>").text(data[i].Report_Work_contents))
                    .append($("<td></td>").text(data[i].Report_Rowstart_time))
                    .append($("<td></td>").text(data[i].Report_Rowend_time))
                    .append($("<td></td>").text(data[i].Report_Total_time))
                    .append($("<td></td>").text(l))
                    // .append($("<td></td>").append($('<button type=button class="tabel_index"><img src="/media/images/3.png" alt="編集"width="20px" height="20px"></img></button>')))
                    // .append($("<th></th>").text(data[i].Report_Over_time))
                    // .append($("<th></th>").text(data[i].Report_User_area))
                    // .append($("<th></th>").text(data[i].Report_Night_time))
                    ); 
                }
        }else{$("#id").append($("<tr></tr>").append($("<td></td>").text("該当なし")))}
        // 未提出者表示
        data = response.Noreport_user
        table = document.getElementById("noreport_user_table");
        while (table.rows.length > 1) table.deleteRow(1);
        if (data != ""){
            for (i = 0; i < data.length; i++) {
                    $("#noreport_user_table").append(
                    $("<tr></tr>")
                    .append($("<td></td>").text(data[i]))
                    ); 
                }
        }else{$("#noreport_user_table").append($("<tr></tr>").append($("<td></td>").text("該当なし")))}
        })




















    .fail(function(response){
        console.log(400)
    });
});

















    $(function(){
        // 変数に要素を入れる
        var open = $('.modal-open'),
            close = $('.modal-close'),
            container = $('.modal-container');
    
        //開くボタンをクリックしたらモーダルを表示する
        $('body').on("click","#id tr", function(){
            if($(this).closest('tr').prop('rowIndex') > 0){
                var before_change_data = {
                    "data_1": $(this).children('td')[0].innerText, 
                    "data_2": $(this).children('td')[1].innerText, 
                    "data_3": $(this).children('td')[2].innerText, 
                    "data_4": $(this).children('td')[3].innerText, 
                    "data_5": $(this).children('td')[4].innerText, 
                    "data_6": $(this).children('td')[5].innerText, 
                    "data_7": $(this).children('td')[6].innerText, 
                    "data_8": $(this).children('td')[7].innerText, 
                    "data_9": $(this).children('td')[8].innerText,
                    "data_10":$(this).children('td')[9].innerText,
                    }
                $("#edit_date").   val(before_change_data.data_1)
                $("#edit_name").   val(before_change_data.data_2)
                $("#edit_dept").   val(before_change_data.data_3)
                $("#edit_matter"). val(before_change_data.data_4)
                $("#edit_class").  val(before_change_data.data_5)
                $("#edit_content").val(before_change_data.data_6)
                $("#edit_start").  val(before_change_data.data_7)
                $("#edit_end").    val(before_change_data.data_8)
                $("#edit_total").  val(before_change_data.data_9)

                $("#backup_date").   val(before_change_data.data_1)
                $("#backup_name").   val(before_change_data.data_2)
                $("#backup_dept").   val(before_change_data.data_3)
                $("#backup_matter"). val(before_change_data.data_4)
                $("#backup_class").  val(before_change_data.data_5)
                $("#backup_content").val(before_change_data.data_6)
                $("#backup_start").  val(before_change_data.data_7)
                $("#backup_end").    val(before_change_data.data_8)
                $("#backup_total").  val(before_change_data.data_9)
                container.addClass('active');
                return false;
                }
            });
        //閉じるボタンをクリックしたらモーダルを閉じる
        close.on('click',function(){	
            container.removeClass('active');
        });
    
        //モーダルの外側をクリックしたらモーダルを閉じる
        // $(document).on('click',function(e) {
        //     if(!$(e.target).closest('.modal-body').length) {
        //         container.removeClass('active');
        //     }
        // });
    });


    


    $("#edit-submit").click (function(e){
        $.ajax({
            'url': "/edit_data/",
            'type': 'POST',
            'data': {
                "edit_date":     $("#edit_date").val(),
                "edit_name":     $("#edit_name").val(),
                "edit_dept":     $("#edit_dept").val(),
                "edit_matter":   $("#edit_matter").val(),
                "edit_class":    $("#edit_class").val(),
                "edit_content":  $("#edit_content").val(),
                "edit_start":    $("#edit_start").val(),
                "edit_end":      $("#edit_end").val(),
                "edit_total":    $("#edit_total").val(),
                "backup_date":   $("#backup_date").val(),
                "backup_name":   $("#backup_name").val(),
                "backup_dept":   $("#backup_dept").val(),
                "backup_matter": $("#backup_matter").val(),
                "backup_class":  $("#backup_class").val(),
                "backup_content":$("#backup_content").val(),
                "backup_start":  $("#backup_start").val(),
                "backup_end":    $("#backup_end"). val(),
                "backup_total":  $("#backup_total").val(),
            },
            'dataType': 'json'
        })
        .done(function(response){
            console.log(response.data)
        })
        .fail(function(response){
            console.log(400)
        });

    });



































































        // var ymd = yyyy + "-" + mm + "-" + dd
        // document.getElementById("today").value = today_data =  yyyy + "-" + mm + "-" + dd;
        //var row = id.rows.length;
        //var tableElem = document.getElementById('id');
        //var rowElems = tableElem.rows;
        //var rowElems = tableElem.rows;
        //var spanText = rowElems[1].getElementsByClassName('table-user'); 

        //if (window.name != "any"){
        //    document.getElementById('chengeinfo').click();
        //    window.name = "any";

        //    }
        