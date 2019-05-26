var get56013ProjectData = public_url + 'data/app/f-gover-approval/56013/56013-apply.json';
var _projectType = '1';
var _projectNum = '56013';
$(document).ready(function() {
    $('#cmx-qingmaojun-back').on('click',function(){
        history.go(-1);
    });
    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');

    new cmx.process().
    turn('initFiles', {
        'P0014': '01', //省文件
        'P0015': '31', //出境文物及自然标本清单
        'P0016': '32', //合作考古调查、勘探、发掘或研究项目的批准文件
        'P0017': '99' //其他
    }).start();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:get56013ProjectData
    });
    $(".cmx-unitList-choose").on("click", function() {
        new cmx.process()
            .turn('buildSelectUnitList', {
                busiType: 'SP',
                goto: function(type) {
                    $("#cmx-i-9").val(cmx.g.unitName);
                    //$("#cmx-i-9").attr('readonly', 'readonly');
                    //$("#cmx-i-9").attr('disabled', 'disabled');
                    $("#cmx-unitList-modal").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function(msg) {})
            .cfinally(function() {}).start();
    });
    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum='+_projectNum);
        }
    });
    $(".cmx-noNationProject-choose").on("click", function() {
        new cmx.process()
            .turn('buildSelectRelicsProtection', {
                goto: function(type) {
                    if (type == 'select') {
                        $("#cmx-i-7").val(cmx.g.danweimingcheng);
                        // $("#cmx-i-7").attr('readonly', 'readonly');
                        // $("#cmx-i-7").attr('disabled', 'disabled');
                    } else {
                        $("#cmx-i-7").val('');
                        // $("#cmx-i-7").removeAttr('readonly');
                        // $("#cmx-i-7").removeAttr('disabled');
                    }

                    $("#cmx-relicList").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function(msg) {
                //异常终止
            })
            .cfinally(function() {}).start();
    });
    //保存
    $("#cmx-button-save").on("click", function() {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        var title = $('#cmx-form #cmx-i-3').val();
        var pro_title = $('#cmx-form #cmx-i-8').val();
        var test_title = $('#cmx-form #cmx-i-7').val();
        if (title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "省文件标题内容必须包含遗址名称"
            });
            return;
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含遗址名称"
            });
            return;
        }
        //特殊验证
        if (IsEmpty($('#cmx-i-2-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-i-2-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
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
        if (IsEmpty($("#cmx-i-7").val())) {
            showAlert({
                type: "info",
                content: "遗址名称不能为空"
            });
            return;
        }
        if ($("#cmx-i-7").val().length > 200) {
            showAlert({
                type: "info",
                content: "遗址名称可填最大长度为200"
            });
            return;
        }
        if (IsEmpty($("#cmx-i-9").val())) {
            showAlert({
                type: "info",
                content: "编制单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 200) {
            showAlert({
                type: "info",
                content: "编制单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-11").val())) {
            var num = $("#cmx-i-11").val();
            num = num.replace('.', '');
            if (num.length > 20) {
                showAlert({
                    type: "info",
                    content: "经费可填最大长度为20(保留四位小数)"
                });
                return;
            }
        }
        var title = $('#cmx-form #cmx-i-3').val();
        var pro_title = $('#cmx-form #cmx-i-8').val();
        var test_title = $('#cmx-form #cmx-i-7').val();
        if (title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "省文件标题内容必须包含遗址名称"
            });
            return;
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含遗址名称"
            });
            return;
        }
        var ss = [{
            applyId: cmx.g.applyId,
            projectNum: _projectNum,
            projectType: _projectType,
            fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
            fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
            fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
            proFileTitle: $("#cmx-i-3").val(), //省文件标题
            contactName: $("#cmx-i-4").val(), //联系人
            contactTel: $("#cmx-i-5").val(), //联系电话
            protectUnitName: $("#cmx-i-7").val(), //遗址名称
            protectUnit: ((cmx.g.danweimingcheng == $("#cmx-i-7").val()) ? cmx.g.danweiinstId : ''),
            projectName: $("#cmx-i-8").val(), //项目名称
            designUnitsName: $("#cmx-i-9").val(), //编制单位 类型：String  必有字段  备注：无
            designUnits: ((cmx.g.unitName == $("#cmx-i-9").val()) ? cmx.g.unitId : ''),
            reportUnitsName: $("#cmx-i-10").val(), //报送单位
            expenditure: $("#cmx-i-11").val(), //经费
            otherExplain: $("#cmx-i-12").val(), //其他说明事项
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType, //单位类别 类型：String  必有字段  备注：无
            files: getFileListForSave(cmx.g.filelinkfileclass)
        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAePcrApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    apaFormData: ss
                }),
                type: 'POST',
                success: function(result) {
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
                error: function() {
                    showAlert({
                        type: 'error',
                        content: '保存失败'
                    });
                },
                complete: function() {}
            })
            .ccatch(function(msg) {
                //异常终止
            })
            .cfinally(function() {

            }).
        start();
    });

    //发送
    $("#cmx-button-send").on("click", function() {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        var title = $('#cmx-form #cmx-i-3').val();
        var pro_title = $('#cmx-form #cmx-i-8').val();
        var test_title = $('#cmx-form #cmx-i-7').val();
        if (title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "省文件标题内容必须包含遗址名称"
            });
            return;
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含遗址名称"
            });
            return;
        }
        //特殊验证
        if (IsEmpty($('#cmx-i-2-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-i-2-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
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
        if (IsEmpty($("#cmx-i-7").val())) {
            showAlert({
                type: "info",
                content: "遗址名称不能为空"
            });
            return;
        }
        if ($("#cmx-i-7").val().length > 200) {
            showAlert({
                type: "info",
                content: "遗址名称可填最大长度为200"
            });
            return;
        }
        if (IsEmpty($("#cmx-i-9").val())) {
            showAlert({
                type: "info",
                content: "编制单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 200) {
            showAlert({
                type: "info",
                content: "编制单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-11").val())) {
            var num = $("#cmx-i-11").val();
            num = num.replace('.', '');
            if (num.length > 20) {
                showAlert({
                    type: "info",
                    content: "经费可填最大长度为20(保留四位小数)"
                });
                return;
            }
        }
        var title = $('#cmx-form #cmx-i-3').val();
        var pro_title = $('#cmx-form #cmx-i-8').val();
        var test_title = $('#cmx-form #cmx-i-7').val();
        if (title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "省文件标题内容必须包含遗址名称"
            });
            return;
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含遗址名称"
            });
            return;
        }
        var ss = [{
            applyId: cmx.g.applyId,
            projectNum: _projectNum,
            projectType: _projectType,
            fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
            fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
            fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
            proFileTitle: $("#cmx-i-3").val(), //省文件标题
            contactName: $("#cmx-i-4").val(), //联系人
            contactTel: $("#cmx-i-5").val(), //联系电话
            protectUnitName: $("#cmx-i-7").val(), //遗址名称
            protectUnit: ((cmx.g.danweimingcheng == $("#cmx-i-7").val()) ? cmx.g.danweiinstId : ''),
            projectName: $("#cmx-i-8").val(), //项目名称
            designUnitsName: $("#cmx-i-9").val(), //编制单位 类型：String  必有字段  备注：无
            designUnits: ((cmx.g.unitName == $("#cmx-i-9").val()) ? cmx.g.unitId : ''),
            reportUnitsName: $("#cmx-i-10").val(), //报送单位
            expenditure: $("#cmx-i-11").val(), //经费
            otherExplain: $("#cmx-i-12").val(), //其他说明事项
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType, //单位类别 类型：String  必有字段  备注：无
            files: getFileListForSave(cmx.g.filelinkfileclass)
        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAePcrApply/sendEaAePcrApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    apaFormData: ss
                }),
                type: 'POST',
                success: function(result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        setTimeout(function() {
                            window.location.href = "/app/f-gover-approval/province/province-needToDo.html?nowid="+GetUrlParamString('nowid');
                        }, 2000);
                    }
                    console.log(result)
                }

            })
            .turn('callajax', {
                url: api_ea + '/eaPubTransactionrecord/disposeRecord',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    trsFlag: "1",
                    trsFormData: [{
                        applyId: cmx.g.applyId,
                        projectNum: _projectNum,
                        receiverId: "RGJ0101002",
                        note: "撰写内容"
                    }]
                }),
                type: 'POST',
                success: function(result) {
                    console.log(result);
                }
            })
            .start();
    });
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        cmx.g.applyId = GetUrlParamString('applyId'); //alert
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAePcrApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST',

            })
            .turn('build56013Input', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }
});

