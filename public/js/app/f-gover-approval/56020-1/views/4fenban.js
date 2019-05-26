cmx.route.view({
    index: 'buildDepartApplyTable',
    resolve: function (param) {
        var data = param.dataList;
        console.log(data);
        $("#cmx-fenban-table").empty();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {

                var applyId = data[i].applyId;
                var customsId = data[i].customsId;
                var destination = data[i].destination;
                var appUserName = data[i].appUserName;
                var carryUser = data[i].carryUser;
                var processState = data[i].inOutClassName + data[i].flowStatus;
                var applyTime = data[i].applyDate;
                var instid = data[i].reviewInst;
               
                html = ['<tr style="color:#926dde" class="exitList" data-id="' + applyId + '">',
                '<td>' + customsId + '</td>',
                '<td>' + destination + '</td>',
                '<td>' + appUserName + '</td>',
                '<td data-applyId="' + data[i].applyId + '" data-applyClass="' + data[i].applyClass + '" class="applyDetail cursorPointer">' + carryUser + '</td>',
                '<td>' + processState + '</td>',
                    '</tr>',
                    '<tr style="border-bottom: 2px solid #62a8ea;">',
                    '<td colspan="5" style="text-align: left;">',
                    showPointButton(applyId,data[i].applyStatus),
                '<button func-id="0101030101030100" data-instid="' + instid + '"  data-id="' + applyId + '" style="margin:5px;" class="btn btn-primary btn-xs cmx-accept">分办</button><button func-id="0101030101030200" data-id="' + applyId + '" style="margin:5px;"  class="btn btn-primary btn-xs cmx-refuse">退回</button>',
                '<span style="float: right;line - height: 31.4px;margin - right: 10px;">' + applyTime + '</span>',
                    '</td >',
                    '</tr >'].join('');
                $("#cmx-fenban-table").append(html);

            }
            showApplyDetail(1);
            loadWenwuList(data[0].applyStatus, data[0].applyId, 1, 20);
            //左右菜单关联
            $(".exitList").each(function (index) {
                $(this).unbind('click');
                $(this).on('click', function () {
                    $(".exitList").each(function () {
                        $(this).removeClass("info").css('color', '#926dde');
                    })
                    $(this).addClass("info").css('color', 'white');
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
                    applyStatus: "4",
                    token: getData("token"),
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
                    applyStatus: "4",
                    token: getData("token"),
                    pageNumber: param.pageNumber - 1,
                    pageSize: param.pageSize
                }
                pageLeft(data);
            }
        });
        $("#left-last").off("click");
        $("#left-last").on("click", function () {
            var data = {
                applyStatus: "4",
                token: getData("token"),
                pageNumber: param.pages,
                pageSize: param.pageSize
            }
            pageLeft(data);
        });
        $("#left-first").off("click");
        $("#left-first").on("click", function () {
            var data = {
                applyStatus: "4",
                token: getData("token"),
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
                        applyStatus: "4",
                        token: getData("token"),
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
            url: api_ea + '/eaScrApplyInfo/getCurrenList',
            data: JSON.stringify({
                token: getData("token"),
                pageNumber: page.pageNumber,
                pageSize: page.pageSize,
                carryUser: "",
                applyStatus: '4',
                inOutClass: 1,
                applyId: ''
            })
        })
        .turn('buildDepartApplyTable')
        .start();
}
function loadWenwuList(applyStatus, applyId, pageNumber, pageSize) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaScrRelicInfo/selectRelicListByApplyId",
            data: JSON.stringify({
                applyId: applyId,
                pageNumber: pageNumber,
                pageSize: pageSize,
                token: getData("token")
            })
        })
        .turn('bulidRelicInfo', {
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