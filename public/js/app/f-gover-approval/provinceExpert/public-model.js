/**
 * user: yuhao
 */

// 列表信息
cmx.route.model({
    index: 'showOrganizeTable',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200') {
            send.toviewresolve({
                data: prevModelData.data,
                param: parameter
            }).go();
        }
    }
});

//非常重要
cmx.route.model({
    index: 'initFiles',
    handle: function (parameter, prevModelData, send, abort) {
        if (IsNull(cmx.g.filelinkfileclass)) {
            cmx.g.regist('filelinkfileclass', {});
            cmx.g.regist('filesarray', new HashMap());
        }
        cmx.g.filelinkfileclass = parameter;
        for (var Key in cmx.g.filelinkfileclass) {
            cmx.g.filesarray.put(cmx.g.filelinkfileclass[Key], []);
        }
        send.go();
    }
});

cmx.route.model({
    index: 'projectNumByUserInit',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200') {
            send.toviewresolve({
                prevModelData: prevModelData,
                parameter: parameter
            }).go();
        } else {
            send.go();
        }

    }
});

cmx.route.model({
    index: 'projectNumByUserInitThree',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200') {
            send.toviewresolve({
                prevModelData: prevModelData,
                parameter: parameter
            }).go();
        } else {
            send.go();
        }

    }
});

cmx.route.model({
    index: 'projectNumByUserInitOne',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(2);
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200') {
            send.toviewresolve({
                prevModelData: prevModelData,
                parameter: parameter
            }).go();
        } else {
            send.go();
        }

    }
});

cmx.route.model({
    index: 'projectNumByUserInitTwo',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200') {
            send.toviewresolve({
                prevModelData: prevModelData,
                parameter: parameter
            }).go();
        } else {
            send.go();
        }
    }
});

// 下拉框view
cmx.route.view({
    index: 'projectNumByUserInit',
    resolve: function (result) {
        var projectNumList = result.prevModelData.data;
        var pitem = result.parameter.pitemIdStr;
        if (pitem == 'pmenuCode') {
            for (var i = 0; i < projectNumList.length; i++) {
                if (projectNumList[i].pmenuCode == '0100000000000000' || projectNumList[i].pmenuCode == '0200000000000000') {
                    projectNumList[i].pmenuCode = '';
                }
            }
        }

        if (pitem == 'sinstId') {
            for (var i = 0; i < projectNumList.length; i++) {
                if (projectNumList[i].sinstId == '10100000000000000' || projectNumList[i].sinstId == '10200000000000000') {
                    projectNumList[i].sinstId = '';
                }


                if (projectNumList[i].nodeClass == '2') {
                    projectNumList[i].id = projectNumList[i].id + projectNumList[i].sinstId;
                }
            }
        }


        console.log(projectNumList);
        var treeData = new projectNumtreeMenu(projectNumList, {
            pitemIdStr: result.parameter.pitemIdStr,
            itemNameStr: result.parameter.itemNameStr,
            itemIdStr: result.parameter.itemIdStr,
            selectedId: $('#projectNum').val(),
            isA: true
        }).init(0);
        var finaldata = treeData;
        $('.project-num-tree-body').jstree('destroy');
        $('.project-num-tree-body').jstree({ // 内嵌数据
            'core': {
                'data': finaldata,
                'multiple': true
            },
            "plugins": [ //多选插件
                "checkbox"
            ],
            "checkbox": {
                "three_state": false
            }
        }).on("select_node.jstree", function (e, datas) {
            var test = datas.node.original;
            console.log(test);
            nodeFunc.push({
                nodeId: test.id,
                pnodeId: test.pnodeId
            })

            var selectedNodeIdArray = [];
            var selectedNodeTextArray = [];

            if (result.parameter.pitemIdStr == 'pfuncCode') {

                $('.in .project-num-tree-body .jstree-undetermined').each(function (index, obj) {
                    var parentLi = $(obj).parent('a').parent('li');
                    var id = parentLi.attr("id");
                    if (id != 'root') {
                        selectedNodeIdArray.push(parentLi.attr('id'));
                        selectedNodeTextArray.push($(obj).parent('a').text());
                    }
                })

                $('.in .project-num-tree-body .jstree-clicked').each(function (index, obj) {

                    var parentLi = $(obj).parent('li');
                    if (parentLi.attr('id') != 'root') {
                        selectedNodeIdArray.push(parentLi.attr('id'));
                        selectedNodeTextArray.push($(obj).text());
                    }
                });
            } else {
                $('.in .project-num-tree-body .jstree-clicked').each(function (index, obj) {

                    var parentLi = $(obj).parent('li');
                    if (!parentLi.find('ul')[0]) {
                        selectedNodeIdArray.push(parentLi.attr('id'));
                        selectedNodeTextArray.push($(obj).text());
                    }
                });
            }


            console.log(selectedNodeTextArray, selectedNodeIdArray);
            $('#select-applynum-input').val(selectedNodeTextArray.join('|'));
            $('#projectNum').val(selectedNodeIdArray.join(','));
        }).on("deselect_node.jstree", function (e, datas) {
            var test = datas.node.original;
            for (var i = 0; i < nodeFunc.length; i++) {
                if (test.id[0] == '2') {
                    var func = nodeFunc[i].nodeId + nodeFunc[i].pnodeId;

                } else {
                    var func = nodeFunc[i].nodeId;
                }

                if (test.id == func) {
                    nodeFunc.splice(i, 1);
                }

            }
        });

        // var selectArr = $('#projectNum').val().split(',');
        // $(".jstree-anchor").each(function(){
        //     // var a = $(this).attr('id').substr(0,17);
        //     var a = $(this);
        //     console.log(a)
        //     for(var i = 0;i<selectArr.length;i++){
        //         if(a == selectArr[i]){
        //             $(this).trigger('click');
        //         }
        //     }

        // })
    }
});

