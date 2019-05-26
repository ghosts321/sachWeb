//json url
var get56014aNoNationProjectFormData = public_url + 'data/app/f-gover-approval/56014/56014-a.json';
var get56014aEditRelicData = public_url + 'data/app/f-gover-approval/56014/56014-a-editrelic-modal.json';
//以下是附件的清单
var _projectNum = '56014_a';
var _projectType = '2';
cmx.g.regist('unitID', []);

function webUploadFileZip(param) {
    var REJECT_TYPE = ['zip'];
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
            // alert('不能上传空文件');
            showAlert({
                type: 'error',
                content: '不能上传空文件'
            });
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
$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click',function(){
        history.go(-1);
    });
    webUploadFileZip({
        "id": "#upload-zip", //选择器内自动生成上传文件按钮
        "label": "上传ZIP", //按钮文字
        "multiple": false, //多选，值为true表示多选，false表示单选
        "image": false, //图片选择，true代表上传图片，false代表文件
        "token": getData('token'), //验证身份
        "extra": '', //暂时不做修改，确定为空
        "passorend": 1,
        "fileDirectoryId": 50, //起文相关，除了正文之外的那些东西，也就是自己上传的附件
        success: function (param, response) {
            var fileindexid = response.data[0].fileIndex;
            console.log(response)
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPlYpApply/upLoadZip',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        ipaFormData: [{
                            files: [{
                                fileClass: '56',
                                fileIndex: fileindexid
                            }]
                        }]
                    }),
                    type: 'POST'
                }) //回显
                .turn(function (prevModelData, send, abort) {
                    console.log(prevModelData);
                    if (prevModelData.state == '200') {

                    }
                })
                .start();
        },
        error: function () {
            //集中处理过了
        }
    });

    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    new cmx.process().turn('initFiles', {
        'P0008': '01', //省文件
        'P0009': '33' //立项批复
    }).start();
    //构建表单
    CreateApplicationForm({
        "url": get56014aNoNationProjectFormData,
        "element": "#cmx-form"
    });
    $(".cmx-textarea").hide();
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "id": 999,
                    "text": "修缮计划",
                    "state": {
                        "opened": true
                    },
                    "children": [{
                        "id": 1,
                        "text": "基本信息",
                        "state": {
                            "selected": true
                        }
                    }]
                }]
            }
        }).on("loaded.jstree", function (e, datas) {
            //初始化后事件
        }).on("changed.jstree", function (e, datas) {
            if (datas.selected.length) {
                var treeId = "" + datas.instance.get_node(datas.selected[0]).id;
                if (treeId == 999) {
                    $(".baseinfo").parent().show();
                    for (var i = 1; i < 5; i++) {
                        $(".cmx-textarea-" + i).show();
                    }
                } else if (treeId == 1) {
                    showEdit();
                } else {
                    showExtra(treeId - 1);
                }
            }
        });
    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
        }
    });
    //移除
    $("#cmx-select-delect-btn").on("click", function () {
        $('#cmx-copy-tbody input[type="checkbox"]').each(function () {
            if ($(this).is(":checked")) {
                $(this).parent().parent().remove();
                for (var i = 0; i < cmx.g.unitID.length; i++) {
                    if (cmx.g.unitID[i].unitId == $(this).val()) {
                        cmx.g.unitID.splice(i, 1);
                    }
                }
            }
        });
    });
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        cmx.g.applyId = GetUrlParamString('applyId'); //alert
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchRepaApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            }) //回显
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    var resultData = prevModelData.data;
                    $('#cmx-form #cmx-i-2-1').val(resultData.fileNumFront);
                    $('#cmx-form #cmx-i-2-2').val(resultData.fileNumMidd);
                    $('#cmx-form #cmx-i-2-3').val(resultData.fileNumBack);
                    $('#cmx-form #cmx-i-3').val(resultData.proFileTitle);
                    $('#cmx-form #cmx-i-4').val(resultData.contactName);
                    $('#cmx-form #cmx-i-5').val(resultData.contactTel);
                    if (GetUrlParamString('from') == 'iframe') {
                        $('#cmx-form input').attr('disabled', true);
                        $('#cmx-form select').attr('disabled', true);
                        // $('#cmx-form .cmx-museum-choose').hide();
                        $('#cmx-select-delect-btn').hide();
                        $('#cmx-select-relic-btn').hide();
                        hideElement();
                    }
                }
                send.go();
            })
            //获取国保单位列表
            .turn('callajax', {
                url: api_ea + '/eaIchRepaApply/getUnitList',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                success: function (result) {
                    console.log(result);
                },
                type: 'POST'
            })
            //国保单位列表展示
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    var resultData = prevModelData.data;
                    for (var i = 0; i < resultData.length; i++) {
                        var tr_html = '';
                        tr_html = ['<tr>',
                            '<td>',
                            '<input type="checkbox" name="cmx-handle-relic" value="' + resultData[i].unitId + '">',
                            '</td>',
                            '<td>' + resultData[i].protectUnitName + '</td>', //国保单位名称
                            '<td>' + resultData[i].projectName + '</td>', //项目名称
                            '<td>' + resultData[i].designUnitsName + '</td>', //设计单位
                            '<td>' + resultData[i].reportUnitsName + '</td>', //报送单位
                            '<td>' + resultData[i].earlyFunds + '</td>', //前期经费
                            '<td>' + resultData[i].proFunds + '</td>', //工程经费
                            '<td><button onclick="editWenwuItem(\'' + resultData[i].unitId + '\')" class="btn btn-primary cmx-detail-btn">' + ((GetUrlParamString('from') == 'iframe') ? "查看详情" : "编辑文物详情") + '</button></td>',
                            '</tr>'
                        ].join('');
                        $("#cmx-copy-tbody").append(tr_html);
                        cmx.g.unitID.push({
                            unitId: resultData[i].unitId
                        });
                    }
                    if (GetUrlParamString('from') == 'iframe') {
                        if (GetUrlParamString('from') == 'iframe') {
                            $('#cmx-form input').attr('disabled', true);
                            $('#cmx-form select').attr('disabled', true);
                            $('#cmx-form textarea').attr('disabled', true);
                            $('#cmx-form button').hide();
                        }
                        $('#cmx-copy-table thead tr').find('th').first().hide();
                        $("#cmx-copy-tbody tr").each(function () {
                            $(this).find('td').first().hide();
                        })
                    }
                }
                send.go();
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }

    $("#cmx-button-save").on("click", function () {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }

        //特殊验证
        if (IsEmpty($('#cmx-form #cmx-i-2-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-form #cmx-i-2-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (IsEmpty(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后不能为空"
            });
            return;
        }
        if (!re.test(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后可填项只能填数字"
            });
            return;
        }
        if (fileNumBack.length > 8) {
            showAlert({
                type: "info",
                content: "省文件号后可填长度最大为8"
            });
            return;
        }

        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchRepaApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: [{
                        contactName: $("#cmx-i-4").val(), //联系人
                        contactTel: $("#cmx-i-5").val(), //联系电话
                        fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
                        fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
                        fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
                        proFileTitle: $("#cmx-i-3").val(), //省文件标题
                        projectName: "全国重点文物保护单位修缮审批", //项目名称
                        projectNum: _projectNum, //项目编号
                        projectType: "2",
                        publishType: "9",
                        unitList: cmx.g.unitID,
                        applyId: cmx.g.applyId,
                        files: getFileListForSave(cmx.g.filelinkfileclass)
                    }]
                }),
                success: function (result) {
                    if (result.state == '200') {

                        cmx.g.applyId = result.data.applyId;
                        showAlert({
                            type: "success",
                            content: "保存成功"
                        });
                    }
                },
                type: 'POST'
            })
            .start();
    });
    $("#cmx-button-send").on("click", function () {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }

        //特殊验证
        if (IsEmpty($('#cmx-form #cmx-i-2-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-form #cmx-i-2-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (IsEmpty(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后不能为空"
            });
            return;
        }
        if (!re.test(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后可填项只能填数字"
            });
            return;
        }
        if (fileNumBack.length > 8) {
            showAlert({
                type: "info",
                content: "省文件号后可填长度最大为8"
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaIchRepaApply/sendEaIchRepaApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: [{
                        contactName: $("#cmx-i-4").val(), //联系人
                        contactTel: $("#cmx-i-5").val(), //联系电话
                        fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
                        fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
                        fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
                        proFileTitle: $("#cmx-i-3").val(), //省文件标题
                        projectName: "全国重点文物保护单位修缮审批", //项目名称
                        projectNum: _projectNum, //项目编号
                        projectType: "2",
                        publishType: "9",
                        unitList: cmx.g.unitID,
                        files: getFileListForSave(cmx.g.filelinkfileclass),
                        applyId: cmx.g.applyId
                    }]
                }),
                success: function (result) {
                    if (result.state == '200') {
                        showAlert({
                            type: "success",
                            content: "发送成功"
                        });
                        setTimeout(function () {
                            window.location.href = "/app/f-gover-approval/province/province-needToDo.html";
                        }, 2000);
                    }
                },
                type: 'POST'
            })
            .start();
    });
    //下载
    $('#cmx-download-btn').on('click', function () {
        window.open(api_ea + '/eaIchRepaApply/exportExcel?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
    });
    //选择国保单位
    $("#cmx-select-relic-btn").on('click', function () {
        if (IsEmpty(cmx.g.applyId)) {
            showAlert({
                type: 'error',
                content: '请先保存申请信息'
            });
            return;
        }
        new cmx.process()
            .turn('buildSelectRelicsProtection', {
                callback: function (param) {
                    console.log(param)
                    $("#cmx-relicList").modal('hide');
                    $("#cmx-editrelic-modal").html('');
                    $("#cmx-editrelic-modal").load(get56014aEditRelicModal, function () {
                        $("#cmx-edit-relic").off('show.bs.modal');
                        $("#cmx-edit-relic").on('show.bs.modal', function () {
                            /* 文物古籍数据展开查询条件 */
                            $("#cmx-form-modal").html('');
                            //构建表单
                            CreateApplicationForm({
                                "url": get56014aEditRelicData,
                                "element": "#cmx-form-modal"
                            });
                            $("#cmx-form-modal #cmx-i-2").val(param.instName);
                            $("#cmx-form-modal #cmx-i-2").attr('disabled', true);
                            saveAndAddRecilData();
                        });
                        $("#cmx-edit-relic").modal('show');
                        $("#cmx-form-modal .cmx-unitList-choose").on("click", function () {
                            // $("#cmx-edit-relic").modal('hide');
                            new cmx.process()
                                .turn('buildSelectUnitList', {
                                    busiType: 'CRP',
                                    goto: function (type) {
                                        $("#cmx-form-modal #cmx-i-6").val(cmx.g.unitName);
                                        // $("#cmx-form-modal #cmx-i-6").attr('readonly', 'readonly');
                                        // $("#cmx-form-modal #cmx-i-6").attr('disabled', 'disabled');
                                        $("#cmx-unitList-modal").modal('hide');
                                        // window.location.href = "no-nation-protect.html";
                                    }
                                })
                                .ccatch(function (msg) {})
                                .cfinally(function () {}).start();
                        });
                    });
                },
                goto: function (type) {
                    if (type == 'select') {
                        $("#cmx-i-7").val(cmx.g.danweimingcheng);
                        $("#cmx-i-7").attr('readonly', 'readonly');
                        $("#cmx-i-7").attr('disabled', 'disabled');
                    } else {
                        $("#cmx-i-7").val('');
                        $("#cmx-i-7").removeAttr('readonly');
                        $("#cmx-i-7").removeAttr('disabled');
                    }
                    $("#cmx-relicList").modal('hide');
                }
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () {}).start();
    });
});
//隐藏多行文本，显示基本信息
function showEdit() {
    $(".baseinfo").parent().show();
    for (var i = 1; i < 4; i++) {
        $(".cmx-textarea-" + i).hide();
    }
}
//隐藏基本信息，显示多行文本
function showExtra(num) {
    $(".baseinfo").parent().hide();
    for (var i = 1; i < 4; i++) {
        $(".cmx-textarea-" + i).hide();
    }
    $(".cmx-textarea-" + num).show();
}

