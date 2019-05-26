$(".custom-banner").PageSwitch({
    direction: 'horizontal',
    easing: 'ease-in',
    duration: 800,
    autoPlay: false,
    interval: 5000,
    loop: 'true'
});
$(document).ready(function(){
    $('.custom-onlinehall-header').on('click',function(){
        $('.custom-onlinehall-header').removeClass('active');
        $(this).addClass('active');
    });
    // $('.custom-onlinehall-tabpanel .tab').on('click',function(){
    //     $('.custom-onlinehall-tabpanel .tab').removeClass('active');
    //     $('.custom-onlinehall-tabpanel .tab').attr('style','');
    //     $(this).addClass('active');
    //     $(this).prev().css('border-bottom','none');
    //     $(this).next().css('border-top','none');
    // });
});

$(function(){
    // 切换选项卡
    $('.comprehensive-manage-tab span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

    // 切换选项卡
    $('.catalog p span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

    // 切换选项卡
    $('.classify p span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });
    
    // 切换选项卡
    $('.application-form p span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });
    
    // 切换选项卡
    // $('.industry-integrated-management p span,.cultural-relics-market p span').on('click',function(){
    //     $(this).addClass('on').siblings().removeClass('on');
    // });
    
    // 切换选项卡
    $('.qualification-list p span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

    // 切换选项卡
    $('.industry-related p span').on('click',function(){
        $(this).addClass('on').siblings().removeClass('on');
    });

    // // 国家文物局在线办事大厅 切换a下面的三角形
    // $('.tal a').on('click',function(){
    //     $(this).addClass('on').siblings().removeClass('on');
    //     $('.tal table').css('display','none');
    //     return false;
    // });


});