cmx.route.view({
    index: 'projectNumByUserInitThree',
    resolve: function (result) {
        var projectNumList = result.prevModelData.data;
        var pitem = result.parameter.pitemIdStr;
        var treeData = new projectNumtreeMenu(projectNumList, {
            pitemIdStr: result.parameter.pitemIdStr,
            itemNameStr: result.parameter.itemNameStr,
            itemIdStr: result.parameter.itemIdStr,
            selectedId: $('#others').val()
        }).init(0);
        var finaldata = treeData;
        $('.project-num-tree-body').jstree('destroy');
        $('.project-num-tree-body').jstree({ // 内嵌数据
            'core': {
                'data': finaldata,
                'multiple': true
            },
            "plugins": [ //多选插件
                "checkbox"
            ],
        }).on("activate_node.jstree", function (e, datas) {

            var selectedNodeIdArray = [];
            var selectedNodeTextArray = [];

            $('.in .project-num-tree-body .jstree-clicked').each(function (index, obj) {

                var parentLi = $(obj).parent('li');

                selectedNodeIdArray.push(parentLi.attr('id'));
                selectedNodeTextArray.push($(obj).text());

            });

            console.log(selectedNodeTextArray, selectedNodeIdArray);
            $('#others').val(selectedNodeIdArray.join(','));
        });
    }
});

