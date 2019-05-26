$(function(){
    // 默认 日历插件
    $('#postdate').cxCalendar();
    $('#worddate').cxCalendar();

    var loadingHtml = { // 页面和分页加载时显示的文本
        tCatalog: '<tr class="row text-center"><td colspan="4">数据加载中...</td></tr>',
        noMsg: '<tr class="row text-center"><td colspan="4">暂无数据</td></tr>'
    }

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
            // 给第一个加on 默认点击一下第一个栏目
            $('#menu').html(content).find('.item').eq(0).children('span').addClass('on').click();
        }
    });

    // 点击规范性文件 那一排 切换背景色
    var data_id; // 定义一个变量 保存搜索时点击的那个菜单项 传递给下面的column
    $(document).on('click', ".menu .item", function (e) {
        $(this).children('span').addClass('on').end().siblings().children('span').removeClass('on');
        data_id = $(this).children('span').attr('data-id');
    });

    // 点击检索按钮时 把所有输入框里的内容发送给后台
    $('#search').on('click', function () {
        var data = { pagenum: 1, pagesize: 5, column: data_id };
        $('#import input,#import select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        // 修改a标签里的href属性的地址 点击a标签跳转到这个地址，并且把参数通过url传过去
        var url = 'search-details.html?column=' + data.column + '&pagenum=' + data.pagenum + '&pagesize=' + data.pagesize + '&postdate=' + data.postdate + '&worddate=' + data.worddate + '&title=' + data.title + '&postnumbeg=' + data.postnumbeg + '&postnummid=' + data.postnummid + '&postnumend=' + data.postnumend + '&content=' + data.content;
        $('#search').attr('href', url);
        // 定义一个状态 存到localStorage中 用于下个页面把数据写入到输入框中
        if (window.localStorage) {
            localStorage.setItem('isExist', 'true');
        }
    });

    //点击 规范性文件那一排 渲染下面的表格
    var idx; // 这里必须设置成全局的
    $(document).on('click', "#menu span", function (e) {
        idx = $(this).attr('data-index');
        var $that = $(this),
            column = $(this).attr('data-id');
        $.ajax({
            url: publicUrl_2 + '/ioGovInfoPublic/queryByConditionWithPageGateway',
            data: { column: column, pagenum: 1, pagesize: 10 },
            beforeSend: function () {
                $('#reference-body').html(loadingHtml.tCatalog);
            },
            success: function (res) {
                if (res.data.dataList.length) {
                    // 如果相等 说明此时发回的是我最后点击的链接发回的请求      
                    if ($that.attr('data-index') == idx) {
                        var html = $('#tReference').html(),
                            content = '';
                        for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                            var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                            str = str.replace('$infoID$', res.data.dataList[i].infoID);
                            str = str.replace('$i$', i + 1);
                            str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                            str = str.replace('$infoIndex$', res.data.dataList[i].infoIndex);
                            str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                            str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                            str = str.replace('$column$', column);
                            // str = str.replace('$postOffice$', res.data.dataList[i].postOffice);
                            content += str;
                        }
                        $('#reference-body').html(content);
                    }
                } else {
                    $('#reference-body').html(loadingHtml.noMsg);
                }
            }
        });
    });

    // 点击重置按钮 清空所有输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#import input,#import select').each(function () {
            $(this).val('');
        });
        $('#menu .item').eq(0).children('span').click(); // 规范性文件那一排默认加载所有
    });
});