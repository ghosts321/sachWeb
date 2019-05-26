$(function () {
    var message = {
        mLoading: '<tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"><h4>数据加载中...</h4></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr>',
        noMsg: '<tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"><h4>暂无数据</h4></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr>',
        mError: '<tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"><h4>数据加载失败，请检查网络</h4></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr><tr class="row text-center"><td colspan="6"></td></tr>',
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

    var status = 0, // 定义一个变量 看最后的请求
        obj = getQuery(window.location.href);
    function judgeTheLast() { // 判断哪个异步请求最后返回 然后赋值、检索
        status++;
        if (status == 3) { // ststus等于3时 异步请求全部完成
            setInput();
            $('#search').click();
            // if(window.localStorage){ // 刷新之后没有了
            //   localStorage.removeItem('museum');
            // }
        }
    }
    function setInput() { // 把上个页面在输入框中的值通过url获取赋值到输入框中
        if (localStorage.getItem('museum')) {
            $('#collection input,#collection select').each(function () {
                $(this).val(obj[$(this).attr('id')]); // 赋值到输入框、下拉框
            });
        }
    }

    // 页面加载时 获取藏品类别下拉列表
    $.ajax({
        data: { dataType: 'CulturalClass' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.CulturalClass) {
                str += '<option value=' + i + '>' + result.CulturalClass[i] + '</option>';
            }
            $('#culturalClass').html(str);
            judgeTheLast();
        }
    });

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

    // 页面加载时 获取年代下拉列表
    $.ajax({
        data: { dataType: 'Years' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.Years) {
                var interceptStr = result.Years[i]; // 截取字符串长度
                if (result.Years[i].length >= 15) {
                    interceptStr = result.Years[i].substring(0, 12) + '..';
                }
                str += '<option title=' + result.Years[i] + ' value=' + i + '>' + interceptStr + '</option>';
            }
            $('#age').html(str);
            $("#age").change(function () { // 获取下拉框的文本值
                var checkText = $(this).find('option:selected').attr('title');
                $(this).attr('title', checkText); // 修改title值
            });
            judgeTheLast();
        }
    });

    // 点击检索
    var $timer = null; // 300毫秒之后显示加载中...
    $('#search').on('click', function (e) {
        e.preventDefault();
        $that = $(this);
        var data = { pageNumber: 1, pageSize: 10 };
        $('#collection input,#collection select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        // 发起ajax请求
        $.ajax({
            url: publicUrl_4 + '/dmPublicrelics/queryDataByPublicrelics',
            data: data,
            beforeSend: function () {
                $timer = setTimeout(function () {
                    $('#museum-search-tbody').html(message.mLoading);
                    $('.modal-box').show();
                    $that.text('检索中').addClass('disabled'); // 禁止点击搜索按钮
                }, 0);
            },
            success: function (res) {
                // 这里想办法优化！ 这里和下面写重复了
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                $('.modal-box').hide();
                var html = $('#tMuseumSearch').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var str = html; // 重新设置为模板内容
                    str = str.replace('$antiqueId$', res.data.dataList[i].antiqueId);
                    str = str.replace('$antiqueName$', res.data.dataList[i].antiqueName);
                    str = str.replace('$culturalClassName$', res.data.dataList[i].culturalClassName);
                    str = str.replace('$ageName$', res.data.dataList[i].ageName);
                    str = str.replace('$museumName$', res.data.dataList[i].museumName);
                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                    content += str;
                }
                $('#museum-search-tbody').html(content);

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
                                url: publicUrl_4 + '/dmPublicrelics/queryDataByPublicrelics',
                                data: data,
                                beforeSend: function () {
                                    $timer = setTimeout(function () {
                                        $('#museum-search-tbody').html(message.mLoading);
                                        $('.modal-box').show();
                                    }, 500);
                                },
                                success: function (res) {
                                    $('.modal-box').hide();
                                    var html = $('#tMuseumSearch').html(),
                                        content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var str = html; // 重新设置为模板内容
                                        str = str.replace('$antiqueId$', res.data.dataList[i].antiqueId);
                                        str = str.replace('$antiqueName$', res.data.dataList[i].antiqueName);
                                        str = str.replace('$culturalClassName$', res.data.dataList[i].culturalClassName);
                                        str = str.replace('$ageName$', res.data.dataList[i].ageName);
                                        str = str.replace('$museumName$', res.data.dataList[i].museumName);
                                        str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                        content += str;
                                    }
                                    $('#museum-search-tbody').html(content);
                                },
                                complete: function () {
                                    clearTimeout($timer);
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#museum-search-tbody').html(message.noMsg);
                }
            },
            complete: function () {
                clearTimeout($timer);
                $('.modal-box').hide(); // 让模态框隐藏 
                $that.text('检索').removeClass('disabled');
            },
            error: function () {
                $('#museum-search-tbody').html(message.mError);
            }
        });
    });

    // 点击重置输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#collection input,#collection select').each(function () {
            $(this).val('');
        });
        if (window.localStorage) {
            localStorage.removeItem('museum');
        }
    });

});