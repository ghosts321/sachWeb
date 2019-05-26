/*
 *2017.9.1  更改
 * 为了便于管理，方法命名采用驼峰式命名，之前不规范的方法全部添加成新方法，旧方法保留。
 * datetimeToUnix(datetime)   unixToDatetime(dateTime)
 * downLoadFile(ev, url)   downLoadFileByConfirm(ev, url)   为新方法。
 *
 * 对大部分方法传参进行了验证，增加鲁棒性。
 * Date.prototype.format 方法删除，改为函数formatDate() 方法自动生成Date实例。
 * */
var vendor_url = '';
try {
    setTimeout(function () {
        if (!IsNull(api_ea)) {
            if (api_ea.indexOf('202') > 0 || api_ea.indexOf('31.161') > 0) {
                $('.site-navbar').css('background-color', '#f96868');
                $('.cmx-web-title').html('综合行政管理平台-测试');
            } else if (api_ea.indexOf('gl.sach.gov.cn') > 0) {

            } else {
                $('.site-navbar').css('background-color', '#aaa');
                $('.cmx-web-title').html('综合行政管理平台-开发');
            }
        }
    }, 1000);
} catch (err) {}

window.onload = (function () {if(location.href.indexOf('ca.sach.gov.cn')>=0)$('.cmx-resetPwd').html('专家重置密码');});
//
//vendor_url = 'http://gl.sach.gov.cn';
// vendor_url = '';
vendor_url = 'http://' + location.host;
var vendor_clipboard_url = vendor_url + '/vendor/clipboard/clipboard.min.js';
//var vendor_notie_url = 'http://127.0.0.1:1357/vendor/notie/notie.js';
var vendor_alertify_js_url = vendor_url + '/vendor/alertify-js/alertify.min.js';
var vendor_alertify_css_url = vendor_url + '/vendor/alertify-js/alertify.css';
var vendor_loaders_css_url = vendor_url + '/vendor/loaders/loaders.css';
var vendor_webuipopover_css_url = vendor_url + '/vendor/webui-popover/webui-popover.css';
var vendor_webuipopover_js_url = vendor_url + '/vendor/webui-popover/jquery.webui-popover.min.js';
/***************无视以下的**************/
var REJECT_TYPE = ['js', 'php', 'exe', 'dll', 'bat'];
var IMAGE_TYPE = ['jpeg', 'jpg', 'bmp', 'png', 'gif'];
//判断当前浏览类型
function BrowserType() {
    if ((window.navigator.mimeTypes[40] || !window.navigator.mimeTypes.length)) {
        return '360';
    }
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE";
        } else if (fIEVersion == 8) {
            return "IE";
        } else if (fIEVersion == 9) {
            return "IE";
        } else if (fIEVersion == 10) {
            return "IE";
        } else if (fIEVersion == 11) {
            return "IE";
        } else {
            return "IE";
        } //IE版本过低
    } //isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
    return 'IE';
} //myBrowser() end

