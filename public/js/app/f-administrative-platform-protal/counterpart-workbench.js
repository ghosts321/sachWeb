// $('.part1 .pagination li input').keyup(function () {
//     $(this).css('width', $(this).val().length * 10);
// })
cmx.g.regist('needToDoData', undefined);
cmx.g.regist('CounterpartstatusStr', new HashMap());
cmx.g.CounterpartstatusStr.put('101', '填报中');
cmx.g.CounterpartstatusStr.put('201', '国家局处理中');
cmx.g.CounterpartstatusStr.put('202', '国家局处理中');
cmx.g.CounterpartstatusStr.put('203', '国家局处理中');
cmx.g.CounterpartstatusStr.put('204', '国家局处理中');
cmx.g.CounterpartstatusStr.put('205', '专家处理中');
cmx.g.CounterpartstatusStr.put('206', '国家局处理中');
cmx.g.CounterpartstatusStr.put('207', '国家局处理中');
cmx.g.CounterpartstatusStr.put('208', '国家局处理中');
cmx.g.CounterpartstatusStr.put('209', '国家局处理中');
cmx.g.CounterpartstatusStr.put('210', '审批结束');
cmx.g.CounterpartstatusStr.put('213', '国家局处理中');
cmx.g.CounterpartstatusStr.put('214', '国家局处理中');
cmx.g.CounterpartstatusStr.put('223', '国家局处理中');
cmx.g.CounterpartstatusStr.put('224', '国家局处理中');
cmx.g.CounterpartstatusStr.put('225', '国家局处理中');
cmx.g.CounterpartstatusStr.put('226', '国家局处理中');
cmx.g.CounterpartstatusStr.put('301', '国家局退回');
cmx.g.CounterpartstatusStr.put('302', '国家局退回');
cmx.g.CounterpartstatusStr.put('303', '国家局处理中');
cmx.g.CounterpartstatusStr.put('304', '国家局处理中');
cmx.g.CounterpartstatusStr.put('305', '国家局处理中');

cmx.g.CounterpartstatusStr.put('401', '填报中');
cmx.g.CounterpartstatusStr.put('501', '省局处理中');
cmx.g.CounterpartstatusStr.put('502', '省局审核中');
cmx.g.CounterpartstatusStr.put('503', '待报备');
cmx.g.CounterpartstatusStr.put('504', '审批结束');
cmx.g.CounterpartstatusStr.put('505', '省局退回');
cmx.g.CounterpartstatusStr.put('601', '专家处理中');

