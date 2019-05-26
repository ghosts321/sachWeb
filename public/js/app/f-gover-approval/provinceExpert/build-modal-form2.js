/**
 * author: lvjinxiu
 * date: 2017-09-08
 * objective: form create
 */

//send.toviewreject(parameter + '第一个页面应该是失败的').go();//不带下一个model传参
//send.tomodel('*****').toviewresolve(parameter + '第二个页面应该是成功的').go();//带上了下一个model传参
//abort('第三个页面我选择走你');//选择了终止
//TODO
// var workspaceid = 66;
// var token = 'NDk4ZUVjRTJQK29IWXZwcmltVytTVlJXTkc1MnpVQXdHbEViU3krbUR3Y0F0akVrOXIrZ1o3Uy9LTHdKbUFOMTA4M2FTMEE*';
// putData('token', token);
// putData('workspaceid', workspaceid);
/**
 * @author lvjinxiu
 * @description 验证表单输入框长度
 */
function checkFormLength(ele) {
    var flag = true;
    $(ele + ' [cmx-tag="cmx"]').each(function () {
        var type = $(this).attr('cmx-type');
        var notnull = $(this).attr('cmx-require');
        var title = $(this).find('.control-label').first().text().replace(/\*/g, '');
        var max_length = 99999999999999999999999999999999999999999;
        if (!IsEmpty($(this).attr('max-length'))) {
            max_length = parseInt($(this).attr('max-length'));
        }
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
                    if ($(this).find('input').val().length > max_length) {
                        showAlert({
                            type: 'info',
                            content: title + '的长度不能超过' + max_length
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
                            content: title + '的长度不能超过' + max_length
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
                            content: title + '的长度不能超过' + max_length
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
                    if ($(this).find('input:checked').val().length > max_length) {
                        showAlert({
                            type: 'info',
                            content: title + '的长度不能超过' + max_length
                        });
                        flag = false;
                        return false;
                    }
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
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
                        content: title + '的长度不能超过' + max_length
                    });
                    flag = false;
                    return false;
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
    }
);
cmx.route.model({
        index: 'automated2-form-text',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }
);
cmx.route.model({
        index: 'automated2-form-autono',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }
);
cmx.route.model({
        index: 'automated2-form-single',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }
);
cmx.route.model({
        index: 'automated2-form-multi',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }
);
cmx.route.model({
        index: 'automated2-form-tel',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }
);
cmx.route.model({
        index: 'automated2-form-phone',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-mail',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-datetime',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
//Ace's add dateType
cmx.route.model({
        index: 'automated2-form-dateType',
        handle: function (parameter, prevModelData, send, abort) {
            console.log(parameter);
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-password',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-website',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-separator',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-special',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-daterange',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);
cmx.route.model({
        index: 'automated2-form-money',
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
    }

);
cmx.route.model({
        index: 'automated2-form-num',
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
    }

);
cmx.route.model({
        index: 'automated2-form-address',
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
    }

);
cmx.route.model({
    index: 'automated2-form-image',
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
                "fileDirectoryId": 1,
                success: function (param, response) {
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#filelist-' + id + '.file-upload-list').append([
                        '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
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
                },
                error: function () {
                    //集中处理过了
                }
            });
        });
    }
});

// 上传文件 任何类型
cmx.route.model({
    index: 'automated2-form-any',
    handle: function (parameter, prevModelData, send, abort) {
        var fileDirectoryId = 47;
        if (typeof parameter.data != 'undefined' && typeof parameter.data.extra != 'undefined' && typeof parameter.data.extra.fileDirectoryId != 'undefined') {
            fileDirectoryId = parameter.data.extra.fileDirectoryId;
        }
        send.toviewresolve(parameter).go();
        var multitype = false;
        if (parameter.data.attribute.single == '0') {
            multitype = true;
        }
        $(parameter.element + ' [cmx-type="any"]').each(function () {
            var id = $(this).find('.form-any').attr('id');
            webUploadFile({
                "id": "#" + id, //选择器内自动生成上传文件按钮
                "label": "上传附件", //按钮文字
                "multiple": multitype, //多选，值为true表示多选，false表示单选
                "image": 2, //图片选择，true代表上传图片，false代表文件
                "token": getData('token'), //验证身份
                "folder_id": 5, //文件夹id值
                "document_id": 0, //暂时不做修改，确定为0
                "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                "extra": '', //暂时不做修改，确定为空
                "passorend": 1,
                "fileDirectoryId": fileDirectoryId,
                "imgId": 1,
                success: function (param, response) {
                    var fileclassid = cmx.g.filelinkfileclass[id];
                    if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                        cmx.g.filesarray.put(fileclassid, []);
                    }
                    var fileindexid = response.data[0].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response.data[0].fileindexid : fileindexid);
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#anylist-' + id + '.any-upload-list').append([
                        '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
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
                },
                error: function () {
                    //集中处理过了
                }
            });
        });
    }
});

