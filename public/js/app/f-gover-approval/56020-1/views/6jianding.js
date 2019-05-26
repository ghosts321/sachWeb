cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        var data = param.dataList;
        console.log(data);
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var applyId = data[i].applyId;
                var customsId = data[i].customsId;
                var destination = data[i].destination;
                var appUserName = data[i].appUserName;
                var carryUser = data[i].carryUser;
                var state = data[i].inOutClassName + data[i].flowStatus;
                var applyTime = data[i].applyDate;
                var applyStatus = data[i].applyStatus;
                html = ['<tr style="color:#926dde" class="exitList" data-id="' + applyId + '">',
                '<td>' + customsId + '</td>',
                '<td>' + destination + '</td>',
                '<td>' + appUserName + '</td>',
                '<td data-applyId="'+data[i].applyId+'" data-applyClass="'+data[i].applyClass+'" class="applyDetail cursorPointer">' + carryUser + '</td>',
                '<td>' + state + '</td>',
                '</tr>',
                '<tr style="border-bottom: 2px solid #62a8ea;">',
                '<td colspan="5" style="text-align: left;">',
                showPointButton(applyId,data[i].applyStatus),
                '<button func-id="0101030101050100" data-id="' + applyId + '" style="margin:5px;" class="btn btn-primary btn-xs cmx-accept">提交</button><button func-id="0101030101050200" data-id="' + applyId + '"  style="margin:5px;" class="btn btn-primary btn-xs cmx-refuse">退回</button>',
                '<span style="float: right;line - height: 31.4px;margin - right: 10px;">' + applyTime + '</span>',
                '</td >',
                '</tr >'].join('');
                $("#cmx-dapart-apply-table").append(html);
            }

            showApplyDetail(1);
            loadWenwuList(data[0].applyStatus, data[0].applyId, 1, 20);
           
            //左右菜单关联
            $(".exitList").each(function (index) {
                $(this).unbind('click');
                $(this).on('click', function () {
                    $(".exitList").each(function() {
                        $(this).removeClass("info").css('color','#926dde');
                    })
                    $(this).addClass("info").css('color','white');
                    loadWenwuList($(this).attr('data-applyStatus'), $(this).attr('data-id'), 1, 20);
                });
            });
        }
        //查看通知
        showPointDetails();
        // 分页

        $("#left-count").val(param.pageNumber);
        $("#left-total").text(param.pages);
        $("#left-next").off("click");
        $("#left-next").on("click", function () {
            if (param.pageNumber == param.pages) {
                showAlert({
                    type: "info",
                    content: "已经是最后一页"
                })
            } else {
                var data = {
                    applyId: data[0].applyId,
                    pageNumber: param.pageNumber + 1,
                    pageSize: param.pageSize
                }
                pageLeft(data);
            }
        });
        $("#left-prev").off("click");
        $("#left-prev").on("click", function () {
            if (param.pageNumber == 1) {
                showAlert({
                    type: "info",
                    content: "已经是第一页"
                })
            } else {
                var data = {
                    applyId: data[0].applyId,
                    pageNumber: param.pageNumber - 1,
                    pageSize: param.pageSize
                }
                pageLeft(data);
            }
        });
        $("#left-last").off("click");
        $("#left-last").on("click", function () {
            var data = {
                applyId: data[0].applyId,
                pageNumber: param.pages,
                pageSize: param.pageSize
            }
            pageLeft(data);
        });
        $("#left-first").off("click");
        $("#left-first").on("click", function () {
            var data = {
                applyId: data[0].applyId,
                pageNumber: 1,
                pageSize: param.pageSize
            }
            pageLeft(data);
        });
        $("#left-count").off('blur');
        $("#left-count").blur(function () {
            var val = $(this).val();
            if (!isNaN(val)) {
                if (val >= 1 && val <= param.pages) {
                    var data = {
                        applyId: data[0].applyId,
                        pageNumber: val,
                        pageSize: param.pageSize
                    }
                    pageLeft(data);
                } else {
                    showAlert({
                        type: 'info',
                        content: "请输入有效数字"
                    });
                }
            } else {
                showAlert({
                    type: 'info',
                    content: "请输入有效数字"
                });
            }
        });

    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

