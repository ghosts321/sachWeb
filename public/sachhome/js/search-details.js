$(function(){
    // 日历
    $('#postdate').cxCalendar(); // 发布日期
    $('#worddate').cxCalendar(); // 成文日期

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_4 + '/dmDatadic/getDataDicFromRedis', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...' + err);
        }
    });

    var status = 0, // 定义一个变量 看最后的请求
        obj = getQuery(window.location.href);
    function judgeTheLast() { // 判断哪个异步请求最后返回 然后赋值、检索
        status++;
        if (status == 3) { // ststus等于3时 异步请求全部完成
            setInput();
            $('#search').click();
        }
    }
    function setInput() { // 把上个页面在输入框中的值通过url获取赋值到输入框中
        if (localStorage.getItem('isExist')) {
            $('#import input,#import select').each(function () {
                $(this).val(obj[$(this).attr('id')]); // 赋值到输入框、下拉框
            });
            $('#menu .item span[data-id=' + obj.column + ']').click();
        } else {
            $('#menu .item:eq(0)').click(); // 搜索框下面菜单栏设置为第一个为选中状态
        }
    }

    // 页面加载时 获取发文字号下拉列表
    $.ajax({
        data: { dataType: 'InfoNumBeg' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.InfoNumBeg) {
                str += '<option value=' + result.InfoNumBeg[i] + '>' + result.InfoNumBeg[i] + '</option>';
            }
            $('#postnumbeg').html(str);
            judgeTheLast();
        }
    });

    // 页面加载时 获取年份下拉列表
    $.ajax({
        url: publicUrl_2 + '/ioInfoPublicUtil/getYears',
        data: {},
        success: function (res) {
            if (res.state === '200') {
                var str = '<option value="">所有</option>';
                for (var i = 0, len = res.data.length; i < len; i++) {
                    str += '<option value=' + res.data[i] + '>' + res.data[i] + '</option>'
                }
                $('#postnummid').html(str);
                judgeTheLast();
            }
        }
    });

    // 页面加载时 获取规范性文件那一排 字段
    $.ajax({
        url: publicUrl_2 + '/ioGovinfopubclass/getDataByPclassIdUsefulDoor',
        data: { column: '0800000000', pagenum: 1, pagesize: 5 },
        success: function (res) {
            var html = $('#tMenu').html(),
                content = '<div class="col-lg-2 item"><span class="" data-id="0800000000" data-index="0">所有</span></div>';
            for (var i = 0, len = res.data.length; i < len; i++) {
                var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                str = str.replace('$classId$', res.data[i].classId);
                str = str.replace('$idx$', i + 1);
                str = str.replace('$infoNumBeg$', res.data[i].infoNumBeg);
                content += str;
            }
            // 给第一个加on
            $('#menu').html(content).find('.item').eq(0).children('span').addClass('on');
            judgeTheLast();
        }
    });

    // 点击规范性文件 那一排 切换背景色
    var data_id; // 定义一个变量 保存搜索时点击的那个菜单项 传递给下面的column
    $(document).on('click', ".menu .item", function (e) {
        $(this).children('span').addClass('on').end().siblings().children('span').removeClass('on');
        data_id = $(this).children('span').attr('data-id');
        $('#search').click();
    });

    // 点击检索
    $('#search').on('click', function (e) {
        e.preventDefault();
        var data = { pagenum: 1, pagesize: 5, column: data_id };
        $('#import input,#import select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        var standardRed = data.content, // 标红的全文
            title = data.title;   // 标红的标题
        $.ajax({
            url: publicUrl_2 + '/ioGovInfoPublic/queryByConditionWithPageGateway',
            data: data,
            beforeSend: function () {
                // $('#result').html('<h3>正在加载中...</h3>');
                $('.modal-box').show();
            },
            success: function (res) {
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                var html = $('#tResult').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var sub = res.data.dataList[i].infoTitle; // 先把获取的文章保存到一个变量中
                    if (title) { // 只有用户搜索标题的时候显示标红文本
                        sub = sub.replace(new RegExp(title, 'g'), '<span class="standardred">' + title + '</span>'); // 标红的文本
                    }
                    var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                    str = str.replace('$infoID$', res.data.dataList[i].infoID);
                    str = str.replace('$standardRed$', standardRed); // 标红传递给详情页面的
                    str = str.replace('$infoTitle$', sub);
                    str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                    str = str.replace('$writtenDate$', res.data.dataList[i].writtenDate.substr(0, 10));
                    str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                    str = str.replace('$column$', data_id);
                    content += str;
                }
                $('#result').html(content);

                if (res.data.dataList.length) {
                    $('.paging').show(); // 写在前面 有数据的时候让分页显示出来
                    $('.M-box4').pagination({
                        pageCount: pages,
                        totalData: total,
                        jump: true,
                        count: 2,
                        isHide: true,
                        current: 1,
                        homePage: '首页',
                        endPage: '尾页',
                        prevContent: '上一页',
                        nextContent: '下一页',
                        coping: true,
                        keepShowPN: true,
                        callback: function (api) {
                            data.pagenum = api.getCurrent();
                            $.ajax({
                                url: publicUrl_2 + '/ioGovInfoPublic/queryByConditionWithPageGateway',
                                data: data,
                                beforeSend: function () {
                                    // $('#result').html('<h3>正在加载中...</h3>');
                                    $('.modal-box').show(); // 点击分页的时候出现模态框，不让用户继续点击
                                },
                                success: function (res) {
                                    $('.modal-box').hide();
                                    var html = $('#tResult').html();
                                    var content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var sub = res.data.dataList[i].infoTitle; // 先把获取的文章保存到一个变量中
                                        if (title) { // 只有用户搜索标题的时候显示标红文本
                                            sub = sub.replace(new RegExp(title, 'g'), '<span class="standardred">' + title + '</span>'); // 标红的文本
                                        }
                                        var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                                        str = str.replace('$infoID$', res.data.dataList[i].infoID);
                                        str = str.replace('$standardRed$', standardRed); // 标红传递给详情页面的
                                        str = str.replace('$infoTitle$', sub);
                                        str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                                        str = str.replace('$writtenDate$', res.data.dataList[i].writtenDate.substr(0, 10));
                                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                                        str = str.replace('$column$', data_id);
                                        content += str;
                                    }
                                    $('#result').html(content);
                                }
                            });
                        }
                    });
                } else {
                    $('#result').html('<h3>暂无数据</h3>');
                    $('.paging').hide();
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            }
        });
    });

    // 点击重置按钮 清空所有输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#import input,#import select').each(function () {
            $(this).val('');
        });
        $('#menu .item:eq(0)').click(); // 搜索框下面菜单栏设置为第一个为选中状态
        localStorage.removeItem('isExist'); // 删除设置的localStorage
    });
});