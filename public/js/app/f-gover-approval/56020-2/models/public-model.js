
// 获取文物列表
cmx.route.model({
    index: 'bulidRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        var applyId = parameter.applyId;
        $(".part2 .panel-body").html('');
        var result = prevModelData;
        if (!IsNull(result)&&result.state == "200") {
            var param = {};
            param.data = result.data;
            send.tomodel().toviewresolve(param).go();
            
            new cmx.process()
            .turn('buildeditRelicInfo', result.data)
            .start();
        }
    }
});

// 文物详细信息
cmx.route.model({
    index: 'buildeditRelicInfo',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        var page = parameter;
        warnRelic();
    }
});

//新增每页显示条数
cmx.route.model({
    index: 'selectRelicFews',
    handle: function (parameter, prevModelData, send, abort) {
        $('#selectRelicFews').change(function () {
            new cmx.process()
            .turn('callajax', {
                url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
                data: JSON.stringify({
                    applyId: parameter.applyId,
                    pageNumber: parameter.pageNumber,
                    pageSize:  $('#selectRelicFews').val(),
                    token: getData("token")
                })
            })
            .turn('bulidRelicInfo', {
                applyStatus: parameter.applyStatus,
                applyId: parameter.applyId
            })
            .start()
        })
    }
});