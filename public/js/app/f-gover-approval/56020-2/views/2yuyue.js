cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        var data = param.data.dataList;
        $("#cmx-yuyue-table").empty();
        console.log(data);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var tr_html = '';
                var applyId = data[i].applyId;
                var customsId = data[i].customsId;
                var appUserName = data[i].appUserName;
                var carryUser = data[i].carryUser;
                var state = data[i].inOutClassName + data[i].flowStatus;
                var processState = '出境申请预约';
                var applyTime = data[i].applyDate;
                var stayDate = data[i].stayDate + '天';
                var applyClassName = data[i].applyClassName;
                var custPurposeName = '';
                var font_color = '';
                if (applyClassName == '展览') {
                    custPurposeName = data[i].destination;
                    font_color = "#70A532";
                } else {
                    custPurposeName = data[i].custPurposeName;
                    font_color = "#926dde";
                }

                html = ['<tr style="color:' + font_color + '" data-color="' + font_color + '"  class="exitList" data-id="' + applyId + '">',
                '<td title="申请人提交申请距离当前时间的自然日（含周六日）">' + stayDate + '</td>',
                '<td>' + customsId + '</td>',
                '<td>' + custPurposeName + '</td>',

                '<td>' + appUserName + '</td>',
                '<td data-applyId="' + data[i].applyId + '" data-applyClass="' + data[i].applyClass + '" class="applyDetail cursorPointer">' + carryUser + '</td>',
                '<td>' + state + '</td>',
                    '</tr>',
                    '<tr style="border-bottom: 2px solid #62a8ea;">',
                    '<td colspan="6" style="text-align: left;">',
                    showPointButton(applyId,data[i].applyStatus),
                '<button func-id="0101030102010100" data-id="' + applyId + '" style="margin-right:5px;" class="btn btn-primary btn-xs cmx-accept">接受预约</button><button func-id="0101030102010200" data-id="' + applyId + '" class="btn btn-primary btn-xs cmx-noAccept">不接受预约</button>',
                '<span style="float: right;line - height: 31.4px;margin - right: 10px;">' + applyTime + '</span>',
                    '</td >',
                    '</tr >'].join('');
                $("#cmx-yuyue-table").append(html);
            }
            showApplyDetail(2);
            loadWenwuList(data[0].applyStatus, data[0].applyId, 1, 20);
            //左右菜单关联
            $(".exitList").each(function (index) {
                $(this).unbind('click');
                $(this).on('click', function () {
                    $(".exitList").each(function () {
                        $(this).removeClass("info").css('color', $(this).attr('data-color'));
                    })
                    $(this).addClass("info").css('color', 'white');
                    loadWenwuList($(this).attr('data-applyStatus'), $(this).attr('data-id'), 1, 20);
                });
            })
        }
        //查看通知
        showPointDetails();
        //预约填写
        $(".cmx-accept").unbind("click", function () { });
        $(".cmx-accept").bind("click", function () {
            $("#cmx-accept-receipt-modal").load(getyuyueAcceptModal, function () {
                $('[data-plugin="clockpicker"]').clockpicker({ //日期控件
                    default: 'now',
                    align: 'left'
                });
                $('[data-plugin="datepicker"]').datepicker({ //日期控件
                    language: 'zh-CN',
                    autoclose: true, //选择之后是否关闭日期选项
                    todayHighlight: true, //当为true的时候高亮
                    keyboardNavigation: true,
                    format: 'yyyy-mm-dd',
                });

                $('#cmx-accept-receipt').off('show.bs.modal');
                $('#cmx-accept-receipt').on('show.bs.modal', function () {
                    var applyId = $(".cmx-accept").attr('data-id');
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId
                            })
                        })
                        .turn('showYuyueInfo')
                        .start();
                    //预约模态框单击保存
                    $('#yuyueExamine').off('click');
                    $('#yuyueExamine').on('click', function () {
                        if ($('#cmx-i-11').val().length > 1000) {
                            showAlert({
                                type: 'info',
                                content: '备注长度不能超过1000！'

                            })
                        }
                        if (IsEmpty($('#yuyueDate').val())) {
                            showAlert({
                                type: 'info',
                                content: '日期不能为空！',
                                btn_1: '确定'
                            })
                        } else {
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + "/eaScrApplyInfo/completeOrder",
                                    data: JSON.stringify({
                                        token: getData('token'),
                                        applyId: applyId,
                                        reserveDate: $('#yuyueDate').val(),
                                        resDatePar: $('#yuyueTime').val(),
                                        resRemark: $('#cmx-i-11').val()
                                    })
                                })
                                .turn('yuyueExamine')
                                .start();
                        }
                    });
                });
                $('#cmx-accept-receipt').modal('show');
            });
        });

        //不接受预约
        $(".cmx-noAccept").unbind("click");
        $(".cmx-noAccept").bind("click", function () {
            var applyId = $(this).attr('data-id');
            $("#cmx-bushouli-modal").load(geNoAcceptModal, function () {
                $('#cmx-noAccept-receipt').off('shown.bs.modal');
                $('#cmx-noAccept-receipt').on('shown.bs.modal', function () {
                    //不接受预约模态框单击保存
                    $('#noAccept-receipt-save').off('click');
                    $('#noAccept-receipt-save').on('click', function () {
                        if (IsEmpty($('#opinions').val())) {
                            showAlert({
                                type: 'warning',
                                content: '原因不能为空！'
                            })
                        } else {
                            btn_recovery('#noAccept-receipt-save');
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + "/eaScrApplyInfo/rollbackOrder",
                                    data: JSON.stringify({
                                        applyId: applyId,
                                        resRemark: $('#opinions').val(),
                                        token: getData("token")
                                    })
                                })
                                .turn('shouliNoExamine', param)
                                .start();
                        }
                    })

                });
                $('#cmx-noAccept-receipt').modal('show');
            });
        });

        // 分页
        var param = param.data;
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
                var page = {
                    applyStatus: "2",
                    token: getData("token"),
                    pageNumber: param.pageNumber + 1,
                    pageSize: param.pageSize
                }
                pageLeft(page);
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
                var page = {
                    applyStatus: "2",
                    token: getData("token"),
                    pageNumber: param.pageNumber - 1,
                    pageSize: param.pageSize
                }
                pageLeft(page);
            }
        });
        $("#left-last").off("click");
        $("#left-last").on("click", function () {
            var page = {
                applyStatus: "2",
                token: getData("token"),
                pageNumber: param.pages,
                pageSize: param.pageSize
            }
            pageLeft(page);
        });
        $("#left-first").off("click");
        $("#left-first").on("click", function () {
            var page = {
                applyStatus: "2",
                token: getData("token"),
                pageNumber: 1,
                pageSize: param.pageSize
            }
            pageLeft(page);
        });
        $("#left-count").off('blur');
        $("#left-count").blur(function () {
            var val = $(this).val();
            if (!isNaN(val)) {
                if (val >= 1 && val <= param.pages) {
                    var page = {
                        applyStatus: "2",
                        token: getData("token"),
                        pageNumber: val,
                        pageSize: param.pageSize
                    }
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
                applyStatus: '2',
                inOutClass: 2,
                applyId: ''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}

cmx.route.view({
    index: 'yuyueReturn',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '退回成功！'
        });
        setTimeout(function(){
            window.location.reload();
        },1000)
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});
cmx.route.view({
    index: 'yuyueExamine',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '预约成功！'
        });
        setTimeout(function(){
            window.location.reload();
        },1000)
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

cmx.route.view({
    index: 'shouliNoExamine',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '预约退回成功！'
        });
        setTimeout(function(){
            window.location.reload();
        },1000)
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

function loadWenwuList(applyStatus, applyId, pageNumber, pageSize) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
            data: JSON.stringify({
                applyId: applyId,
                pageNumber: pageNumber,
                pageSize: pageSize,
                token: getData("token")
            })
        })
        .turn('bulidRelicInfo', {
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
