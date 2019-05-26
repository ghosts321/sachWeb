var get56015eProjectData = public_url + 'data/app/f-gover-approval/56015/56015-e.json';
var _projectNum = '56015_e';
var _projectType = '4';
$(document).ready(function() {
    $('#cmx-qingmaojun-back').on('click',function(){
        history.go(-1);
    });
    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    
    new cmx.process().
    turn('initFiles', {
        'P0099': '01',
        'P0017': '46'
    }).start();
    $("#cmx-extra").hide();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:get56015eProjectData
    });
    $('#cmx-i-951').val(getData('userName'));
    $('#cmx-i-97').val(getData('phoneNo'));

    $("#cmx-i-2").attr('readonly', 'readonly');
    $("#cmx-i-2").attr('disabled', 'disabled');
    $("#cmx-i-3").attr('readonly', 'readonly');
    $("#cmx-i-3").attr('disabled', 'disabled');
    $("#cmx-i-4").attr('readonly', 'readonly');
    $("#cmx-i-4").attr('disabled', 'disabled');
    $("#cmx-i-5").attr('readonly', 'readonly');
    $("#cmx-i-5").attr('disabled', 'disabled');
    $("#cmx-i-6").attr('readonly', 'readonly');
    $("#cmx-i-6").attr('disabled', 'disabled');
    $("#cmx-i-7").attr('readonly', 'readonly');
    $("#cmx-i-7").attr('disabled', 'disabled');
    $("#cmx-i-8").attr('readonly', 'readonly');
    $("#cmx-i-8").attr('disabled', 'disabled');
    $("#cmx-i-9").attr('readonly', 'readonly');
    $("#cmx-i-9").attr('disabled', 'disabled');
    $("#cmx-i-10").attr('readonly', 'readonly');
    $("#cmx-i-10").attr('disabled', 'disabled');
    $("#cmx-i-11").attr('readonly', 'readonly');
    $("#cmx-i-11").attr('disabled', 'disabled');
    $("#cmx-i-12").attr('readonly', 'readonly');
    $("#cmx-i-12").attr('disabled', 'disabled');
    $("#cmx-i-13").attr('readonly', 'readonly');
    $("#cmx-i-13").attr('disabled', 'disabled');
    $("#cmx-i-14").attr('readonly', 'readonly');
    $("#cmx-i-14").attr('disabled', 'disabled');
    $("#cmx-i-81").attr('readonly', 'readonly');
    $("#cmx-i-81").attr('disabled', 'disabled');
    $(".cmx-select-relic-btn").on("click", function() {
        // alert(111)
        new cmx.process()
            .turn('buildRelicInfoModal', {
                callback: function(param) {
                    console.log(param);
                    var data = param;
                    $("#cmx-i-2").val(data.antiqueName);
                    $("#cmx-i-3").val(data.relicCode);

                    $("#cmx-i-4 option[value='" + data.age + "']").attr("selected", true);
                    $("#cmx-i-5 option[value='" + data.relicLevel + "']").attr("selected", true);
                    $("#cmx-i-6 option[value='" + data.culturalClass + "']").attr("selected", true);
                    $("#cmx-i-7 option[value='" + data.relicQuality + "']").attr("selected", true);
                    $("#cmx-i-8").val(data.realSize);
                    $("#cmx-i-9").val(data.num);
                    $("#cmx-i-10").val(data.museumName);
                    $("#cmx-i-11").val(data.saveYear);
                    $("#cmx-i-12 option[value='" + data.relicOriginWay + "']").attr("selected", true);
                    $("#cmx-i-13 option[value='" + data.saveState + "']").attr("selected", true);
                    $("#cmx-i-14").val(data.intactDiscp);
                    $("#cmx-i-81 option[value='" + data.intactStatus + "']").attr("selected", true);
                }
            })
            .ccatch(function(msg) {})
            .cfinally(function() {}).start();
    });

    $("#cmx-button-save").on("click", function() {
        if (!IsEmpty($('#cmx-i-94-1').val())) {
            if ($('#cmx-i-94-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: "文件号前可填长度最大为20"
                });
                return;
            }
        }
        var fileNumBack = $('#cmx-form #cmx-i-94-3').val();
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
        // 基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        if (IsEmpty($('#cmx-i-2').val())) {
            showAlert({
                type: 'info',
                content: '名称不能为空'
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 30) {
            showAlert({
                type: "info",
                content: "名称可填最大长度为30"
            });
            return;
        }
        var formData = [{
            fileNumBack: $("#cmx-i-94-3").val(), //省文件号最后一个 类型：String  必有字段  备注：无
            fileNumFront: $("#cmx-i-94-1").val(), //省文件号第一个 类型：String  必有字段  备注：无
            fileNumMidd: $("#cmx-i-94-2").val(), //省文件号第二个 类型：String  必有字段  备注：无
            proFileTitle: $("#cmx-i-95").val(), //省文件标题 类型：String  必有字段  备注：无
            contactName: $("#cmx-i-96").val(), //联系人 类型：String  必有字段  备注：无
            contactTel: $("#cmx-i-97").val(), //联系电话类型：String  必有字段  备注：无
            apprUnitName: $("#cmx-i-951").val(),
            projectNum: _projectNum,
            projectType: _projectType,
            relicName: $('#cmx-i-2').val(), //名称
            sumMark: $('#cmx-i-3').val(), //总登记号
            specificYear: $('#cmx-i-4').val(), //具体年代
            relicLevel: $('#cmx-i-5').val(), //文物级别
            relicClass: $('#cmx-i-6').val(), //文物类别
            relicGrain: $('#cmx-i-7').val(), //质地
            relicSize: $('#cmx-i-8').val(), //尺寸
            relicNum: $('#cmx-i-9').val(), //数量
            collectUnit: $('#cmx-i-10').val(), //收藏单位
            collectTime: $('#cmx-i-11').val(), //收藏时间
            relicSource: $('#cmx-i-12').val(), //文物来源
            saveType: $('#cmx-i-13').val(), //保存状态
            fullState: $('#cmx-i-14').val(), //完残状况
            valueAssess: $('#cmx-i-15').val(), //价值评估
            necessity: $('#cmx-i-16').val(), //必要性说明
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType, //单位类别 类型：String  必有字段  备注：无
            applyId: cmx.g.applyId,
            files: getFileListForSave(cmx.g.filelinkfileclass),
            phoneNo: $("#cmx-i-98").val()
        }];
        console.log(formData);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohCopApplyE/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    // relicId:
                    mcaeFormData: formData
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
                    // console.log(result)
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

    $("#cmx-button-send").on("click", function() {
        if (!IsEmpty($('#cmx-i-94-1').val())) {
            if ($('#cmx-i-94-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: "文件号前可填长度最大为20"
                });
                return;
            }
        }
        var fileNumBack = $('#cmx-form #cmx-i-94-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: "文件号可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: "文件号可填长度最大为8"
                });
                return;
            }
        }
        // 基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        if (IsEmpty($('#cmx-i-2').val())) {
            showAlert({
                type: 'info',
                content: '名称不能为空'
            });
            return;
        }
        if ($("#cmx-i-9").val().length > 30) {
            showAlert({
                type: "info",
                content: "名称可填最大长度为30"
            });
            return;
        }
        var formData = [{
            fileNumBack: $("#cmx-i-94-3").val(), //省文件号最后一个 类型：String  必有字段  备注：无
            fileNumFront: $("#cmx-i-94-1").val(), //省文件号第一个 类型：String  必有字段  备注：无
            fileNumMidd: $("#cmx-i-94-2").val(), //省文件号第二个 类型：String  必有字段  备注：无
            proFileTitle: $("#cmx-i-95").val(), //省文件标题 类型：String  必有字段  备注：无
            contactName: $("#cmx-i-96").val(), //联系人 类型：String  必有字段  备注：无
            contactTel: $("#cmx-i-97").val(), //联系电话类型：String  必有字段  备注：无
            apprUnitName: $("#cmx-i-951").val(),
            projectNum: _projectNum,
            projectType: _projectType,
            relicName: $('#cmx-i-2').val(), //名称
            sumMark: $('#cmx-i-3').val(), //总登记号
            specificYear: $('#cmx-i-4').val(), //具体年代
            relicLevel: $('#cmx-i-5').val(), //文物级别
            relicClass: $('#cmx-i-6').val(), //文物类别
            relicGrain: $('#cmx-i-7').val(), //质地
            relicSize: $('#cmx-i-8').val(), //尺寸
            relicNum: $('#cmx-i-9').val(), //数量
            collectUnit: $('#cmx-i-10').val(), //收藏单位
            collectTime: $('#cmx-i-11').val(), //收藏时间
            relicSource: $('#cmx-i-12').val(), //文物来源
            saveType: $('#cmx-i-13').val(), //保存状态
            fullState: $('#cmx-i-14').val(), //完残状况
            valueAssess: $('#cmx-i-15').val(), //价值评估
            necessity: $('#cmx-i-16').val(), //必要性说明
            publishType: IsEmpty(cmx.g.danweipublishType) ? '9' : cmx.g.danweipublishType, //单位类别 类型：String  必有字段  备注：无
            applyId: cmx.g.applyId,
            files: getFileListForSave(cmx.g.filelinkfileclass),
            phoneNo: $("#cmx-i-98").val()
        }];
        console.log(formData);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohCopApplyE/sendEaMohCopApplyE',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    mcaeFormData: formData
                }),
                type: 'POST',
                success: function(result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        setTimeout(function() {
                            window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid="+GetUrlParamString('nowid');
                        }, 1000);
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
                url: api_ea + '/eaMohCopApplyE/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn('build56015eInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }
});

