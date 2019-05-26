/**
 * user: yuhao
 */

// 组织子节点列表信息
cmx.route.view({
    index: 'showOrganizeTable',
    resolve: function (param) {
        var data = param.data.dataList;
        var prev = param.param; // 传递过来的主要用于列表的param
        var accclass = cmx.g.accclass;

        var table = '<table class="table table-striped table-hover" id="tableContent"><thead><tr  id="th-head">' +
            '<th>编号</th><th style="width:100px;">专家姓名</th><th>登录名</th><th>邮箱</th><th>联系电话</th><th>出生年月</th><th>用户状态</th>' +
            '</tr></thead><tbody id="tableBody">';


        var pageNumber = Number(param.data.pageNumber),
            pageSize = Number(param.data.pageSize);

        if (!IsEmpty(data)) {

            for (var i = 0; i < data.length; i++) {
                var button = data[i].userFlag == '1' ? 'wb-trash' : 'wb-reply';
                var tr_html = [
                    '<tr>',
                    '<td>' + (pageSize * (pageNumber - 1) + i + 1) + '</td>',
                    creatHtml(button, data[i].userId),
                    '<td class="data-info" data-id="' + data[i].userId + '">' + data[i].userName + '</td>',
                    '<td>' + data[i].userId + '</td>',
                    '<td>' + data[i].email + '</td>',
                    '<td>' + data[i].telNo + '</td>',
                    '<td>' + data[i].birthday + '</td>',
                    '<td>' + data[i].userFlagName + '</td>',
                    '</tr>'
                ].join("");
                table += tr_html;
            }
            table += '</tbody></table>';
        }

        $("#tableWrap").html(table);

        if (IsEmpty(data)) {
            var size = $("#th-head th").length + 1;
            $("#tableBody").html('<tr><td colspan="' + size + '" class="text-left">暂无数据</td></tr>');
        }

        function creatHtml(button, id) {
            var title = button == 'wb-trash' ? '注销' : '恢复';
            var editHtml = '<a href="javascript:;"><i title="修改" class="icon wb-edit margin-5" aria-hidden="true" data-id="' + id + '"></i></a>';
            var cancleHtml = '<a href="javascript:;"><i title="' + title + '" class="icon ' + button + ' margin-5" aria-hidden="true" data-id="' + id + '"></i></a>';
            var passwordHtml = '<a href="javascript:;"><i title="密码重置" class="icon fa-key margin-5" aria-hidden="true" data-id="' + id + '"></i></a>';
            var containerHtml = '<td class="nc">' + editHtml + cancleHtml + '</td>';
            return containerHtml;
        }

        function gongHtml(id) {
            var passwordHtml = '<a href="javascript:;"><i title="密码重置" class="icon fa-key margin-5" aria-hidden="true" data-id="' + id + '"></i></a>';
            var containerHtml = '<td class="nc">' + passwordHtml + '</td>';
            return containerHtml;
        }


        $('#th-head th:eq(0)').after('<th>操作</th>');


        // 分页
        $('#cmx-pneedPage .nowpage').html(Number(param.data.pageNumber));
        $('#cmx-pneedPage .jumppage').val(Number(param.data.pageNumber));
        $('#cmx-pneedPage .totalpage').html(param.data.pages);
        needFunc.pageCount = param.data.pages;

        //调整列宽
        $("th:contains('邮箱')").css({
            width: '200px'
        });
        $("th:contains('用户状态')").css({
            width: '100px'
        });
        $("th:contains('操作')").css({
            width: '80px'
        });
        $("th:contains('身份证')").css({
            width: '200px'
        });


        //考古领队点击所属机构
        $(".data-unit").off('click');
        $(".data-unit").on('click', function () {
            $("#unitName").val($(this).text());
            needFunc.pageNum = 1;
            needFunc.getNeedToDo();
        })

        // 密码重置
        $(".fa-key").off('click');
        $(".fa-key").on('click', function () {
            var id = $(this).attr("data-id");
            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '确定要重置密码吗？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel

                    if (_state == 'yes') {
                        if (accclass == '19') {
                            var murl = gongInitPassWord;
                        } else {
                            var murl = initPassWord;
                        }
                        new cmx.process()
                            .turn('callajax', {
                                url: murl,
                                data: {
                                    userId: id,
                                    token: getData("token")
                                },
                                type: 'POST',
                                jsonheader: false
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == "200") {
                                    var result = prevModelData;
                                    showAlert({
                                        type: "success",
                                        content: result.msg
                                    })
                                    send.go();
                                }
                            })
                            .start();
                    }
                }
            })
        })
        // 查看信息
        $(".data-info").off('click');
        $(".data-info").on('click', function () {
            $("#info-modal").empty();
            var id = $(this).attr("data-id");
            $("#info-modal").load(personnelHtml, function () {
                $('#personnelModal').off('shown.bs.modal');
                $('#personnelModal').on('shown.bs.modal', function () {
                    initForm(cmx.g.accclass);
                    $("#modalTitle").text('专家详细信息');
                    new cmx.process()
                        .turn('callajax', {
                            url: getOneExpertinfo,
                            data: {
                                userId: id,
                                token: getData("token")
                            },
                            type: 'GET',
                            jsonheader: false
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                var data = prevModelData.data;

                                var bussClass = (data.bussClass).split(','),
                                    profession = (data.profession).split(',');
                                for (var i = 0; i < bussClass.length; i++) {
                                    $("[name='cmx-30-bussClass']").each(function () {
                                        var val = $(this).val();
                                        if (val == bussClass[i]) {
                                            $(this).attr("checked", true);
                                        }
                                    })
                                }
                                for (var i = 0; i < profession.length; i++) {
                                    $("[name='cmx-30-profession']").each(function () {
                                        var val = $(this).val();
                                        if (val == profession[i]) {
                                            $(this).attr("checked", true);
                                        }
                                    })
                                }
                                var isBelongSachName = data.isBelongSachName.split(',').join('|');
                                if (!IsEmpty(data.userRoleList)) {
                                    var userRoleList = JSON.parse(data.userRoleList);
                                    for (var i = 0; i < userRoleList.length; i++) {
                                        $("[name='cmx-30-roleidList']").each(function () {
                                            var val = $(this).val();
                                            if (val == userRoleList[i].roleId) {
                                                $(this).attr("checked", true);
                                            }
                                        })
                                    }
                                }
                                $("#cmx-30-sex").val(data.sex);
                                $("#cmx-30-userName").val(data.userName);
                                $("#cmx-30-userId").val(data.userId);
                                $("#cmx-30-strBirthday").val(data.birthday);
                                $("#cmx-30-idcard").val(data.encryptIdcard);
                                $("#cmx-30-telNo").val(data.telNo);
                                $("#cmx-30-email").val(data.email);
                                $("#cmx-30-dispOrder").val(data.dispOrder);
                                $("#cmx-30-unitName").val(data.unitName);
                                $("#cmx-30-province").val(data.province);
                                $("#cmx-30-position").val(data.position);
                                $("#cmx-30-recomUnit").val(data.recomUnit);
                                $("#cmx-30-summary").val(data.summary);
                                $("#projectNum").val(data.isBelongSach);
                                $("#select-applynum-input").val(isBelongSachName);

                                $("#cmx-30-userId").attr('readonly', true);
                            }
                        })
                        .start();

                    $("#updateRelics").hide();
                    $(".modal-body input").attr('disabled', true);
                    $(".modal-body select").attr('disabled', true);
                    $(".modal-body textarea").attr('disabled', true);
                })
                $('#personnelModal').modal('show');

            })

        });

        // 修改
        $(".wb-edit").off('click');
        $(".wb-edit").on('click', function () {
            $("#info-modal").empty();
            var id = $(this).attr("data-id");
            $("#info-modal").load(personnelHtml, function () {
                $('#personnelModal').off('shown.bs.modal');
                $('#personnelModal').on('shown.bs.modal', function () {
                    initForm(cmx.g.accclass);
                    $("#modalTitle").text('专家详细信息');
                    new cmx.process()
                        .turn('callajax', {
                            url: getOneExpertinfo,
                            data: {
                                userId: id,
                                token: getData("token")
                            },
                            type: 'GET',
                            jsonheader: false
                        })
                        .turn(function (prevModelData, send, abort) {
                            var idCard = '';
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                var data = prevModelData.data;

                                var bussClass = (data.bussClass).split(','),
                                    profession = (data.profession).split(',');
                                for (var i = 0; i < bussClass.length; i++) {
                                    $("[name='cmx-30-bussClass']").each(function () {
                                        var val = $(this).val();
                                        if (val == bussClass[i]) {
                                            $(this).attr("checked", true);
                                        }
                                    })
                                }
                                for (var i = 0; i < profession.length; i++) {
                                    $("[name='cmx-30-profession']").each(function () {
                                        var val = $(this).val();
                                        if (val == profession[i]) {
                                            $(this).attr("checked", true);
                                        }
                                    })
                                }
                                var isBelongSachName = data.isBelongSachName.split(',').join('|');
                                if (!IsEmpty(data.userRoleList)) {
                                    var userRoleList = JSON.parse(data.userRoleList);
                                    for (var i = 0; i < userRoleList.length; i++) {
                                        $("[name='cmx-30-roleidList']").each(function () {
                                            var val = $(this).val();
                                            if (val == userRoleList[i].roleId) {
                                                $(this).attr("checked", true);
                                            }
                                        })
                                    }
                                }
                                $("#cmx-30-sex").val(data.sex);
                                $("#cmx-30-userName").val(data.userName);
                                $("#cmx-30-userId").val(data.userId);
                                $("#cmx-30-strBirthday").val(data.birthday);
                                $("#cmx-30-idcard").val(data.encryptIdcard);
                                $("#cmx-30-dispOrder").val(data.dispOrder);
                                $("#cmx-30-telNo").val(data.telNo);
                                $("#cmx-30-email").val(data.email);
                                $("#cmx-30-unitName").val(data.unitName);
                                $("#cmx-30-province").val(data.province);
                                $("#cmx-30-userFlag").val(data.userFlag);
                                $("#cmx-30-position").val(data.position);
                                $("#cmx-30-recomUnit").val(data.recomUnit);
                                $("#cmx-30-summary").val(data.summary);
                                $("#projectNum").val(data.isBelongSach);
                                $("#select-applynum-input").val(isBelongSachName);

                                $("#cmx-30-userId").attr('readonly', true);
                                idCard = data.encryptIdcard;
                            }

                            $("#updateRelics").off('click');
                            $("#updateRelics").on('click', function () {
                                var info = commit(accclass, prev.nodeId, idCard); // 获取提交的表单内容
                                info.addParam.userId = id;
                                updataOrganize(updateAaExpertinfoSJ, info.addParam, prev);
                            })
                        })
                        .start();

                })
                $('#personnelModal').modal('show');

            })

        });



        // 注销
        $(".wb-trash").off("click");
        $(".wb-trash").on("click", function () {
            var id = $(this).attr("data-id");

            var cancelUrl = cancelExpertinfo;

            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '确定要注销吗？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel
                    var data = {
                        userids: id,
                        token: getData("token")
                    }
                    if (accclass == '1B') {
                        data.leaderids = id;
                    }
                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: cancelUrl,
                                data: data,
                                type: 'GET',
                                jsonheader: false
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == "200") {
                                    var result = prevModelData;
                                    showAlert({
                                        type: "success",
                                        content: result.msg
                                    })
                                    send.go();
                                }
                            })
                            .turn('callajax', {
                                url: prev.url,
                                data: prev.param,
                                type: 'GET',
                                jsonheader: false
                            })
                            .turn('showOrganizeTable', {
                                param: prev.param,
                                url: prev.url,
                                nodeId: prev.nodeId
                            })
                            .start();
                    }
                }
            })
        })

        // 恢复
        $(".wb-reply").off("click");
        $(".wb-reply").on("click", function () {
            var id = $(this).attr("data-id");

            var recoveryUrl = renewExpertinfo;

            showAlert({
                type: 'confirm', //success info warning error confirm input
                content: '确定要激活吗？',
                delay: 2, //可选参数，单位秒，confirm和input下无效
                btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
                btn_2: '确定', //可选参数，默认为取消
                callback: function (_state) { //仅type为confirm下有效
                    console.log(_state); //_state可能是yes no cancel
                    var data = {
                        userids: id,
                        token: getData("token")
                    }
                    if (accclass == '1B') {
                        data.leaderids = id;
                    }

                    if (_state == 'yes') {
                        new cmx.process()
                            .turn('callajax', {
                                url: recoveryUrl,
                                data: data,
                                type: 'GET',
                                jsonheader: false
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (prevModelData.state == "200") {
                                    var result = prevModelData;
                                    showAlert({
                                        type: "success",
                                        content: result.msg
                                    })
                                    send.go();
                                }
                            })
                            .turn('callajax', {
                                url: prev.url,
                                data: prev.param,
                                type: 'GET',
                                jsonheader: false
                            })
                            .turn('showOrganizeTable', {
                                param: prev.param,
                                url: prev.url,
                                nodeId: prev.nodeId
                            })
                            .start();
                    }
                }
            })
        })

    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

function updataOrganize(url, param, prev) {
    new cmx.process()
        .turn('callajax', {
            url: url,
            data: param,
            type: 'POST',
            jsonheader: false
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                showAlert({
                    type: "success",
                    content: "修改成功"
                })
                $('#personnelModal').modal('hide');
                send.go();
            }
        })
        .turn('callajax', {
            url: prev.url,
            data: prev.param,
            type: 'GET',
            jsonheader: false
        })
        .turn('showOrganizeTable', {
            param: prev.param,
            url: prev.url,
            nodeId: prev.nodeId
        })
        .start();
}