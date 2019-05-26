cmx.route.model({
    index: 'buildDepartApplyTable',
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
    index: 'distribute-back',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            showAlert({
                type: 'success',
                content: '退回成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-1/6jianding.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }

    }
});

cmx.route.model({
    index: 'acceptNotIdentify',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData.data;
        console.log(param);
        console.log(parameter);
        if (param > 0) {
            $("#depart-identify-modal").load(getPiliangModal, function () {

                $("#cmx-depart-identify").off('show.bs.modal');
                $("#cmx-depart-identify").on('show.bs.modal', function () {
                    $("#submitRelics").off("click");
                    $("#submitRelics").on("click", function () {
                        var isRelic = $('input:radio[name="cmx-30-IsRelic"]:checked').val();
                        var isAllow = $('input:radio[name="cmx-30-IsAllow"]:checked').val();
                        console.log(isRelic, isAllow);

                        $("#cmx-depart-identify").modal('hide');
                        if (param > 0) {
                            showAlert({
                                type: 'confirm', //success info warning error confirm input
                                content: '还有' + param + '个文物尚未鉴定，是否一键鉴定并提交？',
                                delay: 2, //可选参数，单位秒，confirm和input下无效
                                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                                btn_2: '确定', //可选参数，默认为取消
                                callback: function (_state) { //仅type为confirm下有效
                                    console.log(_state); //_state可能是yes no cancel
                                    if (_state == 'yes') {
                                        // 全部已登记接口
                                        new cmx.process()
                                            .turn('callajax', {
                                                url: api_ea + '/eaScrIdentifyInfo/completeIdentify',
                                                data: JSON.stringify({
                                                    token: getData('token'),
                                                    applyId: parameter.applyId,
                                                    dealUserId: parameter.dealUserId,
                                                    isRelic: isRelic,
                                                    isAllow: isAllow
                                                })
                                            })
                                            .turn('jianding-commit')
                                            .start()
                                    }
                                }
                            })
                        }
                        //  else {
                        //         new cmx.process()
                        //             .turn('callajax', {
                        //                 url: api_ea + '/eaScrIdentifyInfo/completeIdentify',
                        //                 data: JSON.stringify({
                        //                     token: getData('token'),
                        //                     applyId: parameter.applyId,
                        //                     dealUserId: parameter.dealUserId,
                        //                     isRelic: isRelic,
                        //                     isAllow: isAllow
                        //                 })
                        //             })
                        //             .turn('jianding-commit')
                        //             .start()
                        // }

                    })
                });
                $("#cmx-depart-identify").modal('show');
            });
        } else if (param == 0) {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaScrIdentifyInfo/completeIdentify',
                    data: JSON.stringify({
                        token: getData('token'),
                        applyId: parameter.applyId,
                        isRelic: '',
                        isAllow: ''
                    })
                })
                .turn('jianding-commit')
                .start()
        } else {
            showAlert({
                type: 'error',
                content: prevModelData.msg
            })
        }
    }
});

cmx.route.model({
    index: 'jianding-commit',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            showAlert({
                type: 'success',
                content: '提交成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-1/6jianding.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }
    }
});

//Ace-2

// 获取文物列表
cmx.route.model({
    index: 'bulidRelicInfoWorkbenchTable',
    handle: function (parameter, prevModelData, send, abort) {
        var applyId = parameter.applyId;
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
        } else {
            send.toviewreject(result.msg).go();
        }
    }
});

// build鉴定文物信息
cmx.route.model({
    index: 'buildeditRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        var page = parameter;

        $(".editRelic").click(function () {

            var relicId = $(this).attr("data-id");
            var index = $(this).parents("tr").index();
            var state = $(this).text();
            var data = parameter.dataList[index];
            console.log(data);
            var applyId = data.applyId;
            console.log(applyId);


            $("#cmx-relic-modal").load(editRelicInfoModal, function () {
                $("#modalTitle").text("文物鉴定信息");
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
                    addRelicInfo("#cmx-addrelicinfor-1", getJiandingRelicData);
                    $('[for="cmx-30-CheckOpinion"]').text('鉴定意见');
                    $("#cmx-30-RelicName").val(data.relicName);
                    $("#cmx-30-RelicType").val(data.relicType);
                    $("#cmx-30-RelicYear").val(data.relicYear);
                    $("#cmx-30-RelicQuality").val(data.relicQuality);
                    $("#cmx-30-ScrRelicQuality").val(data.relicQuality).attr('disabled', true);
                    $("#cmx-30-RelicLevel").val(data.relicLevel).attr('disabled', true);
                    $("#cmx-30-RelicNumber").val(data.relicNumber);
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
                    showRelicimg(data.index);
                    if (state == '已鉴定') {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaScrIdentifyInfo/getIdentifyInfo',
                                data: JSON.stringify({
                                    relicId: relicId,
                                    token: getData('token')
                                })
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == "200" && !IsEmpty(prevModelData.data)) {
                                    $("#cmx-30-RelicLevel1").val(prevModelData.data[0].relicLevel);
                                    $('input:radio[name="cmx-30-IsRelic"]').each(function (index, element) {
                                        if (element.value == prevModelData.data[0].isRelic) {
                                            element.checked = true;
                                        }
                                    });
                                    $('input:radio[name="cmx-30-IsAllow"]').each(function (index, element) {
                                        if (element.value == prevModelData.data[0].isAllow) {
                                            element.checked = true;
                                        }
                                    })
                                    $("#cmx-30-CheckOpinion").val(prevModelData.data[0].checkOpinion);
                                    $("#cmx-30-jianRemark").val(prevModelData.data[0].remark);
                                }
                            }).start();
                    }
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
                    var content = {
                        relicLevel: $("#cmx-30-RelicLevel1").val(),
                        isRelic: $('input:radio[name="cmx-30-IsRelic"]:checked').val(),
                        isAllow: $('input:radio[name="cmx-30-IsAllow"]:checked').val(),
                        checkOpinion: $("#cmx-30-CheckOpinion").val(),
                        remark: $("#cmx-30-jianRemark").val()
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrIdentifyInfo/beginIdentify',
                            data: JSON.stringify({
                                relicId: relicId,
                                applyId: applyId,
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
                                $("#cmx-editrelicinfo").modal("hide");

                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_ea + "/eaScrRelicInfo/selectRelicListBranch",
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
                                    .turn('bulidAddRelics', {})
                                    .start();
                            }
                        })
                        .start();
                });
            });
        });
    }
});


//新增每页显示条数
cmx.route.model({
    index: 'selectRelicFews',
    handle: function (parameter, prevModelData, send, abort) {
        $('#selectRelicFews').change(function () {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + "/eaScrRelicInfo/selectRelicListBranch",
                    data: JSON.stringify({
                        applyId: parameter.applyId,
                        pageNumber: parameter.pageNumber,
                        pageSize: $('#selectRelicFews').val(),
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