//初始化下拉树形控件
cmx.route.model({
    index: 'initSelectTree',
    handle: function (parameter, prevModelData, send, abort) {
        //toDoData[parameter.index].applyId
        var selfRun = function () {
            $('#' + parameter.id).webuiPopover($.po("webuiPopover", {
                title: parameter.title,
                content: parameter.content,
                width: IsEmpty(parameter.width) ? 'auto' : parameter.width,
                height: IsEmpty(parameter.height) ? 'auto' : parameter.height,
                closeable: false,
                onShow: parameter.onShow
            }));
        }
        if (!cmx.g.loadSelectTree) { // 动态加载依赖的js插件
            $("<link>")
                .attr({
                    rel: "stylesheet",
                    type: "text/css",
                    href: vendor_webuipopover_css_url
                })
                .appendTo("head");
            $.getScript(vendor_webuipopover_js_url, function () {
                cmx.g.loadSelectTree = true;
                selfRun();
            });
        } else {
            selfRun();
        }
        send.go();
    }
});
//构造jstree数据结构
function projectNumtreeMenu(a, param) {
    this.tree = a || [];
    this.groups = {};
    this.pitemIdStr = 'sinstId';
    this.itemNameStr = 'instName';
    this.itemIdStr = 'instId';
    this.selectedId = -1;
    this.isA = false;
    // 定义参数名
    if (!IsNull(param) && !IsEmpty(param.pitemIdStr))
        this.pitemIdStr = param.pitemIdStr;
    if (!IsNull(param) && !IsEmpty(param.itemNameStr))
        this.itemNameStr = param.itemNameStr;
    if (!IsNull(param) && !IsEmpty(param.itemIdStr))
        this.itemIdStr = param.itemIdStr;
    if (!IsNull(param) && !IsEmpty(param.selectedId))
        this.selectedId = param.selectedId;
    if (!IsNull(param) && !IsEmpty(param.isA))
        this.isA = true;
}

projectNumtreeMenu.prototype = {

    init: function (sinstId) {
        this.group();
        if (sinstId == 0) {
            return this.getDom(this.groups[sinstId]);
        } else {
            return this.getParentDom(sinstId);
        }
    },
    group: function () {
        for (var i = 0; i < this.tree.length; i++) {
            this.tree[i][this.pitemIdStr] = IsEmpty(this.tree[i][this.pitemIdStr]) ? 0 : this.tree[i][this.pitemIdStr]; // 取到每个pitem
            if (this.groups[this.tree[i][this.pitemIdStr]]) {
                this.groups[this.tree[i][this.pitemIdStr]].push(this.tree[i]);
            } else {
                this.groups[this.tree[i][this.pitemIdStr]] = [];
                this.groups[this.tree[i][this.pitemIdStr]].push(this.tree[i]);
            }
        }
    },
    getParentDom: function (pid) {
        if (!pid) {
            return '';
        }
        var arr = [];
        var x;
        for (x in this.groups) {
            for (var j = 0; j < this.groups[x].length; j++) {
                if (this.groups[x][j][this.itemIdStr] == pid) {
                    if (this.groups[x][j].nodeClass == '1') {
                        var icon = 'wb-menu';
                    } else if (this.groups[x][j].nodeClass == '2') {
                        var icon = 'wb-wrench';
                    } else {
                        var icon = false;
                    }

                    var temp = {
                        "id": this.groups[x][j][this.itemIdStr],
                        "text": this.groups[x][j][this.itemNameStr],
                        "children": this.getDom(this.groups[this.groups[x][j][this.itemIdStr]]),
                        "pnodeId": this.group[x][j][this.pitemIdStr],
                        "state": {
                            "opened": true,
                            "selected": this.selectedId == this.groups[x][j][this.itemIdStr]
                        }
                    };
                    arr.push(temp);
                    break;
                }
            }
        }
        return arr;

    },
    getDom: function (a) {
        if (!a) {
            return '';
        }
        var arr = [];
        for (var i = 0; i < a.length; i++) {
            if (a[i].nodeClass == '1') {
                var icon = 'wb-menu';
            } else if (a[i].nodeClass == '2') {
                var icon = 'wb-wrench';
            } else {
                var icon = false;
            }

            var temp = {
                "id": a[i][this.itemIdStr],
                "text": a[i][this.itemNameStr],
                "children": this.getDom(this.groups[a[i][this.itemIdStr]]),
                "pnodeId": a[i][this.pitemIdStr],
                "icon": icon,
                "state": {
                    "opened": true,
                    "selected": (this.selectedId.toString() + ',').indexOf(a[i][this.itemIdStr] + ',') > -1 ? true : false
                }
            };
            arr.push(temp);
        }
        return arr;
    }
};