function cmx_special_2(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-noNationProject-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_4(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-unitList-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_5(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-xs-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-xs-3"><button class="cmx-unitList-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function editWenwuItem(unitId) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaIchRepaApply/getUnitdetail',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                unitId: unitId
            }),
            success: function (result) {
                console.log(result);
            },
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (prevModelData.state == '200') {
                var data = prevModelData.data;
                $("#cmx-editrelic-modal").load(get56014aEditRelicModal, function () {
                    $("#cmx-edit-relic").off('shown.bs.modal');
                    $("#cmx-edit-relic").on('shown.bs.modal', function () {
                        /* 文物古籍数据展开查询条件 */
                        $('#cmx-form-modal').html('');
                        //构建表单
                        CreateApplicationForm({
                            "url": get56014aEditRelicData,
                            "element": "#cmx-form-modal"
                        });
                        $("#cmx-form-modal #cmx-i-2").val(data.protectUnitName);
                        $("#cmx-form-modal #cmx-i-2").attr('disabled', true);
                        saveAndAddRecilData(data);
                    });
                    $("#cmx-edit-relic").modal('show');
                    $("#cmx-form-modal .cmx-unitList-choose").on("click", function () {
                        // $("#cmx-edit-relic").modal('hide');
                        new cmx.process()
                            .turn('buildSelectUnitList', {
                                busiType: 'CRP',
                                goto: function (type) {
                                    $("#cmx-form-modal #cmx-i-6").val(cmx.g.unitName);
                                    //$("#cmx-form-modal #cmx-i-6").attr('readonly', 'readonly');
                                    //$("#cmx-form-modal #cmx-i-6").attr('disabled', 'disabled');
                                    $("#cmx-unitList-modal").modal('hide');
                                    // window.location.href = "no-nation-protect.html";
                                }
                            })
                            .ccatch(function (msg) {})
                            .cfinally(function () {}).start();
                    });
                });
            }
        })
        .start();
}
//编辑新增文物
function saveAndAddRecilData(param) {
    var data = param;
    // alert(data.isProPlan)
    if (typeof (data) != 'undefined') {
        $("#cmx-form-modal #cmx-i-2").val(data.protectUnitName);
        $("#cmx-form-modal #cmx-i-3").val(data.projectName);
        $("#cmx-form-modal #cmx-i-4").val(data.reportUnitsName);
        $("#cmx-form-modal").find("input[name='cmx-i-5'][value='" + data.isProPlan + "']").attr('checked', true); //是否列入保护规划
        $("#cmx-form-modal #cmx-i-6").val(data.designUnitsName); //设计单位
        $("#cmx-form-modal #cmx-i-7").val(data.content); //内容
        $("#cmx-form-modal #cmx-i-8").val(data.scale); //规模
        $("#cmx-form-modal #cmx-i-9").val(data.acreage); //面积
        $("#cmx-form-modal #cmx-i-11").val(data.implNecessity); //项目实施的必要性
        $("#cmx-form-modal #cmx-i-12").val(data.implUrgent); //项目实施的紧迫性说明
        $("#cmx-form-modal #cmx-i-13").val(data.implFeasible); //项目实施的可行性
        $("#cmx-form-modal #cmx-i-14").val(data.manageSit); //管理情况
        $("#cmx-form-modal #cmx-i-15").val(data.workEviro); //相关的政策人员资金和现场工作条件
        $("#cmx-form-modal #cmx-i-16").val(data.implPlan); //项目实施计划
        $("#cmx-form-modal #cmx-i-18").val(data.implNecessityb); //实施的必要性
        $("#cmx-form-modal #cmx-i-19").val(data.implUrgentb); //紧迫性说明
        $("#cmx-form-modal #cmx-i-21").val(data.baseWork); //基础工作
        $("#cmx-form-modal #cmx-i-22").val(data.manageSitb); //管理情况
        $("#cmx-form-modal #cmx-i-23").val(data.relevantSit); //相关情况
        $("#cmx-form-modal #cmx-i-24").val(data.earlyFunds); //前期经费
        $("#cmx-form-modal #cmx-i-26").val(data.earlyArrange); //前期工作安排
        $("#cmx-form-modal #cmx-i-27").val(data.desArrange); //设计工作安排
        $("#cmx-form-modal #cmx-i-28").val(data.implWorkTime); //实施工期
        $("#cmx-form-modal #cmx-i-30").val(data.fundType); //经费类型
        $("#cmx-form-modal #cmx-i-31").val(data.itemProject); //分项工程
        $("#cmx-form-modal #cmx-i-32").val(data.workContent); //工作内容
        $("#cmx-form-modal #cmx-i-33").val(data.workload); //工作量
        $("#cmx-form-modal #cmx-i-34").val(data.proFunds); //工程经费
        $("#cmx-form-modal #cmx-i-35").val(data.sumFunds); //经费合计
    }
    if (GetUrlParamString('from') == 'iframe') {
        $("#cmx-detail-form textarea").attr('readonly', 'readonly');
        $("#cmx-detail-form input").attr('readonly', 'readonly');
        $('.form-file').hide();
        $('#cmx-relic-detail-save').hide();
    }

    //编辑文物保存
    if (GetUrlParamString('from') != 'iframe') {
        $('#cmx-editrelic-save').on('click', function () {
            var temp_flag2 = checkFormLength('#cmx-form-modal');
            if (!temp_flag2) {
                return;
            }
            if (!IsEmpty($("#cmx-form-modal #cmx-i-6").val())) {
                if ($("#cmx-form-modal #cmx-i-6").val().length > 200) {
                    showAlert({
                        type: "info",
                        content: "设计人(单位)可填最大长度为200"
                    });
                    return;
                }
            }

            if (!IsEmpty($("#cmx-form-modal #cmx-i-24").val())) {
                var num = $("#cmx-form-modal #cmx-i-24").val();
                num = num.replace('.', '');
                if (num.length > 16) {
                    showAlert({
                        type: "info",
                        content: "前期经费可填最大长度为16(保留两位小数)"
                    });
                    return;
                }
            }
            if (!IsEmpty($("#cmx-form-modal #cmx-i-34").val())) {
                var num = $("#cmx-form-modal #cmx-i-34").val();
                num = num.replace('.', '');
                if (num.length > 16) {
                    showAlert({
                        type: "info",
                        content: "工程经费可填最大长度为16(保留两位小数)"
                    });
                    return;
                }
            }
            if (!IsEmpty($("#cmx-form-modal #cmx-i-35").val())) {
                var num = $("#cmx-form-modal #cmx-i-35").val();
                num = num.replace('.', '');
                if (num.length > 16) {
                    showAlert({
                        type: "info",
                        content: "经费合计可填最大长度为16(保留两位小数)"
                    });
                    return;
                }
            }
            var repaFormData = [{
                // unitId:param.instId,
                unitId: (typeof (data) == 'undefined') ? '' : data.unitId,
                applyId: cmx.g.applyId,
                projectNum: _projectNum,
                protectUnitName: $("#cmx-form-modal #cmx-i-2").val(),
                projectName: $("#cmx-form-modal #cmx-i-3").val(), //项目名称
                reportUnitsName: $("#cmx-form-modal #cmx-i-4").val(), //报送单位
                isProPlan: $("#cmx-form-modal #cmx-i-5").find("input[name='cmx-i-5']:checked").val(), //是否列入保护规划
                designUnitsName: $("#cmx-form-modal #cmx-i-6").val(), //设计单位
                content: $("#cmx-form-modal #cmx-i-7").val(), //内容
                scale: $("#cmx-form-modal #cmx-i-8").val(), //规模
                acreage: $("#cmx-form-modal #cmx-i-9").val(), //面积
                implNecessity: $("#cmx-form-modal #cmx-i-11").val(), //项目实施的必要性
                implUrgent: $("#cmx-form-modal #cmx-i-12").val(), //项目实施的紧迫性说明
                implFeasible: $("#cmx-form-modal #cmx-i-13").val(), //项目实施的可行性
                manageSit: $("#cmx-form-modal #cmx-i-14").val(), //管理情况
                workEviro: $("#cmx-form-modal #cmx-i-15").val(), //相关的政策人员资金和现场工作条件
                implPlan: $("#cmx-form-modal #cmx-i-16").val(), //项目实施计划
                implNecessityb: $("#cmx-form-modal #cmx-i-18").val(), //实施的必要性
                implUrgentb: $("#cmx-form-modal #cmx-i-19").val(), //紧迫性说明
                baseWork: $("#cmx-form-modal #cmx-i-21").val(), //基础工作
                manageSitb: $("#cmx-form-modal #cmx-i-22").val(), //管理情况
                relevantSit: $("#cmx-form-modal #cmx-i-23").val(), //相关情况
                earlyFunds: $("#cmx-form-modal #cmx-i-24").val(), //前期经费
                earlyArrange: $("#cmx-form-modal #cmx-i-26").val(), //前期工作安排
                desArrange: $("#cmx-form-modal #cmx-i-27").val(), //设计工作安排
                implWorkTime: $("#cmx-form-modal #cmx-i-28").val(), //实施工期
                fundType: $("#cmx-form-modal #cmx-i-30").val(), //经费类型
                itemProject: $("#cmx-form-modal #cmx-i-31").val(), //分项工程
                workContent: $("#cmx-form-modal #cmx-i-32").val(), //工作内容
                workload: $("#cmx-form-modal #cmx-i-33").val(), //工作量
                proFunds: $("#cmx-form-modal #cmx-i-34").val(), //工程经费
                sumFunds: $("#cmx-form-modal #cmx-i-35").val(), //经费合计
            }];
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaIchRepaApply/saveUnitdetail',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        repaFormData: repaFormData
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    console.log(prevModelData);
                    if (prevModelData.state == '200') {
                        showAlert({
                            type: "success",
                            content: "保存成功"
                        });
                        var flag = true;
                        for (var i = 0; i < cmx.g.unitID.length; i++) {
                            if (cmx.g.unitID[i].unitId == prevModelData.data.unitId) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            cmx.g.unitID.push({
                                unitId: prevModelData.data.unitId,
                            });
                        }
                        console.log(cmx.g.unitID)
                        $('#cmx-copy-tbody input[type="checkbox"]').each(function () {
                            if ($(this).val() == prevModelData.data.unitId) {
                                $(this).parent().parent().remove();
                            }
                        })
                        var tr_html = '';
                        tr_html = ['<tr>',
                            '<td>',
                            '<input type="checkbox" name="cmx-handle-relic" value="' + prevModelData.data.unitId + '">',
                            '</td>',
                            '<td>' + prevModelData.data.protectUnitName + '</td>',
                            '<td>' + prevModelData.data.projectName + '</td>',
                            '<td>' + prevModelData.data.designUnitsName + '</td>',
                            '<td>' + prevModelData.data.reportUnitsName + '</td>',
                            '<td>' + prevModelData.data.earlyFunds + '</td>',
                            '<td>' + prevModelData.data.proFunds + '</td>',
                            '<td><button onclick="editWenwuItem(\'' + prevModelData.data.unitId + '\')" class="btn btn-primary cmx-detail-btn">编辑文物详情</button></td>',
                            '</tr>'
                        ].join('');
                        $("#cmx-copy-tbody").append(tr_html);
                        //绑定编辑文物按钮
                        $('#cmx-edit-relic').modal("hide");
                        // $("#cmx-editrelic-modal").html('');
                    }
                })
                .start();
        })
    }
}

function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}