var _projectNum = '';
var _applyId = '';
var _status = '';

cmx.g.regist('provincesName', '');
cmx.g.regist('networkNum', '');
cmx.g.regist('projectName', '');
cmx.g.regist('contactName', '');
cmx.g.regist('contactTel', '');
cmx.g.regist('recordId');
var noCounterpart = true;

$(document).ready(function () {
    //申请信息
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/business/getBriefDataByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //cmx.g.applyId,
                    projectNum: _projectNum
                }),
                success: function (result) {
                    console.log(result);
                },
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    $(".cmx-header-title").html(data.projectName);
                    $("#projectName").html(data.projectName);
                    $("#approvalItemName").html(data.approvalItemName);
                    $("#proFileNum").html(data.proFileNum);
                    $("#proFileTitle").html(data.proFileTitle);
                    $("#networkNum").html(data.networkNum);
                    $("#protectUnitName").html(data.protectUnitName);
                    $("#publishTypeName").html(data.publishTypeName);
                    $("#hostPersonName").html(data.hostPersonName);
                    $("#acceptTime").html(data.acceptTime);
                    if (data.eaPubWorkflowList) {
                        var eaPubWorkflowList = data.eaPubWorkflowList;
                        var html = '';
                        for (var i = 0; i < eaPubWorkflowList.length; i++) {
                            html = html + ['<tr>',
                                '<td>' + (eaPubWorkflowList.length - i) + '</td>',
                                '<td>' + (IsEmpty(eaPubWorkflowList[i].oprUserName) ? eaPubWorkflowList[i].oprRoleName : eaPubWorkflowList[i].oprUserName) + '</td>',
                                '<td>' + eaPubWorkflowList[i].note.replace(/\n/g, "<br/>") + '</td>',
                                '<td>' + eaPubWorkflowList[i].dealTime + '</td>',
                                '<td>' + eaPubWorkflowList[i].weekDay + '</td>',
                                '</tr>'
                            ].join('');
                        }
                        $("#cmx-banli-record").append(html);
                    }
                    cmx.g.recordId = data.recentRecordId;
                    if (data.eaPubThreenotice) {
                        if (data.acceptFlag == 3) {
                            $('.n3-copy').show();
                            $('.n3-copy-p1').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                            var eaPubThreenotice = data.eaPubThreenotice;

                            $('.n3-copy-p0').html(data.approvalItemName);
                            $('.n3-copy-p2').html(data.contactTel);
                            if (eaPubThreenotice.option1 == '1')
                                $('.n3-copy-p3').html('（√）申请材料不全，具体为：<span class="color:#f2a654;">' + eaPubThreenotice.optionCont1 + '</span>');
                            if (eaPubThreenotice.option2 == '1')
                                $('.n3-copy-p4').html('（√）不符合法定形式，<span class="color:#f2a654;">' + eaPubThreenotice.optionCont2 + '</span>');
                            $('.n3-copy-p7').html(data.approvalItemName + IsEmpty(data.projectName) ? ('《' + data.projectName + '》') : '');
                            $('.n3-copy-p8').html(eaPubThreenotice.optionCont9 + '<br/>' + eaPubThreenotice.acceptTime);
                            $('.n3-copy-p10').html('如有疑义，请致电' + eaPubThreenotice.optionCont10 + '详询。');
                            $('#reson2-1').click();
                            $('#reson2-2').click();
                            $('#n3textarea1').val(eaPubThreenotice.optionCont1);
                            $('#n3textarea2').val(eaPubThreenotice.optionCont2);
                        } else if (data.acceptFlag == 4) {
                            $('.n2-copy').show();
                            $('.n2-copy-p0').html(data.approvalItemName);
                            $('.n2-copy-p1').html(data.accClass == '12' ? (data.provincesName + '文物局') : data.createUserName);
                            $('.n2-copy-p2').html(data.contactTel);
                            if (data.eaPubThreenotice.option1 == '1')
                                $('.n2-copy-p3').html('（√）根据法律法规和“三定”方案，不属于我局职责范围。<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont1 + '</span>');
                            if (data.eaPubThreenotice.option2 == '1')
                                $('.n2-copy-p4').html('（√）根据国务院文件，我局已经下放或取消该项许可。<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont2 + '</span>');
                            if (data.eaPubThreenotice.option3 == '1')
                                $('.n2-copy-p5').html('（√）根据我局行政审批指南，申报材料中有重要因素缺失或错误，具体为：<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont3 + '</span>');
                            if (data.eaPubThreenotice.option4 == '1')
                                $('.n2-copy-p6').html('（√）其他原因，具体为：<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont4 + '</span>');
                            $('.n2-copy-p7').html(data.approvalItemName + IsEmpty(data.projectName) ? ('《' + data.projectName + '》') : '');
                            $('.n2-copy-p8').html(data.eaPubThreenotice.optionCont9 + '<br/>' + data.eaPubThreenotice.acceptTime);
                            $('.n2-copy-p10').html('如有疑义，请致电' + data.eaPubThreenotice.optionCont10 + '详询。');
                            $("#notice2").attr('checked', true);
                            $('.n3').hide();
                            $('.n2').show();
                            $('#reson1-1').click();
                            $('#reson1-2').click();
                            $('#reson1-3').click();
                            $('#reson1-4').click();
                            $('#n2textarea1').val(data.eaPubThreenotice.optionCont1);
                            $('#n2textarea2').val(data.eaPubThreenotice.optionCont2);
                            $('#n2textarea3').val(data.eaPubThreenotice.optionCont3);
                            $('#n2textarea4').val(data.eaPubThreenotice.optionCont4);
                        }
                    }
                }
                if (GetUrlParamString('from') == 'iframe') {
                    $('#cmx-form input').attr('disabled', true);
                    $('#cmx-form select').attr('disabled', true);
                    $('#cmx-form textarea').attr('disabled', true);
                    $('#cmx-form button').hide();
                }
                send.go();
            }).start();
        // new cmx.process()
        // .turn('callajax', {
        //     url: api_ea + '/eaAeAcpNorApply/getPartEntityByPKAndPNum',
        //     data: JSON.stringify({
        //         token: getData('token'), //类型：String  必有字段  备注：无
        //         applyId: _applyId,
        //         projectNum: "56008_b",
        //     }),
        //     success: function (result) {
        //         console.log(result);
        //     },
        //     type: 'POST'
        // })
        // .start();
    } else {
        location.href = '/error.html';
        return;
    }
    //返回
    $('#cmx-button-return').on('click', function () {
        window.location.href = "/app/f-gover-approval/province/province-needToDo.html"+'?nowid='+GetUrlParamString('nowid');
    });

    //办理信息
    $('#blxx').on('click', function () {
        $('#cmx-button-confirm').removeClass('hidden');
        $('#cmx-button-save').addClass('hidden');
    });
    //原收文
    $('#ysw').on('click', function () {
        $('#cmx-button-confirm').addClass('hidden');
        $('#cmx-button-save').removeClass('hidden');
    });

    // var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    // var _url = getApplyUrl(_projectNum);
    // $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    // $('#cmx-form').load(function() {
    //     $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    // });


    //省局受理受理意见
    $("#cmx-button-confirm").on('click', function () {
        if ($('#cmx-fenpai').hasClass('active')) {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaAeAcpNorApply/disposeOpinionAndclaimTaskProvincialCheckNoBack',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        isSaveOrSend: "send", //send发送 save保存
                        completeOrBack: 0, //0前进，1退回
                        applyId: _applyId,
                        projectNum: _projectNum,
                        pfFormData: [{
                            remark: $("#cmx-accept-remark").val()
                        }],
                    }),
                    success: function (result) {
                        if (result.state == '200') {
                            showAlert({
                                type: "success",
                                content: "发送成功"
                            });
                            setTimeout(function () {
                                window.location.href = "/app/f-gover-approval/province/province-needToDo.html"+'?nowid='+GetUrlParamString('nowid');
                            }, 2000);
                        }
                        console.log(result);
                    },
                    type: 'POST'
                })
                .start();
        }
        if ($('#cmx-return').hasClass('active')) {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaAeAcpNorApply/disposeOpinionAndclaimTaskProvincialCheckNoBack',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        isSaveOrSend: "send", //send发送 save保存
                        completeOrBack: 1, //0前进，1退回
                        applyId: _applyId,
                        applyOrExplore: $('input:radio[name="radio-return"]:checked').val(),
                        projectNum: _projectNum,
                        pfFormData: [{
                            remark: $("#cmx-return-remark").val()
                        }],
                    }),
                    success: function (result) {
                        if (result.state == '200') {
                            showAlert({
                                type: "success",
                                content: "发送成功"
                            });
                            setTimeout(function () {
                                window.location.href = "/app/f-gover-approval/province/province-needToDo.html"+'?nowid='+GetUrlParamString('nowid');
                            }, 2000);
                        }
                        console.log(result);
                    },
                    type: 'POST'
                })
                .start();
        }
    });

});