/** 
 * user:yuhao
 */

var expertData = public_url + "data/app/provinceExpert.json"; // 专家

var personnelHtml = public_url + 'app/f-gover-approval/include/personnel-modal.html';

cmx.g.accclass = null;
var btnAdd = '0404040100000000';
var btnUpdate = '0404040200000000';
var btnCancel = '0404040300000000';
var btnSet = '0404040400000000';
var btnPass = '0404040500000000';
var needFunc = {};
needFunc.pageNum = 1;
needFunc.pageCount = 0;
$(document).ready(function () {

    $('#clear-search-form').click(function () {
        $('#instName').val('');
        $('#belong').val('');
        $('#bussClass').val('');
        $('#profession').val('');
        $('#unitName').val('');
        $('#province').val('');
        $('#learnProfess').val('');
        $("#select-applynum-input1").val('');
    });


    // 点击树形菜单，右侧表单响应


    var accclass = '17';
    cmx.g.accclass = accclass;
    var id = '17';



    $(".division").show();
    $(".zhuanjia").show();
    $(".show-info").show();
    var num = true;
    $('.show-info').on('click', function () {
        if (num == true) {
            num = false;
            show_condition();
        } else {
            num = true;
            hide_condition();
        }
    });
    new cmx.process()
        .turn('buildDataDic', {
            element: $("#bussClass")
        }).start();
    $('#bussClass').val('-1');

    new cmx.process()
        .turn('buildDataDic', {
            element: $("#profession")
        }).start();
    $('#profession').val('-1');

    // 所属机构树
    new cmx.process()
        .turn('initSelectTree', {
            id: 'select-applynum-input1',
            width: 350,
            height: 250,
            content: '<div class="project-num-tree-body"></div>',
            onShow: function () {
                new cmx.process()
                    .turn('callajax', {
                        url: getSachInstData,
                        data: {
                            token: getData('token')
                        },
                        type: 'GET',
                        jsonheader: false
                    })
                    .turn('projectNumByUserInitTwo', {
                        pitemIdStr: 'sinstId',
                        itemNameStr: 'text',
                        itemIdStr: 'id'
                    })
                    .start();
            }
        })
        .start();


    // 新增按钮

    $('#add-wrap').append('<button id="addDepart" class="btn btn-primary inputon pull-left margin-top-3">新增</button>');




    var url = getExpertinfoSJ;

    needFunc.getNeedToDo = function () {

        var data = {
            pageSize: $("#pageSize").val(),
            pageNumber: needFunc.pageNum,
            token: getData("token")
        }
        data.userName = $("#instName").val().trim();
        data.isBelongSach = $("#belong").val();
        data.bussClass = $("#bussClass").val();
        data.profession = $("#profession").val();

        new cmx.process()
            .turn('callajax', {
                url: url,
                data: data,
                type: 'GET',
                jsonheader: false
            })
            .turn('showOrganizeTable', {
                param: data,
                url: url,
                nodeId: id
            })
            .start();
    }

    // 搜索
    $("#search").off("click");
    $("#search").on("click", function () {
        needFunc.pageNum = 1;
        needFunc.getNeedToDo();
    })
    new cmx.process()
        .turn('provinceNeedInit') //分页
        .cfinally(function () {})
        .start();

    // 新增
    $("#add-wrap").off("click", "#addDepart");
    $("#add-wrap").on("click", "#addDepart", function () {

        $('#expertModal').modal('show');
        $('#expertModal').off('shown.bs.modal');
        $('#expertModal').on('shown.bs.modal', function () {
            $("#searchOld").off('click');
            $("#searchOld").on('click', function () {
                var nameText = $("#expertName").val();
                new cmx.process()
                    .turn('callajax', {
                        url: getExtpertDataByParam,
                        data: {
                            userName: $("#expertName").val(),
                            token: getData('token')
                        },
                        type: 'POST',
                        jsonheader: false
                    })  
                    .turn(function (prevModelData, send, abort) {
                        if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null' && prevModelData.data.length > 0) {
                            var data = prevModelData.data;
                            $('#expertModal').modal('hide');
                            $('#expertTabModal').off('shown.bs.modal');
                            $('#expertTabModal').on('shown.bs.modal', function () {

                                if (!IsEmpty(data)) {
                                    var tr_html = '';
                                    for (var i = 0; i < data.length; i++) {
                                        tr_html += [
                                            '<tr>',
                                            '<td><div class="radio-custom radio-primary" style="margin:0;">',
                                            '<input type="radio" id="inputRadiosUnchecked" data-id="' + data[i].userId + '" name="inputRadios" class="acheck">',
                                            '<label for="inputRadiosUnchecked"></label>',
                                            '</div></td>',
                                            '<td>' + data[i].userName + '</td>',
                                            '<td>' + data[i].userId + '</td>',
                                            '<td>' + data[i].email + '</td>',
                                            '<td>' + data[i].telNo + '</td>',
                                            '<td>' + data[i].birthday + '</td>',
                                            '<td>' + data[i].userFlagName + '</td>',
                                            '</tr>'
                                        ].join("");
                                    }
                                    $("#expertTable").html(tr_html);

                                    $("#savePerson").off('click');
                                    $("#savePerson").on('click', function () {
                                        var id = '';
                                        $(".acheck:radio:checked").each(function (index, element) {
                                            id = $(this).attr("data-id");
                                        })

                                        new cmx.process()
                                            .turn('callajax', {
                                                url: saveAaExpertinfo,
                                                data: {
                                                    metaUserId: id,
                                                    token: getData('token')
                                                },
                                                type: 'POST',
                                                jsonheader: false
                                            })
                                            .turn(function (prevModelData, send, abort) {
                                                if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                                    showAlert({
                                                        type: "success",
                                                        content: "添加成功"
                                                    })
                                                    $('#expertTabModal').modal('hide');
                                                    send.go();
                                                    needFunc.getNeedToDo();
                                                }
                                            })
                                            .start();
                                    })
                                }
                                // 建新的
                                $("#newPerson").off('click');
                                $("#newPerson").on('click', function () {
                                    $('#expertTabModal').modal('hide');
                                    $("#info-modal").empty();
                                    $("#info-modal").load(personnelHtml, function () {

                                        // 提交
                                        $('#personnelModal').off('shown.bs.modal');
                                        $('#personnelModal').on('shown.bs.modal', function () {
                                            initForm(accclass); // 初始化表单

                                            $("#cmx-30-userName").val(nameText);

                                            // 显示顺序

                                            var ourl = getExpertinfoDispOrder;


                                            var odata = {
                                                token: getData('token')
                                            }


                                            new cmx.process()
                                                .turn('callajax', {
                                                    url: ourl,
                                                    data: odata,
                                                    type: 'POST',
                                                    jsonheader: false
                                                })
                                                .turn(function (prevModelData, send, abort) {
                                                    if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                                        $("#cmx-30-dispOrder").val(prevModelData.data);
                                                    }
                                                })
                                                .start();



                                            $("#updateRelics").off('click');
                                            $("#updateRelics").on('click', function () {
                                                var info = commit(accclass, id); // 获取提交的表单内容
                                                new cmx.process()
                                                    .turn('callajax', {
                                                        url: info.addUrl,
                                                        data: info.addParam,
                                                        type: 'POST',
                                                        jsonheader: false
                                                    })
                                                    .turn(function (prevModelData, send, abort) {
                                                        if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                                            showAlert({
                                                                type: "success",
                                                                content: "添加成功"
                                                            })
                                                            $('#personnelModal').modal('hide');
                                                            send.go();
                                                            needFunc.getNeedToDo();
                                                        }
                                                    })
                                                    .start();
                                            })
                                        });
                                        $('#personnelModal').modal('show');

                                    })
                                })

                            })
                            $('#expertTabModal').modal('show');

                        } else {
                            $('#expertModal').modal('hide');
                            $("#info-modal").empty();
                            $("#info-modal").load(personnelHtml, function () {

                                // 提交
                                $('#personnelModal').off('shown.bs.modal');
                                $('#personnelModal').on('shown.bs.modal', function () {
                                    initForm(accclass); // 初始化表单

                                    $("#cmx-30-userName").val(nameText);
                                    // 显示顺序

                                    var ourl = getExpertinfoDispOrder;


                                    var odata = {
                                        token: getData('token')
                                    }


                                    new cmx.process()
                                        .turn('callajax', {
                                            url: ourl,
                                            data: odata,
                                            type: 'POST',
                                            jsonheader: false
                                        })
                                        .turn(function (prevModelData, send, abort) {
                                            if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                                $("#cmx-30-dispOrder").val(prevModelData.data);
                                            }
                                        })
                                        .start();



                                    $("#updateRelics").off('click');
                                    $("#updateRelics").on('click', function () {
                                        var info = commit(accclass, id); // 获取提交的表单内容
                                        new cmx.process()
                                            .turn('callajax', {
                                                url: info.addUrl,
                                                data: info.addParam,
                                                type: 'POST',
                                                jsonheader: false
                                            })
                                            .turn(function (prevModelData, send, abort) {
                                                if (!IsNull(prevModelData) && prevModelData.state == '200' && prevModelData.data != 'null') {
                                                    showAlert({
                                                        type: "success",
                                                        content: "添加成功"
                                                    })
                                                    $('#personnelModal').modal('hide');
                                                    send.go();
                                                    needFunc.getNeedToDo();
                                                }
                                            })
                                            .start();
                                    })
                                });
                                $('#personnelModal').modal('show');

                            })
                        }
                    })
                    .start();
            })

        });

        $('#expertModal').off('hidden.bs.modal');
        $('#expertModal').on('hidden.bs.modal', function () {
            $("#expertName").val('');
        })

    })

})



