/*
 * @Author: lvjinxiu 
 * @Date: 2018-05-16 17:59:35 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-06-28 17:35:30
 */

var _projectType = '2';
var _projectNum = '56011';
var _changeid = '';
var _appType = '';
cmx.g.regist('eaIchCrpProjectList', new HashMap());
$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click', function () {
        history.go(-1);
    });
    new cmx.process().
    turn('initFiles', {
        'P00015': '57',
        'P00016': '58',
        'P00017': '59',
        'P00018': '60',
        'P00019': '61',
        'P00031': '66',
        'P00032': '67',
        'P00033': '68',
        'P00034': '69',
        'P00035': '70',
        'P00039': '27'
    }).start();
    //创建表单
    CreateApplicationForm({
        element: "#cmx-form",
        url: public_url + 'data/app/f-gover-approval/56011/56011-apply.json'
    })
    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
        }
    });
    $("#cmx-modalDiv").load(public_url + 'app/f-gover-approval/include/56011-modal.html', function () {
        //新增项目
        $('#cmx-add-protect-btn').on('click', function () {
            $("#addProtectModal").off('show.bs.modal');
            $("#addProtectModal").off('hide.bs.modal');
            $("#addProtectModal").on('show.bs.modal', function () {
                $('#cmx-add-protect-save').unbind('click');
                $('#cmx-add-protect-save').bind('click', function () {
                    //基本表单验证
                    var temp_flag = checkFormLength('#cmx-protect-form');
                    if (!temp_flag) {
                        return;
                    }
                    //特殊验证
                    if (IsEmpty($('#cmx-i-1016-1').val())) {
                        showAlert({
                            type: "info",
                            content: "批准文件号前不能为空"
                        });
                        return;
                    }
                    if ($('#cmx-i-1016-1').val().length > 20) {
                        showAlert({
                            type: "info",
                            content: "批准文件号前可填长度最大为20"
                        });
                        return;
                    }
                    var fileNumBack = $('#cmx-protect-form #cmx-i-1016-3').val();
                    var re = /^[0-9]*$/;
                    if (IsEmpty(fileNumBack)) {
                        showAlert({
                            type: "info",
                            content: "批准文件号后不能为空"
                        });
                        return;
                    }
                    if (!re.test(fileNumBack)) {
                        showAlert({
                            type: "info",
                            content: "批准文件号后可填项只能填数字"
                        });
                        return;
                    }
                    if (fileNumBack.length > 8) {
                        showAlert({
                            type: "info",
                            content: "批准文件号后可填长度最大为8"
                        });
                        return;
                    }
                    var formdata = {
                        protectUnitName: $('#cmx-i-1012').val(),
                        unitLevel: $('#cmx-i-1013').val(),
                        designScheme: $('#cmx-i-1014').val(),
                        permitInst: $('#cmx-i-1015').val(),
                        fileNumFront: $('#cmx-i-1016-1').val(),
                        fileNumMidd: $('#cmx-i-1016-2').find(':selected').val(),
                        fileNumBack: $('#cmx-i-1016-3').val(),
                        remark: $('#cmx-i-1017').val(),
                    };
                    var _ids = 'id' + $('#cmx-protect-tbody tr').length;
                    cmx.g.eaIchCrpProjectList.put(_ids, formdata);
                    var html = [
                        '<tr>',
                        '<td>' + $('#cmx-i-1012').val() + '</td>',
                        '<td>' + $('#cmx-i-1013').val() + '</td>',
                        '<td>' + $('#cmx-i-1014').val() + '</td>',
                        '<td>' + $('#cmx-i-1015').val() + '</td>',
                        '<td>' + $('#cmx-i-1016-1').val() + '[' + $('#cmx-i-1016-2').find(':selected').val() + ']' + $('#cmx-i-1016-3').val() + '</td>',
                        '<td>' + $('#cmx-i-1017').val() + '</td>',
                        '<td>',
                        '<button class="btn btn-info btn-sm margin-right-10" onclick="editProtectData(event,this,\'' + _ids + '\');">编辑</button>',
                        (GetUrlParamString('type') == '1') ? '<button class="btn btn-danger btn-sm" onclick="deleteProtectData(event,this,\'' + _ids + '\');">删除</button>' : "",
                        '</td>',
                        '</tr>',
                    ].join('');
                    $('#cmx-protect-tbody').append(html);
                    $("#addProtectModal").modal('hide');
                    console.log(cmx.g.eaIchCrpProjectList.values())
                });
            });
            $("#addProtectModal").on('hide.bs.modal', function () {
                $("#addProtectModal input").val('');
                $("#addProtectModal textarea").val('');
                $("#addProtectModal").find('option').first().attr('selected', true);
            });
            $("#addProtectModal").modal('show');
        });
    })

    $("#cmx-noNationProject-save").on("click", function () {
        
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //特殊验证
        if (IsEmpty($('#cmx-i-37-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-i-37-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-37-3').val();
        var re = /^[0-9]*$/;
        if (IsEmpty(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后不能为空"
            });
            return;
        }
        if (!re.test(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后可填项只能填数字"
            });
            return;
        }
        if (fileNumBack.length > 8) {
            showAlert({
                type: "info",
                content: "省文件号后可填长度最大为8"
            });
            return;
        }
        var applyQualityLevel = [];
        $('#cmx-special-P00013 input').each(function () {
            if ($(this).is(':checked')) {
                applyQualityLevel.push($(this).val());
            }
        });
        var unitQualifications = [];
        $('#cmx-special-P00012 input').each(function () {
            if ($(this).is(':checked')) {
                unitQualifications.push($(this).val());
            }
        });
        if (IsEmpty($("#P0008date-start").val())) {
            showAlert({
                type: "info",
                content: "请选择从业开始时间"
            });
            return;
        }
        if (IsEmpty($("#P0008date-end").val())) {
            showAlert({
                type: "info",
                content: "请选择从业结束时间"
            });
            return;
        }
        if (unitQualifications.length == 0) {
            showAlert({
                type: "info",
                content: "请选择资质类型"
            });
            return;
        }
        if (applyQualityLevel.length == 0) {
            showAlert({
                type: "info",
                content: "请选择申请资质等级及业务范围"
            });
            return;
        }
        if (parseInt($('#cmx-i-26').val()) < 0) {
            showAlert({
                type: "info",
                content: "人员总数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-27').val()) < 0) {
            showAlert({
                type: "info",
                content: "责任设计师人数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-28').val()) < 0) {
            showAlert({
                type: "info",
                content: "其他专业技术骨干人数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-29').val()) < 0) {
            showAlert({
                type: "info",
                content: "返聘的离退休专业技术骨干人数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-26').val()) < (parseInt($('#cmx-i-27').val()) + parseInt($('#cmx-i-28').val()) + parseInt($('#cmx-i-29').val()))) {
            showAlert({
                type: "info",
                content: "人员总数不能小于责任设计师人数、其他专业技术骨干人数、返聘的离退休专业技术骨干人数总和"
            });
            return;
        }
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            fileNumFront: $("#cmx-form #cmx-i-37-1").val(), //省文件号最后一个 类型：String  必有字段  备注：无
            fileNumMidd: $("#cmx-form #cmx-i-37-2").val(), //省文件号第一个 类型：String  必有字段  备注：无
            fileNumBack: $("#cmx-form #cmx-i-37-3").val(), //省文件号第二个 类型：String  必有字段  备注：无
            proFileTitle: $("#cmx-form #cmx-i-38").val(), //省文件标题 类型：String  必有字段  备注：无

            unitName: $("#cmx-form #cmx-i-2").val(),
            unitAddress: $("#cmx-form #cmx-i-3").val(),
            economicsNature: $("#cmx-form #cmx-i-4").val(),
            contactTel: $("#cmx-form #cmx-i-5").val(),
            registerFund: $("#cmx-form #cmx-i-6").val(),
            postalCode: $("#cmx-form #cmx-i-7").val(),
            workBeginDate: $("#P0008date-start").val(),
            workEndDate: $("#P0008date-end").val(),
            appDepartNum: $("#cmx-form #cmx-i-9").val(),
            oldQualityLevel: $("#cmx-form #cmx-i-10").val(),
            mngDept: $("#cmx-form #cmx-i-11").val(),
            unitQualifications: unitQualifications,
            applyQualityLevel: applyQualityLevel,
            corpName: $("#cmx-form #cmx-i-21").val(),
            corpEducation: $("#cmx-form #cmx-i-36").find(':selected').val(),
            corpIdcard: $("#cmx-form #cmx-i-22").val(),
            corpPosition: $("#cmx-form #cmx-i-23").val(),
            corpResume: $("#cmx-form #cmx-i-24").val(),
            technicistNum: $("#cmx-form #cmx-i-26").val(),
            designerNum: $("#cmx-form #cmx-i-27").val(),
            otherTechnicistNum: $("#cmx-form #cmx-i-28").val(),
            reemployNum: $("#cmx-form #cmx-i-29").val(),
            appType: _appType,
            eaIchCrpProjectList: cmx.g.eaIchCrpProjectList.values(),
            files: getFileListForSave(cmx.g.filelinkfileclass),
            applyId: cmx.g.applyId,
            projectType: _projectType, //项目类型 类型：String  必有字段  备注：无
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType //单位类别 类型：String  必有字段  备注：无
        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchCrpApply/saveEaIchCrpApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: ss
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '保存成功'
                        });
                        cmx.g.applyId = result.data.applyId;
                        console.log(result);
                        console.log(cmx.g.applyId);
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '保存失败'
                    });
                },
                complete: function () {}
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () {

            }).
        start();
    });
    $("#cmx-noNationProject-send").on("click", function () {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //特殊验证
        if (IsEmpty($('#cmx-i-37-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-i-37-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-37-3').val();
        var re = /^[0-9]*$/;
        if (IsEmpty(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后不能为空"
            });
            return;
        }
        if (!re.test(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后可填项只能填数字"
            });
            return;
        }
        if (fileNumBack.length > 8) {
            showAlert({
                type: "info",
                content: "省文件号后可填长度最大为8"
            });
            return;
        }
        var applyQualityLevel = [];
        $('#cmx-special-P00013 input').each(function () {
            if ($(this).is(':checked')) {
                applyQualityLevel.push($(this).val());
            }
        });
        var unitQualifications = [];
        $('#cmx-special-P00012 input').each(function () {
            if ($(this).is(':checked')) {
                unitQualifications.push($(this).val());
            }
        });
        if (IsEmpty($("#P0008date-start").val())) {
            showAlert({
                type: "info",
                content: "请选择从业开始时间"
            });
            return;
        }
        if (IsEmpty($("#P0008date-end").val())) {
            showAlert({
                type: "info",
                content: "请选择从业结束时间"
            });
            return;
        }
        if (unitQualifications.length == 0) {
            showAlert({
                type: "info",
                content: "请选择资质类型"
            });
            return;
        }
        if (applyQualityLevel.length == 0) {
            showAlert({
                type: "info",
                content: "请选择申请资质等级及业务范围"
            });
            return;
        }
        if (parseInt($('#cmx-i-26').val()) < 0) {
            showAlert({
                type: "info",
                content: "人员总数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-27').val()) < 0) {
            showAlert({
                type: "info",
                content: "责任设计师人数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-28').val()) < 0) {
            showAlert({
                type: "info",
                content: "其他专业技术骨干人数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-29').val()) < 0) {
            showAlert({
                type: "info",
                content: "返聘的离退休专业技术骨干人数不能为负数"
            });
            return;
        }
        if (parseInt($('#cmx-i-26').val()) < (parseInt($('#cmx-i-27').val()) + parseInt($('#cmx-i-28').val()) + parseInt($('#cmx-i-29').val()))) {
            showAlert({
                type: "info",
                content: "人员总数不能小于责任设计师人数、其他专业技术骨干人数、返聘的离退休专业技术骨干人数总和"
            });
            return;
        }
        //发送
        var ss = [{ //类型：Object  必有字段  备注：无
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            fileNumFront: $("#cmx-form #cmx-i-37-1").val(), //省文件号最后一个 类型：String  必有字段  备注：无
            fileNumMidd: $("#cmx-form #cmx-i-37-2").val(), //省文件号第一个 类型：String  必有字段  备注：无
            fileNumBack: $("#cmx-form #cmx-i-37-3").val(), //省文件号第二个 类型：String  必有字段  备注：无
            proFileTitle: $("#cmx-form #cmx-i-38").val(), //省文件标题 类型：String  必有字段  备注：无

            unitName: $("#cmx-form #cmx-i-2").val(),
            unitAddress: $("#cmx-form #cmx-i-3").val(),
            economicsNature: $("#cmx-form #cmx-i-4").val(),
            contactTel: $("#cmx-form #cmx-i-5").val(),
            registerFund: $("#cmx-form #cmx-i-6").val(),
            postalCode: $("#cmx-form #cmx-i-7").val(),
            workBeginDate: $("#P0008date-start").val(),
            workEndDate: $("#P0008date-end").val(),
            appDepartNum: $("#cmx-form #cmx-i-9").val(),
            oldQualityLevel: $("#cmx-form #cmx-i-10").val(),
            mngDept: $("#cmx-form #cmx-i-11").val(),
            unitQualifications: unitQualifications,
            applyQualityLevel: applyQualityLevel,
            corpName: $("#cmx-form #cmx-i-21").val(),
            corpEducation: $("#cmx-form #cmx-i-36").find(':selected').val(),
            corpIdcard: $("#cmx-form #cmx-i-22").val(),
            corpPosition: $("#cmx-form #cmx-i-23").val(),
            corpResume: $("#cmx-form #cmx-i-24").val(),
            technicistNum: $("#cmx-form #cmx-i-26").val(),
            designerNum: $("#cmx-form #cmx-i-27").val(),
            otherTechnicistNum: $("#cmx-form #cmx-i-28").val(),
            reemployNum: $("#cmx-form #cmx-i-29").val(),
            appType: _appType,
            eaIchCrpProjectList: cmx.g.eaIchCrpProjectList.values(),

            files: getFileListForSave(cmx.g.filelinkfileclass),
            applyId: cmx.g.applyId,
            projectType: _projectType, //项目类型 类型：String  必有字段  备注：无
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType //单位类别 类型：String  必有字段  备注：无
        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchCrpApply/sendEaIchCrpApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: ss
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        setTimeout(function () {
                            window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1?nowid=" + GetUrlParamString('nowid');
                        }, 2000);
                    }
                    console.log(result)
                }
            })
            .start();
    });
    //_appType
    if (!IsEmpty(GetUrlParamString('type'))) {
        _appType = GetUrlParamString('type');
    }
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        cmx.g.applyId = GetUrlParamString('applyId');
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchCrpApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST',
            })
            .turn('build56011Input', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }
    if (!IsEmpty(GetUrlParamString('ischange'))) {
        _changeid = GetUrlParamString('ischange');
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchCrpApplyOther/getApplyDataByParam',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    projectNum: '56011', //类型：String  必有字段  备注：项目编号 
                    unitId: getData('unitId')
                }),
                type: 'POST',
            })
            .turn('build56011Input', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildChangeFileList', {
                projectNum: _projectNum,
                applyId: _changeid
            })
            .start();
    }
});

