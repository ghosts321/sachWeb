// $('.pagination li input').keyup(function () {
//     $(this).css('width', $(this).val().length * 10);
// });

cmx.g.regist('needToDoData', undefined);

cmx.g.regist('NationStatusStr', new HashMap());
cmx.g.NationStatusStr.put('101', '填报中');
cmx.g.NationStatusStr.put('201', '文书室处理中');
cmx.g.NationStatusStr.put('202', '司秘处理中');
cmx.g.NationStatusStr.put('203', '处领导处理中');
cmx.g.NationStatusStr.put('204', '处员处理中');
cmx.g.NationStatusStr.put('205', '专家处理中');
cmx.g.NationStatusStr.put('206', '司领导处理中（发文中）');
cmx.g.NationStatusStr.put('207', '局领导处理中（发文中）');
cmx.g.NationStatusStr.put('208', '文印室处理中（发文中）');
cmx.g.NationStatusStr.put('209', '公示中');
cmx.g.NationStatusStr.put('210', '办结');
cmx.g.NationStatusStr.put('212', '司领导处理中');
cmx.g.NationStatusStr.put('213', '处领导处理中（已受理）');
cmx.g.NationStatusStr.put('214', '处员处理中（已受理）');
cmx.g.NationStatusStr.put('215', '处领导处理中（转办）');
cmx.g.NationStatusStr.put('216', '处员处理中（转办）');
cmx.g.NationStatusStr.put('223', '处领导处理中（发文中）');
cmx.g.NationStatusStr.put('224', '处员处理中（发文中）');
cmx.g.NationStatusStr.put('225', '秘书处处理中（发文中）');
cmx.g.NationStatusStr.put('226', '文书室处理中（发文中）');
cmx.g.NationStatusStr.put('227', '文书室处理中（发文中）');
cmx.g.NationStatusStr.put('301', '国家局退回');
cmx.g.NationStatusStr.put('302', '国家局不予受理');
cmx.g.NationStatusStr.put('303', '退回');
cmx.g.NationStatusStr.put('304', '退回');
cmx.g.NationStatusStr.put('305', '退回');

cmx.g.NationStatusStr.put('401', '填报中');
cmx.g.NationStatusStr.put('501', '省局处理中');
cmx.g.NationStatusStr.put('502', '省局审核中');
cmx.g.NationStatusStr.put('503', '待报备');
cmx.g.NationStatusStr.put('504', '审批结束');
cmx.g.NationStatusStr.put('505', '省局退回');
cmx.g.NationStatusStr.put('601', '专家处理中');

