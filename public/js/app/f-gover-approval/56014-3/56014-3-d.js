if (getData('role') == 'guobaodanwei') {
    var get560143dNoNationProjectData = public_url + 'data/app/f-gover-approval/56014-3/56014-3-d-x.json';
} else {
    var get560143dNoNationProjectData = public_url + 'data/app/f-gover-approval/56014-3/56014-3-d-s.json';
}
var _projectNum = '56014-3_d';
var _projectType = '3';
//$('#cmx-i-93-301').iCheck('check')
cmx.g.regist('processInstanceId', '');
new cmx.process().
    turn('initFiles', {
        'P0016': '14', //设计委托书
        'P0017': '15', //设计任务书
        'P0018': '16', //现场勘察报告和现状照片
        'P0019': '17', //风险评估报告
        'P0020': '18', //设计说明
        'P0021': '19', //设计图纸
        'P0022': '20', //主要设备材料清单
        'P0023': '21', //主要设备材料的检验报告或者认证证书
        'P0024': '22', //工程概算书
        'P0025': '23', //人员培训细则、售后服务承诺和工程验收细则
        'P0026': '24', //设计单位的资质证明文件
        'P0027': '25', //其他需要说明的有关材料（修改说明）
        'P0028': '26' //评审文件（复审方案上传此文件）
    }).start();

