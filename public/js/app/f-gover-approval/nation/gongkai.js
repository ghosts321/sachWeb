/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-12 21:30:47 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-05 14:45:43
 */
$(document).ready(function () {
    var param2 = {
        pageNumber: 1,
        pageSize: 20,
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
        pageSize: 20,
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
        pageSize: 20,
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
        .turn('getPublicDisclosure2', param2)
        .turn('getPublicDisclosure3', param3)
        .turn('getPublicDisclosure4', param4)
        .start();
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
                            '<td>' + data[i].refNumber + '</td>',
                            '<td>' + data[i].isTheUnitSName + '</td>',
                            '<td><a href="javascript:showPublicDeatil(\'' + data[i].batchId + '\')">' + data[i].proTitle + '</a></td>',
                            '<td>' + data[i].paperTypeName + '</td>',
                            '<td>' + data[i].shapeCodeName + '</td>',
                            '<td>' + data[i].singTime + '</td>',
                            '<td>' + data[i].sendDate + '</td>',
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
                            '<td>' + data[i].refNumber + '</td>',
                            '<td>' + data[i].isTheUnitName + '</td>',
                            '<td><a href="javascript:showPublicDeatil(\'' + data[i].batchId + '\')">' + data[i].proTitle + '</a></td>',
                            '<td>' + data[i].paperTypeName + '</td>',
                            '<td>' + data[i].shapeCodeName + '</td>',
                            '<td>' + data[i].singTime + '</td>',
                            '<td>' + data[i].sendDate + '</td>',
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
                            '<td>' + data[i].refNumber + '</td>',
                            '<td>' + data[i].isTheUnitName + '</td>',
                            '<td><a href="javascript:showPublicDeatil(\'' + data[i].batchId + '\')">' + data[i].proTitle + '</a></td>',
                            '<td>' + data[i].paperTypeName + '</td>',
                            '<td>' + data[i].shapeCodeName + '</td>',
                            '<td>' + data[i].singTime + '</td>',
                            '<td>' + data[i].sendDate + '</td>',
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