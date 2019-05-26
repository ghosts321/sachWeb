//处领导处理
'use strict';
var _projectNum = '';
var _applyId = '';
var _status = '';

cmx.g.regist('provincesName', '');
cmx.g.regist('networkNum', '');
cmx.g.regist('projectName', '');
cmx.g.regist('recordId');

$(document).ready(function () {
    //申请信息
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
        // if (_projectNum == '56022_c') {
        $('#cmx-timeLimit').hide();
        // }
        new cmx.process()
            .turn('checkIsMyFlow', {
                applyId: _applyId,
                status: _status,
                projectNum: _projectNum
            })
            .turn('callajax', {
                url: api_ea + '/businesspplan/getProcessTimeByPKAndPNum',
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
                url: api_ea + '/businesspplan/getBriefDataByPKAndPNum',
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
        //window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?' + 'nowid=' + GetUrlParamString('nowid');
    });

    var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });
    //确定发送
    $("#cmx-button-confirm").on('click', function () {
        //受理
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
                content: '请确认项目信息和附件',
                btn_1: '取消',
                btn_2: '确定',
                callback: function (_state) { //仅type为confirm下有效
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeHandlersAcceptTask',
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    acceptFlag: "1", //0：回退 1：受理 2:转派给别人 3:一次性补正不予受理
                                    applyId: _applyId,
                                    projectNum: _projectNum,
                                    pfFormData: [{
                                        remark: $("#cmx-accept-remark").val()
                                    }],
                                    // ptnFormData: [
                                    //     ptnFormDataItem0
                                    // ],
                                    // ptnFormData: [{
                                    //     noticeType: "1" //通知书类型
                                    // }],
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
                                    var paramStr = '?type=1&status=203&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                                    window.location.href = '/app/f-industry-integrated-manage/nation/zhuanjiajigou.html' + paramStr;
                                }
                            })
                            .start();
                    }
                }
            });
        }
        //退回
        if ($("#cmx-returnTabs").hasClass("active")) {
            if ($('#cmx-return-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '办理意见不能超过500字'
                });
                return;
            }
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeHandlersAcceptTask',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        acceptFlag: "3",
                        applyId: _applyId,
                        projectNum: _projectNum,
                        pfFormData: [{
                            remark: $("#cmx-return-remark").val()
                        }],
                        // ptnFormData: []
                        //退回给上一个人
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
                            window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?' + 'nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                    }
                }).start();
        }
        // alert()
        //分办
        if ($('#cmx-branchTabs').hasClass("active")) {

            if ($('#cmx-fenpai-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '办理意见不能超过500字'
                });
                return;
            }
            if (IsEmpty($("#cmx-chuzhang-person").attr("value"))) {
                showAlert({
                    type: 'info',
                    content: '请先选择分办人员'
                });
                return;
            }
            new cmx.process()
                .turn('selectUserRole', {
                    userId: $("#cmx-chuzhang-person").attr("value")
                })
                .turn(function (prevModelData, send, abort) {
                    cmx.g.select_role = prevModelData;
                    send.tomodel({
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            acceptFlag: "2",
                            applyId: _applyId,
                            projectNum: _projectNum,
                            pfFormData: [{
                                remark: $("#cmx-fenpai-remark").val()
                            }],
                            // ptnFormData: [{
                            //     noticeType: "" //通知书类型
                            // }],
                            nextTaskUser: $("#cmx-chuzhang-person").attr("value"),
                            backToSecretaryFlag: "0",
                            roleId: cmx.g.select_role
                        }),
                    }).go();
                })
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeHandlersAcceptTask',
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '分办成功'
                        });
                        setTimeout(function () {
                            window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?' + 'nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                    }
                    send.go();
                })
                .start();
        }
    });

    // $("#notice1").off('click');
    // $("#notice1").on('click', function () {
    //     $('.n2').hide();
    //     $('.n3').show();
    // });
    // $("#notice2").off('click');
    // $("#notice2").on('click', function () {
    //     $('.n3').hide();
    //     $('.n2').show();
    // });
    if (IsEmpty($("#cmx-person-modal").html())) {
        $("#cmx-person-modal").load(getSelectPerson, function () {
            $("#cmx-chuzhang-chooseperson").unbind('click');
            $("#cmx-chuzhang-chooseperson").bind('click', function () {
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