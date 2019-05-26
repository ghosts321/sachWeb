var get56008aProjectData = public_url + 'data/app/f-gover-approval/56008/56008-b-apply.json';
cmx.g.regist('applyUnitId', '');
cmx.g.regist('provinces', '');
cmx.g.regist('address_map', new HashMap());
_projectNum = "56008_b";
var count = 0;
var jingdu; //存储原收文里的经度
var weidu; //存储原收文里的纬度
$(document).ready(function () {

    $('#cmx-qingmaojun-back').on('click', function () {
        history.go(-1);
    });
    $('#cmx-form').html('');
    new cmx.process()
        .turn('initFiles', {
            'P0017': '97',
            'P0018': '98'
        })
        .turn('callajax', {
            url: get56008aProjectData,
            datatype: 'json',
            async: true,
            type: 'GET'
        })
        .turn(function (prevModelData, send, abort) {
            var data = prevModelData;
            for (var i = 0; i < data.length; i++) {
                var type = data[i].type;
                var width = data[i].extra.width;
                var notnull = (data[i].attribute.notnull == 1) ? true : false;
                var attrstring = 'cmx-tag="cmx" cmx-lib="' + data[i].serialnumber + '" cmx-index="' + data[i].columnindex +
                    '" cmx-column="' + data[i].columnname + '" cmx-type="' + data[i].type + '" cmx-require="' +
                    notnull + '"';
                if (data[i].extra.width == "") {
                    width = 12;
                }
                if (type == 'text' || type == 'single' || type == 'extra') {
                    attrstring = attrstring + 'cmx-stype="' + data[i].attribute.stype + '"';
                }
                new cmx.process()
                    .turn('automated-form-' + type, {
                        "element": "#cmx-form",
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
                            if (!IsEmpty(data[i].extra.func))
                                eval(data[i].extra.func + '(' + JSON.stringify(data[i]) + ')');
                        } catch (exception) {

                        }

                    }).start();

            }
            setTimeout(function () {
                if (!IsEmpty(GetUrlParamString('applyId'))) {
                    cmx.g.applyId = GetUrlParamString('applyId');
                    send.tomodel({
                        data: JSON.stringify({
                            token: getData('token'),
                            applyId: cmx.g.applyId,
                            projectNum: _projectNum
                        }),
                    }).go();
                }

                //自动带入申请人信息
                $("#cmx-i-46").val(getData("userName")).attr('readonly', true);
                $("#cmx-i-48").val(getData("phoneNo"));

                //更新考古领队的个人信息
                $("#cmx-lead-update").on('click', function () {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_aa + '/user/aaArchaeologyleader/updateAaArchaeologyleader',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                majorachieve: $("#lead-experience").val()
                            }),
                            success: function (result) {
                                if (result.state == '200') {
                                    showAlert({
                                        type: "success",
                                        content: "发送成功"
                                    });
                                }
                                console.log(result);
                            },
                            type: 'POST'
                        })
                        .start();
                });
                //隐藏开头的说明
                $('#cmx-hide-shuoming').on('click', function () {
                    $('#cmx-shuoming').hide();
                    $('#cmx-show-shuoming').show();
                    $('#cmx-hide-shuoming').hide();
                });
                // 显示开头的说明
                $('#cmx-show-shuoming').on('click', function () {
                    $('#cmx-shuoming').show();
                    $('#cmx-show-shuoming').hide();
                    $('#cmx-hide-shuoming').show();
                });
                //获取领队信息，显示在页面上
                if (!IsEmpty(GetUrlParamString('from'))) {

                } else {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_aa + '/user/getUserInfo',
                            data: {
                                token: getData('token'),
                            },
                            success: function (result) {
                                console.log(result);
                            },
                            type: 'GET'
                        })
                        .turn(function (prevModelData, send, abort) {
                            console.log(prevModelData);
                            var data = prevModelData.data;
                            $("#lead-name").val(data.username).attr('disabled', true);
                            var user = JSON.parse(data.user);
                            // $("#lead-sex option[value='" + user.sex + "']").attr("selected", "selected");
                            $("#lead-sex").val(user.sex).attr('disabled', true);
                            $("#lead-number").val(user.leaderId).attr('disabled', true);
                            $("#lead-birthday").val(user.birthdate).attr('disabled', true);

                            // $("#lead-major option[value='" + (IsEmpty(user.mainPosition) ? (-1) : user.mainPosition) + "']").attr("selected", "selected");
                            $("#lead-major").val((IsEmpty(user.mainPosition) ? (-1) : user.mainPosition)).attr('disabled', true);
                            $("#lead-academic").val(user.learnProfess).attr('disabled', true);
                            $("#lead-experience").val(user.majorAchieve);
                            $('#lead-connecttel').val(prevModelData.data.phoneNo).attr('disabled', true);
                        })
                        .start();
                }
                // 获取主申请单位模态框
                $("#cmx-mainunit-modal").load(getMainUnitModal, function () {
                    $("#cmx-choose-mainunit").unbind("click");
                    $("#cmx-choose-mainunit").bind("click", function () {
                        $("#cmx-mainunit-list").off('shown.bs.modal');
                        $("#cmx-mainunit-list").on('shown.bs.modal', function () {
                            new cmx.process()
                                .turn('buildDataDic', {
                                    element: $('#cmx-province'),
                                    type: "select"
                                })
                                .cfinally(function () {
                                    // $('#' + data.columnindex + '-1').selectpicker({
                                    //     size: 'auto',
                                    //     style: 'btn-transparent',
                                    //     liveSearch: true
                                    // });
                                })
                                .start();

                            function getMainUnit() {
                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_aa + '/inst/aaArchaeologyunit/getDataByParam',
                                        data: JSON.stringify({
                                            token: getData('token'), //类型：String  必有字段  备注：无
                                            province: $("#cmx-province option:selected").val()
                                        }),
                                        success: function (result) {
                                            console.log(result);
                                        },
                                        type: 'POST'
                                    })
                                    .turn(function (prevModelData, send, abort) {
                                        console.log(prevModelData);
                                        $("#cmx-choosemainunit-list").html('');
                                        var data = prevModelData.data;
                                        var html = "";
                                        for (var i = 0; i < data.length; i++) {
                                            html = html + ['<tr>',
                                                '<td>' + (i + 1) + '</td>',
                                                '<td>' + data[i].unitName + '</td>',
                                                '<td>' + data[i].corpName + '</td>',
                                                '<td>' + data[i].contactName + '</td>',
                                                '<td>' + data[i].contactTel + '</td>',
                                                '</tr>'
                                            ].join("");
                                        }
                                        $("#cmx-choosemainunit-list").append(html);
                                        $("#cmx-choosemainunit-list tr").each(function (index) {
                                            var _self = $(this);
                                            $(this).unbind('click');
                                            $(this).bind('click', function () {
                                                $("#cmx-choosemainunit-list tr").each(function () {
                                                    $(this).removeClass("active");
                                                })
                                                _self.addClass("active");
                                                var unitName = data[index].unitName;
                                                var corpName = data[index].corpName;
                                                var unitAddress = data[index].unitAddress;
                                                $("#cmx-choosemainunit-confirm").unbind('click');
                                                $("#cmx-choosemainunit-confirm").bind('click', function () { //点击确认按钮后操作
                                                    console.log(data[index]);
                                                    $("#cmx-i-3").val(unitName);
                                                    $("#cmx-i-5").val(corpName);
                                                    $("#cmx-i-7").val(unitAddress);
                                                    cmx.g.applyUnitId = data[index].unitId;
                                                    cmx.g.provinces = data[index].province;
                                                    $("#cmx-mainunit-list").modal('hide');
                                                });

                                            });

                                        });

                                    })
                                    .start();
                            }
                            getMainUnit();
                            $("#cmx-search-mainunit").on('click', function () {
                                //获取单位列表
                                getMainUnit();
                            });
                        });
                        $("#cmx-mainunit-list").modal('show');
                    });
                });

                $("#P0017").append("<p><small>必须附加：1、遗址位置图 2、发掘地点在遗址的位置图 3、上传只支持jpeg、jpg、bmp、png、gif格式，大小不超过800M</small></p>");
                $("#P0018").append("<p><small>只可以上传pdf,doc文件，大小不超过800M，发掘类别为配合性发掘和抢救性发掘时必传</small></p>")
                $('#cmx-i-3').attr("disabled", "false");
                $('#P0018 .webuploader-pick').text('上传批文');
                // 领队之后的人更改申请表单
                $("#cmx-button-save").on("click", function () {
                    var temp_flag = checkFormLength('#cmx-form');
                    if (!temp_flag) {
                        return;
                    }
                    // if (!IsEmpty($('#cmx-i-45-1').val())) {
                    //     if ($('#cmx-i-45-1').val().length > 20) {
                    //         showAlert({
                    //             type: "info",
                    //             content: "文件号可填长度最大为20"
                    //         });
                    //         return;
                    //     }
                    // }
                    // var fileNumBack = $('#cmx-form #cmx-i-45-3').val();
                    // var re = /^[0-9]*$/;
                    // if (!IsEmpty(fileNumBack)) {
                    //     if (!re.test(fileNumBack)) {
                    //         showAlert({
                    //             type: "info",
                    //             content: "文件号可填项只能填数字"
                    //         });
                    //         return;
                    //     }
                    //     if (fileNumBack.length > 8) {
                    //         showAlert({
                    //             type: "info",
                    //             content: "文件号可填长度最大为8"
                    //         });
                    //         return;
                    //     }
                    // }
                    if ($('#cmx-i-10 textarea').val().length > 100) {
                        showAlert({
                            type: "info",
                            content: "具体地址可填最大长度为100"
                        });
                        return;
                    }
                    if (IsEmpty($("#cmx-i-3").val())) {
                        showAlert({
                            type: "info",
                            content: "主申请单位不能为空"
                        });
                        return;
                    }
                    if ($("#cmx-i-3").val().length > 200) {
                        showAlert({
                            type: "info",
                            content: "主申请单位可填最大长度为200"
                        });
                        return;
                    }
                    //主要业务人员清单
                    var eaAeNorWorkerList = [];
                    $("#cmx-person-list-tbody tr").each(function (index) {
                        eaAeNorWorkerList.push({
                            name: $(this).find('.cmx-name').val(), //主要业务人员姓名
                            sex: $(this).find(".cmx-sex").val(), //性别
                            birthday: $(this).find('.cmx-birthday').val(), //年龄
                            mainPosition: $(this).find('.cmx-workerPosition').val(), //职称
                            unitName: $(this).find('.cmx-workunit').val(), //工作单位
                            divideTheWork: $(this).find('.cmx-division').val() //业务分工
                        });
                    });
                    var _archaeological = [];
                    $("#cmx-i-11 input").each(function () {
                        if ($(this).is(':checked')) {
                            _archaeological.push($(this).val());
                        }
                    })
                    if(_archaeological.length == 0){
                        showAlert({
                            type: "info",
                            content: "遗址或墓葬时代不能为空"
                        });
                        return;
                    }
                    if(IsEmpty($('#cmx-i-13').find(':checked').val())){
                        showAlert({
                            type: "info",
                            content: "文物保护单位级别不能为空"
                        });
                        return;
                    }
                    if(IsEmpty($('#cmx-i-24').find(':checked').val())){
                        showAlert({
                            type: "info",
                            content: "发掘类别不能为空"
                        });
                        return;
                    }
                    if(IsEmpty($('#cmx-i-29').find(':checked').val())){
                        showAlert({
                            type: "info",
                            content: "经费来源不能为空"
                        });
                        return;
                    }
                    if($('#cmx-i-24').find(':checked').val() == 'B' || $('#cmx-i-24').find(':checked').val() == 'C'){
                        if(IsEmpty(getFileListForSave(cmx.g.filelinkfileclass,'98')[0].fileindex)){
                            showAlert({
                                type: "info",
                                content: "发掘类别为配合性发掘和抢救性发掘时批文工作方案不能为空"
                            });
                            return;
                        }
                    }
                    var formData = [{
                        applyUnitId: cmx.g.applyUnitId, //$("#cmx-i-3").val(), //主申请单位ID
                        applyUnitName: $("#cmx-i-3").val(), //主申请单位
                        //provinces: cmx.g.provinces, //主申请单位省份
                        provinces: $("#cmx-i-10 .province").find("option:selected").attr('data-code').substr(0, 2),
                        leUnitName: $("#cmx-i-4").val(), //配合申请单位名称
                        leUnitID: $("#cmx-i-4").val(), //配合申请单位ID
                        corpName: $("#cmx-i-5").val(), //主申请单位法定代表人
                        applyDate: $("#cmx-i-6").val(), //申请时间
                        unitAddress: $("#cmx-i-7").val(), //发掘单位地址
                        projectName: $("#cmx-i-9").val(), //发掘对象名称
                        objProvince: $("#cmx-i-10 .province").find("option:selected").attr('data-code'), //省 发掘省份
                        state: $("#cmx-i-10 .city").find("option:selected").attr('data-code'), //地市
                        country: $("#cmx-i-10 .area").find("option:selected").attr('data-code'), //区县
                        specLocation: $("#cmx-i-10 textarea").val(), //具体地址
                        archaeological: _archaeological.join(','), //考古时代
                        digHistory: $("#cmx-i-12").val(), //历年发掘情况
                        relicUnitRank: $('#cmx-i-13').find(':checked').val(), //文物保护单位级别
                        yeReCondition: $("#cmx-i-14").val(), //考古发掘报告、简报整理出版情况 年度报告完成情况	
                        digSpecLocation: $("#cmx-i-16").val(), //发掘地点具体位置
                        mapSign: $("#cmx-i-20").val() + "," + $("#cmx-i-21").val(), //发掘地点经纬度发掘地点地图标注
                        digType: $('#cmx-i-24').find(':checked').val(), //发掘类别
                        digGoal: $("#cmx-i-25").val(), //发掘目的及工作方案
                        beginTime: $("#date-start").val(), //发掘时间（开始）
                        finishTime: $("#date-end").val(), //发掘时间（结束）
                        digArea: $("#cmx-i-27").val(), //发掘面积
                        toNumber: $("#cmx-i-28").val(), //墓葬数量
                        fundSources: $('#cmx-i-29').find(':checked').val(), //经费来源
                        sum: $("#cmx-i-30").val(), //金额总计(单位:万元)
                        tecMeaProtect: $("#cmx-i-32").val(), //保护技术准备
                        remark: $("#cmx-i-43").val(), //备注  附属信息
                        projectNum: "56008_b",

                        // fileNumFront: $("#cmx-i-45-1").val(), //省文件号前
                        // fileNumMidd: $("#cmx-i-45-2").val(), //省文件号中
                        // fileNumBack: $("#cmx-i-45-3").val(), //省文件号后
                        contactName: $("#cmx-i-46").val(), //联系人
                        // proFileTitle: $("#cmx-i-47").val(), //省文件标题
                        contactTel: $("#cmx-i-48").val(), //联系电话
                        publishType: "9",

                        leaderName: $("#lead-name").val(),
                        leaderId: $("#lead-number").val(),
                        sex: $("#lead-sex").val(),
                        birthdate: $("#lead-birthday").val(),
                        mainPosition: $("#lead-major").val(),
                        profession: $("#lead-academic").val(),
                        achiProfession: $("#lead-experience").val(),

                        files: getFileListForSave(cmx.g.filelinkfileclass),
                        eaAeNorWorkerList: eaAeNorWorkerList,
                        applyId: cmx.g.applyId
                    }];
                    var saveUrl = api_ea + '/eaAeAcpNorApply/saveprocessInstanceId';
                    if (typeof noCounterpart != 'undefined' && noCounterpart === true) {
                        saveUrl = api_ea + '/eaAeAcpNorApply/saveEaAeAcpNorApplyNow';
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: saveUrl,
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                ipaFormData: formData
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (prevModelData.state == '200') {
                                showAlert({
                                    type: "success",
                                    content: "保存成功"
                                });
                                cmx.g.applyId = prevModelData.data.applyId;
                            }
                        })
                        .start();
                });
                $("#cmx-button-send").on("click", function () {
                    var temp_flag = checkFormLength('#cmx-form');
                    if (!temp_flag) {
                        return;
                    }
                    // if (!IsEmpty($('#cmx-i-45-1').val())) {
                    //     if ($('#cmx-i-45-1').val().length > 20) {
                    //         showAlert({
                    //             type: "info",
                    //             content: "文件号可填长度最大为20"
                    //         });
                    //         return;
                    //     }
                    // }
                    // var fileNumBack = $('#cmx-form #cmx-i-45-3').val();
                    // var re = /^[0-9]*$/;
                    // if (!IsEmpty(fileNumBack)) {
                    //     if (!re.test(fileNumBack)) {
                    //         showAlert({
                    //             type: "info",
                    //             content: "文件号可填项只能填数字"
                    //         });
                    //         return;
                    //     }
                    //     if (fileNumBack.length > 8) {
                    //         showAlert({
                    //             type: "info",
                    //             content: "文件号可填长度最大为8"
                    //         });
                    //         return;
                    //     }
                    // }
                    if ($('#cmx-i-10 textarea').val().length > 100) {
                        showAlert({
                            type: "info",
                            content: "具体地址可填最大长度为100"
                        });
                        return;
                    }
                    if (IsEmpty($("#cmx-i-3").val())) {
                        showAlert({
                            type: "info",
                            content: "主申请单位不能为空"
                        });
                        return;
                    }
                    if ($("#cmx-i-3").val().length > 200) {
                        showAlert({
                            type: "info",
                            content: "主申请单位可填最大长度为200"
                        });
                        return;
                    }
                    //主要业务人员清单
                    var eaAeNorWorkerList = [];
                    $("#cmx-person-list-tbody tr").each(function (index) {
                        eaAeNorWorkerList.push({
                            name: $(this).find('.cmx-name').val(), //主要业务人员姓名
                            sex: $(this).find(".cmx-sex").val(), //性别
                            birthday: $(this).find('.cmx-birthday').val(), //年龄
                            mainPosition: $(this).find('.cmx-workerPosition').val(), //职称
                            unitName: $(this).find('.cmx-workunit').val(), //工作单位
                            divideTheWork: $(this).find('.cmx-division').val() //业务分工
                        });
                    });
                    var _archaeological = [];
                    $("#cmx-i-11 input").each(function () {
                        if ($(this).is(':checked')) {
                            _archaeological.push($(this).val());
                        }
                    })
                    if(_archaeological.length == 0){
                        showAlert({
                            type: "info",
                            content: "遗址或墓葬时代不能为空"
                        });
                        return;
                    }
                    if(IsEmpty($('#cmx-i-13').find(':checked').val())){
                        showAlert({
                            type: "info",
                            content: "文物保护单位级别不能为空"
                        });
                        return;
                    }
                    if(IsEmpty($('#cmx-i-24').find(':checked').val())){
                        showAlert({
                            type: "info",
                            content: "发掘类别不能为空"
                        });
                        return;
                    }
                    if(IsEmpty($('#cmx-i-29').find(':checked').val())){
                        showAlert({
                            type: "info",
                            content: "经费来源不能为空"
                        });
                        return;
                    }
                    if($('#cmx-i-24').find(':checked').val() == 'B' || $('#cmx-i-24').find(':checked').val() == 'C'){
                        if(IsEmpty(getFileListForSave(cmx.g.filelinkfileclass,'98')[0].fileindex)){
                            showAlert({
                                type: "info",
                                content: "发掘类别为配合性发掘和抢救性发掘时批文工作方案不能为空"
                            });
                            return;
                        }
                    }
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaAeAcpNorApply/sendEaAeAcpNorApply',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                ipaFormData: [{
                                    applyUnitId: cmx.g.applyUnitId, //$("#cmx-i-3").val(), //主申请单位ID
                                    applyUnitName: $("#cmx-i-3").val(), //主申请单位
                                    //provinces: cmx.g.provinces, //主申请单位省份
                                    provinces: $("#cmx-i-10 .province").find(":selected").attr('data-code').substr(0, 2),
                                    leUnitName: $("#cmx-i-4").val(), //配合申请单位名称
                                    leUnitID: $("#cmx-i-4").val(), //配合申请单位ID
                                    corpName: $("#cmx-i-5").val(), //主申请单位法定代表人
                                    applyDate: $("#cmx-i-6").val(), //申请时间
                                    unitAddress: $("#cmx-i-7").val(), //发掘单位地址
                                    projectName: $("#cmx-i-9").val(), //发掘对象名称
                                    objProvince: $("#cmx-i-10 .province").find("option:selected").attr('data-code'), //省 发掘省份
                                    state: $("#cmx-i-10 .city").find("option:selected").attr('data-code'), //地市
                                    country: $("#cmx-i-10 .area").find("option:selected").attr('data-code'), //区县
                                    specLocation: $("#cmx-i-10 textarea").val(), //具体地址
                                    archaeological: _archaeological.join(','), //考古时代
                                    digHistory: $("#cmx-i-12").val(), //历年发掘情况
                                    relicUnitRank: $('#cmx-i-13').find(':checked').val(), //文物保护单位级别
                                    yeReCondition: $("#cmx-i-14").val(), //考古发掘报告、简报整理出版情况 年度报告完成情况	
                                    digSpecLocation: $("#cmx-i-16").val(), //发掘地点具体位置
                                    mapSign: $("#cmx-i-20").val() + "," + $("#cmx-i-21").val(), //发掘地点经纬度发掘地点地图标注
                                    digType: $('#cmx-i-24').find(':checked').val(), //发掘类别
                                    digGoal: $("#cmx-i-25").val(), //发掘目的及工作方案
                                    beginTime: $("#date-start").val(), //发掘时间（开始）
                                    finishTime: $("#date-end").val(), //发掘时间（结束）
                                    digArea: $("#cmx-i-27").val(), //发掘面积
                                    toNumber: $("#cmx-i-28").val(), //墓葬数量
                                    fundSources: $('#cmx-i-29').find(':checked').val(), //经费来源
                                    sum: $("#cmx-i-30").val(), //金额总计(单位:万元)
                                    tecMeaProtect: $("#cmx-i-32").val(), //保护技术准备
                                    remark: $("#cmx-i-43").val(), //备注  附属信息
                                    projectNum: "56008_b",
                                    // fileNumFront: $("#cmx-i-45-1").val(), //省文件号前
                                    // fileNumMidd: $("#cmx-i-45-2").val(), //省文件号中
                                    // fileNumBack: $("#cmx-i-45-3").val(), //省文件号后
                                    contactName: $("#cmx-i-46").val(), //联系人
                                    // proFileTitle: $("#cmx-i-47").val(), //省文件标题
                                    contactTel: $("#cmx-i-48").val(), //联系电话
                                    publishType: "9",

                                    leaderName: $("#lead-name").val(),
                                    leaderID: $("#lead-number").val(),
                                    sex: $("#lead-sex").val(),
                                    birthdate: $("#lead-birthday").val(),
                                    mainPosition: $("#lead-major").val(),
                                    profession: $("#lead-academic").val(),
                                    achiProfession: $("#lead-experience").val(),

                                    applyId: cmx.g.applyId,
                                    files: getFileListForSave(cmx.g.filelinkfileclass),
                                    eaAeNorWorkerList: eaAeNorWorkerList,
                                }]
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (prevModelData.state == '200') {
                                showAlert({
                                    type: "success",
                                    content: "发送成功"
                                });
                                setTimeout(function () {
                                    window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid=" + GetUrlParamString('nowid');
                                }, 1000);
                            }
                        })
                        .start();
                });
                // 主要人员添加行
                $("#addrow").unbind("click");
                $("#addrow").bind("click", function () {
                    count = count + 1;
                    var tr_html = ['<tr>',
                        '<td><input type="checkbox" name="cmx-row-1"></td>',
                        '<td><input type="text" class="form-control cmx-name" placeholder="姓名"></td>',
                        '<td><div class="cmx-form-body" style="margin:0;padding:0" ><select class="form-control cmx-sex" data-dic="Sex" id="selectSex-' + count + '" name="">',
                        '</select></div></td>',
                        '<td><input type="text" class="form-control cmx-birthday" data-plug="datepicker" data-language="zh-CN" id="birthday-' + count + '"></td>',
                        '<td><div class="cmx-form-body" style="margin:0;padding:0" ><select class="form-control cmx-workerPosition" data-dic="WorkerPosition" id="selectWorkerPosition-' + count + '" name="">',
                        '</select></div></td>',
                        '<td><input type="text" class="form-control cmx-workunit" placeholder="工作单位"></td>',
                        '<td><input type="text" class="form-control cmx-division" placeholder="业务分工"></td>',
                        '</tr>',
                    ].join('');
                    $("#cmx-person-list-tbody").append(tr_html);

                    new cmx.process()
                        .turn('buildDataDic', {
                            element: $('#selectSex-' + count),
                            defaultValue: 1
                        }).cfinally(function () {}).start();

                    $('#birthday-' + count).datepicker({ //日期控件
                        language: 'zh-CN',
                        autoclose: true, //选择之后是否关闭日期选项
                        todayHighlight: true, //当为true的时候高亮
                        keyboardNavigation: true,
                        format: 'yyyy-mm-dd',
                    });

                    new cmx.process()
                        .turn('buildDataDic', {
                            element: $('#selectWorkerPosition-' + count)
                        }).cfinally(function () {}).start();

                });
                // 主要工作人员删除行
                $("#deleterow").unbind("click");
                $("#deleterow").bind("click", function () {
                    $('#cmx-person-list-tbody input[type="checkbox"]').each(function () {
                        if ($(this).is(":checked")) {
                            $(this).parent().parent().remove();
                        }
                    });
                });
            }, 500);
        })
        .turn('callajax', {
            url: api_ea + '/eaAeAcpNorApply/getEntityByPKAndPNum',
            type: 'POST'
        })
        .turn('build56008bInput', {
            isEdit: GetUrlParamString('isedit') === '0' || GetUrlParamString('from') == 'app' || GetUrlParamString('from') == 'iframe'
        })
        .turn('buildFileList', {
            projectNum: _projectNum
        })
        .turn(function (prevModelData, send, abort) {
            //考古申请里有一些申请项不可编辑
            $("#cmx-i-2").attr('readonly', 'readonly');
            $("#cmx-i-2").attr('disabled', 'disabled');
            $("#lead-name").attr('readonly', 'readonly');
            $("#lead-name").attr('disabled', 'disabled');
            $("#lead-number").attr('readonly', 'readonly');
            $("#lead-number").attr('disabled', 'disabled');
           // $("#lead-sex").attr('readonly', 'readonly');
            $("#lead-sex").attr('disabled', true);
            $("#lead-birthday").attr('readonly', 'readonly');
            $("#lead-birthday").attr('disabled', 'disabled');
            $("#lead-major").attr('readonly', 'readonly');
            $("#lead-major").attr('disabled', 'disabled');
            $("#lead-academic").attr('readonly', 'readonly');
            $("#lead-academic").attr('disabled', 'disabled');
            $("#lead-connecttel").attr('readonly', 'readonly');
            $("#lead-connecttel").attr('disabled', 'disabled');
        })
        .start();

});

