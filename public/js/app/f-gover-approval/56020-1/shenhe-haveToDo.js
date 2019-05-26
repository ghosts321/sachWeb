var getPersonalDetailsData = public_url + 'data/app/f-gover-approval/56020-1/getPersonalDetails.json';
var getExhibitionDetailsData = public_url + 'data/app/f-gover-approval/56020-1/getExhibitionDetails.json';
var getDetailsModal = public_url + 'app/f-gover-approval/56020-1/include/getDetailsModal.html';
var getAcceptanceNoticeModal = public_url + 'app/f-gover-approval/56020-1/include/acceptance-notice.html';

$(document).ready(function () {
    // 获取列表
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    //首次加载
    // cmx_ReviewInst('#reviewInst');
    var param = {
        pageNumber: 1,
        pageSize: 20,
        token: getData("token"),
        inOutClass: '',
        singCardNum: ''
    }
    //首次加载
    pageLeft(param);

    // 查询
    $("#search-btn").off("click");
    $("#search-btn").on("click", function () {
        param.inOutClass = $("#inOutClass").val();
        // param.reviewInst = $("#reviewInst").val();
        param.appUserId = $("#appUserId").val();
        param.carryUser = $("#carryUser").val();
        param.acceptNum = $("#acceptNum").val();
        //单证类型、审批号、单证编号搜索
        param.singCardType = $("#documentType").val();
        param.singCardNum = $("#singCardNum").val();
        param.handStatus = $("#handStatus").val();
        param.rfidStatus = $("#rfidStatus").val();
        param.applyClass = $("#applyClass").val();
        param.idnumber = $("#idnumber").val();
        param.relicName = $("#relicName").val();
        // param.approvalNumber = $("#documentType").val();


        pageLeft(param);
    });
    // 清除
    $("#clear-search-form").off("click");
    $("#clear-search-form").on("click", function () {
        $("#inOutClass").val("");
        // $("#reviewInst").val("");
        $("#appUserId").val("");
        $("#carryUser").val("");
        $("#acceptNum").val("");
        $("#documentType").val("");
        $("#singCardNum").val("");
        $("#approvalNumber").val("");
        $("#handStatus").val("");
        $("#rfidStatus").val("")
        $("#applyClass").val("")

        $("#idnumber").val('');
        $("#relicName").val('');

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
            url: api_ea + '/eaScrQuery/getAuditFinished',
            data: JSON.stringify(page),
            async: false
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsEmpty(prevModelData.data) && prevModelData.state == '200') {
                console.log(prevModelData.data);
                var data = prevModelData.data.dataList;
                $("#cmx-auditFinished-table").empty();
                for (var i = 0; i < data.length; i++) {
                    var html = '';
                    var applyId = data[i].applyId;
                    var finshDate = data[i].finshDate;
                    var acceptDate = data[i].acceptDate;
                    var destination = IsEmpty(data[i].destination) ? '' : data[i].destination;
                    var reserveDate = data[i].reserveDate == null ? '' : data[i].reserveDate;
                    // var resDatePar = data[i].resDatePar == null ? '' : data[i].resDatePar;
                    finshDate = IsEmpty(finshDate) ? '' : format(finshDate);
                    acceptDate = IsEmpty(acceptDate) ? '' : format(acceptDate);
                    var font_color = data[i].applyClassName == '展览' ? "#70A532" : "#926dde";
                    var button = "";
                    if (data[i].cardType) {
                        for (var j = 0; j < data[i].cardType.length; j++) {
                            button += '<button func-id="0101030402000000" class="btn btn-success finsh-button btn-xs" data-id="' + applyId + '">' + data[i].cardType[j] + '</button>'
                        }
                    }
                    html = ['<tr style="color:' + font_color + '" class="exitList" data-id="' + applyId + '" data-applyClass="' + data[i].applyClass + '">',
                        '<td>' + data[i].inOutClassName + '</td>',
                        '<td>' + data[i].carryUser + '</td>',
                        '<td>' + data[i].appUserName + '</td>',
                        '<td>' + data[i].applyClassName + '</td>',
                        '<td>' + destination + '</td>',
                        '<td>' + data[i].acceptNum + '</td>',
                        // '<td>' + reserveDate +' '+ resDatePar + '</td>',
                        '<td>' + acceptDate + '</td>',
                        '<td>' + finshDate + '</td>',
                        '<td>' + data[i].rfidStatusName + '</td>',
                        '<td>' + data[i].handStatusName + '</td>',
                        '<td>' + data[i].submitDate + '</td>',
                        '</tr>',
                        '<tr style="border-bottom: 2px solid #62a8ea;">',
                        '<td colspan="1">单证类型',
                        '</td >',
                        '<td colspan="13" style="text-align: left;">',
                        button,
                        '<span style="float: right;line-height: 31.4px;margin-right: 10px;">' + format(data[i].applyDate) + '</span>',
                        '</td >',
                        '</tr >'
                    ].join('');
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
            $('.finsh-button').off('click');
            $('.finsh-button').on('click', function () {
                var applyId = $(this).attr('data-id');
                switch ($(this).text()) {
                    case '查看通知':
                        $('#cmx-getDetails-modal').empty();
                        $('#cmx-getDetails-modal').load(getAcceptanceNoticeModal, function () {
                            $('#acceptance-notice-modal').off('shown.bs.modal');
                            $('#acceptance-notice-modal').on('shown.bs.modal', function () {
                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_ea + '/eaScrQuery/getAuditFinished',
                                        data: JSON.stringify({
                                            token: getData('token'),
                                            applyId: applyId,
                                            pageNumber: 1,
                                            pageSize: 20,
                                            inOutClass: $("#inOutClass").val(),
                                            appUserId: $("#appUserId").val(),
                                            carryUser: $("#carryUser").val(),
                                            acceptNum: $("#acceptNum").val(),
                                            singCardType: $("#documentType").val(),
                                            singCardNum: $("#singCardNum").val(),
                                            handStatus: $("#handStatus").val(),
                                            rfidStatus: $("#rfidStatus").val(),
                                            idnumber: $("#idnumber").val(),
                                            relicName: $("#relicName").val()
                                        })
                                    })
                                    .turn(function (prevModelData, send, abort) {
                                        if (!IsEmpty(prevModelData.data) && prevModelData.state == '200') {
                                            $('.n1-p').text('受理通知书');
                                            $('.n1-p11').text('相关所有申报材料齐全，符合受理条件，现予受理。此事项法定办结时限为20个工作日。我局承诺依法自受理之日起20个工作日内作出许可或不予许可决定。');
                                            $('.n1-p0').text(prevModelData.data.dataList[0].inOutClassName);
                                            $('.n1-p1').text(format2(prevModelData.data.dataList[0].acceptDate));
                                            $('.n1-p3').text(prevModelData.data.dataList[0].acceptNum);
                                            $('.n1-p4').text(prevModelData.data.dataList[0].appUserName);
                                            $('.n1-p5').text(prevModelData.data.dataList[0].appTelNo);
                                            $('.n1-p7').text('《' + prevModelData.data.dataList[0].inOutClassName + '申请》');
                                            $('.n1-p9').text(format2(prevModelData.data.dataList[0].acceptDate));
                                        } else {
                                            showAlert({
                                                type: 'error',
                                                content: prevModelData.msg
                                            });
                                        }
                                    })
                                    .start();
                            });
                            $('#acceptance-notice-modal').modal('show');
                        })
                        break;
                    case '文物出境许可':
                        window.open(api_ea + '/eaScrSingleCard/RelicLicence?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '复仿制品证明':
                        window.open(api_ea + '/eaScrSingleCard/RelicReplica?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '禁止出境登记':
                        window.open(api_ea + '/eaScrSingleCard/RelicBanExit?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '临时进境登记':
                        window.open(api_ea + '/eaScrSingleCard/RelicTempComeAppReg?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '出境审核申请':
                        window.open(api_ea + '/eaScrSingleCard/RelicExitAppAudit?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '文物临时出境':
                        window.open(api_ea + '/eaScrSingleCard/RelicTempComeProve?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '临出文物复进':
                        window.open(api_ea + '/eaScrSingleCard/RelicTempComeRepEnterPro?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '临时进境展览':
                        window.open(api_ea + '/eaScrSingleCard/RelicTempEnterExhibit?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    case '临进展览复出':
                        window.open(api_ea + '/eaScrSingleCard/RelicTempEnterExhibitRepCome?token=' + getData("token") + '&applyId=' + applyId);
                        break;
                    default:
                        break;
                }
            })
            $('.exitList').off('click');
            $('.exitList').on('click', function () {
                waitProcess(560202);
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
                                    if (!IsEmpty(prevModelData.data) && prevModelData.state == '200') {
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
                        hideLoading(560202);
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
                                    if (!IsEmpty(prevModelData.data) && prevModelData.state == '200') {
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
                        hideLoading(560202);
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