function cmx_special_2(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile">',
        '<input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-noNationProject-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_4(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-unitList-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function appendDownloadAllFile(data){
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}

cmx.route.model({
    index: 'build56013Input',
    handle: function(parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            $("#cmx-i-2-1").val(data.fileNumFront); //省文件号前
            $("#cmx-i-2-2").val(data.fileNumMidd);
            $("#cmx-i-2-3").val(data.fileNumBack); //省文件号后
            $("#cmx-i-3").val(data.proFileTitle); //省文件标题
            $("#cmx-i-4").val(data.contactName); //联系人
            $("#cmx-i-5").val(data.contactTel); //联系电话
            $("#cmx-i-7").val(data.protectUnitName); //遗址名称
            $("#cmx-i-8").val(data.projectName); //项目名称
            $("#cmx-i-9").val(data.designUnitsName); //编制单位
            $("#cmx-i-10").val(data.reportUnitsName); //报送单位
            $("#cmx-i-11").val(data.expenditure); //经费
            $("#cmx-i-12").val(data.otherExplain); //其他说明事项
            cmx.g.danweipublishType = data.publishType;
            cmx.g.danweimingcheng = data.ProtectUnitName;
            cmx.g.unitId = data.designUnits;
            cmx.g.danweiinstId = data.protectUnit;
            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
            }
        }
        send.go();
    }
});

