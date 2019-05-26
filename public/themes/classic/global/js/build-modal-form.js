/**
 * author: lvjinxiu
 * date: 2017-09-08
 * objective: form create
 */

//send.toviewreject(parameter + '第一个页面应该是失败的').go();//不带下一个model传参
//send.tomodel('*****').toviewresolve(parameter + '第二个页面应该是成功的').go();//带上了下一个model传参
//abort('第三个页面我选择走你');//选择了终止

/**
 * @author lvjixniu
 * @description 创建表单
 * @argument element url
 *
 */
function CreateApplicationForm(parameter) {
    $.ajax({
        url: parameter.url,
        type: "GET",
        async: false,
        success: function (result) {
            var data = result;
            for (var i = 0; i < data.length; i++) {
                var type = data[i].type;
                var width = data[i].extra.width;
                var notnull = (data[i].attribute.notnull == 1) ? true : false;
                var attrstring = 'cmx-tag="cmx" cmx-lib="' + data[i].serialnumber + '" cmx-index="' + data[i].columnindex +
                    '" cmx-column="' + data[i].columnname + '" cmx-type="' + data[i].type + '" cmx-require="' +
                    notnull + '"';
                if (data[i].extra.width == "") {
                    width = 12;
                }
                if (type == 'text' || type == 'single' || type == 'extra') {
                    attrstring = attrstring + 'cmx-stype="' + data[i].attribute.stype + '"';
                }
                new cmx.process()
                    .turn('automated-form-' + type, {
                        "element": parameter.element,
                        "data": data[i],
                        "width": width,
                        "notnull": notnull,
                        "attrstring": attrstring
                    })
                    .ccatch(function (msg) {
                        console.log('异常终止了 ' + msg);
                    })
                    .cfinally(function () {
                        try {
                            if (!IsEmpty(data[i].extra.func))
                                eval(data[i].extra.func + '(' + JSON.stringify(data[i]) + ')');
                        } catch (exception) {}

                    }).start();
            }
        },
        error: function (result) {
            showAlert({
                type: 'error',
                content: '网络连接失败，请确认网络连接'
            });
        },
        complete: function (result) {

        }
    });
}

/**
 * @author lvjinxiu
 * @description 验证表单输入框长度
 */
