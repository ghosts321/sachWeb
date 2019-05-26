'use strict';
cmx.g.regist('haveToDoData', undefined);
$(function () {
    // hide_condition();
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
                            belongSys: '1' //1:行政审批  3:行业综合//新接口不传这个参数
                        }),
                        type: 'POST'
                    })
                    .turn('projectNumByUserInit')
                    .start();
            }
        })
        .turn('initSelectTree', {
            id: 'select-belongOffices-input',
            width: 350,
            height: 250,
            content: '<div class="belongOffices-tree-body"></div>',
            onShow: function () {
                new cmx.process()
                    .turn('callajax', {
                        url: api_aa + "/inst/aaSachinst/getEntityListByGJ",
                        data: {
                            token: getData('token')
                        },
                        type: 'GET',
                        jsonheader: false
                    })
                    .turn('belongOfficesInit', {
                        pitemIdStr: 'sinstId',
                        itemNameStr: 'instName',
                        itemIdStr: 'instId'
                    })
                    .start();
            }
        })
        .turn('buildDataDic', {
            element: $('#status'),
            hasAll: true,
            type: 'select'
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
                        $('#fileNumBack').val(json_con.proFileNum);
                        $('#projectName').val(json_con.projectName);
                        $('#hostPersonName').val(json_con.hostPersonName);
                        $('#networkNum').val(json_con.networkNum);
                        $('#provinces').val(json_con.provinces).selectpicker('refresh');
                        $('#nowadayPerson').val(json_con.nowadayPersonName);
                        $('#proSendTimeStart').val(json_con.proSendTimeStart);
                        $('#proSendTimeEnd').val(json_con.proSendTimeEnd);
                        $('#status').val(json_con.status).selectpicker('refresh');
                        $('#licenseNumber').val(json_con.licenseNumber);
                        $('#refNumber').val(json_con.refNumber);
                        $('#packageTimeStart').val(json_con.packageTimeStart);
                        $('#packageTimeEnd').val(json_con.packageTimeEnd);
                        $('#belongOffices').val(json_con.belongOffices);
                    } else {
                        clearData('condition_str');
                    }
                } catch (err) {

                }
            }
            send.go();
        })
        .turn('provinceHaveInit')
        .cfinally(function () {
            $('#provinces').selectpicker({
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
            $('#status').selectpicker({
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
        })
        .start();
    $('#proFileTitle').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#projectName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#fileNumBack').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#provinces').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    $('#belongOffices').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            needFunc.getNeedToDo();
        }
    });
    $('#nowadayPerson').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#status').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    $('#hostPersonName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#networkNum').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('.shengsong').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        temporaryCondition();
    });
    $('#refNumber').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('.fengfa').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        temporaryCondition();
        // haveFunc.getHaveToDo();
    });
    $('#search-btn').click(function () {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    $('#clear-search-form').click(function () {
        $('#proFileTitle').val('');
        $('#select-applynum-input').val('');
        $('#projectNum').val('');
        $('#fileNumBack').val('');
        $('#projectName').val('');
        $('#publishTypeName option').each(function () {
            if ($(this).text() == '全部') {
                $(this).attr('selected', true);
            }
        });
        $("#publishTypeName").selectpicker('refresh');
        $('#provinces').val('-1');
        $("#provinces").selectpicker('refresh');
        $('#nowadayPerson').val('');
        $('#hostPerson').val('');
        $('#unitName').val('');
        $('#licenseNumber').val('');
        $('#refNumber').val('');
        $('#proSendTimeStart').val('');
        $('#proSendTimeEnd').val('');
        $('#packageTimeStart').val('');
        $('#packageTimeEnd').val('');
        $('#status').val('-1');
        $("#status").selectpicker('refresh');
        $('#hostPersonName').val('');
        $('#networkNum').val('');
        $('#belongOffices').val('');
    });
    //导出excel
    $('#search-export').off('click');
    $('#search-export').on('click', function () {
        var temp =
            'orderField=' + cmx.g.orderField + '&' +
            'orderMode=' + cmx.g.orderMode + '&' +
            'proFileTitle=' + $('#proFileTitle').val() + '&' +
            'projectNum=' + $('#projectNum').val() + '&' +
            'proFileNum=' + $('#fileNumBack').val() + '&' +
            'projectName=' + $('#projectName').val() + '&' +
            'hostPersonName=' + $('#hostPersonName').val() + '&' +
            'networkNum=' + $('#networkNum').val() + '&' +
            'provinces=' + (($('#provinces').val() == '-1') ? '' : $('#provinces').val()) + '&' +
            'nowadayPersonName=' + $('#nowadayPerson').val() + '&' +
            'proSendTimeStart=' + $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'proSendTimeEnd=' + $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'status=' + (($('#status').val() == '-1') ? '' : $('#status').val()) + '&' +
            'refNumber=' + $('#refNumber').val() + '&' +
            'packageTimeStart=' + $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'packageTimeEnd=' + $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'belongOffices=' + $('#belongOffices').val();
        window.open(api_ea + '/business/exportRetrievalList?token=' + getData('token') + '&' + temp);
    });
    //排序初始化
    cmxTableSort({
        callback: function () {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
})
var haveFunc = {};
haveFunc.pageNum = 1;
if (GetUrlParamString('back') == '-1') {
    if (!IsEmpty(getData('_chipn'))) {
        haveFunc.pageNum = getData('_chipn');
    }
}
haveFunc.pageCount = 0;
haveFunc.getHaveToDo = function () {
    new cmx.process()
        .turn(function (prevModelData, send, abort) {
            send.tomodel({
                data: JSON.stringify({
                    token: getData('token'),
                    // queryType:'all',//新接口特别参数
                    pageNo: haveFunc.pageNum,
                    pageSize: '15',
                    tdlFormData: [{
                        proFileTitle: $('#proFileTitle').val(), //文件标题
                        projectNum: $('#projectNum').val(), //项目类型
                        proFileNum: $('#fileNumBack').val(), //原文号
                        projectName: $('#projectName').val(), //项目名称
                        hostPersonName: $('#hostPersonName').val(),
                        networkNum: $('#networkNum').val(),
                        provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(), //省别
                        nowadayPersonName: $('#nowadayPerson').val(), //当前处理人
                        proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //省送开始时间
                        proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //省送结束时间
                        status: $('#status').val() == '-1' ? '' : $('#status').val(), //办理环节
                        licenseNumber: $('#licenseNumber').val(), //许可编号
                        refNumber: $('#refNumber').val(), //批复文号
                        packageTimeStart: $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //封发开始时间
                        packageTimeEnd: $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //封发结束时间
                        belongOffices: $('#belongOffices').val()
                    }],
                    orderField: cmx.g.orderField,
                    orderMode: cmx.g.orderMode,
                })
            }).go();
        })
        .turn('callajax', {
            url: api_historicalList,
            type: 'POST'
        })
        .turn('gethaveToDoList', {})
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

function temporaryCondition() {
    var condition_str = JSON.stringify({
        proFileTitle: $('#proFileTitle').val(), //文件标题
        projectNum: $('#projectNum').val(), //事项类型
        proFileNum: $('#fileNumBack').val(), //原文号
        projectName: $('#projectName').val(), //项目名称
        hostPersonName: $('#hostPersonName').val(),
        networkNum: $('#networkNum').val(),
        provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(), //省别
        nowadayPersonName: $('#nowadayPerson').val(), //当前处理人
        proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //省送开始时间
        proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //省送结束时间
        status: $('#status').val() == '-1' ? '' : $('#status').val(), //办理环节
        licenseNumber: $('#licenseNumber').val(), //许可编号
        refNumber: $('#refNumber').val(), //批复文号
        packageTimeStart: $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //封发开始时间
        packageTimeEnd: $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''), //封发结束时间
        belongOffices: $('#belongOffices').val()
    });
    putData('condition_str', condition_str);
}