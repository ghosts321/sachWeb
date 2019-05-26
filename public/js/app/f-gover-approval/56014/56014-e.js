/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-28 16:49:12 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2018-06-20 14:59:47
 */
if (getData('role') == 'guobaodanwei') {
    var get56014eNoNationProjectFormData = public_url + 'data/app/f-gover-approval/56014/56014-e-x.json';
} else {
    var get56014eNoNationProjectFormData = public_url + 'data/app/f-gover-approval/56014/56014-e-s.json';
}
var _projectType = '2';
var _projectNum = '56014_e';
$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click', function () {
        history.go(-1);
    });
    cmx.g.applyId = GetUrlParamString('applyId');
    //根据申请人类型判断加载不同的申请表单
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/business/getApplicantAccClass',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                })
            })
            .turn(function (prevModelData, send, abort) {
                if (prevModelData.state == '200') {
                    if (prevModelData.data.accClass == '15') {
                        get56014eNoNationProjectFormData = public_url + 'data/app/f-gover-approval/56014/56014-e-x.json';
                    }
                    else {
                        var get56014eNoNationProjectFormData = public_url + 'data/app/f-gover-approval/56014/56014-e-s.json';
                    }
                } else {
                    showAlert({
                        type: 'error',
                        content: '申请人信息获取失败'
                    });
                }
            })
            .start();
    }

    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    new cmx.process().turn('initFiles', {
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
        "url": get56014eNoNationProjectFormData,
        "element": "#cmx-form"
    });
    $(".cmx-textarea").hide();
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "工程方案",
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
                        "text": "项目概况"
                    },
                    {
                        "id": 3,
                        "text": "现场勘察报告概况"
                    },
                    {
                        "id": 4,
                        "text": "施工图设计概况"
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
                    for (var i = 1; i < 5; i++) {
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
    $(".cmx-noNationProject-choose").on("click", function () {
        new cmx.process()
            .turn('buildSelectRelicsProtection', {
                goto: function (type) {
                    putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
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
                    $("#cmx-i-41").val(cmx.g.replyId);
                    //$("#cmx-i-41").attr('disabled', 'disabled');

                    $("#cmx-i-42").val(cmx.g.replyName);
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
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        if (!IsEmpty($('#cmx-i-4-1').val())) {
            if ($('#cmx-i-4-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号可填长度最大为20"
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
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号可填长度最大为8"
                });
                return;
            }
        }
        if (IsEmpty($("#cmx-i-42").val())) {
            showAlert({
                type: "info",
                content: "批复标题不能为空"
            });
            return;
        }
        if ($("#cmx-i-42").val().length > 200) {
            showAlert({
                type: "info",
                content: "批复标题可填最大长度为200"
            });
            return;
        }
        if (IsEmpty($("#cmx-i-9").val())) {
            showAlert({
                type: "info",
                content: "国保单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 200) {
            showAlert({
                type: "info",
                content: "国保单位可填最大长度为200"
            });
            return;
        }
        if ($("#cmx-i-12").val().length > 200) {
            showAlert({
                type: "info",
                content: "设计单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-13").val())) {
            var num = $("#cmx-i-13").val();
            num = num.replace('.', '');
            if (num.length > 16) {
                showAlert({
                    type: "info",
                    content: "工程概算可填最大长度为16(保留两位小数)"
                });
                return;
            }
        }
        var title = $('#cmx-form #cmx-i-5').val();
        var pro_title = $('#cmx-form #cmx-i-11').val();
        var test_title = $('#cmx-form #cmx-i-9').val();
        if (!IsEmpty(title)) {
            if (title.indexOf(test_title) < 0) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件标题内容必须包含国保单位名称"
                });
                return;
            }
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含国保单位名称"
            });
            return;
        }
        if (pro_title.indexOf('保护规划') >= 0) {
            showAlert({
                type: "info",
                content: "项目名称不能含有“保护规划”字样，保护规划类事项请确认是否希望报送“全国重点文物保护单位保护规划审批”"
            });
            return;
        }
        var data = [{
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            projectType: _projectType,
            fileNumFront: $("#cmx-i-4-1").val(), //省文件号前---
            fileNumMidd: $("#cmx-i-4-2").val(), //省文件号中---
            fileNumBack: $("#cmx-i-4-3").val(), //省文件号后---
            proFileTitle: $("#cmx-i-5").val(), //省文件标题
            approvedNum: $('#cmx-i-41').val(), //批复文号
            approvedTitle: $('#cmx-i-42').val(), //批复标题
            contactName: $("#cmx-i-6").val(), //联系人
            contactTel: $("#cmx-i-7").val(), //联系电话
            // protectUnitName: $("#cmx-i-9").val(), //国保单位
            ruinsName: $("#cmx-i-9").val(), //国保单位
            instId: cmx.g.danweiinstId, //国保单位id
            protectWorkType: $('#cmx-i-10 input[type="radio"]:checked').val(), //保护工程类型
            projectName: $("#cmx-i-11").val(), //项目名称
            organizUnit: $("#cmx-i-12").val(), //设计单位名称
            organizUnitID: cmx.g.unitId, //设计单位ID
            expenditure: $("#cmx-i-13").val(), //工程概算
            otherExplain: $("#cmx-i-14").val(), //其他说明事项
            reportUnits: $("#cmx-i-15").val(), //报送单位
            protectType: '1',
            projectIntro: $("#cmx-i-26").val(), //项目介绍
            designTask: $("#cmx-i-27").val(), //设计任务---
            scopeProtec: $("#cmx-i-28").val(), //保护范围---
            hisMainStatu: $("#cmx-i-29").val(), //历次维修状况---
            heritagePrice: $("#cmx-i-30").val(), //文物价值评估---
            staticDes: $("#cmx-i-31").val(), //现状描述---
            damagedStat: $("#cmx-i-32").val(), //残损统计---
            causeAnalysis: $("#cmx-i-33").val(), //主要病害及成因分析---
            geograpEnvir: $("#cmx-i-34").val(), //地理环境与地形外貌---
            saferyConclus: $("#cmx-i-35").val(), //安全评估结论---
            designConsi: $("#cmx-i-36").val(), //设计依据---
            enginProper: $("#cmx-i-37").val(), //工程性质---
            projectScale: $("#cmx-i-38").val(), //工程范围和规模---
            projectQuality: $("#cmx-i-39").val(), //工程做法说明及质量要求---
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType,
            files: getFileListForSave(cmx.g.filelinkfileclass),
            applyId: cmx.g.applyId
        }];
        console.log(data);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchPphApplyE/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pphFormData: data
                    // roleId: 'RSJ0000006'
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
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }

        if (!IsEmpty($('#cmx-i-4-1').val())) {
            if ($('#cmx-i-4-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号可填长度最大为20"
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
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号后可填长度最大为8"
                });
                return;
            }
        }
        if (IsEmpty($("#cmx-i-42").val())) {
            showAlert({
                type: "info",
                content: "批复标题不能为空"
            });
            return;
        }
        if ($("#cmx-i-42").val().length > 200) {
            showAlert({
                type: "info",
                content: "批复标题可填最大长度为200"
            });
            return;
        }
        if (IsEmpty($("#cmx-i-9").val())) {
            showAlert({
                type: "info",
                content: "文物保护单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 200) {
            showAlert({
                type: "info",
                content: "国保单位可填最大长度为200"
            });
            return;
        }
        if ($("#cmx-i-12").val().length > 200) {
            showAlert({
                type: "info",
                content: "设计单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-13").val())) {
            var num = $("#cmx-i-13").val();
            num = num.replace('.', '');
            if (num.length > 16) {
                showAlert({
                    type: "info",
                    content: "工程概算可填最大长度为16(保留两位小数)"
                });
                return;
            }
        }
        var title = $('#cmx-form #cmx-i-5').val();
        var pro_title = $('#cmx-form #cmx-i-11').val();
        var test_title = $('#cmx-form #cmx-i-9').val();
        if (!IsEmpty(title)) {
            if (title.indexOf(test_title) < 0) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件标题内容必须包含国保单位名称"
                });
                return;
            }
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含国保单位名称"
            });
            return;
        }
        if (pro_title.indexOf('保护规划') >= 0) {
            showAlert({
                type: "info",
                content: "项目名称不能含有“保护规划”字样，保护规划类事项请确认是否希望报送“全国重点文物保护单位保护规划审批”"
            });
            return;
        }
        var data = [{
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            projectType: _projectType,
            fileNumFront: $("#cmx-i-4-1").val(), //省文件号前---
            fileNumMidd: $("#cmx-i-4-2").val(), //省文件号中---
            fileNumBack: $("#cmx-i-4-3").val(), //省文件号后---
            proFileTitle: $("#cmx-i-5").val(), //省文件标题
            approvedNum: $('#cmx-i-41').val(), //批复文号
            approvedTitle: $('#cmx-i-42').val(), //批复标题
            contactName: $("#cmx-i-6").val(), //联系人
            contactTel: $("#cmx-i-7").val(), //联系电话
            // protectUnitName: $("#cmx-i-9").val(), //国保单位
            ruinsName: $("#cmx-i-9").val(), //国保单位
            instId: cmx.g.danweiinstId, //国保单位id
            protectWorkType: $('#cmx-i-10 input[type="radio"]:checked').val(), //保护工程类型
            projectName: $("#cmx-i-11").val(), //项目名称
            organizUnit: $("#cmx-i-12").val(), //设计单位名称
            organizUnitID: cmx.g.unitId, //设计单位ID
            expenditure: $("#cmx-i-13").val(), //工程概算
            otherExplain: $("#cmx-i-14").val(), //其他说明事项
            reportUnits: $("#cmx-i-15").val(), //报送单位
            protectType: '1',
            projectIntro: $("#cmx-i-26").val(), //项目介绍
            designTask: $("#cmx-i-27").val(), //设计任务---
            scopeProtec: $("#cmx-i-28").val(), //保护范围---
            hisMainStatu: $("#cmx-i-29").val(), //历次维修状况---
            heritagePrice: $("#cmx-i-30").val(), //文物价值评估---
            staticDes: $("#cmx-i-31").val(), //现状描述---
            damagedStat: $("#cmx-i-32").val(), //残损统计---
            causeAnalysis: $("#cmx-i-33").val(), //主要病害及成因分析---
            geograpEnvir: $("#cmx-i-34").val(), //地理环境与地形外貌---
            saferyConclus: $("#cmx-i-35").val(), //安全评估结论---
            designConsi: $("#cmx-i-36").val(), //设计依据---
            enginProper: $("#cmx-i-37").val(), //工程性质---
            projectScale: $("#cmx-i-38").val(), //工程范围和规模---
            projectQuality: $("#cmx-i-39").val(), //工程做法说明及质量要求---
            applyId: cmx.g.applyId,
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType,
            files: getFileListForSave(cmx.g.filelinkfileclass),
        }];
        console.log(data);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchPphApplyE/sendEaIchPphApplyE',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pphFormData: data
                    //roleId: 'RSJ0000006'
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        if (getData('role') == 'guobaodanwei') {
                            setTimeout(function () {
                                window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid=" + GetUrlParamString('nowid');
                            }, 1000);
                        } else {
                            setTimeout(function () {
                                window.location.href = "/app/f-gover-approval/province/province-needToDo.html?nowid=" + GetUrlParamString('nowid');
                            }, 1000);
                        }
                    }
                    console.log(result)
                },

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
                }
            })
            .start();
    });
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchPphApplyE/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST',
            })
            .turn('build56014dInput', {
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
    for (var i = 1; i < 4; i++) {
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

function cmx_special_2(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-noNationProject-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_3(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-unitList-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}

function cmx_special_4(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-reply-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}
cmx.route.model({
    index: 'build56014dInput',
    handle: function (parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        console.log(prevModelData);
        console.log(parameter);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            // alert()
            var data = prevModelData.data;
            $("#cmx-i-4-1").val(data.fileNumFront); //省文件号前
            $("#cmx-i-4-2").val(data.fileNumMidd);
            $("#cmx-i-4-3").val(data.fileNumBack); //省文件号后
            $("#cmx-i-5").val(data.proFileTitle); //省文件标题
            $("#cmx-i-6").val(data.contactName); //联系人
            $("#cmx-i-7").val(data.contactTel); //联系电话
            $("#cmx-i-9").val(data.ruinsName); //国保单位
            $('#cmx-i-10 input[value="' + data.protectWorkType + '"').attr("checked", true); //保护工程类型
            $("#cmx-i-11").val(data.projectName); //项目名称
            $("#cmx-i-12").val(data.organizUnit); //设计单位
            $("#cmx-i-13").val(data.expenditure); //工程概算
            $("#cmx-i-14").val(data.otherExplain); //其他说明事项
            $("#cmx-i-26").val(data.projectIntro); //项目介绍
            $("#cmx-i-27").val(data.designTask); //设计任务---
            $("#cmx-i-28").val(data.scopeProtec); //保护范围---
            $("#cmx-i-29").val(data.hisMainStatu); //历次维修状况---
            $("#cmx-i-30").val(data.heritagePrice); //文物价值评估---
            $("#cmx-i-31").val(data.staticDes); //现状描述---
            $("#cmx-i-32").val(data.damagedStat); //残损统计---
            $("#cmx-i-33").val(data.causeAnalysis); //主要病害及成因分析---
            $("#cmx-i-34").val(data.geograpEnvir); //地理环境与地形外貌---
            $("#cmx-i-35").val(data.saferyConclus); //安全评估结论---
            $("#cmx-i-36").val(data.designConsi); //设计依据---
            $("#cmx-i-37").val(data.enginProper); //工程性质---
            $("#cmx-i-38").val(data.projectScale); //工程范围和规模---
            $("#cmx-i-39").val(data.projectQuality); //工程做法说明及质量要求---
            $('#cmx-i-41').val(data.approvedNum); //批复文号
            $('#cmx-i-42').val(data.approvedTitle); //批复标题
            cmx.g.danweipublishType = data.publishType;
            cmx.g.danweimingcheng = data.ruinsName;
            cmx.g.unitId = data.organizUnitID;
            cmx.g.danweiinstId = data.instId;
            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
            }
        }
        send.go();
    }
});