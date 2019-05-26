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
        if (status == 2) { // ststus等于4时 异步请求全部完成
            $('#search').click();
        }
    }

    // 页面加载时 获取省份下拉列表
    $.ajax({
        data: { dataType: 'Province' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.Province) {
                str += '<option value=' + i + '>' + result.Province[i] + '</option>';
            }
            $('#province').html(str);
            judgeTheLast();
        }
    });

    // 页面加载时 获取发布批次下拉列表
    $.ajax({
        data: { dataType: 'PublishBatch' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.PublishBatch) {
                str += '<option value=' + i + '>' + result.PublishBatch[i] + '</option>';
            }
            $('#batchNo').html(str);
            judgeTheLast();
        }
    });

    // 点击搜索
    $('#search').on('click', function (e) {
        e.preventDefault();

        var formData = {
            pageNum: 1,
            pageSize: 20,
            dmRelicinstData: [{
                "instName": $('#instName').val(), // 机构名称
                "corpName": $('#corpName').val(), // 姓名
                "batchNo": $('#batchNo').val(), // 批次
                "province": $('#province').val(), // 省份
            }]
        };
        console.log(formData);

        $.ajax({
            url: publicUrl_4 + '/dmRelicsassessinst/getPageDataByParam',
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
                console.log(res);
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
                    str = str.replace('$instName$', res.data.dataList[i].instName);
                    str = str.replace('$corpName$', res.data.dataList[i].corpName);
                    str = str.replace('$contactTel$', res.data.dataList[i].contactTel);
                    str = str.replace('$instAddress$', res.data.dataList[i].instAddress);
                    str = str.replace('$postCode$', res.data.dataList[i].postCode);
                    str = str.replace('$batchNoName$', res.data.dataList[i].batchNoName);
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
                                // url: 'http://192.168.210.31:4040' + '/dmRelicsassessinst/getPageDataByParam',
                                url: publicUrl_4 + '/dmRelicsassessinst/getPageDataByParam',
                                type: 'post',
                                data: JSON.stringify(formData),
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
                                        str = str.replace('$instName$', res.data.dataList[i].instName);
                                        str = str.replace('$corpName$', res.data.dataList[i].corpName);
                                        str = str.replace('$contactTel$', res.data.dataList[i].contactTel);
                                        str = str.replace('$instAddress$', res.data.dataList[i].instAddress);
                                        str = str.replace('$postCode$', res.data.dataList[i].postCode);
                                        str = str.replace('$batchNoName$', res.data.dataList[i].batchNoName);
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
                    $('#listOfAgencies').html('<tr><td colspan="6">暂无数据</td></tr>');
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