'use strict';
cmx.g.regist('needToDoData', undefined);
cmx.g.regist('needtodocondition', []);

$(function () {
    var num = true;
    $('.show-info').on('click', function () {
        if (num == true) {
            num = false;
            show_condition();
        } else {
            num = true;
            hide_condition();
        }
    });

    try {
        var roleClassArr = JSON.parse(getData('roleClassArr'));
        for (var i = 0; i < roleClassArr.length; i++) {
            if (roleClassArr[i] == '4' || roleClassArr[i] == '5') { //处长处员 区分普通处理和专家待办
                cmx.g.needtodocondition = [103, 104, 105, 106, 107, 108, 109, 207, 230, 231, 232, 250, 251, 252, 101, 201, 202, 203, 204, 206, 207, 208, 209, 213, 214, 215, 216, 223, 224, 225, 226, 227, 303, 304, 305, 497, 498, 877, 878, 495, 496, 987, 499, 773, 776, 777, 999];
                $('#cmx-select-state .radio-custom').show();
                break;
            }
        }
    } catch (err) {

    }
    new cmx.process()
        .turn('initSelectTree', {
            id: 'select-applynum-input',
            width: 350,
            height: 'auto',
            content: '<div class="project-num-tree-body"></div>',
            onShow: function () {
                new cmx.process()
                    .turn('callajax', {
                        url: api_getSelectListForSachUser,
                        data: JSON.stringify({
                            token: getData('token'),
                            isAll: '1',
                            belongSys: '1' //1:行政审批  3:行业综合
                        }),
                        type: 'POST'
                    })
                    .turn('projectNumByUserInit')
                    .start();
            }
        })
        .turn('buildDataDic', {
            element: $('#publishTypeName'),
            hasAll: true,
            hasEmpty: true
        })
        .turn('buildDataDic', {
            element: $('#provinces'),
            hasAll: true
        })
        .turn(function (prevModelData, send, abort) {
            if (getData('condition_str')) {
                try {
                    if (GetUrlParamString('back') == '-1') {
                        var json_con = JSON.parse(getData('condition_str'));
                        $('#proFileTitle').val(json_con.proFileTitle);
                        $('#projectNum').val(json_con.projectNum);
                        $('#fileNumBack').val(json_con.originalNo);
                        $('#workDayStart').val(json_con.workDayStart);
                        $('#workDayEnd').val(json_con.workDayEnd);
                        $('#provinces').val(json_con.provinces).selectpicker('refresh');
                        $('#projectName').val(json_con.projectName);
                        $('#hostPersonName').val(json_con.hostPersonName);
                        $('#publishTypeName').val(json_con.publishType).selectpicker('refresh');
                        $('#protectUnitName').val(json_con.protectUnitName);
                        $('#proSendTimeStart').val(json_con.proSendTimeStart);
                        $('#proSendTimeEnd').val(json_con.proSendTimeEnd);
                    } else {
                        clearData('condition_str');
                    }
                } catch (err) {

                }
            }
            if(GetUrlParamString('back') != '-1'){
                clearData('needtotype');                
            }
            send.go();
        })
        .turn('provinceNeedInit')
        .cfinally(function () {
            $('#publishTypeName').selectpicker({
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
            $('#provinces').selectpicker({
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
        })
        .start();
    $('#proFileTitle').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#fileNumBack').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#projectName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#publishTypeName').on('change', function (event) {
        temporaryCondition();
        needFunc.getNeedToDo();
    });
    $('#provinces').on('change', function (event) {
        temporaryCondition();
        needFunc.getNeedToDo();
    });
    $('#workDayStart').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#workDayEnd').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#unitName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#hostPersonName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        temporaryCondition();
        // needFunc.getNeedToDo();
    });
    $('#search-btn').click(function () {
        temporaryCondition();
        needFunc.getNeedToDo();
    });
    $('#clear-search-form').click(function () {
        $('#select-applynum-input').val('');
        $('#projectNum').val('');
        $('#proFileTitle').val('');
        $('#fileNumBack').val('');
        $('#projectName').val('');
        $('#unitName').val('');
        $('#publishTypeName option').each(function () {
            if ($(this).text() == '全部') {
                $(this).attr('selected', true);
            }
        });
        $("#publishTypeName").selectpicker('refresh');
        $('#unitName').val('');
        $('#proSendTimeStart').val('');
        $('#proSendTimeEnd').val('');
        $('#provinces').val('-1');
        $("#provinces").selectpicker('refresh');
        $('#workDayStart').val('');
        $('#workDayEnd').val('');
        $('#hostPersonName').val('');
    });
    //导出excel
    $('#search-export').off('click');
    $('#search-export').on('click', function () {
        var format =
            'orderField=' + cmx.g.orderField + '&' +
            'orderMode=' + cmx.g.orderMode + '&' +
            'proFileTitle=' + $('#proFileTitle').val() + '&' +
            'projectNum=' + $('#projectNum').val() + '&' +
            'originalNo=' + $('#fileNumBack').val() + '&' +
            'workDayStart=' + $('#workDayStart').val() + '&' +
            'workDayEnd=' + $('#workDayEnd').val() + '&' +
            'provinces=' + (($('#provinces').val() == '-1') ? '' : $('#provinces').val()) + '&' +
            'projectName=' + $('#projectName').val() + '&' +
            'hostPersonName=' + $('#hostPersonName').val() + '&' +
            'publishType=' + ($('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val()) + '&' +
            'protectUnitName=' + $('#unitName').val() + '&' +
            'proSendTimeStart=' + $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'proSendTimeEnd=' + $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
        window.open(api_ea + '/business/exportExcelList?token=' + getData('token') + '&listType=1&' + format);
    });
    //排序初始化
    cmxTableSort({
        callback: function () {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
});
var needFunc = {};
needFunc.pageNum = 1;
if(GetUrlParamString('back') == '-1'){
    if (!IsEmpty(getData('_cnpn'))) {
        needFunc.pageNum = getData('_cnpn');
    }
}
needFunc.pageCount = 0;
needFunc.getNeedToDo = function (param) {

    //剩余工作日只能输入-999至999的数字
    //var reg = /^$|(^[\-\+]?[1-9][0-9]{0,2}$)/;
    var reg = /^(0|-?[1-9]\d{0,2})$/;
    if (!($("#workDayStart").val() == '' || $("#workDayEnd").val() == '') && (!reg.test($("#workDayStart").val()) || !reg.test($("#workDayEnd").val()))) {
        showAlert({
            type: 'error',
            content: '剩余工作日只能输入-999至999范围内的数字'
        });
        return;
    }

    new cmx.process()
        .turn(function (prevModelData, send, abort) {
            send.tomodel({
                data: JSON.stringify({
                    token: getData('token'),
                    pageNo: needFunc.pageNum,
                    pageSize: '15',
                    statusArray: cmx.g.needtodocondition, //'101', '201', '202', '203', '204'
                    tdlFormData: [{
                        proFileTitle: $('#proFileTitle').val(),
                        projectNum: $('#projectNum').val(),
                        originalNo: $('#fileNumBack').val(),
                        workDayStart: $('#workDayStart').val(),
                        workDayEnd: $('#workDayEnd').val(),
                        provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(),
                        projectName: $('#projectName').val(),
                        hostPersonName: $('#hostPersonName').val(),
                        publishType: $('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val(), //单位类型增加全部和无的分类区别，全部传-1 无传空
                        protectUnitName: $('#unitName').val(),
                        proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                        proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
                    }],
                    orderField: cmx.g.orderField,
                    orderMode: cmx.g.orderMode,
                })
            }).go();
        })
        .turn('callajax', {
            url: api_getNeedToDo,
            type: 'POST'
        })
        .turn('getneedToDoList', {})
        .start();
};

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
var globelNeedType = 0;

function changeNeedTodoState(type) {
    globelNeedType = type;
    if (type == 0) {
        cmx.g.needtodocondition = [103, 104, 105, 106, 107, 108, 109, 207, 230, 231, 232, 250, 251, 252, 101, 201, 202, 203, 204, 206, 207, 208, 209, 213, 214, 215, 216, 223, 224, 225, 226, 227, 303, 304, 305, 497, 498, 877, 878, 495, 496, 987, 499, 773, 776, 777, 999];
        $('#search-export').off('click');
        $('#search-export').on('click', function () {
            var format =
                'orderField=' + cmx.g.orderField + '&' +
                'orderMode=' + cmx.g.orderMode + '&' +
                'proFileTitle=' + $('#proFileTitle').val() + '&' +
                'projectNum=' + $('#projectNum').val() + '&' +
                'originalNo=' + $('#fileNumBack').val() + '&' +
                'workDayStart=' + $('#workDayStart').val() + '&' +
                'workDayEnd=' + $('#workDayEnd').val() + '&' +
                'provinces=' + (($('#provinces').val() == '-1') ? '' : $('#provinces').val()) + '&' +
                'projectName=' + $('#projectName').val() + '&' +
                'hostPersonName=' + $('#hostPersonName').val() + '&' +
                'publishType=' + ($('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val()) + '&' +
                'protectUnitName=' + $('#unitName').val() + '&' +
                'proSendTimeStart=' + $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
                'proSendTimeEnd=' + $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
            window.open(api_ea + '/business/exportExcelList?token=' + getData('token') + '&listType=1&' + format);
        });
        clearData('needtotype');
    } else {
        putData('needtotype', '1');
        cmx.g.needtodocondition = ["205"];
        $('#search-export').off('click');
        $('#search-export').on('click', function () {
            var format =
                'orderField=' + cmx.g.orderField + '&' +
                'orderMode=' + cmx.g.orderMode + '&' +
                'proFileTitle=' + $('#proFileTitle').val() + '&' +
                'projectNum=' + $('#projectNum').val() + '&' +
                'originalNo=' + $('#fileNumBack').val() + '&' +
                'workDayStart=' + $('#workDayStart').val() + '&' +
                'workDayEnd=' + $('#workDayEnd').val() + '&' +
                'provinces=' + (($('#provinces').val() == '-1') ? '' : $('#provinces').val()) + '&' +
                'projectName=' + $('#projectName').val() + '&' +
                'hostPersonName=' + $('#hostPersonName').val() + '&' +
                'publishType=' + ($('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val()) + '&' +
                'protectUnitName=' + $('#unitName').val() + '&' +
                'proSendTimeStart=' + $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
                'proSendTimeEnd=' + $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
            window.open(api_ea + '/business/exportExcelList?token=' + getData('token') + '&listType=4&' + format);
        });
    }
    needFunc.pageNum = 1;
    // $('#select-applynum-input').val('');
    // $('#projectNum').val('');
    // $('#proFileTitle').val('');
    // $('#fileNumBack').val('');
    // $('#projectName').val('');
    // $('#unitName').val('');
    // $('#publishTypeName option').each(function () {
    //     if ($(this).text() == '全部') {
    //         $(this).attr('selected', true);
    //     }
    // });
    // $("#publishTypeName").selectpicker('refresh');
    // $('#unitName').val('');
    // $('#proSendTimeStart').val('');
    // $('#proSendTimeEnd').val('');
    // $('#provinces').val('-1');
    // $("#provinces").selectpicker('refresh');
    // $('#workDayStart').val('');
    // $('#workDayEnd').val('');
    needFunc.getNeedToDo();
}

function showzhuanjia(_applyId, _projectNum) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubExamopinion/getSimpDatasByApprItemAndApplyID', //getDataListByApprItemAndApplyID
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                apprItem: _projectNum,
                applyId: _applyId,
                formData: []
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                if (data.length > 0) {
                    var _html = '';
                    for (var i in data) {
                        if (IsEmpty(data[i].exportId))
                            continue;
                        var _tag = '';
                        if (data[i].dealFlag == '4') {
                            _tag = data[i].expertResultsName;
                        } else {
                            _tag = data[i].dealFlagName;
                        }
                        var _name = (IsEmpty(data[i].exportName) ? data[i].exportId : data[i].exportName);
                        _html += _name + '（' + data[i].examClassName + '）：' + _tag + '<br>';

                    }
                    showAlert({
                        type: 'alert',
                        content: _html
                    });
                    return;
                }
            }
            showAlert({
                type: 'success',
                content: '尚未选择专家'
            });
        })
        .start();
}

function temporaryCondition() {
    var condition_str = JSON.stringify({
        proFileTitle: $('#proFileTitle').val(),
        projectNum: $('#projectNum').val(),
        originalNo: $('#fileNumBack').val(),
        workDayStart: $('#workDayStart').val(),
        workDayEnd: $('#workDayEnd').val(),
        provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(),
        projectName: $('#projectName').val(),
        hostPersonName: $('#hostPersonName').val(),
        publishType: $('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val(),
        protectUnitName: $('#unitName').val(),
        proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
        proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
    });
    putData('condition_str', condition_str);
}