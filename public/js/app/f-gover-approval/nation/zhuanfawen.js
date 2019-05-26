/*
 * @Author: lvjinxiu 
 * @Date: 2017-11-30 16:55:28 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2018-07-20 12:11:37
 */
var _projectNum = '';
var _applyId = '';
var _status = '';
var _type = '';
var _protectUnitName, _province;
var isTheUnitVal = '';
var _DisNote = ''; //用于将办理意见列表传给weboffice
var _hostPerson = ''; //记录主办人
var _applyInfo = {};
var _batchId = '';
cmx.g.regist('relatedFile', new HashMap());
cmx.route.model({
    index: 'buildZhuanfawen',
    handle: function (parameter, prevModelData, send, abort) {
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            _batchId = data.batchId;
            $("#contentType").val(data.contentType);
            $("#shapeCode").val(data.shapeCode);
            $("#openShape").val(data.openShape);
            $("#flowNumber").val(data.reserve1);
            $("#refNumBeg").val(data.refNumBeg);
            var cmx_year = new Date();
            var cmx_currentyear = cmx_year.getFullYear();
            $("#refNumMid").val(IsEmpty(data.refNumMid) ? cmx_currentyear : data.refNumMid);
            $("#refNumEnd").val(data.refNumEnd);
            if (!IsEmpty(data.packageTime)) {
                var _packageTime = data.packageTime.replaceAll('日', '');
                $("#packageTime-1").val(_packageTime.split('月')[0]);
                $("#packageTime-2").val(_packageTime.split('月')[1]);
            }
            $("#degreeUrgen").val(data.degreeUrgen);
            $("#isTheUnit").val(data.isTheUnitSName + data.isTheUnitName).attr('disabled', true);
            $("#isThePerson").val(data.isThePerson).attr('disabled', true);
            _hostPerson = data.isThePerson;
            $("#contactTel").val(IsEmpty(data.contactTel) ? (getData('phoneNo') == '无' ? '' : getData('phoneNo')) : data.contactTel);
            $("#proTitle").val(data.proTitle);
            $("#mainSend").val(data.mainSend);
            $("#carbonCopy").val(data.carbonCopy);
            $("#withinBureau").val(data.withinBureau);
            $("#commonSeal").val(data.commonSeal);
            $("#paperType").val(IsEmpty(data.paperType) ? '1' : data.paperType);
            $("#singIssue").val(data.singIssue);
            $("#singTime").val(data.singTime);
            $("#remark").val(data.remark);
            $("#opinions").val(data.doOpinion);
            isTheUnitVal = data.isTheUnit;
            if (data.approveList) {
                var approveList = data.approveList;
                var html = '';
                for (var i = 0; i < approveList.length; i++) {
                    if (!IsEmpty(approveList[i].disNote))
                        _DisNote += (IsEmpty(approveList[i].oprUserName) ? approveList[i].oprRoleName : approveList[i].oprUserName) + ' ' + approveList[i].dealTime + ' ' + approveList[i].disNote + '\r\n';
                    html = html + ['<tr>',
                        '<td>' + (approveList.length - i) + '</td>',
                        '<td>' + (IsEmpty(approveList[i].oprUserName) ? approveList[i].oprRoleName : approveList[i].oprUserName) + '</td>',
                        '<td>' + approveList[i].disNote + '</td>',
                        '<td>' + approveList[i].dealTime + '</td>',
                        '<td>' + approveList[i].weekDay + '</td>',
                        '</tr>'
                    ].join('');
                }
                $("#cmx-banli-record").append(html);
            }
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPubRelapply/getRelevantFilesForZFW',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        batchId: _batchId //类型：String  必有字段  备注：申请ID
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200') {
                        var relatefilelist = prevModelData.data;
                        for (var i = 0; i < relatefilelist.length; i++) {
                            var temp = {
                                oldApplyId: relatefilelist[i].oldApplyId,
                                oldBatchId: relatefilelist[i].oldBatchId,
                                oldOriginalNo: relatefilelist[i].oldOriginalNo,
                                oldProFileTitle: relatefilelist[i].oldProFileTitle,
                                oldProjectName: relatefilelist[i].oldProjectName,
                                oldProjectNum: relatefilelist[i].oldProjectNum,
                                oldProtectUnitName: relatefilelist[i].oldProtectUnitName,
                                oldProvince: "",
                                oldStatus: relatefilelist[i].oldStatus, //龚艺来赋值，有很多是错的，需要修正
                                pauseDay: relatefilelist[i].pauseDay,
                                relId: relatefilelist[i].relId
                            }
                            cmx.g.relatedFile.put(relatefilelist[i].oldBatchId, temp);
                        }
                        var values = cmx.g.relatedFile.values();
                        $('#filelist-P0907.file-upload-list').html('');
                        for (var i = 0; i < values.length; i++) {
                            $('#filelist-P0907.file-upload-list').append([
                                '<li data-toggle="tooltip" data-placement="left" title="' + values[i].oldProjectName + '" data-original-title="' + values[i].oldProjectName + '"  class="list-group-item">',
                                '<i class="icon wb-move" aria-hidden="true" draggable="true"></i>',
                                '<button  type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                values[i].oldProjectName,
                                '</button>',
                                '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeOldProject(event,this,\'' + values[i].oldBatchId + '\')">',
                                '<i class="icon wb-trash" aria-hidden="true"></i>',
                                '</button>',
                                '<div class="clearfix"></div>',
                                '</li>'
                            ].join(''));
                        }
                        $('#filelist-P0907.file-upload-list li').each(function (index) {
                            $(this).off('click');
                            $(this).on('click', function () {
                                window.open('/app/f-gover-approval/applyinfo.html?from=undefied&status=' + cmx.g.relatedFile.values()[index].oldStatus + '&applyId=' + cmx.g.relatedFile.values()[index].oldApplyId + '&projectNum=' + cmx.g.relatedFile.values()[index].oldProjectNum + '&nowid=' + GetUrlParamString('nowid'));
                            });
                        })
                    }
                })
                .start();
        }
        send.go();
    }
});
var lastDocFileIndex = '';
var isInit = false;
var justlook = '0';
cmx.route.model({
    index: 'showOptByRole',
    handle: function (parameter, prevModelData, send, abort) {
        justlook = GetUrlParamString('justlook') == '1' ? '1' : '0';
        $('#cmx-upload-file').css('display', 'inline-block');
        //上传最终稿
        webUploadFile({
            "id": "#cmx-upload-file", //选择器内自动生成上传文件按钮
            "label": "上传最终稿", //按钮文字
            "multiple": false, //多选，值为true表示多选，false表示单选
            "image": false, //图片选择，true代表上传图片，false代表文件
            "token": getData('token'), //验证身份
            "folder_id": 5, //文件夹id值
            "document_id": 0, //暂时不做修改，确定为0
            "document_upload_description": '', //暂时不做修改，确定为空
            "extra": '', //暂时不做修改，确定为空
            "passorend": 1,
            "fileDirectoryId": 50, //起文相关，除了正文之外的那些东西，也就是自己上传的附件
            success: function (param, response) {
                var fileindexid = response.data[0].fileIndex;
                fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
                fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
                var fileclassid = '902';
                lastDocFileIndex = fileindexid;
                //alert('请把这个截图给前端-上传最终稿：' + fileindexid);
                L('-------5：' + lastDocFileIndex);
                cmx.g.filesarray.put(fileclassid, []);
                cmx.g.filesarray.get(fileclassid).push(fileindexid);
                $('#cmx-after-setformat').off('click');
                $('#cmx-after-setformat').on('click', function (event) {
                    var param = safeEncodeBase64(JSON.stringify({
                        applyId: _applyId,
                        fileIndex: fileindexid,
                        docClass: '10', //表示查看套红后正文
                        userName: getData('userName'),
                        token: getData('token')
                    }));
                    setServiceCache({
                        key: 'key-thh-' + _applyId,
                        value: param,
                        success: function () {
                            if (!IsNull(_intervalthh)) {
                                clearInterval(_intervalthh);
                            }
                            _intervalthh = setInterval('listenThhWebOffice()', 3000);
                        },
                        error: function (msg) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    });

                });
                saveForm(false);
            },
            error: function () {
                //集中处理过了
            }
        });
        $('#cmx-upload-file').css('display', 'none');
        switch (_type) {
            case '1': //处长处员处理中
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                if (getData('userName') == _hostPerson) { //判断只有主办人才能看到作废按钮
                    $('#cmx-cancel').css('display', 'inline-block');
                }
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-add-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $("#refNumBeg").attr('disabled', 'disabled');
                $("#refNumMid").attr('disabled', 'disabled');
                $("#refNumEnd").attr('disabled', 'disabled');
                $("#packageTime-1").attr('disabled', 'disabled');
                $("#packageTime-2").attr('disabled', 'disabled');
                $("#singIssue").attr('disabled', 'disabled');
                $("#singTime").attr('disabled', 'disabled');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = '&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
            case '2': //司领导处理中
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $("#refNumBeg").attr('disabled', 'disabled');
                $("#refNumMid").attr('disabled', 'disabled');
                $("#refNumEnd").attr('disabled', 'disabled');
                $("#packageTime-1").attr('disabled', 'disabled');
                $("#packageTime-2").attr('disabled', 'disabled');
                $("#singIssue").attr('disabled', 'disabled');
                $("#singTime").attr('disabled', 'disabled');
                $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = '&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                // $('.input-group select').attr('disabled', true);
                // $('.input-group input').attr('disabled', true);
                break;
            case '3': //文书室处理中
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-send-leader').css('display', 'inline-block'); //发送局领导
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-multi-print').css('display', 'inline-block');
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = '&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
            case '4': //局领导处理中
            case '5': //秘书处处理中
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-send-toprint').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                if (IsEmpty($("#singTime").val())) {
                    $("#singTime").val(fnDate().substr(0, 10));
                }
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = '&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
            case '6': //文印室
                // $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-setformat').css('display', 'inline-block');
                $('#cmx-send-draftor').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-upload-file').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('.input-group select').attr('disabled', true);
                $('.input-group input').attr('disabled', true);
                $('.input-group textarea').attr('disabled', true);
                $('.changyongyu').hide();
                $('#upload-fawenfujian').hide();
                $('#related-file').hide();
                $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('.banliyijian-tag').hide();
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = '&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
            case '8': //文书室后处理
                //alert('不应出现');
                break;
            case '7': //发回拟稿人办结
                $('#cmx-before-setformat').css('display', 'inline-block');
                $('#cmx-after-setformat').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-complete').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('.input-group select').attr('disabled', true);
                $('.input-group input').attr('disabled', true);
                $('.input-group textarea').attr('disabled', true);
                $('.changyongyu').hide();
                $('#upload-fawenfujian').hide();
                $('#related-file').hide();
                $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = '&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
        }
        $('#commonwords').attr('disabled', false);
        if (_type != '1' && cmx.g.filesarray.get('903').length <= 0) {
            $('#cmx-approval').hide();
        }
        if (cmx.g.filesarray.get('901').length > 0) {
            $('#cmx-add-receipt').hide();
            $('#cmx-receipt').css('display', 'inline-block');
        }
        if (cmx.g.filesarray.get('902').length > 0) {
            $('#cmx-add-receipt').hide();
            $('#cmx-receipt').hide();
            $('#cmx-before-setformat').css('display', 'inline-block');
            $('#cmx-after-setformat').css('display', 'inline-block');
            $('#cmx-setformat').hide();
        }
        if (justlook == '1') {
            $('#cmx-liucheng').hide();
            if (cmx.g.filesarray.get('901').length > 0) {
                $('#cmx-receipt').html('查看正文');
                $('#cmx-print').css('display', 'inline-block');
            }
            if (cmx.g.filesarray.get('902').length > 0) {
                $('#cmx-before-setformat').css('display', 'inline-block');
                $('#cmx-after-setformat').css('display', 'inline-block');
            }
        } else {
            $('#cmx-liucheng').css('display', 'inline-block');
        }
        send.go();
    }
});

