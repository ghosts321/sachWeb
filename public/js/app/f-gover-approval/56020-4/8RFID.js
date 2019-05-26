$(document).ready(function () {
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    cmx.g.inOutClass = '4';
    $.getScript('/js/app/f-gover-approval/56020-1/8RFIDModal.js');
});