cmx.g.NationStatusStr.put('499', '考古处处理中（已受理）'); //考古处处理中（已受理）
cmx.g.NationStatusStr.put('987', '考古处处理中'); //考古处处理中
cmx.g.NationStatusStr.put('701', '发掘资质单位处理中');
cmx.g.NationStatusStr.put('702', '省局处理中');
cmx.g.NationStatusStr.put('773', '待发执照'); //待发执照
cmx.g.NationStatusStr.put('776', '国局处理中（考古处转办）'); //考古处转办
cmx.g.NationStatusStr.put('777', '已下载'); //考古处虚拟账号已下载过excel
cmx.g.NationStatusStr.put('481', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('482', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('993', '国家局退回'); //考古处虚拟账号退回给申请领队  一次性补正
cmx.g.NationStatusStr.put('994', '国家局退回'); //考古处虚拟账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('497', '国家局退回'); //考古处虚拟账号退回给文书室 一次性补正
cmx.g.NationStatusStr.put('498', '国家局退回'); //考古处虚拟账号退回给文书室 不予受理
cmx.g.NationStatusStr.put('495', '国家局退回'); //考古处虚拟账号退回给司密 一次性补正
cmx.g.NationStatusStr.put('496', '国家局退回'); //考古处虚拟账号退回给司密 不予受理
cmx.g.NationStatusStr.put('493', '国家局退回'); //考古处虚拟账号退回给省局 一次性补正
cmx.g.NationStatusStr.put('494', '国家局退回'); //考古处虚拟账号退回给省局 不予受理
cmx.g.NationStatusStr.put('877', '国家局退回'); //司秘账号退回给文书室 一次性补正
cmx.g.NationStatusStr.put('878', '国家局退回'); //司秘账号退回给文书室 不予受理
cmx.g.NationStatusStr.put('879', '国家局退回'); //司秘账号退回给文书室 退回
cmx.g.NationStatusStr.put('874', '国家局退回'); //司秘账号退回给省局 一次性补正
cmx.g.NationStatusStr.put('876', '国家局退回'); //司秘账号退回给省局 不予受理
cmx.g.NationStatusStr.put('875', '国家局退回'); //司秘账号退回给省局 退回
cmx.g.NationStatusStr.put('883', '国家局退回'); //司秘账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('884', '国家局退回'); //司秘账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('885', '国家局退回'); //司秘账号退回给发掘资质单位 退回
cmx.g.NationStatusStr.put('887', '国家局退回'); //司秘账号退回给发掘申请领队 一次性补正
cmx.g.NationStatusStr.put('886', '国家局退回'); //司秘账号退回给发掘申请领队 不予受理
cmx.g.NationStatusStr.put('888', '国家局退回'); //司秘账号退回给发掘申请领队 退回
cmx.g.NationStatusStr.put('864', '国家局退回'); //文书室账号退回给省局 一次性补正
cmx.g.NationStatusStr.put('866', '国家局退回'); //文书室账号退回给省局 不予受理
cmx.g.NationStatusStr.put('865', '国家局退回'); //文书室账号退回给省局 退回
cmx.g.NationStatusStr.put('873', '国家局退回'); //文书室账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('872', '国家局退回'); //文书室账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('871', '国家局退回'); //文书室账号退回给发掘资质单位 退回
cmx.g.NationStatusStr.put('867', '国家局退回'); //文书室账号退回给申请领队 一次性补正
cmx.g.NationStatusStr.put('868', '国家局退回'); //文书室账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('869', '国家局退回'); //文书室账号退回给申请领队 退回
cmx.g.NationStatusStr.put('980', '省局退回'); //省局账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('982', '省局退回'); //省局账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('981', '省局退回'); //省局账号退回给发掘资质单位 退回
cmx.g.NationStatusStr.put('990', '省局退回'); //省局账号退回给申请领队 一次性补正
cmx.g.NationStatusStr.put('992', '省局退回'); //省局账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('991', '省局退回'); //省局账号退回给申请领队 退回
cmx.g.NationStatusStr.put('880', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 一次性补正
cmx.g.NationStatusStr.put('882', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('881', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 退回
cmx.g.NationStatusStr.put('999', '不同意发掘'); //同210也是办结状态，只是结果为不同意发掘

cmx.g.NationStatusStr.put('230', '文保处处理中');
cmx.g.NationStatusStr.put('231', '文保处处理中（已受理）');
cmx.g.NationStatusStr.put('232', '文保处处理中（发文中）');
cmx.g.NationStatusStr.put('250', '国家局委托第三方检查中');

var needFunc = {};
needFunc.pageNum = 1;
needFunc.pageCount = 0;
needFunc.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getNeedToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNo: needFunc.pageNum,
                pageSize: '6',
                statusArray: [],
                tdlFormData: [{
                    publishType: '-1' //工作台查全部，默认都是-1
                }],
            }),
            success: function (result) {
                console.log(result)
            },
            type: 'POST'
        })
        .turn('getneedToDoList', {})
        .start();
};

var needFunc2 = {};
needFunc2.pageNum = 1;
needFunc2.pageCount = 0;
needFunc2.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_im_getNeedToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNo: needFunc2.pageNum,
                pageSize: '6',
                statusArray: [],
                tdlFormData: [{
                    publishType: '-1' //工作台查全部，默认都是-1
                }],
            }),
            success: function (result) {
                console.log(result)
            },
            type: 'POST'
        })
        .turn('getneed2ToDoList', {})
        .start();
};

