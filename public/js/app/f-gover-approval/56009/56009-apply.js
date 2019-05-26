var get56009ProjectData = public_url + 'data/app/f-gover-approval/56009/56009-apply.json';
var _projectType = '1';
var _projectNum = '56009';
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
        'P0015': '27', //申请书
        'P0016': '06', //考古计划
        'P0017': '99', //其他
    }).start();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:get56009ProjectData
    });
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "考古工作计划",
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
        }).on("loaded.jstree", function(e, datas) {
            //初始化后事件
        }).on("changed.jstree", function(e, datas) {
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
    // cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    // if (!IsEmpty(cmx.g.danweimingcheng)) {
    //     $("#cmx-i-7").val(cmx.g.danweimingcheng);
    //     $("#cmx-i-7").attr('readonly', 'readonly');
    //     $("#cmx-i-7").attr('disabled', 'disabled');
    // }
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
            generRules: $('#cmx-i-18').val(), //总则
            protectPro: $('#cmx-i-19').val(), //保护对象
            valueAssess: $('#cmx-i-20').val(), //价值评估
            proPlanGoal: $('#cmx-i-21').val(), //保护规划原则与目标
            archSciPro: $('#cmx-i-22').val(), //考古与科学研究规划
            envirProgram: $('#cmx-i-23').val(), //环境整治规划
            showPlan: $('#cmx-i-24').val(), //展示规划
            infrahPlan: $('#cmx-i-25').val(), //基础设施规划
            managePlan: $('#cmx-i-26').val(), //管理规划
            stagePlan: $('#cmx-i-27').val(), //分期规划
            protectFund: $('#cmx-i-28').val(), //保护实施经费
            supplementaryArticles: $('#cmx-i-29').val(), //附则
            planDrawing: $('#cmx-i-30').val(), //保护规划图纸
            proZonRegula: $('#cmx-i-31').val(), //保护区划管理规定
            siteOntPro: $('#cmx-i-32').val(), //遗址本体保护规划
            scientificResearchPlan: $('#cmx-i-33').val(), //考古与科学研究规划
            displayPlan: $('#cmx-i-34').val(), //展示利用规划
            ecologyPlan: $('#cmx-i-35').val(), //安全防灾规划
            siteProPlan: $('#cmx-i-36').val(), //遗址保护与地方社会发展协调规划
            proAndManagePlan: $('#cmx-i-37').val(), //保护管理规划
            bigThing: $('#cmx-i-38').val(), //大事记
            oldProArea: $('#cmx-i-39').val(), //原保护范围及建设控制地带情况
            archReport: $('#cmx-i-40').val(), //考古调查简报
            bibRelaStu: $('#cmx-i-41').val(), //相关研究文献目录
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
            generRules: $('#cmx-i-18').val(), //总则
            protectPro: $('#cmx-i-19').val(), //保护对象
            valueAssess: $('#cmx-i-20').val(), //价值评估
            proPlanGoal: $('#cmx-i-21').val(), //保护规划原则与目标
            archSciPro: $('#cmx-i-22').val(), //考古与科学研究规划
            envirProgram: $('#cmx-i-23').val(), //环境整治规划
            showPlan: $('#cmx-i-24').val(), //展示规划
            infrahPlan: $('#cmx-i-25').val(), //基础设施规划
            managePlan: $('#cmx-i-26').val(), //管理规划
            stagePlan: $('#cmx-i-27').val(), //分期规划
            protectFund: $('#cmx-i-28').val(), //保护实施经费
            supplementaryArticles: $('#cmx-i-29').val(), //附则
            planDrawing: $('#cmx-i-30').val(), //保护规划图纸
            proZonRegula: $('#cmx-i-31').val(), //保护区划管理规定
            siteOntPro: $('#cmx-i-32').val(), //遗址本体保护规划
            scientificResearchPlan: $('#cmx-i-33').val(), //考古与科学研究规划
            displayPlan: $('#cmx-i-34').val(), //展示利用规划
            ecologyPlan: $('#cmx-i-35').val(), //安全防灾规划
            siteProPlan: $('#cmx-i-36').val(), //遗址保护与地方社会发展协调规划
            proAndManagePlan: $('#cmx-i-37').val(), //保护管理规划
            bigThing: $('#cmx-i-38').val(), //大事记
            oldProArea: $('#cmx-i-39').val(), //原保护范围及建设控制地带情况
            archReport: $('#cmx-i-40').val(), //考古调查简报
            bibRelaStu: $('#cmx-i-41').val(), //相关研究文献目录
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
                        projectNum: "56012",
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
            .turn('build56009Input', {
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
    for (var i = 1; i < 5; i++) {
        $(".cmx-textarea-" + i).hide();
    }
}
//显示多行文本，隐藏基本信息
function showExtra(num) {
    $(".baseinfo").parent().hide();
    for (var i = 1; i < 5; i++) {
        $(".cmx-textarea-" + i).hide();
    }
    $(".cmx-textarea-" + num).show();
}

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
    index: 'build56009Input',
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
            $("#cmx-i-18").val(data.generRules); //总则
            $("#cmx-i-19").val(data.protectPro); //保护对象
            $("#cmx-i-20").val(data.valueAssess); //价值评估
            $("#cmx-i-21").val(data.proPlanGoal); //保护规划原则与目标
            $("#cmx-i-22").val(data.archSciPro); //考古与科学研究规划
            $("#cmx-i-23").val(data.envirProgram); //环境整治规划
            $("#cmx-i-24").val(data.showPlan); //展示规划
            $("#cmx-i-25").val(data.infrahPlan); //基础设施规划
            $("#cmx-i-26").val(data.managePlan); //管理规划
            $("#cmx-i-27").val(data.stagePlan); //分期规划
            $("#cmx-i-28").val(data.protectFund); //保护实施经费
            $("#cmx-i-29").val(data.supplementaryArticles); //附则
            $("#cmx-i-30").val(data.planDrawing); //保护规划图纸
            $("#cmx-i-31").val(data.proZonRegula); //保护区划管理规定
            $("#cmx-i-32").val(data.siteOntPro); //遗址本体保护规划
            $("#cmx-i-33").val(data.scientificResearchPlan); //考古与科学研究规划
            $("#cmx-i-34").val(data.displayPlan); //展示利用规划
            $("#cmx-i-35").val(data.ecologyPlan); //安全防灾规划
            $("#cmx-i-36").val(data.siteProPlan); //遗址保护与地方社会发展协调规划
            $("#cmx-i-37").val(data.proAndManagePlan); //保护管理规划
            $("#cmx-i-38").val(data.bigThing); //大事记
            $("#cmx-i-39").val(data.oldProArea); //原保护范围及建设控制地带情况
            $("#cmx-i-40").val(data.archReport); //考古调查简报
            $("#cmx-i-41").val(data.bibRelaStu); //相关研究文献目录
            cmx.g.danweipublishType = data.publishType;
            cmx.g.danweimingcheng = data.ProtectUnitName;
            cmx.g.unitId = data.designUnits;
            cmx.g.danweiinstId = data.protectUnit;
            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
            }

            $('.apply-download-all-file').on('click',function(){
                if(IsEmpty(cmx.g.applyId)){
                    showAlert({
                        type: 'error',
                        content: '请先保存申请信息'
                    });
                    return;
                }
            });
        }
        send.go();
    }
});