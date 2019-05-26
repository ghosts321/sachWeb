/*
 * @Author: lvjinxiu 
 * @Date: 2017-09-09 11:22:03 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2017-09-12 20:01:54
 */
function webUploadFile(param) {
	console.log(param);
    var REJECT_TYPE = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'rar', 'zip'];
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
            fileDirectoryID: param.fileDirectoryId //申请人上传附件
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
        
        if (param.image == '2') {
        	return true;
        }	
        
        if (param.image) {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                if ($.inArray(file.ext.toLowerCase(), IMAGE_TYPE) < 0) {
                    alert('请上传图片类型的文件：' + IMAGE_TYPE.join('、'));
                    return false;
                }
                return true;
            } else {
                alert('不可以上传' + REJECT_TYPE.join('、') + '的文件');
                return false;
            }
        } else {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                alert('只可以上传pdf,doc文件');
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
cmx.route.view({
    index: 'dataPackge',
    resolve: function (data) {
        cmx.route.autoRun({ //至少有一组
            'DEFAULT': function () {},
            'IE6': function () {},
            'IE10': function () {
                $(data).unbind('click');
                $(data).bind('click', function () {
                    var datas = dataPackge('#form');
                    console.log(datas)
                });
            }
        });
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'editData',
    resolve: function (data) {
        cmx.route.autoRun({ //至少有一组
            'DEFAULT': function () {},
            'IE6': function () {},
            'IE10': function () {
                $(data).unbind('click');
                $(data).bind('click', function () {
                    var str = 'switch=true&singletext=111&rich-text=""&autono=""&singleradio=1&singleselect=1&multi=[0,1]&tel=54&phone=45&moneyprefix=45&moneysuffix=45&numprefix=45&numsuffix=45&mail=45&datetime=88&password=66&website=66&image=""&file=""&signature=&textmulti=89&addressall={"privince":"上海市","city":"上海市市辖区","area":"静安区","address":"撒大声地"}&addressmore={"privince":"福建省","city":"福州市","area":"鼓楼区"}&addressnormal={"privince":"内蒙古自治区","city":"呼和浩特市"}&addressshort={"privince":"江苏省"}';
                    dataAssign('#form', str.split('&'));
                });
            }
        });
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});

cmx.route.view({
    index: 'automated2-form-text',
    resolve: function (data) {
        var all = data;
        var stype = all.data.attribute.stype;
        if (stype == 'short') {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
                '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 'long') {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<textarea class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value=""></textarea>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 'extra') {
            // TO DO 富文本编辑器
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<div class="pending">',
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
    index: 'automated2-form-autono',
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
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="' + message + '" readonly>',
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
    index: 'automated2-form-single',
    resolve: function (data) {
        var all = data;
        var option = '';
        var stype = all.data.attribute.stype;
        var remark = all.data.attribute.remark;
        if (stype == 1) {
            for (var j = 0; j < remark.length; j++) {
                option = option + '<option value="' + remark[j].id + '">' + remark[j].value + '</option>';
            }
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label">' + all.data.name + '</label>',
                '<select class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '">' + option + '<select>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 2) {
            for (var j = 0; j < remark.length; j++) {
                option = option + [
                    '<div class="radio-custom radio-primary radio-inline">',
                    '<input type="radio" id="' + all.data.columnindex + '-' + remark[j].id + '" name="' + all.data.columnindex + '" value="' + remark[j].id + '">',
                    '<label for="' + all.data.columnindex + '-' + remark[j].id + '">' + remark[j].value + '</label>',
                    '</div>',
                ].join("");
            }
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label">' + all.data.name + '</label>',
                '<div id="' + all.data.columnindex + '" class="radio-set ">' + option + '</div>',
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
    index: 'automated2-form-multi',
    resolve: function (data) {
        var all = data;
        var option = '';
        var remark = all.data.attribute.remark;
        for (var j = 0; j < remark.length; j++) {
            option = option + [
                '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                '<input type="checkbox" id="' + all.data.columnindex + '-' + remark[j].id + '" name="' + all.data.columnindex + '" value="' + remark[j].id + '">',
                '<label for="' + all.data.columnindex + '-' + remark[j].id + '">' + remark[j].value + '</label>',
                '</div>',
            ].join("");
        }
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label">' + all.data.name + '</label>',
            '<div id="' + all.data.columnindex + '" class="checkbox-set ">' + option + '</div>',
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
    index: 'automated2-form-tel',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-phone',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-money',
    resolve: function (data) {
        var all = data;
        var flag = true;
        var prefix = all.data.attribute.prefix;
        try {
            if (parseInt(all.data.attribute.min) > parseInt(all.data.attribute.max)) {
                flag = false;
            }
        } catch (error) {
            console.log(error)
        }
        if (prefix == 0) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label><span class="chinesecaptial pull-right text-info"></span>',
                '<div class="input-group input-group-icon">',
                '<span class="input-group-addon">' + all.data.attribute.unit + '</span>',
                '<input type="number" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" ' + ((flag == true) ? 'min="' + all.data.attribute.min + '" max="' + all.data.attribute.max + '"' : '') + ' placeholder="' + all.data.extra.placeholder + '" value="">',
                '</span>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (prefix == 1) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label><span class="chinesecaptial pull-right text-info"></span>',
                '<div class="input-group input-group-icon">',
                '<input type="number" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" ' + ((flag == true) ? 'min="' + all.data.attribute.min + '" max="' + all.data.attribute.max + '"' : '') + ' placeholder="' + all.data.extra.placeholder + '" value="">',
                '<span class="input-group-addon">' + all.data.attribute.unit + '</span>',
                '</span>',
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
    index: 'automated2-form-num',
    resolve: function (data) {
        var all = data;
        var flag = true;
        var prefix = all.data.attribute.prefix;
        try {
            if (parseInt(all.data.attribute.min) > parseInt(all.data.attribute.max)) {
                flag = false;
            }
        } catch (error) {
            console.log(error)
        }
        if (prefix == 0) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<div class="input-group input-group-icon">',
                '<span class="input-group-addon">' + all.data.attribute.unit + '</span>',
                '<input type="number" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" ' + ((flag == true) ? 'min="' + all.data.attribute.min + '" max="' + all.data.attribute.max + '"' : '') + ' placeholder="' + all.data.extra.placeholder + '" value="">',
                '</span>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (prefix == 1) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<div class="input-group input-group-icon">',
                '<input type="number" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" ' + ((flag == true) ? 'min="' + all.data.attribute.min + '" max="' + all.data.attribute.max + '"' : '') + ' placeholder="' + all.data.extra.placeholder + '" value="">',
                '<span class="input-group-addon">' + all.data.attribute.unit + '</span>',
                '</span>',
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
    index: 'automated2-form-mail',
    resolve: function (data) {
        cmx.route.autoRun({ //至少有一组
            'DEFAULT': function () {},
            'IE6': function () {},
            'IE10': function () {
                var all = data;
                var html = [
                    '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                    '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                    '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                    '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
                    '</div>',
                    '</div>',
                ].join("");
                $(all.element).append(html);
            }
        });
    },
    reject: function (data) {
        console.log('“失败” -- ' + data);
    }
});
cmx.route.view({
    index: 'automated2-form-datetime',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-dateType',
    resolve: function (data) {
        var all = data;
        var max_length = '';
        if (all.data.attribute.max_length && IsNum(all.data.attribute.max_length)) {
            max_length = 'max-length="' + all.data.attribute.max_length + '"';
        }
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' ' + max_length + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div>',
            ' <div class="input-group">',
            '<span class="input-group-addon">',
            '<i class="icon wb-calendar" aria-hidden="true"></i>',
            '</span>',
            '<input type="text" class="form-control" data-plug="datepicker" data-language="zh-CN" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '">',
            '</div>',
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
    index: 'automated2-form-address',
    resolve: function (data) {
        var all = data;
        var stype = all.data.attribute.stype;
        if (stype == 1) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<div class="row address-set">',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control privince"></select>',
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
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 2) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<div class="row address-set">',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control privince"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control city"></select>',
                '</div>',
                '<div class="col-md-4 col-xs-4 col-sm-4">',
                '<select class="form-control area"></select>',
                '</div>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 3) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<div class="row address-set">',
                '<div class="col-md-6 col-xs-6 col-sm-6">',
                '<select class="form-control privince"></select>',
                '</div>',
                '<div class="col-md-6 col-xs-6 col-sm-6">',
                '<select class="form-control city"></select>',
                '</div>',
                '</div>',
                '</div>',
                '</div>',
            ].join("");
            $(all.element).append(html);
        } else if (stype == 4) {
            var html = [
                '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
                '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
                '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
                '<select class="form-control privince"></select>',
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
    index: 'automated2-form-password',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="password" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-image',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div class="form-image" id="' + all.data.serialnumber + '"></div>',
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
    index: 'automated2-form-file',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div class="form-file" id="' + all.data.serialnumber + '"></div>',
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
    index: 'automated2-form-signature',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div class="pending" style="border: 1px #ddd solid;" id="signature-' + all.data.serialnumber + '">内容待定</div>',
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
    index: 'automated2-form-website',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-separator',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.attribute.title + '(<small>' + all.data.attribute.desc + '</small>)</label>',
            '<hr class="margin-0"/>',
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
    index: 'automated2-form-special',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + ' style="overflow:hidden;">',
            '<label class="control-label" for="' + all.data.columnindex + '">' + (all.data.attribute.notnull == 0 ? '' : '<span class="cmx-build-form-notnull">*</span>') + all.data.name + '</label>',
            '<div id="cmx-special-' + all.data.serialnumber + '"></div>',
            '<div></div>',
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
    index: 'automated2-form-switch',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div>',
            '<input type="checkbox" class="switch js-switch" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-daterange',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<div class="input-group input-group-icon">',
            '<input type="text" class="form-control" id="start' + all.data.columnindex + '" name="start' + all.data.columnindex + '" placeholder="' + all.data.extra.startplaceholder + '" value="">',
            '<span class="input-group-addon">至</span>',
            '<input type="text" class="form-control" id="end' + all.data.columnindex + '" name="end' + all.data.columnindex + '" placeholder="' + all.data.extra.endplaceholder + '" value="">',
            '</span>',
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
    index: 'automated2-form-arithmetic',
    resolve: function (data) {
        var all = data;
        var html = [
            '<div class="col-sm-' + all.width + ' col-xs-' + all.width + ' col-md-' + all.width + ' col-lg-' + all.width + '">',
            '<div class="form-group ' + all.data.extra.class + '" ' + all.attrstring + '>',
            '<label class="control-label" for="' + all.data.columnindex + '">' + all.data.name + '</label>',
            '<input type="text" class="form-control" id="' + all.data.columnindex + '" name="' + all.data.columnindex + '" placeholder="' + all.data.extra.placeholder + '" value="">',
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
    index: 'automated2-form-handimg',
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