$(document).ready(function () {
    // 基于准备好的dom，初始化echarts实例
    //var myChart = echarts.init(document.getElementById('main'));
    // 使用刚指定的配置项和数据显示图表。
    //myChart.setOption(option);
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $("th:contains('编号')").parent().parent().parent().each(function () {
            if ($(this).is(':visible')) {
                $(this).addClass('resizetable table-bordered').resizableColumns();
            }
        });
    });
    $('#cmxGoverCheck-more').on('click', function (event) {
        window.location.href = '/app/f-gover-approval/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
    });
    $('#cmxGoverAll-more').on('click', function (event) {
        window.location.href = '/app/f-industry-integrated-manage/nation/country-needToDo.html?nowid=' + GetUrlParamString('nowid');
    });

    if(IsEmpty($('#nation-workbench-tasklist').html())){
        $('#nation-workbench-panel').remove();
    }else{
        $('#nation-workbench-tasklist').find('li').first().addClass('active');
        $('#nation-workbench-panel').find('.tab-pane').first().addClass('active');
    }

    new cmx.process()
        .turn('provinceNeedInit')
        .turn('provinceNeed2Init')
        .start();
    //     .turn('callajax', {
    //         url: api_ea + '/business/taskCount',
    //         data: JSON.stringify({
    //             token: getData('token'), //类型：String  必有字段  备注：无
    //         }),
    //         type: 'POST'
    //     })
    //     .turn(function (prevModelData, send, abort) {
    //         //to do 本周待办接口未做，先用总代办数
    //         var data = prevModelData.data;
    //         $('#cmx-province-count').html('<tr><td>' + data.taskListCount + '</td><td>' + data.haveToDoListCount + '</td></tr>'); //<td>' + data.taskListCount + '</td>
    //         send.go();
    //     })

    //
    var param1 = {
        pageNumber: 1,
        pageSize: 10,
        callback: function (total) {
            $('#cmx-phavePage1 .last').unbind('click');
            $('#cmx-phavePage1 .last').bind('click', function () {
                if (param1.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param1.pageNumber = total;
                    new cmx.process()
                        .turn('getPublicDisclosure1', param1)
                        .start();
                }
            });
            $('#cmx-phavePage1 .next').unbind('click');
            $('#cmx-phavePage1 .next').bind('click', function () {
                if (param1.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param1.pageNumber++;
                    new cmx.process()
                        .turn('getPublicDisclosure1', param1)
                        .start();
                }
            });

            $('#cmx-phavePage1 .jumppage').off('keydown');
            $('#cmx-phavePage1 .jumppage').on('keydown', function (event) {
                if (event.keyCode == 13) {
                    if ($('#cmx-phavePage1 .jumppage').val() <= total) {
                        param1.pageNumber = $('#cmx-phavePage1 .jumppage').val();
                        new cmx.process()
                            .turn('getPublicDisclosure1', param1)
                            .start();
                    }
                }
            });
        }
    }
    $('#cmx-phavePage1 .first').unbind('click');
    $('#cmx-phavePage1 .first').bind('click', function () {
        if (param1.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param1.pageNumber = 1;
            new cmx.process()
                .turn('getPublicDisclosure1', param1)
                .start();
        }

    });
    $('#cmx-phavePage1 .pre').unbind('click');
    $('#cmx-phavePage1 .pre').bind('click', function () {
        if (param1.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param1.pageNumber--;
            new cmx.process()
                .turn('getPublicDisclosure1', param1)
                .start();
        }
    });

    var param2 = {
        pageNumber: 1,
        pageSize: 10,
        callback: function (total) {
            $('#cmx-phavePage2 .last').unbind('click');
            $('#cmx-phavePage2 .last').bind('click', function () {
                if (param2.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param2.pageNumber = total;
                    new cmx.process()
                        .turn('getPublicDisclosure2', param2)
                        .start();
                }
            });
            $('#cmx-phavePage2 .next').unbind('click');
            $('#cmx-phavePage2 .next').bind('click', function () {
                if (param2.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param2.pageNumber++;
                    new cmx.process()
                        .turn('getPublicDisclosure2', param2)
                        .start();
                }
            });

            $('#cmx-phavePage2 .jumppage').off('keydown');
            $('#cmx-phavePage2 .jumppage').on('keydown', function (event) {
                if (event.keyCode == 13) {
                    if ($('#cmx-phavePage2 .jumppage').val() <= total) {
                        param2.pageNumber = $('#cmx-phavePage2 .jumppage').val();
                        new cmx.process()
                            .turn('getPublicDisclosure2', param2)
                            .start();
                    }
                }
            });
        }
    }
    $('#cmx-phavePage2 .first').unbind('click');
    $('#cmx-phavePage2 .first').bind('click', function () {
        if (param2.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param2.pageNumber = 1;
            new cmx.process()
                .turn('getPublicDisclosure2', param2)
                .start();
        }

    });
    $('#cmx-phavePage2 .pre').unbind('click');
    $('#cmx-phavePage2 .pre').bind('click', function () {
        if (param2.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param2.pageNumber--;
            new cmx.process()
                .turn('getPublicDisclosure2', param2)
                .start();
        }
    });

    var param3 = {
        pageNumber: 1,
        pageSize: 10,
        callback: function (total) {
            $('#cmx-phavePage3 .last').unbind('click');
            $('#cmx-phavePage3 .last').bind('click', function () {
                if (param3.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param3.pageNumber = total;
                    new cmx.process()
                        .turn('getPublicDisclosure3', param3)
                        .start();
                }
            });
            $('#cmx-phavePage3 .next').unbind('click');
            $('#cmx-phavePage3 .next').bind('click', function () {
                if (param3.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param3.pageNumber++;
                    new cmx.process()
                        .turn('getPublicDisclosure3', param3)
                        .start();
                }
            });

            $('#cmx-phavePage3 .jumppage').off('keydown');
            $('#cmx-phavePage3 .jumppage').on('keydown', function (event) {
                if (event.keyCode == 13) {
                    if ($('#cmx-phavePage3 .jumppage').val() <= total) {
                        param3.pageNumber = $('#cmx-phavePage3 .jumppage').val();
                        new cmx.process()
                            .turn('getPublicDisclosure3', param3)
                            .start();
                    }
                }
            });
        }
    }
    $('#cmx-phavePage3 .first').unbind('click');
    $('#cmx-phavePage3 .first').bind('click', function () {
        if (param3.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param3.pageNumber = 1;
            new cmx.process()
                .turn('getPublicDisclosure3', param3)
                .start();
        }
    });
    $('#cmx-phavePage3 .pre').unbind('click');
    $('#cmx-phavePage3 .pre').bind('click', function () {
        if (param3.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param3.pageNumber--;
            new cmx.process()
                .turn('getPublicDisclosure3', param3)
                .start();
        }
    });

    var param4 = {
        pageNumber: 1,
        pageSize: 10,
        callback: function (total) {
            $('#cmx-phavePage4 .last').unbind('click');
            $('#cmx-phavePage4 .last').bind('click', function () {
                if (param4.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param4.pageNumber = total;
                    new cmx.process()
                        .turn('getPublicDisclosure4', param4)
                        .start();
                }

            });
            $('#cmx-phavePage4 .next').unbind('click');
            $('#cmx-phavePage4 .next').bind('click', function () {
                if (param4.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param4.pageNumber++;
                    new cmx.process()
                        .turn('getPublicDisclosure4', param4)
                        .start();
                }
            });

            $('#cmx-phavePage4 .jumppage').off('keydown');
            $('#cmx-phavePage4 .jumppage').on('keydown', function (event) {
                if (event.keyCode == 13) {
                    if ($('#cmx-phavePage4 .jumppage').val() <= total) {
                        param4.pageNumber = $('#cmx-phavePage4 .jumppage').val();
                        new cmx.process()
                            .turn('getPublicDisclosure4', param4)
                            .start();
                    }
                }
            });
        }
    }
    $('#cmx-phavePage4 .first').unbind('click');
    $('#cmx-phavePage4 .first').bind('click', function () {
        if (param4.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param4.pageNumber = 1;
            new cmx.process()
                .turn('getPublicDisclosure4', param4)
                .start();
        }
    });
    $('#cmx-phavePage4 .pre').unbind('click');
    $('#cmx-phavePage4 .pre').bind('click', function () {
        if (param4.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param4.pageNumber--;
            new cmx.process()
                .turn('getPublicDisclosure4', param4)
                .start();
        }
    });
    new cmx.process()
        .turn('getPublicDisclosure1', param1)
        .turn('getPublicDisclosure2', param2)
        .turn('getPublicDisclosure3', param3)
        .turn('getPublicDisclosure4', param4)
        .start();
});