//以下是附件的清单
// cmx.g.filelinkfileclass = {
//     'P0014': '01', //省文件
//     'P0015': '31', //出境文物及自然标本清单
//     'P0016': '32', //合作考古调查、勘探、发掘或研究项目的批准文件
//     'P0017': '99' //其他
// };

//以下是取值用的
// var buildFormData = [{ 
// 	projectNum: "56014-3", //审批事项 类型：String  必有字段  备注：无 
// 	/**
// 	*	修改的
// 	*/
// 	fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
// 	fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
// 	fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
// 	proFileTitle: $("#cmx-i-3").val(), //省文件标题
// 	contactName: $("#cmx-i-4").val(), //联系人
// 	contactTel: $("#cmx-i-5").val(), //联系电话
// 	SiteName: $("#cmx-i-7").val(), //遗址名称
// 	ProjectName: $("#cmx-i-8").val(), //项目名称
// 	OrganizUnit: $("#cmx-i-9").val(), //编制单位
// 	ReportUnits: $("#cmx-i-10").val(), //报送单位
// 	Expenditure: $("#cmx-i-11").val(), //经费
// 	OtherExplain: $("#cmx-i-12").val(), //其他说明事项
// 	/**
// 	*	修改的end
// 	*/

// 	//以下不用管
// 	businessKey: "56012.3", //类型：String  必有字段  备注：无
// 	networkNum: "网审1号", //网审号 类型：String  必有字段  备注：无
// 	processDefinitionId: "BusinessProcess:1:fa56b0e90f3440c98f72b409b22a9351", //流程定义ID 类型：String  必有字段  备注：无
// 	processInstanceId: "6ed3f585f11d432183c0c3defae9ee55", //流程实例ID 类型：Mixed  必有字段  备注：无
// 	projectType: "2", //项目类型 类型：String  必有字段  备注：无
// 	publishType: "3" //单位类别 类型：String  必有字段  备注：无
// }];

// //以下是赋值用的
// $("#cmx-i-2-1").val(data.fileNumFront); //省文件号前
// $("#cmx-i-2-2 option[value='" + data.fileNumMidd + "']").attr("selected", "selected"); //省文件号中
// $("#cmx-i-2-3").val(data.fileNumBack); //省文件号后
// $("#cmx-i-3").val(data.proFileTitle); //省文件标题
// $("#cmx-i-4").val(data.contactName); //联系人
// $("#cmx-i-5").val(data.contactTel); //联系电话
// $("#cmx-i-7").val(data.SiteName); //遗址名称
// $("#cmx-i-8").val(data.ProjectName); //项目名称
// $("#cmx-i-9").val(data.OrganizUnit); //编制单位
// $("#cmx-i-10").val(data.ReportUnits); //报送单位
// $("#cmx-i-11").val(data.Expenditure); //经费
// $("#cmx-i-12").val(data.OtherExplain); //其他说明事项