$(function () {
    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        type: 'get',  // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    $.ajax({
        url: publicUrl + '/isPublicinfoclass/getDataByParam',
        data: {},
        beforeSend: function () {

        },
        success: function (res) {
            console.log(res);
            var data = res.data;
            // res.data.push({ // 自己测试添加三级节点 
            //     pclassId: '0302000000',
            //     infoNumBeg: 'ccccc',
            //     classId: '0650165161'
            // });
            // console.log(res);

            // 渲染一级标题
            var html = '';
            for (var i = 0; i < data.length; i++) {
                // console.log(data[i]);
                if (data[i].pclassId == '') {
                    // console.log(data[i]);
                    html += '<div class="category"><div class="container"><h4 class="first-title" data-classId="' + data[i].classId + '"><i class="dot dot-1"></i>' + data[i].infoNumBeg + '</h4></div><div class="second-bg"><div class="container second-title"></div></div><div class="third-bg"><div class="container"><div class="row clearfix third-title"></div></div></div><div class="giant-screen"><div class="container text-center text"></div></div><div class="search-content"></div></div>';
                    $('#content-height').html(html);
                }
            }

            // 渲染二级标题
            var firstLength = $('.first-title').length; // 一级标题数量
            for (var j = 0; j < firstLength; j++) {
                var arr = findSecondTitle(j); // 每个一级标题下面的二级标题
                // console.log(arr);
                var status = isFindThirdTitle(arr); // 二级标题下面是否有三级标题
                // console.log(status);
                var html2 = '';
                var html3 = '';
                if (!status) { // 二级标题下没有三级标题
                    $.each(arr, function (index, obj) {
                        html2 += '<a href="" id="classId-' + obj.classId + '" class="col-xs-6 col-sm-6 col-md-4 col-lg-2" data-classId="' + obj.classId + '" title="' + obj.infoNumBeg + '"><img src="../img/' + (obj.webImageIndex != '' ? obj.webImageIndex : 'new-link-img.png') + '" alt=""><span>' + obj.infoNumBeg + '</span></a>';
                        html3 += '<div class="container table-responsive content-' + obj.classId + '"></div>';
                    });
                    // $('<div class="second-link"></div>').after('.second-bg');
                    // // $('.second-link').after('.second-bg');
                    $('.third-title').eq(j).append(html2);
                    $('.search-content').eq(j).html(html3);
                } else { // 有三级标题
                    $.each(arr, function (index, obj) {
                        html2 += '<a class="colorable" href="" data-classId="' + obj.classId + '">' + obj.infoNumBeg + '<i></i></a>';
                    });
                    $('.second-title').eq(j).append(html2);
                }
            }

            // 点击二级标题切换三级标题
            $('.second-title a').on('click', function (e) {
                e.preventDefault();
                var category = $(this).closest('.category');
                var classId = $(this).attr('data-classId');
                var html3 = '';
                var html4 = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].pclassId == classId) {
                        html3 += '<a href="" id="classId-' + data[i].classId + '" class="col-xs-6 col-sm-6 col-md-4 col-lg-2" title="' + data[i].infoNumBeg + '" data-classId="' + data[i].classId + '"><img src="../img/' + (data[i].webImageIndex != '' ? data[i].webImageIndex : 'new-link-img.png') + '" alt=""><span>' + data[i].infoNumBeg + '</span></a>';
                        html4 += '<div class="container table-responsive content-' + data[i].classId + '"></div>';
                    }
                    category.find('.third-title').html(html3);
                    category.find('.search-content').html(html4);
                }

                var text = category.find('.third-title a:eq(0)').text(); // 点击二级标题切换三级标题
                category.find('.third-title a:eq(0)').addClass('on');
                category.find('.giant-screen .text').html('<h3>' + text + '</h3><a href="" class="morelink" target="_blank" style="">更多</a>');
                $('.category .third-title a:nth-child(1)').click();
            });

            // 点击三级标题
            $('.category').on('click', '.third-title a', function (e) {
                e.preventDefault();
                var idx = $(this).index();
                var category = $(this).closest('.category'); // 当前标题的一级标题
                var text = $(this).text();
                var id = $(this).attr('id'); // 当前点击链接的id
                // 有三级标题的超链接才有切换效果
                if (category.find('.second-title a').is('.colorable')){
                    $(this).addClass('on').siblings('').removeClass('on');
                }
                var firstItemText = category.find('.third-title a:eq(0)').text(); // 全国博物馆名录
                category.find('.giant-screen .text').html('<h3>' + text + '</h3><a href="" class="morelink" target="_blank" style="">更多</a>');
                // 后台的classId不变 根据这个来判断 这里渲染的div的类写死了
                category.find('.giant-screen').removeClass('shuanglinsi');
                if (id == 'classId-0101010000') { // 中国的世界遗产
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').hide();
                    $.ajax({
                        url: publicUrl_4 + '/dmCnworldheritage/queryAllCnWorldHeritage',
                        data: {},
                        beforeSend: function () {
                            // $('.unmovableContent .modal-box').show();
                        },
                        success: function (res) {
                            $('.content-0101010000').html('<table class="table statistics-table table-condensed">');
                            for (var i = 0, len = Math.ceil(res.data.length / 4); i < len; i++) {
                                $('<tr class="row text-center"></tr>').appendTo($('.content-0101010000 table'))
                            }
                            var j = -1;
                            res.data.forEach(function (item, index) {
                                if (index % 4 == 0) {
                                    j++;
                                }
                                $('<td class="col-lg-3"></td>').html(item.areaName).appendTo($('.content-0101010000 table tr').eq(j));
                            });
                            if (res.data.length % 4 !== 0) {
                                var $length = 4 - (res.data.length % 4);
                                for (var k = 0; k < $length; k++) {
                                    $('<td class="col-lg-3"></td>').appendTo($('.content-0101010000 table tr').eq(j));
                                }
                            }
                        },
                        complete: function () {
                            // $('.unmovableContent .modal-box').hide();
                        }
                    });
                } else if (id == 'classId-0101020000') { // 全国重点文物保护单位
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').attr('href', 'national-key-units.html');
                    $.ajax({
                        url: publicUrl_4 + '/dmPublicprotectunit/queryPublicprotectunitByCondition',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center col-lg-2 lh175">编号<br>（批次-编号-分类-分类号）</th>'
                                + '<th class="text-center col-lg-2">名称</th>'
                                + '<th class="text-center col-lg-1">时代</th>'
                                + '<th class="text-center col-lg-2">地址</th>'
                                + '<th class="text-center col-lg-2">省份</th>'
                                + '<th class="text-center col-lg-2">分类</th>'
                                + '<th class="text-center col-lg-1">批次</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody>';
                            if (res.data.dataList.length) {
                                var html = $('#tNaSecurityUnit').html();
                                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                    var str = html;
                                    str = str.replace('$instId$', res.data.dataList[i].instId);
                                    str = str.replace('$remark1$', res.data.dataList[i].remark1);
                                    str = str.replace('$instName$', res.data.dataList[i].instName);
                                    str = str.replace('$publishYear$', res.data.dataList[i].publishYear);
                                    str = str.replace('$address$', res.data.dataList[i].address);
                                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                    str = str.replace('$belongTypeName$', res.data.dataList[i].belongTypeName);
                                    str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
                                    content += str;
                                }
                                content += '</tbody></table>';
                                $('.content-0101020000').html(content);
                            }
                        }
                    });
                } else if (id == 'classId-0101030000') { // 历史文化名城
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').attr('href', 'historical-district.html?areaClass=1');
                    $.ajax({
                        url: publicUrl_4 + '/dmHiscurarea/queryHiscurareaByCondition',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                            areaClass: 1,
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center col-lg-4">名称</th>'
                                + '<th class="text-center col-lg-4">省份</th>'
                                + '<th class="text-center col-lg-4">批次</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody id="CulturalCity-tbody">';
                            if (res.data.dataList.length) {
                                var html = $('#tCulturalCity').html();
                                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                    var str = html;
                                    str = str.replace('$areaName$', res.data.dataList[i].areaName);
                                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                    str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
                                    content += str;
                                }
                                content += '</tbody></table>';
                                $('.content-0101030000').html(content);
                            }
                        }
                    });
                } else if (id == 'classId-0101040000') { // 历史文化名镇
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').attr('href', 'historical-district.html?areaClass=2');
                    $.ajax({
                        url: publicUrl_4 + '/dmHiscurarea/queryHiscurareaByCondition',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                            areaClass: 2,
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center col-lg-4">名称</th>'
                                + '<th class="text-center col-lg-4">省份</th>'
                                + '<th class="text-center col-lg-4">批次</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody id="CulturalCity-tbody">';
                            if (res.data.dataList.length) {
                                var html = $('#tCulturalCity').html();
                                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                    var str = html;
                                    str = str.replace('$areaName$', res.data.dataList[i].areaName);
                                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                    str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
                                    content += str;
                                }
                                content += '</tbody></table>';
                                $('.content-0101040000').html(content);
                            }
                        }
                    });
                } else if (id == 'classId-0101050000') { // 历史文化名村
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').attr('href', 'historical-district.html?areaClass=3');
                    $.ajax({
                        url: publicUrl_4 + '/dmHiscurarea/queryHiscurareaByCondition',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                            areaClass: 3,
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center col-lg-4">名称</th>'
                                + '<th class="text-center col-lg-4">省份</th>'
                                + '<th class="text-center col-lg-4">批次</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody id="CulturalCity-tbody">';
                            if (res.data.dataList.length) {
                                var html = $('#tCulturalCity').html();
                                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                    var str = html;
                                    str = str.replace('$areaName$', res.data.dataList[i].areaName);
                                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                    str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
                                    content += str;
                                }
                                content += '</tbody></table>';
                                $('.content-0101050000').html(content);
                            }
                        }
                    });
                } else if (id == 'classId-0101060000') { // 中国历史文化街区
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').attr('href', 'historical-district.html?areaClass=4');
                    $.ajax({
                        url: publicUrl_4 + '/dmHiscurarea/queryHiscurareaByCondition',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                            areaClass: 4,
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center col-lg-4">名称</th>'
                                + '<th class="text-center col-lg-4">省份</th>'
                                + '<th class="text-center col-lg-4">批次</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody id="CulturalCity-tbody">';
                            if (res.data.dataList.length) {
                                var html = $('#tCulturalCity').html();
                                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                    var str = html;
                                    str = str.replace('$areaName$', res.data.dataList[i].areaName);
                                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                    str = str.replace('$publishBatchName$', res.data.dataList[i].publishBatchName);
                                    content += str;
                                }
                                content += '</tbody></table>';
                                $('.content-0101060000').html(content);
                            }
                        }
                    });
                } else if (id == 'classId-0102010000') { // 全国馆藏文物信息
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').attr('href', 'col-cultural-relics.html');
                    $.ajax({
                        url: publicUrl_4 + '/dmPublicrelics/queryDataByPublicrelics',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center col-lg-1">普查登记号</th>'
                                + '<th class="text-center col-lg-4">藏品名称</th>'
                                + '<th class="text-center col-lg-2">类别</th>'
                                + '<th class="text-center col-lg-2">年代</th>'
                                + '<th class="text-center col-lg-2">所属博物馆</th>'
                                + '<th class="text-center col-lg-1">省份</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody>';
                            if (res.data.dataList.length) {
                                var html = $('#tColCulturalRelics').html();
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
                                content += '</tbody></table>';
                                $('.content-0102010000').html(content);
                            }
                        }
                    });
                } else if (id == 'classId-0102020000') { // 外国被盗文物数据库
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text .morelink').hide();
                    $.ajax({
                        url: publicUrl + '/isPublicinfoclass/getDataByParam',
                        data: {},
                        success: function (res) {
                            for (var i = 0; i < res.data.length; i++) {
                                if (res.data[i].classId == '0102020000') {
                                    var content = res.data[i].reserve2;
                                }
                            }
                            $('.content-0102020000').html(content);
                        }
                    });
                } else if (id == 'classId-0103010000') { // 平遥·双林寺彩塑壁画
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen').addClass('shuanglinsi');
                    category.find('.giant-screen h3').text('');
                    category.find('.giant-screen .text .morelink').attr('href', 'http://gl.sach.gov.cn:81/source/welcome/');
                    $('.content-0103010000').html($('#shuanglinsiwenzi').html()); // 双林寺文字
                } else if (id == 'classId-0201000000') { // 全国博物馆名录
                    category.find('.search-content div').eq(idx).show().siblings('div').hide();
                    category.find('.giant-screen .text').html('<h3>' + firstItemText + '</h3><a href="nation-museum-direct.html" class="morelink" target="_blank" style="">更多</a>');
                    $.ajax({
                        url: publicUrl_4 + '/dmPublicmuseum/queryMuseumByCondition',
                        data: {
                            pageNumber: 1,
                            pageSize: 10,
                        },
                        beforeSend: function () {
                            // $('.museum .modal-box').show();
                        },
                        success: function (res) {
                            var content = '<table class="table table-hover statistics-table table-condensed" style="word-wrap: break-word; word-break: break-all;">'
                                + '<thead>'
                                + '<tr class="statistics-color row">'
                                + '<th class="text-center">博物馆名称</th>'
                                + '<th class="text-center">省份</th>'
                                + '<th class="text-center">博物馆性质</th>'
                                + '<th class="text-center">质量等级</th>'
                                + '<th class="text-center">是否免费开放</th>'
                                + '<th class="text-center">电话</th>'
                                // + '<th class="text-center">地址</th>'
                                + '<th class="text-center">网址</th>'
                                + '</tr>'
                                + '</thead>'
                                + '<tbody>';
                            if (res.data.dataList.length) {
                                var html = $('#tnaMuseumInfo').html();
                                for (var i = 0, len = res.data.dataList.length; i < len; i++) {
                                    var str = html;
                                    str = str.replace('$instName$', res.data.dataList[i].instName);
                                    str = str.replace('$instName$', res.data.dataList[i].instName);
                                    str = str.replace('$provinceName$', res.data.dataList[i].provinceName);
                                    str = str.replace('$museumPropertyName$', res.data.dataList[i].museumPropertyName);
                                    str = str.replace('$qualityLevelName$', res.data.dataList[i].qualityLevelName);
                                    str = str.replace('$isFreeName$', res.data.dataList[i].isFreeName);
                                    str = str.replace('$orderTelNo$', res.data.dataList[i].orderTelNo);
                                    // str = str.replace('$address$', res.data.dataList[i].address);
                                    str = str.replace('$webSite$', res.data.dataList[i].webSite);
                                    str = str.replace('$summary$', res.data.dataList[i].summary);
                                    str = str.replace('$openTime$', res.data.dataList[i].openTime);
                                    str = str.replace('$trafficInfo$', res.data.dataList[i].trafficInfo);
                                    content += str;
                                }
                                content += '</tbody></table>';
                                $('.content-0201000000').html(content);
                            }
                        },
                        complete: function () {
                            // $('.museum .modal-box').hide();
                        }
                    });
                } else if (id == 'classId-0202000000') { // 文物拍卖企业信息表
                    category.find('.giant-screen .text').html('<h3>' + firstItemText + '</h3><a href="nation-museum-direct.html" class="morelink" target="_blank" style="">更多</a>');
                    window.open('herit-auction-info.html', '_blank');
                } else if (id == 'classId-0203000000') { // 涉案文物鉴定评估机构名单
                    category.find('.giant-screen .text').html('<h3>' + firstItemText + '</h3><a href="nation-museum-direct.html" class="morelink" target="_blank" style="">更多</a>');
                    window.open('cul-involved-list.html', '_blank');
                } else if (id == 'classId-0204000000') { // 考古发掘资质单位名单
                    category.find('.giant-screen .text').html('<h3>' + firstItemText + '</h3><a href="nation-museum-direct.html" class="morelink" target="_blank" style="">更多</a>');
                    window.open('archa-qualification-info.html', '_blank');
                } else if (id == 'classId-0205000000') { // 文物保护资质单位信息
                    category.find('.giant-screen .text').html('<h3>' + firstItemText + '</h3><a href="nation-museum-direct.html" class="morelink" target="_blank" style="">更多</a>');
                    window.open('cul-protection-unit-info.html', '_blank');
                } else if (id == 'classId-0206000000') { // 文物保护资质单位人员信息
                    category.find('.giant-screen .text').html('<h3>' + firstItemText + '</h3><a href="nation-museum-direct.html" class="morelink" target="_blank" style="">更多</a>');
                    window.open('cul-protection-person-info.html', '_blank');
                }
            });

            // 点击博物馆名称弹出模态框
            $('.category').on('click', '.click-model img', function () {
                var instName = $(this).parent().attr('data-instName');
                var openTime = $(this).parent().attr('data-openTime');
                var trafficInfo = $(this).parent().attr('data-trafficInfo');
                var summary = $(this).parent().attr('data-summary');
                openModal('<i>博物馆名称</i><p>' + instName + '</p><i>概述</i><p>' + summary + '</p><i>时间</i><p>' + openTime + '</p><i>交通</i><p>' + trafficInfo + '</p>', '全国博物馆名录');
            });

            // 点击双林寺 跳到双林寺网站
            $('.category').on('click', '.viewpoint', function () {
                window.open('http://gl.sach.gov.cn:81/#/', '_blank');
            });

            // 点击二级标题切换三角形
            $('.second-title a').on('click', function () {
                var idx = $(this).index();
                $(this).addClass('on').siblings('').removeClass('on');
            });

            // console.log($('.category .third-title a:eq(0)'))
            // console.log($('div.third-title a:eq(1)'))
            // 页面加载时触发点击事件
            $('.category .second-title a:eq(0)').click();
            $('.category .third-title a:nth-child(1)').click();

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

            // 判断二级节点下是否有三级节点
            function isFindThirdTitle(arr) {
                var status = false;
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < arr.length; j++) {
                        if (data[i].pclassId == arr[j].classId) {
                            status = true;
                        }
                    }
                }
                return status;
            }

        },
        complete: function () {

        }
    });

});