cmx.g.regist('CMXMENUROUTE', '');
cmx.g.regist('dubanflag', false);
(function(window, document, $) {
    'use strict';
    $.getJSON(getData("menuurl"), function(data) {
        var flag = false;
        try {
            var roleClassArr = JSON.parse(getData('roleClassArr'));
            for (var i = 0; i < roleClassArr.length; i++) {
                if (roleClassArr[i] == '1' || roleClassArr[i] == '2' || roleClassArr[i] == '3' || roleClassArr[i] == '4') {
                    flag = true;
                    break;
                }
            }
        } catch (err) {
            flag = false;
        }
        if (getData('userId') == 'wenshushi' || getData('userId') == 'mishuchu') {
            flag = true;
        }
        cmx.g.dubanflag = flag;
        var mnumber = data.length;
        var shenwuchu_relicId56020 = ['RGJ0502001', 'RGJ0502002'];
        // var shenhezhan_relicId56020 = ['RJC0000001'];
        var gongzhongyonghu=['RGZ0000001'];
        var relicId56020 = getData('roleId');
        var roleName = getData('role');
        for (var i = 0; i < mnumber; i++) {
            //遍历导航      
            $("#admui-navMenu ul").append([
                '<li role="presentation" class="rmenu-id-' + data[i].id + '">',
                '<a id="a' + i + '" data-toggle="tab" href="#admui-navTabsItem-' + i + '" aria-controls="admui-navTabsItem-' + i + '" role="tab" aria-expanded="false" >',
                '<i class="' + data[i].icon + '"></i> <span>' + data[i].text + '</span>',
                '</a>',
                '</li>'
            ].join(''));

            $("#admui-navTabs").append([
                '<div class="tab-pane animation-fade height-full ' + (i == 0 ? 'active' : '') + ' " id="admui-navTabsItem-' + i + '" role="tabpanel"> ',
                '<ul class="site-menu" id="admui-nav' + i + '">',
                '<li class="site-menu-category">' + data[i].title + '</li>',
                '</ul>',
                '</div>'
            ].join(''));
            fmenu(i, data);
        }
        if ($.inArray(relicId56020, shenwuchu_relicId56020) >= 0) {
            $('#ul00').empty();
            var html = ['<li class="open site-menu-item smenu-id-cmx-nav-0117 active" id="s007" parent-fmenu-id="cmx-nav-011"><a class="third-menu" href="../../../app/f-gover-approval/56020-1/shewenchu-duban.html?nowid='+GetUrlParamString('nowid')+'"><span class="site-menu-title">督办查看   </span></a></li>',
                // '<li class="open site-menu-item smenu-id-cmx-nav-0117" id="s008" parent-fmenu-id="cmx-nav-011"><a class="third-menu" href="../../../app/f-gover-approval/56020-1/shewenchu-haveToDo.html?nowid='+GetUrlParamString('nowid')+'"><span class="site-menu-title">办结查询   </span></a></li>',
                '<li class="open site-menu-item smenu-id-cmx-nav-0115" id="s005" parent-fmenu-id="cmx-nav-011"><a class="third-menu" href="../../../app/f-gover-approval/nation/gongshi.html?nowid='+GetUrlParamString('nowid')+'"><span class="site-menu-title">信息公示   </span></a></li>',
                '<li class="open site-menu-item smenu-id-cmx-nav-0116" id="s006" parent-fmenu-id="cmx-nav-011"><a class="third-menu" href="../../../app/f-gover-approval/nation/gongkai.html?nowid='+GetUrlParamString('nowid')+'"><span class="site-menu-title">信息公开   </span></a></li>'
            ].join('');
            $('#ul00').html(html);
        } else if (relicId56020 == "RGJ0500001") {
            $('#s004').append('<a class="third-menu " href="/app/f-gover-approval/56020-1/shewenchu-duban.html?nowid='+GetUrlParamString('nowid')+'"><span class="site-menu-title">进出境备案查看</span></a>');
            $("#duban").html("督办查看");
            $('#dubanList').text("督办查看");
        }
        //审核站左侧树形菜单和右上角的提醒小标功能
        else if (roleName=='wenwujinchujingshenhe') {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaScrQuery/getTaskCount',
                    data: JSON.stringify({
                        token: getData("token")
                    })
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == "200" && !IsEmpty(prevModelData)) {
                        var arr = prevModelData.data.mapInOutClass;
                        var eq = [];
                        console.log(arr);
                        for (var i = 0; i < arr.length; i++) {
                            for (var j in arr[i]) {
                                eq.push(arr[i][j]);
                            }
                        }
                        for (var i = 0; i < 35; i++) {
                            if(i==6||i==13||i==20||i==27||i==34){
                                $('.third-menu:eq(' + i + ')').append('<span class="">('+eq[i]+')</span>');
                            }else{
                                $('.third-menu:eq(' + i + ')').append(eq[i]!=0?'<span class="margin-3 badge badge-danger center msg-num">'+eq[i]+'</span>':'');
                            }
                            
                        }
                    } else {
                        showAlert({
                            type: 'error',
                            content: prevModelData.msg
                        })
                    }
                })
                .start();
            $('#returnWorkbench').css('display','none');
            $('#remindersList').css('display','none');
        }else if($.inArray(relicId56020, gongzhongyonghu) >= 0){
            $('#returnWorkbench').css('display','none');
            $('#remindersList').css('display','none');
        }
        setTimeout(function() {
            $.site.run();
            var now_id = GetUrlParamString('nowid');
            if ($('.smenu-id-' + now_id).length > 0) {
                $('.smenu-id-' + now_id).addClass('active');
                var parent_fmenu_id = $('.smenu-id-' + now_id).attr('parent-fmenu-id');
                $('.fmenu-id-' + parent_fmenu_id).addClass('open');
                var parent_rmenu_id = $('.fmenu-id-' + parent_fmenu_id).attr('parent-rmemu-id');
            } else {
                $('.fmenu-id-' + now_id).addClass('active');
                var parent_rmenu_id = $('.fmenu-id-' + now_id).attr('parent-rmemu-id');
            }
            $('.rmenu-id-' + parent_rmenu_id + ' a').trigger("click");
            $('.site-menubar-body').css('visibility', 'visible');
            if (getData('role') == 'province') {
                $(".rmenu-id-cmx-nav-01 a").text('欢迎你，' + (IsEmpty(getData('instName')) ? '' : getData('instName')) + ' ' + getData('userName') + '，上次登录时间：' + (IsEmpty(getData('lastlogintime')) ? '首次登录' : getData('lastlogintime')));
            } else {
                $(".rmenu-id-cmx-nav-01 a").text('欢迎你，' + getData('userName') + '，上次登录时间：' + (IsEmpty(getData('lastlogintime')) ? '首次登录' : getData('lastlogintime')));
            }
            $('#cmx-role-name').html('角色：' + getData('roleName'));
            if (getData('role') == 'nation'){
                if(getData('roleId') != 'RGJ0101003'){
                    $('.smenu-id-cmx-nav-0118').remove();
                }
            }
        }, 0);
    });

})(window, document, jQuery);

