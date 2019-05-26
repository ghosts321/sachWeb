//56015-b保存文物详情模态框表单
var get56015bEditRelicItemData = public_url + 'data/app/f-gover-approval/56015/56015-b-editrelic.json';
//56015-b保存文物详情模态框
var get56015bEditRelicItemModal = public_url + 'app/f-gover-approval/56015/include/56015-b-editrelic-modal.html';
_projectNum = '56015_b';
cmx.g.regist('sumFunds')
cmx.g.regist('relicItem', new HashMap());
cmx.g.regist('backRelicItem', new HashMap());
$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click',function(){
        history.go(-1);
    });
    cmx.g.applyId = GetUrlParamString('applyId')
    var relic_data = {
        "url": getMoveRelicAddData,
        "element": "#cmx-form"
    };
    new cmx.process().
    turn('initFiles', {
        'J0017': '47',
        'J0018': '48',
        'J0019': '49',
        'J0020': '50',
        'J0021': '51',
        'P0019': '27',
        'P0020': '28',
        'P0021': '99'
    }).start();
    baseInfo(relic_data);
    $("#cmx-table").load(getMoveRelicTableModal, function () {

        $("#cmx-i-6-unitName").attr('readonly', 'readonly');
        $("#cmx-i-6-unitName").attr('disabled', 'disabled');
        $("#cmx-i-6-postaddress").attr('readonly', 'readonly');
        $("#cmx-i-6-postaddress").attr('disabled', 'disabled');
        $("#cmx-i-6-address").attr('readonly', 'readonly');
        $("#cmx-i-6-address").attr('disabled', 'disabled');
        $("#cmx-i-6-postCode").attr('readonly', 'readonly');
        $("#cmx-i-6-postCode").attr('disabled', 'disabled');
        $("#cmx-i-6-certiNum").attr('readonly', 'readonly');
        $("#cmx-i-6-certiNum").attr('disabled', 'disabled');
        $("#cmx-i-6-mngInst").attr('readonly', 'readonly');
        $("#cmx-i-6-mngInst").attr('disabled', 'disabled');
    });
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': {
                    "url": $.ctx + "/data/app/f-gover-approval/56015/move-relic-protect-menu-data.json",
                    "dataType": "JSON"
                }
            }
        }).on("loaded.jstree", function (e, datas) {
            //初始化后事件
        }).on("changed.jstree", function (e, datas) {
            if (datas.selected.length) {
                var treeId = datas.instance.get_node(datas.selected[0]).id;
                if (treeId === "999") {
                    $(".baseinfo").parent().show();
                    $(".textarea-hide").show();
                    $(".table-hide").show();
                } else if (treeId === "1") {
                    $(".baseinfo").parent().show();
                    $(".table-hide").hide();
                    $(".textarea-hide").hide();
                    $("#cmx-button-save").unbind('click');
                    $("#cmx-button-save").bind('click', function () {
                        var temp_flag = checkFormLength('#cmx-form',true);
                        if (!temp_flag) {
                            return;
                        }
                        if (IsEmpty($("#cmx-i-6-unitName").val())) {
                            showAlert({
                                type: "info",
                                content: "请选择方案编制单位"
                            });
                            return;
                        }
                        if ($(".department-1 tr").length == 0) {
                            showAlert({
                                type: "info",
                                content: "请添加其他主要参加单位"
                            });
                            return;
                        }
                        $(".department-1 tr").each(function (index) {
                            if ($(this).find('input[type="text"]').val().length > 200) {
                                showAlert({
                                    type: "info",
                                    content: "单位名称不能超过200字"
                                });
                                return;
                            }
                        });
                        if (IsEmpty($("#cmx-special-P0008 input[name='principalname']").val())) {
                            showAlert({
                                type: "info",
                                content: "编制负责人姓名不能为空"
                            });
                            return;
                        }
                        if ($("#cmx-special-P0008 input[name='principalname']").val().length > 40) {
                            showAlert({
                                type: "info",
                                content: "编制负责人姓名不能超过40字"
                            });
                            return;
                        }
                        if (!$("#cmx-special-P0008 input[name='sex-1']").is(":checked")) {
                            showAlert({
                                type: "info",
                                content: "请选择编制负责人性别"
                            });
                            return;
                        }
                        if (!$("#cmx-special-P0008 input[name='edu']").is(":checked")) {
                            showAlert({
                                type: "info",
                                content: "请选择编制负责人学历"
                            });
                            return;
                        }
                        if (!$("#cmx-special-P0008 input[name='title-1']").is(":checked")) {
                            showAlert({
                                type: "info",
                                content: "请选择编制负责人职称"
                            });
                            return;
                        }
                        if (IsEmpty($("#cmx-special-P0008 input[name='principaltel']").val())) {
                            showAlert({
                                type: "info",
                                content: "编制负责人联系电话不能为空"
                            });
                            return;
                        }
                        if ($("#cmx-special-P0008 input[name='principaltel']").val().length > 64) {
                            showAlert({
                                type: "info",
                                content: "编制负责人联系电话不能超过64位"
                            });
                            return;
                        }
                        if (IsEmpty($("#cmx-special-P0008 input[name='principalbirthday']").val())) {
                            showAlert({
                                type: "info",
                                content: "编制负责人出生年月不能为空"
                            });
                            return;
                        }
                        if (IsEmpty($("#cmx-special-P0008 input[name='principalemail']").val())) {
                            showAlert({
                                type: "info",
                                content: "编制负责人E-mail不能为空"
                            });
                            return;
                        }
                        if (IsEmpty($("#cmx-special-P0009 input[name='auditorname']").val())) {
                            showAlert({
                                type: "info",
                                content: "方案审核人姓名不能为空"
                            });
                            return;
                        }
                        if ($("#cmx-special-P0009 input[name='auditorname']").val().length > 32) {
                            showAlert({
                                type: "info",
                                content: "方案审核人姓名不能超过32字"
                            });
                            return;
                        }
                        if (!$("#cmx-special-P0009 input[name='sex-2']").is(":checked")) {
                            showAlert({
                                type: "info",
                                content: "请选择方案审核人性别"
                            });
                            return;
                        }
                        if (!$("#cmx-special-P0009 input[name='title-2']").is(":checked")) {
                            showAlert({
                                type: "info",
                                content: "请选择方案审核人职称"
                            });
                            return;
                        }
                        if (IsEmpty($("#cmx-special-P0009 input[name='auditorbirthday']").val())) {
                            showAlert({
                                type: "info",
                                content: "方案审核人出生年月不能为空"
                            });
                            return;
                        }
                        if (IsEmpty($("#cmx-special-P0009 input[name='auditorunit']").val())) {
                            showAlert({
                                type: "info",
                                content: "方案审核人所在单位不能为空"
                            });
                            return;
                        }
                        if ($("#cmx-special-P0009 input[name='auditorunit']").val().length > 50) {
                            showAlert({
                                type: "info",
                                content: "方案审核人所在单位不能超过50字"
                            });
                            return;
                        }
                        if ($(".department-2 tr").length == 0) {
                            showAlert({
                                type: "info",
                                content: "请添加方案主要编制人员"
                            });
                            return;
                        }
                        $(".department-2 tr").each(function (index) {
                            if ($(this).find('.project-personname').val().length > 32) {
                                showAlert({
                                    type: "info",
                                    content: "方案主要编制人员姓名不能超过32字"
                                });
                                return;
                            }
                            if ($(this).find('.project-personunit').val().length > 50) {
                                showAlert({
                                    type: "info",
                                    content: "方案主要编制人员所在单位不能超过50字"
                                });
                                return;
                            }
                            if ($(this).find('.project-persontask').val().length > 1000) {
                                showAlert({
                                    type: "info",
                                    content: "方案主要编制人员编制任务分工不能超过1000字"
                                });
                                return;
                            }
                        });
                        if (IsEmpty($("#date-start").val())) {
                            showAlert({
                                type: "info",
                                content: "方案执行周期开始时间不能为空"
                            });
                            return;
                        }
                        if (IsEmpty($("#date-end").val())) {
                            showAlert({
                                type: "info",
                                content: "方案执行周期结束时间不能为空"
                            });
                            return;
                        }
                        if (IsEmpty($("#totalexpend").val())) {
                            showAlert({
                                type: "info",
                                content: "总经费不能为空"
                            });
                            return;
                        }
                        if (IsEmpty($("#nationexpend").val())) {
                            showAlert({
                                type: "info",
                                content: "申请国拨经费不能为空"
                            });
                            return;
                        }
                        var othUnitNameList = [];
                        $(".department-1 tr").each(function (index) {
                            othUnitNameList.push({
                                unitName: $(this).find('input[type="text"]').val()
                            });
                        });
                        var schemeList = [];
                        $(".department-2 tr").each(function (index) {
                            schemeList.push({
                                name: $(this).find('.project-personname').val(),
                                title: $(this).find("input[type='radio']:checked").val(),
                                belogUnit: $(this).find('.project-personunit').val(),
                                perTask: $(this).find('.project-persontask').val()
                            });
                        });
                        var filesList = [];
                        filesList.push({
                            "fileClass": '27',
                            "fileIndex": getFileListForSave(cmx.g.filelinkfileclass, '27')[0].fileIndex
                        });
                        filesList.push({
                            "fileClass": '28',
                            "fileIndex": getFileListForSave(cmx.g.filelinkfileclass, '28')[0].fileIndex
                        });
                        filesList.push({
                            "fileClass": '99',
                            "fileIndex": getFileListForSave(cmx.g.filelinkfileclass, '99')[0].fileIndex
                        });
                        var data = [{
                            applyId: cmx.g.applyId,
                            contactName: $("#cmx-i-4").val(), //联系人
                            contactTel: $("#cmx-i-5").val(), //联系电话
                            projectName: $("#cmx-i-2").val(), //项目名称
                            collectUnits: $("#cmx-i-3").val(), //文物收藏单位
                            projectNum: _projectNum, //审批事项
                            projectType: "2", //项目类型
                            publishType: "6", //
                            designUnits: $("#cmx-i-6-unitName").val(), //方案编制单位名称
                            duarea: $("#cmx-i-6-address").val(), //方案编制单位所在地
                            duaddress: $("#cmx-i-6-postaddress").val(), //方案编制单位通讯地址
                            ducode: $("#cmx-i-6-postCode").val(), //方案编制单位邮编
                            ducertNum: $("#cmx-i-6-certiNum").val(), //方案编制单位证书编号
                            dudepartment: $("#cmx-i-6-mngInst").val(), //方案编制单位主管部门
                            othUnitList: othUnitNameList, //unitName
                            respoName: $("#cmx-special-P0008 input[name='principalname']").val(), //编制负责人姓名
                            respoSex: $("#cmx-special-P0008 input[name='sex-1']:checked").val(), //编制负责人性别
                            respoBirth: $("#cmx-special-P0008 input[name='principalbirthday']").val(), //编制负责人出生年月
                            respoEducation: $("#cmx-special-P0008 input[name='edu']:checked").val(), //编制负责人学历
                            respoTitle: $("#cmx-special-P0008 input[name='title-1']:checked").val(), //编制负责人职称
                            respoTel: $("#cmx-special-P0008 input[name='principaltel']").val(), //编制负责人联系电话
                            respoMail: $("#cmx-special-P0008 input[name='principalemail']").val(), //编制负责人email
                            auditorName: $("#cmx-special-P0009 input[name='auditorname']").val(), //审核人姓名
                            auditorSex: $("#cmx-special-P0009 input[name='sex-2']:checked").val(), //审核人性别
                            auditorBirth: $("#cmx-special-P0009 input[name='auditorbirthday']").val(), //审核人出生年月
                            auditorTitle: $("#cmx-special-P0009 input[name='title-2']:checked").val(), //审核人职称
                            auditorUnit: $("#cmx-special-P0009 input[name='auditorunit']").val(), //审核人所在单位
                            schemeList: schemeList, //方案主要编制人员
                            mainTarget: $("#cmx-i-12").val(), //主要目标
                            techRoadmap: $("#cmx-i-13").val(), //技术线路概况
                            programBeg: $("#date-start").val(), //方案执行周期开始年月
                            programEnd: $("#date-end").val(), //方案执行周期结束年月
                            sumFunds: $("#totalexpend").val(), //总经费
                            applyFunds: $("#nationexpend").val(), //申请国拨经费
                            riskAnalys: $("#cmx-i-16").val(), //风险分析
                            remark: $("#cmx-i-17").val(), //备注
                            files: filesList
                        }];
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaMohRcrApply/saveprocessInstanceId',
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    mrrFormData: data
                                }),
                                type: 'POST',
                                success: function (result) {
                                    console.log(result);
                                    if (result.state == 200) {
                                        showAlert({
                                            type: 'success',
                                            content: '发送成功'
                                        });
                                        cmx.g.applyId = result.data.applyId;
                                        cmx.g.sumFunds = result.data.sumFunds
                                    }
                                }
                            })
                            .start();
                    });
                    if (!IsEmpty(cmx.g.applyId)) {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaMohRcrApply/getRelicCount',
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    applyId: cmx.g.applyId
                                }),
                                type: 'POST',
                                success: function (result) {
                                    console.log(result);
                                }
                            })
                            .turn(function (prevModelData, send, abort) {
                                var html = '';
                                $("#cmx-relic-num").html('');
                                html = [
                                    '<tr>',
                                    '<td>' + prevModelData.data.repairRelicNum + '</td>',
                                    '<td>' + prevModelData.data.firstRelic + '</td>',
                                    '<td>' + prevModelData.data.secondRelic + '</td>',
                                    '<td>' + prevModelData.data.tiredRelic + '</td>',
                                    '<td>' + prevModelData.data.commonRelic + '</td>',
                                    '<td>' + prevModelData.data.notGradRelic + '</td>',
                                    '</tr>'
                                ].join("");
                                $("#cmx-relic-num").append(html);
                            })
                            .start();
                    }
                } else if (treeId === "2" || treeId === "5" || treeId === "8" || treeId === "9" || treeId === "11" || treeId === "14" || treeId === "15" || treeId === "18" || treeId === "19" || treeId === "21" || treeId === "22" || treeId === "23") {
                    //2:文物信息   5:保存现状调查  8:病害识别 9:病害统计 11:具体技术路线   14:柜架囊匣配置清单  15:重点文物重点储存/展示柜  18:修复人员  19:工作安排  21:项目预算  22:费用明细  23:材料、工具器购置表格
                    if (!IsEmpty(cmx.g.applyId)) {
                        $(".baseinfo").parent().hide();
                        $(".table-hide").hide();
                        $(".textarea-hide").hide();
                        $("#cmx-table-" + treeId).show();
                        switch (treeId) {
                            case "2":
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    //保存文物信息列表
                                    var data = [];
                                    var relicList = [];
                                    for (var i = 0; i < cmx.g.relicItem.values().length; i++) {
                                        relicList.push({
                                            relicId: cmx.g.relicItem.values()[i].relicId
                                        })
                                    }
                                    for (var i = 0; i < cmx.g.backRelicItem.values().length; i++) {
                                        relicList.push({
                                            relicId: cmx.g.backRelicItem.values()[i].relicId
                                        })
                                    }
                                    data = [{
                                        relicList: relicList,
                                        applyId: cmx.g.applyId
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveRelicList',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                })
                                break;
                            case "5":
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var restoreInfoList = [];
                                    $(".department-3 tr").each(function (index) {
                                        restoreInfoList.push({
                                            repairTime: $(this).find("input[name='restoretime']").val(),
                                            repairMethod: $(this).find("input[name='restoremethod']").val(),
                                            repairStuff: $(this).find("input[name='restorematerials']").val(),
                                            repairUnit: $(this).find("input[name='restoreunit']").val()
                                        });
                                    });
                                    var data = [{
                                        applyId: cmx.g.applyId,
                                        projectNum: _projectNum,
                                        repHisList: restoreInfoList,
                                        isRepair: $("input[name='judge-1']:checked").val(), //是否展开修复
                                        saveType: $("#cmx-i-23").val(), //保存现状调查
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId2',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '保存成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "8":
                            case "9": //保存病害评测
                                if (treeId === "9" && !IsEmpty(cmx.g.applyId)) { //病害统计
                                    $(".baseinfo").parent().hide();
                                    $(".table-hide").hide();
                                    $(".textarea-hide").hide();
                                    $("#cmx-table-9").show();
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/getRiskList',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                applyId: cmx.g.applyId
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                            }
                                        })
                                        .turn(function (prevModelData, send, abort) {
                                            $("#cmx-count-relic").html('');
                                            for (var i = 0; i < prevModelData.data.length; i++) {
                                                var html = '';
                                                html = [
                                                    '<tr>',
                                                    '<td>' + (i + 1) + '</td>',
                                                    '<td name="disease-name">' + prevModelData.data[i].riskType + '</td>', //病害名称
                                                    '<td><input type="text" class="form-control" name="disease-length" value="' + prevModelData.data[i].longs + '"></td>',
                                                    '<td><input type="text" class="form-control" name="disease-number" value="' + prevModelData.data[i].numbersRisk + '"></td>',
                                                    '<td><input type="text" class="form-control" name="disease-area" value="' + prevModelData.data[i].acreage + '"></td>',
                                                    '<td><input type="text" class="form-control" name="disease-percent" value="' + prevModelData.data[i].percentage + '"></td>',
                                                    '<td name="disease-numbers">' + prevModelData.data[i].numbers + '</td>',
                                                    '<td><button class="btn btn-primary" onclick="showRelicId(\'' + prevModelData.data[i].riskType + '\')">查看详情</button></td>',
                                                    '</tr>'
                                                ].join('');
                                                $("#cmx-count-relic").append(html);
                                            }
                                        })
                                        .start();
                                }
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var riskIcList = [];
                                    var riskStatList = [];
                                    $(".department-4 tr").each(function (index) {
                                        riskIcList.push({
                                            riskIc: $(this).find("input[name='virus-recognition']").val(),
                                            apparapusParam: $(this).find("input[name='virus-instrument']").val(),
                                            times: $(this).find("input[name='virus-times']").val(),
                                            phenomenon: $(this).find("input[name='virus-phenomenon']").val(),
                                            results: $(this).find("input[name='virus-results']").val()
                                        });
                                    });
                                    $(".department-13 tr").each(function (index) {
                                        riskStatList.push({
                                            riskName: $(this).find("td[name='disease-name']").text(),
                                            longs: $(this).find("input[name='disease-length']").val(),
                                            numberRisk: $(this).find("input[name='disease-number']").val(),
                                            acreage: $(this).find("input[name='disease-area']").val(),
                                            percentage: $(this).find("input[name='disease-percent']").val(),
                                            numbers: $(this).find("td[name='disease-numbers']").text()
                                        });
                                    });
                                    var data = [{
                                        applyId: cmx.g.applyId,
                                        projectNum: _projectNum,
                                        riskIcList: riskIcList,
                                        riskStatList: riskStatList,
                                        diseaseEval: $("#cmx-i-25").val(), //病害评测
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId3',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "11":
                                //保存修复技术及材料筛选
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var tecRouteList = [];
                                    $(".department-5 tr").each(function (index) {
                                        tecRouteList.push({
                                            riskName: $(this).find("input[name='tech-virus-name']").val(),
                                            techName: $(this).find("input[name='tech-name']").val(),
                                            specSteps: $(this).find("input[name='tech-step']").val(),
                                            involveStuff: $(this).find("input[name='tech-materials']").val(),
                                            involveTool: $(this).find("input[name='tech-instrument']").val()
                                        });
                                    });
                                    var data = [{
                                        applyId: cmx.g.applyId,
                                        projectNum: _projectNum,
                                        tecRouteList: tecRouteList,
                                        repairTech: $("#cmx-i-26").val(), //修复技术及材料筛选
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId4',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "14":
                            case "15":
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var cabCapList = []; //柜架囊匣配置清单
                                    $(".department-12 tr").each(function (index) {
                                        cabCapList.push({
                                            name: $(this).find("input[name='cabcap-name']").val(),
                                            sizeCab: $(this).find("input[name='cabcap-size']").val(),
                                            material: $(this).find("input[name='cabcap-material']").val(),
                                            numberCab: $(this).find("input[name='cabcap-number']").val(),
                                        });
                                    });
                                    var cabinetList = []; //重点文物独立储存/展示柜
                                    $(".department-6 tr").each(function (index) {
                                        cabinetList.push({
                                            relicName: $(this).find("input[name='relic-name']").val(),
                                            relicLevel: $(this).find("input[name='relic-level']").val(),
                                            relicMaterial: $(this).find("input[name='relic-materials']").val(),
                                            displayCabinet: $(this).find("input[name='relic-box']").val(),
                                            sizeCab: $(this).find("input[name='relic-size']").val(),
                                            dcMaterial: $(this).find("input[name='relic-boxmaterials']").val(),
                                            configReason: $(this).find("input[name='relic-reason']").val()
                                        });
                                    });
                                    var data = [{
                                        applyId: cmx.g.applyId,
                                        projectNum: _projectNum,
                                        saveTerm: $("#cmx-i-28").val(), //保存条件措施或建议
                                        cabCapList: cabCapList,
                                        cabinetList: cabinetList
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId5',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "18":
                            case "19":
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    //保存修复进度及工作安排
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var repPerList = []; //修复人员
                                    $(".department-7 tr").each(function (index) {
                                        repPerList.push({
                                            name: $(this).find("input[name='repPer-name']").val(),
                                            sex: $(this).find("input[type='radio']:checked").val(),
                                            age: $(this).find("input[name='repPer-age']").val(),
                                            title: $(this).find("input[name='repPer-title']").val(),
                                            professional: $(this).find("input[name='repPer-major']").val(),
                                            workUnit: $(this).find("input[name='repPer-unit']").val()
                                        });
                                    });
                                    var jobPlanList = []; //工作安排
                                    $(".department-8 tr").each(function (index) {
                                        jobPlanList.push({
                                            begTime: $(this).find("input[name='work-startdate']").val(),
                                            endTime: $(this).find("input[name='work-enddate']").val(),
                                            dayTimes: $(this).find("input[name='work-days']").val(),
                                            perTimes: $(this).find("input[name='work-persons']").val(),
                                            workContent: $(this).find("input[name='work-content']").val()
                                        });
                                    });
                                    var data = [{
                                        applyId: cmx.g.applyId,
                                        projectNum: _projectNum,
                                        repairPlan: $("#cmx-i-30").val(), //保护修复进度及工作安排
                                        repPerList: repPerList, //修复人员
                                        jobPlanList: jobPlanList //工作安排
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId6',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "21":
                            case "22":
                            case "23":
                                $("#cmx-sumfounds").text(cmx.g.sumFunds);
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var proBudgetList = []; //项目概预算
                                    var sum = 0;
                                    $(".department-9 tr").each(function (index) {
                                        proBudgetList.push({
                                            fundName: $(this).find("input[name='fund-name']").val(),
                                            funds: $(this).find("input[name='fund-num']").val(),
                                            proportion: $(this).find("input[name='fund-percent']").val(),
                                        });
                                        sum = sum + parseInt($(this).find("input[name='fund-num']").val());
                                    });
                                    var costBreakList = []; //费用明细
                                    $(".department-10 tr").each(function (index) {
                                        costBreakList.push({
                                            fundName: $(this).find("input[name='cost-name']").val(),
                                            funds: $(this).find("input[name='cost-num']").val(),
                                            fundExplain: $(this).find("input[name='cost-explain']").val(),
                                            remark: $(this).find("input[name='cost-remark']").val(),
                                        });
                                    });
                                    var materialList = []; //材料、工器具购置
                                    $(".department-11 tr").each(function (index) {
                                        materialList.push({
                                            materialName: $(this).find("input[name='material-name']").val(),
                                            models: $(this).find("input[name='material-model']").val(),
                                            originPlace: $(this).find("input[name='material-place']").val(),
                                            brand: $(this).find("input[name='material-brand']").val(),
                                            numbers: $(this).find("input[name='material-numbers']").val(),
                                            unitPrice: $(this).find("input[name='material-price']").val(),
                                            sumPrice: $(this).find("input[name='material-sumprice']").val(),
                                            remark: $(this).find("input[name='material-remark']").val()
                                        });
                                    });
                                    //保存经费预算
                                    var data = [{
                                        applyId: cmx.g.applyId,
                                        projectNum: _projectNum,
                                        fundExplan: $("#cmx-i-32").val(), //经费预算说明
                                        costBreakList: costBreakList,
                                        materialList: materialList,
                                        proBudgetList: proBudgetList
                                    }];
                                    console.log(sum)
                                    if (sum > cmx.g.sumFunds) {
                                        showAlert({
                                            type: 'error',
                                            content: '不能超过方案经费预算的总预算' + cmx.g.sumFunds + '万元'
                                        });
                                        return;
                                    }
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId7',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();

                                });
                                break;
                            default:
                                break;
                        }
                    } else {
                        showAlert({
                            type: 'error',
                            content: '请先保存基本信息'
                        });
                    }
                } else {
                    if (!IsEmpty(cmx.g.applyId)) {
                        $(".baseinfo").parent().hide();
                        $(".table-hide").hide();
                        $(".textarea-hide").hide();
                        $("#cmx-textarea-div-" + treeId).show();
                        switch (treeId) {
                            case "3": //保存价值评估
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var data = [{
                                        valueAssess: $("#cmx-i-22").val(),
                                        applyId: cmx.g.applyId
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId1',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            // case "4": //保存现状调查
                            //     $("#cmx-button-save").hide();
                            //     $("#cmx-button-send").hide();
                            //     break;
                            // case "7": //病害评测
                            //     $("#cmx-button-save").hide();
                            //     $("#cmx-button-send").hide();
                            //     break;
                            // case "10": //修复技术及材料筛选
                            //     $("#cmx-button-save").hide();
                            //     $("#cmx-button-send").hide();
                            //     break;
                            // case "13": //保护条件措施或建议
                            //     $("#cmx-button-save").hide();
                            //     $("#cmx-button-send").hide();
                            //     break;
                            // case "17": //保护修复进度量及工作安排
                            //     $("#cmx-button-save").hide();
                            //     $("#cmx-button-send").hide();
                            //     break;
                            // case "24": //经费预算说明
                            //     $("#cmx-button-save").hide();
                            //     $("#cmx-button-send").hide();
                            //     break;
                            case "6": //保存工作目标
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var data = [{
                                        workTarget: $("#cmx-i-24").val(), //工作目标
                                        applyId: cmx.g.applyId
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId1',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "12": //保存保护修复技术
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var data = [{
                                        repairStep: $("#cmx-i-27").val(), //保护修复步骤
                                        applyId: cmx.g.applyId
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId1',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "16": //保存风险评估
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var data = [{
                                        riskAssess: $("#cmx-i-29").val(), //风险评估
                                        applyId: cmx.g.applyId
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId1',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            case "20": //保存安全措施
                                $("#cmx-button-save").unbind('click');
                                $("#cmx-button-save").bind('click', function () {
                                    var temp_flag = checkFormLength('#cmx-form',true);
                                    if (!temp_flag) {
                                        return;
                                    }
                                    var data = [{
                                        safeMethod: $("#cmx-i-31").val(), //安全措施
                                        applyId: cmx.g.applyId
                                    }];
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaMohRcrApply/saveprocessInstanceId1',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                // relicId:
                                                mrrFormData: data
                                            }),
                                            type: 'POST',
                                            success: function (result) {
                                                console.log(result);
                                                if (result.state == 200) {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '发送成功'
                                                    });
                                                }
                                            }
                                        })
                                        .start();
                                });
                                break;
                            default:
                                break;
                        }
                    } else {
                        showAlert({
                            type: 'error',
                            content: '请先保存基本信息'
                        });
                    }
                }

            }
        });

    //选择文物模态框
    setTimeout(function () {
        $("#cmx-select-relic-btn").on("click", function () {
            new cmx.process()
                .turn('buildRelicInfoModal', {
                    callback: function (param) {
                        console.log(param)
                        var tr_html = '';
                        tr_html = ['<tr>',
                            '<td>',
                            '<input type="checkbox" name="cmx-handle-relic">',
                            '</td>',
                            '<td><button class="btn btn-primary cmx-detail-btn"  antiqueId="' + param.antiqueId + '" onclick="editRelic(\'' + param.antiqueId + '\')">编辑文物详情</button></td>',
                            '<td>' + param.antiqueName + '</td>',
                            '<td>' + param.relicCode + '</td>',
                            '<td>' + param.relicLevelName + '</td>',
                            '<td>' + param.ageName + '</td>',
                            '<td>' + param.realSize + '</td>',
                            '<td>' + param.saveStateName + '</td>',
                            // '<td>' + '' + '</td>', //病害图
                            '</tr>'
                        ].join('');
                        $("#cmx-56015b02-tbody").append(tr_html);
                        var param_data = {};
                        param_data = {
                            "param": param,
                            "relicId": ""
                        }
                        cmx.g.relicItem.put(param.antiqueId, param_data);
                    }
                })
                .ccatch(function (msg) {}).cfinally(function () {}).start();
        });
    }, 500);
    //移除
    setTimeout(function () {
        $("#cmx-select-delect-btn").on("click", function () {
            // var count_tr = $("#cmx-56015b02-tbody").find("tr").length;
            $('#cmx-56015b02-tbody input[type="checkbox"]').each(function () {
                if ($(this).is(":checked")) {

                    if (!IsNull($(this).parent().parent().find('button').attr("antiqueId"))) {
                        //新增文物信息删除
                        cmx.g.relicItem.remove($(this).parent().parent().find("button").attr("antiqueId"));
                    }
                    if (!IsNull($(this).parent().parent().find('button').attr("relicId"))) {
                        //返回的文物删除
                        cmx.g.backRelicItem.remove($(this).parent().parent().find("button").attr("relicId"));
                    }
                    $(this).parent().parent().remove();
                }
            });
        });
    }, 500)

    //发送
    $("#cmx-button-send").unbind('click');
    $("#cmx-button-send").bind('click', function () {
        var temp_flag = checkFormLength('#cmx-form',true);
        if (!temp_flag) {
            return;
        }
        if (IsEmpty($("#cmx-i-6-unitName").val())) {
            showAlert({
                type: "info",
                content: "请选择方案编制单位"
            });
            return;
        }
        if ($(".department-1 tr").length == 0) {
            showAlert({
                type: "info",
                content: "请添加其他主要参加单位"
            });
            return;
        }
        $(".department-1 tr").each(function (index) {
            if ($(this).find('input[type="text"]').val().length > 200) {
                showAlert({
                    type: "info",
                    content: "单位名称不能超过200字"
                });
                return;
            }
        });
        if (IsEmpty($("#cmx-special-P0008 input[name='principalname']").val())) {
            showAlert({
                type: "info",
                content: "编制负责人姓名不能为空"
            });
            return;
        }
        if ($("#cmx-special-P0008 input[name='principalname']").val().length > 40) {
            showAlert({
                type: "info",
                content: "编制负责人姓名不能超过40字"
            });
            return;
        }
        if (!$("#cmx-special-P0008 input[name='sex-1']").is(":checked")) {
            showAlert({
                type: "info",
                content: "请选择编制负责人性别"
            });
            return;
        }
        if (!$("#cmx-special-P0008 input[name='edu']").is(":checked")) {
            showAlert({
                type: "info",
                content: "请选择编制负责人学历"
            });
            return;
        }
        if (!$("#cmx-special-P0008 input[name='title-1']").is(":checked")) {
            showAlert({
                type: "info",
                content: "请选择编制负责人职称"
            });
            return;
        }
        if (IsEmpty($("#cmx-special-P0008 input[name='principaltel']").val())) {
            showAlert({
                type: "info",
                content: "编制负责人联系电话不能为空"
            });
            return;
        }
        if ($("#cmx-special-P0008 input[name='principaltel']").val().length > 64) {
            showAlert({
                type: "info",
                content: "编制负责人联系电话不能超过64位"
            });
            return;
        }
        if (IsEmpty($("#cmx-special-P0008 input[name='principalbirthday']").val())) {
            showAlert({
                type: "info",
                content: "编制负责人出生年月不能为空"
            });
            return;
        }
        if (IsEmpty($("#cmx-special-P0008 input[name='principalemail']").val())) {
            showAlert({
                type: "info",
                content: "编制负责人E-mail不能为空"
            });
            return;
        }
        if (IsEmpty($("#cmx-special-P0009 input[name='auditorname']").val())) {
            showAlert({
                type: "info",
                content: "方案审核人姓名不能为空"
            });
            return;
        }
        if ($("#cmx-special-P0009 input[name='auditorname']").val().length > 32) {
            showAlert({
                type: "info",
                content: "方案审核人姓名不能超过32字"
            });
            return;
        }
        if (!$("#cmx-special-P0009 input[name='sex-2']").is(":checked")) {
            showAlert({
                type: "info",
                content: "请选择方案审核人性别"
            });
            return;
        }
        if (!$("#cmx-special-P0009 input[name='title-2']").is(":checked")) {
            showAlert({
                type: "info",
                content: "请选择方案审核人职称"
            });
            return;
        }
        if (IsEmpty($("#cmx-special-P0009 input[name='auditorbirthday']").val())) {
            showAlert({
                type: "info",
                content: "方案审核人出生年月不能为空"
            });
            return;
        }
        if (IsEmpty($("#cmx-special-P0009 input[name='auditorunit']").val())) {
            showAlert({
                type: "info",
                content: "方案审核人所在单位不能为空"
            });
            return;
        }
        if ($("#cmx-special-P0009 input[name='auditorunit']").val().length > 50) {
            showAlert({
                type: "info",
                content: "方案审核人所在单位不能超过50字"
            });
            return;
        }
        if ($(".department-2 tr").length == 0) {
            showAlert({
                type: "info",
                content: "请添加方案主要编制人员"
            });
            return;
        }
        $(".department-2 tr").each(function (index) {
            if ($(this).find('.project-personname').val().length > 32) {
                showAlert({
                    type: "info",
                    content: "方案主要编制人员姓名不能超过32字"
                });
                return;
            }
            if ($(this).find('.project-personunit').val().length > 50) {
                showAlert({
                    type: "info",
                    content: "方案主要编制人员所在单位不能超过50字"
                });
                return;
            }
            if ($(this).find('.project-persontask').val().length > 1000) {
                showAlert({
                    type: "info",
                    content: "方案主要编制人员编制任务分工不能超过1000字"
                });
                return;
            }
        });
        if (IsEmpty($("#date-start").val())) {
            showAlert({
                type: "info",
                content: "方案执行周期开始时间不能为空"
            });
            return;
        }
        if (IsEmpty($("#date-end").val())) {
            showAlert({
                type: "info",
                content: "方案执行周期结束时间不能为空"
            });
            return;
        }
        if (IsEmpty($("#totalexpend").val())) {
            showAlert({
                type: "info",
                content: "总经费不能为空"
            });
            return;
        }
        if (IsEmpty($("#nationexpend").val())) {
            showAlert({
                type: "info",
                content: "申请国拨经费不能为空"
            });
            return;
        }
        var othUnitNameList = [];
        $(".department-1 tr").each(function (index) {
            othUnitNameList.push({
                unitName: $(this).find('input[type="text"]').val()
            });
        });
        var schemeList = [];
        $(".department-2 tr").each(function (index) {
            schemeList.push({
                name: $(this).find('.project-personname').val(),
                title: $(this).find("input[type='radio']:checked").val(),
                belogUnit: $(this).find('.project-personunit').val(),
                perTask: $(this).find('.project-persontask').val()
            });
        });
        var filesList = [];
        filesList.push({
            "fileClass": '27',
            "fileIndex": getFileListForSave(cmx.g.filelinkfileclass, '27')[0].fileIndex
        });
        filesList.push({
            "fileClass": '28',
            "fileIndex": getFileListForSave(cmx.g.filelinkfileclass, '28')[0].fileIndex
        });
        filesList.push({
            "fileClass": '99',
            "fileIndex": getFileListForSave(cmx.g.filelinkfileclass, '99')[0].fileIndex
        });
        var data = [{
            applyId: cmx.g.applyId,
            contactName: $("#cmx-i-4").val(), //联系人
            contactTel: $("#cmx-i-5").val(), //联系电话
            projectName: $("#cmx-i-2").val(), //项目名称
            collectUnits: $("#cmx-i-3").val(), //文物收藏单位
            projectNum: _projectNum, //审批事项
            projectType: "2", //项目类型
            publishType: "6", //单位类型，其他
            designUnits: $("#cmx-i-6-unitName").val(), //方案编制单位名称
            duarea: $("#cmx-i-6-address").val(), //方案编制单位所在地
            duaddress: $("#cmx-i-6-postaddress").val(), //方案编制单位通讯地址
            ducode: $("#cmx-i-6-postCode").val(), //方案编制单位邮编
            ducertNum: $("#cmx-i-6-certiNum").val(), //方案编制单位证书编号
            dudepartment: $("#cmx-i-6-mngInst").val(), //方案编制单位主管部门
            othUnitList: othUnitNameList, //unitName
            respoName: $("#cmx-special-P0008 input[name='principalname']").val(), //编制负责人姓名
            respoSex: $("#cmx-special-P0008 input[name='sex-1']:checked").val(), //编制负责人性别
            respoBirth: $("#cmx-special-P0008 input[name='principalbirthday']").val(), //编制负责人出生年月
            respoEducation: $("#cmx-special-P0008 input[name='edu']:checked").val(), //编制负责人学历
            respoTitle: $("#cmx-special-P0008 input[name='title-1']:checked").val(), //编制负责人职称
            respoTel: $("#cmx-special-P0008 input[name='principaltel']").val(), //编制负责人联系电话
            respoMail: $("#cmx-special-P0008 input[name='principalemail']").val(), //编制负责人email
            auditorName: $("#cmx-special-P0009 input[name='auditorname']").val(), //审核人姓名
            auditorSex: $("#cmx-special-P0009 input[name='sex-2']:checked").val(), //审核人性别
            auditorBirth: $("#cmx-special-P0009 input[name='auditorbirthday']").val(), //审核人出生年月
            auditorTitle: $("#cmx-special-P0009 input[name='title-2']:checked").val(), //审核人职称
            auditorUnit: $("#cmx-special-P0009 input[name='auditorunit']").val(), //审核人所在单位
            schemeList: schemeList, //方案主要编制人员
            mainTarget: $("#cmx-i-12").val(), //主要目标
            techRoadmap: $("#cmx-i-13").val(), //技术线路概况
            programBeg: $("#date-start").val(), //方案执行周期开始年月
            programEnd: $("#date-end").val(), //方案执行周期结束年月
            sumFunds: $("#totalexpend").val(), //总经费
            applyFunds: $("#nationexpend").val(), //申请国拨经费
            riskAnalys: $("#cmx-i-16").val(), //风险分析
            remark: $("#cmx-i-17").val(), //备注
            files: filesList
        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohRcrApply/sendEaMohRcrApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    // relicId:
                    mrrFormData: data
                }),
                type: 'POST',
                success: function (result) {
                    console.log(result);
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        cmx.g.applyId = result.data.applyId;
                        setTimeout(function () {
                            window.location.href = "/app/f-gover-approval/province/province-needToDo.html?nowid="+GetUrlParamString('nowid');
                        }, 2000);
                    }
                }
            })
            .start();
    });
    setTimeout(function () {
        if (!IsEmpty(GetUrlParamString('applyId'))) {
            cmx.g.applyId = GetUrlParamString('applyId'); //alert
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaMohRcrApply/getRcrdetail',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                        projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                    }),
                    type: 'POST',
                    success: function (result) {
                        console.log(result)
                    }
                })
                .turn('build56015bInput', {
                    isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
                })
                .turn('buildFileList', {
                    projectNum: _projectNum
                })
                .start();
        }
    }, 0);

});


