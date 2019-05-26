$(function(){
    var message = { // 页面和分页加载时或失败时显示的文本
        mLoading: '<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">数据加载中...</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>',
        mError: '<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">数据加载失败，请检查网络</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>',
        mThemeLoading: '<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">数据加载中...</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>',
    }

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_2 + '/ioGovInfoPublic/queryByConditionWithPageGateway', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('出错了...' + err);
        }
    });

    // 页面加载时 获取政府信息公开规定下面表格相应的内容
    // $.when(
        $.ajax({
            data: { pagenum: 1, pagesize: 5, column: $('#provide').attr('data-index') },
            beforeSend: function () {
                $('#provide-tbody').html(message.mLoading);
            },
            success: function (res) {
                // alert(1);            
                if (res.data.dataList.length) {
                    var html = $('#tProvide').html();
                    var content = '';
                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                        var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                        str = str.replace('$i$', i + 1);
                        str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                        str = str.replace('$infoID$', res.data.dataList[i].infoID);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                        content += str;
                    }
                    $('#provide-tbody').html(content);
                } else {
                    $('#provide-tbody').html('<tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5">暂无数据</td></tr><tr class="row text-center"><td colspan="5"></td></tr><tr class="row text-center"><td colspan="5"></td></tr>');
                }
            },
            error: function () {
                $('#provide-tbody').html(message.mError);
            }
        })
    //     .done(function (data) {
    //         alert(2);
    //     })
    // );

    // 页面加载时，获取按主题分类下的栏目
    $.ajax({
        url: publicUrl_2 + '/ioGovinfopubclass/getDataByPclassIdUsefulDoor',
        data: { column: '0402000000' },
        success: function (res) {
            console.log(res);
            var arr = res.data.slice(0, 11);
            // console.log(arr);
            // arr.splice(2, 1); // 隐藏政策解读 放到左侧链接
            // console.log(arr)
            arr2 = res.data.slice(11);
            str = '';
            str2 = '';
            if (res.data.length) {
                for (var i = 0, len = arr.length; i < len; i++) { // 上面那一排ul的分类列表
                    str += '<li class="decoration"><a data-index=' + arr[i].classId + ' href="">' + arr[i].infoNumBeg + '</a></li>';
                }
                for (var j = 0, len2 = arr2.length; j < len2; j++) { // 下面那一排ul的分类列表
                    str2 += '<li class="decoration"><a data-index=' + arr2[j].classId + ' href="">' + arr2[j].infoNumBeg + '</a></li>';
                }
                $('#theme1').html(str).find('li').eq(0).addClass('current');
                $('#theme2').html(str2);
                $("#content a:contains('通知公告')").css('color','red');
            }
        },
        complete: function () {
            $('#content #theme1 li:first-child a').click(); // 触发一下第一个链接
        }
    });

    // 点击按机构分类下的某一个分类 右下方的更多 跳到更多页面相应的搜索内容
    $('#mechanism-more').on('click', function () {
        var $that = $(this); // 缓存this
        var $href = 'gov-info-dir.html?cat=';
        $('#sort span').each(function (index) {
            if ($(this).hasClass('on')) { // 判断哪一个有on
                var idx = $(this).attr('data-index'); // 当前分类的自定义属性
                var href = $href + idx; //拼接一下网址 
                $that.attr('href', href); // 赋值到按机构分类 右下方的更多
            }
        });
    });

    // 点击按主题分类下的某一个分类 右下方的更多 跳到更多页面相应的搜索内容
    $('#theme-more').on('click', function () {
        var $that = $(this); // 缓存this
        var $href = 'gov-info-dir.html?the=';
        $('#theme1 a,#theme2 a').each(function (index) {
            // console.log($(this));
            if ($(this).parent().hasClass('current')) { // 判断哪一个有on
                var idx = $(this).attr('data-index'); // 当前分类的自定义属性
                var href = $href + idx; //拼接一下网址 
                $that.attr('href', href); // 赋值到按主题分类 右下方的更多
            }
        });
    });

    // 点击 政府信息公开目录下面 按机构分类 菜单 获取相应的内容  
    $('#sort span').on('click', function () {
        $.ajax({
            // 注意！ 此处传的不是column，而是postorg postorg改了改成postOffice了 column去掉了
            data: { pagenum: 1, pagesize: 5, postOffice: $(this).attr('data-index') },
            beforeSend: function () {
                $('#catalog-tbody').html(message.mLoading);
            },
            success: function (res) {
                if (res.data.dataList.length) { // 判断数组里面是否有数据 没有的话显示暂无数据
                    var html = $('#tCatalog').html();
                    var content = '';
                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                        var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                        str = str.replace('$infoID$', res.data.dataList[i].infoID);
                        str = str.replace('$i$', i + 1);
                        str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                        str = str.replace('$className$', res.data.dataList[i].className);
                        content += str;
                    }
                    $('#catalog-tbody').html(content);
                } else {
                    $('#catalog-tbody').html('<tr class="row text-center"><td colspan="5">暂无数据</td></tr>');
                }
            },
            error: function () {
                // $('#no-msg').text('数据加载失败，请检查网络');
                $('#catalog-tbody').html(message.mError);
            }
        });
    });
    $('#sort span:first-child').click();

    // 封装一下
    function ajaxInfo(pagenum, pagesize, column) {
        $.ajax({
            data: { pagesize: pagesize, pagenum: pagenum, column: column },
            beforeSend: function () {
                $('.modal-box').show();
            },
            success: function (res) {
                // console.log(res);
                if (res.data.dataList.length) {
                    var html = $('#tTheme').html(),
                        content = '';
                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                        var str = html;
                        str = str.replace('$infoID$', res.data.dataList[i].infoID);
                        str = str.replace('$i$', (i + 1) + (pagenum - 1) * 7); // 序号依次递增
                        str = str.replace('$infoNum$', res.data.dataList[i].infoNum);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                        str = str.replace('$postOffice$', res.data.dataList[i].postOffice);
                        str = str.replace('$postOffice$', res.data.dataList[i].postOffice);
                        str = str.replace('$column$', column);
                        content += str;
                    }
                    $('#theme-tbody').html(content);
                } else {
                    $('#theme-tbody').html('<tr class="row text-center"><td colspan="5">暂无数据</td></tr>');
                    $('.paging').hide();
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            },
            error: function () {
                $('#theme-tbody').html(message.mError);
            }
        });
    }

    // 可以用事件委托 给ajax异步加载的元素绑定事件
    $(document).on('click', "#content li a", function (e) {
        e.preventDefault();
        $(this).parent().addClass('current').siblings().removeClass('current').end().parent().siblings('ul').children('li').removeClass('current'); // 两个ul下的li都要清除current
        var column = $(this).attr('data-index'); //当前点击的链接的索引值
        ajaxInfo(1, 7, column);
        $.ajax({
            data: { pagenum: 1, pagesize: 7, column: column },//当前点击的链接的索引值
            success: function (res) {
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (res.data.dataList.length) {
                    $('.paging').show();
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
                            console.log(column);
                            ajaxInfo(pagenum, 7, column);
                        }
                    });
                } else { // 说明返回的数组为空 此时没数据
                    $('#theme-tbody').html('<tr class="row text-center"><td colspan="5">暂无数据</td></tr>');
                    $('.paging').hide();
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            }
        });
    });
});