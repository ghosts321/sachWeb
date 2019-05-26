cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        var data = param.dataList;
        console.log(data);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var applyId = data[i].applyId;
                var customsId = data[i].customsId;
                var appUserName = data[i].appUserName;
                var carryUser = data[i].carryUser;
                var state = data[i].inOutClassName + data[i].flowStatus;
                var processState = '出境申请受理';
                var applyTime = data[i].applyDate;
                var applyStatus = data[i].applyStatus;
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
              
                html = ['<tr style="color:' + font_color + '" data-color="' + font_color + '" class="exitList" data-id="' + applyId + '">',
                '<td>' + customsId + '</td>',
                '<td>' + custPurposeName + '</td>',
                '<td>' + appUserName + '</td>',
                '<td data-applyId="' + data[i].applyId + '" data-applyClass="' + data[i].applyClass + '" class="applyDetail cursorPointer">' + carryUser + '</td>',
                '<td>' + state + '</td>',
                    '</tr>',
                    '<tr style="border-bottom: 2px solid #62a8ea;">',
                    '<td colspan="5" style="text-align: left;">',
                    showPointButton(applyId,data[i].applyStatus),
                '<button func-id="0102420300000000"   data-type="' + applyClassName + '" class="btn btn-info btn-xs exit-application-update" data-id="' + applyId + '">修改</button><button func-id="0101030103110200" data-id="' + applyId + '" style="margin:5px;" class="btn btn-primary btn-xs cmx-accept">提交</button><button func-id="0101030103110300" data-id="' + applyId + '"  style="margin:5px;" class="btn btn-primary btn-xs cmx-refuse">退回</button>',
                '<span style="float: right;line - height: 31.4px;margin - right: 10px;">' + applyTime + '</span>',
                    '</td >',
                    '</tr >'].join('');
                $("#cmx-dapart-apply-table").append(html);
            }

            showApplyDetail(5);
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
        //单击修改
        $('.exit-application-update').off('click');
        $('.exit-application-update').on('click', function () {
            new cmx.process().
                turn('initFiles', {
                    'P0002approvalDocuments': '157'
                })
                .start();
            $("#cmx-carry-person-modal").empty();
            $("#cmx-applicationForExhibition-modal").empty();
            var applyId = $(this).attr('data-id');
            var type = $(this).attr('data-type');
            if (type == '展览') {
                $("#cmx-applicationForExhibition-modal").load(getApplyForExhibitionModal, function () {
                    $('#cmx-applyForExhibition-info').modal('show');
                    $('#cmx-applyForExhibition-info').off('shown.bs.modal');
                    $('#cmx-applyForExhibition-info').on('shown.bs.modal', function () {
                        get_autoForm(applyId, updateApplyForExhibitionData);
                        $('.deleteRelic').remove();
                        $('#optionalRelic').parent().parent().parent().remove();
                        $('[cmx-lib="P0001t"]').parent().remove();
                        $('[data-plugin="datepicker"]').datepicker({ //日期控件
                            language: 'zh-CN',
                            autoclose: true, //选择之后是否关闭日期选项
                            todayHighlight: true, //当为true的时候高亮
                            keyboardNavigation: true,
                            format: 'yyyy-mm-dd'
                        });
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('update-exit-application1').start();
                        $('#cmx-2-Nationality').selectpicker({
                            size: 'auto',
                            style: 'btn-transparent',
                            liveSearch: true
                        });
                        setTimeout(function () {
                            $('#applyForExhibitionSave').off('click');
                            $('#applyForExhibitionSave').on('click', (function () {
                                var temp_flag = checkFormLength('#cmx-applyForExhibition-div');
                                if (!temp_flag) {
                                    return;
                                }
                                if($('#cmx-1-IDCardType').val()=="X"&&$('#otherCard').val().length>20){
                                    showAlert({
                                        type:'info',
                                        content:"证件名称的长度不能超过20"
                                    })
                                    return;
                                }
                                var relicIndex = [];
                                $("[name='cmx-relicInfo']:checked").each(function () {
                                    relicIndex.push($(this).val());
                                })
                                var formData = {
                                    'carryUser': $("#cmx-1-CarryUser").val(),
                                    'nationality': $("#cmx-1-Nationality").val(),
                                    'custPurpose': $("#cmx-1-CustPurpose").val(),
                                    'destination': $("#cmx-1-Destination").val(),
                                    'turnDate': $("#cmx-1-Time").val(),
                                    'customsId': $("#cmx-1-CustomsID").val(),
                                    'telNo': $("#cmx-1-TelNO").val(),
                                    'idcardType': $("#cmx-1-IDCardType").val(),
                                    'idnumber': $("#cmx-1-IDNumber").val(),
                                    'reviewInst': $("#cmx-1-ReviewInst").val(),
                                    'address': $("#cmx-1-Address").val(),
                                    'exhibitName': $("#cmx-z-name").val(),
                                    'applyUnit': $("#cmx-z-unit").val(),
                                    'dateBeg': $("#cmx-z-startTime").val(),
                                    'dateEnd': $("#cmx-z-endTime").val(),
                                    'leader': $("#cmx-z-director").val(),
                                    'manageUnit': $("#cmx-z-competentUnit").val(),
                                    'externalInst': $("#cmx-z-externalInstitution").val(),
                                    'organizer': $("#cmx-z-organizer").val(),
                                    'permitNo': $("#cmx-z-licenseNumber").val(),
                                    'exhibitAddr': $("#cmx-z-exhibitionVenue").val(),
                                    'applyId': applyId
                                };
                                var otherCard = $('#otherCard').val();
                                if (!IsEmpty(otherCard)) {
                                    formData.otherCard = otherCard;
                                }
                                console.log(formData);

                                var index = '';
                                if (!IsEmpty(cmx.g.filesarray.get('157'))) {
                                    index = cmx.g.filesarray.get('157')[cmx.g.filesarray.get('157').length - 1];
                                }
                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_ea + '/eaScrApplyInfo/insertRepEnterExhibit',
                                        data: JSON.stringify({
                                            token: getData('token'),
                                            formData: formData,
                                            index: index,
                                            relicIndex: relicIndex
                                        })
                                    })
                                    .turn('update-exit-application2').start();

                            }))
                        }, 500);
                    });
                });
            } else {
                $("#cmx-carry-person-modal").load(getCarryPersonInfoModal, function (response) {
                    $('#cmx-carry-person-info').modal('show');
                    $('#cmx-carry-person-info').off('shown.bs.modal');
                    $('#cmx-carry-person-info').on('shown.bs.modal', function () {
                        get_autoForm(applyId, updateExitApplicationData);
                        $('.deleteRelic').remove();
                        $('#optionalRelic').parent().parent().parent().remove();
                        $('[cmx-lib="P0001t"]').parent().remove();
                        $('[data-plugin="datepicker"]').datepicker({ //日期控件
                            language: 'zh-CN',
                            autoclose: true, //选择之后是否关闭日期选项
                            todayHighlight: true, //当为true的时候高亮
                            keyboardNavigation: true,
                            format: 'yyyy-mm-dd'
                        });
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/getApplyInfoByApplyId',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('update-exit-application').start();
                        $('#cmx-2-Nationality').selectpicker({
                            size: 'auto',
                            style: 'btn-transparent',
                            liveSearch: true
                        });
                        setTimeout(function () {
                            $('#carrierApplication').off('click');
                            $('#carrierApplication').on('click', (function () {
                                var temp_flag = checkFormLength('#cmx-carrypersoninfo');
                                if (!temp_flag) {
                                    return;
                                }
                                if($('#cmx-1-IDCardType').val()=="X"&&$('#otherCard').val().length>20){
                                    showAlert({
                                        type:'info',
                                        content:"证件名称的长度不能超过20"
                                    })
                                    return;
                                }
                                var relicIndex = [];
                                $("[name='cmx-relicInfo']:checked").each(function () {
                                    relicIndex.push($(this).val());
                                })
                                var formData = {
                                    'carryUser': $("#cmx-1-CarryUser").val(),
                                    'nationality': $("#cmx-1-Nationality").val(),
                                    'custPurpose': $("#cmx-1-CustPurpose").val(),
                                    'turnDate': $("#cmx-1-Time").val(),
                                    'customsId': $("#cmx-1-CustomsID").val(),
                                    'telNo': $("#cmx-1-TelNO").val(),
                                    'idcardType': $("#cmx-1-IDCardType").val(),
                                    'idnumber': $("#cmx-1-IDNumber").val(),
                                    'reviewInst': $("#cmx-1-ReviewInst").val(),
                                    'address': $("#cmx-1-Address").val(),
                                    'applyId': applyId
                                };
                                var otherCard = $('#otherCard').val();
                                if (!IsEmpty(otherCard)) {
                                    formData.otherCard = otherCard;
                                }
                                console.log(formData);
                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_ea + '/eaScrApplyInfo/insertRepEnterApply',
                                        data: JSON.stringify({
                                            token: getData('token'),
                                            formData: formData,
                                            relicIndex: relicIndex
                                        })
                                    })
                                    .turn('update-exit-application2').start();
                            }))
                        }, 500);
                    });
                });
            }
        });


        $(".cmx-accept").off("click", function () { });
        $(".cmx-accept").on("click", function () {
            var applyId = $(this).attr('data-id');
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定提交此申请吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/selectNotRegister',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId
                                })
                            })
                            .turn('acceptNotRegister', applyId)
                            .start()

                    }
                }
            })


        });

        $(".cmx-refuse").off("click", function () { });
        $(".cmx-refuse").on("click", function () {
            var applyId = $(this).attr('data-id');
            // alert(applyId);
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '退回将到上一级处理节点，相关人员将重新办理，确定退回吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/rollBackRegister',
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
                applyStatus: '5',
                inOutClass: 5,
                applyId: ''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}
//修改携运人申请信息（个人）
cmx.route.view({
    index: 'update-exit-application',
    resolve: function (param) {
        var data = param;
        // console.log(data);  
        $("#cmx-1-CarryUser").val(data.carryUser).attr('disabled', 'true');
        $("#cmx-1-Destination").val(data.destination).attr('disabled', 'true');
        $("#cmx-1-TelNO").val(data.telNo).attr('disabled', 'true');
        $("#cmx-1-IDNumber").val(data.idnumber).attr('disabled', 'true');
        $("#cmx-1-Address").val(data.address).attr('disabled', 'true');
        $("#cmx-1-CustomsID").val(data.customsId).attr('disabled', 'true');
        $("#cmx-1-Time").val(data.turnDate).attr('disabled', 'true');
        $("#cmx-1-Nationality").val(data.nationality).attr('disabled', 'true');
        $("#cmx-1-IDCardType1").val(data.idcardType).attr('disabled', 'true');
        $("#cmx-1-ReviewInst").val(data.reviewInst).attr('disabled', 'true');
        $('#cmx-1-ReviewInst').selectpicker({ style: 'btn-transparent' });

        showOtherCard('#cmx-1-IDCardType', data);
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});
//修改携运人申请信息（展览）
cmx.route.view({
    index: 'update-exit-application1',
    resolve: function (param) {
        var data = param;
        new cmx.process().
            turn('initFiles', {
                'P0002approvalDocuments': '157'
            })
            .start();
        // console.log(data);  
        $("#cmx-1-CarryUser").val(data.carryUser);
        $("#cmx-1-Destination").val(data.destination);
        $("#cmx-1-TelNO").val(data.telNo);
        $("#cmx-1-IDNumber").val(data.idnumber);
        $("#cmx-1-Address").val(data.address);
        $("#cmx-1-CustomsID").val(data.customsId);
        $("#cmx-1-Time").val(data.turnDate);
        $("#cmx-1-Nationality").val(data.nationality);
        $('#cmx-1-Nationality').selectpicker({
            size: 'auto',
            style: 'btn-transparent',
            liveSearch: true
        });
        $("#cmx-1-IDCardType").val(data.idcardType);
        $("#cmx-1-ReviewInst").val(data.reviewInst);
        $('#cmx-1-ReviewInst').selectpicker({ style: 'btn-transparent' });
        $("#cmx-z-name").val(data.exhibitName);
        $("#cmx-z-unit").val(data.applyUnit);
        $("#cmx-z-startTime").val(data.dateBeg);
        $("#cmx-z-endTime").val(data.dateEnd);
        $("#cmx-z-director").val(data.leader);
        $("#cmx-z-competentUnit").val(data.manageUnit);
        $("#cmx-z-externalInstitution").val(data.externalInst);
        $("#cmx-z-organizer").val(data.organizer);
        $("#cmx-z-licenseNumber").val(data.permitNo);
        $("#cmx-z-exhibitionVenue").val(data.exhibitAddr);
        showOtherCard('#cmx-1-IDCardType', data);
        showFile(data);
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
        getApplyList(5, '/eaScrApplyInfo/getCurrenList', 5);
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
        .turn('bulidAddRelics', {})
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
            relicListDengji(data,pageInfo);
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

        // 登记

        $(".register").off("click");
        $(".register").on("click", function () {
            var relicId = $(this).attr("data-id");
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定要登记该文物吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrApplyInfo/confirmRegister',
                                data: JSON.stringify({
                                    token: getData("token"),
                                    relicId: relicId,
                                    regStatus: 1
                                })
                            })
                            .turn(function (prevModelData, noviewsend, abort) {
                                console.log(prevModelData);
                                if (prevModelData.state == "200") {
                                    showAlert({
                                        type: "success",
                                        content: prevModelData.msg
                                    });
                                    // 请求刷新
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
                                            data: JSON.stringify({
                                                applyId: data[0].applyId,
                                                pageNumber: pageNumber,
                                                pageSize: pageSize,
                                                token: getData("token")
                                            })
                                        })
                                        .turn('bulidRelicInfoWorkbenchTable', {
                                            applyStatus: data[0].applyStatus,
                                            applyId: data[0].applyId
                                        })
                                        .turn('bulidAddRelics', {})
                                        .start();
                                } else {
                                    showAlert({
                                        type: "error",
                                        content: '请求失败'
                                    });
                                }

                            })
                            .start();
                    }
                }
            })
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
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

// 上报编辑文物
cmx.route.view({
    index: 'updataEditRelicInfo',
    resolve: function (param) {
        showAlert({
            type: "success",
            content: param.msg
        })
        $("#cmx-editrelicinfo").modal("hide");
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

// 删除文物
cmx.route.view({
    index: 'deleteEditRelicInfo',
    resolve: function (param) {
        showAlert({
            type: "success",
            content: param.msg
        })
        $("#deleteAlert").hide();
    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

