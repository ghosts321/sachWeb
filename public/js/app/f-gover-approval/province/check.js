/*
 * @Author: lvjinxiu 
 * @Date: 2018-06-08 16:26:57 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-11 15:30:05
 */

var _projectNum = '';
var _applyId = '';
var _status = '';
var _examId = '';

$(document).ready(function () {
    //申请信息
    if (!IsEmpty(GetUrlParamString('examId')) && !IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _projectNum = GetUrlParamString('projectNum');
        _examId = GetUrlParamString('examId');
    } else {
        location.href = '/error.html';
        return;
    }

    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubProvinceopinion/selectProDomainByPK',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                examId: _examId
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            console.log(11111);
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                $('#provinceOpinion').val(prevModelData.data.provinceOpinion);
                $('#provinceResults').val(prevModelData.data.remark);
            }
        })
        .start();
    
    if(_status == 1 || _status == 2 || _status == 3){
        $('#cmx-options-save').show();
        $('#cmx-options-send').show();
        $('#cmx-options-back').show();
    }else{
        $('#provinceOpinion').attr('readonly',true);
        $('#provinceResults').attr('readonly',true);
    }

    //返回
    $('#cmx-button-return').on('click', function () {
        location.href = '/app/f-gover-approval/province/province-checkToDo.html?nowid=' + GetUrlParamString('nowid');
    });

    var paramStr = '?from=iframe&isedit=1&pingshen=1&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum + '&examId=' + _examId;
    var _url = getApplyUrl(_projectNum);
    $('#cmx-form').attr("src", IsEmpty(_url) ? '/error.html' : (_url + paramStr));
    $('#cmx-form').load(function () {
        $('#cmx-form')[0].contentWindow.setClientHeight(getClientHeight() + 80);
    });

    //保存
    $('#cmx-options-save').on('click', function () {
        if (IsEmpty($('#provinceOpinion').val())) {
            showAlert({
                type: 'error',
                content: '保存时意见不能为空'
            });
            return;
        }
        if ($('#provinceOpinion').val().length > 1000) {
            showAlert({
                type: 'error',
                content: '意见长度不能超过1000'
            });
            return;
        }
        if ($('#provinceResults').val().length > 1000) {
            showAlert({
                type: 'error',
                content: '备注长度不能超过1000'
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubProvinceopinion/saveReviewOpinion',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    provinceopinionFormData: [{
                        examId: _examId,
                        provinceOpinion: $('#provinceOpinion').val(),
                        provinceResults: "",
                        applyId: _applyId,
                        apprItem: _projectNum,
                        files: [],
                        remark: $('#provinceResults').val()
                    }]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '保存成功'
                    });
                }
            })
            .start();
    });
    //发送
    $('#cmx-options-send').on('click', function () {
        if (IsEmpty($('#provinceOpinion').val())) {
            showAlert({
                type: 'error',
                content: '发送时意见不能为空'
            });
            return;
        }
        if ($('#provinceOpinion').val().length > 1000) {
            showAlert({
                type: 'error',
                content: '意见长度不能超过1000'
            });
            return;
        }
        if ($('#provinceResults').val().length > 1000) {
            showAlert({
                type: 'error',
                content: '备注长度不能超过1000'
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubProvinceopinion/sendReviewOpinion',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    provinceopinionFormData: [{
                        examId: _examId,
                        provinceOpinion: $('#provinceOpinion').val(),
                        provinceResults: "",
                        applyId: _applyId,
                        apprItem: _projectNum,
                        files: [],
                        remark: $('#provinceResults').val()
                    }]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '发送成功'
                    });
                    setTimeout(function () {
                        location.href = '/app/f-gover-approval/province/province-checkToDo.html?nowid=' + GetUrlParamString('nowid');
                    }, 1000);
                }
            })
            .start();
    });
    //退回
    $('#cmx-options-back').on('click', function () {
        if (IsEmpty($('#provinceOpinion').val())) {
            showAlert({
                type: 'error',
                content: '退回时意见不能为空'
            });
            return;
        }
        if ($('#provinceOpinion').val().length > 1000) {
            showAlert({
                type: 'error',
                content: '意见长度不能超过1000'
            });
            return;
        }
        if ($('#provinceResults').val().length > 1000) {
            showAlert({
                type: 'error',
                content: '备注长度不能超过1000'
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubProvinceopinion/refuseEaPubProvinceopinion',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    provinceopinionFormData: [{
                        examId: _examId,
                        provinceOpinion: $('#provinceOpinion').val(),
                        provinceResults: "",
                        applyId: _applyId,
                        apprItem: _projectNum,
                        files: [],
                        remark: $('#provinceResults').val()
                    }]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '退回成功'
                    });
                    setTimeout(function () {
                        location.href = '/app/f-gover-approval/province/province-checkToDo.html?nowid=' + GetUrlParamString('nowid');
                    }, 1000);
                }
            })
            .start();
    });
});