function getFormData() {
    return {
        contentType: formatSelectValue($('#contentType').val()),
        shapeCode: formatSelectValue($('#shapeCode').val()),
        openShape: formatSelectValue($('#openShape').val()),
        refNumBeg: formatSelectValue($('#refNumBeg').val()),
        refNumMid: formatSelectValue($('#refNumMid').val()),
        refNumEnd: formatSelectValue($('#refNumEnd').val()),
        refNumber: $('#refNumBeg').find("option:selected").text() + '[' + $('#refNumMid').val() + ']' + $('#refNumEnd').val() + '号',
        //两者同时为空的时候传空字符串，不为空传x月y日
        packageTime: (IsNull($("#packageTime-1").val()) && ($("#packageTime-2").val() == '')) ? "" : ((($("#packageTime-1").val() == '-1' || IsNull($("#packageTime-1").val())) ? '' : $("#packageTime-1").val()) + '月' + (IsNull($("#packageTime-2").val()) ? '' : $("#packageTime-2").val()) + '日'),
        degreeUrgen: formatSelectValue($('#degreeUrgen').val()),
        isTheUnit: isTheUnitVal, //这里是临时的
        isThePerson: $('#isThePerson').val(),
        contactTel: $('#contactTel').val(),
        proTitle: $('#proTitle').val(),
        mainSend: $('#mainSend').val(),
        carbonCopy: $('#carbonCopy').val(),
        withinBureau: $('#withinBureau').val(),
        commonSeal: formatSelectValue($('#commonSeal').val()),
        paperType: formatSelectValue($('#paperType').val()),
        singIssue: $('#singIssue').val(),
        singTime: $('#singTime').val(),
        remark: $('#remark').val(),
        files: getFileListForSave(cmx.g.filelinkfileclass)
    };
}
$(document).ready(function () {
    if (GetUrlParamString('from') == 'iframe') {
        $('#cmx-edit-formtag').css('height', '450px');
        $('#cmx-edit-formtag').css('margin-bottom', '0');
    } else {
        $('#cmx-edit-formtag').css('height', getClientHeight() - 142);
        $('#cmx-edit-formtag').css('margin-bottom', '0');
    }

    new cmx.process()
        .turn('initFiles', {
            'P0901': '901', //发文正文
            'P0902': '902', //套红后正文
            'P0903': '903', //报批件
            'P0904': '904', //发文附件
            'P0905': '905', //申请人提交附件
            'P0906': '906', //其它附件
            'P0907': '907', //相关文件
            'P0909': '909', //打印文件
            'P0910': '910' //红头文件
        }).start();
    $('#singTime').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _type = GetUrlParamString('type');
        _projectNum = GetUrlParamString('projectNum');
    } else {
        location.href = '/error.html';
        return;
    }
    if (_projectNum == '56022_c') {
        $('#cmx-timeLimit').hide();
    } else if (_status == '210') {
        $('#cmx-timeLimit').html('<i class="icon wb-time" aria-hidden="true"></i> &nbsp;总限时<span class="timeLimit">' + $('.timeLimit').html() + '</span>个工作日，期限内完成。');
    }
    //表单构建
    new cmx.process()
        .turn('callajax', {
            url: api_io + '/ioEaconttypeconfig/getSpecialDataDic',
            data: JSON.stringify({
                dataType: 'ApprContClass',
                token: getData('token')
            }),
            type: 'get',
            async: false
        })
        .turn(function (prevModelData, send, abort) {
            // if (prevModelData.state == '200') {
            //     var dataList = JSON.parse(prevModelData.data);
            //     var _html = '';
            //     $.each(dataList.ApprContClass, function (key, value) {
            //         _html += '<option value="' + key + '">' + value + '</option>';
            //     })
            //     $('#contentType').html(_html);
            // }
            send.go();
        })
        .turn('buildDataDic', {
            element: $('#openShape'),
            hasAll: false,
            hasEmpty: false,
            type: 'select'
        })
        .turn('callajax', {
            url: api_dm + '/dmDatadic/getSpecialDataDic',
            data: JSON.stringify({
                dataType: 'OfficalDocForm',
                token: getData('token')
            }),
            type: 'get'
        })
        .turn(function (prevModelData, send, abort) {
            // if (prevModelData.state == '200') {
            //     var dataList = JSON.parse(prevModelData.data);
            //     var _html = '';
            //     $.each(dataList.OfficalDocForm, function (key, value) {
            //         _html += '<option value="' + key + '">' + value + '</option>';
            //     })
            //     $('#shapeCode').html(_html);
            // }
            send.go();
        })
        .turn('callajax', {
            url: api_dm + '/dmDatadic/getSpecialDataDic',
            data: JSON.stringify({
                dataType: 'InfoNumBeg',
                token: getData('token')
            }),
            type: 'get'
        })
        .turn(function (prevModelData, send, abort) {
            // if (prevModelData.state == '200') {
            //     var dataList = JSON.parse(prevModelData.data);
            //     var _html = '';
            //     $.each(dataList.InfoNumBeg, function (key, value) {
            //         _html += '<option value="' + key + '">' + value + '</option>';
            //     })
            //     $('#refNumBeg').html(_html);
            // }
            send.go();
        })
        .turn('buildDataDic', {
            element: $('#degreeUrgen'),
            hasAll: false,
            hasEmpty: true,
            type: 'select'
        })
        .turn('buildDataDic', {
            element: $('#commonSeal'),
            hasAll: false,
            hasEmpty: false,
            type: 'select'
        })
        .turn(function (prevModelData, send, abort) {
            cmx_special_infoNumBeg();
            send.go();
        })
        .turn('callajax', {
            url: api_ea + '/eaPubBatchFile/getEaPubBatchFileAndOpinion',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                applyId: _applyId, //类型：String  必有字段  备注：申请ID
                projectNum: _projectNum //类型：String  必有字段  备注：项目编号
            }),
            success: function (result) {},
            type: 'POST'
        })
        .turn('buildZhuanfawen', {})
        .turn('callajax', {
            url: api_ea + '/eaPubFile/getApprAttachFilesByParam', //申请人的附件 修改附件调用的接口
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                applyId: _applyId, //类型：String  必有字段  备注：申请ID
                apprItem: _projectNum //类型：String  必有字段  备注：项目编号
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var _html = '';
                for (var i = 0; i < prevModelData.data.length; i++) {
                    var file_item = prevModelData.data[i];
                    cmx.g.filesarray.get('905').push(file_item.fileIndex);
                    var fileindexid = file_item.fileIndex;
                    var fileclassid = '905';
                    _html += [
                        '<li data-toggle="tooltip" data-placement="left" title="' + file_item.fileName + '" data-original-title="' + file_item.fileName + '" id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
                        '<i class="icon wb-move" aria-hidden="true"></i>',
                        '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                        file_item.fileName,
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-trash" aria-hidden="true"></i>',
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="renameThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-edit" aria-hidden="true"></i>',
                        '</button>',
                        '<div class="clearfix"></div>',
                        '</li>'
                    ].join('');
                    //_html += '<li class="list-group-item" file-index="' + file_item.fileId + '">' + file_item.fileName + '</li>';
                }
                $('.shenqingrenfujian').html(_html);
            }
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            for (var id in cmx.g.filelinkfileclass) {
                var fileclassid = cmx.g.filelinkfileclass[id];
                new cmx.process()
                    .turn('callajax', {
                        url: getFileList,
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            applyId: _applyId, //类型：String  必有字段  备注：申请ID
                            apprItem: _projectNum, //类型：String  必有字段  备注：项目编号
                            fileClass: fileclassid
                        }),
                        async: false,
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                            var response = prevModelData;
                            if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                                cmx.g.filesarray.put(fileclassid, []);
                            }
                            if (fileclassid == '905' && response.data.length > 0) {
                                $('#filelist-' + id + '.file-upload-list').html('');
                            }
                            cmx.g.filesarray.put(fileclassid, []);
                            if (fileclassid == '905' && response.data.length > 0) {
                                $('#filelist-' + id + '.file-upload-list').html('');
                            }
                            for (var ft = 0; ft < response.data.length; ft++) {
                                var fileindexid = response.data[ft].fileIndex;
                                fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                                cmx.g.filesarray.get(fileclassid).push(fileindexid);
                                if (IsEmpty(fileindexid))
                                    continue;
                                $('#filelist-' + id + '.file-upload-list').prepend([
                                    '<li data-toggle="tooltip" data-placement="left" title="' + response.data[ft].fileName + '" data-original-title="' + response.data[ft].fileName + '" id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
                                    '<i class="icon wb-move" aria-hidden="true"></i>',
                                    '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                    response.data[ft].fileName,
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
                            }
                        }
                    })
                    .start();
            }
            setTimeout(function () {
                $('#filelist-P0904').sortable({
                    handle: ".wb-move"
                });
                $('#filelist-P0907').sortable({
                    handle: ".wb-move"
                });
                // sortable('#filelist-P0906');
                $('#filelist-P0906').sortable({
                    handle: ".wb-move"
                });
                $('#filelist-P0905').sortable({
                    handle: ".wb-move"
                });
                // sortable('#filelist-P0907');
            }, 100);
            send.go();
        })
        .turn('showOptByRole', {})
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
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                var data = prevModelData.data;
                _applyInfo = data;
                _protectUnitName = data.protectUnitName;
                _province = data.provinces;
                $("#cmx-liucheng-record").html('');
                if (data.eaPubWorkflowList) {
                    var eaPubWorkflowList = data.eaPubWorkflowList;
                    var html = '';
                    for (var i = 0; i < eaPubWorkflowList.length; i++) {
                        html = html + ['<tr>',
                            '<td>' + (eaPubWorkflowList.length - i) + '</td>',
                            '<td>' + (IsEmpty(eaPubWorkflowList[i].oprUserName) ? eaPubWorkflowList[i].oprRoleName : eaPubWorkflowList[i].oprUserName) + '</td>',
                            '<td>' + eaPubWorkflowList[i].note + '</td>',
                            '<td>' + eaPubWorkflowList[i].dealTime + '</td>',
                            '<td>' + eaPubWorkflowList[i].weekDay + '</td>',
                            '</tr>'
                        ].join('');
                    }
                    $("#cmx-liucheng-record").append(html);
                }
            }
            if (GetUrlParamString('from') == 'iframe') {
                $('#cmx-edit-formtag input').attr('disabled', 'disabled');
                $('#cmx-edit-formtag select').attr('disabled', 'disabled');
                $('#cmx-edit-formtag textarea').attr('disabled', 'disabled');
                $('.changyongyu').hide();
                $('.banliyijian-tag').hide();
                $('#uploadfawenfujian').hide();
                $('#uploadqitafujian').hide();
                $('#related-file').hide();
                $('.remove-btn').hide();
            }
            send.go();
        })
        .start();
    //获取可发送联系人
    $('#cmx-choosemodalDiv').load(getSelectPerson, function () {
        $("#cmx-send").unbind('click'); //发送按钮
        $("#cmx-send").bind('click', function () {
            if (cmx.g.filesarray.get('901').length <= 0) {
                showAlert({
                    type: 'error',
                    content: '尚未新建正文，不能发送'
                });
                return;
            }
            //文印室发送给其他人时不用套红，只有发回拟稿人时才判断
            // if (_type == '6' && cmx.g.filesarray.get('902').length <= 0) {
            //     showAlert({
            //         type: 'error',
            //         content: '正文尚未套红，不能发送'
            //     });
            //     return;
            // }
            if (IsEmpty($('#commonSeal').val())) {
                showAlert({
                    type: 'error',
                    content: '公章为空，不能发送'
                });
                return;
            }
            if ($('#packageTime-2').val().length > 2) {
                showAlert({
                    type: 'error',
                    content: '封发时间日期不能超过2位。'
                });
                return;
            }
            // if (_type == '4' || _type == '5') {//局领导 秘书处
            //     if (IsEmpty($('#singIssue').val())) {
            //         showAlert({
            //             type: 'error',
            //             content: '签发人为空，不能发送'
            //         });
            //         return;
            //     }
            //     if (IsEmpty($('#singTime').val())) {
            //         showAlert({
            //             type: 'error',
            //             content: '签发时间为空，不能发送'
            //         });
            //         return;
            //     }
            // }
            if (_type == '6') {
                if (IsEmpty($('#singIssue').val())) {
                    showAlert({
                        type: 'error',
                        content: '签发人为空，不能发送'
                    });
                    return;
                }
                if (IsEmpty($('#singTime').val())) {
                    showAlert({
                        type: 'error',
                        content: '签发时间为空，不能发送'
                    });
                    return;
                }
                // if (IsEmpty($("#packageTime-1").val())) {
                //     showAlert({
                //         type: 'error',
                //         content: '封发时间不全，不能发送'
                //     });
                //     return;
                // }
                // if (IsEmpty($("#packageTime-2").val())) {
                //     showAlert({
                //         type: 'error',
                //         content: '封发时间不全，不能发送'
                //     });
                //     return;
                // }
            }
            // if(_type == '3')//文书室处判断需要填上文号才能发送
            // {
            //     if (IsEmpty($('#refNumBeg').val())) {
            //         showAlert({
            //             type: 'error',
            //             content: '文号为空，不能发送'
            //         });
            //         return;
            //     }
            //     if (IsEmpty($('#refNumMid').val())) {
            //         showAlert({
            //             type: 'error',
            //             content: '文号为空，不能发送'
            //         });
            //         return;
            //     }
            //     if (IsEmpty($('#refNumEnd').val())) {
            //         showAlert({
            //             type: 'error',
            //             content: '文号为空，不能发送'
            //         });
            //         return;
            //     }
            // }
            var reg = /[\u4e00-\u9fa5]/;
            if (reg.test($("#contactTel").val())) {
                showAlert({
                    type: 'error',
                    content: '电话号码不能包含汉字'
                });
                return;
            }
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
                            console.log(data)
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
                        console.log(result)
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
            $('#cmxAddPerson .modal-title').html('请选择发送人员');
            $("#cmx-person-save").html('确定并发送');
            $("#cmx-person-save").off('click');
            $("#cmx-person-save").on('click', function () {
                var userId = '';
                var instId = '';
                if ($("#cmx-TabsOne").hasClass("active")) {
                    userId = $("#cmx-generalperson input:checked").val();
                    $("#cmxAddPerson").modal("hide");
                }
                if ($("#cmx-TabsTwo").hasClass("active")) {
                    userId = $("#cmx-sendperson option:checked").val();
                    $("#cmxAddPerson").modal("hide");
                }
                var roleId = getData('roleId');
                if (getData('userId') == 'mishuchu' || roleId == 'RGJ0100001' || roleId == 'RGJ0200001' || roleId == 'RGJ0300001' || roleId == 'RGJ0400001' || roleId == 'RGJ0500001' || roleId == 'RGJ0600001') {
                    $("#confirm-modal").off('show.bs.modal');
                    $("#confirm-modal").on('show.bs.modal', function () {
                        $("#deal-type").text($('#openShape').find(':checked').text());
                        $("#cmx-confirm-save").off('click');
                        $("#cmx-confirm-save").on('click', function () {
                            if (!IsEmpty(userId)) {
                                new cmx.process()
                                    .turn('selectUserRole', {
                                        userId: userId
                                    })
                                    .turn(function (prevModelData, send, abort) {
                                        cmx.g.select_role = prevModelData;
                                        send.tomodel({
                                            data: JSON.stringify({
                                                token: getData('token'),
                                                applyId: _applyId,
                                                projectNum: _projectNum,
                                                nextTaskUser: userId,
                                                roleId: cmx.g.select_role,
                                                pbfFormData: getFormData(),
                                                opinion: $('#opinions').val(),
                                                remandDrafter: ''
                                            })
                                        }).go();
                                    })
                                    .turn('callajax', {
                                        url: api_ea + '/' + getApplyApi(_projectNum) + '/sendTransActFrame',
                                        type: 'POST'
                                    })
                                    .turn(function (prevModelData, send, abort) {
                                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                            showAlert({
                                                type: 'success',
                                                content: '发送成功！'
                                            });
                                            saveEaPubRelapplyList({
                                                callback: function () {
                                                    setTimeout(function () {
                                                        window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                                                    }, 1000);
                                                }
                                            });
                                        }
                                        send.go();
                                    }).start();
                            }
                        })
                    });
                    $("#confirm-modal").modal("show");
                } else {
                    if (!IsEmpty(userId)) {
                        new cmx.process()
                            .turn('selectUserRole', {
                                userId: userId
                            })
                            .turn(function (prevModelData, send, abort) {
                                cmx.g.select_role = prevModelData;
                                send.tomodel({
                                    data: JSON.stringify({
                                        token: getData('token'),
                                        applyId: _applyId,
                                        projectNum: _projectNum,
                                        nextTaskUser: userId,
                                        roleId: cmx.g.select_role,
                                        pbfFormData: getFormData(),
                                        opinion: $('#opinions').val(),
                                        remandDrafter: ''
                                    })
                                }).go();
                            })
                            .turn('callajax', {
                                url: api_ea + '/' + getApplyApi(_projectNum) + '/sendTransActFrame',
                                type: 'POST'
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                    showAlert({
                                        type: 'success',
                                        content: '发送成功！'
                                    });
                                    saveEaPubRelapplyList({
                                        callback: function () {
                                            setTimeout(function () {
                                                window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                                            }, 1000);
                                        }
                                    });
                                }
                                send.go();
                            }).start();
                    } else {
                        showAlert({
                            type: 'error',
                            content: '请选择发送人'
                        });
                    }
                }
            });
        });
    });
    //获取局领导
    $('#cmx-chooseLeaderDiv').load(getSelectLeader, function () {
        $("#cmx-send-leader").off('click'); //发送局领导按钮
        $("#cmx-send-leader").on('click', function () {
            $("#cmxAddLeader").off('show.bs.modal');
            $("#cmxAddLeader").on('show.bs.modal', function () {
                $("#cmx-generalleader").html('');
                new cmx.process()
                    .turn('callajax', {
                        url: api_aa + '/user/aaSachuserinfo/getSachLeaderList',
                        data: {
                            token: getData('token')
                        },
                        jsonheader: false,
                        type: 'GET'
                    })
                    .turn(function (prevModelData, send, abort) {
                        L(prevModelData);
                        var result = prevModelData;
                        if (!IsNull(prevModelData) && prevModelData.state == '200') {
                            var html = "";
                            var data = result.data;
                            for (var i = 0; i < data.length; i++) {
                                html += '<option instid="' + data[i].instId + '" value="' + data[i].userId + '">' + data[i].userName + '</option>';
                            }
                            $("#cmx-generalleader").append(html);
                        }
                        send.go();
                    })
                    .cfinally(function () {
                        $('#cmx-generalleader').selectpicker({
                            size: 'auto',
                            style: 'btn-transparent',
                            liveSearch: true
                        });
                        $('#cmx-generalleader').selectpicker('refresh');
                    })
                    .start();
            });
            $("#cmxAddLeader").modal("show");
            $("#cmx-leader-save").html('确定并发送');
            $("#cmx-leader-save").off('click');
            $("#cmx-leader-save").on('click', function () {
                var userId = '';
                userId = $("#cmx-generalleader option:checked").val();
                if (!IsEmpty(userId)) {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/' + getApplyApi(_projectNum) + '/sendTransActFrame',
                            type: 'POST',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: _applyId,
                                projectNum: _projectNum,
                                nextTaskUser: userId,
                                roleId: 'RGJ0000001',
                                pbfFormData: getFormData(),
                                opinion: $('#opinions').val(),
                                remandDrafter: ''
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                showAlert({
                                    type: 'success',
                                    content: '发送成功！'
                                });
                                saveEaPubRelapplyList({
                                    callback: function () {
                                        setTimeout(function () {
                                            window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                                        }, 1000);
                                    }
                                });
                            }
                            send.go();
                        }).start();
                } else {
                    showAlert({
                        type: 'error',
                        content: '请选择局领导'
                    });
                }
            });
        });
    });
    webUploadFile({
        "id": "#uploadfawenfujian", //选择器内自动生成上传文件按钮
        "label": "上传文件", //按钮文字
        "multiple": false, //多选，值为true表示多选，false表示单选
        "image": false, //图片选择，true代表上传图片，false代表文件
        "token": getData('token'), //验证身份
        "folder_id": 5, //文件夹id值
        "document_id": 0, //暂时不做修改，确定为0
        "document_upload_description": '', //暂时不做修改，确定为空
        "extra": '', //暂时不做修改，确定为空
        "passorend": 1,
        "fileDirectoryId": 50, //起文相关，除了正文之外的那些东西，也就是自己上传的附件
        success: function (param, response) {
            var fileindexid = response.data[0].fileIndex;
            fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
            fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
            fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
            var fileclassid = '904';
            if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                cmx.g.filesarray.put(fileclassid, []);
            }
            cmx.g.filesarray.get(fileclassid).push(fileindexid);
            $('#filelist-P0904.file-upload-list').prepend([
                '<li data-toggle="tooltip" data-placement="left" title="' + response.data[0].fileoriginalname + '" data-original-title="' + response.data[0].fileoriginalname + '" id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
                '<i class="icon wb-move" aria-hidden="true" draggable="true"></i>',
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
            sortable('#filelist-P0904', 'destroy');
            // sortable('#filelist-P0904');
            $('#filelist-P0904').sortable({
                handle: ".wb-move",
            });
        },
        error: function () {
            //集中处理过了
        }
    });
    webUploadFile({
        "id": "#uploadqitafujian", //选择器内自动生成上传文件按钮
        "label": "上传文件", //按钮文字
        "multiple": false, //多选，值为true表示多选，false表示单选
        "image": false, //图片选择，true代表上传图片，false代表文件
        "token": getData('token'), //验证身份
        "folder_id": 5, //文件夹id值
        "document_id": 0, //暂时不做修改，确定为0
        "document_upload_description": '', //暂时不做修改，确定为空
        "extra": '', //暂时不做修改，确定为空
        "passorend": 1,
        "fileDirectoryId": 50, //起文相关，除了正文之外的那些东西，也就是自己上传的附件
        success: function (param, response) {
            var fileindexid = response.data[0].fileIndex;
            fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
            fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
            fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
            var fileclassid = '906';
            if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                cmx.g.filesarray.put(fileclassid, []);
            }
            cmx.g.filesarray.get(fileclassid).push(fileindexid);
            $('#filelist-P0906.file-upload-list').prepend([
                '<li data-toggle="tooltip" data-placement="left" title="' + response.data[0].fileoriginalname + '" data-original-title="' + response.data[0].fileoriginalname + '" id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
                '<i class="icon wb-move" aria-hidden="true" draggable="true"></i>',
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
            sortable('#filelist-P0906', 'destroy');
            $('#filelist-P0906').sortable({
                handle: ".wb-move",
            });
        },
        error: function () {
            //集中处理过了
        }
    });
    //相关文件
    $('#cmx-relatedFileModel').load(getRelatedFile, function () {
        var param = {
            protectUnitName: _protectUnitName,
            province: _province,
            pageNo: 1,
            pageSize: 15,
            oldProFileTitle: "",
            oldoriginalNo: "",
            oldProjectName: "",
            callback: function (total) {
                //最后一页绑定
                $('#related-page .last').unbind('click');
                $('#related-page .last').bind('click', function () {
                    if (param.pageNo == total) {
                        showAlert({
                            type: 'info',
                            content: "已经是最后一页"
                        });
                    } else {
                        param.pageNo = total;
                        new cmx.process()
                            .turn('getRelevantFilesForZhuanfawen', param)
                            .start();
                    }
                });
                //下一页绑定
                $('#related-page .next').unbind('click');
                $('#related-page .next').bind('click', function () {
                    if (param.pageNo == total) {
                        showAlert({
                            type: 'info',
                            content: "已经是最后一页"
                        });
                    } else {
                        param.pageNo++;
                        new cmx.process()
                            .turn('getRelevantFilesForZhuanfawen', param)
                            .start();
                    }
                });
            }
        };
        //首页绑定
        $('#related-page .first').unbind('click');
        $('#related-page .first').bind('click', function () {
            if (param.pageNo == 1) {
                showAlert({
                    type: 'error',
                    content: '已经是第一页了'
                })
            } else {
                param.pageNo = 1;
                new cmx.process()
                    .turn('getRelevantFilesForZhuanfawen', param)
                    .start();
            }
        });
        //下一页绑定
        $('#related-page .pre').unbind('click');
        $('#related-page .pre').bind('click', function () {
            if (param.pageNo == 1) {
                showAlert({
                    type: 'error',
                    content: '已经是第一页了'
                });
            } else {
                param.pageNo--;
                new cmx.process()
                    .turn('getRelevantFilesForZhuanfawen', param)
                    .start();
            }
        });
        //显示更多查询条件
        $('#cmx-search-more').unbind('click');
        $('#cmx-search-more').bind('click', function () {
            $('#cmx-search-other').toggle();
            if ($('#cmx-search-other').is(':visible')) {
                $('#cmx-search-more').text('收起条件');
            } else {
                $('#cmx-search-more').text('更多查询条件');
            }
        });
        //绑定查询
        $('#cmx-search').unbind('click');
        $('#cmx-search').bind('click', function () {
            param.pageNo = 1;
            param.oldProFileTitle = $('#cmx-protect-title').val();
            param.oldoriginalNo = $('#cmx-old-protect-name').val();
            param.oldProjectName = $('#cmx-protect-name').val();
            new cmx.process()
                .turn('getRelevantFilesForZhuanfawen', param)
                .start();
        });
        //清除查询条件
        $('#cmx-delete').unbind('click');
        $('#cmx-delete').bind('click', function () {
            $('#cmx-protect-title').val('');
            $('#cmx-old-protect-name').val('');
            $('#cmx-protect-name').val('');
        });
        //显示模态框
        $("#related-file").unbind('click');
        $("#related-file").bind('click', function () {
            $('#cmx-protect-title').val('');
            $('#cmx-old-protect-name').val('');
            $('#cmx-protect-name').val('');
            param.pageNo = 1;
            param.oldProFileTitle = $('#cmx-protect-title').val();
            param.oldoriginalNo = $('#cmx-old-protect-name').val();
            param.oldProjectName = $('#cmx-protect-name').val();
            $("#cmx-related-file").off('show.bs.modal');
            $("#cmx-related-file").off('hide.bs.modal');
            $("#cmx-related-file").on('show.bs.modal', function () {
                new cmx.process()
                    .turn('getRelevantFilesForZhuanfawen', param)
                    .start();
            });
            $("#cmx-related-file").on('hide.bs.modal', function () {
                $('#cmx-protect-title').val('');
                $('#cmx-old-protect-name').val('');
                $('#cmx-protect-name').val('');
            });
            $("#cmx-related-file").modal("show");
        });
    });

    //流程跟踪
    $('#cmx-liucheng').on('click', function () {
        $('#cmx-liuchengModel').modal('show');
    });
    //保存
    $('#cmx-save').on('click', function () {
        saveForm(false);
    });
    //发给文印室
    $('#cmx-send-toprint').on('click', function () {
        if (_type == '4' || _type == '5') {
            if (IsEmpty($('#singIssue').val())) {
                showAlert({
                    type: 'error',
                    content: '签发人为空，不能发送'
                });
                return;
            }
            if (IsEmpty($('#singTime').val())) {
                showAlert({
                    type: 'error',
                    content: '签发时间为空，不能发送'
                });
                return;
            }
        }
        var roleId = getData('roleId');
        $("#confirm-modal").off('show.bs.modal');
        $("#confirm-modal").on('show.bs.modal', function () {
            $("#deal-type").text($('#openShape').find(':checked').text());
            $("#cmx-confirm-save").off('click');
            $("#cmx-confirm-save").on('click', function () {
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/' + getApplyApi(_projectNum) + '/sendTransActFrame',
                        type: 'POST',
                        data: JSON.stringify({
                            token: getData('token'),
                            applyId: _applyId,
                            projectNum: _projectNum,
                            nextTaskUser: 'wenyinshi', //发送文印室
                            roleId: 'RGJ0101004', //文印室roleId
                            pbfFormData: getFormData(),
                            opinion: $('#opinions').val(),
                            remandDrafter: ''
                        })
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                            showAlert({
                                type: 'success',
                                content: '发送成功！'
                            });
                            saveEaPubRelapplyList({
                                callback: function () {
                                    setTimeout(function () {
                                        window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                                    }, 1000);
                                }
                            });
                        }
                        send.go();
                    }).start();

            });
        });
        $("#confirm-modal").modal("show");
    });

    //发回拟稿人
    $('#cmx-send-draftor').on('click', function () {
        if (_type == '6') {
            if (IsEmpty($('#singIssue').val())) {
                showAlert({
                    type: 'error',
                    content: '签发人为空，不能发送'
                });
                return;
            }
            if (IsEmpty($('#singTime').val())) {
                showAlert({
                    type: 'error',
                    content: '签发时间为空，不能发送'
                });
                return;
            }
            if (cmx.g.filesarray.get('902').length <= 0) {
                showAlert({
                    type: 'error',
                    content: '正文尚未套红，不能发送'
                });
                return;
            }
        }
        showAlert({
            type: 'confirm',
            content: '确认发送回拟稿人？',
            callback: function (_state) {
                if (_state == 'yes') {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/' + getApplyApi(_projectNum) + '/sendTransActFrame',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: _applyId,
                                projectNum: _projectNum,
                                nextTaskUser: '',
                                roleId: '',
                                pbfFormData: getFormData(),
                                opinion: $('#opinions').val(),
                                remandDrafter: '1' //发回拟稿人需要把这个传1
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                                showAlert({
                                    type: 'success',
                                    content: '发回拟稿人成功！'
                                });
                                saveEaPubRelapplyList({
                                    callback: function () {
                                        setTimeout(function () {
                                            window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                                        }, 1000);
                                    }
                                });
                            }
                        })
                        .start();
                }
            },
            btn_1: '取消',
            btn_2: '确定'
        });
    });
    //办结
    $('#cmx-complete').on('click', function () {
        if (_projectNum == '56008_b') { //考古一般事项办结的特殊接口
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/docompletTaskArchaeology',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        acceptFlag: '1', //1是办结，2是考古处转办给别人
                        applyId: _applyId,
                        projectNum: _projectNum
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
                            location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                    }
                })
                .start();
        } else {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/' + getApplyApi(_projectNum) + '/docompletedCompleteTask',
                    data: JSON.stringify({
                        token: getData('token'),
                        applyId: _applyId,
                        projectNum: _projectNum
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200') {
                        showAlert({
                            type: 'success',
                            content: '办结成功！'
                        });
                        setTimeout(function () {
                            window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                        }, 1000);
                    }
                })
                .start();
        }
    });

    //作废
    $('#cmx-cancel').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/' + getApplyApi(_projectNum) + '/invalidateEaPubBatchFileByPK',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: _applyId,
                    projectNum: _projectNum
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '作废成功！'
                    });
                    setTimeout(function () {
                        window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                    }, 1000);
                }
            })
            .start();
    });
    new cmx.process()
        .turn(function (prevModelData, send, abort) {
            //报批件
            var _fileIndex = '';
            if (cmx.g.filesarray.get('903').length > 0) {
                _fileIndex = cmx.g.filesarray.get('903')[0];
            }
            var param = safeEncodeBase64(JSON.stringify({
                applyId: _applyId,
                fileIndex: _fileIndex,
                docClass: '1',
                userName: getData('userName'),
                token: getData('token')
            }));
            setServiceCache({
                key: 'key-bpj-' + _applyId,
                value: param,
                success: function () {
                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                        $('#cmx-approval').attr('href', weboffice_url + 'key-bpj-' + _applyId);
                    } else {
                        $('#cmx-approval').attr('href', 'sach://office;' + 'key-bpj-' + _applyId);
                    }
                },
                error: function (msg) {
                    $('#cmx-approval').attr('disabled', true);
                }
            });

            //报批件
            $('#cmx-approval').on('click', function () {
                if (!IsNull(_intervalbpj)) {
                    clearInterval(_intervalbpj);
                }
                _intervalbpj = setInterval('listenBpjWebOffice()', 3000);
            });
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            //新建正文
            var _fileIndex = '';
            if (cmx.g.filesarray.get('901').length > 0) {
                _fileIndex = cmx.g.filesarray.get('901')[0];
            }
            var param = safeEncodeBase64(JSON.stringify({
                applyId: _applyId,
                fileIndex: _fileIndex,
                docClass: '2',
                userName: getData('userName'),
                token: getData('token')
            }));
            setServiceCache({
                key: 'key-zw-' + _applyId,
                value: param,
                success: function () {
                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                        $('#cmx-add-receipt').attr('href', weboffice_url + 'key-zw-' + _applyId);
                    } else {
                        $('#cmx-add-receipt').attr('href', 'sach://office;' + 'key-zw-' + _applyId);
                    }
                },
                error: function (msg) {
                    $('#cmx-add-receipt').attr('disabled', true);
                }
            });

            $('#cmx-add-receipt').on('click', function () {
                if (!IsNull(_intervalzw)) {
                    clearInterval(_intervalzw);
                }
                _intervalzw = setInterval('listenZwWebOffice()', 3000);
            });
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            //正文
            var _fileIndex = '';
            if (cmx.g.filesarray.get('901').length > 0) {
                _fileIndex = cmx.g.filesarray.get('901')[0];
            } else {
                $('#cmx-receipt').attr('disabled', true);
                send.go();
                return;
            }
            var param = safeEncodeBase64(JSON.stringify({
                applyId: _applyId,
                fileIndex: _fileIndex,
                docClass: '2',
                userName: getData('userName'),
                token: getData('token'),
                justlook: justlook
            }));
            setServiceCache({
                key: 'key-zw-' + _applyId,
                value: param,
                success: function () {
                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                        $('#cmx-receipt').attr('href', weboffice_url + 'key-zw-' + _applyId);
                    } else {
                        $('#cmx-receipt').attr('href', 'sach://office;' + 'key-zw-' + _applyId);
                    }
                },
                error: function (msg) {
                    $('#cmx-receipt').attr('disabled', true);
                }
            });
            $('#cmx-receipt').on('click', function (event) {
                setServiceCache({
                    key: 'key-zw-' + _applyId,
                    value: param,
                    success: function () {
                        if (!IsNull(_intervalzw)) {
                            clearInterval(_intervalzw);
                        }
                        _intervalzw = setInterval('listenZwWebOffice()', 3000);
                    },
                    error: function (msg) {
                        showAlert({
                            type: 'error',
                            content: '配置正文失败，请重试'
                        });
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });

            });
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            //套红
            var _fileIndex = '';
            if (cmx.g.filesarray.get('901').length <= 0) {
                $('#cmx-setformat').attr('disabled', true);
                send.go();
                return;
            }
            if (BrowserType() == 'IE' || BrowserType() == '360') {
                $('#cmx-setformat').attr('href', weboffice_url + 'key-thh-' + _applyId);
            } else {
                $('#cmx-setformat').attr('href', 'sach://office;' + 'key-thh-' + _applyId);
            }
            $('#cmx-setformat').on('click', function (event) {
                var _fileIndex = cmx.g.filesarray.get('901')[0];
                var param = safeEncodeBase64(JSON.stringify({
                    applyId: _applyId,
                    fileIndex: _fileIndex,
                    docClass: '3',
                    userName: getData('userName'),
                    token: getData('token'),
                    CarbonCopy: $('#carbonCopy').val(),
                    IsThePerson: $('#isThePerson').val(),
                    MainSend: $('#mainSend').val(),
                    OpenShape: $('#openShape').find(':checked').text(),
                    ProTitle: $('#proTitle').val(),
                    RefNumber: $('#refNumBeg').find(':checked').text() + '〔' + $('#refNumMid').val() + '〕' + $('#refNumEnd').val() + '号',
                    IsTheUnit: $('#isTheUnit').val(),
                    PrintDate: formatDate('yyyy年M月d日', new Date()),
                    SingTime: formatDate('yyyy年M月d日', $('#singTime').val()),
                    SignUnit: $('#commonSeal').val() == '1' ? '国家文物局' : '国家文物局办公室'
                }));
                setServiceCache({
                    key: 'key-thh-' + _applyId,
                    value: param,
                    success: function () {
                        if (!IsNull(_intervalthh)) {
                            clearInterval(_intervalthh);
                        }
                        _intervalthh = setInterval('listenThhWebOffice()', 3000);
                    },
                    error: function (msg) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });

            });
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            //套红前正文
            if (cmx.g.filesarray.get('901').length <= 0) {
                $('#cmx-before-setformat').attr('disabled', true);
                send.go();
                return;
            }
            var _fileIndex = '';
            if (cmx.g.filesarray.get('901').length > 0) {
                _fileIndex = cmx.g.filesarray.get('901')[0];
            }
            var param = safeEncodeBase64(JSON.stringify({
                applyId: _applyId,
                fileIndex: _fileIndex,
                docClass: '9', //表示查看套红前正文
                userName: getData('userName'),
                token: getData('token'),
                justlook: justlook
            }));
            setServiceCache({
                key: 'key-zw-' + _applyId,
                value: param,
                success: function () {
                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                        $('#cmx-before-setformat').attr('href', weboffice_url + 'key-zw-' + _applyId);
                    } else {
                        $('#cmx-before-setformat').attr('href', 'sach://office;' + 'key-zw-' + _applyId);
                    }
                },
                error: function (msg) {
                    $('#cmx-before-setformat').attr('disabled', true);
                }
            });
            $('#cmx-before-setformat').on('click', function (event) {
                setServiceCache({
                    key: 'key-zw-' + _applyId,
                    value: param,
                    success: function () {
                        if (!IsNull(_intervalzw)) {
                            clearInterval(_intervalzw);
                        }
                        _intervalzw = setInterval('listenZwWebOffice()', 3000);
                    },
                    error: function (msg) {
                        showAlert({
                            type: 'error',
                            content: '配置正文失败，请重试'
                        });
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });

            });
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            //套红后正文
            if (cmx.g.filesarray.get('902').length <= 0) {
                $('#cmx-after-setformat').attr('disabled', true);
                send.go();
                return;
            }
            var _fileIndex = '';
            if (cmx.g.filesarray.get('902').length > 0) {
                _fileIndex = cmx.g.filesarray.get('902')[cmx.g.filesarray.get('902').length - 1];
            }
            //alert('请把这个截图给前端-套红后：' + _fileIndex);
            var param = safeEncodeBase64(JSON.stringify({
                applyId: _applyId,
                fileIndex: _fileIndex,
                docClass: '10', //表示查看套红后正文
                userName: getData('userName'),
                token: getData('token'),
                justlook: justlook
            }));
            setServiceCache({
                key: 'key-thh-' + _applyId,
                value: param,
                success: function () {
                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                        $('#cmx-after-setformat').attr('href', weboffice_url + 'key-thh-' + _applyId);
                    } else {
                        $('#cmx-after-setformat').attr('href', 'sach://office;' + 'key-thh-' + _applyId);
                    }
                },
                error: function (msg) {
                    $('#cmx-after-setformat').attr('disabled', true);
                }
            });
            $('#cmx-after-setformat').on('click', function (event) {
                setServiceCache({
                    key: 'key-thh-' + _applyId,
                    value: param,
                    success: function () {
                        if (!IsNull(_intervalthh)) {
                            clearInterval(_intervalthh);
                        }
                        _intervalthh = setInterval('listenThhWebOffice()', 3000);
                    },
                    error: function (msg) {
                        showAlert({
                            type: 'error',
                            content: '配置正文失败，请重试'
                        });
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });
            });
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            //打印正文
            if (cmx.g.filesarray.get('901').length <= 0) {
                $('#cmx-print').attr('disabled', true);
                send.go();
                return;
            }
            if (BrowserType() == 'IE' || BrowserType() == '360') {
                $('#cmx-print').attr('href', weboffice_url + 'key-dayin-' + _applyId);
            } else {
                $('#cmx-print').attr('href', 'sach://office;' + 'key-dayin-' + _applyId);
            }
            $('#cmx-print').on('click', function (event) {
                var _fileIndex = '',
                    _fileIndex2 = '';
                if (cmx.g.filesarray.get('901').length > 0) {
                    _fileIndex = cmx.g.filesarray.get('901')[0];
                }
                if (cmx.g.filesarray.get('909').length > 0) {
                    _fileIndex2 = cmx.g.filesarray.get('909')[0];
                }
                var wanchengshijian = '法定办理期限' + $('.timeLimit').html() + '个工作日，还剩' + $('.workDay').html() + '个工作日';
                if (_projectNum == '56022_c')
                    wanchengshijian = '';
                var param = safeEncodeBase64(JSON.stringify({
                    applyId: _applyId,
                    fileIndex: _fileIndex,
                    fileIndex2: _fileIndex2,
                    docClass: '8', //表示查看套红后正文
                    userName: getData('userName'),
                    token: getData('token'),
                    complete: wanchengshijian,
                    OpenShape: $('#openShape').find(':checked').text(),
                    SerialNo: $('#flowNumber').val(),
                    RefNumber: $('#refNumBeg').find(':checked').text() + '〔' + $('#refNumMid').val() + '〕' + $('#refNumEnd').val() + '号',
                    PackageTimeMonth: (IsNull($("#packageTime-1").find(':checked').text()) ? "" : $("#packageTime-1").find(':checked').text()),
                    PackageTimeDay: (IsNull($("#packageTime-2").val()) ? "" : $("#packageTime-2").val()),
                    CommonSeal: $('#commonSeal').find(':checked').text(),
                    DegreeUrgen: $('#degreeUrgen').find(':checked').text(),
                    DisNote: _DisNote,
                    IsTheUnit: $('#isTheUnit').val(),
                    IsThePerson: $('#isThePerson').val(),
                    ContactTel: $('#contactTel').val(),
                    ProTitle: $('#proTitle').val(),
                    MainSend: $('#mainSend').val(),
                    Newspaper: $('#carbonCopy').val() + '；' + $('#withinBureau').val(),
                    CarbonCopy: '',
                    justlook: justlook
                }));
                setServiceCache({
                    key: 'key-dayin-' + _applyId,
                    value: param,
                    success: function () {
                        if (!IsNull(_intervalthh)) {
                            clearInterval(_intervalthh);
                        }
                        _intervaldayin = setInterval('listenDayinWebOffice()', 3000);
                    },
                    error: function (msg) {
                        showAlert({
                            type: 'error',
                            content: '配置正文失败，请重试'
                        });
                        event.preventDefault();
                        event.stopPropagation();
                    }
                });

            });
            send.go();
        })
        .start();


    //原文
    $('#cmx-original-receipt').on('click', function () {
        var paramStr = '?isedit=0&status=' + _status + '&applyId=' + _applyId + '&projectNum=' + _projectNum;
        window.open('/app/f-gover-approval/applyinfo.html?frompage=zhuanfawen&from=undefined&' + paramStr + '&nowid=' + GetUrlParamString('nowid'));
    });
    //批量打印
    $('#cmx-multi-print').on('click', function () {
        var fileList = [];
        for (var id in cmx.g.filelinkfileclass) {
            var fileclassid = cmx.g.filelinkfileclass[id];
            new cmx.process()
                .turn('callajax', {
                    url: getFileList,
                    data: JSON.stringify({
                        token: getData('token'),
                        applyId: _applyId,
                        apprItem: _projectNum,
                        fileClass: fileclassid
                    }),
                    async: false,
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                        var response = prevModelData;
                        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                            cmx.g.filesarray.put(fileclassid, []);
                        }
                        for (var ft = 0; ft < response.data.length; ft++) {
                            var fileindexid = response.data[ft].fileIndex;
                            fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                            if (IsEmpty(fileindexid))
                                continue;
                            var fileName = response.data[ft].fileName;
                            fileList.push({
                                fileName: fileName,
                                fileIndexId: fileindexid
                            });
                        }
                    }
                })
                .start();
        }
        setServiceCache({
            key: 'key-mprint-' + _applyId,
            value: JSON.stringify(fileList),
            success: function () {
                event.preventDefault();
                event.stopPropagation();
            },
            error: function (msg) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
        window.open('sach://mprint;' + 'key-mprint-' + _applyId);
    });
    //返回
    $('#cmx-back').on('click', function () {
        window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid') + '&back=-1';
        // var back_url = document.referrer;
        // if (back_url.indexOf('&back=-1') >= 0) {
        //     window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
        // } else {
        //     window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid') + '&back=-1';
        // }
    });

    // 发文对比
    $("#cmx-duibi").off('click');
    $("#cmx-duibi").on('click', function () {
        $("#cmx-duibiModel").modal('show');
        new cmx.process()
            .turn('callajax', {
                url: getContrastList,
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: _applyId,
                    projectNum: _projectNum
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    var data = prevModelData.data;
                    $("#cmx-duibi-record").empty();
                    for (var i = 0; i < data.length; i++) {
                        var html = ['<tr>',
                            '<td>' + (data.length - i) + '</td>',
                            '<td>' + data[i].modUserName + '</td>',
                            '<td>' + data[i].modDate + '</td>',
                            '<td><button class="btn btn-primary btn-xs details" data-id="' + data[i].hisId + '" data-time="' + data[i].modDate + '">查看详情</button></td>',
                            '</tr>'
                        ].join('');
                        $("#cmx-duibi-record").append(html);
                    }
                    $(".details").off('click');
                    $(".details").on('click', function () {
                        var modDate = $(this).attr('data-time');
                        new cmx.process()
                            .turn('callajax', {
                                url: getContrastContent,
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: _applyId,
                                    projectNum: _projectNum,
                                    modDate: modDate
                                }),
                                type: 'POST'
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                                    $("#cmx-duibiModel").modal('hide');
                                    $("#cmx-detailsModel").modal('show');

                                    var data1 = prevModelData.data.length == 2 ? prevModelData.data[1] : prevModelData.data[0],
                                        data2 = prevModelData.data[0];
                                    var zhutiObj = {
                                        '0402050000': '执法督察',
                                        '0402060000': '保护工程',
                                        '0402070000': '安全监管',
                                        '0402080000': '博物馆管理',
                                        '0402100000': '社会文物',
                                        '0402140000': '保护科技',
                                        '0402160000': '考古发掘',
                                        '0402170000': '世界遗产',
                                        '0402230000': '涉建项目',
                                        '0402240000': '保护规划'
                                    }

                                    $("#zhuti").html(contrastStr(zhutiObj[data1.contentType], zhutiObj[data2.contentType]));
                                    $("#xingshi").html(contrastStr(data1.shapeCodeName, data2.shapeCodeName));
                                    $("#gongkai").html(contrastStr(data1.openShapeName, data2.openShapeName));
                                    $("#liushui").html(contrastStr(data1.reserve1, data2.reserve1));
                                    $("#wenhao").html(contrastStr(data1.refNumBegName, data2.refNumBegName) + '[' + contrastStr(data1.refNumMid, data2.refNumMid) + ']' + contrastStr(data1.refNumEnd, data2.refNumEnd));
                                    $("#fengfa").html(contrastStr(data1.packageTime, data2.packageTime));
                                    $("#huanji").html(contrastStr(data1.degreeUrgenName, data2.degreeUrgenName));
                                    $("#nidanwei").html(contrastStr(data1.isTheUnitSName, data2.isTheUnitSName)); // 
                                    $("#nigaoren").html(contrastStr(data1.isThePerson, data2.isThePerson));
                                    $("#dianhua").html(contrastStr(data1.contactTel, data2.contactTel));
                                    $("#biaoti").html(contrastStr(data1.proTitle, data2.proTitle));
                                    $("#zhusong").html(contrastStr(data1.mainSend, data2.mainSend));
                                    $("#chaosong").html(contrastStr(data1.carbonCopy, data2.carbonCopy));
                                    $("#junei").html(contrastStr(data1.withinBureau, data2.withinBureau));
                                    $("#gongzhang").html(contrastStr(data1.commonSealName, data2.commonSealName));
                                    $("#leixing").html(contrastStr(data1.paperTypeName, data2.paperTypeName));
                                    $("#qianfa").html(contrastStr(data1.singIssue, data2.singIssue));
                                    $("#qfshijian").html(contrastStr(data1.singTime, data2.singTime));
                                    $("#beizhu").html(contrastStr(data1.remark, data2.remark));
                                    $("#yijian").html(contrastStr(data1.reserve2, data2.reserve2));

                                    $("#cmx-detailsModel").on('hidden.bs.modal', function () {
                                        $("#cmx-duibiModel").modal('show');
                                    });
                                }
                            })
                            .start();
                    })
                }
            })
            .start();
    });

    // 修改痕迹
    $("#cmx-henji").off('click');
    $("#cmx-henji").on('click', function () {
        $("#cmx-henjiModel").modal('show');
        new cmx.process()
            .turn('callajax', {
                url: getCompareList,
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: _applyId,
                    projectNum: _projectNum
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    var data = prevModelData.data;
                    $("#cmx-henji-record").empty();
                    for (var i = 0; i < data.length; i++) {
                        var html = ['<tr>',
                            '<td>' + (i + 1) + '</td>',
                            '<td>' + data[i].itemName + '</td>',
                            '<td>' + data[i].oldValue + '</td>',
                            '<td>' + data[i].newValue + '</td>',
                            '<td>' + data[i].modDate + '</td>',
                            '<td>' + data[i].modUserName + '</td>',
                            '</tr>'
                        ].join('');
                        $("#cmx-henji-record").append(html);
                    }
                }
            })
            .start();
    });
    //上传最终稿文字向上调整
    $("#cmx-upload-file").find("div:first").css("padding-top", "3px");
});
var _intervalbpj = undefined;
var _intervalzw = undefined;
var _intervalthh = undefined;
var _intervaldayin = undefined;

