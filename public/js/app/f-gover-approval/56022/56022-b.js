var get56022bNoNationProjectData = public_url + 'data/app/f-gover-approval/56022/56022-b.json';
var _projectType = '2';
var _projectNum = '56022_b';

$(document).ready(function () {
    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    new cmx.process().
        turn('initFiles', {
            'P0017': '01', //省文件
            'P0018': '07', //立项批复
            'P0019': '08', //方案设计说明及图纸
            'P0020': '13', //相关的实验报告
            'P0021': '09', //地勘报告
            'P0022': '12', //考古发掘报告
            'P0023': '10', //评估报告
            'P0024': '11', //立项报告
            'P0025': '99'
        }).start();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url: get56022bNoNationProjectData
    });
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "保护规划",
                    "id": 999,
                    "state": {
                        "opened": true
                    },
                    "children": [{
                        "id": 1,
                        "text": "基本信息",
                        "state": {
                            "selected": true
                        }
                    },
                    {
                        "id": 2,
                        "text": "文本概况"
                    },
                    {
                        "id": 3,
                        "text": "图纸概况"
                    },
                    {
                        "id": 4,
                        "text": "说明概况"
                    },
                    {
                        "id": 5,
                        "text": "基础资料汇编概况"
                    }
                    ]
                }]
            }
        }).on("loaded.jstree", function (e, datas) {
            //初始化后事件
        }).on("changed.jstree", function (e, datas) {
            if (datas.selected.length) {
                var treeId = "" + datas.instance.get_node(datas.selected[0]).id;
                if (treeId == 999) {
                    $(".baseinfo").parent().show();
                    for (var i = 1; i < 10; i++) {
                        $(".cmx-textarea-" + i).show();
                    }
                } else if (treeId == 1) {
                    showEdit();
                } else {
                    showExtra(treeId - 1);
                }
            }
        });
    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
        }
    });
    $(".cmx-i-9").on("click", function () {
        new cmx.process()
            .turn('buildSelectRelicsProtection', {
                goto: function (type) {
                    if (type == 'select') {
                        $("#cmx-i-9").val(cmx.g.danweimingcheng);
                        $("#cmx-i-9").attr('readonly', 'readonly');
                        $("#cmx-i-9").attr('disabled', 'disabled');
                    } else {
                        $("#cmx-i-9").val('');
                        $("#cmx-i-9").removeAttr('readonly');
                        $("#cmx-i-9").removeAttr('disabled');
                    }

                    $("#cmx-relicList").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () { }).start();
    });
    $(".cmx-reply-choose").on("click", function () {
        new cmx.process()
            .turn('buildSelectReplyList', {
                goto: function (type) {
                    $("#cmx-i-141").val(cmx.g.replyId);
                    // $("#cmx-i-41").attr('disabled', 'disabled');
                    $("#cmx-i-142").val(cmx.g.replyName);
                    // $("#cmx-i-42").attr('disabled', 'disabled');
                    $("#cmx-reply-modal").modal('hide');
                }
            })
            .ccatch(function (msg) { })
            .cfinally(function () { }).start();
    });
    $(".cmx-unitList-choose").on("click", function () {
        new cmx.process()
            .turn('buildSelectUnitList', {
                busiType: 'CRP',
                goto: function (type) {
                    $("#cmx-i-12").val(cmx.g.unitName);
                    //$("#cmx-i-12").attr('readonly', 'readonly');
                    //$("#cmx-i-12").attr('disabled', 'disabled');
                    $("#cmx-unitList-modal").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function (msg) { })
            .cfinally(function () { }).start();
    });
    $("#cmx-noNationProject-save").on("click", function () {
        if (!IsEmpty($('#cmx-i-4-1').val())) {
            if ($('#cmx-i-4-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: "文件号前可填长度最大为20"
                });
                return;
            }
        }
        var fileNumBack = $('#cmx-form #cmx-i-4-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: "文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: "文件号后可填长度最大为8"
                });
                return;
            }
        }
        if (IsEmpty($('#cmx-i-9').val())) {
            showAlert({
                type: "info",
                content: "国保单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 100) {
            showAlert({
                type: "info",
                content: "国保单位可填最大长度为100"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-5").val())) {
            if ($("#cmx-i-5").val().indexOf($("#cmx-i-9").val()) < 0) {
                showAlert({
                    type: "info",
                    content: "文件标题内容必须包含国保单位名称"
                });
                return;
            }
        }
        if (!IsEmpty($("#cmx-i-10").val())) {
            if (($("#cmx-i-10").val()).indexOf($("#cmx-i-9").val()) < 0) {
                showAlert({
                    type: "info",
                    content: "项目名称须包含国保单位名称"
                });
                return;
            }
        }
        if (!IsEmpty($('#cmx-i-12').val())) {
            if ($("#cmx-i-12").val().length > 100) {
                showAlert({
                    type: "info",
                    content: "设计人(单位)可填最大长度为100"
                });
                return;
            }
        }
        if (!IsEmpty($("#cmx-i-14").val())) {
            var num = $("#cmx-i-14").val();
            num = num.replace('.', '');
            if (num.length > 20) {
                showAlert({
                    type: "info",
                    content: "工程概算可填最大长度为20(保留两位小数)"
                });
                return;
            }
        }
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        var time = $("#cmx-i-11").val();
        if (!IsEmpty(time)) {
            time = time.match(/\d{4}.\d{1,2}.\d{1,2}/mg).toString();
            time = time.replace(/[^0-9]/mg, '-');
            console.log(time);
        }
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            projectType: _projectType, //项目类型 类型：String  必有字段  备注：无
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType, //单位类别 类型：String  必有字段  备注：无
            applyId: cmx.g.applyId,
            fileNumFront: $("#cmx-i-4-1").val(), //省文件号前---
            fileNumMidd: $("#cmx-i-4-2").val(), //省文件号中---
            fileNumBack: $("#cmx-i-4-3").val(), //省文件号后---
            proFileTitle: $("#cmx-i-5").val(), //省文件标题
            contactName: $('#cmx-i-6').val(), //联系人
            contactTel: $('#cmx-i-7').val(), //联系电话
            protectUnitName: $('#cmx-i-9').val(), //国保单位名称
            protectUnit: cmx.g.danweiinstId, //国保单位
            projectName: $('#cmx-i-10').val(), //项目名称
            designTime: time, //编制时间
            designUnitsName: $('#cmx-i-12').val(), //设计单位名称
            designUnits: cmx.g.unitId, //设计单位
            reportUnits: '',
            reportUnitsName: $('#cmx-i-13').val(), //报送单位
            proFunds: $('#cmx-i-14').val(), //规划编制费
            otherExplain: $('#cmx-i-15').val(), //其他说明事项
            genRules: $('#cmx-i-26').val(), //总则
            proObj: $('#cmx-i-27').val(), //保护对象
            valueAssess: $('#cmx-i-28').val(), //价值评估
            proTenetGoal: $('#cmx-i-29').val(), //保护规划原则与目标
            planArchRes: $('#cmx-i-30').val(), //考古与科学研究规划
            planEnviron: $('#cmx-i-31').val(), //环境整治规划
            planShow: $('#cmx-i-32').val(), //展示规划
            planBaseEqt: $('#cmx-i-33').val(), //基础设施规划
            planManage: $('#cmx-i-34').val(), //管理规划
            planAging: $('#cmx-i-35').val(), //分期规划
            proImpFunds: $('#cmx-i-36').val(), //保护实施经费
            bylaw: $('#cmx-i-37').val(), //附则
            planDrawing: $('#cmx-i-38').val(), //保护规划图纸
            areaGeneral: $('#cmx-i-39').val(), //区域概况
            evolutionRelic: $('#cmx-i-40').val(), //历史沿革及相关文物古迹
            proObjExp: $('#cmx-i-41').val(), //保护对象阐述及评价
            statusEvaluation: $('#cmx-i-42').val(), //现状评估
            planGenRules: $('#cmx-i-43').val(), //保护规划总则
            proAreaManage: $('#cmx-i-44').val(), //保护区划管理规定
            planSite: $('#cmx-i-45').val(), //遗址本体保护规划
            scientificResearchPlan: $('#cmx-i-46').val(), //考古与科学研究规划
            planTakeShow: $('#cmx-i-47').val(), //展示利用规划
            plansafety: $('#cmx-i-48').val(), //安全防灾规划
            planSiteDevelop: $('#cmx-i-49').val(), //遗址保护与地方社会发展协调规划
            planProManage: $('#cmx-i-50').val(), //保护管理规划
            chrOfEvents: $('#cmx-i-51').val(), //大事记
            proAreaConZone: $('#cmx-i-52').val(), //原保护范围及建设控制地带情况
            archBulletin: $('#cmx-i-53').val(), //考古调查简报
            aboutLiterCata: $('#cmx-i-54').val(), //相关研究文献目录
            files: getFileListForSave(cmx.g.filelinkfileclass),
            approvedNum: $('#cmx-i-141').val(), //批复文号
            approvedTitle: $('#cmx-i-142').val(), //批复标题
        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchProApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    proFormData: ss
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
                complete: function () { }
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () {

            }).
            start();
    });
    $("#cmx-noNationProject-send").on("click", function () {
        //特殊验证
        if (!IsEmpty($('#cmx-i-4-1').val())) {
            if ($('#cmx-i-4-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: "文件号前可填长度最大为20"
                });
                return;
            }
        }
        var fileNumBack = $('#cmx-form #cmx-i-4-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: "文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: "文件号后可填长度最大为8"
                });
                return;
            }
        }
        if (IsEmpty($('#cmx-i-9').val())) {
            showAlert({
                type: "info",
                content: "国保单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 100) {
            showAlert({
                type: "info",
                content: "国保单位可填最大长度为100"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-5").val())) {
            if ($("#cmx-i-5").val().indexOf($("#cmx-i-9").val()) < 0) {
                showAlert({
                    type: "info",
                    content: "文件标题内容必须包含国保单位名称"
                });
                return;
            }
        }
        if (!IsEmpty($("#cmx-i-10").val())) {
            if (($("#cmx-i-10").val()).indexOf($("#cmx-i-9").val()) < 0) {
                showAlert({
                    type: "info",
                    content: "项目名称须包含国保单位名称"
                });
                return;
            }
        }
        if (!IsEmpty($('#cmx-i-12').val())) {
            if ($("#cmx-i-12").val().length > 100) {
                showAlert({
                    type: "info",
                    content: "设计人(单位)可填最大长度为100"
                });
                return;
            }
        }

        if (!IsEmpty($("#cmx-i-14").val())) {
            var num = $("#cmx-i-14").val();
            num = num.replace('.', '');
            if (num.length > 20) {
                showAlert({
                    type: "info",
                    content: "工程概算可填最大长度为20(保留两位小数)"
                });
                return;
            }
        }
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        var time = $("#cmx-i-11").val();
        if (!IsEmpty(time)) {
            time = time.match(/\d{4}.\d{1,2}.\d{1,2}/mg).toString();
            time = time.replace(/[^0-9]/mg, '-');
            console.log(time);
        }
        //发送
        var ss = [{ //类型：Object  必有字段  备注：无
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            projectType: _projectType, //项目类型 类型：String  必有字段  备注：无
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType, //单位类别 类型：String  必有字段  备注：无
            applyId: cmx.g.applyId,
            fileNumFront: $("#cmx-i-4-1").val(), //省文件号前---
            fileNumMidd: $("#cmx-i-4-2").val(), //省文件号中---

            fileNumBack: $("#cmx-i-4-3").val(), //省文件号后---
            proFileTitle: $("#cmx-i-5").val(), //省文件标题
            contactName: $('#cmx-i-6').val(), //联系人
            contactTel: $('#cmx-i-7').val(), //联系电话
            protectUnitName: $('#cmx-i-9').val(),
            protectUnit: cmx.g.danweiinstId, //国保单位
            projectName: $('#cmx-i-10').val(), //项目名称
            designTime: $('#cmx-i-11').val(), //编制时间
            designUnitsName: $('#cmx-i-12').val(),
            designUnits: cmx.g.unitId, //设计单位
            reportUnits: '',
            reportUnitsName: $('#cmx-i-13').val(), //报送单位
            proFunds: $('#cmx-i-14').val(), //规划编制费
            otherExplain: $('#cmx-i-15').val(), //其他说明事项
            genRules: $('#cmx-i-26').val(), //总则
            proObj: $('#cmx-i-27').val(), //保护对象
            valueAssess: $('#cmx-i-28').val(), //价值评估
            proTenetGoal: $('#cmx-i-29').val(), //保护规划原则与目标
            planArchRes: $('#cmx-i-30').val(), //考古与科学研究规划
            planEnviron: $('#cmx-i-31').val(), //环境整治规划
            planShow: $('#cmx-i-32').val(), //展示规划
            planBaseEqt: $('#cmx-i-33').val(), //基础设施规划
            planManage: $('#cmx-i-34').val(), //管理规划
            planAging: $('#cmx-i-35').val(), //分期规划
            proImpFunds: $('#cmx-i-36').val(), //保护实施经费
            bylaw: $('#cmx-i-37').val(), //附则
            planDrawing: $('#cmx-i-38').val(), //保护规划图纸
            areaGeneral: $('#cmx-i-39').val(), //区域概况
            evolutionRelic: $('#cmx-i-40').val(), //历史沿革及相关文物古迹
            proObjExp: $('#cmx-i-41').val(), //保护对象阐述及评价
            statusEvaluation: $('#cmx-i-42').val(), //现状评估
            planGenRules: $('#cmx-i-43').val(), //保护规划总则
            proAreaManage: $('#cmx-i-44').val(), //保护区划管理规定
            planSite: $('#cmx-i-45').val(), //遗址本体保护规划
            scientificResearchPlan: $('#cmx-i-46').val(), //考古与科学研究规划
            planTakeShow: $('#cmx-i-47').val(), //展示利用规划
            plansafety: $('#cmx-i-48').val(), //安全防灾规划
            planSiteDevelop: $('#cmx-i-49').val(), //遗址保护与地方社会发展协调规划
            planProManage: $('#cmx-i-50').val(), //保护管理规划
            chrOfEvents: $('#cmx-i-51').val(), //大事记
            proAreaConZone: $('#cmx-i-52').val(), //原保护范围及建设控制地带情况
            archBulletin: $('#cmx-i-53').val(), //考古调查简报
            aboutLiterCata: $('#cmx-i-54').val(), //相关研究文献目录
            files: getFileListForSave(cmx.g.filelinkfileclass),
            approvedNum: $('#cmx-i-141').val(), //批复文号
            approvedTitle: $('#cmx-i-142').val(), //批复标题
        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchProApply/sendEaIchProApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    // relicId:
                    proFormData: ss
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        setTimeout(function () {
                            window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid=" + GetUrlParamString('nowid');
                        }, 1000);
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
                        receiverId: "RGJ0101002", //文书室ID
                        note: ""
                    }]
                }),
                type: 'POST',
                success: function (result) {
                    console.log(result);
                    // window.location.href = "/app/f-gover-approval/province/province-needToDo.html";
                }
            })
            .start();

    });
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        cmx.g.applyId = GetUrlParamString('applyId'); //alert
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchProApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn('build56022bInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }
});

