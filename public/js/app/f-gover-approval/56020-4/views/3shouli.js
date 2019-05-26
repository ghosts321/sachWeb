cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        console.log(param);
        var data = param.data.dataList;
        console.log(data);
        $("#cmx-shouli-table").empty();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var applyId = data[i].applyId;
                var customsId = data[i].customsId;
                var appUserName = data[i].appUserName;
                var carryUser = data[i].carryUser;
                var state = data[i].inOutClassName + data[i].flowStatus;
                var applyTime = data[i].applyDate;
                var applyClassName = data[i].applyClassName;
                var custPurposeName = '';
                var font_color = '';
                if (applyClassName == '展览') {
                    custPurposeName = data[i].destination;
                    font_color = "#70A532";
                } else {
                    custPurposeName = data[i].destination;
                    font_color = "#926dde";
                }
                var resDateColor = '';
                if (data[i].resDate == 0) {
                    resDateColor = 'class="success"';
                } else if (data[i].resDate < 0) {
                    resDateColor = 'class="danger"';
                }
                

                html = ['<tr style="color:' + font_color + '" data-color="' + font_color + '" class="exitList" data-id="' + applyId + '">',
                '<td ' + resDateColor + ' title="距离与申请人约定到站点的剩余天数（含周六日）">' + data[i].resDate + '</td>',
                '<td>' + customsId + '</td>',
                '<td>' + custPurposeName + '</td>',
                '<td>' + appUserName + '</td>',
                '<td data-applyId="' + data[i].applyId + '" data-applyClass="' + data[i].applyClass + '" class="applyDetail cursorPointer">' + carryUser + '</td>',
                '<td>' + state + '</td>',
                    '</tr>',
                    '<tr style="border-bottom: 2px solid #62a8ea;">',
                    '<td colspan="6" style="text-align: left;">',
                    showPointButton(applyId,data[i].applyStatus),
                '<button func-id="0101030103020100" data-id="' + applyId + '" class="btn btn-primary btn-xs cmx-accept">受理</button><button func-id="0101030103020200" data-id="' + applyId + '" class="btn btn-primary btn-xs cmx-yicibuzheng">一次性补正</button><button func-id="0101030103020300" data-id="' + applyId + '" class="btn btn-primary btn-xs cmx-bushouli">不予受理</button><button func-id="0101030103020400" data-id="' + applyId + '" class="btn btn-primary btn-xs cmx-updateYuyueTime">更改预约时间</button>',
                '<span style="float: right;line - height: 31.4px;margin - right: 10px;">' + applyTime + '</span>',
                    '</td >',
                    '</tr >'].join('');
                $("#cmx-shouli-table").append(html);

            }
            showApplyDetail(4);
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
            });
        }
        //查看通知
        showPointDetails();
        //受理填写
        $(".cmx-accept").unbind("click", function () { });
        $(".cmx-accept").bind("click", function () {
            var applyId = $(this).attr('data-id');
            // alert(applyId);
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定受理通过吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/completeAccept',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('shouliAccess')
                            .start();
                    }
                }
            })

        });
        //一次补正
        $(".cmx-yicibuzheng").unbind("click");
        $(".cmx-yicibuzheng").bind("click", function () {
            var applyId = $(this).attr('data-id');
            $("#cmx-yicibuzheng-modal").load(geyicibuzhengModal, function () {
                $('#yicibuzhengModal').off('shown.bs.modal');
                $('#yicibuzhengModal').on('shown.bs.modal', function () {
                    //一次补正模态框单击保存
                    $('#yicibuzhengSave').off('click');
                    $('#yicibuzhengSave').on('click', function () {
                        if ($('#yicibuzheng-reson1').val().trim() == '' && $('#yicibuzheng-reson2').val().trim() == '') {
                            showAlert({
                                type: 'error',
                                content: '原因不能为空！'
                            })
                        } else {
                            if($('#yicibuzheng-reson1').val().length>500||$('#yicibuzheng-reson2').val().length>500){
                                showAlert({
                                    type:'info',
                                    content:"输入的字符长度不能超过500"
                                })
                                return;
                            }
                            var reson = {
                                option1: 0,
                                option2: 0,
                                optionCont1: '',
                                optionCont2: '',
                            }
                            if ($('#r1-1').is(':checked')) {
                                reson.option1 = 1;
                                reson.optionCont1 = "申请材料不全。原因：" + $('#yicibuzheng-reson1').val();
                            }
                            if ($('#r1-2').is(':checked')) {
                                reson.option2 = 1;
                                reson.optionCont2 = "不符合法定形式。原因：" + $('#yicibuzheng-reson2').val();
                            }
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + "/eaScrApplyInfo/updCardNote",
                                    data: JSON.stringify({
                                        applyId: applyId,
                                        type: 2,
                                        option1: reson.option1,
                                        option2: reson.option2,
                                        optionCont1: reson.optionCont1,
                                        optionCont2: reson.optionCont2,
                                        token: getData("token")
                                    })
                                })
                                .turn('shouliNoExamine', param)
                                .start();
                        }

                    });
                });
                $('#yicibuzhengModal').modal('show');
            });
        });
        //不予受理
        $(".cmx-bushouli").unbind("click");
        $(".cmx-bushouli").bind("click", function () {
            var applyId = $(this).attr('data-id');
            $("#cmx-bushouli-modal").load(gebushouliModal, function () {
                $('#bushouliModal').off('shown.bs.modal');
                $('#bushouliModal').on('shown.bs.modal', function () {
                    //不予受理模态框单击保存
                    $('#bushouliSave').off('click');
                    $('#bushouliSave').on('click', function () {
                        var reson = {
                            option1: 0,
                            option2: 0,
                            option3: 0,
                            option4: 0,
                            optionCont1: '',
                            optionCont2: '',
                            optionCont3: '',
                            optionCont4: '',
                        };
                        var num = 0;
                        switch ($("[name='rNo']:checked").attr('id')) {
                            case 'r2-1':
                                reson.option1 = 1;
                                reson.optionCont1 = $('.resonfor1').text();
                                break;
                            case 'r2-2':
                                reson.option2 = 1;
                                reson.optionCont2 = $('.resonfor2').text();
                                break;
                            case 'r2-3':
                                reson.option3 = 1;
                                reson.optionCont3 = $('.resonfor3').text();
                                break;
                            case 'r2-4':
                                reson.option4 = 1;
                                reson.optionCont4 = $('.bushouli-extraReson4').val();
                                break;
                            default:
                                break;
                        }
                        console.log(reson);
                        if (reson.option4 == 1 && reson.optionCont4 == '') {
                            showAlert({
                                type: 'warning',
                                content: '原因不能为空！'
                            })
                        } else if (reson.option4 == 1 && reson.optionCont4.length > 500) {
                            showAlert({
                                type: 'info',
                                content: '输入的字符长度不能超过500'
                            })
                        } else {
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + "/eaScrApplyInfo/notAcceptNote",
                                    data: JSON.stringify({
                                        applyId: applyId,
                                        type: '2',
                                        option1: reson.option1,
                                        option2: reson.option2,
                                        option3: reson.option3,
                                        option4: reson.option4,
                                        optionCont1: reson.optionCont1,
                                        optionCont2: reson.optionCont2,
                                        optionCont3: reson.optionCont3,
                                        optionCont4: reson.optionCont4,
                                        token: getData("token")
                                    })
                                })
                                .turn('shouliNoExamine', param)
                                .start();
                        }
                    })

                });
                $('#bushouliModal').modal('show');
            });
        });
        //更改预约时间
        $(".cmx-updateYuyueTime").unbind("click", function () { });
        $(".cmx-updateYuyueTime").bind("click", function () {
            var applyId = $(this).attr('data-id');
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
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (prevModelData.state == "200" && !IsEmpty(prevModelData)) {
                                $('#cmx-i-2').val(prevModelData.data.applyClassName);
                                $('#cmx-i-4').val(prevModelData.data.customsId);
                                $('#cmx-i-5').val(prevModelData.data.destination);
                                $('#cmx-i-6').val(prevModelData.data.carryUser);
                                $('#cmx-i-7').val(prevModelData.data.telNo);
                                $('#cmx-i-8').val(prevModelData.data.appUserName);
                                $('#cmx-i-9').val(prevModelData.data.appTelNo);
                                $('#cmx-i-10').val(prevModelData.data.address);
                                $('#yuyueDate').val(format2(prevModelData.data.reserveDate));
                                $('#yuyueTime').val(prevModelData.data.resDatePar);
                            } else {
                                showAlert({
                                    type: 'error',
                                    content: prevModelData.msg
                                })
                            }
                        })
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
                        if ($('#yuyueDate').val() == '') {
                            showAlert({
                                type: 'info',
                                content: '日期不能为空！',
                                btn_1: '确定'
                            })
                        } else {
                            btn_recovery('#yuyueExamine');
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + "/eaScrApplyInfo/updateReserveDate",
                                    data: JSON.stringify({
                                        token: getData('token'),
                                        reserveDate: $('#yuyueDate').val(),
                                        resDatePar: $('#yuyueTime').val(),
                                        resRemark: $('#cmx-i-11').val(),
                                        applyId: applyId
                                    })
                                })
                                .turn(function (prevModelData, send, abort) {
                                    if (prevModelData.state == "200" && !IsEmpty(prevModelData)) {
                                        showAlert({
                                            type: 'success',
                                            content: '预约时间更改成功！'
                                        });
                                        getApplyList(4, '/eaScrApplyInfo/acceptApllyInfoList', 3);
                                    } else {
                                        showAlert({
                                            type: 'error',
                                            content: prevModelData.msg
                                        })
                                    }
                                })
                                .start();
                        }
                    });
                });
                $('#cmx-accept-receipt').modal('show');
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
                var data = {
                    userId: "yuhaiyan",
                    applyStatus: "3",
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
                    userId: "yuhaiyan",
                    applyStatus: "3",
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
                userId: "yuhaiyan",
                applyStatus: "3",
                token: getData("token"),
                pageNumber: param.pages,
                pageSize: param.pageSize
            }
            pageLeft(data);
        });
        $("#left-first").off("click");
        $("#left-first").on("click", function () {
            var data = {
                userId: "yuhaiyan",
                applyStatus: "3",
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
                        userId: "yuhaiyan",
                        applyStatus: "3",
                        token: getData("token"),
                        pageNumber: val,
                        pageSize: param.pageSize
                    }
                    pageLeft(data);
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
                applyStatus: '3',
                inOutClass: 4,
                applyId: ''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}


cmx.route.view({
    index: 'shouliNoExamine',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '受理退回成功！'
        });
        setTimeout(function () {
            window.location.href = public_url + 'app/f-gover-approval/56020-4/3shouli.html?nowid=' + GetUrlParamString('nowid');
        }, 1000)
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