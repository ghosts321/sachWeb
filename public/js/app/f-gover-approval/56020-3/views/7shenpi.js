cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        var data = param.dataList;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var applyId = data[i].applyId;
            var customsId = data[i].customsId;
            var appUserName = data[i].appUserName;
            var carryUser = data[i].carryUser;
            var state = data[i].inOutClassName + data[i].flowStatus;
            var processState = '出境申请审批';
            var applyTime = data[i].applyDate;
            var applyStatus = data[i].applyStatus;
            var applyClassName = data[i].applyClassName;
            var custPurposeName = '';
            var font_color = '';
            var isApprove = data[i].isApprove == '1' ? '' : 'disabled';
            if (applyClassName == '展览') {
                custPurposeName = data[i].destination;
                font_color = "#70A532";
            } else {
                custPurposeName = data[i].destination;
                font_color = "#926dde";
            }
          

            html = ['<tr style="color:' + font_color + '"  data-color="' + font_color + '" class="exitList" data-id="' + applyId + '">',
            '<td>' + customsId + '</td>',
            '<td>' + custPurposeName + '</td>',
            '<td>' + appUserName + '</td>',
            '<td data-applyId="' + data[i].applyId + '" data-applyClass="' + data[i].applyClass + '" class="applyDetail cursorPointer">' + carryUser + '</td>',
            '<td>' + state + '</td>',
                '</tr>',
                '<tr style="border-bottom: 2px solid #62a8ea;">',
                '<td colspan="6" style="text-align: left;">',
                showPointButton(applyId,data[i].applyStatus),
            '<button func-id="0101030102130100" data-id="' + applyId + '" style="margin:5px;" class="btn btn-primary btn-xs cmx-shenpi">审批</button><button func-id="0101030102130200" data-id="' + applyId + '"  style="margin:5px;" class="btn btn-primary btn-xs exit-application-print" ' + isApprove + '>打印</button>',
            '<button func-id="0101030102130300" data-id="' + applyId + '" style="margin:5px;" class="btn btn-primary btn-xs cmx-accept" ' + isApprove + '>办结</button><button func-id="0101030102130400" data-id="' + applyId + '"  style="margin:5px;" class="btn btn-primary btn-xs cmx-refuse">退回</button>',
            '<span style="float: right;line - height: 31.4px;margin - right: 10px;">' + applyTime + '</span>',
                '</td >',
                '</tr >'].join('');
            $("#cmx-shenpi-table").append(html);
        }


        showApplyDetail(3);
        if (data.length > 0) {
            loadWenwuList(data[0].applyStatus, data[0].applyId, 1, 20);
        }
        // 左右菜单关联
        $(".exitList").each(function (index) {
            $(this).unbind('click');
            $(this).on('click', function () {
                $(".exitList").each(function () {
                    $(this).removeClass("info").css('color', $(this).attr('data-color'));
                })
                $(this).addClass("info").css('color', 'white');
                loadWenwuList($(this).attr('data-applyStatus'), $(this).attr('data-id'), 1, 20);
            });
        });
        //查看通知
        showPointDetails();
        // 打印
        $(".exit-application-print").off('click');
        $(".exit-application-print").on('click', function () {
            $('#cmx-getDetails-modal').empty();
            $("#cmx-print-modal").empty();
            var applyId = $(this).attr("data-id");
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaScrRelicInfo/selectNotApprove',
                    data: JSON.stringify({
                        token: getData('token'),
                        applyId: applyId
                    })
                })
                .turn(function (prevModelData, send, abort) {
                    console.log(prevModelData);
                    if (prevModelData.state == '200') {
                        if (prevModelData.data == 0) {
                            $("#cmx-print-modal").load(getPrintModal, function () {
                                $('#cmx-applyForExhibition-info').off('shown.bs.modal');
                                $('#cmx-applyForExhibition-info').on('shown.bs.modal', function () {
                                    printJson();

                                    var token = getData("token");
                                    $("#printGo").off('click');
                                    $("#printGo").on('click', function () {
                                        var type = $("#cmx-30-sort").val();
                                        window.open(api_ea + '/eaScrSingleCard/approvePrint?token=' + token + '&applyId=' + applyId + '&type=' + type + '&printDown=0');
                                    });
                                    $("#downLoad").off('click');
                                    $("#downLoad").on('click', function () {
                                        var type = $("#cmx-30-sort").val();
                                        window.open(api_ea + '/eaScrSingleCard/approvePrint?token=' + token + '&applyId=' + applyId + '&type=' + type + '&printDown=1');
                                    });
                                });
                                $('#cmx-applyForExhibition-info').modal('show');
                            });
                        } else {
                            showAlert({
                                type: 'error',
                                content: '请先审批'
                            })
                        }
                    }
                })
                .start();
        })

        //退回审批
        $(".cmx-refuse").off("click", function () { });
        $(".cmx-refuse").on("click", function () {
            var applyId = $(this).attr('data-id');
            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '确定要退回审批信息吗？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrRelicInfo/rollBackApprove',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('distribute-back')
                            .start();
                    }
                }
            })
        });

        //审批
        $(".cmx-shenpi").off("click", function () { });
        $(".cmx-shenpi").on("click", function () {
            var applyId = $(this).attr('data-id');
            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '审批后不可修改，是否全部审批？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel
                    if (_state == 'yes') {
                        // alert(applyId);
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrRelicInfo/selectNotApprove',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('shenpi-select', applyId)
                            .start();
                    }
                }
            })
        });
        //办结
        $(".cmx-accept").off("click", function () { });
        $(".cmx-accept").on("click", function () {
            var applyId = $(this).attr('data-id');
            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '办结后业务不能退回，是否确定？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/flowEnd',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('shenpi-banjie')
                            .start();
                    }
                }
            })
        });

        // 分页

        $("#left-count").val(param.pageNumber);
        $("#left-total").text(param.pages);
        $("#left-next").off("click");
        $("#left-next").on("click", function () {
            if (param.pageNumber == param.pages) {
                showAlert({
                    type: "info",
                    content: "已经是最后一页"
                })
            } else {
                var data = {
                    applyStatus: "5",
                    token: getData("token"),
                    pageNumber: param.pageNumber + 1,
                    pageSize: param.pageSize
                }
                pageLeft(data);
            }
        });
        $("#left-prev").off("click");
        $("#left-prev").on("click", function () {
            if (param.pageNumber == 1) {
                showAlert({
                    type: "info",
                    content: "已经是第一页"
                })
            } else {
                var data = {
                    applyStatus: "5",
                    token: getData("token"),
                    pageNumber: param.pageNumber - 1,
                    pageSize: param.pageSize
                }
                pageLeft(data);
            }
        });
        $("#left-last").off("click");
        $("#left-last").on("click", function () {
            var data = {

                applyStatus: "5",
                token: getData("token"),
                pageNumber: param.pages,
                pageSize: param.pageSize
            }
            pageLeft(data);
        });
        $("#left-first").off("click");
        $("#left-first").on("click", function () {
            var data = {

                applyStatus: "5",
                token: getData("token"),
                pageNumber: 1,
                pageSize: param.pageSize
            }
            pageLeft(data);
        });
        $("#left-count").off('blur');
        $("#left-count").blur(function () {
            var val = $(this).val();
            if (!isNaN(val)) {
                if (val >= 1 && val <= param.pages) {
                    var data = {

                        applyStatus: "5",
                        token: getData("token"),
                        pageNumber: val,
                        pageSize: param.pageSize
                    }
                    pageLeft(data);
                } else {
                    showAlert({
                        type: 'info',
                        content: "请输入有效数字"
                    });
                }
            } else {
                showAlert({
                    type: 'info',
                    content: "请输入有效数字"
                });
            }
        });
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