function initForm(accclass) {
    $("#form-warp").empty();
    // 表单加载

    creatForm("#form-warp", expertData);
}

function commit(accclass, nodeId, idCard) {

    var addUrl = saveAaExpertinfo;
    var roleidList = '';
    $("[name='cmx-30-roleidList']:checked").each(function () {
        roleidList += $(this).val() + ','
    })
    roleidList = roleidList.substring(0, roleidList.length - 1);
    var bussClass = '',
        profession = '',
        professionName = '';
    $("[name='cmx-30-bussClass']:checked").each(function () {
        bussClass += $(this).val() + ',';
    })
    bussClass = bussClass.substring(0, bussClass.length - 1);
    $("[name='cmx-30-profession']:checked").each(function () {
        profession += $(this).val() + ',';
        professionName += $(this).siblings('label').text() + ',';
    })
    profession = profession.substring(0, profession.length - 1);

    professionName = professionName.substring(0, professionName.length - 1);

    var addParam = {
        userName: $("#cmx-30-userName").val(),
        userId: $("#cmx-30-userId").val(),
        sex: $("#cmx-30-sex").val(),
        strBirthday: $("#cmx-30-strBirthday").val(),
        roleids: roleidList,
        telNo: $("#cmx-30-telNo").val(),
        dispOrder: $("#cmx-30-dispOrder").val(),
        email: $("#cmx-30-email").val(),
        unitName: $("#cmx-30-unitName").val(),
        userFlag: $("#cmx-30-userFlag").val(),
        province: $("#cmx-30-province").val(),
        bussClass: bussClass,
        profession: profession,
        position: $("#cmx-30-position").val(),
        recomUnit: $("#cmx-30-recomUnit").val(),
        summary: $("#cmx-30-summary").val(),
        isBelongSach: $("#projectNum").val(),
        professionName: professionName,
        instId: nodeId,
        accClass: accclass
    }

    if (!IsEmpty(idCard) && $("#cmx-30-idcard").val() == idCard) {

    } else {
        addParam.idcard = $("#cmx-30-idcard").val();
    }


    addParam.token = getData("token");
    return {
        addUrl: addUrl,
        addParam: addParam
    }
}

