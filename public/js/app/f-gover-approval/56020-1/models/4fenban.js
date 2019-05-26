cmx.route.model({
    index: 'buildDepartApplyTable',
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
    index: 'distribute-back',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if(param.state=="200"){
            showAlert({
                type: 'success',
                content: '退回成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-1/4fenban.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        }else{
            showAlert({
                type: 'error',
                content: param.msg
            });
        }
        
    }
});

cmx.route.model({
    index: 'fenbanCommit',
    handle: function (parameter, prevModelData, send, abort) {
        var param = prevModelData;
        console.log(param);
        if(param.state=="200"){
            showAlert({
                type: 'success',
                content: '分办提交成功！'
            });
            setTimeout(function () {
                window.location.href = public_url + 'app/f-gover-approval/56020-1/4fenban.html?nowid=' + GetUrlParamString('nowid');
            }, 1000)
        }else{
            showAlert({
                type: 'error',
                content: param.msg
            });
        }
        
    }
});