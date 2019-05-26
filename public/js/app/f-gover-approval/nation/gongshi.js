/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-12 21:27:46 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-04-02 14:21:48
 */
$(document).ready(function () {
    var param1 = {
        pageNumber: 1,
        pageSize: 20,
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

    new cmx.process()
        .turn('getPublicDisclosure1', param1)
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
                            '<p class="list-group-item-text pull-right">公示时间：' + data[i].sendDate + '&nbsp;&nbsp;剩余公示天数：<span style="color:red;">' + data[i].publicLeftDays + '天</span></p>',
                            '<div class="clearfix"></div>',
                            '</a>',
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