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
cmx.g.NationStatusStr.put('303', '退回');
cmx.g.NationStatusStr.put('304', '退回');
cmx.g.NationStatusStr.put('305', '退回');

//导入的系统数据的状态
cmx.g.NationStatusStr.put('W08', '已报备'); //办结
cmx.g.NationStatusStr.put('W06', '国家局批复通过'); //办结
cmx.g.NationStatusStr.put('W6', '国家局批复通过');
cmx.g.NationStatusStr.put('W999', '作废');
cmx.g.NationStatusStr.put('W07', '批复不通过');
cmx.g.NationStatusStr.put('W088', '纸质办结');
cmx.g.NationStatusStr.put('W0998', '办结');
cmx.g.NationStatusStr.put('W099', '纸质办结');
cmx.g.NationStatusStr.put('W081', '省委托第三方审核通过');
cmx.g.NationStatusStr.put('W082', '省委托第三方审核不通过');
cmx.g.NationStatusStr.put('W02', '初审退回');
cmx.g.NationStatusStr.put('W022', '整改退回');
cmx.g.NationStatusStr.put('W033', '国家局发文撰写中');
cmx.g.NationStatusStr.put('W034', '国家局发文审核中');
cmx.g.NationStatusStr.put('W053', '国家局发文请专家评审中');
cmx.g.NationStatusStr.put('W092', '已转OA专家评审中'); //'092','国家局发文请专家评审中';
cmx.g.NationStatusStr.put('W093', '已转OA专家评审完成');
cmx.g.NationStatusStr.put('W031', '国家局发文处理中');
cmx.g.NationStatusStr.put('W01', '填报中');
cmx.g.NationStatusStr.put('W021', '国家局退回');
cmx.g.NationStatusStr.put('W041', '省委托第三方处理中');
cmx.g.NationStatusStr.put('W045', '国家局委托第三方请专家评审完成');
cmx.g.NationStatusStr.put('W047', '收藏单位处理中');
cmx.g.NationStatusStr.put('W051', '国家局请专家评审中');
cmx.g.NationStatusStr.put('W054', '国家局委托第三方审核通过');
cmx.g.NationStatusStr.put('W083', '国家局委托第三方审核完成');
cmx.g.NationStatusStr.put('W09', '已下载文件');
cmx.g.NationStatusStr.put('W6K', '考古办结');

cmx.route.view({
    index: 'gethaveToDoList',
    resolve: function (result) {
        // console.log(result);
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        console.log(data);
        cmx.g.haveToDoData = data;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-htd-tbody").html('');
        for (var i = 0; i < data.length; i++) {
            var tbody_html = '';
            tbody_html = ['<tr>',
                '<td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + (IsNull(data[i].provincesName) ? '' : data[i].provincesName) + '</td>',
                '<td>' + data[i].nowadayPersonName + '</td>',
                '<td>' + (IsEmpty(data[i].proFileTitle) ? '无省文件' : data[i].proFileTitle) + '</td>',
                '<td>' + data[i].proFileNum + '</td>',
                '<td>' + data[i].hostPersonName + '</td>',
                '<td>' + (IsEmpty(data[i].refNumber) || (data[i].refNumber + '').indexOf('null') >= 0 ? '' : data[i].refNumber) + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>',
                '<td>' + data[i].belongSiName + '</td>',
                '<td>' + data[i].belongOfficesName + '</td>',
                '<td>' + (IsEmpty(data[i].proSendTime) || data[i].proSendTime == '月日' ? '' : data[i].proSendTime) + '</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td>' + data[i].networkNum + '</td>',
                '<td>' + (IsEmpty(data[i].packageTime) || data[i].packageTime == '月日' ? '' : data[i].packageTime) + '</td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-htd-tbody").append(tbody_html);
        }
        $('#cmx-phavePage .nowpage').html(pageNumber);
        $('#cmx-phavePage .jumppage').val(pageNumber);
        $('#cmx-phavePage .totalpage').html(param.pages);
        haveFunc.pageCount = param.pages;
        console.log(haveFunc.pageCount);

        $("#cmx-htd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-htd-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                putData('_chipn', haveFunc.pageNum);
                //new cmx.process()
                // .turn('jumpToApply', {
                //     index: index,
                //     data: cmx.g.haveToDoData,
                //     isUse: false
                // }).start();
                window.location.href = '/app/f-industry-integrated-manage/applyinfo.html?from=undefied&status=' + data[index].status + '&applyId=' + data[index].applyId + '&projectNum=' + data[index].projectNum + '&nowid=' + GetUrlParamString('nowid');
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
                temporaryCondition();
                haveFunc.getHaveToDo();
            }
        });
    }
});

cmx.route.view({
    index: 'belongOfficesInit',
    resolve: function (result) {
        var projectNumList = result.data;
        var treeData = new projectNumtreeMenu(projectNumList, {
            pitemIdStr: 'sinstId',
            itemNameStr: 'instName',
            itemIdStr: 'instId',
            selectedId: $('#belongOffices').val()
        }).init(0);
        $('.belongOffices-tree-body').jstree('destroy');
        $('.belongOffices-tree-body').jstree({ // 内嵌数据
            'core': {
                'data': treeData,
                'multiple': false
            }
        }).on("changed.jstree", function (e, datas) {
            if (datas.selected.length > 0) {
                var treeId = datas.instance.get_node(datas.selected[0]).id;
                var treechildren = datas.instance.get_node(datas.selected[0]).children;

                if (treeId == 'root') {
                    return;
                }
                // if (treechildren.length > 0) {
                //     treeId = treeId + '_';
                // }
                var treeText = datas.instance.get_node(datas.selected[0]).text;
                if ($('#belongOffices').val() != treeId) {
                    $('#select-belongOffices-input').webuiPopover('hide');
                }
                $('#select-belongOffices-input').val(treeText);
                $('#belongOffices').val(treeId);
                temporaryCondition();
                haveFunc.getHaveToDo();
            }
        });
    }
});