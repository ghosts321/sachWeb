var _projectNum = '';
var _applyId = '';
var _status = '';

cmx.g.regist('provincesName', '');
cmx.g.regist('networkNum', '');
cmx.g.regist('projectName', '');
cmx.g.regist('contactName', '');
cmx.g.regist('contactTel', '');
cmx.g.regist('recordId');
cmx.g.regist('ProvinceShenpi', ['56014_d', '56022_b', '56014-3_e']);
var nowZhuanjiaId = '';
$(document).ready(function () {
    if (GetUrlParamString('frompage') == 'zhuanfawen') {
        $('#cmx-button-return').html('关闭');
        //关闭
        $('#cmx-button-return').on('click', function () {
            window.opener = null;
            window.close();
        });
    } else {
        //返回
        $('#cmx-button-return').on('click', function () {
            var back_url = document.referrer;
            if (back_url.indexOf('&back=-1') >= 0) {
                window.location.href = back_url;
            } else {
                window.location.href = back_url + '&back=-1';
            }
        });
    }
    //申请信息
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
    } else {
        location.href = '/error.html';
        return;
    }
    if (_projectNum == '56022_c') {
        $('#cmx-timeLimit').hide();
    }
    if (getData('role') == 'province') {
        if (_projectNum == '56014_d' || _projectNum == '56022_b' || _projectNum == '56014-3_e') {
            $('#cmx-timeLimit').show();
        } else {
            $('#cmx-timeLimit').hide();
        }
    }
    var _p1 = '';
    if (getData('userId') == 'wenshushi') {
        _p1 = '&check=wss-xsjc';
    }
    var paramStr = '?from=iframe' + _p1 + '&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    //获取待办详情列表
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        var definstid = "";
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
                url: api_ea + '/' + getApplyApi(_projectNum) + '/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var _data = prevModelData.data;
                    if (!IsNull(_data.approveOptionList) && _data.approveOptionList.length > 0) {

                        $('#cmx-pifu-file').html((_data.approveOptionList[0].appOpinion == '1' ? '<h3>同意</h3>' : '<h3>不同意</h3>') + '<p>审批意见：' + _data.approveOptionList[0].opinions + '</p>');
                    }
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
                if (getData('role') != 'inspection') { //不是专家，显示办理信息
                    $('#cmx-banli-info').show();
                    $('#cmx-banli-info a').trigger('click');
                } else { //是专家，显示评审意见
                    nowZhuanjiaId = getData('userId');
                    $('#cmx-pingshen-title').show();
                }
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

                    //转发文信息
                    if (getData('role') == 'nation') {
                        if (data.eaPubBatchFileCount == 1) {
                            $("#cmx-zhuanfawen-title").show();
                            var paramStrUrl = '?from=iframe&justlook=1&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
                            var _urlStr = '/app/f-gover-approval/nation/zhuanfawen.html';
                            $('#cmx-zhuanfawen-form').attr("src", IsEmpty(_urlStr) ? '/error.html' : (_urlStr + paramStrUrl));
                            $('#cmx-zhuanfawen-form').load(function () {
                                $('#cmx-zhuanfawen-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
                            });
                        }
                    }

                    cmx.g.provincesName = prevModelData.data.provincesName;
                    cmx.g.networkNum = prevModelData.data.networkNum;
                    cmx.g.projectName = prevModelData.data.projectName;
                    cmx.g.contactName = prevModelData.data.contactName;
                    cmx.g.contactTel = prevModelData.data.contactTel;
                    cmx.g.acceptTime = prevModelData.data.acceptTime;
                    cmx.g.hostPerson = prevModelData.data.hostPersonName;
                    $('.n2-p1').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                    $('.n1-p4').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                    $('.n3-p1').html(data.accClass == '12' ? (cmx.g.provincesName + '文物局') : data.createUserName);
                    if (prevModelData.data.status.trim() == '902' ||
                        prevModelData.data.status.trim() == '210' || prevModelData.data.status.trim() == '209' ||
                        prevModelData.data.status.trim() == '503' || prevModelData.data.status.trim() == '504' || prevModelData.data.status.trim().indexOf('W') >= 0) {
                        $('.n2-state').removeClass('current');
                        $('.n2-state').addClass('done');
                        $('.n3-state').removeClass('disabled');
                        $('.n3-state').addClass('done');
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaPubApplyerAppraise/getDataByParam',
                                data: {
                                    token: getData('token'),
                                    projectNum: _projectNum,
                                    applyId: _applyId
                                },
                                jsonheader: false,
                                type: 'GET'
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data.length > 0) {
                                    if (getData('role') == 'province' || getData('role') == 'nation') {
                                        $('#cmx-pingjiafankui-title').show();
                                        $('input[name="pingjiafankui-p1"][value="' + prevModelData.data[0].appraise1 + '"]').attr("checked", 'checked');
                                        $('input[name="pingjiafankui-p2"][value="' + prevModelData.data[0].appraise2 + '"]').attr("checked", 'checked');
                                        $('input[name="pingjiafankui-p3"][value="' + prevModelData.data[0].appraise3 + '"]').attr("checked", 'checked');
                                        $('input[name="pingjiafankui-p4"][value="' + prevModelData.data[0].appraise4 + '"]').attr("checked", 'checked');
                                        $('input[name="pingjiafankui-p5"][value="' + prevModelData.data[0].appraise5 + '"]').attr("checked", 'checked');
                                        $('#pingjiafankui-p6').val(prevModelData.data[0].appraisedesc);
                                        $('#pingjiafankui-p6').attr('disabled', true);
                                        $('input[name="pingjiafankui-p1"]').attr('disabled', true);
                                        $('input[name="pingjiafankui-p2"]').attr('disabled', true);
                                        $('input[name="pingjiafankui-p3"]').attr('disabled', true);
                                        $('input[name="pingjiafankui-p4"]').attr('disabled', true);
                                        $('input[name="pingjiafankui-p5"]').attr('disabled', true);
                                        $('#pingjiafankui-p7').remove();
                                    }
                                } else {
                                    if (getData('role') == 'province') {
                                        $('#cmx-pingjiafankui-title').show();
                                        $('#pingjiafankui-p7').click(function () {
                                            if (IsEmpty($('input[name="pingjiafankui-p1"]:checked').val()) ||
                                                IsEmpty($('input[name="pingjiafankui-p2"]:checked').val()) ||
                                                IsEmpty($('input[name="pingjiafankui-p3"]:checked').val()) ||
                                                IsEmpty($('input[name="pingjiafankui-p4"]:checked').val()) ||
                                                IsEmpty($('input[name="pingjiafankui-p5"]:checked').val())) {
                                                showAlert({
                                                    type: 'error',
                                                    content: '请对满意度打分'
                                                });
                                                return;
                                            }
                                            if (IsEmpty($('#pingjiafankui-p6').val())) {
                                                showAlert({
                                                    type: 'error',
                                                    content: '请填写评价意见'
                                                });
                                                return;
                                            }
                                            new cmx.process()
                                                .turn('callajax', {
                                                    url: api_ea + '/eaPubApplyerAppraise/saveApplyerAppraise',
                                                    data: {
                                                        token: getData('token'),
                                                        projectNum: _projectNum,
                                                        applyId: _applyId,
                                                        appraise1: $('input[name="pingjiafankui-p1"]:checked').val(),
                                                        appraise2: $('input[name="pingjiafankui-p2"]:checked').val(),
                                                        appraise3: $('input[name="pingjiafankui-p3"]:checked').val(),
                                                        appraise4: $('input[name="pingjiafankui-p4"]:checked').val(),
                                                        appraise5: $('input[name="pingjiafankui-p5"]:checked').val(),
                                                        appraisedesc: $('#pingjiafankui-p6').val()
                                                    },
                                                    jsonheader: false,
                                                    type: 'POST'
                                                })
                                                .turn(function (prevModelData2, send2, abort2) {
                                                    if (!IsNull(prevModelData2) && prevModelData2.state == '200') {
                                                        showAlert({
                                                            type: 'success',
                                                            content: '保存成功'
                                                        });
                                                        setTimeout(function () {
                                                            location.reload();
                                                        }, 1000);
                                                    }
                                                }).start();
                                        });
                                    }
                                }
                            }).start();

                    }
                    if (data.eaPubWorkflowList && (getData('role') == 'nation' || (getData('role') == 'province' && $.inArray(_projectNum, cmx.g.ProvinceShenpi) >= 0))) {
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
                        $('#cmx-banli-title').show();
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
                    console.log(data);
                    console.log(545455)
                    if (data.length > 0) {
                        if (getData('role') == 'nation' || getData('role') == 'inspection' || (getData('role') == 'province' && $.inArray(_projectNum, cmx.g.ProvinceShenpi) >= 0)) {
                            $('#cmx-pingshen-title').show();
                            var _tag = '';
                            $('#cmx-pingshen-list .panel-body .pingshen-list').html('');
                            var _html = '';
                            for (var i in data) {
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
                                    '<div class="widget-body" style="min-height: 220px;" data-index="' + i + '">',
                                    '<span class="label label-warning">' + data[i].examClassName + '</span>',
                                    // (!IsEmpty(data[i].expertResultsName) ? '<span style="color:#bbb;float: right;font-size: 16px;font-weight: bolder;">'+data[i].expertResultsName+'</span>': '<span style="float: right;color:#222;font-size: 16px;font-weight: bolder;">' + data[i].dealFlagName + '</span>'),
                                    '<span style="color:#aaa;float: right;font-size: 16px;font-weight: bolder;">' + _tag + '</span>',
                                    '<h3 class="widget-title">',
                                    '<span class="drop-cap" data-toggle="tooltip" data-placement="top" data-trigger="click" data-original-title="' + _name + '" title="" aria-describedby="tooltip790178" style="font-size: 30px;overflow: hidden;text-overflow: ellipsis;height: 65px;white-space: nowrap;width: 100%;"><span class="cursorPointer" onclick="showExpertInfo(\'' + data[i].examClass + '\',\'' + data[i].exportId + '\');">' + _name + '</span></span>',
                                    '</h3>',
                                    '<p>' + (IsEmpty(data[i].apprDate) ? data[i].arriveDate : data[i].apprDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">停留时间：' + data[i].stopTime + '</span></p>',
                                    '<div class="widget-body-footer margin-top-10">',
                                    '<a class="btn btn-outline btn-default openPingshen" >查看详情</a>',
                                    '<a class="margin-left-5 btn btn-outline btn-default openReminder">催办</a>',
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
                            //查看专家意见详情
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
                            })
                        }
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
                if (getData('role') == 'nation' && !IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
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
                    }
                }
                send.go();
            })
            //展示三证，根据条件状态判断显示是否可进行修改
            .turn('callajax', {
                url: api_ea + '/eaPubThreenotice/getDataByParam',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ptnFormData: [{
                        applyId: GetUrlParamString('applyId'), //类型：String  必有字段  备注：申请ID
                        projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                    }]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                var showflag = false;
                //根据角色和状态判断是否显示三证
                var _role = getData('role');
                switch (_role) {
                    case 'nation':
                        showflag = true;
                        break;
                    case 'province':
                        if (_status == '301' || _status == '302' || _status == '493' || _status == '494' || _status == '874' || _status == '876' || _status == '864' || _status == '866' || _status == '980' || _status == '982') {
                            showflag = true;
                        }
                        break;
                    case 'guobaodanwei':
                    case 'bowuguan':
                    case 'zizhijigou':
                        if (_status == '301' || _status == '302' || _status == '505') {
                            showflag = true;
                        }
                        break;
                    case 'kaogufajuedanwei':
                        if (_status == '481' || _status == '482' || _status == '883' || _status == '884' || _status == '873' || _status == '872' || _status == '980' || _status == '982') {
                            showflag = true;
                        }
                        break;
                    case 'kaogulingdui':
                        if (_status == '499' || _status == '301' || _status == '302' || _status == '993' || _status == '994' || _status == '887' || _status == '886' || _status == '867' || _status == '868' || _status == '990' || _status == '992' || _status == '880' || _status == '882') {
                            showflag = true;
                        }
                        break;
                    default:
                        showflag = false;
                        break;
                }
                if (getData('roleId') == 'RSJ0000007')
                    showflag = true;
                if (showflag) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                        var data = prevModelData.data;
                        switch (data.noticeType) {
                            case '0': //不予受理
                                $('.n2-state').removeClass('current');
                                $('.n2-state').addClass('error');
                                $('.apply-title').html('审批拒绝');
                                $('.n2').show();
                                $('.n2-p0').html(data.approvalItemName);
                                $('.n2-p2').html(cmx.g.contactTel);
                                if (data.option1 == '1')
                                    $('.n2-p3').html('（√）根据法律法规和“三定”方案，不属于我局职责范围。<span class="color:#f2a654;">' + data.optionCont1 + '</span>');
                                if (data.option2 == '1')
                                    $('.n2-p4').html('（√）根据国务院文件，我局已经下放或取消该项许可。<span class="color:#f2a654;">' + data.optionCont2 + '</span>');
                                if (data.option3 == '1')
                                    $('.n2-p5').html('（√）根据我局行政审批指南，申报材料中有重要因素缺失或错误，具体为：<span class="color:#f2a654;">' + data.optionCont3 + '</span>');
                                if (data.option4 == '1')
                                    $('.n2-p6').html('（√）其他原因，具体为：<span class="color:#f2a654;">' + data.optionCont4 + '</span>');
                                $('.n2-p7').html(data.approvalItemName + IsEmpty(cmx.g.projectName) ? ('《' + cmx.g.projectName + '》') : '');
                                $('.n2-p8').html(data.optionCont9 + '<br/>' + data.acceptTime);
                                $('.n2-p10').html('如有疑义，请致电' + data.optionCont10 + '详询。');
                                break;
                            case '1': //受理
                                $('.n1').show();
                                $('.n1-p0').html(data.approvalItemName);
                                $('.n1-p1').html(data.acceptTime);
                                $('.n1-p2').html(data.optionCont9); //data.hostPersonName
                                $('.n1-p3').html(_projectNum + '_' + cmx.g.networkNum);
                                $('.n1-p5').html(cmx.g.contactTel);
                                $('.n1-p7').html(data.approvalItemName + IsEmpty(cmx.g.projectName) ? ('《' + cmx.g.projectName + '》') : '');
                                $('.n1-p8').html(data.optionCont9 + '<br/>' + data.acceptTime);
                                $('.n2-p10').html('提醒：查询进度办理（结果）请登录国家文物局综合行政管理平台或致电' + data.optionCont10 + '。此项许可不收取费用。');
                                break;
                            case '2': //一次性补正
                                $('.n2-state').removeClass('current');
                                $('.n2-state').addClass('error');
                                $('.apply-title').html('审批退回');
                                $('.n3').show();
                                $('.n3-p0').html(data.approvalItemName);
                                $('.n3-p2').html(cmx.g.contactTel);
                                if (data.option1 == '1')
                                    $('.n3-p3').html('（√）申请材料不全，具体为：<span class="color:#f2a654;">' + data.optionCont1 + '</span>');
                                if (data.option2 == '1')
                                    $('.n3-p4').html('（√）不符合法定形式，<span class="color:#f2a654;">' + data.optionCont2 + '</span>');
                                $('.n3-p7').html(data.approvalItemName + IsEmpty(cmx.g.projectName) ? ('《' + cmx.g.projectName + '》') : '');
                                $('.n3-p8').html(data.optionCont9 + '<br/>' + data.acceptTime);
                                $('.n3-p10').html('如有疑义，请致电' + data.optionCont10 + '详询。');
                                if ((_status == '301' || _status == '505' || _status == '993' || _status == '887' || _status == '867' || _status == '990' || _status == '880')) {
                                    if ((getData('role') == 'province' && $.inArray(_projectNum, cmx.g.ProvinceShenpi) < 0) ||
                                        (getData('role') != 'nation' && getData('role') != 'inspection' && $.inArray(_projectNum, cmx.g.ProvinceShenpi) >= 0) ||
                                        getData('role') == 'bowuguan' ||
                                        getData('role') == 'guobaodanwei' ||
                                        getData('role') == 'zizhijigou' ||
                                        getData('role') == 'kaogulingdui') {
                                        $('.n3-edit').show();
                                        $('.n2-state').removeClass('current');
                                        $('.n2-state').addClass('error');
                                        $('.apply-title').html('审批退回');
                                        $('.n3-edit').show();
                                        $('#goto-edit').html('进行修改');
                                        $('#goto-edit').click(function () {
                                            var _url = getApplyUrl(_projectNum);
                                            var paramStr = 'status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                                            _url = IsEmpty(_url) ? '/error.html' : (_url + (_url.indexOf('?') > 0 ? '&' : '?') + paramStr);
                                            location.href = _url;
                                        });
                                    }
                                }
                                break;
                        }
                        $('.apply-pearls').show();
                    } else {
                        if ((_status == '301' || _status == '505' || _status == '993' || _status == '887' || _status == '867' || _status == '990' || _status == '880' || _status == '481' || _status == '883' || _status == '873' || _status == '980' || _status == '981' || _status == '881' || _status == '991' || _status == '493' || _status == '874' || _status == '864' || _status == '980')) {
                            if ((getData('role') == 'province' && $.inArray(_projectNum, cmx.g.ProvinceShenpi) < 0) ||
                                getData('role') == 'bowuguan' || getData('role') == 'guobaodanwei' || getData('role') == 'kaogulingdui' || getData('role') == 'zizhijigou' ||
                                (getData('role') != 'nation' && getData('role') != 'inspection' && $.inArray(_projectNum, cmx.g.ProvinceShenpi) >= 0)) {
                                $('.n3-edit').show();
                                $('.n2-state').removeClass('current');
                                $('.n2-state').addClass('error');
                                $('.apply-title').html('审批退回');
                                $('.n3-edit').show();
                                $('#goto-edit').html('进行修改');
                                $('#goto-edit').click(function () {
                                    var _url = getApplyUrl(_projectNum);
                                    var paramStr = 'status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                                    _url = IsEmpty(_url) ? '/error.html' : (_url + (_url.indexOf('?') > 0 ? '&' : '?') + paramStr);
                                    location.href = _url;
                                });
                            }
                        }
                    }
                }
                send.go();
            })
            .turn('callajax', {
                url: getFileList,
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    apprItem: _projectNum, //类型：String  必有字段  备注：项目编号
                    fileClass: '902'
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var response = prevModelData;
                    if (response.data.length > 0) {
                        $('#cmx-pifu-title').show();
                    }
                    $('#cmx-pifu-file').html('');
                    $('#cmx-pifu-file').append(
                        ['<button onclick="downloadPifuFile(\'' + _applyId + '\',\'' + _projectNum + '\')" type="button" class="btn btn-lg btn-default cmx-upload-file-name">',
                            '<i class="icon fa-edit" aria-hidden="true"></i>点击查看批复文件',
                            '</button>'
                        ].join(''));
                }
                send.go();
            })
            .turn('callajax', {
                url: getFileList,
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    apprItem: _projectNum, //类型：String  必有字段  备注：项目编号
                    fileClass: '301'
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var response = prevModelData;
                    if (response.data.length > 0) {
                        $('#cmx-pifu-title').show();
                    }
                    $('#cmx-pifu-file').html('');
                    for (var ft = 0; ft < response.data.length; ft++) {
                        var fileindexid = response.data[ft].fileIndex;
                        fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                        if (IsEmpty(fileindexid))
                            continue;
                        $('#cmx-pifu-file').append(
                            ['<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-lg btn-default cmx-upload-file-name">',
                                '<i class="icon fa-edit" aria-hidden="true"></i>点击查看批复文件',
                                '</button>'
                            ].join(''));
                    }
                }
            })
            .start();
    }
    //拽文 
    //只允许wenshushi,mishuchu,各个司秘拽文
    if ($.inArray('3', JSON.parse(getData('roleClassArr'))) >= 0 || getData('userId') == 'wenshushi' || getData('userId') == 'mishuchu') {
        if ($.inArray(_status, ['210', '504', '999', '902', '209', '901']) >= 0 || _status.indexOf('W') >= 0) {
            $("#cmx-button-dragprocess").addClass('hidden');
        } else {
            $("#cmx-button-dragprocess").removeClass('hidden');
            $("#cmx-button-dragprocess").unbind('click');
            $("#cmx-button-dragprocess").bind('click', function () {
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
                    var formdata = {};
                    var _userid = '';
                    if ($("#cmx-TabsOne").hasClass("active")) {
                        _userid = $('#cmx-generalperson input:checked').val();
                    }
                    if ($("#cmx-TabsTwo").hasClass("active")) {
                        _userid = $("#cmx-sendperson option:checked").val();
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: api_aa + '/user/getRolesByUserid',
                            data: {
                                token: getData('token'),
                                userid: _userid
                            },
                            type: 'GET'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                var data = prevModelData.data;
                                if (data.length <= 0) {
                                    showAlert({
                                        type: 'alert',
                                        content: '该用户没有配置角色，不能选择'
                                    });
                                }
                                if (data.length == 1) {
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/business/dragProcess',
                                            type: 'POST',
                                            data: JSON.stringify({
                                                token: getData('token'),
                                                applyId: _applyId,
                                                projectNum: _projectNum,
                                                nextTaskUser: _userid,
                                                roleId: data[0].roleId,
                                                note: $('#cmx-dragprocess-reson').val()
                                            })
                                        })
                                        .turn(function (prevModelData1, send1, abort1) {
                                            console.log(prevModelData1);
                                            if (!IsNull(prevModelData1) && prevModelData1.state == '200' && !IsEmpty(prevModelData1.data) && prevModelData1.data != 'null') {
                                                showAlert({
                                                    type: 'success',
                                                    content: '拽文成功'
                                                });
                                                $("#cmxAddPerson").modal("hide");
                                                setTimeout(function () {
                                                    location.reload();
                                                }, 3000);
                                            } else {
                                                showAlert({
                                                    type: 'error',
                                                    content: prevModelData1.msg
                                                });
                                            }
                                        })
                                        .start();
                                }
                            }
                        })
                        .start();
                });
            });
        }
    }
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
                    '<td colspan="2" style="border-right: none">',
                    '<p class="margin-0 text-left">',
                    '<span class="label label-warning margin-right-10">' + data.examClassName + '</span>',
                    '<span class="margin-right-10">处理人：' + data.exportName + '\n</span>',
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