function listenBpjWebOffice() {
    listenWebOffice('bpj');
}

function listenZwWebOffice() {
    listenWebOffice('zw');
}

function listenThhWebOffice() {
    listenWebOffice('thh');
}

function listenDayinWebOffice() {
    listenWebOffice('dayin');
}

function listenWebOffice(typeStr) {

    getServiceCache({
        key: 'zfw-' + typeStr + ':' + _applyId,
        success: function (prevModelData) {
            var _fileIndex = prevModelData.baseValue;
            if (!IsEmpty(_fileIndex)) {
                switch (typeStr) {
                    case 'bpj':
                        if (IsNull(cmx.g.filesarray.get('903')[0]) || cmx.g.filesarray.get('903')[0] != _fileIndex) {
                            cmx.g.filesarray.put('903', []);
                            cmx.g.filesarray.get('903').push(_fileIndex);
                            if (cmx.g.filesarray.get('903').length > 0) {
                                _fileIndex = cmx.g.filesarray.get('903')[0];
                            }
                            var param = safeEncodeBase64(JSON.stringify({
                                applyId: _applyId,
                                fileIndex: _fileIndex,
                                docClass: '1',
                                userName: getData('userName'),
                                token: getData('token')
                            }));
                            setServiceCache({
                                key: 'key-bpj-' + _applyId,
                                value: param,
                                success: function () {
                                    saveForm(true);
                                    // showAlert({
                                    //     type: 'info',
                                    //     content: '报批件已发生更新'
                                    // });
                                },
                                error: function (msg) {
                                    showAlert({
                                        type: 'error',
                                        content: '报批件同步失败，' + msg
                                    });
                                }
                            });

                        }
                        break;
                    case 'zw':
                        if (IsNull(cmx.g.filesarray.get('901')[0]) || cmx.g.filesarray.get('901')[0] != _fileIndex) {
                            cmx.g.filesarray.put('901', []);
                            cmx.g.filesarray.get('901').push(_fileIndex);
                            saveForm(true);
                            $('#cmx-add-receipt').hide();
                            $('#cmx-receipt').css('display', 'inline-block');
                            //正文
                            var param = safeEncodeBase64(JSON.stringify({
                                applyId: _applyId,
                                fileIndex: _fileIndex,
                                docClass: '2',
                                userName: getData('userName'),
                                token: getData('token')
                            }));
                            setServiceCache({
                                key: 'key-zw-' + _applyId,
                                value: param,
                                success: function () {
                                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                                        $('#cmx-receipt').attr('href', weboffice_url + 'key-zw-' + _applyId);
                                    } else {
                                        $('#cmx-receipt').attr('href', 'sach://office;' + 'key-zw-' + _applyId);
                                    }
                                    $('#cmx-receipt').attr('disabled', false);
                                },
                                error: function (msg) {
                                    $('#cmx-receipt').attr('disabled', true);
                                }
                            });
                        }
                        break;
                    case 'thh':
                        L('-------1：' + cmx.g.filesarray.get('902')[0]);
                        L('-------2：' + cmx.g.filesarray.get('902')[cmx.g.filesarray.get('902').length - 1]);
                        L('-------3：' + _fileIndex);
                        L('-------4：' + lastDocFileIndex);
                        if ((IsNull(cmx.g.filesarray.get('902')[0]) || cmx.g.filesarray.get('902')[cmx.g.filesarray.get('902').length - 1] != _fileIndex) && IsEmpty(lastDocFileIndex)) {
                            //alert('请把这个截图给前端-套红后：' + _fileIndex);
                            cmx.g.filesarray.put('902', []);
                            cmx.g.filesarray.get('902').push(_fileIndex);
                            $('#cmx-before-setformat').css('display', 'inline-block');
                            $('#cmx-after-setformat').css('display', 'inline-block');
                            $('#cmx-setformat').css('display', 'none');
                            $('#cmx-after-setformat').attr('disabled', false);
                            $('#cmx-receipt').css('display', 'none');
                            if (cmx.g.filesarray.get('902').length <= 0) {
                                $('#cmx-after-setformat').attr('disabled', true);
                                send.go();
                                return;
                            }
                            if (BrowserType() == 'IE' || BrowserType() == '360') {
                                $('#cmx-after-setformat').attr('href', weboffice_url + 'key-thh-' + _applyId);
                            } else {
                                $('#cmx-after-setformat').attr('href', 'sach://office;' + 'key-thh-' + _applyId);
                            }
                            $('#cmx-after-setformat').off('click');
                            $('#cmx-after-setformat').on('click', function (event) {
                                var param = safeEncodeBase64(JSON.stringify({
                                    applyId: _applyId,
                                    fileIndex: _fileIndex,
                                    docClass: '10', //表示查看套红后正文
                                    userName: getData('userName'),
                                    token: getData('token')
                                }));
                                setServiceCache({
                                    key: 'key-thh-' + _applyId,
                                    value: param,
                                    success: function () {
                                        if (!IsNull(_intervalthh)) {
                                            clearInterval(_intervalthh);
                                        }
                                        _intervalthh = setInterval('listenThhWebOffice()', 3000);
                                    },
                                    error: function (msg) {
                                        event.preventDefault();
                                        event.stopPropagation();
                                    }
                                });

                            });
                            saveForm(true);
                        }
                        break;
                    case 'dayin':
                        if (IsNull(cmx.g.filesarray.get('909')[0]) || cmx.g.filesarray.get('909')[0] != _fileIndex) {
                            cmx.g.filesarray.put('909', []);
                            cmx.g.filesarray.get('909').push(_fileIndex);
                            saveForm(true);
                            //打印正文
                            var param = safeEncodeBase64(JSON.stringify({
                                applyId: _applyId,
                                fileIndex: _fileIndex,
                                docClass: '8',
                                userName: getData('userName'),
                                token: getData('token')
                            }));
                            setServiceCache({
                                key: 'key-dayin-' + _applyId,
                                value: param,
                                success: function () {
                                    if (!IsNull(_intervaldayin)) {
                                        clearInterval(_intervaldayin);
                                    }
                                    _intervaldayin = setInterval('listenDayinWebOffice()', 3000);
                                },
                                error: function (msg) {}
                            });
                        }
                        break;
                }
            }
        },
        error: function (msg) {

        }
    });
}

