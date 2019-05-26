'use strict';
// cmx.g.regist('danweimingcheng', '');
// cmx.g.regist('danweipublishType', '');
// cmx.g.regist('danweiinstId', '');
// cmx.g.regist('museumName', '');
// cmx.g.regist('museumId', '');
// cmx.g.regist('unitName', '');
// cmx.g.regist('unitId', '');
// cmx.g.regist('relicinfo', '');
cmx.g.regist('replyName', '');
cmx.g.regist('replyId', '');
cmx.g.regist('planId', ''); //年度计划ID
cmx.g.regist('planName', ''); //年度计划名称
// /**
//  * @author zhengkaidi
//  * @description 国保单位
//  */
// cmx.route.view({
//     index: 'getProtectunit',
//     resolve: function (result) {
//         console.log(result);
//         var param = result.prevModelData.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-tbody-1").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
//             tr_html = ['<tr>',
//                 '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                 '<td>' + data[i].belongTypeName + '</td>',
//                 '<td>' + data[i].instName + '</td>',
//                 '<td>' + data[i].publishBatchName + '</td>',
//                 '<td>' + (IsEmpty(data[i].publishTypeName) || data[i].publishTypeName == 'null' ? '无' : data[i].publishTypeName) + '</td>',
//                 '<td>' + data[i].publishYearName + '</td>',
//                 '<td>' + data[i].areaCodeName + '</td>',
//                 '<td>' + data[i].address + '</td>',
//                 '<td>' + relic_city + '</td>',
//                 '</tr>'
//             ].join("");
//             $("#cmx-tbody-1").append(tr_html);
//         }
//         $('#relicTabOne-page .nowpage').html(pageNumber);
//         $('#relicTabOne-page .totalpage').html(param.pages);
//         RelicsProtectionFunc.pageCount1 = param.pages;

//         $("#cmx-tbody-1 tr").each(function (index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function () {
//                 $("#cmx-tbody-1 tr").each(function () {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 console.log(index);
//                 console.log(data[index]);
//                 var unitdata = data[index];
//                 cmx.g.danweimingcheng = data[index].instName;
//                 cmx.g.danweipublishType = data[index].publishType;
//                 cmx.g.danweiinstId = data[index].instId;
//                 if (typeof (result.parameter.callback) == 'function') {
//                     $("#cmx-confirm-btn").unbind('click');
//                     $("#cmx-confirm-btn").bind('click', function () {
//                         if (IsEmpty(cmx.g.danweimingcheng)) {
//                             showAlert({
//                                 type: 'info',
//                                 content: '请选择一个国保单位'
//                             });
//                             return;
//                         }
//                         result.parameter.callback(unitdata);
//                     });
//                 }
//             });
//         });


//     },
//     reject: function (data) {

//     }
// });
// /**
//  * @author zhengkaidi
//  * @description 世界遗产
//  */
// cmx.route.view({
//     index: 'getWorldHeritage',
//     resolve: function(result) {
//         var param = result.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-tbody-2").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             var relic_type = !IsEmpty(data[i].type) ? data[i].type : '';
//             var relic_city = !IsEmpty(data[i].city) ? data[i].city : '';
//             tr_html = ['<tr>',
//                 '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                 '<td>' + relic_type + '</td>',
//                 '<td>' + data[i].areaName + '</td>',
//                 '<td>' + data[i].category + '</td>',
//                 '<td>' + data[i].times + '</td>',
//                 '<td>' + data[i].belongAreaName + '</td>',
//                 '<td>' + data[i].address + '</td>',
//                 '<td>' + relic_city + '</td>',
//                 '</tr>'
//             ].join("");
//             $("#cmx-tbody-2").append(tr_html);
//         }
//         // alert("woshi");
//         // alert(param.pages);
//         $('#relicTabTwo-page .nowpage').html(pageNumber);
//         $('#relicTabTwo-page .totalpage').html(param.pages);
//         RelicsProtectionFunc.pageCount2 = param.pages;

//         $("#cmx-tbody-2 tr").each(function(index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function() {
//                 $("#cmx-tbody-2 tr").each(function() {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 cmx.g.danweimingcheng = data[index].areaName;
//                 cmx.g.danweipublishType = data[index].publishType;
//                 cmx.g.danweiinstId = data[index].instId;
//             });
//         });
//     },
//     reject: function(data) {}
// });