// one
cmx.route.view({
    index: 'projectNumByUserInitOne',
    resolve: function (result) {
        var projectNumList = result.prevModelData.data;
        var treeData = new projectNumtreeMenu1(projectNumList, {
            pitemIdStr: 'sinstId',
            itemNameStr: 'text',
            itemIdStr: 'id',
            selectedId: $('#projectNum').val()
        }).init(0);

        $('.project-num-tree-body').jstree('destroy');
        $('.project-num-tree-body').jstree({ // 内嵌数据
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

                var treeText = datas.instance.get_node(datas.selected[0]).text;
                if ($('#projectNum').val() != treeId) {
                    $('#select-applynum-input').webuiPopover('hide');
                }
                $('#select-applynum-input').val(treeText);
                $('#projectNum').val(treeId);

                var twoId = treeId.substr(0, 2);
                if (twoId == 'SJ') {
                    treeId = '12';
                } else if (twoId == 'JC') {
                    treeId = '13';
                }
                new cmx.process()
                    .turn('callajax', {
                        url: getRoleinfo,
                        type: 'GET',
                        jsonheader: false,
                        data: {
                            roleInstId: treeId,
                            entryType: '1'
                        }
                    })
                    .turn(function (prevModelData, send, abort) {
                        var option = '';
                        var result = prevModelData.data;
                        console.log(result);
                        for (var j = 0; j < result.length; j++) {
                            var ischecked = result[j].isDefRole == '1' ? 'checked' : '';
                            option = option + [
                                '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                                '<input type="checkbox" ' + ischecked + ' id="cmx-30-roleidList-' + result[j].roleId + '" name="cmx-30-roleidList" value="' + result[j].roleId + '">',
                                '<label for="cmx-30-roleidList-' + result[j].roleId + '">' + result[j].roleName + '</label>',
                                '</div>',
                            ].join("");
                        }

                        $("#cmx-30-roleidList").html(option);
                    })
                    .start();
            }
        });
    }
});

cmx.route.view({
    index: 'projectNumByUserInitTwo',
    resolve: function (result) {
        var projectNumList = result.prevModelData.data;

        if (pitem = 'pmenuCode') {
            for (var i = 0; i < projectNumList.length; i++) {
                if (projectNumList[i].pmenuCode == '0100000000000000' || projectNumList[i].pmenuCode == '0200000000000000') {
                    projectNumList[i].pmenuCode = '';
                }
            }
        }
        var treeData = new projectNumtreeMenu1(projectNumList, {
            pitemIdStr: result.parameter.pitemIdStr,
            itemNameStr: result.parameter.itemNameStr,
            itemIdStr: result.parameter.itemIdStr,
            selectedId: $('#belong').val()
        }).init(0);

        $('.project-num-tree-body').jstree('destroy');
        $('.project-num-tree-body').jstree({ // 内嵌数据
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

                var treeText = datas.instance.get_node(datas.selected[0]).text;
                if ($('#belong').val() != treeId) {
                    $('#select-applynum-input1').webuiPopover('hide');
                }
                $('#select-applynum-input1').val(treeText);
                $('#belong').val(treeId);

                var twoId = treeId.substr(0, 2);
                if (twoId == 'SJ') {
                    treeId = '12';
                } else if (twoId == 'JC') {
                    treeId = '13';
                }
                new cmx.process()
                    .turn('callajax', {
                        url: getRoleinfo,
                        type: 'GET',
                        jsonheader: false,
                        data: {
                            roleInstId: treeId,
                            entryType: '1'
                        }
                    })
                    .turn(function (prevModelData, send, abort) {
                        var option = '';
                        var result = prevModelData.data;
                        console.log(result);
                        for (var j = 0; j < result.length; j++) {
                            var ischecked = result[j].isDefRole == '1' ? 'checked' : '';
                            option = option + [
                                '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                                '<input type="checkbox" ' + ischecked + ' id="cmx-30-roleidList-' + result[j].roleId + '" name="cmx-30-roleidList" value="' + result[j].roleId + '">',
                                '<label for="cmx-30-roleidList-' + result[j].roleId + '">' + result[j].roleName + '</label>',
                                '</div>',
                            ].join("");
                        }

                        $("#cmx-30-roleidList").html(option);
                    })
                    .start();
            }
        });
    }
});

