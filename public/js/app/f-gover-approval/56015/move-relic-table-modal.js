//修复历史信息表格
var count_tr_3 = 0;
$("#addrow-3").unbind("click");
$("#addrow-3").bind("click", function () {
    if($(".department-3 tr").length==0){
        count_tr_3 = count_tr_3 + 1;
    }else{
        count_tr_3 = $(".department-3 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_3 + '</td>',
        '<td><input type="checkbox" name="cmx-row-3"></td>',
        '<td><div class="input-group"><span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input type="text" class="form-control" name="restoretime" data-plugin="datepicker" data-language="zh-CN"></div></td>',
        '<td><input type="text" class="form-control" name="restoremethod"></td>',
        '<td><input type="text" class="form-control" name="restorematerials"></td>',
        '<td><input type="text" class="form-control" name="restoreunit"></td>',
        '</tr>'
    ].join('');
    $(".department-3").append(tr_html);
    $('[data-plugin="datepicker"]').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });
});
$("#deleterow-3").unbind("click");
$("#deleterow-3").bind("click", function () {
        todayHighlight: true; //当为true的时候高亮
        if($(".department-3 tr").length==0){
            
         }else{
             count_tr_3 = $(".department-3 tr").length + 1;
         }
    $('.department-3 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_3 = count_tr_3 - 1;
        }
    });
    for (var i = 1; i <= count_tr_3; i++) {
        $(".department-3 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//病毒识别表格
var count_tr_4 = 0;
$("#addrow-4").unbind("click");
$("#addrow-4").bind("click", function () {
    if($(".department-4 tr").length==0){
        count_tr_4 = count_tr_4 + 1;
    }else{
        count_tr_4 = $(".department-4 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_4 + '</td>',
        '<td><input type="checkbox" name="cmx-row-4"></td>',
        '<td><input type="text" class="form-control" name="virus-recognition"></td>',
        '<td><input type="text" class="form-control" name="virus-instrument"></td>',
        '<td><input type="text" class="form-control" name="virus-times"></td>',
        '<td><input type="text" class="form-control" name="virus-phenomenon"></td>',
        '<td><input type="text" class="form-control" name="virus-results"></td>',
        '</tr>'
    ].join('');
    $(".department-4").append(tr_html);
});
$("#deleterow-4").unbind("click");
$("#deleterow-4").bind("click", function () {
    if($(".department-4 tr").length==0){

     }else{
         count_tr_4 = $(".department-4 tr").length + 1;
     }
    $('.department-4 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_4 = count_tr_4 - 1;
        }
    });
    for (var i = 1; i <= count_tr_4; i++) {
        $(".department-4 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});

//集体技术路线表格
var count_tr_5 = 0;
$("#addrow-5").unbind("click");
$("#addrow-5").bind("click", function () {
    if($(".department-5 tr").length==0){
        count_tr_5 = count_tr_5 + 1;
    }else{
        count_tr_5 = $(".department-5 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_5 + '</td>',
        '<td><input type="checkbox" name="cmx-row-5"></td>',
        '<td><input type="text" class="form-control" name="tech-virus-name"></td>',
        '<td><input type="text" class="form-control" name="tech-name"></td>',
        '<td><input type="text" class="form-control" name="tech-step"></td>',
        '<td><input type="text" class="form-control" name="tech-materials"></td>',
        '<td><input type="text" class="form-control" name="tech-instrument"></td>',
        '</tr>'
    ].join('');
    $(".department-5").append(tr_html);
});
$("#deleterow-5").unbind("click");
$("#deleterow-5").bind("click", function () {
    if($(".department-5 tr").length==0){
     }else{
         count_tr_5 = $(".department-5 tr").length + 1;
     }
    $('.department-5 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_5 = count_tr_5 - 1;
        }
    });
    for (var i = 1; i <= count_tr_5; i++) {
        $(".department-5 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});

//重点文物独立储存表格  
var count_tr_6 = 0;
$("#addrow-6").unbind("click");
$("#addrow-6").bind("click", function () {
    if($(".department-6 tr").length==0){
        count_tr_6 = count_tr_6 + 1;
    }else{
        count_tr_6 = $(".department-6 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_6 + '</td>',
        '<td><input type="checkbox" name="cmx-row-6"></td>',
        '<td><input type="text" class="form-control" name="relic-name"></td>',
        '<td><input type="text" class="form-control" name="relic-level"></td>',
        '<td><input type="text" class="form-control" name="relic-materials"></td>',
        '<td><input type="text" class="form-control" name="relic-box"></td>',
        '<td><input type="text" class="form-control" name="relic-size"></td>',
        '<td><input type="text" class="form-control" name="relic-boxmaterials"></td>',
        '<td><input type="text" class="form-control" name="relic-reason"></td>',
        '</tr>'
    ].join('');
    $(".department-6").append(tr_html);
});
$("#deleterow-6").unbind("click");
$("#deleterow-6").bind("click", function () {
    if($(".department-6 tr").length==0){
     }else{
         count_tr_6 = $(".department-6 tr").length + 1;
     }
    $('.department-6 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_6 = count_tr_6 - 1;
        }
    });
    for (var i = 1; i <= count_tr_6; i++) {
        $(".department-6 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//修复人员
var count_tr_7 = 0;
$("#addrow-7").unbind("click");
$("#addrow-7").bind("click", function () {
    if($(".department-7 tr").length==0){
        count_tr_7 = count_tr_7 + 1;
    }else{
        count_tr_7 = $(".department-7 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_7 + '</td>',
        '<td><input type="checkbox" name="cmx-row-7"></td>',
        '<td><input type="text" class="form-control" name="repPer-name"></td>',
        '<td>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="repPer-man-' + count_tr_7 + '" value="男" type="radio" name="repPer-sex-' + count_tr_7 + '">',
        '<label for="repPer-man-' + count_tr_7 + '">男</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="repPer-female-' + count_tr_7 + '" value="女" type="radio" name="repPer-sex-' + count_tr_7 + '">',
        '<label for="repPer-female-' + count_tr_7 + '">女</label>',
        '</div>',
        '</td>',
        '<td><input type="text" class="form-control" name="repPer-age"></td>',
        '<td><input type="text" class="form-control" name="repPer-title"></td>',
        '<td><input type="text" class="form-control" name="repPer-major"></td>',
        '<td><input type="text" class="form-control" name="repPer-unit"></td>',
        '</tr>'
    ].join('');
    $(".department-7").append(tr_html);
});
$("#deleterow-7").unbind("click");
$("#deleterow-7").bind("click", function () {
    if($(".department-7 tr").length==0){
     }else{
         count_tr_7 = $(".department-7 tr").length + 1;
     }
    $('.department-7 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_7 = count_tr_7 - 1;
        }
    });
    for (var i = 1; i <= count_tr_7; i++) {
        $(".department-7 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//工作安排
var count_tr_8 = 0;
$("#addrow-8").unbind("click");
$("#addrow-8").bind("click", function () {
    if($(".department-8 tr").length==0){
        count_tr_8 = count_tr_8 + 1;
    }else{
        count_tr_8 = $(".department-8 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_8 + '</td>',
        '<td><input type="checkbox" name="cmx-row-3"></td>',
        '<td><div class="input-group"><span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input name="work-startdate" type="text" style="width:100px;"  class="form-control" data-plugin="datepicker" data-language="zh-CN"></div></td>',
        '<td><div class="input-group"><span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input name="work-enddate" type="text"  style="width:100px;" class="form-control" data-plugin="datepicker" data-language="zh-CN"></div></td>',
        '<td><input type="text" class="form-control" name="work-days"></td>',
        '<td><input type="text" class="form-control" name="work-persons"></td>',
        '<td><input type="text" class="form-control" name="work-content"></td>',
        '</tr>'
    ].join('');
    $(".department-8").append(tr_html);
    $('[data-plugin="datepicker"]').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });
});
$("#deleterow-8").unbind("click");
$("#deleterow-8").bind("click", function () {
    if($(".department-8 tr").length==0){
     }else{
         count_tr_8 = $(".department-8 tr").length + 1;
     }
    $('.department-8 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_8 = count_tr_8 - 1;
        }
    });
    for (var i = 1; i <= count_tr_8; i++) {
        $(".department-8 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//项目预算
var count_tr_9 = 0;
$("#addrow-9").unbind("click");
$("#addrow-9").bind("click", function () {
    if($(".department-9 tr").length==0){
        count_tr_9 = count_tr_9 + 1;
    }else{
        count_tr_9 = $(".department-9 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_9 + '</td>',
        '<td><input type="checkbox" name="cmx-row-9"></td>',
        '<td><input type="text" class="form-control" name="fund-name"></td>',
        '<td><input type="text" class="form-control" name="fund-num"></td>',
        '<td><input type="text" class="form-control" name="fund-percent"></td>',
        '</tr>'
    ].join('');
    $(".department-9").append(tr_html);
    $(".department-9 tr").each(function (index) {
        $(this).find("input[name='fund-num']").blur(function () {
            var cost = $(this).val();
            if(cost>cmx.g.sumFunds){
                showAlert({
                    type: 'error',
                    content: '不能超过方案经费预算的总预算'+cmx.g.sumFunds+'万元'
                });
                $(this).val('');
            }else{
                var percent=cost/cmx.g.sumFunds*100;
                $(this).parent().next().find("input").val(percent.toFixed(2)+'%')
            }
        });
    });
});
$("#deleterow-9").unbind("click");
$("#deleterow-9").bind("click", function () {
    if($(".department-9 tr").length==0){
     }else{
         count_tr_9 = $(".department-9 tr").length + 1;
     }
    $('.department-9 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_9 = count_tr_9 - 1;
        }
    });
    for (var i = 1; i <= count_tr_9; i++) {
        $(".department-9 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//费用明细
var count_tr_10 = 0;
$("#addrow-10").unbind("click");
$("#addrow-10").bind("click", function () {
    if($(".department-10 tr").length==0){
        count_tr_10 = count_tr_10 + 1;
    }else{
        count_tr_10 = $(".department-10 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_10 + '</td>',
        '<td><input type="checkbox" name="cmx-row-10"></td>',
        '<td><input type="text" class="form-control" name="cost-name"></td>',
        '<td><input type="text" class="form-control" name="cost-num"></td>',
        '<td><input type="text" class="form-control" name="cost-explain"></td>',
        '<td><input type="text" class="form-control" name="cost-remark"></td>',
        '</tr>'
    ].join('');
    $(".department-10").append(tr_html);
});
$("#deleterow-10").unbind("click");
$("#deleterow-10").bind("click", function () {
    if($(".department-10 tr").length==0){
     }else{
         count_tr_10 = $(".department-10 tr").length + 1;
     }
    $('.department-10 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_10 = count_tr_10 - 1;
        }
    });
    for (var i = 1; i <= count_tr_10; i++) {
        $(".department-10 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//材料、工具器购置表格
var count_tr_11 = 0;
$("#addrow-11").unbind("click");
$("#addrow-11").bind("click", function () {
    if($(".department-11 tr").length==0){
        count_tr_11 = count_tr_11 + 1;
    }else{
        count_tr_11 = $(".department-11 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_11 + '</td>',
        '<td><input type="checkbox" name="cmx-row-11"></td>',
        '<td><input type="text" class="form-control" name="material-name"></td>',
        '<td><input type="text" class="form-control" name="material-model"></td>',
        '<td><input type="text" class="form-control" name="material-place"></td>',
        '<td><input type="text" class="form-control" name="material-brand"></td>',
        '<td><input type="text" class="form-control" name="material-numbers"></td>',
        '<td><input type="text" class="form-control" name="material-price"></td>',
        '<td><input type="text" class="form-control" name="material-sumprice"></td>',
        '<td><input type="text" class="form-control" name="material-remark"></td>',
        '</tr>'
    ].join('');
    $(".department-11").append(tr_html);
});
$("#deleterow-11").unbind("click");
$("#deleterow-11").bind("click", function () {
    if($(".department-11 tr").length==0){
     }else{
         count_tr_11 = $(".department-11 tr").length + 1;
     }
    $('.department-11 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_11 = count_tr_11 - 1;
        }
    });
    for (var i = 1; i <= count_tr_11; i++) {
        $(".department-11 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});
//柜架囊匣配置清单
var count_tr_12 = 0;
$("#addrow-12").unbind("click");
$("#addrow-12").bind("click", function () {
    if($(".department-12 tr").length==0){
        count_tr_12 = count_tr_12 + 1;
    }else{
        count_tr_12 = $(".department-12 tr").length + 1;
    }
    var tr_html = ['<tr>',
        '<td>' + count_tr_12 + '</td>',
        '<td><input type="checkbox" name="cmx-row-12"></td>',
        '<td><input type="text" class="form-control" name="cabcap-name"></td>',
        '<td><input type="text" class="form-control" name="cabcap-size"></td>',
        '<td><input type="text" class="form-control" name="cabcap-material"></td>',
        '<td><input type="text" class="form-control" name="cabcap-number"></td>',
        '</tr>'
    ].join('');
    $(".department-12").append(tr_html);
});
$("#deleterow-12").unbind("click");
$("#deleterow-12").bind("click", function () {
    if($(".department-12 tr").length==0){
     }else{
         count_tr_12 = $(".department-12 tr").length + 1;
     }
    $('.department-12 input[type="checkbox"]').each(function () {
        if ($(this).is(":checked")) {
            $(this).parent().parent().remove();
            count_tr_12 = count_tr_12 - 1;
        }
    });
    for (var i = 1; i <= count_tr_12; i++) {
        $(".department-12 tr").each(function (index) {
            if ((index + 1) == i) {
                $(this).find("td").first().html(i);
            }
        })
    }
});