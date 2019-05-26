// 模态框 相关
var $modal = $('#modal');
function closeModal() {
	$modal.stop(true).fadeOut(200, function () {
		$(this).find('.modal-ctx').html('');
	});
	// $('body,html').css('height', '100%');
}
function openModal(sHtml, sTitle, sClass) { // sClass方便扩展
	if (sClass) {
		$modal.find('#modalBox').attr('class', 'modal-box ' + sClass);
	}
	if (sTitle) {
		$modal.find('.modal-title i').html(sTitle);
	}
	$modal.find('.modal-ctx').html(sHtml).end().stop(true).fadeIn(200);
	$('body,html').css('height', 'auto'); // 高度自动 否则影响底部样式
}
$modal.find('.modal-close').on('click', closeModal);
$modal.find('.modal-sure').on('click', closeModal);

// 过滤script标签 
function stripscript(str) {
	return str.replace(/<script>.*?|<\/script>.*?/ig, '');
}

// 定义一个函数 获取顶部url传过来的参数
function getQuery(sUrl) {
	var s = stripscript(sUrl).substr(sUrl.search(/\?/) + 1);
	var arr = s.split('&');
	var obj = {}; // 函数里的obj 局部变量
	for (var i = 0, len = arr.length; i < len; i++) {
		var a = arr[i].split('=');
		obj[a[0]] = decodeURI(a[1]);
	}
	return obj;
}

// 切换环境
var api = 'shengchan'; // kaifa ceshi shengchan gmyx hg

switch (api) {
	case 'kaifa': // 开发环境
		var domainNameBackstage = 'http://192.168.209.220';   // ip地址 开发环境
		var publicUrl   = domainNameBackstage + ':1010',      // 1010端口
			publicUrl_2 = domainNameBackstage + ':2020',      // 2020端口
			publicUrl_3 = domainNameBackstage + ':3030',      // 3030端口
			publicUrl_4 = domainNameBackstage + ':4040',      // 4040端口
			publicUrl_5 = domainNameBackstage + ':5050',      // 5050端口
			publicUrl_6 = domainNameBackstage + ':6060',      // 6060端口
			publicUrl_7 = domainNameBackstage + ':7070';      // 7070端口
		break;
	case 'ceshi': // 测试环境
		var domainNameBackstage = 'http://202.41.241.161';       // ip地址 测试环境？
		var publicUrl   = domainNameBackstage + ':9090/is',      // 原1010端口
			publicUrl_2 = domainNameBackstage + ':9090/io',      // 原2020端口
			publicUrl_3 = domainNameBackstage + ':9090/im',      // 原3030端口
			publicUrl_4 = domainNameBackstage + ':9090/zuul/dm', // 原4040端口
			publicUrl_5 = domainNameBackstage + ':9090/aa',      // 原5050端口
			publicUrl_6 = domainNameBackstage + ':9090/cm',      // 原6060端口
			publicUrl_7 = domainNameBackstage + ':9090/ea';      // 原7070端口
			// $('body').removeClass('offical');
		break;
	case 'shengchan': // 域名 生产环境
		var domainNameBackstage = 'http://gl.sach.gov.cn';       // ip地址 生产环境
		var publicUrl   = domainNameBackstage + ':9090/is',      // 原1010端口
			publicUrl_2 = domainNameBackstage + ':9090/io',      // 原2020端口
			publicUrl_3 = domainNameBackstage + ':9090/im',      // 原3030端口
			publicUrl_4 = domainNameBackstage + ':9090/zuul/dm', // 原4040端口
			publicUrl_5 = domainNameBackstage + ':9090/aa',      // 原5050端口
			publicUrl_6 = domainNameBackstage + ':9090/cm',      // 原6060端口
			publicUrl_7 = domainNameBackstage + ':9090/ea';      // 原7070端口
		break;
	case 'gmyx':
		var domainNameBackstage  = 'http://192.168.211.94';   // ip地址 gmyx
		var publicUrl   = domainNameBackstage + ':1010',      // 1010端口
			// publicUrl_2 = domainNameBackstage + ':2020',      // 2020端口
			publicUrl_2 = domainNameBackstage + ':3030',      // 2020端口 gmyx的是3030
			publicUrl_3 = domainNameBackstage + ':2020',      // 3030端口 im
			publicUrl_4 = domainNameBackstage + ':4040',      // 4040端口
			publicUrl_4 = 'http://202.41.241.161' + ':9090/zuul/dm',      // 4040端口
			publicUrl_5 = 'http://192.168.209.220' + ':5050',      // 5050端口
			publicUrl_6 = domainNameBackstage + ':6060',      // 6060端口
			publicUrl_7 = domainNameBackstage + ':7070';      // 7070端口
		break;
	case 'hg':
		var domainNameBackstage  = 'http://192.168.211.59';   // ip地址 hg
		var publicUrl   = domainNameBackstage + ':1010',      // 1010端口
			publicUrl_2 = domainNameBackstage + ':2020',      // 2020端口
			publicUrl_3 = domainNameBackstage + ':3030',      // 3030端口
			publicUrl_4 = domainNameBackstage + ':4040',      // 4040端口
			publicUrl_5 = domainNameBackstage + ':5050',      // 5050端口
			publicUrl_6 = domainNameBackstage + ':6060',      // 6060端口
			publicUrl_7 = domainNameBackstage + ':7070';      // 7070端口
		break;
}

