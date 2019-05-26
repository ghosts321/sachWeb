cmx.route.view({
    index: 'gethaveToDoList',
    resolve: function(result) {
        // console.log(result);
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
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
                '<td>' + data[i].provincesName + '</td>',
                '<td>' + (IsEmpty(data[i].proFileTitle)?'无省文件':data[i].proFileTitle) + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td>' + (IsEmpty(data[i].apprDate) ? '无' : data[i].apprDate) + '</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + data[i].networkNum + '</td>',
                '</tr>'
            ].join("");
            // alert(tbody_html);
            $("#cmx-htd-tbody").append(tbody_html);
        }
        $('#cmx-phavePage .nowpage').html(pageNumber);
        $('#cmx-phavePage .jumppage').val(pageNumber);
        $('#cmx-phavePage .totalpage').html(param.pages);
        haveFunc.pageCount = param.pages;

        $("#cmx-htd-tbody tr").each(function(index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function() {
                $("#cmx-htd-tbody tr").each(function() {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                new cmx.process()
                    // .turn('jumpToApply', {
                    //     index: index,
                    //     data: cmx.g.haveToDoData,
                    //     isUse: false
                    // }).start();
                    window.location.href = '/app/f-gover-approval/applyinfo.html?from=undefied&status='+data[index].status+'&applyId='+data[index].applyId+'&projectNum='+data[index].projectNum + '&nowid=' + GetUrlParamString('nowid');
            });
        });

    },
    reject: function(data) {

    }
});

cmx.route.view({
    index: 'projectNumByUserInit',
    resolve: function(result) {
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
        }).on("changed.jstree", function(e, datas) {
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