/*
 * @Author: liuxiangnan 
 * @Date: 2017-12-10 06:34:13 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-04-23 14:58:44
 */
//处员处理
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
        if (_projectNum == '56022_c') {
            $('#cmx-timeLimit').hide();
        }
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
                    $('.n2-p1').html(getData('role') == 'province' ? (cmx.g.provincesName + '文物局') : cmx.g.contactName);
                    $('.n2-p2').html(cmx.g.contactTel);
                    $('.n2-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    // $('.n2-p8').html('国家文物局办公室<br/>' + data.acceptTime);
                    $('.n3-p0').html(data.approvalItemName);
                    $('.n3-p1').html(getData('role') == 'province' ? (cmx.g.provincesName + '文物局') : cmx.g.contactName);
                    $('.n3-p2').html(cmx.g.contactTel);
                    $('.n3-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    // $('.n3-p8').html('国家文物局办公室<br/>' + data.acceptTime);
                    $('.n1-p0').html(data.approvalItemName);
                    $('.n1-p1').html(data.acceptTime);
                    $('.n1-p3').html(_projectNum + '_' + cmx.g.networkNum);
                    $('.n1-p4').html(getData('role') == 'province' ? (cmx.g.provincesName + '文物局') : cmx.g.contactName);
                    $('.n1-p5').html(cmx.g.contactTel);
                    $('.n1-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    // $('.n1-p8').html('国家文物局办公室<br/>' + data.acceptTime);
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
    $('.n1-p8').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    $('.n1-p10').html('提醒：查询进度办理（结果）请登录国家文物局综合行政管理平台或致电' + (getData('role') == 'nation' ? '010-56792137' : getData('telNo')) + '。此项许可不收取费用。');
    $('.n2-p8').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    $('.n2-p10').html('如有疑义，请致电' + getData('telNo', '无') + '详询。');
    $('.n3-p8').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    $('.n3-p10').html('如有疑义，请致电' + getData('telNo', '无') + '详询。');
    $('.n1-p2').html((getData('role') == 'nation' ? '国家文物局办公室' : getData('instName')) + '<br/>');
    //确定发送
    $("#cmx-button-confirm").on('click', function () {
        if ($('#cmx-acceptanceTabs').hasClass("active")) {
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
                                url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeArchaeologyNoBack',
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    acceptFlag: "1", //0退回 1受理 2转派 3一次性补正或不予受理
                                    applyId: _applyId,
                                    projectNum: _projectNum,
                                    pfFormData: [{
                                        remark: $("#cmx-accept-remark").val()
                                    }],
                                    ptnFormData: [
                                        ptnFormDataItem0
                                    ],
                                    nextTaskUser: $("#cmx-chuyuan-person").attr("value"),
                                    backToSecretaryFlag: "0" //是否退回司密
                                }),
                                type: 'POST'
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == '200') {
                                    showAlert({
                                        type: 'success',
                                        content: '保存成功'
                                    });
                                    var paramStr = '?type=1&status=203&applyId=' + _applyId + '&projectNum=' + _projectNum;
                                    window.location.href = '/app/f-gover-approval/nation/56008-b-zhuanjiajigou.html' + paramStr;
                                }
                            })
                            .start();
                    }
                },
                btn_1: '取消',
                btn_2: '确定'
            });
        }
        if ($('#cmx-backTabs').hasClass("active")) {
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
                        url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeArchaeologyNoBack',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            acceptFlag: "3", //0退回 1受理 2转派 3一次性补正或不予受理
                            applyId: _applyId,
                            applyOrExploreOrOther: $('input:radio[name="back"]:checked').val(),
                            projectNum: _projectNum,
                            pfFormData: [{
                                remark: $("#cmx-accept-remark").val()
                            }],
                            ptnFormData: [ptnFormDataItem],
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
                                history.go(-1);
                                // window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid='+GetUrlParamString('nowid');
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
                        url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeArchaeologyNoBack',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            acceptFlag: "3", //0退回 1受理 2转派 3一次性补正或不予受理
                            applyId: _applyId,
                            applyOrExploreOrOther: $('input:radio[name="back"]:checked').val(),
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
                                history.go(-1);
                                // window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid='+GetUrlParamString('nowid');
                            }, 1000);
                        }
                    })
                    .start();
            }
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
});

function nchange(id, self) {
    if ($('#' + self + ':checked').length > 0)
        $('#' + id).show();
    else
        $('#' + id).hide();
}