$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click', function () {
        history.go(-1);
    });
    cmx.g.applyId = GetUrlParamString('applyId');
    //根据申请人类型判断加载不同的申请表单
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/business/getApplicantAccClass',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                })
            })
            .turn(function (prevModelData, send, abort) {
                if (prevModelData.state == '200') {
                    if (prevModelData.data.accClass == '15') {
                        get560143dNoNationProjectData = public_url + 'data/app/f-gover-approval/56014-3/56014-3-d-x.json';
                    }
                    else {
                        get560143dNoNationProjectData = public_url + 'data/app/f-gover-approval/56014-3/56014-3-d-s.json';
                    }
                } else {
                    showAlert({
                        type: 'error',
                        content: '申请人信息获取失败'
                    });
                }
            })
            .start();
    }
    cmx.g.danweipublishType = getData('cmx.g.danweipublishType');
    cmx.g.danweiinstId = getData('cmx.g.danweiinstId');
    cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    $.ajax({
        url: get560143dNoNationProjectData,
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
                        "element": "#cmx-form",
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
                        } catch (exception) { }


                    }).start();
            }
            var changeSelect = function (param) {
                switch (param) {
                    case '1':
                        $('#cmx-i-91').parent().parent().show();
                        $('#cmx-i-92').parent().parent().hide();
                        $('#cmx-i-93').parent().parent().hide();
                        $('[for="cmx-i-23"]').html('<span class="cmx-build-form-notnull">*</span>8&nbsp;&nbsp;&nbsp;主要设备材料的检验报告或者认证证书');
                        break;
                    case '2':
                        $('#cmx-i-92').parent().parent().show();
                        $('#cmx-i-91').parent().parent().hide();
                        $('#cmx-i-93').parent().parent().hide();
                        $('[for="cmx-i-23"]').html('8&nbsp;&nbsp;&nbsp;主要设备材料的检验报告或者认证证书');
                        break;
                    case '3':
                        $('#cmx-i-93').parent().parent().show();
                        $('#cmx-i-91').parent().parent().hide();
                        $('#cmx-i-92').parent().parent().hide();
                        $('[for="cmx-i-23"]').html('8&nbsp;&nbsp;&nbsp;主要设备材料的检验报告或者认证证书');
                        break;
                    default:
                        break;
                }
            }
            $('.hidden-div').parent().hide();
            $('#cmx-i-01').change(function () {
                //
                changeSelect($(this).val());
            });
            changeSelect($('#cmx-i-01').val());


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
    // cmx.g.danweimingcheng = getData('cmx.g.danweimingcheng');
    // if (!IsEmpty(cmx.g.danweimingcheng)) {
    //     $("#cmx-i-8").val(cmx.g.danweimingcheng);
    //     $("#cmx-i-8").attr('readonly', 'readonly');
    //     $("#cmx-i-8").attr('disabled', 'disabled');
    // }

    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
        }
    });

    $(".cmx-noNationProject-choose").on("click", function () {
        new cmx.process()
            .turn('buildSelectRelicsProtection', {
                id: '56014-3',
                goto: function (type) {
                    putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
                    if (type == 'select') {
                        $("#cmx-i-8").val(cmx.g.danweimingcheng);
                        $("#cmx-i-8").attr('readonly', 'readonly');
                        $("#cmx-i-8").attr('disabled', 'disabled');
                    } else {
                        $("#cmx-i-8").val('');
                        $("#cmx-i-8").removeAttr('readonly');
                        $("#cmx-i-8").removeAttr('disabled');
                    }

                    $("#cmx-relicList").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () { }).start();
    });

    $(".cmx-projectName-choose").on("click", function () {
        // alert(projectType)
        new cmx.process()
            .turn('buildSelectProjectName', {
                goto: function (type) {
                    $("#cmx-i-7").val(cmx.g.planName);
                    $("#cmx-i-7").attr('readonly', 'readonly');
                    $("#cmx-i-7").attr('disabled', 'disabled');
                    $("#cmx-approvedPlan").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function (msg) { })
            .cfinally(function () { }).start();
    });
    $(".cmx-unitList-choose").on("click", function () {
        new cmx.process()
            .turn('buildSelectUnitList', {
                busiType: 'SP',
                goto: function (type) {
                    $("#cmx-i-14").val(cmx.g.unitName);
                    //$("#cmx-i-14").attr('readonly', 'readonly');
                    //$("#cmx-i-14").attr('disabled', 'disabled');
                    $("#cmx-unitList-modal").modal('hide');
                    // window.location.href = "no-nation-protect.html";
                }
            })
            .ccatch(function (msg) { })
            .cfinally(function () { }).start();
    });

    $("#cmx-noNationProject-save").on("click", function () {

        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //特殊验证
        if (!IsEmpty($('#cmx-i-2-1').val())) {
            if ($('#cmx-i-2-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号前可填长度最大为20"
                });
                return;
            }
        }

        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号后可填长度最大为8"
                });
                return;
            }
        }

        if (IsEmpty($("#cmx-i-7").val())) {
            showAlert({
                type: "info",
                content: "项目名称不能为空"
            });
            return;
        }
        if ($("#cmx-i-7").val().length > 100) {
            showAlert({
                type: "info",
                content: "项目名称可填最大长度为100"
            });
            return;
        }
        if (IsEmpty($("#cmx-i-8").val())) {
            showAlert({
                type: "info",
                content: "文博单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-8").val().length > 200) {
            showAlert({
                type: "info",
                content: "文博单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-11").val())) {
            var num = $(" #cmx-i-11").val();
            num = num.replace('.', '');
            if (num.length > 16) {
                showAlert({
                    type: "info",
                    content: "工程总概算可填最大长度为16(保留两位小数)"
                });
                return;
            }
        }
        if (!IsEmpty($("#cmx-i-14").val())) {
            if ($("#cmx-i-14").val().length > 200) {
                showAlert({
                    type: "info",
                    content: "设计人(单位)可填最大长度为200"
                });
                return;
            }
        }

        var num1 = $("#cmx-i-01 option:selected").val();
        console.log(num1);
        var composit = '';
        switch (num1) {
            case ('1'):
                $('#cmx-i-91 input[name=cmx-i-91]:checked').each(function () {
                    composit += $(this).val() + ',';
                });

                var _fileIndex = "";
                var lib = 'P0023';
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
                        content: '请上传' + "8 主要设备材料的检验报告或者认证证书"
                    });
                    flag = false;
                    return false;
                }

                break;
            case ('2'):
                $('#cmx-i-92 input[name=cmx-i-92]:checked').each(function () {
                    composit += $(this).val() + ',';
                });
                break;
            case ('3'):
                $('#cmx-i-93 input[name=cmx-i-93]:checked').each(function () {
                    composit += $(this).val() + ',';
                });
                break;
            default:
                break;
        }
        console.log(composit);
        //日期格式转换
        var time = $("#cmx-i-12").val();
        // console.log(time);
        if (!IsEmpty(time)) {
            time = time.match(/\d{4}.\d{1,2}.\d{1,2}/mg).toString();
            time = time.replace(/[^0-9]/mg, '-');
        }
        console.log(time);
        //保存
        var buildFormData = [{
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            declareType: $("#cmx-i-01 option:selected").val(),
            planId: cmx.g.planId,
            projectType: _projectType,
            fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
            fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
            fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
            proFileTitle: $("#cmx-i-3").val(), //省文件标题
            contactName: $("#cmx-i-4").val(), //联系人
            contactTel: $("#cmx-i-5").val(), //联系电话
            projectName: $("#cmx-i-7").val(), //项目名称
            ramUnitName: $("#cmx-i-8").val(), //文博单位
            ramUnit: cmx.g.danweiinstId, //文博单位--隐藏字段
            projectComposit: composit, //工程主要构成
            projectPro: $("#cmx-i-10").val(), //工程保护对象及范围
            projectEstimate: $("#cmx-i-11").val(), //工程总概算
            compileTime: time, //编制时间
            declareUnitName: $("#cmx-i-13").val(), //申报单位
            designUnit: cmx.g.unitId, //设计单位
            designUnitName: $("#cmx-i-14").val(), //设计单位名称
            files: getFileListForSave(cmx.g.filelinkfileclass),
            applyId: cmx.g.applyId
        }];
        console.log(buildFormData);

        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAecrApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: buildFormData
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '保存成功'
                        });
                        cmx.g.applyId = result.data.applyId;
                        cmx.g.processInstanceId = result.data.processInstanceId;
                        console.log(result);
                        console.log(cmx.g.applyId);
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '保存失败'
                    });
                },
                complete: function () { }
            })
            .start();
    });
    $("#cmx-noNationProject-send").on("click", function () {
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //特殊验证
        if (!IsEmpty($('#cmx-i-2-1').val())) {
            if ($('#cmx-i-2-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号前可填长度最大为20"
                });
                return;
            }
        }

        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'guobaodanwei') ? "" : "省") + "文件号后可填长度最大为8"
                });
                return;
            }
        }

        if (IsEmpty($("#cmx-i-7").val())) {
            showAlert({
                type: "info",
                content: "项目名称不能为空"
            });
            return;
        }
        if ($("#cmx-i-7").val().length > 100) {
            showAlert({
                type: "info",
                content: "项目名称可填最大长度为100"
            });
            return;
        }
        if (IsEmpty($("#cmx-i-8").val())) {
            showAlert({
                type: "info",
                content: "文博单位不能为空"
            });
            return;
        }
        if ($("#cmx-i-8").val().length > 200) {
            showAlert({
                type: "info",
                content: "文博单位可填最大长度为200"
            });
            return;
        }
        if (!IsEmpty($("#cmx-i-11").val())) {
            var num = $(" #cmx-i-11").val();
            num = num.replace('.', '');
            if (num.length > 16) {
                showAlert({
                    type: "info",
                    content: "工程总概算可填最大长度为16(保留两位小数)"
                });
                return;
            }
        }
        if (!IsEmpty($("#cmx-i-14").val())) {
            if ($("#cmx-i-14").val().length > 200) {
                showAlert({
                    type: "info",
                    content: "设计人(单位)可填最大长度为200"
                });
                return;
            }
        }

        var num1 = $("#cmx-i-01 option:selected").val();
        console.log(num1);
        var composit = '';
        switch (num1) {
            case ('1'):
                $('#cmx-i-91 input[name=cmx-i-91]:checked').each(function () {
                    composit += $(this).val() + ',';
                });
                //验证附件8必填项
                var _fileIndex = "";
                var lib = 'P0023';
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
                        content: '请上传' + "8 主要设备材料的检验报告或者认证证书"
                    });
                    flag = false;
                    return false;
                }

                break;
            case ('2'):
                $('#cmx-i-92 input[name=cmx-i-92]:checked').each(function () {
                    composit += $(this).val() + ',';
                });
                break;
            case ('3'):
                $('#cmx-i-93 input[name=cmx-i-93]:checked').each(function () {
                    composit += $(this).val() + ',';
                });
                break;
            default:
                break;
        }
        console.log(composit);
        //日期格式转换
        var time = $("#cmx-i-12").val();
        // console.log(time)
        time = time.match(/\d{4}.\d{1,2}.\d{1,2}/mg).toString();
        time = time.replace(/[^0-9]/mg, '-');
        console.log(time);

        var buildFormData = [{
            projectNum: _projectNum, //审批事项 类型：String  必有字段  备注：无 
            declareType: $("#cmx-i-01 option:selected").val(),
            planId: cmx.g.planId,
            projectType: _projectType,
            fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
            fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
            fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
            proFileTitle: $("#cmx-i-3").val(), //省文件标题
            contactName: $("#cmx-i-4").val(), //联系人
            contactTel: $("#cmx-i-5").val(), //联系电话
            projectName: $("#cmx-i-7").val(), //项目名称
            ramUnitName: $("#cmx-i-8").val(), //文博单位
            ramUnit: cmx.g.danweiinstId, //文博单位--隐藏字段
            projectComposit: composit, //工程主要构成
            projectPro: $("#cmx-i-10").val(), //工程保护对象及范围
            projectEstimate: $("#cmx-i-11").val(), //工程总概算
            compileTime: time, //编制时间
            declareUnitName: $("#cmx-i-13").val(), //申报单位
            designUnit: cmx.g.unitId, //设计单位
            designUnitName: $("#cmx-i-14").val(), //设计单位名称
            applyId: cmx.g.applyId,
            //processInstanceId: cmx.g.processInstanceId,
            files: getFileListForSave(cmx.g.filelinkfileclass)
        }];
        console.log(buildFormData);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAecrApply/sendEaAecrApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    // relicId:
                    ipaFormData: buildFormData
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        showAlert({
                            type: 'success',
                            content: '发送成功'
                        });
                        if (getData('role') == 'guobaodanwei') {
                            setTimeout(function () {
                                window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid=" + GetUrlParamString('nowid');
                            }, 1000);
                        } else {
                            setTimeout(function () {
                                window.location.href = "/app/f-gover-approval/province/province-needToDo.html?nowid=" + GetUrlParamString('nowid');
                            }, 1000);
                        }
                    }
                    console.log(result)
                },
            })
            .turn('callajax', {
                url: api_ea + '/eaPubTransactionrecord/disposeRecord',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    trsFlag: "1",
                    trsFormData: [{
                        applyId: cmx.g.applyId,
                        projectNum: _projectNum,
                        receiverId: "RGJ0101002", //文书室ID
                        note: ""
                    }]
                }),
                type: 'POST',
                success: function (result) {
                    console.log(result);
                }
            })
            .start();
    });
    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaAecrApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn('build560143dInput', {
                isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    }
});

