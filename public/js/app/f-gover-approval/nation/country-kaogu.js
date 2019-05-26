'use strict';
cmx.g.regist('haveToDoData', undefined);
var getKaoguBaoBeiJson = public_url + 'data/app/f-gover-approval/province/kaogubaobei.json';
var searchTyprArray = [];
$(function () {
    if (getData('userId') == 'kaoguchu') {
        $('#cmx-huiqian').show();
    }

    //搜索框里的年份，默认当前年份
    var cmx_year = new Date();
    var cmx_currentyear = cmx_year.getFullYear();
    var cmx_fullyear = [];
    var option_1 = [];
    cmx_fullyear[0] = cmx_currentyear;
    for (var i = 1; i < 5; i++) {
        cmx_fullyear[i] = cmx_currentyear - i;
    }
    for (var j = 0; j < cmx_fullyear.length; j++) {
        option_1 = option_1 + '<option value="' + cmx_fullyear[j] + '"' + (cmx_fullyear[j] == cmx_currentyear ?
            'selected="selected"' : '') + '>' + cmx_fullyear[j] + '</option>';
    }
    $("#year").append(option_1);
    $('#kaogu-select-all').on('click', function () {
        $('#cmx-htd-tbody [type="checkbox"]').each(function () {
            $(this).prop("checked", !$(this).prop("checked"));
            if ($(this).is(':checked')) {
                cmx.g.excelApplyId.push($(this).attr("apply"));
            } else {
                for (var i = 0; i < cmx.g.excelApplyId.length; i++) {
                    if (cmx.g.excelApplyId[i] == $(this).attr("apply")) {
                        cmx.g.excelApplyId.splice(i, 1);
                    }
                }
            }
        });
        var chknum = $('#cmx-htd-tbody [type="checkbox"]').size(); //选项总个数
        var chk = 0;
        $('#cmx-htd-tbody [type="checkbox"]').each(function () {
            if ($(this).prop("checked") == true) {
                chk++;
            }
        });
        if (chknum == chk) { //全选
            $('#cmx-htd-tbody th:first input').prop("checked", true);
        } else { //不全选
            $('#cmx-htd-tbody th:first input').prop("checked", false);
        }
    });

    var num = true;
    // 展示或隐藏高级搜索
    $('.show-info').on('click', function () {
        if (num == true) {
            num = false;
            show_condition();
        } else {
            num = true;
            hide_condition();
        }
    });
    // 从数据字典里获取数据
    new cmx.process()
        .turn('buildDataDic', {
            // 获取省份
            element: $('#provinces'),
            hasAll: true,
            type: 'select'
        })
        .turn('buildDataDic', {
            // 获取发掘省份
            element: $('#objProvince'),
            hasAll: true,
            type: 'select'
        })
        .turn('buildDataDic', {
            // 获取考古时代
            element: $('#archAeological'),
            hasAll: true,
            type: 'select'
        })
        .turn('buildDataDic', {
            // 文物保护级别
            element: $('#relicUnitRank'),
            hasAll: true,
            hasEmpty: true,
            type: 'select'
        })
        .turn('buildDataDic', {
            // 报备状态
            element: $('#reportState'),
            hasAll: true,
            type: 'select'
        })
        .turn(function (prevModelData, send, abort) {
            if (getData('condition_str')) {
                try {
                    if (GetUrlParamString('back') == '-1') {
                        var json_con = JSON.parse(getData('condition_str'));
                        $('#provinces').val(json_con.provinces).selectpicker('refresh');
                        $('#year').val(json_con.year);
                        $('#projectName').val(json_con.projectName);
                        $('#applyUnitName').val(json_con.applyUnitName);
                        $('#status').val(json_con.status).selectpicker('refresh');
                        $('#leUnitName').val(json_con.leUnitName);
                        $('#archNumber').val(json_con.archNumber);
                        $('#unitAddress').val(json_con.unitAddress);
                        $('#objProvince').val(json_con.objProvince).selectpicker('refresh');
                        $('#archAeological').val(json_con.archAeological).selectpicker('refresh');
                        $('#relicUnitRank').val(json_con.relicUnitRank);
                        $('#appLeaderID').val(json_con.leaderId);
                        $('#appLeader').val(json_con.leaderName);
                        $('#cmx-phavePage .pagesize').val(json_con.pageSize);
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
            $('#status').selectpicker({
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
        })
        .start();
    // 按回车后搜索，或select选中后搜索
    //省份
    $('#provinces').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    //年份
    $('#year').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    //项目申报状态
    $('#status').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    //项目名称
    $('#projectName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //主申请单位
    $('#applyUnitName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //配合申请单位
    $('#leUnitName').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //存档编号
    $('#archNumber').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //发掘单位地址
    $('#unitAddress').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //发掘省份
    $('#objProvince').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    //遗址或墓葬时代
    $('#archAeological').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    //文物保护单位级别
    $('#relicUnitRank').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    //考古领队编号
    $('#appLeaderID').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //考古领队姓名
    $('#appLeader').on('keyup', function (event) {
        if (event.keyCode == 13) {
            temporaryCondition();
            haveFunc.getHaveToDo();
        }
    });
    //报备状态
    $('#reportState').on('change', function (event) {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    // 点击搜索进行查询
    $('#search-btn').click(function () {
        temporaryCondition();
        haveFunc.getHaveToDo();
    });
    // 点清除后查询条件清空
    $('#clear-search-form').click(function () {
        $('#provinces').find("option[value='-1']").attr("selected", true);
        $('#year').find("option[value='" + cmx_currentyear + "']").attr("selected", true);
        $('#status').find("option[value='-1']").attr("selected", true);
        $('#projectName').val('');
        $('#applyUnitName').val('');
        $('#leUnitName').val('');
        $('#archNumber').val('');
        $('#unitAddress').val('');
        $('#objProvince').find("option[value='-1']").attr("selected", true);
        $('#archAeological').find("option[value='-1']").attr("selected", true);
        $('#relicUnitRank').val('');
        $('#appLeaderID').val('');
        $('#appLeader').val('');
    });
    //导出excel
    $("#cmx-excel").on('click', function () {
        if (cmx.g.excelApplyId.length == 0) {
            showAlert({
                type: 'error',
                content: '请至少选择一项数据'
            });
            return;
        }
        window.open(api_ea + '/eaAeAcpNorApply/getExcelByParam?token=' + getData('token') + '&ipaFormData=' + cmx.g.excelApplyId);
    });
    //会签
    $('#cmx-huiqian').on('click', function () {
        window.location.href = '/app/f-gover-approval/nation/qianbao.html?type=0&nowid=' + GetUrlParamString('nowid');
    });
})

var haveFunc = {};
haveFunc.pageNum = 1;
if (GetUrlParamString('back') == '-1') {
    if (!IsEmpty(getData('_ckpn'))) {
        haveFunc.pageNum = getData('_ckpn');
    }
}
haveFunc.pageCount = 0;
haveFunc.getHaveToDo = function () {
    new cmx.process()
        .turn(function (prevModelData, send, abort) {
            send.tomodel({
                data: JSON.stringify({
                    token: getData('token'),
                    pageNumber: haveFunc.pageNum,
                    pageSize: (IsEmpty($('#cmx-phavePage .pagesize').find(':selected').val())) ? 15 :$('#cmx-phavePage .pagesize').find(':selected').val(),
                    statusArray: searchTyprArray,
                    ipaFormData: [{
                        provinces: ($('#provinces').find("option:selected").val() == '-1') ? '' : $('#provinces').find("option:selected").val(), //省份
                        createDate: $('#year').find(":selected").val(), //年份
                        projectName: $('#projectName').val(), //项目名称
                        applyUnitName: $('#applyUnitName').val(), //主申请单位
                        status: $('#status').val() == '-1' ? '' : $('#status').val(), //申报状态
                        leUnitName: $('#leUnitName').val(), //配合申请单位
                        archNumber: $('#archNumber').val(), //存档编号
                        unitAddress: $('#unitAddress').val(), //考古发掘地址
                        objProvince: ($('#objProvince').find("option:selected").val() == '-1') ? '' : $('#objProvince').find("option:selected").val() + '0000', //发掘省份
                        archaeological: ($('#archAeological').find("option:selected").val() == '-1') ? '' : $('#archAeological').find("option:selected").val(), //考古时代
                        relicUnitRank: ($('#relicUnitRank').val() == '-1') ? '' : $('#relicUnitRank').val(), //文保单位级别
                        leaderId: $('#appLeaderID').val(), //项目负责人编号
                        leaderName: $('#appLeader').val(), //项目负责人姓名
                        endReportFlag: ($('#reportState').val() == '-1') ? '' : $('#reportState').val(), //报备状态
                    }],
                })
            }).go();
        })
        .turn('callajax', {
            url: api_getKaoguList,
            type: 'POST'
        })
        .turn('gethaveToDoList', {})
        .start();
};

function changePageSize() {
    temporaryCondition();
    haveFunc.getHaveToDo();
}

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
        provinces: $('#provinces').find("option:selected").val(), //省份
        createDate: $('#year').find(":selected").val(), //年份
        projectName: $('#projectName').val(), //项目名称
        applyUnitName: $('#applyUnitName').val(), //主申请单位
        status: $('#status').val() == '-1' ? '' : $('#status').val(), //申报状态
        leUnitName: $('#leUnitName').val(), //配合申请单位
        archNumber: $('#archNumber').val(), //存档编号
        unitAddress: $('#unitAddress').val(), //考古发掘地址
        objProvince: $('#objProvince').find("option:selected").val(), //发掘省份
        archaeological: $('#archAeological').find("option:selected").val(), //考古时代
        relicUnitRank: $('#relicUnitRank').val(), //文保单位级别
        leaderId: $('#appLeaderID').val(), //项目负责人编号
        leaderName: $('#appLeader').val(), //项目负责人姓名
        pageSize: $('#cmx-phavePage .pagesize').find(':selected').val()
    });
    putData('condition_str', condition_str);
}