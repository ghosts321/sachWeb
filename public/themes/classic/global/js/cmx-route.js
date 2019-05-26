/*
 * @Author: liuxiangnan 
 * @Date: 2017-09-19 21:45:46 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-06-26 15:42:10
 */
var console = console || {
    log: function () {
        return;
    }
};
var cmx = cmx || {};
cmx.lib = {
    //是否为NULL
    IsNull: function (value) {
        if (value == undefined || typeof (value) == 'undefined' || value === undefined) {
            return true;
        }
        return false;
    },
    //是否为空(包括空字符串)
    IsEmptyString: function (strings) {
        if (!cmx.lib.IsNull(strings)) {
            if ((strings + '').replace(/(^\s*)|(\s*$)/g, '').length === 0) {
                return true;
            }
        } else {
            return true;
        }

        return false;
    }
};
cmx.g = {
    parameters: {},
    parameterCount: 0,
    /**
     * 判断对象中是否包含给定Key
     */
    containsKey: function (key) {
        return (key in this.parameters);
    },
    /**
     *向map中添加数据
     */
    put: function (key, value) {
        if (!this.containsKey(key)) {
            this.parameterCount++;
        }
        this.parameters[key] = value;
    },
    /**
     * 根据给定的Key获得Value
     */
    get: function (key) {
        return this.containsKey(key) ? (cmx.lib.IsEmptyString(this.parameters[key]) ? 'this parameter hasn`t description' : this.parameters[key]) : 'this parameter is not exist';
    },
    regist: function (key, defaultValue, description) {
        if (this.containsKey(key)) {
            alert('parameter`s name is already exist');
        } else {
            this.put(key, description);
            cmx.g[key] = defaultValue;
        }
    },
    showDescription: function (key) {
        alert(this.get(key));
    }
};
// cmx.g.regist('a',1,'asdasd'); //cmx.g.regist('a',1); --- (key,defaultValue)
// cmx.g.regist('a'); //会报parameter`s name is already exist
// cmx.g.a = 1;
// cmx.g.showDescription('a');
cmx.route = {
    elementCount: 0,
    //model:function
    //view:function
    //start:function
    allViewVersion: [
        'CMXDEFAULT'
    ],
    nowViewVersion: 'CMXDEFAULT',
    autoRun: function (views) {
        if (views) {
            if (views[this.nowViewVersion] && typeof views[this.nowViewVersion] == 'function')
                views[this.nowViewVersion]();
            else if (views.DEFAULT && typeof views.DEFAULT == 'function') {
                views.DEFAULT();
            } else {
                for (var f in views) {
                    views[f]();
                    break;
                }
            }
        }
    },
    init: function (options) {
        if (options && options.allViewVersion)
            this.allViewVersion = options.allViewVersion;
        if (options && typeof options.nowViewVersion == 'function')
            this.nowViewVersion = options.nowViewVersion();
    },
    debug: false,
    log: function (msg) {
        if (this.debug)
            console.log(msg);
    },
    //创建一个对象
    element: {},
    /**
     * 判断Map是否为空
     */
    isEmpty: function () {
        return this.elementCount == 0;
    },

    /**
     * 判断对象中是否包含给定Key
     */
    containsKey: function (key) {
        return (key in this.element);
    },

    /**
     * 判断对象中是否包含给定的Value
     */
    containsValue: function (value) {
        for (var key in this.element) {
            if (this.element[key] == value) {
                return true;
            }
        }
        return false;
    },

    /**
     *向map中添加数据
     */
    put: function (key, value) {
        if (!this.containsKey(key)) {
            this.elementCount++;
        }
        this.element[key] = value;
    },

    /**
     * 根据给定的Key获得Value
     */
    get: function (key) {
        return this.containsKey(key) ? this.element[key] : undefined;
    },

    /**
     * 根据给定的Key删除一个值
     */
    remove: function (key) {
        if (this.containsKey(key) && (delete this.element[key])) {
            this.elementCount--;
        }
    },

    /**
     * 获得Map的长度
     */
    size: function () {
        return this.elementCount;
    },

    /**
     * 清空Map
     */
    clear: function () {
        this.elementCount = 0;
        obj = {};
    },
    model: function (modelStructure) {
        var sign = modelStructure.index;
        var modelHandle = modelStructure.handle;
        this.log('model regist:' + sign);
        if (cmx.lib.IsEmptyString(sign)) {
            this.log('this function`s first parameter should be a string');
            return false;
        }
        if (typeof modelHandle == 'function') {
            if (this.containsKey(sign + 'm')) {
                this.log('model ' + sign + ' already exist');
                if (this.debug)
                    alert('model ' + sign + ' already exist');
                return false;
            }
            this.put(sign + 'm', modelHandle);
            this.log('model ' + sign + ' regist success');
            return true;
        } else {
            this.log('this function`s second parameter should be a function');
            return false;
        }
    },
    view: function (viewStructure) {
        var sign = viewStructure.index;
        var successHandle = viewStructure.resolve;
        var failHandle = viewStructure.reject;
        this.log('view regist:' + sign);
        if (cmx.lib.IsEmptyString(sign)) {
            this.log('this function`s first parameter should be a string');
            return false;
        }
        if (typeof successHandle == 'function') {
            if (this.containsKey(sign + 'vres')) {
                this.log('view success ' + sign + ' already exist');
                if (this.debug)
                    alert('view success ' + sign + ' already exist');
                return false;
            }
            this.put(sign + 'vres', successHandle);
            this.log('view success ' + sign + ' regist success');
        } else {
            this.log('this function`s second parameter should be a function');
            return false;
        }
        if (typeof failHandle == 'function') {
            if (this.containsKey(sign + 'vrej')) {
                this.log('view fail ' + sign + ' already exist');
                if (this.debug)
                    alert('view fail ' + sign + ' already exist');
            }
            this.put(sign + 'vrej', failHandle);
            this.log('view fail ' + sign + ' regist success');

        } else {
            this.log('this function`s third parameter should be a function');
        }
        return true;
    },
    start: function (process, sign, parameter, prevdata) {
        this.log('route start:' + sign);
        var callbacksHandle = process.callbacks;
        var catchcallbackHandle = process.catchcallback;
        var finallyCallbackHandle = process.finallycallback;
        var that = this;
        if (sign == '//cmx-show-log') {
            if (cmx.lib.IsEmptyString(parameter)) {
                parameter = '(╯°Д°)╯︵ ┻━┻ (*ˉ﹃ˉ)';
            }
            console.log('%c' + parameter, 'color:red;font-size:20px;');
            console.log(prevdata);
            console.log('%c' + parameter, 'color:red;font-size:20px;');
            var _callback = process.callbacks.shift();
            var s = _callback.sign;
            var p = _callback.parameter;
            cmx.route.start(process, s, p, prevdata);
        } else if (sign == '//cmx-function') {
            if (typeof parameter == 'function') {
                parameter(prevdata, new cmx.send(process), function (msg) { //出现abort，停止链式调用
                    that.log('model ' + sign + ' abort:' + msg);
                    process.isabort = true;
                    if (typeof catchcallbackHandle == 'function')
                        catchcallbackHandle(msg);
                    if (!process.isfinally) {
                        process.isfinally = true;
                        if (typeof finallyCallbackHandle == 'function')
                            finallyCallbackHandle();
                    }
                });
            }
        } else if (!this.containsKey(sign + 'm')) {
            this.log('model ' + sign + ' don`t exist');

        } else {
            var funcm = this.get(sign + 'm');
            if (typeof funcm == 'function') {
                var funcvsHandle;
                var funcvfHandle;
                if (that.containsKey(sign + 'vres')) {
                    funcvsHandle = this.get(sign + 'vres');
                    if (typeof funcvsHandle == 'function') {

                    } else {
                        funcvsHandle = undefined;
                    }
                }
                if (that.containsKey(sign + 'vrej')) {
                    funcvfHandle = that.get(sign + 'vrej');
                    if (typeof funcvfHandle == 'function') {

                    } else {
                        funcvfHandle = undefined;
                    }
                }

                funcm(parameter, prevdata, new cmx.send(process, funcvsHandle, funcvfHandle), function (msg) { //出现abort，停止链式调用
                    that.log('model ' + sign + ' abort:' + msg);
                    process.isabort = true;
                    if (typeof catchcallbackHandle == 'function')
                        catchcallbackHandle(msg);
                    if (!process.isfinally) {
                        process.isfinally = true;
                        if (typeof finallyCallbackHandle == 'function')
                            finallyCallbackHandle();
                    }
                });
            } else {
                this.log('this function`s model element should be a function');
                //return;
            }
        }
    }
};
//constructor
cmx.process = function () {
    this.callbacks = [];
    this.catchcallback = undefined;
    this.finallycallback = undefined;
    this.delayTime = 0;
    this.isabort = false;
    this.isfinally = false;
};
cmx.process.prototype = {
    construct: cmx.process,
    start: function () {
        if (this.delayTime > 0) {
            var that = this;
            setTimeout(function () {
                if (that.callbacks[0]) {
                    var _callback = that.callbacks.shift();
                    var s = _callback.sign;
                    var p = _callback.parameter;
                    cmx.route.start(that, s, p, undefined);
                }
            }, this.delayTime);
        } else {
            if (this.callbacks[0]) {
                var _callback = this.callbacks.shift();
                var s = _callback.sign;
                var p = _callback.parameter;
                cmx.route.start(this, s, p, undefined);
            }
        }
    },
    delay: function (time) {
        if (!isNaN(time) && time > 0)
            this.delayTime = time;
        else
            this.delayTime = 0;
        return this;
    },
    turn: function (sign, parameter, ignore) {
        if (ignore === true) {

        } else {
            if (typeof sign == 'function') {
                this.callbacks.push({
                    sign: '//cmx-function',
                    parameter: sign
                });
            } else {
                this.callbacks.push({
                    sign: sign,
                    parameter: parameter
                });
            }
        }
        return this;
    },
    log: function (cmx_spot) {
        this.callbacks.push({
            sign: '//cmx-show-log',
            parameter: cmx_spot
        });
        return this;
    },
    ccatch: function (catchHandle) {
        this.catchcallback = catchHandle;
        return this;
    },
    cfinally: function (completeHandle) {
        this.finallycallback = completeHandle;
        return this;
    }
};
cmx.send = function (_process, _funcvsHandle, _funcvfHandle) {
    this.prevData = [];
    this.funcvsHandle = _funcvsHandle;
    this.funcvfHandle = _funcvfHandle;
    this.process = _process;
    this.modelData = undefined;
};
cmx.send.prototype = {
    log: function (cmx_spot) {
        if (cmx.lib.IsNull(cmx_spot)) {
            cmx_spot = '(╯°Д°)╯︵ ┻━┻ (*ˉ﹃ˉ)';
        }
        console.log('%c' + cmx_spot, 'color:red;font-size:20px;');
        console.log(this.prevData);
        console.log('%c' + cmx_spot, 'color:red;font-size:20px;');
        return this;
    },
    tomodel: function (data) {
        this.modelData = data;
        this.prevData.tomodel = data;
        return this;
    },
    tootherviewresolve: function (index, data) {
        this.prevData.tootherviewresolve = data;
        var otherFuncvsHandle;
        if (cmx.route.containsKey(index + 'vres')) {
            otherFuncvsHandle = cmx.route.get(index + 'vres');
            if (typeof otherFuncvsHandle == 'function') {

            } else {
                otherFuncvsHandle = undefined;
            }
        }
        if (!this.process.isabort)
            otherFuncvsHandle(data);
        return this;
    },
    tootherviewreject: function (index, data) {
        this.prevData.tootherviewreject = data;
        var otherFuncvfHandle;
        if (cmx.route.containsKey(index + 'vrej')) {
            otherFuncvfHandle = cmx.route.get(index + 'vrej');
            if (typeof otherFuncvfHandle == 'function') {

            } else {
                otherFuncvfHandle = undefined;
            }
        }
        if (!this.process.isabort)
            otherFuncvfHandle(data);
        return this;
    },
    toviewresolve: function (data) {
        this.prevData.toviewresolve = data;
        if (!this.process.isabort)
            this.funcvsHandle(data);
        return this;
    },
    toviewreject: function (data) {
        this.prevData.toviewreject = data;
        if (!this.process.isabort)
            this.funcvfHandle(data);
        return this;
    },
    go: function () {
        var callbacksHandle = this.process.callbacks;
        if (callbacksHandle[0]) { //继续链式调用
            if (this.process.isabort)
                return;
            var _callback = callbacksHandle.shift();
            var s = _callback.sign;
            var p = _callback.parameter;
            cmx.route.start(this.process, s, p, this.modelData);
        } else { //队列已空，调用finally
            if (!this.process.isfinally) {
                this.process.isfinally = true;
                var finallyCallbackHandle = this.process.finallycallback;
                if (typeof finallyCallbackHandle == 'function')
                    finallyCallbackHandle();
            }
        }
    }
};

/************************ END *************************/