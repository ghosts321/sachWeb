// 选择专家、转发文
cmx.g.regist('export', new HashMap());
cmx.g.regist('institution', new HashMap());
cmx.g.regist('haveexport', new HashMap());
cmx.g.regist('haveinstitution', new HashMap());
cmx.g.regist('isBelongSachisBelongSach', []);
cmx.g.regist('belongInst');
cmx.g.regist('recordId');
cmx.g.regist('certificateId', '0');
var _projectNum = '';
var _applyId = '';
var _status = '';
$(document).ready(function () {
    $('#cmx-handle-remark').val('同意颁发证照');
    $('.start').find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
        new cmx.process()
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
                    $("#cmx-leader-name").val(data.createUserName);
                    $("#cmx-leader-num").val(data.createUserId);
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

    var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    $('.time').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });

    //返回
    $('#cmx-button-return').on('click', function () {
        var back_url = document.referrer;
        if (back_url.indexOf('&back=-1') >= 0) {
            window.location.href = back_url;
        } else {
            window.location.href = back_url + '&back=-1';
        }
    });

    // 根据选择的发证选项展示不同发证内容，这里应该需要一个单独的接口来给页面赋值
    $('input[type=radio][name=type1]').change(function () {
        switch (this.value) {
            case '1':
                $("#cmx-licence").show();
                $("#banfaDiv").show();
                $('#bubanDiv').hide();
                $('#cmx-handle-remark').val('同意颁发证照');
                // new cmx.process()
                //     .turn('callajax', {
                //         url: api_ea + '/eaAeAcpNorApply/getLiceNumberByParam',
                //         data: JSON.stringify({
                //             token: getData('token'), //类型：String  必有字段  备注：无
                //             manageType: '1', //类型：String  必有字段  备注：申请ID
                //         }),
                //         type: 'POST'
                //     })
                //     .turn(function (prevModelData, send, abort) {
                //         if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                //             //返回值不知道是啥，请秀秀自行填写   老卢，你很强势啊
                //             $('#cmx-certificate-num1').val(prevModelData.data);
                //         }
                //     })
                //     .start();
                break;
            case '2':
                $("#cmx-licence").show();
                $("#bubanDiv").show();
                $('#banfaDiv').hide();
                $('#cmx-handle-remark').val('同意补办存档');
                // new cmx.process()
                //     .turn('callajax', {
                //         url: api_ea + '/eaAeAcpNorApply/getLiceNumberByParam',
                //         data: JSON.stringify({
                //             token: getData('token'), //类型：String  必有字段  备注：无
                //             manageType: '2', //类型：String  必有字段  备注：申请ID
                //         }),
                //         type: 'POST'
                //     })
                //     .turn(function (prevModelData, send, abort) {
                //         if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                //             $('#cmx-certificate-num2').val(prevModelData.data);
                //         }
                //     })
                //     .start();
                break;
            case '3':
                $("#cmx-licence").hide();
                $('#cmx-handle-remark').val('不同意发掘');
                break;
        }
    });
    var date = new Date;
    var year = date.getFullYear();
    $('.cmx-year').val(year);
    cmx.g.certificateId = cmx.g.certificateId + 1;
    $('.cmx-certificate-num').val(cmx.g.certificateId);

    $("#cmx-button-confirm").on('click', function () {
        var ipaFormData = {};
        //同意颁发证照
        if ($("input[name='type1'][value='1']").is(":checked")) {
            if (IsEmpty($('#cmx-licence-type1-year').val())) {
                showAlert({
                    type: 'error',
                    content: '字不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-certificate-num1').val())) {
                showAlert({
                    type: 'error',
                    content: '号不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-fajue-name').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘对象名称不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-fajue-area').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘面积不能为空'
                });
                return;
            }
            var reg = /^[0-9]+.?[0-9]*$/;
            if (!reg.test($("#cmx-fajue-area").val())) {
                showAlert({
                    type: 'error',
                    content: '发掘面积只能是数字'
                });
                return;
            }
            // if (IsEmpty($('#cmx-fajue-grave').val())) {
            //     showAlert({
            //         type: 'error',
            //         content: '墓葬不能为空'
            //     });
            //     return;
            // }
            if(!IsEmpty($('#cmx-fajue-grave').val())){
                var reg = /^[0-9]+.?[0-9]*$/;
                if (!reg.test($("#cmx-fajue-grave").val())) {
                    showAlert({
                        type: 'error',
                        content: '墓葬数量只能是数字'
                    });
                    return;
                }
            }
            if (IsEmpty($('#cmx-fajue-begintime').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘开始时间不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-fajue-endtime').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘结束时间不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-leader-name').val())) {
                showAlert({
                    type: 'error',
                    content: '领队名称不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-leader-num').val())) {
                showAlert({
                    type: 'error',
                    content: '领队编号不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-publishdate').val())) {
                showAlert({
                    type: 'error',
                    content: '颁发日期不能为空'
                });
                return;
            }
            ipaFormData = {
                manageType: '1', //类型：String  必有字段  备注：申请ID
                liceType: $('#cmx-licence-type1').val(),
                year: $('#cmx-licence-type1-year').val(),
                liceNumber: $('#cmx-certificate-num1').val(),
                appObjAddress: $('#cmx-fajue-name').val(),
                appObjArea: $("#cmx-fajue-area").val(), //发掘面积
                appToNumber: $('#cmx-fajue-grave').val(),
                beginTime: $("#cmx-fajue-begintime").val(), //发掘开始日期
                finishTime: $("#cmx-fajue-endtime").val(), //发掘结束日期
                appExpTime: $("#cmx-fajue-begintime").val() + '至' + $("#cmx-fajue-endtime").val(),
                appLeader: $("#cmx-leader-name").val(), //领队姓名
                appLeaderId: $("#cmx-leader-num").val(), //领队编号
                promDate: $("#cmx-publishdate").val(), //颁布日期
                applyId: _applyId,
                projectNum: _projectNum,
                opinion:  $('#cmx-handle-remark').val()
            }
        }
        // 同意补报存档
        if ($("input[name='type1'][value='2']").is(":checked")) {
            if (IsEmpty($('#cmx-licence-type2-year').val())) {
                showAlert({
                    type: 'error',
                    content: '字不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-certificate-num2').val())) {
                showAlert({
                    type: 'error',
                    content: '号不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-fajue-name').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘对象名称不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-fajue-area').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘面积不能为空'
                });
                return;
            }
            var reg = /^[0-9]+.?[0-9]*$/;
            if (!reg.test($("#cmx-fajue-area").val())) {
                showAlert({
                    type: 'error',
                    content: '发掘面积只能是数字'
                });
                return;
            }
            // if (IsEmpty($('#cmx-fajue-grave').val())) {
            //     showAlert({
            //         type: 'error',
            //         content: '墓葬不能为空'
            //     });
            //     return;
            // }
            if(!IsEmpty($('#cmx-fajue-grave').val())){
                var reg = /^[0-9]+.?[0-9]*$/;
                if (!reg.test($("#cmx-fajue-grave").val())) {
                    showAlert({
                        type: 'error',
                        content: '墓葬数量只能是数字'
                    });
                    return;
                }
            }
            if (IsEmpty($('#cmx-fajue-begintime').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘开始时间不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-fajue-endtime').val())) {
                showAlert({
                    type: 'error',
                    content: '发掘结束时间不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-leader-name').val())) {
                showAlert({
                    type: 'error',
                    content: '领队名称不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-leader-num').val())) {
                showAlert({
                    type: 'error',
                    content: '领队编号不能为空'
                });
                return;
            }
            if (IsEmpty($('#cmx-publishdate').val())) {
                showAlert({
                    type: 'error',
                    content: '颁发日期不能为空'
                });
                return;
            }
            ipaFormData = {
                manageType: '2', //类型：String  必有字段  备注：申请ID
                liceType: $('#cmx-licence-type2').val(),
                year: $('#cmx-licence-type2-year').val(),
                liceNumber: $('#cmx-certificate-num2').val(),
                appObjAddress: $('#cmx-fajue-name').val(),
                appObjArea: $("#cmx-fajue-area").val(), //发掘面积
                appToNumber: $('#cmx-fajue-grave').val(),
                beginTime: $("#cmx-fajue-begintime").val(), //发掘开始日期
                finishTime: $("#cmx-fajue-endtime").val(), //发掘结束日期
                appExpTime: $("#cmx-fajue-begintime").val() + '至' + $("#cmx-fajue-endtime").val(),
                appLeader: $("#cmx-leader-name").val(), //领队姓名
                appLeaderId: $("#cmx-leader-num").val(), //领队编号
                promDate: $("#cmx-publishdate").val(), //颁布日期
                applyId: _applyId,
                projectNum: _projectNum,
                opinion:  $('#cmx-handle-remark').val()
            }
        }
        // 不同意发掘
        if ($("input[name='type1'][value='3']").is(":checked")) {
            ipaFormData = {
                manageType: '3', //类型：String  必有字段  备注：申请ID
                liceType: 'error',
                year: '',
                liceNumber: '',
                appObjAddress: '',
                appObjArea: '',
                appToNumber: '',
                beginTime: '',
                finishTime: '',
                appExpTime: '',
                appLeader: '',
                appLeaderId: '',
                promDate: '',
                applyId: _applyId,
                projectNum: _projectNum,
                opinion:  $('#cmx-handle-remark').val()
            }
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAeAcpNorApply/docompletedCompleteTask',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: [ipaFormData]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '发证成功'
                    });
                    setTimeout(function () {
                        // history.go(-1);
                        window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                    }, 1000);
                }
                send.go();
            })
            .start();
    });

    // 选取领队的接口写在这里，这个接口还没有
    $("#cmx-select-leader").on('click', function () {
        new cmx.process()
            .turn('buildLeaderinfomodal')
            .start();
    })
});

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