function saveForm(noAlert) {
    if (IsEmpty($('#proTitle').val())) {
        showAlert({
            type: 'error',
            content: '请填写发文标题。'
        });
        return;
    }
    if ($('#proTitle').val().length > 400) {
        showAlert({
            type: 'error',
            content: '发文标题不能超过400字。'
        });
        return;
    }
    if ($('#mainSend').val().length > 400) {
        showAlert({
            type: 'error',
            content: '主送不能超过400字。'
        });
        return;
    }
    if (IsEmpty($('#commonSeal').val())) {
        showAlert({
            type: 'error',
            content: '请选择公章类型。'
        });
        return;
    }
    if ($('#packageTime-2').val().length > 2) {
        showAlert({
            type: 'error',
            content: '封发时间日期不能超过2位。'
        });
        return;
    }
    var reg = /[\u4e00-\u9fa5]/;
    if (reg.test($("#contactTel").val())) {
        showAlert({
            type: 'error',
            content: '电话号码不能包含汉字'
        });
        return;
    }
    if ($('#remark').val().length > 500) {
        showAlert({
            type: 'error',
            content: '备注不能超过500字'
        });
        return;
    }
    if ($('#opinions').val().length > 500) {
        showAlert({
            type: 'error',
            content: '办理意见不能超过500字'
        });
        return;
    }
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/' + getApplyApi(_projectNum) + '/saveTransActFrame',
            data: JSON.stringify({
                token: getData('token'),
                applyId: _applyId,
                projectNum: _projectNum,
                pbfFormData: getFormData(),
                paFormData: {
                    opinions: $('#opinions').val()
                }
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                if (!noAlert)
                    showAlert({
                        type: 'success',
                        content: '保存成功！'
                    });
                saveEaPubRelapplyList({
                    callback: function () {

                    }
                });
            }
        })
        .start();
}

