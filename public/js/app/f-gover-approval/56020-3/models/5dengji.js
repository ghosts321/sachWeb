cmx.route.model({
    index: 'buildDepartApplyTable',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if(!IsNull(param.data)&&param.state=='200'){
            send.toviewresolve(param.data).go();
        }else {
            send.toviewreject(param.msg).go();
        }
    }
});
cmx.route.model({
    index: 'distribute-back',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state=='200') {
            showAlert({
                type: 'success',
                content: '退回成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-3/5dengji.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }

    }
});
//修改携运人申请信息(个人)
cmx.route.model({
    index: 'update-exit-application',
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
//修改携运人申请信息(展览)
cmx.route.model({
    index: 'update-exit-application1',
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

//单击修改（修改携运人信息）
cmx.route.model({
    index: 'update-exit-application2',
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

cmx.route.model({
    index: 'acceptNotRegister',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData.data;
        console.log(param);
        if (param > 0) {
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '还有' + param + '个文物尚未登记，是否一键登记并提交？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        // 全部已登记接口
                        new cmx.process()
                        .turn('callajax', {
                            url: api_ea+'/eaScrApplyInfo/completeRegister',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: parameter
                            })
                        })
                        .turn('accept-commit')
                        .start()
                    }
                }
            })
        }else{
            new cmx.process()
            .turn('callajax', {
                url: api_ea+'/eaScrApplyInfo/completeRegister',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: parameter
                })
            })
            .turn('accept-commit')
            .start()
        }
    }
});


cmx.route.model({
    index: 'accept-commit',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            showAlert({
                type: 'success',
                content: '提交成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-3/5dengji.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }
        // send.toviewresolve(param.data).go();
    }
});

//Ace-2
// 获取文物列表
cmx.route.model({
    index: 'bulidRelicInfoWorkbenchTable',
    handle: function (parameter, prevModelData, send, abort) {
        var applyId = parameter.applyId;
        console.log(applyId);
        $('#cmx-download-relic').unbind('click');
        $('#cmx-download-relic').bind('click',function() {
            window.open(api_ea + '/eaScrSingleCard/printRelicList?token=' + getData("token") + '&applyId=' + applyId);
        });
        send.tomodel().go();
        var applyStatus = parameter.applyStatus;
        var result = prevModelData;
        if (result.state == "200") {
            var param = {};
            param.data = result.data;
            param.applyStatus = applyStatus;
            send.tomodel(applyId).toviewresolve(param).go();

            new cmx.process()
                .turn('buildeditRelicInfo', result.data)
                .start();
            new cmx.process()
                .turn('deleteEditRelicInfo', result.data)
                .start();
        }
    }
});

// build编辑文物事件
cmx.route.model({
    index: 'buildeditRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        var page = parameter;
        $(".editRelic").click(function () {
            var relicId = $(this).attr("data-id");
            var index = $(this).parents("tr").index();
            var data = parameter.dataList[index];
            console.log(data);
            var applyId = data.applyId;
            console.log(applyId);


            $("#cmx-relic-modal").load(editRelicInfoModal, function () {
                // 显示模态框
                new cmx.process()
                .turn('initFiles', {
                    'P00030': '158'
                })
                .start();
                // 显示模态框
                $('#cmx-editrelicinfo').off('hidden.bs.modal');
                $('#cmx-editrelicinfo').on('hidden.bs.modal', function () {
                    show56020img_flag = true;
                });
                $('#cmx-editrelicinfo').off('shown.bs.modal');
                $('#cmx-editrelicinfo').on('shown.bs.modal', function () {
                    if(!show56020img_flag){
                        return;
                    }
                    $("#cmx-addrelicinfor-1").empty();
                    addRelicInfo("#cmx-addrelicinfor-1", get5degnjiRelicInfo);

                    $("#cmx-30-RelicName").val(data.relicName);
                    $("#cmx-30-RelicType").val(data.relicType);
                    $("#cmx-30-RelicYear").val(data.relicYear);
                    $("#cmx-30-ScrRelicQuality").val(data.relicQuality);
                    $("#cmx-30-RelicLevel").val(data.relicLevel);
                    $("#cmx-30-RelicNumberSelect").val(data.relicUnits);
                    $("#cmx-30-RelicSize").val(data.relicSize);
                    $("#cmx-30-Remark").val(data.remark);
                    $("#cmx-30-CultureCollec").val(data.cultureCollec);
                    $("#cmx-30-RelicWidth").val(data.relicWidth);
                    $("#cmx-30-RelicLength").val(data.relicLength);
                    $("#cmx-30-RelicCaliber").val(data.relicCaliber);
                    $("#cmx-30-RelicHeight").val(data.relicHeight);
                    $("#cmx-30-RelicBottom").val(data.relicBottom);
                    $("#cmx-30-RelicMicro").val(data.relicMicro);
                    console.log(data);
                    showRelicimg(data.index, 2, relicId, data.mainImg);
                    isJian(data.relicNumber);
                    $("#cmx-30-RelicNumberSelect").off('change');
                    $("#cmx-30-RelicNumberSelect").on('change', function () {
                        isJian(data.relicNumber);
                    });
                });
                $('#cmx-editrelicinfo').modal('show');

                $(".closed").on("click", function () {
                    $("#cmx-editrelicinfo").modal("hide");
                });

                //保存
                $('#cmx-editrelicinfo').off('click');
                $("#updateRelics").on("click", function () {
                    var temp_flag = checkFormLength('#cmx-addrelicinfor-1');
                    if (!temp_flag) {
                        return;
                    }
                    // 判断数量单位，根据所需穿入字段
                    var select = $("#cmx-30-RelicNumberSelect").val();
                    if (select != '1') {
                        var relicNumber = $('#cmx-30-RelicNumberInput2').val();
                    } else {
                        var relicNumber = $('#cmx-30-RelicNumberInput').val();
                    }
                    if(cmx.g.filesarray.get('158')<1){
                        showAlert({
                            type:'error',
                            content:'请上传文物图片'
                        })
                        return;
                    }

                    if($("#cmx-30-RelicWidth").val()<0||$("#cmx-30-relicLength").val()<0||$("#cmx-30-relicCaliber").val()<0||$("#cmx-30-relicHeight").val()<0||$("#cmx-30-relicBottom").val()<0||$("#cmx-30-relicMicro").val()<0){
                        showAlert({
                            type:'error',
                            content:'文物的外观信息不能存在负数！'
                        })
                        return;
                    }
                    var content = {
                        relicName: $("#cmx-30-RelicName").val(),
                        relicType: $("#cmx-30-RelicType").val(),
                        relicYear: $("#cmx-30-RelicYear").val(),
                        relicQuality: $("#cmx-30-ScrRelicQuality").val(),
                        relicLevel: $("#cmx-30-RelicLevel").val(),
                        relicNumber: relicNumber,
                        relicUnits: select,
                        relicSize: $("#cmx-30-RelicSize").val(),
                        remark: $("#cmx-30-Remark").val(),
                        index: cmx.g.filesarray.get('158'),
                        cultureCollec: $("#cmx-30-CultureCollec").val(),
                        relicWidth: $("#cmx-30-RelicWidth").val(),
                        relicLength: $("#cmx-30-RelicLength").val(),
                        relicCaliber: $("#cmx-30-RelicCaliber").val(),
                        relicHeight: $("#cmx-30-RelicHeight").val(),
                        relicBottom: $("#cmx-30-RelicBottom").val(),
                        relicMicro:$("#cmx-30-RelicMicro").val()
                    }
                    var parameter = {
                        relicId: relicId,
                        content: content,
                        applyId: applyId,
                        pageNumber: page.pageNumber,
                        pageSize: page.pageSize
                    }
                    console.log(content);
                    send.tomodel(parameter).go();
                    new cmx.process()
                        .turn('updataEditRelicInfo', parameter).start();
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
                            if (prevModelData.state =="200") {
                                showAlert({
                                    type: "success",
                                    content: prevModelData.msg
                                })
                                $("#cmx-editrelicinfo").modal("hide");

                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
                                        data: JSON.stringify({
                                            applyId: applyId,
                                            pageNumber: page.pageNumber,
                                            pageSize: page.pageSize,
                                            token: getData("token")
                                        })
                                    })
                                    .turn('bulidRelicInfoWorkbenchTable', {
                                        applyStatus: 1,
                                        applyId: applyId
                                    })
                                    .start();
                            }
                        })
                        .start();
                    
                });
            });
        });
    }
});

