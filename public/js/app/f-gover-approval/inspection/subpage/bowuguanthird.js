var getBowuguanData = public_url + 'data/app/f-gover-approval/inspection/bowuguanthird.json';
cmx.g.regist('examId', '');
cmx.g.regist('detailMap', new HashMap());

$(document).ready(function () {
    cmx.g.examId = GetUrlParamString('examId');
    var _applyId = GetUrlParamString('applyId');
    var _projectNum = GetUrlParamString('projectNum');
    $("#cmx-extra").hide();
    //构建表单
    CreateApplicationForm({
        element: '#cmx-form',
        url:getBowuguanData
    });

    //保存
    $("#cmx-noNationProject-save").on("click", function () {
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        if ($("#cmx-i-12").val() < $("#cmx-i-13").val()) {
            showAlert({
                type: 'error',
                content: '一级品件数大于展品件数'
            });
            return;
        }
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',
            item1: $("#cmx-i-2").val(), //展览与展品信息是否表达完善与准确    
            item2: $("#cmx-i-3").val(), //展品是否支持展览主题      
            item3: $("#cmx-i-4").val(), //文物保存状况是否适宜移动   
            item4: $("#cmx-i-5").val(), //本次出展文物的一般要求
            item5: $("#cmx-i-6").val(), //拟展场地是否已达到上述要求
            item6: $("#cmx-i-7").val(), //本次出展文物的特殊要求
            item7: $("#cmx-i-8").val(), //拟展场地是否能满足上述要求
            item8: $("#cmx-i-9").val(), //展品保险估价是否合理
            item9: $("#cmx-i-10").val(), //展览费用是否合理
            item10: $("#cmx-i-11").val(), //展览协议的审核与评估
            item11: $("#cmx-i-12").val(), //展览与展品信息是否表达完善与准确    
            item12: $("#cmx-i-13").val(), //展品是否支持展览主题      
            item13: $("#cmx-i-14").val(), //文物保存状况是否适宜移动   
            item14: $("#cmx-i-16").val(), //本次出展文物的一般要求
            item15: $("#cmx-i-17").val(), //拟展场地是否已达到上述要求
            item16: $("#cmx-i-18").val(), //本次出展文物的特殊要求
            item17: $("#cmx-i-19").val(), //拟展场地是否能满足上述要求
            item18: $("#cmx-i-20").val(), //展品保险估价是否合理
            item19: $("#cmx-i-21").val(), //展览费用是否合理
            item20: $("#cmx-i-22").val(), //展览协议的审核与评估
            item21: $("#cmx-i-23").val(), //展览协议的审核与评估
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
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '保存成功'
                        });
                        cmx.g.examId = result.data.examId;
                        console.log(result);
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

    //发送
    $("#cmx-noNationProject-send").on("click", function () {
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        if ($("#cmx-i-12").val() < $("#cmx-i-13").val()) {
            showAlert({
                type: 'error',
                content: '一级品件数大于展品件数'
            });
            return;
        }
        var ss = [{ //类型：Object  必有字段  备注：无
            examId: cmx.g.examId,
            registerNum: '',
            serialNum: '',
            item1: $("#cmx-i-2").val(), //展览与展品信息是否表达完善与准确    
            item2: $("#cmx-i-3").val(), //展品是否支持展览主题      
            item3: $("#cmx-i-4").val(), //文物保存状况是否适宜移动   
            item4: $("#cmx-i-5").val(), //本次出展文物的一般要求
            item5: $("#cmx-i-6").val(), //拟展场地是否已达到上述要求
            item6: $("#cmx-i-7").val(), //本次出展文物的特殊要求
            item7: $("#cmx-i-8").val(), //拟展场地是否能满足上述要求
            item8: $("#cmx-i-9").val(), //展品保险估价是否合理
            item9: $("#cmx-i-10").val(), //展览费用是否合理
            item10: $("#cmx-i-11").val(), //展览协议的审核与评估
            item11: $("#cmx-i-12").val(), //展览与展品信息是否表达完善与准确    
            item12: $("#cmx-i-13").val(), //展品是否支持展览主题      
            item13: $("#cmx-i-14").val(), //文物保存状况是否适宜移动   
            item14: $("#cmx-i-16").val(), //本次出展文物的一般要求
            item15: $("#cmx-i-17").val(), //拟展场地是否已达到上述要求
            item16: $("#cmx-i-18").val(), //本次出展文物的特殊要求
            item17: $("#cmx-i-19").val(), //拟展场地是否能满足上述要求
            item18: $("#cmx-i-20").val(), //展品保险估价是否合理
            item19: $("#cmx-i-21").val(), //展览费用是否合理
            item20: $("#cmx-i-22").val(), //展览协议的审核与评估
            item21: $("#cmx-i-23").val(), //展览协议的审核与评估
        }];
        console.log(ss);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/submitInfoByExport',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    formData: ss,
                    files: [],
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
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohPecExamopinion/selectDomainByPK',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    examId: cmx.g.examId, //类型：String  必有字段  备注：申请ID
                }),
                type: 'POST'
            })
            .turn('buildbowuguanInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .start();
    }
});
cmx.route.model({
    index: 'buildbowuguanInput',
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
                                    examId: cmx.g.examId
                                }],
                                files: [],
                            }),
                            type: 'POST',
                            success: function (result) {
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
            var trList = data.eaMohPecExamList;
            console.log(trList);

            $("#cmx-expert-relic-tbody").html('');
            for (var i = 0; i < trList.length; i++) {
                console.log(trList[i].exhibitType)
                cmx.g.detailMap.put(trList[i].detailId, trList[i]);
                var tr_html = '';
                tr_html = [
                    '<tr data-detailid="' + trList[i].detailId + '">',
                    '<td>',
                    '<input type="checkbox" name="cmx-exhibition">',
                    '</td>',
                    '<td>',
                    '<div>',
                    '<div class="radio-custom radio-default radio-inline">',
                    '<input type="radio" id="jinzhi-' + trList[i].detailId + '" name="jinzhi-' + trList[i].detailId + '" ' + ((trList[i].exhibitType == 1) ? "checked" : "") + ' value="1">',
                    '<label for="jinzhi-' + trList[i].detailId + '">禁止出境</label>',
                    '</div>',
                    '<div class="radio-custom radio-default radio-inline">',
                    '<input type="radio" id="xianzhi-' + trList[i].detailId + '" name="jinzhi-' + trList[i].detailId + '" ' + ((trList[i].exhibitType == 2) ? "checked" : "") + ' value="2">',
                    '<label for="xianzhi-' + trList[i].detailId + '">限制出境</label>',
                    '</div>',
                    '</div>',
                    '</td>',
                    '<td>' + trList[i].relicNum + '</td>',
                    '<td>',
                    '<textarea style="min-height:100px;min-width:100px;" class="form-control reason" id="reason-"' + trList[i].detailId + ' name="" placeholder="" value="">' + trList[i].reason + '</textarea>',
                    '</td>',
                    '<td>',
                    '<textarea style="min-height:100px;min-width:100px;"  class="form-control opinions" id="yijian-' + trList[i].detailId + '" name="" placeholder="" value="">' + trList[i].opinions + '</textarea>',
                    '</td>',
                    '</tr>',
                ].join('');
                $("#cmx-expert-relic-tbody").append(tr_html);
            }
            $("#cmx-i-2").val(data.item1); //展览与展品信息是否表达完善与准确    
            $("#cmx-i-3").val(data.item2); //展品是否支持展览主题      
            $("#cmx-i-4").val(data.item3); //文物保存状况是否适宜移动   
            $("#cmx-i-5").val(data.item4); //本次出展文物的一般要求
            $("#cmx-i-6").val(data.item5); //拟展场地是否已达到上述要求
            $("#cmx-i-7").val(data.item6); //本次出展文物的特殊要求
            $("#cmx-i-8").val(data.item7); //拟展场地是否能满足上述要求
            $("#cmx-i-9").val(data.item8); //展品保险估价是否合理
            $("#cmx-i-10").val(data.item9); //展览费用是否合理
            $("#cmx-i-11").val(data.item10); //展览协议的审核与评估
            $("#cmx-i-12").val(data.item11); //展览与展品信息是否表达完善与准确    
            $("#cmx-i-13").val(data.item12); //展品是否支持展览主题      
            $("#cmx-i-14").val(data.item13); //文物保存状况是否适宜移动   
            $("#cmx-i-16").val(data.item14); //本次出展文物的一般要求
            $("#cmx-i-17").val(data.item15); //拟展场地是否已达到上述要求
            $("#cmx-i-18").val(data.item16); //本次出展文物的特殊要求
            $("#cmx-i-19").val(data.item17); //拟展场地是否能满足上述要求
            $("#cmx-i-20").val(data.item18); //展品保险估价是否合理
            $("#cmx-i-21").val(data.item19); //展览费用是否合理
            $("#cmx-i-22").val(data.item20); //展览协议的审核与评估
            $("#cmx-i-23").val(data.item21); //展览协议的审核与评估

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

function func_special_exhibition(data) {
    var html = [
        '<div class="cmx-exhibition">',
        '<button class="btn btn-primary margin-right-10" id="cmx-select-relic-btn">选择文物</button>',
        '<button class="btn btn-primary" id="cmx-select-delect-btn">移除</button>',
        '<div class="table-responsive margin-top-10">',
        '<table class="table table-bordered text-nowrap">',
        '<thead>',
        '<tr>',
        '<th></th>',
        '<th>类别</th>',
        '<th>展品序号</th>',
        '<th>原因</th>',
        '<th>专家对该件文物出展意见与建议</th>',
        '</tr>',
        '</thead>',
        '<tbody id="cmx-expert-relic-tbody"></tbody>',
        '</table>',
        '</div>',
        '</div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}