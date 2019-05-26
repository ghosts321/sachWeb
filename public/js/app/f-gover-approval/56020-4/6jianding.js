var getJiandingRelicData = public_url + 'data/app/f-gover-approval/56020-1/6jianding-info.json';


$(document).ready(function () {
    docJianding(4)

    $(".cmx-accept").off("click", function () { });
    $(".cmx-accept").on("click", function () {
        var applyId = $(this).attr('data-id');
        var identityParam={
            applyId: applyId
        }
      
        showAlert({
            type: 'confirm',//success info warning error confirm input
            content: '确定提交此申请吗？',
            delay: 2,//可选参数，单位秒，confirm和input下无效
            btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
            btn_2: '确定',//可选参数，默认为取消
            callback: function (_state) {//仅type为confirm下有效
                console.log(_state);//_state可能是yes no cancel
                if (_state == 'yes') {
                    console.log(identityParam);
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea+'/eaScrIdentifyInfo/getListNoIdentity',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: identityParam.applyId
                            })
                        })
                        .turn('acceptNotIdentify',identityParam)
                        .start()

                }
            }
        })
    });
    $(".cmx-refuse").off("click", function () { });
    $(".cmx-refuse").on("click", function () {
        var applyId = $(this).attr('data-id');
        showAlert({
            type: 'confirm',//success info warning error confirm input
            content: '退回将到上一级处理节点，相关人员将重新办理，确定退回吗？',
            delay: 2,//可选参数，单位秒，confirm和input下无效
            btn_1: '取消',//可选参数，type为confirm时默认为确定，type为input时默认为提交
            btn_2: '确定',//可选参数，默认为取消
            callback: function (_state) {//仅type为confirm下有效
                console.log(_state);//_state可能是yes no cancel
                if (_state == 'yes') {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea+'/eaScrIdentifyInfo/rollBackIdentify',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId
                            })
                        })
                        .turn('distribute-back')
                        .start();
                }
            }
        })
    });

});