cmx.route.model({
    index: 'build56011Input',
    handle: function (parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            $("#cmx-form #cmx-i-37-1").val(data.fileNumFront);
            $("#cmx-form #cmx-i-37-2").val(data.fileNumMidd);
            $("#cmx-form #cmx-i-37-3").val(data.fileNumBack);
            $("#cmx-form #cmx-i-38").val(data.proFileTitle);
            $("#cmx-form #cmx-i-2").val(data.unitName);
            $("#cmx-form #cmx-i-3").val(data.unitAddress);
            $("#cmx-form #cmx-i-4").val(data.economicsNature);
            $("#cmx-form #cmx-i-5").val(data.contactTel);
            $("#cmx-form #cmx-i-6").val(data.registerFund);
            $("#cmx-form #cmx-i-7").val(data.postalCode);
            $("#P0008date-start").val(data.workBeginDate.substr(0, 10));
            $("#P0008date-end").val(data.workEndDate.substr(0, 10));
            $("#cmx-form #cmx-i-9").val(data.appDepartNum);
            $("#cmx-form #cmx-i-10").val(data.oldQualityLevel);
            $("#cmx-form #cmx-i-11").val(data.mngDept);
            $("#cmx-special-P00012").val(data.unitQualifications);
            $("#cmx-form #cmx-i-21").val(data.corpName);
            $("#cmx-form #cmx-i-36").val(data.corpEducation);
            $("#cmx-form #cmx-i-22").val(data.corpIdcard);
            $("#cmx-form #cmx-i-23").val(data.corpPosition);
            $("#cmx-form #cmx-i-24").val(data.corpResume);
            $("#cmx-form #cmx-i-26").val(data.technicistNum);
            $("#cmx-form #cmx-i-27").val(data.designerNum);
            $("#cmx-form #cmx-i-28").val(data.otherTechnicistNum);
            $("#cmx-form #cmx-i-29").val(data.reemployNum);
            if (!IsEmpty(GetUrlParamString('applyId'))) {
                _appType = data.appType;
            }
            var unitQualifications = data.unitQualifications.split(',');
            for (var i = 0; i < unitQualifications.length; i++) {
                $('#cmx-special-P00012 input').each(function () {
                    if ($(this).val() == unitQualifications[i]) {
                        $(this).iCheck('check');
                    }
                })
            }
            var applyQualityLevel = data.applyQualityLevel.split(',');
            for (var i = 0; i < applyQualityLevel.length; i++) {
                $('#cmx-i-13 input').each(function () {
                    if ($(this).val() == applyQualityLevel[i]) {
                        $(this).iCheck('check');
                    }
                })
            }
            var eadata = data.eaIchCrpProjectList;
            for (var i = 0; i < eadata.length; i++) {
                var formdata = {
                    protectUnitName: eadata[i].protectUnitName,
                    unitLevel: eadata[i].unitLevel,
                    designScheme: eadata[i].designScheme,
                    permitInst: eadata[i].permitInst,
                    fileNumFront: eadata[i].fileNumFront,
                    fileNumMidd: eadata[i].fileNumMidd,
                    fileNumBack: eadata[i].fileNumBack,
                    remark: eadata[i].remark,
                };
                var _ids = 'id' + i;
                cmx.g.eaIchCrpProjectList.put(_ids, formdata);
                var html = [
                    '<tr>',
                    '<td>' + eadata[i].protectUnitName + '</td>',
                    '<td>' + eadata[i].unitLevel + '</td>',
                    '<td>' + eadata[i].designScheme + '</td>',
                    '<td>' + eadata[i].permitInst + '</td>',
                    '<td>' + eadata[i].fileNumFront + '[' + eadata[i].fileNumMidd + ']' + eadata[i].fileNumBack + '</td>',
                    '<td>' + eadata[i].remark + '</td>',
                    '<td>',
                    '<button class="btn btn-info btn-sm margin-right-10" onclick="editProtectData(event,this,\'' + _ids + '\');">编辑</button>',
                    (GetUrlParamString('type') == '1') ? '<button class="btn btn-danger btn-sm" onclick="deleteProtectData(event,this,\'' + _ids + '\');">删除</button>' : "",
                    '</td>',
                    '</tr>',
                ].join('');
                $('#cmx-protect-tbody').append(html);
            }
            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
            }
        }
        send.go();
    }
});

