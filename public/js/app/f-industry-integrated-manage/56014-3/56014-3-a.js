/*
 * @Author: lvjinxiu 
 * @Date: 2018-03-14 16:04:22 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-07-27 17:23:39
 */
var get56014aNoNationProjectFormData = public_url + 'data/app/f-industry-integrated-manage/56014-3/56014-3-a.json';
var get56014aZipProjectFormData = public_url + 'data/app/f-industry-integrated-manage/56014/56014-a-zip.json';
var _projectNum = '56014-3_a';
var _projectType = '2';
cmx.g.regist('fileindexid_56014', '');

$(document).ready(function () {
    //上传zip压缩包
    webUploadFileZip({
        "id": "#upload-zip", //选择器内自动生成上传文件按钮
        "label": "导入项目计划书", //按钮文字
        "multiple": false, //多选，值为true表示多选，false表示单选
        "image": false, //图片选择，true代表上传图片，false代表文件
        "token": getData('token'), //验证身份
        "extra": '', //暂时不做修改，确定为空
        "passorend": 1,
        "fileDirectoryId": 50, //起文相关，除了正文之外的那些东西，也就是自己上传的附件
        success: function (param, response) {
            var fileindexid = response.data[0].fileIndex;
            console.log(response)
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPlYpApply/upLoadZip',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        ipaFormData: [{
                            files: [{
                                fileClass: '56',
                                fileIndex: fileindexid
                            }],
                            projectNum: _projectNum, //项目编号
                            projectType: "2",
                            applyId: cmx.g.applyId,
                        }]
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (prevModelData.state == '200') {
                        var html = '';
                        var planList = prevModelData.data;
                        for (var i = 0; i < planList.length; i++) {
                            html = html + [
                                '<tr onclick="showPlanDetail(\'' + planList[i].planId + '\',\'' + planList[i].unitType + '\');">',
                                '<td>' + (i + 1) + '</td>',
                                '<td>',
                                '<button class="btn btn-warning btn-xs margin-right-10" onclick="deletePlanZip(event,this,\'' + planList[i].planId + '\');">移除</button>',
                                '<button class="btn btn-default btn-xs downloadPlanFile" onclick="downloadPlanFile(event,this,\'' + planList[i].planId + '\');">下载全部附件</button>',
                                '</td>',
                                '<td>' + planList[i].projectType + '</td>',
                                '<td>' + planList[i].protectUnitName + '</td>',
                                '<td>' + planList[i].projectName + '</td>',
                                '<td>' + planList[i].isRepair + '</td>',
                                '<td>' + planList[i].amountSource + '</td>',
                                '<td>' + planList[i].estimateAmount + '</td>',
                                '<td>' + planList[i].protectObject + '</td>',
                                '<td>' + planList[i].protectScope + '</td>',
                                '<td>' + planList[i].dealWay + '</td>',
                                '<td>' + planList[i].otherExplain + '</td>',
                                '</tr>',
                            ].join('');
                        }
                        $('#cmx-copy-tbody').html(html);
                    }
                })
                .start();
        },
        error: function () {
            //集中处理过了
        }
    });
    new cmx.process().turn('initFiles', {
        'P0008': '54', //请示文件
        'P0009': '57', //项目计划清单
        'P0001010': '55'
    }).start();
    //构建表单
    CreateApplicationForm({
        "url": get56014aNoNationProjectFormData,
        "element": "#cmx-form"
    });
    //生成项目计划书专用
    $('#filelist-P0009.file-upload-list').after('<ul id="filelist-P0001010" class="file-upload-list padding-0"></ul>');
    $(".cmx-textarea").hide();
    // $('#cmx-menu')
    //     .jstree({
    //         'core': {
    //             'multiple': false,
    //             'data': [{
    //                 "id": 999,
    //                 "text": "项目工作计划已获批项目",
    //                 "state": {
    //                     "opened": true
    //                 },
    //                 "children": [{
    //                     "id": 1,
    //                     "text": "基本信息",
    //                     "state": {
    //                         "selected": true
    //                     }
    //                 }]
    //             }]
    //         }
    //     }).on("loaded.jstree", function (e, datas) {
    //         //初始化后事件
    //     }).on("changed.jstree", function (e, datas) {
    //         if (datas.selected.length) {
    //             var treeId = "" + datas.instance.get_node(datas.selected[0]).id;
    //             if (treeId == 999) {
    //                 $(".baseinfo").parent().show();
    //                 for (var i = 1; i < 5; i++) {
    //                     $(".cmx-textarea-" + i).show();
    //                 }
    //             } else if (treeId == 1) {
    //                 showEdit();
    //             } else {
    //                 showExtra(treeId - 1);
    //             }
    //         }
    //     });
    $('.apply-download-all-file').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            window.open(api_ea + '/eaPubFile/downloadApplyFileZip?token=' + getData('token') + '&applyId=' + cmx.g.applyId + '&projectNum=' + _projectNum);
        }
    });

    $('#cmx-export-plan').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPlYpApply/exportExcel',
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        projectNum: _projectNum, //项目编号
                        applyId: cmx.g.applyId,
                        fileIndexId: cmx.g.fileindexid_56014
                    }),
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    console.log(prevModelData)
                    if (prevModelData.state == '200') {
                        var fileclassid = 55;
                        new cmx.process()
                            .turn('callajax', {
                                url: getFileList,
                                data: JSON.stringify({
                                    token: getData('token'), //类型：String  必有字段  备注：无
                                    applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                                    apprItem: _projectNum, //类型：String  必有字段  备注：项目编号
                                    fileClass: fileclassid
                                }),
                                async: false,
                                type: 'POST'
                            })
                            .turn(function (prevModelData, send, abort) {
                                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                    var response = prevModelData;
                                    cmx.g.filesarray.put(fileclassid, []);
                                    $('#filelist-P0001010.file-upload-list').html('');
                                    for (var ft = 0; ft < response.data.length; ft++) {
                                        var fileindexid = response.data[ft].fileIndex;
                                        fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                                        cmx.g.filesarray.get(fileclassid).push(fileindexid);
                                        cmx.g.fileindexid_56014 = fileindexid;
                                        if (IsEmpty(fileindexid))
                                            continue;
                                        $('#filelist-P0001010.file-upload-list').append([
                                            '<li data-toggle="tooltip" data-placement="top" title="' + response.data[ft].fileName + '" data-original-title="' + response.data[ft].fileName + '" id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                                            '<div class="btn-group" role="group">',
                                            '<button fileclassid="' + fileclassid + '" onclick="downloadThisFile(\'' + fileindexid + '\',false,\'' + fileclassid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                            response.data[ft].fileName,
                                            '</button>',
                                            '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                                            '<i class="icon wb-trash" aria-hidden="true"></i>',
                                            '</button>',
                                            '</div>',
                                            '</li>'
                                        ].join(''));
                                    }
                                }
                            })
                            .start();
                    }
                })
                .start();
        }
    });

    $('#cmx-old-security').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            downloadThisFile('12C965B5-7B2D-4ADD-A25D-B2C825588CFC');
        }
    })
    //cmx-old-userdoc
    $('#cmx-old-userdoc').on('click', function () {
        if (!IsEmpty(cmx.g.applyId)) {
            downloadThisFile('1988663A-1BD0-415A-9300-FD801E7AB2DA');
        }
    })
    if (!IsEmpty(GetUrlParamString('applyId'))) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPlYpApply/getMainPlan',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    applyId: GetUrlParamString('applyId'),
                    projectNum: _projectNum //类型：String  必有字段  备注：项目编号
                }),
                type: 'POST'
            }) //回显
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData);
                if (prevModelData.state == '200') {
                    var html = '';
                    var data = prevModelData.data[0];
                    var planList = data.planList;
                    var fileList = data.fileList;
                    cmx.g.applyId = data.applyId;
                    $('#cmx-i-4').val(data.projectName).attr('readonly', 'readonly');
                    $('#cmx-form #cmx-i-2-1').val(data.fileNumFront);
                    $('#cmx-form #cmx-i-2-2').val(data.fileNumMidd);
                    $('#cmx-form #cmx-i-2-3').val(data.fileNumBack);
                    $('#cmx-form #cmx-i-3').val(data.proFileTitle);
                    for (var i = 0; i < planList.length; i++) {
                        html = html + [
                            '<tr onclick="showPlanDetail(\'' + planList[i].planId + '\',\'' + planList[i].unitType + '\');">',
                            '<td>' + (i + 1) + '</td>',
                            '<td>',
                            '<button class="btn btn-warning btn-xs" onclick="deletePlanZip(event,this,\'' + planList[i].planId + '\');">移除</button>',
                            '<button class="btn btn-default btn-xs downloadPlanFile" onclick="downloadPlanFile(event,this,\'' + planList[i].planId + '\');">下载全部附件</button>',
                            //'<button class="btn btn-default btn-xs" onclick="editPlanZip(event,this,\'' + planList[i].planId + '\',\'' + planList[i].unitType + '\');">编辑</button>',
                            '</td>',
                            '<td>' + planList[i].projectType + '</td>',
                            '<td>' + planList[i].protectUnitName + '</td>',
                            '<td>' + planList[i].projectName + '</td>',
                            '<td>' + planList[i].isRepair + '</td>',
                            '<td>' + planList[i].amountSource + '</td>',
                            '<td>' + planList[i].estimateAmount + '</td>',
                            '<td>' + planList[i].protectObject + '</td>',
                            '<td>' + planList[i].protectScope + '</td>',
                            '<td>' + planList[i].dealWay + '</td>',
                            '<td>' + planList[i].otherExplain + '</td>',
                            '</tr>',
                        ].join('');
                    }
                    $('#cmx-copy-tbody').html(html);
                    for (var i = 0; i < fileList.length; i++) {
                        if (fileList[i].fileClass == '55') {
                            cmx.g.fileindexid_56014 = fileList[i].fileIndex;
                            break;
                        }
                    }
                    if (GetUrlParamString('from') == 'iframe') {
                        $('#cmx-form input').attr('disabled', true);
                        $('#cmx-form select').attr('disabled', true);
                        $('#cmx-select-delect-btn').hide();
                        $('#cmx-select-relic-btn').hide();
                        hideElement();
                        $('.downloadPlanFile').attr('disabled',false);
                    }
                }
                send.go();
            })
            .turn('buildFileList', {
                projectNum: _projectNum
            })
            .start();
    } else {
        showAlert({
            type: "error",
            content: "当前无审批项，请重试"
        });
        setTimeout(function () {
            window.location.href = "/app/f-industry-integrated-manage/apply-table.html?"+'nowid='+GetUrlParamString('nowid');
        }, 2000);
    }

    $("#cmx-button-save").on("click", function () {
        //特殊验证
        if (IsEmpty($('#cmx-form #cmx-i-2-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-form #cmx-i-2-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (IsEmpty(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后不能为空"
            });
            return;
        }
        if (!re.test(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后可填项只能填数字"
            });
            return;
        }
        if (fileNumBack.length > 8) {
            showAlert({
                type: "info",
                content: "省文件号后可填长度最大为8"
            });
            return;
        }
        if (IsEmpty($('#cmx-form #cmx-i-3').val())) {
            showAlert({
                type: "info",
                content: "省文件标题不能为空"
            });
            return;
        }
        if (IsEmpty(getFileListForSave(cmx.g.filelinkfileclass, '54')[0].fileIndex)) {
            showAlert({
                type: "info",
                content: "请上传请示文件"
            });
            return;
        }
        if (IsEmpty(getFileListForSave(cmx.g.filelinkfileclass, '55')[0].fileIndex) && IsEmpty(getFileListForSave(cmx.g.filelinkfileclass, '57')[0].fileIndex)) {
            showAlert({
                type: "info",
                content: "请上传项目计划清单"
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPlYpApply/saveprocessInstanceId',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: [{
                        fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
                        fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
                        fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
                        proFileTitle: $("#cmx-i-3").val(), //省文件标题
                        projectName: $('#cmx-i-4').val(), //项目名称
                        projectNum: _projectNum, //项目编号
                        projectType: "2",
                        publishType: "9",
                        applyId: cmx.g.applyId,
                        files: getFileListForSave(cmx.g.filelinkfileclass)
                    }]
                }),
                success: function (result) {
                    if (result.state == '200') {

                        cmx.g.applyId = result.data.applyId;
                        showAlert({
                            type: "success",
                            content: "保存成功"
                        });
                    }
                },
                type: 'POST'
            })
            .start();
    });
    $("#cmx-button-send").on("click", function () {
        //特殊验证
        if (IsEmpty($('#cmx-form #cmx-i-2-1').val())) {
            showAlert({
                type: "info",
                content: "省文件号前不能为空"
            });
            return;
        }
        if ($('#cmx-form #cmx-i-2-1').val().length > 20) {
            showAlert({
                type: "info",
                content: "省文件号前可填长度最大为20"
            });
            return;
        }
        var fileNumBack = $('#cmx-form #cmx-i-2-3').val();
        var re = /^[0-9]*$/;
        if (IsEmpty(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后不能为空"
            });
            return;
        }
        if (!re.test(fileNumBack)) {
            showAlert({
                type: "info",
                content: "省文件号后可填项只能填数字"
            });
            return;
        }
        if (fileNumBack.length > 8) {
            showAlert({
                type: "info",
                content: "省文件号后可填长度最大为8"
            });
            return;
        }
        if (IsEmpty($('#cmx-form #cmx-i-3').val())) {
            showAlert({
                type: "info",
                content: "省文件标题不能为空"
            });
            return;
        }
        if (IsEmpty(getFileListForSave(cmx.g.filelinkfileclass, '54')[0].fileIndex)) {
            showAlert({
                type: "info",
                content: "请上传请示文件"
            });
            return;
        }
        if (IsEmpty(getFileListForSave(cmx.g.filelinkfileclass, '55')[0].fileIndex) && IsEmpty(getFileListForSave(cmx.g.filelinkfileclass, '57')[0].fileIndex)) {
            showAlert({
                type: "info",
                content: "请上传项目计划清单"
            });
            return;
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPlYpApply/sendEaPlYpApply',
                data: JSON.stringify({
                    token: getData('token'), //类型：String  必有字段  备注：无
                    ipaFormData: [{
                        fileNumBack: $("#cmx-i-2-3").val(), //省文件号后
                        fileNumFront: $("#cmx-i-2-1").val(), //省文件号前
                        fileNumMidd: $("#cmx-i-2-2").val(), //省文件号中
                        proFileTitle: $("#cmx-i-3").val(), //省文件标题
                        projectName: $('#cmx-i-4').val(), //项目名称
                        projectNum: _projectNum, //项目编号
                        projectType: "2",
                        publishType: "9",
                        files: getFileListForSave(cmx.g.filelinkfileclass),
                        applyId: cmx.g.applyId
                    }]
                }),
                success: function (result) {
                    if (result.state == '200') {
                        showAlert({
                            type: "success",
                            content: "发送成功"
                        });
                        setTimeout(function () {
                            window.location.href = "/app/f-industry-integrated-manage/province/province-needToDo.html";
                        }, 2000);
                    }
                },
                type: 'POST'
            })
            .start();
    });
});