cmx.g.CounterpartstatusStr.put('701', '发掘资质单位处理中');
cmx.g.CounterpartstatusStr.put('881', '发掘资质单位退回中');
cmx.g.CounterpartstatusStr.put('987', '国家局处理中');//考古处处理中
cmx.g.CounterpartstatusStr.put('981', '省局退回');
cmx.g.CounterpartstatusStr.put('499', '国家局处理中');//考古处处理中（已受理）
cmx.g.CounterpartstatusStr.put('987', '国家局处理中');//考古处处理中
cmx.g.CounterpartstatusStr.put('701', '发掘资质单位处理中');
cmx.g.CounterpartstatusStr.put('702', '省局处理中');
cmx.g.CounterpartstatusStr.put('773', '国家局处理中');//待发执照
cmx.g.CounterpartstatusStr.put('776', '国家局处理中');//考古处转办
cmx.g.CounterpartstatusStr.put('777', '国家局处理中');//考古处虚拟账号已下载过excel
cmx.g.CounterpartstatusStr.put('481', '国家局退回');//考古处虚拟账号退回给发掘资质单位 一次性补正
cmx.g.CounterpartstatusStr.put('482', '国家局退回');//考古处虚拟账号退回给发掘资质单位 不予受理
cmx.g.CounterpartstatusStr.put('993', '国家局退回');//考古处虚拟账号退回给申请领队  一次性补正
cmx.g.CounterpartstatusStr.put('994', '国家局退回');//考古处虚拟账号退回给申请领队 不予受理
cmx.g.CounterpartstatusStr.put('497', '国家局退回');//考古处虚拟账号退回给文书室 一次性补正
cmx.g.CounterpartstatusStr.put('498', '国家局退回');//考古处虚拟账号退回给文书室 不予受理
cmx.g.CounterpartstatusStr.put('495', '国家局退回');//考古处虚拟账号退回给司密 一次性补正
cmx.g.CounterpartstatusStr.put('496', '国家局退回');//考古处虚拟账号退回给司密 不予受理
cmx.g.CounterpartstatusStr.put('493', '国家局退回');//考古处虚拟账号退回给省局 一次性补正
cmx.g.CounterpartstatusStr.put('494', '国家局退回');//考古处虚拟账号退回给省局 不予受理
cmx.g.CounterpartstatusStr.put('877', '国家局退回');//司秘账号退回给文书室 一次性补正
cmx.g.CounterpartstatusStr.put('878', '国家局退回');//司秘账号退回给文书室 不予受理
cmx.g.CounterpartstatusStr.put('879', '国家局退回');//司秘账号退回给文书室 退回
cmx.g.CounterpartstatusStr.put('874', '国家局退回');//司秘账号退回给省局 一次性补正
cmx.g.CounterpartstatusStr.put('876', '国家局退回');//司秘账号退回给省局 不予受理
cmx.g.CounterpartstatusStr.put('875', '国家局退回');//司秘账号退回给省局 退回
cmx.g.CounterpartstatusStr.put('883', '国家局退回');//司秘账号退回给发掘资质单位 一次性补正
cmx.g.CounterpartstatusStr.put('884', '国家局退回');//司秘账号退回给发掘资质单位 不予受理
cmx.g.CounterpartstatusStr.put('885', '国家局退回');//司秘账号退回给发掘资质单位 退回
cmx.g.CounterpartstatusStr.put('887', '国家局退回');//司秘账号退回给发掘申请领队 一次性补正
cmx.g.CounterpartstatusStr.put('886', '国家局退回');//司秘账号退回给发掘申请领队 不予受理
cmx.g.CounterpartstatusStr.put('888', '国家局退回');//司秘账号退回给发掘申请领队 退回
cmx.g.CounterpartstatusStr.put('864', '国家局退回');//文书室账号退回给省局 一次性补正
cmx.g.CounterpartstatusStr.put('866', '国家局退回');//文书室账号退回给省局 不予受理
cmx.g.CounterpartstatusStr.put('865', '国家局退回');//文书室账号退回给省局 退回
cmx.g.CounterpartstatusStr.put('873', '国家局退回');//文书室账号退回给发掘资质单位 一次性补正
cmx.g.CounterpartstatusStr.put('872', '国家局退回');//文书室账号退回给发掘资质单位 不予受理
cmx.g.CounterpartstatusStr.put('871', '国家局退回');//文书室账号退回给发掘资质单位 退回
cmx.g.CounterpartstatusStr.put('867', '国家局退回');//文书室账号退回给申请领队 一次性补正
cmx.g.CounterpartstatusStr.put('868', '国家局退回');//文书室账号退回给申请领队 不予受理
cmx.g.CounterpartstatusStr.put('869', '国家局退回');//文书室账号退回给申请领队 退回
cmx.g.CounterpartstatusStr.put('980', '省局退回');//省局账号退回给发掘资质单位 一次性补正
cmx.g.CounterpartstatusStr.put('982', '省局退回');//省局账号退回给发掘资质单位 不予受理
cmx.g.CounterpartstatusStr.put('981', '省局退回');//省局账号退回给发掘资质单位 退回
cmx.g.CounterpartstatusStr.put('990', '省局退回');//省局账号退回给申请领队 一次性补正
cmx.g.CounterpartstatusStr.put('992', '省局退回');//省局账号退回给申请领队 不予受理
cmx.g.CounterpartstatusStr.put('991', '省局退回');//省局账号退回给申请领队 退回
cmx.g.CounterpartstatusStr.put('880', '发掘资质单位退回');//发掘资质单位账号退回给申请领队 一次性补正
cmx.g.CounterpartstatusStr.put('882', '发掘资质单位退回');//发掘资质单位账号退回给申请领队 不予受理
cmx.g.CounterpartstatusStr.put('881', '发掘资质单位退回');//发掘资质单位账号退回给申请领队 退回
cmx.g.CounterpartstatusStr.put('999', '不同意发掘');//同210也是办结状态，只是结果为不同意发掘

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
                statusArray: [],
                pageSize: '6',
                tdlFormData: [{
                    // proFileTitle: $('#proFileTitle').val(),
                    // projectNum: $('#projectNum').val(),
                    // originalNo: $('#fileNumBack').val(),
                    // projectName: $('#projectName').val(),
                    publishType: '-1'//工作台查全部，默认都是-1
                    // publishTypeName: $('#publishTypeName').find("option:selected").text(),
                    // unitName: $('#unitName').val(),
                    // proSendTimeStart: $('#proSendTimeStart').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', ''),
                    // proSendTimeEnd: $('#proSendTimeEnd').val().replaceAll('年', '-').replaceAll('月', '-').replaceAll('日', '')
                }],
            }),
            type: 'POST'
        })
        .turn('getneedToDoList', {})
        .start();
};
$(document).ready(function () {
    new cmx.process()
        .turn('provinceNeedInit')
        .turn('callajax', {
            url: api_ea + '/business/taskCount',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            //to do 本周待办接口未做，先用总代办数
            var data = prevModelData.data;
            $('#cmx-province-count').html('<tr><td>' + data.taskListCount + '</td><td>' + data.haveToDoListCount + '</td></tr>'); //<td>' + data.taskListCount + '</td>
            send.go();
        })
        .start();
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
                '<td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + data[i].proFileTitle + '</td>',
                '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.CounterpartstatusStr.get(data[i].status) + '</td>',
                '<td>' + data[i].projectTypeName + '</td>',
                // '<td><span class="badge badge-radius ' + workDaysColor + '">' + (IsEmpty(data[i].workDay) ? '无' : data[i].workDay + '天') + '</span></td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-ntd-tbody").append(tbody_html);
        }
        $('#cmx-pneedPage .nowpage').html(pageNumber);
        $('#cmx-pneedPage .jumppage').val(pageNumber);
        $('#cmx-pneedPage .totalpage').html(param.pages);
        needFunc.pageCount = param.pages;
        console.log(needFunc.pageCount);
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
                console.log(needFunc.pageNum + 1)
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