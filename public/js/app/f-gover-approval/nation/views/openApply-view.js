/*
 * @Author: lvjinxiu 
 * @Date: 2018-03-21 12:00:31 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-03-21 16:17:07
 */
//公民
cmx.route.view({
    index: 'getPersonList',
    resolve: function (result) {
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-ntd-tbody-person").html('');
        for (var i = 0; i < data.length; i++) {
            var tbody_html = '';
            tbody_html = ['<tr>',
                ' <td class="text-center">',
                pageSize * (pageNumber - 1) + i + 1 + '<input type="hidden" class="ApplyID" value="' + data[i].applyID + '"/>',
                '</td>',
                '<td class="nc"><a href="javascript:;"><i class="icon wb-download" aria-hidden="true" title="导出Word"></i></a></td>',
                '<td>' + data[i].applyUserID + '</td>',
                '<td>' + data[i].workUnit + '</td>',
                '<td>' + data[i].idCardTypeName + '</td>',
                '<td>' + data[i].idCardNO + '</td>',
                '<td>' + data[i].contactNO + '</td>',
                '<td>' + data[i].fax + '</td>',
                '<td>' + data[i].postalCode + '</td>',
                '<td>' + data[i].email + '</td>',
                '<td>' + data[i].address + '</td>',
                '<td>' + data[i].carrierFormName + '</td>',
                '<td>' + data[i].getWayName + '</td>',
                // '<td>' + data[i].approvalUserName + '</td>',
                // '<td>' + data[i].approvalDate + '</td>',
                // '<td>' + data[i].apprOpinion + '</td>',
                '<td>' + data[i].apprStatusName + '</td>',
                '<td>' + data[i].remark + '</td>',
                // '<td>' + data[i].createUserName + '</td>',
                // '<td>' + data[i].createDate + '</td>',
                // '<td>' + data[i].updUserName + '</td>',
                // '<td>' + data[i].updDate + '</td>',
                '</tr>'
            ].join("");
            $("#cmx-ntd-tbody-person").append(tbody_html);
        }
        $('#cmx-pneedPage-person .nowpage').html(pageNumber);
        $('#cmx-pneedPage-person .jumppage').val(pageNumber);
        $('#cmx-pneedPage-person .totalpage').html(param.pages);
        personFunc.pageCount = param.pages;

        //导出word格式
        $('.wb-download').off('click');
        $('.wb-download').on('click', function () {
            window.open(api_io + "/ioInfoPubApplyPC/downLoadFormApplyPc?applyId=" + $(this).closest('tr').find('.ApplyID').val() + "&token=" + getData("token"));
        });

        //点击数据行，加载查看页面
        $("#cmx-ntd-tbody-person tr td:not(.nc)").on('click', function () {
            //当前修改的条目
            var item = $(this).parent('tr');

            $('.page-content').hide();
            $('#cmx-table-detail-legal').hide();
            $('#cmx-table-detail-person').show();
            //初始化查看界面内容
            new cmx.process()
                .turn('callajax', {
                    url: api_io + '/ioInfoPubApplyPC/querySinglePCApply?token=' + getData("token") + "&applyID=" + item.find('.ApplyID').val(), //测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    type: 'GET',
                    success: function (json) {
                        console.log(json);
                        if (json.data) {
                            $('#cmx-table-detail-person [key="title"]').text(json.data.inforTitle);
                            $('#cmx-table-detail-person [key="ApplyUserID"]').text(json.data.applyUserID);
                            $('#cmx-table-detail-person [key="WorkUnit"]').text(json.data.workUnit);
                            $('#cmx-table-detail-person [key="IDCardType"]').text(json.data.idCardTypeName);
                            $('#cmx-table-detail-person [key="IDCardNO"]').text(json.data.idCardNO);
                            $('#cmx-table-detail-person [key="ContactNO"]').text(json.data.contactNO);
                            $('#cmx-table-detail-person [key="Fax"]').text(json.data.fax);
                            $('#cmx-table-detail-person [key="PostalCode"]').text(json.data.postalCode);
                            $('#cmx-table-detail-person [key="Email"]').text(json.data.email);
                            $('#cmx-table-detail-person [key="Address"]').text(json.data.address);
                            $('#cmx-table-detail-person [key="CarrierForm"]').text(json.data.carrierFormName);
                            $('#cmx-table-detail-person [key="GetWay"]').text(json.data.getWayName);
                            // $('#cmx-table-detail-person [key="ApprUserID"]').text(json.data.approvalUserName);
                            // $('#cmx-table-detail-person [key="ApprovalDate"]').text(json.data.approvalDate);
                            // $('#cmx-table-detail-person [key="ApprOpinion"]').text(json.data.apprOpinion);
                            $('#cmx-table-detail-person [key="AppStatus"]').text(json.data.appStatus);
                            $('#cmx-table-detail-person [key="Remark"]').text(json.data.remark);
                            // $('#cmx-table-detail-person [key="CreateUserID"]').text(json.data.createUserName);
                            // $('#cmx-table-detail-person [key="CreateDate"]').text(json.data.createDate);
                            // $('#cmx-table-detail-person [key="UpdUserid"]').text(json.data.updUserName);
                            // $('#cmx-table-detail-person [key="UpdDate"]').text(json.data.updDate);

                            if (!json.data.iDCardIndex) $('#cmx-table-detail-person [key="IDCardIndex"]').html('<img src="' + getFile + json.data.reserve3 + '"/>');
                            $('#cmx-table-detail-person [key="InfoTitle"]').text(json.data.inforTitle);
                            $('#cmx-table-detail-person [key="ContentDesc"]').text(json.data.contentDesc);
                            $('#cmx-table-detail-person [key="InforUse"]').text(json.data.inforUse);
                        }
                    }
                })
                .start();
            //文章查看页面 - 返回按钮事件
            $('#cmx-table-detail-person .cmx-button-return').off();
            $('#cmx-table-detail-person .cmx-button-return').on('click', function () {
                $('#cmx-table-detail-legal').hide();
                $('#cmx-table-detail-person').hide();
                $('.page-content').show();
            });
        });
    },
    reject: function (data) {

    }
});

