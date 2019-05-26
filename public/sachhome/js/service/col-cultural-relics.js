$(function () {
    // 自定义滚动条
    $(document).ready(function () {
        $('.scrollbar-inner').scrollbar();
    });

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

    // 页面加载时 获取藏品类别下拉列表
    $.ajax({
        data: { dataType: 'CulturalClass' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '';
            for (var i in result.CulturalClass) {
                str += '<a href="" target="_blank" data-culturalclass=' + i + '>' + result.CulturalClass[i] + '</a>';
            }
            $('#reel-culturalclass').html(str); // 右侧类别区域
        }
    });

    // 页面加载时 获取省份下拉列表
    $.ajax({
        data: { dataType: 'Province' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '';
            for (var i in result.Province) {
                str += '<a href="" target="_blank" data-province=' + i + '>' + result.Province[i] + '</a>';
            }
            $('#reel-province').html(str);
        }
    });

    // 页面加载时 获取年代下拉列表
    $.ajax({
        data: { dataType: 'Years' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.Years) {
                str += '<option title=' + result.Years[i] + ' value=' + i + '>' + result.Years[i] + '</option>';
            }
            $('#age').html(str);
            $("#age").change(function () { // 获取下拉框的文本值
                var checkText = $(this).find('option:selected').attr('title');
                $(this).attr('title', checkText); // 修改title值
            });
        }
    });

    // 点击检索
    $('#search').on('click', function () {
        var antiqueName = $('#antiqueName').val(),   // 藏品名称
            museumName = $('#museumName').val(),    // 收藏单位
            antiqueId = $('#antiqueId').val(),     // 普查登记号
            age = $('#age').val(),           // 藏品年代
            // 修改跳转url
            $href = 'col-cultural-relics-details.html?pageNumber=1&pageSize=10&antiqueName=' + antiqueName + '&antiqueId=' + antiqueId + '&culturalClass=' + '&museumName=' + museumName + '&province=' + '&age=' + age;
        $('#search').attr('href', $href);
        if (window.localStorage) {
            localStorage.setItem('museum', 'true');
        }
    });

    // 点击左侧省份的一排链接
    $(document).on('click', "#reel-province a", function () {
        var antiqueName = $('#antiqueName').val(),       // 藏品名称
            museumName = $('#museumName').val(),        // 收藏单位
            antiqueId = $('#antiqueId').val(),         // 普查登记号
            age = $('#age').val(),               // 藏品年代
            province = $(this).attr('data-province'), // 省份
            $href = 'col-cultural-relics-details.html?pageNumber=1&pageSize=10&antiqueName=' + antiqueName + '&antiqueId=' + antiqueId + '&culturalClass=' + '&museumName=' + museumName + '&province=' + province + '&age=' + age;
        $(this).attr('href', $href);
        if (window.localStorage) {
            localStorage.setItem('museum', 'true');
        }
    });

    // 点击右侧类别的一排链接
    $(document).on('click', "#reel-culturalclass a", function () {
        var antiqueName = $('#antiqueName').val(),            // 藏品名称
            museumName = $('#museumName').val(),             // 收藏单位
            antiqueId = $('#antiqueId').val(),              // 普查登记号
            age = $('#age').val(),                    // 藏品年代
            culturalClass = $(this).attr('data-culturalclass'), // 类别
            $href = 'col-cultural-relics-details.html?pageNumber=1&pageSize=10&antiqueName=' + antiqueName + '&antiqueId=' + antiqueId + '&culturalClass=' + culturalClass + '&museumName=' + museumName + '&province=' + '&age=' + age;
        $(this).attr('href', $href);
        if (window.localStorage) {
            localStorage.setItem('museum', 'true');
        }
    });

    // 点击重置
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#collection input,#collection select').each(function () {
            $(this).val('');
        });
    });

});