function pageLeft(page) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/getCurrenList',
            data: JSON.stringify({
                token: getData("token"),
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
                carryUser: "",
                applyStatus: '8',
                inOutClass: 3,
                applyId: ''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}
function loadWenwuList(applyStatus, applyId, pageNumber, pageSize) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaScrRelicInfo/selectRelicListByRelApplyID",
            data: JSON.stringify({
                applyId: applyId,
                pageNumber: pageNumber,
                pageSize: pageSize,
                token: getData("token")
            })
        })
        .turn('bulidRelicInfoWorkbenchTable', {
            applyStatus: applyStatus,
            applyId: applyId
        })
        .turn('selectRelicFews', {
            applyId: applyId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            applyStatus: applyStatus
        })
        .start();
}
//Ace-2
// 获取文物列表
cmx.route.view({
    index: 'bulidRelicInfoWorkbenchTable',
    resolve: function (param) {
        var data = param.data.dataList;
        var pageInfo = param.data;
        console.log(data);

        var applyStatus = param.applyStatus;
        console.log(applyStatus);
        $("#relicList").empty();
        if (data) {
            relicListShenpi(data,pageInfo,3);
        } else {
            $("#relicTotal").text('共0条')
        }

        warnRelic();
        // 分页

        if (data) {
            var pageNumber = Number(pageInfo.pageNumber),
                pageSize = Number(pageInfo.pageSize),
                pages = pageInfo.pages;
        } else {
            var pageNumber = 1,
                pageSize = 1,
                pages = 1;
        }

        $("#right-count").val(pageNumber);
        $("#right-total").text(pages);
        $("#right-next").off("click");
        $("#right-next").on("click", function () {
            if (pageNumber == pages) {
                showAlert({
                    type: "info",
                    content: "已经是最后一页"
                });
            } else {
                var page = {
                    pageNumber: pageNumber + 1,
                    pageSize: pageSize,
                    applyId: data[0].applyId,
                    applyStatus: applyStatus
                }
                pageRight(page);
            }
        });
        $("#right-prev").off("click");
        $("#right-prev").on("click", function () {
            if (pageNumber == 1) {
                showAlert({
                    type: "info",
                    content: "已经是第一页"
                })
            } else {
                var page = {
                    pageNumber: pageNumber - 1,
                    pageSize: pageSize,
                    applyId: data[0].applyId,
                    applyStatus: applyStatus
                }
                pageRight(page);
            }
        });
        $("#right-last").off("click");
        $("#right-last").on("click", function () {
            var page = {
                pageNumber: pages,
                pageSize: pageSize,
                applyId: data[0].applyId,
                applyStatus: applyStatus
            }
            pageRight(page);
        });
        $("#right-first").off("click");
        $("#right-first").on("click", function () {
            var page = {
                pageNumber: 1,
                pageSize: pageSize,
                applyId: data[0].applyId,
                applyStatus: applyStatus
            }
            pageRight(page);
        });
        $("#right-count").off('blur');
        $("#right-count").blur(function () {
            var val = $(this).val();
            if (!isNaN(val)) {
                if (val >= 1 && val <= pages) {
                    var page = {
                        pageNumber: val,
                        pageSize: pageSize,
                        applyId: data[0].applyId,
                        applyStatus: applyStatus
                    }
                    pageRight(page);
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


    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

function pageRight(page) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaScrRelicInfo/selectRelicListByRelApplyID",
            data: JSON.stringify({
                applyId: page.applyId,
                pageNumber: Number(page.pageNumber),
                pageSize: Number(page.pageSize),
                token: getData("token")
            })
        })
        .turn('bulidRelicInfoWorkbenchTable', {
            applyStatus: page.applyStatus,
            applyId: page.applyId
        })
        .turn('bulidAddRelics', {})
        .start();
}