function downloadPlanFile(ev,ele,planId){
    ev.stopPropagation();
    window.open(api_ea + '/eaPlYpApply/downLoadPlanFile?token='+getData('token')+'&planId='+planId);
}
//编辑
function editPlanZip(ev, ele, planId, unitType) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPlYpApply/getPlan',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                projectNum: _projectNum, //类型：String  必有字段  备注：项目编号
                planId: planId,
                applyId: cmx.g.applyId
            }),
            type: 'POST'
        }) //回显
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (prevModelData.state == '200') {
                var data = prevModelData.data;
                $('#cmx-edit-zip-form').html('');
                if (unitType.indexOf('古建筑石窟寺石刻近现代重要史迹及代表性建筑类') >= 0) {
                    $("#editJianzhuPlanDetailModal").off('show.bs.modal');
                    $("#editJianzhuPlanDetailModal").on('show.bs.modal', function () {
                        //构建表单
                        CreateApplicationForm({
                            "url": get56014aZipProjectFormData,
                            "element": "#cmx-edit-zip-form"
                        });
                        $('#cmx-zip-1').val(data.projectName);
                        $('#cmx-zip-21').val(data.province);
                        $('#cmx-zip-22').val(data.city);
                        $('#cmx-zip-23').val(data.county);
                        $('#cmx-zip-24').val(data.town);
                        $('#cmx-zip-25').val(data.village);
                        $('#cmx-zip-4').val(data.useMngUnit);
                        $('#cmx-zip-5').val(data.mngDep);
                        $('#cmx-zip-6').val(data.protectUnitName);
                        $('#cmx-zip-7').val(data.batchNo);
                        $('#cmx-zip-8').val(data.unitIntroduce);
                        $('#cmx-zip-10').val(data.projectContent);
                        $('#cmx-zip-11').val(data.approvalNecessity);
                        $('#cmx-zip-12').val(data.projectPlan);
                        $('#cmx-zip-14').val(data.estimateAmount);
                        $('#cmx-zip-15').val(data.EarlyAmount);
                        $('#cmx-zip-16').val(data.implAmount);
                        $('#cmx-zip-17').val(data.reportUnitName);
                        $('#cmx-zip-18').val(data.contactName);
                        $('#cmx-zip-19').val(data.contactTel);
                        var html = '';
                        var hisList = data.hisList;
                        for (var i = 0; i < hisList.length; i++) {
                            html = html + ['<tr>',
                                '<td><input type="text" class="form-control zip-year" value="' + hisList[i].planYear + '"></td>',
                                '<td><input type="text" class="form-control zip-object" value="' + hisList[i].projectName + '"></td>',
                                '<td><input type="text" class="form-control zip-content" value="' + hisList[i].repairContent + '"></td>',
                                '<td><input type="number" class="form-control zip-sub" value="' + hisList[i].subsidyAmount + '"></td>',
                                '<td><i class="icon wb-trash" aria-hidden="true" onclick="removeSubsidy(event,this);"></i></td>',
                                '</tr>',
                            ].join('');
                        }
                        $('#subsidy-zipP009').html(html);
                    });
                    $("#editJianzhuPlanDetailModal").modal('show');
                } else {
                    $("#showMuzangPlanDetailModal").off('show.bs.modal');
                    $("#showMuzangPlanDetailModal").on('show.bs.modal', function () {

                    });
                    $("#showMuzangPlanDetailModal").modal('show');
                }
            }
        })
        .start();
}
//显示详情
function showPlanDetail(planId, unitType) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPlYpApply/getPlan',
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                projectNum: _projectNum, //类型：String  必有字段  备注：项目编号
                planId: planId,
                applyId: cmx.g.applyId
            }),
            type: 'POST'
        }) //回显
        .turn(function (prevModelData, send, abort) {
            console.log(prevModelData);
            if (prevModelData.state == '200') {
                var data = prevModelData.data;
                $("#showJianzhuPlanDetailModal").off('show.bs.modal');
                $("#showJianzhuPlanDetailModal").on('show.bs.modal', function () {
                    var html = '';
                    for (var key in data) {
                        $('#showJianzhuPlanDetailModal [key="' + key + '"]').text(data[key]);
                    }
                    var hisList = data.hisList;
                    for (var i = 0; i < hisList.length; i++) {
                        html = html + [
                            '<tr>',
                            '<td>' + hisList[i].planYear + '</td>',
                            '<td>' + hisList[i].projectName + '</td>',
                            '<td>' + hisList[i].repairContent + '</td>',
                            '<td>' + hisList[i].subsidyAmount + '</td>',
                            '</tr>',
                        ].join('');
                    }
                    $('#key-hisList').html(html);
                    $('#key-file').html('');
                    var fileList = data.fileList;
                    for (var i = 0; i < fileList.length; i++) {
                        console.log(fileList[i])
                        var _fileIndex = fileList[i].fileIndex;
                        new cmx.process()
                            .turn('callajax', {
                                url: api_dm + '/DmFileInfoController/getFileName',
                                data: {
                                    token: getData('token'),
                                    fileIndex: _fileIndex
                                },
                                jsonheader: false,
                                type: 'POST'
                            })
                            .turn(function (result, send, abort) {
                                console.log(result)
                                if (!IsNull(result) && result.state == '200' && !IsEmpty(result.data) && result.data != 'null') {
                                    var response = result.data;
                                    console.log(response)
                                    $('#key-file').append('<button class="btn btn-default btn-sm margin-right-10" onclick="downloadThisFile(\'' + _fileIndex + '\')">' + response + '</button>');
                                }
                            })
                            .start();
                    }
                    $('#key-address').html(data.province + data.city + data.county + data.town + data.village);
                });
                $("#showJianzhuPlanDetailModal").modal('show');
            }
        })
        .start();
}
//移除
function deletePlanZip(ev, ele, planId) {
    ev.stopPropagation();
    showAlert({
        type: 'confirm', //success info warning error confirm input
        content: '确定要移除该条信息吗？',
        delay: 2, //可选参数，单位秒，confirm和input下无效
        btn_1: '取消', //可选参数，type为confirm时默认为确定，type为input时默认为提交
        btn_2: '确定', //可选参数，默认为取消
        callback: function (_state) { //仅type为confirm下有效
            console.log(_state); //_state可能是yes no cancel
            if (_state == 'yes') {
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPlYpApply/deletePlan',
                        data: JSON.stringify({
                            token: getData("token"),
                            planId: planId,
                            applyId: cmx.g.applyId,
                            projectNum: _projectNum
                        })
                    })
                    .turn(function (prevModelData, noviewsend, abort) {
                        if (prevModelData.state == "200") {
                            showAlert({
                                type: "success",
                                content: '删除成功'
                            });
                            var html = '';
                            var planList = prevModelData.data;
                            for (var i = 0; i < planList.length; i++) {
                                html = html + [
                                    '<tr onclick="showPlanDetail(\'' + planList[i].planId + '\',\'' + planList[i].unitType + '\');">',
                                    '<td>' + (i + 1) + '</td>',
                                    '<td>',
                                    '<button class="btn btn-warning btn-xs margin-right-10" onclick="deletePlanZip(event,this,\'' + planList[i].planId + '\');">移除</button>',
                                    '<button class="btn btn-default btn-xs downloadPlanFile" onclick="downloadPlanFile(event,this,\'' + planList[i].planId + '\');">下载全部附件</button>',
                                    '</td>',
                                    '<td>' + planList[i].projectType + '</td>',
                                    '<td>' + planList[i].protectUnitName + '</td>',
                                    '<td>' + planList[i].projectName + '</td>',
                                    '<td>' + planList[i].isRepair + '</td>',
                                    '<td>' + planList[i].amountSource + '</td>',
                                    '<td>' + planList[i].estimateAmount + '</td>',
                                    '<td>' + planList[i].protectObject + '</td>',
                                    '<td>' + planList[i].protectScope + '</td>',
                                    '<td>' + planList[i].dealWay + '</td>',
                                    '<td>' + planList[i].otherExplain + '</td>',
                                    '</tr>',
                                ].join('');
                            }
                            $('#cmx-copy-tbody').html(html);
                        } else {
                            showAlert({
                                type: "error",
                                content: result.msg
                            });
                        }

                    })
                    .start();
            }
        }
    })
}

