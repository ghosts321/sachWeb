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
        if (param.state == '200') {
            showAlert({
                type: 'success',
                content: '退回成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-5/7shenpi.html?nowid=' + GetUrlParamString('nowid');
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
    index: 'shenpi-select',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            if(param.data>0){
                showAlert({
                    type: 'confirm',
                    content: '还有'+param.data+'个文物没有审批，是否确认审批！',
                    btn_1:'取消',
                    btn_2:'确定',
                    callback:function(_state){
                        if(_state=='yes'){
                            new cmx.process()
                            .turn('callajax',{
                                url: api_ea+'/eaScrRelicInfo/TempExitsaveApprove',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: parameter
                                })
                            })
                            .turn('shenpi-access')
                            .start()
                        }
                    }
                });
            }else{
                showAlert({
                    type: 'success',
                    content: '所属文物已全部审批，无需审批！'
                });
                getApplyList(5, '/eaScrApplyInfo/getApproveList', 8);
            }
            
        } 
    }
});

cmx.route.model({
    index: 'shenpi-access',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            showAlert({
                type: 'success',
                content: '审批成功！'
            });
            getApplyList(5, '/eaScrApplyInfo/getApproveList', 8);
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }
    }
});

cmx.route.model({
    index: 'shenpi-banjie',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state == '200') {
            showAlert({
                type: 'success',
                content: '办结成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-5/7shenpi.html?nowid=' + GetUrlParamString('nowid');
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

// build审批文物事件
cmx.route.model({
    index: 'buildeditRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        var page = parameter;

        $(".editRelic").click(function () {

            var relicId = $(this).attr("data-id");
            putData("relicId",relicId);
            var index = $(this).parents("tr").index();
            var data = parameter.dataList[index];
            console.log(data);
            var applyId = data.applyId;
            console.log(applyId);


            $("#cmx-relic-modal").load(editRelicInfoModal, function () {
                $("#modalTitle").text("审批文物信息");
                // 显示模态框
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
                    addRelicInfo("#cmx-addrelicinfor-1", getShenpiRelicData,applyId);
                    $('.isAllowName').remove();
                    $('.cmx-build-form-notnull').css('display','none');
                    $("#cmx-30-RelicName").val(data.relicName);
                    $("#cmx-30-RelicType").val(data.relicType);
                    $("#cmx-30-RelicYear").val(data.relicYear);
                    $("#cmx-30-RelicQuality").val(data.relicQuality);
                    $("#cmx-30-ScrRelicQuality").val(data.relicQuality).attr('disabled',true);
                    $("#cmx-30-RelicLevel").val(data.relicLevel).attr('disabled',true);
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
                        opinion:$("#cmx-30-CheckOpinion").val(),
                        remark: $("#cmx-30-jianRemark").val()
                    }
        
                    new cmx.process()
                    .turn('callajax', {
                        url: api_ea+'/eaScrRelicInfo/saveSingleApprove',
                        data: JSON.stringify({
                            applyId:applyId,
                            relicId: relicId,
                            opinion:content.opinion,
                            remark:content.remark,
                            token:getData("token")
                        })  
                    })
                    .turn(function (prevModelData, noviewsend, abort) {
                        if (prevModelData.state =="200") {
                            showAlert({
                                type: "success",
                                content: prevModelData.msg
                            })
                            $("#cmx-editrelicinfo").modal("hide");
                            getApplyList(5, '/eaScrApplyInfo/getApproveList', 8);
                            new cmx.process()
                            .turn('callajax', {
                                url: api_ea+"/eaScrRelicInfo/selectRelicListByRelApplyID",
                                data: JSON.stringify({
                                    applyId: applyId,
                                    pageNumber: Number(page.pageNumber),
                                    pageSize: Number(page.pageSize),
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
