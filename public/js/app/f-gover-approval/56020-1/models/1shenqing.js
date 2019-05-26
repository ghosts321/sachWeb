cmx.route.model({
    index: 'buildDepartApplyTable',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200') {
            send.toviewresolve(prevModelData.data).go();
        }
    }
});

cmx.route.model({
    index: 'saveCarrierApplication',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (!IsNull(param.data) && param.state == '200') {
            send.toviewresolve(param.data).go();
        }
    }
});

//修改携运人申请信息
cmx.route.model({
    index: 'update-exit-application',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (!IsNull(param.data) && param.state == '200') {
            send.toviewresolve(param.data).go();
        }
    }
});
//单击修改（修改携运人信息）
cmx.route.model({
    index: 'update-exit-application2',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (!IsNull(param.data) && param.state == '200') {
            send.toviewresolve(param.data).go();
        }
    }
});

//单击删除（携运人申请信息）
cmx.route.model({
    index: 'delete-exitApplication',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (!IsNull(param.data) && param.state == '200') {
            send.toviewresolve(param.data).go();
        } else {
            send.toviewreject(param.msg).go();
        }
    }
});

//单击提交（携运人申请信息）
cmx.route.model({
    index: 'submit-exitApplication',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            send.toviewresolve(param.data).go();
        }
    }

});



//单击退回（携运人申请信息）
cmx.route.model({
    index: 'return-exitApplication',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (!IsNull(param.data) && param.state == '200') {
            send.toviewresolve(param.data).go();
        } else {
            send.toviewreject(param.msg).go();
        }
    }

});


