// 获取文物列表
cmx.route.view({
    index: 'bulidRelicInfo',
    resolve: function (param) {
        var data = param.data.dataList;
        var pageInfo = param.data;
        $("#relicList").empty();
        if(data){
            relicListYuyue(data, pageInfo);
           
        }else {
            $("#relicTotal").text('共0条')
        }
      

        // 分页
        var pageInfo = param.data;
        var pageNumber = Number(pageInfo.pageNumber),
            pageSize = Number(pageInfo.pageSize),
            pages = pageInfo.pages;
        $("#right-count").val(pageInfo.pageNumber);
        $("#right-total").text(pageInfo.pages);
        $("#right-next").off("click");
        $("#right-next").on("click", function () {
            if (pageNumber == pages) {
                showAlert({
                    type: "info",
                    content: "已经是最后一页"
                })
            } else {
                var page = {
                    pageNumber: pageNumber + 1,
                    pageSize: pageSize,
                    applyId: data[0].applyId
                }
                pageRight(page);
            }
        });
        $("#right-prev").off("click");
        $("#right-prev").on("click", function () {
            if (pageNumber == 1) {
                showAlert({
                    type: "info",
                    content: "已经是第一页"
                })
            } else {
                var page = {
                    pageNumber: pageNumber - 1,
                    pageSize: pageSize,
                    applyId: data[0].applyId
                }
                pageRight(page);
            }
        });
        $("#right-last").off("click");
        $("#right-last").on("click", function () {
            var page = {
                pageNumber: pages,
                pageSize: pageSize,
                applyId: data[0].applyId
            }
            pageRight(page);
        });
        $("#right-first").off("click");
        $("#right-first").on("click", function () {
            var page = {
                pageNumber: 1,
                pageSize: pageSize,
                applyId: data[0].applyId
            }
            pageRight(page);
        });
        $("#right-count").off('blur');
        $("#right-count").blur(function () {
            var val = $(this).val();
            if (!isNaN(val)) {
                if (val >= 1 && val <= pages) {
                    var page = {
                        pageNumber: val,
                        pageSize: pageSize,
                        applyId: data[0].applyId
                    }
                    pageRight(page);
                } else {
                    showAlert({
                        type: 'info',
                        content: "请输入有效数字"
                    })
                }
            } else {
                showAlert({
                    type: 'info',
                    content: "请输入有效数字"
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

function pageRight(page) {
    new cmx.process()
    .turn('callajax', {
        url: api_ea+'/eaScrRelicInfo/selectRelicListByApplyId',
        data:JSON.stringify({
            applyId: page.applyId,
            pageNumber: page.pageNumber,
            pageSize: page.pageSize,
            token: getData("token")
        })   
    })
    .turn('bulidRelicInfo',{
        applyId: page.applyId
    })
    .start();
}