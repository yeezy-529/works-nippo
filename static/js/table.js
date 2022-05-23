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
                    .append($("<td></td>").append($('<img src="/media/images/3.png" alt="編集"width="20px" height="20px"></img>')))
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
        