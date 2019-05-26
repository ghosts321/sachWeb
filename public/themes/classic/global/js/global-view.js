/*
 * @Author: lvjinxiu 
 * @Date: 2017-09-11 14:13:29 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-06-25 14:55:16
 */
'use strict';

cmx.g.regist('ReminderStatusStr', new HashMap());
cmx.route.model({
    index: 'showRemindersList',
    handle: function (parameter, prevModelData, send, abort) {
        cmx.g.ReminderStatusStr.put('101', '填报中');
        cmx.g.ReminderStatusStr.put('201', '文书室处理中');
        cmx.g.ReminderStatusStr.put('202', '司秘处理中');
        cmx.g.ReminderStatusStr.put('203', '处领导处理中');
        cmx.g.ReminderStatusStr.put('204', '处员处理中');
        cmx.g.ReminderStatusStr.put('205', '专家处理中');
        cmx.g.ReminderStatusStr.put('206', '司领导处理中（发文中）');
        cmx.g.ReminderStatusStr.put('207', '局领导处理中（发文中）');
        cmx.g.ReminderStatusStr.put('208', '文印室处理中（发文中）');
        cmx.g.ReminderStatusStr.put('209', '公示中');
        cmx.g.ReminderStatusStr.put('210', '办结');
        cmx.g.ReminderStatusStr.put('213', '处领导处理中（已受理）');
        cmx.g.ReminderStatusStr.put('214', '处员处理中（已受理）');
        cmx.g.ReminderStatusStr.put('215', '处长处理中（转办）');
        cmx.g.ReminderStatusStr.put('216', '处员处理中（转办）');
        cmx.g.ReminderStatusStr.put('223', '处领导处理中（发文中）');
        cmx.g.ReminderStatusStr.put('224', '处员处理中（发文中）');
        cmx.g.ReminderStatusStr.put('225', '秘书处处理中（发文中）');
        cmx.g.ReminderStatusStr.put('226', '文书室处理中（发文中）');
        cmx.g.ReminderStatusStr.put('227', '文书室处理中（发文中）');
        cmx.g.ReminderStatusStr.put('301', '国家局退回');
        cmx.g.ReminderStatusStr.put('302', '国家局不予受理');
        cmx.g.ReminderStatusStr.put('303', '退回');
        cmx.g.ReminderStatusStr.put('304', '退回');

        cmx.g.ReminderStatusStr.put('230', '文保处处理中');
        cmx.g.ReminderStatusStr.put('231', '文保处处理中（已受理）');
        cmx.g.ReminderStatusStr.put('232', '文保处处理中（发文中）');
        cmx.g.ReminderStatusStr.put('250', '国家局委托第三方检查中');

        cmx.g.ReminderStatusStr.put('401', '相对人填报中');
        cmx.g.ReminderStatusStr.put('501', '省局处理中');
        cmx.g.ReminderStatusStr.put('502', '省局审核中');
        cmx.g.ReminderStatusStr.put('503', '省局待报备');
        cmx.g.ReminderStatusStr.put('504', '省局审批结束');
        cmx.g.ReminderStatusStr.put('505', '省局退回');
        cmx.g.ReminderStatusStr.put('601', '省局专家处理中');

        cmx.g.ReminderStatusStr.put('701', '发掘资质单位处理中');
        cmx.g.ReminderStatusStr.put('702', '省局处理中');
        cmx.g.ReminderStatusStr.put('987', '考古处处理中'); //考古处处理中
        cmx.g.ReminderStatusStr.put('773', '待发执照'); //待发执照
        cmx.g.ReminderStatusStr.put('776', '国局处理中（考古处转办）'); //考古处转办
        cmx.g.ReminderStatusStr.put('777', '已下载'); //考古处虚拟账号已下载过excel
        cmx.g.ReminderStatusStr.put('481', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 一次性补正
        cmx.g.ReminderStatusStr.put('482', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 不予受理
        cmx.g.ReminderStatusStr.put('993', '国家局退回'); //考古处虚拟账号退回给申请领队  一次性补正
        cmx.g.ReminderStatusStr.put('994', '国家局退回'); //考古处虚拟账号退回给申请领队 不予受理
        cmx.g.ReminderStatusStr.put('497', '国家局退回'); //考古处虚拟账号退回给文书室 一次性补正
        cmx.g.ReminderStatusStr.put('498', '国家局退回'); //考古处虚拟账号退回给文书室 不予受理
        cmx.g.ReminderStatusStr.put('495', '国家局退回'); //考古处虚拟账号退回给司密 一次性补正
        cmx.g.ReminderStatusStr.put('496', '国家局退回'); //考古处虚拟账号退回给司密 不予受理
        cmx.g.ReminderStatusStr.put('493', '国家局退回'); //考古处虚拟账号退回给省局 一次性补正
        cmx.g.ReminderStatusStr.put('494', '国家局退回'); //考古处虚拟账号退回给省局 不予受理
        cmx.g.ReminderStatusStr.put('877', '国家局退回'); //司秘账号退回给文书室 一次性补正
        cmx.g.ReminderStatusStr.put('878', '国家局退回'); //司秘账号退回给文书室 不予受理
        cmx.g.ReminderStatusStr.put('879', '国家局退回'); //司秘账号退回给文书室 退回
        cmx.g.ReminderStatusStr.put('874', '国家局退回'); //司秘账号退回给省局 一次性补正
        cmx.g.ReminderStatusStr.put('876', '国家局退回'); //司秘账号退回给省局 不予受理
        cmx.g.ReminderStatusStr.put('875', '国家局退回'); //司秘账号退回给省局 退回
        cmx.g.ReminderStatusStr.put('883', '国家局退回'); //司秘账号退回给发掘资质单位 一次性补正
        cmx.g.ReminderStatusStr.put('884', '国家局退回'); //司秘账号退回给发掘资质单位 不予受理
        cmx.g.ReminderStatusStr.put('885', '国家局退回'); //司秘账号退回给发掘资质单位 退回
        cmx.g.ReminderStatusStr.put('887', '国家局退回'); //司秘账号退回给发掘申请领队 一次性补正
        cmx.g.ReminderStatusStr.put('886', '国家局退回'); //司秘账号退回给发掘申请领队 不予受理
        cmx.g.ReminderStatusStr.put('888', '国家局退回'); //司秘账号退回给发掘申请领队 退回
        cmx.g.ReminderStatusStr.put('864', '国家局退回'); //文书室账号退回给省局 一次性补正
        cmx.g.ReminderStatusStr.put('866', '国家局退回'); //文书室账号退回给省局 不予受理
        cmx.g.ReminderStatusStr.put('865', '国家局退回'); //文书室账号退回给省局 退回
        cmx.g.ReminderStatusStr.put('873', '国家局退回'); //文书室账号退回给发掘资质单位 一次性补正
        cmx.g.ReminderStatusStr.put('872', '国家局退回'); //文书室账号退回给发掘资质单位 不予受理
        cmx.g.ReminderStatusStr.put('871', '国家局退回'); //文书室账号退回给发掘资质单位 退回
        cmx.g.ReminderStatusStr.put('867', '国家局退回'); //文书室账号退回给申请领队 一次性补正
        cmx.g.ReminderStatusStr.put('868', '国家局退回'); //文书室账号退回给申请领队 不予受理
        cmx.g.ReminderStatusStr.put('869', '国家局退回'); //文书室账号退回给申请领队 退回
        cmx.g.ReminderStatusStr.put('980', '省局退回'); //省局账号退回给发掘资质单位 一次性补正
        cmx.g.ReminderStatusStr.put('982', '省局退回'); //省局账号退回给发掘资质单位 不予受理
        cmx.g.ReminderStatusStr.put('981', '省局退回'); //省局账号退回给发掘资质单位 退回
        cmx.g.ReminderStatusStr.put('990', '省局退回'); //省局账号退回给申请领队 一次性补正
        cmx.g.ReminderStatusStr.put('992', '省局退回'); //省局账号退回给申请领队 不予受理
        cmx.g.ReminderStatusStr.put('991', '省局退回'); //省局账号退回给申请领队 退回
        cmx.g.ReminderStatusStr.put('880', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 一次性补正
        cmx.g.ReminderStatusStr.put('882', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 不予受理
        cmx.g.ReminderStatusStr.put('881', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 退回

        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubUrgedealmsg/recvUrgeMsg',
                data: JSON.stringify({
                    token: getData('token'),
                    pageNo: parameter.pageNumber,
                    pageSize: parameter.pageSize,
                    rumformData: [{
                        sendUserName: $('#cmxRemindersListModal #cmx-reminders-sendUserName').val(),
                        projectName: $('#cmxRemindersListModal #cmx-reminders-projectName').val(),
                    }],
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    var data = prevModelData.data.dataList;
                    var orginaldata = cmx.g.needToDoData;
                    cmx.g.needToDoData = data;
                    for (var i = 0; i < data.length; i++) {
                        html = html + ['<tr>',
                            '<td class="text-center">',
                            i + 1,
                            '</td>',
                            '<td>' + data[i].sendUserName + '</td>',
                            '<td>' + data[i].projectName + '</td>',
                            '<td style="color:#f2a654;">' + cmx.g.ReminderStatusStr.get(
                                data[i].status) +
                            '</td>',
                            '<td>' + data[i].msgTitle + '</td>',
                            '<td>' + data[i].msgCont + '</td>',
                            '<td>' + data[i].projectNumName + '</td>',
                            '<td>' + data[i].sendDatetime + '</td>',
                            '</tr>'
                        ].join("");
                    }
                    $('#cmx-reminders-list-tbody').html(html)
                    parameter.callback(prevModelData.data.pages);
                    $('#cmx-reminders-list-page .nowpage').text(prevModelData.data.pageNumber);
                    $('#cmx-reminders-list-page .totalpage').text(prevModelData.data.pages);

                    $("#cmx-reminders-list-tbody tr").each(function (index) {
                        var _self = $(this);
                        $(this).unbind('click');
                        $(this).bind('click', function () {
                            $("#cmx-reminders-list-tbody tr").each(function () {
                                $(this).removeClass("active");
                            })
                            _self.addClass("active");
                            if (getData('role') == 'inspection') {
                                var temp = cmx.g.needToDoData;
                                for (var i = 0; i < temp.length; i++) {
                                    temp[i].nowstatus = temp[i].status;                                    
                                    temp[i].status = '';
                                }
                                new cmx.process()
                                    .turn('jumpToApply', {
                                        index: index,
                                        data: temp,
                                        isUse: true
                                    }).start();
                            } else {
                                new cmx.process()
                                    .turn('jumpToApply', {
                                        index: index,
                                        data: cmx.g.needToDoData,
                                        isUse: true
                                    }).start();
                            }

                        });
                    });
                    $("#cmxRemindersListModal").off('hide.bs.modal');
                    $("#cmxRemindersListModal").on('hide.bs.modal', function () {
                        cmx.g.needToDoData = orginaldata;
                    });
                }
            })
            .start();
        send.go();
    }
});

function showRemindersList() {
    var param = {
        pageNumber: 1,
        pageSize: 20,
        callback: function (total) {
            $('#cmx-reminders-list-page .last').unbind('click');
            $('#cmx-reminders-list-page .last').bind('click', function () {
                if (param.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param.pageNumber = total;
                    new cmx.process()
                        .turn('showRemindersList', param)
                        .start();
                }
            });
            $('#cmx-reminders-list-page .next').unbind('click');
            $('#cmx-reminders-list-page .next').bind('click', function () {
                if (param.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param.pageNumber++;
                    new cmx.process()
                        .turn('showRemindersList', param)
                        .start();
                }
            });
        }
    }
    $('#cmx-reminders-list-page .first').unbind('click');
    $('#cmx-reminders-list-page .first').bind('click', function () {
        if (param.pageNumber == 1) {
            showAlert({
                type: 'error',
                content: '已经是第一页了'
            })
        } else {
            param.pageNumber = 1;
            new cmx.process()
                .turn('showRemindersList', param)
                .start();
        }

    });
    $('#cmx-reminders-list-page .pre').unbind('click');
    $('#cmx-reminders-list-page .pre').bind('click', function () {
        if (param.pageNumber == 1) {
            showAlert({
                type: 'error',
                content: '已经是第一页了'
            })
        } else {
            param.pageNumber--;
            new cmx.process()
                .turn('showRemindersList', param)
                .start();
        }
    });
    //查询
    $('#cmx-reminders-search-btn').off('click');
    $('#cmx-reminders-search-btn').on('click', function () {
        param.pageNumber = 1;
        new cmx.process()
            .turn('showRemindersList', param)
            .start();
    });
    //清除
    $('#cmx-reminders-search-clear').off('click');
    $('#cmx-reminders-search-clear').on('click', function () {
        $('#cmx-reminders-sendUserName').val('');
        $('#cmx-reminders-projectName').val('');
        param.pageNumber = 1;
        new cmx.process()
            .turn('showRemindersList', param)
            .start();
    });

    $("#cmxRemindersListModal").off('show.bs.modal');
    $("#cmxRemindersListModal").on('show.bs.modal', function () {
        $('#cmx-reminders-sendUserName').val('');
        $('#cmx-reminders-projectName').val('');
        param.pageNumber = 1;
        new cmx.process()
            .turn('showRemindersList', param)
            .start();
    });
    $("#cmxRemindersListModal").modal('show');
}