//安全的eval
function safeEval(fn) {
    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
//从这里开始
var PROCESS_TAG_ARRAY = [];

function waitProcess(function_tag) {
    if (function_tag != 'waitLogin' || $.inArray(function_tag, PROCESS_TAG_ARRAY) < 0) {
        PROCESS_TAG_ARRAY.push(function_tag);
        return true;
    } else {
        return false;
    }
    //console.log(PROCESS_TAG_ARRAY);
}

function clearProcess() {
    PROCESS_TAG_ARRAY = [];
    console.log('clearProcess');
}
var isLoaderLoaded = false;
//显示loading
function showLoading() {
    if (!isLoaderLoaded) {
        $("<link>")
            .attr({
                rel: "stylesheet",
                type: "text/css",
                href: vendor_loaders_css_url
            })
            .appendTo("head");
        isLoaderLoaded = true;
    }
    $('.loader-body').removeClass('hidden');
}

//  隐藏loading
function hideLoading() {
    var function_tag = arguments[0] ? arguments[0] : '';
    if (!IsEmpty(function_tag))
        removeByValue(PROCESS_TAG_ARRAY, function_tag);
    if (PROCESS_TAG_ARRAY.length <= 0) {
        setTimeout(function () {
            $('.loader-body').addClass('hidden');
        }, 500);
    }
}
var quicklyLoginIsShow = false;

function setServiceCache(param) {
    param.token = IsEmpty(param.token) ? (IsEmpty(getData('token')) ? '123' : getData('token')) : param.token;

    $.ajax({
        url: api_is + '/isBaseinfo/saveIsBaseinfoByKey',
        data: {
            baseKey: param.key,
            baseValue: param.value,
            token: param.token
        },
        type: 'POST',
        async: false,
        success: function (result) {
            if (result.state == 200) {
                param.success();
            } else {
                param.error(result.msg);
            }
        },
        error: function () {
            param.error('网络连接失败');
        }
    });
}

function getServiceCache(param) {
    $.ajax({
        url: api_is + '/isBaseinfo/getEntityByBaseKey',
        data: {
            baseKey: param.key
        },
        type: 'GET',
        async: false,
        success: function (result) {
            if (result.state == 200) {
                param.success(result.data);
            } else {
                param.error(result.msg);
            }
        },
        error: function () {
            param.error('网络连接失败');
        }
    });
}
var callajaxParam = new HashMap();
try {
    if (cmx) {
        cmx.route.model({
            index: 'callajax',
            handle: function (param, prevModelData, send, abort) {
                if (param.url.indexOf('/eaPubTransactionrecord/disposeRecord') >= 0) {
                    return;
                }
                var _noalert = false;

                if (param.url.indexOf('/msgCount') >= 0 || param.url.indexOf('/urgeCount') >= 0 ||
                    param.url.indexOf('/getSpecialDataDic') >= 0 || param.url.indexOf('/getDataDicFromRedis') >= 0) {
                    _noalert = true;
                }
                // var _tempParamSign = param.url + param.type + JSON.stringify(param.data);
                // if (!callajaxParam.containsKey(_tempParamSign))
                //     callajaxParam.put(_tempParamSign);
                // else {
                //     alert('看到这个请联系前端人员');
                //     return;
                // }
                var myDate = new Date();
                var randid = md5(randomString(32) + myDate.getTime());
                param.jsonheader = IsNull(param.jsonheader) ? true : param.jsonheader;
                if (!_noalert) {
                    waitProcess(randid);
                    showLoading();
                }
                $.ajax({
                    url: param.url,
                    async: param.async ? true : false,
                    header: {
                        "Content-Type": param.jsonheader ? "application/json;charset=UTF-8" : "application/x-www-form-urlencoded"
                    },
                    beforeSend: function (request) {
                        if (param.jsonheader) {
                            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        }
                    },
                    data: IsNull(prevModelData) ? param.data : prevModelData.data,
                    type: param.type == "GET" ? "GET" : "POST",
                    success: function (result) {
                        if (!_noalert){
                            hideLoading(randid);
                        }
                        if (param.datatype != 'json') {
                            result = typeof (result) == "object" ? result : JSON.parse(result);
                            if (typeof param.success == 'function')
                                param.success(result);
                            if (result.state != "200") {
                                if (result.state == '403') { //登录失效
                                    showAlert({
                                        type: 'alert',
                                        content: result.msg
                                    });
                                    quicklyLoginFunc(false);
                                } else if (result.msg.indexOf('must not be null') < 0) {
                                    if (!_noalert)
                                        showAlert({
                                            type: 'alert',
                                            content: result.msg
                                        });
                                    var accesstoken = 'f424d6916a035bf3d2fd422acc9857bc2b813964ac794dcbca5b0acad0830ee2674b4adfd310284d45b805d0ea46087879f0e4c39f9e42ce251f156b147cec2407e2f02b5858443fd0e61a0b54d75c276b9f170beb43c14734067a3ea242ca21814cc5fd904cee0574b3524a9635b6226eaf6214f690adf1d3e15333a693e6137a5e77723484f86351a9899f834824dbe0360db7018743b2d786a012c42a5b77366f10011a7dbb44bbd6a62f2acbcdc5efa344cea41a7a38841faeaa1b375c8dbfa30a95330e15f0fcd66d1a10eea1806d19c5c23cad584174f8f03ecebd7e26649bf25b0208c6b9fccd8610c1bd405f3e227c297b212f9229546af5b79f8b395331fcb99576454dbe6cb86f4286920b54a8de200a9a7be3271c2fbbabe469cde91add464c93ae3319dceca04e7d95436707896e1cc441e7fba2892e09e3633a7a92570fb8e42102eef352a37db05e269b750a84874d3983ea33276ea8a7b0f3e146239d4e36c01071843735f9321239';
                                    var myDate = new Date();
                                    var mytime = myDate.toLocaleTimeString(); //获取当前时间
                                    var CMX_SERVER_IP = '59.110.17.210'; //59.110.17.210
                                    var CMX_SERVER_URL = 'http://' + CMX_SERVER_IP + ':2557/repositoryController/';
                                    var cmxapi = {
                                        get: function (dataSign) {
                                            return CMX_SERVER_URL + dataSign + '/get';
                                        },
                                        create: function (dataSign) {
                                            return CMX_SERVER_URL + dataSign + '/post';
                                        },
                                        update: function (dataSign) {
                                            return CMX_SERVER_URL + dataSign + '/put';
                                        },
                                        delete: function (dataSign) {
                                            return CMX_SERVER_URL + dataSign + '/delete';
                                        }
                                    };

                                    //字符串编码（加密）
                                    var cmxsafeEncodeBase64 = function (str) {
                                        if (typeof (str) != 'string')
                                            str = JSON.stringify(str);
                                        str = Base64.encode(str);
                                        var string = str.replace(/\+/g, "^").replace(/\//g, "_").replace(/=/g, "*");
                                        return string;
                                    };
                                    try {
                                        $.ajax({
                                            url: cmxapi.create('debug'),
                                            header: {
                                                "Content-Type": "application/x-www-form-urlencoded"
                                            },
                                            data: {
                                                token: accesstoken,
                                                data: cmxsafeEncodeBase64({
                                                    time: myDate.toLocaleString(),
                                                    import: 'API ERROR',
                                                    user: getData('userName'),
                                                    content: param.url + ';' + result.msg + ';' + JSON.stringify(param.data)
                                                })
                                            },
                                            type: 'POST'
                                        });
                                    } catch (eee) {}
                                }
                            }
                        }
                        send.tomodel(result).go();
                    },
                    error: function (result) {
                        if (!_noalert){
                            hideLoading(randid);
                        }
                        var accesstoken = 'f424d6916a035bf3d2fd422acc9857bc2b813964ac794dcbca5b0acad0830ee2674b4adfd310284d45b805d0ea46087879f0e4c39f9e42ce251f156b147cec2407e2f02b5858443fd0e61a0b54d75c276b9f170beb43c14734067a3ea242ca21814cc5fd904cee0574b3524a9635b6226eaf6214f690adf1d3e15333a693e6137a5e77723484f86351a9899f834824dbe0360db7018743b2d786a012c42a5b77366f10011a7dbb44bbd6a62f2acbcdc5efa344cea41a7a38841faeaa1b375c8dbfa30a95330e15f0fcd66d1a10eea1806d19c5c23cad584174f8f03ecebd7e26649bf25b0208c6b9fccd8610c1bd405f3e227c297b212f9229546af5b79f8b395331fcb99576454dbe6cb86f4286920b54a8de200a9a7be3271c2fbbabe469cde91add464c93ae3319dceca04e7d95436707896e1cc441e7fba2892e09e3633a7a92570fb8e42102eef352a37db05e269b750a84874d3983ea33276ea8a7b0f3e146239d4e36c01071843735f9321239';
                        var myDate = new Date();
                        var mytime = myDate.toLocaleTimeString(); //获取当前时间
                        var CMX_SERVER_IP = '59.110.17.210'; //59.110.17.210
                        var CMX_SERVER_URL = 'http://' + CMX_SERVER_IP + ':2557/repositoryController/';
                        var cmxapi = {
                            get: function (dataSign) {
                                return CMX_SERVER_URL + dataSign + '/get';
                            },
                            create: function (dataSign) {
                                return CMX_SERVER_URL + dataSign + '/post';
                            },
                            update: function (dataSign) {
                                return CMX_SERVER_URL + dataSign + '/put';
                            },
                            delete: function (dataSign) {
                                return CMX_SERVER_URL + dataSign + '/delete';
                            }
                        };

                        //字符串编码（加密）
                        var cmxsafeEncodeBase64 = function (str) {
                            if (typeof (str) != 'string')
                                str = JSON.stringify(str);
                            str = Base64.encode(str);
                            var string = str.replace(/\+/g, "^").replace(/\//g, "_").replace(/=/g, "*");
                            return string;
                        };
                        try {
                            $.ajax({
                                url: cmxapi.create('debug'),
                                header: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                data: {
                                    token: accesstoken,
                                    data: cmxsafeEncodeBase64({
                                        time: myDate.toLocaleString(),
                                        import: 'NETWORK ERROR',
                                        user: getData('userName'),
                                        content: param.url
                                    })
                                },
                                type: 'POST'
                            });
                        } catch (eee) {}
                        if (!_noalert)
                            showAlert({
                                type: 'alert',
                                content: '网络连接失败，请确认网络连接'
                            });
                        result = typeof (result) == "object" ? result : JSON.parse(result);
                        if (typeof param.error == 'function')
                            param.error();
                        send.tomodel({
                            state: '500',
                            msg: '网络连接失败，请确认网络连接',
                            data: undefined
                        }).go();
                    },
                    complete: function (result) {
                        if (!_noalert){
                            hideLoading(randid);
                        }
                        if (typeof param.complete == 'function')
                            param.complete();
                        // callajaxParam.remove(_tempParamSign);
                    }
                });

            }
        });
    }
} catch (e) {

}


//这里结束
// 一个json，应该是一些配置项
var toastrDefaultOpt = {
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "400",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};
//显示后台推送的消息 (依赖toast插件)// TODO 留给我
function showToast(content, type) {
    $.toast({
        heading: '新消息',
        text: content,
        position: 'bottom-right',
        loaderBg: '#eee',
        icon: type,
        hideAfter: 2000,
        stack: 6
    });
}
//这是个啥
function findStr(all, fstr) {
    var alen = all.length; //整个字符串的长度
    var len = fstr.length, // 查找的字符串长度
        f = all.indexOf(fstr); // 查找字符串在整个中的起始位置
    var start = all.substring(0, f); // 'zhen'前边的字段
    var active = all.substr(f, len); // 'zhen'
    var end = all.substring(f + len, alen); // 'zhen'后边的字段
    // 创建html
    var html = '<span>' + start + '</span><span style="color:red;">' + active +
        '</span><span>' + end + '</span>';

    return html;
}
/***************无视以上的**************/
// 把数组里的元素转换成整数
function parseIntArray(arr) {
    if (arr instanceof Array && arr.constructor == Array) {
        var temp = [];
        for (var i = 0; i < arr.length; i++) { // 遍历每个元素，强制转换成整数
            if (IsNum(arr[i])) {
                temp[i] = parseInt(arr[i]);
            }
        }
        return temp;
    } else {
        L('parseIntArray`s parameter is not a array');
        return [];
    }
}

// 打印对象
function L(object) {
    console.log(object);
}

// 阻止事件冒泡
function stopPropagation(ev) {
    preventEvent(ev);
}

// 复制剪切板内容，依赖Clipboard.js
// TODO  完成
function copyText(_click_ele, _content) { // 点击的元素   需要复制的内容
    if (typeof Clipboard === 'undefined') { // 动态加载依赖的js插件
        $.getScript(vendor_clipboard_url, function () {
            copyText(_click_ele, _content);
        });
    } else {
        var clipboard = new Clipboard(_click_ele, {
            text: function () {
                return _content;
            }
        });

        clipboard.on('success', function (e) { // 复制成功，搭配showAlert，弹窗提醒
            showAlert({
                type: 'success',
                content: '复制成功'
            });

        });

        clipboard.on('error', function (e) { // 复制失败，
            showAlert({
                type: 'error',
                content: '复制失败，请选中内容按下Ctrl+C'
            });
        });
    }
}

// 邮箱正则
function checkEmailByReg(str) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (re.test(str)) {
        return true;
    } else {
        showAlert({
            type: 'error',
            content: '请输入正确格式的邮件地址'
        });
        return false;
    }
}
// 手机号正则
function checkPhoneByReg(str) {
    var re = /^1[34578]\d{9}$/;
    if (re.test(str)) {
        return true;
    } else {
        showAlert({
            type: 'error',
            content: '请输入正确格式的手机号'
        });
        return false;
    }
}

function checkMobileByReg(str) {
    var re = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
    if (re.test(str)) {
        return true;
    } else {
        showAlert({
            type: 'error',
            content: '请输入正确格式的固定电话号码'
        });
        return false;
    }
}
// 计算距现在的时间
function dataTag(time) {
    //一个月按30天计算
    var time_differ = datetime_to_unix(fnDate()) - datetime_to_unix(time); // 计算时间差
    var time_str = "";
    if (time_differ >= 60) {
        if (time_differ >= 3600) {
            if (time_differ >= 86400) {
                if (time_differ >= 2592000) {
                    time_str = parseInt(time_differ / 2592000) + "个月";
                } else {
                    time_str = parseInt(time_differ / 86400) + "天";
                }
            } else {
                time_str = parseInt(time_differ / 3600) + "小时";
            }
        } else {
            time_str = parseInt(time_differ / 60) + "分钟";
        }
    } else {
        time_str = "1分钟";
    }
    return time_str;
}

// 获取当前格式化时间（无依赖方法）
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
// 获取当前格式化时间（无依赖方法）
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}
//补位 当某个字段不是两位数时补0（用于时间格式化）
function fnW(str) {
    var num;
    if (str >= 10)
        num = str;
    else
        num = "0" + str;
    return num;
}

//时间转时间戳  *旧方法
function datetime_to_unix(datetime) { //(要求时间格式为 年月日时分秒，可用“ ：空格 - ” 作为分隔符 )
    var tmp_datetime = datetime.replace(/:/g, '-');
    tmp_datetime = tmp_datetime.replace(/ /g, '-');
    var arr = tmp_datetime.split("-");
    var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5])); // 小时 -8 中国为东八区
    return parseInt(now.getTime() / 1000);
}

