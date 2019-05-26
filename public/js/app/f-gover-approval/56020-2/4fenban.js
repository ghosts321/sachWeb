$(document).ready(function () {
    var applyId = '';
    var urlApplyId = GetUrlParamString('applyId'),
        urlToken = GetUrlParamString('token');
    
    if(!IsEmpty(urlApplyId)&&!IsEmpty(urlToken)){
        applyId = urlApplyId;
        putData('token',urlToken);
        $(".pagination").eq(0).hide();
    }
    var panelHeight = getScrollHeight() - 180;
    $(".page").find(".panel-body").height(panelHeight).css("overflow", "scroll");
    new cmx.process()
        .turn('callajax', {
            url: api_ea+'/eaScrApplyInfo/getCurrenList',
            data: JSON.stringify({
                applyStatus: '4',
                token: getData("token"),
                pageNumber:1,
                pageSize: 20,
                carryUser:"",
                inOutClass: 2,
                applyId:applyId
            })
        })
        .turn('buildDepartApplyTable')
        .start();

    $(".cmx-accept").off("click", function () { });
    $(".cmx-accept").on("click", function () {
        var applyId=$(this).attr('data-id');
        var instid = $(this).attr('data-instid');
        $("#cmx-modalDiv").load(getDepartDistributeHandlerModal, function () {
            $('#cmx-fenbanList').off('show.bs.modal');
            $('#cmx-fenbanList').on('show.bs.modal', function () {
                getPersonList(instid);
            });
            $('#cmx-fenbanList').modal('show');
            $('#fenbanCommit').off('click');
            $('#fenbanCommit').on('click', function () {
                var arr = [];
                var isAppraiserNum=0;
                if ($("input:checkbox:checked").length >2) {
                    $("input:checkbox:checked").each(function () {
                        arr.push($(this).attr('data-id'));
                        if($(this).attr('data-isAppraiser')=='1'){
                            isAppraiserNum++;
                        }
                    })
                    if(isAppraiserNum>=2){
                        new cmx.process()
                        .turn('callajax', {
                            url: api_ea+'/eaScrBranchDealInfo/saveEaScrBranchDealInfo',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId,
                                index:arr
                            })
                        })
                        .turn('fenbanCommit')
                        .start();
                    }else{
                        showAlert({
                            type: 'error',
                            content: '查验员至少为两人！',
                            btn_1: '确定'
                        })
                    }
                } else {
                    showAlert({
                        type: 'error',
                        content: '至少选择三人！',
                        btn_1: '确定'
                    })
                }

            });
        });
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
                            url: api_ea+'/eaScrBranchDealInfo/rollbackDeal',
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

