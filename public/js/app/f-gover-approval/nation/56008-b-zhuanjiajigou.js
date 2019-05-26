// 选择专家、转发文
cmx.g.regist('export', new HashMap());
cmx.g.regist('haveexport', new HashMap());
cmx.g.regist('institution', new HashMap());
cmx.g.regist('haveinstitution', new HashMap());
cmx.g.regist('isBelongSachisBelongSach', []);
cmx.g.regist('belongInst');
cmx.g.regist('recordId');

var _projectNum = '';
var _applyId = '';
var _status = '';
var isInitFile = false;
cmx.g.regist('examId', '');
$(document).ready(function () {
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');

        new cmx.process()
            .turn('initFiles', {
                'P0099': '501',
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
                send.go();
            })
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/getSimpDatasByApprItemAndApplyID', //getDataListByApprItemAndApplyID
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    apprItem: _projectNum,
                    applyId: _applyId,
                    formData: []
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
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
                        _gongyi = data[i].exportName + '<span style="color:' + color + ';">(' + data[i].dealFlagName + ')</span>';
                        if (data[i].examClass == '1') {
                            if (!cmx.g.haveexport.get(data[i].exportId)) {
                                cmx.g.haveexport.put(data[i].exportId, _gongyi);
                            }
                        } else if (data[i].examClass == '2') {
                            if (!cmx.g.haveinstitution.get(data[i].exportId)) {
                                cmx.g.haveinstitution.put(data[i].exportId, _gongyi);
                            }
                        }
                    }
                    var _keys = cmx.g.haveexport.keySet();
                    $(".cmx-havechooseexport").html('');
                    for (var o = 0; o < _keys.length; o++) {
                        $(".cmx-havechooseexport").append([
                            '<div class="btn-group btn-group-xs padding-5" role="group" export-id="' + _keys[o] + '">',
                            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.haveexport.get(_keys[o]) + '</button>',
                            '</div>'
                        ].join(''));
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
                            if (IsEmpty(data[i].exportId))
                                continue;
                            if (getData('role') == 'inspection' && nowZhuanjiaId.indexOf(data[i].exportId) < 0) {
                                continue;
                            }
                            if (data[i].dealFlag == '4') {
                                _tag = data[i].expertResultsName;
                            } else {
                                _tag = data[i].dealFlagName;
                            }
                            var _name = (IsEmpty(data[i].exportName) ? data[i].exportId : data[i].exportName);
                            _html = _html + [
                                '<div class="col-md-4 col-xs-12 masonry-item">',
                                '<div class="widget widget-article widget-shadow">',
                                '<div class="widget-body" data-index="' + i + '">',
                                '<span class="label label-warning">' + data[i].examClassName + '</span>',
                                // (!IsEmpty(data[i].expertResultsName) ? '<span style="color:#bbb;float: right;font-size: 16px;font-weight: bolder;">'+data[i].expertResultsName+'</span>': '<span style="float: right;color:#222;font-size: 16px;font-weight: bolder;">' + data[i].dealFlagName + '</span>'),
                                '<span style="color:#aaa;float: right;font-size: 16px;font-weight: bolder;">' + _tag + '</span>',
                                '<h3 class="widget-title">',
                                '<span class="drop-cap" data-toggle="tooltip" data-placement="top" data-trigger="click" data-original-title="' + _name + '" title="" aria-describedby="tooltip790178" style="font-size: 30px;overflow: hidden;text-overflow: ellipsis;height: 65px;white-space: nowrap;width: 100%;"><span class="cursorPointer" onclick="showExpertInfo(\'' + data[i].examClass + '\',\'' + data[i].exportId + '\');">' + _name + '</span></span>',
                                '</h3>',
                                '<p>' + (IsEmpty(data[i].apprDate) ? data[i].arriveDate : data[i].apprDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">停留时间：' + data[i].stopTime + '</span></p>',
                                // '<p>' + (IsEmpty(data[i].updDate) ? data[i].createDate : data[i].updDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">' + data[i].dealFlagName + '</span></p>',
                                '<div class="widget-body-footer margin-top-10">',
                                '<a class="btn btn-outline btn-default openPingshen" >查看详情</a>',
                                '<a class="margin-left-5 btn btn-outline btn-default openReminder">催办</a>',
                                '<a class="margin-left-5 btn btn-outline btn-default cancelHadChooseExport">收回</a>',
                                '<button type="button" class="btn btn-outline btn-default  pull-right openPingshenfile">下载</button>',
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
                                        $('#cmx-reminder-person').html(data[index].exportName);
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
                                                            recvUserId: data[index].exportId,
                                                            recvUserName: data[index].exportName,
                                                            examId: data[index].examId
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
                        });
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
                        //只有专家的有下载按钮，第三方暂无打包下载接口，因此隐去下载按钮
                        $('#cmx-pingshen-list .panel-body .pingshen-list .openPingshenfile').each(function () {
                            var index = $(this).parent().parent().attr('data-index');
                            if (data[index].examClass == '2') {
                                //第三方评估机构不显示下载按钮
                                $(this).hide();
                            } else {
                                if (data[index].dealFlag == '4') {
                                    $(this).on('click', function () {
                                        new cmx.process()
                                            .turn('callajax', {
                                                url: api_ea + '/eaPubFile/getExportFilesListByParam',
                                                data: JSON.stringify({
                                                    token: getData('token'),
                                                    apprItem: _projectNum,
                                                    applyId: _applyId,
                                                    exportId: data[index].exportId,
                                                    fileClass: "502",
                                                    examId: data[index].examId
                                                }),
                                                type: 'POST',
                                                async: false,
                                            })
                                            .turn(function (prevModelData, send, abort) {
                                                console.log(prevModelData)
                                                if (prevModelData.state == '200') {
                                                    var result = prevModelData.data;
                                                    if (result.length != 0) {
                                                        downloadThisFile(result[result.length - 1].fileIndex)
                                                    } else {
                                                        showAlert({
                                                            type: 'error',
                                                            content: '未查询到此文件！'
                                                        })
                                                    }
                                                }
                                            })
                                            .start();
                                    });
                                } else {
                                    //专家没有评审完也不显示下载按钮
                                    $(this).hide();
                                }
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
                                                        url: api_ea + '/eaPubExamopinion/rebackInfoByExport',
                                                        data: JSON.stringify({
                                                            token: getData('token'),
                                                            examId: data[index].examId
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
            .turn('callajax', {
                url: api_ea + '/eaPubDiscussOpinion/getEaPubDiscussOpinion',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    apprItem: _projectNum,
                    applyId: _applyId,
                    formData: []
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    $('#cmx-pingshen-title').show(); //show the 专家意见 tab
                    var data = prevModelData.data;
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].dealFlag == '2')
                                cmx.g.examId = data[i].examId;
                            var _tag = data[i].dealFlagName;
                            var _name = '专家会审';
                            var _html = [
                                '<div class="col-md-4 col-xs-12 masonry-item">',
                                '<div class="widget widget-article widget-shadow">',
                                '<div class="widget-body" style="min-height: 220px;">',
                                '<span class="label label-warning">专家会审</span>',
                                // (!IsEmpty(data[i].expertResultsName) ? '<span style="color:#bbb;float: right;font-size: 16px;font-weight: bolder;">'+data[i].expertResultsName+'</span>': '<span style="float: right;color:#222;font-size: 16px;font-weight: bolder;">' + data[i].dealFlagName + '</span>'),
                                '<span style="color:#aaa;float: right;font-size: 16px;font-weight: bolder;">' + _tag + '</span>',
                                '<h3 class="widget-title">',
                                '<span class="drop-cap" data-toggle="tooltip" data-placement="top" data-trigger="click" data-original-title="' + _name + '" title="" aria-describedby="tooltip790178" style="font-size: 30px;overflow: hidden;text-overflow: ellipsis;height: 65px;white-space: nowrap;width: 100%;">' + _name + '</span>',
                                '</h3>',
                                '<p>' + (IsEmpty(data[i].updDate) ? data[i].createDate : data[i].updDate) + '</p>',
                                // '<p>' + (IsEmpty(data[i].updDate) ? data[i].createDate : data[i].updDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">' + data[i].dealFlagName + '</span></p>',
                                '<div class="widget-body-footer margin-top-10">',
                                '<a class="btn btn-outline btn-default openHuishen">查看详情</a>',
                                //(data[i].dealFlag == '4') ? '<button type="button" class="btn btn-outline btn-default pull-right" onclick="downloadHuishenFile(\'' + _applyId + '\', \'' + _projectNum + '\', \'' + data[i].dealerId + '\', \'' + data[i].examId + '\')">下载</button>' : '',
                                '</div>',
                                '</div>',
                                '</div>',
                                '</div>',
                            ].join('');
                            $('#cmx-pingshen-list .panel-body .pingshen-list').append(_html);
                        }
                        $('#cmx-pingshen-list .panel-body .pingshen-list .openHuishen').each(function (index) {
                            if (data[index].dealFlag == '4') {
                                $(this).off('click');
                                $(this).on('click', function () {
                                    $("#openHuiShenModal").off('show.bs.modal');
                                    $("#openHuiShenModal").on('show.bs.modal', function () {
                                        $('#open-huishen-file-list').html('');
                                        new cmx.process()
                                            .turn('callajax', {
                                                url: api_ea + '/eaPubFile/getExportFilesListByParam',
                                                data: JSON.stringify({
                                                    token: getData('token'),
                                                    apprItem: _projectNum,
                                                    applyId: _applyId,
                                                    exportId: data[index].dealerId,
                                                    fileClass: "501",
                                                    examId: data[index].examId
                                                }),
                                                type: 'POST',
                                                async: false,
                                            })
                                            .turn(function (prevModelData, send, abort) {
                                                if (prevModelData.state == '200') {
                                                    var result = prevModelData.data;
                                                    for (var k = 0; k < result.length; k++) {
                                                        $('#open-huishen-file-list').append('<li onclick="downLoadFile(undefined, \'' + getFile + result[k].fileIndex + '\')"><span class="label label-default">' + result[k].fileName + '</span></li>');
                                                    }
                                                }
                                            })
                                            .start();
                                    });
                                    $("#openHuiShenModal").modal('show');

                                });
                            } else {
                                $(this).hide();
                            }
                        });
                        if (IsEmpty(cmx.g.examId)) {
                            $('#cmx-huishen-submit').show();
                            $('#cmx-huishen-upload-files').hide();
                        } else {
                            $('#cmx-huishen-submit').hide();
                            $('#cmx-huishen-upload-files').show();
                        }
                    } else {
                        $('#cmx-huishen-submit').show();
                        $('#cmx-huishen-upload-files').hide();
                    }
                }
                send.go();
            })
            .start();
    } else {
        location.href = '/error.html';
        return;
    }
    // $(".expert").show();
    $(".third-institution").show();
    $(".huishen-institution").hide();
    $('#radio-thirdParty').off('click'); //change
    $('#radio-thirdParty').on('click', function () {
        // $(".expert").hide();
        $(".third-institution").show();
        $(".huishen-institution").hide();
    });
    // $('#radio-selectExpert').off('click');
    // $('#radio-selectExpert').on('click', function () {
    //     // $(".expert").show();
    //     $(".third-institution").hide();
    //     $(".huishen-institution").hide();
    // });
    $('#radio-huishen').off('click');
    $('#radio-huishen').on('click', function () {
        $(".huishen-institution").show();
        $(".third-institution").hide();
        // $(".expert").hide();
        setTimeout(function () {
            if (isInitFile)
                return;
            isInitFile = true;
            webUploadFile({
                "id": "#uploadzhuanjiafujian", //选择器内自动生成上传文件按钮
                "label": "上传会审意见文件", //按钮文字
                "multiple": false, //多选，值为true表示多选，false表示单选
                "image": false, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": 50, //起文相关，除了正文之外的那些东西，也就是自己上传的附件
                success: function (param, response) {
                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
                    var fileclassid = '501';
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('.dddd ul').prepend([
                        '<li id="cmx-file-index-id-' + fileindexid + '" class="list-group-item btn-group" file-index="' + fileindexid + '">',
                        '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                        response.data[0].fileoriginalname,
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-trash" aria-hidden="true"></i>',
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="renameThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-edit" aria-hidden="true"></i>',
                        '</button>',
                        '<div class="clearfix"></div>',
                        '</li>'
                    ].join(''));
                },
                error: function () {
                    //集中处理过了
                }
            });
        }, 500);
    });
    var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    //返回
    $('#cmx-button-return').on('click', function () {
        var back_url = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
        if (back_url.indexOf('&back=-1') >= 0) {
            window.location.href = back_url;
        } else {
            window.location.href = back_url + '&back=-1';
        }
    });
    var func_init_zhuanjia_page = function () {
        GetZhuanjiaFunc.getData();
        $('#zhuanjia-page .first').unbind('click');
        $('#zhuanjia-page .first').bind('click', function () {
            GetZhuanjiaFunc.pageNum1 = 1;
            GetZhuanjiaFunc.getData();
        });
        $('#zhuanjia-page .last').unbind('click');
        $('#zhuanjia-page .last').bind('click', function () {
            GetZhuanjiaFunc.pageNum1 = GetZhuanjiaFunc.pageCount1;
            GetZhuanjiaFunc.getData();
        });
        $('#zhuanjia-page .pre').unbind('click');
        $('#zhuanjia-page .pre').bind('click', function () {
            if (GetZhuanjiaFunc.pageNum1 > 1) {
                GetZhuanjiaFunc.pageNum1--;
                GetZhuanjiaFunc.getData();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#zhuanjia-page .next').unbind('click');
        $('#zhuanjia-page .next').bind('click', function () {
            if (GetZhuanjiaFunc.pageNum1 < GetZhuanjiaFunc.pageCount1) {
                GetZhuanjiaFunc.pageNum1++;
                GetZhuanjiaFunc.getData();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });
    };
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
    //加载选择专家模态框
    $("#expert-modal").load(getExpertList, function () {
        func_init_zhuanjia_page();
        // 数字字典加载业务范围
        new cmx.process()
            .turn('buildDataDic', {
                element: $('#yewufanwei'),
                hasAll: true
            }).cfinally(function () { }).start();
        $('#cmx-expert-search').unbind('click');
        $('#cmx-expert-search').bind('click', function () {
            GetZhuanjiaFunc.pageNum1 = 1;
            GetZhuanjiaFunc.getData();
        });
        $('#cmx-expert-delete').unbind('click');
        $('#cmx-expert-delete').bind('click', function () {
            GetZhuanjiaFunc.pageNum1 = 1;
            $('#cmx-national-protect-name').val('');
            $('#cmx-unit-name').val('');
            $('#cmx-major').val('');
            $("#yewufanwei").val('-1');
        });
        $("#click-expert").unbind('click');
        $("#click-expert").bind('click', function () {
            $("#cmx-expert-List").off('shown.bs.modal');
            $("#cmx-expert-List").on('shown.bs.modal', function () {
                //获取专家列表
                GetZhuanjiaFunc.getData();
            });
            $("#cmx-expert-List").modal('show');
        });
        var num = true;
        $('.show-info').on('click', function () {
            if (num == true) {
                num = false;
                show_condition();
            } else {
                num = true;
                hide_condition();
            }
        });
    });
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
            });
            $("#cmx-institution-Listmodal").modal('show');
        });
    });

    // $("#cmx-confirm-zhuanfa").on('click', function () {
    //     new cmx.process()
    //         .turn('callajax', {
    //             url: api_ea + '/' + getApplyApi(_projectNum) + '/goTransActFrame',
    //             data: JSON.stringify({
    //                 token: getData('token'), //类型：String  必有字段  备注：无
    //                 applyId: _applyId,
    //                 projectNum: _projectNum
    //             }),
    //             type: 'POST'
    //         })
    //         .turn(function (prevModelData, send, abort) {
    //             if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
    //                 var data = prevModelData.data;
    //                 showAlert({
    //                     type: 'success',
    //                     content: '提交转发文成功'
    //                 });
    //                 setTimeout(function () {
    //                     var paramStr = '?type=1&status=' + data.status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    //                     location.href = '/app/f-gover-approval/nation/zhuanfawen.html' + paramStr;
    //                 }, 1000);
    //             }
    //         })
    //         .start();
    // });

    $("#cmx-confirm-fazheng").on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/' + getApplyApi(_projectNum) + '/docompletTaskArchaeology',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    acceptFlag: '1', //1是办结，2是从考古处虚拟账号转办给别人
                    applyId: _applyId,
                    projectNum: _projectNum,
                    pfFormData: [{
                        remark: ""
                    }]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    showAlert({
                        type: 'success',
                        content: '发送成功'
                    });
                    setTimeout(function () {
                        // var paramStr = '?type=1&status=' + data.status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
                        // history.go(-1);
                        location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                    }, 1000);
                }
            })
            .start();
    });

    //确认进行专家会审
    $("#cmx-confirm-trial").on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/' + getApplyApi(_projectNum) + '/chooseExpert',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    examClass: 3, //专家或者评估机构标识1：专家 2：评估机构
                    exportIds: '', //专家或评估机构id，以逗号分隔
                    applyId: _applyId,
                    projectNum: _projectNum,
                    roleId: 'RZJ0000001',
                    opinion: ''
                }),
                type: 'POST'
            }).turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '提交成功'
                    });
                    setTimeout(function () {
                        putData('gobacktohuishen', 1);
                        location.reload();
                    }, 1000);
                    send.go();
                } else {
                    abort('');
                }
            })
            .start();
    });

    $("#cmx-button-confirm").on('click', function () {
        //转办
        if ($('#cmx-branchTabs').hasClass("active")) {
            if ($('#cmx-zhuanjiajigou-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '意见不能超过500字'
                });
                return;
            }
            new cmx.process()
                .turn('selectUserRole', {
                    userId: $("#cmx-zhuanjiajigou-person").attr("value")
                })
                .turn(function (prevModelData, send, abort) {
                    cmx.g.select_role = prevModelData;
                    send.tomodel({
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            acceptFlag: "2", //0退回 1受理 2转派 3一次性补正或不予受理
                            applyId: _applyId,
                            projectNum: _projectNum,
                            pfFormData: [{
                                remark: $("#cmx-zhuanjiajigou-remark").val()
                            }],
                            ptnFormData: [{
                                noticeType: "" //通知书类型
                            }],
                            nextTaskUser: $("#cmx-zhuanjiajigou-person").attr("value"), //$("#cmx-chuyuan-person").attr("value"),
                            backToSecretaryFlag: "0",
                            roleId: cmx.g.select_role
                        })
                    }).go();
                })
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/docompletTaskArchaeology',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        acceptFlag: '2', //1是办结，2是从考古处虚拟账号转办给别人
                        applyId: _applyId,
                        projectNum: _projectNum,
                        nextTaskUser: $("#cmx-zhuanjiajigou-person").attr("value"),
                        roleId: cmx.g.select_role
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '转办成功'
                        });
                        setTimeout(function () {
                            // history.go(-1);
                            window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                    }
                    send.go();
                })
                .start();
        }
        //选专家
        if ($("#cmx-select-experts").hasClass('active')) {
            //选择评估机构
            if ($('input:radio[name="type1"]:checked').val() == 1) {
                if ($('#cmx-institution-remark').val().length > 500) {
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
                        url: api_ea + '/' + getApplyApi(_projectNum) + '/chooseExpert',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            examClass: 2, //专家或者评估机构标识0：专家 1：评估机构
                            exportIds: _keys.join(','), //专家或评估机构id，以逗号分隔
                            applyId: _applyId,
                            projectNum: _projectNum,
                            roleId: 'RPG0000001',
                            opinion: $("#cmx-institution-remark").val()
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
                            }, 1000);
                            send.go();
                        } else {
                            abort('');
                        }
                    }).start();
            }
            //选择会审
            if ($('input:radio[name="type1"]:checked').val() == 2) {
                if (!IsEmpty(getFileListForSave(cmx.g.filelinkfileclass)[0].fileIndex)) {
                    var ss = [{ //类型：Object  必有字段  备注：无
                        examId: cmx.g.examId,
                        registerNum: '',
                        serialNum: '',
                        apprItem: _projectNum,
                        applyId: _applyId,
                        expertResults: '', //专家评审意见
                        remark: ''
                    }];
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaPubDiscussOpinion/submitInfoByExport',
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
                                        content: '提交成功'
                                    });
                                    setTimeout(function () {
                                        // window.location.href = '/app/f-gover-approval/nation/country-haveToDo.html?nowid='+GetUrlParamString('nowid');
                                        location.reload();
                                    }, 1000);
                                } else {
                                    showAlert({
                                        type: 'error',
                                        content: result.msg
                                    });
                                }
                            },
                            error: function () {
                                showAlert({
                                    type: 'error',
                                    content: '提交失败'
                                });
                            },
                            complete: function () { }
                        })
                        .start();
                } else if ($('#cmx-huishen-submit').is(':visible')) {
                    $("#cmx-confirm-trial").trigger('click');
                } else {
                    showAlert({
                        type: 'error',
                        content: '请上传会审意见文件'
                    });
                }
            }
        }
        // //确定转发文
        // if ($("#cmx-tabsForwardingText").hasClass('active')) {

        // }
    });
    if (IsEmpty($("#cmx-person-modal").html())) {
        $("#cmx-person-modal").load(getSelectPerson, function () {
            $("#cmx-zhuanjiajigou-chooseperson").unbind('click');
            $("#cmx-zhuanjiajigou-chooseperson").bind('click', function () {
                $("#cmxAddPerson").off('shown.bs.modal');
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
                            $('#cmx-sendperson').selectpicker('refresh');
                        })
                        .start();
                });
                $("#cmxAddPerson").modal("show");
                $("#cmx-person-save").off('click');
                $("#cmx-person-save").on('click', function () {
                    if ($("#cmx-TabsOne").hasClass("active")) {
                        $("#cmx-zhuanjiajigou-person").val($("#cmx-generalperson input:checked").parent().text());
                        $("#cmx-zhuanjiajigou-person").attr("value", $("#cmx-generalperson input:checked").val());
                        $("#cmx-zhuanjiajigou-person").attr("instid", $("#cmx-generalperson input:checked").attr("instid"));
                        $("#cmxAddPerson").modal("hide");
                    }
                    if ($("#cmx-TabsTwo").hasClass("active")) {
                        $("#cmx-zhuanjiajigou-person").val($("#cmx-sendperson option:checked").text());
                        $("#cmx-zhuanjiajigou-person").attr("value", $("#cmx-sendperson option:checked").val());
                        $("#cmx-zhuanjiajigou-person").attr("instid", $("#cmx-sendperson option:checked").attr("instid"));
                        $("#cmxAddPerson").modal("hide");
                    }
                });
            });
        });
    }
});