//隐藏多行文本，显示基本信息
function showEdit() {
    $(".baseinfo").parent().show();
    for (var i = 1; i < 6; i++) {
        $(".cmx-textarea-" + i).hide();
    }
}
//隐藏基本信息，显示多行文本
function showExtra(num) {
    $(".baseinfo").parent().hide();
    for (var i = 1; i < 4; i++) {
        $(".cmx-textarea-" + i).hide();
    }
    $(".cmx-textarea-" + num).show();
}

// 选择 form
function cmx_special_2(data) {
    var html = [
        '<div class="cmx-special-provincefile" style="width:80%;float:left"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div style="width:20%;float:left;"><button  class="' + data.columnindex + ' btn btn-primary pull-right">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_4(data) {
    var html = [
        '<div class="cmx-special-provincefile" style="width:80%;float:left"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div style="width:20%;float:left;"><button class="cmx-unitList-choose btn btn-primary pull-right">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_10(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-reply-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}

cmx.route.model({
    index: 'build56022bInput',
    handle: function (parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            console.log(prevModelData);
            // alert(111)
            var data = prevModelData.data;

            var time = data.designTime + '';
            // alert(data.designTime);
            $("#cmx-i-4-1").val(data.fileNumFront); //省文件号前
            $("#cmx-i-4-2").val(data.fileNumMidd);
            $("#cmx-i-4-3").val(data.fileNumBack); //省文件号后
            $("#cmx-i-5").val(data.proFileTitle); //省文件标题
            $('#cmx-i-6').val(data.contactName); //联系人
            $('#cmx-i-7').val(data.contactTel); //联系电话
            $('#cmx-i-9').val(data.protectUnitName); //国保单位名称
            $('#cmx-i-10').val(data.projectName); //项目名称
            $('#cmx-i-11').val(data.designTime.substr(0, 10)); //编制时间
            // alert(unixToDatetime(data.designTime));
            $('#cmx-i-12').val(data.designUnitsName); //设计单位
            $('#cmx-i-13').val(data.reportUnitsName); //报送单位
            $('#cmx-i-14').val(data.proFunds); //规划编制费
            $('#cmx-i-15').val(data.otherExplain); //其他说明事项
            $('#cmx-i-26').val(data.genRules); //总则
            $('#cmx-i-27').val(data.proObj); //保护对象
            $('#cmx-i-28').val(data.valueAssess); //价值评估
            $('#cmx-i-29').val(data.proTenetGoal); //保护规划原则与目标
            $('#cmx-i-30').val(data.planArchRes); //考古与科学研究规划
            $('#cmx-i-31').val(data.planEnviron); //环境整治规划
            $('#cmx-i-32').val(data.planShow); //展示规划
            $('#cmx-i-33').val(data.planBaseEqt); //基础设施规划
            $('#cmx-i-34').val(data.planManage); //管理规划
            $('#cmx-i-35').val(data.planAging); //分期规划
            $('#cmx-i-36').val(data.proImpFunds); //保护实施经费
            $('#cmx-i-37').val(data.bylaw); //附则
            $('#cmx-i-38').val(data.planDrawing); //保护规划图纸
            $('#cmx-i-39').val(data.areaGeneral); //区域概况
            $('#cmx-i-40').val(data.evolutionRelic); //历史沿革及相关文物古迹
            $('#cmx-i-41').val(data.proObjExp); //保护对象阐述及评价
            $('#cmx-i-42').val(data.statusEvaluation); //现状评估
            $('#cmx-i-43').val(data.planGenRules); //保护规划总则
            $('#cmx-i-44').val(data.proAreaManage); //保护区划管理规定
            $('#cmx-i-45').val(data.planSite); //遗址本体保护规划
            $('#cmx-i-46').val(data.scientificResearchPlan); //考古与科学研究规划TODO
            $('#cmx-i-47').val(data.planTakeShow); //展示利用规划
            $('#cmx-i-48').val(data.plansafety); //安全防灾规划
            $('#cmx-i-49').val(data.planSiteDevelop); //遗址保护与地方社会发展协调规划
            $('#cmx-i-50').val(data.planProManage); //保护管理规划
            $('#cmx-i-51').val(data.chrOfEvents); //大事记
            $('#cmx-i-52').val(data.proAreaConZone); //原保护范围及建设控制地带情况
            $('#cmx-i-53').val(data.archBulletin); //考古调查简报
            $('#cmx-i-54').val(data.aboutLiterCata); //相关研究文献目录

            $('#cmx-i-141').val(data.approvedNum); //批复文号
            $('#cmx-i-142').val(data.approvedTitle); //批复标题

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