function checkFormLength(ele, isvisible) {
    //isvisible为true时只循环可见元素
    var flag = true;
    $(ele + ' [cmx-tag="cmx"]').each(function () {
        if (!IsNull(isvisible)) {
            if (isvisible == true) {
                if (!$(this).is(':visible')) {
                    return true;
                }
            }
        }
        var type = $(this).attr('cmx-type');
        var notnull = $(this).attr('cmx-require');
        var title = $(this).find('.control-label').first().text().replace(/\*/g, '');
        // console.log(title);
        var max_length = 99999999999999999999999999999999999999999;
        if (!IsEmpty($(this).attr('max-length'))) {
            max_length = parseInt($(this).attr('max-length'));
        }
        // console.log(max_length);
        switch (type) {
            case 'text':
                //正则验证待确定
                var stype = $(this).attr('cmx-stype');
                if (stype == 'short') {
                    if (notnull == "true") {
                        if (IsEmpty($(this).find('input').val())) {
                            showAlert({
                                type: 'info',
                                content: title + '为必填项'
                            });
                            flag = false;
                            return false;
                        }
                    }
                    // console.log($(this).find('input').val().length);
                    if ($(this).find('input').val().length > max_length) {
                        showAlert({
                            type: 'info',
                            content: title + '填入的字符长度不超过' + max_length
                        });
                        flag = false;
                        return false;
                    }
                } else if (stype == 'long') {
                    if (notnull == "true") {
                        if (IsEmpty($(this).find('textarea').val())) {
                            showAlert({
                                type: 'info',
                                content: title + '为必填项'
                            });
                            flag = false;
                            return false;
                        }
                    }
                    if ($(this).find('textarea').val().length > max_length) {
                        showAlert({
                            type: 'info',
                            content: title + '填入的字符长度不超过' + max_length
                        });
                        flag = false;
                        return false;
                    }
                }
                break;
            case 'single':
                //正则验证待确定
                var stype = $(this).attr('cmx-stype');
                if (stype == '1') {
                    if (notnull == "true") {
                        if (IsEmpty($(this).find('select').val())) {
                            showAlert({
                                type: 'info',
                                content: title + '为必填项'
                            });
                            flag = false;
                            return false;
                        }
                    }
                    if ($(this).find('select').val().length > max_length) {
                        showAlert({
                            type: 'info',
                            content: title + '填入的字符长度不超过' + max_length
                        });
                        flag = false;
                        return false;
                    }
                } else if (stype == '2') {
                    if (notnull == "true") {
                        if (IsEmpty($(this).find('input:checked').val())) {
                            showAlert({
                                type: 'info',
                                content: title + '为必填项'
                            });
                            flag = false;
                            return false;
                        }
                    }
                    // if ($(this).find('input:checked').val().length > max_length) {
                    //     showAlert({
                    //         type: 'info',
                    //         content: title + '填入的字符长度不超过' + max_length
                    //     });
                    //     flag = false;
                    //     return false;
                    // }
                }
                break;
            case 'multi':
                //to do 不知后台所需的格式是否是统一的格式存储
                break;
            case 'tel':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'phone':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'money':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'num':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'mail':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'datetime':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'dateType':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'address':
                //to do 不知后台所需的格式是否是统一的格式存储
                break;
            case 'password':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'website':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('input').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('input').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'expand':
                //正则验证待确定
                if (notnull == "true") {
                    if (IsEmpty($(this).find('textarea').val())) {
                        showAlert({
                            type: 'info',
                            content: title + '为必填项'
                        });
                        flag = false;
                        return false;
                    }
                }
                if ($(this).find('textarea').val().length > max_length) {
                    showAlert({
                        type: 'info',
                        content: title + '填入的字符长度不超过' + max_length
                    });
                    flag = false;
                    return false;
                }
                break;
            case 'file':
                if (notnull == "true") {
                    var _fileIndex = "";
                    var lib = $(this).attr('cmx-lib');
                    var fclass = cmx.g.filelinkfileclass[lib];
                    var fileArr = getFileListForSave(cmx.g.filelinkfileclass);
                    for (var i = 0; i < fileArr.length; i++) {
                        if (fileArr[i].fileClass == fclass) {
                            _fileIndex = fileArr[i].fileIndex;
                            break;
                        }
                    }
                    if (IsEmpty(_fileIndex)) {
                        showAlert({
                            type: 'info',
                            content: '请上传' + title
                        });
                        flag = false;
                        return false;
                    }
                }
                break;
            case 'handimg':
                if (notnull == "true") {
                    var _fileIndex = "";
                    var lib = $(this).attr('cmx-lib');
                    var fclass = cmx.g.filelinkfileclass[lib];
                    var fileArr = getFileListForSave(cmx.g.filelinkfileclass);
                    for (var i = 0; i < fileArr.length; i++) {
                        if (fileArr[i].fileClass == fclass) {
                            _fileIndex = fileArr[i].fileIndex;
                            break;
                        }
                    }
                    if (IsEmpty(_fileIndex)) {
                        showAlert({
                            type: 'info',
                            content: '请上传' + title
                        });
                        flag = false;
                        return false;
                    }
                }
                break;
        }
    });
    return flag;
}

