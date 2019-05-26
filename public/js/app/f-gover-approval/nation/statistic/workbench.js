/*
* @Author: Marte
* @Date:   2018-07-02 11:56:02
* @Last Modified by:   Marte
* @Last Modified time: 2018-07-09 19:11:05
*/


// 选择年份
$("#yearxuan").datepicker({ //日期控件
    language: 'zh-CN',
    autoclose: true, //选择之后是否关闭日期选项
    todayHighlight: true, //当为true的时候高亮
    keyboardNavigation: true,
    format: 'yyyy',
    startView: 2,
    maxViewMode: 2,
    minViewMode: 2,
}).on('hide', function (ev) {
    ev.preventDefault();
    ev.stopPropagation();
});
// 工作台上的仪表盘驾驶舱
// 一 个人当前工作情况统计
function benchOne() {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/taskCount',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
                token: getData('token'),
                taskTimeoutCountStart: -1,
                taskTimeoutCountEnd: -1,
                taskCountStart1: 0,
                taskCountEnd1: 5,
                taskCountStart2: 5,
                taskCountEnd2: 10,
                taskCountStart3: 10,
                taskCountEnd3: 20
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len = data.length;

                if (!IsEmpty(data)) {
                    var ProvinceData = [{
                        name: "0-5天\n剩余处理日",
                        value: data.task0t5Count
                    },
                    {
                        name: "5-10天\n剩余处理日",
                        value: data.task5t10Count
                    },
                    {
                        name: "10-20天\n剩余处理日",
                        value: data.task10t20Count
                    },
                    {
                        name: "待办中超时的",
                        value: data.taskTimeOutCount
                    },
                    {
                        name: "不计时事项数",
                        value: data.taskListCount
                    },
                    ];
                }

                $("#person").html('');
                $("#person").append($('<div id="benchPie" class="margin-top-20 margin-bottom-40" style="height:400px"></div>'));
                var benchPie = echarts.init(document.getElementById("benchPie"));
                var option = {
                    title: {
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        left: 'center',
                        top: "30",
                        data: ['0-5天\n剩余处理日', '5-10天\n剩余处理日', '10-20天\n剩余处理日', '待办中超时的', '不计时事项数'],
                        selected: {
                            '不计时事项数': false,
                        }
                    },

                    series: [
                        {
                            name: '详细数据',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: ProvinceData,
                            minAngle: 15,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                }
                benchPie.setOption(option);
            }
            send.go();
        }).start();
}
benchOne();

// 二 本年度工作情况统计
function benchTwo() {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/taskCount',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
                token: getData('token'),
                chooseYearStart: $("#thisyearstartDate").val(),
                chooseYearEnd: $("#thisyearendDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len = data.length;
                console.log(data);

                // 柱状图
                var superviseBar = [];
                var superviseBar1 = [];


                superviseBar.push(data.haveToDoListCount);
                superviseBar1.push(data.haveCompleteCount);

                $("#thisyear").html('');
                $("#thisyear").append($('<div id="benchBar" class="margin-top-20 margin-bottom-40" style="height:400px"></div>'));

                var benchBarid = echarts.init(document.getElementById("benchBar"));

                var option = {
                    title: {
                        left: 'left'
                    },
                    tooltip: {
                        show: true,
                    },
                    legend: {
                        data: ['已办数量', '办结数量',]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value'
                    },
                    xAxis: {
                        type: 'category',
                        // data: [1,2,323],
                        boundaryGap: true,
                    },
                    series: [{
                        name: '已办数量',
                        type: 'bar',
                        // stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: superviseBar
                    },
                    {
                        name: '办结数量',
                        type: 'bar',
                        // stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            },
                        },
                        data: superviseBar1
                    },
                    ],
                };
                benchBarid.setOption(option);
            }
            send.go();
        }).start();
}
benchTwo(); //自己调用一次

