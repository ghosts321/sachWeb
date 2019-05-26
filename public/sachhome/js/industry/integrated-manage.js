$(function(){
    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    // 渲染一级菜单
    $.ajax({
        url: publicUrl_3 + '/imArticleclass/getDataUseful',
        data: {},
        success: function (res) {
            // console.log(res);
            var data = res.data;
            console.log(data);
            // 渲染一级标题
            var html = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].pclassId == '') {
                    console.log(data[i]);
                    html += '<div class="category">' +
                                '<h4 class="first-title" data-classId="' + data[i].classId + '"><i></i>' + data[i].infoNumBeg + '</h4>' +
                                '<p class="second-title"></p>' +
                                '<table class="table management-table table-hover">' +
                                    '<thead>' +
                                        '<tr class="manage-color row">' +
                                            '<th class="text-center col-lg-2">序号</th>' +
                                            '<th class="text-center col-lg-7">名称</th>' +
                                            '<th class="text-center col-lg-3">发布日期</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                        '<tbody class="tbody_html">' +
                                            '<tr class="row">' +
                                                '<td class="col-lg-2"></td>' +
                                                '<td class="col-lg-7"></td>' +
                                                '<td class="col-lg-3"></td>' +
                                            '</tr>' +
                                        '</tbody>' +
                                '</table>' + 
                                '<a href="integrated-manage-more.html?title=' + data[i].infoNumBeg + '&column=' + data[i].classId + '" target="_blank" class="more">更多</a>' + 
                            '</div>';
                    $('.management-left').html(html);
                }
            }

            // 渲染二级标题
            var firstLength = $('.first-title').length; // 一级标题数量
            for (var j = 0; j < firstLength; j++) {
                var arr = findSecondTitle(j); // 每个一级标题下面的二级标题
                var html2 = '';
                console.log(arr);
                // console.log(arr.length);
                if(arr.length){
                    $.each(arr,function(index,obj){
                        html2 += '<span data-classId=' + obj.classId + '>' + obj.infoNumBeg + '</span>';
                    });
                    $('.second-title').eq(j).append(html2);
                }else{
                    var classid = $('.first-title').eq(j).attr('data-classid');
                    var tbody_html = $('.first-title').eq(j).closest('.category').find('.tbody_html');
                    sendAjaxRequest(classid, tbody_html);
                }
            }

            // 点击二级标题切换表格
            $('.second-title span').on('click',function(){
                $(this).addClass('on').siblings().removeClass('on');
                var tbody_html = $(this).closest('.category').find('.tbody_html');
                var column = $(this).attr('data-classId'); // 要传给后台的当前点击的分类
                sendAjaxRequest(column, tbody_html);
            });

            // 页面加载时点击一下第一个
            $('.second-title span:nth-child(1)').click();

            // 行业信息管理 这里不是动态获取的
            $('.management-left').append($('#tSocialHeritage').html());

            // 发请求
            function sendAjaxRequest(column, tbody_html){
                $.ajax({
                    url: publicUrl_3 + '/imArticleinfo/queryByConditionWithPage',
                    data: { 
                        pageNumber: 1, 
                        pageSize: 10, 
                        column: column 
                    },
                    success: function (res) {
                        var len = res.data.dataList.length;
                        len > 5 ? $('#double-more').show() : $('#double-more').hide(); // 超过5条显示更多 否则隐藏
                        if (len) { // 判断数组里面是否有数据 没有的话显示暂无数据
                            len = Math.min(len, 5); // 取两个值中的最小值
                            var html = $('#tManagement').html();
                            var content = '';
                            for (var i = 0; i < len; i++) {
                                var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                                str = str.replace('$i$', i + 1);
                                str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                                str = str.replace('$infoTitle$', res.data.dataList[i].infoTitle);
                                str = str.replace('$infoId$', res.data.dataList[i].infoId);
                                str = str.replace('$displayDate$', res.data.dataList[i].displayDate.substr(0, 10));
                                str = str.replace('$column$', column);
                                content += str;
                            }
                            tbody_html.html(content);
                        } else {
                            tbody_html.html('<tr class="row text-center"><td colspan="5">暂无数据</td></tr>');
                        }
                    }
                });
            }

            // 找到二级节点
            function findSecondTitle(index) {
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pclassId == $('.first-title').eq(index).attr('data-classId')) {
                        arr.push(data[i]);
                    }
                }
                return arr;
            }

        }
    });

});