var GetZhuanjiaFunc = {};
GetZhuanjiaFunc.pageNum1 = 1;
GetZhuanjiaFunc.pageCount1 = 0;
GetZhuanjiaFunc.searchWords11 = ''; //姓名
GetZhuanjiaFunc.searchWords12 = ''; //工作单位
GetZhuanjiaFunc.searchWords13 = ''; //专业特长
GetZhuanjiaFunc.getData = function () {
    GetZhuanjiaFunc.searchWords11 = $('#cmx-national-protect-name').val();
    GetZhuanjiaFunc.searchWords12 = $('#cmx-unit-name').val();
    GetZhuanjiaFunc.searchWords13 = $('#cmx-major').val();
    GetZhuanjiaFunc.bussClass = $("#yewufanwei").val();
    $("#cmx-experts-list").html('');
    var _otherExport = cmx.g.export.keySet();
    _otherExport.concat(cmx.g.haveexport.keySet());
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/user/aaExpertinfo/selectForChooseExport',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                pageNumber: GetZhuanjiaFunc.pageNum1,
                pageSize: 15,
                formData: {
                    userName: GetZhuanjiaFunc.searchWords11,
                    unitName: GetZhuanjiaFunc.searchWords12,
                    professionName: GetZhuanjiaFunc.searchWords13,
                    bussClass: GetZhuanjiaFunc.bussClass
                },
                selectedExports: _otherExport.join(',')
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            var result = prevModelData;
            if (result.state == '200' && !IsEmpty(result.data) && result.data != 'null') {
                var html = "";
                var data = result.data.dataList;
                for (var i = 0; i < data.length; i++) {
                    html += '<tr>' +
                        '<td><input type="checkbox" value="' + data[i].userId + '" ' + (IsEmpty(cmx.g.export.get(data[i].userId)) ? '' : 'checked') + '></td>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + data[i].userName + '</td>' +
                        '<td>' + data[i].dealCount + '</td>' +
                        '<td>' + data[i].dealedCount + '</td>' +
                        '<td>' + data[i].professionName + '</td>' +
                        '<td>' + data[i].unitName + '</td>' +
                        '<td>' + data[i].telNo + '</td>' +
                        '<td>' + data[i].email + '</td>' +
                        '</tr>';
                }
                $("#cmx-experts-list").append(html);
                $('#zhuanjia-page .nowpage').html(result.data.pageNumber);
                $('#zhuanjia-page .totalpage').html(result.data.pages);
                GetZhuanjiaFunc.pageCount1 = result.data.pages;

                //保存已选
                $("#cmx-experts-list input").each(function (index) {
                    var _gongyi = '';
                    $(this).on('click', function () {
                        if ($(this).is(":checked")) {
                            _gongyi = data[index].userName + '<span style="color:#aaaaaa;">(待发送)</span>';
                            cmx.g.export.put(data[index].userId, _gongyi);
                        } else {
                            cmx.g.export.remove(data[index].userId);
                        }
                        var _keys = cmx.g.export.keySet();
                        $(".already-choose-export").html('');
                        for (var o = 0; o < _keys.length; o++) {
                            $(".already-choose-export").append([
                                '<div class="btn-group btn-group-xs padding-5" role="group" export-id="' + _keys[o] + '">',
                                '<button type="button" class="btn btn-outline btn-default">' + cmx.g.export.get(_keys[o]) + '</button>',
                                '<button type="button" class="btn btn-outline btn-default" onclick="cancelExport(\'' + _keys[o] + '\')">取消</button>',
                                '</div>'
                            ].join(''));
                        }
                    });
                });
                $("#cmx-export-confirm").off('click');
                $("#cmx-export-confirm").on('click', function () {
                    var _self = $(this);
                    var _keys = cmx.g.export.keySet();
                    $("#cmx-chooseexport").html('');
                    for (var o = 0; o < _keys.length; o++) {
                        $("#cmx-chooseexport").append([
                            '<div class="btn-group btn-group-xs padding-5" role="group" export-id="' + _keys[o] + '">',
                            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.export.get(_keys[o]) + '</button>',
                            '<button type="button" class="btn btn-outline btn-default" onclick="cancelExport(\'' + _keys[o] + '\')">取消</button>',
                            '</div>'
                        ].join(''));
                    }

                    // $("#cmx-chooseexport").attr('export-id', cmx.g.exportId);
                    $("#cmx-expert-List").modal('hide');
                });
            } else {
                abort('获取专家列表失败');
            }
        })
        .start();
};
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
                        $("#cmx-institution-list tr").each(function(){
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

function openPingshen(_examId, examClass) {
    $("#pingshen-modal").off('show.bs.modal');
    $("#pingshen-modal").on('show.bs.modal', function () {
        var paramStr = '?from=iframe&isedit=0&pingshen=1&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum + '&examId=' + _examId;
        var _url = getApplyUrl(_projectNum);
        $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
        $('#cmx-form').load(function () {
            $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() - 80);
        });
        var _pingshenurl = '';
        if (examClass == '2') {
            _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
        } else {
            _pingshenurl = '/app/f-gover-approval/inspection/subpage/56008-b-yijian.html';
        }
        $('#cmx-form-pingshen').attr("src", IsEmpty(_pingshenurl) ? '/error.html' : (_pingshenurl + paramStr));
        $('#cmx-form-pingshen').load(function () {
            $('#cmx-form-pingshen')[0].contentWindow.setClientHeight(getClientHeight() - 80);
        });
    });
    $('#pingshen-modal').modal('show');
}

function switchExpertList(ev, ele, type) {
    if (type == 1) {
        $('#cmx-pingshen-bulleted-btn').removeClass('btn-info').addClass('btn-default');
        $('#cmx-pingshen-grid-btn').removeClass('btn-default').addClass('btn-info');
        $('#cmx-pingshen-bulleted').hide();
        $('#cmx-pingshen-grid').show();
        $('#cmx-copy-zhuanjia-yijian').attr('disabled', true);
    } else {
        $('#cmx-pingshen-grid-btn').removeClass('btn-info').addClass('btn-default');
        $('#cmx-pingshen-bulleted-btn').removeClass('btn-default').addClass('btn-info');
        $('#cmx-pingshen-grid').hide();
        $('#cmx-pingshen-bulleted').show();
        $('#cmx-copy-zhuanjia-yijian').attr('disabled', false);
        copyText('#cmx-copy-zhuanjia-yijian', $('#cmx-pingshen-bulleted').text());
    }
}

function handleExpertDealList(data) {
    $('#cmx-pingshen-bulleted').html('');
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if (getData('role') == 'inspection' && nowZhuanjiaId.indexOf(data[i].exportId) < 0) {
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
    if (examClass == '2') {
        json_data = '/data/app/f-gover-approval/inspection/kaogu-disanfang.json';
    } else {
        json_data = '/data/app/f-gover-approval/inspection/56008-b-yijian.json';
    }
    if (!IsEmpty(json_data) && data.dealFlag == '4') {
        var third_file_html = '';
        var export_file_html = '';
        if (data.examClass == '2') {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPubFile/getExportFilesListByParam',
                    data: JSON.stringify({
                        token: getData('token'),
                        apprItem: _projectNum,
                        applyId: _applyId,
                        exportId: data.exportId,
                        fileClass: "501",
                        examId: data.examId
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
                    url: api_ea + '/eaPubFile/getExportFilesListByParam',
                    data: JSON.stringify({
                        token: getData('token'),
                        apprItem: _projectNum,
                        applyId: _applyId,
                        exportId: data.exportId,
                        fileClass: "502",
                        examId: data.examId
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
                    '<span class="label label-warning margin-right-10">' + data.examClassName + '</span>',
                    '<span class="margin-right-10">处理人：' + data.exportName + '</span>',
                    export_file_html, // 下载专家附件
                    '<psan class="margin-right-10 pull-right ">评审时间：' + data.apprDate + '</span>',
                    '</p>',
                    '</td>',
                    '<td style="border-left: none;width: 10px">\n</td>',
                    '</tr>'
                ].join('');
                for (var j = 0; j < rdata.length; j++) {
                    if (rdata[j].type == 'separator') {
                        continue;
                    } else if (rdata[j].type == "special") {
                        continue;
                    } else if (rdata[j].type == "file") {
                        html = html + '<tr><td style="width:200px;">' + rdata[j].name + '&nbsp;&nbsp;</td><td style="border-right: none">' + third_file_html + '</td><td style="border-left: none;width: 10px">\n</td></tr>';
                    } else {
                        html = html + '<tr><td style="width:200px;">' + rdata[j].name + '&nbsp;&nbsp;</td><td style="border-right: none">' + data[rdata[j].key] + '</td><td style="border-left: none;width: 10px">\n</td></tr>';
                    }
                }
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

function openReminder(data) {
    console.log(data)
    // $("#reminderModal").off('show.bs.modal');
    // $("#reminderModal").on('show.bs.modal',function(){

    // });
}

function hide_condition() {
    $('.condition-info').css('display', 'none');
    $('#show-hide-info').html('更多条件' +
        '<i class="icon wb-chevron-down" aria-hidden="true"></i>');
}

function show_condition() {
    $('.condition-info').css('display', 'block');
    $('#show-hide-info').html('收起条件' +
        '<i class="icon wb-chevron-up" aria-hidden="true"></i>');
}

function cancelExport(_exportId) {
    cmx.g.export.remove(_exportId);
    $('#cmx-experts-list input[value="' + _exportId + '"]').attr("checked", false);
    var _keys = cmx.g.export.keySet();
    $("#cmx-chooseexport").html('');
    for (var o = 0; o < _keys.length; o++) {
        $("#cmx-chooseexport").append([
            '<div class="btn-group btn-group-xs padding-5" role="group" export-id="' + _keys[o] + '">',
            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.export.get(_keys[o]) + '</button>',
            '<button type="button" class="btn btn-outline btn-default" onclick="cancelExport(\'' + _keys[o] + '\')">取消</button>',
            '</div>'
        ].join(''));
    }
    $(".already-choose-export").html('');
    for (var o = 0; o < _keys.length; o++) {
        $(".already-choose-export").append([
            '<div class="btn-group btn-group-xs padding-5" role="group" export-id="' + _keys[o] + '">',
            '<button type="button" class="btn btn-outline btn-default">' + cmx.g.export.get(_keys[o]) + '</button>',
            '<button type="button" class="btn btn-outline btn-default" onclick="cancelExport(\'' + _keys[o] + '\')">取消</button>',
            '</div>'
        ].join(''));
    }
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
                        '<tr><td>省份</td><td>' + prevModelData.data.provinceName + '</td></tr>',
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