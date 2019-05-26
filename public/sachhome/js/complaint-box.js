$(function () {
    // 弹出模态框
    function showModeBox(text) {
        $('#myModal').off('shown.bs.modal');
        $('#myModal').on('show.bs.modal', function () {
            $('.modal-body').text(text);
        });
        $('#myModal').modal('show');
    }

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl + '/isPubSuggestion/saveIsPubSuggestion', // 默认URL
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
        data: { dataType: 'BusinessReason' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '';
            for (var i in result.BusinessReason) {
                str += '<label class="radio inline single-box"><input type="radio" data-name="BusinessReason" value="' + i + '" name="radio">' + result.BusinessReason[i] + '</label>';
            }
            $('#BusinessReason').html(str);
            $('#BusinessReason input:eq(0)').attr('checked', 'checked');
        }
    });

    var status = true;
    function beforeSubmit() {
        if ($('#SubUserName').val() == '') { // 姓名
            status = false;
            showModeBox('姓名不能为空！');
            return;
        }
        if ($('#SubUsertel').val() == '') { // 电话号码
            status = false;
            showModeBox('电话号码不能为空！');
            return;
        }
        if ($('#SubUserUnit').val() == '') { // 单位
            status = false;
            showModeBox('单位不能为空！');            
            return;
        }
        if ($('#SubUsereml').val() == '') { // 邮箱
            status = false;
            showModeBox('邮箱不能为空！');                        
            return;
        }
        if (!/^[\u4e00-\u9fa5]{2,10}$/.test($('#SubUserName').val())) { // 姓名
            status = false;
            showModeBox('姓名格式不对，应为2到10位中文');                                    
            return;
        }
        if (!/d{7,8}|0\d{2,3}-\d{7,8}|(^1[34578]\d{9}$)/.test($('#SubUsertel').val())) { // 电话号码
            status = false;
            showModeBox('电话号码格式不对，请重新输入');                                         
            return;
        }
        if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($('#SubUsereml').val())) { // 邮箱
            status = false;
            showModeBox('邮箱格式不对，请重新输入');                                  
            return;
        }
        return status;
    }

    // 点击提交
    $('#submit').on('click', function (e) {
        e.preventDefault();
        status = true;
        beforeSubmit();
        if (status) {
            var data = {};
            $('#application input[type="text"],#application textarea').each(function () {
                data[$(this).attr('data-name')] = $(this).val().trim();
            });
            data['BusinessReason'] = $('input[name="radio"]:checked').val();
            $.ajax({
                data: data,
                type: 'post',
                success: function (res) {
                    if (res.state == 200) {
                        showModeBox('您的申请提交成功！', '提示信息');
                        $('#confirmSubmit').on('click', function () {
                            window.location.reload();
                        });
                    } else {
                        showModeBox(res.msg, '提示信息');
                    }
                }
            });
        }
    });

});