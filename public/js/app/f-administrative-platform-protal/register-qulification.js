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
            return;
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

        var userId = $('#userId').val();
        var username = $('#username').val();
        var phoneNo = $('#phoneNo').val();
        var phoneNo_code = $('#phoneNo-code').val();
        var passWord = $('#passWord').val();
        var confirm_pass = $('#confirm-pass').val();

        if (IsEmpty(userName)) {
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
        if (IsEmpty(unitName)) {
            showAlert({
                type: 'error',
                content: '单位名称不能为空'
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

        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/aaQualifinstuser/saveAaQualifinfo',
                jsonheader: false,
                data: {
                    userName: $('#userName').val(),
                    sex: $('#sex').val(),
                    birthday: $('#birthday').val(),
                    phoneNo: $('#phoneNo').val(),
                    email: $('#email').val(),
                    address: $('#address').val(),
                    telno: $('#telno').val(),
                    fax: $('#fax').val(),
                    unitName: $('#unitName').val(),
                    instSname: $('#instSname').val(),
                    //orgCode: $('#orgCode').val(),
                    creditCode: $('#creditCode').val(),
                    province: $('#province').val(),
                    foundTime: $('#foundTime').val(),
                    lawName: $('#lawName').val(),
                    idcardType: $('#idcardType').val(),
                    idcard: $('#idcard').val(),
                    education: $('#education').val(),
                    position: $('#position').val(),
                    majorAchieve: $('#majorAchieve').val(),
                    regMoney: $('#regMoney').val(),
                    unitaddress: $('#unitaddress').val(),
                    economicType: $('#economicType').val(),
                    tel: $('#tel').val(),
                    unitemail: $('#unitemail').val(),
                    personCount: $('#personCount').val(),
                    designerCount: $('#designerCount').val(),
                    professionalCount: $('#professionalCount').val(),
                    reEmployCount: $('#reEmployCount').val(),
                    postalCode: $('#postalCode').val(),
                    remark: $('#remark').val(),
                    userId: $('#userId').val(),
                    passWord: md5($('#passWord').val()),
                    encryptcode: cmx.g.encryptcode,
                    chknbr: $('#phoneNo-code').val(),
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
            element: $('#sex'),
            type: "select"
        })
        .turn('buildDataDic', {
            element: $('#province'),
            type: "select"
        })
        .turn('buildDataDic', {
            element: $('#idcardType'),
            type: "select"
        })
        .turn('buildDataDic', {
            element: $('#position'),
            type: "select"
        })
        .cfinally(function () {

        })
        .start();
    $('#birthday').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    })
    $('#foundTime').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    })

})(window, document, jQuery);