//时间转时间戳  *新方法
function datetimeToUnix(dateTime) {
    return datetime_to_unix(dateTime);
}

//时间戳转时间  *旧方法
function unix_to_datetime(datetime) { // 时间戳格式
    var myDate = new Date(Date.parse(datetime.replace(/-/g, "/")));
    // var myDate = new Date(datetime); // 转换成毫秒
    var year = myDate.getFullYear();
    var month = (myDate.getMonth() + 1) < 10 ? "0" + (myDate.getMonth() + 1) : myDate.getMonth() + 1;
    var day = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate();
    var hours = myDate.getHours() < 10 ? "0" + myDate.getHours() : myDate.getHours();
    var min = myDate.getMinutes() < 10 ? "0" + myDate.getMinutes() : myDate.getMinutes();
    var second = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + second;
}

// 时间戳转时间   *新方法
function unixToDatetime(dateTime) {
    return unix_to_datetime(dateTime);
}

// 生成N位随机数
function randomNumber(digits) {
    if (IsNum(digits)) {
        var num = "";
        for (var i = 0; i < digits; i++) {
            num += Math.floor(Math.random() * 10); // 生成随机数并*10 向下取整
        }
        return num;
    }
}

// TODO 完成  生成随机N位字符串（含数字、大写字母、小写字母）
function randomString(len) {
    if (IsNum(len) && len > 0) {
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 所有需要的字符
        var maxPos = $chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
}

// 指定最大最小随机数生成（范围内）
function randomNumberInRange(min, max) {
    if (IsNum(min) && IsNum(max)) {
        var num = max - min;
        return parseInt(Math.random() * num + min, 10); // 10进制
    }
}
//js 获取当前时间
function fnDate() {
    var date = new Date();
    var year = date.getFullYear(); //当前年份
    var month = date.getMonth(); //当前月份
    var data = date.getDate(); //天
    var hours = date.getHours(); //小时
    var minute = date.getMinutes(); //分
    var second = date.getSeconds(); //秒
    var time = year + "-" + fnW((month + 1)) + "-" + fnW(data) + " " + fnW(hours) + ":" + fnW(minute) + ":" + fnW(second);
    return time;
}

//获取滚动条当前的位置
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) { // ie firefox
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) { // chrome
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
    var clientHeight = 0;
    if (clientHeight <= 0) {
        // body不为0返回body的高度，body为0则返回窗口高度
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
    }
    return clientHeight;
}

