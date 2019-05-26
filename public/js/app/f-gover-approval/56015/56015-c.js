/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-11 16:18:52 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-05-21 16:57:37
 */

var get56015cProjectData = public_url + 'data/app/f-gover-approval/56015/56015-c.json';
//文物修复计划项目列表
var get56015DetailModal = public_url + 'app/f-gover-approval/56015/include/56015-relic-detail-modal.html';
var get56015cDetailFormData = public_url + 'data/app/f-gover-approval/56015/relic-detail-c.json';
cmx.g.regist('proId', []);

$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click',function(){
        history.go(-1);
    });
    //加载表单
    new cmx.process().
    turn('initFiles', {
        'P00030': '99'
    }).start();
    cmx.g.applyId = "";
    //构建表单
    CreateApplicationForm({
        "url": get56015cProjectData,
        "element": "#cmx-form"
    });

    $("#cmx-form #cmx-i-7").attr('readonly', 'readonly');

    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        cmx.g.applyId = GetUrlParamString('applyId'); //alert
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohCopApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: "56015_c" //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
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
                    $('#cmx-form #cmx-i-7').val(resultData.collectUnitName);
                    $('#cmx-form #cmx-i-8').val(resultData.apprContactName);
                    $('#cmx-form #cmx-i-9').val(resultData.apprContactTel);
                    cmx.g.museumId = resultData.collectUnit;
                    cmx.g.museumName = resultData.collectUnitName;
                    if (GetUrlParamString('from') == 'iframe') {
                        $('#cmx-form input').attr('disabled', true);
                        $('#cmx-form select').attr('disabled', true);
                        $('#cmx-form .cmx-museum-choose').hide();
                        $('#cmx-select-delect-btn').hide();
                        $('#cmx-select-relic-btn').hide();
                    }
                }
                send.go();
            })
            .turn('callajax', {
                url: api_ea + '/eaMohCopApply/getRelicList',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: "56015_c" //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    var resultData = prevModelData.data;
                    for (var i = 0; i < resultData.length; i++) {
                        var tr_html = '';
                        tr_html = ['<tr>',
                            '<td>',
                            '<input type="checkbox" name="cmx-handle-relic" value="' + resultData[i].proId + '">',
                            '</td>',
                            '<td>' + resultData[i].sumMark + '</td>',
                            '<td>' + resultData[i].relicName + '</td>',
                            '<td>' + resultData[i].relicGrain + '</td>',
                            '<td>' + resultData[i].collectUnit + '</td>',
                            '<td>' + resultData[i].saveType + '</td>',
                            '<td><button onclick="editWenwuItem(\'' + resultData[i].proId + '\')" class="btn btn-primary cmx-detail-btn">' + ((GetUrlParamString('from') == 'iframe') ? "查看详情" : "编辑文物详情") + '</button></td>',
                            '</tr>'
                        ].join('');
                        $("#cmx-copy-tbody").append(tr_html);
                        cmx.g.proId.push({
                            proId: resultData[i].proId
                        });
                    }
                    if (GetUrlParamString('from') == 'iframe') {
                        $('#cmx-copy-table thead tr').find('th').first().hide();
                        $("#cmx-copy-tbody tr").each(function () {
                            $(this).find('td').first().hide();
                        })
                    }
                }
            })
            .start();
    }
    //下载
    $('#cmx-download-btn').on('click', function () {
        if (IsEmpty(cmx.g.applyId)) {
            return;
        } else {
            window.open(api_ea + '/eaMohCopApply/exportExcel?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=56015_c');
        }
    })
    //选择博物馆
    $(".cmx-museum-choose").on("click", function () {
        new cmx.process()
            .turn('buildMuseumInfoModal', {
                goto: function (type) {
                    $("#cmx-form #cmx-i-7").val(cmx.g.museumName);
                    $("#cmx-museum-modal").modal('hide');
                }
            })
            .ccatch(function (msg) {})
            .cfinally(function () {}).start();
    });
    //选择文物模态框
    $("#cmx-select-relic-btn").on("click", function () {
        if (IsEmpty(cmx.g.applyId)) {
            showAlert({
                type: 'error',
                content: '请先保存申请信息'
            });
            return;
        }
        new cmx.process()
            .turn('buildRelicInfoModal', {
                callback: function (param) {
                    $("#cmx-detail-modal-div").load(get56015DetailModal, function () {
                        $("#cmx-relic-detail-modal").off('shown.bs.modal');
                        $("#cmx-relic-detail-modal").on('shown.bs.modal', function () {
                            /* 文物古籍数据展开查询条件 */
                            $('#cmx-detail-form').html('');
                            //构建表单
                            CreateApplicationForm({
                                "url": get56015cDetailFormData,
                                "element": "#cmx-detail-form"
                            });
                            var data = {
                                "projectNum": "56015_c",
                                "projectTypeB": "1",
                                "relicName": param.antiqueName,
                                "sumMark": param.relicCode,
                                "specificYear": param.exactAge,
                                "relicLevel": param.relicLevelName,
                                "relicClass": param.culturalClassName,
                                "relicGrain": param.relicQualityName,
                                "relicSize": param.realSize,
                                "relicNum": param.num,
                                "collectUnit": param.museumId,
                                "collectTime": param.saveYear,
                                "relicSource": param.relicOriginWayName,
                                "saveType": param.saveStateName,
                                "fullState": param.intactStatusName,
                                "valueAssess": "",
                                "copyReson": "",
                                "copyStep": "",
                                "riskAssess": "",
                                "remark": "",
                                "proId": "",
                                "picList": []
                            }
                            saveAndAddRecilData(data);
                        });
                        $("#cmx-relic-detail-modal").modal('show');
                    });
                }
            })
            .ccatch(function (msg) {}).cfinally(function () {}).start();
    });
    //移除
    $("#cmx-select-delect-btn").on("click", function () {
        $('#cmx-copy-tbody input[type="checkbox"]').each(function () {
            if ($(this).is(":checked")) {
                $(this).parent().parent().remove();
                for (var i = 0; i < cmx.g.proId.length; i++) {
                    if (cmx.g.proId[i].proId == $(this).val()) {
                        cmx.g.proId.splice(i, 1);
                    }
                }
            }
        });
    });
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "可移动文物修复项目计划",
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

        });
    //保存
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
                    content: "省文件号前可填长度最大为20"
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
        }
        if (IsEmpty(cmx.g.museumName)) {
            showAlert({
                type: "info",
                content: "请选择博物馆名称"
            });
            return;
        }
        var formate = [{
            "projectNum": "56015_c",
            "applyId": cmx.g.applyId,
            "approvalMatt": "",
            "projectType": 4,
            "contactName": $('#cmx-form #cmx-i-4').val(),
            "contactTel": $('#cmx-form #cmx-i-5').val(),
            "projectTypeB": 1,
            "eaMohCopApplyProList": cmx.g.proId,
            "collectUnit": cmx.g.museumId,
            "fileNumFront": $('#cmx-form #cmx-i-2-1').val(),
            "fileNumMidd": $('#cmx-form #cmx-i-2-2').find('option:selected').val(),
            "fileNumBack": fileNumBack,
            "proFileTitle": $('#cmx-form #cmx-i-3').val(),
            "collectUnitName": cmx.g.museumName,
            "apprContactTel": $('#cmx-form #cmx-i-9').val(),
            "apprContactName": $('#cmx-form #cmx-i-8').val(),
            "publishType": "9",
            projectName: "馆藏一级文物的复制方案"
        }];
        console.log(formate);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohCopApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    copFormData: formate
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    showAlert({
                        type: "success",
                        content: "保存成功"
                    })
                    cmx.g.applyId = prevModelData.data.applyId;
                }
            })
            .start();
    });
    //发送
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
                    content: "省文件号前可填长度最大为20"
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
        }
        if (IsEmpty(cmx.g.museumName)) {
            showAlert({
                type: "info",
                content: "请选择博物馆名称"
            });
            return;
        }
        var formate = [{
            "projectNum": "56015_c",
            "applyId": cmx.g.applyId,
            "approvalMatt": "",
            "projectType": 4,
            "contactName": $('#cmx-form #cmx-i-4').val(),
            "contactTel": $('#cmx-form #cmx-i-5').val(),
            "projectTypeB": 1,
            "eaMohCopApplyProList": cmx.g.proId,
            "collectUnit": cmx.g.museumId,
            "fileNumFront": $('#cmx-form #cmx-i-2-1').val(),
            "fileNumMidd": $('#cmx-form #cmx-i-2-2').find('option:selected').val(),
            "fileNumBack": fileNumBack,
            "proFileTitle": $('#cmx-form #cmx-i-3').val(),
            "collectUnitName": cmx.g.museumName,
            "apprContactTel": $('#cmx-form #cmx-i-9').val(),
            "apprContactName": $('#cmx-form #cmx-i-8').val(),
            "publishType": "9",
            projectName: "馆藏一级文物的复制方案"
        }];
        console.log(formate);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohCopApply/sendEaMohCopApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    copFormData: formate
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    showAlert({
                        type: "success",
                        content: "发送成功"
                    });
                    setTimeout(function () {
                        window.location.href = '/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid='+GetUrlParamString('nowid');
                    }, 1000);
                }
                send.go();
            })
            // .turn('callajax', {
            //     url: api_ea + '/eaPubTransactionrecord/disposeRecord',
            //     data: JSON.stringify({
            //         token: getData('token'), //类型：String  必有字段  备注：无
            //         trsFlag: "1",
            //         trsFormData: [{
            //             applyId: cmx.g.applyId,
            //             projectNum: "56015_c",
            //             receiverId: "RSJ0000006",
            //             note: "",
            //             recordId: ""
            //         }]
            //     }),
            //     type: 'POST',
            //     success: function (result) {
            //         console.log(result);
            //         if (result.state == '200') {

            //         }
            //     }
            // })
            .start();
    });
});

