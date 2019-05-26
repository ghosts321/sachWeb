'use strict';
cmx.g.regist('applyId', '');


$(document).ready(function () {
    if (GetUrlParamString('from') == 'iframe') {
        $('#cmx-edit').css('height', getClientHeight() + 80);
        $('#cmx-edit').css('margin-bottom', '0');
    } else {
        $('#cmx-edit').css('height', getClientHeight() - 110);
        $('#cmx-edit').css('margin-bottom', '0');
    }
    $('#cmx-form-body').css('height', getClientHeight() - 30);
    $('#cmx-form-body').css('margin-bottom', '0');
    $('#cmx-form-body-inpingshen').css('height', getClientHeight() - 150);
    $('#cmx-form-body-inpingshen').css('margin-bottom', '0');
    $('#cmx-form-body-pingshen').css('height', getClientHeight() - 150);
    $('#cmx-form-body-pingshen').css('margin-bottom', '0');
    $('#cmx-zhuanfawen-form-body').css('height', getClientHeight() - 150);
    $('#cmx-zhuanfawen-form-body').css('margin-bottom', '0');
    setTimeout(function () {
        try {
            if ((typeof (cmx.g._applyId) == "undefined" || IsEmpty(cmx.g._applyId)) &&
                (typeof (_applyId) == "undefined" || IsEmpty(_applyId)) &&
                (typeof (cmx.g.applyId) == "undefined" || IsEmpty(cmx.g.applyId))) {
                if (typeof _projectNum != "undefined" && _projectNum != '56015_e' && _projectNum != '56015_f' && _projectNum != '56015_g' && _projectNum != '56019' && _projectNum != '56016' && _projectNum != '56016') {
                    $(".form-group[cmx-tag=\"cmx\"]:contains(联系人)").find('input').val(getData('userName'));
                    if (_projectNum == '56008_b') {
                        $(".form-group[cmx-tag=\"cmx\"]:contains(联系人)").find('input').val(getData('userName')).attr('readonly', true);
                    }
                }
                if (IsEmpty($(".form-group[cmx-tag=\"cmx\"]:contains(联系方式)").find('input').val()))
                    $(".form-group[cmx-tag=\"cmx\"]:contains(联系方式)").find('input').val(getData('phoneNo') == '无' ? '' : getData('phoneNo'));
            }
        } catch (e) {}
    }, 1000);


});
cmx.g.regist('selectRelicsProtectionId', 0, '选择重点文物保护单位的id');
cmx.g.selectRelicsProtectionId = 100;
// cmx.g.newlyBtnState = 0;
/**
 * @author zhengkaidi
 * @description 国保单位
 */
cmx.route.model({
    index: 'getProtectunit',
    handle: function (parameter, prevModelData, send, abort) {
        if (prevModelData.state == '200') {
            send.toviewresolve({
                parameter: parameter,
                prevModelData: prevModelData
            }).go();
        }
    }
});
/**
 * @author zhengkaidi   
 * @description 世界遗产
 */
// cmx.route.model({
//     index: 'getWorldHeritage',
//     handle: function(parameter, prevModelData, send, abort) {
//         if (prevModelData.state == '200') {
//             send.toviewresolve(prevModelData).go();
//         }

//     }
// });

var RelicsProtectionFunc = {}; //用于国保单位模态框用数据

RelicsProtectionFunc.pageNum1 = 1;
RelicsProtectionFunc.pageCount1 = 0;
RelicsProtectionFunc.searchWords11 = '';
RelicsProtectionFunc.searchWords12 = '';
RelicsProtectionFunc.getProtectunit = function (parm) {
    RelicsProtectionFunc.searchWords11 = $('#cmx-national-protect-name').val();
    RelicsProtectionFunc.searchWords12 = $('#cmx-national-protect-batch').val() == '-1' ? '' : $('#cmx-national-protect-batch').val();
    new cmx.process()
        .turn('callajax', {
            url: api_dm + '/dmProtectunit/getPageDataByParamAndUser',
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: RelicsProtectionFunc.pageNum1,
                pageSize: 15,
                formData: [{
                    instName: RelicsProtectionFunc.searchWords11,
                    publishBatch: RelicsProtectionFunc.searchWords12
                }],
            }),
            type: 'POST'
        })
        .turn('getProtectunit', parm)
        .start();
};

//构建模态框
cmx.route.model({
    index: 'buildSelectRelicsProtection',
    handle: function (parameter, prevModelData, send, abort) {
        cmx.g.danweimingcheng = '';
        putData('cmx.g.danweimingcheng', '');
        putData("modalId", parameter.id);
        //$("#cmx-modalDiv").html(""); //TODO提醒于浩改一下

        //初始化国保单位列表分页
        var func_init_nation_page = function () {
            RelicsProtectionFunc.getProtectunit(parameter);
            $('#relicTabOne-page .first').unbind('click');
            $('#relicTabOne-page .first').bind('click', function () {
                RelicsProtectionFunc.pageNum1 = 1;
                RelicsProtectionFunc.getProtectunit(parameter);
            });
            $('#relicTabOne-page .last').unbind('click');
            $('#relicTabOne-page .last').bind('click', function () {
                RelicsProtectionFunc.pageNum1 = RelicsProtectionFunc.pageCount1;
                RelicsProtectionFunc.getProtectunit(parameter);
            });
            $('#relicTabOne-page .pre').unbind('click');
            $('#relicTabOne-page .pre').bind('click', function () {
                if (RelicsProtectionFunc.pageNum1 > 1) {
                    RelicsProtectionFunc.pageNum1--;
                    RelicsProtectionFunc.getProtectunit(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#relicTabOne-page .next').unbind('click');
            $('#relicTabOne-page .next').bind('click', function () {
                if (RelicsProtectionFunc.pageNum1 < RelicsProtectionFunc.pageCount1) {
                    RelicsProtectionFunc.pageNum1++;
                    RelicsProtectionFunc.getProtectunit(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };


        //初始化模态框
        if (IsEmpty($("#cmx-modalDiv").html())) {
            $("#cmx-modalDiv").load(public_html_selectRelicsProtection, function (response) {
                new cmx.process()
                    .turn('buildDataDic', {
                        element: $('#cmx-national-protect-batch'),
                        type: "select",
                        hasAll: true
                    })
                    .cfinally(function () {
                        $('#cmx-national-protect-batch').selectpicker({
                            size: 'auto',
                            style: 'btn-transparent',
                            liveSearch: true
                        });
                    })
                    .start();
                $('#cmx-relicList').off('shown.bs.modal');
                $('#cmx-relicList').on('shown.bs.modal', function () {

                    //分页操作绑定,初始化
                    func_init_nation_page();
                    //绑定搜索
                    $('#cmx-nation-search').unbind('click');
                    $('#cmx-nation-search').bind('click', function () {
                        RelicsProtectionFunc.pageNum1 = 1;
                        RelicsProtectionFunc.getProtectunit(parameter);
                    });
                    //国保绑定清除
                    $("#cmx-nation-delete").unbind('click');
                    $("#cmx-nation-delete").bind('click', function () {
                        $('#cmx-national-protect-name').val('');
                        $('#cmx-national-protect-batch').val('');
                        RelicsProtectionFunc.pageNum1 = 1;
                        RelicsProtectionFunc.getProtectunit(parameter);
                    });
                });
                $('#cmx-relicList').modal('show');

                $("#newly").click(function () { //点击非国保单位按钮后操作
                    cmx.g.danweimingcheng = '';
                    cmx.g.danweiinstId = '';
                    cmx.g.danweipublishType = '';
                    parameter.goto('noselect');
                });
                $("#cmx-confirm-btn").click(function () { //点击国保单位按钮后操作
                    if (IsEmpty(cmx.g.danweimingcheng)) {
                        showAlert({
                            type: 'info',
                            content: '请选择一个国保单位'
                        });
                        return;
                    }
                    parameter.goto('select');
                });

            });
        } else {
            $("#newly").click(function () { //点击非国保单位按钮后操作
                cmx.g.danweimingcheng = '';
                cmx.g.danweiinstId = '';
                cmx.g.danweipublishType = '';
                parameter.goto('noselect');
            });
            $("#cmx-confirm-btn").click(function () { //点击国保单位按钮后操作
                if (IsEmpty(cmx.g.danweimingcheng)) {
                    showAlert({
                        type: 'info',
                        content: '请选择一个国保单位'
                    });
                    return;
                }
                parameter.goto('select');
            });
            $('#cmx-relicList').modal('show');
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
// .turn('buildFileListByLocalData',{
//     type:'image',
//     data:data.picList
// })
cmx.route.model({
    index: 'buildFileListByLocalData',
    handle: function (parameter, prevModelData, send, abort) {

        if (!IsNull(parameter.selectFileClassId)) {
            var selectFileClassId = parameter.selectFileClassId;
            var id = selectFileClassId;
            var fileclassid = cmx.g.filelinkfileclass[id];
            var type = parameter.type[0];
            var response = parameter.data[0];
            console.log(cmx.g.filesarray.get(fileclassid))
            // cmx.g.filesarray.put(fileclassid, []);
            var response = parameter.data[0];
            for (var ft = 0; ft < response.length; ft++) {
                var fileindexid = response[ft].fileIndex;
                fileindexid = (IsEmpty(fileindexid) ? response[ft].fileindexid : fileindexid);
                if (IsEmpty(fileindexid))
                    continue;
                var fileindexidarray = fileindexid.split(',');
                for (var fileindexidkey in fileindexidarray) {
                    if (IsEmpty(fileindexidarray[fileindexidkey])) {
                        continue;
                    }
                    var _fileindexid = fileindexidarray[fileindexidkey];
                    var flag = true;
                    for (var m = 0; m < cmx.g.filesarray.get(fileclassid).length; m++) {
                        if (cmx.g.filesarray.get(fileclassid)[m] == _fileindexid) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        cmx.g.filesarray.get(fileclassid).push(_fileindexid);
                    }
                    if (type == 'image') {
                        $('#filelist-' + id + '.file-upload-list').append([
                            '<li id="cmx-file-index-id-' + _fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                            '<div class="btn-group" role="group">',
                            '<img onclick="downloadThisFile(\'' + _fileindexid + '\')" src="' + getFile + _fileindexid + '" style="min-width: 150px !important;max-width: 150px !important;" class="cmx-upload-file-name"/>',
                            '<button onclick="removeThisFile(\'' + fileclassid + '\',\'' + _fileindexid + '\')" type="button" class="btn btn-icon btn-primary btn-sm btn-round img-remove-btn">',
                            '<i class="icon wb-close" aria-hidden="true"></i></button>',
                            '</div>',
                            '</li>'
                        ].join(''));
                    } else {
                        $('#filelist-' + id + '.file-upload-list').append([
                            '<li id="cmx-file-index-id-' + _fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                            '<div class="btn-group" role="group">',
                            '<button onclick="downloadThisFile(\'' + _fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                            response[ft].fileName,
                            '</button>',
                            '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + _fileindexid + '\')">',
                            '<i class="icon wb-trash" aria-hidden="true"></i>',
                            '</button>',
                            '</div>',
                            '</li>'
                        ].join(''));
                    }
                }
            }
        } else {
            var ii = 0;
            for (var id in cmx.g.filelinkfileclass) {
                var fileclassid = cmx.g.filelinkfileclass[id];
                var type = parameter.type[ii];
                var response = parameter.data[ii];
                ii++;
                cmx.g.filesarray.put(fileclassid, []);
                for (var ft = 0; ft < response.length; ft++) {
                    var fileindexid = response[ft].fileIndex;
                    fileindexid = (IsEmpty(fileindexid) ? response[ft].fileindexid : fileindexid);
                    if (IsEmpty(fileindexid))
                        continue;
                    var fileindexidarray = fileindexid.split(',');
                    for (var fileindexidkey in fileindexidarray) {
                        if (IsEmpty(fileindexidarray[fileindexidkey])) {
                            continue;
                        }
                        var _fileindexid = fileindexidarray[fileindexidkey];
                        cmx.g.filesarray.get(fileclassid).push(_fileindexid);
                        if (type == 'image') {
                            $('#filelist-' + id + '.file-upload-list').append([
                                '<li id="cmx-file-index-id-' + _fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                                '<div class="btn-group" role="group">',
                                '<img onclick="downloadThisFile(\'' + _fileindexid + '\')" src="' + getFile + _fileindexid + '" style="min-width: 150px !important;max-width: 150px !important;" class="cmx-upload-file-name"/>',
                                '<button onclick="removeThisFile(\'' + fileclassid + '\',\'' + _fileindexid + '\')" type="button" class="btn btn-icon btn-primary btn-sm btn-round img-remove-btn">',
                                '<i class="icon wb-close" aria-hidden="true"></i></button>',
                                '</div>',
                                '</li>'
                            ].join(''));
                        } else {
                            $('#filelist-' + id + '.file-upload-list').append([
                                '<li id="cmx-file-index-id-' + _fileindexid + '" style="list-style:none;margin-bottom:10px;">',
                                '<div class="btn-group" role="group">',
                                '<button onclick="downloadThisFile(\'' + _fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                response[ft].fileName,
                                '</button>',
                                '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + _fileindexid + '\')">',
                                '<i class="icon wb-trash" aria-hidden="true"></i>',
                                '</button>',
                                '</div>',
                                '</li>'
                            ].join(''));
                        }
                    }

                }
            }
            send.go();
        }
    }
});
cmx.g.regist('checkType', '');
cmx.route.model({
    index: 'buildFileList',
    handle: function (parameter, prevModelData, send, abort) {
        for (var id in cmx.g.filelinkfileclass) {
            var fileclassid = cmx.g.filelinkfileclass[id];
            new cmx.process()
                .turn('callajax', {
                    url: getFileList,
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                        apprItem: parameter.projectNum, //类型：String  必有字段  备注：项目编号
                        fileClass: fileclassid,
                        examId: ((parameter.examId) ? parameter.examId : undefined),
                        exportId: ((parameter.exportId) ? parameter.exportId : undefined),
                    }),
                    async: false,
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                        var response = prevModelData;
                        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                            cmx.g.filesarray.put(fileclassid, []);
                        }
                        for (var ft = 0; ft < response.data.length; ft++) {
                            var fileindexid = response.data[ft].fileIndex;
                            fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                            cmx.g.filesarray.get(fileclassid).push(fileindexid);
                            if (IsEmpty(fileindexid))
                                continue;
                            $('#filelist-' + id + '.file-upload-list').append([
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
            if (fileclassid == '01' && GetUrlParamString('check') == 'wss-xsjc') {
                cmx.g.checkType = 'wss-xsjc';
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPubFromCheckInfo/getDataByParam',
                        data: {
                            token: getData('token'), //类型：String  必有字段  备注：无
                            applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                            projectNum: _projectNum, //类型：String  必有字段  备注：项目编号
                            fielType: fileclassid,
                            dealLink: 'wss-xsjc'
                        },
                        async: false,
                        type: 'GET'
                    })
                    .turn(function (prevModelData, send, abort) {
                        var _str_button = $('#filelist-' + id + '.file-upload-list button');
                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsNull(prevModelData.data) && prevModelData.data.length > 0) {
                            if (prevModelData.data[0].readFlag == '1') {
                                _str_button.attr('style', 'background: #5cd29d;color: #fff;');
                                _str_button.html('（已查看）' + _str_button.html());
                                return;
                            }
                        }
                        _str_button.html('（未查看）' + _str_button.html());
                        _str_button.attr('style', 'background: #f96868;color: #fff;');
                    }).start();
            }
        }
        send.go();
    }
});
cmx.route.model({
    index: 'buildChangeFileList',
    handle: function (parameter, prevModelData, send, abort) {
        for (var id in cmx.g.filelinkfileclass) {
            var fileclassid = cmx.g.filelinkfileclass[id];
            new cmx.process()
                .turn('callajax', {
                    url: getFileList,
                    data: JSON.stringify({
                        token: getData('token'), //类型：String  必有字段  备注：无
                        applyId: parameter.applyId, //类型：String  必有字段  备注：申请ID
                        apprItem: parameter.projectNum, //类型：String  必有字段  备注：项目编号
                        fileClass: fileclassid,
                        examId: ((parameter.examId) ? parameter.examId : undefined),
                        exportId: ((parameter.exportId) ? parameter.exportId : undefined),
                    }),
                    async: false,
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                        var response = prevModelData;
                        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                            cmx.g.filesarray.put(fileclassid, []);
                        }
                        for (var ft = 0; ft < response.data.length; ft++) {
                            var fileindexid = response.data[ft].fileIndex;
                            fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                            cmx.g.filesarray.get(fileclassid).push(fileindexid);
                            if (IsEmpty(fileindexid))
                                continue;
                            $('#filelist-' + id + '.file-upload-list').append([
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
            if (fileclassid == '01' && GetUrlParamString('check') == 'wss-xsjc') {
                cmx.g.checkType = 'wss-xsjc';
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPubFromCheckInfo/getDataByParam',
                        data: {
                            token: getData('token'), //类型：String  必有字段  备注：无
                            applyId: cmx.g.applyId, //类型：String  必有字段  备注：申请ID
                            projectNum: _projectNum, //类型：String  必有字段  备注：项目编号
                            fielType: fileclassid,
                            dealLink: 'wss-xsjc'
                        },
                        async: false,
                        type: 'GET'
                    })
                    .turn(function (prevModelData, send, abort) {
                        var _str_button = $('#filelist-' + id + '.file-upload-list button');
                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsNull(prevModelData.data) && prevModelData.data.length > 0) {
                            if (prevModelData.data[0].readFlag == '1') {
                                _str_button.attr('style', 'background: #5cd29d;color: #fff;');
                                _str_button.html('（已查看）' + _str_button.html());
                                return;
                            }
                        }
                        _str_button.html('（未查看）' + _str_button.html());
                        _str_button.attr('style', 'background: #f96868;color: #fff;');
                    }).start();
            }
        }
        send.go();
    }
});
cmx.route.model({
    index: 'buildThirdPartyFileList',
    handle: function (parameter, prevModelData, send, abort) {
        for (var id in cmx.g.filelinkfileclass) {
            var fileclassid = cmx.g.filelinkfileclass[id];
            new cmx.process()
                .turn('callajax', {
                    url: api_ea + '/eaPubFile/getExportFilesListByParam',
                    data: JSON.stringify({
                        token: getData('token'),
                        apprItem: parameter.projectNum,
                        applyId: cmx.g.applyId,
                        exportId: parameter.exportId,
                        fileClass: fileclassid,
                        examId: parameter.examId
                    }),
                    async: false,
                    type: 'POST'
                })
                .turn(function (prevModelData, send, abort) {
                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                        var response = prevModelData;
                        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                            cmx.g.filesarray.put(fileclassid, []);
                        }
                        for (var ft = 0; ft < response.data.length; ft++) {
                            var fileindexid = response.data[ft].fileIndex;
                            fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                            cmx.g.filesarray.get(fileclassid).push(fileindexid);
                            if (IsEmpty(fileindexid))
                                continue;
                            $('#filelist-' + id + '.file-upload-list').append([
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
        send.go();
    }
});

function beforeDownloadThisFile(projectNum, applyId) {
    new cmx.process()
        .turn('callajax', {
            url: getFileList,
            data: JSON.stringify({
                token: getData('token'), //类型：String  必有字段  备注：无
                applyId: applyId, //类型：String  必有字段  备注：申请ID
                apprItem: projectNum, //类型：String  必有字段  备注：项目编号
                fileClass: '902'
            }),
            async: false,
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var fileindexid = prevModelData.data[0].fileIndex;
                var e = e || event || window.event;
                if (e.ctrlKey && prevModelData.data[0].saveFileName.indexOf('doc') > 0 || prevModelData.data[0].saveFileName.indexOf('docx') > 0) {
                    var param = safeEncodeBase64(JSON.stringify({
                        applyId: 'temp' + fileindexid,
                        fileIndex: fileindexid,
                        docClass: '1',
                        userName: getData('userName'),
                        token: getData('token')
                    }));
                    setServiceCache({
                        key: 'temp' + fileindexid,
                        value: param,
                        success: function () {
                            if (BrowserType() == 'IE' || BrowserType() == '360') {
                                window.open(weboffice_url + 'temp' + fileindexid);
                            } else {
                                window.open('sach://office;temp' + fileindexid);
                            }
                        },
                        error: function (msg) {

                        }
                    });
                } else {
                    if (GetUrlParamString('from') == 'app') {
                        var suffix = '';
                        var filerealname = '';
                        if (prevModelData.data.lastIndexOf('.') > 0) {
                            suffix = prevModelData.data.substring(prevModelData.data.lastIndexOf('.') + 1);
                            filerealname = prevModelData.data.substring(0, prevModelData.data.lastIndexOf('.'));
                        } else {
                            filerealname = prevModelData.data;
                        }
                        var popup = "downfilecontinue('" + fileindexid + "','" + filerealname + "','" + suffix + "')";
                        api.execScript({
                            script: popup
                        });
                    } else {
                        downLoadFile(undefined, getFile + fileindexid);
                    }
                }
            }
            send.go();
        })
        .start();
}

function getFileListForSave(_filelinkfileclass, selectFileClassIds) {
    var _resultArr = [];
    for (var id in _filelinkfileclass) {
        var fileclassid = _filelinkfileclass[id];
        if (!IsNull(selectFileClassIds)) {
            if (selectFileClassIds == fileclassid) {
                _resultArr.push({
                    "fileClass": fileclassid,
                    "fileIndex": cmx.g.filesarray.get(fileclassid).join(',')
                });
            }
        } else {
            _resultArr.push({
                "fileClass": fileclassid,
                "fileIndex": cmx.g.filesarray.get(fileclassid).join(',')
            });
        }
    }
    return _resultArr;
}

function getSpecialFileListForSave(_filelinkfileclass, selectFileClassIds) {
    var _resultArr = [];
    for (var id in _filelinkfileclass) {
        var fileclassid = _filelinkfileclass[id];
        if (!IsNull(selectFileClassIds)) {
            if (selectFileClassIds == fileclassid) {
                _resultArr.push({
                    "picType": fileclassid,
                    "fileIndex": cmx.g.filesarray.get(fileclassid).join(',')
                });
            }
        } else {
            _resultArr.push({
                "picType": fileclassid,
                "fileIndex": cmx.g.filesarray.get(fileclassid).join(',')
            });
        }
    }
    return _resultArr;
}
cmx.route.model({
    index: 'build56015Form',
    handle: function (parameter, prevModelData, send, abort) {
        parameter.goto();
    }
});
//56009
cmx.route.model({
    index: 'build56009Form',
    handle: function (parameter, prevModelData, send, abort) {
        window.location.href = "56009/56009-apply.html?nowid=" + GetUrlParamString('nowid');
    }
});
cmx.route.model({
    index: 'build56011Form',
    handle: function (parameter, prevModelData, send, abort) {
        switch (parameter.type) {
            case '1':
                window.location.href = "/app/f-gover-approval/56011/56011-apply.html?nowid=" + GetUrlParamString('nowid') + "&type=" + parameter.type;
                break;
            case '2':
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaIchCrpApplyOther/getApplyDataByParam',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            projectNum: '56011', //类型：String  必有字段  备注：项目编号 
                            unitId: getData('unitId')
                        }),
                        type: 'POST'
                    }) //回显
                    .turn(function (prevModelData1, send1, abort1) {
                        console.log(prevModelData1);
                        if (prevModelData1.state == '200') {
                            window.location.href = '/app/f-gover-approval/56011/56011-apply.html?from=undefined&type=2&ischange=' + prevModelData1.data.applyId + '&nowid=' + GetUrlParamString('nowid');
                        } else if (prevModelData1.state == '404') {

                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData1.msg
                            });
                        }
                    })
                    .start();
                break;
            case '3':
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaIchCrpApplyOther/getApplyDataByParam',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            projectNum: '56011', //类型：String  必有字段  备注：项目编号 
                            unitId: getData('unitId')
                        }),
                        type: 'POST'
                    }) //回显
                    .turn(function (prevModelData1, send1, abort1) {
                        if (prevModelData1.state == '200') {
                            window.location.href = '/app/f-gover-approval/56011/56011-apply.html?from=undefined&type=3&ischange=' + prevModelData1.data.applyId + '&nowid=' + GetUrlParamString('nowid');
                        } else if (prevModelData1.state == '404') {

                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData1.msg
                            });
                        }
                    })
                    .start();
                break;
        }
        if (parameter.type == 2) {

        }
    }
});
//56014
cmx.route.model({
    index: 'build56014Form',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        // alert(111)
        switch (parameter.id) {
            case '56014_a':
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPlYpApply/isApply',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            projectNum: '56014_a' //类型：String  必有字段  备注：项目编号
                        }),
                        type: 'POST'
                    }) //回显
                    .turn(function (prevModelData, send, abort) {
                        console.log(prevModelData);
                        if (prevModelData.state == '200') {
                            var data = prevModelData.data[0];
                            window.location.href = "56014/56014-a.html?applyId=" + data.applyId + "&nowid=" + GetUrlParamString('nowid');;
                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData.msg
                            });
                        }
                    })
                    .start();
                break;
            case '56014_b':
                window.location.href = "56014/56014-b.html?nowid=" + GetUrlParamString('nowid');
                break;
            case '56014_c':
                window.location.href = "56014/56014-c.html?nowid=" + GetUrlParamString('nowid');
                break;
            case '56014_d':
                window.location.href = "56014/56014-d.html?nowid=" + GetUrlParamString('nowid');
                break;
            case '56014_e':
                window.location.href = "56014/56014-e.html?nowid=" + GetUrlParamString('nowid');
                break;
            default:
                break;
        }

    }
});