//法人
cmx.route.view({
    index: 'getLegalList',
    resolve: function (result) {
        var param = result.data;
        if (param.length <= 0)
            return;
        var data = param.dataList;
        console.log(data);
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-ntd-tbody-legal").html('');
        for (var i = 0; i < data.length; i++) {
            var tbody_html = '';
            tbody_html = ['<tr>',
                ' <td class="text-center">',
                pageSize * (pageNumber - 1) + i + 1 + '<input type="hidden" class="ApplyID" value="' + data[i].applyID + '"/>',
                '</td>',
                '<td class="nc"><a href="javascript:;"><i class="icon wb-download" aria-hidden="true" title="导出Word"></i></a></td>',
                '<td>' + data[i].unitName + '</td>',
                '<td>' + data[i].crName + '</td>',
                '<td>' + data[i].orgCode + '</td>',
                '<td>' + data[i].contactorName + '</td>',
                '<td>' + data[i].contactNO + '</td>',
                '<td>' + data[i].fax + '</td>',
                '<td>' + data[i].postalCode + '</td>',
                '<td>' + data[i].email + '</td>',
                '<td>' + data[i].address + '</td>',
                '<td>' + data[i].carrierFormName + '</td>',
                '<td>' + data[i].getWayName + '</td>',
                // '<td>' + data[i].approvalUserName + '</td>',
                // '<td>' + data[i].approvalDate + '</td>',
                // '<td>' + data[i].apprOpinion + '</td>',
                '<td>' + data[i].apprStatusName + '</td>',
                '<td>' + data[i].remark + '</td>',
                // '<td>' + data[i].createUserName + '</td>',
                // '<td>' + data[i].createDate + '</td>',
                // '<td>' + data[i].updUserName + '</td>',
                // '<td>' + data[i].updDate + '</td>',
                '</tr>'
            ].join("");
            $("#cmx-ntd-tbody-legal").append(tbody_html);
        }
        $('#cmx-pneedPage-legal .nowpage').html(pageNumber);
        $('#cmx-pneedPage-legal .jumppage').val(pageNumber);
        $('#cmx-pneedPage-legal .totalpage').html(param.pages);
        legalFunc.pageCount = param.pages;

        //导出word格式
        $('.wb-download').off('click');
        $('.wb-download').on('click', function () {
            console.log($(this).closest('tr').find('.ApplyID').val());
            window.open(api_io + "/ioInfoPubApplyCR/downLoadFormApplyCr?applyId=" + $(this).closest('tr').find('.ApplyID').val() + "&token=" + getData("token"));
        });

        //点击数据行，加载查看页面
        $("#cmx-ntd-tbody-legal tr td:not(.nc)").on('click', function () {
            //当前修改的条目
            var item = $(this).parent('tr');

            $('.page-content').hide();
            $('#cmx-table-detail-person').hide();
            $('#cmx-table-detail-legal').show();
            //初始化查看界面内容
            new cmx.process()
                .turn('callajax', {
                    url: api_io + '/ioInfoPubApplyCR/querySingleCRApply?token=' + getData("token") + "&applyID=" + item.find('.ApplyID').val(), //测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试
                    type: 'GET',
                    success: function (json) {
                        console.log(json);
                        if (json.data) {
                            $('#cmx-table-detail-legal [key="title"]').text(json.data.inforTitle);
                            $('#cmx-table-detail-legal [key="UnitName"]').text(json.data.unitName);
                            $('#cmx-table-detail-legal [key="CrName"]').text(json.data.crName);
                            $('#cmx-table-detail-legal [key="OrgCode"]').text(json.data.orgCode);
                            $('#cmx-table-detail-legal [key="ContactorName"]').text(json.data.contactorName);
                            $('#cmx-table-detail-legal [key="ContactNO"]').text(json.data.contactNO);
                            $('#cmx-table-detail-legal [key="Fax"]').text(json.data.fax);
                            $('#cmx-table-detail-legal [key="PostalCode"]').text(json.data.postalCode);
                            $('#cmx-table-detail-legal [key="Email"]').text(json.data.email);
                            $('#cmx-table-detail-legal [key="Address"]').text(json.data.address);
                            $('#cmx-table-detail-legal [key="CarrierForm"]').text(json.data.carrierFormName);
                            $('#cmx-table-detail-legal [key="GetWay"]').text(json.data.getWayName);
                            // $('#cmx-table-detail-legal [key="ApprUserID"]').text(json.data.approvalUserName);
                            // $('#cmx-table-detail-legal [key="ApprovalDate"]').text(json.data.approvalDate);
                            // $('#cmx-table-detail-legal [key="ApprOpinion"]').text(json.data.apprOpinion);
                            $('#cmx-table-detail-legal [key="AppStatus"]').text(json.data.apprStatusName);
                            $('#cmx-table-detail-legal [key="Remark"]').text(json.data.remark);
                            // $('#cmx-table-detail-legal [key="CreateUserID"]').text(json.data.createUserName);
                            // $('#cmx-table-detail-legal [key="CreateDate"]').text(json.data.createDate);
                            // $('#cmx-table-detail-legal [key="UpdUserid"]').text(json.data.updUserName);
                            // $('#cmx-table-detail-legal [key="UpdDate"]').text(json.data.updDate);

                            if (!json.data.iDCardIndex) $('#cmx-table-detail-legal [key="IDCardIndex"]').html('<img src="' + getFile + json.data.reserve3 + '"/>');
                            $('#cmx-table-detail-legal [key="InfoTitle"]').text(json.data.inforTitle);
                            $('#cmx-table-detail-legal [key="ContentDesc"]').text(json.data.contentDesc);
                            $('#cmx-table-detail-legal [key="InforUse"]').text(json.data.inforUse);
                        }
                    }
                })
                .start();
            //文章查看页面 - 返回按钮事件
            $('#cmx-table-detail-legal .cmx-button-return').off();
            $('#cmx-table-detail-legal .cmx-button-return').on('click', function () {
                $('#cmx-table-detail-legal').hide();
                $('#cmx-table-detail-person').hide();
                $('.page-content').show();
            });
        });

    },
    reject: function (data) {

    }
});