//主申请单位，从后台取
function cmx_special_2(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-xs-9 cmx-special-provincefile"><input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-xs-3"><button id="cmx-choose-mainunit" class="btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}
//地图
function cmx_special_4(data) {
    var html = [
        '<div class="col-sm-12 col-md-12 col-lg-12">',
        '<div id="map"></div>',
        '<p>备注：选中位置后如需更改请拖动红标</p>',
        '</div>'
    ].join("");

    $("#cmx-special-" + data.serialnumber).append(html);
    var map = new BMap.Map("map");
    var point = new BMap.Point(116.404, 39.915);
    setTimeout(function () {
        if (!IsNull(jingdu) || !IsNull(weidu)) {
            // 获取原收文后取得经纬度，在地图中画点
            point = new BMap.Point(parseFloat(jingdu), parseFloat(weidu));
            var marker = new BMap.Marker(point); // 创建标注
            map.centerAndZoom(point, 12);
            map.enableScrollWheelZoom();
            map.addOverlay(marker)
            map.panTo(point);
            map.addEventListener("click", function (e) {
                map.clearOverlays();
                $("#cmx-i-20").val(e.point.lng.toFixed(3));
                $("#cmx-i-21").val(e.point.lat.toFixed(3));
                marker.addEventListener("dragend", function (e) {
                    $("#cmx-i-20").val(e.point.lng.toFixed(3));
                    $("#cmx-i-21").val(e.point.lat.toFixed(3));
                });
                var marker_3 = new BMap.Marker(e.point)
                map.enableScrollWheelZoom();
                map.addOverlay(marker_3); // 将标注添加到地图中
                marker.enableDragging(); // 可拖拽  
            });
        } else {
            //从申请页面第一次进来后，在地图上画点
            map.clearOverlays();
            map.addEventListener("click", function (e) {
                map.clearOverlays();
                point = new BMap.Point(e.point.lng, e.point.lat);
                var marker = new BMap.Marker(point); // 创建标注
                $("#cmx-i-20").val(e.point.lng.toFixed(3));
                $("#cmx-i-21").val(e.point.lat.toFixed(3));
                marker.addEventListener("dragend", function (e) {
                    $("#cmx-i-20").val(e.point.lng.toFixed(3));
                    $("#cmx-i-21").val(e.point.lat.toFixed(3));
                });
                map.enableScrollWheelZoom();
                map.addOverlay(marker); // 将标注添加到地图中
                marker.enableDragging(); // 可拖拽  
            });

        }
        //输入坐标后地图上标注
        $("#cmx-i-20").off("blur");
        $("#cmx-i-20").on("blur", function () {
            if (IsEmpty($("#cmx-i-20").val()) || IsEmpty($("#cmx-i-21").val())) {
                return;
            }
            if (!IsEmpty($("#cmx-i-20").val()) && !IsEmpty($("#cmx-i-21").val())) {
                if (!IsNum(parseFloat($("#cmx-i-20").val())) || !IsNum(parseFloat($("#cmx-i-21").val()))) {
                    showAlert({
                        type: "error",
                        content: "请填写正确的经纬度"
                    });
                    return;
                }
            }
            map.clearOverlays();
            var point_1 = new BMap.Point(parseFloat($("#cmx-i-20").val()), parseFloat($("#cmx-i-21").val()));
            var marker_1 = new BMap.Marker(point_1); // 创建标注
            map.centerAndZoom(point_1, 12);
            map.enableScrollWheelZoom();
            map.addOverlay(marker_1); // 将标注添加到地图中
            marker_1.enableDragging(); // 不可拖拽  
        });
        $("#cmx-i-21").off("blur");
        $("#cmx-i-21").on("blur", function () {
            if (IsEmpty($("#cmx-i-20").val()) || IsEmpty($("#cmx-i-21").val())) {
                return;
            }
            if (!IsEmpty($("#cmx-i-20").val()) && !IsEmpty($("#cmx-i-21").val())) {
                if (!IsNum(parseFloat($("#cmx-i-20").val())) || !IsNum(parseFloat($("#cmx-i-21").val()))) {
                    showAlert({
                        type: "error",
                        content: "请填写正确的经纬度"
                    });
                    return;
                }
            }
            map.clearOverlays();
            var point_2 = new BMap.Point(parseFloat($("#cmx-i-20").val()), parseFloat($("#cmx-i-21").val()));
            var marker_2 = new BMap.Marker(point_2); // 创建标注
            map.centerAndZoom(point_2, 12);
            map.enableScrollWheelZoom();
            map.addOverlay(marker_2); // 将标注添加到地图中
            marker_2.enableDragging(); // 不可拖拽  
        });
    }, 2000);
    map.centerAndZoom(point, 12);
    //单击获取点击的经纬度

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            map.panTo(r.point);
            // alert('您的位置：'+r.point.lng+','+r.point.lat);
            // map.centerAndZoom(r, 12);            
        } else {
            alert('failed' + this.getStatus());
        }
    }, {
        enableHighAccuracy: true
    });
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    var size = new BMap.Size(10, 20);
    // 更改城市后在地图上画点
    map.addControl(new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        // 切换城市之间事件
        onChangeBefore: function () {

        },
        // 切换城市之后事件
        onChangeAfter: function () {
            map.clearOverlays();
            $("#cmx-i-20").val('');
            $("#cmx-i-21").val('');
            map.addEventListener("click", function (e) {
                map.clearOverlays();
                var point = new BMap.Point(e.point.lng, e.point.lat);
                $("#cmx-i-20").val(e.point.lng.toFixed(3));
                $("#cmx-i-21").val(e.point.lat.toFixed(3));
                var marker = new BMap.Marker(point); // 创建标注
                marker.addEventListener("dragend", function (e) {
                    $("#cmx-i-20").val(e.point.lng.toFixed(3));
                    $("#cmx-i-21").val(e.point.lat.toFixed(3));
                });
                map.enableScrollWheelZoom();
                map.addOverlay(marker); // 将标注添加到地图中
                marker.enableDragging(); // 不可拖拽  
            });
        }
    }));

}
//发掘时间
function cmx_special_5(data) {
    var html = [
        '<div class="row">',
        '<div class="col-sm-9 col-md-9 col-lg-9">',
        '<div class="input-daterange" data-language="zh-CN">',
        '<div class="input-group">',
        '<span class="input-group-addon">',
        '<i class="icon wb-calendar" aria-hidden="true"></i>',
        '</span>',
        '<input type="text" class="form-control" name="start" id="date-start" placeholder="发掘时间（开始）">',
        '</div>',
        '<div class="input-group">',
        '<span class="input-group-addon"> 至 </span>',
        '<input type="text" class="form-control" name="end" id="date-end" placeholder="发掘时间（结束）">',
        '</div>',
        '</div>',
        '</div>',
        '<div class="col-sm-3 col-md-3 col-lg-3">',
        '<span>共计<span id="summonth"></span>个月</span>',
        '</div>',
        '</div>'
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
    var d = new Date();
    var now_year = d.getFullYear();
    $("#cmx-special-" + data.serialnumber).find('.input-daterange').datepicker({ //日期控件
        language: 'zh-CN',
        autoclose: true, //选择之后是否关闭日期选项
        todayHighlight: true, //当为true的时候高亮
        keyboardNavigation: true,
        format: 'yyyy-mm-dd',
        startDate: now_year + "-01-01",
        endDate: (parseInt(now_year) + 1) + "-01-31"
    }).on('changeDate', function (ev) {
        // 计算发掘起止时间的间隔，在页面上显示
        var summonth;
        var date_start = datetime_to_unix($("#date-start").val() + ' 00:00:00');
        var date_end = datetime_to_unix($("#date-end").val() + ' 00:00:00');
        summonth = Math.ceil((date_end - date_start) / 24 / 60 / 30 / 60);
        var html = ['' + summonth + ''].join("");
        $("#summonth").html(html);
    });
}
//展示领队信息
function cmx_special_6(data) {
    var html = [
        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '领队姓名</label>',
        '<div class="col-sm-9">',
        '<input type="text" class="form-control" id="lead-name" name="lead-name" placeholder="" value="">',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '编号</label>',
        '<div class="col-sm-9">',
        '<input type="text" class="form-control" id="lead-number" name="lead-number" placeholder="" value="">',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '性别</label>',
        '<div class="col-sm-9">',
        '<div class="cmx-form-body" style="margin:0;padding:0"><select class="form-control" data-dic="Sex"  id="lead-sex" name="lead-sex">',
        '</select></div>',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '出生年月</label>',
        '<div class="col-sm-9">',
        '<input type="text" class="form-control" id="lead-birthday" name="lead-birthday" placeholder="" value="">',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '专业职称</label>',
        '<div class="col-sm-9">',
        '<div class="cmx-form-body" style="margin:0;padding:0" ><select class="form-control" data-dic="LeaderPosition"  id="lead-major" name="lead-major">',
        '</select></div>',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '学术专长</label>',
        '<div class="col-sm-9">',
        '<input type="text" class="form-control" id="lead-academic" name="lead-academic" placeholder="" value="">',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-6 col-xs-6 col-md-6 col-lg-6">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-3">',
        '联系方式</label>',
        '<div class="col-sm-9">',
        '<input type="text" class="form-control" id="lead-connecttel" name="lead-connecttel" placeholder="" value="">',
        '</div></div></div>',

        '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-12 col-lg-12">',
        '<div class="form-group margin-left-0 baseinfo">',
        '<label class="control-label col-sm-2">',
        '相关领域的学术成果和业务经历</label>',
        '<div class="col-sm-8">',
        '<textarea class="form-control" id="lead-experience" name="lead-experience" placeholder="相关领域的学术成果和业务经历" value=""></textarea>',

        '</div><div class="col-sm-2"><button id="cmx-lead-update" class="btn btn-primary">提交更新信息</button></div></div></div>',
    ].join("");
    $("#cmx-form").append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#lead-sex'),
        }).cfinally(function () {}).start();
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#lead-major'),
            hasEmpty: true
        }).cfinally(function () {}).start();
}

