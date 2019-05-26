$(function () {
    $('#postdate').cxCalendar(); // 日历

    var msg = { // 页面和分页加载时显示的文本
        loadingHtml: '<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">数据加载中...</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>',
        noData: '<tr class="row text-center"><td colspan="5">暂无数据</td></tr>'
    };

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_3 + '/imArticleinfo/queryByConditionWithPage',
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    var queryString = getQuery(window.location.href);
    var column = queryString.column; // 分类
    var title = queryString.title; // 名称
    $('#info').text(' >> ' + title); // 导航

    // 封装一下
    function ajaxInfo(pageNumber, pageSize, column, keyword, postdate) {
        $.ajax({
            data: { column: column, pageNumber: pageNumber, pageSize: 20, keyword: keyword, postdate: postdate },
            beforeSend: function () {
                // $('#sheet-tbody').html(msg.loadingHtml);
                $('.modal-box').show(); // 点击分页的时候出现模态框，不让用户继续点击
            },
            success: function (res) {
                if (res.data.dataList.length) {
                    $('.modal-box').hide();
                    var html = $('#tSheet').html(),
                        content = '';
                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                        var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                        str = str.replace('$i$', i + 1);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoId$', res.data.dataList[i].infoId);
                        str = str.replace('$column$', column);
                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                        content += str;
                    }
                    $('#sheet-tbody').html(content);
                } else {
                    $('#sheet-tbody').html(msg.noData); // 没有数据显示暂无数据
                    $('.paging').hide();
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            }
        });
    }

    // 点击 检索 获取数据渲染表格 要传给后台5个参数
    $('#retrieve').on('click', function (e) {
        e.preventDefault();
        var keyword = $('#keywords').val(), // 关键字
            postdate = $('#postdate').val(); // 发布日期
        ajaxInfo(1, 20, column, keyword, postdate);
        $.ajax({
            data: { column: column, pageNumber: 1, pageSize: 20, keyword: keyword, postdate: postdate },
            success: function (res) {
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (res.data.dataList.length) {
                    $('.paging').hide();
                    if (pages > 1) {
                        $('.paging').show(); // 数据超过一页显示
                    }
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
                        keepShowPN: true,
                        callback: function (api) {
                            pageNumber = api.getCurrent();
                            ajaxInfo(pageNumber, 20, column, keyword, postdate);
                        }
                    });
                } else {
                    $('#sheet-tbody').html(msg.noData); // 没有数据显示暂无数据
                    $('.paging').hide();
                }
            }
        });
    }).click();

    // 点击重置按钮 清空输入框.
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#keywords,#postdate').val('');
    });
});