var chooseLeaderFunc = {}; //用于选取领队模态框的数据

chooseLeaderFunc.pageNum1 = 1;
chooseLeaderFunc.pageCount1 = 0;
chooseLeaderFunc.searchWords11 = '';
chooseLeaderFunc.searchWords12 = '';
chooseLeaderFunc.getLeaderunit = function (parm) {
    chooseLeaderFunc.searchWords11 = $('#cmx-leader-unit-name').val();
    chooseLeaderFunc.searchWords12 = $('#cmx-leader-keyword-name').val();
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/user/aaArchaeologyleader/getPageDataByParam',
            data: {
                token: getData('token'),
                pageNumber: chooseLeaderFunc.pageNum1,
                pageSize: 15,
                userName: chooseLeaderFunc.searchWords11,
                unitName: chooseLeaderFunc.searchWords12,
            },
            type: 'POST',
            jsonheader: false
        })
        .turn('getLeaderunit', parm)
        .start();
};
cmx.route.model({
    index: 'getLeaderunit',
    handle: function (parameter, prevModelData, send, abort) {
        if (prevModelData.state == '200') {
            send.toviewresolve({
                parameter: parameter,
                prevModelData: prevModelData
            }).go();
        }
    }
});
cmx.route.view({
    index: 'getLeaderunit',
    resolve: function (result) {
        console.log(result);
        var param = result.prevModelData.data;
        var data = param.dataList;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-leader-info-tbody").html('');
        for (var i = 0; i < data.length; i++) {
            var tr_html = '';
            var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
            tr_html = ['<tr>',
                '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
                '<td>' + data[i].userName + '</td>',
                '<td>' + data[i].leaderId + '</td>',
                '<td>' + data[i].unitName + '</td>',
                '</tr>'
            ].join("");
            $("#cmx-leader-info-tbody").append(tr_html);
        }
        $('#cmx-leader-Pagination .nowpage').html(pageNumber);
        $('#cmx-leader-Pagination .totalpage').html(param.pages);
        chooseLeaderFunc.pageCount1 = param.pages;

        $("#cmx-leader-info-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-leader-info-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                console.log(index);
                console.log(data[index]);
                var unitdata = data[index];
                cmx.g.leadername = data[index].userName;
                cmx.g.leaderid = data[index].leaderId;
                //cmx.g.danweiinstId = data[index].instId;
            });
        });

        $("#cmx-confirm-btn").unbind('click');
        $("#cmx-confirm-btn").bind('click', function () {
            if (IsEmpty(cmx.g.leadername)) {
                showAlert({
                    type: 'info',
                    content: '请选择一个领队'
                });
                return;
            }
            $("#cmx-leader-name").val(cmx.g.leadername);
            $("#cmx-leader-num").val(cmx.g.leaderid);
            $('#cmx-leader-select-modal').modal('hide');
        });
    },
    reject: function (data) {

    }
});