//编辑项目
function editProtectData(ev, ele, dataid) {
    $("#editProtectModal").off('show.bs.modal');
    $("#editProtectModal").off('hide.bs.modal');
    $("#editProtectModal").on('show.bs.modal', function () {
        var data = cmx.g.eaIchCrpProjectList.get(dataid);
        $('#cmx-i-2012').val(data.protectUnitName);
        $('#cmx-i-2013').val(data.unitLevel);
        $('#cmx-i-2014').val(data.designScheme);
        $('#cmx-i-2015').val(data.permitInst);
        $('#cmx-i-2016-1').val(data.fileNumFront);
        $('#cmx-i-2016-2').val(data.fileNumMidd);
        $('#cmx-i-2016-3').val(data.fileNumBack);
        $('#cmx-i-2017').val(data.remark);

        $('#cmx-edit-protect-save').unbind('click');
        $('#cmx-edit-protect-save').bind('click', function () {
            //基本表单验证
            var temp_flag = checkFormLength('#cmx-editprotect-form');
            if (!temp_flag) {
                return;
            }
            //特殊验证
            if (IsEmpty($('#cmx-i-2016-1').val())) {
                showAlert({
                    type: "info",
                    content: "批准文件号前不能为空"
                });
                return;
            }
            if ($('#cmx-i-2016-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: "批准文件号前可填长度最大为20"
                });
                return;
            }
            var fileNumBack = $('#cmx-editprotect-form #cmx-i-2016-3').val();
            var re = /^[0-9]*$/;
            if (IsEmpty(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: "批准文件号后不能为空"
                });
                return;
            }
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: "批准文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: "批准文件号后可填长度最大为8"
                });
                return;
            }
            var formdata = {
                protectUnitName: $('#cmx-i-2012').val(),
                unitLevel: $('#cmx-i-2013').val(),
                designScheme: $('#cmx-i-2014').val(),
                permitInst: $('#cmx-i-2015').val(),
                fileNumFront: $('#cmx-i-2016-1').val(),
                fileNumMidd: $('#cmx-i-2016-2').find(':selected').val(),
                fileNumBack: $('#cmx-i-2016-3').val(),
                remark: $('#cmx-i-2017').val(),
            };
            cmx.g.eaIchCrpProjectList.put(dataid, formdata);
            var html = [
                '<td>' + $('#cmx-i-2012').val() + '</td>',
                '<td>' + $('#cmx-i-2013').val() + '</td>',
                '<td>' + $('#cmx-i-2014').val() + '</td>',
                '<td>' + $('#cmx-i-2015').val() + '</td>',
                '<td>' + $('#cmx-i-2016-1').val() + '[' + $('#cmx-i-2016-2').find(':selected').val() + ']' + $('#cmx-i-2016-3').val() + '</td>',
                '<td>' + $('#cmx-i-2017').val() + '</td>',
                '<td>',
                '<button class="btn btn-info btn-sm margin-right-10" onclick="editProtectData(event,this,\'' + dataid + '\');">编辑</button>',
                (GetUrlParamString('type') == '1') ? '<button class="btn btn-danger btn-sm" onclick="deleteProtectData(event,this,\'' + dataid + '\');">删除</button>' : "",
                '</td>',
            ].join('');
            $(ele).parent().parent().html(html);
            $("#editProtectModal").modal('hide');
        });
    });
    $("#editProtectModal").on('hide.bs.modal', function () {
        $("#editProtectModal input").val('');
        $("#editProtectModal textarea").val('');
        $("#editProtectModal").find('option').first().attr('selected', true);
    });
    $("#editProtectModal").modal('show');
}
//删除项目
function deleteProtectData(ev, ele, dataid) {
    cmx.g.eaIchCrpProjectList.remove(dataid);
    $(ele).parent().parent().remove();
}
//显示基本信息，隐藏多行文本
function showEdit() {
    $(".baseinfo").parent().show();
    $(".cmx-textarea").hide();
}
//显示多行文本，隐藏基础信息
function showExtra(num) {
    $(".baseinfo").parent().hide();
    $(".cmx-textarea").show();
    for (var i = 1; i < 7; i++) {
        $("#cmx-textarea-div-" + i).hide();
    }
    $("#cmx-textarea-div-" + num).show();
}

