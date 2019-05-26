cmx.g.regist('excelApplyId', []);
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
cmx.g.NationStatusStr.put('303', '退回'); //一次性补正
cmx.g.NationStatusStr.put('304', '退回'); //不予受理
cmx.g.NationStatusStr.put('305', '退回'); //处员退回经过处长

cmx.g.NationStatusStr.put('401', '相对人填报中');
cmx.g.NationStatusStr.put('501', '省局处理中');
cmx.g.NationStatusStr.put('502', '省局审核中');
cmx.g.NationStatusStr.put('503', '省局待报备');
cmx.g.NationStatusStr.put('504', '省局审批结束');
cmx.g.NationStatusStr.put('505', '省局退回');
cmx.g.NationStatusStr.put('601', '省局专家处理中');
//考古状态
cmx.g.NationStatusStr.put('499', '考古处处理中（已受理）'); //考古处处理中（已受理）
cmx.g.NationStatusStr.put('987', '考古处处理中'); //考古处处理中
cmx.g.NationStatusStr.put('701', '发掘资质单位处理中');
cmx.g.NationStatusStr.put('702', '省局处理中');
cmx.g.NationStatusStr.put('773', '待发执照'); //待发执照
cmx.g.NationStatusStr.put('776', '国局处理中（考古处转办）'); //考古处转办
cmx.g.NationStatusStr.put('777', '已下载'); //考古处虚拟账号已下载过excel
cmx.g.NationStatusStr.put('481', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('482', '国家局退回'); //考古处虚拟账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('993', '国家局退回'); //考古处虚拟账号退回给申请领队  一次性补正
cmx.g.NationStatusStr.put('994', '国家局退回'); //考古处虚拟账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('497', '国家局退回'); //考古处虚拟账号退回给文书室 一次性补正
cmx.g.NationStatusStr.put('498', '国家局退回'); //考古处虚拟账号退回给文书室 不予受理
cmx.g.NationStatusStr.put('495', '国家局退回'); //考古处虚拟账号退回给司密 一次性补正
cmx.g.NationStatusStr.put('496', '国家局退回'); //考古处虚拟账号退回给司密 不予受理
cmx.g.NationStatusStr.put('493', '国家局退回'); //考古处虚拟账号退回给省局 一次性补正
cmx.g.NationStatusStr.put('494', '国家局退回'); //考古处虚拟账号退回给省局 不予受理
cmx.g.NationStatusStr.put('877', '国家局退回'); //司秘账号退回给文书室 一次性补正
cmx.g.NationStatusStr.put('878', '国家局退回'); //司秘账号退回给文书室 不予受理
cmx.g.NationStatusStr.put('879', '国家局退回'); //司秘账号退回给文书室 退回
cmx.g.NationStatusStr.put('874', '国家局退回'); //司秘账号退回给省局 一次性补正
cmx.g.NationStatusStr.put('876', '国家局退回'); //司秘账号退回给省局 不予受理
cmx.g.NationStatusStr.put('875', '国家局退回'); //司秘账号退回给省局 退回
cmx.g.NationStatusStr.put('883', '国家局退回'); //司秘账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('884', '国家局退回'); //司秘账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('885', '国家局退回'); //司秘账号退回给发掘资质单位 退回
cmx.g.NationStatusStr.put('887', '国家局退回'); //司秘账号退回给发掘申请领队 一次性补正
cmx.g.NationStatusStr.put('886', '国家局退回'); //司秘账号退回给发掘申请领队 不予受理
cmx.g.NationStatusStr.put('888', '国家局退回'); //司秘账号退回给发掘申请领队 退回
cmx.g.NationStatusStr.put('864', '国家局退回'); //文书室账号退回给省局 一次性补正
cmx.g.NationStatusStr.put('866', '国家局退回'); //文书室账号退回给省局 不予受理
cmx.g.NationStatusStr.put('865', '国家局退回'); //文书室账号退回给省局 退回
cmx.g.NationStatusStr.put('873', '国家局退回'); //文书室账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('872', '国家局退回'); //文书室账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('871', '国家局退回'); //文书室账号退回给发掘资质单位 退回
cmx.g.NationStatusStr.put('867', '国家局退回'); //文书室账号退回给申请领队 一次性补正
cmx.g.NationStatusStr.put('868', '国家局退回'); //文书室账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('869', '国家局退回'); //文书室账号退回给申请领队 退回
cmx.g.NationStatusStr.put('980', '省局退回'); //省局账号退回给发掘资质单位 一次性补正
cmx.g.NationStatusStr.put('982', '省局退回'); //省局账号退回给发掘资质单位 不予受理
cmx.g.NationStatusStr.put('981', '省局退回'); //省局账号退回给发掘资质单位 退回
cmx.g.NationStatusStr.put('990', '省局退回'); //省局账号退回给申请领队 一次性补正
cmx.g.NationStatusStr.put('992', '省局退回'); //省局账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('991', '省局退回'); //省局账号退回给申请领队 退回
cmx.g.NationStatusStr.put('880', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 一次性补正
cmx.g.NationStatusStr.put('882', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 不予受理
cmx.g.NationStatusStr.put('881', '发掘资质单位退回'); //发掘资质单位账号退回给申请领队 退回
cmx.g.NationStatusStr.put('999', '不同意发掘'); //同210也是办结状态，只是结果为不同意发掘

cmx.g.NationStatusStr.put('230', '文保处处理中');
cmx.g.NationStatusStr.put('231', '文保处处理中（已受理）');
cmx.g.NationStatusStr.put('232', '文保处处理中（发文中）');
cmx.g.NationStatusStr.put('250', '国家局委托第三方检查中');
cmx.g.NationStatusStr.put('901', '申请人已撤销'); //属于已办
cmx.g.NationStatusStr.put('902', '管理员办结'); //属于办结

//导入的系统数据的状态
cmx.g.NationStatusStr.put('W08', '已报备'); //办结
cmx.g.NationStatusStr.put('W06', '国家局批复通过'); //办结
cmx.g.NationStatusStr.put('W6', '国家局批复通过');
cmx.g.NationStatusStr.put('W999', '作废');
cmx.g.NationStatusStr.put('W07', '批复不通过');
cmx.g.NationStatusStr.put('W088', '纸质办结');
cmx.g.NationStatusStr.put('W0998', '办结');
cmx.g.NationStatusStr.put('W099', '纸质办结');
cmx.g.NationStatusStr.put('W081', '省委托第三方审核通过');
cmx.g.NationStatusStr.put('W082', '省委托第三方审核不通过');
cmx.g.NationStatusStr.put('W02', '初审退回');
cmx.g.NationStatusStr.put('W022', '整改退回');
cmx.g.NationStatusStr.put('W033', '国家局发文撰写中');
cmx.g.NationStatusStr.put('W034', '国家局发文审核中');
cmx.g.NationStatusStr.put('W053', '国家局发文请专家评审中');
cmx.g.NationStatusStr.put('W092', '已转OA专家评审中'); //'092','国家局发文请专家评审中';
cmx.g.NationStatusStr.put('W093', '已转OA专家评审完成');
cmx.g.NationStatusStr.put('W031', '国家局发文处理中');
cmx.g.NationStatusStr.put('W01', '填报中');
cmx.g.NationStatusStr.put('W021', '国家局退回');
cmx.g.NationStatusStr.put('W041', '省委托第三方处理中');
cmx.g.NationStatusStr.put('W045', '国家局委托第三方请专家评审完成');
cmx.g.NationStatusStr.put('W047', '收藏单位处理中');
cmx.g.NationStatusStr.put('W051', '国家局请专家评审中');
cmx.g.NationStatusStr.put('W054', '国家局委托第三方审核通过');
cmx.g.NationStatusStr.put('W083', '国家局委托第三方审核完成');
cmx.g.NationStatusStr.put('W09', '已下载文件');
cmx.g.NationStatusStr.put('W6K', '考古办结');

_projectNum = '56008_b'
//查看证照
function checkLicence() {
    $("#cmx-check-licence").off('shown.bs.modal');
    $("#cmx-check-licence").on('shown.bs.modal', function () {

    });
    $("#cmx-check-licence").modal('show');
}
//点击受理（专家处理后的受理）
//这个模态框超级大的问题啊，如果需要这样子得重新写
// function func_shouli1() {
//     $("#cmx-shouli-modal1").off('shown.bs.modal');
//     $("#cmx-shouli-modal1").on('shown.bs.modal', function () {
//         $('input[type=radio][name=type1]').change(function () {
//             switch (this.value) {
//                 case '1':
//                     $("#cmx-licence").show();
//                     $("#banfaDiv").show();
//                     $('#bubanDiv').hide();
//                     break;
//                 case '2':
//                     $("#cmx-licence").show();
//                     $("#bubanDiv").show();
//                     $('#banfaDiv').hide();
//                     break;
//                 case '3':
//                 case '4':
//                     $("#cmx-licence").hide();
//                     break;
//             }
//         });
//     });
//     $("#cmx-shouli-modal1").modal('show');
// }
//点击受理（刚进入考古处，专家受理前的受理）
// function func_shouli987(_applyId) {
//     $("#cmx-chuli-987").off('shown.bs.modal');
//     $("#cmx-chuli-987").on('shown.bs.modal', function () {
//         // console.log(data[index])
//         new cmx.process()
//             .turn('callajax', {
//                 url: api_ea + '/business/getBriefDataByPKAndPNum',
//                 data: JSON.stringify({
//                     token: getData('token'), //类型：String  必有字段  备注：无
//                     applyId: _applyId, //类型：String  必有字段  备注：申请ID
//                     projectNum: _projectNum //类型：String  必有字段  备注：项目编号
//                 }),
//                 type: 'POST'
//             })
//             .turn(function (prevModelData, send, abort) {
//                 if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
//                     var data = prevModelData.data;

//                     cmx.g.recordId = data.recentRecordId;
//                     $('.n2-p0').html(data.approvalItemName);
//                     $('.n2-p1').html(getData('role') == 'province' ? (data.provincesName + '文物局') : data.contactName);
//                     $('.n2-p2').html(data.contactTel);
//                     $('.n2-p7').html(data.approvalItemName + '《' + data.projectName + '》');
//                     // $('.n2-p8').html('国家文物局办公室<br/>' + data.acceptTime);
//                     $('.n3-p0').html(data.approvalItemName);
//                     $('.n3-p1').html(getData('role') == 'province' ? (data.provincesName + '文物局') : data.contactName);
//                     $('.n3-p2').html(data.contactTel);
//                     $('.n3-p7').html(data.approvalItemName + '《' + data.projectName + '》');
//                     // $('.n3-p8').html('国家文物局办公室<br/>' + data.acceptTime);
//                     $('.n1-p0').html(data.approvalItemName);
//                     $('.n1-p1').html(data.acceptTime);
//                     $('.n1-p3').html(_projectNum + '_' + data.networkNum);
//                     $('.n1-p4').html(getData('role') == 'province' ? (data.provincesName + '文物局') : data.contactName);
//                     $('.n1-p5').html(data.contactTel);
//                     $('.n1-p7').html(data.approvalItemName + '《' + data.projectName + '》');
//                     // $('.n1-p8').html('国家文物局办公室<br/>' + data.acceptTime);
//                 }
//                 send.go();
//             })
//             .start();
//     });
//     $("#cmx-chuli-987").modal('show');
// }
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
            console.log(data[i])
            var tbody_html = '';
            var url = ''; //跳转的页面
            var accept_button = ''; //受理的button
            // 考古处列表，显示所有状态，根据状态不同展示不同的button
            switch (data[i].status) {
                // case '987':
                //     url = '/app/f-gover-approval/nation/56008-b-kaoguchu.html';
                //     // accept_button = '<button type="button" class="btn btn-primary btn-sm" applyId="' + data[i].applyId + ' "onclick="func_shouli987(\'' + data[i].applyId + '\')">受理</button>'
                //     break;
                // case '499':
                //     url = '/app/f-gover-approval/nation/56008-b-zhuanjiajigou.html';
                //     // accept_button = '<button type="button" class="btn btn-primary btn-sm" applyId="' + data[i].applyId + ' "onclick="func_shouli987(\'' + data[i].applyId + '\')">受理</button>'
                //     break;
                case '773':
                case '777':
                    url = '/app/f-gover-approval/nation/56008-b-fazheng.html';
                    // accept_button = '<button type="button" class="btn btn-primary btn-sm" applyId="' + data[i].applyId + ' "onclick="func_shouli1(\'' + data[i].applyId + '\')">受理</button>'
                    // accept_button = '<button type="button" class="btn btn-primary btn-sm  haveaccept-button onclick="func_shouli1()">受理</button>';
                    break;
                default:
                    url = '/app/f-gover-approval/applyinfo.html';
            }
            var flag = false;
            for (var j = 0; j < cmx.g.excelApplyId.length; j++) {
                if (cmx.g.excelApplyId[j] == data[i].applyId) {
                    flag = true;
                }
            }
            tbody_html = ['<tr>',
                '<td class="text-center">',
                i + 1,
                '</td>',
                '<td> ',
                '<div class="checkbox-custom checkbox-primary">',
                '<input type="checkbox" id="check' + data[i].applyId + '" name="kaogu-check" apply="' + data[i].applyId + '">',
                '<label for="check' + data[i].applyId + '"></label>',
                '</div>',
                '</td>', //操作 
                '<td><button class="btn btn-default complete-report btn-sm">查看报备</button></td>',
                '<td><button type="button" class="btn btn-primary btn-sm cmx-archaeology-licence">查看</button></td>', //证照               
                '<td><a href="' + url + '?from=undefied&status=' + data[i].status + '&applyId=' + data[i].applyId + '&projectNum=' + data[i].projectNum + '&nowid=' + GetUrlParamString('nowid') + '">' + data[i].projectName + '</a></td>', //发掘对象名称
                '<td style="color:#f2a654;">' + cmx.g.NationStatusStr.get(data[i].status) + '</td>', //审核状态
                '<td>' + data[i].createDate + '</td>', //申请时间
                '<td>' + data[i].archNumber + '</td>', //存档编号
                '<td>' + data[i].workDay + '</td>', //存档编号
                '<td>' + data[i].objProvinceName + '</td>', //发掘省份
                '<td>' + data[i].relicUnitRank + '</td>', //保护单位级别
                '<td>' + data[i].leaderName + '</td>', //领队姓名
                '<td>' + accept_button + '<button type="button" class="btn btn-primary btn-sm  margin-left-5 opionin">受理意见</button></td>', //受理
                '</tr>'
            ].join("");
            $("#cmx-htd-tbody").append(tbody_html);
            if (flag) {
                $('#cmx-htd-tbody [apply="' + data[i].applyId + '"]').click();
            }
        }
        //查看报备
        if (getData("accClass") == "1A") {
            $("#cmx-htd-tbody .complete-report").hide();
            $("#cmx-htd-tbody .withdraw-btn").hide();
        } else {
            $("#cmx-htd-tbody .complete-report").each(function (index) {
                var temp = data[index];
                L('-------------' + temp.status);
                if (temp.status == '210' || temp.status == '902') {
                    if (temp.isReport == 2) {
                        $(this).on('click', function () {
                            event.stopPropagation();
                            $('#cmx-report-form-btn').hide();
                            $('#cmx-report-form-send').hide();
                            $("#completeReportModal").off('hide.bs.modal');
                            $("#completeReportModal").off('shown.bs.modal');
                            $("#completeReportModal").on('shown.bs.modal', function () {
                                new cmx.process().
                                turn('initFiles', {
                                    'P002': '321',
                                    'P003': '322'
                                }).start();
                                $('#cmx-report-form').html('');
                                
                                var loadData = function (param) {
                                    $.ajax({
                                        url: param.url,
                                        type: "GET",
                                        async: false,
                                        success: function (result) {
                                            var data = result;
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
                                                        "element": param.element,
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
                                            $('#cmx-i-951').val(getData('userName'));
                                            // send.toviewresolve(result.data).go();  
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
                                loadData({
                                    url: getKaoguBaoBeiJson,
                                    element: '#cmx-report-form'
                                });
                                new cmx.process()
                                    .turn('callajax', {
                                        url: api_ea + '/eaPubEndReportInfo/getDataByParam',
                                        data: JSON.stringify({
                                            token: getData('token'), //类型：String  必有字段  备注：无
                                            projectNum: temp.projectNum, //类型：String  必有字段  备注：项目编号                                                
                                            applyId: temp.applyId //类型：String  必有字段  备注：申请ID
                                        }),
                                        type: 'POST'
                                    })
                                    .turn(function (prevModelData, send, abort) {
                                        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                            if (prevModelData.data.length != 0) {
                                                cmx.g.applyId = prevModelData.data[0].applyId;
                                                $('#cmx-i-0').val(prevModelData.data[0].content1).attr('readonly', true);
                                                $('#cmx-i-1').val(prevModelData.data[0].content2).attr('readonly', true);
                                                if (prevModelData.data[0].content3 == 1) {
                                                    $('#cmx-i-4-1').attr('checked', true).attr('readonly', true);
                                                }
                                                new cmx.process()
                                                    .turn('buildFileList', {
                                                        projectNum: prevModelData.data[0].projectNum
                                                    })
                                                    .start();
                                                $('.remove-btn').hide();
                                                cmx.g.reportId = prevModelData.data[0].reportId;
                                                $('#cmx-i-0').attr('readonly', true);
                                                $('#cmx-i-1').attr('readonly', true);
                                                $('#cmx-i-4-1').attr('disabled', true);
                                                $('#P002').hide();
                                                $('#P003').hide();
                                                $('.remove-btn').hide();

                                            }
                                        } else {
                                            showAlert({
                                                type: 'error',
                                                content: prevModelData.msg
                                            });
                                        }
                                        send.go();
                                    })
                                    .start();
                            });
                            $("#completeReportModal").on('hide.bs.modal', function () {
                                $('#cmx-report-form-btn').show();
                                $('#cmx-report-form').html('');
                            });
                            $("#completeReportModal").modal('show');
                        });
                    } else {
                        $(this).text('无');
                    }
                } else {
                    $(this).text('无');
                }
            });
        }
        $('#cmx-htd-tbody .cmx-archaeology-licence').each(function (index) {
            $(this).on('click', function () {
                $("#cmx-check-licence").off('shown.bs.modal');
                $("#cmx-check-licence").on('shown.bs.modal', function () {
                    $('#cmx-licence-type').html((data[index].liceType == '1') ? '执' : '函');
                    $('#cmx-licence-year').html(data[index].year);
                    $('#cmx-licence-num').html(data[index].liceNumber);
                    $('.cmx-excavate-unit').html(data[index].applyUnitName);
                    $('.cmx-excavate-address').html(data[index].appObjAddress);
                    $('.cmx-excavate-area').html(data[index].appObjArea + '平方米,墓葬' + data[index].appToNumber + '座');
                    $('.cmx-excavate-time').html(data[index].appExpTime);
                    $('.cmx-excavate-leader').html(data[index].appLeader);
                    $('.cmx-card-time').html(data[index].promDate);
                });
                $("#cmx-check-licence").modal('show');
            });
        });

        $('#cmx-phavePage .nowpage').html(pageNumber);
        $('#cmx-phavePage .jumppage').val(pageNumber);
        $('#cmx-phavePage .totalpage').html(param.pages);
        haveFunc.pageCount = param.pages;
        //复选框点击与取消处理
        $('#cmx-htd-tbody tr input[type="checkbox"]').each(function (index) {
            $(this).off('click');
            $(this).on('click', function () {
                if ($(this).is(":checked")) {
                    cmx.g.excelApplyId.push($(this).attr("apply"));
                } else {
                    for (var i = 0; i < cmx.g.excelApplyId.length; i++) {
                        if (cmx.g.excelApplyId[i] == $(this).attr("apply")) {
                            cmx.g.excelApplyId.splice(i, 1);
                        }
                    }
                }
            });
        })
        //受理意见模态框，展示流程记录详情
        $("#cmx-htd-tbody tr .opionin").each(function (index) {
            $(this).off('click');
            $(this).on('click', function () {
                $("#cmx-record-List").off('shown.bs.modal');
                $("#cmx-record-List").on('shown.bs.modal', function () {
                    console.log(data[index])
                    new cmx.process()
                        .turn('callajax', {
                            url: api_ea + '/business/getBriefDataByPKAndPNum',
                            data: JSON.stringify({
                                token: getData('token'), //类型：String  必有字段  备注：无
                                applyId: data[index].applyId, //类型：String  必有字段  备注：申请ID
                                projectNum: data[index].projectNum //类型：String  必有字段  备注：项目编号
                            }),
                            type: 'POST'
                        })
                        .turn(function (prevModelData, send, abort) {
                            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                                console.log(prevModelData)
                                var dataList = prevModelData.data;
                                if (dataList.eaPubWorkflowList) {
                                    var eaPubWorkflowList = dataList.eaPubWorkflowList;
                                    var html = '';
                                    $("#cmx-record").html('');
                                    for (var i = 0; i < eaPubWorkflowList.length; i++) {
                                        html = html + ['<tr>',
                                            '<td>' + eaPubWorkflowList[i].oprInstName + '</td>',
                                            '<td>' + eaPubWorkflowList[i].note.replace(/\n/g, "<br/>") + '</td>',
                                            '<td>' + (IsEmpty(eaPubWorkflowList[i].oprUserName) ? eaPubWorkflowList[i].oprRoleName : eaPubWorkflowList[i].oprUserName) + '</td>',
                                            '<td>' + eaPubWorkflowList[i].dealTime + '</td>',
                                            '</tr>'
                                        ].join('');
                                    }
                                    $("#cmx-record").append(html);
                                }
                            }
                        }).start();
                });
                $("#cmx-record-List").modal('show');
            });
        })

        $("#cmx-htd-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-htd-tbody tr").each(function () {
                    $(this).removeClass("active");
                });
                putData('_ckpn', haveFunc.pageNum);
                _self.addClass("active");
            });
        });
        //模态框中一次性补正和不予受理退回
        $(".n2").show();
        $(".n3").hide();
        $("#notice1").off('click');
        $("#notice1").on('click', function () {
            $('.n2').hide();
            $('.n3').show();
        });
        $("#notice2").off('click');
        $("#notice2").on('click', function () {
            $('.n3').hide();
            $('.n2').show();
        });
    },
    reject: function (data) {

    }
});