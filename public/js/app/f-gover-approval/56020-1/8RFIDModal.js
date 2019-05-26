var getRFIDRegistLabelModal = public_url + 'app/f-gover-approval/56020-1/include/rfid-registLabel-modal.html';
var getRFIDReadLabelModal = public_url + 'app/f-gover-approval/56020-1/include/rfid-readLabel-modal.html';
var getRFIDEmpowerModal = public_url + 'app/f-gover-approval/56020-1/include/rfid-empower-modal.html';
cmx.g.regist('rfid');
cmx.g.rfid = '';
//电子标签管理
var pageLeftParam = {
    pageNumber: 1,
    pageSize: 20
}
$('#search-btn').on('click', function () {
    pageLeftParam.carryUser = $("#carryUser").val();
    pageLeftParam.acceptNum = $("#acceptNum").val();
    pageLeftParam.rfidStatus = $("#rfidStatus").val();
    pageLeft(pageLeftParam);
})
$('#clear-search-form').on('click', function () {
    $("#carryUser").val('');
    $("#acceptNum").val('');
    $("#rfidStatus").val('');
    $("#applyClass").val('');
})
pageLeft(pageLeftParam);

function pageLeft(pageLeftParam) {
    pageLeftParam.token = getData("token");
    pageLeftParam.inOutClass = cmx.g.inOutClass;
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrRfidInfo/queryRfidManageList',
            data: JSON.stringify(pageLeftParam)
        })
        .turn(function (prevModelData, send, abort) {
            if (prevModelData.state == '200') {
                var data = prevModelData.data.dataList;
                // console.log(data);
                $("#cmx-dianzi-table").empty();

                for (var i = 0; i < data.length; i++) {
                    var html = '';
                    var applyId = data[i].applyId;
                    var des = '<td>' + data[i].destination + '</td>';
                    if (cmx.g.inOutClass == '2' || cmx.g.inOutClass == '3') {
                        des = (data[i].applyClassName == '1') ? '<td>' + data[i].destination + '</td>' : '<td>' + data[i].custPurposeName + '</td>';
                    }
                    html = ['<tr  class="exitList" data-id="' + applyId + '">',
                    (cmx.g.inOutClass == '2'||cmx.g.inOutClass == '5') ? "<td>"+data[i].turnDate+"</td>" : "",
                    '<td>' + data[i].customsId + '</td>',
                        des,
                    '<td>' + data[i].appUserName + '</td>',
                    '<td data-applyId="'+data[i].applyId+'" data-applyClass="'+data[i].applyClass+'" class="applyDetail cursorPointer">' + data[i].carryUser + '</td>',
                    '<td>' + data[i].flowStatus + '</td>',
                    '<td>' + data[i].rfidStatusName + '</td>',
                        '</tr>',
                        '<tr style="border-bottom: 2px solid #62a8ea;">',
                        '<td colspan="7" style="text-align: left;">',
                    '<button func-id="0101030101070100" data-id="' + applyId + '" class="btn btn-primary btn-xs rfid-submit">提交</button>',
                    '<span style="float: right;line-height: 31.4px;margin-right: 10px;">' + data[i].applyDate + '</span>',
                        '</td >',
                        '</tr >'].join('');
                    $("#cmx-dianzi-table").append(html);
                }
                showApplyDetail(cmx.g.inOutClass);
                // 设置pageSize
                cmx.g.pageSize = 20;
                // 默认第一条
                if (data.length > 0) {
                    var page = {
                        applyId: data[0].applyId,
                        pageNumber: 1,
                        pageSize: cmx.g.pageSize
                    }
                    pageRight(page);
                }
            }
            // 分页
            $("#left-count").val(prevModelData.data.pageNumber);
            $("#left-total").text(prevModelData.data.pages);
            $("#left-next").off("click");
            $("#left-next").on("click", function () {
                if (prevModelData.data.pageNumber == prevModelData.data.pages) {
                    showAlert({
                        type: "info",
                        content: "已经是最后一页"
                    })
                } else {
                    pageLeftParam.pageNumber = prevModelData.data.pageNumber + 1;
                    pageLeft(pageLeftParam);
                }
            });
            $("#left-prev").off("click");
            $("#left-prev").on("click", function () {
                if (prevModelData.data.pageNumber == 1) {
                    showAlert({
                        type: "info",
                        content: "已经是第一页"
                    })
                } else {
                    pageLeftParam.pageNumber = prevModelData.data.pageNumber - 1;
                    pageLeft(pageLeftParam);
                }
            });
            $("#left-last").off("click");
            $("#left-last").on("click", function () {
                pageLeftParam.pageNumber = prevModelData.data.pages;
                pageLeft(pageLeftParam);
            });
            $("#left-first").off("click");
            $("#left-first").on("click", function () {
                pageLeftParam.pageNumber = 1;
                pageLeft(pageLeftParam);
            });
            $("#left-count").off('blur');
            $("#left-count").blur(function () {
                var val = $(this).val();
                if (!isNaN(val)) {
                    if (val >= 1 && val <= prevModelData.data.pages) {
                        pageLeftParam.pageNumber = val;
                        pageLeft(pageLeftParam);
                    } else {
                        showAlert({
                            type: 'info',
                            content: "请输入有效数字"
                        })
                    }
                } else {
                    showAlert({
                        type: 'info',
                        content: "请输入有效数字"
                    })
                }
            });

            send.go();

        })
        .turn(function (prevModelData, send, abort) {
            //左右菜单关联
            $(".exitList").each(function (index) {
                $(this).unbind('click');
                $(this).bind('click', function () {
                    $(".exitList").each(function () {
                        $(this).removeClass("info");
                    })
                    $(this).addClass("info");
                    var page = {
                        applyId: $(this).attr('data-id'),
                        pageNumber: 1,
                        pageSize: cmx.g.pageSize
                    }
                    pageRight(page);
                });
            });
            $('.rfid-submit').off('click');
            $('.rfid-submit').on('click', function () {
                var dapplyId = $(this).attr('data-id');
                showAlert({
                    type: 'confirm',//success info warning error confirm input
                    content: '请确认文物已全部登记标签，如果提交，该事项无法退回，是否提交？',
                    // delay: 2,//可选参数，单位秒，confirm和input下无效
                    btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
                    btn_2: '确定',//可选参数，默认为取消
                    callback: function (_state) {//仅type为confirm下有效
                        // console.log(_state);//_state可能是yes no cancel
                        if (_state == 'yes') {
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + "/handSetInfo/applyComplete",
                                    data: {
                                        applyId: dapplyId
                                    },
                                    type: "GET"
                                })
                                .turn(function (prevModelData, send, abort) {
                                    if (prevModelData.state == '200') {
                                        showAlert({
                                            type: 'success',
                                            content: prevModelData.msg
                                        })
                                        setTimeout(function () {
                                            location.reload();
                                        }, 1000)
                                    } else {
                                        showAlert({
                                            type: 'error',
                                            content: prevModelData.msg
                                        })
                                    }
                                })
                                .start();
                        }
                    }
                })
            });
        })
        .start();
}
function pageRight(page) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
            data: JSON.stringify({
                applyId: page.applyId,
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
                token: getData("token")
            })
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (prevModelData.state == '200') {
                var data = prevModelData.data.dataList;
                var pageInfo = prevModelData.data;
                $("#relicList").empty();
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        var z = i + 1;
                        var tr_html;
                        var active = (data[i].handRegStatus == 1 || data[i].handRegStatus == 3) ? "success" : "";
                        var button = data[i].isAlarm == 1 ? '<button func-id="0101030104010000" data-id="' + data[i].relicId + '" style="margin:0;padding:0" type="button" class="warnRelic btn btn-pure btn-warning icon wb-warning"></button>' : '';
                        tr_html = [
                            '<tr data-id="'+data[i].relicId+'" class="relicTurnColor ' + active + '">',
                            '<td>' + button + (pageInfo.pageSize * (pageInfo.pageNumber - 1) + z) + '</td>',
                            '<td class="detail cursorPointer" data-id="' + data[i].relicId + '">' + data[i].relicName + '</td>',
                            '<td>' + data[i].relicSize + '</td>',
                            '<td>' + data[i].relicQualityName + '</td>',
                            '<td>' + data[i].relicYear + '</td>',
                            '<td class="operation"><button func-id="0101030101070200" data-applyId="' + page.applyId + '" data-relicId="' + data[i].relicId + '" class="btn btn-xs btn-primary registLabel">登记标签</button></td>',
                            '</tr>'
                        ].join("");
                        $("#relicList").append(tr_html);
                        $("#relicTotal").text('共' + pageInfo.total + '条')
                    }

                    if (data) {
                        var pageNumber = Number(pageInfo.pageNumber),
                            pageSize = Number(pageInfo.pageSize),
                            pages = pageInfo.pages;
                    } else {
                        var pageNumber = 1,
                            pageSize = cmx.g.pageSize,
                            pages = 1;
                    }
                    //设置pageSize
                    $('#selectRelicFews').change(function () {
                        var pageSize = $('#selectRelicFews').val();
                        cmx.g.pageSize = pageSize;
                        if (data.length > 0) {
                            var page = {
                                applyId: data[0].applyId,
                                pageNumber: 1,
                                pageSize: pageSize
                            }
                            pageRight(page);
                        }
                    })
                    $("#right-count").val(pageNumber);
                    $("#right-total").text(pages);
                    $("#right-next").off("click");
                    $("#right-next").on("click", function () {
                        if (pageNumber == pages) {
                            showAlert({
                                type: "info",
                                content: "已经是最后一页"
                            })
                        } else {
                            var page = {
                                pageNumber: pageNumber + 1,
                                pageSize: pageSize,
                                applyId: data[0].applyId
                            }
                            pageRight(page);
                        }
                    });
                    $("#right-prev").off("click");
                    $("#right-prev").on("click", function () {
                        if (pageNumber == 1) {
                            showAlert({
                                type: "info",
                                content: "已经是第一页"
                            })
                        } else {
                            var page = {
                                pageNumber: pageNumber - 1,
                                pageSize: pageSize,
                                applyId: data[0].applyId
                            }
                            pageRight(page);
                        }
                    });
                    $("#right-last").off("click");
                    $("#right-last").on("click", function () {
                        var page = {
                            pageNumber: pages,
                            pageSize: pageSize,
                            applyId: data[0].applyId
                        }
                        pageRight(page);
                    });
                    $("#right-first").off("click");
                    $("#right-first").on("click", function () {
                        var page = {
                            pageNumber: 1,
                            pageSize: pageSize,
                            applyId: data[0].applyId
                        }
                        pageRight(page);
                    });
                    $("#right-count").off('blur');
                    $("#right-count").blur(function () {
                        var val = $(this).val();
                        if (!isNaN(val)) {
                            if (val >= 1 && val <= pages) {
                                var page = {
                                    pageNumber: val,
                                    pageSize: pageSize,
                                    applyId: data[0].applyId
                                }
                                pageRight(page);
                            } else {
                                showAlert({
                                    type: 'info',
                                    content: "请输入有效数字"
                                })
                            }
                        } else {
                            showAlert({
                                type: 'info',
                                content: "请输入有效数字"
                            })
                        }
                    });
                }else {
                    $("#relicTotal").text('共0条')
                }
                send.tomodel(pageInfo).go();
            }
        })
        .turn(function (prevModelData, send, abort) {
            relicListDetails(9)
            relicTurnColor(9);
            warnRelic();
            send.go();
        })
        .turn(function (prevModelData, send, abort) {
            $('.registLabel').off('click');
            $('.registLabel').on('click', function () {
                var applyId = $(this).attr('data-applyId');
                var relicId = $(this).attr('data-relicId');
                var checkinOutClass = cmx.g.inOutClass;
                //加载登记标签框
                $("#cmx-registLabel-modal").load(getRFIDRegistLabelModal, function () {
                    $('#cmx-registLabel').off('show.bs.modal');
                    $('#cmx-registLabel').on('show.bs.modal', function () {
                        if (checkinOutClass == '3' || checkinOutClass == '5') {
                            $('#operatorButton').empty();
                            $('#operatorButton').html('<button  type="button" class="btn btn-sm readbt btn-warning">校验</button><button  type="button" id="empower"  class="btn btn-sm btn-warning">授权</button>');
                        }
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/handSetInfo/selectApplyAndRelic',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    applyId: applyId,
                                    relicId: relicId
                                })
                            })
                            .turn(function (prevModelData2, send, abort) {
                                if (prevModelData2.state == '200') {
                                    var dataAR = prevModelData2.data.dataList[0];
                                    console.log(dataAR);
                                    $('#reviewInstName').text(dataAR.reviewInstName);
                                    $('#customsId').text(dataAR.customsId);
                                    $('#applyUnit').text(dataAR.applyUnit);
                                    $('#manageUnit').text(dataAR.manageUnit);
                                    $('#address').text(dataAR.address);
                                    $('#leader').text(dataAR.leader);
                                    $('#carryUser').text(dataAR.carryUser);
                                    $('#relicName').text(dataAR.relicName);
                                    $('#relicYear').text(dataAR.relicYear);
                                    $('#relicQualityName').text(dataAR.relicQualityName);
                                    $('#relicLevelName').text(dataAR.relicLevelName);
                                    $('#relicSize').text(dataAR.relicSize);
                                    $('#relicNumber').text(dataAR.relicNumber + '件');
                                    $('#cultureCollec').text(dataAR.cultureCollec);
                                    $('#relicWidth').text(dataAR.relicWidth);
                                    $('#relicHeight').text(dataAR.relicHeight);
                                    $('#relicCaliber').text(dataAR.relicCaliber);
                                    $('#relicHeight').text(dataAR.relicHeight);
                                    $('#relicBottom').text(dataAR.relicBottom);
                                    $('#relicMicro').text(dataAR.relicMicro);
                                    $('#isRelicName').text(dataAR.isRelicName);
                                    $('#isAllowName').text(dataAR.isAllowName);
                                    $('#remark').text(dataAR.remark);
                                    $("#filelist-P00030").html(showRelicimg(dataAR.index));
                                } else {
                                    showAlert({
                                        type: 'error',
                                        content: prevModelData2.msg
                                    })
                                }
                                send.go();
                            })
                            .turn(function (prevModelData2, send, abort) {
                                $('#registLabelSave').off('click');
                                $('#registLabelSave').on('click', function () {
                                    var readAndCheckUrlSave = api_ea + '/handSetInfo/updateByRfid';
                                    if (checkinOutClass == '3' || checkinOutClass == '5') {
                                        readAndCheckUrlSave = api_ea + '/handSetInfo/tagCheck';
                                    }
                                    new cmx.process()
                                        .turn('callajax', {
                                            url: readAndCheckUrlSave,
                                            data: {
                                                rfid: cmx.g.rfid,
                                                relicId: relicId
                                            },
                                            type: "GET"
                                        })
                                        .turn(function (prevModelData2, send, abort) {
                                            if (prevModelData2.state == '200') {
                                                showAlert({
                                                    type: 'success',
                                                    content: '保存成功！'
                                                })
                                                setTimeout(function () {
                                                    $('#cmx-registLabel').modal('hide');
                                                }, 500)
                                            } else {
                                                showAlert({
                                                    type: 'error',
                                                    content: prevModelData2.msg
                                                })
                                            }
                                        })
                                        .start();
                                })
                            })
                            .start();
                        //读取标签与校验标签
                        $('.readbt').off('click');
                        $('.readbt').on('click', function () {
                            $("#cmx-readLabel-modal").load(getRFIDReadLabelModal, function () {
                                $('#cmx-readLabel').off('show.bs.modal');
                                $('#cmx-readLabel').on('show.bs.modal', function () {
                                    $('#cmx-registLabel').modal('hide');
                                    var readAndCheckUrl = api_ea + '/handSetInfo/updateByRfid';
                                    if (checkinOutClass == '3' || checkinOutClass == '5') {
                                        $('#readLabelButton').text('校验标签');
                                        readAndCheckUrl = api_ea + '/handSetInfo/tagCheck';
                                    }
                                    $('#readLabelSave').off('click');
                                    $('#readLabelSave').on('click', function () {
                                        new cmx.process()
                                            .turn('callajax', {
                                                url: readAndCheckUrl,
                                                data: {
                                                    rfid: $('#TextGetACard').val(),
                                                    relicId: relicId
                                                },
                                                type: "GET"
                                            })
                                            .turn(function (prevModelData2, send, abort) {
                                                if (prevModelData2.state == '200') {
                                                    showAlert({
                                                        type: 'success',
                                                        content: '保存成功！'
                                                    })
                                                    cmx.g.rfid = $('#TextGetACard').val();
                                                    setTimeout(function () {
                                                        $('#cmx-readLabel').modal('hide');
                                                        $('#cmx-registLabel').modal('hide');
                                                    }, 500)

                                                } else {
                                                    showAlert({
                                                        type: 'error',
                                                        content: prevModelData2.msg
                                                    })
                                                    cmx.g.rfid = '';
                                                }
                                            })
                                            .start();
                                    });
                                    $('#readLabelClear').off('click');
                                    $('#readLabelClear').on('click', function () {
                                        $('#TextGetACard').val('');
                                    });
                                })
                                $('#cmx-readLabel').modal('show');
                                $('#cmx-readLabel').on('hide.bs.modal', function () {
                                    $('#cmx-registLabel').modal('show');
                                })

                            })
                        });
                        //授权
                        $('#empower').off('click');
                        $('#empower').on('click', function () {
                            $("#cmx-readLabel-modal").load(getRFIDEmpowerModal, function () {
                                $('#cmx-empower').off('show.bs.modal');
                                $('#cmx-empower').on('show.bs.modal', function () {
                                    $('#cmx-registLabel').modal('hide');
                                    $('#empowerButton').off('click');
                                    $('#empowerButton').on('click', function () {
                                        if ($('#loginName').val().length < 1) {
                                            showAlert({
                                                type: 'info',
                                                content: '登录名不能为空！'
                                            })
                                        } else if ($('#password').val().length < 6) {
                                            showAlert({
                                                type: 'info',
                                                content: '密码最少为6位!'
                                            })
                                        } else {
                                            new cmx.process()
                                                .turn('callajax', {
                                                    url: api_aa + '/user/getUserInfoByJCRole',
                                                    data: {
                                                        userid: $('#loginName').val(),
                                                        password: md5($('#password').val()),
                                                        token: getData('token')
                                                    },
                                                    type: "GET"
                                                })
                                                .turn(function (prevModelData2, send, abort) {
                                                    if (prevModelData2.state == '200') {
                                                        showAlert({
                                                            type: 'success',
                                                            content: '授权成功！'
                                                        })
                                                        setTimeout(function () {
                                                            $('#cmx-empower').modal('hide');
                                                            $('#empower').text('已授权').attr('disabled', 'true');
                                                        }, 1000)

                                                    } else {
                                                        showAlert({
                                                            type: 'error',
                                                            content: prevModelData2.msg
                                                        })
                                                    }
                                                })
                                                .start();
                                        }
                                    });

                                })

                                $('#cmx-empower').modal('show');
                                $('#cmx-empower').on('hide.bs.modal', function () {
                                    $('#cmx-registLabel').modal('show');
                                })
                            })
                        });
                    });
                    $('#cmx-registLabel').modal('show');
                })
            })
        })
        .start();
}