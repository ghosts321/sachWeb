/*
 * @Author: lvjinxiu 
 * @Date: 2017-11-30 22:00:32 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-05-21 15:01:45
 */

//处领导处理
'use strict';
var _projectNum = '';
var _applyId = '';
var _status = '';

cmx.g.regist('provincesName', '');
cmx.g.regist('networkNum', '');
cmx.g.regist('projectName', '');
cmx.g.regist('contactName', '');
cmx.g.regist('contactTel', '');

cmx.g.regist('recordId');
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
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            }).turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    console.log(data)
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
                    cmx.g.provincesName = data.provincesName;
                    cmx.g.networkNum = data.networkNum;
                    cmx.g.projectName = data.projectName;
                    cmx.g.contactName = data.contactName;
                    cmx.g.contactTel = data.contactTel;
                    if (data.eaPubWorkflowList) {
                        var eaPubWorkflowList = data.eaPubWorkflowList;
                        console.log(eaPubWorkflowList)
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
                    $('.n2-p0').html(data.approvalItemName);
                    $('.n2-p1').html(cmx.g.contactName);
                    $('.n2-p2').html(cmx.g.contactTel);
                    $('.n2-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    $('.n3-p0').html(data.approvalItemName);
                    $('.n3-p1').html(cmx.g.contactName);
                    $('.n3-p2').html(cmx.g.contactTel);
                    $('.n3-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    $('.n1-p0').html(data.approvalItemName);
                    $('.n1-p1').html(data.acceptTime);
                    $('.n1-p3').html(_projectNum + '_' + cmx.g.networkNum);
                    $('.n1-p4').html(cmx.g.contactName);
                    $('.n1-p5').html(cmx.g.contactTel);
                    $('.n1-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
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
        //window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
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
    $('.n1-p8').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    $('.n1-p10').html('提醒：查询进度办理（结果）请登录国家文物局综合行政管理平台或致电' + (getData('telNo') == '无' ? getData('contactTelno') : getData('telNo')) + '。此项许可不收取费用。');
    $('.n2-p8').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    $('.n2-p10').html('如有疑义，请致电' + getData('telNo', '无') + '详询。');
    $('.n3-p8').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    $('.n3-p10').html('如有疑义，请致电' + getData('telNo', '无') + '详询。');
    $('.n1-p2').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    //确定发送
    $("#cmx-button-confirm").on('click', function () {
        if ($('#cmx-acceptanceTabs').hasClass("active")) {
            if ($('#cmx-accept-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '办理意见不能超过500字'
                });
                return;
            }
            showAlert({
                type: 'confirm',
                content: '受理成功的单证已经发送给申请人,请在规定的时间内办结',
                callback: function (_state) {
                    if (_state == 'yes') {
                        var ptnFormDataItem0 = {};
                        ptnFormDataItem0.optionCont9 = getData('role') == 'nation' ? '国家文物局办公室' : getData('instName');
                        ptnFormDataItem0.optionCont10 = getData('role') == 'nation' ? '010-56792137' : getData('telNo');
                        ptnFormDataItem0.noticeType = "1"; //通知书类型 0不予受理 2一次性补正
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/' + getProvinceApplyApi(_projectNum) + '/sendAcceptInfo',
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    acceptFlag: "1", //0：回退 1：受理 2:转派给别人
                                    applyId: _applyId,
                                    projectNum: _projectNum,
                                    ptnFormData: [ptnFormDataItem0],
                                    recordId: "",
                                    "pfFormData": [{
                                        remark: $('#cmx-accept-remark').val()
                                    }]
                                }),
                                type: 'POST'
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == '200') {
                                    showAlert({
                                        type: 'success',
                                        content: '保存成功'
                                    });
                                    setTimeout(function () {
                                        window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
                                    }, 1000)
                                }
                            })
                            .start();
                    }
                },
                btn_1: '取消',
                btn_2: '确定'
            });
        }
        //退回
        if ($('#cmx-backTabs').hasClass("active")) {
            if ($('#n3textarea1').val().length > 200) {
                showAlert({
                    type: 'error',
                    content: '字数不能超出200字'
                });
                return;
            }
            if ($('#n3textarea2').val().length > 200) {
                showAlert({
                    type: 'error',
                    content: '字数不能超出200字'
                });
                return;
            }
            if ($('#n2textarea1').val().length > 200) {
                showAlert({
                    type: 'error',
                    content: '字数不能超出200字'
                });
                return;
            }
            if ($('#n2textarea2').val().length > 200) {
                showAlert({
                    type: 'error',
                    content: '字数不能超出200字'
                });
                return;
            }
            if ($('#n2textarea3').val().length > 200) {
                showAlert({
                    type: 'error',
                    content: '字数不能超出200字'
                });
                return;
            }
            if ($('#n2textarea4').val().length > 200) {
                showAlert({
                    type: 'error',
                    content: '字数不能超出200字'
                });
                return;
            }
            //一次性补正告知书
            if ($('input:radio[name="radio-return"]:checked').val() == 1) {
                var n3textarea1 = '',
                    n3textarea2 = '',
                    ptnFormDataItem = {};
                if ($('#reson2-1:checked').length > 0) {
                    ptnFormDataItem.option1 = '1';
                    ptnFormDataItem.optionCont1 = $('#n3textarea1').val();
                }
                if ($('#reson2-2:checked').length > 0) {
                    ptnFormDataItem.option2 = '1';
                    ptnFormDataItem.optionCont2 = $('#n3textarea2').val();
                }
                ptnFormDataItem.optionCont9 = getData('role') == 'nation' ? '国家文物局办公室' : getData('instName');
                ptnFormDataItem.optionCont10 = getData('telNo');
                ptnFormDataItem.noticeType = "2"; //通知书类型 0不予受理 2一次性补正
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/' + getProvinceApplyApi(_projectNum) + '/sendAcceptInfo',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            acceptFlag: "3",
                            applyId: _applyId,
                            projectNum: _projectNum,
                            pfFormData: [{
                                remark: $("#cmx-accept-remark").val()
                            }],
                            ptnFormData: [ptnFormDataItem]
                            //退回给上一个人
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '保存成功'
                            });
                            setTimeout(function () {
                                window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
                            }, 1000);
                        }
                    })
                    .start();
            }
            if ($('input:radio[name="radio-return"]:checked').val() == 2) { //不予受理通知书
                var n2textarea1 = '',
                    n2textarea2 = '',
                    n2textarea3 = '',
                    n2textarea4 = '',
                    ptnFormDataItem2 = {};
                if ($('#reson1-1:checked').length > 0) {
                    ptnFormDataItem2.option1 = '1';
                    ptnFormDataItem2.optionCont1 = $('#n2textarea1').val();
                }
                if ($('#reson1-2:checked').length > 0) {
                    ptnFormDataItem2.option2 = '1';
                    ptnFormDataItem2.optionCont2 = $('#n2textarea2').val();
                }
                if ($('#reson1-3:checked').length > 0) {
                    ptnFormDataItem2.option3 = '1';
                    ptnFormDataItem2.optionCont3 = $('#n2textarea3').val();
                }
                if ($('#reson1-4:checked').length > 0) {
                    ptnFormDataItem2.option4 = '1';
                    ptnFormDataItem2.optionCont4 = $('#n2textarea4').val();
                }
                ptnFormDataItem2.noticeType = "0"; //通知书类型 0不予受理 2一次性补正
                ptnFormDataItem2.optionCont9 = getData('role') == 'nation' ? '国家文物局办公室' : getData('instName');
                ptnFormDataItem2.optionCont10 = getData('telNo');
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/' + getProvinceApplyApi(_projectNum) + '/sendAcceptInfo',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            acceptFlag: "3",
                            applyId: _applyId,
                            projectNum: _projectNum,
                            pfFormData: [{
                                remark: $("#cmx-accept-remark").val()
                            }],
                            ptnFormData: [ptnFormDataItem2],
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '保存成功'
                            });
                            setTimeout(function () {
                                window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
                            }, 1000);
                        }
                    })
                    .start();
            }
        }
        if ($('#cmx-branchTabs').hasClass("active")) {
            // alert($("#cmx-chuzhang-person").attr("value"))
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/' + getProvinceApplyApi(_projectNum) + '/disposeHandlersAcceptTask',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        acceptFlag: "2",
                        applyId: _applyId,
                        projectNum: _projectNum,
                        pfFormData: [{
                            remark: $("#cmx-fenpai-remark").text()
                        }],
                        ptnFormData: [{
                            noticeType: "" //通知书类型
                        }],
                        nextTaskUser: $("#cmx-chuzhang-person").attr("value"),
                        backToSecretaryFlag: "0"
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '分办成功'
                        });
                        // setTimeout(function () {
                        //     window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
                        // }, 1000);
                    }
                    send.go();
                })
                // .turn('callajax', {
                //     url: api_ea + '/eaPubTransactionrecord/disposeRecord',
                //     data: JSON.stringify({
                //         token: getData('token'), //类型：String  必有字段  备注：无
                //         trsFlag: "2",
                //         trsFormData: [{
                //             applyId: _applyId,
                //             projectNum: "56012",
                //             receiverId: $("#cmx-chuzhang-person").attr("instid"),
                //             note: $("#cmx-fenpai-remark").val(),
                //             recordId: cmx.g.recordId
                //         }]
                //     }),
                //     type: 'POST',
                //     success: function (result) {
                //         console.log(result);
                //         setTimeout(function () {
                //             window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
                //         }, 1000);
                //     }
                // })
                .start();
        }
    });

    $("#notice1").off('click');
    $("#notice1").on('click', function () {
        $('.n2').hide();
        $('.n3').show();
    });
    $("#notice2").off('click');
    $("#notice2").on('click', function () {
        $('.n3').hide();
        $('.n2').show();
    });
    $('#notice1').trigger('click');
    if (IsEmpty($("#cmx-person-modal").html())) {
        $("#cmx-person-modal").load(getSelectPerson, function () {
            $("#cmx-chuzhang-chooseperson").unbind('click', function () { });
            $("#cmx-chuzhang-chooseperson").bind('click', function () {
                $("#cmxAddPerson").off('shown.bs.modal', function () { });
                $("#cmxAddPerson").on('shown.bs.modal', function () {
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
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            var result = prevModelData;
                            if (!IsNull(result) && result.state == '200' && !IsEmpty(result.data) && result.data != 'null') {
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
                        })
                        .start();
                });
                $("#cmxAddPerson").modal("show");
                $("#cmx-person-save").off('click');
                $("#cmx-person-save").on('click', function () {
                    if ($("#cmx-TabsOne").hasClass("active")) {
                        $("#cmx-chuzhang-person").val($("#cmx-generalperson input:checked").parent().text());
                        $("#cmx-chuzhang-person").attr("value", $("#cmx-generalperson input:checked").val());
                        $("#cmx-chuzhang-person").attr("instid", $("#cmx-generalperson input:checked").attr("instid"));
                        $("#cmxAddPerson").modal("hide");
                    }
                    if ($("#cmx-TabsTwo").hasClass("active")) {
                        $("#cmx-chuzhang-person").val($("#cmx-sendperson option:checked").text());
                        $("#cmx-chuzhang-person").attr("value", $("#cmx-sendperson option:checked").val());
                        $("#cmx-chuzhang-person").attr("instid", $("#cmx-sendperson option:checked").attr("instid"));
                        $("#cmxAddPerson").modal("hide");
                    }
                });
            });
        })
    }
});

function nchange(id, self) {
    if ($('#' + self + ':checked').length > 0)
        $('#' + id).show();
    else
        $('#' + id).hide();
}