// Ace-2
var preAddRelicModal = public_url + 'app/f-gover-approval/56020-1/include/pre-batchUploadRelic.html';
// 创建新增文物
cmx.route.model({
    index: 'bulidAddRelics',
    handle: function (parameter, prevModelData, send, abort) {
        var applyId = prevModelData;
        console.log(applyId);
        // 绑定点击新增文物
        $("#cmx-add-relic").unbind("click");
        $("#cmx-add-relic").bind("click", function () {
            $("#cmx-relic-modal").empty();
            $("#cmx-add-modal").load(getRelicInfoModal, function () {
                $('#cmx-addrelicinfo').off('hidden.bs.modal');
                $('#cmx-addrelicinfo').on('hidden.bs.modal', function () {
                    show56020img_flag = true;
                });
                $('#cmx-addrelicinfo').off('shown.bs.modal');
                $('#cmx-addrelicinfo').on('shown.bs.modal', function () {
                    if (!show56020img_flag) {
                        return;
                    }
                    getAutoRelicInfo();
                    new cmx.process()
                        .turn('initFiles', {
                            'P00030': 'P00030'
                        })
                        .start();
                    $("#submitRelics").on('click', function () {
                        var temp_flag = checkFormLength('#cmx-addrelicinfor-modal');
                        if (!temp_flag) {
                            return;
                        }
                        if (cmx.g.filesarray.get('P00030') < 1) {
                            showAlert({
                                type: 'error',
                                content: '请上传文物图片'
                            })
                            return;
                        }
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrRelicInfo/saveEaScrRelicInfo',
                                data: JSON.stringify({
                                    applyId: applyId,
                                    formData: [{
                                        relicName: $("#cmx-30-RelicName").val(),
                                        relicType: $("#cmx-30-RelicType").val(),
                                        relicYear: $("#cmx-30-RelicYear").val(),
                                        relicQuality: $("#cmx-30-RelicQuality").val(),
                                        relicLevel: $("#cmx-30-RelicLevel").val(),
                                        relicNumber: '1',
                                        relicUnits: '1',
                                        relicSize: $("#cmx-30-RelicSize").val(),
                                        remark: $("#cmx-30-Remark").val(),
                                        index: cmx.g.filesarray.get('P00030')
                                    }],
                                    token: getData("token")
                                })
                            })
                            .turn('getAddRelicsData', applyId).start();

                    })
                });
                $('#cmx-addrelicinfo').modal('show');

            });
        });

        $("#cmx-batch-upload-relic").unbind("click");
        $("#cmx-batch-upload-relic").bind("click", function () {
            //// 绑定点击批量上传
            new cmx.process()
                .turn('initFiles', {
                    'P0batchUploadRelic': 'P0batchUploadRelic',
                })
                .start();
            $("#cmx-batchUploadRelic-modal").load(batchUploadRelicModal, function () {
                $('#batchUploadRelic-modal').off('shown.bs.modal');
                $('#batchUploadRelic-modal').on('shown.bs.modal', function () {
                    batchUploadRelic();
                });
                $('#batchUploadRelic-modal').modal('show');
                $("#batchUploadRelicSave").off('click');
                $("#batchUploadRelicSave").on('click', function () {
                    var length = cmx.g.filesarray.get('P0batchUploadRelic').length - 1;
                    if (length < 0) {
                        showAlert({
                            type: 'info',
                            content: '文件不能为空!'
                        });
                    } else {
                        waitProcess(56020);
                        showLoading();
                        var a = cmx.g.filesarray.get('P0batchUploadRelic')[length];
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrRelicInfo/saveBatchRelic',
                                data: JSON.stringify({
                                    applyId: applyId,
                                    index: a,
                                    token: getData("token")
                                })
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == "200") {
                                    console.log(prevModelData.data);
                                    $('#batchUploadRelic-modal').modal('hide');
                                    $("#cmx-preBatchUploadRelic-modal").load(preAddRelicModal, function () {
                                        $('#preRelicInfo-modal').off('shown.bs.modal');
                                        $('#preRelicInfo-modal').on('shown.bs.modal', function () {
                                            for (var i = 0; i < prevModelData.data.length; i++) {
                                                var dicRelicQuality = ['<select class="form-control selectPreAdd" data-dic="ScrRelicQuality" id="cmx-' + i + '-RelicQuality"   name="">',
                                                    '<select>',
                                                    '</div>'
                                                ].join('');
                                                var dicRelicLevel = ['<select class="form-control selectPreAdd"  data-dic="RelicLevel" id="cmx-' + i + '-RelicLevel"   name="">',
                                                    '<select>',
                                                    '</div>'
                                                ].join('');
                                                var html = ['<tr>',
                                                    '<td>' + (i + 1) + '</td>',
                                                    '<td><input type="text" class="form-control old-val-tag" id="cmx-' + i + '-RelicName"  placeholder="" value="' + prevModelData.data[i].relicName + '"></td>',
                                                    '<td><select class="form-control selectPreAdd old-val-tag" id="cmx-' + i + '-RelicType"><option value="1">文物</option><option value="2">复仿制品</option></select></td>',
                                                    '<td><input type="text" class="form-control old-val-tag" id="cmx-' + i + '-RelicYear"  placeholder="" value="' + prevModelData.data[i].relicYears + '"></td>',
                                                    '<td>' + dicRelicQuality + '</td>',
                                                    '<td>' + dicRelicLevel + '</td>',
                                                    '<td class="width-50">1件</td>',
                                                    '<td><input type="text" class="form-control old-val-tag" id="cmx-' + i + '-RelicSize"  placeholder="" value="' + prevModelData.data[i].relicSize + '"></td>',
                                                    '<td><textarea class="form-control old-val-tag" id="cmx-' + i + '-Remark" placeholder="">' + prevModelData.data[i].remark + '</textarea></td>',
                                                    '</tr>'
                                                ].join();
                                                $('#preAddRelicInfo').append(html);
                                                $('#cmx-' + i + '-RelicType').val(prevModelData.data[i].relicType);
                                                new cmx.process()
                                                    .turn('buildDataDic', {
                                                        element: $('#cmx-' + i + '-RelicQuality'),
                                                        defaultValue: '' + prevModelData.data[i].relicQuality + '',
                                                        hasAll: false
                                                    })
                                                    .turn('buildDataDic', {
                                                        element: $('#cmx-' + i + '-RelicLevel'),
                                                        defaultValue: '' + prevModelData.data[i].relicLevel + '',
                                                        hasNull: true,
                                                        hasAll: false
                                                    }).cfinally(function () {}).start();
                                            }
                                            $('#preAddRelicSave').off('click');
                                            $('#preAddRelicSave').on('click', function () {
                                                console.log(applyId);
                                                var content = [];
                                                var max = prevModelData.data.length;
                                                for (var i = 0; i < max; i++) {
                                                    var form = {
                                                        relicName: $("#cmx-" + i + "-RelicName").val(),
                                                        relicType: $("#cmx-" + i + "-RelicType").val(),
                                                        relicYear: $("#cmx-" + i + "-RelicYear").val(),
                                                        relicQuality: $("#cmx-" + i + "-RelicQuality").val(),
                                                        relicLevel: $("#cmx-" + i + "-RelicLevel").val(),
                                                        relicNumber: '1',
                                                        relicUnits: '1',
                                                        relicSize: $("#cmx-" + i + "-RelicSize").val(),
                                                        remark: $("#cmx-" + i + "-Remark").val(),
                                                        index: []
                                                    }
                                                    content.push(form);
                                                    // alert(form.relicUnits);
                                                }
                                                console.log(content);
                                                btn_recovery('#preAddRelicSave');
                                                new cmx.process()
                                                    .turn('callajax', {
                                                        url: api_ea + '/eaScrRelicInfo/saveEaScrRelicInfo',
                                                        data: JSON.stringify({
                                                            applyId: applyId,
                                                            formData: content,
                                                            token: getData("token")
                                                        })
                                                    })
                                                    .turn('getAddRelicsData', applyId).start();
                                            });
                                            hideLoading(56020);

                                        })
                                        $("#preRelicInfo-modal").on('hidden.bs.modal', function () {
                                            $('#preRelicInfo-modal').modal('hide');
                                            $('#batchUploadRelic-modal').modal('hide');
                                        });
                                        $('#preRelicInfo-modal').modal('show');
                                    })

                                    // loadWenwuList(1, applyId, 1, 20);
                                } else {
                                    showAlert({
                                        type: 'error',
                                        content: prevModelData.msg
                                    })
                                }
                            })
                            .start();
                    }

                })
            });
        });
        send.tomodel().go();
    }
});

