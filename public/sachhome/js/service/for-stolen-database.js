$(function () {
    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_4 + '/dmForeignloserelic/getPageDataByParam', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    // 点击搜索
    $('#search').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            url: publicUrl_4 + '/dmForeignloserelic/getPageDataByParam',
            data: {
                pageNum: 1,
                pageSize: 20,
                publishBatch: $('#publishBatch').val(), // 批次
                noticeCountry: $('#noticeCountry').val(), // 通报国
            },
            beforeSend: function (res) {
                $('.modal-box').show();
            },
            success: function (res) {
                console.log(res);
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                var dataList = res.data.dataList;
                var html = $('#tForStolenDatabase').html(),
                    content = '';
                for (var i = 0, len = dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$publishBatch$', dataList[i].publishBatch);
                    str = str.replace('$noticeTime$', dataList[i].noticeTime);
                    str = str.replace('$noticeCountry$', dataList[i].noticeCountry);
                    str = str.replace('$noticeRelicNum$', dataList[i].noticeRelicNum);
                    str = str.replace('$fileIndex$', dataList[i].fileIndex);
                    content += str;
                }
                $('#forStolenDatabase').html(content);
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
                        isHide: true,
                        keepShowPN: true,
                        callback: function (api) {
                            var pageNum = api.getCurrent();
                            $.ajax({
                                url: publicUrl_4 + '/dmForeignloserelic/getPageDataByParam',
                                data: {
                                    pageNum: pageNum,
                                    pageSize: 20,
                                    publishBatch: $('#publishBatch').val(), // 批次
                                    noticeCountry: $('#noticeCountry').val(), // 通报国
                                },
                                beforeSend: function (res) {
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    var dataList = res.data.dataList;
                                    $('.modal-box').hide();
                                    var html = $('#tForStolenDatabase').html(),
                                        content = '';
                                    for (var i = 0, len = dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$publishBatch$', dataList[i].publishBatch);
                                        str = str.replace('$noticeTime$', dataList[i].noticeTime);
                                        str = str.replace('$noticeCountry$', dataList[i].noticeCountry);
                                        str = str.replace('$noticeRelicNum$', dataList[i].noticeRelicNum);
                                        str = str.replace('$fileIndex$', dataList[i].fileIndex);
                                        content += str;
                                    }
                                    $('#forStolenDatabase').html(content);
                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#forStolenDatabase').html('<tr><td colspan="5">暂无数据</td></tr>');
                }
            },
            complete: function () {
                $('.modal-box').hide();
            },
            error: function(){
                $('#forStolenDatabase').html('<tr><td colspan="5">数据加载失败</td></tr>');
            }
        });
    }).click();

    // 下载附件
    $('.statistics').on('click','.download',function(e){
        e.preventDefault();
        var fileIndex = $(this).attr('data-fileIndex');
        window.open(publicUrl_4 + "/DmFileInfoController/downloadFile?fileIndex=" + fileIndex);
    });

    // 重置
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#publishBatch').val(''); // 批次
        $('#noticeCountry').val(''); // 通报国
    });

});