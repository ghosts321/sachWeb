var getKaoGuDiSanFangData = public_url + 'data/app/f-gover-approval/inspection/kaogu-disanfang.json';
var _projectNum;
$(document).ready(function () {
    new cmx.process().
        turn('initFiles', {
            'P0004': '501',
        }).start();
    $("#cmx-extra").hide();
    $("#cmx-noNationProject-save").on("click", function () {
        //保存
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',
            apprItem: _projectNum,
            applyId: cmx.g.applyId,
            expertResults: $('#cmx-i-2 input[type="radio"]:checked').val(), //专家评审意见
            remark: $("#cmx-i-5").val(), //备注

        }];
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/saveInfoByExport',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    formData: ss,
                    files: getFileListForSave(cmx.g.filelinkfileclass)
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '保存成功'
                        });
                        cmx.g.examId = result.data.examId;
                        console.log(result);
                        //window.parent.jumpToNeedToDo();
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
            .start();
    });

    $("#cmx-noNationProject-send").on("click", function () {
        //发送
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',
            apprItem: _projectNum,
            applyId: cmx.g.applyId,
            expertResults: $('#cmx-i-2 input[type="radio"]:checked').val(), //专家评审意见
            remark: $("#cmx-i-5").val(), //备注

        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/submitInfoByExport',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    formData: ss,
                    files: getFileListForSave(cmx.g.filelinkfileclass)
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        cmx.g.examId = result.data.examId;
                        window.parent.jumpToHaveToDo();
                    } else if (result.msg.indexOf('不是有效的数据状态') >= 0) {
                        window.parent.jumpToHaveToDo();
                    }
                },

            })
            .start();
    });
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('examId'))) {
        cmx.g.examId = GetUrlParamString('examId'); //alert
        cmx.g.applyId = GetUrlParamString('applyId');
        _projectNum = GetUrlParamString('projectNum');
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/selectDomainByPK',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    examId: cmx.g.examId, //类型：String  必有字段  备注：申请ID
                }),
                type: 'POST'
            })
            .turn('buildkaogudisanfangInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildThirdPartyFileList', {
                projectNum: GetUrlParamString('projectNum'),
                examId: cmx.g.examId,
                exportId: getData('instId')
            })
            .start();
    }
});

cmx.route.model({
    index: 'buildkaogudisanfangInput',
    handle: function (parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            cmx.g.examId = data.examId;
            if (data.dealFlag == 3 || data.dealFlag == 4) {
                $("#cmx-form").show();
                $("#cmx-handle-buttons").show();
                $("#cmx-flag2").hide();
                $(".cmx-before-work").hide();
                //构建表单
                CreateApplicationForm({
                    element: '#cmx-form',
                    url: getKaoGuDiSanFangData
                });
            }
            if (data.dealFlag == 2) {
                $("#cmx-flag2").show();
                $(".cmx-before-work").show();
                $("#cmx-accept-button").on("click", function () {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaPubExamopinion/saveInfoByExport',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                formData: [{
                                    examId: cmx.g.examId,
                                    applyId: cmx.g.applyId,
                                }],
                                files: getFileListForSave(cmx.g.filelinkfileclass)
                            }),
                            type: 'POST',
                            success: function (result) {
                                if (result.state == 200) {
                                    $("#cmx-form").show();
                                    $("#cmx-handle-buttons").show();
                                    $("#cmx-flag2").hide();
                                    $(".cmx-before-work").hide();
                                    //构建表单
                                    CreateApplicationForm({
                                        element: '#cmx-form',
                                        url: getKaoGuDiSanFangData
                                    });
                                }
                            },
                        })
                        .start();
                });
                $("#cmx-refuse-button").on("click", function () {
                    $("#cmx-refuse-div").show();
                    $("#cmx-refuse-confirm").on("click", function () {
                        if (IsEmpty($('#cmx-refuse-textarea').val())) {
                            showAlert({
                                type: 'info',
                                content: '请填写退回理由'
                            });
                            return;
                        }
                        if ($('#cmx-refuse-textarea').val().length > 200) {
                            showAlert({
                                type: 'info',
                                content: '理由请少于200字'
                            });
                            return;
                        }
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaPubExamopinion/refuseInfoByExport',
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    examId: cmx.g.examId,
                                    formData: {
                                        backReason: $("#cmx-refuse-textarea").val()
                                    }
                                }),
                                type: 'POST',
                                success: function (result) {
                                    if (result.state == 200) {
                                        showAlert({
                                            type: 'success',
                                            content: '发送成功'
                                        });
                                        window.parent.jumpToNeedToDo();
                                    }
                                },
                            })
                            .start();
                    });
                });
            }
            // registerNum: data.registerNum;
            // serialNum: data.serialNum;

            $('#cmx-i-2 input[value="' + data.expertResults + '"').attr("checked", true);
            $("#cmx-i-5").val(data.remark); //备注

            var isEdit = parameter.isEdit;
            if (GetUrlParamString('isedit') !== '1') {
                if (isEdit) {
                    $('select').attr("disabled", "false");
                    $('input').attr("disabled", "false");
                    $('textarea').attr("disabled", "false");
                    $('button').attr("disabled", "false");
                    $('head').append('<style>.webuploader-container{display:none !important;} .remove-btn{display:none !important;}</style>');
                    $("#cmx-handle-buttons").hide();
                }
            }

        }
        send.go();
    }
});