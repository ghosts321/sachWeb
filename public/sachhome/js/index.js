$(function () {
    // 国家文物局在线办事大厅 切换a下面的三角形
    $('.tal a').on('click', function () {
        var idx = $(this).index();
        // $(this).addClass('on').siblings().removeClass('on');
        // $('.header table').eq(idx).show().siblings().hide();
        // if (idx < 4) {  // 临时加跳转
        $(this).addClass('on').siblings().removeClass('on');
        $('.header table').eq(idx).show().siblings().hide();
        // } else {
        //     window.open('http://jcj.sach.gov.cn/', '_blank'); // 点击暂时跳转
        // }
        // $('.header table').eq(idx).show().siblings().hide();
        return false;
    });

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        // url: ip + ':3030/imArticleclass/getDataUseful', // 默认URL
        url: publicUrl_3 + '/imArticleclass/getDataUseful', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    // 页面加载时，获取行业综合管理分类下的栏目
    $.ajax({
        data: {
            pclassId: '0100000000'
        },
        success: function (res) {
            var str = '',
                len = res.data.length; // 数组的长度
            if (len) { // 数组有长度才有分类
                for (var i = 0; i < len; i++) {
                    str += '<span data-index=' + res.data[i].classId + '>' + res.data[i].infoNumBeg + '</span>';
                }
                // str += '<a href="more-normal.html" class="more">更多</a>';
                $('#management').html(str).find('span').eq(0).addClass('on'); // 给第一个分类加上蓝框
                $('#management span:first-child').click(); //在这里触发一下显示第一个分类
            }
        }
    });

    // 点击 行业综合管理下面的分类 用事件委托 给ajax异步加载的元素绑定事件
    $(document).on('click', '#management span', function () {
        $(this).addClass('on').siblings().removeClass('on'); // 点击不同分类切换蓝色边框效果
        var column = $(this).attr('data-index'); // 要传给后台的当前点击的分类
        $.ajax({
            url: publicUrl_3 + '/imArticleinfo/getPageDataByParam',
            data: {
                pagenum: 1,
                pagesize: 20,
                column: column
            },
            success: function (res) {
                var len = res.data.dataList.length; // 数组的长度
                if (len) { // 判断数组里面是否有数据 没有的话显示暂无数据
                    var html = $('#tManagement').html();
                    var content = ''
                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                        var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                        str = str.replace('$i$', i + 1);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                        str = str.replace('$infoId$', res.data.dataList[i].infoId);
                        str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                        content += str;
                    }
                    $('#management-table').html(content);
                } else {
                    $('#management-table').html('<tr class="row text-center"><td colspan="5">暂无数据</td></tr>');
                }
            }
        });
    });

    // 动态获取公共信息服务下面菜单
    $.ajax({
        url: publicUrl + '/isPublicinfoclass/getDataByParam',
        data: {},
        success: function (res) {
            console.log(res);
            var data = res.data;
            var html = '';
            var classId = $('.first-title').attr('data-classid'); // 资源信息的classId
            for (var i = 0; i < data.length; i++) {
                if (data[i].pclassId == classId) {
                    html += '<a class="colorable" href="" data-classid="' + data[i].classId + '">' + data[i].infoNumBeg + '<i></i></a>';
                }
            }
            $('.second-title').html(html);

            // 点击二级标题切换三角形
            $('.second-title a').on('click', function () {
                var idx = $(this).index();
                $(this).addClass('on').siblings('').removeClass('on');
            });

            // 点击二级标题切换三级标题
            $('.second-title a').on('click', function (e) {
                e.preventDefault();
                var category = $(this).closest('.category');
                var classId = $(this).attr('data-classId');
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pclassId == classId) {
                        html += '<a href="" class="col-xs-6 col-sm-6 col-md-4 col-lg-2" title="' + data[i].infoNumBeg + '" data-classId="' + data[i].classId + '"><img src="img/' + (data[i].webImageIndex != '' ? data[i].webImageIndex : 'new-link-img.png') + '" alt=""><span>' + data[i].infoNumBeg + '</span></a>';
                    }
                    category.find('.third-title').html(html);
                }

                var text = category.find('.third-title a:eq(0)').text(); // 点击二级标题切换三级标题
                category.find('.third-title a:eq(0)').addClass('on');
            });

            // 点击三级标题
            $('.category').on('click', '.third-title a', function (e) {
                e.preventDefault();
                var classId = $(this).attr('data-classId');
                if (classId == '0101010000') { // 中国的世界遗产
                    window.location.href = './service/public-info-service.html';
                } else if (classId == '0101020000') { // 全国重点文物保护单位
                    window.location.href = './service/national-key-units.html';
                } else if (classId == '0101030000') { // 历史文化名城
                    window.location.href = './service/historical-district.html?areaClass=1';
                } else if (classId == '0101040000') { // 历史文化名镇
                    window.location.href = './service/historical-district.html?areaClass=2';
                } else if (classId == '0101050000') { // 历史文化名村
                    window.location.href = './service/historical-district.html?areaClass=3';
                } else if (classId == '0101060000') { // 中国历史文化街区
                    window.location.href = './service/historical-district.html?areaClass=4';
                } else if (classId == '0102010000') { // 全国馆藏文物信息
                    window.location.href = './service/col-national-info.html';
                } else if (classId == '0102020000') { // 外国被盗文物数据库
                    window.location.href = './service/for-stolen-database.html';
                } else if (classId == '0103010000') { // 彩塑壁画数字化勘察测绘
                    window.location.href = './service/public-info-service.html';
                }
            });

            $('.category .second-title a:eq(0)').click();
        }
    });

    // 首页通知公告
    $('#ad').on('click', function () {
        $(this).parent().fadeOut('slow');
    });

    // 左侧文章
    $.ajax({
        url: publicUrl_6 + '/cmNoticeinfo/getDataByPlatDisp',
        data: {},
        success: function (res) {
            $('#publishDate').html(res.data[0].publishDate.substr(0, 10));
            $('#msgTitle').html(res.data[0].msgTitle);
            $('#msgCont').html(res.data[0].msgCont);
        }
    });

});