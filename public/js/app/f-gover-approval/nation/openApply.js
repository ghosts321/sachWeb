/*
 * @Author: lvjinxiu 
 * @Date: 2018-03-21 12:00:51 
 * @Last Modified by: lvjinxiu
 * @Last Modified time: 2018-05-09 11:38:13
 */

'use strict';

$(function () {
    var num = true;
    //给'更多条件'按钮添加展开/收起事件
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
        .turn('buildDataDic', { //初始化载体形式下拉框数据
            element: $('#CarrierForm'),
            hasAll: true
        })
        .turn('buildDataDic', { //初始化领取方式下拉框数据
            element: $('#GetWay'),
            hasAll: true
        })
        .turn('personInit') //分页
        .cfinally(function () {
            $('#CarrierForm').selectpicker({ //给载体形式下拉框增加搜索功能
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
            $('#GetWay').selectpicker({ //给领取方式下拉框增加搜索功能
                size: 'auto',
                style: 'btn-transparent',
                liveSearch: true
            });
        })
        .start();

    //查询按钮-点击事件    
    $('#search-btn').click(function () {
        if ($('#openApplyperson').is(':checked')) {
            personFunc.pageNum = 1;
            personFunc.getPersonList();
        } else {
            legalFunc.pageNum = 1;
            legalFunc.getLegalList();
        }
    });
    //清除按钮-点击事件
    $('#clear-search-form').click(function () {
        $('#ApplyUserID').val('');
        $('#CarrierForm').val('-1').selectpicker('refresh');
        $('#GetWay').val('-1').selectpicker('refresh');
        if ($('#openApplyperson').is(':checked')) {
            personFunc.pageNum = 1;
            personFunc.getPersonList();
        } else {
            legalFunc.pageNum = 1;
            legalFunc.getLegalList();
        }
    });
});

//切换对象
function switchingObject(type) {
    $('#ApplyUserID').val('');
    $('#CarrierForm').val('-1').selectpicker('refresh');
    $('#GetWay').val('-1').selectpicker('refresh');
    if (type == 'legal') {
        new cmx.process()
            .turn('legalInit') //分页
            .start();
        $('#cmx-tab-person').hide();
        $('#cmx-tab-legal').show();
        if(!$('#cmx-tab-legal').find('table').hasClass('resizetable')){
            $('#cmx-tab-legal').find('table').addClass('resizetable table-bordered').resizableColumns();        
        }
    } else if (type == 'person') {
        new cmx.process()
            .turn('personInit') //分页
            .start();
        $('#cmx-tab-legal').hide();
        $('#cmx-tab-person').show();
    }
}
//公民
var personFunc = {};
personFunc.pageNum = 1;
personFunc.pageCount = 0;
personFunc.getPersonList = function () {
    new cmx.process()
        .turn('callajax', { //列表数据查询
            url: api_io + "/ioInfoPubApplyPC/queryAllWithQuery",
            data: {
                token: getData('token'),
                pageNumber: personFunc.pageNum,
                pageSize: '15',
                applyUserID: $('#ApplyUserID').val(),
                carrierForm: $('#CarrierForm').val() == '-1' ? '' : $('#CarrierForm').val(),
                getWay: $('#GetWay').val() == '-1' ? '' : $('#GetWay').val()
            },
            jsonheader: false,
            type: 'POST'
        })
        .turn('getPersonList', {}) //拿到数据后生成列表
        .start();
};
//法人
var legalFunc = {};
legalFunc.pageNum = 1;
legalFunc.pageCount = 0;
legalFunc.getLegalList = function () {
    new cmx.process()
        .turn('callajax', { //列表数据查询
            url: api_io + "/ioInfoPubApplyCR/queryAllWithQuery",
            data: {
                token: getData('token'),
                pageNumber: legalFunc.pageNum,
                pageSize: '15',
                applyUserID: $('#ApplyUserID').val(),
                carrierForm: $('#CarrierForm').val() == '-1' ? '' : $('#CarrierForm').val(),
                getWay: $('#GetWay').val() == '-1' ? '' : $('#GetWay').val()
            },
            jsonheader: false,
            type: 'POST'
        })
        .turn('getLegalList', {}) //拿到数据后生成列表
        .start();
};

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