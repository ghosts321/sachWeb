$(function () {
    var message = {
        mLoading: '<tr class="row text-center"><td colspan="7"><h5>数据加载中...</h5></td></tr>',
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
            console.log('ajax请求出错了...');
        }
    });

    var status = 0;

    function judgeTheLast() { // 判断哪个异步请求最后返回 然后赋值、检索
        status++;
        if (status == 1) { // ststus等于2时 异步请求全部完成
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

    // 点击检索
    $('#search').on('click', function (e) {
        e.preventDefault();
        $that = $(this);
        var formData = {
            pageNum: 1,
            pageSize: 20,
            isArchFormData: [{
                "unitName": $('#unitName').val(), // 单位名称
                "reserve1": $('#province').val(), // 省份
                "manageUnit": $('#manageUnit').val(), // 主管单位
                "unitId": $('#unitId').val(), // 编号
            }]
        };
        console.log(formData);

        // 发起ajax请求
        $.ajax({
            // url: 'http://192.168.211.94:2020' + '/isArchaeologyunit/getPageDataByParam',
            url: publicUrl + '/isArchaeologyunit/getPageDataByParam',
            type: 'post',
            data: JSON.stringify(formData),
            header: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            beforeSend: function (res) {
                res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                $('.modal-box').show();
            },
            success: function (res) {
                console.log(res);
                // 这里想办法优化！ 这里和下面写重复了
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total, // 数据总条数
                    dataList = res.data.dataList; // 数据内容
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                var html = $('#tQualificationUnitList').html(),
                    content = '';
                for (var i = 0, len = dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$unitId$', dataList[i].unitId);
                    str = str.replace('$unitName$', dataList[i].unitName);
                    str = str.replace('$address$', dataList[i].address);
                    str = str.replace('$corpName$', dataList[i].corpName);
                    str = str.replace('$manageUnit$', dataList[i].manageUnit);
                    str = str.replace('$postalCode$', dataList[i].postalCode);
                    str = str.replace('$contactTel$', dataList[i].contactTel);
                    content += str;
                }
                $('#qualificationUnit').html(content);

                if (dataList.length) {
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
                            formData.pageNum = api.getCurrent();
                            $.ajax({
                                // url: 'http://192.168.211.94:2020' + '/isArchaeologyunit/getPageDataByParam',
                                url: publicUrl + '/isArchaeologyunit/getPageDataByParam',
                                type: 'post',
                                data: JSON.stringify(formData),
                                header: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                beforeSend: function (res) {
                                    res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    // console.log(res);
                                    var dataList = res.data.dataList; // 数据内容
                                    var html = $('#tQualificationUnitList').html(),
                                        content = '';
                                    for (var i = 0, len = dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$unitId$', dataList[i].unitId);
                                        str = str.replace('$unitName$', dataList[i].unitName);
                                        str = str.replace('$address$', dataList[i].address);
                                        str = str.replace('$corpName$', dataList[i].corpName);
                                        str = str.replace('$manageUnit$', dataList[i].manageUnit);
                                        str = str.replace('$postalCode$', dataList[i].postalCode);
                                        str = str.replace('$contactTel$', dataList[i].contactTel);
                                        content += str;
                                    }
                                    $('#qualificationUnit').html(content);
                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#qualificationUnit').html(message.noMsg);
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            },
            error: function (res) {
                console.log('ajax请求失败...')
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