/*
 * @Author: lvjinxiu 
 * @Date: 2017-11-30 16:55:28 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-05-07 16:04:39
 */
var _projectNum = '';
var _applyId = '';
var _status = '';
var _type = '';
var _protectUnitName, _province;
cmx.g.regist('relatedFile', new HashMap());
cmx.route.model({
    index: 'buildZhuanfawen',
    handle: function (parameter, prevModelData, send, abort) {
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            console.log(data)
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
            $("#isTheUnit").val(data.isTheUnit);
            $("#isThePerson").val(data.isThePerson);
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
            $("#opinions").val(data.reserve2);
        }
        send.go();
    }
});
cmx.route.model({
    index: 'showOptByRole',
    handle: function (parameter, prevModelData, send, abort) {
        $('#cmx-save').css('display', 'inline-block');
        if (cmx.g.filesarray.get('901').length > 0) {
            $('#cmx-add-receipt').hide();
            $('#cmx-receipt').css('display', 'inline-block');
            $('#cmx-setformat').css('display', 'inline-block');
        } else {
            $('#cmx-add-receipt').css('display', 'inline-block');
            $('#cmx-setformat').hide();
        }
        if (cmx.g.filesarray.get('902').length > 0) {
            $('#cmx-add-receipt').hide();
            $('#cmx-receipt').hide();
            $('#cmx-before-setformat').css('display', 'inline-block');
            $('#cmx-after-setformat').css('display', 'inline-block');
            $('#cmx-setformat').hide();
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
        refNumber: $('#refNumBeg').val() + '[' + $('#refNumBeg').val() + ']' + $('#refNumBeg').val() + '号',
        packageTime: ($("#packageTime-1").val() == '-1' ? '' : $("#packageTime-1").val()) + '月' + $("#packageTime-2").val() + '日',
        degreeUrgen: formatSelectValue($('#degreeUrgen').val()),
        isTheUnit: $("#isTheUnit").val(), //这里是临时的
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
        reserve2: $('#opinions').val(),
        files: getFileListForSave(cmx.g.filelinkfileclass)
    };
}
var justlook = '0';
$(document).ready(function () {
    if (GetUrlParamString('from') == 'iframe') {
        $('#cmx-edit-formtag').css('height', '450px');
        $('#cmx-edit-formtag').css('margin-bottom', '0');
    } else {
        $('#cmx-edit-formtag').css('height', getClientHeight() - 142);
        $('#cmx-edit-formtag').css('margin-bottom', '0');
    }
    justlook = GetUrlParamString('justlook') == '1' ? '1' : '0';
    if (justlook == '1') {
        $('.cmx-opt').hide();
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
            //'P0908': '908' //签章后正文
        }).start();
    if (!IsEmpty(GetUrlParamString('applyId')) && !IsEmpty(GetUrlParamString('projectNum')) && !IsEmpty(GetUrlParamString('status'))) {
        _applyId = GetUrlParamString('applyId');
        _status = GetUrlParamString('status');
        _type = GetUrlParamString('type');
        _projectNum = GetUrlParamString('projectNum');
    } else {
        location.href = '/error.html';
        return;
    }
    //表单构建
    new cmx.process()
        // .turn('callajax', {
        //     url: api_io + '/ioGovinfopubclass/getDataByPclassIdUseful',
        //     data: {
        //         column: '0402000000'
        //     },
        //     type: 'GET'
        // })
        // .turn(function (prevModelData, send, abort) {
        //     if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
        //         var dataList = prevModelData.data;
        //         var _html = '<option value="-1">无</option>';
        //         for (var i in dataList) {
        //             _html += '<option value="' + dataList[i].classId + '">' + dataList[i].infoNumBeg + '</option>';
        //         }
        //         $('#contentType').html(_html);
        //     }
        //     send.go();
        // })
        .turn('buildDataDic', {
            element: $('#openShape'),
            hasAll: false,
            hasEmpty: false,
            type: 'select'
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
            url: api_ea + '/eaPubBatchFileProvince/getEaPubBatchFileAndOpinion',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                applyId: _applyId, //类型：String  必有字段  备注：申请ID
                projectNum: _projectNum //类型：String  必有字段  备注：项目编号
            }),
            success: function (result) {
                console.log(result);
            },
            type: 'POST'
        })
        .turn('buildZhuanfawen', {})
        .turn('callajax', {
            url: api_ea + '/eaPubFile/getApprAttachFilesByParam', //申请人的附件
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
                    cmx.g.filesarray.get('905').push(file_item.fileId);
                    _html += '<li class="list-group-item" file-index="' + file_item.fileId + '">' + file_item.fileName + '</li>';
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
                            for (var ft = 0; ft < response.data.length; ft++) {
                                var fileindexid = response.data[ft].fileIndex;
                                fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                                cmx.g.filesarray.get(fileclassid).push(fileindexid);
                                if (IsEmpty(fileindexid))
                                    continue;
                                $('#filelist-' + id + '.file-upload-list').prepend([
                                    '<li data-toggle="tooltip" data-placement="top" title="' + response.data[ft].fileName + '" data-original-title="' + response.data[ft].fileName + '" id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
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
                sortable('#filelist-P0904');
                sortable('#filelist-P0905');
                sortable('#filelist-P0906');
                sortable('#filelist-P0907');
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
                _protectUnitName = data.protectUnitName;
                _province = data.provinces;
            }
            if (GetUrlParamString('from') == 'iframe') {
                if (_status == '504' || _status == '503') { //504省局办结
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
            }
        })
        .start();

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
                '<li id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
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
            sortable('#filelist-P0904');
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
                            .turn('getRelevantFiles', param)
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
                            .turn('getRelevantFiles', param)
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
                    .turn('getRelevantFiles', param)
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
                    .turn('getRelevantFiles', param)
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
                .turn('getRelevantFiles', param)
                .start();
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
                    .turn('getRelevantFiles', param)
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
    new cmx.process()
        .turn(function (prevModelData, send, abort) {
            //新建正文
            var _fileIndex = '';
            if (cmx.g.filesarray.get('901').length > 0) {
                _fileIndex = cmx.g.filesarray.get('901')[0];
            }
            var param = safeEncodeBase64(JSON.stringify({
                applyId: _applyId,
                fileIndex: _fileIndex,
                docClass: '7',
                userName: getData('userName'),
                token: getData('token'),
                first: '1'
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
                docClass: '9',
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
                },
                error: function (msg) {
                    $('#cmx-receipt').attr('disabled', true);
                }
            });
            $('#cmx-receipt').on('click', function (event) {
                if (!IsNull(_intervalzw)) {
                    clearInterval(_intervalzw);
                }
                _intervalzw = setInterval('listenZwWebOffice()', 3000);
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
                    docClass: '5',
                    userName: getData('userName'),
                    token: getData('token'),
                    CarbonCopy: $('#carbonCopy').val(),
                    IsThePerson: $('#isThePerson').val(),
                    MainSend: $('#mainSend').val(),
                    OpenShape: $('#openShape').find(':checked').text(),
                    ProTitle: $('#proTitle').val(),
                    RefNumber: $('#refNumBeg').find(':checked').text() + '〔' + $('#refNumMid').val() + '〕' + $('#refNumEnd').val() + '号',
                    IsTheUnit: $('#isTheUnit').val(),
                    PrintDate: formatDate('yyyy年M月d日', new Date())
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
            if (BrowserType() == 'IE' || BrowserType() == '360') {
                $('#cmx-before-setformat').attr('href', weboffice_url + 'key-zw-' + _applyId);
            } else {
                $('#cmx-before-setformat').attr('href', 'sach://office;' + 'key-zw-' + _applyId);
            }
            $('#cmx-before-setformat').on('click', function (event) {
                var _fileIndex = '';
                if (cmx.g.filesarray.get('901').length > 0) {
                    _fileIndex = cmx.g.filesarray.get('901')[0];
                }
                var param = safeEncodeBase64(JSON.stringify({
                    applyId: _applyId,
                    fileIndex: _fileIndex,
                    docClass: '9', //表示查看套红前正文
                    userName: getData('userName'),
                    token: getData('token')
                }));
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
            if (BrowserType() == 'IE' || BrowserType() == '360') {
                $('#cmx-after-setformat').attr('href', weboffice_url + 'key-thh-' + _applyId);
            } else {
                $('#cmx-after-setformat').attr('href', 'sach://office;' + 'key-thh-' + _applyId);
            }
            $('#cmx-after-setformat').on('click', function (event) {
                var _fileIndex = '';
                if (cmx.g.filesarray.get('902').length > 0) {
                    _fileIndex = cmx.g.filesarray.get('902')[0];
                }
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
            send.go();
        })
        .start();

});
var _intervalbpj = undefined;
var _intervalzw = undefined;
var _intervalthh = undefined;

function listenBpjWebOffice() {
    listenWebOffice('bpj');
}

function listenZwWebOffice() {
    listenWebOffice('zw');
}

function listenThhWebOffice() {
    listenWebOffice('thh');
}

function listenWebOffice(typeStr) {
    getServiceCache({
        key: 'zfw-' + typeStr + ':' + _applyId,
        success: function (prevModelData) {
            var _fileIndex = prevModelData.baseValue;
            if (!IsEmpty(_fileIndex)) {
                switch (typeStr) {
                    case 'zw':
                        if (IsNull(cmx.g.filesarray.get('901')[0]) || cmx.g.filesarray.get('901')[0] != _fileIndex) {
                            cmx.g.filesarray.put('901', []);
                            cmx.g.filesarray.get('901').push(_fileIndex);
                            saveForm(true);
                            $('#cmx-add-receipt').hide();
                            $('#cmx-receipt').css('display', 'inline-block');
                            $('#cmx-setformat').css('display', 'inline-block');
                            //正文
                            var param = safeEncodeBase64(JSON.stringify({
                                applyId: _applyId,
                                fileIndex: _fileIndex,
                                docClass: '7',
                                userName: getData('userName'),
                                token: getData('token')
                            }));
                            setServiceCache({
                                key: 'key-zw-' + _applyId,
                                value: param,
                                success: function () {
                                    if (!IsNull(_intervalthh)) {
                                        clearInterval(_intervalthh);
                                    }
                                    if (BrowserType() == 'IE' || BrowserType() == '360') {
                                        $('#cmx-receipt').attr('href', weboffice_url + 'key-zw-' + _applyId);
                                    } else {
                                        $('#cmx-receipt').attr('href', 'sach://office;' + 'key-zw-' + _applyId);
                                    }
                                    $('#cmx-receipt').attr('disabled', false);
                                    $('#cmx-setformat').attr('disabled', false);
                                },
                                error: function (msg) {
                                    $('#cmx-receipt').attr('disabled', true);
                                }
                            });
                        }
                        break;
                    case 'thh':
                        if (IsNull(cmx.g.filesarray.get('902')[0]) || cmx.g.filesarray.get('902')[0] != _fileIndex) {
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

                            $('#cmx-after-setformat').on('click', function (event) {
                                var param = safeEncodeBase64(JSON.stringify({
                                    applyId: _applyId,
                                    fileIndex: _fileIndex,
                                    docClass: '5', //表示查看套红后正文
                                    userName: getData('userName'),
                                    token: getData('token')
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
                }
            }
        },
        error: function (msg) {

        }
    });
}

function saveForm(noAlert) {
    if (IsEmpty($('#isTheUnit').val())) {
        if (!noAlert)
            showAlert({
                type: 'alert',
                content: '拟稿单位不能为空'
            });
        return;
    }
    if (IsEmpty($('#isThePerson').val())) {
        if (!noAlert)
            showAlert({
                type: 'alert',
                content: '拟稿人不能为空'
            });
        return;
    }
    if ($('#proTitle').val().indexOf('函') > 0) {
        if (!noAlert)
            showAlert({
                type: 'alert',
                content: '发文标题不能是“函”'
            });
    } else {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/' + getApplyApi(_projectNum) + '/saveTransActFrame',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: _applyId,
                    projectNum: _projectNum,
                    pbfFormData: getFormData()
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
                }
            })
            .start();
    }
}

function formatSelectValue(data) {
    return (IsEmpty(data) || data == -1) ? '' : data;
}


function cmx_special_infoNumBeg(data) {
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
        _monthStr += '<option value="' + m + '">' + m + '</option>';
    }
    $('#refNumMid').val(cmx_currentyear);
    $('#packageTime-1').html('<option value="-1" selected></option>' + _monthStr);
}

function removeRelatedFile(ev, ele, oldBatchId) {
    $(ele).parent().remove();
    cmx.g.relatedFile.remove(oldBatchId);
    console.log(cmx.g.relatedFile.values())
}