function clearAll() {
    for (var i = 0; i < overlays.length; i++) {
        map.removeOverlay(overlays[i]);
    }
    overlays.length = 0;
}
// 获取待办详情后构架表单
cmx.route.model({
    index: 'build56008bInput',
    handle: function (parameter, prevModelData, send, abort) {

        console.log(prevModelData);
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = '';
            var eaAeNorWorkerList = '';
            if (IsEmpty(prevModelData.data.hisVersion)) {
                data = prevModelData.data.orgVersion;
                eaAeNorWorkerList = data.eaAeNorWorkerList;
            } else {
                data = prevModelData.data.hisVersion;
                eaAeNorWorkerList = data.eaAeNorWorkerHisList;
            }
            console.log(data);
            var arr = [];
            arr = data.mapSign.split(',');
            jingdu = arr[0];
            weidu = arr[1];
            console.log(jingdu)
            $("#cmx-person-list-tbody").html('');
            for (var i = 0; i < eaAeNorWorkerList.length; i++) {
                count = count + 1;
                var tr_html = ['<tr>',
                    '<td><input type="checkbox" name="cmx-row-1"></td>',
                    '<td><input type="text" class="form-control cmx-name" value="' + eaAeNorWorkerList[i].name + '"></td>',
                    '<td><div class="cmx-form-body" style="margin:0;padding:0" ><select class="form-control cmx-sex" data-dic="Sex" id="selectSex-' + count + '" name="">',
                    '</select></div></td>',
                    '<td><input type="text" class="form-control cmx-birthday" data-plug="datepicker" data-language="zh-CN" id="birthday-' + count + '" value="' + eaAeNorWorkerList[i].birthday + '"></td>',
                    '<td><div class="cmx-form-body" style="margin:0;padding:0" ><select class="form-control cmx-workerPosition" data-dic="WorkerPosition" id="selectWorkerPosition-' + count + '" name="">',
                    '</select></div></td>',
                    '<td><input type="text" class="form-control cmx-workunit" value="' + eaAeNorWorkerList[i].unitName + '"></td>',
                    '<td><input type="text" class="form-control cmx-division" value="' + eaAeNorWorkerList[i].divideTheWork + '"></td>',
                    '</tr>',
                ].join('');
                var aaa = eaAeNorWorkerList[i];
                $("#cmx-person-list-tbody").append(tr_html);
                new cmx.process()
                    .turn('buildDataDic', {
                        element: $('#selectSex-' + count),
                        defaultValue: aaa.sex
                    }).cfinally(function () {

                    }).start();
                new cmx.process()
                    .turn('buildDataDic', {
                        element: $('#selectWorkerPosition-' + count),
                        defaultValue: aaa.mainPosition
                    }).cfinally(function () {

                    }).start();
                $('#birthday-' + count).datepicker({ //日期控件
                    language: 'zh-CN',
                    autoclose: true, //选择之后是否关闭日期选项
                    todayHighlight: true, //当为true的时候高亮
                    keyboardNavigation: true,
                    format: 'yyyy-mm-dd',
                });

                new cmx.process()
                    .turn('buildDataDic', {
                        element: $('#selectWorkerPosition-' + count),
                        defaultValue: aaa.mainPosition
                    }).cfinally(function () {

                    }).start();
            }
            cmx.g.applyUnitId = data.applyUnitId;
            cmx.g.provinces = data.provinces;
            // $("#cmx-i-3").val(data.applyUnitID); //主申请单位ID
            $("#cmx-i-2").val(data.archNumber);
            $("#cmx-i-3").val(data.applyUnitName); //主申请单位
            $("#cmx-i-4").val(data.leUnitName); //配合申请单位名称
            // $("#cmx-i-4").val(data.leUnitID); //配合申请单位ID
            $("#cmx-i-5").val(data.corpName); //主申请单位法定代表人
            $("#cmx-i-6").val(data.applyDate); //申请时间
            $("#cmx-i-7").val(data.unitAddress); //发掘单位地址
            $("#cmx-i-9").val(data.projectName); //发掘对象名称
            setTimeout(function () {
                $("#cmx-i-10 .province").find("option[data-code='" + data.objProvince + "']").attr("selected", true).trigger("change"); //省代码 发掘省份
                $("#cmx-i-10 .city").find("option[data-code='" + data.state + "']").attr("selected", true).trigger("change"); //地市代码
                $("#cmx-i-10 .area").find("option[data-code='" + data.country + "']").attr("selected", true).trigger("change"); //区县代码  
            }, 2000)
            $("#cmx-i-10 textarea").val(data.specLocation); //具体地址
            //$("#cmx-i-11 option[value='" + data.archaeological + "']").attr("selected", "selected"); //考古时代
            if(!IsEmpty(data.archaeological)){
                var _archaeological = data.archaeological.split(',');
                for (var k = 0; k < _archaeological.length; k++) {
                    $('#cmx-i-11 input').each(function () { //文物保护单位级别
                        if ($(this).val() == _archaeological[k]) {
                            $(this).iCheck('check');
                        }
                    })
                }
            }
            $("#cmx-i-12").val(data.digHistory); //历年发掘情况
            
            $('#cmx-i-13 input').each(function () { //文物保护单位级别
                if ($(this).val() == data.relicUnitRank) {
                    $(this).iCheck('check');
                }
            })
            $("#cmx-i-14").val(data.yeReCondition); //考古发掘报告、简报整理出版情况 年度报告完成情况	
            $("#cmx-i-16").val(data.digSpecLocation); //发掘地点具体位置
            // mapSign: $("#cmx-i-20").val() + ";" + $("#cmx-i-21").val(); //发掘地点经纬度发掘地点地图标注
            $("#cmx-i-20").val(jingdu);
            $("#cmx-i-21").val(weidu);
            $('#cmx-i-24 input').each(function () { //发掘类别
                if ($(this).val() == data.digType) {
                    $(this).iCheck('check');
                }
            })
            $("#cmx-i-25").val(data.digGoal); //发掘目的及工作方案
            $("#date-start").val(data.beginTime); //发掘时间（开始）
            $("#date-end").val(data.finishTime); //发掘时间（结束）
            $("#cmx-i-27").val(data.digArea); //发掘面积
            $("#cmx-i-28").val(data.toNumber); //墓葬数量
            $('#cmx-i-29 input').each(function () { //经费来源
                if ($(this).val() == data.fundSources) {
                    $(this).iCheck('check');
                }
            })
            $("#cmx-i-30").val(data.sum); //金额总计(单位:万元)
            $("#cmx-i-32").val(data.tecMeaProtect); //保护技术准备

            // $("#cmx-i-45-1").val(data.fileNumFront); //省文件号前
            // // $("#cmx-i-45-2 option[value='" + data.fileNumMidd + "']").attr("selected", true);
            // $("#cmx-i-45-2").val(data.fileNumMidd);
            // $("#cmx-i-45-3").val(data.fileNumBack); //省文件号后
            $("#cmx-i-46").val(data.contactName).attr('readonly', true); //联系人
            // $("#cmx-i-47").val(data.proFileTitle); //省文件标题
            $("#cmx-i-48").val(data.contactTel); //联系电话
            $("#cmx-i-43").val(data.remark); //备注  附属信息

            $("#lead-name").val(data.leaderName);
            $("#lead-sex option[value='" + data.sex + "']").attr("selected", "selected");
            $("#lead-number").val(data.leaderId);
            $("#lead-birthday").val(data.birthdate);
            $("#lead-major option[value='" + (IsEmpty(data.mainPosition) ? (-1) : data.mainPosition) + "']").attr("selected", "selected");
            $("#lead-academic").val(data.profession);
            $("#lead-experience").val(data.achiProfession);
            $('#lead-connecttel').val(data.contactTel);

            var date_start = datetime_to_unix(data.beginTime + ' 00:00:00');
            var date_end = datetime_to_unix(data.finishTime + ' 00:00:00');
            var summonth = Math.ceil((date_end - date_start) / 24 / 60 / 30 / 60);
            if (summonth) {
                var html = ['' + summonth + ''].join("");
                $("#summonth").html(html);
            }
            var isEdit = parameter.isEdit;
            if (isEdit) {

                $("#map").hide();
                hideElement();
            }
        }
        send.go();
    }
});

