/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-18 16:00:43 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2017-12-26 11:57:35
 */

cmx.g.regist('encryptcode', '');
(function (window, document, $) {

    getChkImage();
    $('#cmx-chk-image').on('click', function () { // 验证码刷新
        getChkImage();
    });
    $('#phoneNo').bind('input propertychange', function () {
        var re = /^1[34578]\d{9}$/;
        if (re.test($('#phoneNo').val())) {
            $('#send-msg').attr('disabled', false);
        } else {
            $('#send-msg').attr('disabled', true);
        }
    });

    var countdown = 30;

    function sendemail() {
        var obj = $('#send-msg');
        settime(obj);
    }

    function settime(obj) { //发送验证码倒计时
        if (countdown == 0) {
            obj.attr('disabled', false);
            //obj.removeattr("disabled"); 
            obj.text("获取验证码");
            countdown = 30;
            return;
        } else {
            obj.attr('disabled', true);
            obj.text("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }

    //发送手机验证码
    $('#send-msg').on('click', function () {
        if (IsEmpty($('#validCode').val())) {
            showAlert({
                type: 'error',
                content: '图形验证不能为空'
            });
        }
        cmx.g.encryptcode = '';
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/aaReguserinfo/sendMsgByPhoneNo',
                data: {
                    encryptcode: $('#cmx-chk-image').attr('cmx-encryptcode'),
                    phoneno: $('#phoneNo').val(),
                    deviceid: getData('deviceId'),
                    chknbr: $('#validCode').val()
                },
                type: 'GET'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '验证码发送成功，30分钟内有效'
                    });
                    cmx.g.encryptcode = prevModelData.data.encryptcode;
                    sendemail();
                } else {
                    showAlert({
                        type: 'error',
                        content: prevModelData.msg
                    });
                }
            })
            .start();
    });

    //注册
    $('#register').on('click', function () {
        var IDCardType = $('#IDCardType').val();
        var idcard = $('#idcard').val();
        var userId = $('#userId').val();
        var username = $('#username').val();
        var phoneNo = $('#phoneNo').val();
        var phoneNo_code = $('#phoneNo-code').val();
        var passWord = $('#passWord').val();
        var confirm_pass = $('#confirm-pass').val();
        var unitName = $('#unitName').val();
        var email = $('#email').val();
        if (IsEmpty(idcard)) {
            showAlert({
                type: 'error',
                content: '证件号不能为空'
            });
            return false;
        }
        if (IsEmpty(userId)) {
            showAlert({
                type: 'error',
                content: '登录名不能为空'
            });
            return false;
        }
        if (IsEmpty(username)) {
            showAlert({
                type: 'error',
                content: '用户姓名不能为空'
            });
            return false;
        }
        if (IsEmpty(phoneNo)) {
            showAlert({
                type: 'error',
                content: '手机号不能为空'
            });
            return false;
        }
        if (IsEmpty(phoneNo_code)) {
            showAlert({
                type: 'error',
                content: '手机号验证码不能为空'
            });
            return false;
        }
        if (IsEmpty(passWord)) {
            showAlert({
                type: 'error',
                content: '密码不能为空'
            });
            return false;
        }
        if (passWord.length < 6 || passWord.length > 30) {
            showAlert({
                type: 'error',
                content: '密码必须大于6且小于30个字符'
            });
            return false;
        }
        if (passWord != confirm_pass) {
            showAlert({
                type: 'error',
                content: '两次密码输入不一致'
            });
            return false;
        }
        var patten = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/;
        if (!patten.test(passWord)) {
            showAlert({
                type: 'error',
                content: '密码至少6位由数字、字母、字符任意2种混合组成'
            });
            return false;
        }
        if (IsEmpty(unitName)) {
            showAlert({
                type: 'error',
                content: '机构名称不能为空'
            });
            return false;
        }
        if (IsEmpty(email)) {
            showAlert({
                type: 'error',
                content: '邮箱不能为空'
            });
            return false;
        }
        var email_re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!email_re.test(email)) {
            showAlert({
                type: 'error',
                content: '请输入正确格式的邮件地址'
            });
            return false;
        }
        console.log({
            url: api_aa + '/user/aaReguserinfo/saveAaReguserinfo',
            jsonheader: false,
            data: {
                userId: userId,
                username: username,
                passWord: md5(passWord),
                sex: "",
                idcardType: IDCardType,
                idcard: idcard,
                phoneNo: phoneNo,
                email: email,
                unitName: unitName,
                chknbr: phoneNo_code,
                encryptcode: cmx.g.encryptcode,
                deviceid: getData('deviceId')
            },
            type: 'POST'
        });
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/aaReguserinfo/saveAaReguserinfo',
                jsonheader: false,
                data: {
                    userId: userId,
                    username: username,
                    passWord: md5(passWord),
                    sex: "",
                    idcardType: IDCardType,
                    idcard: idcard,
                    phoneNo: phoneNo,
                    email: email,
                    unitName: unitName,
                    chknbr: phoneNo_code,
                    encryptcode: cmx.g.encryptcode,
                    deviceid: getData('deviceId')
                },
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '注册成功'
                    });
                    setTimeout(function () {
                        window.location.href = "/login.html";
                    }, 1000);
                } else {
                    showAlert({
                        type: 'error',
                        content: prevModelData.msg
                    });
                }
            })
            .start();
    })

    new cmx.process()
        .turn('buildDataDic', {
            element: $('#IDCardType'),
            type: "select"
        })
        .cfinally(function () {

        })
        .start();

})(window, document, jQuery);