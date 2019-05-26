/*
 * @Author: lvjinxiu 
 * @Date: 2017-12-13 20:12:57 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-13 16:31:48
 */
'use strict';
if (getData('role') == 'bowuguan') {
    var get56016ProjectData = public_url + 'data/app/f-gover-approval/56016/56016-x.json';
} else {
    var get56016ProjectData = public_url + 'data/app/f-gover-approval/56016/56016-s.json';
}
var get56016DetailModal = public_url + 'app/f-gover-approval/56016/include/56016-relic-detail-modal.html';
var get56016cDetailFormData = public_url + 'data/app/f-gover-approval/56016/relic-detail.json';
var _projectType = '4';
var _projectNum = '56016';
var _isCollection = 0;

$(document).ready(function () {
    $('#cmx-qingmaojun-back').on('click', function () {
        history.go(-1);
    });
    cmx.g.applyId = GetUrlParamString('applyId');
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/business/getApplicantAccClass',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                })
            })
            .turn(function (prevModelData, send, abort) {
                if (prevModelData.state == '200') {
                    if (prevModelData.data.accClass == '14') {
                        get56016ProjectData = public_url + 'data/app/f-gover-approval/56016/56016-x.json';
                    } else {
                        get56016ProjectData = public_url + 'data/app/f-gover-approval/56016/56016-s.json';
                    }
                } else {
                    showAlert({
                        type: 'error',
                        content: '申请人信息获取失败'
                    });
                }
            })
            .start();
    }
    //构建表单
    CreateApplicationForm({
        "url": get56016ProjectData,
        "element": "#cmx-form"
    });

    if (getData('role') != 'province') {
        $("#cmx-form #cmx-i-7").val(getData('userName')).attr('readonly', 'readonly');
    }
    cmx.g.museumName = getData('userName');
    cmx.g.museumId = getData('userId');
    $('#cmx-form .required-tag').each(function () {
        var text = $(this).find('.control-label').text();
        $(this).find('.control-label').html('<span class="cmx-build-form-notnull">*</span>' + text);
    })

    new cmx.process().
    turn('initFiles', {
        'P0030': '34',
        'P0031': '35',
        'P0032': '36',
        'P0014': '37',
        'P0015': '38',
        'P0016': '39',
        'P0017': '40',
        'P0018': '41',
        'P0019': '42',
        'P0020': '43',
        'P0021': '44',
        'P0022': '45',
        'S0017': '99'
    }).start();
    $('#cmx-menu')
        .jstree({
            'core': {
                'multiple': false,
                'data': [{
                    "text": "基本情况",
                    "id": 999,
                    "state": {
                        "opened": true
                    },
                    "children": [{
                            "id": 1,
                            "text": "基本信息",
                            "state": {
                                "selected": true
                            }
                        },
                        {
                            "id": 2,
                            "text": "展品单项保险估价及目录"
                        }
                    ]
                }]
            }
        }).on("loaded.jstree", function (e, datas) {
            //初始化后事件
        }).on("changed.jstree", function (e, datas) {
            if (datas.selected.length) {
                var treeId = "" + datas.instance.get_node(datas.selected[0]).id;
                if (treeId == 999) {
                    $(".baseinfo").parent().show();
                    $("#cmx-56016-table-1").show();
                } else if (treeId == 1) {
                    showEdit();
                } else {
                    showTable();
                }
            }
        });

    //选择博物馆
    $(".cmx-museum-choose").on("click", function () {
        new cmx.process()
            .turn('buildMuseumInfoModal', {
                goto: function (type) {
                    $("#cmx-form #cmx-i-7").val(cmx.g.museumName);
                    $("#cmx-museum-modal").modal('hide');
                }
            })
            .ccatch(function (msg) {})
            .cfinally(function () {}).start();
    });

    //获取待办列表信息详情
    if (!IsEmpty(GetUrlParamString('applyId'))) {

        getRecialCount();
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohPecApply/getEntityByPKAndPNum',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    var resultData = prevModelData.data;
                    $('#cmx-form #cmx-i-2-1').val(resultData.fileNumFront);
                    $('#cmx-form #cmx-i-2-2').val(resultData.fileNumMidd);
                    $('#cmx-form #cmx-i-2-3').val(resultData.fileNumBack);
                    $('#cmx-form #cmx-i-3').val(resultData.proFileTitle);
                    $('#cmx-form #cmx-i-4').val(resultData.contactName);
                    $('#cmx-form #cmx-i-5').val(resultData.contactTel);
                    $('#cmx-form #cmx-i-7').val(resultData.apprUnitName);
                    $('#cmx-form #cmx-i-8').val(resultData.apprContactName);
                    $('#cmx-form #cmx-i-9').val(resultData.apprContactTel);

                    $('#cmx-form #cmx-i-11').val(resultData.exhiRequest);
                    $('#cmx-form #cmx-i-12').val(resultData.exhiPlan);
                    $('#cmx-form #cmx-i-13').val(resultData.exhiAgreement);

                    cmx.g.museumId = resultData.apprUnit;
                    cmx.g.museumName = resultData.apprUnitName;

                }
                send.go();
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .turn('callajax', {
                url: api_ea + '/eaMohPecApply/getRelicList',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (!IsNull(prevModelData) && prevModelData.state == '200') {
                    var resultData = prevModelData.data;
                    for (var i = 0; i < resultData.length; i++) {
                        var tbody = [
                            '<tr>',
                            '<td><input type="checkbox" name="relicname" value="' + resultData[i].detailId + '"></td>',
                            '<td>' + resultData[i].ordinalNum + '</td>',
                            '<td>' + resultData[i].relicName + '</td>',
                            '<td>' + resultData[i].registerNum + '</td>',
                            '<td>' + resultData[i].relicAmount + '</td>',
                            '<td>' + resultData[i].relicLevel + '</td>',
                            '<td>' + resultData[i].relicYear + '</td>',
                            '<td>' + resultData[i].relicSize + '</td>',
                            '<td>' + resultData[i].collectUnitName + '</td>',
                            '<td>' + resultData[i].evaluate + '</td>',
                            '<td><button class="btn btn-info" onclick="editWenwuItem(this,\'' + resultData[i].detailId + '\');">' + ((GetUrlParamString('from') == 'iframe') ? '查看详情' : '编辑文物') + '</button></td>',
                            '</tr>',
                        ].join("");
                        $('#cmx-56016-tbody').append(tbody);
                    }
                    if (GetUrlParamString('from') == 'iframe') {
                        $('#cmx-56016-table-1 thead tr').find('th').first().hide();
                        $("#cmx-56016-tbody tr").each(function () {
                            $(this).find('td').first().hide();
                        });
                    }
                }
                if (GetUrlParamString('from') == 'iframe') {
                    $('.remove-btn').hide();

                    $('#cmx-form input').attr('disabled', true);
                    $('#cmx-form select').attr('disabled', true);
                    $('#cmx-form textarea').attr('disabled', true);
                    $('#cmx-form .cmx-museum-choose').hide();
                    $('#cmx-select-delect-btn').hide();
                    $('#cmx-select-relic-btn').hide();
                    $('.form-file').hide();
                }
            })
            .start();
    }

    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
        }
    });

    //下载
    $('#cmx-download-btn').on('click', function () {
        if (IsEmpty(cmx.g.applyId)) {
            return;
        } else {
            window.open(api_ea + '/eaMohPecApply/exportExcel?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=56016');
        }
    })

    //选择文物模态框
    $("#cmx-select-relic-btn").on("click", function () {
        if (IsEmpty(cmx.g.applyId)) {
            showAlert({
                type: 'error',
                content: '请先保存申请信息'
            });
            return;
        }
        $("#cmx-detail-modal-div").load(get56016DetailModal, function () {
            $("#cmx-relic-detail-modal").off('shown.bs.modal');
            $("#cmx-relic-detail-modal").on('shown.bs.modal', function () {
                var _collectionNum = '';
                _isCollection = 0;
                $('#cmx-detail-form').html('');
                //构建表单
                CreateApplicationForm({
                    "url": get56016cDetailFormData,
                    "element": "#cmx-detail-form"
                });
                cmx.g.filesarray.put('99', []);
                $('#cmx-j-1').attr("disabled", "false");
                $(".chutu").children("div:first").css("height", "32px");
                //绑定选择文物
                $('.cmx-relic-choose').on('click', function () {
                    new cmx.process()
                        .turn('buildRelicInfoModal', {
                            callback: function (param) {
                                console.log(param);
                                $('#cmx-detail-form #cmx-j-2').val(param.antiqueName).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-5').val(param.exactAge).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-6').val(param.realSize).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-7').val(param.relicLevelName).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-8').val(param.relicQualityName).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-9').val(param.num).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-10').val(param.relicCode).attr('readonly', 'readonly');
                                $('#cmx-detail-form #cmx-j-11').val(param.museumName).attr('readonly', 'readonly');

                                _isCollection = 1;
                                _collectionNum = param.antiqueId;
                            }
                        })
                        .ccatch(function (msg) {}).cfinally(function () {}).start();
                });
                //添加外展历史
                $('#cmx-abduction-history').on('click', function () {
                    var html = [
                        '<tr>',
                        '<td>曾于</td>',
                        '<td><input type="text" class="form-control year"></td>',
                        '<td>年赴</td>',
                        '<td><input type="text" class="form-control city"></td>',
                        '<td>国展览</td>',
                        '<td><i class="icon wb-trash margin-left-10" onclick="removeHistory(event,this);"></i></td>',
                        '</tr>',
                    ].join('');
                    $('#cmx-exhibition-history-tbody').append(html);
                });
                $('#cmx-56016-relic-detail-modal-save').on('click', function () {
                    var temp_flag = checkFormLength('#cmx-detail-form');
                    if (!temp_flag) {
                        return;
                    }
                    var temp = [];
                    $('#cmx-exhibition-history-tbody tr').each(function () {
                        var exbitDate = $(this).find('.year').val();
                        var exbitNation = $(this).find('.city').val();
                        temp.push({
                            exbitDate: exbitDate,
                            "exbitNation": exbitNation
                        });
                    });
                    var formate = [{
                        projectNum: _projectNum,
                        applyId: cmx.g.applyId,
                        projectType: _projectType,
                        relicNumber: $('#cmx-detail-form #cmx-j-1').val(),
                        relicName: $('#cmx-detail-form #cmx-j-2').val(),
                        relicAmount: $('#cmx-detail-form #cmx-j-9').val(),
                        registerNum: $('#cmx-detail-form #cmx-j-10').val(),
                        comeUpSite: $('#cmx-detail-form #cmx-j-3').val(),
                        comeUpTime: $('#cmx-detail-form #cmx-j-4').val(),
                        relicYear: $('#cmx-detail-form #cmx-j-5').val(),
                        relicSize: $('#cmx-detail-form #cmx-j-6').val(),
                        relicLevel: $('#cmx-detail-form #cmx-j-7').val(),
                        relicQuality: $('#cmx-detail-form #cmx-j-8').val(),
                        bookName: $('#cmx-detail-form #cmx-j-12').val(),
                        bookDate: $('#cmx-detail-form #cmx-j-13').val(),
                        collectUnit: "",
                        collectUnitName: $('#cmx-detail-form #cmx-j-11').val(),
                        briefDes: $('#cmx-detail-form #cmx-j-16').val(),
                        evaluate: $('#cmx-detail-form #cmx-j-14').val(),
                        exbitList: temp,
                        picList: getFileListForSave(cmx.g.filelinkfileclass, '99'),
                        collectionNum: _collectionNum,
                        isCollection: _isCollection
                    }];
                    console.log(_isCollection);
                    console.log(formate);
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaMohPecApply/saveRelicdetail',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                pecFormData: formate
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            console.log(prevModelData);
                            if (prevModelData.state == '200') {
                                showAlert({
                                    type: "success",
                                    content: "保存成功"
                                });
                                var tdata = prevModelData.data;
                                var tbody = [
                                    '<tr>',
                                    '<td><input type="checkbox" name="relicname" value="' + tdata.detailId + '"></td>',
                                    '<td>' + tdata.ordinalNum + '</td>',
                                    '<td>' + tdata.relicName + '</td>',
                                    '<td>' + tdata.registerNum + '</td>',
                                    '<td>' + tdata.relicAmount + '</td>',
                                    '<td>' + tdata.relicLevel + '</td>',
                                    '<td>' + tdata.relicYear + '</td>',
                                    '<td>' + tdata.relicSize + '</td>',
                                    '<td>' + tdata.collectUnitName + '</td>',
                                    '<td>' + tdata.evaluate + '</td>',
                                    '<td><button class="btn btn-info" onclick="editWenwuItem(this,\'' + tdata.detailId + '\');">编辑文物</button></td>',
                                    '</tr>',
                                ].join("");
                                $('#cmx-56016-tbody').append(tbody);
                                $('#cmx-relic-detail-modal').modal('hide');
                                getRecialCount();
                            }
                        })
                        .start();
                });
            });
            $("#cmx-relic-detail-modal").modal('show');
        });
    });

    //移除
    $("#cmx-select-delect-btn").on("click", function () {
        $('#cmx-56016-tbody input[type="checkbox"]').each(function () {
            if ($(this).is(":checked")) {
                $(this).parent().parent().remove();
            }
        });
    });

    //保存
    $("#cmx-noNationProject-save").on("click", function () {
        var file_1 = getFileListForSave(cmx.g.filelinkfileclass, '34')[0];
        var file_2 = getFileListForSave(cmx.g.filelinkfileclass, '35')[0];
        var file_3 = getFileListForSave(cmx.g.filelinkfileclass, '36')[0];
        if (IsEmpty($('#cmx-form #cmx-i-11').val()) && IsEmpty(file_1.fileIndex)) {
            showAlert({
                type: 'error',
                content: '办展请示不能为空'
            });
            return;
        }
        if (IsEmpty($('#cmx-form #cmx-i-12').val()) && IsEmpty(file_2.fileIndex)) {
            showAlert({
                type: 'error',
                content: '展示方案、大纲不能为空'
            });
            return;
        }
        if (IsEmpty($('#cmx-form #cmx-i-13').val()) && IsEmpty(file_3.fileIndex)) {
            showAlert({
                type: 'error',
                content: '展览协议书、草案不能为空'
            });
            return;
        }
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //特殊验证
        if (!IsEmpty($('#cmx-i-2-1').val())) {
            if ($('#cmx-i-2-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'bowuguan') ? "" : "省") + "文件号前可填长度最大为20"
                });
                return;
            }
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'bowuguan') ? "" : "省") + "文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'bowuguan') ? "" : "省") + "文件号后可填长度最大为8"
                });
                return;
            }
        }
        if (IsEmpty(cmx.g.museumName)) {
            showAlert({
                type: "info",
                content: "请选择博物馆名称"
            });
            return;
        }

        var relicDetailList = [];
        $('#cmx-56016-tbody input').each(function () {
            relicDetailList.push({
                detailId: $(this).val()
            });
        });
        var formate = [{
            applyId: cmx.g.applyId,
            projectNum: _projectNum,
            projectType: _projectType,
            approvalMatt: "",
            fileNumFront: $('#cmx-form #cmx-i-2-1').val(),
            fileNumMidd: $('#cmx-form #cmx-i-2-2').find('option:selected').val(),
            fileNumBack: $('#cmx-form #cmx-i-2-3').val(),
            contactName: $('#cmx-form #cmx-i-4').val(),
            contactTel: $('#cmx-form #cmx-i-5').val(),
            proFileTitle: $('#cmx-form #cmx-i-3').val(),
            projectName: "文物出境展览许可",
            apprUnitName: cmx.g.museumName,
            apprUnit: cmx.g.museumId,
            publishType: 9,
            relicDetailList: relicDetailList,
            files: getFileListForSave(cmx.g.filelinkfileclass),
            apprContactName: $('#cmx-form #cmx-i-8').val(),
            apprContactTel: $('#cmx-form #cmx-i-9').val(),
            exhiRequest: $('#cmx-form #cmx-i-11').val(),
            exhiPlan: $('#cmx-form #cmx-i-12').val(),
            exhiAgreement: $('#cmx-form #cmx-i-13').val()
        }];
        console.log(formate);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohPecApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pecFormData: formate
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    showAlert({
                        type: "success",
                        content: "保存成功"
                    })
                    cmx.g.applyId = prevModelData.data.applyId;
                }
            })
            .start();
    });
    //发送
    $("#cmx-noNationProject-send").on("click", function () {
        var file_1 = getFileListForSave(cmx.g.filelinkfileclass, '34')[0];
        var file_2 = getFileListForSave(cmx.g.filelinkfileclass, '35')[0];
        var file_3 = getFileListForSave(cmx.g.filelinkfileclass, '36')[0];
        if (IsEmpty($('#cmx-form #cmx-i-11').val()) && IsEmpty(file_1.fileIndex)) {
            showAlert({
                type: 'error',
                content: '办展请示不能为空'
            });
            return;
        }
        if (IsEmpty($('#cmx-form #cmx-i-12').val()) && IsEmpty(file_2.fileIndex)) {
            showAlert({
                type: 'error',
                content: '展示方案、大纲不能为空'
            });
            return;
        }
        if (IsEmpty($('#cmx-form #cmx-i-13').val()) && IsEmpty(file_3.fileIndex)) {
            showAlert({
                type: 'error',
                content: '展览协议书、草案不能为空'
            });
            return;
        }
        //基本表单验证
        var temp_flag = checkFormLength('#cmx-form');
        if (!temp_flag) {
            return;
        }
        //特殊验证
        if (!IsEmpty($('#cmx-i-2-1').val())) {
            if ($('#cmx-i-2-1').val().length > 20) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'bowuguan') ? "" : "省") + "文件号前可填长度最大为20"
                });
                return;
            }
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (!IsEmpty(fileNumBack)) {
            if (!re.test(fileNumBack)) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'bowuguan') ? "" : "省") + "文件号后可填项只能填数字"
                });
                return;
            }
            if (fileNumBack.length > 8) {
                showAlert({
                    type: "info",
                    content: ((getData('role') == 'bowuguan') ? "" : "省") + "文件号后可填长度最大为8"
                });
                return;
            }
        }
        if (IsEmpty(cmx.g.museumName)) {
            showAlert({
                type: "info",
                content: "请选择博物馆名称"
            });
            return;
        }

        var relicDetailList = [];
        $('#cmx-56016-tbody input').each(function () {
            relicDetailList.push({
                detailId: $(this).val()
            });
        });
        var formate = [{
            applyId: cmx.g.applyId,
            projectNum: _projectNum,
            approvalMatt: "",
            projectType: _projectType,
            fileNumFront: $('#cmx-form #cmx-i-2-1').val(),
            fileNumMidd: $('#cmx-form #cmx-i-2-2').find('option:selected').val(),
            fileNumBack: $('#cmx-form #cmx-i-2-3').val(),
            contactName: $('#cmx-form #cmx-i-4').val(),
            contactTel: $('#cmx-form #cmx-i-5').val(),
            proFileTitle: $('#cmx-form #cmx-i-3').val(),
            projectName: "文物出境展览许可",
            apprUnitName: cmx.g.museumName,
            apprUnit: cmx.g.museumId,
            publishType: 9,
            relicDetailList: relicDetailList,
            files: getFileListForSave(cmx.g.filelinkfileclass),
            apprContactName: $('#cmx-form #cmx-i-8').val(),
            apprContactTel: $('#cmx-form #cmx-i-9').val(),
            exhiRequest: $('#cmx-form #cmx-i-11').val(),
            exhiPlan: $('#cmx-form #cmx-i-12').val(),
            exhiAgreement: $('#cmx-form #cmx-i-13').val(),
        }];
        console.log(formate);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaMohPecApply/sendEaMohPecApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    pecFormData: formate,
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    showAlert({
                        type: "success",
                        content: "发送成功"
                    });
                    setTimeout(function () {
                        window.location.href = "/app/f-gover-approval/counterpart/counterpart-needToDo.html?type=1&nowid=" + GetUrlParamString('nowid');
                    }, 1000);
                }
                send.go();
            })
            .start();
    });
});

