$(function () {
    var message = {
        mLoading: '<tr class="row text-center"><td colspan="10"><h5>数据加载中...</h5></td></tr>',
        noMsg: '<tr class="row text-center"><td colspan="10"><h5>暂无数据</h5></td></tr>',
        mError: '<tr class="row text-center"><td colspan="10"><h5>数据加载失败，请检查网络</h5></td></tr>',
    }

    // 设置ajax的全局默认选项
    jQuery.support.cors = true; // 让jQuery支持跨域请求
    $.ajaxSetup({
        url: publicUrl_4 + '/dmDatadic/getDataDicFromRedis', // 默认URL
        type: 'get', // 默认使用get方式
        aysnc: true, // 默认异步加载
        cache: false,
        dataType: 'json',
        error: function (err) { // 出错时默认的处理函数
            console.log('ajax请求出错了...');
        }
    });

    var status = 0;

    function judgeTheLast() { // 判断哪个异步请求最后返回 然后赋值、检索
        status++;
        if (status == 3) { // ststus等于3时 异步请求全部完成
            $('#search').click();
        }
    }

    // 页面加载时 获取省份下拉列表
    $.ajax({
        data: { dataType: 'Province' },
        success: function (res) {
            var result = JSON.parse(res.data),
                str = '<option value="">所有</option>';
            for (var i in result.Province) {
                str += '<option value=' + i + '>' + result.Province[i] + '</option>';
            }
            $('#province').html(str);
            judgeTheLast();
        }
    });

    // 页面加载时 获取单位资质
    $.ajax({
        data: { dataType: 'UnitQualifications' },
        success: function (res) {
            console.log(res);
            var result = JSON.parse(res.data),
                str = '<label for="" class="pis3 fontweight">单位资质：</label>';
            for (var i in result.UnitQualifications) {
                str += '<label class="demo--label">' +
                    '<input id="radio' + i + '" class="demo--radio" value=' + i + ' type="checkbox"' + 'name="demo-checkbox' + i + '">' +
                    '<span class="demo--checkbox demo--radioInput"></span>' + result.UnitQualifications[i] +
                    '</label>';
            }
            // console.log(str);
            $('#unitQuali').html(str);
            judgeTheLast();
        }
    });

    // 页面加载时 根据pdataCode判断范围一级还是范围二级
    $.ajax({
        url: publicUrl_4 + "/dmQualificationsunit/getDataByType",
        data: { dataType: 'UnitQualiRange' },
        success: function (res) {
            console.log(res);
            var str = '<label for="" class="pis3 fontweight">范围一级：</label>',
                str2 = '<label for="" class="pis3 fontweight">范围二级：</label>';
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].pdataCode == '') {
                    str += '<label class="demo--label">' +
                        '<input class ="demo--radio" type="checkbox" value="' + res.data[i].dataCode + '" name="demo2-checkbox' + res.data[i].dataCode + '"> <span class="demo--checkbox demo--radioInput"></span>' + res.data[i].dataName +
                        '</label>';
                } else {
                    str2 += '<label class="demo--label">' +
                        '<input class ="demo--radio" type="checkbox" value="' + res.data[i].dataCode + '" name="demo2-checkbox' + res.data[i].dataCode + '"> <span class="demo--checkbox demo--radioInput"></span>' + res.data[i].dataName +
                        '</label>';
                }
            }
            console.log(str);
            $('#range-1').html(str);
            $('#range-2').html(str2);
            judgeTheLast();
        }
    });


    // 点击检索
    $('#search').on('click', function (e) {
        e.preventDefault();
        $that = $(this);
        // 判断范围一级+范围二级哪几个复选框选中用逗号连接起来
        var ischeck = [];
        function isCheck() {
            $.each($('.classification-left input:checkbox:not("#unitQuali input:checkbox")'), function () {
                if (this.checked) {
                    ischeck.push($(this).val());
                }
            });
            return ischeck.join(',');
        }

        var formData = {
            pageNum: 1,
            pageSize: 20,
            DmQualiUnitData: [{
                "province": $('#province').val(), // 行政区划
                "unitName": $('#unitName').val(), // 单位名称
                "reserve1": isCheck(), // 范围一级+范围二级
                "reserve2": false, // 给后端传的字段 判断是否可以展示 后端给我返回可以展示的数据
                "unitQualiDesign": $('#radio1').is(':checked') == true ? 1 : '', // 勘察甲级,
                "unitQualiBuild": $('#radio2').is(':checked') == true ? 2 : '', // 施工一级,
                "unitQualiWatch": $('#radio3').is(':checked') == true ? 3 : '', // 监理甲级,
                "unitQualiDesigRange": $('#unitQualiDesigRange').val(), // 业务范围
            }]
        };
        console.log(formData);

        // 发起ajax请求
        $.ajax({
            url: publicUrl_4 + '/dmQualificationsunit/getPageDataByParam',
            type: 'post',
            data: JSON.stringify(formData),
            header: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            beforeSend: function (res) {
                res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                $('.modal-box').show();
            },
            success: function (res) {
                console.log(res);
                // 这里想办法优化！ 这里和下面写重复了
                var pages = res.data.pages, // 数据总页数
                    total = res.data.total, // 数据总条数
                    dataList = res.data.dataList; // 数据内容
                if (pages > 1) { // 大于1页时显示分页
                    $('.paging').show();
                } else {
                    $('.paging').hide();
                }

                var html = $('#tQualificationUnitList').html(),
                    content = '';
                for (var i = 0, len = dataList.length; i < len; i++) {
                    var str = html;
                    str = str.replace('$unitCode$', dataList[i].unitCode);
                    str = str.replace('$unitName$', dataList[i].unitName);
                    str = str.replace('$provinceName$', dataList[i].provinceName);
                    str = str.replace('$unitQualiDesign$', dataList[i].unitQualiDesign == '1' ? '√' : '×');
                    str = str.replace('$unitQualiBuild$', dataList[i].unitQualiBuild == '2' ? '√' : '×');
                    str = str.replace('$unitQualiWatch$', dataList[i].unitQualiWatch == '3' ? '√' : '×');
                    str = str.replace('$lawName$', dataList[i].lawName);
                    str = str.replace('$regMoney$', dataList[i].regMoney);
                    str = str.replace('$address$', dataList[i].address);
                    str = str.replace('$economicType$', dataList[i].economicType);
                    str = str.replace('$personCount$', dataList[i].personCount);
                    content += str;
                }
                $('#qualificationUnit').html(content);

                if (dataList.length) {
                    $('.M-box4').pagination({
                        pageCount: pages,
                        totalData: total,
                        jump: true,
                        count: 2,
                        current: 1,
                        homePage: '首页',
                        endPage: '尾页',
                        prevContent: '上一页',
                        nextContent: '下一页',
                        coping: true,
                        keepShowPN: true,
                        callback: function (api) {
                            formData.pageNum = api.getCurrent();
                            $.ajax({
                                url: publicUrl_4 + '/dmQualificationsunit/getPageDataByParam',
                                type: 'post',
                                data: JSON.stringify(formData),
                                header: {
                                    'Content-type': 'application/x-www-form-urlencoded'
                                },
                                beforeSend: function (res) {
                                    res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                                    $('.modal-box').show();
                                },
                                success: function (res) {
                                    // console.log(res);
                                    var dataList = res.data.dataList; // 数据内容
                                    var html = $('#tQualificationUnitList').html(),
                                        content = '';
                                    for (var i = 0, len = dataList.length; i < len; i++) {
                                        var str = html;
                                        str = str.replace('$unitCode$', dataList[i].unitCode);
                                        str = str.replace('$unitName$', dataList[i].unitName);
                                        str = str.replace('$provinceName$', dataList[i].provinceName);
                                        str = str.replace('$unitQualiDesign$', dataList[i].unitQualiDesign == '1' ? '√' : '×');
                                        str = str.replace('$unitQualiBuild$', dataList[i].unitQualiBuild == '2' ? '√' : '×');
                                        str = str.replace('$unitQualiWatch$', dataList[i].unitQualiWatch == '3' ? '√' : '×');
                                        str = str.replace('$lawName$', dataList[i].lawName);
                                        str = str.replace('$regMoney$', dataList[i].regMoney);
                                        str = str.replace('$address$', dataList[i].address);
                                        str = str.replace('$economicType$', dataList[i].economicType);
                                        str = str.replace('$personCount$', dataList[i].personCount);
                                        content += str;
                                    }
                                    $('#qualificationUnit').html(content);
                                },
                                complete: function () {
                                    $('.modal-box').hide(); // 让模态框隐藏 
                                }
                            });
                        }
                    });
                } else {
                    $('#qualificationUnit').html(message.noMsg);
                }
            },
            complete: function () {
                $('.modal-box').hide(); // 让模态框隐藏 
            },
            error: function (res) {
                console.log('ajax请求失败...')
            }
        });
    });

    // 防止重复点击 等会再做
    var isClick = true;

    var testEditItem = 'template.html'; // load的模板
    // 展示数据 点击单位弹出模态框
    $(".statistics").on("off", "#qualificationUnit td:first-child a");
    $('.statistics').on("click", '#qualificationUnit td:first-child a', function (e) {
        e.preventDefault();
        if (isClick) {
            isClick = false;
            var formData = {
                pageNum: 1,
                pageSize: 20,
                DmQualiUnitData: [{ // 单位
                    "unitCode": $(e.target).attr('data-unitCode'),
                    "reserve2": false
                }]
            };

            // 发起ajax请求 请求单位
            $.ajax({
                url: publicUrl_4 + '/dmQualificationsunit/getPageDataByParam',
                type: 'post',
                data: JSON.stringify(formData),
                header: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                beforeSend: function (res) {
                    res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                },
                success: function (res) {
                    console.log(res);
                    var dataList = res.data.dataList[0];
                    var param = res.data.dataList[0].perList;
                    // 点击模态框里面的超链接 重新渲染数据

                    $('#test-edit-modal').load(testEditItem, function (res) {
                        $('#myModal').off('shown.bs.modal');

                        //弹出框添加显示事件
                        $('#tbody_html').html(''); // 清空上一次渲染

                        $('#myModal').on('shown.bs.modal', function () {
                            $('#myModalLabel').text('单位基本信息');
                            var html = ['<div class="dataTables_wrapper ">',
                                '<table cellpadding="0" cellspacing="0" class="table ShowTable" style="background-color:white;">',
                                '<tbody>',
                                '<tr>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">单位序号：</label>',
                                '<label class="LabelContent">' + dataList.unitCode + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">单位名称：</label>',
                                ' <label class="LabelContent">' + dataList.unitName + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">所属地区：</label>',
                                '<label class="LabelContent">' + dataList.provinceName + '</label>',
                                '</td>',
                                '</tr>',
                                '<tr>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">勘查资质：</label>',
                                '<label class="LabelContent">' + dataList.unitQualiDesignName + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">施工资质：</label>',
                                '<label class="LabelContent">' + dataList.unitQualiBuildName + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">监理资质：</label>',
                                '<label ', 'class="LabelContent">' + dataList.unitQualiWatchName + '</label>',
                                '</td>',
                                '</tr>',
                                '<tr>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">勘察业务范围：</label>',
                                '<label class="LabelContent">' + dataList.unitQualiDesigRange + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">施工业务范围：</label>',
                                '<label class="LabelContent">' + dataList.unitQualiBuildRange + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                ' <label class="LabelTitle">监理业务范围：</label>',
                                '<label class="LabelContent">' + dataList.unitQualiWatchRange + '</label>',
                                '</td>',
                                '</tr>',
                                '<tr>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">勘察公布文件：</label>',
                                '<label class="LabelContent">' +
                                dataList.unitQualiDesignFile + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">施工公布文件：</label>',
                                '<label class="LabelContent">' +
                                dataList.unitQualiBuildFile + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">监理公布文件：</label>',
                                ' <label class="LabelContent">' +
                                dataList.unitQualiWatchFile +
                                '</label>',
                                '</td>',
                                '</tr>',

                                ' <tr>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">成立时间：</label>',
                                ' <label class="LabelContent">' + dataList.foundTime + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">法定代表人：</label>',
                                '<label class="LabelContent">' + dataList.lawName + '</label>',
                                '</td>',
                                ' <td style="width:33%;">',
                                ' <label class="LabelTitle">注册资金：</label>',
                                ' <label class="LabelContent">' + dataList.regMoney + '</label>',
                                '</td>',
                                '</tr>',
                                '<tr>',
                                '<td style="width:66%;" colspan="2">',
                                '<label class="LabelTitle">地址：</label>',
                                '<label class="LabelContent">' + dataList.address + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">经济性质：</label>',
                                '<label class="LabelContent">' + dataList.economicType + '</label>',
                                '</td>',
                                '</tr>',
                                '<tr>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">联系电话：</label>',
                                '<label class="LabelContent">' + dataList.tel + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">电子邮箱：</label>',
                                '<label ', 'class="LabelContent">' + dataList.email + '</label>',
                                '</td>',
                                '<td style="width:33%;">',
                                '<label class="LabelTitle">备注：', '</label>',
                                '<label ', 'class="LabelContent">' + dataList.remark + '</label>',
                                '</td>',
                                '</tr>',
                                '</tbody></table>', '<h3 style="padding-top:10px;padding-bottom:10px;color:#0088cc;">资质人员</h3>',
                                '<table cellpadding="0" cellspacing="0" class="table ShowTable" style="background-color:white;">',
                                '<tbody><tr>',
                                '<td>',
                                '<table cellpadding="0" cellspacing="0" class="table" style="text-align:center;margin-bottom:5px;">',
                                '<thead>',
                                '<tr style="line-height:25px;">',
                                '<th style="width:100px;">姓名</th>',
                                '<th style="width:150px;">身份证号</th>',
                                '<th style="width:150px;">资质</th>',
                                '<th style="width:150px;">联系方式</th>',
                                '</tr>',
                                '</thead>',
                                '<tbody id="tbody_html_2">', '</tbody></table>',
                                '</td>',
                                '</tr>',
                                '</tbody></table>',
                                '</div >'].join('');

                            var html2 = '';
                            for (var i = 0; i < param.length; i++) {//' + param[i].idcard + '
                                var content = '<tr>' +
                                    '<td><a href="" data-userid="' + param[i].userId + '" class="lightbox LinkTitle person">' + param[i].userName + '</a></td>' +
                                    '<td>/</td>' +
                                    '<td>' + param[i].perQualiDesignName + ' ' + param[i].perQualiBuildName + ' ' + param[i].perQualiWatchName + '</td>' +
                                    '<td>' + param[i].contactTel + '</td>' +
                                    '</tr>';
                                html2 += content;
                            }
                            $('#modal-body').html(html);
                            $('#tbody_html_2').html(html2);

                            isClick = true; // 重新设置为可以点击                                    

                            // 点击人员
                            $("#myModal").on("off", ".person");
                            $("#myModal").on("click", ".person", function (e) {
                                e.preventDefault();
                                var formData = {
                                    pageNum: 1,
                                    pageSize: 20,
                                    dmQualiPerData: [{
                                        "userId": $(e.target).attr('data-userId'),
                                        "reserve2": false
                                    }]
                                };
                                $.ajax({
                                    url: publicUrl_4 + '/dmQualificationsperson/getPageDataByParam',
                                    type: 'post',
                                    data: JSON.stringify(formData),
                                    header: {
                                        'Content-type': 'application/x-www-form-urlencoded'
                                    },
                                    beforeSend: function (res) {
                                        res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                                    },
                                    success: function (res) {
                                        console.log(res);
                                        var dataList = res.data.dataList[0];
                                        $('#myModalLabel').text('人员基本信息');
                                        $('#modal-body').html(''); // 清空上一次渲染
                                        var html = [
                                            '<div id="contentwrapper" class="contentwrapper" style="padding:0px;">',
                                            '<div class="dataTables_wrapper ">',
                                            '<table cellpadding="0" cellspacing="0" class="table ShowTable" style="background-color:white;">',
                                            '<tbody id="tbody_html">',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">人员序号：</label>',
                                            '<label class="LabelContent">' + dataList.seqId + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">人员姓名：</label>',
                                            '<label class="LabelContent">' + dataList.userName + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">身份证号码：</label>',
                                            '<label class="LabelContent">/</label>',//' + dataList.idcard + '
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">设计资质：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiDesignName + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">施工资质：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiBuildName + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">监理资质：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiWatchName + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">设计业务范围：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiDesigRange + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">施工业务范围：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiBuildRange + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">监理业务范围：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiWatchRange + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">设计业务证书编号：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiDesignFile + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">施工业务证书编号：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiBuildFile + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">监理业务证书编号：</label>',
                                            '<label class="LabelContent">' + dataList.perQualiWatchFile + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">资质单位：</label>',
                                            '<label class="LabelContent">',
                                            '<a href="" data-UnitCode=' + dataList.instId + ' class="lightbox LinkTitle unit">' + dataList.instName + '</a>',
                                            '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">出生日期：</label>',
                                            // '<label class="LabelContent">' + dataList.birthday + '</label>', 出生日期暂时隐去
                                            '<label class="LabelContent"></label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">联系方式：</label>',
                                            '<label class="LabelContent">' + dataList.contactTel + '</label>',
                                            '</td>',
                                            '</tr>',

                                            '</tbody >',
                                            '</table >',
                                            '</div >',
                                        ].join('');
                                        $('#modal-body').html(html);
                                    }
                                });
                            });

                            // 点击资质单位
                            $("#myModal").on("off", ".unit");
                            $("#myModal").on("click", ".unit", function (e) {
                                e.preventDefault();

                                var formData = {
                                    pageNum: 1,
                                    pageSize: 1,
                                    DmQualiUnitData: [{
                                        "unitCode": $(e.target).attr('data-unitcode'), // 字段名是unitCode 值是对应的instid
                                        "reserve2": false
                                    }]
                                };
                                $.ajax({
                                    url: publicUrl_4 + '/dmQualificationsunit/getPageDataByParam',
                                    type: 'post',
                                    data: JSON.stringify(formData),
                                    header: {
                                        'Content-type': 'application/x-www-form-urlencoded'
                                    },
                                    beforeSend: function (res) {
                                        res.setRequestHeader('Content-type', 'application/json;charset=utf-8');
                                    },
                                    success: function (res) {
                                        console.log(res);
                                        var dataList = res.data.dataList[0];
                                        var param = res.data.dataList[0].perList;

                                        $('#myModalLabel').text('单位基本信息');
                                        var html = ['<div class="dataTables_wrapper ">',
                                            '<table cellpadding="0" cellspacing="0" class="table ShowTable" style="background-color:white;">',
                                            '<tbody>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">单位序号：</label>',
                                            '<label class="LabelContent">' + dataList.unitCode + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">单位名称：</label>',
                                            ' <label class="LabelContent">' + dataList.unitName + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">所属地区：</label>',
                                            '<label class="LabelContent">' + dataList.provinceName + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">勘查资质：</label>',
                                            '<label class="LabelContent">' + dataList.unitQualiDesignName + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">施工资质：</label>',
                                            '<label class="LabelContent">' + dataList.unitQualiBuildName + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">监理资质：</label>',
                                            '<label ', 'class="LabelContent">' + dataList.unitQualiWatchName + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">勘察业务范围：</label>',
                                            '<label class="LabelContent">' + dataList.unitQualiDesigRange + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">施工业务范围：</label>',
                                            '<label class="LabelContent">' + dataList.unitQualiBuildRange + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            ' <label class="LabelTitle">监理业务范围：</label>',
                                            '<label class="LabelContent">' + dataList.unitQualiWatchRange + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">勘察公布文件：</label>',
                                            '<label class="LabelContent">' +
                                            dataList.unitQualiDesignFile + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">施工公布文件：</label>',
                                            '<label class="LabelContent">' +
                                            dataList.unitQualiBuildFile + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">监理公布文件：</label>',
                                            ' <label class="LabelContent">' +
                                            dataList.unitQualiWatchFile +
                                            '</label>',
                                            '</td>',
                                            '</tr>',

                                            ' <tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">成立时间：</label>',
                                            ' <label class="LabelContent">' + dataList.foundTime + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">法定代表人：</label>',
                                            '<label class="LabelContent">' + dataList.lawName + '</label>',
                                            '</td>',
                                            ' <td style="width:33%;">',
                                            ' <label class="LabelTitle">注册资金：</label>',
                                            ' <label class="LabelContent">' + dataList.regMoney + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:66%;" colspan="2">',
                                            '<label class="LabelTitle">地址：</label>',
                                            '<label class="LabelContent">' + dataList.address + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">经济性质：</label>',
                                            '<label class="LabelContent">' + dataList.economicType + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '<tr>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">联系电话：</label>',
                                            '<label class="LabelContent">' + dataList.tel + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">电子邮箱：</label>',
                                            '<label ', 'class="LabelContent">' + dataList.email + '</label>',
                                            '</td>',
                                            '<td style="width:33%;">',
                                            '<label class="LabelTitle">备注：', '</label>',
                                            '<label ', 'class="LabelContent">' + dataList.remark + '</label>',
                                            '</td>',
                                            '</tr>',
                                            '</tbody></table>', '<h3 style="padding-top:10px;padding-bottom:10px;color:#0088cc;">资质人员</h3>',
                                            '<table cellpadding="0" cellspacing="0" class="table ShowTable" style="background-color:white;">',
                                            '<tbody><tr>',
                                            '<td>',
                                            '<table cellpadding="0" cellspacing="0" class="table" style="text-align:center;margin-bottom:5px;">',
                                            '<thead>',
                                            '<tr style="line-height:25px;">',
                                            '<th style="width:100px;">姓名</th>',
                                            '<th style="width:150px;">身份证号</th>',
                                            '<th style="width:150px;">资质</th>',
                                            '<th style="width:150px;">联系方式</th>',
                                            '</tr>',
                                            '</thead>',
                                            '<tbody id="tbody_html_2">', '</tbody></table>',
                                            '</td>',
                                            '</tr>',
                                            '</tbody></table>',
                                            '</div >'].join('');

                                        var html2 = '';
                                        for (var i = 0; i < param.length; i++) {//' + param[i].idcard + '
                                            var content = '<tr>' +
                                                '<td><a href="" data-userid="' + param[i].userId + '" class="lightbox LinkTitle person">' + param[i].userName + '</a></td>' +
                                                '<td>/</td>' +
                                                '<td>' + param[i].perQualiDesignName + ' ' + param[i].perQualiBuildName + ' ' + param[i].perQualiWatchName + '</td>' +
                                                '<td>' + param[i].contactTel + '</td>' +
                                                '</tr>';
                                            html2 += content;
                                        }
                                        $('#modal-body').html(html);
                                        $('#tbody_html_2').html(html2);
                                    }
                                });

                            });

                        });

                        $('#myModal').modal('show');
                    });

                },
                error: function (res) {
                    console.log('ajax请求失败...')
                }
            });
        }

    });

    // 点击重置输入框
    $('#reset').on('click', function (e) {
        e.preventDefault();
        $('#classification input[type="text"],#classification select').each(function () {
            $(this).val('');
        });
        $('input:checkbox').attr('checked', false); // 重置复选框
    });
});