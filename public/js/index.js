/*
 * @Author: liuxiangnan 
 * @Date: 2017-09-20 15:31:32 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2018-07-01 15:10:13
 */
'use strict';
if (!IsEmpty(GetUrlParamString('token'))) {
    putData('token', GetUrlParamString('token'));
}
if (IsEmpty(getData('token'))) {
    location.href = "/login.html";
}
if (GetUrlParamString('from') == 'app') {
    $('html').addClass('fromapp');
    putData('fromtype', 'app');
} else {
    putData('fromtype', 'none');
}
if (GetUrlParamString('from') == 'iframe') {
    $('html').addClass('fromiframe');
}
if (!IsEmpty(GetUrlParamString('code'))) {
    putData('socketCode', GetUrlParamString('code'));
}
var role2client = [];
role2client['11'] = 'nation'; //国家局
role2client['12'] = 'province'; //省级
role2client['13'] = 'wenwujinchujingshenhe'; //文物进出境
role2client['14'] = 'bowuguan'; //博物馆
role2client['15'] = 'guobaodanwei'; //国保单位
role2client['16'] = 'inspection'; //专业评估机构
role2client['17'] = 'inspection'; //专家
role2client['18'] = 'paimaijigou'; //拍卖机构
role2client['19'] = 'gongzhongyonghu'; //公众用户
role2client['1A'] = 'kaogufajuedanwei'; //考古发掘单位
role2client['1B'] = 'kaogulingdui'; //考古领队
role2client['21'] = 'admin'; //系统管理员
role2client['22'] = 'admin'; //系统安全员
role2client['23'] = 'admin'; //安全审计员
role2client['24'] = 'admin'; //系统操作员
if (!IsEmpty(GetUrlParamString('role'))) {
    putData('role', role2client[GetUrlParamString('role')]);
}
if (!IsEmpty(GetUrlParamString('userid'))) {
    putData('userId', GetUrlParamString('userid'));
}

function logout() {
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/logout/logout',
            data: {
                token: getData('token')
            },
            type: 'GET'
        })
        .turn(function (prevModelData, send, abort) {
            clearData('token');
            clearData('role');
            clearData('username');
            clearData('roleId');
            clearData('roleName');
            clearData('deviceId');
            clearData('_chpn');
            clearData('_chipn');
            clearData('_chopn');
            clearData('_ckpn');
            clearData('_cnpn');
            clearData('_copn');
            clearData('_cspn');
            location.href = "/login.html";
        })
        .start();
}

function logoff() {
    clearData('role');
    clearData('username');
    clearData('roleId');
    clearData('roleName');
    clearData('_chpn');
    clearData('_chipn');
    clearData('_chopn');
    clearData('_ckpn');
    clearData('_cnpn');
    clearData('_copn');
    clearData('_cspn');
    location.href = '/index.html';
}
var temppp = false;
var socketObj;
var socketId;
$(function () {
    if (!IsEmpty(getData('socketCode'))) {
        socketObj = io.connect('http://59.110.17.210:8092'); //页面加载就连接socket
        socketObj.emit('bind', {
            code: getData('socketCode')
        }); //绑定code,此code接收来自app传参

        socketObj.on('sendid', function (data) { //获取socket端提供的返回id
            socketId = data.id;
        });
    }
    $('.page-aside-switch').click(function () {
        if (!temppp) {
            $('.page-aside').css('left', '0px');
        } else {
            $('.page-aside').css('left', '-220px');
        }
        temppp = !temppp;
    });
    //$(".rmenu-id-cmx-nav-01").eq('0').html('');
    $('#cmx-validCode').on('keydown', function (event) {
        if (event.keyCode == 13) {
            new cmx.process()
                .turn('callajax', {
                    url: api_aa + '/login/checkUser',
                    data: {
                        encryptcode: $('#cmx-chk-image').attr('cmx-encryptcode'),
                        loginname: $('#cmx-username').val(),
                        loginpass: md5($('#cmx-password').val()),
                        verifycode: $('#cmx-validCode').val(),
                        devicetype: 'pc-web',
                        deviceid: getData('deviceId')
                    },
                    type: 'GET'
                })
                .turn('continueWork', {
                    need_reload: true,
                    gotoindex: false,
                    from: ''
                })
                .start();
        }
    });
    setInterval(function () {
        getNotifyCount();
    }, 60000);
    getNotifyCount();
    //表格可拖拽
    $("th:contains('操作')").css('width', '80px');
    $("th:contains('编号')").parent().parent().parent().each(function () {
        if ($(this).is(':visible')) {
            $(this).addClass('resizetable table-bordered').resizableColumns();
        }
    })
    //统一加排序图标
    $('.table-cmx-sort').each(function () {
        if ($(this).attr('data-nosort') && !IsEmpty($(this).attr('data-nosort'))) {
            var nosortarr = JSON.parse($(this).attr('data-nosort'));
            $(this).find('th').each(function (index) {
                if ($.inArray(index, nosortarr) < 0) {
                    $(this).addClass('birth sortth');
                }
            })
        }
    })
});
cmx.g.regist('notifyNum', 1);
cmx.g.regist('notifyNumCount', 1);