function saveEaPubRelapplyList(param) {
    var prFormData = [];
    for (var i = 0; i < cmx.g.relatedFile.values().length; i++) {
        prFormData[i] = {
            applyId: _applyInfo.applyId,
            projectNum: _projectNum,
            batchId: _batchId,
            oldProjectNum: cmx.g.relatedFile.values()[i].oldProjectNum,
            oldApplyId: cmx.g.relatedFile.values()[i].oldApplyId,
            oldBatchId: cmx.g.relatedFile.values()[i].oldBatchId,
            proFileTitle: _applyInfo.proFileTitle,
            projectName: _applyInfo.projectName,
            fileNum: _applyInfo.proFileNum,
            relId: cmx.g.relatedFile.values()[i].relId
            //statue: cmx.g.relatedFile.values()[i].oldStatus //所选项目的状态
            //protectTitle: cmx.g.relatedFile.values()[i].protectTitle //所选项目的名字
        }
    }
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubRelapply/saveEaPubRelapplyList', //需要问一下是否一致是新增，还是删了之后再新增
            data: JSON.stringify({
                token: getData('token'),
                batchId: _batchId,
                prFormData: prFormData
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                param.callback();
                send.go();
            } else {
                showAlert({
                    type: 'error',
                    content: '相关附件保存失败'
                });
            }
        })
        .start();
}

