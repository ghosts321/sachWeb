$(function () {
    $('#postdate').cxCalendar(); // 日历

    var msg = { // 页面和分页加载时显示的文本
        loadingHtml: '<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">数据加载中...</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>',
        noData: '<tr class="row text-center"><td colspan="5">暂无数据</td></tr>'
    }

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_6 + '/cmNoticeinfo/getPageDataByParam', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('出错了...' + err);
        }
    });

    // 封装一下
    function ajaxInfo(pagenum, pagesize, postdate, token) {
        $.ajax({
            data: { pageNumber: pagenum, pageSize: 20, publicdate: postdate, token: getData('token') },
            beforeSend: function () {
                $('.modal-box').show(); // 点击分页的时候出现模态框，不让用户继续点击
            },
            success: function (res) {
                console.log(res)
                if (res.data.dataList.length) {
                    $('.modal-box').hide();
                    var html = $('#tSheet').html(),
                        content = '';
                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                        var str = html;
                        str = str.replace('$infoID$', res.data.dataList[i].noticeId);
                        str = str.replace('$i$', (i + 1) + (pagenum - 1) * 20);
                        // str = str.replace('$column$', column);
                        // str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                        str = str.replace('$infoTitle$', res.data.dataList[i].msgTitle);
                        str = str.replace('$displayDate$', res.data.dataList[i].publishDate.substr(0, 10));
                        // str = str.replace('$className$', res.data.dataList[i].className);
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
        var postdate = $('#postdate').val(); // 发布日期
        ajaxInfo(1, 20, postdate);
        $.ajax({
            data: { pageNumber: 1, pageSize: 20, publicdate: postdate, token: getData('token') },
            success: function (res) {
                $('.modal-box').hide(); // 隐藏模态框
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (res.data.dataList.length) {
                    $('.paging').show(); // 写在前面 有数据的时候让分页显示出来
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
                            pagenum = api.getCurrent();
                            token = getData('token');
                            ajaxInfo(pagenum, 20, postdate, token);
                        }
                    });
                } else {
                    // $('#sheet-tbody').html(msg.noData); // 没有数据显示暂无数据
                    // $('.paging').hide();
                }
            }
        });
    }).click();

    // 点击重置按钮 清空输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#keywords,#postdate').val('');
        // $('#retrieve').click(); // 触发点击搜索事件
    });
});