function getRecialCount() {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaMohPecApply/getCounts',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                applyId: cmx.g.applyId,
                projectNum: _projectNum
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData)
            if (prevModelData.state == '200') {
                $('#cmx-recial-count-precent').html('以上产品 <span>' + prevModelData.data.relicCount + '</span>件（组），其中一级品<span>' + prevModelData.data.levelCount + '</span>件，占 <span>' + prevModelData.data.present + '%</span>');
            }
        })
        .start();
}

function removeHistory(ev, ele) {
    if ($('#cmx-exhibition-history-tbody').find('tr').length == 1) {
        showAlert({
            type: 'error',
            content: '已经是最后一条'
        });
        return;
    }
    $(ele).parent().parent().remove();
}
//显示基本信息，隐藏多行文本
function showEdit() {
    $(".baseinfo").parent().show();
    $("#cmx-56016-table-1").hide();
}
//显示多行文本，隐藏基础信息
function showTable() {
    $(".baseinfo").parent().hide();
    $("#cmx-56016-table-1").show();
}

function editWenwuItem(ele, detailId) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaMohPecApply/getRelicdetail',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                detailId: detailId
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (prevModelData.state == '200') {
                var editdata = prevModelData.data;
                $("#cmx-detail-modal-div").load(get56016DetailModal, function () {
                    $("#cmx-relic-detail-modal").off('shown.bs.modal');
                    $("#cmx-relic-detail-modal").on('shown.bs.modal', function () {
                        var _collectionNum = '';
                        _isCollection = editdata.isCollection;
                        $('#cmx-detail-form').html('');
                        //构建表单
                        CreateApplicationForm({
                            "url": get56016cDetailFormData,
                            "element": "#cmx-detail-form"
                        });
                        $('#cmx-detail-form #cmx-j-1').val(editdata.ordinalNum);
                        $('#cmx-detail-form #cmx-j-2').val(editdata.relicName);
                        $('#cmx-detail-form #cmx-j-9').val(editdata.relicAmount);
                        $('#cmx-detail-form #cmx-j-10').val(editdata.registerNum);
                        $('#cmx-detail-form #cmx-j-3').val(editdata.comeUpSite);
                        $('#cmx-detail-form #cmx-j-4').val(editdata.comeUpTime);
                        $('#cmx-detail-form #cmx-j-5').val(editdata.relicYear);
                        $('#cmx-detail-form #cmx-j-6').val(editdata.relicSize);
                        $('#cmx-detail-form #cmx-j-7').val(editdata.relicLevel);
                        $('#cmx-detail-form #cmx-j-8').val(editdata.relicQuality);
                        $('#cmx-detail-form #cmx-j-12').val(editdata.bookName);
                        $('#cmx-detail-form #cmx-j-13').val(editdata.bookDate);
                        $('#cmx-detail-form #cmx-j-11').val(editdata.collectUnitName);
                        $('#cmx-detail-form #cmx-j-16').val(editdata.briefDes);
                        $('#cmx-detail-form #cmx-j-14').val(editdata.evaluate);
                        if (editdata.isCollection == 1) {
                            $('#cmx-detail-form #cmx-j-1').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-2').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-9').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-10').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-5').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-6').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-7').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-8').attr('readonly', 'readonly');
                            $('#cmx-detail-form #cmx-j-11').attr('readonly', 'readonly');
                        }
                        if (editdata.exbitList.length > 1) {
                            for (var i = 0; i < editdata.exbitList.length - 1; i++) {
                                var html = [
                                    '<tr>',
                                    '<td>曾于</td>',
                                    '<td><input type="text" class="form-control year"></td>',
                                    '<td>年赴</td>',
                                    '<td><input type="text" class="form-control city"></td>',
                                    '<td>国展览</td>',
                                    '<td><i class="icon wb-trash margin-left-10" onclick="removeHistory(event,this);"></i></td>',
                                    '</tr>',
                                ].join('');
                                $('#cmx-exhibition-history-tbody').append(html);
                            }
                        }
                        for (var i = 0; i < editdata.exbitList.length; i++) {
                            $('#cmx-exhibition-history-tbody tr').eq(i).find('.year').val(editdata.exbitList[i].exbitDate);
                            $('#cmx-exhibition-history-tbody tr').eq(i).find('.city').val(editdata.exbitList[i].exbitNation);
                        }
                        new cmx.process()
                            .turn('buildFileListByLocalData', {
                                type: ['image'],
                                data: [editdata.picList],
                                selectFileClassId: 'S0017'
                            })
                            .cfinally(function () {

                            })
                            .start();
                        if (GetUrlParamString('from') == 'iframe') {
                            $('#cmx-detail-form input').attr('disabled', true);
                            $('#cmx-detail-form select').attr('disabled', true);
                            $('#cmx-detail-form textarea').attr('disabled', true);
                            $('#cmx-detail-form .cmx-museum-choose').hide();
                            $('#cmx-select-delect-btn').hide();
                            $('#cmx-select-relic-btn').hide();
                            $('.form-file').hide();
                            $('.cmx-relic-choose').hide();
                            $('#cmx-abduction-history').hide();
                            $('#cmx-56016-relic-detail-modal-save').hide();
                            $('.img-remove-btn').hide();
                            $('#cmx-detail-form .wb-trash').hide();
                            return;
                        }
                        //绑定选择文物
                        $('.cmx-relic-choose').on('click', function () {
                            new cmx.process()
                                .turn('buildRelicInfoModal', {
                                    callback: function (param) {
                                        console.log(param);
                                        $('#cmx-detail-form #cmx-j-2').val(param.antiqueName).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-5').val(param.exactAge).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-6').val(param.realSize).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-7').val(param.relicLevelName).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-8').val(param.relicQualityName).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-9').val(param.num).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-10').val(param.relicCode).attr('readonly', 'readonly');
                                        $('#cmx-detail-form #cmx-j-11').val(param.museumName).attr('readonly', 'readonly');
                                        _isCollection = 1;
                                        _collectionNum = param.antiqueId;
                                    }
                                })
                                .ccatch(function (msg) {}).cfinally(function () {}).start();
                        });
                        //添加外展历史
                        $('#cmx-abduction-history').on('click', function () {
                            var html = [
                                '<tr>',
                                '<td>曾于</td>',
                                '<td><input type="text" class="form-control year"></td>',
                                '<td>年赴</td>',
                                '<td><input type="text" class="form-control city"></td>',
                                '<td>国展览</td>',
                                '<td><i class="icon wb-trash margin-left-10" onclick="removeHistory(event,this);"></i></td>',
                                '</tr>',
                            ].join('');
                            $('#cmx-exhibition-history-tbody').append(html);
                        });
                        $('#cmx-56016-relic-detail-modal-save').on('click', function () {
                            //基本表单验证
                            var temp_flag = checkFormLength('#cmx-detail-form');
                            if (!temp_flag) {
                                return;
                            }

                            if (!IsEmpty($('#cmx-detail-form #cmx-j-2').val())) {
                                if ($('#cmx-detail-form #cmx-j-2').val().length > 50) {
                                    showAlert({
                                        type: "info",
                                        content: "文物名称可填长度最大为50"
                                    });
                                    return;
                                }
                            }
                            var temp = [];
                            $('#cmx-exhibition-history-tbody tr').each(function () {
                                var exbitDate = $(this).find('.year').val();
                                var exbitNation = $(this).find('.city').val();
                                temp.push({
                                    exbitDate: exbitDate,
                                    "exbitNation": exbitNation
                                });
                            });
                            var formate = [{
                                projectNum: _projectNum,
                                applyId: cmx.g.applyId,
                                projectType: _projectType,
                                detailId: detailId,
                                ordinalNum: $('#cmx-detail-form #cmx-j-1').val(), //文物信息的编号
                                relicNumber: $('#cmx-detail-form #cmx-j-1').val(), //不知道这个是干啥的，需要问秀秀
                                relicName: $('#cmx-detail-form #cmx-j-2').val(),
                                relicAmount: $('#cmx-detail-form #cmx-j-9').val(),
                                registerNum: $('#cmx-detail-form #cmx-j-10').val(),
                                comeUpSite: $('#cmx-detail-form #cmx-j-3').val(),
                                comeUpTime: $('#cmx-detail-form #cmx-j-4').val(),
                                relicYear: $('#cmx-detail-form #cmx-j-5').val(),
                                relicSize: $('#cmx-detail-form #cmx-j-6').val(),
                                relicLevel: $('#cmx-detail-form #cmx-j-7').val(),
                                relicQuality: $('#cmx-detail-form #cmx-j-8').val(),
                                bookName: $('#cmx-detail-form #cmx-j-12').val(),
                                bookDate: $('#cmx-detail-form #cmx-j-13').val(),
                                collectUnit: "",
                                collectUnitName: $('#cmx-detail-form #cmx-j-11').val(),
                                briefDes: $('#cmx-detail-form #cmx-j-16').val(),
                                evaluate: $('#cmx-detail-form #cmx-j-14').val(),
                                exbitList: temp,
                                picList: getFileListForSave(cmx.g.filelinkfileclass, '99'),
                                collectionNum: _collectionNum,
                                isCollection: _isCollection
                            }];
                            console.log(formate);
                            new cmx.process()
                                .turn('callajax', {
                                    url: api_ea + '/eaMohPecApply/saveRelicdetail',
                                    data: JSON.stringify({
                                        token: getData('token'), //类型：String  必有字段  备注：无
                                        pecFormData: formate
                                    }),
                                    type: 'POST'
                                })
                                .turn(function (prevModelData, send, abort) {
                                    console.log(prevModelData);
                                    if (prevModelData.state == '200') {
                                        showAlert({
                                            type: "success",
                                            content: "保存成功"
                                        });
                                        var tdata = prevModelData.data;
                                        var tbody = [
                                            '<td><input type="checkbox" name="relicname" value="' + tdata.detailId + '"></td>',
                                            '<td>' + tdata.relicNumber + '</td>',
                                            '<td>' + tdata.relicName + '</td>',
                                            '<td>' + tdata.registerNum + '</td>',
                                            '<td>' + tdata.relicAmount + '</td>',
                                            '<td>' + tdata.relicLevel + '</td>',
                                            '<td>' + tdata.relicYear + '</td>',
                                            '<td>' + tdata.relicSize + '</td>',
                                            '<td>' + tdata.collectUnitName + '</td>',
                                            '<td>' + tdata.evaluate + '</td>',
                                            '<td><button class="btn btn-info" onclick="editWenwuItem(this,\'' + tdata.detailId + '\');">编辑文物</button></td>',
                                        ].join("");
                                        $(ele).parent().parent().html(tbody);
                                        $('#cmx-relic-detail-modal').modal('hide');
                                        getRecialCount();
                                    }
                                })
                                .start();
                        });
                    });
                    $("#cmx-relic-detail-modal").modal('show');
                });
            }
        })
        .start();
}

