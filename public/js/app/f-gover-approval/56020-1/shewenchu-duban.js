var getPersonalDetailsData = public_url + 'data/app/f-gover-approval/56020-1/getPersonalDetails.json';
var getExhibitionDetailsData = public_url + 'data/app/f-gover-approval/56020-1/getExhibitionDetails.json';
var getDetailsModal = public_url + 'app/f-gover-approval/56020-1/include/getDetailsModal.html';
var getAcceptanceNoticeModal = public_url + 'app/f-gover-approval/56020-1/include/acceptance-notice.html';

$(document).ready(function () {
    // 获取列表
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    // 机构数据字典
    cmx_ReviewInst('#reviewInst');
    var param = {
        pageNumber: 1,
        pageSize: 20,
        token: getData("token")
    }
    //首次加载
    pageLeft(param);

    // 查询
    $("#search-btn").off("click");
    $("#search-btn").on("click", function () {
        param.inOutClass = $("#inOutClass").val();
        param.reviewInst = $("#reviewInst").val();
        param.appUserId = $("#appUserId").val();
        param.carryUser = $("#carryUser").val();
        param.acceptNum = $("#acceptNum").val();
        param.applyStatus = $("#applyStatus").val();
        param.applyClass = $("#applyClass").val();
        pageLeft(param);
    });
    // 清除
    $("#clear-search-form").off("click");
    $("#clear-search-form").on("click", function () {
        $("#inOutClass").val("");
        $("#reviewInst").val("");
        $("#appUserId").val("");
        $("#carryUser").val("");
        $("#acceptNum").val("");
        $("#applyStatus").val("");
        $("#applyClass").val("");
    });
    // 更多条件
    var num = true;
    $("#show-hide-info").off("click");
    $("#show-hide-info").on("click", function () {
        if (num == true) {
            num = false;
            show_condition();
        } else {
            num = true;
            hide_condition();
        }
    });

});
function pageLeft(page) {
    page.token = getData("token");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/getSuperviseHandle',
            data: JSON.stringify(page)
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData.data) && prevModelData.state == '200') {
                console.log(prevModelData.data);
                var data = prevModelData.data.dataList;
                $("#cmx-auditFinished-table").empty();
                for (var i = 0; i < data.length; i++) {
                    var html = '';
                    var AcceptNum = data[i].acceptNum ? data[i].acceptNum : '';
                    var applyId = data[i].applyId;
                    var finshDate = data[i].finshDate;
                    var destination = data[i].destination == null ? '' : data[i].destination;
                    var acceptNum = data[i].acceptNum == null ? '' : data[i].acceptNum;
                    var applyStatus = data[i].applyStatus;
                    var reserveDate = data[i].reserveDate == null ? '' : data[i].reserveDate;
                    var resDatePar = data[i].resDatePar == null ? '' : data[i].resDatePar;
                    var node = {
                        "2": "预约",
                        "3": "受理",
                        "4": "分办",
                        "5": "登记",
                        "6": "查验",
                        "8": "审批",
                        "9": "办结",
                        "N": "不予受理",
                        "O":"一次性补正",
                        "B":"不予预约"
                    }
                    if(data[i].inOutClass==1){
                        node[6]=='鉴定';
                    }
                    var acceptDate=data[i].acceptDate;
                    if (IsEmpty(acceptDate)) {
                        acceptDate = '';
                    } else {
                        acceptDate = format(acceptDate);
                    }
                    if (IsEmpty(finshDate)) {
                        finshDate = '';
                    } else {
                        finshDate = format(finshDate);
                    }
                    if(applyStatus != "9"){
                        var operation = '<button class="btn btn-xs btn-primary">催办</button>';
                    }else{
                        var operation = '';
                    }
                    var font_color = data[i].applyClassName == '展览' ? "#70A532" : "#926dde";
                    html = ['<tr style="color:' + font_color + '" class="exitList cursorPointer" data-id="' + applyId + '" data-applyClass="' + data[i].applyClass + '">',
                    '<td>' + data[i].inOutClassName + '</td>',
                    '<td>' + data[i].carryUser + '</td>',
                    '<td>' + data[i].appUserName + '</td>',
                    '<td>' + data[i].applyClassName + '</td>',
                    '<td>' + node[applyStatus] + '</td>',
                    '<td>' + destination + '</td>',
                    
                    '<td>' + acceptNum + '</td>',
                    '<td>' + reserveDate +' '+ resDatePar + '</td>',
                    '<td>' + acceptDate + '</td>',
                    '<td>' + finshDate + '</td>',
                    '<td>' + format(data[i].applyDate) + '</td>',
                    // '<td>' + operation + '</td>',
                        '</tr>'].join('');
                    $("#cmx-auditFinished-table").append(html);
                }
                // 分页   
                $("#left-count").val(prevModelData.data.pageNumber);
                $("#left-total").text(prevModelData.data.pages);
                $("#left-next").off("click");
                $("#left-next").on("click", function () {
                    if (prevModelData.data.pageNumber == prevModelData.data.pages) {
                        showAlert({
                            type: "info",
                            content: "已经是最后一页"
                        })
                    } else {
                        page.pageNumber = prevModelData.data.pageNumber + 1;
                        pageLeft(page);
                    }
                });
                $("#left-prev").off("click");
                $("#left-prev").on("click", function () {
                    if (prevModelData.data.pageNumber == 1) {
                        showAlert({
                            type: "info",
                            content: "已经是第一页"
                        })
                    } else {
                        page.pageNumber = prevModelData.data.pageNumber - 1;
                        pageLeft(page);
                    }
                });
                $("#left-last").off("click");
                $("#left-last").on("click", function () {
                    page.pageNumber = prevModelData.data.pages;
                    pageLeft(page);
                });
                $("#left-first").off("click");
                $("#left-first").on("click", function () {
                    page.pageNumber = 1;
                    pageLeft(page);
                });
                $("#left-count").off('blur');
                $("#left-count").blur(function () {
                    var val = $(this).val();
                    if (!isNaN(val)) {
                        if (val >= 1 && val <= prevModelData.data.pages) {
                            page.pageNumber = val;
                            pageLeft(page);
                        } else {
                            showAlert({
                                type: 'info',
                                content: "请输入有效数字"
                            })
                        }
                    } else {
                        showAlert({
                            type: 'info',
                            content: "请输入有效数字"
                        })
                    }
                });
                send.go();
            }
        })
        .turn(function (prevModelData, send, abort) {
            $('.exitList').off('click');
            $('.exitList').on('click', function () {
                waitProcess(560203);
                showLoading();
                var applyId = $(this).attr('data-id');
                var applyClass = $(this).attr('data-applyClass');
                $('#cmx-getDetails-modal').empty();
                if (applyClass == 1) {
                    $('#cmx-getDetails-modal').load(getDetailsModal, function () {
                        $('#getDetails-modal').modal('show');
                        $('#getDetails-modal').off('shown.bs.modal');
                        $('#getDetails-modal').on('shown.bs.modal', function () {
                            getDetails(getExhibitionDetailsData, applyId);
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                                    data: JSON.stringify({
                                        token: getData('token'),
                                        applyId: applyId
                                    })
                                })
                                .turn(function (prevModelData, send, abort) {
                                    if (!IsNull(prevModelData.data) && prevModelData.state == '200') {
                                        $("#cmx-1-CarryUser").val(prevModelData.data.carryUser);
                                        $("#cmx-1-Destination").val(prevModelData.data.destination);
                                        $("#cmx-1-TelNO").val(prevModelData.data.telNo);
                                        $("#cmx-1-IDNumber").val(prevModelData.data.idnumber);
                                        $("#cmx-1-Address").val(prevModelData.data.address);
                                        $("#cmx-1-CustomsID").val(prevModelData.data.customsId);
                                        $("#cmx-1-Time").val(prevModelData.data.turnDate);
                                        $("#cmx-1-Nationality").val(prevModelData.data.nationalityName);
                                        $("#cmx-1-IDCardType").val(prevModelData.data.idcardType == 'X' ? prevModelData.data.otherCard : prevModelData.data.idCardTypeName);
                                        $("#cmx-1-ReviewInst").val(prevModelData.data.reviewInstName);
                                        $("#cmx-z-name").val(prevModelData.data.exhibitName);
                                        $("#cmx-z-unit").val(prevModelData.data.applyUnit);
                                        $("#cmx-z-startTime").val(prevModelData.data.dateBeg);
                                        $("#cmx-z-endTime").val(prevModelData.data.dateEnd);
                                        $("#cmx-z-director").val(prevModelData.data.leader);
                                        $("#cmx-z-competentUnit").val(prevModelData.data.manageUnit);
                                        $("#cmx-z-externalInstitution").val(prevModelData.data.externalInst);
                                        $("#cmx-z-organizer").val(prevModelData.data.organizer);
                                        $("#cmx-z-licenseNumber").val(prevModelData.data.permitNo);
                                        $("#cmx-z-exhibitionVenue").val(prevModelData.data.exhibitAddr);
                                        $("#cmx-z-approvalDocuments").val(prevModelData.data.fileName);
                                    } else {
                                        showAlert({
                                            type: 'error',
                                            content: prevModelData.msg
                                        });
                                    }
                                })
                                .start();
                        });
                        hideLoading(560203);
                    })
                } else if (applyClass == 2) {
                    $('#cmx-getDetails-modal').load(getDetailsModal, function () {
                        $('#getDetails-modal').modal('show');
                        $('#getDetails-modal').off('shown.bs.modal');
                        $('#getDetails-modal').on('shown.bs.modal', function () {
                            getDetails(getPersonalDetailsData, applyId);
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                                    data: JSON.stringify({
                                        token: getData('token'),
                                        applyId: applyId
                                    })
                                })
                                .turn(function (prevModelData, send, abort) {
                                    if (!IsNull(prevModelData.data) && prevModelData.state == '200') {
                                        $('#cmx-1-CarryUser').val(prevModelData.data.carryUser);
                                        $('#cmx-1-Nationality').val(prevModelData.data.nationalityName);
                                        $('#cmx-1-Destination').val(prevModelData.data.destination);
                                        $('#cmx-1-CustomsID').val(prevModelData.data.customsId);
                                        $('#cmx-1-TelNO').val(prevModelData.data.telNo);
                                        $("#cmx-1-IDCardType").val(prevModelData.data.idcardType == 'X' ? prevModelData.data.otherCard : prevModelData.data.idCardTypeName);
                                        $('#cmx-1-IDNumber').val(prevModelData.data.idnumber);
                                        $('#cmx-1-ReviewInst').val(prevModelData.data.reviewInstName);
                                        $('#cmx-1-Address').val(prevModelData.data.address);
                                    } else {
                                        showAlert({
                                            type: 'error',
                                            content: prevModelData.msg
                                        });
                                    }
                                })
                                .start();
                        });
                        hideLoading(560203);
                    })
                }
            })
        })
        .start();
}

// 获取机构
function cmx_ReviewInst(element) {
    var option = '';
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/inst/aaSachinst/getEntityListByJC',
            data: {
                token: getData("token")
            },
            jsonheader: false
        })
        .turn(function (prevModelData, send, abort) {
            if (prevModelData.state == "200" && !IsEmpty(prevModelData)) {
                var ReviewInst = prevModelData.data;
                for (var i in ReviewInst) {
                    option += '<option value="' + ReviewInst[i].instId + '">' + ReviewInst[i].instName + '</option>';
                }
                $(element).append(option);
            } else {
                showAlert({
                    type: 'error',
                    content: prevModelData.msg
                })
            }
        })
        .start();
}

function hide_condition() {
    $('.condition-info').css('display', 'none');
    $('#show-hide-info').html('更多条件' +
        '<i class="icon wb-chevron-down" aria-hidden="true"></i>');
}

function show_condition() {
    $('.condition-info').css('display', 'block');
    $('#show-hide-info').html('收起条件' +
        '<i class="icon wb-chevron-up" aria-hidden="true"></i>');
}