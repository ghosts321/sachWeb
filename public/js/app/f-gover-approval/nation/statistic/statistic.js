
// 配置日期
$('.time').datepicker({ //日期控件
    language: 'zh-CN',
    autoclose: true, //选择之后是否关闭日期选项
    todayHighlight: true, //当为true的时候高亮
    keyboardNavigation: true,
    format: 'yyyy-mm-dd',
}).on('changeDate', function (ev) {
});
// 选择年份
$("#yearxuan").datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy',
        startView: 2,
        maxViewMode: 2,
        minViewMode: 2,
        }).on('hide', function (ev) {  
        ev.preventDefault();
        ev.stopPropagation();
    });


// 判断浏览器给出相应设置 tabel


// 判断IE 和IE11
if (!!window.ActiveXObject || "ActiveXObject" in window)  {
    $(".compatibility").css({
        "margin-right":"15px"
    })
}
// 360极速模式
if(window.navigator.userAgent.indexOf('AppleWebKit') != -1) {
    $(".compatibility").css({
            "margin-right":"6px"
        })
}else if(window.navigator.userAgent.indexOf('Firefox') >= 0) {
// 判断是否是火狐浏览器
        $(".compatibility").css({
        "margin-right":"17px"
    })
}
if(window.navigator.userAgent.indexOf('Chrome') >= 0){
    //谷歌
    $(".compatibility").css({
        "margin-right":"4px"
    })
}