function formatSelectValue(data) {
    return (IsEmpty(data) || data == -1) ? '' : data;
}


function cmx_special_infoNumBeg(data) { //用于封发时间的处理
    var cmx_year = new Date();
    var cmx_currentyear = cmx_year.getFullYear();
    var cmx_fullyear = [];
    for (var i = 2; i > 0; i--) {
        cmx_fullyear[2 - i] = cmx_currentyear - i;
    }
    cmx_fullyear[2] = cmx_currentyear;
    for (var i = 1; i < 3; i++) {
        cmx_fullyear[2 + i] = cmx_currentyear + i;
    }
    var _monthStr = '';
    for (var m = 1; m <= 12; m++) {
        if (m < 10) { //后端处理需要特别的格式成两位，如果需求需要改这里，需要告诉后端修改对应部分
            _monthStr += '<option value="0' + m + '">' + '0' + m + '</option>';
        } else {
            _monthStr += '<option value="' + m + '">' + m + '</option>';
        }

    }
    $('#refNumMid').val(cmx_currentyear);
    $('#packageTime-1').html('<option value="-1" selected></option>' + _monthStr);
}

function removeRelatedFile(ev, ele, oldBatchId) {
    $(ele).parent().remove();
    cmx.g.relatedFile.remove(oldBatchId);
    console.log(cmx.g.relatedFile.values())
}
// 发文对比字符串
function contrastStr(str1, str2) {
    if (str1 == str2) {
        return '<span>' + str1 + '</span>';
    }
    var len = str1.length >= str2.length ? str1.length : str2.length;
    for (var i = 0; i < len; i++) {
        if (str1[i] != str2[i]) {
            var html = '<span>' + str1.substring(0, i) + '<del style="color:#aaa">' + str1.substring(i, str1.length) + '</del><span style="color:red;">' + str2.substring(i, str2.length) + '</span></sapn>';
            return html;
        }
    }
}