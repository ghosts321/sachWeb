var getXiufufanganData = public_url + 'data/app/f-gover-approval/inspection/xiufufangan.json';

$(document).ready(function() {
    $("#cmx-extra").hide();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:getXiufufanganData
    });

    $('.cmx-disease input[type=radio][name=binghaitu]').change(function() {
        if (this.value == '1') {
            $(".cmx-have-disease").show();
            $(".cmx-no-disease").hide();
        } else {
            $(".cmx-have-disease").hide();
            $(".cmx-no-disease").show();
        }
    });
    $('.cmx-measure input[type=radio][name=measure]').change(function() {
        if (this.value == '1') {
            $(".cmx-have-measure").show();
            $(".cmx-no-measure").hide();
        } else {
            $(".cmx-have-measure").hide();
            $(".cmx-no-measure").show();
        }
    });
    $("#cmx-noNationProject-save").on("click", function() {
        //保存

        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',
            item1: $('#cmx-i-2 input[type="radio"]:checked').val(), //价值评估
            item2: $("#cmx-i-3").val(), //价值评估
            item3: $('#cmx-i-4 input[type="radio"]:checked').val(), //现状调查
            item4: $("#cmx-i-5").val(), //现状调查
            item5: $('#cmx-i-6 input[type="radio"]:checked').val(), //病害评估
            item6: $("#cmx-i-7").val(), //病害评估
            item7: $('#cmx-i-8 input[type="radio"]:checked').val(), //检测分析
            item8: $("#cmx-i-9").val(), //检测分析
            item9: $('#cmx-i-10 input[type="radio"]:checked').val(), //病害图
            item10: $("#cmx-i-101").val(), //病害图
            item11: $('#cmx-i-12 input[type="radio"]:checked').val(), //技术指标
            item12: $("#cmx-i-13").val(), //技术指标
            item13: $('#cmx-i-14 input[type="radio"]:checked').val(), //预期效果
            item14: $("#cmx-i-15").val(), //预期效果
            item15: $('#cmx-i-16 input[type="radio"]:checked').val(), //技术路线
            item16: $("#cmx-i-17").val(), //技术路线
            item17: $('#cmx-i-18 input[type="radio"]:checked').val(), //修复方案、步骤
            item18: $("#cmx-i-19").val(), //修复方案、步骤
            item19: $('#cmx-i-20 input[type="radio"]:checked').val(), //保护材料
            item20: $("#cmx-i-21").val(), //保护材料
            item21: $('#cmx-i-23 input[type="radio"]:checked').val(), //进度安排
            item22: $("#cmx-i-24").val(), //进度安排
            item23: $('#cmx-i-25 input[type="radio"]:checked').val(), //修复人员
            item24: $("#cmx-i-26").val(), //修复人员
            item25: $('#cmx-i-27 input[type="radio"]:checked').val(), //预防性措施
            item26: $("#cmx-i-271").val(), //预防性措施
            expertOpinion: $("#cmx-i-29").val(), //评审意见
            expertResults: $('#cmx-i-28 input[type="radio"]:checked').val(), //评审结论
            remark: $("#cmx-i-30").val(), //备注
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
        //保存

        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',
            item1: $('#cmx-i-2 input[type="radio"]:checked').val(), //价值评估
            item2: $("#cmx-i-3").val(), //价值评估
            item3: $('#cmx-i-4 input[type="radio"]:checked').val(), //现状调查
            item4: $("#cmx-i-5").val(), //现状调查
            item5: $('#cmx-i-6 input[type="radio"]:checked').val(), //病害评估
            item6: $("#cmx-i-7").val(), //病害评估
            item7: $('#cmx-i-8 input[type="radio"]:checked').val(), //检测分析
            item8: $("#cmx-i-9").val(), //检测分析
            item9: $('#cmx-i-10 input[type="radio"]:checked').val(), //病害图
            item10: $("#cmx-i-101").val(), //病害图
            item11: $('#cmx-i-12 input[type="radio"]:checked').val(), //技术指标
            item12: $("#cmx-i-13").val(), //技术指标
            item13: $('#cmx-i-14 input[type="radio"]:checked').val(), //预期效果
            item14: $("#cmx-i-15").val(), //预期效果
            item15: $('#cmx-i-16 input[type="radio"]:checked').val(), //技术路线
            item16: $("#cmx-i-17").val(), //技术路线
            item17: $('#cmx-i-18 input[type="radio"]:checked').val(), //修复方案、步骤
            item18: $("#cmx-i-19").val(), //修复方案、步骤
            item19: $('#cmx-i-20 input[type="radio"]:checked').val(), //保护材料
            item20: $("#cmx-i-21").val(), //保护材料
            item21: $('#cmx-i-23 input[type="radio"]:checked').val(), //进度安排
            item22: $("#cmx-i-24").val(), //进度安排
            item23: $('#cmx-i-25 input[type="radio"]:checked').val(), //修复人员
            item24: $("#cmx-i-26").val(), //修复人员
            item25: $('#cmx-i-27 input[type="radio"]:checked').val(), //预防性措施
            item26: $("#cmx-i-271").val(), //预防性措施
            expertOpinion: $("#cmx-i-29").val(), //评审意见
            expertResults: $('#cmx-i-28 input[type="radio"]:checked').val(), //评审结论
            remark: $("#cmx-i-30").val(), //备注
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
            .turn('buildxiufufanganInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .start();
    }
});
cmx.route.model({
    index: 'buildxiufufanganInput',
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
                                window.parent.jumpToNeedToDo();
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

            $('#cmx-i-2 input[value="' + data.item1 + '"').attr("checked", true); //价值评估
            $("#cmx-i-3").val(data.item2); //价值评估
            $('#cmx-i-4 input[value="' + data.item3 + '"').attr("checked", true); //现状调查
            $("#cmx-i-5").val(data.item4); //现状调查
            $('#cmx-i-6 input[value="' + data.item5 + '"').attr("checked", true); //病害评估
            $("#cmx-i-7").val(data.item6); //病害评估
            $('#cmx-i-8 input[value="' + data.item7 + '"').attr("checked", true); //检测分析
            $("#cmx-i-9").val(data.item8); //检测分析
            $('#cmx-i-10 input[value="' + data.item9 + '"').attr("checked", true); //病害图
            $("#cmx-i-101").val(data.item10); //病害图
            $('#cmx-i-12 input[value="' + data.item11 + '"').attr("checked", true); //技术指标
            $("#cmx-i-13").val(data.item12); //技术指标
            $('#cmx-i-14 input[value="' + data.item13 + '"').attr("checked", true); //预期效果
            $("#cmx-i-15").val(data.item14); //预期效果
            $('#cmx-i-16 input[value="' + data.item15 + '"').attr("checked", true); //技术路线
            $("#cmx-i-17").val(data.item16); //技术路线
            $('#cmx-i-18 input[value="' + data.item17 + '"').attr("checked", true); //修复方案、步骤
            $("#cmx-i-19").val(data.item18); //修复方案、步骤
            $('#cmx-i-20 input[value="' + data.item19 + '"').attr("checked", true); //保护材料
            $("#cmx-i-21").val(data.item20); //保护材料
            $('#cmx-i-23 input[value="' + data.item21 + '"').attr("checked", true); //进度安排
            $("#cmx-i-24").val(data.item22); //进度安排
            $('#cmx-i-25 input[value="' + data.item23 + '"').attr("checked", true); //修复人员
            $("#cmx-i-26").val(data.item24); //修复人员
            $('#cmx-i-27 input[value="' + data.item25 + '"').attr("checked", true); //预防性措施
            $("#cmx-i-271").val(data.item26); //预防性措施

            $("#cmx-i-29").val(data.expertOpinion); //意见
            $('#cmx-i-28 input[value="' + data.expertResults + '"').attr("checked", true);
            $("#cmx-i-30").val(data.remark); //备注

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