// 上传文件 任何类型
cmx.route.view({
    index: 'automated2-form-any',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="form-any" id="' + all.data.serialnumber + '"></div>',
            '<div class="col-sm-7 padding-0">',
            '<ul class="any-upload-list margin-0 padding-0" id="anylist-' + all.data.serialnumber + '"></ul>',
            '</div>',
            '</div>',
            '</div>',
        ].join("");
        $(all.element).append(html);
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});

function removeThisFile(fileclassid, fileindexid) {
    console.log('#cmx-file-index-id-' + fileindexid);
    var _tempfilearray = cmx.g.filesarray.get(fileclassid);
    removeByValue(_tempfilearray, fileindexid);
    cmx.g.filesarray.put(fileclassid, _tempfilearray);
    $('#cmx-file-index-id-' + fileindexid).remove();
}

function downloadThisFile(fileindexid) {
    DownLoadFile(undefined, getFile + fileindexid);
}
cmx.route.model({
        index: 'automated2-form-file',
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
                    "fileDirectoryId": 157, //需要传过来
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
                        $('#filelist-' + id + '.file-upload-list').html([
                            '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
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

                    },
                    error: function (param) {
                        //集中处理过了
                    }
                });
            }
        }
    }
);

cmx.route.model({
        index: 'automated2-form-handimg',
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
                    "image": true, //图片选择，true代表上传图片，false代表文件
                    "token": getData('token'), //验证身份
                    "folder_id": 5, //文件夹id值
                    "document_id": 0, //暂时不做修改，确定为0
                    "document_upload_description": '办公系统自动归档 ', //暂时不做修改，确定为空
                    "extra": '', //暂时不做修改，确定为空
                    "passorend": 1,
                    "fileDirectoryId": 158,
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
                        $('#filelist-' + id + '.file-upload-list').html([
                            '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                            '<div class="btn-group" role="group">',
                            '',
                            '<img onclick="downloadThisFile(\'' + fileindexid + '\')" src="' + getFile + fileindexid + '" style="min-width: 150px !important;max-width: 150px !important;" class="cmx-upload-file-name"/>',
                            '<button onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')" type="button" class="btn btn-icon btn-primary btn-sm btn-round img-remove-btn">',
                            '<i class="icon wb-close" aria-hidden="true"></i></button>',
                            '</div>',
                            '</li>'
                        ].join(''));
                    },
                    error: function (param) {
                        //集中处理过了
                    }
                });
            }
        }
    }

);
cmx.route.model({
    index: 'automated2-form-showimg',
    handle: function (parameter, prevModelData, send, abort) {
        send.toviewresolve(parameter).go();
    }
});

cmx.route.model({
        index: 'automated2-form-signature',
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
    }

);
cmx.route.model({
        index: 'automated2-form-switch',
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
    }

);
cmx.route.model({
        index: 'automated2-form-arithmetic',
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
    }

);
cmx.route.model({
        index: 'automated2-form-expand',
        handle: function (parameter, prevModelData, send, abort) {
            send.toviewresolve(parameter).go();
        }
    }

);

function removeImg() {
    $(".removeImg").off('click');
    $(".removeImg").on('click', function () {
        $(this).parent().remove();
    })
}