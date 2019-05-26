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
            //title:'选择项目类型',
            width: 350,
            height: 'auto',
            content: '<div class="project-num-tree-body"></div>',
            onShow: function () {
                new cmx.process()
                    .turn('callajax', {
                        url: api_getProjectNumForExport,
                        data: JSON.stringify({
                            token: getData('token'),
                            belongSys: ''//1行政审批管理 3行业综合管理 空是所有
                        }),
                        type: 'POST'
                    })
                    .turn('projectNumByUserInit')
                    .start();
            }
        })
        .turn('buildDataDic', {
            element: $('#provinces'),
            hasAll: true,
            type: 'select'
        })
        .turn('provinceHaveInit')
        .cfinally(function () {
            $('#provinces').selectpicker({
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
        $('#projectName').on('keyup', function (event) {
            if (event.keyCode == 13) {
                haveFunc.getHaveToDo();
            }
        });
    
        $('#provinces').on('change', function (event) {
            haveFunc.getHaveToDo();
        });
        $('.start').find('.input-daterange').datepicker({ //日期控件
            language: 'zh-CN',
            autoclose: true, //选择之后是否关闭日期选项
            todayHighlight: true, //当为true的时候高亮
            keyboardNavigation: true,
            format: 'yyyy-mm-dd',
        }).on('changeDate', function (ev) {  
            // haveFunc.getHaveToDo();
        });
    $('#search-btn').click(function () {
        haveFunc.getHaveToDo();
    });
    $('#clear-search-form').click(function () {
        $('#select-applynum-input').val('');
        $('#projectNum').val('');
        $('#proFileTitle').val('');
        $('#provinces').val('-1');
        $("#provinces").selectpicker('refresh');
        $('#projectName').val('');
        $('#apprDateBeg').val('');
        $('#apprDateEnd').val('');
    });
})
var haveFunc = {};
haveFunc.pageNum = 1;
haveFunc.pageCount = 0;
haveFunc.getHaveToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getInspectionHaveToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: haveFunc.pageNum,
                pageSize: '15',
                tdlFormData: [{
                    proFileTitle: $('#proFileTitle').val(),
                    projectNum: $('#projectNum').val(),
                    provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(),
                    projectName: $('#projectName').val(),
                    apprDateBeg: $('#apprDateBeg').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    apprDateEnd: $('#apprDateEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
                }],
            }),
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