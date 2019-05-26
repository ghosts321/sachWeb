var _projectNum = '';
var _applyId = '';
var _status = '';
var _examId = '';
var isInitFile = false;
cmx.g.regist('export', new HashMap());
cmx.g.regist('haveexport', new HashMap());
cmx.g.regist('institution', new HashMap());
cmx.g.regist('haveinstitution', new HashMap());
cmx.g.regist('isBelongSachisBelongSach', []);
cmx.g.regist('belongInst');

cmx.g.regist('provincesName', '');
cmx.g.regist('provinces', '');
cmx.g.regist('networkNum', '');
cmx.g.regist('projectName', '');
cmx.g.regist('contactName', '');
cmx.g.regist('contactTel', '');
cmx.g.regist('recordId');
cmx.g.regist('checkInstId', '');
cmx.g.regist('checkInstName', '');
cmx.g.regist('checkInstMap', new HashMap());

$(document).ready(function () {
    //申请信息
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status')) && !IsEmpty(GetUrlParamString('examId'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
        _examId = GetUrlParamString('examId')
    } else {
        location.href = '/error.html';
        return;
    }
    if (getData('accClass') == '16') {
        $('#daohang-1').removeClass('hidden');
        $('#cmx-pingshen-title').removeClass('hidden');
        $('#daohang-4 a').html('<i class="icon wb-bell" aria-hidden="true"></i>填写评审意见');
    }
    //返回
    $('#cmx-button-return').on('click', function () {
        location.href = '/app/f-gover-approval/inspection/inspection-needToDo.html?nowid=' + GetUrlParamString('nowid');
    });

    var paramStr = '?from=iframe&isedit=1&pingshen=1&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum + '&examId=' + _examId;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });
    var _pingshenurl = '';
    switch (_projectNum) {
        case '56004':
        case '56005':
        case '56010':
        case '56012':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/shejianxiangmu.html';
            }
            break;
        case '56008_b':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56008-b-yijian.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56008-b-yijian.html';
            }
            break;
        case '56011':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56008-b-yijian.html';
            }
            break;
        case '56008_a':
        case '56009':
        case '56013':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu.html';
            }
            break;
        case '56014_a':
        case '56014_b':
        case '56014_c':
        case '56014_d':
        case '56014_e':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/gongchengfangan.html';
            }
            break;
        case '56014-3_a':
        case '56014-3_d':
        case '56014-3_e':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/xiaofangyijian.html';
            }
            break;
        case '56015_e':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56015-e-yijian.html';
            }
            break;
        case '56015_f':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56015-f-yijian.html';
            }
            break;
        case '56015_g':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56015-g-yijian.html';
            }
            break;
        case '56016':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/bowuguanthird.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/bowuguan.html';
            }
            break;
        case '56019':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/56019.html';
            }
            break;
        case '56022_b':
        case '56022_c':
            if (getData('accClass') == '16') {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/kaogu-disanfang.html';
            } else {
                _pingshenurl = '/app/f-gover-approval/inspection/subpage/baohuguihua.html';
            }
            break;
        default:
            _pingshenurl = '/error.html';
            break;
    }
    $('#cmx-form-pingshen-org').attr("src", IsEmpty(_pingshenurl) ? '/error.html' : (_pingshenurl + paramStr));
    $('#cmx-form-pingshen-org').load(function () {
        $('#cmx-form-pingshen-org')[0].contentWindow.setClientHeight(getClientHeight() + 80);
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
                url: api_ea + '/business/getBriefDataByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: _applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST',
                async: false
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

                    cmx.g.provincesName = prevModelData.data.provincesName;
                    cmx.g.provinces = prevModelData.data.provinces;
                    cmx.g.networkNum = prevModelData.data.networkNum;
                    cmx.g.projectName = prevModelData.data.projectName;
                    cmx.g.contactName = prevModelData.data.contactName;
                    cmx.g.contactTel = prevModelData.data.contactTel;
                    cmx.g.acceptTime = prevModelData.data.acceptTime;
                    cmx.g.hostPerson = prevModelData.data.hostPersonName;
                    if (prevModelData.data.status.trim() == '210') {
                        $('.n2-state').removeClass('current');
                        $('.n2-state').addClass('done');
                        $('.n3-state').removeClass('disabled');
                        $('.n3-state').addClass('done');
                    }
                }
                send.go();
            })
            .turn('callajax', {
                url: api_ea + '/eaPubExamopinion/getSimpDatasByInstExamID', //getDataListByApprItemAndApplyID
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    examId: _examId
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
                            // if (getData('role') == 'inspection') {
                            //     continue;
                            // }
                            if (data[i].dealFlag == '4') {
                                _tag = data[i].expertResultsName;
                            } else {
                                _tag = data[i].dealFlagName;
                            }
                            var _name = (IsEmpty(data[i].exportName) ? data[i].exportId : data[i].exportName);
                            _html = _html + [
                                '<div class="col-md-4 col-xs-12 masonry-item">',
                                '<div class="widget widget-article widget-shadow">',
                                '<div class="widget-body" style="border: 1px #ddd solid;" data-index="' + i + '">',
                                '<span class="label label-warning">' + data[i].examClassName + '</span>',
                                // (!IsEmpty(data[i].expertResultsName) ? '<span style="color:#bbb;float: right;font-size: 16px;font-weight: bolder;">'+data[i].expertResultsName+'</span>': '<span style="float: right;color:#222;font-size: 16px;font-weight: bolder;">' + data[i].dealFlagName + '</span>'),
                                '<span style="color:#aaa;float: right;font-size: 16px;font-weight: bolder;">' + _tag + '</span>',
                                '<h3 class="widget-title">',
                                '<span class="drop-cap" data-toggle="tooltip" data-placement="top" data-trigger="click" data-original-title="' + _name + '" title="" aria-describedby="tooltip790178" style="font-size: 30px;overflow: hidden;text-overflow: ellipsis;height: 65px;white-space: nowrap;width: 100%;"><span class="cursorPointer" onclick="showExpertInfo(\'' + data[i].examClass + '\',\'' + data[i].exportId + '\');">' + _name + '</span></span>',
                                '</h3>',
                                '<p>' + (IsEmpty(data[i].apprDate) ? data[i].arriveDate : data[i].apprDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">停留时间：' + data[i].stopTime + '</span></p>',
                                // '<p>' + (IsEmpty(data[i].updDate) ? data[i].createDate : data[i].updDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">' + data[i].dealFlagName + '</span></p>',
                                '<div class="widget-body-footer margin-top-10">',
                                '<a class="btn btn-outline btn-default openPingshen">查看详情</a>',
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
                                    });
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

        if (_projectNum != '56011') {
            $('#cmx-jointTrialTabs').hide();
        } else {
            if (getData('accClass') == '16') {
                $('.cmx-havechooseprovince').html('');
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPubProvinceopinion/selectAaSachinstByProvince',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            provinces: cmx.g.provinces
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        console.log(prevModelData);
                        console.log(444444)
                        if (prevModelData.state == '200') {
                            $('#cmx-chooseprovince').html('<button type="button" class="btn btn-outline btn-default margin-10">' + prevModelData.data.instName + '</button>');
                            cmx.g.checkInstId = prevModelData.data.instId;
                            cmx.g.checkInstName = prevModelData.data.instName;
                        }
                        send.go();
                    })
                    .start();
            }
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPubProvinceopinion/getProSimpDatasByApprItemAndApplyID', //getDataListByApprItemAndApplyID
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
                        console.log(prevModelData);
                        console.log(33333)
                        if (data.length > 0) {
                            $('#cmx-pingshen-title').show(); //show the 专家意见 tab
                            var _tag = '';
                            var _html = '';
                            for (var i in data) {
                                if (IsEmpty(data[i].instId))
                                    continue;
                                $('.cmx-havechooseprovince').append('<button type="button" class="btn btn-outline btn-default margin-10">' + data[i].instName + '(' + data[i].dealFlagName + ')</button>');
                                // cmx.g.checkInstId = data[i].instId;
                                // cmx.g.checkInstName = data[i].instName;
                                if (data[i].dealFlag == '4') {
                                    _tag = data[i].dealFlagName;
                                } else {
                                    _tag = data[i].dealFlagName;
                                }
                                var _name = (IsEmpty(data[i].instName) ? data[i].instId : data[i].instName);
                                _html = _html + [
                                    '<div class="col-md-4 col-xs-12 masonry-item">',
                                    '<div class="widget widget-article widget-shadow">',
                                    '<div class="widget-body"  style="border: 1px #ddd solid;">',
                                    '<span class="label label-warning">省局</span>',
                                    '<span style="color:#aaa;float: right;font-size: 16px;font-weight: bolder;">' + _tag + '</span>',
                                    '<h3 class="widget-title">',
                                    '<span class="drop-cap" data-toggle="tooltip" data-placement="top" data-trigger="click" data-original-title="' + _name + '" title="" aria-describedby="tooltip790178" style="font-size: 30px;overflow: hidden;text-overflow: ellipsis;height: 65px;white-space: nowrap;width: 100%;"><span class="cursorPointer">' + _name + '</span></span>',
                                    '</h3>',
                                    '<p>' + (IsEmpty(data[i].apprDate) ? data[i].arriveDate : data[i].apprDate) + '<span style="margin-left: 10px;border-left: 3px solid #62a8ea; padding-left: 3px;">停留时间：' + data[i].stopTime + '</span></p>',
                                    '<div class="widget-body-footer margin-top-10">',
                                    '<a class="btn btn-outline btn-default openprovincePingshen">查看详情</a>',
                                    //'<a class="margin-left-5 btn btn-outline btn-default openReminder">催办</a>',
                                    '<a class="margin-left-5 btn btn-outline btn-default cancelHadChooseProvince">收回</a>',
                                    '</div>',
                                    '</div>',
                                    '</div>',
                                    '</div>',
                                ].join('');
                            }
                            $('#cmx-pingshen-list .panel-body .pingshen-list').append(_html);

                            //查看详情
                            $('#cmx-pingshen-list .panel-body .pingshen-list .openprovincePingshen').each(function (index) {
                                if (data[index].dealFlag == '4') {
                                    $(this).on('click', function () {
                                        $("#pingshen-modal-2").off('show.bs.modal');
                                        $("#pingshen-modal-2").on('show.bs.modal', function () {
                                            var html = '<table class="table table-bordered text-left">';
                                            html = html + [
                                                '<tr>',
                                                '<td colspan="2">',
                                                '<p class="margin-0 text-left">',
                                                '<span class="label label-warning margin-right-10">省局</span>',
                                                '<span class="margin-right-10">处理人：' + data[index].instName + '</span>',
                                                '<psan class="margin-right-10 pull-right ">评审时间：' + data[index].apprDate + '</span>',
                                                '</p>',
                                                '</td>',
                                                '<td style="border-left: none;width: 10px">\n</td>',
                                                '</tr>',
                                                '</tr>',
                                                '<tr>',
                                                '<td>意见</td>',
                                                '<td>' + data[index].provinceOpinion + '</td>',
                                                '<td style="border-left: none;width: 10px">\n</td>',
                                                '</tr>',
                                                '<tr>',
                                                '<td>备注</td>',
                                                '<td>' + data[index].remark + '</td>',
                                                '<td style="border-left: none;width: 10px">\n</td>',
                                                '</tr>',
                                            ].join('');
                                            html = html + '</table>';
                                            $('#cmx-form-pingshen-2').html(html);
                                        });
                                        $('#pingshen-modal-2').modal('show');
                                    });
                                } else if (data[index].dealFlag == '5') {
                                    $(this).on('click', function () {
                                        $("#pingshen-modal-2").off('show.bs.modal');
                                        $("#pingshen-modal-2").on('show.bs.modal', function () {
                                            var html = '<table class="table table-bordered text-left">';
                                            html = html + [
                                                '<tr>',
                                                '<td colspan="2">',
                                                '<p class="margin-0 text-left">',
                                                '<span class="label label-warning margin-right-10">省局</span>',
                                                '<span class="margin-right-10">处理人：' + data[index].instName + '</span>',
                                                '<psan class="margin-right-10 pull-right ">评审时间：' + data[index].apprDate + '</span>',
                                                '</p>',
                                                '</td>',
                                                '<td style="border-left: none;width: 10px">\n</td>',
                                                '</tr>',
                                                '</tr>',
                                                '<tr>',
                                                '<td>意见</td>',
                                                '<td>' + data[index].provinceOpinion + '</td>',
                                                '<td style="border-left: none;width: 10px">\n</td>',
                                                '</tr>',
                                                '<tr>',
                                                '<td>备注</td>',
                                                '<td>' + data[index].remark + '</td>',
                                                '<td style="border-left: none;width: 10px">\n</td>',
                                                '</tr>',
                                            ].join('');
                                            html = html + '</table>';
                                            $('#cmx-form-pingshen-2').html(html);
                                        });
                                        $('#pingshen-modal-2').modal('show');
                                    });
                                } else {
                                    $(this).attr('disabled', true);
                                }
                            });
                            //收回评审
                            $('#cmx-pingshen-list .panel-body .pingshen-list .cancelHadChooseProvince').each(function (index) {
                                if (data[index].dealFlag == '2') {
                                    $(this).on('click', function () {
                                        showAlert({
                                            type: 'confirm',
                                            content: '确定收回本评审工作吗？',
                                            btn_1: '取消',
                                            btn_2: '确定',
                                            callback: function (_state) { //仅type为confirm下有效
                                                if (_state == 'yes') {
                                                    new cmx.process()
                                                        .turn('callajax', {
                                                            url: api_ea + '/eaPubProvinceopinion/rebackProvinceOpinion',
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
                                                                setTimeout(function () {
                                                                    location.reload();
                                                                }, 1000);
                                                            }
                                                        })
                                                        .start();
                                                }
                                            }
                                        });
                                    });
                                } else {
                                    $(this).hide();
                                }

                            });
                        }
                    }
                    send.go();
                })
                .start();
        }

    } else {
        location.href = '/error.html';
        return;
    }
    if (getData('accClass') == '16') {
        var func_init_zhuanjia_page = function () {
            //GetZhuanjiaFunc.getData();
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
        //请省局模态框
        $('#click-province').on('click', function () {
            $("#shoProvinceInfoModal").off('show.bs.modal');
            $("#shoProvinceInfoModal").on('show.bs.modal', function () {
                GetShengjuList();
                $('#cmx-Province-list-search').off('click');
                $('#cmx-Province-list-search').on('click', function () {
                    GetShengjuList();
                });
                $('#cmx-province-confirm').off('click');
                $('#cmx-province-confirm').on('click', function () {
                    $('#cmx-Province-tbody tr').each(function () {
                        if ($(this).hasClass('active')) {
                            cmx.g.checkInstId = $(this).attr('dataid');
                            cmx.g.checkInstName = cmx.g.checkInstMap.get(cmx.g.checkInstId).instName;
                        }
                    });
                    if (IsEmpty(cmx.g.checkInstId)) {
                        showAlert({
                            type: 'error',
                            content: '请选择一个省局机构'
                        });
                        return;
                    }
                    $('#cmx-chooseprovince').html('<button type="button" class="btn btn-outline btn-default margin-10">' + cmx.g.checkInstMap.get(cmx.g.checkInstId).instName + '</button>');
                    $("#shoProvinceInfoModal").modal('hide');
                });
            });
            $("#shoProvinceInfoModal").modal('show');
        });
        $('#cmx-button-confirm-province').on('click', function () {
            if (!IsEmpty(cmx.g.checkInstId)) {
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPubProvinceopinion/chooseProvince',
                        data: JSON.stringify({
                            token: getData('token'),
                            "applyId": _applyId,
                            "projectNum": _projectNum,
                            "instIDs": cmx.g.checkInstId,
                            instName: cmx.g.checkInstName
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        console.log(prevModelData)
                        if (prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '操作成功'
                            });
                            setTimeout(function () {
                                location.reload();
                            }, 2000);
                        }
                    })
                    .start();
            } else {
                showAlert({
                    type: 'error',
                    content: '请选择一个省局机构'
                });
                return;
            }

        });
        //加载选择专家模态框
        $("#expert-modal").load(getExpertList, function () {
            func_init_zhuanjia_page();
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
        $("#cmx-button-confirm").on('click', function () {
            //选专家
            if ($("#cmx-select-experts").hasClass('active')) {
                //选择专家
                if ($('input:radio[name="type1"]:checked').val() == 1) {
                    var _keys = cmx.g.export.keySet();
                    if (_keys.length <= 0) {
                        showAlert({
                            type: 'info',
                            content: '请选择专家'
                        });
                        return;
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaPubExamopinion/chooseDSFExports',
                            data: JSON.stringify({
                                token: getData('token'),
                                examId: _examId,
                                exportIds: _keys.join(','),
                                applyId: _applyId,
                                projectNum: _projectNum //,
                                //opinion: $("#cmx-export-remark").val()
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
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
                        })
                        .start();
                }
            }
        });
    }
});

