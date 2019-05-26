$(function () {
    var msg = {
        loading: '<div class="content"><div class="row text-center"><div class="article col-lg-12">文章加载中...</div></div></div>', // 发起ajax请求加载时显示的文本
        error: '<div class="content"><div class="row"><div class="article col-lg-12">文章加载失败</div></div></div>' // 发起ajax请求失败时显示的文本
    }

    // 为了填写正确的面包屑导航
    var $href = getQuery(window.location.href), // 调用获取顶部url的参数
        standardRed = $href.standardRed, // 调用函数 获取顶部传过来的想要标红的搜索内容
        url = publicUrl_2 + '/ioGovInfoPublic/querySingle', // 默认的跳转链接
        id = $href.id, // 找到url中请求最后的数字 传递给后台的参数
        source = $href.source; // 新写的政策解读
    var column = $href.column;
    console.log(column);
    console.log(('column' in $href));

    if ('title' in $href) {
        url = publicUrl_3 + '/imArticleinfo/getEntityByPK';
        $('#nav li').eq(3).addClass('active').siblings().removeClass('active');
        switch ($href.title) { // 行业综合管理
            case '行业综合管理': // 行政处罚
                $('#title').html(stripscript('<i></i><span>当前位置 >></span><a href="industry/integrated-manage.html"> 行业综合管理 </a><span id="currentLink"></span>'));
                break;
            default:
        }
    }
    else if ('public' in $href) {
        switch ($href.public) {
            case 'gcgd':
                $('#prevLink').attr('href', 'public/gov-info-open.html').text(' 政府信息公开规定 ');
                break;
            case 'gcml':
                $('#prevLink').attr('href', 'public/gov-info-open.html').text(' 政府信息公开目录 ');
                break;
            case 'more':
                $('#title').html(stripscript('<i></i><span>当前位置 >></span><a href="public/gov-info-open.html"> 政府信息公开</a><a href="public/gov-info-dir.html" id="prevLink"> >> 政府信息公开目录 </a><span id="currentLink"></span>'));
                break;
            default:
            // n 与 case 1 和 case 2 不同时执行的代码
        }
    }
    else if ('category' in $href) { // 此处判断的是政府信息公开规定、信息公开年报、统计信息这三个
        switch ($href.category) {
            case '统计信息':
                $('#title').html(stripscript('<i></i><span>当前位置 >> </span><a href="public/gov-info-open.html"> 政府信息公开 </a><a href="public/statistics.html?category=统计信息&column=0500000000" id="prevLink"> >> 统计信息 </a><span id="currentLink"></span>'));
                break;
            case '信息公开年报':
                $('#title').html(stripscript('<i></i><span>当前位置 >> </span><a href="public/gov-info-open.html"> 政府信息公开</a><a href="public/statistics.html?category=信息公开年报&column=0300000000" id="prevLink"> >> 信息公开年报 </a><span id="currentLink"></span>'));
                break;
            case '政府信息公开规定':
                $('#title').html(stripscript('<i></i><span>当前位置 >> </span><a href="public/gov-info-open.html"> 政府信息公开 </a><a href="public/statistics.html?category=政府信息公开规定&column=0100000000" id="prevLink"> >> 政府信息公开规定 </a><span id="currentLink"></span>'));
                break;
            default:
        }
    }
    else if ('zcfgk' in $href) { // 此处判断的是政策法规库
        switch ($href.zcfgk) {
            case 'par':
                $('#prevLink').attr('href', 'policy-and-regulations.html').text(' 政策法规库 ');
                break;
            case 'sd':
                $('#prevLink').attr('href', 'policy-and-regulations.html').text(' 政策法规库 ');
                break;
            default:
            // n 与 case 1 和 case 2 不同时执行的代码
        }
    }
    else if ('aa' in $href) {
        switch ($href.aa) {
            case 'aa':
                $('#prevLink').attr('href', 'administrative-approval.html').text(' 通知公告 ');
                break;
            case 'sn':
                url = publicUrl_6 + '/cmNoticeinfo/getEntityByPK';
                $('#prevLink').attr('href', 'systemnotice.html').text(' 系统通知公告 ');
                break;
            default:
            // n 与 case 1 和 case 2 不同时执行的代码
        }
    }
    else if (source == 'zcjd') { // 从政策解读点进来的
        $('#title').html(stripscript('<i></i><span>当前位置 >> </span><a href="public/gov-info-open.html"> 政府信息公开 </a><a href="policy-analyzing.html" id="prevLink"> >> 政策解读 </a><span id="currentLink"></span>'));
    }

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

    var formData = {
        id: id, 
        column: column
    }
    // 按机构分类不传column
    if (column == undefined){
        delete formData.column;
    }

    $.ajax({
        url: url,
        data: formData,
        beforeSend: function () {
            $('#substance').html(msg.loading);
        },
        success: function (res) {
            console.log(res);
            var fontColor; // 标题颜色
            if (res.data.fontColor == '红'){
                fontColor = 'red';
            } else if (res.data.fontColor == '黑'){
                fontColor = 'black';
            } else if (res.data.fontColor == '蓝'){
                fontColor = 'blue';
            } else if (res.data.fontColor == '黄'){
                fontColor = 'yellow';
            }

            var fontWeight; // 标题字体粗细
            if (res.data.fontWeight == '是') {
                fontWeight = 'bold';
            } else if (res.data.fontWeight == '否') {
                fontWeight = 'normal';
            }

            if (GetUrlParamString('aa') == 'sn') {
                // 渲染文章内容
                document.body.innerHTML = document.body.innerHTML.replace(/浏览次数/g, '发布日期');
                var html = $('#tContent').html();
                var content = '';
                var str = html;
                str = str.replace('$infoIndex$', res.data.noticeId);
                str = str.replace('$infoTitle$', res.data.msgTitle);
                str = str.replace('$infoTitle$', res.data.msgTitle);
                str = str.replace('$readNumber$', res.data.publishDate.substr(0, 10));
                str = str.replace('$infoContent$', res.data.msgCont);
                content += str;
                $('#substance').html(stripscript(content));
                $('#flip-pages').hide();
                // 点击打印本页
                $('#print').on('click', function () {
                    $('#substance').jqprint();
                });
            } else {
                var a = '';
                for (var p in $href) { // 拼接一下url
                    a += p + '=' + $href[p] + '&';
                }
                var h = 'details.html?' + a.substring(0, a.search(/id/) + 3); // 通过顶部url拼接页数链接
                var sub = res.data.infoContent; // 先把获取的文章保存到一个变量中
                if (standardRed) { // 只有顶部有这个参数的时候才进行匹配
                    sub = sub.replace(new RegExp(standardRed, 'g'), '<span class="standardred">' + standardRed + '</span>'); // 用正则找到要替换的变量 给span加了一个类专用于显示标红的文本
                }

                // 去除服务端返回的可能有标签的文本 比如font标签、b标签
                var $next_infoTitle = res.data.next_infoTitle.replace(/<[^>]+>/g, "") || res.data.next_infoTitle;
                var $previous_infoTitle = res.data.previous_infoTitle.replace(/<[^>]+>/g, "") || res.data.previous_infoTitle;

                // 渲染文章内容
                var html = $('#tContent').html();
                var content = '';
                var str = html; // 每次循环的时候重置一下 重新设置为模板内容
                str = str.replace('$infoIndex$', res.data.infoIndex);
                str = str.replace('$className$', res.data.className);
                str = str.replace('$postOffice$', res.data.postOffice);
                str = str.replace('$displayDate$', res.data.displayDate.substr(0, 10));
                str = str.replace('$infoTitle$', res.data.infoTitle);
                str = str.replace('$infoNum$', res.data.infoNum);
                str = str.replace('$writtenDate$', res.data.writtenDate.substr(0, 10));
                str = str.replace('$infoTitle$', res.data.infoTitle);
                str = str.replace('$readNumber$', res.data.readNumber);
                str = str.replace('$infoContent$', sub); // 这里不是直接获取 而是用上面处理好的标红的文本
                str = str.replace('$editorUserID$', res.data.editorUserID || res.data.editorUserId || ''); // 责任编辑 政府信息公开和行业综合管理 后台给的字段名不一样 
                str = str.replace('$previous_infoID$', h + (res.data.previous_infoID || res.data.previous_infoId) + (column == undefined ? '' : '&column=' + column)); // 拼接一下 后端给的字段名不一样
                str = str.replace('$next_infoID$', h + (res.data.next_infoID || res.data.next_infoId) + (column == undefined ? '' : '&column=' + column)); 
                str = str.replace('$previous_infoTitle$', $previous_infoTitle); // 用处理过的不含标签
                str = str.replace('$next_infoTitle$', $next_infoTitle); // 用处理过的不含标签
                content += str;
                $('#substance').html(stripscript(content));

                // 下载附件
                var fileList = res.data.fileList;
                if (fileList.length) {
                    var fileHtml = '';
                    for (var i = 0; i < fileList.length; i++) {
                        fileHtml += '<p style="TEXT-INDENT: 2em">附件：<a class="annexe" href="javascript:;" data-fileIndex="' + fileList[i].fileIndex + '">' + fileList[i].fileName + '</a></p>';
                    }
                    // if (res.data.infoContent.indexOf('附件：') != -1){ 下载附件位置
                    //     $("p:contains('附件：')").attr('id', 'annex'); // 找到下载附件元素
                    //     $('#annex').after(fileHtml);
                    // }else{
                    //     $('#download').html(fileHtml); // 下载附件区域                    
                    // }
                    $('#download').html(fileHtml); // 下载附件区域
                    $('.annexe').on('click', function () {
                        var fileIndex = $(this).attr('data-fileIndex');
                        window.open(publicUrl_4 + "/DmFileInfoController/downloadFile?fileIndex=" + fileIndex);
                    });
                }

                $('.articleTitle').css('font-weight', fontWeight); // 设置文章标题粗细
                $('.articleTitle').css('color',fontColor); // 设置文章标题颜色
                
                // 限制图片尺寸
                $('.article img').each(function(index,obj){
                    if ($(this).width() > 750){
                        $(this).css('width', '100%');
                    }
                });

                // 把从服务端获取的文章标题渲染到顶部面包屑导航
                $('#currentLink').html(stripscript(' >> ' + res.data.infoTitle).replace(/<br>|<br\/>/g, "")); // 从服务端获取当前文章标题 替换掉标题中的br

                // 判断如果顶部url中有catlog存在 说明是政府信息公开目录 点进来的 此时显示上方的信息
                if (window.location.href.match(/catlog/)) { // public页面按机构分类
                    $('.odd-numbers').show();
                } else if (window.location.href.match(/theme/)) { // public页面按主题分类
                    $('.odd-numbers').show();
                } else if (window.location.href.match(/sheet/)) { // 搜索页面显示上方
                    $('.odd-numbers').show();
                }

                // 政府信息公开 和 行业综合管理都没有这个字段的时候显示
                if (!res.data.previous_infoID && !res.data.previous_infoId) {
                    $('#prev').attr({ 'disabled': 'true', 'title': '没有上一篇了' });
                }
                // 政府信息公开 和 行业综合管理都没有这个字段的时候显示
                if (!res.data.next_infoID && !res.data.next_infoId) {
                    $('#next').attr({ 'disabled': 'true', 'title': '没有下一篇了' });
                }

                // 点击打印本页
                $('#print').on('click', function () {
                    $('#substance').jqprint();
                });
            }
        },
        error: function () {
            $('#substance').html(msg.error); // 发起ajax请求失败时显示文本
        }
    });
});