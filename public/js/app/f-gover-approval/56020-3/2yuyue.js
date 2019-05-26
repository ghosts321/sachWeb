
$(document).ready(function () {
    var applyId = '';
    var urlApplyId = GetUrlParamString('applyId'),
        urlToken = GetUrlParamString('token');
    
    if(!IsEmpty(urlApplyId)&&!IsEmpty(urlToken)){
        applyId = urlApplyId;
        putData('token',urlToken);
        $(".pagination").eq(0).hide();
    }
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    var param = {
        url: api_ea+'/eaScrApplyInfo/getCurrenList',
        data: JSON.stringify({
            applyStatus:"2",
            token: getData("token"),
            pageNumber:1,
            pageSize: 20,
            carryUser:"",
            inOutClass: 3,
            applyId:applyId
        })
    };
    
    new cmx.process()
        .turn('callajax', param)
        .turn('buildDepartApplyTable')
        .start();

});

function cmx_preHandle_time(data) {
    var html = [
        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6" style="margin:0;padding:0">',
        '<div class="input-group">',
        '<span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true">日期</i>',
        '</span>',
        '<input type="text" id="yuyueDate" class="form-control" data-plugin="datepicker" data-language="zh-CN" ></div>',
        '</div>',
        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6" style="margin:0;padding:0" >',
        '<div class="input-group">',
        '<span class="input-group-addon">',
        ' <span class="wb-time">时间</span>',
        '</span>',
        '<select type="text" id="yuyueTime" class="timepicker form-control" data-plugin="clockpicker" data-autoclose="true">',
        '<option value="上午工作时间" selected>上午工作时间</option>',
        '<option value="下午工作时间">下午工作时间</option>',
        '</select>',
        '</div>',
        '</div > ',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}


