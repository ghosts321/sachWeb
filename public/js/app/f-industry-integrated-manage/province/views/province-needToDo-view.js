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
cmx.g.ProvincestatusStr.put('212', '国家局处理中');
cmx.g.ProvincestatusStr.put('213', '国家局处理中');
cmx.g.ProvincestatusStr.put('214', '国家局处理中');
cmx.g.ProvincestatusStr.put('215', '国家局处理中');
cmx.g.ProvincestatusStr.put('216', '国家局处理中');
cmx.g.ProvincestatusStr.put('223', '国家局处理中');
cmx.g.ProvincestatusStr.put('224', '国家局处理中');
cmx.g.ProvincestatusStr.put('225', '国家局处理中');
cmx.g.ProvincestatusStr.put('226', '国家局处理中');
cmx.g.ProvincestatusStr.put('301', '国家局退回');
cmx.g.ProvincestatusStr.put('302', '国家局退回');
cmx.g.ProvincestatusStr.put('303', '国家局处理中');
cmx.g.ProvincestatusStr.put('304', '国家局处理中');
cmx.g.ProvincestatusStr.put('305', '国家局处理中');

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
                '<td>' + (IsEmpty(data[i].proFileTitle) ? '无省文件' : data[i].proFileTitle) + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.ProvincestatusStr.get(data[i].status) + '</td>',
                '<td>' + (IsEmpty(data[i].receivedTime) ? '无' : data[i].receivedTime) + '</td>',
                '<td>' + (data[i].originalNo.length <= 6 ? '无' : data[i].originalNo) + '号</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + data[i].networkNum + '</td>',
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
            }
        });
    }
});