//基本信息
function baseInfo(datas) {
    $.ajax({
        url: datas.url,
        type: "GET",
        async: false,
        success: function (result) {
            var data = result;
            for (var i = 0; i < data.length; i++) {
                var type = data[i].type;
                var width = data[i].extra.width;

                var notnull = (data[i].attribute.notnull == 1) ? true : false;
                var attrstring = 'cmx-tag="cmx" cmx-lib="' + data[i].serialnumber +
                    '" cmx-index="' + data[i].columnindex +
                    '" cmx-column="' + data[i].columnname + '" cmx-type="' + data[i].type +
                    '" cmx-require="' +
                    notnull + '"';
                if (data[i].extra.width == "") {
                    width = 12;
                }
                if (type == 'text' || type == 'single' || type == 'extra') {
                    attrstring = attrstring + 'cmx-stype="' + data[i].attribute.stype + '"';
                }
                new cmx.process()
                    .turn('automated-form-' + type, {
                        "element": datas.element,
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
                            $('[data-plugin="datepicker"]').datepicker({ //日期控件
                                language: 'zh-CN',
                                autoclose: true, //选择之后是否关闭日期选项
                                todayHighlight: true, //当为true的时候高亮
                                keyboardNavigation: true,
                                format: 'yyyy-mm-dd',
                            });
                        } catch (exception) {

                        }
                    }).start();
            }
            // send.toviewresolve(result.data).go();  
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
//方案编制单位
function cmx_special_1(data) {
    var html = [
        '<div class=" row margin-bottom-10">',
        '<div class="col-sm-3 col-md-3 col-lg-3">名称</div><div class="col-sm-6 col-md-6 col-lg-6 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '-unitName" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-unitList-choose btn btn-primary">选择</buttonid></div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-3 col-md-3 col-lg-3">单位所在地</div>',
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '-address" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-3 col-md-3 col-lg-3">通讯地址</div>',
        '<div class="col-sm-3 col-md-3 col-lg-3 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '-postaddress" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3" style="text-align:center;">邮编</div>',
        '<div class="col-sm-3 col-md-3 col-lg-3 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '-postCode" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-3 col-md-3 col-lg-3">证书编号</div>',
        '<div class="col-sm-3 col-md-3 col-lg-3 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '-certiNum" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3" style="text-align:center;">主管部门</div>',
        '<div class="col-sm-3 col-md-3 col-lg-3 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '-mngInst" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '</div>'
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
    //获取方案编制单位列表
    $(".cmx-unitList-choose").on("click", function () {
        new cmx.process()
            .turn('buildSelectUnitList', {
                busiType: 'CRR',
                projectNum: '56015_b',
                goto: function (data) {
                    console.log(data)
                    $("#cmx-i-6-unitName").val(cmx.g.unitName);
                    $("#cmx-i-6-unitName").attr('readonly', 'readonly');
                    $("#cmx-i-6-unitName").attr('disabled', 'disabled');
                    $("#cmx-i-6-postaddress").val(data.address);
                    $("#cmx-i-6-postaddress").attr('readonly', 'readonly');
                    $("#cmx-i-6-postaddress").attr('disabled', 'disabled');
                    $("#cmx-i-6-address").val(data.address);
                    $("#cmx-i-6-address").attr('readonly', 'readonly');
                    $("#cmx-i-6-address").attr('disabled', 'disabled');
                    $("#cmx-i-6-postCode").val(data.postCode);
                    $("#cmx-i-6-postCode").attr('readonly', 'readonly');
                    $("#cmx-i-6-postCode").attr('disabled', 'disabled');
                    $("#cmx-i-6-certiNum").val(data.certiNum);
                    $("#cmx-i-6-certiNum").attr('readonly', 'readonly');
                    $("#cmx-i-6-certiNum").attr('disabled', 'disabled');
                    $("#cmx-i-6-mngInst").val(data.mngInst);
                    $("#cmx-i-6-mngInst").attr('readonly', 'readonly');
                    $("#cmx-i-6-mngInst").attr('disabled', 'disabled');
                    $("#cmx-unitList-modal").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function (msg) {})
            .cfinally(function () {}).start();
    });
}
//其他主要参加单位
function cmx_special_2(data) {
    var html = ['<button id="addrow-1" class="margin-right-10 margin-bottom-10 btn btn-primary">添加行</button>',
        '<button id="deleterow-1" class="margin-bottom-10 btn btn-primary">删除行</button>',
        '<table id="other-main-unit" class="table table-bordered">',
        '<thead>',
        '<tr>',
        '<th>序号</th>',
        '<th class="operate">操作</th>',
        '<th>单位名称</th>',
        '</tr>',
        '</thead>',
        '<tbody class="department-1">',
        '</tbody>',
        '</table>'
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
    var count_tr = 0;
    $("#addrow-1").unbind("click");
    $("#addrow-1").bind("click", function () {
        if ($(".department-1 tr").length == 0) {
            count_tr = count_tr + 1;
        } else {
            count_tr = $(".department-1 tr").length + 1;
        }
        var tr_html = ['<tr>',
            '<td>' + count_tr + '</td>',
            '<td><input type="checkbox" name="cmx-row-1"></td>',
            '<td><input type="text" class="form-control"></td>',
            '</tr>'
        ].join('');
        $(".department-1").append(tr_html);
    });
    $("#deleterow-1").unbind("click");
    $("#deleterow-1").bind("click", function () {
        $('.department-1 input[type="checkbox"]').each(function () {
            if ($(this).is(":checked")) {
                $(this).parent().parent().remove();
                count_tr = count_tr - 1;
            }
        });
        for (var i = 1; i <= count_tr; i++) {
            $(".department-1 tr").each(function (index) {
                if ((index + 1) == i) {
                    $(this).find("td").first().html(i);
                }
            })
        }
    });
}
//编制负责人
function cmx_special_3(data) {
    var html = ['<div class="row margin-bottom-10">',
        '<div class="col-sm-2 col-md-2 col-lg-2">姓名</div>',
        '<div class="col-sm-2 col-md-2 col-lg-2 cmx-special-provincefile"><input name="principalname" type="text" class="form-control"  placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-2 col-md-2 col-lg-2">性别</div>',
        '<div class="col-sm-6 col-md-6 col-lg-6">',
        '<div class="radio-custom radio-primary radio-inline"><input id="male-1" type="radio" value="1" name="sex-1">',
        '<label for="male-1">男</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="female-1" type="radio" name="sex-1" value="2">',
        '<label for="female-1">女</label>',
        '</div>',
        '</div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-1 col-md-1 col-lg-1">学历</div>',
        '<div class="col-sm-10 col-md-10 col-lg-10">',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="graduate" type="radio" name="edu" value="研究生">',
        '<label for="graduate">研究生</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="university" type="radio" name="edu" value="大学">',
        '<label for="university">大学</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="junior" type="radio" name="edu" value="大专">',
        '<label for="junior">大专</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="middle" type="radio" name="edu" value="中专">',
        '<label for="middle">中专</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="other" type="radio" name="edu" value="其他">',
        '<label for="other">其他</label>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-1 col-md-1 col-lg-1">职称</div>',
        '<div class="col-sm-5 col-md-5 col-lg-5">',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="high-1" type="radio" name="title-1" value="高级">',
        '<label for="high-1">高级</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="middle-1" type="radio" name="title-1" value="中级">',
        '<label for="middle-1">中级</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="low-1" type="radio" name="title-1" value="初级">',
        '<label for="low-1">初级</label>',
        '</div>',
        '</div>',
        '<div class="col-sm-2 col-md-2 col-lg-2">出生年月</div>',
        '<div class="input-group col-sm-4 col-md-4 col-lg-4">',
        '<span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input type="text" name="principalbirthday" class="form-control" data-plugin="datepicker" data-language="zh-CN">',
        '</div>',
        '</div>',
        '<div class="row margin-bottom-10">',
        '<div class="col-sm-2 col-md-2 col-lg-2">联系电话</div>',
        '<div class="col-sm-4 col-md-4 col-lg-4 cmx-special-provincefile"><input type="text" class="form-control" name="principaltel" value=""></div>',
        '<div class="col-sm-2 col-md-2 col-lg-2">E-mail</div>',
        '<div class="col-sm-4 col-md-4 col-lg-4 cmx-special-provincefile"><input type="text" class="form-control" name="principalemail" value=""></div>',
        '</div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}
//方案审核人
function cmx_special_4(data) {
    var html = ['<div class="row margin-bottom-10">',
        '<div class="col-sm-2 col-md-2 col-lg-2">姓名</div>',
        '<div class="col-sm-2 col-md-2 col-lg-2 cmx-special-provincefile"><input type="text" class="form-control" name="auditorname" value=""></div>',
        '<div class="col-sm-2 col-md-2 col-lg-2">性别</div>',
        '<div class="col-sm-6 col-md-6 col-lg-6">',
        '<div class="radio-custom radio-primary radio-inline"><input id="male-2" type="radio" name="sex-2" value="1">',
        '<label for="male-2">男</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="female-2" type="radio" name="sex-2" value="2">',
        '<label for="female-2">女</label>',
        '</div>',
        '</div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-1 col-md-1 col-lg-1">职称</div>',
        '<div class="col-sm-5 col-md-5 col-lg-5">',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="high-2" type="radio" name="title-2" value="高级">',
        '<label for="high-2">高级</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="middle-2" type="radio" name="title-2" value="中级">',
        '<label for="middle-2">中级</label>',
        '</div>',
        '<div class="radio-custom radio-primary radio-inline">',
        '<input id="low-2" type="radio" name="title-2" value="初级">',
        '<label for="low-2">初级</label>',
        '</div>',
        '</div>',
        '<div class="col-sm-2 col-md-2 col-lg-2">出生年月</div>',
        '<div class="input-group col-sm-4 col-md-4 col-lg-4">',
        '<span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input type="text" name="auditorbirthday" class="form-control" data-plugin="datepicker" data-language="zh-CN">',
        '</div>',
        '</div>',

        '<div class="row margin-bottom-10">',
        '<div class="col-sm-3 col-md-3 col-lg-3">所在单位</div>',
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" name="auditorunit" value=""></div>',
        '</div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
    $('[data-plugin="datepicker"]').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });
}
//方案主要编制人员
function cmx_special_5(data) {
    var html = ['<button id="addrow-2" class="margin-right-10 margin-bottom-10 btn btn-primary">添加行</button>',
        '<button id="deleterow-2" class="margin-bottom-10 btn btn-primary">删除行</button>',
        '<div class="table-responsive">',
        '<table class="table table-bordered">',
        '<thead>',
        '<tr>',
        '<th>序号</th>',
        '<th>操作</th>',
        '<th>姓名</th>',
        '<th>职称</th>',
        '<th>所在单位</th>',
        '<th>编制任务分工</th>',
        '</tr>',
        '</thead>',
        '<tbody class="department-2">',
        '</tbody>',
        '</table>',
        '</div>'
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
    var count_tr = 0;
    $("#addrow-2").unbind("click");
    $("#addrow-2").bind("click", function () {
        if ($(".department-2 tr").length == 0) {
            count_tr = count_tr + 1;
        } else {
            count_tr = $(".department-2 tr").length + 1;
        }
        var tr_html = ['<tr>',
            '<td>' + count_tr + '</td>',
            '<td><input type="checkbox" name="cmx-row-2"></td>',
            '<td><input type="text" class="form-control project-personname"></td>',
            '<td>',
            '<div class="radio-custom radio-primary radio-inline">',
            '<input id="high-projectperson-' + count_tr + '" value="高级" type="radio" name="project-title-' + count_tr + '">',
            '<label for="high-projectperson-' + count_tr + '">高级</label>',
            '</div>',
            '<div class="radio-custom radio-primary radio-inline">',
            '<input id="middle-projectperson-' + count_tr + '" value="中级" type="radio" name="project-title-' + count_tr + '">',
            '<label for="middle-projectperson-' + count_tr + '">中级</label>',
            '</div>',
            '<div class="radio-custom radio-primary radio-inline">',
            '<input id="low-projectperson-' + count_tr + '" value="初级" type="radio" name="project-title-' + count_tr + '">',
            '<label for="low-projectperson-' + count_tr + '">初级</label>',
            '</div>',
            '</td>',
            '<td><input type="text" class="form-control project-personunit"></td>',
            '<td><input type="text" class="form-control project-persontask"></td>',
            '</tr>'
        ].join('');
        $(".department-2").append(tr_html);
    });
    $("#deleterow-2").unbind("click");
    $("#deleterow-2").bind("click", function () {
        $('.department-2 input[type="checkbox"]').each(function () {
            if ($(this).is(":checked")) {
                $(this).parent().parent().remove();
                count_tr = count_tr - 1;
            }
        });
        for (var i = 1; i <= count_tr; i++) {
            $(".department-2 tr").each(function (index) {
                if ((index + 1) == i) {
                    $(this).find("td").first().html(i);
                }
            })
        }
    });
}
//文物数量
function cmx_special_6(data) {
    var html = [
        '<div class=""row>',
        '<table class="table table-bordered">',
        '<thead>',
        '<th>拟修复文物数量</th>',
        '<th>一级文物</th>',
        '<th>二级文物</th>',
        '<th>三级文物</th>',
        '<th>一般文物</th>',
        '<th>未定级文物</th>',
        '</thead>',
        '<tbody id="cmx-relic-num">',
        '</tbody>',
        '</table>',
        '</div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}
//方案执行周期
function cmx_special_7(data) {
    var html = [
        '<div class="row">',
        '<div class="col-sm-9 col-md-9 col-lg-9">',
        '<div class="input-daterange" data-plugin="datepicker" data-language="zh-CN">',
        '<div class="input-group">',
        '<span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input type="text" class="form-control" name="start" id="date-start">',
        '</div>',
        '<div class="input-group">',
        '<span class="input-group-addon"> 至 </span>',
        '<input type="text" class="form-control" name="end" id="date-end">',
        '</div>',
        '</div>',
        '</div>',
        '<div class="col-sm-3 col-md-3 col-lg-3">',
        '<span>共计<span id="summonth"></span>个月</span>',
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
        var summonth;
        console.log($("#date-start").val())
        var date_start = datetime_to_unix($("#date-start").val() + ' 00:00:00');
        var date_end = datetime_to_unix($("#date-end").val() + ' 00:00:00');
        summonth = Math.ceil((date_end - date_start) / 24 / 60 / 30 / 60);
        var html = ['' + summonth + ''].join("");
        $("#summonth").html(html);
    });

}
//方案经费预算
function cmx_special_8(data) {
    var html = [
        '<div class="row">',
        '<div class="col-sm-6 col-md-6 col-lg-6">',
        '<div class="cmx-form-body">',
        '<div class="form-group">',
        '<label class="control-label col-sm-3" for="' + data.columnindex + '">总经费</label>',
        '<div class="col-sm-9">',
        '<div class="input-group input-group-icon">',
        '<input type="number" class="form-control" id="totalexpend" placeholder="' + data.extra.placeholder + '" value="">',
        '<span class="input-group-addon"> 万元 </span>',
        '</span>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="col-sm-6 col-md-6 col-lg-6">',
        '<div class="cmx-form-body">',
        '<div class="form-group">',
        '<label class="control-label col-sm-3" for="' + data.columnindex + '">申请国拨经费</label>',
        '<div class="col-sm-9">',
        '<div class="input-group input-group-icon">',
        '<input type="number" class="form-control" id="nationexpend" placeholder="' + data.extra.placeholder + '" value="">',
        '<span class="input-group-addon"> 万元 </span>',
        '</span>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>'
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}
cmx.route.model({
    index: 'build56015bInput',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data[0];
            console.log(data)
            cmx.g.sumFunds = data.sumFunds;
            $("#cmx-i-2").val(data.projectName); //项目名称
            //省文件号第二个 
            // $("#cmx-i-2-2 option[value='" + data.fileNumMidd + "']").attr("selected", "selected");
            $("#cmx-i-3").val(data.collectUnits); //
            $("#cmx-i-4").val(data.contactName); //联系人 
            $("#cmx-i-5").val(data.contactTel); //联系电话

            $("#cmx-i-6-unitName").val(data.designUnits); //方案编制单位名称
            $("#cmx-i-6-address").val(data.duarea); //方案编制单位所在地
            $("#cmx-i-6-postaddress").val(data.duaddress); //方案编制单位通讯地址
            $("#cmx-i-6-postCode").val(data.ducode); //邮编 
            $("#cmx-i-6-certiNum").val(data.ducertNum); //证书编号 
            $("#cmx-i-6-mngInst").val(data.dudepartment); //方案编制单位主管部门
            for (var i = 0; i < data.othUnitList.length; i++) { //其他主要参加单位
                var tr_html_1 = '';
                tr_html_1 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-1"></td>',
                    '<td><input type="text" class="form-control" value="' + data.othUnitList[i].unitName + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-1").append(tr_html_1);
            }

            $("#cmx-special-P0008").find("input[name='principalname']").val(data.respoName); //编制负责人姓名
            $("#cmx-special-P0008").find("input[name='sex-1'][value='" + data.respoSex + "']").attr("checked", true); //编制负责人性别
            $("#cmx-special-P0008").find("input[name='principalbirthday']").val(data.respoBirth); //编制负责人出生年月
            $("#cmx-special-P0008").find("input[name='edu'][value='" + data.respoEducation + "']").attr("checked", true); //编制负责人学历
            $("#cmx-special-P0008").find("input[name='title-1'][value='" + data.respoTitle + "']").attr("checked", true); //编制负责人职称
            $("#cmx-special-P0008").find("input[name='principaltel']").val(data.respoTel); //编制负责人联系电话
            $("#cmx-special-P0008").find("input[name='principalemail']").val(data.respoMail); //编制负责人email
            $("#cmx-special-P0009").find("input[name='auditorname']").val(data.auditorName); //审核人姓名
            $("#cmx-special-P0009").find("input[name='sex-2'][value='" + data.auditorSex + "']").attr("checked", true); //审核人性别
            $("#cmx-special-P0009").find("input[name='auditorbirthday']").val(data.auditorBirth); //审核人出生年月
            $("#cmx-special-P0009").find("input[name='title-2'][value='" + data.auditorTitle + "']").attr("checked", true); //审核人职称
            $("#cmx-special-P0009").find("input[name='auditorunit']").val(data.auditorUnit); //审核人所在单位

            for (i = 0; i < data.schemeList.length; i++) { //方案主要编制人员
                var tr_html_2 = '';
                tr_html_2 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-2"></td>',
                    '<td><input type="text" class="form-control project-personname" value="' + data.schemeList[i].name + '"></td>',
                    '<td>',
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input id="high-projectperson-' + (i + 1) + '" value="高级" type="radio" name="project-title-' + (i + 1) + '">',
                    '<label for="high-projectperson-' + (i + 1) + '">高级</label>',
                    '</div>',
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input id="middle-projectperson-' + (i + 1) + '" value="中级" type="radio" name="project-title-' + (i + 1) + '">',
                    '<label for="middle-projectperson-' + (i + 1) + '">中级</label>',
                    '</div>',
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input id="low-projectperson-' + (i + 1) + '" value="初级" type="radio" name="project-title-' + (i + 1) + '">',
                    '<label for="low-projectperson-' + (i + 1) + '">初级</label>',
                    '</div>',
                    '</td>',
                    '<td><input type="text" class="form-control project-personunit" value="' + data.schemeList[i].belogUnit + '"></td>',
                    '<td><input type="text" class="form-control project-persontask" value="' + data.schemeList[i].perTask + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-2").append(tr_html_2);
                $("input[name='project-title-" + (i + 1) + "'][value='" + data.schemeList[i].title + "']").attr("checked", true);
            }

            $("#cmx-i-12").val(data.mainTarget); //主要目标
            $("#cmx-i-13").val(data.techRoadmap); //技术线路概况 
            $("#date-start").val(data.programBeg); //方案执行周期开始年月 
            $("#date-end").val(data.programEnd); //方案执行周期结束年月 
            var summonth;
            var date_start = datetime_to_unix(data.programBeg + ' 00:00:00');
            var date_end = datetime_to_unix(data.programEnd + ' 00:00:00');
            summonth = Math.ceil((date_end - date_start) / 24 / 60 / 30 / 60);
            var html = ['' + summonth + ''].join("");
            $("#summonth").html(html);
            $("#totalexpend").val(data.sumFunds); //总经费 
            $("#nationexpend").val(data.applyFunds); //申请国拨经费 
            $("#cmx-i-16").val(data.riskAnalys); //风险分析 
            $("#cmx-i-17").val(data.remark); //备注

            $("#cmx-i-22").val(data.valueAssess); //价值评估
            $("#cmx-i-23").val(data.saveType); //保存现状调查
            $("#cmx-i-24").val(data.workTarget); //工作目标
            $("#cmx-i-25").val(data.diseaseEval); //病害评测
            $("#cmx-i-26").val(data.repairTech); //修复技术及材料筛选
            $("#cmx-i-27").val(data.repairStep); //保护修复步骤
            $("#cmx-i-28").val(data.saveTerm); //保存条件措施或建议
            $("#cmx-i-29").val(data.riskAssess); //风险评估
            $("#cmx-i-30").val(data.repairPlan); //保护修复进度及工作安排
            $("#cmx-i-31").val(data.safeMethod); //安全措施
            $("#cmx-i-32").val(data.fundExplan); //经费预算说明

            $("input[name='judge-1'][value='" + data.isRepair + "']").attr("checked", true);
            //修复历史信息
            for (i = 0; i < data.repHisList.length; i++) {
                var tr_html_3 = '';
                tr_html_3 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-3"></td>',
                    '<td><div class="input-group"><span class="input-group-addon">',
                    '<i class="icon wb-calendar" aria-hidden="true"></i>',
                    '</span>',
                    '<input type="text" class="form-control" value="' + data.repHisList[i].repairTime + '" name="restoretime" data-plugin="datepicker" data-language="zh-CN"></div></td>',
                    '<td><input type="text" value="' + data.repHisList[i].repairMethod + '" class="form-control" name="restoremethod"></td>',
                    '<td><input type="text" value="' + data.repHisList[i].repairStuff + '" class="form-control" name="restorematerials"></td>',
                    '<td><input type="text" value="' + data.repHisList[i].repairUnit + '" class="form-control" name="restoreunit"></td>',
                    '</tr>'
                ].join('');
                $(".department-3").append(tr_html_3);
                $('[data-plugin="datepicker"]').datepicker({ //日期控件
                    language: 'zh-CN',
                    autoclose: true, //选择之后是否关闭日期选项
                    keyboardNavigation: true,
                    format: 'yyyy-mm-dd',
                });
            }
            //病害识别
            for (i = 0; i < data.riskIcList.length; i++) {
                var tr_html_4 = '';
                tr_html_4 = [
                    '<tr>',
                    '<td id="name-' + (i + 1) + '">' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-4"></td>',
                    '<td><input type="text" class="form-control" name="virus-recognition" value="' + data.riskIcList[i].riskIc + '"></td>',
                    '<td><input type="text" class="form-control" name="virus-instrument" value="' + data.riskIcList[i].apparapusParam + '"></td>',
                    '<td><input type="text" class="form-control" name="virus-times" value="' + data.riskIcList[i].times + '"></td>',
                    '<td><input type="text" class="form-control" name="virus-phenomenon" value="' + data.riskIcList[i].phenomenon + '"></td>',
                    '<td><input type="text" class="form-control" name="virus-results" value="' + data.riskIcList[i].results + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-4").append(tr_html_4);
            }
            //具体技术路线
            for (i = 0; i < data.tecRouteList.length; i++) {
                var tr_html_5 = '';
                tr_html_5 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-5"></td>',
                    '<td><input type="text" class="form-control" name="tech-virus-name" value="' + data.tecRouteList[i].riskName + '"></td>',
                    '<td><input type="text" class="form-control" name="tech-name" value="' + data.tecRouteList[i].techName + '"></td>',
                    '<td><input type="text" class="form-control" name="tech-step" value="' + data.tecRouteList[i].specSteps + '"></td>',
                    '<td><input type="text" class="form-control" name="tech-materials" value="' + data.tecRouteList[i].involveStuff + '"></td>',
                    '<td><input type="text" class="form-control" name="tech-instrument" value="' + data.tecRouteList[i].involveTool + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-5").append(tr_html_5);
            }
            //柜架囊匣配置清单
            for (i = 0; i < data.cabCapList.length; i++) {
                var tr_html_6 = '';
                tr_html_6 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-12"></td>',
                    '<td><input type="text" class="form-control" name="cabcap-name" value="' + data.cabCapList[i].name + '"></td>',
                    '<td><input type="text" class="form-control" name="cabcap-size" value="' + data.cabCapList[i].sizeCab + '"></td>',
                    '<td><input type="text" class="form-control" name="cabcap-material" value="' + data.cabCapList[i].material + '"></td>',
                    '<td><input type="text" class="form-control" name="cabcap-number" value="' + data.cabCapList[i].numberCab + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-12").append(tr_html_6);
            }
            //重点文物独立存储/展示柜
            for (i = 0; i < data.cabinetList.length; i++) {
                var tr_html_7 = '';
                tr_html_7 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-6"></td>',
                    '<td><input type="text" class="form-control" name="relic-name" value="' + data.cabinetList[i].relicName + '"></td>',
                    '<td><input type="text" class="form-control" name="relic-level" value="' + data.cabinetList[i].relicLevel + '"></td>',
                    '<td><input type="text" class="form-control" name="relic-materials" value="' + data.cabinetList[i].relicMaterial + '"></td>',
                    '<td><input type="text" class="form-control" name="relic-box" value="' + data.cabinetList[i].displayCabinet + '"></td>',
                    '<td><input type="text" class="form-control" name="relic-size" value="' + data.cabinetList[i].sizeCab + '"></td>',
                    '<td><input type="text" class="form-control" name="relic-boxmaterials" value="' + data.cabinetList[i].dcMaterial + '"></td>',
                    '<td><input type="text" class="form-control" name="relic-reason" value="' + data.cabinetList[i].configReason + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-6").append(tr_html_7);
            }
            //修复人员
            for (i = 0; i < data.repPerList.length; i++) {
                var tr_html_8 = '';
                tr_html_8 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-7"></td>',
                    '<td><input type="text" class="form-control" name="repPer-name" value="' + data.repPerList[i].name + '"></td>',
                    '<td>',
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input id="repPer-man-' + (i + 1) + '" value="男" type="radio" name="repPer-sex-' + (i + 1) + '">',
                    '<label for="repPer-man-' + (i + 1) + '">男</label>',
                    '</div>',
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input id="repPer-female-' + (i + 1) + '" value="女" type="radio" name="repPer-sex-' + (i + 1) + '">',
                    '<label for="repPer-female-' + (i + 1) + '">女</label>',
                    '</div>',
                    '</td>',
                    '<td><input type="text" class="form-control" name="repPer-age" value="' + data.repPerList[i].age + '"></td>',
                    '<td><input type="text" class="form-control" name="repPer-title" value="' + data.repPerList[i].title + '"></td>',
                    '<td><input type="text" class="form-control" name="repPer-major" value="' + data.repPerList[i].professional + '"></td>',
                    '<td><input type="text" class="form-control" name="repPer-unit" value="' + data.repPerList[i].workUnit + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-7").append(tr_html_8);
                $("input[name='repPer-sex-" + (i + 1) + "'][value='" + data.repPerList[i].sex + "']").attr("checked", true);
            }
            //工作安排
            for (i = 0; i < data.jobPlanList.length; i++) {
                var tr_html_9 = '';
                tr_html_9 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-3"></td>',
                    '<td><div class="input-group"><span class="input-group-addon">',
                    '<i class="icon wb-calendar" aria-hidden="true"></i>',
                    '</span>',
                    '<input name="work-startdate" type="text" style="width:100px;"  class="form-control" data-plugin="datepicker" data-language="zh-CN" value="' + data.jobPlanList[i].begTime + '"></div></td>',
                    '<td><div class="input-group"><span class="input-group-addon">',
                    '<i class="icon wb-calendar" aria-hidden="true"></i>',
                    '</span>',
                    '<input name="work-enddate" type="text"  style="width:100px;" class="form-control" data-plugin="datepicker" data-language="zh-CN" value="' + data.jobPlanList[i].endTime + '"></div></td>',
                    '<td><input type="text" class="form-control" name="work-days" value="' + data.jobPlanList[i].dayTimes + '"></td>',
                    '<td><input type="text" class="form-control" name="work-persons" value="' + data.jobPlanList[i].perTimes + '"></td>',
                    '<td><input type="text" class="form-control" name="work-content" value="' + data.jobPlanList[i].workContent + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-8").append(tr_html_9);
            }
            //项目预（概）算
            for (i = 0; i < data.proBudgetList.length; i++) {
                var tr_html_10 = '';
                tr_html_10 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-9"></td>',
                    '<td><input type="text" class="form-control" name="fund-name" value="' + data.proBudgetList[i].fundName + '"></td>',
                    '<td><input type="text" class="form-control" name="fund-num" value="' + data.proBudgetList[i].funds + '"></td>',
                    '<td><input type="text" class="form-control" name="fund-percent" value="' + data.proBudgetList[i].proportion + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-9").append(tr_html_10);
            }
            $(".department-9 tr").each(function (index) {
                $(this).find("input[name='fund-num']").blur(function () {
                    var cost = $(this).val();
                    console.log(cost)
                    if (cost > cmx.g.sumFunds) {
                        showAlert({
                            type: 'error',
                            content: '不能超过方案经费预算的总预算' + cmx.g.sumFunds + '万元'
                        });
                        $(this).val('');
                    } else {
                        var percent = cost / cmx.g.sumFunds * 100;
                        $(this).parent().next().find("input").val(percent.toFixed(2) + '%')
                    }
                });
            });
            //费用明细
            for (i = 0; i < data.costBreakList.length; i++) {
                var tr_html_11 = '';
                tr_html_11 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-10"></td>',
                    '<td><input type="text" class="form-control" name="cost-name" value="' + data.costBreakList[i].fundName + '"></td>',
                    '<td><input type="text" class="form-control" name="cost-num" value="' + data.costBreakList[i].funds + '"></td>',
                    '<td><input type="text" class="form-control" name="cost-explain" value="' + data.costBreakList[i].fundExplain + '"></td>',
                    '<td><input type="text" class="form-control" name="cost-remark" value="' + data.costBreakList[i].remark + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-10").append(tr_html_11);
            }
            //材料、工器具购置
            for (i = 0; i < data.materialList.length; i++) {
                var tr_html_12 = '';
                tr_html_12 = [
                    '<tr>',
                    '<td>' + (i + 1) + '</td>',
                    '<td><input type="checkbox" name="cmx-row-11"></td>',
                    '<td><input type="text" class="form-control" name="material-name" value="' + data.materialList[i].materialName + '"></td>',
                    '<td><input type="text" class="form-control" name="material-model" value="' + data.materialList[i].models + '"></td>',
                    '<td><input type="text" class="form-control" name="material-place" value="' + data.materialList[i].originPlace + '"></td>',
                    '<td><input type="text" class="form-control" name="material-brand" value="' + data.materialList[i].brand + '"></td>',
                    '<td><input type="text" class="form-control" name="material-numbers" value="' + data.materialList[i].numbers + '"></td>',
                    '<td><input type="text" class="form-control" name="material-price" value="' + data.materialList[i].unitPrice + '"></td>',
                    '<td><input type="text" class="form-control" name="material-sumprice" value="' + data.materialList[i].sumPrice + '"></td>',
                    '<td><input type="text" class="form-control" name="material-remark" value="' + data.materialList[i].remark + '"></td>',
                    '</tr>'
                ].join('');
                $(".department-11").append(tr_html_12);
            }

            console.log(data.relicList)
            //文物信息
            for (i = 0; i < data.relicList.length; i++) {
                var tr_html_13 = '';
                tr_html_13 = ['<tr>',
                    '<td>',
                    '<input type="checkbox" name="cmx-handle-relic">',
                    '</td>',
                    '<td><button class="btn btn-primary cmx-detail-btn" relicId="' + data.relicList[i].relicId + '" onclick="editBackRelic(\'' + data.relicList[i].relicId + '\')">编辑文物详情</button></td>',
                    '<td>' + data.relicList[i].relicName + '</td>',
                    '<td>' + data.relicList[i].sumMark + '</td>',
                    '<td>' + data.relicList[i].relicLevel + '</td>',
                    '<td>' + data.relicList[i].specificYear + '</td>',
                    '<td>' + data.relicList[i].relicSize + '</td>',
                    '<td>' + data.relicList[i].saveType + '</td>',
                    '<td>' + '' + '</td>',
                    '</tr>'
                ].join('');
                $("#cmx-56015b02-tbody").append(tr_html_13);
                var param_data = {};
                param_data = {
                    "param": data.relicList[i],
                    "relicId": data.relicList[i].relicId
                }
                cmx.g.backRelicItem.put(data.relicList[i].relicId, param_data);
            }
            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
            }
        }
        send.go();
    }
});
//编辑文物详情，所有病害类型
function allType(data) {
    var html = [
        '<div id="allType">',
        '<span class="disease-type label label-info" onclick="addType(\'表层片状剥落\')">表层片状剥落</span>',
        '<span class="disease-type label label-info" onclick="addType(\'鳞片状起翘与剥落\')">鳞片状起翘与剥落</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面粉化剥落\')">表面粉化剥落</span>',
        '<span class="disease-type label label-info" onclick="addType(\'残缺\')">残缺</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面泛盐\')">表面泛盐</span>',
        '<span class="disease-type label label-info" onclick="addType(\'机械裂隙(应力裂隙)\')">机械裂隙(应力裂隙)</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面溶蚀\')">表面溶蚀</span>',
        '<span class="disease-type label label-info" onclick="addType(\'浅表性裂隙(风化裂隙)\')">浅表性裂隙(风化裂隙)</span>',
        '<span class="disease-type label label-info" onclick="addType(\'孔洞状风化\')">孔洞状风化</span>',
        '<span class="disease-type label label-info" onclick="addType(\'彩绘表面颜料脱落\')">彩绘表面颜料脱落</span>',
        '<span class="disease-type label label-info" onclick="addType(\'彩绘表面颜料酥粉\')">彩绘表面颜料酥粉</span>',
        '<span class="disease-type label label-info" onclick="addType(\'人为污染\')">人为污染</span>',
        '<span class="disease-type label label-info" onclick="addType(\'水锈结壳\')">水锈结壳</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面空鼓\')">表面空鼓</span>',
        '<span class="disease-type label label-info" onclick="addType(\'动物病害\')">动物病害</span>',
        '<span class="disease-type label label-info" onclick="addType(\'断裂\')">断裂</span>',
        '<span class="disease-type label label-info" onclick="addType(\'残损\')">残损</span>',
        '<span class="disease-type label label-info" onclick="addType(\'植物病害\')">植物病害</span>',
        '<span class="disease-type label label-info" onclick="addType(\'层状剥落\')">层状剥落</span>',
        '<span class="disease-type label label-info" onclick="addType(\'起翘\')">起翘</span>',
        '<span class="disease-type label label-info" onclick="addType(\'微生物伤害\')">微生物伤害</span>',
        '<span class="disease-type label label-info" onclick="addType(\'动物伤害\')">动物伤害</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面污染\')">表面污染</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面泛盐\')">表面泛盐</span>',
        '<span class="disease-type label label-info" onclick="addType(\'表面粉化\')">表面粉化</span>',
        '<span class="disease-type label label-info" onclick="addType(\'水泥修补\')">水泥修补</span>',
        '<span class="disease-type label label-info" onclick="addType(\'微生物病害\')">微生物病害</span>',
        '<span class="disease-type label label-info" onclick="addType(\'构造裂隙(原生裂隙)\')">构造裂隙(原生裂隙)</span>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}
//编辑文物详情，已选择病害详情
function selectType(data) {
    var html = [
        '<div id="selectType">',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}
//增加病害类型
function addType(type) {
    var html = [
        '<span class="disease-type label label-info" disease-type="' + type + '">' + type + '<i class = "icon wb-close" onclick="removeType(\'' + type + '\')"></i></span>',
    ].join('');
    $("#allType span").each(function (index) {
        if ($(this).text() == type) {
            $(this).remove();
        }
    });
    $(this).remove();
    $("#selectType").append(html);
}
//删除病害类型
function removeType(type) {
    $("#selectType span").each(function (index) {
        if ($(this).text() == type) {
            $(this).remove();
        }
    });
    var html = [
        '<span class="disease-type label label-info" disease-type="' + type + '" onclick="addType(\'' + type + '\')">' + type + '</span>',
    ].join('');
    $("#allType").append(html);
}
//编辑新增文物详情
function editRelic(antiqueId) {
    //获取文物详情
    $("#cmx-editrelicitem-modal").load(get56015bEditRelicItemModal, function () {
        $("#cmx-editrelicitem").off('shown.bs.modal');
        $("#cmx-editrelicitem").on('shown.bs.modal', function () {
            $('#cmx-form-modal').html('');
            var relicdetail_data = {
                "url": get56015bEditRelicItemData,
                "element": "#cmx-form-modal"
            };
            baseInfo(relicdetail_data);
            $("#cmx-j-1").val(cmx.g.relicItem.get(antiqueId).param.antiqueName);
            $("#cmx-j-2").val(cmx.g.relicItem.get(antiqueId).param.relicId);
            $("#cmx-j-3").val(cmx.g.relicItem.get(antiqueId).param.exactAge);
            $("#cmx-j-4").val(cmx.g.relicItem.get(antiqueId).param.relicLevelName);
            $("#cmx-j-7").val(cmx.g.relicItem.get(antiqueId).param.realSize);
            $("#cmx-j-8").val(cmx.g.relicItem.get(antiqueId).param.num);
            $("#cmx-j-9").val(cmx.g.relicItem.get(antiqueId).param.culturalClassName);
            $("#cmx-j-10").val(cmx.g.relicItem.get(antiqueId).param.relicQualityName);
            $("#cmx-j-11").val(cmx.g.relicItem.get(antiqueId).param.museumName); //
            $("#cmx-j-12").val(cmx.g.relicItem.get(antiqueId).param.saveYear);
            $("#cmx-j-13").val(cmx.g.relicItem.get(antiqueId).param.saveType)

            $("#cmx-j-1").attr('disabled', 'disabled');
            $("#cmx-j-2").attr('disabled', 'disabled');
            $("#cmx-j-3").attr('disabled', 'disabled');
            $("#cmx-j-4").attr('disabled', 'disabled');
            $("#cmx-j-7").attr('disabled', 'disabled');
            $("#cmx-j-8").attr('disabled', 'disabled');
            $("#cmx-j-9").attr('disabled', 'disabled');
            $("#cmx-j-10").attr('disabled', 'disabled');
            $("#cmx-j-11").attr('disabled', 'disabled');
            $("#cmx-j-12").attr('disabled', 'disabled');
            $("#cmx-j-13").attr('disabled', 'disabled');
            if (!IsEmpty(cmx.g.relicItem.get(antiqueId).relicId)) {
                //获取文物详情
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaMohRcrApply/getRelicdetail',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            // relicId:
                            relicId: cmx.g.relicItem.get(antiqueId).relicId //文物ID
                        }),
                        type: 'POST',
                        success: function (result) {
                            console.log(result);
                        }
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (prevModelData.state == '200') {
                            for (var n = 0; n < prevModelData.data[0].riskTypeList.length; n++) {
                                var html = [
                                    '<span class="disease-type label label-info" disease-type="' + prevModelData.data[0].riskTypeList[n].riskType + '">' + prevModelData.data[0].riskTypeList[n].riskType + '<i class = "icon wb-close" onclick="removeType(\'' + prevModelData.data[0].riskTypeList[n].riskType + '\')"></i></span>',
                                ].join('');
                                $("#selectType").append(html);
                            }
                            var picList = prevModelData.data[0].picList;
                            for (var k = 0; k < picList.length; k++) {
                                if (picList[k].picType == '47') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0017'
                                        }).start()
                                }
                                if (picList[k].picType == '48') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0018'
                                        }).start()
                                }
                                if (picList[k].picType == '49') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0019'
                                        }).start()
                                }
                                if (picList[k].picType == '50') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0020'
                                        }).start()
                                }
                                if (picList[k].picType == '51') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0021'
                                        }).start()
                                }
                            }
                        }
                    })
                    .start();
            }
        });
        $("#cmx-editrelicitem").modal('show');
        $("#cmx-editrelicitem-save").unbind('click');
        $("#cmx-editrelicitem-save").bind('click', function () {
            var temp_flag = checkFormLength('#cmx-form',true);
            if (!temp_flag) {
                return;
            }
            var riskType = [];
            $("#selectType span").each(function (index) {
                riskType.push({
                    riskType: $(this).text()
                })
            });
            var imageList = [];
            imageList.push({
                "picType": '47',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '47')[0].fileIndex
            });
            imageList.push({
                "picType": '48',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '48')[0].fileIndex
            });
            imageList.push({
                "picType": '49',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '49')[0].fileIndex
            });
            imageList.push({
                "picType": '50',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '50')[0].fileIndex
            });
            imageList.push({
                "picType": '51',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '51')[0].fileIndex
            });
            var relic_data = [{
                applyId: cmx.g.applyId,
                projectNum: _projectNum,
                relicName: $("#cmx-j-1").val(), //文物名称
                sumMark: $("#cmx-j-2").val(), //总登记号
                relicLevel: $("#cmx-j-4").val(),
                specificYear: $("#cmx-j-3").val(),
                relicSize: $("#cmx-j-7").val(),
                saveType: $("#cmx-j-13").val(),
                relicNum: $("#cmx-j-8").val(),
                relicClass: $("#cmx-j-9").val(),
                riskTypeList: riskType,
                picList: imageList
            }];
            //保存文物信息详情
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaMohRcrApply/saveprocessInstanceId8',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        // relicId:
                        mrrFormData: relic_data
                    }),
                    type: 'POST',
                    success: function (result) {
                        console.log(result);
                        if (result.state == 200) {
                            cmx.g.relicItem.get(antiqueId).relicId = result.data.relicId;
                            console.log(cmx.g.relicItem.get(antiqueId).relicId)
                            showAlert({
                                type: 'success',
                                content: '发送成功'
                            });
                            $("#cmx-editrelicitem").modal('hide');
                        }
                    }
                })
                .start();
        })
    });
}