function fmenu(i, data) {
    'use strict';
    // alert(data[i].menu.length);
    for (var j = 0; j < data[i].menu.length; j++) {
        //遍历第一级菜单
        $("#admui-nav" + i + "").append(

            ['<li class="open site-menu-item has-sub fmenu-id-' + data[i].menu[j].id + '" id="smenu' + i + j + '" parent-rmemu-id="' + data[i].id + '">',
            '<a class="second-menu" href="' + data[i].menu[j].url + (data[i].menu[j].submenu.length > 0 ? '' : '?nowid=' + data[i].menu[j].id) + '">',
            '<i class="site-menu-icon ' + data[i].menu[j].icon + '" aria-hidden="false"></i><span class="site-menu-title">' + data[i].menu[j].text + '</span><span class="site-menu-arrow" id="mdirect' + i + j + '"></span>',
                '</a>',
            '<ul class="site-menu-sub" id="ul' + i + j + '">',
                '</ul>',
                '</li>'
            ].join(''));
        smenu(i, j, data);
        if (data[i].disable == '1') {
            $("#a" + i + "").css('display', 'none');
        }
        if (data[i].menu[j].submenu.length == 0) {
            $("#mdirect" + i + j + "").removeClass("site-menu-arrow");
            $("#ul" + i + j + "").remove();
        };
        if (data[i].menu[j].disable == '1') {
            // alert(data[i].menu[j].text);
            $("#smenu" + i + j + "").css('display', 'none');
        };
    };
}

function smenu(i, j, data) {
    'use strict';
    var num = 0;
    for (var k = 0; k < data[i].menu[j].submenu.length; k++) {
        //遍历第二级菜单
        var _theurl = data[i].menu[j].submenu[k].url;
        var _class = '';
        if (getData('role') == 'nation' && data[i].menu[j].submenu[k].id == 'cmx-nav-0118') {
            if (!cmx.g.dubanflag)
                _class = 'hidden';
        }
        $("#smenu" + i + j + " ul").append(
            ['<li class="open site-menu-item ' + _class + ' smenu-id-' + data[i].menu[j].submenu[k].id + '" id="s' + i + j + k + '" parent-fmenu-id="' + data[i].menu[j].id + '">',
            '<a class="third-menu ' + (data[i].menu[j].submenu[k].class ? data[i].menu[j].submenu[k].class : '') + '" href="' + _theurl + (_theurl.indexOf("javascript:") >= 0 ? '' : ((_theurl.indexOf('?') > 0 ? '&' : '?') + 'nowid=' + data[i].menu[j].submenu[k].id)) + '">',
            '<span class="site-menu-title">' + data[i].menu[j].submenu[k].text + '   </span>',
                '</a>',
                '</li>'
            ].join('')
        );
        if (data[i].menu[j].submenu[k].disable == '1') {
            $("#s" + i + j + k + "").css('display', 'none');
            num++;
        };
        if (num == data[i].menu[j].submenu.length) {
            $("#mdirect" + i + j + "").removeClass("site-menu-arrow");
            $("#ul" + i + j + "").remove();
        }
    }
}