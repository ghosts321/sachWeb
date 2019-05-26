'use strict';
cmx.g.regist('haveToDoData', undefined);
var getBaoBeiJson = public_url + 'data/app/f-gover-approval/province/baobei.json';
var _completeType = '';
$(function () {
    var searchType = GetUrlParamString('type');
    var selectListForProvinceFlag = 3;
    switch (searchType) {
        case '1':
            _completeType = '1';
            $('.panel-title').html('申请办结');
            selectListForProvinceFlag = 1;
            break;
        case '2':
            _completeType = '2';
            $('.panel-title').html('审批办结');
            selectListForProvinceFlag = 2;
            break;
        default:
            $('.panel-title').html('全部已完成任务');
            break;
    }
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
            //title:'选择项目类型',
            width: 350,
            height: 'auto',
            content: '<div class="project-num-tree-body"></div>',
            onShow: function () {
                new cmx.process()
                    .turn('callajax', {
                        url: api_getProjectNumForProvince,
                        data: JSON.stringify({
                            token: getData('token'),
                            flag: selectListForProvinceFlag,
                            belongSys: '1'//1行政审批管理 3行业综合管理
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
        .turn('provinceHaveInit')
        .cfinally(function () {
            $('#publishTypeName').selectpicker({
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
            haveFunc.getHandleover();
        }
    });
    $('#fileNumBack').on('keyup', function (event) {
        if (event.keyCode == 13) {
            haveFunc.getHandleover();
        }
    });
    $('#projectName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            haveFunc.getHandleover();
        }
    });
    $('#publishTypeName').on('change', function (event) {
        haveFunc.getHandleover();
    });
    $('#unitName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            haveFunc.getHandleover();
        }
    });
    $('#licenseNumber').on('keyup', function (event) {
        if (event.keyCode == 13) {
            haveFunc.getHandleover();
        }
    });
    $('#status').on('change', function (event) {
        haveFunc.getHandleover();
    });
    $('.start').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        // haveFunc.getHandleover();
    });
    $('#refNumber').on('keyup', function (event) {
        if (event.keyCode == 13) {
            haveFunc.getHandleover();
        }
    });
    $('.fengfa').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        // haveFunc.getHandleover();
    });
    $('#search-btn').click(function () {
        haveFunc.getHandleover();
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
        $('#proSendTimeStart').val('');
        $('#proSendTimeEnd').val('');
        $('#licenseNumber').val('');
        $('#status').val('-1');
        $("#status").selectpicker('refresh');
        $('#refNumber').val('');
        $('#packageTimeStart').val('');
        $('#packageTimeEnd').val('');
    });
})
var haveFunc = {};
haveFunc.pageNum = 1;
haveFunc.pageCount = 0;
haveFunc.getHandleover = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getHandleover,
            data: JSON.stringify({
                token: getData('token'),
                pageNo: haveFunc.pageNum,
                pageSize: '15',
                completeType: _completeType,
                tdlFormData: [{
                    proFileTitle: $('#proFileTitle').val(),
                    projectNum: $('#projectNum').val(),
                    originalNo: $('#fileNumBack').val(),
                    projectName: $('#projectName').val(),
                    publishType: $('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val(),
                    protectUnitName: $('#unitName').val(),
                    proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    status: $('#status').val() == '-1' ? '' : $('#status').val(),
                    licenseNumber: $('#licenseNumber').val(),
                    refNumber: $('#refNumber').val(),
                    sendDateStart: $('#packageTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    sendDateEnd: $('#packageTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                }],
            }),
            type: 'POST'
        })
        .turn('getHandleoverList', {})
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