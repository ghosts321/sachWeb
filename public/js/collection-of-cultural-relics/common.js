var tool = (function(){
  var ajax = function(sUrl,sType,oData,callback,beforeSend){
    $.ajax({
      url: sUrl,
      type: sType,
      async: true,
      data: oData,
      dataType: 'json',
      beforeSend: beforeSend,
      success:callback,
      error: function(err){
        console.log('出错了...');
        console.log(err);
      }
    });
  }
  return {
    ajax: ajax
  }
})();

// 定义一个函数 获取顶部url传过来的参数
function getQuery(sUrl){
  var s = sUrl.substr(sUrl.search(/\?/) + 1);
  var arr = s.split('&');
  var obj = {}; // 函数里的obj 局部变量
  for(var i = 0,len = arr.length; i < len; i++){
    var a = arr[i].split('=');
    obj[a[0]] = decodeURI(a[1]);
  }
  return obj;
}

// 切换环境
var domainName  = 'http://gl.sach.gov.cn';  // 域名
// var domainName  = 'http://gl.sach.gov.cn';  // ip地址 生产环境
// var domainName  = 'http://192.168.31.161';  // ip地址 测试环境
// var domainName  = 'http://192.168.209.220';  // ip地址 开发环境

// 用于生产环境
var publicUrl   = domainName + ':9090/is',      // 原1010端口
    publicUrl_2 = domainName + ':9090/io',      // 原2020端口
    publicUrl_3 = domainName + ':9090/im',      // 原3030端口
    publicUrl_4 = domainName + ':9090/zuul/dm', // 原4040端口
    publicUrl_5 = domainName + ':9090/aa',      // 原5050端口
    publicUrl_6 = domainName + ':9090/cm',      // 原6060端口
    publicUrl_6 = domainName + ':9090/ea';      // 原7070端口

// 点击左侧行政审批
$('.leftlink').on('click',function(e){
  window.location.href = domainName + '/index.html?to=applyTable';
  e.preventDefault();
});

// 点击右侧工作台
$('.rightlink').on('click',function(e){
  window.location.href = domainName + '/index.html';
  e.preventDefault();
});

// 点击登录跳转
$('.user-info').on('click',function(){
  window.location.href = domainName + '/login.html';
});


// 用户登录时 显示右上角用户名字
if (!IsEmpty(getData('token'))) {
  $('.user-info').html('<span class="welcome">欢迎你，' + getData('userName') + '</span>' +'&nbsp;&nbsp;<a class="signout" href="javascript:clearData(\'token\');location.reload();">登出</a>');
}


