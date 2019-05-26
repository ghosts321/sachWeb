cmx.g.regist('NationStatusStr', new HashMap());
cmx.g.NationStatusStr.put('101', '填报中');
cmx.g.NationStatusStr.put('201', '文书室处理中');
cmx.g.NationStatusStr.put('202', '司秘处理中');
cmx.g.NationStatusStr.put('203', '处领导处理中');
cmx.g.NationStatusStr.put('204', '处员处理中');
cmx.g.NationStatusStr.put('205', '专家处理中');
cmx.g.NationStatusStr.put('206', '司领导处理中（发文中）');
cmx.g.NationStatusStr.put('207', '局领导处理中（发文中）');
cmx.g.NationStatusStr.put('208', '文印室处理中（发文中）');
cmx.g.NationStatusStr.put('209', '公示中');
cmx.g.NationStatusStr.put('210', '办结');
cmx.g.NationStatusStr.put('212', '司领导处理中');
cmx.g.NationStatusStr.put('213', '处领导处理中（已受理）');
cmx.g.NationStatusStr.put('214', '处员处理中（已受理）');
cmx.g.NationStatusStr.put('215', '处领导处理中（转办）');
cmx.g.NationStatusStr.put('216', '处员处理中（转办）');
cmx.g.NationStatusStr.put('223', '处领导处理中（发文中）');
cmx.g.NationStatusStr.put('224', '处员处理中（发文中）');
cmx.g.NationStatusStr.put('225', '秘书处处理中（发文中）');
cmx.g.NationStatusStr.put('226', '文书室处理中（发文中）');
cmx.g.NationStatusStr.put('227', '文书室处理中（发文中）');
cmx.g.NationStatusStr.put('301', '国家局退回');
cmx.g.NationStatusStr.put('302', '国家局不予受理');
cmx.g.NationStatusStr.put('303', '退回'); //一次性补正
cmx.g.NationStatusStr.put('304', '退回'); //处员退回给处长
cmx.g.NationStatusStr.put('305', '退回'); //处员退回经过处长

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
            // var workDays = IsEmpty(data[i].workDay) ? 9999 : data[i].workDay;
            // var workDaysColor = 'badge-default';
            // if (workDays <= 5) {
            //     workDaysColor = 'badge-danger';
            // } else if (workDays <= 10) {
            //     workDaysColor = 'badge-warning';
            // } else if (workDays < 40) {
            //     workDaysColor = 'badge-success';
            // }
            var nowadayPersonNameStr = globelNeedType == 1 ? '<label class="btn-xs btn-default cmx-quick-show-zhuanjia" applyid="' + data[i].applyId + '" projectnum="' + data[i].projectNum + '">查看专家</label>' : data[i].nowadayPersonName;
            tbody_html = ['<tr>',
                ' <td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + (IsNull(data[i].provincesName) ? '' : data[i].provincesName) + '</td>',
                '<td>' + (IsEmpty(data[i].proFileTitle) ? '无省文件' : data[i].proFileTitle) + '</td>',
                '<td>' + nowadayPersonNameStr + '</td>',
                '<td>' + (IsNull(data[i].lastStepPersonName) ? '' : data[i].lastStepPersonName) + '</td>',//上一处理人
                '<td>' + (IsEmpty(data[i].receivedTime) ? '无' : data[i].receivedTime) + '</td>',
                '<td>' + (IsEmpty(data[i].stopTime) ? '无' : data[i].stopTime + '天') + '</td>', //停留工作日
                // '<td><span class="badge badge-radius ' + workDaysColor + '">' + (IsEmpty(data[i].workDay) ? '无' : data[i].workDay + '天') + '</span></td>',
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td>' + (data[i].originalNo.length <= 6 ? '无' : data[i].originalNo) + '号</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + data[i].networkNum + '</td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-ntd-tbody").append(tbody_html);
        }
        setTimeout(function () {
            $('.cmx-quick-show-zhuanjia').each(function () {
                $(this).click(function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    showzhuanjia($(this).attr('applyid'), $(this).attr('projectnum'));
                });
            });
        }, 0);
        $('#cmx-pneedPage .nowpage').html(pageNumber);
        $('#cmx-pneedPage .jumppage').val(pageNumber);
        $('#cmx-pneedPage .totalpage').html(param.pages);
        needFunc.pageCount = param.pages;

        $("#cmx-ntd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-ntd-tbody tr").each(function () {
                    $(this).removeClass("active");
                });
                putData('_cnpn',needFunc.pageNum);
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
    index: 'projectNumByUserInit',
    resolve: function (result) {
        var projectNumList = result.data;
        var treeData = new projectNumtreeMenu(projectNumList, {
            pitemIdStr: 'pitemId',
            itemNameStr: 'itemName',
            itemIdStr: 'itemId',
            selectedId: $('#projectNum').val()
        }).init(0);
        var finaldata = [{
            "id": 'root',
            "text": "筛选事项",
            "children": treeData,
            "state": {
                "opened": true,
                "selected": false
            }
        }];
        $('.project-num-tree-body').jstree('destroy');
        $('.project-num-tree-body').jstree({ // 内嵌数据
            'core': {
                'data': finaldata,
                'multiple': false
            }
        }).on("changed.jstree", function (e, datas) {
            if (datas.selected.length > 0) {
                var treeId = datas.instance.get_node(datas.selected[0]).id;
                var treechildren = datas.instance.get_node(datas.selected[0]).children;
                if (treeId == 'root') {
                    return;
                }
                if (treechildren.length > 0) {
                    treeId = treeId + '_';
                }

                var treeText = datas.instance.get_node(datas.selected[0]).text;
                if ($('#projectNum').val() != treeId) {
                    $('#select-applynum-input').webuiPopover('hide');
                }
                $('#select-applynum-input').val(treeText);
                $('#projectNum').val(treeId);
                needFunc.getNeedToDo();
                //L(datas.instance.get_node(datas.selected[0]));
            }
        });
    }
});