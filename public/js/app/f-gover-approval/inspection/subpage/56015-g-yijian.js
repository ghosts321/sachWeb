var get56015gyijianData = public_url + 'data/app/f-gover-approval/inspection/56015-g-yijian.json';
cmx.g.regist('examId', '');
$(document).ready(function() {
    cmx.g.examId = GetUrlParamString('examId');
    $("#cmx-extra").hide();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:get56015gyijianData
    });

    $("#cmx-button-save").on("click", function() {
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            item1: $("#cmx-i-2").val(),
            item2: $("#cmx-i-3").val(),
            expertResults: $('#cmx-i-4 input[type="radio"]:checked').val(), //专家评审意见
            expertOpinion: $("#cmx-i-5").val()
        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/saveInfoByExport',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    formData: ss,
                    files: [],
                }),
                type: 'POST',
                success: function(result) {
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
                error: function() {
                    showAlert({
                        type: 'error',
                        content: '保存失败'
                    });
                },
                complete: function() {}
            })
            .start();
    });

    $("#cmx-button-send").on("click", function() {
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            item1: $("#cmx-i-2").val(),
            item2: $("#cmx-i-3").val(),
            expertResults: $('#cmx-i-4 input[type="radio"]:checked').val(), //专家评审意见
            expertOpinion: $("#cmx-i-5").val()
        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/submitInfoByExport',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    formData: ss,
                    files: []
                }),
                type: 'POST',
                success: function(result) {
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
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/selectDomainByPK',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    examId: cmx.g.examId, //类型：String  必有字段  备注：申请ID
                }),
                type: 'POST'
            })
            .turn('build56015gInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .start();
    }
});

cmx.route.model({
    index: 'build56015gInput',
    handle: function(parameter, prevModelData, send, abort) {
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
            }
            if (data.dealFlag == 2) {
                $("#cmx-flag2").show();
                $(".cmx-before-work").show();
                $("#cmx-accept-button").on("click", function() {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaPubExamopinion/saveInfoByExport',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                formData: [{
                                    examId: cmx.g.examId
                                }],
                                files: [],
                            }),
                            type: 'POST',
                            success: function(result) {
                                if (result.state == 200) {
                                    $("#cmx-form").show();
                                    $("#cmx-handle-buttons").show();
                                    $("#cmx-flag2").hide();
                                    $(".cmx-before-work").hide();
                                }
                            },
                        })
                        .start();
                });
                $("#cmx-refuse-button").on("click", function() {
                    $("#cmx-refuse-div").show();
                    $("#cmx-refuse-confirm").on("click", function() {
                        if(IsEmpty($('#cmx-refuse-textarea').val())){
                            showAlert({
                                type: 'info',
                                content: '请填写退回理由'
                            });
                            return;
                        }
                        if($('#cmx-refuse-textarea').val().length>200){
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
                                    formData:{
                                        backReason: $("#cmx-refuse-textarea").val()
                                    }
                                }),
                                type: 'POST',
                                success: function(result) {
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
            registerNum: data.registerNum;
            serialNum: data.serialNum;
            $("#cmx-i-2").val(data.item1); //意见
            $("#cmx-i-3").val(data.item2);
            if (!IsEmpty(data.expertResults))
                $('#cmx-i-4 input[value="' + data.expertResults + '"]').attr("checked", true);
            $("#cmx-i-5").val(data.expertOpinion);
            var isEdit = parameter.isEdit;
            if (GetUrlParamString('isedit') !== '1')
                if (isEdit) {
                    hideElement();
                    // $('head').append('<style>.webuploader-container{display:none !important;} .remove-btn{display:none !important;}</style>');
                    $("#cmx-handle-buttons").hide();
                }
        }
        send.go();
    }
});