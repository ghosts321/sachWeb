$(document).ready(function () {
    $('.cmx-apply-table td').addClass('remove-tag');
    new cmx.process()
        .turn('callajax', {
            url: api_getProjectNumByUser,
            data: JSON.stringify({
                token: getData('token'),
                belongSys: '3'//1：行政审批管理，3：行业综合管理
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            // 这里做操作
            console.log(prevModelData);
            if (!IsNull(prevModelData) && prevModelData.state == '200') {
                var data = prevModelData.data;
                for (var i = 0; i < data.length; i++) {
                    // if (data[i].itemId == '56015_b')
                    //     continue;
                    $('.cmx-apply-table button').each(function () {
                        if (data[i].itemId == $(this).attr('cmx-approval-id')) {
                            $('.cmx-apply-table .' + data[i].itemId).removeClass('remove-tag');
                        }
                    });
                }
                $('.cmx-apply-table .remove-tag').remove();
                $('.cmx-apply-table').show();
            }
            send.go();
        })
        .turn(function () {
            if (getData('role') == 'province')
                $('[cmx-approval-id="56014-3_d"]').html('转报');
        })
        .start();

    $(".page-content .applyBtn .btn").unbind("click");
    $(".page-content .applyBtn .btn").bind("click", function () {
        var now_click_btn_id = $(this).attr('cmx-approval-id');
        switch (now_click_btn_id) {
            case '56014_a':
                new cmx.process()
                    .turn('build56014Form', {
                        id: '56014_a'
                    }).start();
                break;
            case '56014-3_a':
                new cmx.process()
                    .turn('buildSelectSafetyProtectionEngineering', {
                        'num': '1'
                    }).start();
                break;
        }
    });
    var clickProjectNum = GetUrlParamString("projectNum");
    if (!IsEmpty(clickProjectNum))
        $('[cmx-approval-id="' + clickProjectNum + '"]').click();
});