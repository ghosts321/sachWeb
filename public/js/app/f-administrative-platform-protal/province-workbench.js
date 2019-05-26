// $('.part1 .pagination li input').keyup(function () {
//     $(this).css('width', $(this).val().length * 10);
// })
cmx.g.regist('needToDoData', undefined);
cmx.g.regist('ProvincestatusStr', new HashMap());
cmx.g.ProvincestatusStr.put('101', '填报中');
cmx.g.ProvincestatusStr.put('201', '国家局处理中');
cmx.g.ProvincestatusStr.put('202', '国家局处理中');
cmx.g.ProvincestatusStr.put('203', '国家局处理中');
cmx.g.ProvincestatusStr.put('204', '国家局处理中');
cmx.g.ProvincestatusStr.put('205', '专家处理中');
cmx.g.ProvincestatusStr.put('206', '国家局处理中');
cmx.g.ProvincestatusStr.put('207', '国家局处理中');
cmx.g.ProvincestatusStr.put('208', '国家局处理中');
cmx.g.ProvincestatusStr.put('209', '国家局处理中');
cmx.g.ProvincestatusStr.put('210', '审批结束');
cmx.g.ProvincestatusStr.put('213', '国家局处理中');
cmx.g.ProvincestatusStr.put('214', '国家局处理中');
cmx.g.ProvincestatusStr.put('223', '国家局处理中');
cmx.g.ProvincestatusStr.put('224', '国家局处理中');
cmx.g.ProvincestatusStr.put('225', '国家局处理中');
cmx.g.ProvincestatusStr.put('226', '国家局处理中');
cmx.g.ProvincestatusStr.put('301', '国家局退回');
cmx.g.ProvincestatusStr.put('302', '国家局退回');
cmx.g.ProvincestatusStr.put('303', '国家局处理中');
cmx.g.ProvincestatusStr.put('304', '国家局处理中');
cmx.g.ProvincestatusStr.put('305', '国家局处理中');

cmx.g.ProvincestatusStr.put('401', '填报中');
cmx.g.ProvincestatusStr.put('501', '省局处理中');
cmx.g.ProvincestatusStr.put('502', '省局审核中');
cmx.g.ProvincestatusStr.put('503', '待报备');
cmx.g.ProvincestatusStr.put('504', '审批结束');
cmx.g.ProvincestatusStr.put('505', '省局退回');
cmx.g.ProvincestatusStr.put('601', '专家处理中');

