$(document).ready(function () {
    $('.cmx-apply-table td').addClass('remove-tag');
    new cmx.process()
        .turn('callajax', {
            url: api_getProjectNumByUser,
            data: JSON.stringify({
                token: getData('token'),
                belongSys: '1' //1：行政审批管理，3：行业综合管理
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
            case '56004':
                new cmx.process()
                    .turn('buildSelectRelicsProtection', {
                        id: now_click_btn_id,
                        goto: function () {
                            putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
                            putData('cmx.g.danweipublishType', cmx.g.danweipublishType);
                            putData('cmx.g.danweiinstId', cmx.g.danweiinstId);
                            window.location.href = "56004/56004-apply.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56005':
                new cmx.process()
                    .turn('buildSelectRelicsProtection', {
                        id: '56005',
                        goto: function () {
                            putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
                            putData('cmx.g.danweipublishType', cmx.g.danweipublishType);
                            putData('cmx.g.danweiinstId', cmx.g.danweiinstId);
                            window.location.href = "56005/56005-apply.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56008_a':
                window.location.href = "56008/56008-a-apply.html?nowid="+GetUrlParamString('nowid');
                // new cmx.process()
                //     .turn('buildSelectRelicsProtection', {
                //         id: '56008_a',
                //         goto: function () {
                // putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
                // putData('cmx.g.danweipublishType', cmx.g.danweipublishType);
                // putData('cmx.g.danweiinstId', cmx.g.danweiinstId);
                // window.location.href = "56008/56008-a-apply.html";
                //     }
                // }).start();
                break;
            case '56008_b':
                window.location.href = "56008/56008-b-apply.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56009':
                new cmx.process()
                    .turn('build56009Form', {
                        id: '56009'
                    }).start();
                break;
            case '56010':
                new cmx.process()
                    .turn('buildSelectRelicsProtection', {
                        id: '56010',
                        goto: function () {
                            putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
                            putData('cmx.g.danweipublishType', cmx.g.danweipublishType);
                            putData('cmx.g.danweiinstId', cmx.g.danweiinstId);
                            window.location.href = "56010/56010-apply.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56011':
                new cmx.process()
                    .turn('build56011Form', {
                        id: '56011',
                        type: $(this).attr('data-type')
                    }).start();
                break;
            case '56012':
                new cmx.process()
                    .turn('buildSelectRelicsProtection', {
                        id: '56012',
                        goto: function () {
                            putData('cmx.g.danweimingcheng', cmx.g.danweimingcheng);
                            putData('cmx.g.danweipublishType', cmx.g.danweipublishType);
                            putData('cmx.g.danweiinstId', cmx.g.danweiinstId);
                            window.location.href = "56012/56012-apply.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56013':
                new cmx.process()
                    .turn('build56013Form', {
                        id: '56013'
                    }).start();
                break;
            case '56014_a':
                new cmx.process()
                    .turn('build56014Form', {
                        id: '56014_a'
                    }).start();
                break;
            case '56014_b':
                new cmx.process()
                    .turn('build56014Form', {
                        id: '56014_b'
                    }).start();
                break;
            case '56014_c':
                new cmx.process()
                    .turn('build56014Form', {
                        id: '56014_c'
                    }).start();
                break;
            case '56014_d':
                new cmx.process()
                    .turn('build56014Form', {
                        id: '56014_d'
                    }).start();
                break;
            case '56014_e':
                new cmx.process()
                    .turn('build56014Form', {
                        id: '56014_e'
                    }).start();
                break;
            case '56014-3_a':
                new cmx.process()
                    .turn('buildSelectSafetyProtectionEngineering', {
                        'num': '1'
                    }).start();
                break;
            case '56014-3_b':
                new cmx.process()
                    .turn('buildSelectSafetyProtectionEngineering', {
                        'num': '2'
                    }).start();
                break;
            case '56014-3_c':
                new cmx.process()
                    .turn('buildSelectSafetyProtectionEngineering', {
                        'num': '3'
                    }).start();
                break;
            case '56014-3_d':
                new cmx.process()
                    .turn('buildSelectSafetyProtectionEngineering', {
                        'num': '4'
                    }).start();
                break;
            case '56014-3_e':
                new cmx.process()
                    .turn('buildSelectSafetyProtectionEngineering', {
                        'num': '5'
                    }).start();
                break;
            case '56015_a':
                new cmx.process()
                    .turn('build56015Form', {
                        id: '1',
                        goto: function () {
                            window.location.href = "56015/56015-a.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56015_b':
                new cmx.process()
                    .turn('build56015Form', {
                        id: '2',
                        goto: function () {
                            window.location.href = "56015/56015-b.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56015_c':
                var project_type = $(this).attr('type');
                if (project_type == '2') {
                    new cmx.process()
                        .turn('build56015Form', {
                            id: '3',
                            goto: function () {
                                window.location.href = "56015/56015-c.html?nowid="+GetUrlParamString('nowid');
                            }
                        }).start();
                }
                // else {
                //     new cmx.process()
                //         .turn('build56015Form', {
                //             id: '4',
                //             goto: function () {
                //                 window.location.href = "56015/56015-f.html";
                //             }
                //         }).start();
                // }
                break;
            case '56015_e':
                new cmx.process()
                    .turn('build56015Form', {
                        id: '5',
                        goto: function () {
                            window.location.href = "56015/56015-e.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56015_f':
                new cmx.process()
                    .turn('build56015Form', {
                        id: '4',
                        goto: function () {
                            window.location.href = "56015/56015-f.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56015_g':
                new cmx.process()
                    .turn('build56015Form', {
                        id: '6',
                        goto: function () {
                            window.location.href = "56015/56015-g.html?nowid="+GetUrlParamString('nowid');
                        }
                    }).start();
                break;
            case '56016':
                window.location.href = "56016/56016-apply.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56019':
                window.location.href = "56019/56019-apply.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56020_a':
                window.location.href = "56020-1/1shenqing.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56020_b':
                window.location.href = "56020-2/1shenqing.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56020_c':
                window.location.href = "56020-3/1shenqing.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56020_d':
                window.location.href = "56020-4/1shenqing.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56020_e':
                window.location.href = "56020-5/1shenqing.html?nowid="+GetUrlParamString('nowid');
                break;
            case '56022_b':
                new cmx.process()
                    .turn('build56022Form', {
                        id: '56022_b',
                    }).start();
                break;
            case '56022_c':
                new cmx.process()
                    .turn('build56022Form', {
                        id: '56022_c',
                    }).start();
                break;
        }
    });
    var clickProjectNum = GetUrlParamString("projectNum");
    if (!IsEmpty(clickProjectNum))
        $('[cmx-approval-id="' + clickProjectNum + '"]').click();
});