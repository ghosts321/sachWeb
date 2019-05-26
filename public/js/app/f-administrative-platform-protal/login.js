/*
 * @Author: liuxiangnan 
 * @Date: 2017-09-20 15:38:49 
 * @Last Modified by: liuxiangnan
 * @Last Modified time: 2018-03-27 10:15:59
 */
'use strict';
cmx.g.regist('loginrun');
cmx.g.loginrun = false;
clearData('agreement');
clearData('roleId');
if (!IsEmpty(getData('token'))) {
    location.href = "/index.html";
}

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
            }).turn('continueWork', {
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
(function (window, document, $) {
    if (getData('lremember') == '1') {
        $('#username').val(getData('lusername'));
        $('#password').val(safeDecodeBase64(getData('lpassword')));
        $('#remember').attr('checked', true);
    } else {
        $('#remember').attr('checked', false);
    }
    if (!IsEmpty(GetUrlParamString('from')) && GetUrlParamString('from').indexOf('56020') > 0) {
        $('.cmx-regist').css('display', 'inline-block');
    }
    var myDate = new Date();
    carandid = md5(randomString(32) + myDate.getTime());
    $('#openSachCaApplication').attr('href', 'sach://ca;' + carandid);
    $("#loginForm").formValidation({
        locale: 'zh_CN',
        framework: 'bootstrap',
        excluded: ':disabled',
        icon: {
            valid: 'icon wb-check',
            invalid: 'icon wb-close',
            validating: 'icon wb-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码必须大于6且小于30个字符'
                    }
                }
            },
            validCode: {
                validators: {
                    notEmpty: {
                        enabled: true,
                        message: '验证码不能为空'
                    }
                }
            }
        }
    });
    getChkImage();
    $('#cmx-chk-image').on('click', function () { // 验证码刷新
        getChkImage();
    });
})(window, document, jQuery);
var _interval = undefined;

function doCaApplication() {
    if (!IsNull(_interval)) {
        clearInterval(_interval);
    }
    setServiceCache({
        key: carandid,
        value: 'null',
        token: carandid,
        success: function () {
            _interval = setInterval('listenSachCaApplication()', 3000);
        },
        error: function (msg) {

        }
    });
}


function listenSachCaApplication() {
    getServiceCache({
        key: carandid,
        success: function (prevModelData) {
            var access_token = prevModelData.baseValue;
            if (!IsEmpty(access_token) && access_token != 'null') {
                new cmx.process()
                    .turn('callajax', {
                        url: api_loginCa,
                        data: {
                            catoken: access_token,
                            deviceid: getData('deviceId'),
                            devicetype: 'pc-web'
                        },
                        type: 'GET',
                        jsonheader: false
                    })
                    .turn(function (prevModelData2, send2, abort2) {
                        if (!IsNull(prevModelData2) && prevModelData2.state == '200' && !IsEmpty(prevModelData2.data) && prevModelData2.data != 'null') {
                            putData('token', prevModelData2.data.token);
                            putData('lastlogintime', prevModelData2.data.lastlogintime);
                            showAlert({
                                type: 'success',
                                content: 'CA登录成功'
                            });
                            location.href = "/index.html";
                        }
                        clearInterval(_interval);
                    })
                    .start();
            }
        },
        error: function (msg) {

        }
    });
}