function setClientHeight(height) {
    $('#cmx-edit').css('height', height - 230);
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
//获取文档完整的宽度
function getScrollWidth() {
    return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
}

// 删除数组的某一项
function removeByValue(arr, val) { // 数组   删除项
    if (arr instanceof Array && arr.constructor == Array) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) { // 遍历数组，和val相等项删除，并返回数组
                arr.splice(i, 1);
                break;
            }
        }
    }
}
// 添加cookie
function setCookie(c_name, value, expiredays) { //name  缓存内容 过期时间
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
// 获取cookie
function getCookie(c_name) { // name
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) { //判断 cookie 键是否存在
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
// 清除所有cookie
function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
}
// 删除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 本地缓存
function putData(key, value) { // 键  值
    try {
        if (typeof (Storage) == "undefined") { // 判断浏览器是否支持 localStorage ,不支持用cookie
            setCookie(key, value, 365);
        } else {
            localStorage.setItem(key, value);
        }
        if (key.indexOf('tempcart') >= 0)
            console.log("离线数据存储成功"); // TODO 完成
    } catch (oException) {
        if (oException.name == 'QuotaExceededError') {
            console.log('超出本地存储限额！');
            localStorage.clear();
            localStorage.setItem(key, value);
        }
    }
}
// 获取缓存内容
function getData(key, defaultvalue) { // defaultvalue 为数据获取不到或为空时默认的数据
    var temp = null;
    if (typeof (Storage) == "undefined") {
        temp = getCookie(key);
    } else {
        temp = localStorage.getItem(key);
    }

    return temp !== '' ? temp : defaultvalue;
}
// 清除缓存
function clearData(key) {
    if (typeof (Storage) == "undefined") {
        delCookie(key);
    } else {
        localStorage.removeItem(key);
    }
}

function openUrl(tabtitle, url) {
    if (!IsEmpty(url)) {
        $("#openUrl_a").html(tabtitle);
        $("#openUrl_a").attr("href", url);
        $("#openUrl_a").trigger("click");
    }
}

//显示交互消息

// showAlert({
//     type: 'input', //success info warning error confirm input
//     content: '输出的内容',
//     delay: 2, //可选参数，单位秒，confirm和input下无效
//     btn_1: '确定', //可选参数，type为confirm时默认为确定，type为input时默认为提交
//     btn_2: '取消', //可选参数，默认为取消
//     callback: function (_state) { //仅type为confirm下有效
//         console.log(_state); //_state可能是yes no cancel
//     },
//     input: { //仅type为input下有效
//         input_type: 'text',
//         placeholder: '请填写内容',
//         value: '值内容',
//         //auto_close: true, //已取消
//         callback: function (_state, _result) {
//             console.log('返回状态是：' + _state + '；输入的是：' + _result); //_state可能是yes no cancel
//         }
//     }
// })


// showAlert({
//     type: 'confirm', //success info warning error confirm input
//     content: '您上传的文件类型与当前版本不一致，确定要继续上传？',
//     delay: 2, //可选参数，单位秒，confirm和input下无效
//     btn_1: '上传文件为准', //可选参数，type为confirm时默认为确定，type为input时默认为提交
//     btn_2: '取消', //可选参数，默认为取消
//     callback: function (_state) { //仅type为confirm下有效
//         if (_state == 'yes') {

//         }
//     }
// })

function showAlert(_option) {
    if (_option.content.indexOf('暂无报文数据') >= 0)
        return;

    if (typeof alertify === 'undefined') { // 动态加载依赖的js插件
        $("<link>")
            .attr({
                rel: "stylesheet",
                type: "text/css",
                href: vendor_alertify_css_url //css路径，暂时为固定的
            })
            .appendTo("head");
        $.getScript(vendor_alertify_js_url, function () {
            alertify.theme('bootstrap');
            showAlert(_option);
        });
    } else {
        if (IsEmpty(_option.content)) {
            return;
        }
        var content = _option.content;
        var delay = _option.delay;
        if (!IsNum(delay) || parseInt(delay) <= 1000) { //delay 最小为2，默认为2
            delay = 2000;
        }
        var alert = function (_content, _delay, autoClose) { // 成功，然后有一系列样式
            if ($('.msg').html() == _content) {
                return;
            }
            alertify.delay(_delay);
            alertify.alert(_content);

            if (autoClose) {
                $('div.alertify nav').remove();
                $('div.alertify .msg').css('margin-bottom', '0');
                setTimeout(function () {
                    $('div.alertify').remove();
                }, 1000);
            }
        };
        var success = function (_content, _delay) { // 成功，然后有一系列样式
            alertify.delay(_delay);
            alertify.success(_content);
        };

        var warning = function (_content, _delay) { // 警告，
            alertify.delay(_delay);
            alertify.warning(_content);
        };

        var error = function error(_content, _delay) { // 错误
            if ($('.msg').html() == _content) {
                return;
            }
            alertify.delay(_delay);
            alertify.error(_content);
        };

        var info = function (_content, _delay) { // 信息
            alertify.delay(_delay);
            alertify.info(_content);
        };

        var confirm = function (_content, btn_1, btn_2, callback) {
            if (IsEmpty(btn_1))
                btn_1 = '取消';
            if (IsEmpty(btn_2))
                btn_2 = '确定';
            alertify.okBtn(btn_1);
            alertify.cancelBtn(btn_2);
            alertify.confirm(_content + '', function () {
                callback('no');
                // alert(alertify.value);
            }, function () {
                callback('yes');
            });
        };

        var input = function (_content, btn_1, btn_2, input_type, placeholder, the_value, callback) {
            //input_type指input控件的type 可以是text email file 等等

            if (IsEmpty(input_type))
                input_type = 'text';
            if (IsEmpty(placeholder))
                placeholder = '请填写内容';
            if (IsEmpty(the_value))
                the_value = '';
            if (IsEmpty(btn_1))
                btn_1 = '取消';
            if (IsEmpty(btn_2))
                btn_2 = '确定';
            alertify.okBtn(btn_1);
            alertify.cancelBtn(btn_2);
            alertify.placeholder(placeholder);
            alertify.defaultValue(the_value);
            alertify.prompt(_content + '', function (str) {
                callback('yes', str);
            }, function (e, str) {
                callback('no');
            });
        };
        alertify.okBtn('确认');
        switch (_option.type) {
            case 'alert':
                alert(content, delay, false);
                break;
            case 'info':
                alert(content, delay, true);
                break;
            case 'success':
                alert(content, delay, true);
                break;
            case 'error':
                alert(content, delay, false);
                break;
            case 'warning':
                alert(content, delay, true);
                break;
            case 'confirm':
                if (typeof _option.callback === "function")
                    confirm(content, _option.btn_1, _option.btn_2, _option.callback);
                else
                    console.log('调用showAlert中callback回调函数错误');
                break;
            case 'input':
                if (typeof _option.input.callback === "function")
                    input(content, _option.btn_1, _option.btn_2, _option.input.input_type, _option.input.placeholder, _option.input.value, _option.input.callback);
                else
                    console.log('调用showAlert中callback回调函数错误');
                break;
        }
    }
}

// alert对象
function WriteObj(obj) {
    var description = "";
    for (var i in obj) { // 遍历对象
        var property = obj[i];
        description += i + " = " + property + "\n"; // 换行，键值用=连接
    }
    alert(description);
}

//判断是否为数字
function IsNum(s) {
    if (s != null && s != "" && typeof (s) != "undefined") {
        return !isNaN(s);
    }
    return false;

}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
function formatDate(fmt, time) { // fmt传入需要的日期格式   time时间 如果不传，默认为当前
    var date = new Date(time ? time : new Date());
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//是否为NULL
function IsNull(value) { // 需要判断的内容
    if (typeof (value) == 'undefined' || value == null || value === undefined) {
        return true;
    }
    return false;
}
//是否为空(包括空字符串)
function IsEmpty(strings) {
    if (!IsNull(strings)) { // 先判断是否为null，返回true ，判断是否为空字符串，返回true
        if ((strings + '').replace(/(^\s*)|(\s*$)/g, '').length === 0) { //已修正bug，当strings为数字时，会报strings.replace is not a function
            return true;
        }
    } else {
        return true;
    }
    // 不为空返回false
    return false;
}
//获得url参数的值 &
function GetUrlParamString(name) { // 需要参数的key
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var _str = window.location.search.substr(1);
    _str = _str.replace('?', '&');
    var r = _str.match(reg); //判断？后符合正则的部分代码
    if (r != null) {
        var myurl = unescape(r[2]); // 第三个元素是我们需要的值
        if (myurl != null && myurl.toString().length >= 1) // 判断不为空返回该值
            return myurl;
    }
    return '';
}
//获得url#后面的值（hash值）
function GetUrlPoundString() {
    var urlStr = window.location,
        index;
    urlStr = urlStr.toString();
    if ((index = urlStr.indexOf('#')) > 0) { //检索url中是否有“#”
        var urlShouldbe = urlStr.substr(index + 1).toLowerCase(); // 截取#后的字符串，并转换成小写
        if (!IsEmpty(urlShouldbe))
            return urlShouldbe;
    }
    return '';
}
//下载文件 // TODO 完成  这些也写文档
function DownLoadFile(ev, url) { // *旧方法
    //preventEvent(ev);
    window.open(url);
}

function downLoadFile(ev, url) { // *新方法
    DownLoadFile(ev, url);
}
// showAlert下载     *旧方法
function DownLoadFileByConfirm(ev, url) { // TODO 完成  这些也写文档
    preventEvent(ev);
    showAlert({
        type: 'confirm', //success info warning error confirm input
        content: '选择操作类型',
        delay: 2, //可选参数，单位秒，confirm和input下无效
        btn_1: '预览', //可选参数，type为confirm时默认为确定，type为input时默认为提交
        btn_2: '下载', //可选参数，默认为取消
        callback: function (_state) { //仅type为confirm下有效
            if (_state == 'yes') {

            } else {
                window.open(url);
            }
        }
    });
}
// showAlert下载   *新方法
function downLoadFileByConfirm(ev, url) {
    DownLoadFileByConfirm(ev, url);
}

// 取消递归执行（阻止事件冒泡和默认行为）
function preventEvent(ev) {
    var e = (ev) ? ev : window.event;
    if (window.event) { // ie
        e.cancelBubble = true;
        e.returnValue = false;
    } else { // ff,chrome
        e.preventDefault();
        e.stopPropagation();
    }
}

//进入全屏
function requestFullScreen() {

    var de = document.documentElement;
    if (de.requestFullscreen) {
        de.requestFullscreen();
    } else if (de.mozRequestFullScreen) { //对 moz的处理
        de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) { // 对chrome 的处理
        de.webkitRequestFullScreen();
    }
}
//退出全屏
function exitFullscreen() {

    var de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
}

// js hashMap
function HashMap() {
    //定义长度
    var length = 0;
    //创建一个对象
    var obj = {};

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function () {
        return length == 0;
    };

    /**
     * 判断对象中是否包含给定Key
     */
    this.containsKey = function (key) {
        return (key in obj);
    };

    /**
     * 判断对象中是否包含给定的Value
     */
    this.containsValue = function (value) {
        for (var key in obj) {
            if (obj[key] == value) {
                return true;
            }
        }
        return false;
    };

    /**
     *向map中添加数据
     */
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            length++;
        }
        obj[key] = value;
    };

    /**
     * 根据给定的Key获得Value
     */
    this.get = function (key) {
        return this.containsKey(key) ? obj[key] : null;
    };

    /**
     * 根据给定的Key删除一个值
     */
    this.remove = function (key) {
        if (this.containsKey(key) && (delete obj[key])) {
            length--;
        }
    };

    /**
     * 获得Map中的所有Value
     */
    this.values = function () {
        var _values = [];
        for (var key in obj) {
            _values.push(obj[key]);
        }
        return _values;
    };

    /**
     * 获得Map中的所有Key
     */
    this.keySet = function () {
        var _keys = [];
        for (var key in obj) {
            _keys.push(key);
        }
        return _keys;
    };

    /**
     * 获得Map的长度
     */
    this.size = function () {
        return length;
    };

    /**
     * 清空Map
     */
    this.clear = function () {
        length = 0;
        obj = {};
    };
}

