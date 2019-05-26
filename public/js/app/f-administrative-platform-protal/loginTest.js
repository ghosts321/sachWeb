/*
 * @Author: liuxiangnan 
 * @Date: 2017-09-20 15:38:49 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-01-29 15:10:23
 */
'use strict';
cmx.g.regist('loginrun');
cmx.g.loginrun = false;
jQuery.support.cors = true;

function checkLogin() {
    if (!cmx.g.loginrun) {
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
            }).turn('continueWork3', {
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
    $('#login-btn').attr('type', 'button');
    $('#login-btn').click(function () {
        checkLogin();
    });
    getChkImage();
    $('#cmx-chk-image').click(function () { // 验证码刷新
        getChkImage();
    });
    $('#username').keydown(function (event) {
        if(event.keyCode ==13){
            checkLogin();
        }
    })
    $('#password').keydown(function (event) {
        if(event.keyCode ==13){
            checkLogin();
        }
    })
    $('#validCode').keydown(function (event) {
        if(event.keyCode ==13){
            checkLogin();
        }
    })
});