//从业时间
function cmx_special_2(data) {
    var html = [
        '<div class="row">',
        '<div class="col-sm-12 col-md-12 col-lg-12">',
        '<div class="input-daterange" data-language="zh-CN">',
        '<div class="input-group">',
        '<span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input type="text" class="form-control" name="start" id="' + data.serialnumber + 'date-start" placeholder="从业时间（开始）">',
        '</div>',
        '<div class="input-group">',
        '<span class="input-group-addon"> 至 </span>',
        '<input type="text" class="form-control" name="end" id="' + data.serialnumber + 'date-end" placeholder="从业时间（结束）">',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
    $("#cmx-special-" + data.serialnumber).find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    }).on('changeDate', function (ev) {

    });
}

function cmx_special_3(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<div class="radio-content" data-dic="UnitQualifications" id="' + data.columnindex + '">',
        '</div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            type: 'mutil'
        }).cfinally(function () {}).start();
}

function cmx_special_4(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<div class="radio-content" data-dic="ApplyQualityLevel" id="' + data.columnindex + '">',
        '</div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            type: 'mutil'
        }).cfinally(function () {}).start();
}

function cmx_special_5(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="Education" id="' + data.columnindex + '">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            //hasEmpty: true,
        }).cfinally(function () {}).start();
}


function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}