cmx.route.model({
    index: 'saveNoNationProjectData',
    handle: function (parameter, prevModelData, send, abort) {

        $.ajax({
            url: saveTestData,
            type: "GET",
            async: false,
            success: function (result) {
                console.log(result);
                send.toviewresolve(result).go();
            },
            error: function (result) {
                send.toviewreject('网络连接失败，请确认网络连接').go();
            },
            complete: function (result) {

            }
        });
    }
});
cmx.route.model({
    index: 'sendNoNationProjectData',
    handle: function (parameter, prevModelData, send, abort) {
        // 
        $.ajax({
            url: sendTestData,
            type: "GET",
            async: false,
            success: function (result) {
                console.log(result);
                send.toviewresolve(result).go();
            },
            error: function (result) {
                send.toviewreject('网络连接失败，请确认网络连接').go();
            },
            complete: function (result) {

            }
        });
    }
});

//56014-3
cmx.route.model({
    index: 'buildSelectSafetyProtectionEngineering',
    handle: function (parameter, prevModelData, send, abort) {
        var num = parameter.num;
        console.log(num);
        switch (num) {
            case '1':
                new cmx.process()
                    .turn('callajax', {
                        url: api_ea + '/eaPlYpApply/isApply',
                        data: JSON.stringify({
                            token: getData('token'), //类型：String  必有字段  备注：无
                            projectNum: '56014-3_a' //类型：String  必有字段  备注：项目编号
                        }),
                        type: 'POST'
                    }) //回显
                    .turn(function (prevModelData, send, abort) {
                        console.log(prevModelData);
                        if (prevModelData.state == '200') {
                            var data = prevModelData.data[0];
                            window.location.href = "56014-3/56014-3-a.html?applyId=" + data.applyId + '&nowid=' + GetUrlParamString('nowid');
                        } else {
                            showAlert({
                                type: 'error',
                                content: prevModelData.msg
                            });
                        }
                    })
                    .start();
                break;
            case '2':
                location.href = '56014-3/56014-3-b.html?nowid=' + GetUrlParamString('nowid');
                break;
            case '3':
                location.href = '56014-3/56014-3-c.html?nowid=' + GetUrlParamString('nowid');
                break;
            case '4':
                location.href = '56014-3/56014-3-d.html?nowid=' + GetUrlParamString('nowid');
                break;
            case '5':
                location.href = '56014-3/56014-3-e.html?nowid=' + GetUrlParamString('nowid');
                break;
            default:
                break;
        }
    }
});

//56014-3项目名称

//获取已批准计划模态框内表格内容
cmx.route.model({
    index: 'getPlanList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(111)
        if (prevModelData.state == '200') {
            send.toviewresolve(prevModelData).go();
        }

    }
});

var planListFunc = {}; //用于选择设计单位和编制单位模态框用数据
planListFunc.pageNum = 1;
planListFunc.pageCount = 0;
planListFunc.searchWord1 = '';
planListFunc.getPlan = function () {
    planListFunc.searchWord1 = $('#cmx-approve-plan-name').val();
    // console.log(param);
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaAecrAccplan/getPageDataByParam", //56014-3选择计划名称模态框
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: planListFunc.pageNum,
                pageSize: 10,
                ipaFormData: [{
                    projectType: $("#cmx-i-01 option:selected").val(),
                    projectName: planListFunc.searchWord1
                }],
            }),
            type: 'POST'
        })
        .turn('getPlanList', {})
        .start();
};