// 上报新增文物数据
cmx.route.model({
    index: 'getAddRelicsData',
    handle: function (parameter, prevModelData, send, abort) {
        var result = prevModelData;
        console.log(result)
        if (result.state == "200") {
            send.toviewresolve(result).go();
            loadWenwuList(1, parameter, 1, cmx.g.pageSize);
        }
    }
});

// 获取文物列表
cmx.route.model({
    index: 'bulidRelicInfoWorkbenchTable',
    handle: function (parameter, prevModelData, send, abort) {
        var applyStatus = parameter.applyStatus;
        var result = prevModelData;
        if (result.state == "200") {
            var param = {};
            param.data = result.data;
            param.applyStatus = applyStatus;
            send.tomodel({
                applyId: parameter.applyId,
                data: result.data
            }).toviewresolve(param).go();

        } else {
            send.toviewreject(result.msg).go();
        }
    }
});

// build编辑文物事件
cmx.route.model({
    index: 'buildBothRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        var page = prevModelData.data;
        $("#relicList").off('click', '.deleteRelic');
        $("#relicList").on('click', '.deleteRelic', function () {
            var relicId = $(this).attr("data-id");
            var index = $(this).parents("tr").index();
            var data = prevModelData.data;
            console.log(data);
            var applyId = data.dataList[index].applyId;
            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '确定要删除申请信息吗？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrRelicInfo/deleteEaScrRelicInfoByPK',
                                data: JSON.stringify({
                                    relicId: relicId,
                                    token: getData("token")
                                })
                            })
                            .turn(function (prevModelData, noviewsend, abort) {
                                if (prevModelData.state == "200") {
                                    var result = prevModelData;
                                    showAlert({
                                        type: "success",
                                        content: result.msg
                                    })
                                    $("#deleteAlert").hide();
                                    loadWenwuList(1, applyId, data.pageNumber, cmx.g.pageSize);
                                }

                            })
                            .start();
                    }
                }
            })
        });
        $("#relicList").off('click', '.editRelic');
        $("#relicList").on('click', '.editRelic', function () {
            var relicId = $(this).attr("data-id");
            var index = $(this).parents("tr").index();
            var data = page.dataList[index];
            console.log(data);
            var applyId = data.applyId;
            console.log(applyId);
            $("#cmx-relic-modal").load(editRelicInfoModal, function () {
                $(".closed").on("click", function () {
                    $("#cmx-editrelicinfo").modal("hide");
                });
                //保存
                $('#updateRelics').off('click');
                $("#updateRelics").on("click", function () {
                    var temp_flag = checkFormLength('#cmx-addrelicinfor-1');
                    if (!temp_flag) {
                        return;
                    }
                    btn_recovery('#updateRelics');
                    if (cmx.g.filesarray.get('158') < 1) {
                        showAlert({
                            type: 'error',
                            content: '请上传文物图片'
                        })
                        return;
                    }
                    var content = {
                        relicName: $("#cmx-30-RelicName").val(),
                        relicType: $("#cmx-30-RelicType").val(),
                        relicYear: $("#cmx-30-RelicYear").val(),
                        relicQuality: $("#cmx-30-ScrRelicQuality").val(),
                        relicLevel: $("#cmx-30-RelicLevel").val(),
                        relicNumber: '1',
                        relicUnits: '1',
                        relicSize: $("#cmx-30-RelicSize").val(),
                        remark: $("#cmx-30-Remark").val(),
                        index: cmx.g.filesarray.get('158')
                    }
                    console.log(content);
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrRelicInfo/updateEaScrRelicInfo',
                            data: JSON.stringify({
                                relicId: relicId,
                                formData: content,
                                token: getData("token")
                            })
                        })
                        .turn(function (prevModelData, noviewsend, abort) {
                            if (prevModelData.state == "200") {
                                showAlert({
                                    type: "success",
                                    content: prevModelData.msg
                                })
                            }
                            if (prevModelData.state == '200') {
                                $("#cmx-editrelicinfo").modal("hide");
                                loadWenwuList(1, applyId, page.pageNumber, cmx.g.pageSize);
                            }
                        })
                        .start();

                });
                buildWenwuItemData(data);
            });

        });
        send.tomodel(prevModelData.applyId).go();
    }
});