//字符串编码（加密）
function safeEncodeBase64(str) {
    str = Base64.encode(str);
    var string = str.replace(/\+/g, "^").replace(/\//g, "$").replace(/=/g, "*");
    return string;
}
//字符串解码（解密）
function safeDecodeBase64(str) {
    var string = str.replace(/\^/g, "+").replace(/\$/g, "/").replace(/\*/g, "=");
    return Base64.decode(string);
}
//iframe自适应
function iFrameHeight(iframe) {
    try {
        var bHeight = iframe.contentWindow.document.body.scrollHeight;
        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
        var height = 0;
        if (bHeight && dHeight) {
            height = Math.min(bHeight, dHeight);
        } else {
            height = Math.max(bHeight, dHeight);
        }
        iframe.height = height;
    } catch (ex) {}
}
//关闭页面
function closeWebPage() {
    if (navigator.userAgent.indexOf("MSIE") > 0) { //close IE
        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    } else if (navigator.userAgent.indexOf("Firefox") > 0) { //close firefox
        window.location.href = 'about:blank ';
    } else { //close chrome;It is effective when it is only one.
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}
var Base64 = {
    // 转码表
    table: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'
    ],
    UTF16ToUTF8: function (str) {
        var res = [],
            len = str.length;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            var byte1, byte2;
            if (code > 0x0000 && code <= 0x007F) {
                // 单字节，这里并不考虑0x0000，因为它是空字节
                // U+00000000 – U+0000007F  0xxxxxxx
                res.push(str.charAt(i));
            } else if (code >= 0x0080 && code <= 0x07FF) {
                // 双字节
                // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
                // 110xxxxx
                byte1 = 0xC0 | ((code >> 6) & 0x1F);
                // 10xxxxxx
                byte2 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2)
                );
            } else if (code >= 0x0800 && code <= 0xFFFF) {
                // 三字节
                // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
                // 1110xxxx
                byte1 = 0xE0 | ((code >> 12) & 0x0F);
                // 10xxxxxx
                byte2 = 0x80 | ((code >> 6) & 0x3F);
                // 10xxxxxx
                var byte3 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1),
                    String.fromCharCode(byte2),
                    String.fromCharCode(byte3)
                );
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                // 四字节
                // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                // 五字节
                // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                // 六字节
                // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return res.join('');
    },
    UTF8ToUTF16: function (str) {
        var res = [],
            len = str.length;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            // 对第一个字节进行判断
            var code2, byte1, byte2, utf16;
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                code2 = str.charCodeAt(++i);
                byte1 = (code & 0x1F) << 6;
                byte2 = code2 & 0x3F;
                utf16 = byte1 | byte2;
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                code2 = str.charCodeAt(++i);
                code3 = str.charCodeAt(++i);
                byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                utf16 = ((byte1 & 0x00FF) << 8) | byte2;
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }

        return res.join('');
    },
    encode: function (str) {
        if (!str) {
            return '';
        }
        var utf8 = this.UTF16ToUTF8(str); // 转成UTF8
        var i = 0; // 遍历索引
        var len = utf8.length;
        var res = [];
        while (i < len) {
            var c1 = utf8.charCodeAt(i++) & 0xFF;
            res.push(this.table[c1 >> 2]);
            // 需要补2个=
            if (i == len) {
                res.push(this.table[(c1 & 0x3) << 4]);
                res.push('==');
                break;
            }
            var c2 = utf8.charCodeAt(i++);
            // 需要补1个=
            if (i == len) {
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[(c2 & 0x0F) << 2]);
                res.push('=');
                break;
            }
            var c3 = utf8.charCodeAt(i++);
            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
            res.push(this.table[c3 & 0x3F]);
        }

        return res.join('');
    },
    decode: function (str) {
        if (!str) {
            return '';
        }

        var len = str.length;
        var i = 0;
        var res = [];

        while (i < len) {
            code1 = this.table.indexOf(str.charAt(i++));
            code2 = this.table.indexOf(str.charAt(i++));
            code3 = this.table.indexOf(str.charAt(i++));
            code4 = this.table.indexOf(str.charAt(i++));

            c1 = (code1 << 2) | (code2 >> 4);
            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
            c3 = ((code3 & 0x3) << 6) | code4;

            res.push(String.fromCharCode(c1));

            if (code3 != 64) {
                res.push(String.fromCharCode(c2));
            }
            if (code4 != 64) {
                res.push(String.fromCharCode(c3));
            }

        }

        return this.UTF8ToUTF16(res.join(''));
    }
};