function projectNumtreeMenu1(a, param) {
    this.tree = a || [];
    this.groups = {};
    this.pitemIdStr = 'pitemId';
    this.itemNameStr = 'itemName';
    this.itemIdStr = 'itemId';
    this.selectedId = -1;
    if (!IsNull(param) && !IsEmpty(param.pitemIdStr))
        this.pitemIdStr = param.pitemIdStr;
    if (!IsNull(param) && !IsEmpty(param.itemNameStr))
        this.itemNameStr = param.itemNameStr;
    if (!IsNull(param) && !IsEmpty(param.itemIdStr))
        this.itemIdStr = param.itemIdStr;
    if (!IsNull(param) && !IsEmpty(param.selectedId))
        this.selectedId = param.selectedId;
}
projectNumtreeMenu1.prototype = {

    init: function (pitemId) {
        this.group();
        if (pitemId == 0) {
            return this.getDom(this.groups[pitemId]);
        } else {
            return this.getParentDom(pitemId);
        }
    },
    group: function () {
        for (var i = 0; i < this.tree.length; i++) {
            this.tree[i][this.pitemIdStr] = IsEmpty(this.tree[i][this.pitemIdStr]) ? 0 : this.tree[i][this.pitemIdStr];
            if (this.groups[this.tree[i][this.pitemIdStr]]) {
                this.groups[this.tree[i][this.pitemIdStr]].push(this.tree[i]);
            } else {
                this.groups[this.tree[i][this.pitemIdStr]] = [];
                this.groups[this.tree[i][this.pitemIdStr]].push(this.tree[i]);
            }
        }
    },
    getParentDom: function (pid) {
        if (!pid) {
            return '';
        }
        var arr = [];
        var x;
        for (x in this.groups) {
            for (var j = 0; j < this.groups[x].length; j++) {
                if (this.groups[x][j][this.itemIdStr] == pid) {
                    var temp = {
                        "id": this.groups[x][j][this.itemIdStr],
                        "text": this.groups[x][j][this.itemNameStr],
                        "children": this.getDom(this.groups[this.groups[x][j][this.itemIdStr]]),
                        "state": {
                            "opened": true,
                            "selected": this.selectedId == this.groups[x][j][this.itemIdStr]
                        }
                    };
                    arr.push(temp);
                    break;
                }
            }
        }
        return arr;

    },
    getDom: function (a) {
        if (!a) {
            return '';
        }
        var arr = [];
        for (var i = 0; i < a.length; i++) {
            var temp = {
                "id": a[i][this.itemIdStr],
                "text": a[i][this.itemNameStr],
                "children": this.getDom(this.groups[a[i][this.itemIdStr]]),
                "state": {
                    "opened": true,
                    "selected": this.selectedId == a[i][this.itemIdStr]
                }
            };
            arr.push(temp);
        }
        return arr;
    }
};