//1-公示栏
cmx.route.model({
    index: 'getPublicDisclosure1',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubBatchFile/getPageDataForPublic',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pageNumber: parameter.pageNumber,
                    pageSize: parameter.pageSize,
                    sourceflag: "1"
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    var data = prevModelData.data.dataList;
                    for (var i = 0; i < data.length; i++) {
                        html = html + [
                            '<a class="list-group-item" href="javascript:void(0);" onclick="beforeDownloadThisFile(\'' + data[i].flowType + '\',\'' + data[i].flowNumber + '\');">',
                            '<h3 class="list-group-item-heading">' + data[i].proTitle + '</h3>',
                            '<p class="list-group-item-text">报送单位：' + data[i].mainSend + '&nbsp;&nbsp;公开类型：' + data[i].openShapeName,
                            '<p class="list-group-item-text">受理部门：' + data[i].isTheUnitSName + '' + data[i].isTheUnitName + '&nbsp;&nbsp;拟稿人：' + data[i].isThePerson + '&nbsp;&nbsp;签发时间：' + data[i].singTime + '</p>',
                            '<p class="list-group-item-text pull-right">公开时间：' + data[i].sendDate + '&nbsp;&nbsp;剩余公示天数：<span style="color:red;">' + data[i].publicLeftDays + '天</span></p>',
                            '<div class="clearfix"></div>',
                            '</a>'
                        ].join('');
                    }
                    $('#cmxPublicity').html(html);
                    parameter.callback(prevModelData.data.pages);
                    $('#cmx-phavePage1 .nowpage').text(prevModelData.data.pageNumber);
                    $('#cmx-phavePage1 .jumppage').val(prevModelData.data.pageNumber);
                    $('#cmx-phavePage1 .totalpage').text(prevModelData.data.pages);
                }
            })
            .start();
        send.go();
    }
});
//公开栏（主动公开）
cmx.route.model({
    index: 'getPublicDisclosure2',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubBatchFile/getPageDataForPublic',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pageNumber: parameter.pageNumber,
                    pageSize: parameter.pageSize,
                    sourceflag: "2"
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var data = prevModelData.data.dataList;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html = html + [
                            '<tr>',
                            '<td>' + ((IsNull(data[i].refNumber)) ? '' : data[i].refNumber) + '</td>',
                            '<td>' + ((IsNull(data[i].isTheUnitSName) ? '' : data[i].isTheUnitSName)) + '</td>',
                            '<td><a href="javascript:showPublicDeatil(\'' + data[i].batchId + '\')">' + ((IsNull(data[i].proTitle) ? '' : data[i].proTitle)) + '</a></td>',
                            '<td>' + ((IsNull(data[i].paperTypeName) ? '' : data[i].paperTypeName)) + '</td>',
                            '<td>' + ((IsNull(data[i].shapeCodeName) ? '' : data[i].shapeCodeName)) + '</td>',
                            '<td>' + ((IsNull(data[i].packageTime) ? '' : data[i].packageTime)) + '</td>',
                            '</tr>'
                        ].join("");
                    }
                    $('#cmxProactiveDisclosure tbody').html(html);
                    parameter.callback(prevModelData.data.pages);
                    $('#cmx-phavePage2 .nowpage').text(prevModelData.data.pageNumber);
                    $('#cmx-phavePage2 .jumppage').val(prevModelData.data.pageNumber);
                    $('#cmx-phavePage2 .totalpage').text(prevModelData.data.pages);
                }
            })
            .start();
        send.go();

    }
});
//3-公示栏（依申请动公开）
cmx.route.model({
    index: 'getPublicDisclosure3',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubBatchFile/getPageDataForPublic',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pageNumber: parameter.pageNumber,
                    pageSize: parameter.pageSize,
                    sourceflag: "3"
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var data = prevModelData.data.dataList;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html = html + [
                            '<tr>',
                            '<td>' + ((IsNull(data[i].refNumber)) ? '' : data[i].refNumber) + '</td>',
                            '<td>' + ((IsNull(data[i].isTheUnitSName) ? '' : data[i].isTheUnitSName)) + '</td>',
                            '<td><a href="javascript:showPublicDeatil(\'' + data[i].batchId + '\')">' + ((IsNull(data[i].proTitle) ? '' : data[i].proTitle)) + '</a></td>',
                            '<td>' + ((IsNull(data[i].paperTypeName) ? '' : data[i].paperTypeName)) + '</td>',
                            '<td>' + ((IsNull(data[i].shapeCodeName) ? '' : data[i].shapeCodeName)) + '</td>',
                            '<td>' + ((IsNull(data[i].packageTime) ? '' : data[i].packageTime)) + '</td>',
                            '</tr>'
                        ].join("");
                    }
                    $('#cmxNotPublic tbody').html(html);
                    parameter.callback(prevModelData.data.pages);
                    $('#cmx-phavePage3 .nowpage').text(prevModelData.data.pageNumber);
                    $('#cmx-phavePage3 .jumppage').val(prevModelData.data.pageNumber);
                    $('#cmx-phavePage3 .totalpage').text(prevModelData.data.pages);
                }
            })
            .start();
        send.go();
    }
});
//4-公示栏（不公开）
cmx.route.model({
    index: 'getPublicDisclosure4',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubBatchFile/getPageDataForPublic',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pageNumber: parameter.pageNumber,
                    pageSize: parameter.pageSize,
                    sourceflag: "4"
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var data = prevModelData.data.dataList;
                    var html = '';
                    for (var i = 0; i < data.length; i++) {
                        html = html + [
                            '<tr>',
                            '<td>' + ((IsNull(data[i].refNumber)) ? '' : data[i].refNumber) + '</td>',
                            '<td>' + ((IsNull(data[i].isTheUnitSName) ? '' : data[i].isTheUnitSName)) + '</td>',
                            '<td><a href="javascript:showPublicDeatil(\'' + data[i].batchId + '\')">' + ((IsNull(data[i].proTitle) ? '' : data[i].proTitle)) + '</a></td>',
                            '<td>' + ((IsNull(data[i].paperTypeName) ? '' : data[i].paperTypeName)) + '</td>',
                            '<td>' + ((IsNull(data[i].shapeCodeName) ? '' : data[i].shapeCodeName)) + '</td>',
                            '<td>' + ((IsNull(data[i].packageTime) ? '' : data[i].packageTime)) + '</td>',
                            '</tr>'
                        ].join("");
                    }
                    $('#cmxApplyPublic tbody').html(html);
                    parameter.callback(prevModelData.data.pages);
                    $('#cmx-phavePage4 .nowpage').text(prevModelData.data.pageNumber);
                    $('#cmx-phavePage4 .jumppage').val(prevModelData.data.pageNumber);
                    $('#cmx-phavePage4 .totalpage').text(prevModelData.data.pages);
                }
            })
            .start();
        send.go();
    }
});

