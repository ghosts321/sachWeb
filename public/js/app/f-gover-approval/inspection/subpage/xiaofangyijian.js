var getXiaofangyijianData = public_url + 'data/app/f-gover-approval/inspection/xiaofangyijian.json';

$(document).ready(function() {
    cmx.g.examId = GetUrlParamString('examId');
    $("#cmx-extra").hide();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:getXiaofangyijianData
    });

    $("#cmx-noNationProject-save").on("click", function() {
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',

            item1: $("#cmx-i-2").val(), //设计任务书
            item2: $("#cmx-i-3").val(), //勘察报告
            item3: $("#cmx-i-4").val(), //设计说明
            item4: $("#cmx-i-5").val(), //设计制图
            item5: $("#cmx-i-6").val(), //设备选型与配置
            item6: $("#cmx-i-7").val(), //项目预算
            item7: $("#cmx-i-8").val(), //工程验收细则
            expertOpinion: $("#cmx-i-11").val(), //意见
            expertResults: $('#cmx-i-12 input[type="radio"]:checked').val(), //评审结论
            remark: $("#cmx-i-13").val(), //备注
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
                        // console.log(cmx.g.applyId);
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

    $("#cmx-noNationProject-send").on("click", function() {
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //保存
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',

            item1: $("#cmx-i-2").val(), //设计任务书
            item2: $("#cmx-i-3").val(), //勘察报告
            item3: $("#cmx-i-4").val(), //设计说明
            item4: $("#cmx-i-5").val(), //设计制图
            item5: $("#cmx-i-6").val(), //设备选型与配置
            item6: $("#cmx-i-7").val(), //项目预算
            item7: $("#cmx-i-8").val(), //工程验收细则
            expertOpinion: $("#cmx-i-11").val(), //意见
            expertResults: $('#cmx-i-12 input[type="radio"]:checked').val(), //评审结论
            remark: $("#cmx-i-13").val(), //备注
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
            .turn('buildxiaofangyijianInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .start();
    }
});

cmx.route.model({
    index: 'buildxiaofangyijianInput',
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
                                formData: [{ examId: cmx.g.examId }],
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

            $("#cmx-i-2").val(data.item1); //设计任务书
            $("#cmx-i-3").val(data.item2); //勘察报告
            $("#cmx-i-4").val(data.item3); //设计说明
            $("#cmx-i-5").val(data.item4); //设计制图
            $("#cmx-i-6").val(data.item5); //设备选型与配置
            $("#cmx-i-7").val(data.item6); //项目预算
            $("#cmx-i-8").val(data.item7); //工程验收细则
            $("#cmx-i-11").val(data.expertOpinion); //意见
            $('#cmx-i-12 input[value="' + data.expertResults + '"').attr("checked", true);
            $("#cmx-i-13").val(data.remark); //备注

            var isEdit = parameter.isEdit;
            if (GetUrlParamString('isedit') !== '1')
                if (isEdit) {
                    $('select').attr("disabled", "false");
                    $('input').attr("disabled", "false");
                    $('textarea').attr("disabled", "false");
                    $('button').attr("disabled", "false");
                    $('head').append('<style>.webuploader-container{display:none !important;} .remove-btn{display:none !important;}</style>');
                    $("#cmx-handle-buttons").hide();
                }
        }
        send.go();
    }
});