cmx.route.init({
    allViewVersion: ['IE6', 'IE10'],
    nowViewVersion: function () {
        //TODO
        return 'IE10';
    }
});
cmx.route.model({
    index: 'automated-form-text',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-autono',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-single',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-multi',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-tel',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-phone',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-mail',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-datetime',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
//Ace's add dateType
cmx.route.model({
    index: 'automated-form-dateType',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-password',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-website',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-separator',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-special',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-daterange',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});
cmx.route.model({
    index: 'automated-form-money',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go(); //金额最大最小值判断
        $(parameter.element + ' [cmx-lib="' + parameter.data.serialnumber + '"]').find('input').on('input propertychange', function (event) {
            if ($(this).attr('min') && $(this).attr('max')) {
                var min = parseInt($(this).attr('min'));
                var max = parseInt($(this).attr('max'));
                if (parseFloat($(this).val()) < min) {
                    $(this).val(min);
                }
                if (parseFloat($(this).val()) > max) {
                    $(this).val(max);
                }
            }
            if (!IsEmpty($(this).val())) {
                $(parameter.element + ' [cmx-lib="' + parameter.data.serialnumber + '"]').find('.chinesecaptial').html('(' + numberToChineseCapital($(this).val()) + ')');
            } else {
                $(parameter.element + ' [cmx-lib="' + parameter.data.serialnumber + '"]').find('.chinesecaptial').html('');
            }
        });
    }
});
cmx.route.model({
    index: 'automated-form-num',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go(); //数值最大最小值判断
        $(parameter.element + ' [cmx-lib="' + parameter.data.serialnumber + '"]').find('input').on('input propertychange', function (event) {
            if ($(this).attr('min') && $(this).attr('max')) {
                var min = parseInt($(this).attr('min'));
                var max = parseInt($(this).attr('max'));
                if (parseFloat($(this).val()) < min) {
                    $(this).val(min);
                }
                if (parseFloat($(this).val()) > max) {
                    $(this).val(max);
                }
            }
        });
    }
});
cmx.route.model({
    index: 'automated-form-address',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        $.getScript('/vendor/distpicker/distpicker.data.js', function () {
            $.getScript('/vendor/distpicker/distpicker.js', function () {
                $(parameter.element + ' [cmx-type="address"]').each(function () {
                    $(this).distpicker({
                        placeholder: false
                    });
                })
            });
        });
    }
});
cmx.route.model({
    index: 'automated-form-address-dic',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        $.getScript('/vendor/distpickerfromdic/distpicker.data.js', function () {
            $.getScript('/vendor/distpickerfromdic/distpicker.js', function () {
                $(parameter.element + ' [cmx-type="address-dic"]').each(function () {
                    $(this).distpicker({
                        placeholder: false
                    });
                })
            });
        });
    }
});
cmx.route.model({
    index: 'automated-form-image',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        var multitype = false;
        if (parameter.data.attribute.single == '0') {
            multitype = true;
        }
        $(parameter.element + ' [cmx-type="image"]').each(function () {
            var id = $(this).find('.form-image').attr('id');
            webUploadFile({
                "id": "#" + id, //选择器内自动生成上传文件按钮
                "label": "上传图片", //按钮文字
                "multiple": multitype, //多选，值为true表示多选，false表示单选
                "image": true, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "folder_id": 5, //文件夹id值
                "document_id": 0, //暂时不做修改，确定为0
                "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": 47, //申请人上传附件
                success: function () {
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    var fileindexid = response.data[0].fileindex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#filelist-' + id + '.file-upload-list').append([
                        '<li data-toggle="tooltip" data-placement="top" title="' + response.data[0].fileoriginalname + '" data-original-title="' + response.data[0].fileoriginalname + '" id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                        '<div class="btn-group" role="group">',
                        '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                        response.data[0].fileoriginalname,
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-trash" aria-hidden="true"></i>',
                        '</button>',
                        '</div>',
                        '</li>'
                    ].join(''));
                    $("[data-toggle='tooltip']").tooltip();
                },
                error: function () {
                    //集中处理过了
                }
            });
        });
    }
});

function removeThisFile(fileclassid, fileindexid) {
    console.log('#cmx-file-index-id-' + fileindexid);
    var _tempfilearray = cmx.g.filesarray.get(fileclassid);
    removeByValue(_tempfilearray, fileindexid);
    cmx.g.filesarray.put(fileclassid, _tempfilearray);
    $('#cmx-file-index-id-' + fileindexid).remove();
    $('div .tooltip').remove();
}

function downloadPifuFile(_thisapplyId, _thisprojectNum) {
    downLoadFile(undefined, getPifuFile + 'token=' + getData('token') + '&applyId=' + _thisapplyId + '&projectNum=' + _thisprojectNum);
}

