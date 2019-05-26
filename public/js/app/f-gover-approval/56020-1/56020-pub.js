//登记
function docDengji(i) {
    var applyId = '';
    var urlApplyId = GetUrlParamString('applyId'),
        urlToken = GetUrlParamString('token');
    if (!IsEmpty(urlApplyId) && !IsEmpty(urlToken)) {
        applyId = urlApplyId;
        putData('token', urlToken);
        $(".pagination").eq(0).hide();
    }
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/getCurrenList',
            data: JSON.stringify({
                applyStatus: '5',
                token: getData("token"),
                pageNumber: 1,
                pageSize: 20,
                carryUser: "",
                inOutClass: i,
                applyId: applyId
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}

function relicListDengji(data, pageInfo, inOutClass) {
    for (var i = 0; i < data.length; i++) {
        var z = i + 1;
        var relicName = data[i].relicName;
        var relicType = data[i].relicTypeName;
        var relicYear = data[i].relicYear;
        var relicQuality = data[i].relicQualityName;
        var relicNumber = data[i].relicNumber;
        var relicSize = data[i].relicSize;
        var regStatusName = data[i].regStatusName;
        var remark = data[i].remark;
        var relicId = data[i].relicId;
        var regStatus = data[i].regStatus;
        if (regStatus == '2') {
            var regStatusText = '<button func-id="0101030101040800" class="btn btn-xs btn-primary btn-info register" style="margin:0 5px;" data-id="' + relicId + '">登记</button>';
            var active = '';
        } else {
            var regStatusText = '<button func-id="0101030101040800" class="btn btn-xs btn-primary btn-info register" style="margin:0 5px;" disabled data-id="' + relicId + '">已登记</button>';
            var active = 'success';
        };
        var yuqi = '';
        var danger = ""
        if (data[i].timeLimit == 1) {
            yuqi = '(已逾期)';
            danger = 'warning';
        }
        var button = data[i].isAlarm == 1 ? '<button func-id="0101030104010000" data-id="' + relicId + '" style="margin:0;padding:0" type="button" class="btn warnRelic btn-pure btn-warning icon wb-warning"></button>' : '';
        tr_html = [
            '<tr data-id="' + relicId + '" class="relicTurnColor ' + active + '">',
            '<td>' + button + (pageInfo.pageSize * (pageInfo.pageNumber - 1) + z) + '</td>',
            inOutClass != 3 ? '<td   class="detail cursorPointer" data-id="' + relicId + '">' + relicName + '</td>' : '<td  class="detail cursorPointer ' + danger + '" data-id="' + relicId + '">' + relicName + '' + yuqi + '</td>',
            '<td>' + relicSize + '</td>',
            '<td>' + relicQuality + '</td>',
            '<td>' + relicYear + '</td>',
            '<td class="operationFordengji"><button func-id="0101030101040600" class="btn btn-xs btn-warning deleteRelic" style="margin:0 5px;" data-id="' + relicId + '">删除</button>' +
            '<button func-id="0101030101040700" class="btn btn-xs btn-primary btn-info editRelic" style="margin:0 5px;" data-id="' + relicId + '">修改</button>' +
            regStatusText + '</td>',
            '</tr>'
        ].join("");
        $("#relicList").append(tr_html);
        $("#relicTotal").text('共' + pageInfo.total + '条')
    }
    relicTurnColor(5);
    relicListDetails(5);
}
//鉴定/查验
function docJianding(i) {
    var applyId = '';
    var urlApplyId = GetUrlParamString('applyId'),
        urlToken = GetUrlParamString('token');
    if (!IsEmpty(urlApplyId) && !IsEmpty(urlToken)) {
        applyId = urlApplyId;
        putData('token', urlToken);
        $(".pagination").eq(0).hide();
    }
    //需要分办所选的所有人全部提交方可通过鉴定
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/bannedApllyInfoList',
            data: JSON.stringify({
                applyStatus: '6',
                token: getData("token"),
                pageNumber: 1,
                pageSize: 20,
                carryUser: "",
                inOutClass: i,
                applyId: applyId
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}

function relicListJianding(data, pageInfo, inOutClass) {
    for (var i = 0; i < data.length; i++) {
        var z = i + 1;
        var relicName = data[i].relicName;
        var relicType = data[i].relicTypeName;
        var relicYear = data[i].relicYear;
        var relicQuality = data[i].relicQualityName;
        var relicNumber = data[i].relicNumber;
        var relicSize = data[i].relicSize;
        var regStatusName = data[i].regStatusName;
        var remark = data[i].remark;
        var relicId = data[i].relicId;
        var identityFlag = data[i].identityFlag;
        if (identityFlag == '2') {
            var regStatusText = '<button func-id="0101030101050200" class="btn btn-xs btn-primary btn-info editRelic" style="margin:0 5px;" data-id="' + relicId + '">鉴定</button>';
            var active = '';
        } else {
            var regStatusText = '<button func-id="0101030101050200" class="btn btn-xs btn-primary btn-info editRelic" style="margin:0 5px;" data-id="' + relicId + '">已鉴定</button>';
            var active = 'success';
        };
        var yuqi = '';
        var danger = ""
        if (data[i].timeLimit == 1) {
            yuqi = '(已逾期)';
            danger = 'warning';
        }
        var button = data[i].isAlarm == 1 ? '<button func-id="0101030104010000"  data-id="' + relicId + '" style="margin:0;padding:0" type="button" class="warnRelic btn btn-pure btn-warning icon wb-warning"></button>' : '';
        tr_html = [
            '<tr data-id="' + relicId + '" class="relicTurnColor ' + active + '">',
            '<td>' + button + (pageInfo.pageSize * (pageInfo.pageNumber - 1) + z) + '</td>',
            inOutClass != 3 ? '<td   class="detail cursorPointer" data-id="' + relicId + '">' + relicName + '</td>' : '<td  class="detail cursorPointer ' + danger + '" data-id="' + relicId + '">' + relicName + '' + yuqi + '</td>',
            '<td>' + relicSize + '</td>',
            '<td>' + relicQuality + '</td>',
            '<td>' + relicYear + '</td>',
            '<td class="operation">' + regStatusText + '</td>',
            '</tr>'
        ].join("");
        $("#relicList").append(tr_html);
        $("#relicTotal").text('共' + pageInfo.total + '条')

    }
    relicTurnColor(6);
    relicListDetails(6);
}
//审批
function docShenpi(i) {
    var applyId = '';
    var urlApplyId = GetUrlParamString('applyId'),
        urlToken = GetUrlParamString('token');

    if (!IsEmpty(urlApplyId) && !IsEmpty(urlToken)) {
        applyId = urlApplyId;
        putData('token', urlToken);
        $(".pagination").eq(0).hide();
    }
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/getApproveList',
            data: JSON.stringify({
                applyStatus: '8',
                token: getData("token"),
                pageNumber: 1,
                pageSize: 20,
                carryUser: "",
                inOutClass: i,
                applyId: applyId
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}

function relicListShenpi(data, pageInfo, inOutClass) {
    for (var i = 0; i < data.length; i++) {
        var z = i + 1;
        var relicName = data[i].relicName;
        var relicType = data[i].relicTypeName;
        var relicYear = data[i].relicYear;
        var relicQuality = data[i].relicQualityName;
        var relicNumber = data[i].relicNumber;
        var relicSize = data[i].relicSize;
        var regStatusName = data[i].regStatusName;
        var remark = data[i].remark;
        var relicId = data[i].relicId;
        var apprStatus = data[i].apprStatus;
        if (apprStatus == '2') {
            var regStatusText = '<button func-id="0101030101060500" class="btn btn-xs btn-primary btn-info editRelic" style="margin:0 5px;" data-id="' + relicId + '">审批</button>';
            var active = '';
        } else {
            var regStatusText = '<button func-id="0101030101060500" class="btn btn-xs btn-primary btn-info editRelic" style="margin:0 5px;" disabled data-id="' + relicId + '">已审批</button>';
            var active = 'success';
        };
        var yuqi = '';
        var danger = ""
        if (data[i].timeLimit == 1) {
            yuqi = '(已逾期)';
            danger = 'warning';
        }
        var button = data[i].isAlarm == 1 ? '<button func-id="0101030104010000"  data-id="' + relicId + '" style="margin:0;padding:0" type="button" class="warnRelic btn btn-pure btn-warning icon wb-warning"></button>' : '';
        tr_html = [
            '<tr data-id="' + relicId + '" class="relicTurnColor ' + active + '">',
            '<td>' + button + (pageInfo.pageSize * (pageInfo.pageNumber - 1) + z) + '</td>',
            inOutClass != 3 ? '<td   class="detail cursorPointer" data-id="' + relicId + '">' + relicName + '</td>' : '<td  class="detail cursorPointer ' + danger + '" data-id="' + relicId + '">' + relicName + '' + yuqi + '</td>',
            '<td>' + relicSize + '</td>',
            '<td>' + relicQuality + '</td>',
            '<td>' + relicYear + '</td>',
            '<td class="operation">' + regStatusText + '</td>',
            '</tr>'
        ].join("");
        $("#relicList").append(tr_html);
        $("#relicTotal").text('共' + pageInfo.total + '条')

    }
    relicTurnColor(8);
    relicListDetails(8);

}

//文物列表查看详情
function relicListDetails(applyStatus) {
    $(".detail").click(function () {
        var relicId = $(this).attr('data-id');
        $("#cmx-relic-modal").load(allRelicInfoModal, function () {
            $('#cmx-editrelicinfo').off('hidden.bs.modal');
            $('#cmx-editrelicinfo').on('hidden.bs.modal', function () {
                show56020img_flag = true;
            });
            $('#cmx-editrelicinfo').off('shown.bs.modal');
            $('#cmx-editrelicinfo').on('shown.bs.modal', function () {
                if(!show56020img_flag){
                    return;
                }
                var a = $('#relicListDiv').html();
                $('#cmx-relicList-left').append(a);
                $('#cmx-relicList-left .operationForShenqing').remove();
                $('#cmx-relicList-left .operationFordengji').remove();
                $('#cmx-relicList-left .operation').remove();

                relicListDetailsLoad(relicId, applyStatus)
                $('#cmx-relicList-left table>tbody tr').each(function () {
                    var relicIdLeft = $(this).attr('data-id');
                    $(this).unbind('click');
                    $(this).bind('click', function () {
                        $("#cmx-relicList-left table>tbody tr").each(function () {
                            if ((applyStatus == 5 || applyStatus == 6 || applyStatus == 8 || applyStatus == 9) && $(this).hasClass('success')) {
                                $(this).removeClass("info").css('color', 'white');
                            } else {
                                $(this).removeClass("info").css('color', '#76838f');
                            }
                        })
                        $(this).addClass("info").css('color', 'white');
                        relicListDetailsLoad(relicIdLeft, applyStatus)
                    });
                })
            });
            $(".closed").on("click", function () {
                $("#cmx-editrelicinfo").modal("hide");
            });
            $('#cmx-editrelicinfo').modal('show');
        });
    });
}

function relicListDetailsLoad(relicId, applyStatus) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrRelicInfo/getRelicByRelicId',
            data: JSON.stringify({
                token: getData('token'),
                relicId: relicId
            })
        })
        .turn(function (prevModelData, send, abort) {
            if (prevModelData.state == "200") {
                var data1 = prevModelData.data.dataList[0];
                $("#cmx-30-RelicName").val(data1.relicName)
                $("#cmx-30-RelicType").val(data1.relicTypeName)
                $("#cmx-30-RelicYear").val(data1.relicYear)
                $("#cmx-30-ScrRelicQuality").val(data1.relicQualityName)
                $("#cmx-30-RelicLevel").val(data1.relicLevelName)
                $("#cmx-30-RelicNumberInput").val(data1.relicNumber)
                $("#cmx-30-RelicNumberSelect").val(data1.relicUnitsName)
                $("#cmx-30-RelicSize").val(data1.relicSize)
                $("#cmx-30-Remark").val(data1.remark)
                if (applyStatus == 5) {
                    showRelicimg(data1.index, 1, relicId, data1.mainImg);
                    if (data1.regStatus == '1') {
                        $('#modal-foot').html('<button type="button " class="pull-right btn-sm btn btn-default cmx-cancle-btn closed " data-dismiss="modal" style="margin-right:10px; ">关闭</button><button disabled class="btn btn-sm btn-primary btn-info" style="margin:0 10px;">已登记</button>');
                    } else {
                        $('#modal-foot').html('<button type="button " class="pull-right btn-sm btn btn-default cmx-cancle-btn closed " data-dismiss="modal" style="margin-right:10px; ">关闭</button><button class="btn btn-sm btn-primary btn-info register" style="margin:0 10px;"  data-id="' + relicId + '">登记</button>');
                    }
                    // 登记
                    $(".register").off("click");
                    $(".register").on("click", function () {
                        var relicId = $(this).attr("data-id");
                        showAlert({
                            type: 'confirm', //success info warning error confirm input
                            content: '确定要登记该文物吗？',
                            delay: 2, //可选参数，单位秒，confirm和input下无效
                            btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                            btn_2: '确定', //可选参数，默认为取消
                            callback: function (_state) { //仅type为confirm下有效
                                console.log(_state); //_state可能是yes no cancel
                                if (_state == 'yes') {
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: api_ea + '/eaScrApplyInfo/confirmRegister',
                                            data: JSON.stringify({
                                                token: getData("token"),
                                                relicId: relicId,
                                                regStatus: 1
                                            })
                                        })
                                        .turn(function (prevModelData, noviewsend, abort) {
                                            if (prevModelData.state == "200") {
                                                showAlert({
                                                    type: "success",
                                                    content: "登记成功"
                                                });
                                                setTimeout(function () {
                                                    window.location.reload();
                                                }, 1500)
                                            } else {
                                                showAlert({
                                                    type: "error",
                                                    content: '请求失败'
                                                });
                                            }

                                        })
                                        .start();
                                }
                            }
                        })
                    });
                } else {
                    showRelicimg(data1.index);
                }
            } else {
                showAlert({
                    type: 'error',
                    content: prevModelData.msg
                })
            }
        })
        .start()
}

function relicListShenqing(data, pageInfo, applyStatus, inOutClass) {
    for (var i = 0; i < data.length; i++) {
        var z = i + 1;
        var relicName = data[i].relicName; //文物名称
        var relicType = data[i].relicTypeName; //类别
        var relicYear = data[i].relicYear; //年代
        var relicQuality = data[i].relicQualityName; //质地
        var relicNumber = data[i].relicNumber; //数量
        var relicSize = data[i].relicSize; //尺寸
        var regStatusName = data[i].regStatusName;
        var remark = data[i].remark; //备注
        var relicId = data[i].relicId;
        var applyId = data[i].applyId;
        var tr_html;
        var button = '';
        if (inOutClass != 3 && inOutClass != 5) {
            button = (applyStatus == 1 || applyStatus == "O" || applyStatus == "B") ? '<td class="operationForShenqing"><button func-id="0102381100000000"  class="btn btn-xs btn-warning deleteRelic" data-id="' + relicId + '">删除</button>' +
                '<button func-id="0102381000000000"  class="btn btn-xs btn-primary btn-info editRelic" data-applyId="' + applyId + '" data-id="' + relicId + '">修改</button>' +
                '</td>' : '<td class="operationForShenqing"><button func-id="0102381100000000"  class="btn btn-xs btn-warning disabled">删除</button>' +
                '<button func-id="0102381000000000"  class="btn btn-xs btn-primary disabled">修改</button>' +
                '</td>';
        }
        tr_html = [
            '<tr data-id="' + relicId + '" class="relicTurnColor">',
            '<td>' + (pageInfo.pageSize * (pageInfo.pageNumber - 1) + z) + '</td>',
            '<td class="detail cursorPointer" data-id="' + relicId + '">' + relicName + '</td>',
            '<td>' + relicSize + '</td>',
            '<td>' + relicQuality + '</td>',
            button,
            '<td>' + data[i].picSize + '</td>',
            '</tr>'
        ].join("");
        $("#relicList").append(tr_html);
        $("#relicTotal").text('共' + pageInfo.total + '条')
    }
    relicTurnColor();
    relicListDetails();
}

function relicListYuyue(data, pageInfo) {
    for (var i = 0; i < data.length; i++) {
        var z = i + 1;
        var relicName = data[i].relicName;
        var relicType = data[i].relicTypeName;
        var relicYear = data[i].relicYear;
        var relicQuality = data[i].relicQualityName;
        var relicNumber = data[i].relicNumber;
        var relicSize = data[i].relicSize;
        var regStatusName = data[i].regStatusName;
        var remark = data[i].remark;
        var relicId = data[i].relicId;
        var button = data[i].isAlarm == 1 ? '<i func-id="0101030104010000"  data-id="' + relicId + '" class="icon warnRelic wb-warning cursorPointer orange-600"></i>' : '';
        tr_html = [
            '<tr data-id="' + relicId + '" class="relicTurnColor">',
            '<td>' + button + (pageInfo.pageSize * (pageInfo.pageNumber - 1) + z) + '</td>',
            '<td   class="detail cursorPointer" data-id="' + relicId + '">' + relicName + '</td>',
            '<td>' + relicSize + '</td>',
            '<td>' + relicQuality + '</td>',
            '<td>' + relicYear + '</td>',
            '<td>' + relicType + '</td>',
            '</tr>'
        ].join("");
        $("#relicList").append(tr_html);
        $("#relicTotal").text('共' + pageInfo.total + '条')
    }
    relicTurnColor();
    relicListDetails();
}
//颜色变化
function relicTurnColor(applyStatus) {
    $('.relicTurnColor').each(function () {
        $(this).unbind('click');
        $(this).bind('click', function () {
            $(".relicTurnColor").each(function () {
                if ((applyStatus == 5 || applyStatus == 6 || applyStatus == 8 || applyStatus == 9) && $(this).hasClass('success')) {
                    $(this).removeClass("info").css('color', 'white');
                } else {
                    $(this).removeClass("info").css('color', '#76838f');
                }
            })
            $(this).addClass("info").css('color', 'white');
        });
    })
}