cmx.g.ProvincestatusStr.put('499', '国家局处理中'); //考古处处理中（已受理）
cmx.g.ProvincestatusStr.put('987', '国家局处理中'); //考古处处理中
cmx.g.ProvincestatusStr.put('701', '发掘资质单位处理中');
cmx.g.ProvincestatusStr.put('702', '省局处理中');
cmx.g.ProvincestatusStr.put('773', '国家局处理中'); //待发执照
cmx.g.ProvincestatusStr.put('776', '国家局处理中'); //考古处转办
cmx.g.ProvincestatusStr.put('777', '国家局处理中'); //考古处虚拟账号已下载过excel
cmx.g.ProvincestatusStr.put('481', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 一次性补正
cmx.g.ProvincestatusStr.put('482', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 不予受理
cmx.g.ProvincestatusStr.put('993', '国家局退回'); //考古处虚拟账号退回给申请领队  一次性补正
cmx.g.ProvincestatusStr.put('994', '国家局退回'); //考古处虚拟账号退回给申请领队 不予受理
cmx.g.ProvincestatusStr.put('497', '国家局退回'); //考古处虚拟账号退回给文书室 一次性补正
cmx.g.ProvincestatusStr.put('498', '国家局退回'); //考古处虚拟账号退回给文书室 不予受理
cmx.g.ProvincestatusStr.put('495', '国家局退回'); //考古处虚拟账号退回给司密 一次性补正
cmx.g.ProvincestatusStr.put('496', '国家局退回'); //考古处虚拟账号退回给司密 不予受理
cmx.g.ProvincestatusStr.put('493', '国家局退回'); //考古处虚拟账号退回给省局 一次性补正
cmx.g.ProvincestatusStr.put('494', '国家局退回'); //考古处虚拟账号退回给省局 不予受理
cmx.g.ProvincestatusStr.put('877', '国家局退回'); //司秘账号退回给文书室 一次性补正
cmx.g.ProvincestatusStr.put('878', '国家局退回'); //司秘账号退回给文书室 不予受理
cmx.g.ProvincestatusStr.put('879', '国家局退回'); //司秘账号退回给文书室 退回
cmx.g.ProvincestatusStr.put('874', '国家局退回'); //司秘账号退回给省局 一次性补正
cmx.g.ProvincestatusStr.put('876', '国家局退回'); //司秘账号退回给省局 不予受理
cmx.g.ProvincestatusStr.put('875', '国家局退回'); //司秘账号退回给省局 退回
cmx.g.ProvincestatusStr.put('883', '国家局退回'); //司秘账号退回给发掘资质单位 一次性补正
cmx.g.ProvincestatusStr.put('884', '国家局退回'); //司秘账号退回给发掘资质单位 不予受理
cmx.g.ProvincestatusStr.put('885', '国家局退回'); //司秘账号退回给发掘资质单位 退回
cmx.g.ProvincestatusStr.put('887', '国家局退回'); //司秘账号退回给发掘申请领队 一次性补正
cmx.g.ProvincestatusStr.put('886', '国家局退回'); //司秘账号退回给发掘申请领队 不予受理
cmx.g.ProvincestatusStr.put('888', '国家局退回'); //司秘账号退回给发掘申请领队 退回
cmx.g.ProvincestatusStr.put('864', '国家局退回'); //文书室账号退回给省局 一次性补正
cmx.g.ProvincestatusStr.put('866', '国家局退回'); //文书室账号退回给省局 不予受理
cmx.g.ProvincestatusStr.put('865', '国家局退回'); //文书室账号退回给省局 退回
cmx.g.ProvincestatusStr.put('873', '国家局退回'); //文书室账号退回给发掘资质单位 一次性补正
cmx.g.ProvincestatusStr.put('872', '国家局退回'); //文书室账号退回给发掘资质单位 不予受理
cmx.g.ProvincestatusStr.put('871', '国家局退回'); //文书室账号退回给发掘资质单位 退回
cmx.g.ProvincestatusStr.put('867', '国家局退回'); //文书室账号退回给申请领队 一次性补正
cmx.g.ProvincestatusStr.put('868', '国家局退回'); //文书室账号退回给申请领队 不予受理
cmx.g.ProvincestatusStr.put('869', '国家局退回'); //文书室账号退回给申请领队 退回
cmx.g.ProvincestatusStr.put('980', '省局退回'); //省局账号退回给发掘资质单位 一次性补正
cmx.g.ProvincestatusStr.put('982', '省局退回'); //省局账号退回给发掘资质单位 不予受理
cmx.g.ProvincestatusStr.put('981', '省局退回'); //省局账号退回给发掘资质单位 退回
cmx.g.ProvincestatusStr.put('990', '省局退回'); //省局账号退回给申请领队 一次性补正
cmx.g.ProvincestatusStr.put('992', '省局退回'); //省局账号退回给申请领队 不予受理
cmx.g.ProvincestatusStr.put('991', '省局退回'); //省局账号退回给申请领队 退回
cmx.g.ProvincestatusStr.put('880', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 一次性补正
cmx.g.ProvincestatusStr.put('882', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 不予受理
cmx.g.ProvincestatusStr.put('881', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 退回
cmx.g.ProvincestatusStr.put('999', '不同意发掘'); //同210也是办结状态，只是结果为不同意发掘

cmx.g.ProvincestatusStr.put('230', '文保处处理中');
cmx.g.ProvincestatusStr.put('231', '文保处处理中（已受理）');
cmx.g.ProvincestatusStr.put('232', '文保处处理中（发文中）');
cmx.g.ProvincestatusStr.put('250', '国家局委托第三方检查中');

var needFunc = {};
needFunc.pageNum = 1;
needFunc.pageCount = 0;
needFunc.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_getNeedToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNo: needFunc.pageNum,
                statusArray: [],
                pageSize: '6',
                tdlFormData: [{
                    publishType: '-1' //工作台查全部，默认都是-1
                }],
            }),
            type: 'POST'
        })
        .turn('getneedToDoList', {})
        .start();
};

var needFunc2 = {};
needFunc2.pageNum = 1;
needFunc2.pageCount = 0;
needFunc2.getNeedToDo = function () {
    new cmx.process()
        .turn('callajax', {
            url: api_im_getNeedToDo,
            data: JSON.stringify({
                token: getData('token'),
                pageNo: needFunc2.pageNum,
                statusArray: [],
                pageSize: '6',
                tdlFormData: [{
                    publishType: '-1' //工作台查全部，默认都是-1
                }],
            }),
            type: 'POST'
        })
        .turn('getneed2ToDoList', {})
        .start();
};