// 删除文物信息
cmx.route.model({
    index: 'deleteEditRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        $(".deleteRelic").off("click");
        $(".deleteRelic").on("click", function () {
            var relicId = $(this).attr("data-id");
            var index = $(this).parents("tr").index();
            var data = parameter;
            console.log(data);
            var applyId = data.dataList[index].applyId;
            showAlert({
                type: 'confirm',//success info warning error confirm input
                content: '确定要删除申请信息吗？',
                delay: 2,//可选参数，单位秒，confirm和input下无效
                btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定',//可选参数，默认为取消
                callback: function (_state) {//仅type为confirm下有效
                    console.log(_state);//_state可能是yes no cancel
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrRelicInfo/deleteEaScrRelicInfoByPK',
                                data: JSON.stringify({
                                    relicId: relicId,
                                    token: getData('token')
                                })
                            })
                            .turn(function (prevModelData, noviewsend, abort) {
                                if (prevModelData.state =="200") {
                                    var result = prevModelData;

                                    showAlert({
                                        type: "success",
                                        content: result.msg
                                    })
                                    $("#deleteAlert").hide();

                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
                                            data: JSON.stringify({
                                                applyId: applyId,
                                                pageNumber: data.pageNumber,
                                                pageSize: data.pageSize,
                                                token: getData("token")
                                            })
                                        })
                                        .turn('bulidRelicInfoWorkbenchTable', {
                                            applyStatus: 1,
                                            applyId: applyId
                                        })
                                        .start();
                                }

                            })
                            .start();
                    }
                }
            })
        });
    }
});

// 登记在view
//新增每页显示条数
cmx.route.model({
    index: 'selectRelicFews',
    handle: function (parameter, prevModelData, send, abort) {
        $('#selectRelicFews').change(function () {
            new cmx.process()
            .turn('callajax', {
                url: api_ea + "/eaScrRelicInfo/selectRelicListByRelApplyID",
                data: JSON.stringify({
                    applyId: parameter.applyId,
                    pageNumber: parameter.pageNumber,
                    pageSize:  $('#selectRelicFews').val(),
                    token: getData("token")
                })
            })
            .turn('bulidRelicInfoWorkbenchTable', {
                applyStatus: parameter.applyStatus,
                applyId: parameter.applyId
            })
            .start()
        })
    }
});

// 判断数量单位
function isJian(relicNumber) {
    var select = $("#cmx-30-RelicNumberSelect").val();
    if (select != '1') {
        $("#cmx-30-RelicNumberInput").val('1');
        $("#cmx-30-RelicNumberInput2").val(relicNumber);
        $('#cmx-30-RelicNumberInput2').parent().show();
        $('#cmx-30-RelicNumberSelect2').parent().show();
    } else {
        $("#cmx-30-RelicNumberInput").val('1');
        $('#cmx-30-RelicNumberInput2').parent().hide();
        $('#cmx-30-RelicNumberSelect2').parent().hide();
    }
}