function downloadThisFile(fileindexid, justlook, fileclassid) {
    if (!IsEmpty(cmx.g.checkType) && !IsEmpty(fileclassid)) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubFromCheckInfo/checkEaPubFromCheckInfo',
                data: {
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum, //类型：String  必有字段  备注：项目编号
                    fielType: fileclassid,
                    dealLink: cmx.g.checkType
                },
                jsonheader: false,
                type: 'POST'
            })
            .turn(function () {
                var _str_button = $('#cmx-file-index-id-' + fileindexid + ' button');
                _str_button.attr('style', 'background: #5cd29d;color: #fff;');
                _str_button.html('（已查看）' + _str_button.html().replaceAll('（未查看）', '').replaceAll('（已查看）', ''));
            })
            .start();
    }
    new cmx.process()
        .turn('callajax', {
            url: api_dm + '/DmFileInfoController/getFileName',
            data: {
                token: getData('token'),
                fileIndex: fileindexid
            },
            jsonheader: false,
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {

            var result = prevModelData;
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                var e = e || event || window.event;
                if (e.ctrlKey && (prevModelData.data.indexOf('doc') > 0 || prevModelData.data.indexOf('docx') > 0)) {
                    var param = safeEncodeBase64(JSON.stringify({
                        applyId: 'temp' + fileindexid,
                        fileIndex: fileindexid,
                        docClass: '1',
                        userName: getData('userName'),
                        token: getData('token'),
                        justlook: justlook == true
                    }));
                    setServiceCache({
                        key: 'temp' + fileindexid,
                        value: param,
                        success: function () {
                            if (BrowserType() == 'IE' || BrowserType() == '360') {
                                window.open(weboffice_url + 'temp' + fileindexid);
                            } else {
                                window.open('sach://office;temp' + fileindexid);
                            }
                        },
                        error: function (msg) {

                        }
                    });
                } else {
                    if (GetUrlParamString('from') == 'app' || getData('fromtype') == 'app') {
                        var suffix = '';
                        var filerealname = '';
                        if (prevModelData.data.lastIndexOf('.') > 0) {
                            suffix = prevModelData.data.substring(prevModelData.data.lastIndexOf('.') + 1);
                            filerealname = prevModelData.data.substring(0, prevModelData.data.lastIndexOf('.'));
                        } else {
                            filerealname = prevModelData.data;
                        }
                        if (!IsEmpty(getData('socketCode'))) {
                            showAlert({
                                type: 'success',
                                content: '下载准备中...'
                            });
                            socketObj.emit('sendmessage', {
                                code: getData('socketCode'),
                                id: socketId,
                                message: JSON.stringify({
                                    fileIndex: fileindexid,
                                    fileName: filerealname,
                                    suffix: suffix
                                })
                            });
                        }
                    } else {
                        downLoadFile(undefined, getFile + fileindexid);
                    }
                }
            }
            send.go();
        })
        .start();
}
cmx.route.model({
    index: 'automated-form-file',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        var multitype = false;
        if (parameter.data.attribute.single == '0') {
            multitype = true;
        }
        if (webUploadFile && typeof webUploadFile == 'function') {
            var id = parameter.data.serialnumber;
            webUploadFile({
                "id": "#" + id, //选择器内自动生成上传文件按钮
                "label": "上传文件", //按钮文字
                "multiple": multitype, //多选，值为true表示多选，false表示单选
                "image": false, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "folder_id": 5, //文件夹id值
                "document_id": 0, //暂时不做修改，确定为0
                "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": 47, //需要传过来//申请人上传附件
                success: function (param, response) {
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#filelist-' + id + '.file-upload-list').append([
                        '<li data-toggle="tooltip" data-placement="top" title="' + response.data[0].fileoriginalname + '" data-original-title="' + response.data[0].fileoriginalname + '" id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                        '<div class="btn-group" role="group">',
                        '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                        response.data[0].fileoriginalname,
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-trash" aria-hidden="true"></i>',
                        '</button>',
                        '</div>',
                        '</li>'
                    ].join(''));
                    $("[data-toggle='tooltip']").tooltip();
                },
                error: function (param) {
                    //集中处理过了
                }
            });
        }
    }
});
var nowRenameFileId = '';

