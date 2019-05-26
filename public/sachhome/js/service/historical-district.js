$(function () {
    var message = {
        mLoading: '<tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"><h4>数据加载中...</h4></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr><tr class="row text-center"><td colspan="7"></td></tr>',
        noMsg: '<tr class="row text-center"><td colspan="7"><h5>暂无数据</h5></td></tr>',
        mError: '<tr class="row text-center"><td colspan="7"><h5>数据加载失败，请检查网络</h5></td></tr>',
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
        if (status == 2) { // ststus等于2时 异步请求全部完成
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

    // 页面加载时 获取发布批次下拉列表
    $.ajax({
        url: publicUrl_4 + '/dmHiscurarea/getPublishBatch',
        data: { areaClass: areaClass },
        success: function (res) {
            console.log(res);
            var str = '<option value="">所有</option>';
            for (var i = 0; i < res.data.length; i++) {
                str += '<option value=' + res.data[i].PublishBatch + '>' + res.data[i].publishBatchName + '</option>';
            }
            $('#publishBatch').html(str);
            judgeTheLast();
        }
    });

    // 点击检索
    $('#search').on('click', function (e) {
        e.preventDefault();
        $that = $(this);
        var data = { pageNumber: 1, pageSize: 20, areaClass: areaClass };
        $('#classification input,#classification select').each(function () {
            data[$(this).attr('id')] = $(this).val(); // 获取所有输入框的值
        });
        // 发起ajax请求
        $.ajax({
            url: publicUrl_4 + '/dmHiscurarea/queryHiscurareaByCondition',
            data: data,
            beforeSend: function () {
                $('.modal-box').show();
            },
            success: function (res) {
                // console.log(res);
                // 这里想办法优化！ 这里和下面写重复了
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                $('.modal-box').hide();
                var html = $('#tCulturalCity').html(),
                    content = '';
                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$areaName$', res.data.dataList[i].areaName);
                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                    str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
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
                        // isHide: true,
                        keepShowPN: true,
                        callback: function (api) {
                            data.pageNumber = api.getCurrent();
                            $.ajax({
                                url: publicUrl_4 + '/dmHiscurarea/queryHiscurareaByCondition',
                                data: data,
                                beforeSend: function () {
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    // console.log(res);
                                    $('.modal-box').hide();
                                    var html = $('#tCulturalCity').html(),
                                        content = '';
                                    for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$areaName$', res.data.dataList[i].areaName);
                                        str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                        str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
                                        content += str;
                                    }
                                    $('#naSecurityUnit').html(content);
                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#naSecurityUnit').html(message.noMsg);
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            },
            error: function () {
                $('#naSecurityUnit').html(message.mError);
            }
        });
    });

    // 点击重置输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#classification input,#classification select').each(function () {
            $(this).val('');
        });
    });
});