//表格数据排序
cmx.g.regist('orderMode', '');
cmx.g.regist('orderField', '');

function cmxTableSort(param) {
    $('[cmxsort="cmxtable"] .birth').each(function () {
        $(this).on('click', function () {
            $(this).siblings('.sortth').removeClass('asc');
            $(this).siblings('.sortth').removeClass('desc');
            $(this).siblings('.sortth').addClass('birth');
            if ($(this).hasClass('desc')) {
                $(this).removeClass('desc');
                $(this).addClass('asc');
                cmx.g.orderMode = 'asc';
            } else if ($(this).hasClass('asc')) {
                $(this).removeClass('asc');
                $(this).addClass('desc');
                cmx.g.orderMode = 'desc';
            } else {
                $(this).removeClass('birth');
                $(this).addClass('asc');
                cmx.g.orderMode = 'asc';
            }
            cmx.g.orderField = $(this).attr('orderField');
            param.callback();
        });
    })
}

function showNotifyModal() {
    $("#model-notify").off('show.bs.modal');
    $("#model-notify").on('show.bs.modal', function () {
        $('.notify-prev-btn').off('click');
        $('.notify-prev-btn').on('click', function () {
            if (cmx.g.notifyNum <= 1) {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            } else {
                cmx.g.notifyNum--;
                pollingNotify();
            }
        });
        $('.notify-next-btn').off('click');
        $('.notify-next-btn').on('click', function () {
            if (cmx.g.notifyNum >= cmx.g.notifyNumCount) {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            } else {
                cmx.g.notifyNum++;
                pollingNotify();
            }
        });
        cmx.g.notifyNum = 1;
        pollingNotify();
    });
    $("#model-notify").modal('show');

}

function pollingNotify() {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubUrgedealmsg/recvMsgList',
            data: JSON.stringify({
                token: getData('token'),
                pageNo: cmx.g.notifyNum,
                pageSize: '15',
                rumformData: [{
                    projectName: '',
                    sendUserName: ''
                }]
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var response = prevModelData.data.dataList;
                cmx.g.notifyNumCount = prevModelData.data.pages;
                $('#model-notify tbody').html();
                var html = '';
                for (var i = 0; i < response.length; i++) {
                    html += [
                        '<tr>',
                        '<td>',
                        i + 1,
                        '</td>',
                        '<td>',
                        response[i].readFlag == '2' ? '<span style="line-height: 22px;" class="label label-danger">未读</span>' : '<span style="line-height: 22px;" class="label label-primary">已读</span>',
                        '</td>',
                        '<td>',
                        response[i].msgTitle,
                        '</td>',
                        '<td>',
                        response[i].msgCont,
                        '</td>',
                        '<td class="text-nowrap">',
                        response[i].sendDatetime,
                        '</td>',
                        '</tr>',
                    ].join('');
                }
                if (cmx.g.notifyNum >= cmx.g.notifyNumCount) {
                    $('.notify-next-btn').attr('disabled', true);
                } else {
                    $('.notify-next-btn').removeAttr('disabled');
                }
                if (cmx.g.notifyNum <= 1) {
                    $('.notify-prev-btn').attr('disabled', true);
                } else {
                    $('.notify-prev-btn').removeAttr('disabled');
                }
                $('#model-notify tbody').html(html);
            }
            getNotifyCount();
            send.go();
        })
        .start();
}

function getNotifyCount() {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubUrgedealmsg/msgCount',
            data: JSON.stringify({
                token: getData('token')
            }),
            type: 'POST',
            async: true
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                if (prevModelData.data + '' != '0') {
                    $('#cmx-noread-count').html(prevModelData.data);
                    $('#cmx-noread-count').show();
                } else {
                    $('#cmx-noread-count').hide();
                }
            }
        })
        .start();
}