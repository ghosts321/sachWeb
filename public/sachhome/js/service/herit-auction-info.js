$(function () {
    // 合并单元格
    $.fn.rowspan = function (colIdx) { //封装的一个JQuery小插件
        return this.each(function () {
            var that;
            $('tr', this).each(function (row) {
                $('td:eq(' + colIdx + ')', this).filter(':visible').each(function (col) {
                    if (that != null && $(this).html() == $(that).html() && $(that).find('span').html().trim() != '') {
                        rowspan = $(that).attr("rowSpan");
                        if (rowspan == undefined) {
                            $(that).attr("rowSpan", 1);
                            rowspan = $(that).attr("rowSpan");
                        }
                        rowspan = Number(rowspan) + 1;
                        $(that).attr("rowSpan", rowspan);
                        $(this).hide();
                    } else {
                        that = this;
                    }
                });
            });
        });
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
        if (status == 1) { // ststus等于4时 异步请求全部完成
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

    // 点击搜索
    $('#search').on('click', function (e) {
        e.preventDefault();
        var data = { pageNumber: 1, pageSize: 20 };
        $('#list input,#list select').each(function () {
            data[$(this).attr('id')] = $(this).val().trim(); // 获取所有输入框的值
        });
        $.ajax({
            url: publicUrl_4 + '/dmAuctioninstperson/getPageDataByParam',
            data: data,
            beforeSend: function () {
                $('.modal-box').show();
            },
            success: function (res) {
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total; // 数据总条数
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }
                var html = $('#tInfoSheet').html(),
                    content = '',
                    dataList = res.data.dataList;
                for (var i = 0, len = dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$provinceName$', $.trim(dataList[i].provinceName));
                    str = str.replace('$subNum$', $.trim(dataList[i].subNum));
                    str = str.replace('$instName$', $.trim(dataList[i].instName));
                    str = str.replace('$permitNo$', $.trim(dataList[i].permitNo));
                    str = str.replace('$corpName$', $.trim(dataList[i].corpName));
                    str = str.replace('$userName$', $.trim(dataList[i].userName));
                    str = str.replace('$lastInst$', $.trim(dataList[i].lastInst));
                    str = str.replace('$roleClassName$', $.trim(dataList[i].roleClassName));
                    str = str.replace('$certStatusName$', $.trim(dataList[i].certStatusName));
                    content += str;
                }
                $('#infoSheet').html(content);

                // 合并单元格
                $("#mergeCells").find("tr").find("th").each(function (index) {
                    if(index < 4){
                        $('#mergeCells').rowspan(index);
                    }
                });

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
                                url: publicUrl_4 + '/dmAuctioninstperson/getPageDataByParam',
                                data: data,
                                beforeSend: function () {
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    var html = $('#tInfoSheet').html(),
                                        content = '',
                                        dataList = res.data.dataList;
                                    for (var i = 0, len = dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$provinceName$', $.trim(dataList[i].provinceName));
                                        str = str.replace('$subNum$', $.trim(dataList[i].subNum));
                                        str = str.replace('$instName$', $.trim(dataList[i].instName));
                                        str = str.replace('$permitNo$', $.trim(dataList[i].permitNo));
                                        str = str.replace('$corpName$', $.trim(dataList[i].corpName));
                                        str = str.replace('$userName$', $.trim(dataList[i].userName));
                                        str = str.replace('$lastInst$', $.trim(dataList[i].lastInst));
                                        str = str.replace('$roleClassName$', $.trim(dataList[i].roleClassName));
                                        str = str.replace('$certStatusName$', $.trim(dataList[i].certStatusName));
                                        content += str;
                                    }
                                    $('#infoSheet').html(content);

                                    // 合并单元格
                                    $("#mergeCells").find("tr").find("th").each(function (index) {
                                        if (index < 4) {
                                            $('#mergeCells').rowspan(index);
                                        }
                                    });

                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#infoSheet').html('<tr><td colspan="9">暂无数据</td></tr>');
                }
            },
            complete: function () {
                $('.modal-box').hide();
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