//构造jstree数据结构
function treeMenu(a) {
    this.tree = a || [];
    this.groups = {};
}
treeMenu.prototype = {
    init: function (previd) {
        this.group();
        if (previd == 0) {
            return this.getDom(this.groups[previd]);
        } else {
            return this.getParentDom(previd);
        }
    },
    group: function () {
        for (var i = 0; i < this.tree.length; i++) {
            if (this.groups[this.tree[i].previd]) {
                this.groups[this.tree[i].previd].push(this.tree[i]);
            } else {
                this.groups[this.tree[i].previd] = [];
                this.groups[this.tree[i].previd].push(this.tree[i]);
            }
        }
    },
    getParentDom: function (pid) {
        if (!pid) {
            return '';
        }
        var arr = [];
        var x;
        for (x in this.groups) {
            for (var j = 0; j < this.groups[x].length; j++) {
                if (this.groups[x][j]._id == pid) {
                    var temp = {
                        "id": this.groups[x][j]._id,
                        "text": this.groups[x][j].name,
                        "children": this.getDom(this.groups[this.groups[x][j]._id])
                    };
                    arr.push(temp);
                    break;
                }
            }
        }
        return arr;

    },
    getDom: function (a) {
        if (!a) {
            return '';
        }
        var arr = [];
        for (var i = 0; i < a.length; i++) {
            var temp = {
                "id": a[i]._id,
                "text": a[i].name,
                "children": this.getDom(this.groups[a[i]._id])
            };
            arr.push(temp);
        }
        return arr;
    }
};

// '[0]'转换成数字
function g_str(str) {
    var nStr = parseInt(str.substring(1, str.length - 1));
    return nStr;
}


function g_str1(str) {
    var nStr = str.substring(1, str.length - 1);

    return nStr;
}

// 字符串的字符替换函数
String.prototype.replaceAll = function (FindText, RepText) {
    var regExp = new RegExp(FindText, "g");
    return this.replace(regExp, RepText);
};

// string原型trim方法扩展
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

// 判断手机系统
function AndroidIos() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        //alert(navigator.userAgent);
        alert("ios");
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        //alert(navigator.userAgent);
        alert("anzhuo");
    } else { //pc
        alert("pc");
    }
}

function quicklyLoginFunc(need_reload) {
    location.href = '/login.html?from=' + encodeURIComponent(location.href);
    return;
    if (quicklyLoginIsShow)
        return;
    quicklyLoginIsShow = true;
    $('[tabindex="-1"]').removeAttr('tabindex');
    getChkImage();
    $('#cmx-chk-image').off('click');
    $('#cmx-chk-image').on('click', function () { // 验证码刷新
        getChkImage();
    });

    $('#cmx-loginBtn').off('click');
    $('#cmx-loginBtn').on('click', function () {
        new cmx.process()
            .turn('callajax', {
                url: api_aa + '/login/checkUser',
                data: {
                    encryptcode: $('#cmx-chk-image').attr('cmx-encryptcode'),
                    loginname: $('#cmx-username').val(),
                    loginpass: md5($('#cmx-password').val()),
                    verifycode: $('#cmx-validCode').val(),
                    devicetype: 'pc-web',
                    deviceid: getData('deviceId')
                },
                type: 'GET'
            })
            .turn('continueWork', {
                need_reload: need_reload,
                gotoindex: false,
                from: '',
                password: $('#cmx-password').val()
            })
            .start();


    });
    $('#login-form-body').fadeIn();
}

function getChkImage() {
    putData('deviceId', IsEmpty(getData('deviceId')) ? md5(randomString(8) + fnDate()) : getData('deviceId'));
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/login/getChkNumber',
            data: {
                deviceid: getData('deviceId')
            },
            type: 'GET'
        })
        .turn('getchkimage', {}).start();
}