//编辑传回来的文物详情
function editBackRelic(relicId) {
    //获取文物详情
    $("#cmx-editrelicitem-modal").load(get56015bEditRelicItemModal, function () {
        $("#cmx-editrelicitem").off('shown.bs.modal');
        $("#cmx-editrelicitem").on('shown.bs.modal', function () {
            $('#cmx-form-modal').html('');
            var relicdetail_data = {
                "url": get56015bEditRelicItemData,
                "element": "#cmx-form-modal"
            };
            baseInfo(relicdetail_data);
            $("#cmx-j-1").val(cmx.g.backRelicItem.get(relicId).param.relicName);
            $("#cmx-j-2").val(cmx.g.backRelicItem.get(relicId).param.sumMark);
            $("#cmx-j-3").val(cmx.g.backRelicItem.get(relicId).param.specificYear);
            $("#cmx-j-4").val(cmx.g.backRelicItem.get(relicId).param.relicLevel);
            $("#cmx-j-7").val(cmx.g.backRelicItem.get(relicId).param.relicSize);
            $("#cmx-j-8").val(cmx.g.backRelicItem.get(relicId).param.relicNum);
            $("#cmx-j-9").val(cmx.g.backRelicItem.get(relicId).param.relicClass);
            $("#cmx-j-10").val(cmx.g.backRelicItem.get(relicId).param.relicTexture);
            $("#cmx-j-11").val(cmx.g.backRelicItem.get(relicId).param.collectUnit); //
            $("#cmx-j-12").val(cmx.g.backRelicItem.get(relicId).param.collectTime);
            $("#cmx-j-13").val(cmx.g.backRelicItem.get(relicId).param.saveType)

            $("#cmx-j-1").attr('disabled', 'disabled');
            $("#cmx-j-2").attr('disabled', 'disabled');
            $("#cmx-j-3").attr('disabled', 'disabled');
            $("#cmx-j-4").attr('disabled', 'disabled');
            $("#cmx-j-7").attr('disabled', 'disabled');
            $("#cmx-j-8").attr('disabled', 'disabled');
            $("#cmx-j-9").attr('disabled', 'disabled');
            $("#cmx-j-10").attr('disabled', 'disabled');
            $("#cmx-j-11").attr('disabled', 'disabled');
            $("#cmx-j-12").attr('disabled', 'disabled');
            $("#cmx-j-13").attr('disabled', 'disabled');
            console.log(cmx.g.filelinkfileclass)
            if (!IsEmpty(cmx.g.backRelicItem.get(relicId).relicId)) {
                //获取文物详情
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaMohRcrApply/getRelicdetail',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            // relicId:
                            relicId: cmx.g.backRelicItem.get(relicId).relicId //文物ID
                        }),
                        type: 'POST',
                        success: function (result) {
                            console.log(result);
                        }
                    })
                    .turn(function (prevModelData, send, abort) {
                        console.log(prevModelData)
                        if (prevModelData.state == '200') {
                            var param_data = {};
                            param_data = {
                                "param": prevModelData.data[0],
                                "relicId": relicId
                            }
                            cmx.g.backRelicItem.put(relicId, param_data);
                            console.log(cmx.g.backRelicItem.values())
                            var picList = cmx.g.backRelicItem.get(relicId).param.picList;
                            for (var k = 0; k < picList.length; k++) {
                                if (picList[k].picType == '47') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0017'
                                        }).start()
                                }
                                if (picList[k].picType == '48') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0018'
                                        }).start()
                                }
                                if (picList[k].picType == '49') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0019'
                                        }).start()
                                }
                                if (picList[k].picType == '50') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0020'
                                        }).start()
                                }
                                if (picList[k].picType == '51') {
                                    new cmx.process()
                                        .turn('buildFileListByLocalData', {
                                            type: ['image'],
                                            data: [
                                                [picList[k]]
                                            ],
                                            selectFileClassId: 'J0021'
                                        }).start()
                                }
                            }
                            var html = '';
                            for (var n = 0; n < prevModelData.data[0].riskTypeList.length; n++) {
                                var html = [
                                    '<span class="disease-type label label-info" disease-type="' + prevModelData.data[0].riskTypeList[n].riskType + '">' + prevModelData.data[0].riskTypeList[n].riskType + '<i class = "icon wb-close" onclick="removeType(\'' + prevModelData.data[0].riskTypeList[n].riskType + '\')"></i></span>',
                                ].join('');
                                $("#selectType").append(html);
                            }
                        }
                    })
                    .start();
            }
        });
        $("#cmx-editrelicitem").modal('show');
        $("#cmx-editrelicitem-save").unbind('click');
        $("#cmx-editrelicitem-save").bind('click', function () {
            var temp_flag = checkFormLength('#cmx-form',true);
            if (!temp_flag) {
                return;
            }
            var riskType = [];
            $("#selectType span").each(function (index) {
                riskType.push({
                    riskType: $(this).text()
                })
            });
            console.log(cmx.g.backRelicItem.values())
            var imageList = [];
            console.log(imageList);
            console.log(cmx.g.filelinkfileclass)
            imageList.push({
                "picType": '47',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '47')[0].fileIndex
            });
            imageList.push({
                "picType": '48',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '48')[0].fileIndex
            });
            imageList.push({
                "picType": '49',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '49')[0].fileIndex
            });
            imageList.push({
                "picType": '50',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '50')[0].fileIndex
            });
            imageList.push({
                "picType": '51',
                "fileIndex": getSpecialFileListForSave(cmx.g.filelinkfileclass, '51')[0].fileIndex
            });
            console.log(getSpecialFileListForSave(cmx.g.filelinkfileclass, '47'))
            console.log(imageList)
            console.log(cmx.g.filelinkfileclass)
            var relic_data = [{
                applyId: cmx.g.applyId,
                projectNum: _projectNum,
                relicName: $("#cmx-j-1").val(), //文物名称
                sumMark: $("#cmx-j-2").val(), //总登记号
                relicLevel: $("#cmx-j-4").val(),
                specificYear: $("#cmx-j-3").val(),
                relicSize: $("#cmx-j-7").val(),
                saveType: $("#cmx-j-13").val(),
                relicNum: $("#cmx-j-8").val(),
                relicClass: $("#cmx-j-9").val(),
                riskTypeList: riskType,
                picList: imageList,
                relicId: relicId
            }];
            //保存文物信息详情
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaMohRcrApply/saveprocessInstanceId8',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        // relicId:
                        mrrFormData: relic_data
                    }),
                    type: 'POST',
                    success: function (result) {
                        console.log(result);
                        if (result.state == 200) {
                            cmx.g.backRelicItem.get(relicId).relicId = result.data.relicId;
                            console.log(cmx.g.backRelicItem.get(relicId).relicId)
                            showAlert({
                                type: 'success',
                                content: '发送成功'
                            });
                            $("#cmx-editrelicitem").modal('hide');
                        }
                    }
                })
                .start();
        })
    });
}
//获取文物序号
function showRelicId(riskType) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaMohRcrApply/getRelicNum',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                // relicId:
                riskType: riskType
            }),
            type: 'POST',
            success: function (result) {
                console.log(result);
                if (result.state == 200) {
                    var sumMarkList = [];
                    for (var i = 0; i < result.data.length; i++) {
                        sumMarkList.push(result.data[i].sumMark);
                    }
                    showAlert({
                        type: 'success',
                        content: sumMarkList
                    });
                }
            }
        })
        .start();
}