cmx.route.model({
    index: 'getneedToDoList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});

cmx.route.model({
    index: 'getneed2ToDoList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});
cmx.route.view({
    index: 'getneedToDoList',
    resolve: function (result) {
        // console.log(result);
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        console.log(data);
        cmx.g.needToDoData = data;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-ntd-tbody").html('');
        for (var i = 0; i < data.length; i++) {
            var tbody_html = '';
            // console.log(data[i].proFileTitle)
            // var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
            var workDays = IsEmpty(data[i].workDay) ? 9999 : data[i].workDay;
            var workDaysColor = 'badge-default';
            if (workDays <= 5) {
                workDaysColor = 'badge-danger';
            } else if (workDays <= 10) {
                workDaysColor = 'badge-warning';
            } else if (workDays < 40) {
                workDaysColor = 'badge-success';
            }
            tbody_html = ['<tr>',
                ' <td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + data[i].proFileTitle + '</td>',
                '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>',
                '<td>' + (IsEmpty(data[i].receivedTime) ? '无' : data[i].receivedTime) + '</td>',
                '<td><span class="badge badge-radius ' + workDaysColor + '">' + ((IsEmpty(data[i].workDay) || data[i].applyStepFlag == '3') ? '无' : data[i].workDay + '天') + '</span></td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-ntd-tbody").append(tbody_html);
        }
        $('#cmx-pneedPage .nowpage').html(pageNumber);
        $('#cmx-pneedPage .jumppage').val(pageNumber);
        $('#cmx-pneedPage .totalpage').html(param.pages);
        needFunc.pageCount = param.pages;

        $("#cmx-ntd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-ntd-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                new cmx.process()
                    .turn('jumpToApply', {
                        index: index,
                        data: cmx.g.needToDoData,
                        isUse: true
                    }).start();
            });
        });

    },
    reject: function (data) {

    }
});
cmx.route.view({
    index: 'getneed2ToDoList',
    resolve: function (result) {
        // console.log(result);
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        console.log(data);
        //cmx.g.needToDoData = data;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-ntd-tbody-all").html('');
        for (var i = 0; i < data.length; i++) {
            var tbody_html = '';
            // console.log(data[i].proFileTitle)
            // var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
            var workDays = IsEmpty(data[i].workDay) ? 9999 : data[i].workDay;
            var workDaysColor = 'badge-default';
            if (workDays <= 5) {
                workDaysColor = 'badge-danger';
            } else if (workDays <= 10) {
                workDaysColor = 'badge-warning';
            } else if (workDays < 40) {
                workDaysColor = 'badge-success';
            }
            tbody_html = ['<tr>',
                ' <td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + data[i].proFileTitle + '</td>',
                '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>',
                '<td>' + (IsEmpty(data[i].receivedTime) ? '无' : data[i].receivedTime) + '</td>',
                '<td><span class="badge badge-radius ' + workDaysColor + '">' + (IsEmpty(data[i].workDay) ? '无' : data[i].workDay + '天') + '</span></td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-ntd-tbody-all").append(tbody_html);
        }
        $('#cmx-pneedPage-all .nowpage').html(pageNumber);
        $('#cmx-pneedPage-all .jumppage').val(pageNumber);
        $('#cmx-pneedPage-all .totalpage').html(param.pages);
        needFunc2.pageCount = param.pages;

        $("#cmx-ntd-tbody-all tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-ntd-tbody-all tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                new cmx.process()
                    .turn('jumpToApply', {
                        index: index,
                        data: data,
                        isUse: true
                    }).start();
            });
        });

    },
    reject: function (data) {

    }
});
cmx.route.model({
    index: 'provinceNeedInit',
    handle: function (parameter, prevModelData, send, abort) {
        needFunc.getNeedToDo();
        $('#cmx-pneedPage .first').unbind('click');
        $('#cmx-pneedPage .first').bind('click', function () {
            needFunc.pageNum = 1;
            needFunc.getNeedToDo();
        });
        $('#cmx-pneedPage .last').unbind('click');
        $('#cmx-pneedPage .last').bind('click', function () {
            needFunc.pageNum = needFunc.pageCount;
            needFunc.getNeedToDo();
        });
        $('#cmx-pneedPage .pre').unbind('click');
        $('#cmx-pneedPage .pre').bind('click', function () {
            if (needFunc.pageNum > 1) {
                needFunc.pageNum--;
                needFunc.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-pneedPage .next').unbind('click');
        $('#cmx-pneedPage .next').bind('click', function () {
            if (needFunc.pageNum < needFunc.pageCount) {
                needFunc.pageNum++;
                needFunc.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });

        $('#cmx-pneedPage .jumppage').off('keydown');
        $('#cmx-pneedPage .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage .jumppage').val() <= needFunc.pageCount) {
                    needFunc.pageNum = $('#cmx-pneedPage .jumppage').val();
                    needFunc.getNeedToDo();
                }
            }
        });
        send.go();
    }
});

