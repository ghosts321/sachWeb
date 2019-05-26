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

//修改携运人申请信息(个人)
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
//修改携运人申请信息(展览)
cmx.route.model({
    index: 'update-exit-application1',
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

//单击删除文物信息
cmx.route.model({
    index: 'deleteRelic',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (prevModelData.state == '200') {
            showAlert({
                type: 'success',
                content: '删除成功！'
            })
            send.tomodel().go();
            return false;
        } else {
            showAlert({
                type: 'error',
                content: prevModelData.msg
            })
            return false;
        }
    }
});
//刷新修改信息文物列表
cmx.route.model({
    index: 'refreshRelicList',
    handle: function (parameter, prevModelData, send, abort) {
        $("#cmx-special-P0002w").empty();
        cmx_relicForDelete(parameter.applyId, 'P0002w');
        $("#cmx-special-P0003w").empty();
        cmx_relicInfo(parameter.applyClass, 'P0003w');
    }
});


function cmx_relicForDelete(applyId, name) {
    var List = '';
    $.ajax({
        url: api_ea + '/eaScrRelicInfo/selectRelicListByRelApplyID',
        type: "POST",
        header: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        async: false,
        data: JSON.stringify({
            token: getData('token'),
            applyId: applyId,
            pageNumber: 1,
            pageSize: 1000
        }),
        success: function (result) {
            console.log(result);
            if (result.state == "200") {
                var relicInfo = result.data.dataList;
                if (relicInfo) {
                    for (var i = 0; i < relicInfo.length; i++) {
                        List += ['<tr>',
                            '<td>',
                            '<button class="btn btn-warning btn-sm btn-shanchu" onclick="deleteBind(\'' + applyId + '\',\'' + relicInfo[i].relicId + '\')"   id="' + relicInfo[i].relicId + '">删除</button>',
                            '</td>',
                            '<td>',
                            '0' + (i + 1) + '',
                            '</td>',
                            '<td>' + relicInfo[i].relicName + '</td>',
                            '<td>' + relicInfo[i].relicYear + '</td>',
                            '<td>' + relicInfo[i].relicQualityName + '</td>',
                            '<td>' + relicInfo[i].relicNumber + '</td>',
                            '<td>' + relicInfo[i].relicSize + '</td>',
                            '</tr>'
                        ].join('');
                    }
                }
                var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;width:250%;" id="">',
                    '<div class="example table-responsive">',
                    '<table class="table table-bordered">',
                    '<thead>',
                    '<tr>',
                    '<th>操作</th>',
                    '<th>序号</th>',
                    '<th>文物艺术品名称</th>',
                    '<th>年代</th>',
                    '<th>质地</th>',
                    '<th>数量</th>',
                    '<th>尺寸</th>',
                    List.length > 0 ? List : '',
                    '</tbody>',
                    '</table>',
                    '</div>',
                    '</div>'
                ].join('');
                $('#cmx-special-' + name + '').append(html);
            } else {
                alert(result.msg);
            }
        }
    });
}



