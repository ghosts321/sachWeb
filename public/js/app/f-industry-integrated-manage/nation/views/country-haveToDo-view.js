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
            // console.log(data[i].proFileTitle)
            // var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
            tbody_html = ['<tr>',
                '<td class="text-center">',
                i + 1,
                '</td>',
                '<td>' + (IsNull(data[i].provincesName) ? '' : data[i].provincesName) + '</td>',
                '<td>' + (IsEmpty(data[i].proFileTitle) ? '无省文件' : data[i].proFileTitle) + '</td>',
                '<td class="td-head-hidden">' + (IsNull(data[i].stopTime) ? '' : data[i].stopTime) + '</td>',
                // '<td class="td-head-hidden">' + (IsNull(data[i].workDay) ? '' : data[i].workDay) + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>',
                '<td class="td-head-hidden">' + data[i].nowadayPersonName + '</td>',
                '<td>' + (IsEmpty(data[i].receivedTime) ? '无' : data[i].receivedTime) + '</td>',
                // '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                // '<td>' + (IsEmpty(data[i].publishTypeName) || data[i].publishTypeName == 'null' ? '无' : data[i].publishTypeName) + '</td>',
                '<td>' + (data[i].originalNo.length <= 6 ? '无' : data[i].originalNo) + '号</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + data[i].batchFileTile + '</td>',
                '<td>' + data[i].networkNum + '</td>',
                '<td>' + (IsEmpty(data[i].refNumber) || (data[i].refNumber + '').indexOf('null') >= 0 ? '' : data[i].refNumber) + '</td>',
                '<td>' + (IsEmpty(data[i].packageTime) || data[i].packageTime == '月日' ? '' : data[i].packageTime) + '</td>',
                // '<td>' + data[i].licenseNumber + '</td>',
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

        if(GetUrlParamString('type') == '2'){
            $('#th-head .th-head-hidden').hide();
            $('#cmx-htd-tbody .td-head-hidden').hide();
        }

        $("#cmx-htd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-htd-tbody tr").each(function () {
                    $(this).removeClass("active");
                });
                _self.addClass("active");
                putData('_chpn',haveFunc.pageNum);
                // new cmx.process()
                // .turn('jumpToApply', {
                //     index: index,
                //     data: cmx.g.haveToDoData,
                //     isUse: false
                // }).start();
                window.location.href = '/app/f-industry-integrated-manage/applyinfo.html?from=undefied&status=' + data[index].status + '&applyId=' + data[index].applyId + '&projectNum=' + data[index].projectNum+'&nowid='+GetUrlParamString('nowid');
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
                haveFunc.getHaveToDo();
                //L(datas.instance.get_node(datas.selected[0]));
            }
        });
    }
});