// 创建表单
function creatForm(element, url) {
    $.ajax({
        url: url,
        type: "GET",
        async: false,
        success: function (result) {
            var data = result;
            for (var i = 0; i < data.length; i++) {
                var type = data[i].type;
                var width = data[i].extra.width;
                var notnull = (data[i].attribute.notnull == 1) ? true : false;
                var attrstring = 'cmx-tag="cmx" cmx-lib="' + data[i].serialnumber + '" cmx-index="' +
                    data[i].columnindex +
                    '" cmx-column="' + data[i].columnname + '" cmx-type="' + data[i].type +
                    '" cmx-require="' +
                    notnull + '"';
                if (data[i].extra.width == "") {
                    width = 12;
                }
                if (type == 'text' || type == 'single' || type == 'extra') {
                    attrstring = attrstring + 'cmx-stype="' + data[i].attribute.stype + '"';
                }
                new cmx.process()
                    .turn('automated2-form-' + type, {
                        "element": element,
                        "data": data[i],
                        "width": width,
                        "notnull": notnull,
                        "attrstring": attrstring
                    })
                    .ccatch(function (msg) {
                        console.log('异常终止了 ' + msg);
                    })
                    .cfinally(function () {
                        try {
                            eval(data[i].extra.func + '(' + JSON.stringify(data[i]) + ')');
                        } catch (exception) {
                            console.log(exception)
                        }
                    }).start();
            }
        },
        error: function (result) {
            showAlert({
                type: 'error',
                content: '网络连接失败，请确认网络连接'
            });
        },
        complete: function (result) {

        }
    });
}

// 数据字典加载
function cmx_special_diction(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;">',
        '<select class="form-control" data-dic="' + data.extra.dic + '" id="' + data.columnindex + '"   name="">aaaaa',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $("#" + data.columnindex)
        }).cfinally(function () {}).start();
}

// 权限树
function cmx_special_tree(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;position: absolute;z-index:999999;">',
        '<div class="project-num-tree-body" style="overflow:scroll;height:400px;"></div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('callajax', {
            url: getTreeWithRole,
            data: {
                token: getData('token'),
                accclass: cmx.g.accclass
            },
            type: 'GET',
            jsonheader: false
        })
        .turn('projectNumByUserInit', {
            pitemIdStr: 'sinstId',
            itemNameStr: 'text',
            itemIdStr: 'id',
        })
        .start();
}

function cmx_special_treeMe(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;position: absolute;z-index:999999;">',
        '<div class="project-num-tree-body" style="overflow:scroll;height:400px;"></div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('callajax', {
            url: getMaintainTreeWithRole,
            data: {
                token: getData('token'),
                entrytype: '2'
            },
            type: 'GET',
            jsonheader: false
        })
        .turn('projectNumByUserInit', {
            pitemIdStr: 'sinstId',
            itemNameStr: 'text',
            itemIdStr: 'id',
        })
        .start();
}

function cmx_special_func(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;position: absolute;z-index:999999;">',
        '<div class="project-num-tree-body" style="overflow:scroll;height:400px;"></div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);

    new cmx.process()
        .turn('callajax', {
            url: getaaMenuinfoTree,
            data: {
                token: getData('token'),
                entryType: data.extra.entryType
            },
            type: 'GET',
            jsonheader: false
        })
        .turn('projectNumByUserInit', {
            pitemIdStr: 'pmenuCode',
            itemNameStr: 'menuName',
            itemIdStr: 'menuId',
        })
        .start();
}