// cmx.route.view({
//     index: 'saveNoNationProjectData',
//     resolve: function (param) {
//         showAlert({
//             type: 'success',
//             content: param.msg
//         });
//     },
//     reject: function (data) {
//         showAlert({
//             type: 'error',
//             content: data
//         });
//     }
// });
// cmx.route.view({
//     index: 'sendNoNationProjectData',
//     resolve: function (param) {
//         showAlert({
//             type: 'success',
//             content: param.msg
//         });
//     },
//     reject: function (data) {
//         showAlert({
//             type: 'error',
//             content: data
//         });
//     }
// });
//56014-3计划列表模态框
cmx.route.view({
    index: 'getPlanList',
    resolve: function (result) {
        console.log(result);
        var param = result.data;
        var data = param.dataList;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-plan-tbody").html('');
        for (var i = 0; i < data.length; i++) {
            var projectTypeName = '';
            switch (data[i].projectType) {
                case '1':
                    projectTypeName = '考古发掘';
                    break;
                case '2':
                    projectTypeName = '不可移动文物';
                    break;
                case '3':
                    projectTypeName = '文物行政执法督查';
                    break;
                case '4':
                    projectTypeName = '博物馆和可移动文物';
                    break;
                case '5':
                    projectTypeName = '社会文物';
                    break;
                default:
                    break;
            }
            var tr_html = '';
            tr_html = ['<tr>',
                '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
                '<td>' + data[i].projectName + '</td>',
                '<td>' + projectTypeName + '</td>',
                '<td>' + data[i].protectPos + '</td>',
                '<td>' + data[i].protectRange + '</td>',
                '<td>' + '' + '</td>',
                '</tr>'
            ].join("");
            $("#cmx-plan-tbody").append(tr_html);
        }

        $('#cmx-plan-Pagination .nowpage').html(pageNumber);
        $('#cmx-plan-Pagination .totalpage').html(param.pages);
        planListFunc.pageCount = param.pages;

        $("#cmx-plan-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-plan-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                // console.log(data[index]);
                cmx.g.planId = data[index].planId;
                cmx.g.planName = data[index].projectName;
            });
        })

    },
    reject: function (data) {
        showAlert({
            type: 'error',
            content: data
        });
    }
});

// //单位列表
// cmx.route.view({
//     index: 'getUnitList',
//     resolve: function (result) {
//         console.log(result);
//         var busiType = getData('busiType');
//         // alert(busiType);
//         var param = result.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-unit-tbody").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             if (busiType == 'CRP') {
//                 tr_html = ['<tr>',
//                     '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                     '<td>' + data[i].unitName + '</td>',
//                     '<td>' + data[i].qualClass + '</td>',
//                     '<td>' + data[i].qualLevel + '</td>',
//                     '</tr>'
//                 ].join("");
//             } else if (busiType == 'CRR') {
//                 tr_html = ['<tr>',
//                     '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                     '<td>' + data[i].provinceName + '</td>',
//                     '<td>' + data[i].unitName + '</td>',
//                     '<td>' + data[i].busiScope + '</td>',
//                     '<td>' + data[i].contactName + '</td>',
//                     '<td>' + data[i].contactTelno+ '</td>',
//                     '</tr>'
//                 ].join("");
//             } else if (busiType == 'SP') {
//                 tr_html = ['<tr>',
//                     '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                     '<td>' + data[i].unitName + '</td>',
//                     '<td>' + data[i].provinceName + '</td>',
//                     '<td>' + data[i].qualClass + '</td>',
//                     '<td>' + data[i].qualLevel + '</td>',
//                     '<td>' + data[i].validDate + '</td>',
//                     '</tr>'
//                 ].join("");
//             }
//             $("#cmx-unit-tbody").append(tr_html);
//         }

//         $('#cmx-unit-Pagination .nowpage').html(pageNumber);
//         $('#cmx-unit-Pagination .totalpage').html(param.pages);
//         unitListFunc.pageCount = param.pages;

//         $("#cmx-unit-tbody tr").each(function (index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function () {
//                 $("#cmx-unit-tbody tr").each(function () {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 // console.log(data[index]);
//                 cmx.g.unitName = data[index].unitName;
//                 cmx.g.unitId = data[index].unitCode;
//             });
//         })

