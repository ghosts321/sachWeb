$(function () {
    var govInfoApplicationForm = './template/public-application/public-application-editItem.html';

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    // 页面加载时 获取证件名称下拉框的选项
    $.ajax({
        url: publicUrl_4 + '/dmDatadic/getDataDicFromRedis',
        data: {
            dataType: 'IoPubInfoIdCardType'
        },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '';
            for (var i in result.IoPubInfoIdCardType) {
                str += '<option value=' + i + '>' + result.IoPubInfoIdCardType[i] + '</option>';
            }
            $('#idCardType-l').html(str);
        }
    });

    // 切换公民、法人/其他代表菜单栏 下面的表格
    $('.application-form p span').on('click', function () {
        var idx = $(this).index();
        $('.data table').eq(idx).show().siblings('table').hide();
    });

    // 页面加载完成后 从后台获取验证码 验证码暂时不管 点击验证码时 切换验证码
    var encode = ''; // 要传给后台的encryptcode 保存到一个变量里面
    $('#yzm').on('click', function () {
        $.ajax({
            url: publicUrl_5 + '/login/getChkNumber',
            data: {},
            success: function (res) {
                $('#yzm').attr('src', 'data:image/png;base64,' + res.data.verifyimage);
                $('#verifycode-l').attr('data-verifycode-l', res.data.encryptcode);
            }
        });
    }).click();

    //此处左右用的是同一个验证码 如果需要左右验证码不同可能需要后端提供不同的接口
    $('#yzm2').on('click', function () {
        $.ajax({
            url: publicUrl_5 + '/login/getChkNumber',
            data: {},
            success: function (res) {
                $('#yzm2').attr('src', 'data:image/png;base64,' + res.data.verifyimage);
                $('#verifycode-r').attr('data-verifycode-r', res.data.encryptcode);
            }
        });
    }).click();

    // 点击提交
    var fileindexList;
    $('#submit').on('click', function (e) {
        e.preventDefault();
        if ($('#type span').eq(0).hasClass('on')) { // 此时用户点击的是公民
            // 上传文件返回编号
            fileindexList = [];
            $('.tab-l .filelist>li').each(function () {
                fileindexList.push($(this).attr('data-fileindex'));
            });
            var ioInfoPubApplyPC = {
                "applyUserID": $('#applyUserID-l').val(), // 姓名
                "workUnit": $('#workUnit-l').val(), // 工作单位
                "idCardType": $('#idCardType-l').val(), // 证件名称
                "idCardNO": $('#idCardNO-l').val(), // 证件号码
                "contactNO": $('#contactNO-l').val(), // 联系电话
                "fax": $('#fax-l').val(), // 传真
                "postalCode": $('#postalCode-l').val(), // 邮政编码
                "email": $('#email-l').val(), // 电子邮箱
                "address": $('#address-l').val(), // 联系地址
                "inforTitle": $('#inforTitle-l').val(), // 所需信息标题描述
                "contentDesc": $('#contentDesc-l').val(), // 所需信息内容描述
                "inforUse": $('#inforUse-l').val(), // 所需信息的目的、用途
                "carrierForm": $("input[name='carrierForm-l']:checked").val(), // 所需信息的指定提供载体形式
                "getWay": $("input[name='getWay-l']:checked").val(), // 获取信息的方式
                "verifycode": $('#verifycode-l').val(), // 验证码
                "encryptcode": $('#verifycode-l').attr('data-verifycode-l'), // 验证码 提交时验证
                "idFile": fileindexList.join(',') // 上传文件编号 以逗号分隔
            }

            $.ajax({
                url: publicUrl_2 + '/ioInfoPubApplyPC/checkPcData', // 后端格式校验
                type: 'post',
                data: ioInfoPubApplyPC,
                success: function (res) {
                    console.log(res);
                    if (res.state == '200') {
                        $("#showApplicationForm").load(govInfoApplicationForm, function () {
                            $('#govInfoApplicationForm').off('shown.bs.modal');
                            $('#govInfoApplicationForm').on('show.bs.modal', function () {
                                $('#govInfoApplicationContent').append($('#onlyTable'));
                                $('#govInfoApplicationForm :input').attr('readonly', 'readonly'); // 只读
                                $('#govInfoApplicationForm').find('select,input[type="radio"]').attr('disabled', 'true'); // 只读
                                $('#govInfoApplicationForm').find('#type,.scanning,.verification-code').addClass('noclicks');

                                // 校验无误 确认提交(不校验验证码)
                                $('#showApplicationForm').off('click', '#confirmSubmit');
                                $('#showApplicationForm').on('click', '#confirmSubmit', function () {
                                    console.log(ioInfoPubApplyPC);
                                    $.ajax({
                                        url: publicUrl_2 + '/ioInfoPubApplyPC/savePCApply/',
                                        type: 'post',
                                        data: ioInfoPubApplyPC,
                                        success: function (res) {
                                            console.log(res);
                                            if (res.state === '200') {
                                                showModeBox(res.msg);
                                                $('#sure,.nooutline').on('click', function () {
                                                    window.location.reload();
                                                });
                                            } else {
                                                showModeBox(res.msg);
                                                console.log('来自服务器端的错误! ' + res.msg);
                                            }
                                        }
                                    });
                                });
                            });
                            $('#govInfoApplicationForm').modal('show');

                            // 关闭模态框
                            $('#govInfoApplicationForm').on('hide.bs.modal', function () {
                                $('#govInfoApplicationForm :input').removeAttr('readonly'); // 去掉只读
                                $('#govInfoApplicationForm').find('select,input[type="radio"]').removeAttr('disabled'); // 去掉只读
                                $('#govInfoApplicationForm').find('#type,.scanning,.verification-code').removeClass('noclicks');
                                $('#application .application-form').prepend($('#onlyTable'));
                            });
                        });
                    } else {
                        showModeBox(res.msg);
                        console.log('来自服务器端的错误! ' + res.msg);
                    }
                }
            });
        } else {
            // 上传文件返回编号
            fileindexList = [];
            $('.tab-r .filelist>li').each(function () {
                fileindexList.push($(this).attr('data-fileindex'));
            });
            var ioInfoPubApplyCR = {
                "unitName": $('#unitName-r').val(), // 名称
                "crName": $('#crName-r').val(), // 法人代表
                "reserve1": $("input[name='reserve1']:checked").val(), // 组织机构信息
                "orgCode": $('#orgCode-r').val(), // 组织机构代码/营业执照注册号
                "contactorName": $('#contactorName-r').val(), // 联系人信息
                "contactNO": $('#contactNO-r').val(), // 联系人电话
                "email": $('#email-r').val(), // 电子邮箱
                "fax": $('#fax-r').val(), // 传真
                "address": $('#address-r').val(), // 联系地址
                "inforTitle": $('#inforTitle-r').val(), // 所需信息标题描述
                "contentDesc": $('#contentDesc-r').val(), // 所需信息内容描述
                "inforUse": $('#inforUse-r').val(), // 所需信息的目的、用途
                "carrierForm": $("input[name='carrierForm-r']:checked").val(), // 所需信息的指定提供载体形式
                "getWay": $("input[name='getWay-r']:checked").val(), // 获取信息的方式
                "verifycode": $('#verifycode-r').val(), // 验证码
                "encryptcode": $('#verifycode-r').attr('data-verifycode-r'), // 验证码 提交时验证
                "idFile": fileindexList.join(',') // 上传文件编号 以逗号分隔
            }

            $.ajax({
                url: publicUrl_2 + '/ioInfoPubApplyCR/checkCrData', // 后端格式校验
                type: 'post',
                data: ioInfoPubApplyCR,
                success: function (res) {
                    console.log(res);
                    if (res.state == '200') {
                        $("#showApplicationForm").load(govInfoApplicationForm, function () {
                            $('#govInfoApplicationForm').off('shown.bs.modal');
                            $('#govInfoApplicationForm').on('show.bs.modal', function () {
                                $('#govInfoApplicationContent').append($('#onlyTable'));
                                $('#govInfoApplicationForm :input').attr('readonly', 'readonly'); // 只读
                                $('#govInfoApplicationForm').find('select,input[type="radio"]').attr('disabled', 'true'); // 只读
                                $('#govInfoApplicationForm').find('#type,.scanning,.verification-code').addClass('noclicks');

                                // 校验无误 确认提交(不校验验证码)
                                $('#showApplicationForm').off('click', '#confirmSubmit');
                                $('#showApplicationForm').on('click', '#confirmSubmit', function () {
                                    console.log(ioInfoPubApplyCR);
                                    $.ajax({
                                        url: publicUrl_2 + '/ioInfoPubApplyCR/saveCRApply',
                                        type: 'post',
                                        data: ioInfoPubApplyCR,
                                        success: function (res) {
                                            console.log(res);
                                            if (res.state === '200') {
                                                showModeBox(res.msg);
                                                $('#sure,.nooutline').on('click', function () {
                                                    window.location.reload();
                                                });
                                            } else {
                                                showModeBox(res.msg);
                                                console.log('来自服务器端的错误! ' + res.msg);
                                            }
                                        }
                                    });
                                });
                            });
                            $('#govInfoApplicationForm').modal('show');

                            // 关闭模态框
                            $('#govInfoApplicationForm').on('hide.bs.modal', function () {
                                $('#govInfoApplicationForm :input').removeAttr('readonly'); // 去掉只读
                                $('#govInfoApplicationForm').find('select,input[type="radio"]').removeAttr('disabled'); // 去掉只读
                                $('#govInfoApplicationForm').find('#type,.scanning,.verification-code').removeClass('noclicks');
                                $('#application .application-form').prepend($('#onlyTable'));
                            });
                        });
                    } else {
                        showModeBox(res.msg);
                        console.log('来自服务器端的错误! ' + res.msg);
                    }
                }
            });
        }
    });

});

// 弹出模态框
function showModeBox(text) {
    $('#myModal').off('shown.bs.modal');
    $('#myModal').on('show.bs.modal', function () {
        $('#myModal .modal-body').text(text);
    });
    $('#myModal').modal('show');
}