function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}
try {
    if (cmx) {
        //普通数据字典生成
        cmx.route.model({
            index: 'buildDataDic',
            handle: function (parameter, prevModelData, send, abort) {
                if (!isArray(parameter.element)) {
                    parameter.element = [parameter.element];
                }
                for (var p = 0; p < parameter.element.length; p++) {
                    new cmx.process()
                        .turn('callajax', {
                            url: getDataDicFromRedis,
                            data: {
                                token: getData('token'),
                                dataType: parameter.element[p].attr('data-dic')
                            },
                            type: 'GET',
                            async: false
                        })
                        .turn('buildDataDicInit', {
                            element: parameter.element[p],
                            defaultValue: parameter.defaultValue,
                            hasAll: parameter.hasAll,
                            hasNull:parameter.hasNull,
                            type: parameter.type,
                            hasEmpty: parameter.hasEmpty
                        })
                        .start();
                }
                send.go();
            }
        });
        cmx.route.model({
            index: 'buildDataDicInit',
            handle: function (parameter, prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200')
                    send.toviewresolve({
                        element: parameter.element,
                        data: prevModelData,
                        defaultValue: parameter.defaultValue,
                        hasAll: parameter.hasAll,
                        hasNull:parameter.hasNull,
                        hasEmpty: parameter.hasEmpty,
                        type: IsEmpty(parameter.type) ? 'select' : parameter.type
                    }).go();
                else {
                    send.go({
                        element: parameter.element,
                        data: prevModelData
                    });
                }
            }
        });
        cmx.route.view({
            index: 'buildDataDicInit',
            resolve: function (result) {
                console.log(result);
                var defaultValue = result.defaultValue;
                var hasAll = result.hasAll;
                var hasEmpty = result.hasEmpty;
                var hasNull = result.hasNull;
                var element = result.element;
                var type = result.type;
                var param = JSON.parse(result.data.data);
                var dicData = param[element.attr('data-dic')];

                if (IsNull(dicData)) {
                    showAlert({
                        type: 'error',
                        content: element.attr('data-dic') + '解析失败'
                    });
                    return;
                }
                var html = '';
                var randid = randomString(8);
                switch (type) {
                    case 'select':
                        html = hasEmpty ? '<option value="">无</option>' : '';
                        html += hasAll ? '<option value="-1" selected>全部</option>' : '';
                        html += hasNull ? '<option value="" selected>请选择级别</option>' : '';
                        $.each(dicData, function (i, val) {
                            html += '<option value="' + i + '" ' + (i == defaultValue ? 'selected' : '') + '>' + val + '</option>';
                        });
                        element.html(html);
                        break;
                    case 'single':
                        //element.addClass('padding-left-10');
                        //element.attr('style', 'border: 1px solid #eee;height:auto;');
                        $.each(dicData, function (i, val) {

                            html += '<div class="pull-left"><input value="' + i + '" type="radio" name="' + randid + '" id="' + (randid + i) + '" ' + (i == defaultValue ? 'checked' : '') + '><label for="' + (randid + i) + '">' + val + '</label></div>';
                        });
                        element.html(html + '<div class="clearfix"></div>');
                        $('input[name="' + randid + '"]').iCheck({
                            labelHover: false,
                            cursor: true,
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                        break;
                    case 'mutil':
                        //element.addClass('padding-left-10');
                        //element.attr('style', 'border: 1px solid #eee;height:auto;');
                        $.each(dicData, function (i, val) {
                            html += '<div class="pull-left"><input class="icheckbox-primary" value="' + i + '" type="checkbox" name="' + randid + '" id="' + (randid + i) + '" ' + (i == defaultValue ? 'checked' : '') + '><label for="' + (randid + i) + '">' + val + '</label></div>';
                        });
                        element.html(html + '<div class="clearfix"></div>');
                        $('input[name="' + randid + '"]').iCheck({
                            labelHover: false,
                            cursor: true,
                            checkboxClass: 'icheckbox_flat-blue',
                            radioClass: 'iradio_flat-blue'
                        });
                        break;
                }

            },
            reject: function (data) {
                var element = data.element;
                showAlert({
                    type: 'error',
                    content: element.attr('data-dic') + '获取失败'
                });
                return;
            }
        });
        cmx.route.view({
            index: 'continueWork',
            resolve: function (param) {
                console.log(param);
                if (param.gotoindex) {
                    showAlert({
                        type: 'success',
                        content: '登录成功，即将进入系统'
                    });
                    setTimeout(function () {
                        if (IsEmpty(param.from))
                            location.href = "/index.html";
                        else {
                            location.href = decodeURIComponent(param.from);
                        }
                    }, 1000);
                } else {
                    showAlert({
                        type: 'success',
                        content: '登录成功，请继续使用！'
                    });
                    $('#login-form-body').fadeOut();
                    quicklyLoginIsShow = false;
                    if (param.need_reload) {
                        location.href = "/index.html?from=" + encodeURIComponent(location.href);
                    }
                }
            },
            reject: function (data) {
                getChkImage();
            }
        });
        cmx.route.model({
            index: 'getchkimage',
            handle: function (parameter, prevModelData, send, abort) {
                $('#cmx-chk-image').attr('cmx-encryptcode', prevModelData.data.encryptcode);
                $('#cmx-chk-image').attr('src', "data:image/png;base64," + prevModelData.data.verifyimage);
            }
        });
        cmx.route.view({
            index: 'continueWork2',
            resolve: function (param) {
                setTimeout(function () {
                    location.href = "http://gl.sach.gov.cn/ca.html?token=" + param.token + '&lastlogintime=' + param.lastlogintime;
                }, 1000);
                showAlert({
                    type: 'success',
                    content: '登录成功，即将进入系统'
                });
            },
            reject: function (data) {
                getChkImage();
            }
        });
        cmx.route.view({
            index: 'continueWork3',
            resolve: function (param) {
                setTimeout(function () {
                    location.href = "/ca.html?token=" + param.token + '&lastlogintime=' + param.lastlogintime;
                }, 1000);
                showAlert({
                    type: 'success',
                    content: '登录成功，即将进入系统'
                });
            },
            reject: function (data) {
                getChkImage();
            }
        });
        cmx.route.model({
            index: 'continueWork2',
            handle: function (parameter, prevModelData, send, abort) {
                var result = prevModelData;
                if (result.state == "200" && !IsEmpty(result.data)) {
                    //alert(result.data.token);
                    clearData('roleId');
                    send.toviewresolve({
                        need_reload: parameter.need_reload,
                        gotoindex: parameter.gotoindex,
                        from: parameter.from,
                        token: result.data.token,
                        lastlogintime: result.data.lastlogintime
                    }).go();
                } else {
                    send.toviewreject(result.msg).go();
                }
            }
        });
        cmx.route.model({
            index: 'continueWork3',
            handle: function (parameter, prevModelData, send, abort) {
                var result = prevModelData;
                if (result.state == "200" && !IsEmpty(result.data)) {
                    //alert(result.data.token);
                    clearData('roleId');
                    send.toviewresolve({
                        need_reload: parameter.need_reload,
                        gotoindex: parameter.gotoindex,
                        from: parameter.from,
                        token: result.data.token,
                        lastlogintime: result.data.lastlogintime
                    }).go();
                } else {
                    send.toviewreject(result.msg).go();
                }
            }
        });
        cmx.route.model({
            index: 'continueWork',
            handle: function (parameter, prevModelData, send, abort) {
                var result = prevModelData;
                if (result.state == "200" && !IsEmpty(result.data)) {
                    if (false && (parameter.password == '123456' || parameter.password == '24680-')) {
                        //TODO更改密码
                        showAlert({
                            type: 'input',
                            content: '您使用的是初始密码，请设置新密码！',
                            btn_1: '取消',
                            btn_2: '保存',
                            input: { //仅type为input下有效
                                input_type: 'text',
                                placeholder: '请填写密码',
                                value: '',
                                callback: function (_state, _result) {
                                    if (_state == 'no' && IsEmpty(_result)) {
                                        //alert(result.data.token);
                                        putData('token', result.data.token);
                                        putData('lastlogintime', result.data.lastlogintime);
                                        clearData('roleId');
                                        send.toviewresolve({
                                            need_reload: parameter.need_reload,
                                            gotoindex: parameter.gotoindex,
                                            from: parameter.from
                                        }).go();
                                    }
                                }
                            }
                        });
                    } else {
                        //alert(result.data.token);
                        putData('token', result.data.token);
                        putData('lastlogintime', result.data.lastlogintime);
                        clearData('roleId');
                        send.toviewresolve({
                            need_reload: parameter.need_reload,
                            gotoindex: parameter.gotoindex,
                            from: parameter.from
                        }).go();
                    }
                } else {
                    send.toviewreject(result.msg).go();
                }
            }
        });
    }


} catch (e) {

}

function closeFileUploadBody() {
    $('.g-file-upload').hide();
}
var showOrhide = 'show';
var width = '';

function displayFileUploadBody() {
    if (showOrhide == 'show') {
        $('.g-file-upload').animate({
            height: "30px"
        });
        $('#showOrhidetext').html('<a href="javascript:displayFileUploadBody();" style="font-size: 12px;padding-right:15px;">展开</a><a href="javascript:closeFileUploadBody();" style="font-size: 12px;">关闭</a>');
    } else {
        $('.g-file-upload').animate({
            height: "150px"
        });
        $('#showOrhidetext').html('<a href="javascript:displayFileUploadBody();" style="font-size: 12px;padding-right:15px;">收起</a><a href="javascript:closeFileUploadBody();" style="font-size: 12px;">关闭</a>');
    }
    showOrhide = showOrhide == 'show' ? 'hide' : 'show';
}

function showFileUploadBody() {
    $('.g-file-upload').show();
}
//按钮失效后两秒恢复
function btn_recovery(id) {
    $(id).attr('disabled', true);
    setTimeout(function () {
        $(id).attr('disabled', false);
    }, 2000)
}

//时间戳转换成日期格式--年月日时分秒
function add0(m) {
    return m < 10 ? '0' + m : m
}

function format(shijianchuo) { //shijianchuo是整数，否则要parseInt转换
    var time = new Date(Date.parse(shijianchuo.replace(/-/g, "/")));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
//时间戳转换成日期格式--年月日
function format2(shijianchuo) {
    var time = new Date(Date.parse(shijianchuo.replace(/-/g, "/")));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d);
}

// detectZoom()
//检测浏览器窗口缩放
//TODO  待优化
function detectZoom() {
    var ratio = 0;
    screen = window.screen;
    ua = navigator.userAgent.toLowerCase(); //判断设备 判断浏览器的东东
    alert(ua)
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
    }
    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio;
}

//查询单个或多个key是否存在于obj中，如果都不存在则为false，只要有一个存在则为true
function hasKeys(obj, keys) {
    var result = false;
    var keyArray = [];
    if (keys != undefined) keyArray = keys.split(',');
    $.each(keyArray, function () {
        if (this in obj) {
            result = true;
            return result;
        }
    })

    return result;
}
//权限功能控制
function control() {
    $('[func-id]').each(function () {
        var funcId = $(this).attr('func-id');
        if (!hasKeys(cmx.g.btnPmsn, funcId)) {
            $('[func-id=' + funcId + ']').remove();
        } else {
            $('[func-id=' + funcId + ']').css('display', '');
        }
    })
}

//常用语增删改查--单个
function refreshCommonWords() {
    new cmx.process()
        .turn('callajax', {
            url: api_cm + '/CmPhraseinfoController/getDataByToken',
            data: JSON.stringify({
                token: getData('token')
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var commonwords = '<option value=""></option>';
                var commonwords = '';
                var data1 = prevModelData.data;
                $('#commonwords-update').attr('disabled', false);
                $('#commonwords-remove').attr('disabled', false);
                for (var i = 0; i < data1.length; i++) {
                    commonwords += '<option value="' + data1[i].phraseId + '">' + data1[i].phraseContent + '</option>';
                }
                $('#commonwords').html(commonwords);
            } else {
                $('#commonwords').empty();
                $('#commonwords-update').attr('disabled', true);
                $('#commonwords-remove').attr('disabled', true);
            }
            $('#commonwords-use').off('click');
            $('#commonwords-use').on('click', function () {
                $('#opinions').val($('#commonwords').find("option:selected").text());
            });
            $('#commonwords-add').off('click');
            $('#commonwords-add').on('click', function () {
                if ($('#opinions').val().trim() == '') {
                    showAlert({
                        type: 'error',
                        content: '请填写办理意见，将会加入常用语！'
                    });
                } else {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_cm + '/CmPhraseinfoController/saveCmPhraseinfo',
                            data: JSON.stringify({
                                token: getData('token'),
                                param: {
                                    phraseContent: $('#opinions').val()
                                }
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                                showAlert({
                                    type: 'success',
                                    content: '新增成功'
                                });
                                refreshCommonWords();
                            }
                        })
                        .start();
                }
            });
            $('#commonwords-update').off('click');
            $('#commonwords-update').on('click', function () {
                if ($('#opinions').val().trim() == '') {
                    showAlert({
                        type: 'error',
                        content: '请填写办理意见，将会加入常用语！'
                    });
                } else {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_cm + '/CmPhraseinfoController/updateCmPhraseinfo',
                            data: JSON.stringify({
                                token: getData('token'),
                                param: {
                                    phraseId: $('#commonwords').val(),
                                    phraseContent: $('#opinions').val()
                                }
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                                showAlert({
                                    type: 'success',
                                    content: '修改成功'
                                });
                                refreshCommonWords();
                            }
                        })
                        .start();
                }
            });
            $('#commonwords-remove').off('click');
            $('#commonwords-remove').on('click', function () {
                new cmx.process()
                    .turn('callajax', {
                        url: api_cm + '/CmPhraseinfoController/deleteCmPhraseinfoByPK',
                        data: JSON.stringify({
                            token: getData('token'),
                            phraseId: $('#commonwords').val()
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '删除成功'
                            });
                            refreshCommonWords();
                        }
                    })
                    .start();
            });
        })
        .start();
}

