/*
 * @Author: lvjinxiu 
 * @Date: 2017-11-30 22:00:09 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-05-21 14:59:22
 */

//司密处理
var _projectNum = '';
var _applyId = '';
var _status = '';
cmx.g.regist('recordId');
$(document).ready(function () {
    //申请信息
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
        // if (_projectNum == '56022_c') {
        //     $('#cmx-timeLimit').hide();
        // }
        // if (_status == '303' || _status == '304') {
        //     //$('#cmx-fenpai').hide();
        //     $('#tabsReturn').addClass('active');
        //     $('#tabsAcceptance').removeClass('active');
        //     $('#cmx-return').addClass('active');
        //     $("#cmx-fenpai").removeClass('active');
        // }
        new cmx.process()
            .turn('checkIsMyFlow', {
                applyId: _applyId,
                status: _status,
                projectNum: _projectNum
            })
            .turn('callajax', {
                url: api_ea + '/business/getProcessTimeByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    console.log(data);
                    $('.timeLimit').html(data.timeLimit);
                    $('.workDay').html(data.workDay);
                }
                send.go();
            })
            .turn('callajax', {
                url: api_ea + '/business/getBriefDataByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    console.log(data);
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
                    cmx.g.provincesName = data.provincesName;
                    //发一次性补正后重新提交到国局，国局不再显示之前的通知书
                    if (data.eaPubThreenotice) {
                        if (data.acceptFlag == 3) {
                            $('.n3').show();
                            $('.n3-p1').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                            var eaPubThreenotice = data.eaPubThreenotice;

                            $('.n3-p0').html(data.approvalItemName);
                            $('.n3-p2').html(data.contactTel);
                            if (eaPubThreenotice.option1 == '1')
                                $('.n3-p3').html('（√）申请材料不全，具体为：<span class="color:#f2a654;">' + eaPubThreenotice.optionCont1 + '</span>');
                            if (eaPubThreenotice.option2 == '1')
                                $('.n3-p4').html('（√）不符合法定形式，<span class="color:#f2a654;">' + eaPubThreenotice.optionCont2 + '</span>');
                            $('.n3-p7').html(data.approvalItemName + IsEmpty(data.projectName) ? ('《' + data.projectName + '》') : '');
                            $('.n3-p8').html(eaPubThreenotice.optionCont9 + '<br/>' + eaPubThreenotice.acceptTime);
                            $('.n3-p10').html('如有疑义，请致电' + eaPubThreenotice.optionCont10 + '详询。');
                        } else if (data.acceptFlag == 4) {
                            $('.n2').show();
                            $('.n2-p0').html(data.approvalItemName);
                            $('.n2-p1').html(data.accClass == '12' ? (data.provincesName + '文物局') : data.createUserName);
                            $('.n2-p2').html(data.contactTel);
                            if (data.eaPubThreenotice.option1 == '1')
                                $('.n2-p3').html('（√）根据法律法规和“三定”方案，不属于我局职责范围。<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont1 + '</span>');
                            if (data.eaPubThreenotice.option2 == '1')
                                $('.n2-p4').html('（√）根据国务院文件，我局已经下放或取消该项许可。<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont2 + '</span>');
                            if (data.eaPubThreenotice.option3 == '1')
                                $('.n2-p5').html('（√）根据我局行政审批指南，申报材料中有重要因素缺失或错误，具体为：<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont3 + '</span>');
                            if (data.eaPubThreenotice.option4 == '1')
                                $('.n2-p6').html('（√）其他原因，具体为：<span class="color:#f2a654;">' + data.eaPubThreenotice.optionCont4 + '</span>');
                            $('.n2-p7').html(data.approvalItemName + IsEmpty(data.projectName) ? ('《' + data.projectName + '》') : '');
                            $('.n2-p8').html(data.eaPubThreenotice.optionCont9 + '<br/>' + data.eaPubThreenotice.acceptTime);
                            $('.n2-p10').html('如有疑义，请致电' + data.eaPubThreenotice.optionCont10 + '详询。');
                        }
                    }
                }
                send.go();
            })
            .start();
    } else {
        location.href = '/error.html';
        return;
    }
    //返回
    $('#cmx-button-return').on('click', function () {
        var back_url = document.referrer;
        if (back_url.indexOf('&back=-1') >= 0) {
            window.location.href = back_url;
        } else {
            window.location.href = back_url + '&back=-1';
        }
    });

    var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    //确定
    $("#cmx-button-confirm").on('click', function () {
        // //分派
        // if ($("#cmx-fenpai").hasClass("active")) {
        //     if (IsEmpty($("#cmx-simi-person").attr("value"))) {
        //         showAlert({
        //             type: 'error',
        //             content: '请选择分派人员'
        //         });
        //         return;
        //     }
        //     new cmx.process()
        //         .turn('selectUserRole', {
        //             userId: $("#cmx-simi-person").attr("value")
        //         })
        //         .turn(function (prevModelData, send, abort) {
        //             cmx.g.select_role = prevModelData;
        //             send.tomodel({
        //                 data: JSON.stringify({
        //                     token: getData('token'), //类型：String  必有字段  备注：无
        //                     pfFormData: [ //类型：Array  必有字段  备注：无
        //                         { //类型：Object  必有字段  备注：无
        //                             remark: $("#cmx-fenpai-remark").val(), //类型：String  必有字段  备注：无
        //                         }
        //                     ],
        //                     isSaveOrSend: "send", //类型：String  必有字段  备注：参数值：save 保存 send 发送
        //                     projectNum: _projectNum, //类型：String  必有字段  备注：无
        //                     applyId: _applyId, //类型：String  必有字段  备注：无
        //                     completeOrBack: "0", //类型：String  必有字段  备注：参数值：0 完成 1回退
        //                     choosePerson: $("#cmx-simi-person").attr("value"),
        //                     roleId: cmx.g.select_role
        //                 })
        //             }).go();
        //         })
        //         .turn('callajax', {
        //             url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeOpinionAndclaimTask',
        //             type: 'POST'
        //         })
        //         .turn(function (prevModelData, send, abort) {
        //             if (prevModelData.state == '200') {
        //                 showAlert({
        //                     type: 'success',
        //                     content: '分派成功'
        //                 });
        //                 send.go();
        //                 setTimeout(function () {
        //                     window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid='+GetUrlParamString('nowid');
        //                 }, 1000);
        //             } else {
        //                 abort();
        //             }
        //         })
        //         .start();
        // }
        //退回
        if ($("#cmx-return").hasClass("active")) {
            if ($('#cmx-return-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '处理意见不能超过500字'
                });
                return;
            }
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeOpinionAndclaimTask',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        pfFormData: [ //类型：Array  必有字段  备注：无
                            { //类型：Object  必有字段  备注：无
                                remark: $("#cmx-return-remark").val(), //类型：String  必有字段  备注：无
                            }
                        ],
                        isSaveOrSend: "send", //类型：String  必有字段  备注：参数值：save 保存 send 发送
                        projectNum: _projectNum, //类型：String  必有字段  备注：无
                        applyId: _applyId, //类型：String  必有字段  备注：无
                        applyOrExploreOrOther: $('input:radio[name="back"]:checked').val(),
                        completeOrBack: "1", //类型：String  必有字段  备注：参数值：0 完成 1回退
                        choosePerson: ""
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '退回成功'
                        });
                        setTimeout(function () {
                            window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid='+GetUrlParamString('nowid');
                        }, 1000);
                    }
                }).start();
        }
    });
    //获取可发送联系人
    if (IsEmpty($("#cmx-choosemodalDiv").html())) {
        $('#cmx-choosemodalDiv').load(getSelectPerson, function () {
            $("#cmx-chooseperson").unbind('click');
            $("#cmx-chooseperson").bind('click', function () {
                $("#cmxAddPerson").off('show.bs.modal');
                $("#cmxAddPerson").on('show.bs.modal', function () {
                    $("#cmx-sendperson").html('');
                    new cmx.process()
                        .turn('callajax', {
                            url: api_cm + '/CmContactuserController/getDataByToken',
                            data: JSON.stringify({
                                token: getData('token')
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                $("#cmx-generalperson").html("");
                                var html = "";
                                var data = prevModelData.data;
                                for (var i = 0; i < data.length; i++) {
                                    html += [
                                        '<div class="radio-custom radio-primary">',
                                        '<input type="radio" id="cmx-pc-' + data[i].contUserId + '" instid="' + data[i].contUserId + '" name="inputRadios" value="' + data[i].contUserId + '">',
                                        '<label for="cmx-pc-' + data[i].contUserId + '">' + data[i].contUserName + '</label>',
                                        '</div>'
                                    ].join('');
                                }
                                $("#cmx-generalperson").append(html);
                            }
                            send.go();
                        })
                        .turn('callajax', {
                            url: api_aa + '/user/aaSachuserinfo/getContractListByUserid',
                            jsonheader: false,
                            data: {
                                token: getData('token'), //类型：String  必有字段  备注：无
                            },
                            success: function (result) {
                                console.log(result);
                            },
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            var result = prevModelData;
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                var html = "";
                                var data = result.data;
                                for (var i = 0; i < data.length; i++) {
                                    html += '<option instid="' + data[i].instId + '" value="' + data[i].userId + '">' + data[i].userName + '</option>';
                                }
                                $("#cmx-sendperson").append(html);
                            }
                            send.go();
                        })
                        .cfinally(function () {

                            $('#cmx-sendperson').selectpicker({
                                size: 'auto',
                                style: 'btn-transparent',
                                liveSearch: true
                            });
                            $('#cmx-sendperson').selectpicker('refresh');
                        })
                        .start();
                });
                $("#cmxAddPerson").modal("show");
                $("#cmx-person-save").off('click');
                $("#cmx-person-save").on('click', function () {
                    if ($("#cmx-TabsOne").hasClass("active")) {
                        $("#cmx-simi-person").val($("#cmx-generalperson input:checked").parent().text());
                        $("#cmx-simi-person").attr("value", $("#cmx-generalperson input:checked").val());
                        $("#cmx-simi-person").attr("instid", $("#cmx-generalperson input:checked").attr("instid"));
                        $("#cmxAddPerson").modal("hide");
                    }
                    if ($("#cmx-TabsTwo").hasClass("active")) {
                        $("#cmx-simi-person").val($("#cmx-sendperson option:checked").text());
                        $("#cmx-simi-person").attr("value", $("#cmx-sendperson option:checked").val());
                        $("#cmx-simi-person").attr("instid", $("#cmx-sendperson option:checked").attr("instid"));
                        $("#cmxAddPerson").modal("hide");
                    }
                });
            });
        });
    }
});