//     },
//     reject: function (data) {
//         showAlert({
//             type: 'error',
//             content: data
//         });
//     }
// });
// //方案编制单位列表56015-b
// cmx.route.view({
//     index: 'getProjectWorkUnitList',
//     resolve: function (result) {
//         console.log(result);
//         var param = result.prevModelData.data;
//         // var data = param.dataList;
//         // var param = result.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-unit-tbody").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             tr_html = ['<tr>',
//                 '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                 '<td>' + data[i].provinceName + '</td>',
//                 '<td>' + data[i].unitName + '</td>',
//                 '<td>' + data[i].busiScope + '</td>',
//                 '<td>' + data[i].contactName + '</td>',
//                 '<td>' + data[i].contactTelno + '</td>',
//                 '</tr>'
//             ].join("");
//             $("#cmx-unit-tbody").append(tr_html);
//         }

//         $('#cmx-unit-Pagination .nowpage').html(pageNumber);
//         $('#cmx-unit-Pagination .totalpage').html(param.pages);
//         unitListFunc.pageCount = param.pages;

//         $("#cmx-unit-tbody tr").each(function (index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function () {
//                 $("#cmx-unit-tbody tr").each(function () {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 // console.log(data[index]);
//                 cmx.g.unitName = data[index].unitName;
//                 cmx.g.unitId = data[index].unitCode;
//                 // var unitdata = data[index];
//                 console.log(data[index]);
//                 $("#cmx-unit-confirm-btn").unbind('click');
//                 $("#cmx-unit-confirm-btn").bind('click', function () {

//                     // console.log(unitdata)
//                     if (IsEmpty(cmx.g.unitName)) {
//                         showAlert({
//                             type: 'info',
//                             content: '请选择一个方案编制单位'
//                         });
//                         return;
//                     }
//                     result.parameter.goto(unitdata);
//                 });
//             });
//         })

//     },
//     reject: function (data) {
//         showAlert({
//             type: 'error',
//             content: data
//         });
//     }
// });
// //选择文物模态框
// cmx.route.view({
//     index: 'getRelicList',
//     resolve: function (result) {
//         console.log(result);
//         var param = result.prevModelData.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-relic-info-tbody").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             tr_html = ['<tr>',
//                 '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                 '<td>' + data[i].antiqueName + '</td>',
//                 '<td>' + data[i].relicCode + '</td>',
//                 '<td>' + data[i].relicQualityName + '</td>',
//                 '<td>' + data[i].relicLevelName + '</td>',
//                 '<td>' + data[i].museumName + '</td>',
//                 '<td>' + data[i].intactStatusName + '</td>',
//                 '<td>' + data[i].intactDiscp + '</td>',
//                 '<td>' + data[i].saveStateName + '</td>',
//                 '<td>' + data[i].num + '</td>',
//                 '<td>' + data[i].relicOriginWayName + '</td>',
//                 '<td>' + data[i].saveYear + '</td>',
//                 '<td>' + data[i].ageName + '</td>',
//                 '<td>' + data[i].culturalClassName + '</td>',
//                 '<td>' + data[i].realSize + '</td>',
//                 '</tr>'
//             ].join("");
//             $("#cmx-relic-info-tbody").append(tr_html);
//         }
//         $('#cmx-relic-Pagination .nowpage').html(pageNumber);
//         $('#cmx-relic-Pagination .totalpage').html(param.pages);
//         relicListFunc.pageCount = param.pages;

//         $("#cmx-relic-info-tbody tr").each(function (index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function () {
//                 $("#cmx-relic-info-tbody tr").each(function () {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 var ss = data[index];
//                 cmx.g.relicinfo = data[index];
//                 // console.log(index);
//                 // console.log(data[index]);

//                 $("#cmx-confirm-btn").unbind('click');
//                 $("#cmx-confirm-btn").bind('click', function () { //点击确认按钮后操作
//                     console.log(result.parameter);
//                     result.parameter.callback(data[index]);
//                     $("#cmx-select-relic-modal").modal('hide');
//                 });

//             });

//         });

//     },
//     reject: function (data) {

//     }
// });
// //博物馆
// cmx.route.view({
//     index: 'getMuseumList',
//     resolve: function (result) {
//         console.log(result);
//         var param = result.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-mmuseum-tbody").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             tr_html = ['<tr>',
//                 '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                 '<td>' + data[i].instName + '</td>',
//                 '<td>' + '' + '</td>',
//                 '<td>' + '' + '</td>',
//                 '<td>' + data[i].telNo + '</td>',
//                 '</tr>'
//             ].join("");
//             $("#cmx-mmuseum-tbody").append(tr_html);
//         }
//         $('#cmx-museum-Pagination .nowpage').html(pageNumber);
//         $('#cmx-museum-Pagination .totalpage').html(param.pages);
//         museumListFunc.pageCount = param.pages;

