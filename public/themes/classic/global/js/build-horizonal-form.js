/*
 * @Author: lvjinxiu 
 * @Date: 2017-10-18 10:44:44 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-18 17:12:04
 * content: 水平表单view
 */


/**
 * @author lvjixniu
 * @description 构建表单过程所需方法
 * @param {any} param 
 */
//文件类型上传插件初始化函数
function webUploadFile(param) {
    var REJECT_TYPE = ['pdf', 'doc', 'docx'];
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
//移除已上传文件
function removeFile(ev, ele) {
    $(ele).parent().remove();
}
//添加多行文本
function addExtra(data) {
    var notnull = (data.attribute.notnull == 1) ? true : false;
    var attrstring = 'cmx-tag="cmx" cmx-lib="' + data.serialnumber + '" cmx-index="' + data.columnindex +
        '" cmx-column="' + data.columnname + '" cmx-type="' + data.type + '" cmx-require="' +
        notnull + '"';
    var max_length = '';
    if (data.attribute.max_length && IsNum(data.attribute.max_length)) {
        max_length = 'max-length="' + data.attribute.max_length + '"';
    }
    var html = [
        '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + data.extra.width + ' col-lg-' + data.extra.width + ' ' + data.extra.class + '" id="cmx-textarea-div-' + data.attribute.id + '" ' + attrstring + ' ' + max_length + '>',
        '<div>',
        '<span class="control-label">' + (data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + data.name + '</span>',
        '</div>',
        '<div class="" style="background-color:#fff;">',
        '<textarea placeholder="' + data.extra.placeholder + '" id="' + data.columnindex + '"class="form-control empty" rows="8" style="resize:none;"></textarea>',
        '</div>',
        '</div>'
    ].join("");
    $("#cmx-form").append(html);
}
//选中常用语，增加到意见框
function selectCommonWords(selectID, buttonId, opinionID) {
    new cmx.process()
        .turn('callajax', {
            url: api_cm + '/CmPhraseinfoController/getDataByToken',
            data: JSON.stringify({
                token: getData('token')
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var commonwords = '';
                var data1 = prevModelData.data;
                for (var i = 0; i < data1.length; i++) {
                    commonwords += '<option value="' + data1[i].phraseId + '">' + data1[i].phraseContent + '</option>';
                }
                $('#' + selectID).html(commonwords);
            }
            $('#' + buttonId).off('click');
            $('#' + buttonId).on('click', function () {
                $('#' + opinionID).val($('#' + selectID).find("option:selected").text());
            });
        })
        .start();
}
//签名插件
function buildSignature(param) {
    var signaturn_body_ele = undefined;
    if (typeof param.id == 'string') {
        signaturn_body_ele = $(param.id);
    } else {
        signaturn_body_ele = param.id;
    }
    if (IsNull(signaturn_body_ele)) {
        param.error('id is not valid');
        return;
    }
    var signature_body_id = signaturn_body_ele.attr('id');
    var signature_width = $('#work-tabledata-add .panel-heading').width() - 40;
    if ($('#right-popup-content-fixed').hasClass('col-lg-8')) {
        signature_width = signature_width * 2 / 3;
    }
    signature_width = signature_width < 100 ? 500 : signature_width;
    signaturn_body_ele.html([
        '<div class="adapt-signature" signature-id="' + signature_body_id + '" data-width="' + signature_width + '" data-height="195" data-border="2px dashed #eee;" data-line-color="#222222" data-auto-fit="true"></div>'
    ].join(''));
    setTimeout(function () {
        $('.adapt-signature[signature-id="' + signature_body_id + '"]').jqSignature();
        $('.adapt-signature[signature-id="' + signature_body_id + '"]').on('jq.signature.changed', function () {
            $(this).attr('is-dirty', '1');
        });
    }, 100);
}

function getSignature(id) {
    if ($('[signature-id="' + id + '"]').attr('is-dirty') == '1')
        return $('[signature-id="' + id + '"]').jqSignature('getDataURL');
    else return "";
}

function numberToChineseCapital(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "数据非法";
    var unit = "千百拾亿千百拾万千百拾元角分",
        str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g,
        "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}

//Ace's add readonly
var readonly = '';

function addReadonly(r, all) {
    if (all.data.extra.readonly) {
        readonly = all.data.extra.readonly;
    } else {
        readonly = r;
    }
}
cmx.route.view({
    index: 'automated-form-text',
    resolve: function (data) {
        var all = data;
        var stype = all.data.attribute.stype;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        if (stype == 'short') {
            addReadonly('', all);
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<input type="text" ' + readonly + ' class="form-control old-val-tag" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 'long') {
            addReadonly('', all);
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '  ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<textarea class="form-control old-val-tag" ' + readonly + ' id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value=""></textarea>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");

            $(all.element).append(html);
        } else if (stype == 'extra') {
            // TO DO 富文本编辑器
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '  ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="pending col-sm-9">',
                '<button type="button" class="btn btn-info btn-block pending">',
                '<i class="icon wb-edit" aria-hidden="true"></i> 点击编辑',
                '</button>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else {
            var html = '<p>' + all.data.name + ':类型错误</p>';
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-autono',
    resolve: function (data) {
        var all = data;
        var message = '';
        var stype = all.data.attribute.stype;
        if (stype == 0) {
            message = '随机';
        } else if (stype == 1) {
            message = '自增';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="text" class="form-control old-val-tag" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="' + message + '" readonly>',
            '<p class="p-val-tag p-val-hidden"></p>',
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
//添加默认选中
cmx.route.view({
    index: 'automated-form-single',
    resolve: function (data) {
        var all = data;
        var option = '';
        var stype = all.data.attribute.stype;
        var remark = all.data.attribute.remark;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        if (stype == 1) {
            addReadonly('', all);
            for (var j = 0; j < remark.length; j++) {
                option = option + '<option value="' + remark[j].id + '">' + remark[j].value + '</option>';
            }
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<select ' + (IsEmpty(all.data.extra.datadic) ? '' : 'data-dic="' + all.data.extra.datadic + '"') + ' class="form-control old-val-tag" ' + readonly + ' id="' + all.data.columnindex + '" name="' + all.data.columnindex + '">' + option + '<select>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 2) {
            for (var j = 0; j < remark.length; j++) {
                option = option + [
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input ' + remark[j].checked + ' type="radio" id="' + all.data.columnindex + '-' + remark[j].id + '" name="' + all.data.columnindex + '" value="' + remark[j].id + '">',
                    '<label for="' + all.data.columnindex + '-' + remark[j].id + '" >' + remark[j].value + '</label>',
                    '</div>',
                ].join("");
            }
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div id="' + all.data.columnindex + '" class="col-sm-9">',
                '<div class="radio-set old-val-tag">' + option + '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else {
            var html = '<p>' + all.data.name + ':类型错误</p>';
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-multi',
    resolve: function (data) {
        var all = data;
        var option = '';
        var remark = all.data.attribute.remark;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        for (var j = 0; j < remark.length; j++) {
            option = option + [
                '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                '<input type="checkbox" id="' + all.data.columnindex + '-' + remark[j].id + '" name="' + all.data.columnindex + '" value="' + remark[j].id + '">',
                '<label for="' + all.data.columnindex + '-' + remark[j].id + '">' + remark[j].value + '</label>',
                '</div>',
            ].join("");
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div id="' + all.data.columnindex + '" class="col-sm-9">',
            '<div class="checkbox-set old-val-tag">' + option + '</div>',
            '<p class="p-val-tag p-val-hidden"></p>',
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
cmx.route.view({
    index: 'automated-form-tel',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="text" class="form-control old-val-tag" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
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
cmx.route.view({
    index: 'automated-form-phone',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="text" class="form-control old-val-tag" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
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
cmx.route.view({
    index: 'automated-form-money',
    resolve: function (data) {
        var all = data;
        var prefix = all.data.attribute.prefix;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        if (prefix == 1) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label><span class="chinesecaptial pull-right text-info"></span>',
                '<div class="col-sm-9">',
                '<div class="input-group input-group-icon old-val-tag" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="width: 100%"' : '') + '>',
                '<span class="input-group-addon" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="display: none"' : '') + '>' + all.data.attribute.unit + '</span>',
                '<input type="number" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
                '</span>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (prefix == 0) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label><span class="chinesecaptial pull-right text-info"></span>',
                '<div class="col-sm-9">',
                '<div class="input-group input-group-icon old-val-tag" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="width: 100%"' : '') + '>',
                '<input type="number" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
                '<span class="input-group-addon" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="display: none"' : '') + '>' + all.data.attribute.unit + '</span>',
                '</span>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else {
            var html = '<p>' + all.data.name + ':类型错误</p>';
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-num',
    resolve: function (data) {
        var all = data;
        var prefix = all.data.attribute.prefix;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        if (prefix == 1) {
            addReadonly('', all);
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<div class="input-group input-group-icon old-val-tag" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="width: 100%"' : '') + '>',
                '<span class="input-group-addon" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="display: none"' : '') + '>' + all.data.attribute.unit + '</span>',
                '<input type="number" ' + readonly + ' class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '">',
                '</span>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (prefix == 0) {
            addReadonly('', all);
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<div class="input-group input-group-icon old-val-tag" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="width: 100%"' : '') + '>',
                '<input type="number" ' + readonly + ' class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '">',
                '<span class="input-group-addon" ' + ((IsEmpty(all.data.attribute.unit)) ? 'style="display: none"' : '') + '>' + all.data.attribute.unit + '</span>',
                '</span>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else {
            var html = '<p>' + all.data.name + ':类型错误</p>';
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-mail',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="text" class="form-control old-val-tag" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
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
cmx.route.view({
    index: 'automated-form-datetime',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="text" class="form-control old-val-tag" id="datetime' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
            '</div>',
            '</div>',
            '</div>',
        ].join("");
        $(all.element).append(html);
        if (all.data.attribute.stype == '1') {
            $("#datetime" + all.data.columnindex).datetimepicker({
                language: 'zh-CN',
                format: "yyyy-mm-dd hh:ii:ss",
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            });
        } else {
            $("#datetime" + all.data.columnindex).datetimepicker({
                minView: "month", //选择日期后，不会再跳转去选择时分秒 
                format: "yyyy-mm-dd", //选择日期后，文本框显示的日期格式 
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1
            });
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
//Ace's add dateType
cmx.route.view({
    index: 'automated-form-dateType',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        addReadonly('', all);
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<div class="input-group old-val-tag">',
            '<span class="input-group-addon">',
            '<i class="icon wb-calendar" aria-hidden="true"></i>',
            '</span>',
            '<input ' + readonly + ' type="text" class="form-control" data-plug="datepicker" data-language="zh-CN" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '">',
            '</div>',
            '<p class="p-val-tag p-val-hidden"></p>',
            '</div>',
            '</div>',
            '</div>',
        ].join("");
        $(all.element).append(html);
        $('[data-plug="datepicker"]').datepicker({ //日期控件
            language: 'zh-CN',
            autoclose: true, //选择之后是否关闭日期选项
            todayHighlight: true, //当为true的时候高亮
            keyboardNavigation: true,
            format: 'yyyy-mm-dd',
        });
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-address',
    resolve: function (data) {
        var all = data;
        var stype = all.data.attribute.stype;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        if (stype == 1) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div id="' + all.data.columnindex + '" class="col-sm-9">',
                '<div class="row address-set old-val-tag">',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control province"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control city"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control area"></select>',
                '</div>',
                '<div class="col-md-12 col-xs-12 col-sm-12">',
                '<textarea class="form-control margin-top-10 address"></textarea>',
                '</div>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 2) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<div class="row address-set old-val-tag">',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control province"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control city"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control area"></select>',
                '</div>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 3) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<div class="row address-set old-val-tag">',
                '<div class="col-md-6 col-xs-6 col-sm-6">',
                '<select class="form-control province"></select>',
                '</div>',
                '<div class="col-md-6 col-xs-6 col-sm-6">',
                '<select class="form-control city"></select>',
                '</div>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 4) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<select class="form-control province old-val-tag"></select>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else {
            var html = '<p>' + all.data.name + ':类型错误</p>';
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-address-dic',
    resolve: function (data) {
        var all = data;
        var stype = all.data.attribute.stype;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        if (stype == 1) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div id="' + all.data.columnindex + '" class="col-sm-9">',
                '<div class="row address-set old-val-tag">',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control province"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control city"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control area"></select>',
                '</div>',
                '<div class="col-md-12 col-xs-12 col-sm-12">',
                '<textarea class="form-control margin-top-10 address"></textarea>',
                '</div>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 2) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<div class="row address-set old-val-tag">',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control province"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control city"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control area"></select>',
                '</div>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 3) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<div class="row address-set old-val-tag">',
                '<div class="col-md-6 col-xs-6 col-sm-6">',
                '<select class="form-control province"></select>',
                '</div>',
                '<div class="col-md-6 col-xs-6 col-sm-6">',
                '<select class="form-control city"></select>',
                '</div>',
                '</div>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 4) {
            var html = [
                '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
                '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<div class="col-sm-9">',
                '<select class="form-control province old-val-tag"></select>',
                '<p class="p-val-tag p-val-hidden"></p>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else {
            var html = '<p>' + all.data.name + ':类型错误</p>';
        }
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-password',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="password" class="form-control old-val-tag" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
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
cmx.route.view({
    index: 'automated-form-image',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<div class="form-image" id="' + all.data.serialnumber + '"></div>',
            '<ul class="margin-top-10 image-upload-list"></ul>',
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
cmx.route.view({
    index: 'automated-form-file',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-2">',
            '<div class="form-file" id="' + all.data.serialnumber + '">',
            '</div>',
            '</div>',
            '<div class="col-sm-7 padding-0">',
            '<ul class="file-upload-list margin-0 padding-0" id="filelist-' + all.data.serialnumber + '"></ul>',
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
cmx.route.view({
    index: 'automated-form-handimg',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-2">',
            '<div class="form-file" id="' + all.data.serialnumber + '">',
            '</div>',
            '</div>',
            '<div class="col-sm-7 padding-0">',
            '<ul class="file-upload-list margin-0 padding-0" id="filelist-' + all.data.serialnumber + '"></ul>',
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
//56020
cmx.route.view({
    index: 'automated-form-handimg56020',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-2" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-3">',
            '<div class="form-file" id="' + all.data.serialnumber + '">',
            '</div>',
            '</div>',
            '<div class="col-sm-7 padding-0">',
            '<ul class="file-upload-list margin-0 padding-0" id="filelist-' + all.data.serialnumber + '"></ul>',
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
cmx.route.view({
    index: 'automated-form-file56020',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-2" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-3">',
            '<div class="form-file" id="' + all.data.serialnumber + '">',
            '</div>',
            '</div>',
            '<div class="col-sm-7 padding-0">',
            '<ul class="file-upload-list margin-0 padding-0" id="filelist-' + all.data.serialnumber + '"></ul>',
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
cmx.route.view({
    index: 'automated-form-showimg',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<div class="form-file" id="' + all.data.serialnumber + '"></div>',
            '<ul class="file-upload-list imgDiv" style="min-height:50px;padding:0;box-sizing:border-box;">',
            '</ul>',
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
cmx.route.view({
    index: 'automated-form-signature',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<div class="pending" style="border: 1px #ddd solid;" id="signature-' + all.data.serialnumber + '">内容待定</div>',
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
cmx.route.view({
    index: 'automated-form-website',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
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
cmx.route.view({
    index: 'automated-form-separator',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.attribute.title + '<small>' + all.data.attribute.desc + '</small></label>',
            '<div id="separator-' + all.data.serialnumber + '" class="inline-block pull-right"></div>',
            '<hr class="margin-bottom-0 margin-top-10"/>',
            '</div>',
            '</div>',
        ].join("");
        $(all.element).append(html);
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-special',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div class="col-sm-9" id="cmx-special-' + all.data.serialnumber + '"></div>',
            '</div>',
            '</div>',
        ].join("");
        $(all.element).append(html);
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});

// yuhao 自用
cmx.route.view({
    index: 'automated-form-expand',
    resolve: function (data) {

    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated-form-switch',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label col-sm-3" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div class="col-sm-9">',
            '<input type="checkbox" class="switch js-switch" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
            '<p class="p-val-tag p-val-hidden"></p>',
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

//文物进出境中所用图片方法
function webUploadFileFor56020(param) {
    var REJECT_TYPE = ['js', 'php', 'exe', 'dll', 'bat'];
    var IMAGE_TYPE = ['jpeg', 'jpg', 'bmp', 'png', 'gif'];
    var imgId = param.imgId;
    var $ele = $(param.id);
    // 优化retina, 在retina下这个值是2
    var ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 450 * ratio,
        thumbnailHeight = 250 * ratio;
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
            fileDirectoryID: '158' //申请人上传附件
        },
        fileSingleSizeLimit: 2 * 1024 * 1024, //2M
        fileSizeLimit: 20 * 1024 * 1024, //20M
        duplicate: true
    });
    uploader.on('beforeFileQueued', function (file) {
        if (param.image) {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                if ($.inArray(file.ext.toLowerCase(), IMAGE_TYPE) < 0) {
                    alert('请上传图片类型的文件：' + IMAGE_TYPE.join('、'));
                    return false;
                }
                return true;
            } else {
                alert('不可以上传' + REJECT_TYPE.join('、') + '的文件')
                return false;
            }
        }
    });

    uploader.on("error", function (type) {
        console.log(type);
        if (type == "Q_EXCEED_SIZE_LIMIT") {
            alert("图片总大小不能超过20M");
        } else if (type == "F_EXCEED_SIZE") {
            alert("单张图片大小不能超过2M");
        } else {
            alert("上传出错！请检查后重新上传！错误代码" + type);
        }
    });
    uploader.on('fileQueued', function (file) {
        var m = cmx.g.imgNumber.get(imgId);
        m++;
        cmx.g.imgNumber.put(imgId, m);
        if (m < 7) {
            setTimeout(function () {
                uploader.upload()
            }, 500);
        } else {
            showAlert({
                type: 'info',
                content: "最多上传6张，只上传前六张图片！"
            });
            uploader.removeFile(file, true);
            m--;
            cmx.g.imgNumber.put(imgId, m);
        }
    });

    uploader.on('uploadStart', function (file) {
        L(file);

        waitProcess(file.id);
        showLoading();
        showFileUploadBody();
        $('.g-file-list').append([
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

        hideLoading(file.id);
    });

}
//56020-xls
function webUploadFile56020(param) {
    var REJECT_TYPE = ['xls'];
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
            fileDirectoryID: '157' //申请人上传附件
        },
        fileSingleSizeLimit: 512 * 1024 * 1024, //200M
        fileSizeLimit: 1024 * 1024 * 1024, //1000M
        duplicate: true,
    });
    uploader.on('beforeFileQueued', function (file) {
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
                // alert('只可以上传xls文件');
                showAlert({
                    type: 'error',
                    content: '只可以上传xls文件'
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
        $('.g-file-list').append([
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