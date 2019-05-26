$(function () {
    var msg = {
        loading: '<div class="content"><div class="row"><div class="article col-lg-12">文章加载中...</div></div></div>'
    }
    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_2 + '/ioGovInfoPublic/querySingle', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    // 发起ajax请求
    $.ajax({
        data: { column: '0200000000' }, // 这里传给后台一个参数column
        beforeSend: function () {
            $('#substance').html(msg.loading); // 发起ajax请求加载时显示文本
        },
        success: function (res) {
            // console.log(res);
            var html = $('#tContent').html();
            var content = '';
            var str = html; // 每次循环的时候重置一下 重新设置为模板内容
            str = str.replace('$infoIndex$', res.data.infoIndex);
            str = str.replace('$className$', res.data.className);
            str = str.replace('$postOffice$', res.data.postOffice);
            str = str.replace('$displayDate$', res.data.displayDate);
            str = str.replace('$infoTitle$', res.data.infoTitle);
            str = str.replace('$infoNum$', res.data.infoNum);
            str = str.replace('$writtenDate$', res.data.writtenDate);
            str = str.replace('$infoTitle$', res.data.infoTitle);
            str = str.replace('$readNumber$', res.data.readNumber);
            str = str.replace('$infoContent$', res.data.infoContent);
            str = str.replace('$previous_infoID$', res.data.previous_infoID);
            str = str.replace('$next_infoID$', res.data.next_infoID);
            content += str;
            $('#substance').html(content);

            // 点击打印本页
            $('#print').on('click', function () {
                $('#substance').jqprint();
            });
        }
    });
});