function GetShengjuList() {
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/inst/aaSachinst/getSJDateByInstName',
            data: {
                token: getData('token'),
                instName: $('#cmx-Province-name').val()
            },
            type: 'GET'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData)
            if (prevModelData.state == '200') {
                var html = '';
                var data = prevModelData.data;
                for (var i = 0; i < data.length; i++) {
                    html += '<tr dataid="' + data[i].instId + '">' +
                        //'<td><input type="radio" name="checkInstId" value="' + data[i].instId + '" ></td>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + data[i].instClassName + '</td>' +
                        '<td>' + data[i].instName + '</td>' +
                        '</tr>';
                    cmx.g.checkInstMap.put(data[i].instId, data[i]);
                }
                $('#cmx-Province-tbody').html(html);
                $('#cmx-Province-tbody tr').each(function () {
                    $(this).on('click', function () {
                        $('#cmx-Province-tbody tr').removeClass('active');
                        $(this).addClass('active');
                    })
                })
            }
        })
        .start();
}
var GetZhuanjiaFunc = {};
GetZhuanjiaFunc.pageNum1 = 1;
GetZhuanjiaFunc.pageCount1 = 0;
GetZhuanjiaFunc.searchWords11 = '';
GetZhuanjiaFunc.searchWords12 = ''; //工作单位
GetZhuanjiaFunc.searchWords13 = ''; //专业特长
GetZhuanjiaFunc.getData = function () {
    GetZhuanjiaFunc.searchWords11 = $('#cmx-national-protect-name').val();
    GetZhuanjiaFunc.searchWords12 = $('#cmx-unit-name').val();
    GetZhuanjiaFunc.searchWords13 = $('#cmx-major').val();
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
                    professionName: GetZhuanjiaFunc.searchWords13
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
        // if (getData('role') == 'inspection') {
        //     continue;
        // }
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

function jumpToHaveToDo() {
    setTimeout(function () {
        location.href = '/app/f-gover-approval/inspection/inspection-haveToDo.html?nowid=' + GetUrlParamString('nowid');
    }, 2000);
}

function jumpToNeedToDo() {
    setTimeout(function () {
        location.href = '/app/f-gover-approval/inspection/inspection-needToDo.html?nowid=' + GetUrlParamString('nowid');
    }, 2000);
}