function renameThisFile(fileclassid, fileindexid) {
    $('#cmx-renamefile-name').val('');
    nowRenameFileId = fileindexid;
    new cmx.process()
        .turn('callajax', {
            url: api_dm + '/DmFileInfoController/getFileName',
            data: {
                token: getData('token'),
                fileIndex: fileindexid
            },
            jsonheader: false,
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            var result = prevModelData;
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                $('#cmx-renamefile-name').val(prevModelData.data)
            }
            send.go();
        })
        .start();
    $('#cmx-renameFileModel').modal('show');
    $('#cmx-rename-btn').off('click');
    $('#cmx-rename-btn').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_dm + '/DmFileInfoController/updateFileName',
                data: {
                    token: getData('token'),
                    fileIndex: nowRenameFileId,
                    fileName: $('#cmx-renamefile-name').val()
                },
                jsonheader: false,
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '保存成功'
                    });
                    $('#cmx-renameFileModel').modal('hide');
                    $('#cmx-file-index-id-' + fileindexid + ' button.cmx-upload-file-name').html($('#cmx-renamefile-name').val());
                }
                send.go();
            })
            .start();
    });
}

cmx.route.model({
    index: 'automated-form-handimg',
    handle: function (parameter, prevModelData, send, abort) {
       // var viewer;
        send.toviewresolve(parameter).go();
        var multitype = false;
        if (parameter.data.attribute.single == '0') {
            multitype = true;
        }
        if (webUploadFile && typeof webUploadFile == 'function') {
            var id = parameter.data.serialnumber;
            webUploadFile({
                "id": "#" + id, //选择器内自动生成上传文件按钮
                "label": "上传文件", //按钮文字
                "multiple": false, //多选，值为true表示多选，false表示单选
                "image": true, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "folder_id": 5, //文件夹id值
                "document_id": 0, //暂时不做修改，确定为0
                "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": 47, //申请人上传附件
                success: function (param, response) {
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#filelist-' + id + '.file-upload-list').append([
                        '<li data-toggle="tooltip" data-placement="top" title="' + response.data[0].fileoriginalname + '" data-original-title="' + response.data[0].fileoriginalname + '" id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                        '<div class="btn-group" role="group">',
                        '',
                        '<a href="' + getFile + fileindexid + '" class="bigtosmall"><img  src="' + getFile + fileindexid + '" style="min-width: 100px !important;max-width: 100px !important;" class="cmx-upload-file-name img-responsive" alt="' + response.data[0].fileoriginalname + '"/></a>',
                        '<button onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')" type="button" class="btn btn-icon btn-primary btn-sm btn-round img-remove-btn">',
                        '<i class="icon wb-close" aria-hidden="true"></i></button>',
                        '</div>',
                        '</li>'
                    ].join(''));
                    $("[data-toggle='tooltip']").tooltip();
                    // if ($('#filelist-' + id + '.file-upload-list').find('img').length == 1) {
                    //     viewer = new Viewer($('#filelist-' + id)[0]);
                    // } else {
                    //     viewer.update();
                    // }
                    //$('#filelist-' + id + '.file-upload-list')[0].destroy();
                    //$('#filelist-' + id + '.file-upload-list .bigtosmall').viewer();
                    // $('#filelist-' + id + '.file-upload-list .bigtosmall').magnificPopup({
                    //     type: 'image',
                    //     closeOnContentClick: true,
                    //     mainClass: 'mfp-img-mobile',
                    //     image: {
                    //         verticalFit: true
                    //     }

                    // });
                },
                error: function (param) {
                    //集中处理过了
                }
            });
        }
    }
});
var show56020img_flag = true;
cmx.g.regist('viewer');
//56020
cmx.route.model({
    index: 'automated-form-handimg56020',
    handle: function (parameter, prevModelData, send, abort) {
        $("<link>")
            .attr({
                rel: "stylesheet",
                type: "text/css",
                href: '/vendor/slick-carousel/slick.css'
            })
            .appendTo("head");
        $("<link>")
            .attr({
                rel: "stylesheet",
                type: "text/css",
                href: '/css/examples/components/basic/carousel.css'
            })
            .appendTo("head");
        $.getScript('/vendor/slick-carousel/slick.min.js', function () {});
        send.toviewresolve(parameter).go();
        var multitype = false;
        if (parameter.data.attribute.single == '0') {
            multitype = true;
        }
        if (IsEmpty(cmx.g.imgNumber)) {
            cmx.g.regist('imgNumber', new HashMap());
        }
        cmx.g.imgNumber.put(parameter.data.serialnumber, 0)
        // console.log(cmx.g.imgNumber.get(parameter.data.serialnumber));
        if (webUploadFileFor56020 && typeof webUploadFileFor56020 == 'function') {
            var id = parameter.data.serialnumber;
            $('#filelist-' + id + '.file-upload-list').append([
                '<div class="example-wrap margin-0 padding-0">',
                '<div class="example margin-0 padding-0">',
                '<div class="slider" id="exampleLazy">',
                '</div>',
                '</div>',
                '</div>'
            ].join(''));
            var num = -1;
            webUploadFileFor56020({
                "id": "#" + id, //选择器内自动生成上传文件按钮
                "label": "上传文件", //按钮文字
                "multiple": false, //多选，值为true表示多选，false表示单选
                "image": true, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "folder_id": 5, //文件夹id值
                "document_id": 0, //暂时不做修改，确定为0
                "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": 47, //申请人上传附件
                "imgId": id,
                success: function (param, response) {
                    if ($('#filelist-' + id + '.file-upload-list').find('img').length >= 1) {
                        cmx.g.viewer.destroy();
                        cmx.g.viewer = new Viewer($('#filelist-' + id)[0], {
                            navbar: false,
                            show: function () {
                                show56020img_flag = false;
                            },
                            hidden: function () {
                                show56020img_flag = false;
                            }
                        });
                    }
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }

                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);

                    if ($('#filelist-' + id + '.file-upload-list #exampleLazy').hasClass('slick-initialized')) {
                        $('#filelist-' + id + '.file-upload-list #exampleLazy').slick('slickAdd', [
                            '<div id="cmx-file-index-id-' + fileindexid + '">',
                            '<i style="visibility:hidden" class="iconStar icon wb-star orange-600"></i>',
                            '<a class="turnBig" href="javascript:void(0)">',
                            '<img style="" class="img-responsive" alt="' + response.data[0].fileoriginalname + '" src="' + getFile + fileindexid + '">',
                            '</a>',
                            '<button  fileclassid="' + fileclassid + '" fileindexid="' + fileindexid + '" dataid="' + id + '" delete-tag="delete56020img' + fileindexid + '" data-num=' + cmx.g.imgNumber.get(id) + '  class="shanchu-btn btn btn-sm btn-outline btn-warning">删除</button>',
                            '<br>',
                            '</div>'
                        ].join(''));
                        $('[delete-tag="delete56020img' + fileindexid + '"]').on('click', function () {
                            removeThisFile56020Add($(this).attr('fileclassid'), $(this).attr('fileindexid'), $(this).attr('dataid'), parseInt($(this).attr('data-num')));
                            cmx.g.viewer.destroy();
                            cmx.g.viewer = new Viewer($('#filelist-' + $(this).attr('dataid'))[0], {
                                navbar: false,
                                show: function () {
                                    show56020img_flag = false;
                                },
                                hidden: function () {
                                    show56020img_flag = false;
                                }
                            });
                        });
                        $('.turnBig').bind("contextmenu", function (e) {
                            return false;
                        })
                        if ($('#filelist-' + id + '.file-upload-list').find('img').length != 1) {
                            cmx.g.viewer.destroy();
                        }
                        cmx.g.viewer = new Viewer($('#filelist-' + id)[0], {
                            navbar: false,
                            show: function () {
                                show56020img_flag = false;
                            },
                            hidden: function () {
                                show56020img_flag = false;
                            }
                        });
                        // $('#filelist-' + id + '.file-upload-list #exampleLazy .turnBig').magnificPopup({
                        //     type: 'image',
                        //     closeOnContentClick: true,
                        //     mainClass: 'mfp-img-mobile',
                        //     image: {
                        //         verticalFit: true
                        //     },
                        //     focus: function () {
                        //         $('img').bind("contextmenu", function (e) {
                        //             return false;
                        //         })
                        //     }
                        // })
                    } else {
                        $('#filelist-' + id + '.file-upload-list #exampleLazy').append([
                            '<div id="cmx-file-index-id-' + fileindexid + '">',
                            '<i style="visibility:hidden" class="iconStar icon wb-star orange-600"></i>',
                            '<a class="turnBig" href="javascript:void(0)">',
                            '<img style="" class="img-responsive" alt="' + response.data[0].fileoriginalname + '" src="' + getFile + fileindexid + '">',
                            '</a>',
                            '<button  fileclassid="' + fileclassid + '" fileindexid="' + fileindexid + '" dataid="' + id + '" delete-tag="delete56020img' + fileindexid + '" data-num=' + cmx.g.imgNumber.get(id) + '  class="shanchu-btn btn btn-sm btn-outline btn-warning" >删除</button>',
                            '<br>',
                            '</div>'
                        ].join(''));
                        $('[delete-tag="delete56020img' + fileindexid + '"]').on('click', function () {
                            removeThisFile56020Add($(this).attr('fileclassid'), $(this).attr('fileindexid'), $(this).attr('dataid'), parseInt($(this).attr('data-num')));
                            cmx.g.viewer.destroy();
                            cmx.g.viewer = new Viewer($('#filelist-' + $(this).attr('dataid'))[0], {
                                navbar: false,
                                show: function () {
                                    show56020img_flag = false;
                                },
                                hidden: function () {
                                    show56020img_flag = false;
                                }
                            });
                        });
                        $('.turnBig').bind("contextmenu", function (e) {
                            return false;
                        })
                        $('#filelist-' + id + '.file-upload-list #exampleLazy').slick({
                            lazyLoad: 'ondemand',
                            slidesToShow: 3,
                            slidesToScroll: 1
                        });
                        if ($('#filelist-' + id + '.file-upload-list').find('img').length != 1) {
                            cmx.g.viewer.destroy();
                        }
                        cmx.g.viewer = new Viewer($('#filelist-' + id)[0], {
                            navbar: false,
                            show: function () {
                                show56020img_flag = false;
                            },
                            hidden: function () {
                                show56020img_flag = false;
                            }
                        });
                        // $('#filelist-' + id + '.file-upload-list #exampleLazy .turnBig').magnificPopup({
                        //     type: 'image',
                        //     closeOnContentClick: true,
                        //     mainClass: 'mfp-img-mobile',
                        //     image: {
                        //         verticalFit: true
                        //     },
                        //     focus: function () {
                        //         $('img').bind("contextmenu", function (e) {
                        //             return false;
                        //         })
                        //     }
                        // })

                    }
                    console.log(cmx.g.imgNumber.values());
                    console.log(12121)
                },
                error: function (param) {
                    //集中处理过了
                }
            });

        }
    }
});

