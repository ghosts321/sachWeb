$(function () {
    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_4 + '/dmDatadic/getDataDicFromRedis', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    var status = 0;
    function judgeTheLast() { // 判断哪个异步请求最后返回 然后赋值、检索
        status++;
        if (status == 1) { // ststus等于4时 异步请求全部完成
            $('#search').click();
        }
    }

    // 页面加载时 获取执照号下拉列表
    // $.ajax({
    //   url: 'http://192.168.210.31:4040/dmArchdigproject/queryDataLicense',
    //   data: {},
    //   success: function(res){
    //     var str = '<option value="">所有</option>';
    //     for(var i = 0; i < res.data.length; i++){
    //       str += '<option value=' + res.data[i].license + '>' + res.data[i].license + '</option>';
    //     }
    //     $('#licenseNum').html(str);
    //     judgeTheLast();
    //   }
    // });

    // 页面加载时 获取年份下拉列表
    $.ajax({
        url: publicUrl_4 + '/dmArchdigproject/queryDataLicenseDate',
        data: {},
        success: function (res) {
            var str = '<option value="">所有</option>';
            for (var i = 0; i < res.data.length; i++) {
                str += '<option value=' + res.data[i].licenseDate + '>' + res.data[i].licenseDate + '</option>';
            }
            $('#years').html(str);
            judgeTheLast();
        }
    });

    // 点击搜索
    $('#search').on('click', function (e) {
        e.preventDefault();
        if (!$('#licenseNum').val() && !$('#years').val() && !$('#number').val()) {
            var allLicenseNum = '';
        } else {
            allLicenseNum = $('#licenseNum').val() + '[' + $('#years').val() + ']' + $('#number').val() + '号';
        }
        // 传参
        var formData = {
            pageNum: 1,
            pageSize: 20,
            dmArchData: [{
                archLeaderName: $('#archLeaderName').val(),
                digProject: $('#digProject').val(),
                allLicenseNum: allLicenseNum, // 执照号 三个拼一块
            }]
        };
        $.ajax({
            url: publicUrl_4 + '/dmArchdigproject/getPageDataByParam',
            data: JSON.stringify(formData),
            type: 'post',
            header: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            beforeSend: function (res) {
                res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                $('.modal-box').show();
            },
            success: function (res) {
                console.log(res)
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                var html = $('#tListOfAgencies').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$applyUnit$', res.data.dataList[i].applyUnit);
                    str = str.replace('$digProject$', res.data.dataList[i].digProject);
                    str = str.replace('$archLeaderName$', res.data.dataList[i].archLeaderName);
                    str = str.replace('$appAcreage$', res.data.dataList[i].appAcreage);
                    str = str.replace('$digDate$', res.data.dataList[i].digDate);
                    str = str.replace('$batchNoName$', res.data.dataList[i].license + '[' + res.data.dataList[i].licenseDate + ']' + res.data.dataList[i].licenseNum + '号');
                    content += str;
                }
                // console.log(content);
                $('#listOfAgencies').html(content);

                if (res.data.dataList.length) {
                    $('.M-box4').pagination({
                        pageCount: pages,
                        totalData: total,
                        jump: true,
                        count: 2,
                        current: 1,
                        homePage: '首页',
                        endPage: '尾页',
                        prevContent: '上一页',
                        nextContent: '下一页',
                        coping: true,
                        // isHide: true,
                        keepShowPN: true,
                        callback: function (api) {
                            formData.pageNum = api.getCurrent();
                            $.ajax({
                                url: publicUrl_4 + '/dmArchdigproject/getPageDataByParam',
                                data: JSON.stringify(formData),
                                type: 'post',
                                header: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                beforeSend: function (res) {
                                    res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    // console.log(res);
                                    $('.modal-box').hide();
                                    var html = $('#tListOfAgencies').html(),
                                        content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$applyUnit$', res.data.dataList[i].applyUnit);
                                        str = str.replace('$digProject$', res.data.dataList[i].digProject);
                                        str = str.replace('$archLeaderName$', res.data.dataList[i].archLeaderName);
                                        str = str.replace('$appAcreage$', res.data.dataList[i].appAcreage);
                                        str = str.replace('$digDate$', res.data.dataList[i].digDate);
                                        str = str.replace('$batchNoName$', res.data.dataList[i].license + '[' + res.data.dataList[i].licenseDate + ']' + res.data.dataList[i].licenseNum + '号');
                                        content += str;
                                    }
                                    $('#listOfAgencies').html(content);

                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#listOfAgencies').html('<tr><td colspan="9">暂无数据</td></tr>');
                }
            },
            complete: function () {
                $('.modal-box').hide();
            }
        });
    });

    // 重置
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#classification input,#classification select').each(function () {
            $(this).val('');
        });
    });

});