cmx.route.model({
    index: 'provinceNeed2Init',
    handle: function (parameter, prevModelData, send, abort) {
        needFunc2.getNeedToDo();
        $('#cmx-pneedPage-all .first').unbind('click');
        $('#cmx-pneedPage-all .first').bind('click', function () {
            needFunc2.pageNum = 1;
            needFunc2.getNeedToDo();
        });
        $('#cmx-pneedPage-all .last').unbind('click');
        $('#cmx-pneedPage-all .last').bind('click', function () {
            needFunc2.pageNum = needFunc2.pageCount;
            needFunc2.getNeedToDo();
        });
        $('#cmx-pneedPage-all .pre').unbind('click');
        $('#cmx-pneedPage-all .pre').bind('click', function () {
            if (needFunc2.pageNum > 1) {
                needFunc2.pageNum--;
                needFunc2.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-pneedPage-all .next').unbind('click');
        $('#cmx-pneedPage-all .next').bind('click', function () {
            if (needFunc2.pageNum < needFunc2.pageCount) {
                needFunc2.pageNum++;
                needFunc2.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });

        $('#cmx-pneedPage-all .jumppage').off('keydown');
        $('#cmx-pneedPage-all .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage-all .jumppage').val() <= needFunc2.pageCount) {
                    needFunc2.pageNum = $('#cmx-pneedPage-all .jumppage').val();
                    needFunc2.getNeedToDo();
                }
            }
        });
        send.go();
    }
});


cmx.route.model({
    index: 'projectNumByUserInit',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});

function showPublicDeatil(batchId) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubBatchFile/getEntityByBatchID',
            data: JSON.stringify({
                token: getData('token'),
                batchId: batchId
            }),
            success: function (result) {
                console.log(result);
            },
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            var data = prevModelData.data;
            $("#gongkaiModal").off('hide.bs.modal');
            $("#gongkaiModal").off('show.bs.modal');
            $("#gongkaiModal").on('show.bs.modal', function () {
                $('#cmx-detail-title').html(data.proTitle);
                $('#cmx-detail-content').html('<span style="cursor: pointer;color: #358fe4;" onclick="javascript:window.open(\'' + api_dm + '/DmFileInfoController/downloadFile?fileIndex=' + data.contextFile.fileIndex + '\')">点击下载：' + data.contextFile.fileName + '</span>');
                $('#cmx-detail-person').html(data.isThePerson);
                $('#cmx-public-time').html(data.singTime);
                $('#cmx-detail-file').html('');
            });
            $("#gongkaiModal").on('hide.bs.modal', function () {

            });
            $("#gongkaiModal").modal('show');
        })
        .start();
}