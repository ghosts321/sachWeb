$(document).ready(function () {
    $("#subUserName").val(getData("userName"));

    new cmx.process()
        .turn('buildDataDic', {
            element: $('#belongSys'),
            hasAll: false,
            hasEmpty: false,
            type: 'select'
        }).start();

    $('#cmx-button-submit').on('click', function () {
        if ($("#suggestName").val().length > 100) {
            showAlert({
                type: 'error',
                content: '意见名称最多可填100个汉字'
            });
            return;
        }
        if ($("#subUserName").val().length > 100) {
            showAlert({
                type: 'error',
                content: '反馈人姓名最多可填100个汉字'
            });
            return;
        }
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg.test($("#subPhoneNo").val())) {
            showAlert({
                type: 'error',
                content: '联系电话不能填汉字'
            });
            return;
        }
        if ($("#subPhoneNo").val().length > 20) {
            showAlert({
                type: 'error',
                content: '联系电话最多可填20个数字'
            });
            return;
        }
        if ($("#unitName").val().length > 100) {
            showAlert({
                type: 'error',
                content: '单位名称最多可填100个汉字'
            });
            return;
        }
        if ($("#problemDesc").val().length > 4000) {
            showAlert({
                type: 'error',
                content: '问题描述最多可填4000个汉字'
            });
            return;
        }
        if ($("#alterAdvice").val().length > 4000) {
            showAlert({
                type: 'error',
                content: '修改建议最多可填4000个汉字'
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_cm + '/cmSyssuggest/saveSuggest',
                data: JSON.stringify({
                    token: getData('token'),
                    formData: [{
                        belongGate: "1",//1综合行政管理平台，2管理运维
                        suggestName: $("#suggestName").val(),
                        subUserName: $("#subUserName").val(),
                        subPhoneNo: $("#subPhoneNo").val(),
                        unitName: $("#unitName").val(),
                        belongSys: $("#belongSys").val(),
                        problemDesc: $("#problemDesc").val(),
                        alterAdvice: $("#alterAdvice").val()
                    }]
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (prevModelData.state == '200') {
                    showAlert({
                        type: 'success',
                        content: '提交成功'
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1500);
                }
                else {
                    showAlert({
                        type: 'error',
                        content: prevModelData.msg
                    });
                }
                send.go();
            })
            .start();
    });
});