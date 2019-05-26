$(function () {
    var message = {
        mLoading: '<tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"><h4>数据加载中...</h4></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr>',
        noMsg: '<tr class="row text-center"><td colspan="7"><h5>暂无数据</h5></td></tr>',
        mError: '<tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"><h4>数据加载失败，请检查网络</h4></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr>',
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

    var status = 0,
        areaClass = getQuery(window.location.href).areaClass;
    switch (areaClass) {
        case '1':
            $('#title').html('历史文化名城');
            break;
        case '2':
            $('#title').html('历史文化名镇');
            break;
        case '3':
            $('#title').html('历史文化名村');
            break;
        case '4':
            $('#title').html('中国历史文化街区');
            break;
        default:
    }

    function judgeTheLast() { // 判断哪个异步请求最后返回 然后赋值、检索
        status++;
        if (status == 3) { // ststus等于2时 异步请求全部完成
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

    // 页面加载时 获取博物馆性质下拉列表
    $.ajax({
        data: { dataType: 'MuseumProperty' },
        success: function (res) {
            // console.log(res);
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.MuseumProperty) {
                str += '<option value=' + i + '>' + result.MuseumProperty[i] + '</option>';
            }
            $('#museumProperty').html(str);
            judgeTheLast();
        }
    });

    // 页面加载时 获取质量等级下拉列表
    $.ajax({
        data: { dataType: 'QualityLevel' },
        success: function (res) {
            // console.log(res);
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.QualityLevel) {
                str += '<option value=' + i + '>' + result.QualityLevel[i] + '</option>';
            }
            $('#qualityLevel').html(str);
            judgeTheLast();
        }
    });

    // 点击检索
    $('#search').on('click', function (e) {
        e.preventDefault();
        $that = $(this);
        var data = { pageNumber: 1, pageSize: 20 };
        $('#classification input,#classification select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        // 发起ajax请求
        $.ajax({
            url: publicUrl_4 + '/dmPublicmuseum/queryMuseumByCondition',
            data: data,
            beforeSend: function () {
                // $('.modal-box').show();
            },
            success: function (res) {
                console.log(res);
                // 这里想办法优化！ 这里和下面写重复了
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                var html = $('#tnaMuseumInfo').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$instName$', res.data.dataList[i].instName);
                    str = str.replace('$instName$', res.data.dataList[i].instName);
                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                    str = str.replace('$museumPropertyName$', res.data.dataList[i].museumPropertyName);
                    str = str.replace('$qualityLevelName$', res.data.dataList[i].qualityLevelName);
                    str = str.replace('$isFreeName$', res.data.dataList[i].isFreeName);
                    str = str.replace('$orderTelNo$', res.data.dataList[i].orderTelNo);
                    str = str.replace('$address$', res.data.dataList[i].address);
                    str = str.replace('$webSite$', res.data.dataList[i].webSite);
                    str = str.replace('$summary$', res.data.dataList[i].summary);
                    str = str.replace('$openTime$', res.data.dataList[i].openTime);
                    str = str.replace('$trafficInfo$', res.data.dataList[i].trafficInfo);
                    content += str;
                }
                $('#naSecurityUnit').html(content);

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
                        keepShowPN: true,
                        callback: function (api) {
                            data.pageNumber = api.getCurrent();
                            $.ajax({
                                url: publicUrl_4 + '/dmPublicmuseum/queryMuseumByCondition',
                                data: data,
                                beforeSend: function () {
                                    // $('.modal-box').show();
                                },
                                success: function (res) {
                                    // console.log(res);
                                    var html = $('#tnaMuseumInfo').html(),
                                        content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$instName$', res.data.dataList[i].instName);
                                        str = str.replace('$instName$', res.data.dataList[i].instName);
                                        str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                        str = str.replace('$museumPropertyName$', res.data.dataList[i].museumPropertyName);
                                        str = str.replace('$qualityLevelName$', res.data.dataList[i].qualityLevelName);
                                        str = str.replace('$isFreeName$', res.data.dataList[i].isFreeName);
                                        str = str.replace('$orderTelNo$', res.data.dataList[i].orderTelNo);
                                        str = str.replace('$address$', res.data.dataList[i].address);
                                        str = str.replace('$webSite$', res.data.dataList[i].webSite);
                                        str = str.replace('$summary$', res.data.dataList[i].summary);
                                        str = str.replace('$openTime$', res.data.dataList[i].openTime);
                                        str = str.replace('$trafficInfo$', res.data.dataList[i].trafficInfo);
                                        content += str;
                                    }
                                    $('#naSecurityUnit').html(content);
                                },
                                complete: function () {
                                    // $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#naSecurityUnit').html(message.noMsg);
                }
            },
            complete: function () {
                // $('.modal-box').hide(); // 让模态框隐藏 
            },
            error: function () {
                $('#naSecurityUnit').html(message.mError);
            }
        });
    });

    // 点击博物馆名称弹出模态框
    $(document).on('click', '.click-model img', function () {
        var instName = $(this).parent().attr('data-instName');
        var openTime = $(this).parent().attr('data-openTime');
        var trafficInfo = $(this).parent().attr('data-trafficInfo');
        var summary = $(this).parent().attr('data-summary');
        console.log(summary);
        openModal('<i>博物馆名称</i><p>' + instName + '</p><i>概述</i><p>' + summary + '</p><i>时间</i><p>' + openTime + '</p><i>交通</i><p>' + trafficInfo + '</p>', '全国博物馆名录');
    });

    // 点击重置输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#classification input,#classification select').each(function () {
            $(this).val('');
        });
    });
});