function cmx_relicInfo(applyClass, name) {
    var searchRelic = " <div class='form-group'>" +
        " <div class='form-group'>" +
        " <div class='input-group'>" +
        " <span class='input-group-addon'>" +
        "携运人" +
        " </span>" +
        "<input type='text' id='search-carrier' class='form-control' placeholder='' autocomplete='off'>" +
        " <span class='input-group-addon'>" +
        "出境时间" +
        " </span>" +
        "<input type='text' id='search-turnDate' class='form-control' placeholder='' autocomplete='off'>" +
        "</div>" +
        " </div>" +
        " </div>";
    var searchButton = " <div class='form-group'>" +
        " <div class='form-group'>" +
        "<button type='button' class='btn btn-primary inputon' id='search-btn'>查询</button>" +
        "<button type='button' class='btn inputon' id='clear-search-form'>清除</button>" +
        " </div>" +
        " </div>";

    var html = [
        '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;width:250%;" id="optionalRelic">',
        '<div class="example table-responsive">',
        '<table class="table table-bordered">',
        '<thead>',
        '<tr>',
        '<th colspan="5">',
        searchRelic,
        '</th>',
        '<th colspan="2">',
        searchButton,
        '</th>',
        '</tr>',
        '<tr>',
        '<th>',
        '<div class="checkbox-custom checkbox-primary checkbox-inline">',
        '<input type="checkbox" id="selectAll" name="" value=""><label for="selectAll"></label>',
        '全&nbsp;&nbsp;选',
        '</div>',
        '</th>',
        '<th>序号</th>',
        '<th>文物艺术品名称</th>',
        '<th>年代</th>',
        '<th>质地</th>',
        '<th>数量</th>',
        '<th>尺寸</th>',
        '</tr>',
        '</thead>',
        '<tbody id="search-relicList">',
        '</tbody>',
        '</table>',
        '</div>',
        '</div>'
    ].join('');

    $("#cmx-special-" + data.serialnumber).html(html);

    var getTempList = function () {
        var List = '';
        $.ajax({
            url: api_ea + '/eaScrRelicInfo/selectTempEnterRepList',
            type: "POST",
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            async: false,
            data: JSON.stringify({
                token: getData('token'),
                applyClass: applyClass,
                carryUser: $('#search-carrier').val(),
                turnDate: $('#search-turnDate').val()
            }),
            success: function (result) {
                if (result.state == "200") {
                    var relicInfo = result.data;
                    if (relicInfo.length) {
                        for (var i = 0; i < relicInfo.length; i++) {
                            for (var j = 0; j < relicInfo[i].relicList.length; j++) {
                                List += ['<tr>',
                                    '<td>',
                                    '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                                    '<input type="checkbox" id="' + relicInfo[i].relicList[
                                        j].relicId + '" name="cmx-relicInfo" value="' +
                                    relicInfo[i].relicList[j].relicId + '"><label for="' +
                                    relicInfo[i].relicList[j].relicId + '"></label>',
                                    '第' + (i + 1) + '批',
                                    '</div>',
                                    '</td>',
                                    '<td>',
                                    '0' + (j + 1) + '',
                                    '</td>',
                                    '<td>' + relicInfo[i].relicList[j].relicName + '</td>',
                                    '<td>' + relicInfo[i].relicList[j].relicYear + '</td>',
                                    '<td>' + relicInfo[i].relicList[j].relicQualityName +
                                    '</td>',
                                    '<td>' + relicInfo[i].relicList[j].relicNumber +
                                    '</td>',
                                    '<td>' + relicInfo[i].relicList[j].relicSize + '</td>',
                                    '</tr>'
                                ].join('');
                            }
                        }

                        $("#search-relicList").html(List);
                    } else {
                        $("#search-relicList").html('暂无数据');
                    }


                    $('#search-turnDate').datepicker({
                        language: 'zh-CN',
                        autoclose: true, //选择之后是否关闭日期选项
                        todayHighlight: true, //当为true的时候高亮
                        keyboardNavigation: true,
                        format: 'yyyy-mm-dd',
                    });
                    $('#selectAll').on('click', function () {
                        if ($(this).prop("checked")) {
                            $("[name='cmx-relicInfo']").prop('checked', 'true');
                        } else {
                            $("[name='cmx-relicInfo']").removeProp("checked");
                        }
                    })

                }
            },
            complete: function () {

            }
        });
    }

    getTempList();

    // 查询
    $("#search-btn").off("click");
    $("#search-btn").on("click", function () {
        getTempList();
    });
    $("#clear-search-form").off("click");
    $("#clear-search-form").on("click", function () {
        $('#search-carrier').val('');
        $('#search-turnDate').val('');
    });

}

//Ace-2

// 创建新增文物
cmx.route.model({
    index: 'bulidAddRelics',
    handle: function (parameter, prevModelData, send, abort) {
        var applyId = prevModelData;
        console.log(applyId);
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
            loadWenwuList(1, parameter, 1, 20);
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
                                    loadWenwuList(1, applyId, data.pageNumber, data.pageSize);
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
                                loadWenwuList(1, applyId, page.pageNumber, page.pageSize);
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