// accclass
function cmx_special_accqian(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;">',
        '<select class="form-control" id="' + data.columnindex + '"  name="">aaaaa',
        '<option value="11">国家文物局组织机构</option>',
        '<option value="12">省级文物局组织机构</option>',
        '<option value="13">文物进出境审核机构</option>',
        '<option value="14">博物馆</option>',
        '<option value="15">国保单位</option>',
        '<option value="16">专业评估机构</option>',
        '<option value="17">专家</option>',
        '<option value="18">拍卖机构</option>',
        '<option value="19">公众用户</option>',
        '<option value="1A">考古发掘单位</option>',
        '<option value="1B">考古领队</option>',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_acchou(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0;">',
        '<select class="form-control" id="' + data.columnindex + '"  name="">aaaaa',
        '<option value="21">系统管理员</option>',
        '<option value="22">系统安全员</option>',
        '<option value="23">安全审计员</option>',
        '<option value="24">系统操作员</option>',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}

// 复选数据字典
function cmx_special_mutil(data) {
    new cmx.process()
        .turn('callajax', {
            url: getDataDicFromRedis,
            data: {
                token: getData('token'),
                dataType: data.extra.dic
            },
            type: 'GET',
            jsonheader: false
        })
        .turn(function (prevModelData, send, abort) {
            var all = data;
            var option = '';
            var result = JSON.parse(prevModelData.data)[data.extra.dic];
            for (var j in result) {
                option = option + [
                    '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                    '<input type="checkbox" id="' + all.columnindex + '-' + j + '" name="' + all.columnindex + '" value="' + j + '">',
                    '<label for="' + all.columnindex + '-' + j + '">' + result[j] + '</label>',
                    '</div>',
                ].join("");
            }
            var html = [
                '<div id="' + all.columnindex + '" class="checkbox-set col-sm-9">' + option + '</div>'
            ].join("");
            $("#cmx-special-" + all.serialnumber).append(html);
        })
        .start();
}

// 数字字典加载业务分类
function cmx_special_bussClass(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" id="">',
        '<select class="form-control" data-dic="AssessBussClass" id="cmx-30-bussClass"   name="">aaaaa',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#cmx-30-bussClass')
        }).cfinally(function () {}).start();
}

//博物馆性质
function cmx_special_museumProperty(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" id="">',
        '<select class="form-control" data-dic="MuseumProperty" id="cmx-30-museumProperty"   name="">aaaaa',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#cmx-30-museumProperty')
        }).cfinally(function () {}).start();
}
//质量等级
function cmx_special_qualityLevel(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" id="">',
        '<select class="form-control" data-dic="QualityLevel" id="cmx-30-qualityLevel"   name="">aaaaa',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#cmx-30-qualityLevel')
        }).cfinally(function () {}).start();
}
// 是否免费开放
function cmx_special_isFree(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" id="">',
        '<select class="form-control" data-dic="IsFreeOpen" id="cmx-30-isFree"   name="">aaaaa',
        '<select>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#cmx-30-isFree')
        }).cfinally(function () {}).start();
}


// 加载所属司下拉树
function cmx_special_division(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" id="">',
        '<input type="text" style="background: white;" class="form-control" id="select-applynum-input" readonly="readonly" name="name"placeholder="" autocomplete="off" />',
        '<input type="hidden" id="projectNum" />',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_special_other(data) {
    var html = ['<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" id="">',
        '<input type="text" style="background: white;" class="form-control" id="select-applynum-input2" readonly="readonly" name="name"placeholder="" autocomplete="off" />',
        '<input type="hidden" id="others" />',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}

// 图片展示
function showRelicimg(index, ident) {
    new cmx.process()
        .turn('initFiles', {
            'P00030': 'P00030'
        })
        .start();
    if (!IsEmpty(index)) {
        for (var id in cmx.g.filelinkfileclass) {
            var fileclassid = cmx.g.filelinkfileclass[id];
            if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                cmx.g.filesarray.put(fileclassid, []);
            }


            for (var i = 0; i < index.length; i++) {
                var fileindexid = index[i];
                cmx.g.filesarray.get(fileclassid).push(fileindexid);
                if (ident == 0) {
                    var button = '<button onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')" type="button" class="btn btn-icon btn-primary btn-sm btn-round img-remove-btn">' +
                        '<i class="icon wb-close" aria-hidden="true"></i></button>';
                } else {
                    var button = '';
                    $("#P00030").hide();
                }
                $('#filelist-' + id + '.file-upload-list').append([
                    '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                    '<div class="btn-group" role="group">',
                    '',
                    '<img onclick="downloadThisFile(\'' + fileindexid + '\')" src="' + getFile + fileindexid + '" style="min-width: 150px !important;max-width: 150px !important;" class="cmx-upload-file-name"/>',
                    button + '</div>',
                    '</li>'
                ].join(''));
            }

        }
    }
}