//构建计划列表模态框
cmx.route.model({
    index: 'buildSelectProjectName',
    handle: function (parameter, prevModelData, send, abort) {
        // $("#cmx-modalDiv2").html(""); //TODO提醒于浩改一下
        // 
        // console.log(parameter.busiType);
        //初始化列表分页
        // console.log(parameter.projectType);
        var func_init_plan_page = function () {
            planListFunc.getPlan();
            $('#cmx-plan-Pagination .first').unbind('click');
            $('#cmx-plan-Pagination .first').bind('click', function () {
                planListFunc.pageNum = 1;
                planListFunc.getPlan();
            });
            $('#cmx-plan-Pagination .last').unbind('click');
            $('#cmx-plan-Pagination .last').bind('click', function () {
                planListFunc.pageNum = planListFunc.pageCount;
                planListFunc.getPlan();
            });
            $('#cmx-plan-Pagination .pre').unbind('click');
            $('#cmx-plan-Pagination .pre').bind('click', function () {
                if (planListFunc.pageNum > 1) {
                    planListFunc.pageNum--;
                    planListFunc.getPlan();
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-plan-Pagination .next').unbind('click');
            $('#cmx-plan-Pagination .next').bind('click', function () {
                if (planListFunc.pageNum < planListFunc.pageCount) {
                    planListFunc.pageNum++;
                    planListFunc.getPlan();
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };

        //初始化模态框
        if (IsEmpty($("#cmx-modalDiv1").html())) {
            $("#cmx-modalDiv1").load(public_html_approvedPlan, function () {
                $("#cmx-approvedPlan").off('shown.bs.modal');
                $("#cmx-approvedPlan").on('shown.bs.modal', function () {
                    //分页操作绑定,初始化
                    func_init_plan_page();
                    //绑定搜索
                    $('#cmx-plan-search').unbind('click');
                    $('#cmx-plan-search').bind('click', function () {
                        planListFunc.pageNum = 1;
                        planListFunc.getPlan();
                    });
                    //绑定清除
                    $("#cmx-plan-delete").unbind('click');
                    $("#cmx-plan-delete").bind('click', function () {
                        $('#cmx-approve-plan-name').val('');
                        planListFunc.pageNum = 1;
                        planListFunc.getPlan();
                    });
                });
                $('#cmx-approvedPlan').modal('show');
                $("#cmx-plan-confirm-btn").click(function () { //点击确认按钮后操作
                    if (IsEmpty(cmx.g.planId)) {
                        showAlert({
                            type: 'info',
                            content: '请选择一个计划名称'
                        });
                        return;
                    }

                    parameter.goto();
                });
            });
        } else {
            $('#cmx-approvedPlan').modal('show');
            $("#cmx-plan-confirm-btn").click(function () { //点击确认按钮后操作
                if (IsEmpty(cmx.g.planId)) {
                    showAlert({
                        type: 'info',
                        content: '请选择一个计划名称'
                    });
                    return;
                }

                parameter.goto();
            });
        }
    }
});


//获取方案编制单位内容56015-b
cmx.route.model({
    index: 'getProjectWorkUnitList',
    handle: function (parameter, prevModelData, send, abort) {
        if (prevModelData.state == '200') {
            console.log(parameter)
            console.log(prevModelData)
            send.toviewresolve({
                parameter: parameter,
                prevModelData: prevModelData
            }).go();
        }
    }
});

var unitListFunc = {}; //用于选择设计单位和编制单位模态框用数据
unitListFunc.pageNum = 1;
unitListFunc.pageCount = 0;
unitListFunc.searchWord = '';
// unitListFunc.province = '';
unitListFunc.businessRange = '';
// unitListFunc.certificate = '';
unitListFunc.getProjectWorkUnit = function (param) { //方案编制单位模态框
    unitListFunc.searchWord = $('#cmx-unit-name').val();
    // unitListFunc.province = $("#cmx-province option:selected").val();
    unitListFunc.businessRange = $("#cmx-range").val();
    // unitListFunc.certificate = $("#cmx-certificate").val();
    console.log(param)
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubDesignUnit/queryListForChoose',
            data: JSON.stringify({
                token: getData('token'),
                pageNo: unitListFunc.pageNum,
                pageSize: 5,
                unitName: unitListFunc.searchWord,
                // provinceName: unitListFunc.province,
                certificate: unitListFunc.certificate,
                busiScope: unitListFunc.businessRange, //业务范围
                busiType: param.busiType
            }),
            type: 'POST',
            success: function (result) {
                console.log(result)
                console.log(param.busiType)
                console.log(unitListFunc.certificate)
                console.log(unitListFunc.businessRange)
                console.log(unitListFunc.searchWord)
                console.log(unitListFunc.province)
            }
        })
        .turn('getProjectWorkUnitList', param)
        .start();
};

//获取设计单位（编制单位）模态框内表格内容
cmx.route.model({
    index: 'getUnitList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(111)
        if (prevModelData.state == '200') {
            send.toviewresolve(prevModelData).go();
        }
    }
});
unitListFunc.getUnit = function (param) {
    unitListFunc.searchWord = $('#cmx-unit-name').val();
    console.log(param)
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubDesignUnit/queryListForChoose',
            data: JSON.stringify({
                token: getData('token'),
                pageNo: unitListFunc.pageNum,
                pageSize: 10,
                unitName: unitListFunc.searchWord,
                busiType: param
            }),
            type: 'POST'
        })
        .turn('getUnitList', {})
        .start();
};

//构建单位列表模态框
cmx.route.model({
    index: 'buildSelectUnitList',
    handle: function (parameter, prevModelData, send, abort) {
        $("#cmx-modalDiv2").html(""); //TODO提醒于浩改一下
        $("#cmx-institution-modal").html("");
        console.log(parameter.busiType);
        putData('busiType', parameter.busiType);
        //初始化列表分页
        var func_init_unit_page = function (busiType) {
            unitListFunc.getUnit(busiType);
            $('#cmx-unit-Pagination .first').unbind('click');
            $('#cmx-unit-Pagination .first').bind('click', function () {
                unitListFunc.pageNum = 1;
                unitListFunc.getUnit(busiType);
            });
            $('#cmx-unit-Pagination .last').unbind('click');
            $('#cmx-unit-Pagination .last').bind('click', function () {
                unitListFunc.pageNum = unitListFunc.pageCount;
                unitListFunc.getUnit(busiType);
            });
            $('#cmx-unit-Pagination .pre').unbind('click');
            $('#cmx-unit-Pagination .pre').bind('click', function () {
                if (unitListFunc.pageNum > 1) {
                    unitListFunc.pageNum--;
                    unitListFunc.getUnit(busiType);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-unit-Pagination .next').unbind('click');
            $('#cmx-unit-Pagination .next').bind('click', function () {
                if (unitListFunc.pageNum < unitListFunc.pageCount) {
                    unitListFunc.pageNum++;
                    unitListFunc.getUnit(busiType);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };
        //初始化方案编制单位
        var func_init_projectunit_page = function (parameter) {
            unitListFunc.getProjectWorkUnit(parameter);
            $('#cmx-unit-Pagination .first').unbind('click');
            $('#cmx-unit-Pagination .first').bind('click', function () {
                unitListFunc.pageNum = 1;
                unitListFunc.getProjectWorkUnit(parameter);
            });
            $('#cmx-unit-Pagination .last').unbind('click');
            $('#cmx-unit-Pagination .last').bind('click', function () {
                unitListFunc.pageNum = unitListFunc.pageCount;
                unitListFunc.getProjectWorkUnit(parameter);
            });
            $('#cmx-unit-Pagination .pre').unbind('click');
            $('#cmx-unit-Pagination .pre').bind('click', function () {
                if (unitListFunc.pageNum > 1) {
                    unitListFunc.pageNum--;
                    unitListFunc.getProjectWorkUnit(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-unit-Pagination .next').unbind('click');
            $('#cmx-unit-Pagination .next').bind('click', function () {
                if (unitListFunc.pageNum < unitListFunc.pageCount) {
                    unitListFunc.pageNum++;
                    unitListFunc.getProjectWorkUnit(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };
        //初始化56015-b模态框
        if (parameter.projectNum == '56015_b') {
            $("#cmx-unit-modal").load(getInstitutionListModal, function () {
                $("#cmx-unitList-modal").off('show.bs.modal');
                $("#cmx-unitList-modal").on('show.bs.modal', function () {
                    func_init_projectunit_page(parameter);
                    /* 展开查询条件 */
                    $(".cmx-more-research").unbind("click", function () {});
                    $(".cmx-more-research").bind("click", function () {
                        $(".cmx-more-search-div").show();
                        $(".cmx-pack-up").show();
                        $(".cmx-more-research").hide();
                    });
                    /* 收起查询条件 */
                    $(".cmx-pack-up").unbind("click", function () {});
                    $(".cmx-pack-up").bind("click", function () {
                        $(".cmx-more-search-div").hide();
                        $(".cmx-more-research").show();
                        $(".cmx-pack-up").hide();
                    });
                    //绑定搜索
                    $('#cmx-unit-search').unbind('click');
                    $('#cmx-unit-search').bind('click', function () {
                        unitListFunc.pageNum = 1;
                        unitListFunc.getProjectWorkUnit(parameter);
                    });
                    //绑定清除
                    $("#cmx-unit-delete").unbind('click');
                    $("#cmx-unit-delete").bind('click', function () {
                        $('#cmx-unit-name').val('');
                        unitListFunc.pageNum = 1;
                        unitListFunc.getProjectWorkUnit(parameter);
                    });
                });
                $("#cmx-unitList-modal").modal('show');
            });
        } else {
            //初始化模态框
            if (IsEmpty($("#cmx-modalDiv2").html())) {
                var busiTyForModal = getData('busiType');
                var modalCRPCRRSP = '';
                if (busiTyForModal == 'CRP') {
                    modalCRPCRRSP = public_html_unitListCRP;
                } else if (busiTyForModal == 'CRR') {
                    modalCRPCRRSP = public_html_unitListCRR;
                } else if (busiTyForModal == 'SP') {
                    modalCRPCRRSP = public_html_unitListSP;
                }

                $("#cmx-modalDiv2").load(modalCRPCRRSP, function () {
                    $("#cmx-unitList-modal").off('shown.bs.modal');
                    $("#cmx-unitList-modal").on('shown.bs.modal', function () {
                        //分页操作绑定,初始化
                        func_init_unit_page(parameter.busiType);
                        //绑定搜索
                        $('#cmx-unit-search').unbind('click');
                        $('#cmx-unit-search').bind('click', function () {
                            unitListFunc.pageNum = 1;
                            unitListFunc.getUnit(parameter.busiType);
                        });
                        //绑定清除
                        $("#cmx-unit-delete").unbind('click');
                        $("#cmx-unit-delete").bind('click', function () {
                            $('#cmx-unit-name').val('');
                            unitListFunc.pageNum = 1;
                            unitListFunc.getUnit(parameter.busiType);
                        });
                    });
                    $('#cmx-unitList-modal').modal('show');
                    $("#cmx-unit-confirm-btn").click(function () { //点击非国保单位按钮后操作
                        if (IsEmpty(cmx.g.unitName)) {
                            showAlert({
                                type: 'info',
                                content: '请选择一个单位名称'
                            });
                            return;
                        }
                        parameter.goto();
                    });
                });
            } else {
                $("#cmx-unit-confirm-btn").click(function () { //点击非国保单位按钮后操作
                    if (IsEmpty(cmx.g.unitName)) {
                        showAlert({
                            type: 'info',
                            content: '请选择一个单位名称'
                        });
                        return;
                    }
                    parameter.goto();
                });
            }
        }
    }
});




// 文物工程规划立项列表
cmx.route.model({
    index: 'getProjectList',
    handle: function (parameter, prevModelData, send, abort) {

        $.ajax({
            url: parameter.url,
            data: {
                token: getData('token'),
                pageNum: parameter.pageNum,
                pageSize: parameter.pageSize,
                name: parameter.name //TODO trim

            },
            type: "GET",
            async: false,
            success: function (result) {
                console.log(parameter.url);
                if (result.state == "200" && !IsEmpty(result.data)) {
                    send.toviewresolve({
                        data: result.data,
                        url: parameter.url
                    }).go();
                } else {
                    send.toviewreject(result.msg).go();
                }
            },
            error: function (result) {
                send.toviewreject('网络连接失败，请确认网络连接').go();
            },
            complete: function (result) {

            }
        });
    }
});

//56013
cmx.route.model({
    index: 'build56013Form',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        // alert(111)
        window.location.href = "56013/56013-apply.html?nowid=" + GetUrlParamString('nowid');
    }
});

//56022
cmx.route.model({
    index: 'build56022Form',
    handle: function (parameter, prevModelData, send, abort) {
        console.log(parameter);
        switch (parameter.id) {
            case '56022_b':
                window.location.href = "56022/56022-b.html?nowid=" + GetUrlParamString('nowid');
                break;
            case '56022_c':
                window.location.href = "56022/56022-c.html?nowid=" + GetUrlParamString('nowid');
                break;
        }

    }
});

function hideElement() {
    $('select').attr("disabled", true);
    $('input').attr("disabled", true);
    $('textarea').attr("disabled", true);
    $('button').attr("disabled", true);
    $('head').append('<style>select,input,textarea {background: transparent !important;border: none !important;border-radius: 0 !important;border-bottom: 1px solid #eee !important;} button.btn-primary{display:none !important;} button.apply-download-all-file{display:inline-block !important;} .webuploader-container{display:none !important;} .remove-btn{display:none !important;}</style>');
    setTimeout(function () {
        $('.webuploader-container').parent().hide();
        $('textarea').each(function () {
            $(this).attr('placeholder', '');
        });
        $('input[type="number"]').each(function () {
            $(this).attr('placeholder', '');
        });
        $('input[type="text"]').each(function () {
            $(this).attr('placeholder', '');
            if ($(this).val().length > 20) {
                $(this).after('<textarea class="form-control" style="min-height: 20px;">' + $(this).val() + '</textarea>');
                $(this).remove();
            }
        });
        $('.apply-download-all-file').show().attr('disabled', false);
    }, 100);
}

function getApplyApi(projectNum) {
    var api_url = '';
    switch (projectNum) {
        case '56004':
        case '56005':
        case '56010':
        case '56012':
            api_url = 'eaIchPucApply';
            break;
        case '56011':
            api_url = 'eaIchCrpApply';
            break;
        case '56008_a':
        case '56009':
        case '56013':
            api_url = 'eaAePcrApply';
            break;
        case '56008_b':
            api_url = 'eaAeAcpNorApply';
            break;
        case '56014_a':
            //api_url = 'eaIchRepaApply';
            api_url = 'eaPlYpApply';
            break;
        case '56014_b':
        case '56014_c':
            api_url = 'eaIchRepApply';
            break;
        case '56014_d':
            api_url = 'eaIchPphApply';
            break;
        case '56014_e':
            api_url = 'eaIchPphApplyE';
            break;
        case '56014-3_a':
            api_url = 'eaPlYpApply';
            break;
        case '56014-3_b':
        case '56014-3_c':
        case '56014-3_d':
            api_url = 'eaAecrApply';
            break;
        case '56014-3_e':
            api_url = 'eaAecrApplyE';
            break;
        case '56015_a':
            api_url = 'eaMohRepApply';
            break;
        case '56015_b':
            api_url = 'eaMohRcrApply';
            break;
        case '56015_c':
            api_url = 'eaMohCopApply';
            break;
        case '56015_e':
            api_url = 'eaMohCopApplyE';
            break;
        case '56015_f':
            api_url = 'eaMohCopApplyE';
            break;
        case '56015_g':
            api_url = 'eaMohRcrApplyG';
            break;
        case '56022_b':
            api_url = 'eaIchProApply';
            break;
        case '56016':
            api_url = 'eaMohPecApply';
            break;
        case '56019':
            api_url = 'eaMohMcpApply';
            break;
            //新增的流程的url
        case '56022_c':
            api_url = 'eaIchProApplyC';
            break;
            // case '56014-3_e':
            //     api_url = '';
            //     break;
            // case '56015_f':
            //     api_url = '';
            //     break;
            // case '56015_g':
            //     api_url = '';
            //     break;
        default:
            break;
    }
    return api_url;
}

function getApplyUrl(projectNum) {
    var urlHashMapProvince = new HashMap();
    urlHashMapProvince.put('56004', '/app/f-gover-approval/56004/56004-apply.html');
    urlHashMapProvince.put('56005', '/app/f-gover-approval/56005/56005-apply.html');
    urlHashMapProvince.put('56008_a', '/app/f-gover-approval/56008/56008-a-apply.html');
    urlHashMapProvince.put('56008_b', '/app/f-gover-approval/56008/56008-b-apply.html');
    urlHashMapProvince.put('56009', '/app/f-gover-approval/56009/56009-apply.html');
    urlHashMapProvince.put('56010', '/app/f-gover-approval/56010/56010-apply.html');
    urlHashMapProvince.put('56012', '/app/f-gover-approval/56012/56012-apply.html');
    urlHashMapProvince.put('56013', '/app/f-gover-approval/56013/56013-apply.html');
    urlHashMapProvince.put('56014_a', '/app/f-gover-approval/56014/56014-a.html');
    urlHashMapProvince.put('56014_b', '/app/f-gover-approval/56014/56014-b.html');
    urlHashMapProvince.put('56014_c', '/app/f-gover-approval/56014/56014-c.html');
    urlHashMapProvince.put('56014_d', '/app/f-gover-approval/56014/56014-d.html');
    urlHashMapProvince.put('56014_e', '/app/f-gover-approval/56014/56014-e.html');
    urlHashMapProvince.put('56014-3_a', '/app/f-gover-approval/56014-3/56014-3-a.html');
    urlHashMapProvince.put('56014-3_b', '/app/f-gover-approval/56014-3/56014-3-b.html');
    urlHashMapProvince.put('56014-3_c', '/app/f-gover-approval/56014-3/56014-3-c.html');
    urlHashMapProvince.put('56014-3_d', '/app/f-gover-approval/56014-3/56014-3-d.html');
    urlHashMapProvince.put('56014-3_e', '/app/f-gover-approval/56014-3/56014-3-e.html');
    urlHashMapProvince.put('56015_a', '/app/f-gover-approval/56015/56015-a.html');
    urlHashMapProvince.put('56015_b', '/app/f-gover-approval/56015/56015-b.html');
    urlHashMapProvince.put('56015_c', '/app/f-gover-approval/56015/56015-c.html');
    urlHashMapProvince.put('56015_d', '/app/f-gover-approval/56015/56015-d.html');
    urlHashMapProvince.put('56015_e', '/app/f-gover-approval/56015/56015-e.html');
    urlHashMapProvince.put('56015_f', '/app/f-gover-approval/56015/56015-f.html');
    urlHashMapProvince.put('56015_g', '/app/f-gover-approval/56015/56015-g.html');
    urlHashMapProvince.put('56016', '/app/f-gover-approval/56016/56016-apply.html');
    urlHashMapProvince.put('56019', '/app/f-gover-approval/56019/56019-apply.html');
    urlHashMapProvince.put('56022_b', '/app/f-gover-approval/56022/56022-b.html');
    urlHashMapProvince.put('56022_c', '/app/f-gover-approval/56022/56022-c.html');
    urlHashMapProvince.put('56011', '/app/f-gover-approval/56011/56011-apply.html');
    return urlHashMapProvince.get(projectNum);
}
//点击待办跳转到申报表单
cmx.route.model({
    index: 'jumpToApply',
    handle: function (parameter, prevModelData, send, abort) {
        var toDoData = parameter.data;
        var isUse = parameter.isUse;
        var from = parameter.from;
        var directJump = parameter.directJump;
        //toDoData[parameter.index].applyId
        var _url = '';
        var _role = getData('role');
        //callajax
        var applyState = toDoData[parameter.index].status;

        var dealFlag = toDoData[parameter.index].dealFlag; //1-待发送；2-待处理；3-正在处理；4-已处理；5-拒绝；6-收回
        applyState = (IsEmpty(applyState) ? dealFlag : applyState);
        var examId = toDoData[parameter.index].examId;
        examId = IsEmpty(examId) ? '' : ('&examId=' + examId);
        var paramStr = 'from=' + from + '&status=' + applyState + '&applyId=' + toDoData[parameter.index].applyId + '&projectNum=' + toDoData[parameter.index].projectNum + examId + '&nowid=' + GetUrlParamString('nowid');
        switch (_role) {
            case 'counterpart':
                switch (applyState) {
                    case '101': //保存未发送
                    case '401': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'wenwujinchujingshenhe':
                switch (applyState) {
                    case '101': //保存未发送
                    case '401': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'gongzhongyonghu':
                switch (applyState) {
                    case '101': //保存未发送
                    case '401': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'bowuguan':
            case 'guobaodanwei':
            case 'paimaijigou':
            case 'kaogulingdui':
            case 'zizhijigou':
                switch (applyState) {
                    case '101': //保存未发送
                    case '401': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    case '991': //省局直接回退
                    case '881': //资质单位直接退回
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'kaogufajuedanwei':
                switch (applyState) {
                    case '101': //保存未发送
                    case '401': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    case '701': //考古流程的状态
                    case '481':
                    case '482':
                    case '883':
                    case '884':
                    case '873':
                    case '872':
                    case '980':
                    case '982':
                    case '981':
                        _url = '/app/f-gover-approval/counterpart/56008-b-chuli.html';
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'province':
                switch (applyState) {
                    case '101': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    case '401': //保存未发送
                        _url = getApplyUrl(toDoData[parameter.index].projectNum);
                        break;
                    case '501':
                        if (isUse)
                            _url = '/app/f-gover-approval/province/chuzhang.html';
                        else
                            _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                    case '502':
                        if (isUse)
                            _url = '/app/f-gover-approval/province/zhuanjiajigou.html';
                        else
                            _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                    case '503':
                        if (isUse)
                            _url = '/app/f-gover-approval/province/baobei.html';
                        else
                            _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                    case '601':
                        // if (isUse)
                        //     _url = '/app/f-gover-approval/province/baobei.html';
                        // else
                        _url = '/app/f-gover-approval/province/zhuanjiajigou.html';
                        break;
                    case '702': //考古流程的相关状态
                    case '493':
                    case '494':
                    case '874':
                    case '876':
                    case '864':
                    case '866':
                    case '980':
                    case '982':
                        _url = '/app/f-gover-approval/province/56008-b-province.html';
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'inspection':
                switch (applyState) {
                    case '2':
                    case '3':
                        if (toDoData[parameter.index].nowstatus && toDoData[parameter.index].nowstatus == '250') {
                            _url = '/app/f-gover-approval/inspection/check.html';
                        } else {
                            _url = '/app/f-gover-approval/inspection/pingshen.html';
                        }
                        break;
                    case '205':
                        _url = '/app/f-gover-approval/inspection/pingshen.html';
                        break;
                    default:
                        _url = '/app/f-gover-approval/applyinfo.html';
                        break;
                }
                break;
            case 'nation':
                if (isUse) {
                    switch (applyState) {
                        case '105': //考古处处理中（会签）
                            _url = '/app/f-gover-approval/nation/qianbao.html?type=2';
                            break;
                        case '101': //考古处新建会签（会签）
                            _url = '/app/f-gover-approval/nation/qianbao.html?type=-1';
                            break;
                            // case '103': //处领导处理中（会签）
                            //     _url = '/app/f-gover-approval/nation/qianbao.html?type=1';
                            //     break;
                            // case '104': //处员处理中（会签）
                            //     _url = '/app/f-gover-approval/nation/qianbao.html?type=1';
                            //     break;
                            // case '106': //文书室处理中（会签）
                            //     _url = '/app/f-gover-approval/nation/qianbao.html?type=3';
                            //     break;
                            // case '107': //局领导处理中（会签）
                            //     _url = '/app/f-gover-approval/nation/qianbao.html?type=4';
                            //     break;
                            // case '108': //文印室处理中（会签）
                            //     _url = '/app/f-gover-approval/nation/qianbao.html?type=6';
                            //     break;
                        case '109': //拟稿人办结（会签）
                            _url = '/app/f-gover-approval/nation/qianbao.html?type=6';
                            break;
                            // case '227': //文书室后处理中（发文中）
                            //     _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=8';
                            //     break;
                            // case '206': //司领导处理中（发文中）
                            //     _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=2';
                            //     break;
                            // case '209': //公示中
                            //     _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                            //     break;
                            // case '210': //办结
                            //     _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                            //     break;

                        case '201': //已发送，到文书室
                        case '304': //退回到文书室处理
                            _url = '/app/f-gover-approval/nation/wenshushi.html';
                            break;
                        case '202': //到司秘处理
                        case '303': //退回到司秘处理
                            _url = '/app/f-gover-approval/nation/simi.html';
                            break;
                        case '212': //司领导处理中（为了行业综合管理的待办）
                            _url = '/app/f-gover-approval/nation/sizhang.html';
                            break;
                        case '203': //到处长处理
                        case '305': //到处长处理(处员退回)
                            _url = '/app/f-gover-approval/nation/chuzhang.html';
                            break;
                        case '204': //处员处理
                            if (toDoData[parameter.index].projectNum == '56011') {
                                _url = '/app/f-gover-approval/nation/wenbaochu.html';
                            } else {
                                _url = '/app/f-gover-approval/nation/chuyuan.html';
                            }
                            break;
                        case '205': //第三方处理
                            if (toDoData[parameter.index].projectNum == '56008_b' && getData('userId') == 'kaoguchu') {
                                _url = '/app/f-gover-approval/nation/56008-b-zhuanjiajigou.html';
                            } else {
                                _url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            }
                            if (toDoData[parameter.index].applyStepFlag == 2) {
                                switch (toDoData[parameter.index].approveStatus) {
                                    case '223': //处领导处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                                        break;
                                    case '232':
                                    case '224': //处员处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                                        break;
                                    case '225': //秘书处处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=5';
                                        break;
                                    case '226': //文书室处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=3';
                                        break;
                                    case '227': //文书室后处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=8';
                                        break;
                                    case '206': //司领导处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=2';
                                        break;
                                    case '207': //局领导处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=4';
                                        break;
                                    case '208': //文印室处理中（发文中）
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=6';
                                        break;
                                    case '209': //公示中
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                                        break;
                                    case '210': //办结
                                        _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                                        break;
                                }
                            }
                            break;
                        case '213': //处领导处理中（已受理）
                        case '215': //处领导处理中（转办）
                            _url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            break;
                        case '214': //处员处理中（已受理）
                        case '216': //处员处理中（转办）
                            _url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            break;
                        case '223': //处领导处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=1';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                            }
                            // _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                            break;
                        case '224': //处员处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=1';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                            break;
                        case '225': //秘书处处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=5';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=5';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=5';
                            break;
                        case '226': //文书室处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=3';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=3';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=3';
                            break;
                        case '227': //文书室后处理中（发文中）
                            _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=8';
                            break;
                        case '206': //司领导处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=2';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=2';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=2';
                            break;
                        case '207': //局领导处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=4';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=4';
                            }
                            break;
                        case '208': //文印室处理中（发文中）
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=6';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=6';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=6';
                            break;
                        case '209': //公示中
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=7';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                            break;
                        case '210': //办结
                            if (toDoData[parameter.index].applyStepFlag == 3) { //会签流程
                                _url = '/app/f-gover-approval/nation/qianbao.html?type=7';
                            } else { //转发文流程
                                _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                            }
                            //_url = '/app/f-gover-approval/nation/zhuanfawen.html?type=7';
                            break;
                        case '301': //国家局退回
                            //_url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            break;
                        case '302': //国家局不予受理
                            //_url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            break;
                            //新版本考古的状态跳转从这里开始加
                        case '499': //考古处处理中（已受理）
                            _url = '/app/f-gover-approval/nation/56008-b-zhuanjiajigou.html';
                            break;
                        case '987': //考古处处理中
                            _url = '/app/f-gover-approval/nation/56008-b-kaoguchu.html';
                            break;
                        case '773':
                        case '777':
                            _url = '/app/f-gover-approval/nation/56008-b-fazheng.html';
                            break;
                        case '776':
                            _url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            break;
                        case '495': //考古处到秘书处
                        case '496':
                            _url = '/app/f-gover-approval/nation/56008-b-simi.html';
                            break;
                        case '497': //考古处到文书室
                        case '498':
                        case '877':
                        case '878':
                            _url = '/app/f-gover-approval/nation/56008-b-wenshushi.html';
                            break;
                        case '230':
                            _url = '/app/f-gover-approval/nation/wenbaochu.html';
                            break;
                        case '231':
                            _url = '/app/f-gover-approval/nation/zhuanjiajigou.html';
                            break;
                        case '232':
                            _url = '/app/f-gover-approval/nation/zhuanfawen.html?type=1';
                            break;
                        case '250':
                            _url = '/app/f-gover-approval/nation/wenbaochu.html';
                            break;
                        default:
                            _url = '/app/f-gover-approval/applyinfo.html';
                            break;
                    }
                } else
                    _url = '/app/f-gover-approval/applyinfo.html';
                break;

        }
        if (IsEmpty(_url)) {
            showAlert({
                type: 'alert',
                content: '该审批事项参数不全'
            });
        } else {

            _url = IsEmpty(_url) ? '/error.html' : (_url + (_url.indexOf('?') > 0 ? '&' : '?') + paramStr);
            if (toDoData[parameter.index].projectNum == '56014_a' || toDoData[parameter.index].projectNum == '56014-3_a') {
                _url = _url.replace(/f-gover-approval/, 'f-industry-integrated-manage');
            }
            if (from == 'app' || directJump === true)
                location.href = _url;
            else
                location.href = _url;
        }
    }
});

cmx.route.model({
    index: 'checkIsMyFlow',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/business/selectJurisdiction',
                data: JSON.stringify({
                    token: getData('token'),
                    applyId: parameter.applyId,
                    projectNum: parameter.projectNum,
                    status: parameter.status
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send2, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    if (prevModelData.data == '0') {
                        showAlert({
                            type: 'alert',
                            content: '本流程已被处理，现在前往查看详情页面！'
                        });
                        setTimeout(function () {
                            new cmx.process()
                                .turn('jumpToApply', {
                                    data: [{
                                        status: parameter.status,
                                        applyId: parameter.applyId,
                                        projectNum: parameter.projectNum
                                    }],
                                    isUse: false,
                                    index: 0,
                                    from: '',
                                    directJump: true
                                }).start();
                        }, 1000);
                        return;
                    }
                }
                send.go();
            })
            .start();
    }
});
cmx.g.regist('g_send', undefined);
cmx.g.regist('select_role', '');
cmx.route.model({
    index: 'selectUserRole',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn(function (prevModelData, send2, abort) {
                $('#cmx-role-modal').remove();
                $('.page-main').append('<div id="cmx-role-modal"></div>');
                $("#cmx-role-modal").load(getSelectRole, function () {
                    setTimeout(function () {
                        send2.go();
                    }, 100);
                });
            })
            .turn('callajax', {
                url: api_aa + '/user/getRolesByUserid',
                data: {
                    token: getData('token'),
                    userid: parameter.userId
                },
                type: 'GET'
            })
            .turn(function (prevModelData, send2, abort) {
                if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                    var data = prevModelData.data;
                    var _html = '';
                    if (data.length <= 0) {
                        showAlert({
                            type: 'alert',
                            content: '该用户没有配置角色，不能选择'
                        });
                    } else if (data.length == 1) {
                        cmx.g.select_role = data[0].roleId;
                        send.tomodel(data[0].roleId).go();
                    } else {
                        cmx.g.g_send = send;
                        for (var i in data) {
                            _html += [
                                '<div style="width:50%;padding:0 10px 10px;height: 50px;" class="pull-left">',
                                '<button class="btn btn-round btn-block btn-lg btn-primary btn-outline" onclick="continueSend(\'' + data[i].roleId + '\');">',
                                data[i].roleName,
                                '</button>',
                                '</div>'
                            ].join('');
                        }
                        $('#selectRoleModel .modal-body').html(_html + '<div class="clearfix"></div>');
                        $('#selectRoleModel').modal('show');
                    }
                }
                //这个turn的send.go()在上面的button的onclick里面
            })
            .start();
        // send.go();
    }
});

function continueSend(roleId) {
    cmx.g.g_send.tomodel(roleId).go();
    $('#selectRoleModel').modal('hide');
}
cmx.g.regist('loadSelectTree', false);
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
            this.selfRun();
        }
        send.go();
    }
});
//构造jstree数据结构
function projectNumtreeMenu(a, param) {
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
projectNumtreeMenu.prototype = {

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

//获取选择文物模态框内表格内容
cmx.route.model({
    index: 'getRelicList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(111)
        if (prevModelData.state == '200') {
            send.toviewresolve({
                parameter: parameter,
                prevModelData: prevModelData
            }).go();
        }

    }
});

var relicListFunc = {}; //用于选择文物模态框用数据
relicListFunc.pageNum = 1;
relicListFunc.pageCount = 0;
relicListFunc.searchWord1 = '';
relicListFunc.searchWord2 = '';
relicListFunc.searchWord3 = '';
relicListFunc.searchWord4 = '';
relicListFunc.searchWord5 = '';
relicListFunc.searchWord6 = '';
relicListFunc.getRelicList = function (param) {
    relicListFunc.searchWord1 = ($('#cmx-relic-name').val() == '-1') ? "" : $('#cmx-relic-name').val(); //文物名称
    relicListFunc.searchWord2 = ($('#cmx-relic-type').val() == '-1') ? "" : $('#cmx-relic-type').val(); //文物类别
    relicListFunc.searchWord3 = ($('#cmx-relic-level').val() == '-1') ? "" : $('#cmx-relic-level').val(); //文物级别
    relicListFunc.searchWord4 = ($('#cmx-incomplete-degree').val() == '-1') ? "" : $('#cmx-incomplete-degree').val(); //完残程度
    relicListFunc.searchWord5 = ($('#cmx-relic-time').val() == '-1') ? "" : $('#cmx-relic-time').val(); //所属年代
    relicListFunc.searchWord6 = ($('#cmx-collection-institution') == '-1') ? "" : $('#cmx-collection-institution').val(); //收藏单位
    new cmx.process()
        .turn('callajax', {
            url: api_dm + "/dmMuseumantique/getPageDataByParamAndUser", //选择文物api
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: relicListFunc.pageNum,
                pageSize: 10,
                formData: {
                    museumID: IsNull(relicListFunc.searchWord6) ? "" : relicListFunc.searchWord6,
                    age: relicListFunc.searchWord5,
                    intactStatus: relicListFunc.searchWord4,
                    relicLevel: relicListFunc.searchWord3,
                    culturalClass: relicListFunc.searchWord2,
                    antiqueName: relicListFunc.searchWord1,
                }
            }),
            type: 'POST'
        })
        .turn('getRelicList', param)
        .start();
};

//构建馆藏一级文物模态框
cmx.route.model({
    index: 'buildRelicInfoModal',
    handle: function (parameter, prevModelData, send, abort) {
        // $("#cmx-museum-modal-div").html(""); //TODO提醒于浩改一下

        //初始化列表分页
        var func_init_relicList_page = function () {
            relicListFunc.getRelicList(parameter);
            $('#cmx-relic-Pagination .first').unbind('click');
            $('#cmx-relic-Pagination .first').bind('click', function () {
                relicListFunc.pageNum = 1;
                relicListFunc.getRelicList(parameter);
            });
            $('#cmx-relic-Pagination .last').unbind('click');
            $('#cmx-relic-Pagination .last').bind('click', function () {
                relicListFunc.pageNum = relicListFunc.pageCount;
                relicListFunc.getRelicList(parameter);
            });
            $('#cmx-relic-Pagination .pre').unbind('click');
            $('#cmx-relic-Pagination .pre').bind('click', function () {
                if (relicListFunc.pageNum > 1) {
                    relicListFunc.pageNum--;
                    relicListFunc.getRelicList(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-relic-Pagination .next').unbind('click');
            $('#cmx-relic-Pagination .next').bind('click', function () {
                if (relicListFunc.pageNum < relicListFunc.pageCount) {
                    relicListFunc.pageNum++;
                    relicListFunc.getRelicList(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };

        //初始化模态框
        if (IsEmpty($("#cmx-modalDiv4").html())) {
            $("#cmx-modalDiv4").load(get56015SelectRelicModal, function () {
                $("#cmx-select-relic-modal").off('shown.bs.modal');
                $("#cmx-select-relic-modal").on('shown.bs.modal', function () {
                    $('#cmx-relic-name').val('');
                    $('#cmx-relic-type').val('-1');
                    $('#cmx-relic-level').val('-1');
                    $('#cmx-incomplete-degree').val('-1');
                    $('#cmx-relic-time').val('-1');
                    $('#cmx-collection-institution').val('-1');

                    //分页操作绑定,初始化
                    func_init_relicList_page();
                    //绑定搜索
                    $('#cmx-relic-search').unbind('click');
                    $('#cmx-relic-search').bind('click', function () {
                        relicListFunc.pageNum = 1;
                        relicListFunc.getRelicList(parameter);
                    });
                    //绑定清除
                    $("#cmx-relic-delete").unbind('click');
                    $("#cmx-relic-delete").bind('click', function () {
                        $('#cmx-relic-name').val('');
                        $('#cmx-relic-type').val('-1');
                        $('#cmx-relic-level').val('-1');
                        $('#cmx-incomplete-degree').val('-1');
                        $('#cmx-relic-time').val('-1');
                        $('#cmx-collection-institution').val('-1');
                        relicListFunc.pageNum = 1;
                        relicListFunc.getRelicList(parameter);
                    });
                });



                /*展开查询条件 */
                $(".cmx-more-research").unbind("click", function () {});
                $(".cmx-more-research").bind("click", function () {
                    $(".cmx-more-search-div").show();
                    $(".cmx-pack-up").show();
                    $(".cmx-more-research").hide();
                });
                /*收起查询条件 */
                $(".cmx-pack-up").unbind("click", function () {});
                $(".cmx-pack-up").bind("click", function () {
                    $(".cmx-more-search-div").hide();
                    $(".cmx-more-research").show();
                    $(".cmx-pack-up").hide();
                });
                //保证新打开的模态框处于最上面
                var modalLen = $(".modal-backdrop").length,
                    zIndex = $(".modal-backdrop").eq(0).css("z-index");
                for (var i = 1; i < modalLen; i++) {
                    $(".modal-backdrop").eq(i).css({
                        "z-index": zIndex + i * 10 + 1
                    });
                    $(".modal.in").eq(i).css({
                        "z-index": zIndex + (i + 1) * 10 + 1
                    });
                }

                $('#cmx-select-relic-modal').modal('show');
            });
        } else {
            $('#cmx-select-relic-modal').modal('show');
            $("#cmx-museum-confirm-btn").click(function () { //点击非国保单位按钮后操作
                if (IsEmpty(cmx.g.museumName)) {
                    showAlert({
                        type: 'info',
                        content: '请选择一个文物'
                    });
                    return;
                }
                parameter.goto();
            });
        }
    }
});

//获取博物馆模态框内表格内容
cmx.route.model({
    index: 'getMuseumList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(111)
        if (prevModelData.state == '200') {
            send.toviewresolve(prevModelData).go();
        }

    }
});

var museumListFunc = {}; //用于选择博物馆模态框用数据
museumListFunc.pageNum = 1;
museumListFunc.pageCount = 0;
museumListFunc.searchWord = '';
museumListFunc.getMuseum = function () {
    museumListFunc.searchWord = $('#cmx-museum-name').val();
    new cmx.process()
        .turn('callajax', {
            url: api_dm + "/dmMuseuminfo/getPageDataByParamAndUser",
            data: JSON.stringify({
                token: getData('token'),
                pageNumber: museumListFunc.pageNum,
                pageSize: 10,
                instName: museumListFunc.searchWord
            }),
            type: 'POST'
        })
        .turn('getMuseumList', {})
        .start();
};

//构建博物馆模态框
cmx.route.model({
    index: 'buildMuseumInfoModal',
    handle: function (parameter, prevModelData, send, abort) {
        // $("#cmx-museum-modal-div").html(""); //TODO提醒于浩改一下

        //初始化列表分页
        var func_init_museum_page = function () {
            museumListFunc.getMuseum();
            $('#cmx-museum-Pagination .first').unbind('click');
            $('#cmx-museum-Pagination .first').bind('click', function () {
                museumListFunc.pageNum = 1;
                museumListFunc.getMuseum();
            });
            $('#cmx-museum-Pagination .last').unbind('click');
            $('#cmx-museum-Pagination .last').bind('click', function () {
                museumListFunc.pageNum = museumListFunc.pageCount;
                museumListFunc.getMuseum();
            });
            $('#cmx-museum-Pagination .pre').unbind('click');
            $('#cmx-museum-Pagination .pre').bind('click', function () {
                if (museumListFunc.pageNum > 1) {
                    museumListFunc.pageNum--;
                    museumListFunc.getMuseum();
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-museum-Pagination .next').unbind('click');
            $('#cmx-museum-Pagination .next').bind('click', function () {
                if (museumListFunc.pageNum < museumListFunc.pageCount) {
                    museumListFunc.pageNum++;
                    museumListFunc.getMuseum();
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };

        //初始化模态框
        if (IsEmpty($("#cmx-museum-modal-div").html())) {
            $("#cmx-museum-modal-div").load(getMuseumModal, function () {
                $("#cmx-museum-modal").off('shown.bs.modal');
                $("#cmx-museum-modal").on('shown.bs.modal', function () {
                    //分页操作绑定,初始化
                    func_init_museum_page();
                    //绑定搜索
                    $('#cmx-museum-search').unbind('click');
                    $('#cmx-museum-search').bind('click', function () {
                        museumListFunc.pageNum = 1;
                        museumListFunc.getMuseum();
                    });
                    //绑定清除
                    $("#cmx-museum-delete").unbind('click');
                    $("#cmx-museum-delete").bind('click', function () {
                        $('#cmx-museum-name').val('');
                        museumListFunc.pageNum = 1;
                        museumListFunc.getMuseum();
                    });
                });
                $('#cmx-museum-modal').modal('show');
                $("#cmx-museum-confirm-btn").click(function () { //点击确认按钮后操作
                    if (IsEmpty(cmx.g.museumName)) {
                        showAlert({
                            type: 'info',
                            content: '请选择一个博物馆单位'
                        });
                        return;
                    }
                    parameter.goto();
                });
            });
        } else {
            $('#cmx-museum-modal').modal('show');
            $("#cmx-museum-confirm-btn").click(function () { //点击确认单位按钮后操作
                if (IsEmpty(cmx.g.museumName)) {
                    showAlert({
                        type: 'info',
                        content: '请选择一个博物馆单位'
                    });
                    return;
                }
                parameter.goto();
            });
        }
    }
});
//省文件号
function cmx_special_1(data) {
    var cmx_provincefile = "京文物字";
    var cmx_year = new Date();
    var cmx_currentyear = cmx_year.getFullYear();
    var cmx_fullyear = [];
    var option_1 = [];
    for (var i = 20; i > 0; i--) {
        cmx_fullyear[20 - i] = cmx_currentyear - i;
    }
    cmx_fullyear[20] = cmx_currentyear;
    for (var i = 1; i < 5; i++) {
        cmx_fullyear[20 + i] = cmx_currentyear + i;
    }
    for (var j = 0; j < cmx_fullyear.length; j++) {
        option_1 = option_1 + '<option value="' + cmx_fullyear[j] + '"' + (cmx_fullyear[j] == cmx_currentyear ?
            'selected="selected"' : '') + '>' + cmx_fullyear[j] + '</option>';
    }
    var html = [
        '<div class="cmx-special-provincefile" style="width:30%;float:left">',
        '<input placeholder="发文字号" class="form-control" type="text" id="' + data.columnindex + '-1" name="' + data.columnindex + '">',
        '</div>',
        '<div class="cmx-special-provincefile" style="width:3%;float:left;text-align:right">',
        '<span style="line-height: 32px;">[</span>',
        '</div>',
        '<div class="cmx-special-provincefile" style="width:30%;float:left">',
        '<select class="form-control" id="' + data.columnindex + '-2" name="' + data.columnindex + '">' + option_1 + '<select>',
        '</div>',
        '<div class="cmx-special-provincefile" style="width:3%;float:left">',
        '<span style="line-height: 32px;">]</span>',
        '</div>',
        '<div class="cmx-special-provincefile" style="width:30%;float:left">',
        '<input placeholder="文件编号" type="text" class="form-control" id="' + data.columnindex + '-3" name="' + data.columnindex + '" placeholder="' + data.extra.placeholder + '" value="">',
        '</div>',
        '<div class="cmx-special-provincefile" style="width:4%;float:left">',
        '<span style="line-height: 32px;">号</span>',
        '</div>',
    ].join("");
    $("#cmx-special-" + data.serialnumber).append(html);
}

// 进出境单证打印
function exitPrint(print) {
    $(".exit-application-print").off('click');
    $(".exit-application-print").on('click', function () {

        var applyId = $(this).attr("data-id");
        var token = getData("token");
        window.open(api_ea + '/eaScrSingleCard/' + print + '?token=' + token + '&applyId=' + applyId);
    });
}

// 文物图片信息展示--旧版本
// function showRelicimg(index, ident) {

//     new cmx.process()
//         .turn('initFiles', {
//             'P00030': '158'
//         })
//         .start();
//     if (!IsNull(index)) {
//         for (var id in cmx.g.filelinkfileclass) {
//             var fileclassid = cmx.g.filelinkfileclass[id];
//             if (IsNull(cmx.g.filesarray.get(fileclassid))) {
//                 cmx.g.filesarray.put(fileclassid, []);
//             }


//             for (var i = 0; i < index.length; i++) {
//                 var fileindexid = index[i];
//                 cmx.g.filesarray.get(fileclassid).push(fileindexid);
//                 if (ident == 0) {
//                     var button = '<button onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')" type="button" class="btn btn-icon btn-primary btn-sm btn-round img-remove-btn">' +
//                         '<i class="icon wb-close" aria-hidden="true"></i></button>';
//                 } else {
//                     var button = '';
//                     $("#P00030").hide();
//                 }
//                 $('#filelist-' + id + '.file-upload-list').append([
//                     '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
//                     '<div class="btn-group" role="group">',
//                     '',
//                     '<img onclick="downloadThisFile(\'' + fileindexid + '\')" src="' + getFile + fileindexid + '" style="min-width: 150px !important;max-width: 150px !important;" class="cmx-upload-file-name"/>',
//                     button + '</div>',
//                     '</li>'
//                 ].join(''));
//             }

//         }
//     }
// }
//图片显示-2018.1.25
function showRelicimg(index, ident, relicId, mainImg) {
    $("<link>")
        .attr({
            rel: "stylesheet",
            type: "text/css",
            href: '/vendor/slick-carousel/slick.css'
        })
        .appendTo("head");
    $("<link>")
        .attr({
            rel: "stylesheet",
            type: "text/css",
            href: '/css/examples/components/basic/carousel.css'
        })
        .appendTo("head");
    $.getScript('/vendor/slick-carousel/slick.min.js', function () {
        if (ident == 4) {
            new cmx.process()
                .turn('initFiles', {
                    'P00030S': '158'
                })
                .start();
        } else {
            new cmx.process()
                .turn('initFiles', {
                    'P00030': '158'
                })
                .start();
        }
        if (!IsNull(index)) {
            for (var id in cmx.g.filelinkfileclass) {
                $('#filelist-' + id + '.file-upload-list').html('');
                var fileclassid = cmx.g.filelinkfileclass[id];
                if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                    cmx.g.filesarray.put(fileclassid, []);
                }
                if (IsEmpty(cmx.g.imgNumber)) {
                    cmx.g.regist('imgNumber', new HashMap());
                }
                cmx.g.imgNumber.put(id, 0)
                $('#filelist-' + id + '.file-upload-list').append([
                    '<div class="example-wrap margin-0 padding-0">',
                    '<div class="example margin-0 padding-0">',
                    '<div class="slider" id="exampleLazy">',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join(''));

                for (var i = 0; i < index.length; i++) {
                    cmx.g.imgNumber.put(id, i + 1);
                    var fileindexid = index[i];

                    var button = '',
                        setMainImg = '';
                    if (ident == 1) {
                        setMainImg = '<a class="btn btn-sm btn-outline margin-right-5 btn-warning" href="' + getFile + fileindexid + '"  download="文物.jpg">下载文物</a><button data-id="' + relicId + '" data-index="' + index[i] + '" class="setMainImg btn btn-sm btn-outline btn-success">设为主图片</button>';
                    } else if (ident == 0) {
                        button = '<button  fileclassid="' + fileclassid + '" fileindexid="' + fileindexid + '" dataid="' + id + '" delete-tag="delete56020img' + fileindexid + '" class="btn btn-sm btn-outline margin-right-5 btn-warning">删除</button>';
                    } else if (ident == 2) {
                        // setMainImg ='<a class="btn btn-sm btn-outline margin-right-5 btn-warning" href="' + getFile + fileindexid + '"  download="文物.jpg">下载文物</a><button data-id="' + relicId + '" data-index="' + index[i] + '" class="setMainImg btn btn-sm btn-outline btn-success">设为主图片</button>';
                        button = '<div><button  fileclassid="' + fileclassid + '" fileindexid="' + fileindexid + '" dataid="' + id + '" delete-tag="delete56020img' + fileindexid + '" class="btn btn-sm btn-outline margin-bottom-5 btn-warning">删除图片</button></div>';
                    } else {
                        $("#P00030").hide();
                        setMainImg = '<a class="btn btn-sm btn-outline margin-right-5 btn-warning" href="' + getFile + fileindexid + '"  download="文物.jpg">下载文物</a>';
                    }
                    cmx.g.filesarray.get(fileclassid).push(fileindexid);
                    $('#filelist-' + id + '.file-upload-list #exampleLazy').append([
                        '<div id="cmx-file-index-id-' + fileindexid + '" style="width:180px;">',
                        (fileindexid == mainImg) ? '<i data-iconStar="' + index[i] + '" class="iconStar icon wb-star orange-600"></i>' : '<i data-iconStar="' + index[i] + '" style="visibility:hidden" class="iconStar icon wb-star orange-600"></i>',
                        '<a class="turnBig" href="javascript:void(0)">',
                        '<img class="img-responsive" alt="图片" src="' + getFile + fileindexid + '">',
                        '</a>',
                        button,
                        setMainImg,
                        '<br>',
                        '</div>'
                    ].join(''));
                    //删除
                    $('[delete-tag="delete56020img' + fileindexid + '"]').on('click', function () {
                        removeThisFile56020($(this).attr('fileclassid'), $(this).attr('fileindexid'), $(this).attr('dataid'));
                        cmx.g.viewer.destroy();
                        cmx.g.viewer = new Viewer($('#filelist-' + $(this).attr('dataid'))[0], {
                            navbar: false,
                            show: function () {
                                show56020img_flag = false;
                            },
                            hidden: function () {
                                show56020img_flag = false;
                            }
                        });
                    });
                    $('.turnBig').bind("contextmenu", function (e) {
                        return false;
                    });
                    if ($('#filelist-' + id + '.file-upload-list').find('img').length != 1) {
                        cmx.g.viewer.destroy();
                    }
                    cmx.g.viewer = new Viewer($('#filelist-' + id)[0], {
                        navbar: false,
                        show: function () {
                            show56020img_flag = false;
                        },
                        hidden: function () {
                            show56020img_flag = false;
                        }
                    });

                    // $('#filelist-' + id + '.file-upload-list #exampleLazy .turnBig').magnificPopup({
                    //     type: 'image',
                    //     closeOnContentClick: true,
                    //     mainClass: 'mfp-img-mobile',
                    //     image: {
                    //         verticalFit: true
                    //     },
                    //     focus: function () {
                    //         $('img').bind("contextmenu", function (e) { return false; })
                    //     }
                    // })
                }
                $('#filelist-' + id + '.file-upload-list #exampleLazy').slick({
                    lazyLoad: 'ondemand',
                    slidesToShow: (ident == 3 || ident == 4) ? '1' : '3',
                    slidesToScroll: 1
                });
                cmx.g.imgNum = index.length;
                $('.setMainImg').off('click');
                $('.setMainImg').on('click', function () {
                    var relicId = $(this).attr('data-id');
                    var index = $(this).attr('data-index');
                    var iconStar = $(this).parent().find('.iconStar').attr('data-iconStar');
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/setUpMainPriture',
                            data: JSON.stringify({
                                token: getData('token'),
                                index: index,
                                relicId: relicId
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData.data) && prevModelData.state == '200') {
                                showAlert({
                                    type: 'success',
                                    content: prevModelData.msg
                                });
                                $('.iconStar').css('visibility', 'hidden');
                                $('[data-iconStar=' + iconStar + ']').css('visibility', 'visible');

                            } else {
                                showAlert({
                                    type: 'error',
                                    content: prevModelData.msg
                                });
                            }
                        })
                        .start()
                });

            }
        } else {
            cmx.g.imgNum = 0;
        }
    });


}

function removeThisFile56020(fileclassid, fileindexid, id) {
    var m = cmx.g.imgNumber.get(id);
    m--;
    cmx.g.imgNumber.put(id, m);
    console.log('#cmx-file-index-id-' + fileindexid);
    var _tempfilearray = cmx.g.filesarray.get(fileclassid);
    removeByValue(_tempfilearray, fileindexid);
    cmx.g.filesarray.put(fileclassid, _tempfilearray);
    $('#cmx-file-index-id-' + fileindexid).remove();
}

function showFile(data, num) {
    for (var id in cmx.g.filelinkfileclass) {
        var fileclassid = cmx.g.filelinkfileclass[id];
        var response = data;
        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
            cmx.g.filesarray.put(fileclassid, []);
        }

        var fileindexid = response.fileIndex;
        cmx.g.filesarray.get(fileclassid).push(fileindexid);
        if (IsEmpty(fileindexid))
            continue;
        $('#filelist-' + id + '.file-upload-list').append([
            '<li id="cmx-file-index-id-' + fileindexid + '" style="list-style:none;margin-bottom:10px;">',
            '<div class="btn-group" role="group">',
            '<a href="' + getFile + fileindexid + '" download="' + response.fileName + '" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
            response.fileName,
            '</a>',
            '<button type="button" class="approvalDocuments btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
            '<i class="icon wb-trash" aria-hidden="true"></i>',
            '</button>',
            '</div>',
            '</li>'
        ].join(''));
        if (num == 0) {
            $("#P0002approvalDocuments").parent().css('display', 'none');
            $(".approvalDocuments").css('display', 'none');
        }

    }
}

//获取选择批复文件模态框内表格内容
cmx.route.model({
    index: 'getReplyList',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(111)
        if (prevModelData.state == '200') {
            send.toviewresolve({
                parameter: parameter,
                prevModelData: prevModelData
            }).go();
        }

    }
});

var replyListFunc = {}; //用于选择文物模态框用数据
replyListFunc.pageNum = 1;
replyListFunc.pageCount = 0;
replyListFunc.searchWord1 = '';
replyListFunc.searchWord2 = '';
replyListFunc.searchWord3 = '';
replyListFunc.getReplyList = function (param) {
    replyListFunc.searchWord1 = $('#cmx-reply-number').val(); //批复文号
    replyListFunc.searchWord2 = $('#cmx-pro-name').val(); //项目名称
    replyListFunc.searchWord3 = $('#cmx-reply-title').val(); //批复标题
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaPubPplan/queryPplanList", //56014-d批复文件模态框信息
            data: JSON.stringify({
                token: getData('token'),
                pageNo: replyListFunc.pageNum,
                pageSize: 10,
                rftitle: replyListFunc.searchWord3,
                protectName: replyListFunc.searchWord2,
                rfnumber: replyListFunc.searchWord1
            }),
            type: 'POST'
        })
        .turn('getReplyList', param)
        .start();
};

//构建馆藏一级文物模态框
cmx.route.model({
    index: 'buildSelectReplyList',
    handle: function (parameter, prevModelData, send, abort) {

        // 初始化列表分页
        var func_init_replyList_page = function () {
            replyListFunc.getReplyList(parameter);
            $('#cmx-reply-Pagination .first').unbind('click');
            $('#cmx-reply-Pagination .first').bind('click', function () {
                replyListFunc.pageNum = 1;
                replyListFunc.getReplyList(parameter);
            });
            $('#cmx-reply-Pagination .last').unbind('click');
            $('#cmx-reply-Pagination .last').bind('click', function () {
                replyListFunc.pageNum = replyListFunc.pageCount;
                replyListFunc.getReplyList(parameter);
            });
            $('#cmx-reply-Pagination .pre').unbind('click');
            $('#cmx-reply-Pagination .pre').bind('click', function () {
                if (replyListFunc.pageNum > 1) {
                    replyListFunc.pageNum--;
                    replyListFunc.getReplyList(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-reply-Pagination .next').unbind('click');
            $('#cmx-reply-Pagination .next').bind('click', function () {
                if (replyListFunc.pageNum < replyListFunc.pageCount) {
                    replyListFunc.pageNum++;
                    replyListFunc.getReplyList(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };

        //初始化模态框
        if (IsEmpty($("#cmx-reply-modalDiv").html())) {
            $("#cmx-reply-modalDiv").load(getReplyModal, function () {
                $("#cmx-reply-modal").off('shown.bs.modal');
                $("#cmx-reply-modal").on('shown.bs.modal', function () {
                    // alert(111)
                    // 分页操作绑定,初始化
                    func_init_replyList_page();
                    //绑定搜索
                    $('#cmx-reply-search').unbind('click');
                    $('#cmx-reply-search').bind('click', function () {
                        replyListFunc.pageNum = 1;
                        replyListFunc.getReplyList(parameter);
                    });
                    //绑定清除
                    $("#cmx-reply-delete").unbind('click');
                    $("#cmx-reply-delete").bind('click', function () {
                        $('#cmx-museum-name').val('');
                        replyListFunc.pageNum = 1;
                        replyListFunc.getReplyList(parameter);
                    });
                });



                /*展开查询条件 */
                $(".cmx-more-research").unbind("click", function () {});
                $(".cmx-more-research").bind("click", function () {
                    $(".cmx-more-search-div").show();
                    $(".cmx-pack-up").show();
                    $(".cmx-more-research").hide();
                });
                /*收起查询条件 */
                $(".cmx-pack-up").unbind("click", function () {});
                $(".cmx-pack-up").bind("click", function () {
                    $(".cmx-more-search-div").hide();
                    $(".cmx-more-research").show();
                    $(".cmx-pack-up").hide();
                });
                $("#cmx-reply-confirm-btn").click(function () { //点击非国保单位按钮后操作
                    if (IsEmpty(cmx.g.replyName)) {
                        showAlert({
                            type: 'info',
                            content: '请选择一项'
                        });
                        return;
                    }
                    parameter.goto();
                });
                $('#cmx-reply-modal').modal('show');
            });
        } else {
            $('#cmx-reply-modal').modal('show');
            $("#cmx-reply-confirm-btn").click(function () { //点击非国保单位按钮后操作
                if (IsEmpty(cmx.g.replyName)) {
                    showAlert({
                        type: 'info',
                        content: '请选择一项'
                    });
                    return;
                }
                parameter.goto();
            });
        }
    }
});

// 处理app传过来的参数
function handleParam() {
    var applyId = '';
    var urlApplyId = GetUrlParamString('applyId'),
        urlToken = GetUrlParamString('token');

    if (!IsEmpty(urlApplyId) && !IsEmpty(urlToken)) {
        applyId = urlApplyId;
        putData('token', urlToken);
        $(".pagination").eq(0).hide();
    }
}

//获取选择文物模态框内表格内容
cmx.route.model({
    index: 'getexpertRelic',
    handle: function (parameter, prevModelData, send, abort) {
        // alert(111)
        console.log(parameter);
        console.log(prevModelData);
        if (prevModelData.state == '200') {
            send.toviewresolve({
                parameter: parameter,
                prevModelData: prevModelData
            }).go();
        }

    }
});

var expertRelicFunc = {}; //用于博物馆专家意见选择文物模态框用数据
expertRelicFunc.pageNum = 1;
expertRelicFunc.pageCount = 0;
expertRelicFunc.searchWord = '';
expertRelicFunc.getExpertRelic = function (param) {
    expertRelicFunc.searchWord = $('#cmx-relic-name').val(); //文物名称
    new cmx.process()
        .turn('callajax', {
            url: api_ea + "/eaMohPecRelicdetail/getRelicListForDialog", //选择文物api
            data: JSON.stringify({
                token: getData('token'),
                pageNo: expertRelicFunc.pageNum,
                pageSize: 15,
                relFormData: {
                    applyId: param.applyId,
                    projectNum: param.projectNum
                }
            }),
            type: 'POST'
        })
        .turn('getexpertRelic', param)
        .start();
};

//构建馆藏一级文物模态框
cmx.route.model({
    index: 'buildExpertMuseumRelicModal',
    handle: function (parameter, prevModelData, send, abort) {

        //初始化列表分页
        var func_init_expertRelic_page = function () {
            expertRelicFunc.getExpertRelic(parameter);
            $('#cmx-relic-Pagination .first').unbind('click');
            $('#cmx-relic-Pagination .first').bind('click', function () {
                expertRelicFunc.pageNum = 1;
                expertRelicFunc.getExpertRelic(parameter);
            });
            $('#cmx-relic-Pagination .last').unbind('click');
            $('#cmx-relic-Pagination .last').bind('click', function () {
                expertRelicFunc.pageNum = expertRelicFunc.pageCount;
                expertRelicFunc.getExpertRelic(parameter);
            });
            $('#cmx-relic-Pagination .pre').unbind('click');
            $('#cmx-relic-Pagination .pre').bind('click', function () {
                if (expertRelicFunc.pageNum > 1) {
                    expertRelicFunc.pageNum--;
                    expertRelicFunc.getExpertRelic(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是第一页'
                    });
                }
            });
            $('#cmx-relic-Pagination .next').unbind('click');
            $('#cmx-relic-Pagination .next').bind('click', function () {
                if (expertRelicFunc.pageNum < expertRelicFunc.pageCount) {
                    expertRelicFunc.pageNum++;
                    expertRelicFunc.getExpertRelic(parameter);
                } else {
                    showAlert({
                        type: 'info',
                        content: '已经是最后一页'
                    });
                }
            });
        };

        //初始化模态框
        if (IsEmpty($("#cmx-expert-select-relic-div").html())) {
            $("#cmx-expert-select-relic-div").load(getExpertRelicModal, function () {
                $("#cmx-expert-select-relic-modal").off('shown.bs.modal');
                $("#cmx-expert-select-relic-modal").on('shown.bs.modal', function () {
                    //分页操作绑定,初始化
                    func_init_expertRelic_page();
                    //绑定搜索
                    $('#cmx-relic-search').unbind('click');
                    $('#cmx-relic-search').bind('click', function () {
                        expertRelicFunc.pageNum = 1;
                        expertRelicFunc.getExpertRelic(parameter);
                    });
                    //绑定清除
                    $("#cmx-relic-delete").unbind('click');
                    $("#cmx-relic-delete").bind('click', function () {
                        $('#cmx-museum-name').val('');
                        expertRelicFunc.pageNum = 1;
                        expertRelicFunc.getExpertRelic(parameter);
                    });
                });
                $('#cmx-expert-select-relic-modal').modal('show');
            });
        } else {
            $('#cmx-expert-select-relic-modal').modal('show');
            $("#cmx-museum-confirm-btn").click(function () { //点击非国保单位按钮后操作
                if (IsEmpty(cmx.g.museumName)) {
                    showAlert({
                        type: 'info',
                        content: '请选择一个文物'
                    });
                    return;
                }
                parameter.goto();
            });
        }
    }
});
//相关文件列表
cmx.route.model({
    index: 'getRelevantFiles',
    handle: function (parameter, prevModelData, send, abort) {

        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubRelapply/getRelevantFiles',
                data: JSON.stringify({
                    token: getData('token'),
                    pageNo: parameter.pageNo,
                    pageSize: parameter.pageSize,
                    tdldFormData: {
                        oldProFileTitle: parameter.oldProFileTitle,
                        oldoriginalNo: parameter.oldoriginalNo,
                        oldProjectName: parameter.oldProjectName
                    },
                    protectUnitName: parameter.protectUnitName,
                    province: parameter.province
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    var data = prevModelData.data.dataList;
                    if (!IsNull(data)) {
                        for (var i = 0; i < data.length; i++) {
                            html += [
                                '<tr>',
                                '<td>' + (i + 1) + '</td>',
                                '<td><input type="checkbox" value="' + data[i].oldBatchId + '" ' + (IsEmpty(cmx.g.relatedFile.get(data[i].oldBatchId)) ? '' : 'checked') + '></td>',
                                '<td>' + data[i].oldProFileTitle + '</td>',
                                '<td>' + data[i].oldOriginalNo + '</td>',
                                '<td>' + data[i].oldProjectName + '</td>',
                                '</tr>'
                            ].join('');
                        }
                    }

                    $('#cmx-related-file-table tbody').html(html);
                    $('#related-page .nowpage').text(prevModelData.data.pageNumber);
                    $('#related-page .totalpage').text(prevModelData.data.pages);
                    parameter.callback(prevModelData.data.pages);
                    $("#cmx-related-file-table input").each(function (index) {
                        $(this).on('click', function () {
                            if ($(this).is(":checked")) {
                                cmx.g.relatedFile.put(data[index].oldBatchId, data[index]);
                            } else {
                                cmx.g.relatedFile.remove(data[index].oldBatchId);
                            }
                        });
                    });
                    $('#cmx-confirm-btn').unbind('click');
                    $('#cmx-confirm-btn').bind('click', function () {
                        var fhtml = '';
                        var values = cmx.g.relatedFile.values();
                        $('#filelist-P0907.file-upload-list').html('');
                        for (var i = 0; i < values.length; i++) {
                            new cmx.process()
                                .turn('callajax', {
                                    url: getFileList,
                                    data: JSON.stringify({
                                        token: getData('token'), //类型：String  必有字段  备注：无
                                        applyId: values[i].oldApplyId, //类型：String  必有字段  备注：申请ID
                                        apprItem: values[i].oldProjectNum, //类型：String  必有字段  备注：项目编号
                                        fileClass: '01'
                                    }),
                                    async: false,
                                    type: 'POST'
                                })
                                .turn(function (prevModelData, send, abort) {
                                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                        var fileclassid = '907';
                                        var id = 'P0907';
                                        var response = prevModelData;
                                        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                                            cmx.g.filesarray.put(fileclassid, []);
                                        }
                                        for (var ft = 0; ft < response.data.length; ft++) {
                                            var fileindexid = response.data[ft].fileIndex;
                                            fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                                            cmx.g.filesarray.get(fileclassid).push(fileindexid);
                                            if (IsEmpty(fileindexid))
                                                continue;
                                            $('#filelist-' + id + '.file-upload-list').prepend([
                                                '<li id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
                                                '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                                response.data[ft].fileName,
                                                '</button>',
                                                '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                                                '<i class="icon wb-trash" aria-hidden="true"></i>',
                                                '</button>',
                                                '<div class="clearfix"></div>',
                                                '</li>'
                                            ].join(''));
                                        }
                                    }
                                })
                                .turn('callajax', {
                                    url: getFileList,
                                    data: JSON.stringify({
                                        token: getData('token'), //类型：String  必有字段  备注：无
                                        applyId: values[i].oldApplyId, //类型：String  必有字段  备注：申请ID
                                        apprItem: values[i].oldProjectNum, //类型：String  必有字段  备注：项目编号
                                        fileClass: '902'
                                    }),
                                    async: false,
                                    type: 'POST'
                                })
                                .turn(function (prevModelData, send, abort) {
                                    if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                        var fileclassid = '907';
                                        var id = 'P0907';
                                        var response = prevModelData;
                                        if (IsNull(cmx.g.filesarray.get(fileclassid))) {
                                            cmx.g.filesarray.put(fileclassid, []);
                                        }
                                        for (var ft = 0; ft < response.data.length; ft++) {
                                            var fileindexid = response.data[ft].fileIndex;
                                            fileindexid = (IsEmpty(fileindexid) ? response.data[ft].fileindexid : fileindexid);
                                            cmx.g.filesarray.get(fileclassid).push(fileindexid);
                                            if (IsEmpty(fileindexid))
                                                continue;
                                            $('#filelist-' + id + '.file-upload-list').prepend([
                                                '<li id="cmx-file-index-id-' + fileindexid + '" class="list-group-item" file-index="' + fileindexid + '">',
                                                '<button onclick="downloadThisFile(\'' + fileindexid + '\')" type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                                response.data[ft].fileName,
                                                '</button>',
                                                '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeThisFile(\'' + fileclassid + '\',\'' + fileindexid + '\')">',
                                                '<i class="icon wb-trash" aria-hidden="true"></i>',
                                                '</button>',
                                                '<div class="clearfix"></div>',
                                                '</li>'
                                            ].join(''));
                                        }
                                    }
                                })
                                .start();
                        }
                        setTimeout(function () {
                            sortable('#filelist-P0907', 'destroy');
                            sortable('#filelist-P0907');
                        }, 100);
                        $("#cmx-related-file").modal("hide");
                    });
                }
            })
            .start();
    }
});
//转发文相关文件列表
cmx.route.model({
    index: 'getRelevantFilesForZhuanfawen',
    handle: function (parameter, prevModelData, send, abort) {

        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubRelapply/getRelevantFiles',
                data: JSON.stringify({
                    token: getData('token'),
                    pageNo: parameter.pageNo,
                    pageSize: parameter.pageSize,
                    tdldFormData: {
                        oldProFileTitle: parameter.oldProFileTitle,
                        oldoriginalNo: parameter.oldoriginalNo,
                        oldProjectName: parameter.oldProjectName
                    },
                    protectUnitName: parameter.protectUnitName,
                    province: parameter.province
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    var data = prevModelData.data.dataList;
                    if (!IsNull(data)) {
                        for (var i = 0; i < data.length; i++) {
                            html += [
                                '<tr>',
                                '<td>' + (i + 1) + '</td>',
                                '<td><input type="checkbox" value="' + data[i].oldBatchId + '" ' + (IsEmpty(cmx.g.relatedFile.get(data[i].oldBatchId)) ? '' : 'checked') + '></td>',
                                '<td>' + data[i].oldProFileTitle + '</td>',
                                '<td>' + data[i].oldOriginalNo + '</td>',
                                '<td>' + data[i].oldProjectName + '</td>',
                                '</tr>'
                            ].join('');
                        }
                    }

                    $('#cmx-related-file-table tbody').html(html);
                    $('#related-page .nowpage').text(prevModelData.data.pageNumber);
                    $('#related-page .totalpage').text(prevModelData.data.pages);
                    parameter.callback(prevModelData.data.pages);
                    $("#cmx-related-file-table input").each(function (index) {
                        $(this).on('click', function () {
                            if ($(this).is(":checked")) {
                                cmx.g.relatedFile.put(data[index].oldBatchId, data[index]);
                            } else {
                                cmx.g.relatedFile.remove(data[index].oldBatchId);
                            }
                        });
                    });
                    $('#cmx-confirm-btn').unbind('click');
                    $('#cmx-confirm-btn').bind('click', function () {
                        var fhtml = '';
                        var values = cmx.g.relatedFile.values();
                        $('#filelist-P0907.file-upload-list').html('');
                        for (var i = 0; i < values.length; i++) {
                            $('#filelist-P0907.file-upload-list').append('<li class="list-group-item" data-toggle="tooltip" data-placement="left" title="' + values[i].oldProjectName + '" data-original-title="' + values[i].oldProjectName + '">' + values[i].oldProjectName +
                                '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeOldProject(event,this,\'' + values[i].oldBatchId + '\')">' +
                                '<i class="icon wb-trash" aria-hidden="true"></i>' +
                                '</button>' +
                                '</li>');
                        }
                        $('[data-toggle="tooltip"]').tooltip();
                        $('#filelist-P0907').sortable({
                            handle: ".wb-move"
                        });
                        $('#filelist-P0907.file-upload-list li').each(function (index) {
                            $(this).off('click');
                            $(this).on('click', function () {
                                window.open('/app/f-gover-approval/applyinfo.html?from=undefied&status=' + cmx.g.relatedFile.values()[index].oldStatus + '&applyId=' + cmx.g.relatedFile.values()[index].oldApplyId + '&projectNum=' + cmx.g.relatedFile.values()[index].oldProjectNum + '&nowid=' + GetUrlParamString('nowid'));
                            });
                        })
                        $("#cmx-related-file").modal("hide");
                    });
                }
            })
            .start();
    }
});

//批量审批（会签）相关文件列表
cmx.route.model({
    index: 'getRelevantFilesForHuiqian',
    handle: function (parameter, prevModelData, send, abort) {
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaPubCountersign/getRelevantFiles',
                data: JSON.stringify({
                    token: getData('token'),
                    pageNo: parameter.pageNo,
                    pageSize: parameter.pageSize,
                    tdldFormData: {
                        oldProFileTitle: parameter.oldProFileTitle,
                        oldoriginalNo: parameter.oldoriginalNo,
                        oldProjectName: parameter.oldProjectName
                    },
                    protectUnitName: parameter.protectUnitName,
                    province: parameter.province
                }),
                type: 'POST'
            })
            .turn(function (prevModelData, send, abort) {
                console.log(prevModelData)
                if (prevModelData.state == '200') {
                    var html = '';
                    var data = prevModelData.data.dataList;
                    if (!IsNull(data)) {
                        for (var i = 0; i < data.length; i++) {
                            html += [
                                '<tr>',
                                '<td>' + (i + 1) + '</td>',
                                '<td><input type="checkbox" value="' + data[i].oldBatchId + '" ' + (IsEmpty(cmx.g.relatedFile.get(data[i].oldBatchId)) ? '' : 'checked') + '></td>',
                                '<td>' + data[i].oldProFileTitle + '</td>',
                                '<td>' + data[i].oldOriginalNo + '</td>',
                                '<td>' + data[i].oldProjectName + '</td>',
                                '</tr>'
                            ].join('');
                        }
                    }

                    $('#cmx-related-file-table tbody').html(html);
                    $('#related-page .nowpage').text(prevModelData.data.pageNumber);
                    $('#related-page .totalpage').text(prevModelData.data.pages);
                    parameter.callback(prevModelData.data.pages);
                    $("#cmx-related-file-table input").each(function (index) {
                        $(this).on('click', function () {
                            if ($(this).is(":checked")) {
                                cmx.g.relatedFile.put(data[index].oldBatchId, data[index]);
                            } else {
                                cmx.g.relatedFile.remove(data[index].oldBatchId);
                            }
                        });
                    });
                    $('#cmx-confirm-btn').unbind('click');
                    $('#cmx-confirm-btn').bind('click', function () {
                        var fhtml = '';
                        var values = cmx.g.relatedFile.values();
                        $('#filelist-P0907.file-upload-list').html('');
                        for (var i = 0; i < values.length; i++) {
                            $('#filelist-P0907.file-upload-list').append([
                                '<li data-toggle="tooltip" data-placement="left" title="' + values[i].oldProjectName + '" data-original-title="' + values[i].oldProjectName + '"  class="list-group-item">',
                                '<i class="icon wb-move" aria-hidden="true" draggable="true"></i>',
                                '<button  type="button" class="btn btn-outline btn-default cmx-upload-file-name">',
                                values[i].oldProjectName,
                                '</button>',
                                '<button type="button" class="remove-btn btn btn-outline btn-default" onclick="removeOldProject(event,this,\'' + values[i].oldBatchId + '\')">',
                                '<i class="icon wb-trash" aria-hidden="true"></i>',
                                '</button>',
                                '<div class="clearfix"></div>',
                                '</li>'
                            ].join(''));

                            // $('#filelist-P0907.file-upload-list').append(
                            //     '<li class="list-group-item" style="min-height:30px" data-toggle="tooltip" data-placement="left" title="' + values[i].oldProjectName + '" data-original-title="' + values[i].oldProjectName + '">' +
                            //     '<button type="button" class="remove-btn btn btn-outline btn-default cmx-upload-file-name" onclick="removeOldProject(event,this,\'' + values[i].oldBatchId + '\')">' + values[i].oldProjectName +
                            //     '<i class="icon wb-trash" aria-hidden="true"></i>' +
                            //     '</button>' +
                            //     '</li>');
                        }
                        $('[data-toggle="tooltip"]').tooltip();
                        $('#filelist-P0907').sortable({
                            handle: ".wb-move"
                        });
                        $('#filelist-P0907.file-upload-list li').each(function (index) {
                            $(this).off('click');
                            $(this).on('click', function () {
                                window.open('/app/f-gover-approval/applyinfo.html?from=undefied&status=' + cmx.g.relatedFile.values()[index].oldStatus + '&applyId=' + cmx.g.relatedFile.values()[index].oldApplyId + '&projectNum=' + cmx.g.relatedFile.values()[index].oldProjectNum + '&nowid=' + GetUrlParamString('nowid'));
                            });
                        })
                        $("#cmx-related-file").modal("hide");
                    });
                }
            })
            .start();
    }
});

function removeOldProject(ev, ele, oldBatchId) {
    ev.stopPropagation();
    cmx.g.relatedFile.remove(oldBatchId);
    $(ele).parent().remove();
    $('div .tooltip').remove();
}
//选择其他证件时候加载显示
function showOtherCard(id, data) {
    if (data.idcardType == 'X') {
        var html2 = [
            '<input type="text"  id="otherCard"  class="form-control" placeholder="请填写证件名称" style="display:inline-block;width:50%">'
        ].join('');
        $(id).css('width', '50%').parent().append(html2);
    } else {
        $('#otherCard').remove();
        $(id).css('width', '100%');
    }
    $('#otherCard').val(data.otherCard);
}


//56020中报警文物跳转
function warnRelic() {
    $('.warnRelic').off('click');
    $('.warnRelic').on('click', function () {
        var relicId = $(this).attr("data-id");
        // var index = $(this).parent().parent().index();
        // var data = parameter.dataList[index];
        // console.log(data);
        // var applyId = data.applyId;
        // console.log(applyId);
        new cmx.process()
            .turn('callajax', {
                url: api_ea + '/eaScrRelicInfo/alarmRelicList',
                data: JSON.stringify({
                    relicId: relicId,
                    token: getData('token')
                })
            })
            .turn(function (prevModelData, send, abort) {
                if (!IsNull(prevModelData.data) && prevModelData.state == '200') {
                    var warnList = prevModelData.data.dataList;
                    $("#cmx-relic-modal").load(getWarnRelicModal, function () {
                        $('#warnRelicInfo-modal').off('hidden.bs.modal');
                        $('#warnRelicInfo-modal').on('hidden.bs.modal', function () {
                            show56020img_flag = true;
                        });
                        // 显示模态框    
                        $('#warnRelicInfo-modal').off('shown.bs.modal');
                        $('#warnRelicInfo-modal').on('shown.bs.modal', function () {
                            if(!show56020img_flag){
                                return;
                            }
                            $("#similarRelics").text(warnList.length - 1);
                            $("#similar").text(warnList[1].similarity + '%');
                            if (warnList.length > 2) {
                                $('#goToWarnInfo').css({
                                    'visibility': 'visible',
                                    'float': 'right',
                                    'width': '175px'
                                });
                            }
                            //右侧列表信息
                            $("#relicName").text(warnList[0].relicName);
                            $("#relicYear").text(warnList[0].relicYear);
                            $("#relicQuality").text(warnList[0].relicQualityName);
                            $("#relicLevel").text(warnList[0].relicLevelName);
                            $("#relicSize").text(warnList[0].relicSize);
                            $("#relicWidth").text(warnList[0].relicWidth);
                            $("#relicLength").text(warnList[0].relicLength);
                            $("#relicCaliber").text(warnList[0].relicCaliber);
                            $("#relicHeight").text(warnList[0].relicHeight);
                            $("#relicBottom").text(warnList[0].relicBottom);
                            $("#relicMicro").text(warnList[0].relicMicro);
                            $("#filelist-P00030").html(showRelicimg(warnList[0].index, 3));

                            //左侧报警文物
                            $("#filelist-P00030S").html(showRelicimg(warnList[1].index, 4));
                            $("#warnRelicName").text(warnList[1].relicName);
                            $("#warnRelicYear").text(warnList[1].relicYear);
                            $("#warnRelicQuality").text(warnList[1].relicQualityName);
                            $("#warnRelicLevel").text(warnList[1].relicLevelName);
                            $("#warnRelicSize").text(warnList[1].relicSize);
                            $("#warnRelicWidth").text(warnList[1].relicWidth);
                            $("#warnRelicLength").text(warnList[1].relicLength);
                            $("#warnRelicCaliber").text(warnList[1].relicCaliber);
                            $("#warnRelicHeight").text(warnList[1].relicHeight);
                            $("#warnRelicBottom").text(warnList[1].relicBottom);
                            $("#warnRelicMicro").text(warnList[1].relicMicro);

                            //报警文物跳转
                            var listForWarnRelic = [];
                            for (var i in warnList) {
                                if (i > 0) {
                                    listForWarnRelic.push(warnList[i]);
                                }
                            }
                            goToWarnInfo(listForWarnRelic);
                        });
                        $('#warnRelicInfo-modal').modal('show');
                    });
                } else {
                    showAlert({
                        type: 'error',
                        content: prevModelData.msg
                    })
                }
            })
            .start()

    });
}

function goToWarnInfo(listForWarnRelic) {
    console.log(listForWarnRelic);
    // 跳转
    var page = {
        pageNumber: 1,
        pageSize: listForWarnRelic.length
    };
    var lastNum = listForWarnRelic.length - 1;
    $("#warn-next").off("click");
    $("#warn-next").on("click", function () {
        if (page.pageNumber == page.pageSize) {
            showAlert({
                type: "info",
                content: "已经是最后一页"
            })
        } else {
            pageGoTo(page.pageNumber, listForWarnRelic);
            page.pageNumber++;
        }
    });
    $("#warn-prev").off("click");
    $("#warn-prev").on("click", function () {
        if (page.pageNumber == 1) {
            showAlert({
                type: "info",
                content: "已经是第一页"
            })
        } else {
            page.pageNumber--;
            pageGoTo(page.pageNumber - 1, listForWarnRelic);
        }
    });
    $("#warn-last").off("click");
    $("#warn-last").on("click", function () {
        page.pageNumber = listForWarnRelic.length;
        pageGoTo(lastNum, listForWarnRelic);
    });
    $("#warn-first").off("click");
    $("#warn-first").on("click", function () {
        page.pageNumber = 1;
        pageGoTo(0, listForWarnRelic);
    });
}

function pageGoTo(pageNumber, listForWarnRelic) {

    $("#filelist-P00030S").html(showRelicimg(listForWarnRelic[pageNumber].index, 4));
    $("#warnRelicName").text(listForWarnRelic[pageNumber].relicName);
    $("#warnRelicYear").text(listForWarnRelic[pageNumber].relicYear);
    $("#warnRelicQuality").text(listForWarnRelic[pageNumber].relicQualityName);
    $("#warnRelicLevel").text(listForWarnRelic[pageNumber].relicLevelName);
    $("#warnRelicSize").text(listForWarnRelic[pageNumber].relicSize);
    $("#warnRelicWidth").text(listForWarnRelic[pageNumber].relicWidth);
    $("#warnRelicLength").text(listForWarnRelic[pageNumber].relicLength);
    $("#warnRelicCaliber").text(listForWarnRelic[pageNumber].relicCaliber);
    $("#warnRelicHeight").text(listForWarnRelic[pageNumber].relicHeight);
    $("#warnRelicBottom").text(listForWarnRelic[pageNumber].relicBottom);
    $("#warnRelicMicro").text(listForWarnRelic[pageNumber].relicMicro);
}

function downloadHuishenFile(_hsapplyId, _hsprojectNum, _hsexportId, _hsexamId) {
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubFile/getExportFilesListByParam',
            data: JSON.stringify({
                token: getData('token'),
                apprItem: _hsprojectNum,
                applyId: _hsapplyId,
                exportId: _hsexportId,
                fileClass: "501",
                examId: _hsexamId
            }),
            type: 'POST',
            async: false,
        })
        .turn(function (prevModelData, send, abort) {
            if (prevModelData.state == '200') {
                var result = prevModelData.data;
                for (var k = 0; k < result.length; k++) {
                    downLoadFile(undefined, getFile + result[k].fileIndex);
                }
            }
        })
        .start();
}
//文物进出境申请项点击携运人查看详情
//注意注意！！！！！！！openapi.js里面还有一份！
var getCarryDetailModal = public_url + 'app/f-gover-approval/56020-2/include/1carry-person-info-modal.html';
var getExhibitionDetailModal = public_url + 'app/f-gover-approval/56020-2/include/1applyForExhibition-modal.html';
var getCarryDetailData = public_url + 'data/app/f-gover-approval/56020-2/getCarryDetail.json';
var getExhibitionDetailData = public_url + 'data/app/f-gover-approval/56020-2/getExhibitionDetail.json';

function showApplyDetail(i) {
    $('.applyDetail').off('click')
    $('.applyDetail').on('click', function () {
        var inoutClass = i;
        var applyClass = $(this).attr('data-applyClass')
        var applyId = $(this).attr('data-applyId')
        if (applyClass == '2') {
            $("#cmx-carry-person-modal").empty().load(getCarryDetailModal, function (response) {
                $('#cmx-carry-person-info').off('shown.bs.modal');
                $('#cmx-carry-person-info').on('shown.bs.modal', function () {
                    get_autoForm(getCarryDetailData);
                    $('.cmx-save-btn').hide();
                    $('.cmx-cancle-btn').text('关闭');
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/getApplyInfoById',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (inoutClass == '2' || inoutClass == '5') {
                                $("#cmx-1-turnDate").val(prevModelData.data.turnDate);
                            } else {
                                $('[cmx-index="cmx-1-turnDate"]').parent().remove();
                            }
                            $("#cmx-1-CarryUser").val(prevModelData.data.carryUser);
                            $("#cmx-1-TelNO").val(prevModelData.data.telNo);
                            $("#cmx-1-IDNumber").val(prevModelData.data.idnumber);
                            $("#cmx-1-Address").val(prevModelData.data.address);
                            $("#cmx-1-Nationality").val(prevModelData.data.nationalityName);
                            $("#cmx-1-IDCardType").val(prevModelData.data.idcardType == 'X' ? prevModelData.data.otherCard : prevModelData.data.idCardTypeName);
                            $("#cmx-1-ReviewInst").val(prevModelData.data.reviewInstName);
                        })
                        .start();
                });
                $('#cmx-carry-person-info').modal('show');
            });
        }
        if (applyClass == '1') {
            $("#cmx-applicationForExhibition-modal").empty().load(getExhibitionDetailModal, function () {
                $('#cmx-applyForExhibition-info').off('shown.bs.modal');
                $('#cmx-applyForExhibition-info').on('shown.bs.modal', function () {
                    get_autoForm(getExhibitionDetailData);
                    $('.cmx-save-btn').hide();
                    $('.cmx-cancle-btn').text('关闭');
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrApplyInfo/getApplyInfoById',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (inoutClass == '2' || inoutClass == '5') {
                                $("#cmx-1-turnDate").val(prevModelData.data.turnDate);
                            } else {
                                $('[cmx-index="cmx-1-turnDate"]').parent().remove();
                            }
                            $("#cmx-1-CarryUser").val(prevModelData.data.carryUser);
                            $("#cmx-1-TelNO").val(prevModelData.data.telNo);
                            $("#cmx-1-IDNumber").val(prevModelData.data.idnumber);
                            $("#cmx-1-Address").val(prevModelData.data.address);
                            $("#cmx-1-Nationality").val(prevModelData.data.nationalityName);
                            $("#cmx-1-IDCardType").val(prevModelData.data.idcardType == 'X' ? prevModelData.data.otherCard : prevModelData.data.idCardTypeName);
                            $("#cmx-z-name").val(prevModelData.data.exhibitName);
                            $("#cmx-z-unit").val(prevModelData.data.applyUnit);
                            $("#cmx-z-startTime").val(prevModelData.data.dateBeg);
                            $("#cmx-z-endTime").val(prevModelData.data.dateEnd);
                            $("#cmx-z-director").val(prevModelData.data.leader);
                            $("#cmx-z-competentUnit").val(prevModelData.data.manageUnit);
                            $("#cmx-z-externalInstitution").val(prevModelData.data.externalInst);
                            $("#cmx-z-organizer").val(prevModelData.data.organizer);
                            $("#cmx-z-exhibitionVenue").val(prevModelData.data.exhibitAddr);
                        })
                        .start();

                });
                $('#cmx-applyForExhibition-info').modal('show');

            });
        }
    })
}

//查看通知
function showPointButton(applyId, applyStatus) {
    var button = '';
    switch (applyStatus) {
        case '1':
        case '2':
            button =
                '<button class="btn show-point btn-xs btn-info" data-states="暂无通知" data-id="' + applyId + '">查看通知</button>';
            break;
        case '3':
            button =
                '<button class="btn show-point btn-xs btn-info" data-states="预约成功通知书" data-id="' + applyId + '">查看通知</button>';
            break;
        case '4':
        case '5':
        case '6':
        case '8':
        case '9':
            button =
                '<button class="btn show-point btn-xs btn-info" data-states="受理通知书" data-id="' + applyId + '">查看通知</button>';
            break;
        case 'N':
            button =
                '<button class="btn show-point btn-xs btn-info" data-states="不予受理通知书" data-id="' + applyId + '">查看通知</button>';
            break;
        case 'O':
            button =
                '<button class="btn show-point btn-xs btn-info" data-states="一次性补正通知书" data-id="' + applyId + '">查看通知</button>';
            break;
        case 'B':
            button =
                '<button class="btn show-point btn-xs btn-info" data-states="不予预约通知书" data-id="' + applyId + '">查看通知</button>';
            break;
        default:
            break;
    }
    return button;
}

function showPointDetails() {
    $('.show-point').click(function () {
        var states = $(this).attr('data-states');
        var applyId = $(this).attr('data-id');
        if (states == '暂无通知') {
            showAlert({
                type: "info",
                content: '暂无通知。'
            })
        } else {
            $('#cmx-getDetails-modal').empty();
            $('#cmx-getDetails-modal').load(getAcceptanceNoticeModal, function () {
                $('#acceptance-notice-modal').off('show.bs.modal');
                $('#acceptance-notice-modal').on('show.bs.modal', function () {
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/eaScrQuery/getAppUserMessage',
                            data: JSON.stringify({
                                token: getData('token'),
                                applyId: applyId,
                                pageNumber: 1,
                                pageSize: 20
                            })
                        })
                        .turn(function (prevModelData, send, abort) {
                            console.log(prevModelData);
                            if (!IsNull(prevModelData.data) && prevModelData.state == '200') {
                                switch (states) {
                                    case "受理通知书":
                                        $('.n1-p').text(states);
                                        $('.n1-p0').text(prevModelData.data.inOutClassName);
                                        $('.n1-p1').text(format2(prevModelData.data.acceptDate));
                                        $('.n1-p3').text(prevModelData.data.acceptNum);
                                        $('.n1-p4').text(prevModelData.data.appUserName);
                                        $('.n1-p5').text(prevModelData.data.appTelNo);
                                        $('.n1-p7').text('《' + prevModelData.data.inOutClassName + '申请》');
                                        $('.n1-p9').text(format2(prevModelData.data.acceptDate));
                                        $('.n1-p11').text('相关所有申报材料齐全，符合受理条件，现予受理。此事项法定办结时限为20个工作日。我局承诺依法自受理之日起20个工作日内作出许可或不予许可决定。');
                                        break;
                                    case "不予受理通知书":
                                        $('.n1-p').text(states);
                                        $('.n1-p0').text(prevModelData.data.Project);
                                        $('.n1-p1').text(prevModelData.data.CreateDate);
                                        $('.n1-p3').text(prevModelData.data.acceptNum);
                                        $('.n1-p4').text(prevModelData.data.CarryUser);
                                        $('.n1-p5').text(prevModelData.data.Tel);
                                        $('.n1-p7').text('《' + prevModelData.data.Project + '申请》');
                                        $('.n1-p9').text(prevModelData.data.CreateDate);
                                        $('.n1-p11').text(prevModelData.data.OptionCont1 + prevModelData.data.OptionCont2 + prevModelData.data.OptionCont3 + prevModelData.data.OptionCont4);
                                        break;
                                    case "一次性补正通知书":
                                        $('.n1-p').text(states);
                                        var Options;
                                        if (IsEmpty(prevModelData.data.OptionCont1)) {
                                            Options = prevModelData.data.OptionCont2;
                                        } else if (IsEmpty(prevModelData.data.OptionCont2)) {
                                            Options = prevModelData.data.OptionCont1;
                                        } else {
                                            Options = prevModelData.data.OptionCont1 + ' ; ' + prevModelData.data.OptionCont2;
                                        }
                                        $('.n1-p0').text(prevModelData.data.Project);
                                        $('.n1-p1').text(prevModelData.data.CreateDate);
                                        $('.n1-p3').text(prevModelData.data.acceptNum);
                                        $('.n1-p4').text(prevModelData.data.CarryUser);
                                        $('.n1-p5').text(prevModelData.data.Tel);
                                        $('.n1-p7').text('《' + prevModelData.data.Project + '申请》');
                                        $('.n1-p9').text(prevModelData.data.CreateDate);
                                        $('.n1-p11').text('由于：' + Options + '。现予通知。');
                                        break;
                                    case "预约成功通知书":
                                        $('#acceptance-notice-modal>div').css('width', "50%")
                                        $('#acceptance-notice-body').empty();
                                        $('#acceptance-notice-body').append(['<tr>',
                                            '<td colspan="2"  class = "backg text-center" style = "padding-top:20px">',
                                            '<h1 style="font-weight: bold;">预约成功通知书</h1>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>事项名称</td>',
                                            '<td>' + prevModelData.data.inOutClassName + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>预约成功时间</td>',
                                            '<td>' + format2(prevModelData.data.reserveDate) + prevModelData.data.resDatePar + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>申请人</td>',
                                            '<td>' + prevModelData.data.appUserName + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>申请人联系电话</td>',
                                            '<td>' + prevModelData.data.appTelNo + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>备注信息</td>',
                                            '<td>' + prevModelData.data.resRemark + '</td>',
                                            '</tr>',
                                            // '<tr>',
                                            // '<td colspan="2" style="height:80px"></td>',
                                            // '</tr>',
                                            '<tr>',
                                            '<td></td>',
                                            '<td>国家文物进出境审核站</td>',
                                            '</tr>'
                                        ].join(''))
                                        break;
                                    case "不予预约通知书":
                                        $('#acceptance-notice-modal>div').css('width', "50%");
                                        $('#acceptance-notice-body').empty();
                                        $('#acceptance-notice-body').append(['<tr>',
                                            '<td colspan="2"  class = "backg text-center" style = "padding-top:20px">',
                                            '<h1 style="font-weight: bold;">不予预约通知书</h1>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>事项名称</td>',
                                            '<td>' + prevModelData.data.inoutClassName + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>处理时间</td>',
                                            '<td>' + format2(prevModelData.data.dealDate) + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>申请人</td>',
                                            '<td>' + prevModelData.data.appUserName + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>申请人联系电话</td>',
                                            '<td>' + prevModelData.data.appTelNo + '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td>备注信息</td>',
                                            '<td>' + prevModelData.data.resRemark + '</td>',
                                            '</tr>',
                                            // '<tr>',
                                            // '<td colspan="2" style="height:80px"></td>',
                                            // '</tr>',
                                            '<tr>',
                                            '<td></td>',
                                            '<td>国家文物进出境审核站</td>',
                                            '</tr>'
                                        ].join(''))
                                        break;
                                    default:
                                        break;
                                }
                            } else {
                                showAlert({
                                    type: 'error',
                                    content: prevModelData.msg
                                });
                            }
                        })
                        .start();
                });
                $('#acceptance-notice-modal').modal('show');
            })
        }
    })
}

//代替刷新页面--局部刷新
function getApplyList(inoutClass, url, applyStatus) {
    setTimeout(function () {
        $('#cmx-applyForExhibition-info').modal('hide');
        $('#cmx-carry-person-info').modal('hide');
        $('#cmx-accept-receipt').modal('hide');
        $("#cmx-dapart-apply-table").html('');
        $("#cmx-yuyue-table").html('');
        $("#cmx-shouli-table").html('');
        $("#cmx-fenban-table").html('');
        $("#cmx-shenpi-table").html('');
        $("#cmx-dianzi-table").html('');
        var param = {
            applyStatus: applyStatus,
            token: getData("token"),
            pageNumber: 1,
            pageSize: 20,
            carryUser: "",
            inOutClass: inoutClass,
            applyId: GetUrlParamString('applyId')
        }
        new cmx.process()
            .turn('callajax', {
                url: api_ea + url,
                data: JSON.stringify(param),
                jsonheader: true
            })
            .turn('buildDepartApplyTable')
            .start();
    }, 1000);
}


function relicTurnColor() {
    $('.relicTurnColor').each(function () {
        $(this).unbind('click');
        $(this).bind('click', function () {
            $(".relicTurnColor").each(function () {
                $(this).removeClass("info").css('color', '#76838f');
            })
            $(this).addClass("info").css('color', 'white');
        });
    })
}