// 点击左侧行政审批
$('.leftlink').on('click', function (e) {
	// window.location.href = domainNameBackstage + '/index.html?to=applyTable';
	e.preventDefault();
	console.log(window.location.href)
	var url = window.location.href;
	var path = url.substring(0, url.indexOf('sachhome'));
	window.location.href = path + 'sachhome/approval/admin-approval-manage.html';
});

// 点击右侧工作台
$('.rightlink').on('click', function (e) {
	window.location.href = domainNameBackstage + '/index.html';
	// window.location.href = domainNameBackstage + '/app/f-administrative-platform-protal/nation-workbench.html?nowid='+GetUrlParamString('nowid');
	e.preventDefault();
});

// 点击登录跳转
$('.user-info').on('click', function () {
	window.location.href = domainNameBackstage + '/login.html';
});


// 用户登录时 显示右上角用户名字
if (!IsEmpty(getData('token'))) {
	$('.user-info').html('<span class="welcome">欢迎你，' + getData('userName') + '</span>' + '&nbsp;&nbsp;<a class="signout" href="javascript:clearData(\'token\');location.reload();">登出</a>');
}

// 修改所有页面title
$('title').html('国家文物局综合行政管理平台');

var api_ea;


// 原index.js内容
$(".custom-banner").PageSwitch({
	direction: 'horizontal',
	easing: 'ease-in',
	duration: 800,
	autoPlay: false,
	interval: 5000,
	loop: 'true'
});
$(document).ready(function () {
	$('.custom-onlinehall-header').on('click', function () {
		$('.custom-onlinehall-header').removeClass('active');
		$(this).addClass('active');
	});
});

$(function () {
	// 切换选项卡
	$('.comprehensive-manage-tab span').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	// 切换选项卡
	$('.catalog p span').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	// 切换选项卡
	$('.classify p span').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	// 切换选项卡
	$('.application-form p span').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	// 切换选项卡
	// $('.industry-integrated-management p span,.cultural-relics-market p span').on('click',function(){
	//     $(this).addClass('on').siblings().removeClass('on');
	// });

	// 切换选项卡
	$('.qualification-list p span').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	// 切换选项卡
	$('.industry-related p span').on('click', function () {
		$(this).addClass('on').siblings().removeClass('on');
	});

	// // 国家文物局在线办事大厅 切换a下面的三角形
	// $('.tal a').on('click',function(){
	//     $(this).addClass('on').siblings().removeClass('on');
	//     $('.tal table').css('display','none');
	//     return false;
	// });


});

// console.log(api_io);
// $('body').removeClass('offical');