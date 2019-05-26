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
    index: 'showNoShouliInfo',
    handle: function (parameter, prevModelData, send, abort) {
        var param=prevModelData;
        console.log(param);
        if(param.state=="200"){
            $('#cmx-2-2').val(param.data.applyClassName);
            $('#cmx-2-3').val(param.data.customsId);
            $('#cmx-2-4').val(param.data.destination);
            $('#cmx-2-5').val(param.data.carryUser);
            $('#cmx-2-6').val(param.data.telNo);
            $('#cmx-2-7').val(param.data.appUserId);
            $('#cmx-2-8').val(param.data.appTelNo);
            $('#cmx-2-9').val(param.data.address);
        }else{
            showAlert({
                type: 'error',
                content: param.msg
            });
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

cmx.route.model({
    index: 'shouliAccess',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if (param.state=='200') {
            showAlert({
                type: 'success',
                content: '受理成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-2/3shouli.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        } else {
            showAlert({
                type: 'error',
                content: param.msg
            });
        }

    }

});