function showEdit() {
    $("#cmx-edit").show();
    $("#cmx-extra").hide();
}

function showExtra(num) {
    $("#cmx-edit").hide();
    $("#cmx-extra").show();
    for (var i = 1; i < 7; i++) {
        $("#cmx-extra-" + i).hide();
    }
    $("#cmx-extra-" + num).show();
}

function cmx_special_2(data) {
    var html = [
        '<div class="cmx-special-provincefile" style="width:70%;float:left;">',
        '<input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div style="width:30%;float:left;height:32px;"><button class="cmx-select-relic-btn btn btn-primary pull-right">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

cmx.route.model({
    index: 'build56015eInput',
    handle: function(parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            console.log(data);
            console.log(1111)
            $("#cmx-i-94-1").val(data.fileNumFront); //省文件号前 
            //省文件号第二个 
            // $("#cmx-i-94-2 option[value='" + data.fileNumMidd + "']").attr("selected", "selected");
            $("#cmx-i-94-2").val(data.fileNumMidd);
            $("#cmx-i-94-3").val(data.fileNumBack); //省文件后
            $("#cmx-i-95").val(data.proFileTitle); //省文件标题 
            $("#cmx-i-951").val(data.apprUnitName); //省文件标题 
            $("#cmx-i-96").val(data.contactName); //联系人 
            $("#cmx-i-97").val(data.contactTel); //联系电话
            $("#cmx-i-98").val(data.phoneNo); //；联系人手机号
            $('#cmx-i-2').val(data.relicName); //名称
            $('#cmx-i-3').val(data.sumMark); //总登记号

            $("#cmx-i-4 option[value='" + data.specificYear + "']").attr("selected", true);
            $("#cmx-i-5 option[value='" + data.relicLevel + "']").attr("selected", true);
            $("#cmx-i-6 option[value='" + data.relicClass + "']").attr("selected", true);
            $("#cmx-i-7 option[value='" + data.relicGrain + "']").attr("selected", true);

            $('#cmx-i-8').val(data.relicSize); //尺寸
            $('#cmx-i-9').val(data.relicNum); //数量
            $('#cmx-i-10').val(data.collectUnit); //收藏单位
            $('#cmx-i-11').val(data.collectTime); //收藏时间

            $("#cmx-i-12 option[value='" + data.relicSource + "']").attr("selected", true);
            $("#cmx-i-13 option[value='" + data.saveType + "']").attr("selected", true);

            $('#cmx-i-14').val(data.fullState); //完残状况
            $('#cmx-i-15').val(data.valueAssess); //价值评估
            $('#cmx-i-16').val(data.necessity); //必要性说明

            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
                // $('head').append('<style>.webuploader-container{display:none !important;} .remove-btn{display:none !important;}</style>');
            }
        }
        send.go();
    }
});

function cmx_special_year(data) {
    var html = [
        '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="Years" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}

function cmx_special_relicLevel(data) {
    var html = [
        '<div class="cmx-form-body" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="RelicLevel" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}

function cmx_special_culturalClass(data) {
    var html = [
        '<div class="cmx-form-body" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="CulturalClass" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}

function cmx_special_relicQuality(data) {
    var html = [
        '<div class="cmx-form-body" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="RelicQuality" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}

function cmx_special_relicOriginWay(data) {
    var html = [
        '<div class="cmx-form-body" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="RelicOriginWay" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}

function cmx_special_relicSaveState(data) {
    var html = [
        '<div class="cmx-form-body" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="RelicSaveState" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}

function cmx_special_Wancan(data) {
    var html = [
        '<div class="cmx-form-body" style="margin:0;padding:0" >',
        '<select class="form-control" data-dic="IntactStatus" id="' + data.columnindex + '" name="">',
        '</select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + '')
        }).cfinally(function() {}).start();
}