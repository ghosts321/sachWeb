$(function () {
    // 日历 实例化
    $('#receivedTime').cxCalendar();

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

    // 页面加载时 获取省份下拉列表
    $.ajax({
        data: { dataType: 'Province' },
        success: function (res) {
            // console.log(res);
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.Province) {
                str += '<option value=' + i + '>' + result.Province[i] + '</option>';
            }
            $('#province').html(str);
            judgeTheLast();
        }
    });

    // 搜索
    $('#search').on('click', function (e) {
        e.preventDefault();
        var data = { pageNumber: 1, pageSize: 20 };
        $('#list input,#list select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        $.ajax({
            // url: 'http://192.168.210.31:4040' + '/dmRelicsauctioninfo/getPageDataByParam',
            url: publicUrl_4 + '/dmRelicsauctioninfo/getPageDataByParam',
            data: data,
            success: function (res) {
                // console.log(res);
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                var html = $('#tReceiptNotice').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$receivedTime$', res.data.dataList[i].receivedTime);
                    str = str.replace('$instName$', res.data.dataList[i].instName);
                    str = str.replace('$applyId$', res.data.dataList[i].applyId);
                    str = str.replace('$instSname$', res.data.dataList[i].instSname);
                    str = str.replace('$auctionName$', res.data.dataList[i].auctionName);
                    str = str.replace('$auctionTime$', res.data.dataList[i].auctionTime);
                    str = str.replace('$auctionAddress$', res.data.dataList[i].auctionAddress);
                    str = str.replace('$auctionNumber$', res.data.dataList[i].auctionNumber);
                    str = str.replace('$apprOpinion$', res.data.dataList[i].apprOpinion);
                    content += str;
                }
                // console.log(content);
                $('#receiptNotice').html(content);
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
                            data.pageNumber = api.getCurrent();
                            $.ajax({
                                // url: 'http://192.168.210.31:4040' + '/dmRelicsassessinst/getPageDataByParam',
                                url: publicUrl_4 + '/dmRelicsauctioninfo/getPageDataByParam',
                                data: data,
                                beforeSend: function () {
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    // console.log(res);
                                    $('.modal-box').hide();
                                    var html = $('#tReceiptNotice').html(),
                                        content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$receivedTime$', res.data.dataList[i].receivedTime);
                                        str = str.replace('$instName$', res.data.dataList[i].instName);
                                        str = str.replace('$applyId$', res.data.dataList[i].applyId);
                                        str = str.replace('$instSname$', res.data.dataList[i].instSname);
                                        str = str.replace('$auctionName$', res.data.dataList[i].auctionName);
                                        str = str.replace('$auctionTime$', res.data.dataList[i].auctionTime);
                                        str = str.replace('$auctionAddress$', res.data.dataList[i].auctionAddress);
                                        str = str.replace('$auctionNumber$', res.data.dataList[i].auctionNumber);
                                        str = str.replace('$apprOpinion$', res.data.dataList[i].apprOpinion);
                                        content += str;
                                    }
                                    $('#receiptNotice').html(content);
                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#receiptNotice').html('<tr><td colspan="9">暂无数据</td></tr>');
                }
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