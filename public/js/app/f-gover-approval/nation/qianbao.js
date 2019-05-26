/*
 * @Author: lvjinxiu 
 * @Date: 2017-11-30 16:55:28 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-09 14:35:03
 */
var _applyId = '';
var _status = '';
var _type = '';
var _protectUnitName, _province;
var isTheUnitVal = '';
var _DisNote = ''; //用于将办理意见列表传给weboffice
var _hostPerson = ''; //记录主办人
var _applyInfo = {};
var _batchId = '';
var _projectNum = "56008_b";
cmx.g.regist('relatedFile', new HashMap());

$(document).ready(function () {
    if (GetUrlParamString('from') == 'iframe') {
        $('#cmx-edit-formtag').css('height', '450px');
        $('#cmx-edit-formtag').css('margin-bottom', '0');
    } else {
        $('#cmx-edit-formtag').css('height', getClientHeight() - 142);
        $('#cmx-edit-formtag').css('margin-bottom', '0');
    }
    if (!IsEmpty(GetUrlParamString('type'))) {
        _type = GetUrlParamString('type');
    }
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/user/aaSachuserinfo/getArchInstUser',
            data: {
                token: getData('token')
            },
            type: 'GET',
            async: false
        })
        .turn(function (prevModelData, send, abort) {
            var data = prevModelData.data;
            for (var i = 0; i < data.length; i++) {
                $('#isThePerson').append('<option value="' + data[i].userId + '">' + data[i].userName + '</option>');
            }
        })
        .start();
    $('#isTheDate').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd'
    });
    new cmx.process()
        .turn('initFiles', {
            'P0912': '912', //发文附件
            'P0911': '911', //报批件
            //'P0913': '913' //打印报批件
        })
        .turn('buildDataDic', {
            element: $('#degreeUrgen'),
            hasAll: false,
            hasEmpty: true,
            type: 'select'
        })
        .turn('showOptByRole')
        .start();

    if (!IsEmpty(GetUrlParamString('applyId'))) {
        _applyId = GetUrlParamString('applyId');
        cmx.g.applyId = _applyId;
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubCountersign/getEaPubBatchFileAndOpinion',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    batchId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (prevModelData.state == '200') {
                    var data = prevModelData.data;
                    $("#proTitle").val(data.proTitle);
                    $("#flowWaterBeg").val(data.flowWaterBeg);
                    $("#flowWaterEnd").val(data.flowWaterEnd);
                    $("#degreeUrgen").val(data.degreeUrgen);
                    $("#isThePerson").val(data.isThePerson);
                    $("#contactTel").val(data.contactTel);
                    $("#isTheUnit").val(data.isTheUnit);
                    $("#isTheDate").val(data.isTheDate.substr(0, 10));
                    $("#remark").val(data.remark);
                    _batchId = data.batchId;
                    isTheUnitVal = data.isTheUnit;
                    if(data.isThePerson != getData('userId')){
                        $('#cmx-complete').hide();
                    }
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
                        .turn(function (prevModelData2, send2, abort2) {
                            if (!IsNull(prevModelData2) && prevModelData2.state == '200') {
                                var relatefilelist = prevModelData2.data;
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
                                });
                            }
                            send2.go();
                        })
                        .start();
                }
                send.go();
            })
            //流程跟踪
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
            .turn(function (prevModelData, send, abort) {
                //报批件
                var _fileIndex = '';
                if (cmx.g.filesarray.get('911').length > 0) {
                    _fileIndex = cmx.g.filesarray.get('911')[0];
                }
                var param = safeEncodeBase64(JSON.stringify({
                    applyId: _applyId,
                    fileIndex: _fileIndex,
                    docClass: '19',
                    userName: getData('userName'),
                    token: getData('token')
                }));
                setServiceCache({
                    key: 'key-qianbao-' + _applyId,
                    value: param,
                    success: function () {
                        if (BrowserType() == 'IE' || BrowserType() == '360') {
                            $('#cmx-add-receipt').attr('href', weboffice_url + 'key-qianbao-' + _applyId);
                        } else {
                            $('#cmx-add-receipt').attr('href', 'sach://office;' + 'key-qianbao-' + _applyId);
                        }
                    },
                    error: function (msg) {
                        $('#cmx-add-receipt').attr('disabled', true);
                    }
                });

                //报批件
                $('#cmx-add-receipt').on('click', function () {
                    if (!IsNull(_intervalbpj)) {
                        clearInterval(_intervalbpj);
                    }
                    _intervalbpj = setInterval('listenBpjWebOffice()', 3000);
                });
                send.go();
            })
            .turn(function (prevModelData, send, abort) {
                //打印正文
                if (cmx.g.filesarray.get('911').length <= 0) {
                    $('#cmx-print').attr('disabled', true);
                    send.go();
                    return;
                }
                if (BrowserType() == 'IE' || BrowserType() == '360') {
                    $('#cmx-print').attr('href', weboffice_url + 'key-dayinbpj-' + _applyId);
                } else {
                    $('#cmx-print').attr('href', 'sach://office;' + 'key-dayinbpj-' + _applyId);
                }
                $('#cmx-print').on('click', function (event) {
                    var _fileIndex = '',
                        _fileIndex2 = '';
                    if (cmx.g.filesarray.get('911').length > 0) {
                        _fileIndex = cmx.g.filesarray.get('911')[0];
                    }
                    if (cmx.g.filesarray.get('913').length > 0) {
                        _fileIndex2 = cmx.g.filesarray.get('913')[0];
                    }
                    var param = safeEncodeBase64(JSON.stringify({
                        applyId: _applyId,
                        fileIndex: _fileIndex,
                        fileIndex2: _fileIndex2,
                        docClass: '20',
                        userName: getData('userName'),
                        token: getData('token'),
                        SerialNo: $('#flowWaterBeg').val(),
                        DegreeUrgen: $('#degreeUrgen').find(':checked').text(),
                        DisNote: _DisNote,
                        IsTheUnit: $('#isTheUnit').val(),
                        IsThePerson: $('#isThePerson').val(),
                        ContactTel: $('#contactTel').val(),
                        ProTitle: $('#proTitle').val(),
                        justlook: justlook
                    }));
                    setServiceCache({
                        key: 'key-dayinbpj-' + _applyId,
                        value: param,
                        success: function () {
                            if (!IsNull(_intervalthh)) {
                                clearInterval(_intervalthh);
                            }
                            _intervaldayin = setInterval('listenDayinWebOffice()', 3000);
                        },
                        error: function (msg) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    });

                });
                send.go();
            })
            //附件
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
                                cmx.g.filesarray.put(fileclassid, []);

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
                    $('#filelist-P0912').sortable({
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
            .turn(function (prevModelData, send, abort) {
                if (cmx.g.filesarray.get('911').length > 0) {
                    $('#cmx-add-receipt').hide();
                    $('#cmx-receipt').css('display', 'inline-block');
                }
                send.go();
            })
            .turn(function (prevModelData, send, abort) {
                //正文
                var _fileIndex = '';
                if (cmx.g.filesarray.get('911').length > 0) {
                    _fileIndex = cmx.g.filesarray.get('911')[0];
                } else {
                    $('#cmx-receipt').attr('disabled', true);
                    send.go();
                    return;
                }
                var param = safeEncodeBase64(JSON.stringify({
                    applyId: _applyId,
                    fileIndex: _fileIndex,
                    docClass: '19',
                    userName: getData('userName'),
                    token: getData('token'),
                    justlook: justlook
                }));
                setServiceCache({
                    key: 'key-qianbao-' + _applyId,
                    value: param,
                    success: function () {
                        if (BrowserType() == 'IE' || BrowserType() == '360') {
                            $('#cmx-receipt').attr('href', weboffice_url + 'key-qianbao-' + _applyId);
                        } else {
                            $('#cmx-receipt').attr('href', 'sach://office;' + 'key-qianbao-' + _applyId);
                        }
                    },
                    error: function (msg) {
                        $('#cmx-receipt').attr('disabled', true);
                    }
                });
                $('#cmx-receipt').on('click', function (event) {
                    if (!IsNull(_intervalzw)) {
                        clearInterval(_intervalzw);
                    }
                    _intervalzw = setInterval('listenBpjWebOffice()', 3000);
                });
                send.go();
            })
            .start();
    }
    if (!IsEmpty(GetUrlParamString('status'))) {
        _status = GetUrlParamString('status');
    }
    //附件
    webUploadHuiQianFile({
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
            var fileclassid = '912';
            if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                cmx.g.filesarray.put(fileclassid, []);
            }
            cmx.g.filesarray.get(fileclassid).push(fileindexid);
            $('#filelist-P0912.file-upload-list').prepend([
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
            sortable('#filelist-P0912', 'destroy');
            $('#filelist-P0912').sortable({
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
                            .turn('getRelevantFilesForHuiqian', param)
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
                            .turn('getRelevantFilesForHuiqian', param)
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
                    .turn('getRelevantFilesForHuiqian', param)
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
                    .turn('getRelevantFilesForHuiqian', param)
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
                .turn('getRelevantFilesForHuiqian', param)
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
                    .turn('getRelevantFilesForHuiqian', param)
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

    //保存
    $('#cmx-save').on('click', function () {
        saveForm(false);
    });
    //发送
    $('#cmx-choosemodalDiv').load(getSelectPerson, function () {
        $("#cmx-send").unbind('click'); //发送按钮
        $("#cmx-send").bind('click', function () {
            if (cmx.g.filesarray.get('911').length <= 0) {
                showAlert({
                    type: 'error',
                    content: '尚未新建正文，不能发送'
                });
                return;
            }
            if (IsEmpty($('#proTitle').val())) {
                showAlert({
                    type: 'error',
                    content: '请填写签报标题。'
                });
                return;
            }
            if ($('#proTitle').val().length > 50) {
                showAlert({
                    type: 'error',
                    content: '签报标题不能超过50字。'
                });
                return;
            }
            // if (IsEmpty($('#degreeUrgen').val())) {
            //     showAlert({
            //         type: 'error',
            //         content: '请选择缓急。'
            //     });
            //     return;
            // }
            var reg = /[\u4e00-\u9fa5]/;
            if (reg.test($("#contactTel").val())) {
                showAlert({
                    type: 'error',
                    content: '电话号码不能包含汉字'
                });
                return;
            }
            if ($('#remark').val().length > 1000) {
                showAlert({
                    type: 'error',
                    content: '备注不能超过1000字'
                });
                return;
            }
            if ($('#opinions').val().length > 100) {
                showAlert({
                    type: 'error',
                    content: '办理意见不能超过100字'
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
                new cmx.process()
                    .turn('selectUserRole', {
                        userId: userId
                    })
                    .turn(function (prevModelData, send, abort) {
                        cmx.g.select_role = prevModelData;
                        send.tomodel({
                            data: JSON.stringify({
                                token: getData('token'),
                                batchId: _batchId,
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
                        url: api_ea + '/eaPubCountersign/sendTransActFrame',
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                            saveEaPubRelapplyList({
                                callback: function () {
                                    showAlert({
                                        type: 'success',
                                        content: '发送成功！'
                                    });
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
    });

    //发送局领导
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
                            url: api_ea + '/eaPubCountersign/sendTransActFrame',
                            type: 'POST',
                            data: JSON.stringify({
                                token: getData('token'),
                                batchId: _batchId,
                                projectNum: _projectNum,
                                nextTaskUser: userId,
                                roleId: cmx.g.select_role,
                                pbfFormData: getFormData(),
                                opinion: $('#opinions').val(),
                                remandDrafter: ''
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                saveEaPubRelapplyList({
                                    callback: function () {
                                        showAlert({
                                            type: 'success',
                                            content: '发送成功！'
                                        });
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

    //流程跟踪
    $('#cmx-liucheng').on('click', function () {
        $('#cmx-liuchengModel').modal('show');
    });
    //发给文印室
    $('#cmx-send-toprint').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubCountersign/sendTransActFrame',
                type: 'POST',
                data: JSON.stringify({
                    token: getData('token'),
                    batchId: _batchId,
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
                    saveEaPubRelapplyList({
                        callback: function () {
                            showAlert({
                                type: 'success',
                                content: '发送文印室成功！'
                            });
                            setTimeout(function () {
                                window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
                            }, 1000);
                        }
                    });
                }
                send.go();
            }).start();
    });

    //发回拟稿人
    $('#cmx-send-draftor').on('click', function () {
        showAlert({
            type: 'confirm',
            content: '确认发送回拟稿人？',
            callback: function (_state) {
                if (_state == 'yes') {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaPubCountersign/sendTransActFrame',
                            type: 'POST',
                            data: JSON.stringify({
                                token: getData('token'),
                                batchId: _batchId,
                                projectNum: _projectNum,
                                nextTaskUser: '',
                                roleId: '',
                                pbfFormData: getFormData(),
                                opinion: $('#opinions').val(),
                                remandDrafter: '1'
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                                saveEaPubRelapplyList({
                                    callback: function () {
                                        showAlert({
                                            type: 'success',
                                            content: '发回拟稿人成功！'
                                        });
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
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubCountersign/docompletedCompleteTask',
                data: JSON.stringify({
                    token: getData('token'),
                    batchId: _batchId,
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
    });

    //作废
    $('#cmx-cancel').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubCountersign/invalidateEaPubCountersignByPK',
                data: JSON.stringify({
                    token: getData('token'),
                    batchId: _batchId,
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

    });

    // 修改痕迹
    $("#cmx-henji").off('click');
    $("#cmx-henji").on('click', function () {
        $("#cmx-henjiModel").modal('show');
        new cmx.process()
            .turn('callajax', {
                url: api_ea + "/eaPubCountersign/getCompareListByApplyID",
                data: JSON.stringify({
                    token: getData('token'),
                    batchId: _batchId
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
});

//根据角色显示不同的按钮操作
var lastDocFileIndex = '';
var isInit = false
var justlook = '0';
cmx.route.model({
    index: 'showOptByRole',
    handle: function (parameter, prevModelData, send, abort) {
        switch (_type) {
            case '0': //第一步
                $('#cmx-save').show();
                $('#cmx-back').show();
                $('#isTheUnit').val(getData('userName')).attr('readonly', true);
                $('#isTheDate').val(fnDate().substr(0, 10));
                break;
            case '-1': //第二步
                $('.banliyijian-tag').removeClass('hidden');
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-cancel').css('display', 'inline-block');
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                if (getData('userName') == _hostPerson) { //判断只有主办人才能看到作废按钮
                    $('#cmx-cancel').css('display', 'inline-block');
                }
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-add-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                break;
            case '1': //处长处员处理中
                $('.banliyijian-tag').removeClass('hidden');
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-add-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = 'type=0&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
            case '2': //司领导处理中
                $('.banliyijian-tag').removeClass('hidden');
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-zhuanjia').removeClass('hidden');
                $('#cmx-zhuanjia').css('display', 'inline-block');
                $('#cmx-zhuanjia').on('click', function () {
                    var paramStr = 'type=0&sp=buzhuanjia&from=' + GetUrlParamString('from') + '&status=213&applyId=' + _applyId + '&projectNum=' + _projectNum + '&nowid=' + GetUrlParamString('nowid');
                    location.href = '/app/f-gover-approval/nation/zhuanjiajigou.html?' + paramStr;
                });
                break;
            case '3': //文书室处理中
                $('.banliyijian-tag').removeClass('hidden');
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-save').css('display', 'inline-block');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-send-leader').css('display', 'inline-block'); //发送局领导
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('#cmx-multi-print').css('display', 'inline-block');
                break;
            case '4': //局领导处理中
            case '5': //秘书处处理中
                $('.banliyijian-tag').removeClass('hidden');
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-send-toprint').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                if (IsEmpty($("#singTime").val())) {
                    $("#singTime").val(fnDate().substr(0, 10));
                }
                break;
            case '6': //文印室
                // $('#cmx-save').css('display', 'inline-block');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-send').css('display', 'inline-block');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-send-draftor').css('display', 'inline-block');
                $('#cmx-receipt').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-original-receipt').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('.input-group select').attr('disabled', true);
                $('.input-group input').attr('disabled', true);
                $('.input-group textarea').attr('disabled', true);
                $('.changyongyu').hide();
                $('#uploadfawenfujian').hide();
                $('#related-file').hide();
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                $('.banliyijian-tag').hide();
                break;
            case '7': //发回拟稿人办结
                $('.banliyijian-tag').removeClass('hidden');
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-complete').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('.input-group select').attr('disabled', true);
                $('.input-group input').attr('disabled', true);
                $('.input-group textarea').attr('disabled', true);
                $('.changyongyu').hide();
                $('#uploadfawenfujian').hide();
                $('#related-file').hide();
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                break;
            case '8': //查看
                $('.changyongyu').removeClass('hidden');
                $('.banliyijian-list').removeClass('hidden');
                $('#cmx-liucheng').css('display', 'inline-block');
                $('#cmx-print').css('display', 'inline-block');
                $('#cmx-approval').css('display', 'inline-block');
                $('#cmx-back').css('display', 'inline-block');
                $('.input-group select').attr('disabled', true);
                $('.input-group input').attr('disabled', true);
                $('.input-group textarea').attr('disabled', true);
                $('.changyongyu').hide();
                $('#uploadfawenfujian').hide();
                $('#related-file').hide();
                // $('#cmx-duibi').css('display', 'inline-block');
                $('#cmx-henji').css('display', 'inline-block');
                break;
        }
        $('#commonwords').attr('disabled', false);
        send.go();
    }
});

function getFormData() {
    return {
        proTitle: $('#proTitle').val(),
        flowWaterBeg: $('#flowWaterBeg').val(),
        flowWaterEnd: $('#flowWaterEnd').val(),
        degreeUrgen: $('#degreeUrgen').find(':selected').val(),
        isTheUnit: $('#isTheUnit').val(),
        isThePerson: $('#isThePerson').val(),
        contactTel: $('#contactTel').val(),
        isTheDate: $('#isTheDate').val(),
        remark: $('#remark').val(),
        files: getFileListForSave(cmx.g.filelinkfileclass),
        batchId: _batchId
    };
}

function saveEaPubRelapplyList(param) {
    var prFormData = [];
    for (var i = 0; i < cmx.g.relatedFile.values().length; i++) {
        prFormData[i] = {
            applyId: _applyId,
            projectNum: _projectNum,
            batchId: _batchId,
            oldProjectNum: cmx.g.relatedFile.values()[i].oldProjectNum,
            oldApplyId: cmx.g.relatedFile.values()[i].oldApplyId,
            oldBatchId: cmx.g.relatedFile.values()[i].oldBatchId,
            proFileTitle: "",
            projectName: "",
            fileNum: "",
            relId: cmx.g.relatedFile.values()[i].relId,
        }
    }
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubRelapply/saveEaPubRelapplyList',
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
            } else {
                showAlert({
                    type: 'error',
                    content: '相关附件保存失败'
                });
            }
        })
        .start();
}

var _intervalbpj = undefined;
var _intervaldayin = undefined;

function listenBpjWebOffice() {
    listenWebOffice('qianbao');
}

function listenDayinWebOffice() {
    listenWebOffice('dayinbpj');
}

function listenWebOffice(typeStr) {
    getServiceCache({
        key: 'zfw-' + typeStr + ':' + _applyId,
        success: function (prevModelData) {
            var _fileIndex = prevModelData.baseValue;
            if (!IsEmpty(_fileIndex)) {
                switch (typeStr) {
                    case 'qianbao':
                        if (IsNull(cmx.g.filesarray.get('911')[0]) || cmx.g.filesarray.get('911')[0] != _fileIndex) {
                            cmx.g.filesarray.put('911', []);
                            cmx.g.filesarray.get('911').push(_fileIndex);
                            saveForm(true);
                            // if (cmx.g.filesarray.get('911').length > 0) {
                            //     _fileIndex = cmx.g.filesarray.get('911')[0];
                            // }
                            $('#cmx-add-receipt').hide();
                            $('#cmx-receipt').css('display', 'inline-block');
                            var param = safeEncodeBase64(JSON.stringify({
                                applyId: _applyId,
                                fileIndex: _fileIndex,
                                docClass: '19',
                                userName: getData('userName'),
                                token: getData('token')
                            }));
                            setServiceCache({
                                key: 'key-qianbao-' + _applyId,
                                value: param,
                                success: function () {
                                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                                        $('#cmx-receipt').attr('href', weboffice_url + 'key-qianbao-' + _applyId);
                                    } else {
                                        $('#cmx-receipt').attr('href', 'sach://office;' + 'key-qianbao-' + _applyId);
                                    }
                                    $('#cmx-receipt').attr('disabled', false);
                                },
                                error: function (msg) {
                                    $('#cmx-receipt').attr('disabled', true);
                                }
                            });

                        }
                        break;
                    case 'dayinbpj':
                        if (IsNull(cmx.g.filesarray.get('909')[0]) || cmx.g.filesarray.get('909')[0] != _fileIndex) {
                            cmx.g.filesarray.put('909', []);
                            cmx.g.filesarray.get('909').push(_fileIndex);
                            saveForm(true);
                            //打印正文
                            var param = safeEncodeBase64(JSON.stringify({
                                applyId: _applyId,
                                fileIndex: _fileIndex,
                                docClass: '20',
                                userName: getData('userName'),
                                token: getData('token')
                            }));
                            setServiceCache({
                                key: 'key-dayinbpj-' + _applyId,
                                value: param,
                                success: function () {
                                    if (!IsNull(_intervaldayin)) {
                                        clearInterval(_intervaldayin);
                                    }
                                    _intervaldayin = setInterval('listenDayinWebOffice()', 3000);
                                },
                                error: function (msg) {

                                }
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
            content: '请填写签报标题。'
        });
        return;
    }
    if ($('#proTitle').val().length > 50) {
        showAlert({
            type: 'error',
            content: '签报标题不能超过50字。'
        });
        return;
    }
    if (IsEmpty($('#contactTel').val())) {
        showAlert({
            type: 'error',
            content: '请填写电话号码。'
        });
        return;
    }
    var reg = /[\u4e00-\u9fa5]/;
    if (reg.test($("#contactTel").val())) {
        showAlert({
            type: 'error',
            content: '电话号码不能包含汉字。'
        });
        return;
    }
    if ($('#remark').val().length > 1000) {
        showAlert({
            type: 'error',
            content: '备注不能超过1000字。'
        });
        return;
    }
    if ($('#opinions').val().length > 100) {
        showAlert({
            type: 'error',
            content: '办理意见不能超过100字。'
        });
        return;
    }
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubCountersign/saveCountersign',
            data: JSON.stringify({
                token: getData('token'),
                applyId: _applyId,
                ipaFormData: [{
                    proTitle: $('#proTitle').val(),
                    flowWaterBeg: $('#flowWaterBeg').val(),
                    flowWaterEnd: $('#flowWaterEnd').val(),
                    degreeUrgen: $('#degreeUrgen').find(':selected').val(),
                    isTheUnit: $('#isTheUnit').val(),
                    isThePerson: $('#isThePerson').val(),
                    contactTel: $('#contactTel').val(),
                    isTheDate: $('#isTheDate').val(),
                    remark: $('#remark').val(),
                    files: getFileListForSave(cmx.g.filelinkfileclass),
                    batchId: _batchId,
                    opinion: $('#opinions').val()
                }]
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                _applyId = prevModelData.data.batchId;
                _batchId = prevModelData.data.batchId;
                saveEaPubRelapplyList({
                    callback: function () {
                        if (!noAlert) {
                            showAlert({
                                type: 'success',
                                content: '保存成功'
                            });
                            setTimeout(function () {
                                if (GetUrlParamString('type') == 0) {
                                    //window.location.href = "/app/f-gover-approval/nation/country-needToDo.html?nowid=" + GetUrlParamString('nowid');
                                    window.location.href = "/app/f-gover-approval/nation/qianbao.html?type=-1&from=undefined&status=" + prevModelData.data.status + "&applyId=" + _applyId + "&projectNum=" + prevModelData.data.flowType + "&nowid=" + GetUrlParamString('nowid');
                                } else {
                                    location.reload();
                                }
                            }, 1000);
                        }
                        send.go();
                    }
                });
            }
        })
        .start();
}

function webUploadHuiQianFile(param) {
    var REJECT_TYPE = ['pdf', 'doc', 'docx', 'png', 'jpg', 'html', 'mht', 'xls', 'xlsx', 'ppt', 'pptx'];
    var IMAGE_TYPE = ['jpeg', 'jpg', 'bmp', 'png', 'gif'];
    var $ele = $(param.id);
    var uploader = WebUploader.create({
        swf: public_url + '/vendor/webuploder/Uploader.swf',
        server: putFile,
        pick: {
            id: param.id, // 选择文件的按钮。可选。内部根据当前运行是创建，可能是input元素，也可能是flash.
            innerHTML: param.label,
            multiple: param.multiple,
        },
        resize: false,
        formData: {
            token: param.token,
            folder_id: param.folder_id,
            passorend: 1,
            fileDirectoryID: '47' //申请人上传附件
        },
        fileSingleSizeLimit: 512 * 1024 * 1024, //200M
        fileSizeLimit: 1024 * 1024 * 1024, //1000M
        duplicate: true,
    });
    uploader.on('beforeFileQueued', function (file) {
        if (file.size <= 0) {
            alert('不能上传空文件');
            return;
        }
        if (param.image) {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                if ($.inArray(file.ext.toLowerCase(), IMAGE_TYPE) < 0) {
                    // alert('请上传图片类型的文件：' + IMAGE_TYPE.join('、'));
                    showAlert({
                        type: 'error',
                        content: '请上传图片类型的文件：' + IMAGE_TYPE.join('、')
                    });
                    return false;
                }
                return true;
            } else {
                // alert('不可以上传' + REJECT_TYPE.join('、') + '的文件');
                showAlert({
                    type: 'error',
                    content: '不可以上传' + REJECT_TYPE.join('、') + '的文件'
                });
                return false;
            }
        } else {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                // alert('只可以上传pdf,doc文件');
                showAlert({
                    type: 'error',
                    content: '只可以上传pdf,doc文件'
                });
                return false;
            }
        }
    });
    uploader.on('fileQueued', function (file) {
        uploader.upload();
    });
    uploader.on('uploadStart', function (file) {
        L(file);
        waitProcess(file.id);
        showLoading();
        showFileUploadBody();
        $('.g-file-list').prepend([
            '<div class="g-file-item">',
            '<h5>' + file.name + '</h5>',
            '<div class="progress progress-xs">',
            '<div id="g-file-' + file.id + '" class="progress-bar progress-bar-primary progress-bar-indicating active" style="width: 0%;" role="progressbar">',
            '<span id="g-file-' + file.id + '-2" class="sr-only">0%</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        L(percentage);
        $('#g-file-' + file.id).css('width', (percentage * 100) + '%');
        $('#g-file-' + file.id + '-2').html((percentage * 100) + '%');
    });
    uploader.on('uploadSuccess', function (file, response) {
        //console.log(file)
        console.log(response);
        $('#g-file-' + file.id).removeClass('active');
        $('#g-file-' + file.id).removeClass('progress-bar-primary').addClass('progress-bar-success');
        if (response.state == '200') {
            param.success(param, response);
        } else {
            showAlert({
                type: 'alert',
                content: response.msg
            });
            param.error(param);
        }

    });
    uploader.on('uploadError', function (file) {
        console.log(file);
        showAlert({
            type: 'alert',
            content: '“' + file.name + '”上传失败！'
        });
        param.error(param);
    });
    uploader.on('uploadComplete', function (file) {
        //console.log(file)
        hideLoading(file.id);
    });
}