var get56004ProjectData = public_url + 'data/app/f-gover-approval/56010/56010-apply.json';
var _projectType = '2';
var _projectNum = '56010';
$(document).ready(function() {
    $('#cmx-qingmaojun-back').on('click',function(){
        history.go(-1);
    });
    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    new cmx.process().
    turn('initFiles', {
        'P0013': '01',
        'P0014': '04',
        'P0015': '02',
        'P0016': '05',
        'P0017': '03',
        'P0018': '99'
    }).start();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:get56004ProjectData
    });
    $(".cmx-textarea").hide();
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "基本情况",
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
                            "text": "工程概况"
                        },
                        {
                            "id": 3,
                            "text": "建设的必要性概况"
                        },
                        {
                            "id": 4,
                            "text": "编制依据概况",
                        },
                        {
                            "id": 5,
                            "text": "线路选择概况"
                        },
                        {
                            "id": 6,
                            "text": "文物保护技术措施概况"
                        },
                        {
                            "id": 7,
                            "text": "文物保护应急措施概况"
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
                    $(".cmx-textarea").show();
                } else if (treeId == 1) {
                    showEdit();
                } else {
                    showExtra(treeId - 1);
                }
            }
        });
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    if (!IsEmpty(cmx.g.danweimingcheng)) {
        $("#cmx-i-7").val(cmx.g.danweimingcheng);
        $("#cmx-i-7").attr('readonly', 'readonly');
        $("#cmx-i-7").attr('disabled', 'disabled');
    }
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
                        $("#cmx-i-7").attr('readonly', 'readonly');
                        $("#cmx-i-7").attr('disabled', 'disabled');
                    } else {
                        $("#cmx-i-7").val('');
                        $("#cmx-i-7").removeAttr('readonly');
                        $("#cmx-i-7").removeAttr('disabled');
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
                busiType: 'CRP',
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
    $("#cmx-noNationProject-save").on("click", function() {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
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
                content: "文物保护单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-7").val().length > 200) {
            showAlert({
                type: "info",
                content: "国保单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-9").val())) {
            if ($("#cmx-i-9").val().length > 200) {
                showAlert({
                    type: "info",
                    content: "设计人(单位)可填最大长度为200"
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
                content: "省文件标题内容必须包含文物保护单位名称"
            });
            return;
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含文物保护单位名称"
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
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            fileNumBack: $("#cmx-i-2-3").val(), //省文件号最后一个 类型：String  必有字段  备注：无
            fileNumFront: $("#cmx-i-2-1").val(), //省文件号第一个 类型：String  必有字段  备注：无
            fileNumMidd: $("#cmx-i-2-2").val(), //省文件号第二个 类型：String  必有字段  备注：无
            proFileTitle: $("#cmx-i-3").val(), //省文件标题 类型：String  必有字段  备注：无
            contactName: $("#cmx-i-4").val(), //联系人 类型：String  必有字段  备注：无
            contactTel: $("#cmx-i-5").val(), //联系电话类型：String  必有字段  备注：无
            protectUnitName: $("#cmx-i-7").val(), //文物保护单位 类型：String  必有字段  备注：无
            projectName: $("#cmx-i-8").val(), //项目名称 类型：String  必有字段  备注：无
            designUnitsName: $("#cmx-i-9").val(), //设计单位 类型：String  必有字段  备注：无
            reportUnitsName: $("#cmx-i-10").val(), //报送单位 类型：String  必有字段  备注：无
            otherExplain: $("#cmx-i-11").val(), //其他说明事项 类型：String  必有字段  备注：无
            projectProfile: $("#cmx-i-19").val(), //工程概况 类型：String  必有字段  备注：无
            buildProfile: $("#cmx-i-20").val(), //建设的必要性概况 类型：String  必有字段  备注：无
            comGistPro: $("#cmx-i-21").val(), //编制依据概况 类型：String  必有字段  备注：无
            lineChooPro: $("#cmx-i-22").val(), //线路选择概况 类型：String  必有字段  备注：无
            technoMeaPro: $("#cmx-i-23").val(), //文物保护技术措施概况 类型：String  必有字段  备注：无
            emerMeaPro: $("#cmx-i-24").val(), //文物保护应急措施概况 类型：String  必有字段  备注：无
            files: getFileListForSave(cmx.g.filelinkfileclass),
            applyId: cmx.g.applyId,
            designUnits: cmx.g.unitId,
            protectUnit: cmx.g.danweiinstId,
            //networkNum: "网审号", //网审号 类型：String  必有字段  备注：无
            projectType: _projectType, //项目类型 类型：String  必有字段  备注：无
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType //单位类别 类型：String  必有字段  备注：无
        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchPucApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: ss
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
    $("#cmx-noNationProject-send").on("click", function() {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
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
                content: "文物保护单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-7").val().length > 200) {
            showAlert({
                type: "info",
                content: "国保单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-9").val())) {
            if ($("#cmx-i-9").val().length > 200) {
                showAlert({
                    type: "info",
                    content: "设计人(单位)可填最大长度为200"
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
                content: "省文件标题内容必须包含文物保护单位名称"
            });
            return;
        }
        if (pro_title.indexOf(test_title) < 0) {
            showAlert({
                type: "info",
                content: "项目名称内容必须包含文物保护单位名称"
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
        //发送
        var ss = [{ //类型：Object  必有字段  备注：无
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            fileNumBack: $("#cmx-i-2-3").val(), //省文件号最后一个 类型：String  必有字段  备注：无
            fileNumFront: $("#cmx-i-2-1").val(), //省文件号第一个 类型：String  必有字段  备注：无
            fileNumMidd: $("#cmx-i-2-2").val(), //省文件号第二个 类型：String  必有字段  备注：无
            proFileTitle: $("#cmx-i-3").val(), //省文件标题 类型：String  必有字段  备注：无
            contactName: $("#cmx-i-4").val(), //联系人 类型：String  必有字段  备注：无
            contactTel: $("#cmx-i-5").val(), //联系电话类型：String  必有字段  备注：无
            protectUnitName: $("#cmx-i-7").val(), //文物保护单位 类型：String  必有字段  备注：无
            projectName: $("#cmx-i-8").val(), //项目名称 类型：String  必有字段  备注：无
            designUnitsName: $("#cmx-i-9").val(), //设计单位 类型：String  必有字段  备注：无
            reportUnitsName: $("#cmx-i-10").val(), //报送单位 类型：String  必有字段  备注：无
            otherExplain: $("#cmx-i-11").val(), //其他说明事项 类型：String  必有字段  备注：无
            projectProfile: $("#cmx-i-19").val(), //工程概况 类型：String  必有字段  备注：无
            buildProfile: $("#cmx-i-20").val(), //建设的必要性概况 类型：String  必有字段  备注：无
            comGistPro: $("#cmx-i-21").val(), //编制依据概况 类型：String  必有字段  备注：无
            lineChooPro: $("#cmx-i-22").val(), //线路选择概况 类型：String  必有字段  备注：无
            technoMeaPro: $("#cmx-i-23").val(), //文物保护技术措施概况 类型：String  必有字段  备注：无
            emerMeaPro: $("#cmx-i-24").val(), //文物保护应急措施概况 类型：String  必有字段  备注：无
            files: getFileListForSave(cmx.g.filelinkfileclass),
            applyId: cmx.g.applyId,
            designUnits: cmx.g.unitId,
            protectUnit: cmx.g.danweiinstId,
            //networkNum: "网审号", //网审号 类型：String  必有字段  备注：无
            projectType: _projectType, //项目类型 类型：String  必有字段  备注：无
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType //单位类别 类型：String  必有字段  备注：无
        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchPucApply/sendEaIchPucApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    // relicId:
                    ipaFormData: ss
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
                        projectNum: "56010",
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
                url: api_ea + '/eaIchPucApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST',
            })
            .turn('build56010Input', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }
});
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
    index: 'build56010Input',
    handle: function(parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            $("#cmx-i-2-3").val(data.fileNumBack);
            $("#cmx-i-2-1").val(data.fileNumFront); //省文件号第一个 
            //省文件号第二个 
            // $("#cmx-i-2-2 option[value='" + data.fileNumMidd + "']").attr("selected", "selected");
            $("#cmx-i-2-2").val(data.fileNumMidd);
            $("#cmx-i-3").val(data.proFileTitle); //省文件标题 
            $("#cmx-i-4").val(data.contactName); //联系人 
            $("#cmx-i-5").val(data.contactTel); //联系电话
            $("#cmx-i-7").val(data.protectUnitName); //文物保护单位
            $("#cmx-i-8").val(data.projectName); //项目名称 
            $("#cmx-i-9").val(data.designUnitsName); //设计单位 
            $("#cmx-i-10").val(data.reportUnitsName); //报送单位 
            $("#cmx-i-11").val(data.otherExplain); //其他说明事项 
            $("#cmx-i-19").val(data.projectProfile); //工程概况 
            $("#cmx-i-20").val(data.buildProfile); //建设的必要性概况 
            $("#cmx-i-21").val(data.comGistPro); //编制依据概况 
            $("#cmx-i-22").val(data.lineChooPro); //线路选择概况 
            $("#cmx-i-23").val(data.technoMeaPro); //文物保护技术措施概况 
            $("#cmx-i-24").val(data.emerMeaPro); //文物保护应急措施概况 
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