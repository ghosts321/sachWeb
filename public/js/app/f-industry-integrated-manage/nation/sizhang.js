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
        
        $('#cmx-timeLimit').hide();

        if (_status == '303' || _status == '304') {
            //$('#cmx-fenpai').hide();
            $('#tabsReturn').addClass('active');
            $('#tabsAcceptance').removeClass('active');
            $('#cmx-return').addClass('active');
            $("#cmx-fenpai").removeClass('active');
        }
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
                    console.log(data);
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
        //window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?'+'nowid='+GetUrlParamString('nowid');
    });

    var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    //确定
    $("#cmx-button-confirm").on('click', function () {
        //分派
        if ($("#cmx-fenpai").hasClass("active")) {
            if (IsEmpty($("#cmx-simi-person").attr("value"))) {
                showAlert({
                    type: 'error',
                    content: '请选择分派人员'
                });
                return;
            }
            if ($('#cmx-fenpai-remark').val().length > 500) {
                showAlert({
                    type: 'error',
                    content: '办理意见不能超过500字'
                });
                return;
            }
            new cmx.process()
                .turn('selectUserRole', {
                    userId: $("#cmx-simi-person").attr("value")
                })
                .turn(function (prevModelData, send, abort) {
                    cmx.g.select_role = prevModelData;
                    send.tomodel({
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            pfFormData: [ //类型：Array  必有字段  备注：无
                                { //类型：Object  必有字段  备注：无
                                    remark: $("#cmx-fenpai-remark").val(), //类型：String  必有字段  备注：无
                                }
                            ],
                            isSaveOrSend: "send", //类型：String  必有字段  备注：参数值：save 保存 send 发送
                            projectNum: _projectNum, //类型：String  必有字段  备注：无
                            applyId: _applyId, //类型：String  必有字段  备注：无
                            completeOrBack: "0", //类型：String  必有字段  备注：参数值：0 完成 1回退
                            choosePerson: $("#cmx-simi-person").attr("value"),
                            roleId: cmx.g.select_role
                        })
                    }).go();
                })
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeOpinionAndclaimTask',
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '分派成功'
                        });
                        send.go();
                        setTimeout(function () {
                            window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?' + 'nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                    } else {
                        abort();
                    }
                })
                .start();
        }

        //退回
        // if ($("#cmx-return").hasClass("active")) {
        //     if ($('#cmx-return-remark').val().length > 500) {
        //         showAlert({
        //             type: 'error',
        //             content: '办理意见不能超过500字'
        //         });
        //         return;
        //     }
        //     new cmx.process()
        //         .turn('callajax', {
        //             url: api_ea + '/' + getApplyApi(_projectNum) + '/disposeOpinionAndclaimTask',
        //             data: JSON.stringify({
        //                 token: getData('token'), //类型：String  必有字段  备注：无
        //                 pfFormData: [ //类型：Array  必有字段  备注：无
        //                     { //类型：Object  必有字段  备注：无
        //                         remark: $("#cmx-return-remark").val(), //类型：String  必有字段  备注：无
        //                     }
        //                 ],
        //                 isSaveOrSend: "send", //类型：String  必有字段  备注：参数值：save 保存 send 发送
        //                 projectNum: _projectNum, //类型：String  必有字段  备注：无
        //                 applyId: _applyId, //类型：String  必有字段  备注：无
        //                 completeOrBack: "1", //类型：String  必有字段  备注：参数值：0 完成 1回退
        //                 choosePerson: ""
        //             }),
        //             type: 'POST'
        //         })
        //         .turn(function (prevModelData, send, abort) {
        //             if (prevModelData.state == '200') {
        //                 showAlert({
        //                     type: 'success',
        //                     content: '退回成功'
        //                 });
        //                 setTimeout(function () {
        //                     window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?'+'nowid='+GetUrlParamString('nowid');
        //                 }, 1000);
        //             }
        //         }).start();
        // }
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