//编辑新增文物
function saveAndAddRecilData(param) {
    var data = param;
    $("#cmx-detail-form #cmx-i-1").val(data.collectUnit).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-2").val(data.relicName).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-3").val(data.sumMark).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-4").val(data.relicGrain).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-5").val(data.saveType).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-6").val(data.relicLevel).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-7").val(data.fullState).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-8").val(data.specificYear).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-9").val(data.relicSize).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-10").val(data.relicNum).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-11").val(data.collectTime).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-12").val(data.relicClass).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-13").val(data.relicSource).attr('readonly', 'readonly');
    $("#cmx-detail-form #cmx-i-14").val(data.valueAssess);
    $("#cmx-detail-form #cmx-i-15").val(data.copyReson);
    $("#cmx-detail-form #cmx-i-16").val(data.copyStep);
    $("#cmx-detail-form #cmx-i-17").val(data.riskAssess);
    new cmx.process()
        .turn('buildFileListByLocalData', {
            type: ['image'],
            data: [data.picList]
        })
        .cfinally(function () {
            if (GetUrlParamString('from') == 'iframe') {
                $("#cmx-detail-form textarea").attr('readonly', 'readonly');
                $("#cmx-detail-form input").attr('readonly', 'readonly');
                $('.form-file').hide();
                $('#cmx-relic-detail-save').hide();
                $('.img-remove-btn').hide();
            }
        })
        .start();

    //编辑文物保存
    if (GetUrlParamString('from') != 'iframe') {
        $('#cmx-relic-detail-save').on('click', function () {
            //基本表单验证
            var temp_flag = checkFormLength('#cmx-detail-form');
            if (!temp_flag) {
                return;
            }
            //特殊验证
            var copFormData = [{
                "projectNum": "56015_c",
                "proId": data.proId,
                "applyId": cmx.g.applyId,
                "sumMark": data.sumMark,
                "relicName": data.relicName,
                "specificYear": data.specificYear,
                "relicLevel": data.relicLevel,
                "relicClass": data.relicClass,
                "relicGrain": data.relicGrain,
                "relicSize": data.relicSize,
                "relicNum": data.relicNum,
                "collectUnit": data.collectUnit,
                "collectUnitId": data.collectUnitId,
                "collectTime": data.collectTime,
                "relicSource": data.relicSource,
                "saveType": data.saveType,
                "fullState": data.fullState,
                "valueAssess": $('#cmx-detail-form #cmx-i-14').val(),
                "copyReson": $('#cmx-detail-form #cmx-i-15').val(),
                "copyStep": $('#cmx-detail-form #cmx-i-16').val(),
                "picList": getFileListForSave(cmx.g.filelinkfileclass),
                "riskAssess": $('#cmx-detail-form #cmx-i-17').val(),
                "projectTypeB": 1
            }];
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaMohCopApply/saveRelicdetail',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        copFormData: copFormData
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
                        for (var i = 0; i < cmx.g.proId.length; i++) {
                            if (cmx.g.proId[i].proId == prevModelData.data.proId) {
                                flag = false;
                            }
                        }
                        if (flag) {
                            cmx.g.proId.push({
                                proId: prevModelData.data.proId,
                            });
                        }
                        console.log(cmx.g.proId)
                        $('#cmx-copy-tbody input[type="checkbox"]').each(function () {
                            if ($(this).val() == prevModelData.data.proId) {
                                $(this).parent().parent().remove();
                            }
                        })
                        var tr_html = '';
                        tr_html = ['<tr>',
                            '<td>',
                            '<input type="checkbox" name="cmx-handle-relic" value="' + prevModelData.data.proId + '">',
                            '</td>',
                            '<td>' + prevModelData.data.sumMark + '</td>',
                            '<td>' + prevModelData.data.relicName + '</td>',
                            '<td>' + prevModelData.data.relicGrain + '</td>',
                            '<td>' + prevModelData.data.collectUnit + '</td>',
                            '<td>' + prevModelData.data.saveType + '</td>',
                            '<td><button onclick="editWenwuItem(\'' + prevModelData.data.proId + '\')" class="btn btn-primary cmx-detail-btn">编辑文物详情</button></td>',
                            '</tr>'
                        ].join('');
                        $("#cmx-copy-tbody").append(tr_html);
                        //绑定编辑文物按钮
                        $('#cmx-relic-detail-modal').modal("hide");
                    }
                })
                .start();
        })
    }
}

function editWenwuItem(proId) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaMohCopApply/getRelicdetail',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                proId: proId
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (prevModelData.state == '200') {
                var data = prevModelData.data;
                $("#cmx-detail-modal-div").load(get56015DetailModal, function () {
                    $("#cmx-relic-detail-modal").off('shown.bs.modal');
                    $("#cmx-relic-detail-modal").on('shown.bs.modal', function () {
                        /* 文物古籍数据展开查询条件 */
                        $('#cmx-detail-form').html('');
                        //构建表单
                        CreateApplicationForm({
                            "url": get56015cDetailFormData,
                            "element": "#cmx-detail-form"
                        });

                        saveAndAddRecilData(data);
                    });
                    $("#cmx-relic-detail-modal").modal('show');
                });
            }
        })
        .start();
}

function cmx_special_2(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile">',
        '<input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-museum-choose btn btn-primary">选择</button></div>',
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