$(document).ready(function () {
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $("th:contains('编号')").parent().parent().parent().each(function () {
            if ($(this).is(':visible')) {
                $(this).addClass('resizetable table-bordered').resizableColumns();
            }
        })
    })
    $('#cmxGoverCheck-more').on('click',function(event){
        window.location.href = '/app/f-gover-approval/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
    });
    $('#cmxGoverAll-more').on('click',function(event){
        window.location.href = '/app/f-industry-integrated-manage/province/province-needToDo.html?nowid='+GetUrlParamString('nowid');
    });

    new cmx.process()
        .turn('provinceNeedInit')
        .turn('provinceNeed2Init')
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
            if (prevModelData.state == '200') {
                var data = prevModelData.data;
                $('#cmx-province-count').html('<tr><td>' + data.taskListCount + '</td><td>' + data.haveToDoListCount + '</td></tr>'); //<td>'+data.twskListCount+'</td>
            }
            send.go();
        })
        .start();
});
cmx.route.model({
    index: 'getneedToDoList',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200')
            send.toviewresolve(prevModelData).go();
        else
            send.go();
    }
});
cmx.route.model({
    index: 'getneed2ToDoList',
    handle: function (parameter, prevModelData, send, abort) {
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
                '<td>' + data[i].proFileTitle + '</td>',
                '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.ProvincestatusStr.get(data[i].status) + '</td>',
                '<td>' + data[i].projectTypeName + '</td>',
                // '<td><span class="badge badge-radius ' + workDaysColor + '">' + (IsEmpty(data[i].workDay) ? '无' : data[i].workDay + '天') + '</span></td>',
                '</tr>'
            ].join("");
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
cmx.route.view({
    index: 'getneed2ToDoList',
    resolve: function (result) {
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        console.log(data);
        //cmx.g.needToDoData = data;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-ntd-tbody-all").html('');
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
                '<td>' + data[i].proFileTitle + '</td>',
                '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.ProvincestatusStr.get(data[i].status) + '</td>',
                '<td>' + data[i].projectTypeName + '</td>',
                // '<td><span class="badge badge-radius ' + workDaysColor + '">' + (IsEmpty(data[i].workDay) ? '无' : data[i].workDay + '天') + '</span></td>',
                '</tr>'
            ].join("");
            $("#cmx-ntd-tbody-all").append(tbody_html);
        }
        $('#cmx-pneedPage-all .nowpage').html(pageNumber);
        $('#cmx-pneedPage-all .jumppage').val(pageNumber);
        $('#cmx-pneedPage-all .totalpage').html(param.pages);
        needFunc2.pageCount = param.pages;
        $("#cmx-ntd-tbody-all tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-ntd-tbody-all tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                new cmx.process()
                    .turn('jumpToApply', {
                        index: index,
                        data: data,
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

cmx.route.model({
    index: 'provinceNeed2Init',
    handle: function (parameter, prevModelData, send, abort) {
        needFunc2.getNeedToDo();
        $('#cmx-pneedPage-all .first').unbind('click');
        $('#cmx-pneedPage-all .first').bind('click', function () {
            needFunc2.pageNum = 1;
            needFunc2.getNeedToDo();
        });
        $('#cmx-pneedPage-all .last').unbind('click');
        $('#cmx-pneedPage-all .last').bind('click', function () {
            needFunc2.pageNum = needFunc2.pageCount;
            needFunc2.getNeedToDo();
        });
        $('#cmx-pneedPage-all .pre').unbind('click');
        $('#cmx-pneedPage-all .pre').bind('click', function () {
            if (needFunc2.pageNum > 1) {
                needFunc2.pageNum--;
                console.log(needFunc2.pageNum + 1)
                needFunc2.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是第一页'
                });
            }
        });
        $('#cmx-pneedPage-all .next').unbind('click');
        $('#cmx-pneedPage-all .next').bind('click', function () {
            if (needFunc2.pageNum < needFunc2.pageCount) {
                needFunc2.pageNum++;
                needFunc2.getNeedToDo();
            } else {
                showAlert({
                    type: 'info',
                    content: '已经是最后一页'
                });
            }
        });

        $('#cmx-pneedPage-all .jumppage').off('keydown');
        $('#cmx-pneedPage-all .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage-all .jumppage').val() <= needFunc2.pageCount) {
                    needFunc2.pageNum = $('#cmx-pneedPage-all .jumppage').val();
                    needFunc2.getNeedToDo();
                }
            }
        });
        send.go();
    }
});