//构建模态框
cmx.route.model({
    index: 'buildLeaderinfomodal',
    handle: function (parameter, prevModelData, send, abort) {
        cmx.g.leadername = '';

        //初始化领队列表分页
        var func_init_nation_page = function () {
            chooseLeaderFunc.getLeaderunit(parameter);
            $('#cmx-leader-Pagination .first').unbind('click');
            $('#cmx-leader-Pagination .first').bind('click', function () {
                chooseLeaderFunc.pageNum1 = 1;
                chooseLeaderFunc.getLeaderunit(parameter);
            });
            $('#cmx-leader-Pagination .last').unbind('click');
            $('#cmx-leader-Pagination .last').bind('click', function () {
                chooseLeaderFunc.pageNum1 = chooseLeaderFunc.pageCount1;
                chooseLeaderFunc.getLeaderunit(parameter);
            });
            $('#cmx-leader-Pagination .pre').unbind('click');
            $('#cmx-leader-Pagination .pre').bind('click', function () {
                if (chooseLeaderFunc.pageNum1 > 1) {
                    chooseLeaderFunc.pageNum1--;
                    chooseLeaderFunc.getLeaderunit(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-leader-Pagination .next').unbind('click');
            $('#cmx-leader-Pagination .next').bind('click', function () {
                if (chooseLeaderFunc.pageNum1 < chooseLeaderFunc.pageCount1) {
                    chooseLeaderFunc.pageNum1++;
                    chooseLeaderFunc.getLeaderunit(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };


        $('#cmx-leader-select-modal').off('show.bs.modal');
        $('#cmx-leader-select-modal').on('show.bs.modal', function () {
            //分页操作绑定,初始化
            func_init_nation_page();
            //绑定搜索
            $('#cmx-leader-search').unbind('click');
            $('#cmx-leader-search').bind('click', function () {
                chooseLeaderFunc.pageNum1 = 1;
                chooseLeaderFunc.getLeaderunit(parameter);
            });
            //国保绑定清除
            $("#cmx-leader-delete").unbind('click');
            $("#cmx-leader-delete").bind('click', function () {
                $('#cmx-leader-unit-name').val('');
                $('#cmx-leader-keyword-name').val('');
                chooseLeaderFunc.pageNum1 = 1;
                chooseLeaderFunc.getLeaderunit(parameter);
            });
        });
        $('#cmx-leader-select-modal').modal('show');
    }
});

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