function func_special_personList(data) {
    var html = [
        '<div class="cmx-form-body col-sm-12 col-xs-12 col-md-' + data.width + ' col-lg-' + data.width + '">',
        '<div class="cmx-personList">',
        '<button id="addrow" class="margin-right-10 margin-bottom-10 btn btn-primary">添加行</button>',
        '<button id="deleterow" class="margin-bottom-10 btn btn-primary">删除行</button>',
        '<div class="table-responsive margin-top-10 text-nowrap">',
        '<table class="table table-bordered">',
        '<thead>',
        '<tr>',
        '<th></th>',
        '<th style="width:10%;">姓名</th>',
        '<th>性别</th>',
        '<th style="width:12%;">出生年月</th>',
        '<th>专业职称</th>',
        '<th>工作单位</th>',
        '<th>业务分工</th>',
        '</tr>',
        '</thead>',
        '<tbody id="cmx-person-list-tbody"></tbody>',
        '</table>',
        '</div>',
        '</div>',
        '</div>'
    ].join("");
    $("#cmx-form").append(html);
}

function cmx_special_010(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<div class="radio-content" data-dic="ExcavateType" id="' + data.columnindex + '">',
        '</div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            type: 'single'
        }).cfinally(function () {}).start();
}

function cmx_special_011(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<div class="radio-content" data-dic="AEFundsSource" id="' + data.columnindex + '">',
        '</div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            type: 'single'
        }).cfinally(function () {}).start();
}

function cmx_special_012(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<div class="radio-content" data-dic="AEPortectLevel" id="' + data.columnindex + '">',
        '</div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            type: 'single'
        }).cfinally(function () {}).start();
}

function cmx_special_013(data) {
    var html = [
        '<div class="col-sm-12 col-xs-12 col-md-12 col-lg-12" style="margin:0;padding:0" >',
        '<div class="radio-content" data-dic="ArchaeologyYear" id="' + data.columnindex + '">',
        '</div>',
        '</div>'
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
    new cmx.process()
        .turn('buildDataDic', {
            element: $('#' + data.columnindex + ''),
            type: 'mutil'
        }).cfinally(function () {}).start();
}

function shouYuanshouwen() {

}

function isString(value) {
    return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}