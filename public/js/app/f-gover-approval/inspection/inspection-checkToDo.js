'use strict';
cmx.g.regist('needToDoData', undefined);
$(function () {
    var num = true;
    // hide_condition();
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
            hasAll: true
        })
        .turn('buildDataDic', {
            element: $('#ExpertDealFlag'),
            hasAll: true
        })
        .turn('provinceNeedInit')
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
            needFunc.getNeedToDo();
        }
    });
    $('#projectName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            needFunc.getNeedToDo();
        }
    });
    $('#ExpertDealFlag').on('change', function (event) {
        needFunc.getNeedToDo();
    });
    $('#provinces').on('change', function (event) {
        needFunc.getNeedToDo();
    });
    $('.start').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {
        // needFunc.getNeedToDo();
    });
    $('#search-btn').click(function () {
        needFunc.getNeedToDo();
    });
    $('#clear-search-form').click(function () {
        $('#proFileTitle').val('');
        $('#provinces').val('-1');
        $("#provinces").selectpicker('refresh');
        $('#ExpertDealFlag').val('-1').selectpicker('refresh');
        $('#arriveDateBeg').val('');
        $('#arriveDateEnd').val('');
    });
    //用于国保单位模态框用数据
});
var needFunc = {};
needFunc.pageNum = 1;
needFunc.pageCount = 0;
needFunc.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getInspectionCheckToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: needFunc.pageNum,
                pageSize: '15',
                statusArray: [2,3],
                ipaFormData: [{
                    dealFlag: $('#ExpertDealFlag').val(),
                    proFileTitle: $('#proFileTitle').val(),
                    provinces: $('#provinces').val() == '-1' ? '' : $('#provinces').val(),
                    arriveDateBeg: $('#arriveDateBeg').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    arriveDateEnd: $('#arriveDateEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
                }],
            }),
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