function buildWenwuItemData(data) {
    console.log(data);
    console.log(444444)

    // 显示模态框
    new cmx.process()
        .turn('initFiles', {
            'P00030': '158'
        })
        .start();
    $('#cmx-editrelicinfo').off('hidden.bs.modal');
    $('#cmx-editrelicinfo').on('hidden.bs.modal', function () {
        show56020img_flag = true;
    });
    $('#cmx-editrelicinfo').off('shown.bs.modal');
    $('#cmx-editrelicinfo').on('shown.bs.modal', function () {
        if (!show56020img_flag) {
            return;
        }
        $("#cmx-addrelicinfor-1").empty();
        addRelicInfo("#cmx-addrelicinfor-1", getAddRelicData);

        $("#cmx-30-RelicName").val(data.relicName);
        $("#cmx-30-RelicType").val(data.relicType);

        $("#cmx-30-RelicYear").val(data.relicYear);
        $("#cmx-30-ScrRelicQuality").val(data.relicQuality);

        $("#cmx-30-RelicLevel").val(data.relicLevel);
        $("#cmx-30-RelicNumberInput").val(data.relicNumber);
        $("#cmx-30-RelicNumberSelect").val(data.relicUnits);

        $("#cmx-30-RelicSize").val(data.relicSize);
        $("#cmx-30-Remark").val(data.remark);
        showRelicimg(data.index, 0);

    });
    $('#cmx-editrelicinfo').modal('show');
}