//常用语增删改查--多个
function getCommonWordsMulti() {
    $('.commonwords').css('min-width', '200px').css('max-width', '400px');
    //查
    new cmx.process()
        .turn('callajax', {
            url: api_cm + '/CmPhraseinfoController/getDataByToken',
            data: JSON.stringify({
                token: getData('token')
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var commonwords = '';
                var data1 = prevModelData.data;
                $('.commonwords-update').attr('disabled', false);
                $('.commonwords-remove').attr('disabled', false);
                for (var i = 0; i < data1.length; i++) {
                    commonwords += '<option value="' + data1[i].phraseId + '">' + data1[i].phraseContent + '</option>';
                }
                $('.commonwords').html(commonwords);

            } else {
                $('.commonwords').empty();
                $('.commonwords-update').attr('disabled', true);
                $('.commonwords-remove').attr('disabled', true);
            }
        })
        .start();
}

function refreshCommonWordsMulti() {
    var btn_commonwords = [];
    var btn_commonwords_use = [];
    var btn_opinions = [];
    var btn_commonwords_add = [];
    var btn_commonwords_update = [];
    var btn_commonwords_remove = [];
    $('button').each(function (key, value) {
        if ($(this).hasClass('commonwords-use')) {
            btn_commonwords_use.push($(this));
            btn_commonwords.push($(this).parent().parent().find('div').eq(0).find('select'));
        }
    })
    $('label').each(function () {
        if ($(this).hasClass('commonwords-manage')) {
            btn_opinions.push($(this).parent().parent().find('div').eq(0).find('textarea'));
            btn_commonwords_add.push($(this).siblings('button').eq(0));
            btn_commonwords_update.push($(this).siblings('button').eq(1));
            btn_commonwords_remove.push($(this).siblings('button').eq(2));
        }
    })
    //切换下拉框加载数据
    $.each(btn_commonwords, function (index) {
        $(this).on('blur', function () {
            btn_opinions[index].val(btn_commonwords[index].find('option:selected').text());
        })
    })
    //赋值
    $.each(btn_commonwords_use, function (index) {
        $(this).click(function () {
            btn_opinions[index].val(btn_commonwords[index].find('option:selected').text());
        })
    })
    //增
    $.each(btn_commonwords_add, function (index) {
        $(this).click(function () {
            if (btn_opinions[index].val().trim() == '') {
                showAlert({
                    type: 'error',
                    content: '请填写办理意见，将会加入常用语！'
                });
            } else {
                new cmx.process()
                    .turn('callajax', {
                        url: api_cm + '/CmPhraseinfoController/saveCmPhraseinfo',
                        data: JSON.stringify({
                            token: getData('token'),
                            param: {
                                phraseContent: btn_opinions[index].val()
                            }
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '新增成功'
                            });
                            btn_opinions[index].val('');
                            getCommonWordsMulti();
                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData.msg
                            });
                        }
                    })
                    .start();

            }
        })
    })
    //改
    $.each(btn_commonwords_update, function (index) {
        $(this).click(function () {
            if (btn_opinions[index].val().trim() == '') {
                showAlert({
                    type: 'error',
                    content: '请填写办理意见，将会加入常用语！'
                });
            } else {
                new cmx.process()
                    .turn('callajax', {
                        url: api_cm + '/CmPhraseinfoController/updateCmPhraseinfo',
                        data: JSON.stringify({
                            token: getData('token'),
                            param: {
                                phraseContent: btn_opinions[index].val(),
                                phraseId: btn_commonwords[index].val()
                            }
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '修改成功'
                            });
                            getCommonWordsMulti();
                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData.msg
                            });
                        }
                    })
                    .start();
            }
        })
    })
    //删
    $.each(btn_commonwords_remove, function (index) {
        $(this).click(function () {
            if (btn_opinions[index].val().trim() == '') {
                showAlert({
                    type: 'error',
                    content: '请填写办理意见，将会加入常用语！'
                });
            } else {
                new cmx.process()
                    .turn('callajax', {
                        url: api_cm + '/CmPhraseinfoController/deleteCmPhraseinfoByPK',
                        data: JSON.stringify({
                            token: getData('token'),
                            phraseId: btn_commonwords[index].val()
                        }),
                        type: 'POST'
                    })
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200') {
                            showAlert({
                                type: 'success',
                                content: '删除成功'
                            });
                            getCommonWordsMulti();
                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData.msg
                            });
                        }
                    })
                    .start();
            }
        })
    })
}