function cmx_special_3(data) {
    var html = [
        '<div class="table-responsive text-nowrap">',
        '<button class="btn btn-success pull-right margin-bottom-10" onclick="addSubsidy(\'' + data.serialnumber + '\');">添加</button>',
        '<div class="clearfix"></div>',
        '<table class="table table-bordered">',
        '<thead><tr><th>年份</th><th>工程对象</th><th>维修或考古发掘内容</th><th>经费补助（万元）</th><th>操作</th></tr></thead>',
        '<tbody id="subsidy-zip' + data.serialnumber + '">',
        '<tr>',
        '<td><input type="text" class="form-control zip-year"></td>',
        '<td><input type="text" class="form-control zip-object"></td>',
        '<td><input type="text" class="form-control zip-content"></td>',
        '<td><input type="number" class="form-control zip-sub"></td>',
        '<td><i class="icon wb-trash" aria-hidden="true" onclick="removeSubsidy(event,this);"></i></td>',
        '</tr>',
        '</tbody>',
        '</table>',
        '</div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

function addSubsidy(serialnumber) {
    var html = ['<tr>',
        '<td><input type="text" class="form-control zip-year"></td>',
        '<td><input type="text" class="form-control zip-object"></td>',
        '<td><input type="text" class="form-control zip-content"></td>',
        '<td><input type="number" class="form-control zip-sub"></td>',
        '<td><i class="icon wb-trash" aria-hidden="true" onclick="removeSubsidy(event,this);"></i></td>',
        '</tr>',
    ].join('');
    $('#subsidy-zip' + serialnumber).append(html);
}

function removeSubsidy(ev, ele) {

    $(ele).parent().parent().remove();
}
//隐藏多行文本，显示基本信息
function showEdit() {
    $(".baseinfo").parent().show();
    for (var i = 1; i < 4; i++) {
        $(".cmx-textarea-" + i).hide();
    }
}
//隐藏基本信息，显示多行文本
function showExtra(num) {
    $(".baseinfo").parent().hide();
    for (var i = 1; i < 4; i++) {
        $(".cmx-textarea-" + i).hide();
    }
    $(".cmx-textarea-" + num).show();
}

function appendDownloadAllFile(data) {
    $("#separator-" + data.serialnumber).html('<button class="btn btn-primary apply-download-all-file">下载全部附件</button>');
}


function webUploadFileZip(param) {
    var REJECT_TYPE = ['zip'];
    var IMAGE_TYPE = ['jpeg', 'jpg', 'bmp', 'png', 'gif'];
    var $ele = $(param.id);
    var uploader = WebUploader.create({
        swf: public_url + '/vendor/webuploder/Uploader.swf',
        server: putFile,
        pick: {
            id: param.id, // 选择文件的按钮。可选。内部根据当前运行是创建，可能是input元素，也可能是flash.
            innerHTML: param.label,
            multiple: param.multiple,
        },
        resize: false,
        formData: {
            token: param.token,
            folder_id: param.folder_id,
            passorend: 1,
            fileDirectoryID: '47' //申请人上传附件
        },
        fileSingleSizeLimit: 512 * 1024 * 1024, //200M
        fileSizeLimit: 1024 * 1024 * 1024, //1000M
        duplicate: true,
    });
    uploader.on('beforeFileQueued', function (file) {
        if (file.size <= 0) {
            showAlert({
                type: 'error',
                content: '不能上传空文件'
            });
            return;
        }
        if (param.image) {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                if ($.inArray(file.ext.toLowerCase(), IMAGE_TYPE) < 0) {
                    showAlert({
                        type: 'error',
                        content: '请上传图片类型的文件：' + IMAGE_TYPE.join('、')
                    });
                    return false;
                }
                return true;
            } else {
                showAlert({
                    type: 'error',
                    content: '不可以上传' + REJECT_TYPE.join('、') + '的文件'
                });
                return false;
            }
        } else {
            if ($.inArray(file.ext.toLowerCase(), REJECT_TYPE) < 0) {
                showAlert({
                    type: 'error',
                    content: '只可以上传zip文件'
                });
                return false;
            }
        }
    });
    uploader.on('fileQueued', function (file) {
        uploader.upload();
    });
    uploader.on('uploadStart', function (file) {
        L(file);
        waitProcess(file.id);
        showLoading();
        showFileUploadBody();
        $('.g-file-list').prepend([
            '<div class="g-file-item">',
            '<h5>' + file.name + '</h5>',
            '<div class="progress progress-xs">',
            '<div id="g-file-' + file.id + '" class="progress-bar progress-bar-primary progress-bar-indicating active" style="width: 0%;" role="progressbar">',
            '<span id="g-file-' + file.id + '-2" class="sr-only">0%</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join(''));
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        L(percentage);
        $('#g-file-' + file.id).css('width', (percentage * 100) + '%');
        $('#g-file-' + file.id + '-2').html((percentage * 100) + '%');
    });
    uploader.on('uploadSuccess', function (file, response) {
        //console.log(file)
        console.log(response);
        $('#g-file-' + file.id).removeClass('active');
        $('#g-file-' + file.id).removeClass('progress-bar-primary').addClass('progress-bar-success');
        if (response.state == '200') {
            param.success(param, response);
        } else {
            showAlert({
                type: 'info',
                content: response.msg
            });
            param.error(param);
        }

    });
    uploader.on('uploadError', function (file) {
        console.log(file);
        showAlert({
            type: 'info',
            content: '“' + file.name + '”上传失败！'
        });
        param.error(param);
    });
    uploader.on('uploadComplete', function (file) {
        //console.log(file)
        hideLoading(file.id);
    });
}