// 三 监测期限功能
$(document).ready(function () {
    if (getData('userId') == 'wenshushi' || getData('userId') == 'mishuchu')
        $('#jianceqixian').removeClass('hidden');
    // 分页
    var param5 = {
        pageNumber: 1,
        pageSize: 10,
        callback: function (total) {
            $('#cmx-phavePage5 .last').unbind('click');
            $('#cmx-phavePage5 .last').bind('click', function () {
                if (param5.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param5.pageNumber = total;
                    new cmx.process()
                        .turn('getPublicDisclosure5', param5)
                        .start();
                }
            });
            $('#cmx-phavePage5 .next').unbind('click');
            $('#cmx-phavePage5 .next').bind('click', function () {
                if (param5.pageNumber == total) {
                    showAlert({
                        type: 'info',
                        content: "已经是最后一页"
                    })
                } else {
                    param5.pageNumber++;
                    new cmx.process()
                        .turn('getPublicDisclosure5', param5)
                        .start();
                }
            });
            $('#cmx-phavePage5 .jumppage').off('keydown');
            $('#cmx-phavePage5 .jumppage').on('keydown', function (event) {
                if (event.keyCode == 13) {
                    if ($('#cmx-phavePage5 .jumppage').val() <= total) {
                        param5.pageNumber = $('#cmx-phavePage5 .jumppage').val();
                        new cmx.process()
                            .turn('getPublicDisclosure5', param5)
                            .start();
                    }
                }
            });
        }
    }
    $('#cmx-phavePage5 .first').unbind('click');
    $('#cmx-phavePage5 .first').bind('click', function () {
        if (param5.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param5.pageNumber = 1;
            new cmx.process()
                .turn('getPublicDisclosure5', param5)
                .start();
        }
    });
    $('#cmx-phavePage5 .pre').unbind('click');
    $('#cmx-phavePage5 .pre').bind('click', function () {
        if (param5.pageNumber == 1) {
            showAlert({
                type: 'info',
                content: '已经是第一页了'
            })
        } else {
            param5.pageNumber--;
            new cmx.process()
                .turn('getPublicDisclosure5', param5)
                .start();
        }
    });
    new cmx.process()
        .turn('getPublicDisclosure5', param5)
        .start();
})

cmx.route.model({
    index: 'getPublicDisclosure5',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/subBusiness/taskListForDue',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    dueDay: "",
                    pageNo: parameter.pageNumber,
                    pageSize: parameter.pageSize,
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data.dataList;
                    var len = data.length;
                    // 监测国局
                    $("#monitor-head").text(" ");
                    var str = "";
                    str += '<tr id="th-head">';
                    str += '<th style="width: 45px">编号</th>';
                    str += '<th style="width: 100px">剩余工作日</th>';
                    str += '<th style="width: 280px">文件标题</th>';
                    str += '<th style="width: 180px;">状态</th>';
                    str += '<th style="width: 100px;">当前处理人</th>';
                    str += '</tr>';

                    $("#monitor-head").append(str);
                    var html = "";
                    for (var i = 0; i < len; i++) {
                        var workDays = IsEmpty(data[i].workDay) ? 9999 : data[i].workDay;
                        var workDaysColor = 'badge-default';
                        if (workDays <= 5) {
                            workDaysColor = 'badge-danger';
                        } else if (workDays <= 10) {
                            workDaysColor = 'badge-warning';
                        } else if (workDays < 40) {
                            workDaysColor = 'badge-success';
                        }

                        html = html + ['<tr style="cursor:pointer;" onclick = "monitorjump(\'' + data[i].applyId + '\',\'' + data[i].projectNum + '\',\'' + data[i].status + '\');">',
                        '<td class="text-center">' + (i + 1) + '</td>',
                        '<td><span class="badge badge-radius ' + workDaysColor + '">' + (IsEmpty(data[i].workDay) ? '无' : data[i].workDay + '天') + '</span></td>',
                        '<td>' + (IsEmpty(data[i].proFileTitle) ? '无省文件' : data[i].proFileTitle) + '</td>',
                        '<td style="color:#f2a654;">' + data[i].gjStatusName + '</td>',
                        '<td>' + (IsNull(data[i].nowadayPersonName) ? '' : data[i].nowadayPersonName) + '</td>', //当前处理人姓名
                            '</tr>'
                        ].join("");
                    }
                    $("#monitor-tbody").html(html);
                    parameter.callback(prevModelData.data.pages);
                    $('#cmx-phavePage5 .nowpage').text(prevModelData.data.pageNumber);
                    $('#cmx-phavePage5 .jumppage').val(prevModelData.data.pageNumber);
                    $('#cmx-phavePage5 .totalpage').text(prevModelData.data.pages);
                }
                send.go();
            }).start();
    }
});


function monitorjump(applyId, projectNum, status) {
    window.open('/app/f-gover-approval/applyinfo.html?from=undefied&status=' + status + '&applyId=' + applyId + '&projectNum=' + projectNum + '&nowid=0-0-2')
}