function removeThisFile56020Add(fileclassid, fileindexid, id, num) {
    var m = cmx.g.imgNumber.get(id);
    m--;
    cmx.g.imgNumber.put(id, m);
    console.log('#cmx-file-index-id-' + fileindexid);
    var _tempfilearray = cmx.g.filesarray.get(fileclassid);
    removeByValue(_tempfilearray, fileindexid);
    cmx.g.filesarray.put(fileclassid, _tempfilearray);
    if (num > 0) {
        num--;
    }
    $('#filelist-' + id + '.file-upload-list #exampleLazy').slick('removeSlide', num);
    $('#cmx-file-index-id-' + fileindexid).remove();
    $('.shanchu-btn').each(function () {
        if (num < $(this).attr('data-num')) {
            var dataNum = $(this).attr('data-num');
            dataNum--;
            $(this).attr('data-num', dataNum);
            $(this).removeAttr('onclick');
            $(this).attr('onclick', 'removeThisFile56020Add2(\'' + fileclassid + '\', \'' + fileindexid + '\', \'' + id + '\', \'' + dataNum + '\')');
        }
    });
}

function removeThisFile56020Add2(fileclassid, fileindexid, id, num) {
    var m = cmx.g.imgNumber.get(id);
    m--;
    cmx.g.imgNumber.put(id, m);
    console.log('#cmx-file-index-id-' + fileindexid);
    var _tempfilearray = cmx.g.filesarray.get(fileclassid);
    removeByValue(_tempfilearray, fileindexid);
    cmx.g.filesarray.put(fileclassid, _tempfilearray);
    if (num > 0) {
        num--;
    }
    $('#filelist-' + id + '.file-upload-list #exampleLazy').slick('removeSlide', num);
    $('#cmx-file-index-id-' + fileindexid).remove();
    $('.shanchu-btn').each(function () {
        if (num < $(this).attr('data-num')) {
            var dataNum = $(this).attr('data-num');
            dataNum--;
            $(this).attr('data-num', dataNum);
            $(this).removeAttr('onclick');
            $(this).attr('onclick', 'removeThisFile56020Add(\'' + fileclassid + '\', \'' + fileindexid + '\', \'' + id + '\', \'' + dataNum + '\')');
        }
    });
}
cmx.route.model({
    index: 'automated-form-file56020',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        var multitype = false;
        if (parameter.data.attribute.single == '0') {
            multitype = true;
        }
        if (webUploadFile56020 && typeof webUploadFile56020 == 'function') {
            var id = parameter.data.serialnumber;
            webUploadFile56020({
                "id": "#" + id, //选择器内自动生成上传文件按钮
                "label": "上传文件", //按钮文字
                "multiple": multitype, //多选，值为true表示多选，false表示单选
                "image": false, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "folder_id": 5, //文件夹id值
                "document_id": 0, //暂时不做修改，确定为0
                "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": 47, //需要传过来//申请人上传附件
                success: function (param, response) {
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindex : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileIndexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#filelist-' + id + '.file-upload-list').empty().append([
                        '<li data-toggle="tooltip" data-placement="top" title="' + response.data[0].fileoriginalname + '" data-original-title="' + response.data[0].fileoriginalname + '" id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                        '<div class="btn-group" role="group">',
                        '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                        response.data[0].fileoriginalname,
                        '</button>',
                        '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                        '<i class="icon wb-trash" aria-hidden="true"></i>',
                        '</button>',
                        '</div>',
                        '</li>'
                    ].join(''));
                    $("[data-toggle='tooltip']").tooltip();
                },
                error: function (param) {
                    //集中处理过了
                }
            });
        }
    }
});
cmx.route.model({
    index: 'automated-form-showimg',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});