function showEdit() {
    $("#cmx-edit").show();
}

function cmx_special_5(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-projectName-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
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

function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}

cmx.route.model({
    index: 'build560143dInput',
    handle: function (parameter, prevModelData, send, abort) {
        // putData("modalId", parameter.id);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            //处理时间
            var data = prevModelData.data;
            var time = data.compileTime;
            time = time.substring(0, 10);
            // time = time.replace(/-/, "月");
            // time = time + '日';
            // console.log(time);
            switch (data.declareType) {
                case '1':
                    $('#cmx-i-91').parent().parent().show();
                    $('#cmx-i-92').parent().parent().hide();
                    $('#cmx-i-93').parent().parent().hide();
                    break;
                case '2':
                    $('#cmx-i-92').parent().parent().show();
                    $('#cmx-i-91').parent().parent().hide();
                    $('#cmx-i-93').parent().parent().hide();
                    break;
                case '3':
                    $('#cmx-i-93').parent().parent().show();
                    $('#cmx-i-91').parent().parent().hide();
                    $('#cmx-i-92').parent().parent().hide();
                    break;
                default:
                    break;
            }
            var compositArray = data.projectComposit.split(",");
            console.log(compositArray);
            for (var i = 0; i < compositArray.length - 1; i++) {
                $('#cmx-i-9' + data.declareType + ' input[value="' + compositArray[i] + '"]').click();

            }

            $("#cmx-i-01").val(data.declareType); //工程类型
            //处理工程主要构成

            $("#cmx-i-2-1").val(data.fileNumFront); //省文件号前 
            // $("#cmx-i-2-2 option[value='" + data.fileNumMidd + "']").attr("selected", "selected"); //省文件号第二个 
            $("#cmx-i-2-2").val(data.fileNumMidd);
            $("#cmx-i-2-3").val(data.fileNumBack); //省文件后
            $("#cmx-i-3").val(data.proFileTitle); //省文件标题 
            $("#cmx-i-4").val(data.contactName); //联系人 
            $("#cmx-i-5").val(data.contactTel); //联系电话
            $("#cmx-i-7").val(data.projectName); //文物保护单位
            $("#cmx-i-8").val(data.ramUnitName); //文博单位
            $("#cmx-i-9").val(data.projectComposit); //工程主要构成
            $("#cmx-i-10").val(data.projectPro); //工程保护对象及范围
            $("#cmx-i-11").val(data.projectEstimate); //工程总概算

            $("#cmx-i-12").val(time); //编制时间
            $("#cmx-i-13").val(data.declareUnitName); //申报单位
            $("#cmx-i-14").val(data.designUnitName); //设计单位
            cmx.g.danweipublishType = data.publishType;
            cmx.g.danweimingcheng = data.ProtectUnitName;
            cmx.g.unitId = data.designUnit;
            cmx.g.danweiinstId = data.ramUnit;
            cmx.g.planId = data.planId;
            var isEdit = parameter.isEdit;
            if (isEdit) {
                hideElement();
                // $('head').append('<style>.webuploader-container{display:none !important;} .remove-btn{display:none !important;}</style>');
            }
        }
        send.go();
    }
});