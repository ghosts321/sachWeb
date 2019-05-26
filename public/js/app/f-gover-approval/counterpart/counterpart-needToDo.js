'use strict';
cmx.g.regist('needToDoData', undefined);
var searchTyprArray = [];
$(function () {
    var searchType = GetUrlParamString('type');
    switch (searchType) {
        case '1'://博物馆、国保单位、考古领队、资质机构 填报中
            searchTyprArray = [];
            $('.panel-title').html('申请-填报中');
            break;
        case '2'://发掘资质单位 待办
            searchTyprArray = [];
            $('.panel-title').html('受理审批-待办');
            break;
        case '3'://省局专用账号 已报送
            searchTyprArray = ['401', '505'];
            $('.panel-title').html('填报中');
            break;
        default:
            $('.panel-title').html('全部工作任务');
            break;
    }
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
                        url: api_getProjectNumByUser,
                        data: JSON.stringify({
                            token: getData('token'),
                            belongSys: '1'//1：行政审批管理，3：行业综合管理            
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
        .turn('provinceNeedInit')
        .cfinally(function () {
            $('#publishTypeName').selectpicker({
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
    $('#fileNumBack').on('keyup', function (event) {
        if (event.keyCode == 13) {
            needFunc.getNeedToDo();
        }
    });
    $('#projectName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            needFunc.getNeedToDo();
        }
    });
    $('#publishTypeName').on('change', function (event) {
        needFunc.getNeedToDo();
    });

    $('#provinces').on('change', function (event) {
        needFunc.getNeedToDo();
    });
    $('#unitName').on('keyup', function (event) {
        if (event.keyCode == 13) {
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
        // needFunc.getNeedToDo();
    });
    $('#search-btn').click(function () {
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
    });
    //用于国保单位模态框用数据
});
var needFunc = {};
needFunc.pageNum = 1;
needFunc.pageCount = 0;
needFunc.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getNeedToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNo: needFunc.pageNum,
                statusArray: searchTyprArray,
                pageSize: '15',
                tdlFormData: [{
                    proFileTitle: $('#proFileTitle').val(),
                    projectNum: $('#projectNum').val(),
                    originalNo: $('#fileNumBack').val(),
                    projectName: $('#projectName').val(),
                    publishType: $('#publishTypeName option:selected').text() == '无' ? '' : $('#publishTypeName').val(),
                    protectUnitName: $('#unitName').val(),
                    proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
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