function isAppraiser(val) {
    if (val == '1') {
        $("#cmx-30-speciality").parents('.col-md-6').show();
        $("#cmx-30-skill").parents('.col-md-6').show();
        $("#cmx-30-position").parents('.col-md-6').show();
        $("#cmx-30-education").parents('.col-md-6').show();
        $("#cmx-30-achievement").parents('.col-md-6').show();
    } else {
        $("#cmx-30-speciality").parents('.col-md-6').hide();
        $("#cmx-30-skill").parents('.col-md-6').hide();
        $("#cmx-30-position").parents('.col-md-6').hide();
        $("#cmx-30-education").parents('.col-md-6').hide();
        $("#cmx-30-achievement").parents('.col-md-6').hide();
    }
}

function workType(val) {
    if (val == '2') {
        $("#cmx-30-transBegDate").parents('.col-md-6').show();
        $("#cmx-30-transEndDate").parents('.col-md-6').show();
    } else {
        $("#cmx-30-transBegDate").parents('.col-md-6').hide();
        $("#cmx-30-transEndDate").parents('.col-md-6').hide();
    }
}

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

//所属机构
function cmx_special_roleidList(data) {
    new cmx.process()
        .turn('callajax', {
            url: getRoleinfo,
            type: 'GET',
            jsonheader: false,
            data: {
                token: getData('token'),
                entryType: '1',
                accClass: '17'
            }
        })
        .turn(function (prevModelData, send, abort) {
            var all = data;
            var option = '';
            var result = prevModelData.data;
            for (var j = 0; j < result.length; j++) {
                var ischecked = result[j].isDefRole == '1' ? 'checked' : '';
                option = option + [
                    '<div class="checkbox-custom checkbox-primary checkbox-inline">',
                    '<input type="checkbox" ' + ischecked + ' id="cmx-30-roleidList-' + result[j].roleId + '" name="cmx-30-roleidList" value="' + result[j].roleId + '">',
                    '<label for="cmx-30-roleidList-' + result[j].roleId + '">' + result[j].roleName + '</label>',
                    '</div>',
                ].join("");
            }
            var html = [
                '<div id="cmx-30-roleidList" class="checkbox-set col-sm-9">' + option + '</div>'
            ].join("");
            $("#cmx-special-" + all.serialnumber).append(html);
        })
        .start();
}