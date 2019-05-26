//常用联系人
var _contactArray = [];
var _pass = false;
$(document).ready(function () {
    if (getData('role') == 'nation') {
        $('#cmx-cyContacts').removeClass('hidden');
    } else {
        _pass = true;
    }
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#sex')
        }).cfinally(function () { }).start();

    $('[data-plug="datepicker"]').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
    });

    //根据用户类型展示用户信息都有哪些
    switch (getData('accClass')) {
        case '11'://国局
        case '12'://省局
        case '13'://进出境
        case '16'://评估机构
            $('#phoneNoform').removeClass('hide');
            $('#addressform').removeClass('hide');
            $('#telNoform').removeClass('hide');
            $('#faxform').removeClass('hide');
            break;
        case '17'://专家
            $('#phoneNoform').removeClass('hide');
            // $('#telNoform').removeClass('hide');
            $('#unitnameform').removeClass('hide');
            break;
        case '14'://博物馆
        case '15'://国保单位
        case '1A'://考古发掘资质单位
            $('#telNoform').removeClass('hide');
            break;
        case '1B'://考古领队
            $('#phoneNoform').removeClass('hide');
            break;
        case '19'://公众用户
            $('#phoneNoform').removeClass('hide');
            $('#unitnameform').removeClass('hide');
            break;
    }

    if (!_pass) {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/aaSachuserinfo/getContractListByUserid',
                jsonheader: false,
                data: {
                    token: getData('token'), //类型：String  必有字段  备注：无
                },
                success: function (result) {
                    console.log(result);
                },
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                var result = prevModelData;
                console.log(result);
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = result.data;
                    var html = '';
                    // alert($('#public-methods').length);
                    for (var i = 0; i < data.length; i++) {
                        html = html + '<option value="' + data[i].userId + '" instid="' + data[i].instId + '">' + data[i].userName + '</option>';
                    }
                    $('#public-methods').html(html);

                    $('#public-methods').multiSelect({
                        keepOrder: true,
                        selectionHeader: '备选联系人',
                        selectableHeader: '常用联系人',
                        afterSelect: function (values) {
                            removeByValue(_contactArray, values);
                            console.log(values);
                        },
                        afterDeselect: function (values) {
                            _contactArray.push(values[0]);
                            console.log(_contactArray);
                        }
                    });
                    $('#public-methods').multiSelect('select_all');
                }
                send.go();
            })
            .start();
    }
    new cmx.process()
        .turn('callajax', {
            url: api_cm + '/CmContactuserController/getDataByToken',
            data: JSON.stringify({
                token: getData('token')
            }),
            success: function (result) {
                console.log(result);
            },
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                for (var i = 0; i < data.length; i++) {
                    $('#public-methods').multiSelect('deselect', data[i].contUserId);
                }
            }
        })
        .cfinally(function () { })
        .start();
    $('#saveCmContact').on('click', function () {
        _contactArray
        var cmContact = _contactArray.join(',') + ',';
        console.log(cmContact);
        new cmx.process()
            .turn('callajax', {
                url: api_cm + '/CmContactuserController/saveContactUsers',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    userIds: cmContact
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        console.log(result);
                        showAlert({
                            type: 'info',
                            content: '更新常用联系人成功'
                        });
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '更新常用联系人失败'
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
    });
    var selectedArray = new Array();
    $('#public-methods').multiSelect({
        afterSelect: function (values) {
            selectedArray.push(values);
            console.log(selectedArray);
        },
        afterDeselect: function (values) { }
    });
    $('#getSelected').click(function () {
        var selected = [];
        $('#public-methods option:selected').each(function () {
            selected.push($(this).val());
        });
        console.log(selected);
    });
    $('#select-all').click(function () {
        $('#public-methods').multiSelect('select_all');
        return false;
    });
    $('#deselect-all').click(function () {
        $('#public-methods').multiSelect('deselect_all');
        return false;
    });

    //用户信息
    buildUserInfo();

    function buildUserInfo() {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/getUpdUserInfo',
                data: {
                    token: getData('token'), //类型：String  必有字段  备注：无
                    md5: md5(getData('token'))
                },
                type: 'GET',
                success: function (result) {
                    if (result.state == 200) {
                        console.log(result);
                        var data = result.data;
                        $('#userId').val(data.userId);
                        $('#userName').val(data.userName);
                        $('#sex').val(data.sex);
                        $('#birthday').val(data.birthday);//生日截断只要1900-01-01
                        $('#phoneNo').val(data.phoneNo);
                        $('#email').val(data.email);
                        $('#address').val(data.address);
                        $('#telNo').val(data.telNo);
                        $('#fax').val(data.fax);
                        $('#unitName').val(data.unitName);
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '获取用户信息失败'
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
    //保存用户信息
    $(".saveUserInfo").on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/user/updateUserinfo',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    userId: $("#userId").val(),
                    userName: $("#userName").val(),
                    sex: $("#sex").val(),
                    birthday: $("#birthday").val(),
                    phoneNo: $("#phoneNo").val(),
                    email: $("#email").val(),
                    address: $("#address").val(),
                    telNo: $("#telNo").val(),
                    fax: $("#fax").val(),
                    unitName: $("#unitName").val()
                }),
                type: 'POST',
                success: function (result) {
                    if (result.state == 200) {
                        console.log(result);
                        showAlert({
                            type: 'info',
                            content: '更新用户信息成功'
                        });
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '更新用户信息失败'
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
    });

    function savePassword() {
        //保存密码
    }
   
    var encryptcode = '';
    $('#changepw-username').val(getData('userId'));
    $('.getcode').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/change/sendMsgByUserid',
                data: {
                    userid: $('#changepw-username').val(),
                    deviceid: getData('deviceId')
                },
                type: 'GET',
                success: function (result) {
                    if (result.state == 200) {
                        console.log(result);
                        showAlert({
                            type: 'info',
                            content: '发送成功'
                        });
                        encryptcode = result.data.encryptcode;
                    }
                },
                error: function () {
                    showAlert({
                        type: 'error',
                        content: '发送失败'
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
    });
    $('.checkcode').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/change/chkNumber',
                data: {
                    deviceid: getData('deviceId'),
                    chknbr: $('#validCode').val(),
                    encryptcode: encryptcode,
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
                    } else {
                        showAlert({
                            type: 'error',
                            content: '验证失败'
                        });
                    }
                },
                error: function () {

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
            return false;
        }
        if ($('#newPwd').val() != $('#confirm-newPwd').val()) {
            showAlert({
                type: 'error',
                content: '两次输入密码不一致'
            });
        } else if ($('#newPwd').val() == $('#oldPwd').val()) {
            showAlert({
                type: 'error',
                content: '新密码不能和原密码一致'
            });
        } else {
            //手机验证码修改密码
            // new cmx.process()
            //     .turn('callajax', {
            //         url: api_aa + '/change/retrievePwd',
            //         data: {
            //             loginpass: md5($('#newPwd').val()),
            //             userid: getData('userId')
            //         },
            //         type: 'GET',
            //         success: function (result) {
            //             if (result.state == 200) {
            //                 console.log(result);
            //                 showAlert({
            //                     type: 'info',
            //                     content: '修改成功'
            //                 });
            //             }
            //         },
            //         error: function () {
            //             showAlert({
            //                 type: 'error',
            //                 content: '修改失败'
            //             });
            //         },
            //         complete: function () {}
            //     })
            //     .ccatch(function (msg) {
            //         //异常终止
            //     })
            //     .cfinally(function () {

            //     })
            //     .start();
            // 旧密码换新密码
            new cmx.process()
                .turn('callajax', {
                    url: api_aa + '/change/changePass',
                    data: {
                        loginpass: md5($('#newPwd').val()),

                        // userid: getData('userId')
                        token: getData('token'),
                        oldpass: md5($('#oldPwd').val()),
                    },
                    type: 'GET',
                    success: function (result) {
                        if (result.state == 200) {
                            console.log(result);
                            showAlert({
                                type: 'info',
                                content: '修改成功'
                            });
                            $('#oldPwd').val('');
                            $('#newPwd').val('');
                            $('#confirm-newPwd').val('');
                        } else {

                            showAlert({
                                type: 'error',
                                content: '修改失败'
                            });
                            $('#oldPwd').val('');
                            $('#newPwd').val('');
                            $('#confirm-newPwd').val('');
                        }
                    },
                    error: function () {
                        showAlert({
                            type: 'error',
                            content: '网络连接失败'
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