function pageLeft(page) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaScrApplyInfo/bannedApllyInfoList',
            data: JSON.stringify({
                token: getData("token"),
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
                carryUser: "",
                applyStatus: '6',
                inOutClass: 1,
                applyId:''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}
function loadWenwuList(applyStatus, applyId, pageNumber, pageSize) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaScrRelicInfo/selectRelicListBranch",
            data: JSON.stringify({
                applyId: applyId,
                pageNumber: pageNumber,
                pageSize: pageSize,
                token: getData("token")
            })
        })
        .turn('bulidRelicInfoWorkbenchTable', {
            applyStatus: applyStatus,
            applyId: applyId
        })
        .turn('selectRelicFews', {
            applyId: applyId,
            pageNumber: pageNumber,
            pageSize: pageSize,
            applyStatus: applyStatus
        })
        .start();
}

//Ace-2
// 获取文物列表
cmx.route.view({
    index: 'bulidRelicInfoWorkbenchTable',
    resolve: function (param) {
        var data = param.data.dataList;
        var pageInfo = param.data;
        console.log(data);
        
        var applyStatus = param.applyStatus;
        console.log(applyStatus);
        $("#relicList").empty();
        if(data){
            relicListJianding(data,pageInfo);
        }else {
            $("#relicTotal").text('共0条')
        }
    
        warnRelic();
        // 分页
        
        if(data){
            var pageNumber = Number(pageInfo.pageNumber),
            pageSize = Number(pageInfo.pageSize),
            pages = pageInfo.pages;
        }else{
            var pageNumber = 1,
            pageSize = 1,
            pages = 1;
        }
        
        $("#right-count").val(pageNumber);
        $("#right-total").text(pages);
        $("#right-next").off("click");
        $("#right-next").on("click", function () {
            if (pageNumber == pages) {
                showAlert({
                    type: "info",
                    content: "已经是最后一页"
                });
            } else {
                var page = {
                    pageNumber:pageNumber + 1,
                    pageSize:pageSize,
                    applyId:data[0].applyId,
                    applyStatus:applyStatus
                }
                pageRight(page);
            }
        });
        $("#right-prev").off("click");
        $("#right-prev").on("click",function(){
            if (pageNumber == 1){
                showAlert({
                    type: "info",
                    content: "已经是第一页"
                })
            } else {
                var page = {
                    pageNumber:pageNumber - 1,
                    pageSize:pageSize,
                    applyId:data[0].applyId,
                    applyStatus:applyStatus
                }
                pageRight(page);
            }
        });
        $("#right-last").off("click");
        $("#right-last").on("click",function(){
            var page = {
                pageNumber:pages,
                pageSize:pageSize,
                applyId:data[0].applyId,
                applyStatus:applyStatus
            }
            pageRight(page);
        });
        $("#right-first").off("click");
        $("#right-first").on("click",function(){
            var page = {
                pageNumber:1,
                pageSize:pageSize,
                applyId:data[0].applyId,
                applyStatus:applyStatus
            }
            pageRight(page);
        });
        $("#right-count").off('blur');
        $("#right-count").blur(function(){
            var val = $(this).val();
            if(!isNaN(val)){
                if(val>=1&&val<=pages){
                    var page = {
                        pageNumber:val,
                        pageSize:pageSize,
                        applyId:data[0].applyId,
                        applyStatus:applyStatus
                    }
                    pageRight(page);
                }else{
                    showAlert({
                        type:'info',
                        content:"请输入有效数字"
                    })
                }
            }else{
                showAlert({
                    type:'info',
                    content:"请输入有效数字"
                })
            }
        }); 

    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

function pageRight(page){
    new cmx.process()
    .turn('callajax', {
        url: api_ea+"/eaScrRelicInfo/selectRelicListBranch",
        data:JSON.stringify({
            applyId: page.applyId,
            pageNumber: page.pageNumber,
            pageSize: page.pageSize,
            token: getData("token")
        })  
    })
    .turn('bulidRelicInfoWorkbenchTable',{
        applyStatus: page.applyStatus,
        applyId: page.applyId
    })
    .turn('bulidAddRelics', {})
    .start();
}
