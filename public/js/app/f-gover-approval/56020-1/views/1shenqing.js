
'use strict';
cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        var data = param.dataList;
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var html = '';
            var customsName = data[i].customsId;
            var destination = data[i].destination;
            var carryUser = data[i].carryUser;
            var applyClassName = data[i].applyClassName;
            var AcceptNum = data[i].acceptNum ? data[i].acceptNum : '';
            var acceptId = data[i].applyStatus;
            var time = data[i].applyDate;
            var flowStatus = data[i].flowStatus ? data[i].flowStatus : '';
            var state = data[i].inOutClassName + flowStatus;
            var applyId = data[i].applyId;
            var button = '';
            switch (acceptId) {
                case '1':
                    button =
                        '<button func-id="0102380100000000"  class="btn btn-success btn-xs exit-application-submit" data-id="' + applyId + '">提交</button>' +
                        '<button func-id="0102380200000000"  class="btn btn-warning btn-xs exit-application-delete" data-id="' + applyId + '">删除</button>' +
                        '<button func-id="0102380300000000"  class="btn btn-info btn-xs exit-application-update" data-id="' + applyId + '">修改</button>';
                    break;
                case '2':
                    button =
                        '<button func-id="0102380400000000"  class="btn exit-application-print btn-xs btn-info" data-id="' + applyId + '">打印申请表</button>' +
                        '<button func-id="0102380500000000"  class="btn exit-application-return btn-xs btn-default" data-id="' + applyId + '">收回</button>';
                    break;
                case '3':
                    button =
                        '<button func-id="0102380400000000"  class="btn exit-application-print btn-xs btn-info" data-id="' + applyId + '">打印申请表</button>' +
                        showPointButton(applyId,data[i].applyStatus);
                    break;
                case '4':
                case '5':
                case '6':
                case '8':
                case '9':
                    button =
                        '<button func-id="0102380400000000"  class="btn exit-application-print btn-xs btn-info" data-id="' + applyId + '">打印申请表</button>' +
                        showPointButton(applyId,data[i].applyStatus);
                    break;
                case 'N':
                    button =
                        '<button func-id="0102380400000000"  class="btn exit-application-print btn-xs btn-info" data-id="' + applyId + '">打印申请表</button>' +
                        showPointButton(applyId,data[i].applyStatus);
                    break;
                case 'O':
                    button =
                    showPointButton(applyId,data[i].applyStatus)+
                        '<button func-id="0102380100000000"  class="btn btn-success btn-xs exit-application-submit" data-id="' + applyId + '">提交</button>' +
                        '<button func-id="0102380200000000"  class="btn btn-warning btn-xs exit-application-delete" data-id="' + applyId + '">删除</button>' +
                        '<button func-id="0102380300000000"  class="btn btn-info btn-xs exit-application-update" data-id="' + applyId + '">修改</button>' +
                        '<button func-id="0102380400000000"  class="btn exit-application-print btn-xs btn-info" data-id="' + applyId + '">打印申请表</button>';
                    break;
                case 'B':
                    button =
                    showPointButton(applyId,data[i].applyStatus)+
                        '<button func-id="0102380100000000"  class="btn btn-success btn-xs exit-application-submit" data-id="' + applyId + '">提交</button>' +
                        '<button func-id="0102380200000000"  class="btn btn-warning btn-xs exit-application-delete" data-id="' + applyId + '">删除</button>' +
                        '<button func-id="0102380300000000"  class="btn btn-info btn-xs exit-application-update" data-id="' + applyId + '">修改</button>';
                    break;
                default:
                    break;
            }
            var font_color = '';
            if (applyClassName == '展览') {
                font_color = "#70A532";
            } else {
                font_color = "#926dde";
            }
            html = ['<tr style="color:' + font_color + '" data-color="' + font_color + '" class="exitList" data-id="' + applyId + '" data-applyStatus="' + acceptId + '">',
            '<td>' + customsName + '</td>',
            '<td>' + destination + '</td>',
            '<td data-applyId="' + data[i].applyId + '" data-applyClass="' + data[i].applyClass + '" class="applyDetail cursorPointer">' + carryUser + '</td>',
            '<td>' + state + '</td>',
            '<td>' + applyClassName + '</td>',
            '<td>' + AcceptNum + '</td>',
                '</tr>',
                '<tr style="border-bottom: 2px solid #62a8ea;">',
            '<td colspan="6" style="text-align: left;" class="cmx-exit-application' + applyId + '">',
                button,
            '<span style="float: right;line-height: 31.4px;margin-right: 10px;">' + time + '</span>',
                '</td >',
                '</tr >'].join('');
            $("#cmx-dapart-apply-table").append(html);
            //申请项点击携运人查看详情
            showApplyDetail(1);
        }
        //单击修改
        $('.exit-application-update').off('click');
        $('.exit-application-update').on('click', function () {
            var applyId = $(this).attr('data-id');
            $("#cmx-carry-person-modal").empty();
            $("#cmx-update-exit-application-modal").load(getCarryPersonInfoModal, function (response) {
                $('.cmx-save-btn').show();
                $('#cmx-carry-person-info').off('show.bs.modal');
                $('#cmx-carry-person-info').on('show.bs.modal', function () {
                    $('#cmx-carrypersoninfo').empty();
                    get_autoForm();
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId
                            })
                        })
                        .turn('update-exit-application').start();
                    $('#carrierApplication').click(function () {
                        var temp_flag = checkFormLength('#cmx-carrypersoninfo');
                        if (!temp_flag) {
                            return;
                        }
                        if ($('#cmx-1-IDCardType').val() == "X" && $('#otherCard').val().length > 20) {
                            showAlert({
                                type: 'info',
                                content: "证件名称的长度不能超过20"
                            })
                            return;
                        }
                        var formData = {
                            'carryUser': $("#cmx-1-CarryUser").val(),
                            'nationality': $("#cmx-1-Nationality").val(),
                            'destination': $("#cmx-1-Destination").val(),
                            'customsId': $("#cmx-1-CustomsID").val(),
                            'telNo': $("#cmx-1-TelNO").val(),
                            'idcardType': $("#cmx-1-IDCardType").val(),
                            'idnumber': $("#cmx-1-IDNumber").val(),
                            'reviewInst': $("#cmx-1-ReviewInst").val(),
                            'address': $("#cmx-1-Address").val()
                        };
                        var otherCard = $('#otherCard').val();
                        if (!IsEmpty(otherCard)) {
                            formData.otherCard = otherCard;
                        }
                        console.log(formData);
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/updateEaScrApplyInfo',
                                data: JSON.stringify({
                                    applyId: applyId,
                                    token: getData('token'),
                                    formData: formData
                                })
                            })
                            .turn('update-exit-application2').start();
                    })
                });
                $('#cmx-carry-person-info').modal('show');
            });
        });

        //单击提交
        $('.exit-application-submit').click(function () {
            var applyId1 = $(this).attr('data-id');
            // alert(applyId1);
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定要提交申请信息吗？',
                // delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    // console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/completeApply',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId1
                                }),
                            })
                            .turn('submit-exitApplication').start();
                    }
                }
            })
        });
        //单击收回
        $('.exit-application-return').click(function () {
            var applyId3 = $(this).attr('data-id');
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定要收回申请信息吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/takeBack',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId3
                                })
                            })
                            .turn('return-exitApplication').start();
                    }
                }
            })
        });
        //单击删除
        $('.exit-application-delete').click(function () {
            var applyId2 = $(this).attr('data-id');
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定要删除申请信息吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/deleteEaScrApplyInfoByPK',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId2
                                }),
                            })
                            .turn('delete-exitApplication').start();
                    }
                }
            })
        });
        //查看通知
        showPointDetails();

        // 设置pageSize
        cmx.g.pageSize = 20;

        // 默认第一条
        if (data.length > 0) {
            loadWenwuList(data[0].applyStatus, data[0].applyId, 1, cmx.g.pageSize);
        }


        //左右菜单关联
        $(".exitList").each(function (index) {
            $(this).unbind('click');
            $(this).bind('click', function () {
                $(".exitList").each(function () {
                    $(this).removeClass("info").css('color', $(this).attr('data-color'));
                })
                $(this).addClass("info").css('color', 'white');
                loadWenwuList($(this).attr('data-applyStatus'), $(this).attr('data-id'), 1, cmx.g.pageSize);
            });
        });

        // 打印申请表
        exitPrint('applyPrint');

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
                var page = {
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
                    pageNumber: param.pageNumber - 1,
                    pageSize: param.pageSize
                }
                pageLeft(page);
            }
        });
        $("#left-last").off("click");
        $("#left-last").on("click", function () {
            var page = {
                pageNumber: param.pages,
                pageSize: param.pageSize
            }
            pageLeft(page);
        });
        $("#left-first").off("click");
        $("#left-first").on("click", function () {
            var page = {
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
            url: api_ea + '/eaScrApplyInfo/getApplyList',
            data: JSON.stringify({
                token: getData("token"),
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
                carryUser: "",
                applyStatus: '2',
                inOutClass: 1,
                applyId: ''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}

cmx.route.view({
    index: 'saveCarrierApplication',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '保存成功！'
        });
        getApplyList(1, '/eaScrApplyInfo/getApplyList', 1);

    }

});
//修改携运人申请信息
cmx.route.view({
    index: 'update-exit-application',
    resolve: function (param) {
        var data = param;
        $("#cmx-1-CarryUser").val(data.carryUser);
        $("#cmx-1-Destination").val(data.destination);
        $("#cmx-1-TelNO").val(data.telNo);
        $("#cmx-1-IDNumber").val(data.idnumber);
        $("#cmx-1-Address").val(data.address);
        $("#cmx-1-CustomsID").val(data.customsId);
        $("#cmx-1-Nationality").removeAttr("selected");
        $("#cmx-1-Nationality").val(data.nationality);
        $("#cmx-1-IDCardType").val(data.idcardType);
        $("#cmx-1-ReviewInst").val(data.reviewInst);
        $('#cmx-1-Nationality').selectpicker({
            size: 'auto',
            style: 'btn-transparent',
            liveSearch: true
        });
        showOtherCard('#cmx-1-IDCardType', data);
        // $('#cmx-1-ReviewInst').selectpicker({ style: 'btn-transparent' });
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

cmx.route.view({
    index: 'update-exit-application2',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '修改成功！'
        });
        getApplyList(1, '/eaScrApplyInfo/getApplyList', 1);
    }
});
cmx.route.view({
    index: 'delete-exitApplication',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '删除成功！'
        });
        getApplyList(1, '/eaScrApplyInfo/getApplyList', 1);
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

cmx.route.view({
    index: 'submit-exitApplication',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'alert', //success info warning error confirm input
            content: '您的预约已经提交成功，请致电您所选择的文物进出境审核管理处进行电话确认，电话可在网站进行查询。预约结果将反馈至平台，并短信提醒您，敬请查收。',
            delay: 2, //可选参数，单位秒，confirm和input下无效
            btn_1: '确定' //可选参数，type为confirm时默认为确定，type为input时默认为提交
        })
        $('.ok').click(function () {
            setTimeout(function(){
                window.location.reload();
            },1000)
        })
    }
});
cmx.route.view({
    index: 'return-exitApplication',
    resolve: function (param) {
        console.log(param);
        showAlert({
            type: 'success',
            content: '收回成功！'
        });
        getApplyList(1, '/eaScrApplyInfo/getApplyList', 1);
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
        .turn('bulidRelicInfoWorkbenchTable', {
            applyStatus: applyStatus,
            applyId: applyId
        })
        .turn('buildBothRelicInfo', {
            pageNumber: pageNumber,
            pageSize: pageSize
        })
        .turn('bulidAddRelics', {})
        .start();
}

// Ace-2
// 获取文物列表
cmx.route.view({
    index: 'bulidRelicInfoWorkbenchTable',
    resolve: function (param) {
        var data = param.data.dataList;
        var pageInfo = param.data;
        console.log(pageInfo);
        var applyStatus = param.applyStatus;
        console.log(applyStatus);
        $("#relicList").empty();
        if (data) {
            relicListShenqing(data, pageInfo,applyStatus);
            //设置pageSize
            $('#selectRelicFews').off('change');
            $('#selectRelicFews').on('change', function () {
                var pageSize = $('#selectRelicFews').val();
                cmx.g.pageSize = pageSize;
                loadWenwuList(applyStatus, data[0].applyId, 1, pageSize);
            })
        } else {
            $("#relicTotal").text('共0条')
        }
        if (applyStatus != 1 && applyStatus != "O" && applyStatus != "B") {
            $("#cmx-add-relic").attr("disabled", "disabled");
            $("#cmx-batch-upload-relic").attr("disabled", "disabled");
        } else {
            $("#cmx-add-relic").removeAttr("disabled");
            $("#cmx-batch-upload-relic").removeAttr("disabled");
        }



        if (data) {
            var pageNumber = Number(pageInfo.pageNumber),
                pageSize = Number(pageInfo.pageSize),
                pages = pageInfo.pages;
        } else {
            var pageNumber = 1,
                pageSize = cmx.g.pageSize,
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
                })
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
            url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
            data: JSON.stringify({
                applyId: page.applyId,
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
                token: getData("token")
            })
        })
        .turn('bulidRelicInfoWorkbenchTable', {
            applyStatus: page.applyStatus,
            applyId: page.applyId
        })
        .turn('buildBothRelicInfo', {
            pageNumber: page.pageNumber,
            pageSize: page.pageSize
        })
        .turn('bulidAddRelics', {})
        .start();
}

// 上报新增文物
cmx.route.view({
    index: 'getAddRelicsData',
    resolve: function (param) {
        showAlert({
            type: "success",
            content: param.msg
        })
        $("#cmx-addrelicinfo").modal("hide");
        $('#preRelicInfo-modal').modal('hide');
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});