function roleTreeShow() {
    var selectedNodeIdArray = [];
    $('.in .project-num-tree-body .jstree-undetermined').each(function (index, obj) {
        var parentLi = $(obj).parent('a').parent('li');
        var id = parentLi.attr("id");
        if (id != 'root') {
            selectedNodeIdArray.push(parentLi.attr('id'));
        }
    })
    $('.in .project-num-tree-body .jstree-clicked').each(function (index, obj) {

        var parentLi = $(obj).parent('li');
        if (parentLi.attr('id') != 'root') {
            selectedNodeIdArray.push(parentLi.attr('id'));
        }
    });
    selectedNodeIdStr = selectedNodeIdArray.join();
    return selectedNodeIdStr;
}

function roleTreeCerat(id, accclass) {
    $("#projectNum").val('');
    new cmx.process()
        .turn('callajax', {
            url: getTreeDataWithRole,
            data: {
                roleid: id,
                accclass: accclass,
                token: getData('token')
            },
            type: 'GET',
            jsonheader: false
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var str = ''
                for (var i = 0; i < data.length; i++) {
                    var fun = data[i].nodeId[0];
                    if (fun == '2') {
                        str += data[i].nodeId + data[i].pnodeId + ',';
                    } else {
                        str += data[i].nodeId + ',';
                    }

                }

                $("#projectNum").val(str);
                nodeFunc = data;
            }
        })
        .start();
}

// 分页
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

        $('#cmx-pneedPage .jumppage').off('keydown'); // 跳页
        $('#cmx-pneedPage .jumppage').on('keydown', function (event) {
            if (event.keyCode == 13) {
                if ($('#cmx-pneedPage .jumppage').val() <= needFunc.pageCount) {
                    needFunc.pageNum = $('#cmx-pneedPage .jumppage').val();
                    needFunc.getNeedToDo();
                }
            }
        });

        // $('#cmx-pneedPage #pageSize').off('change'); // 跳页
        $('#cmx-pneedPage #pageSize').on('change', function (event) {

            // debugger;
            needFunc.getNeedToDo();
        });
        send.go();
    }
});

//隐藏查询条件
function hide_condition() {
    $('.condition-info').css('display', 'none');
    $('#show-hide-info').html('更多条件' +
        '<i class="icon wb-chevron-down" aria-hidden="true"></i>');
}

//展开查询条件
function show_condition() {
    $('.condition-info').css('display', 'block');
    $('#show-hide-info').html('收起条件' +
        '<i class="icon wb-chevron-up" aria-hidden="true"></i>');
}



// 
function cmx_special_speciaType(data) {
    new cmx.process()
        .turn('callajax', {
            url: getDataDicFromRedis,
            data: {
                token: getData('token'),
                dataType: 'ArchaeologyYear'
            },
            type: 'GET'
        })
        .turn(function (prevModelData, send, abort) {
            var all = data;
            var option = '';
            var result = JSON.parse(prevModelData.data);
            console.log(result)
            for(var j in result.ArchaeologyYear){
                option = option + [
                    '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                    '<input type="checkbox" id="' + all.columnindex + '-' + j + '" name="' + all.columnindex + '" value="' + j + '">',
                    '<label for="' + all.columnindex + '-' + j + '">' + result.ArchaeologyYear[j] + '</label>',
                    '</div>',
                ].join("");
            } 
            
            var html = [
                '<div id="' + all.columnindex + '" class="checkbox-set col-sm-9">' + option + '</div>'
            ].join("");
            $("#cmx-special-" + all.serialnumber).append(html);
        })
        .start();
}