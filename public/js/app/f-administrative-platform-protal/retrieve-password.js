$(document).ready(function () {
    var countdown = 30;

    function sendemail() {
        var obj = $('.getcode');
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

    getChkImage();

    $('#cmx-chk-image').on('click', function () { // 验证码刷新
        getChkImage();
    });

    //获取验证码
    var msgencryptcode = '';
    $('.getcode').on('click', function () {
        if (IsEmpty($('#changepw-username').val())) {
            showAlert({
                type: "info",
                content: "请填写用户名"
            });
            return;
        }
        if (IsEmpty($('#imgCode').val())) {
            showAlert({
                type: "info",
                content: "请填写图形验证码"
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/change/sendMsgByUserid',
                data: {
                    chknbr: $('#imgCode').val(),
                    encryptcode: $('#cmx-chk-image').attr('cmx-encryptcode'),
                    userid: $('#changepw-username').val(),
                    deviceid: getData('deviceId')
                },
                type: 'GET',
                success: function (result) {
                    if (result.state == 200) {
                        console.log(result);
                        showAlert({
                            type: 'success',
                            content: '验证码发送成功，30分钟内有效'
                        });
                        msgencryptcode = result.data.encryptcode;
                        sendemail();
                    }else{
                        getChkImage();
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '发送失败'
                    });
                    getChkImage();
                },
                complete: function () { }
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () {

            })
            .start();
    });
    $('.checkcode').on('click', function () {
        if (IsEmpty($('#validCode').val())) {
            showAlert({
                type: "info",
                content: "请输入验证码"
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/change/chkNumber',
                data: {
                    deviceid: getData('deviceId'),
                    chknbr: $('#validCode').val(),
                    encryptcode: msgencryptcode,
                    userid: $('#changepw-username').val(),
                },
                type: 'GET',
                success: function (result) {
                    if (result.state == 200) {
                        console.log(result);
                        showAlert({
                            type: 'info',
                            content: '验证成功'
                        });
                        $('.passwordDiv').show();
                        $('.codeDiv').hide();
                    }else{
                        getChkImage();
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '验证失败'
                    });
                    getChkImage();
                },
                complete: function () { }
            })
            .ccatch(function (msg) {
                //异常终止
            })
            .cfinally(function () {

            })
            .start();
    });
    $('.changepassword').on('click', function () {
        if (IsEmpty($('#newPwd').val())) {
            showAlert({
                type: 'error',
                content: '新密码不能为空'
            });
            return;
        }
        if ($('#newPwd').val().length < 6 || $('#newPwd').val().length > 30) {
            showAlert({
                type: 'error',
                content: '密码必须大于6且小于30个字符'
            });
            return;
        }
        var patten = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/;
        if (!patten.test($('#newPwd').val())) {
            showAlert({
                type: 'error',
                content: '密码至少6位由数字、字母、字符任意2种混合组成'
            });
            return;
        }
        if ($('#newPwd').val() != $('#confirm-newPwd').val()) {
            showAlert({
                type: 'error',
                content: '两次输入密码不一致'
            });
        } else {
            new cmx.process()
                .turn('callajax', {
                    url: api_aa + '/change/retrievePwd',
                    data: {
                        loginpass: md5($('#newPwd').val()),
                        userid: $('#changepw-username').val()
                    },
                    type: 'GET',
                    success: function (result) {
                        if (result.state == 200) {
                            console.log(result);
                            showAlert({
                                type: 'info',
                                content: '修改成功'
                            });
                            setTimeout(function(){
                                window.location.href = "/login.html";
                            },1000);
                        }
                    },
                    error: function () {
                        showAlert({
                            type: 'error',
                            content: '修改失败'
                        });
                    },
                    complete: function () { }
                })
                .ccatch(function (msg) {
                    //异常终止
                })
                .cfinally(function () {

                })
                .start();
        }
    });
});