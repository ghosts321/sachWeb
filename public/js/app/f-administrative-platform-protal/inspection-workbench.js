// $('.part1 .pagination li input').keyup(function () {
//     $(this).css('width', $(this).val().length * 10);
// })
cmx.g.regist('needToDoData', undefined);
var needFunc = {};
needFunc.pageNum = 1;
needFunc.pageCount = 0;
needFunc.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getInspectionNeedToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: needFunc.pageNum,
                pageSize: '6',
                tdlFormData: [{
                    publishType: '-1'//工作台查全部，默认都是-1
                }],
            }),
            type: 'POST'
        })
        .turn('getneedToDoList', {})
        .start();
};
$(document).ready(function () {
    if (getData('accClass') == '16') {
        $('.pinggu-shuoming').show();
    } else {
        $('.zhuanjia-shuoming').show();
    }
    new cmx.process()
        .turn('provinceNeedInit')
        .turn('callajax', {
            url: api_ea + '/business/taskCount', //待办统计
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            //to do 本周待办接口未做，先用总代办数
            console.log(prevModelData)
            var data = prevModelData.data;
            $('#cmx-province-count').html('<tr><td>' + data.taskListCount + '</td><td>' + data.haveToDoListCount + '</td></tr>'); //<td>'+data.twskListCount+'</td>
            send.go();
        })
        .start();
});
cmx.route.model({
    index: 'getneedToDoList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});
cmx.route.view({
    index: 'getneedToDoList',
    resolve: function (result) {
        // console.log(result);
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        console.log(data);
        cmx.g.needToDoData = data;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-ntd-tbody").html('');
        for (var i = 0; i < data.length; i++) {
            var tbody_html = '';
            // console.log(data[i].proFileTitle)
            // var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
            var workDays = IsEmpty(data[i].workDay) ? 9999 : data[i].workDay;
            var workDaysColor = 'badge-default';
            if (workDays <= 5) {
                workDaysColor = 'badge-danger';
            } else if (workDays <= 10) {
                workDaysColor = 'badge-warning';
            } else if (workDays < 40) {
                workDaysColor = 'badge-success';
            }
            tbody_html = ['<tr>',
                '<td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + data[i].provincesName + '</td>',
                '<td>' + data[i].proFileTitle + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td>' + (IsEmpty(data[i].arriveDate) ? '无' : data[i].arriveDate) + '</td>',
                '<td>' + (IsEmpty(data[i].stopTime) ? '无' : data[i].stopTime + '天') + '</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + data[i].networkNum + '</td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-ntd-tbody").append(tbody_html);
        }
        $('#cmx-pneedPage .nowpage').html(pageNumber);
        $('#cmx-pneedPage .jumppage').val(pageNumber);
        $('#cmx-pneedPage .totalpage').html(param.pages);
        needFunc.pageCount = param.pages;
        console.log(needFunc.pageCount);
        $("#cmx-ntd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-ntd-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                new cmx.process()
                    .turn('jumpToApply', {
                        index: index,
                        data: cmx.g.needToDoData,
                        isUse: true
                    }).start();
            });
        });
    },
    reject: function (data) {

    }
});
cmx.route.model({
    index: 'provinceNeedInit',
    handle: function (parameter, prevModelData, send, abort) {
        needFunc.getNeedToDo();
        $('#cmx-pneedPage .first').unbind('click');
        $('#cmx-pneedPage .first').bind('click', function () {
            needFunc.pageNum = 1;
            needFunc.getNeedToDo();
        });
        $('#cmx-pneedPage .last').unbind('click');
        $('#cmx-pneedPage .last').bind('click', function () {
            needFunc.pageNum = needFunc.pageCount;
            needFunc.getNeedToDo();
        });
        $('#cmx-pneedPage .pre').unbind('click');
        $('#cmx-pneedPage .pre').bind('click', function () {
            if (needFunc.pageNum > 1) {
                needFunc.pageNum--;
                console.log(needFunc.pageNum + 1)
                needFunc.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-pneedPage .next').unbind('click');
        $('#cmx-pneedPage .next').bind('click', function () {
            if (needFunc.pageNum < needFunc.pageCount) {
                needFunc.pageNum++;
                needFunc.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });

        $('#cmx-pneedPage .jumppage').off('keydown');
        $('#cmx-pneedPage .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage .jumppage').val() <= needFunc.pageCount) {
                    needFunc.pageNum = $('#cmx-pneedPage .jumppage').val();
                    needFunc.getNeedToDo();
                }
            }
        });
        send.go();
    }
});