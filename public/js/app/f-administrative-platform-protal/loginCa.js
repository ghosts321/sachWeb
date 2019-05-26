/*
 * @Author: liuxiangnan 
 * @Date: 2017-09-20 15:38:49 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2018-03-27 10:16:13
 */
'use strict';
cmx.g.regist('loginrun');
cmx.g.loginrun = false;
jQuery.support.cors = true;

function checkLogin() {
    if (!cmx.g.loginrun) {
        if ($('#remember').is(":checked")) {
            putData('lusername', $('#username').val());
            putData('lpassword', safeEncodeBase64($('#password').val()));
            putData('lremember', '1');
        } else {
            clearData('lusername');
            clearData('lpassword');
            clearData('lremember');
        }
        cmx.g.loginrun = true;
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/login/checkUser',
                data: {
                    encryptcode: $('#cmx-chk-image').attr('cmx-encryptcode'),
                    loginname: $('#username').val(),
                    loginpass: md5($('#password').val()),
                    verifycode: $('#validCode').val(),
                    devicetype: 'pc-web',
                    deviceid: getData('deviceId'),
                },
                type: 'GET'
            }).turn('continueWork2', {
                need_reload: false,
                gotoindex: true,
                from: GetUrlParamString('from'),
                password: $('#password').val()
            })
            .cfinally(function () {
                setTimeout(function () {
                    cmx.g.loginrun = false;
                }, 500);
            }).start();
    }
    return false;
}
var carandid = '';
$(document).ready(function () {
    if (getData('lremember') == '1') {
        $('#username').val(getData('lusername'));
        $('#password').val(safeDecodeBase64(getData('lpassword')));
        $('#remember').attr('checked', true);
    } else {
        $('#remember').attr('checked', false);
    }
    $('#login-btn').attr('type', 'button');
    $('#login-btn').click(function () {
        checkLogin();
    });
    getChkImage();
    $('#cmx-chk-image').click(function () { // 验证码刷新
        getChkImage();
    });
    $('#username').keydown(function (event) {
        if (event.keyCode == 13) {
            checkLogin();
        }
    });
    $('#password').keydown(function (event) {
        if (event.keyCode == 13) {
            checkLogin();
        }
    });
    $('#validCode').keydown(function (event) {
        if (event.keyCode == 13) {
            checkLogin();
        }
    });
});