cmx.route.model({
    index: 'automated-form-signature',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        $.getScript('/vendor/signature/jq-signature.min.js', function () {
            $(parameter.element + ' [cmx-type="signature"]').each(function () {
                var id = $(this).find('.pending').attr('id');
                buildSignature({
                    id: '#' + id
                });
            })
        });
    }
});
cmx.route.model({
    index: 'automated-form-switch',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        $('head').append('<link href="' + '/vendor/switchery/switchery.css' + '" rel="stylesheet">');
        $.getScript('/vendor/switchery/switchery.min.js', function () {
            $(parameter.element + ' .js-switch').each(function () {
                var elem = document.querySelector('#' + $(this).attr('id'));
                var init = new Switchery(elem);
            })
        });
    }
});
cmx.route.model({
    index: 'automated-form-arithmetic',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
        var element = parameter.element;
        var expression = parameter.data.attribute.expression;
        var related = parameter.data.attribute.related;
        for (var i = 0; i < related.length; i++) {
            $(element + ' [cmx-column="' + related[i] + '"]').find('input').on('input propertychange', function () {
                var flag = true;
                for (var j = 0; j < related.length; j++) {
                    if ($(element + ' [cmx-column="' + related[j] + '"]').find('input').length == 0) {
                        flag = false;
                    } else {
                        if (IsEmpty($(element + ' [cmx-column="' + related[j] + '"]').find('input').val())) {
                            flag = false;
                        }
                    }
                }
                if (flag) {
                    expression = parameter.data.attribute.expression;
                    for (var j = 0; j < related.length; j++) {
                        expression = expression.replace(new RegExp(related[j], 'g'), $(element + ' [cmx-column="' + related[j] + '"]').find('input').val())
                    }
                    try {
                        var finallydata = eval(expression);
                        if (finallydata == Infinity || finallydata == -Infinity) {
                            $(element + ' #' + parameter.data.columnindex).val(0);
                        } else {
                            $(element + ' #' + parameter.data.columnindex).val(finallydata.toFixed(parameter.data.attribute.decimal));
                        }
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    $(element + ' #' + parameter.data.columnindex).val('');
                }
            })
        }
    }
});
cmx.route.model({
    index: 'automated-form-expand',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});

function removeImg() {
    $(".removeImg").off('click');
    $(".removeImg").on('click', function () {
        $(this).parent().remove();
    })
}