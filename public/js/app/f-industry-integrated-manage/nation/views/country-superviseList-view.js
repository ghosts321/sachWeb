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
cmx.g.NationStatusStr.put('305', '退回'); //处员退回经过处长

cmx.g.regist('reminderArray', new HashMap());

cmx.route.view({
    index: 'gethaveToDoList',
    resolve: function (result) {
        // console.log(result);
        var flag = false;
        try {
            var roleClassArr = JSON.parse(getData('roleClassArr'));
            for (var i = 0; i < roleClassArr.length; i++) {
                if (roleClassArr[i] == '2' || roleClassArr[i] == '3' || roleClassArr[i] == '4') {
                    flag = true;
                    break;
                }
            }
        } catch (err) {
            flag = false;
        }
        if (getData('userId') == 'wenshushi') {
            flag = true;
        }
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
            // var hideCuiban = data[i].status == '210' || data[i].status == '209' || data[i].status == '301' || data[i].status == '205' || data[i].nowadayPerson == getData('userId');
            tbody_html = ['<tr>',
                '<td class="text-center">',
                i + 1,
                '</td>',
                '<td>',
                '<div class="checkbox-custom checkbox-primary cmx-reminders">',
                '<input type="checkbox" id="inputUnchecked" ' + ((cmx.g.reminderArray.get(data[i].applyId)) ? 'checked' : '') + '>',
                '<label for="inputUnchecked"></label>',
                '</div>',
                //'<button class="btn btn-default btn-sm cmx-reminders">催办</button>',
                '</td>',
                '<td>' + (IsNull(data[i].provincesName) ? '' : data[i].provincesName) + '</td>',
                '<td>' + (IsEmpty(data[i].proFileTitle) ? '无省文件' : data[i].proFileTitle) + '</td>',
                '<td>' + data[i].projectNumName + '</td>',
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>',
                '<td>' + (IsEmpty(data[i].receivedTime) ? '无' : data[i].receivedTime) + '</td>',
                '<td>' + (data[i].originalNo.length <= 6 ? '无' : data[i].originalNo) + '</td>',
                '<td>' + data[i].projectName + '</td>',
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
        $("#cmx-htd-tbody .cmx-reminders").each(function (index) {
            if (data[index].status == '210' || data[index].status == '209' || data[index].status == '301' || data[index].status == '205' || data[index].nowadayPerson == getData('userId')) {
                $(this).parent().html('无');
            } else {
                if (flag || data[index].hostPerson == getData('userId')) {
                    $(this).on('click', function (event) {
                        event.stopPropagation();
                        if ($(this).find('input').is(':checked')) {
                            cmx.g.reminderArray.put(data[index].applyId, data[index])
                        } else {
                            cmx.g.reminderArray.remove(data[index].applyId);
                        }
                    })
                } else {
                    $(this).parent().html('无');
                }
            }
        })
        $("#cmx-htd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-htd-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                putData('_cspn', haveFunc.pageNum);
                window.location.href = '/app/f-industry-integrated-manage/applyinfo.html?from=undefied&status=' + data[index].status + '&applyId=' + data[index].applyId + '&projectNum=' + data[index].projectNum+'&nowid='+GetUrlParamString('nowid');
            });
        });
        $('#cmx-remainder-btn').unbind('click');
        $('#cmx-remainder-btn').bind('click', function () {
            if (cmx.g.reminderArray.values().length <= 0) {
                showAlert({
                    type: "error",
                    content: "请至少选择一项催办事项"
                });
                return;
            }
            $("#reminderModal").off('show.bs.modal');
            $("#reminderModal").off('hide.bs.modal');
            $("#reminderModal").on('show.bs.modal', function () {
                $("#reminderModal .modal-body").html('');
                var temp = '';
                for (var j = 0; j < cmx.g.reminderArray.values().length; j++) {
                    temp = temp + [
                        '<p><strong>项目名称：' + cmx.g.reminderArray.values()[j].proFileTitle + '</strong></p>',
                        '<table class="table table-bordered">',
                        '<tbody>',
                        '<tr><td>当前处理人</td><td>' + cmx.g.reminderArray.values()[j].nowadayPersonName + '</td></tr>',
                        '<tr>',
                        '<td>催办方式</td>',
                        '<td>',
                        '<div class="form-inline">',
                        '<div class="checkbox-custom checkbox-default">',
                        '<input type="checkbox" id="reminder-type-platform' + j + '" name="reminder-platform" value="1">',
                        '<label for="reminder-type-platform' + j + '">平台催办</label>',
                        '</div>',
                        '<div class="checkbox-custom checkbox-default">',
                        '<input type="checkbox" id="reminder-type-msg' + j + '" name="reminder-msg" value="2">',
                        '<label for="reminder-type-msg' + j + '">短信催办</label>',
                        '</div>',
                        '</div>',
                        '</td>',
                        '</tr>',
                        '<tr><td>催办标题</td><td><input type="text" class="form-control reminder-title"></td></tr>',
                        '<tr><td>催办内容</td><td><textarea class="form-control reminder-content"></textarea></td></tr>',
                        '</tbody>',
                        '</table>',
                    ].join('');
                }
                $('#reminderModal .modal-body').html(temp);
                $('#cmx-reminder-save-btn').off('click');
                $('#cmx-reminder-save-btn').on('click', function () {
                    var urgeList = [];
                    var flag = true;
                    $('#reminderModal table').each(function (index) {
                        if ($(this).find('[name="reminder-platform"]').is(':checked') == false && $(this).find('[name="reminder-msg"]').is(':checked') == false) {
                            showAlert({
                                type: "error",
                                content: "请为" + cmx.g.reminderArray.values()[index].proFileTitle + "选择一种催办方式"
                            });
                            flag = false;
                            return false;
                        } else {
                            flag = true;
                        }
                        if ($(this).find('.reminder-title').val().length > 300) {
                            showAlert({
                                type: "error",
                                content: cmx.g.reminderArray.values()[index].proFileTitle + "催办标题字数不能超过300"
                            });
                            flag = false;
                            return false;
                        } else {
                            flag = true;
                        }
                        if ($(this).find('.reminder-content').val().length > 1000) {
                            showAlert({
                                type: "error",
                                content: cmx.g.reminderArray.values()[index].proFileTitle + "催办内容字数不能超过1000"
                            });
                            flag = false;
                            return false;
                        } else {
                            flag = true;
                        }
                        urgeList.push({
                            applyId: cmx.g.reminderArray.values()[index].applyId,
                            msgTitle: $(this).find('.reminder-title').val(),
                            msgCont: $(this).find('.reminder-content').val(),
                            plaUrge: ($(this).find('[name="reminder-platform"]').is(':checked')) ? "1" : "",
                            msgUrge: ($(this).find('[name="reminder-msg"]').is(':checked')) ? "1" : "",
                            projectNum: cmx.g.reminderArray.values()[index].projectNum
                        });
                    });
                    if (flag) {
                        new cmx.process()
                            .turn('callajax', {
                                url: api_ea + '/eaPubUrgedealmsg/urgeSaveMsg',
                                data: JSON.stringify({
                                    token: getData('token'),
                                    usmFormData: {
                                        urgeList: urgeList
                                    }
                                }),
                                type: 'POST'
                            })
                            .turn(function (prevModelData, send, abort) {
                                console.log(prevModelData);
                                if (prevModelData.state == '200') {
                                    showAlert({
                                        type: "success",
                                        content: "催办成功"
                                    });
                                    $("#reminderModal").modal('hide');
                                    geturgeCount();
                                }
                            })
                            .start();
                    }
                });
            });
            $("#reminderModal").on('hide.bs.modal', function () {
                $("#reminderModal .modal-body").html('');
            });
            $("#reminderModal").modal('show');
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