//         $("#cmx-mmuseum-tbody tr").each(function (index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function () {
//                 $("#cmx-mmuseum-tbody tr").each(function () {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 // console.log(index);
//                 // console.log(data[index]);
//                 cmx.g.museumName = data[index].instName;
//                 cmx.g.museumId = data[index].instId;
//             });
//         });

//     },
//     reject: function (data) {

//     }
// });

//批复文件
cmx.route.view({
    index: 'getReplyList',
    resolve: function (result) {
        console.log(result);
        var param = result.prevModelData.data;
        var data = param.dataList;
        var pageSize = param.pageSize;
        var pageNumber = param.pageNumber;
        $("#cmx-reply-tbody").html('');
        for (var i = 0; i < data.length; i++) {
            var tr_html = '';
            tr_html = ['<tr>',
                '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
                '<td>' + data[i].rfnumber + '</td>',
                '<td>' + data[i].protectName + '</td>',
                '<td>' + (IsEmpty(data[i].protectUnitName) || data[i].protectUnitName == 'null' ? '无' : data[i].protectUnitName) + '</td>',
                '<td>' + data[i].years + '</td>',
                '<td>' + data[i].rftitle + '</td>',
                '</tr>'
            ].join("");
            $("#cmx-reply-tbody").append(tr_html);
        }
        $('#cmx-reply-Pagination .nowpage').html(pageNumber);
        $('#cmx-reply-Pagination .totalpage').html(param.pages);
        replyListFunc.pageCount = param.pages;

        $("#cmx-reply-tbody tr").each(function (index) {
            var _self = $(this);
            $(this).unbind('click');
            $(this).bind('click', function () {
                $("#cmx-reply-tbody tr").each(function () {
                    $(this).removeClass("active");
                })
                _self.addClass("active");
                cmx.g.replyName = data[index].protectName;
                cmx.g.replyId = data[index].rfnumber;
            });
        });

    },
    reject: function (data) {

    }
});

// //选择文物模态框
// cmx.route.view({
//     index: 'getexpertRelic',
//     resolve: function (result) {
//         console.log(result);
//         var param = result.prevModelData.data;
//         var data = param.dataList;
//         var pageSize = param.pageSize;
//         var pageNumber = param.pageNumber;
//         $("#cmx-relic-info-tbody").html('');
//         for (var i = 0; i < data.length; i++) {
//             var tr_html = '';
//             tr_html = ['<tr>',
//                 '<td>' + ((i + 1) + (pageSize * (pageNumber - 1))) + '</td>',
//                 '<td>' + data[i].relicName + '</td>',
//                 '<td>' + data[i].relicNumber + '</td>',
//                 '<td>' + data[i].relicQuality + '</td>',
//                 '<td>' + data[i].relicLevel + '</td>',
//                 '<td>' + data[i].collectUnitName + '</td>',
//                 '<td>' + data[i].relicAmount + '</td>',
//                 '<td>' + data[i].relicYear + '</td>',
//                 '<td>' + data[i].relicSize + '</td>',
//                 '</tr>'
//             ].join("");
//             $("#cmx-relic-info-tbody").append(tr_html);
//         }
//         $('#cmx-relic-Pagination .nowpage').html(pageNumber);
//         $('#cmx-relic-Pagination .totalpage').html(param.pages);
//         relicListFunc.pageCount = param.pages;

//         $("#cmx-relic-info-tbody tr").each(function (index) {
//             var _self = $(this);
//             $(this).unbind('click');
//             $(this).bind('click', function () {
//                 $("#cmx-relic-info-tbody tr").each(function () {
//                     $(this).removeClass("active");
//                 })
//                 _self.addClass("active");
//                 var ss = data[index];
//                 cmx.g.relicinfo = data[index];
//                 // console.log(index);
//                 // console.log(data[index]);

//                 $("#cmx-confirm-btn").unbind('click');
//                 $("#cmx-confirm-btn").bind('click', function () { //点击确认按钮后操作
//                     console.log(result.parameter);
//                     result.parameter.callback(data[index]);
//                     $("#cmx-expert-select-relic-modal").modal('hide');
//                 });

//             });

//         });

//     },
//     reject: function (data) {

//     }
// });