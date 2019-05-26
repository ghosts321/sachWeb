$(function(){
    // 日历 实例化
    $('#postdate').cxCalendar();
    $('#worddate').cxCalendar();

    var message = { // 页面和分页加载时显示的文本
        mLoading: '<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">数据加载中...</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>', noMsg: '<tr class="row text-center"><td colspan="5">暂无数据</td></tr>',
    }

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_2 + '/ioGovInfoPublic/queryByConditionWithPageGateway', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...' + err);
        }
    });

    // 定义一个函数 获取顶部url传过来的参数
    var status = 0,
        obj = getQuery(window.location.href);
    function judgeTheLast() { // 定义一个函数 判断哪个异步请求最后返回
        status++;
        if (status == 4) {
            setInput();
            $('#retrieve').click();
        }
    }
    function setInput() { // 把上个页面在输入框中的值通过url获取赋值到输入框中       
        if ('cat' in obj) {
            $('#postOffice').val(obj.cat);
        } else if ('the' in obj) {
            $('#column').val(obj.the);
        }
    }

    // 页面加载时 获取机构分类下拉列表
    $.ajax({
        url: publicUrl_5 + '/inst/aaSachinst/getDataByParam',
        data: { sinstId: 'Gj00000000' },
        success: function (res) {
            var result = res.data,
                str = '<option value="">所有</option>';
            for (var i = 0; i < result.length; i++){
                str += '<option value=' + result[i].instName + '>' + result[i].instName + '</option>';
            }
            $('#postOffice').html(str);
            judgeTheLast();
        }
    });

    // 页面加载时 获取发文字号下拉列表
    $.ajax({
        url: publicUrl_4 + '/dmDatadic/getDataDicFromRedis',
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

    // 页面加载时 获取信息分类下拉列表
    $.ajax({
        url: publicUrl_2 + '/ioGovinfopubclass/getDataByPclassIdUsefulDoor',
        data: { column: '0402000000' },
        success: function (res) {
            var str = '<option value="">所有</option>'; // 为了上一篇下一篇 新加的 
            for (var i = 0, len = res.data.length; i < len; i++) {
                str += '<option value=' + res.data[i].classId + '>' + res.data[i].infoNumBeg + '</option>';
            }
            $('#column').html(str);
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

    // 点击 检索 获取数据渲染表格 
    $('#retrieve').on('click', function (e) {
        e.preventDefault();
        var data = { pagenum: 1, pagesize: 20 };
        $('#search-info input,#search-info select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        var standardRed = data.content, // 标红的内容
            title = data.title,   // 标红的标题
            column = $('#column').val();
        // 发起ajax请求
        $.ajax({
            data: data,
            beforeSend: function () {
                // $('#sheet-content').html(message.mLoading);
                $('.modal-box').show(); // 点击分页的时候出现模态框，不让用户继续点击
            },
            success: function (res) {
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                // 一封装就会有很奇怪的问题 分页延迟加载 标题有代码
                var html = $('#tSheetContent').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var sub = res.data.dataList[i].infoTitle; // 标红文章标题 
                    if (title) { // 只有用户搜索标题的时候显示标红文本
                        sub = sub.replace(new RegExp(title, 'g'), '<span class="standardred">' + title + '</span>'); // 优化用户体验 用正则找到要替换的变量 给span加了一个类专用于显示标红的文本
                    }
                    var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                    str = str.replace('$standardRed$', standardRed); // 搜索结果关键字标红
                    str = str.replace('$infoID$', res.data.dataList[i].infoID);
                    str = str.replace('$i$', (i + 1) + (data.pagenum - 1) * 20); // 每次发ajax请求更新序号
                    str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                    str = str.replace('$infoTitle$', sub); // 这里不用获取的 用自己处理过的sub
                    str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                    str = str.replace('$column$', column);
                    content += str;
                }
                $('#sheet-content').html(content);

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
                                data: data,
                                beforeSend: function () {
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    var html = $('#tSheetContent').html(),
                                        content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var sub = res.data.dataList[i].infoTitle; // 标红文章标题 
                                        if (title) { // 只有用户搜索标题的时候显示标红文本
                                            sub = sub.replace(new RegExp(title, 'g'), '<span class="standardred">' + title + '</span>'); // 优化用户体验 用正则找到要替换的变量 给span加了一个类专用于显示标红的文本
                                        }
                                        var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                                        str = str.replace('$standardRed$', standardRed); // 搜索结果关键字标红
                                        str = str.replace('$infoID$', res.data.dataList[i].infoID);
                                        str = str.replace('$i$', (i + 1) + (data.pagenum - 1) * 20); // 序号
                                        str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                                        str = str.replace('$infoTitle$', sub); // 这里不用获取的 用自己处理过的sub
                                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                                        str = str.replace('$column$', column);
                                        content += str;
                                    }
                                    $('#sheet-content').html(content);
                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#sheet-content').html(message.noMsg);
                    $('.paging').hide();
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            }
        });
    });

    // 回车事件
    // document.onkeydown = function(e){   
    //   if(e.keyCode == 13){   
    //     retrieve.click();  
    //   }   
    // } 

    // 点击重置输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#search-info input,#search-info select').each(function () {
            $(this).val('');
        });
    });

    // 点击滑动切换
    $('.dotted-line img').on('click', function () {
        $('.drop-down-box').slideToggle('slow');
    });
});