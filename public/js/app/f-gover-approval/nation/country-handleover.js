'use strict';
cmx.g.regist('haveToDoData', undefined);
var getBaoBeiJson = public_url + 'data/app/f-gover-approval/province/baobei.json';
var getKaoguBaoBeiJson = public_url + 'data/app/f-gover-approval/province/kaogubaobei.json';
var searchTyprArray = [];
$(function () {
    searchTyprArray = ['210', '902'];
    $('.panel-title').html('办结');
    $('.NationalStatus').hide();
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
            //title:'选择项目类型',
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
            hasEmpty: true,
            type: 'select'
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
                        $('#fileNumBack').val(json_con.originalNo);
                        $('#projectName').val(json_con.projectName);
                        $('#hostPersonName').val(json_con.hostPersonName);
                        $('#publishTypeName').val(json_con.publishType).selectpicker('refresh');
                        $('#provinces').val(json_con.provinces).selectpicker('refresh');
                        $('#protectUnitName').val(json_con.protectUnitName);
                        $('#nowadayPerson').val(json_con.nowadayPersonName);
                        $('#proSendTimeStart').val(json_con.proSendTimeStart);
                        $('#proSendTimeEnd').val(json_con.proSendTimeEnd);
                        $('#status').val(json_con.status).selectpicker('refresh');
                        $('#refNumber').val(json_con.refNumber);
                        $('#packageTimeStart').val(json_con.packageTimeStart);
                        $('#packageTimeEnd').val(json_con.packageTimeEnd);
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
            $('#status').selectpicker({
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
        })
        .start();
    $('#proFileTitle').on('keyup', function (event) {
        if (event.keyCode == 13) {
            haveFunc.getHaveToDo();
        }
    });
    $('#fileNumBack').on('keyup', function (event) {
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
    $('#publishTypeName').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    $('#provinces').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    $('#nowadayPerson').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#hostPerson').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#unitName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    $('#licenseNumber').on('keyup', function (event) {
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
    $('.shengsong').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        temporaryCondition();
        // haveFunc.getHaveToDo();
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
    });
    //导出excel
    $('#search-export').off('click');
    $('#search-export').on('click', function () {
        var temp = 'proFileTitle=' + $('#proFileTitle').val() + '&' +
            'projectNum=' + $('#projectNum').val() + '&' +
            'originalNo=' + $('#fileNumBack').val() + '&' +
            'projectName=' + $('#projectName').val() + '&' +
            'hostPersonName=' + $('#hostPersonName').val() + '&' +
            'publishType=' + ($('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val()) + '&' +
            'provinces=' + (($('#provinces').val() == '-1') ? '' : $('#provinces').val()) + '&' +
            'protectUnitName=' + $('#unitName').val() + '&' +
            'nowadayPersonName=' + $('#nowadayPerson').val() + '&' +
            'proSendTimeStart=' + $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'proSendTimeEnd=' + $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'status=' + (($('#status').val() == '-1') ? '' : $('#status').val()) + '&' +
            'refNumber=' + $('#refNumber').val() + '&' +
            'packageTimeStart=' + $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '') + '&' +
            'packageTimeEnd=' + $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
        window.open(api_ea + '/business/exportExcelList?token=' + getData('token') + '&listType=5&' + temp);
    });
})

var haveFunc = {};
haveFunc.pageNum = 1;
if (GetUrlParamString('back') == '-1') {
    if (!IsEmpty(getData('_chpn'))) {
        haveFunc.pageNum = getData('_chpn');
    }
}
haveFunc.pageCount = 0;
haveFunc.getHaveToDo = function () {
    new cmx.process()
        .turn(function (prevModelData, send, abort) {
            send.tomodel({
                data: JSON.stringify({
                    token: getData('token'),
                    pageNo: haveFunc.pageNum,
                    pageSize: '15',
                    statusArray: searchTyprArray,
                    tdlFormData: [{
                        proFileTitle: $('#proFileTitle').val(),
                        projectNum: $('#projectNum').val(),
                        originalNo: $('#fileNumBack').val(),
                        projectName: $('#projectName').val(),
                        hostPersonName: $('#hostPersonName').val(),
                        publishType: $('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val(),
                        provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(),
                        protectUnitName: $('#unitName').val(),
                        nowadayPersonName: $('#nowadayPerson').val(),
                        proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                        proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                        status: $('#status').val() == '-1' ? '' : $('#status').val(),
                        refNumber: $('#refNumber').val(),
                        packageTimeStart: $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                        packageTimeEnd: $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    }],
                })
            }).go();
        })
        .turn('callajax', {
            url: api_getHandleover,
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
        proFileTitle: $('#proFileTitle').val(),
        projectNum: $('#projectNum').val(),
        originalNo: $('#fileNumBack').val(),
        projectName: $('#projectName').val(),
        hostPersonName: $('#hostPersonName').val(),
        publishType: $('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val(),
        provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(),
        protectUnitName: $('#unitName').val(),
        nowadayPersonName: $('#nowadayPerson').val(),
        proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
        proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
        status: $('#status').val() == '-1' ? '' : $('#status').val(),
        refNumber: $('#refNumber').val(),
        packageTimeStart: $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
        packageTimeEnd: $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
    });
    putData('condition_str', condition_str);
}

function loadData(param) {
    $.ajax({
        url: param.url,
        type: "GET",
        async: false,
        success: function (result) {
            var data = result;
            for (var i = 0; i < data.length; i++) {
                var type = data[i].type;
                var width = data[i].extra.width;
                var notnull = (data[i].attribute.notnull == 1) ? true : false;
                var attrstring = 'cmx-tag="cmx" cmx-lib="' + data[i].serialnumber + '" cmx-index="' + data[i].columnindex +
                    '" cmx-column="' + data[i].columnname + '" cmx-type="' + data[i].type + '" cmx-require="' +
                    notnull + '"';
                if (data[i].extra.width == "") {
                    width = 12;
                }
                if (type == 'text' || type == 'single' || type == 'extra') {
                    attrstring = attrstring + 'cmx-stype="' + data[i].attribute.stype + '"';
                }
                new cmx.process()
                    .turn('automated-form-' + type, {
                        "element": param.element,
                        "data": data[i],
                        "width": width,
                        "notnull": notnull,
                        "attrstring": attrstring
                    })
                    .ccatch(function (msg) {
                        console.log('异常终止了 ' + msg);
                    })
                    .cfinally(function () {
                        try {
                            if (!IsEmpty(data[i].extra.func))
                                eval(data[i].extra.func + '(' + JSON.stringify(data[i]) + ')');
                        } catch (exception) {

                        }

                    }).start();
            }
            $('#cmx-i-951').val(getData('userName'));
        },
        error: function (result) {
            showAlert({
                type: 'error',
                content: '网络连接失败，请确认网络连接'
            });
        },
        complete: function (result) {

        }
    });
}