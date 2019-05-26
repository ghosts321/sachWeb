cmx.route.model({
    index: 'buildDepartApplyTable',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        if(!IsNull(param.data)&&param.state=='200'){
            send.toviewresolve(param).go();
        }else {
            send.toviewreject(param.msg).go();
        }
    }
});
cmx.route.model({
    index: 'yuyueReturn',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if(!IsNull(param.data)&&param.state=='200'){
            send.toviewresolve(param.data).go();
        }else {
            send.toviewreject(param.msg).go();
        }
    }
});
cmx.route.model({
    index: 'showYuyueInfo',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param.state);
        if (param.state == "200") {
            $('#cmx-i-2').val(param.data.applyClassName);
            $('#cmx-i-4').val(param.data.customsId);
            $('#cmx-i-5').val(param.data.destination);
            $('#cmx-i-6').val(param.data.carryUser);
            $('#cmx-i-7').val(param.data.telNo);
            $('#cmx-i-8').val(param.data.appUserName);
            $('#cmx-i-9').val(param.data.appTelNo);
            $('#cmx-i-10').val(param.data.address);
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }
    }
});

cmx.route.model({
    index: 'yuyueExamine',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if(!IsNull(param.data)&&param.state=='200'){
            send.toviewresolve(param.data).go();
        }
    }
});

cmx.route.model({
    index: 'shouliNoExamine',
    handle: function (parameter, prevModelData, send, abort) {
        var param=prevModelData;
        console.log(param);
        if(!IsNull(param.data)&&param.state=='200'){
            send.toviewresolve(param.data).go();
        }else {
            send.toviewreject(param.msg).go();
        }
    }
});