function cmx_special_2(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9 cmx-special-provincefile">',
        '<input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-museum-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function cmx_choose_relicFunc(data) {
    var html = [
        '<div class="col-sm-9 col-md-9 col-lg-9">',
        '<input type="text" class="form-control" id="' +
        data.columnindex + '" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder +
        '" value=""></div>',
        '<div class="col-sm-3 col-md-3 col-lg-3"><button class="cmx-relic-choose btn btn-primary">选择</button></div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}

function cmx_exhibitionHistoryFunc(data) {
    var html = [
        '<div class="row">',
        '<div class="col-xs-10">',
        '<table id="' + data.columnindex + '">',
        '<tbody id="cmx-exhibition-history-tbody">',
        '<tr>',
        '<td>曾于</td>',
        '<td><input type="text" class="form-control year"></td>',
        '<td>年赴</td>',
        '<td><input type="text" class="form-control city"></td>',
        '<td>国展览</td>',
        '<td><i class="icon wb-trash margin-left-10" onclick="removeHistory(event,this);"></i></td>',
        '</tr>',
        '</tbody>',
        '</table>',
        '</div>',
        '<div class="col-xs-2">',
        '<p class="pull-right"><button class="btn btn-info" id="cmx-abduction-history">新增</button></p>',
        '</div>',
        '</div>',
    ].join('');
    $("#cmx-special-" + data.serialnumber).append(html);
}