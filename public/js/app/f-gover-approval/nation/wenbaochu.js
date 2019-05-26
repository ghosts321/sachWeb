/*
 * @Author: lvjinxiu 
 * @Date: 2017-11-30 22:00:32 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-11 16:22:41
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
cmx.g.regist('export', new HashMap());
cmx.g.regist('haveexport', new HashMap());
cmx.g.regist('institution', new HashMap());
cmx.g.regist('haveinstitution', new HashMap());
cmx.g.regist('isBelongSachisBelongSach', []);
cmx.g.regist('belongInst');

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
                    $('.n2-p1').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                    $('.n2-p2').html(cmx.g.contactTel);
                    $('.n2-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    // $('.n2-p8').html('国家文物局办公室<br/>' + data.acceptTime);
                    $('.n3-p0').html(data.approvalItemName);
                    $('.n3-p1').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                    $('.n3-p2').html(cmx.g.contactTel);
                    $('.n3-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    // $('.n3-p8').html('国家文物局办公室<br/>' + data.acceptTime);
                    $('.n1-p0').html(data.approvalItemName);
                    $('.n1-p1').html(data.acceptTime);

                    $('.n1-p3').html(_projectNum + '_' + cmx.g.networkNum);
                    $('.n1-p4').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                    $('.n1-p5').html(cmx.g.contactTel);
                    $('.n1-p7').html(data.approvalItemName + '《' + cmx.g.projectName + '》');
                    // $('.n1-p8').html('国家文物局办公室<br/>' + data.acceptTime);

                    //处员退回处长状态305显示一次性补正和不予受理通知书
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
            .turn('callajax', {
                url: api_ea + '/eaPubApplyprecheck/getDataByParam', //getDataListByApprItemAndApplyID
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    projectNum: _projectNum,
                    applyId: _applyId,
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                console.log(1111111)
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    var _gongyi = '';
                    var color = '';
                    cmx.g.haveexport.clear();
                    cmx.g.haveinstitution.clear();
                    for (var i = 0; i < data.length; i++) {
                        switch (data[i].dealFlag) {
                            case '1': //待发送
                                color = '#eeeeee';
                                break;
                            case '2': //待处理
                                color = '#f2a654';
                                break;
                            case '3': //正在处理
                                color = '#4397e6';
                                break;
                            case '4': //已处理
                                color = '#46be8a';
                                break;
                            case '5': //拒绝
                                color = '#f96868';
                                break;
                            case '6': //收回
                                color = '#76838f';
                                break;
                            case '7': //发文后收回
                                color = '#eeeeee';
                            default:
                                break;
                        }
                        _gongyi = data[i].instName + '<span style="color:' + color + ';">(' + data[i].dealFlagName + ')</span>';
                        if (!cmx.g.haveinstitution.get(data[i].instId)) {
                            cmx.g.haveinstitution.put(data[i].instId, _gongyi);
                        }
                    }
                    var _keys2 = cmx.g.haveinstitution.keySet();
                    $(".cmx-havechooseinstitution").html('');
                    for (var o = 0; o < _keys2.length; o++) {
                        $(".cmx-havechooseinstitution").append([
                            '<div class="btn-group btn-group-xs padding-5" role="group" institution-id="' + _keys2[o] + '">',
                            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.haveinstitution.get(_keys2[o]) + '</button>',
                            '</div>'
                        ].join(''));
                    }

                    if (data.length > 0) {
                        $('#cmx-pingshen-title').show(); //show the 专家意见 tab
                        var _tag = '';
                        $('#cmx-pingshen-list .panel-body .pingshen-list').html('');
                        var _html = '';
                        for (var i in data) {
                            console.log(data[i])
                            if (IsEmpty(data[i].instId))
                                continue;
                            if (getData('role') == 'inspection' && nowZhuanjiaId.indexOf(data[i].instId) < 0) {
                                continue;
                            }
                            if (data[i].dealFlag == '4') {
                                _tag = data[i].dealFlagName;
                            } else {
                                _tag = data[i].dealFlagName;
                            }
                            var _name = (IsEmpty(data[i].instName) ? data[i].instId : data[i].instName);
                            _html = _html + [
                                '<div class="col-md-4 col-xs-12 masonry-item">',
                                '<div class="widget widget-article widget-shadow">',
                                '<div class="widget-body" style="min-height: 220px;border: 1px #ddd solid;" data-index="' + i + '">',
                                '<span class="label label-warning">评估机构</span>',
                                '<span style="color:#aaa;float: right;font-size: 16px;font-weight: bolder;">' + _tag + '</span>',
                                '<h3 class="widget-title">',
                                '<span class="drop-cap" data-toggle="tooltip" data-placement="top" data-trigger="click" data-original-title="' + _name + '" title="" aria-describedby="tooltip790178" style="font-size: 30px;overflow: hidden;text-overflow: ellipsis;height: 65px;white-space: nowrap;width: 100%;"><span class="cursorPointer" onclick="showExpertInfo(\'' + data[i].examClass + '\',\'' + data[i].instId + '\');">' + _name + '</span></span>',
                                '</h3>',
                                '<p>' + (IsEmpty(data[i].apprDate) ? data[i].arriveDate : data[i].apprDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">停留时间：' + data[i].stayDay + '</span></p>',
                                '<div class="widget-body-footer margin-top-10">',
                                '<a class="btn btn-outline btn-default openPingshen" >查看详情</a>',
                                '<a class="margin-left-5 btn btn-outline btn-default openReminder">催办</a>',
                                '<a class="margin-left-5 btn btn-outline btn-default cancelHadChooseExport">收回</a>',
                                //'<button type="button" class="btn btn-outline btn-default  pull-right openPingshenfile">下载</button>',
                                '</div>',
                                '</div>',
                                '</div>',
                                '</div>',
                            ].join('');
                        }
                        $('#cmx-pingshen-list .panel-body .pingshen-list').html(_html);
                        //催办
                        $('#cmx-pingshen-list .panel-body .pingshen-list .openReminder').each(function () {
                            var index = $(this).parent().parent().attr('data-index');
                            if (data[index].dealFlag == '2' || data[index].dealFlag == '3') {
                                $(this).on('click', function () {
                                    $("#reminderModal").off('show.bs.modal');
                                    $("#reminderModal").on('show.bs.modal', function () {
                                        $('#cmx-reminder-projectname').html(data[index].proFileTitle);
                                        $('#cmx-reminder-person').html(data[index].instName);
                                        $('#cmx-reminder-save-btn').off('click');
                                        $('#cmx-reminder-save-btn').on('click', function () {
                                            if ($('#reminder-type-platform').is(':checked') == false && $('#reminder-type-msg').is(':checked') == false) {
                                                showAlert({
                                                    type: "error",
                                                    content: "请选择一种催办方式"
                                                });
                                                return;
                                            }
                                            if ($('#reminder-title').val().length > 300) {
                                                showAlert({
                                                    type: "error",
                                                    content: "催办标题字数不能超过300"
                                                });
                                                return;
                                            }
                                            if ($('#reminder-content').val().length > 1000) {
                                                showAlert({
                                                    type: "error",
                                                    content: "催办内容字数不能超过1000"
                                                });
                                                return;
                                            }
                                            new cmx.process()
                                                .turn('callajax', {
                                                    url: api_ea + '/eaPubUrgedealmsg/hostUrgeSaveMsg',
                                                    data: JSON.stringify({
                                                        token: getData('token'),
                                                        usmFormData: {
                                                            applyId: data[index].applyId,
                                                            msgTitle: $('#reminder-title').val(),
                                                            msgCont: $('#reminder-content').val(),
                                                            plaUrge: ($('#reminder-type-platform').is(':checked')) ? "1" : "",
                                                            msgUrge: ($('#reminder-type-msg').is(':checked')) ? "1" : "",
                                                            dealFlag: data[index].dealFlag,
                                                            recvUserId: data[index].instId,
                                                            recvUserName: data[index].instName,
                                                            examId: data[index].checkId
                                                        }
                                                    }),
                                                    type: 'POST'
                                                })
                                                .turn(function (prevModelData, send, abort) {
                                                    console.log(prevModelData);
                                                    if (prevModelData.state == '200') {
                                                        showAlert({
                                                            type: "success",
                                                            content: "催办成功"
                                                        });
                                                        $("#reminderModal").modal('hide');
                                                        geturgeCount();
                                                    }
                                                })
                                                .start();
                                        });
                                    });
                                    $('#reminderModal').modal('show');
                                    $("#reminderModal").off('hide.bs.modal');
                                    $("#reminderModal").on('hide.bs.modal', function () {
                                        $('#reminder-title').val('');
                                        $('#reminder-content').val('');
                                        $('#reminder-type-platform').attr('checked', false);
                                        $('#reminder-type-msg').attr('checked', false);
                                    });
                                });
                            } else {
                                $(this).hide();
                            }
                        })
                        //查看详情
                        $('#cmx-pingshen-list .panel-body .pingshen-list .openPingshen').each(function () {
                            var index = $(this).parent().parent().attr('data-index');
                            if (data[index].dealFlag == '4') {
                                $(this).on('click', function () {
                                    $("#pingshen-modal-2").off('show.bs.modal');
                                    $("#pingshen-modal-2").on('show.bs.modal', function () {
                                        var html = handleExpertDetail(data[index]);
                                        $('#cmx-form-pingshen-2').html(html);
                                    });
                                    $('#pingshen-modal-2').modal('show');
                                });
                            } else if (data[index].dealFlag == '5') {
                                $(this).on('click', function () {
                                    $("#pingshen-modal-2").off('show.bs.modal');
                                    $("#pingshen-modal-2").on('show.bs.modal', function () {
                                        var html = '<p>' + data[index].backReason + '</p>';
                                        $('#cmx-form-pingshen-2').html(html);
                                    });
                                    $('#pingshen-modal-2').modal('show');
                                });
                            } else {
                                $(this).attr('disabled', true);
                            }
                        });
                        //收回评审
                        $('#cmx-pingshen-list .panel-body .pingshen-list .cancelHadChooseExport').each(function () {
                            var index = $(this).parent().parent().attr('data-index');
                            if (data[index].dealFlag == '2') {
                                $(this).on('click', function () {
                                    showAlert({
                                        type: 'confirm',
                                        content: '确定收回本评审工作吗？',
                                        btn_1: '取消',
                                        btn_2: '确定',
                                        callback: function (_state) { //仅type为confirm下有效
                                            console.log(_state); //_state可能是yes no cancel
                                            if (_state == 'yes') {
                                                new cmx.process()
                                                    .turn('callajax', {
                                                        url: api_ea + '/eaPubApplyprecheck/rebackCheckOpinion',
                                                        data: JSON.stringify({
                                                            token: getData('token'),
                                                            checkId: data[index].checkId
                                                        }),
                                                        type: 'POST'
                                                    })
                                                    .turn(function (prevModelData, send, abort) {
                                                        if (prevModelData.state == '200') {
                                                            showAlert({
                                                                type: "success",
                                                                content: "收回成功"
                                                            });
                                                            location.reload();
                                                        }
                                                    })
                                                    .start();
                                            }
                                        }
                                    })
                                });
                            } else {
                                $(this).hide();
                            }
                        });
                    }
                    handleExpertDealList(data);
                }
                send.go();
            })
            .start();
    } else {
        location.href = '/error.html';
        return;
    }
    //加载选择机构模态框
    $("#thirdParty-modal").load(getThirdInstitutionList, function () {
        func_init_pinggu_page();
        $('#cmx-pinggu-search').unbind('click');
        $('#cmx-pinggu-search').bind('click', function () {
            GetPingguFunc.pageNum1 = 1;
            GetPingguFunc.getData();
        });
        $('#cmx-pinggu-delete').unbind('click');
        $('#cmx-pinggu-delete').bind('click', function () {
            GetPingguFunc.pageNum1 = 1;
            $('#cmx-pinggu-name').val('');
        });
        $("#click-third").unbind('click');
        $("#click-third").bind('click', function () {
            $("#cmx-institution-Listmodal").off('shown.bs.modal');
            $("#cmx-institution-Listmodal").on('shown.bs.modal', function () {
                GetPingguFunc.getData();
                $('#cmx-pinggu-name').on('keyup', function (event) {
                    if (event.keyCode == 13) {
                        GetPingguFunc.pageNum1 = 1;
                        GetPingguFunc.getData();
                    }
                });
            });
            $("#cmx-institution-Listmodal").modal('show');
        });
    });
    var func_init_pinggu_page = function () {
        GetPingguFunc.getData();
        $('#pinggu-page .first').unbind('click');
        $('#pinggu-page .first').bind('click', function () {
            GetPingguFunc.pageNum1 = 1;
            GetPingguFunc.getData();
        });
        $('#pinggu-page .last').unbind('click');
        $('#pinggu-page .last').bind('click', function () {
            GetPingguFunc.pageNum1 = GetPingguFunc.pageCount1;
            GetPingguFunc.getData();
        });
        $('#pinggu-page .pre').unbind('click');
        $('#pinggu-page .pre').bind('click', function () {
            if (GetPingguFunc.pageNum1 > 1) {
                GetPingguFunc.pageNum1--;
                GetPingguFunc.getData();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#pinggu-page .next').unbind('click');
        $('#pinggu-page .next').bind('click', function () {
            if (GetPingguFunc.pageNum1 < GetPingguFunc.pageCount1) {
                GetPingguFunc.pageNum1++;
                GetPingguFunc.getData();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });
    };
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

    //受理选择常用语
    selectCommonWords("commonwords", "commonwords-use", "cmx-accept-remark");
    //退回选择常用语
    selectCommonWords("fenpai-commonwords", "fenpai-commonwords-use", "cmx-fenpai-remark");

    //确定发送
    $("#cmx-button-confirm").on('click', function () {
        //受理
        if ($('#cmx-acceptanceTabs').hasClass("active")) {
            if ($('#cmx-fenpai-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '办理意见不能超过500字'
                });
                return;
            }
            showAlert({
                type: 'confirm',
                content: '请确认项目信息和附件',
                btn_1: '取消',
                btn_2: '确定',
                callback: function (_state) { //仅type为confirm下有效
                    if (_state == 'yes') {
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
                                            url: api_ea + '/' + getApplyApi(_projectNum) + '/wbcDisposeAcceptTask',
                                            data: JSON.stringify({
                                                token: getData('token'), //类型：String  必有字段  备注：无
                                                acceptFlag: "1", //0：回退 1：受理 2:转派给别人 3:一次性补正不予受理
                                                applyId: _applyId,
                                                projectNum: _projectNum,
                                                pfFormData: [{
                                                    remark: $("#cmx-fenpai-remark").val()
                                                }],
                                                ptnFormData: [
                                                    ptnFormDataItem0
                                                ],
                                                nextTaskUser: '',
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
                                                setTimeout(function () {
                                                    window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                                                }, 1000);
                                            }
                                        })
                                        .start();
                                }
                            },
                            btn_1: '取消',
                            btn_2: '确定'
                        });
                    }
                }
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
                        url: api_ea + '/' + getApplyApi(_projectNum) + '/wbcDisposeAcceptTask',
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
                                window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
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
                        url: api_ea + '/' + getApplyApi(_projectNum) + '/wbcDisposeAcceptTask',
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
                                window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                            }, 1000);
                        }
                    })
                    .start();
            }
        }
        //第三方检查
        if ($('#cmx-branchTabs').hasClass("active")) {
            if ($('#cmx-disanfang-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '意见不能超过500字'
                });
                return;
            }
            var _keys = cmx.g.institution.keySet();
            if (_keys <= 0) { //TODO
                showAlert({
                    type: 'info',
                    content: '请选择评估机构'
                });
                return;
            }
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaIchCrpApply/thirdpartyCheck',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        examClass: 2, //专家或者评估机构标识0：专家 1：评估机构
                        exportIds: _keys.join(','), //专家或评估机构id，以逗号分隔
                        applyId: _applyId,
                        projectNum: _projectNum,
                        roleId: 'RPG0000001',
                        opinion: $("#cmx-disanfang-remark").val()
                    }),
                    type: 'POST'
                }).turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '500') {
                        send.go();
                    }
                    if (!IsNull(prevModelData) && prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '提交成功'
                        });
                        setTimeout(function () {
                            location.reload();
                            //window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                        send.go();
                    } else {
                        abort('');
                    }
                }).start();
        }
    });

});

function nchange(id, self) {
    if ($('#' + self + ':checked').length > 0)
        $('#' + id).show();
    else
        $('#' + id).hide();
}

var GetPingguFunc = {};
GetPingguFunc.pageNum1 = 1;
GetPingguFunc.pageCount1 = 0;
GetPingguFunc.searchWords11 = '';
GetPingguFunc.getData = function () {
    GetPingguFunc.searchWords11 = $('#cmx-pinggu-name').val();
    $("#cmx-institution-list").html('');
    var _otherInstitution = cmx.g.institution.keySet();
    _otherInstitution.concat(cmx.g.haveinstitution.keySet());
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/inst/aaAssessagency/queryListByUseridprojectNum',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                pageNumber: GetPingguFunc.pageNum1,
                pageSize: 15,
                projectNum: _projectNum,
                formData: {
                    userName: GetPingguFunc.searchWords11
                },
                selectedAssessagency: _otherInstitution.join(',')
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            var result = prevModelData;
            if (result.state == '200' && !IsEmpty(result.data) && result.data != 'null') {
                $("#cmx-institution-list").html('');
                var html = "";
                var data = result.data.dataList;
                for (var i = 0; i < data.length; i++) {
                    html += '<tr>' +
                        //'<td><input type="radio" name="institution" value="' + data[i].instId + '" ' + (IsEmpty(cmx.g.institution.get(data[i].instId)) ? '' : 'checked') + '></td>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td class="inst-name">' + data[i].instName + '</td>' +
                        '<td>' + data[i].dealCount + '</td>' +
                        '<td>' + data[i].dealedCount + '</td>' +
                        '<td>' + data[i].corpName + '</td>' +
                        '<td>' + data[i].contactor + '</td>' +
                        '<td>' + data[i].contactTel + '</td>' +
                        '</tr>';
                }
                $("#cmx-institution-list").append(html);
                GetPingguFunc.pageCount1 = result.data.pages;
                $('#pinggu-page .nowpage').html(result.data.pageNumber);
                $('#pinggu-page .totalpage').html(result.data.pages);

                //保存已选
                $("#cmx-institution-list tr").each(function (index) {
                    var _gongyi = '';
                    $(this).on('click', function () {
                        $("#cmx-institution-list tr").each(function () {
                            $(this).removeClass('active');
                        });
                        $(this).addClass('active');
                        cmx.g.institution.clear();
                        _gongyi = data[index].instName + '<span style="color:#aaaaaa;">(待发送)</span>';
                        cmx.g.institution.put(data[index].instId, _gongyi);
                        var _keys = cmx.g.institution.keySet();
                        $(".already-choose-institution").html('');
                        for (var o = 0; o < _keys.length; o++) {
                            $(".already-choose-institution").append([
                                '<div class="btn-group btn-group-xs padding-5" role="group" export-id="' + _keys[o] + '">',
                                '<button type="button" class="btn btn-outline btn-default">' + cmx.g.institution.get(_keys[o]) + '</button>',
                                '<button type="button" class="btn btn-outline btn-default" onclick="cancelChooseinstitution(\'' + _keys[o] + '\')">取消</button>',
                                '</div>'
                            ].join(''));
                        }
                    });
                });
                $("#cmx-institution-confirm").off('click');
                $("#cmx-institution-confirm").on('click', function () {
                    var _self = $(this);
                    var _keys = cmx.g.institution.keySet();
                    $("#cmx-chooseinstitution").html('');
                    for (var o = 0; o < _keys.length; o++) {
                        $("#cmx-chooseinstitution").append([
                            '<div class="btn-group btn-group-xs padding-5" role="group" institution-id="' + _keys[o] + '">',
                            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.institution.get(_keys[o]) + '</button>',
                            '<button type="button" class="btn btn-outline btn-default" onclick="cancelChooseinstitution(\'' + _keys[o] + '\')">取消</button>',
                            '</div>'
                        ].join(''));
                    }
                    $("#cmx-institution-Listmodal").modal('hide');
                });
            } else {
                abort('获取评估机构列表失败');
            }
        })
        .start();
};

function handleExpertDealList(data) {
    $('#cmx-pingshen-bulleted').html('');
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if (getData('role') == 'inspection' && nowZhuanjiaId.indexOf(data[i].instId) < 0) {
            continue;
        }
        var html = handleExpertDetail(data[i]);
        $('#cmx-pingshen-bulleted').append(html);
    }
}

function handleExpertDetail(data) {
    var html = '';
    var examClass = data.examClass;
    var json_data = '';
    switch (_projectNum) {
        case '56004':
        case '56005':
        case '56010':
        case '56012':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/shejianxiangmu.json';
            }
            break;
        case '56008_b':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/56008-b-yijian.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/56008-b-yijian.json';
            }
            break;
        case '56011':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/56008-b-yijian.json';
            }
            break;
        case '56008_a':
        case '56009':
        case '56013':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/kaogu.json';
            }
            break;
        case '56014_a':
        case '56014_b':
        case '56014_c':
        case '56014_e':
        case '56014_d':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/gongchengfangan.json';
            }
            break;
        case '56014-3_a':
        case '56014-3_d':
        case '56014-3_e':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/xiaofangyijian.json';
            }
            break;
        case '56022_b':
        case '56022_c':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/baohuguihua.json';
            }
            break;
        case '56015_e':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/56015-e-yijian.json';
            }
            break;
        case '56015_f':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/56015-f-yijian.json';
            }
            break;
        case '56015_g':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/56015-g-yijian.json';
            }
            break;
        case '56016':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/bowuguanthird.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/bowuguan.json';
            }
            break;
        case '56019':
            if (examClass == '2') {
                json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
            } else {
                json_data = '/data/app/f-gover-approval/inspection/56019.json';
            }
            break;
        default:
            json_data = '';
            break;
    }
    if (!IsEmpty(json_data) && data.dealFlag == '4') {
        var third_file_html = '';
        var export_file_html = '';
        if (data.examClass == '2') {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPubApplyprecheck/getEntityByPK',
                    data: JSON.stringify({
                        token: getData('token'),
                        // apprItem: _projectNum,
                        // applyId: _applyId,
                        // exportId: data.instId,
                        // fileClass: "501",
                        // examId: data.examId
                        checkId: data.checkId
                    }),
                    type: 'POST',
                    async: false,
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        var result = prevModelData.data;
                        for (var k = 0; k < result.length; k++) {
                            third_file_html = third_file_html + '<span class="btn btn-default btn-sm margin-right-10" onclick="downloadThisFile(\'' + result[k].fileIndex + '\');">' + result[k].fileName + '</span>'
                        }
                    }
                })
                .start();
        } else {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPubApplyprecheck/getEntityByPK',
                    data: JSON.stringify({
                        token: getData('token'),
                        // apprItem: _projectNum,
                        // applyId: _applyId,
                        // instId: data.instId,
                        // fileClass: "502",
                        // examId: data.examId
                        checkId: data.checkId
                    }),
                    type: 'POST',
                    async: false,
                })
                .turn(function (prevModelData, send, abort) {
                    console.log(prevModelData)
                    if (prevModelData.state == '200') {
                        var result = prevModelData.data;
                        for (var k = 0; k < result.length; k++) {
                            export_file_html = '<button type="button" class="btn btn-squared btn-outline btn-default btn-sm pull-right" onclick="downloadThisFile(\'' + result[k].fileIndex + '\')">下载</button>';
                        }
                    }
                })
                .start();
        }

        $.ajax({
            url: json_data,
            type: "GET",
            async: false,
            success: function (rdata) {
                html = '<table class="table table-bordered text-left">';
                html = html + [
                    '<tr>',
                    '<td colspan="2">',
                    '<p class="margin-0 text-left">',
                    '<span class="label label-warning margin-right-10">评估机构</span>',
                    '<span class="margin-right-10">处理人：' + data.instName + '</span>',
                    export_file_html, // 下载专家附件
                    '<span class="margin-right-10 pull-right ">评审时间：' + data.apprDate + '</span>',
                    '</p>',
                    '</td>',
                    '<td style="border-left: none;width: 10px">\n</td>',
                    '</tr>',
                    '<tr>',
                    '<td>意见</td>',
                    '<td>' + data.checkOpinion + '</td>',
                    '<td style="border-left: none;width: 10px">\n</td>',
                    '</tr>',
                    '<tr>',
                    '<td>备注</td>',
                    '<td>' + data.remark + '</td>',
                    '<td style="border-left: none;width: 10px">\n</td>',
                    '</tr>',
                ].join('');
                // for (var j = 0; j < rdata.length; j++) {
                //     if (rdata[j].type == 'separator') {
                //         continue;
                //     } else if (rdata[j].type == "special") {
                //         continue;
                //     } else if (rdata[j].type == "file") {
                //         html = html + '<tr><td style="width:200px;">' + rdata[j].name + '&nbsp;&nbsp;</td><td style="border-right: none">' + third_file_html + '</td><td style="border-left: none;width: 10px">\n</td></tr>';
                //     } else {
                //         html = html + '<tr><td style="width:200px;">' + rdata[j].name + '&nbsp;&nbsp;</td><td style="border-right: none">' + data[rdata[j].key] + '</td><td style="border-left: none;width: 10px">\n</td></tr>';
                //     }
                // }
                html = html + '</table>';
            },
            error: function (result) {
                send.toviewreject('网络连接失败，请确认网络连接').go();
            },
            complete: function (result) {

            }
        });
    }
    return html;
}

function cancelChooseinstitution(_institutionId) {
    cmx.g.institution.remove(_institutionId);
    $('#cmx-institution-list input[value="' + _institutionId + '"]').attr("checked", false);
    var _keys = cmx.g.institution.keySet();
    $("#cmx-chooseinstitution").html('');
    for (var o = 0; o < _keys.length; o++) {
        $("#cmx-chooseinstitution").append([
            '<div class="btn-group btn-group-xs padding-5" role="group" institution-id="' + _keys[o] + '">',
            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.institution.get(_keys[o]) + '</button>',
            '<button type="button" class="btn btn-outline btn-default" onclick="cancelChooseinstitution(\'' + _keys[o] + '\')">取消</button>',
            '</div>'
        ].join(''));
    }
    $(".already-choose-institution").html('');
    for (var o = 0; o < _keys.length; o++) {
        $(".already-choose-institution").append([
            '<div class="btn-group btn-group-xs padding-5" role="group" institution-id="' + _keys[o] + '">',
            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.institution.get(_keys[o]) + '</button>',
            '<button type="button" class="btn btn-outline btn-default" onclick="cancelChooseinstitution(\'' + _keys[o] + '\')">取消</button>',
            '</div>'
        ].join(''));
    }
}

function showExpertInfo(examClass, exportId) {
    $('#showExpertInfoModal tbody').html('');
    if (examClass == 1) {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/aaExpertinfo/getEntityByPK',
                data: JSON.stringify({
                    token: getData('token'),
                    userId: exportId
                }),
                type: 'POST',
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    html = [
                        '<tr><td>姓名</td><td>' + prevModelData.data.userName + '</td></tr>',
                        '<tr><td>所属机构</td><td>' + prevModelData.data.unitName + '</td></tr>',
                        '<tr><td>手机号</td><td>' + prevModelData.data.telNo + '</td></tr>',
                        '<tr><td>邮箱</td><td>' + prevModelData.data.email + '</td></tr>',
                        '<tr><td>专业特长</td><td>' + prevModelData.data.professionName + '</td></tr>',
                    ];
                    $('#showExpertInfoModal tbody').html(html);
                }
            })
            .start();
    } else {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/inst/aaAssessagency/getEntityByPK',
                data: JSON.stringify({
                    token: getData('token'),
                    instId: exportId
                }),
                type: 'POST',
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    html = [
                        '<tr><td>机构名称</td><td>' + prevModelData.data.instName + '</td></tr>',
                        '<tr><td>省份</td><td>' + prevModelData.data.areaCodeName + '</td></tr>',
                        '<tr><td>法人</td><td>' + prevModelData.data.corpName + '</td></tr>',
                        '<tr><td>联系人</td><td>' + prevModelData.data.contactor + '</td></tr>',
                        '<tr><td>联系电话</td><td>' + prevModelData.data.contactTel + '</td></tr>',
                        '<tr><td>地址</td><td>' + prevModelData.data.address + '</td></tr>',
                    ];
                    $('#showExpertInfoModal tbody').html(html);
                }
            })
            .start();
    }
    $("#showExpertInfoModal").off('hiden.bs.modal');
    $("#showExpertInfoModal").on('hiden.bs.modal', function () {
        $('#showExpertInfoModal tbody').html('');
    });
    $("#showExpertInfoModal").modal('show');
}