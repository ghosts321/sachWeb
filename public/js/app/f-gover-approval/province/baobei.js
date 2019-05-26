/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-28 17:05:12 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2018-01-02 11:50:19
 */

var _projectNum = '';
var _applyId = '';
var _status = '';
$(document).ready(function() {
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
                type: 'POST',
                success: function(result) {
                    console.log(result)
                    var data = result.data;
                    $("#cmx-profilenum").text(data.proFileNum);
                    $("#cmx-profiletitle").text(data.proFileTitle);
                    $("#cmx-protectunit").text(data.protectUnitName);
                    $("#cmx-publishtypename").text(data.publishTypeName);
                    $("#cmx-approvalitemname").text(data.approvalItemName);
                    $('.cmx-header-title').text(data.approvalItemName);
                    if (data.eaPubWorkflowList) {
                        var eaPubWorkflowList = data.eaPubWorkflowList;
                        console.log(eaPubWorkflowList)
                        var html = '';
                        for (var i = 0; i < eaPubWorkflowList.length; i++) {
                            html = html + ['<tr>',
                                '<td>' + (eaPubWorkflowList.length - i) + '</td>',
                                '<td>' + (IsEmpty(eaPubWorkflowList[i].oprUserName) ? eaPubWorkflowList[i].oprRoleName : eaPubWorkflowList[i].oprUserName) + '</td>',
                                '<td>' + eaPubWorkflowList[i].note.replace(/\n/g,"<br/>")  + '</td>',
                                '<td>' + eaPubWorkflowList[i].dealTime + '</td>',
                                '<td>' + eaPubWorkflowList[i].weekDay + '</td>',
                                '</tr>'
                            ].join('');
                        }
                        $("#cmx-banli-record").append(html);
                    }
                }
            })
            .start();
    } else {
        location.href = '/error.html';
        return;
    }

    var paramStr = '?from=iframe&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function() {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    //返回
    $('#cmx-button-return').on('click', function() {
        window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
    });

    $("#cmx-confirm-baobei").on('click', function() {
        showAlert({
            type: 'confirm', //success info warning error confirm input
            content: '是否确认进行报备?',
            delay: 2, //可选参数，单位秒，confirm和input下无效
            btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
            btn_2: '确认', //可选参数，默认为取消
            callback: function(_state) { //仅type为confirm下有效
                if (_state == 'yes') {
                    var projectType = '';
                    if (_projectNum == '56015_c') {
                        projectType = '4';
                    } else if (_projectNum == '56014-3_e') {
                        projectType = '3';
                    } else {
                        projectType = '2';
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/' + getProvinceApplyApi(_projectNum) + '/sendReported',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                applyId: _applyId,
                                projectNum: _projectNum,
                                projectType: projectType
                            }),
                            type: 'POST'
                        })
                        .turn(function(prevModelData, send, abort) {
                            if (prevModelData.state == '200') {
                                showAlert({
                                    type: 'success',
                                    content: '报备成功'
                                });
                                setTimeout(function() {
                                    window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
                                }, 1000)
                            }
                        })
                        .start();
                } else {

                }
            }
        });

    });
});