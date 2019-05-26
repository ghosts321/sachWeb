/*
* @Author: Marte
* @Date:   2018-05-30 16:12:59
* @Last Modified by:   Marte
* @Last Modified time: 2018-07-12 14:53:00
*/
// 行政审批 弹出框 开始

//受理件数
var acceptNum = "" ;
// 承诺时限内办结件数
var dateFinshNum = "";
 // 逾期
var overdueNum = "";
// 未逾期
var noFinshNum ="";
// 报送件数
var submitNum ="";
// 总数
var total = "";

// 页码和条数
var pageNumber = 1,pageSize = 10;

// 详情模态框导出 变量
var abscissa = false;
var ordinate =  {};

function modelDetail(itemCode,submitNum,acceptNum,dateFinshNum,overdueNum,noFinshNum,total,pageSize,pageNumber,type,start,end,itemName){

  // 详情模态框导出
  if(itemCode){
     abscissa = itemCode;
  };

  if(!IsEmpty(acceptNum)){

    ordinate.name = "acceptNum";
    ordinate.value = acceptNum;

  }else if(!IsEmpty(dateFinshNum)){
    ordinate.name = "dateFinshNum";
    ordinate.value = dateFinshNum;
  }else if(!IsEmpty(overdueNum)){
    ordinate.name = "overdueNum";
    ordinate.value = overdueNum;
  }else if(!IsEmpty(noFinshNum)){
    ordinate.name = "noFinshNum";
    ordinate.value = noFinshNum;
  }else if(!IsEmpty(total)){
    ordinate.name = "total";
    ordinate.value = total;
  }else if(!IsEmpty(submitNum)){
    ordinate.name = "submitNum";
    ordinate.value = submitNum;

  };
  var ordinatey = ordinate.name;

  // 导出
  if (overall == 1) {//委托
        xzsp = function (){
           window.open(api_ea + "/subBusiness/exportProvinceStatisParticulars?itemCode=" + abscissa+"&token="+getData("token")+"&beginDate=" +start+"&endDate=" +end+ "&"+ordinatey+"=" + "1");
        }
   }else if (overall == 2){
        xzsp = function (){
           window.open(api_ea + "/business/exportFlowStatisParticulars?itemCode=" + abscissa+"&token="+getData("token")+"&beginDate=" +start+"&endDate=" +end+ "&"+ordinatey+"=" + "1");
        }
   }
  var str = "";
  str+='<button type="button" class="btn btn-primary pull-right margin-bottom-10" onclick="xzsp();">'
  str+='导出'
  str+='</button>';

  $("#educe").text("");
  $("#educe").append(str);


  $("#statistics-head").text(" ");
  $("#statistics-tbody").text(" ");
  $('#paging2').remove();
  $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');


    if(type.innerHTML == 0){

         showAlert({
             type: 'info',
             content: '暂无数据'
         });

    }else{

        // 模态框
        $('#modelDetailname').off('shown.bs.modal');
        $('#modelDetailname').on('shown.bs.modal', function () {
            // 获取分页的数据

            detailPage(itemCode,submitNum,acceptNum,dateFinshNum,overdueNum,noFinshNum,total,pageSize,pageNumber,type,start,end,itemName);


        });
        $('#modelDetailname').modal('show');
    }

};

// 获取分页的数据
function getPagings(itemCode,submitNum,acceptNum,dateFinshNum,overdueNum,noFinshNum,total,pageSize,pageNumber,type,start,end,itemName){
     var url;
     var beginDate;
     var endDate;

     if (overall == 1) {//委托
        url =  api_ea + '/subBusiness/queryProvinceStatisParticulars';
        beginDate = $("#entrustStartDate").val();
        endDate = $("#entrustEndDate").val()
     }else if (overall == 2){

        beginDate = $("#administrationStartDate").val();
        endDate = $("#administrationEndDate").val()
        url =  api_ea + '/business/queryFlowStatisParticulars';
     }

     $("#statistics-head").text(" ");
     $("#statistics-tbody").text(" ");
     var datas = [];
      new cmx.process()
        .turn('callajax', {
            url:url,
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              itemCode:itemCode,
              //受理件数
              acceptNum:acceptNum,
              // 承诺时限内办结件数
              dateFinshNum:dateFinshNum,
              // 逾期
              overdueNum:overdueNum,
              // 未逾期
              noFinshNum:noFinshNum,
              submitNum:submitNum,
              // 总数
              total:total,
              //页码
              pageNumber:pageNumber,
              //条数
              pageSize:pageSize,

              itemName:itemName,
              beginDate:beginDate,
              endDate:endDate
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null'){

                datas = prevModelData.data;

            };

      }).start();

    return datas;

}
// 铺分页
var loadToDataDelies = false;
function detailPage(itemCode,submitNum,acceptNum,dateFinshNum,overdueNum,noFinshNum,total,pageSize,pageNumber,type,start,end,itemName){

  var loadToDataDelie = getPagings(itemCode,submitNum,acceptNum,dateFinshNum,overdueNum,noFinshNum,total,pageSize,pageNumber,type,start,end,itemName);

      shopPage(loadToDataDelie,overdueNum,noFinshNum);

      $('#paging2').remove();
      $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');
      window.pagObj = $('#paging2').twbsPagination({
          totalPages: loadToDataDelie.pages,//总共页数
          visiblePages: 5,//页码几条
          first: '首页',
          prev: '前一页',
          next: '下一页',
          last: '尾页',
          onPageClick: function (event,page) {
              if(loadToDataDelies){
                var loadToDataDelie = getPagings(itemCode,submitNum,acceptNum,dateFinshNum,overdueNum,noFinshNum,total,pageSize,page,type,start,end,itemName);
                // console.log(loadToDataDelie);
                shopPage(loadToDataDelie,overdueNum,noFinshNum);

              };
              loadToDataDelies = true;
          }
      });

}

// 铺页面
function shopPage(loadToDataDelie,overdueNum,noFinshNum){

  var workDay;
  if(overdueNum == 1){
    workDay = '<th style="width: 180px">逾期天数</th>';

  }else if(noFinshNum == 1){
    workDay = '<th style="width: 180px">剩余办结时间(天)</th>';
  }

  // 逾期详情
  // 未逾期未办结

  $("#statistics-tbody").text(" ");

   if(typeof(loadToDataDelie.dataList) != "undefined" && loadToDataDelie.dataList.length >= 0){
        var data = loadToDataDelie.dataList;

    };

    $("#statistics-head").text(" ");
    var str ="";
    str+='<tr id="th-head">';
    str+='<th style="width: 95px">编号</th>';
    str+='<th style="width: 115px">省别</th>';
    str+='<th style="width: 165px">当前处理人</th>';
    str+='<th style="width: 165px">项目名称</th>';
    str+='<th style="width: 200px;">文件标题</th>';
    str+='<th style="width: 165px;">文件号</th>';
    str+='<th style="width: 250px">事项类型</th>';
    str+='<th style="width: 165px">网审号</th>';
    str+='<th style="width: 160px;">批复文号</th>';
    str+='<th style="width: 160px;">省送时间</th>';
    str+='<th style="width: 180px;">封发时间</th>';
    str+='<th style="width: 180px">状态</th>';
    str+= workDay;
    str+='</tr>';

    $("#statistics-head").append(str);
   for(var i=0;i<data.length;i++){

          var statisticstr = document.createElement("tr");
          // 编号
          var td = document.createElement("td");
          td.innerHTML = data[i].projectNum;
          statisticstr.appendChild(td);

          // 省别
          var td= document.createElement("td");
          td.innerHTML = data[i].provincesName;
          statisticstr.appendChild(td);

          // 当前处理人
           var td= document.createElement("td");
          td.innerHTML = data[i].nowadayPersonName;
          statisticstr.appendChild(td);

          // 项目名称
           var td= document.createElement("td");
          td.innerHTML = data[i].projectName;
          statisticstr.appendChild(td);


          // 文件标题
           var td= document.createElement("td");
          td.innerHTML = data[i].proFileTitle;
          statisticstr.appendChild(td);

          // 文件号
           var td= document.createElement("td");
          td.innerHTML = data[i].proFileNum;
          statisticstr.appendChild(td);

          // 事项名称
           var td= document.createElement("td");
          td.innerHTML = data[i].projectNumName;
          statisticstr.appendChild(td);

          // 网省号
           var td= document.createElement("td");
          td.innerHTML = data[i].networkNum;
          statisticstr.appendChild(td);

          // 批复文号
           var td= document.createElement("td");
          td.innerHTML = data[i].refNumber;
          statisticstr.appendChild(td);

          // 省送
           var td= document.createElement("td");
          td.innerHTML = data[i].proSendTime;
          statisticstr.appendChild(td);

          // 封发
          var td= document.createElement("td");
          td.innerHTML = data[i].packageTime;
          statisticstr.appendChild(td);
          // 状态
          var td= document.createElement("td");
          td.innerHTML = cmx.g.NationStatusStr.get(data[i].status);
          td.style.color = "#f2a654";
          statisticstr.appendChild(td);

          if(overdueNum == 1){

              var td= document.createElement("td");
              td.innerHTML = Math.abs(data[i].workDay);
              statisticstr.appendChild(td);

          }else if(noFinshNum == 1){
              var td= document.createElement("td");
              td.innerHTML = data[i].workDay;
              statisticstr.appendChild(td);
          }

          $("#statistics-tbody").append(statisticstr);
      }

}






// 临时进出境许可失效情况统计弹框
function popping(instId,type){
    // 导出

     ksx = function(){

        window.open(api_ea + "/eaStatisticsExport/exportLoseRelicByInst?instId=" + instId+"&token="+getData("token"));
    };

    var str = "";
    str+='<button type="button" class="btn btn-primary pull-right margin-bottom-10" onclick="ksx();">'
    str+='导出'
    str+='</button>';

    $("#educe").text("");
    $("#educe").append(str);


   $("#statistics-tbody").text(" ");
       if(type.innerHTML == 0){
           showAlert({
               type: 'info',
               content: '暂无数据'
           });
      }else{

        $('#modelDetailname').off('shown.bs.modal');
        $('#modelDetailname').on('shown.bs.modal', function () {
            // 获取分页的数据
            pagingBreak(instId,pageNumber,pageSize);

        });
        $('#modelDetailname').modal('show');
      }
}

// 获取分页数据
function gain(instId,pageNumber,pageSize){
  var information=[];
   $("#statistics-tbody").text(" ");
      new cmx.process()
        .turn('callajax', {
            url: api_ea + '/relicStatistics/queryLoseRelicByInst',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              instId:instId,//省份
              //页码
              pageNumber:pageNumber,
              //条数
              pageSize:pageSize,
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null'){

               information= prevModelData.data;




            };

      }).start();

      return information;

}


// 铺分页
function pagingBreak(instId,pageNumber,pageSize){

      var data = gain(instId,pageNumber,pageSize);
      shopPage1(data);
      $('#paging2').remove();
      $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');
      window.pagObj = $('#paging2').twbsPagination({
          totalPages: data.pages,//总共页数
          visiblePages: 5,//页码几条
          first: '首页',
          prev: '前一页',
          next: '下一页',
          last: '尾页',
          onPageClick: function (event, page) {
              if(data){
                data = gain(instId,page,pageSize);
                shopPage1(data);

              };
          }
      });
}

// 铺页面页面
function shopPage1(data){

   $("#statistics-tbody").text(" ");

   if(typeof(data.dataList) != "undefined" && data.dataList.length >= 0){
        var data = data.dataList;

    };

    $("#statistics-head").text(" ");
    var str ="";
    str+='<tr id="th-head">';
    str+='<th style="width: 200px">携运人</th>';
    str+='<th style="width: 165px">申请人</th>';
    str+='<th style="width: 165px">类型</th>';
    str+='<th style="width: 200px;">状态</th>';
    str+='<th style="width: 165px;">出入境目的</th>';
    str+='<th style="width: 250px">受理号</th>';
    str+='<th style="width: 165px">预约时间</th>';
    str+='<th style="width: 160px;">受理时间</th>';
    str+='<th style="width: 160px;">办结时间</th>';
    str+='<th style="width: 160px;">申请时间</th>';
    str+='</tr>';


    $("#statistics-head").append(str);

   for(var i=0;i<data.length;i++){

          var AcceptNum = data[i].acceptNum ? data[i].acceptNum : '';
          var applyId = data[i].applyId;
          var finshDate = data[i].finshDate;
          var destination = data[i].destination == null ? '' : data[i].destination;
          var acceptNum = data[i].acceptNum == null ? '' : data[i].acceptNum;
          var applyStatus = data[i].applyStatus;
          var reserveDate = data[i].reserveDate == null ? '' : data[i].reserveDate;
          var resDatePar = data[i].resDatePar == null ? '' : data[i].resDatePar;
          var node = {
              "2": "预约",
              "3": "受理",
              "4": "分办",
              "5": "登记",
              "6": "查验",
              "8": "审批",
              "9": "办结",
              "N": "不予受理",
              "O":"一次性补正",
              "B":"不予预约"
          }
          if(data[i].inOutClass==1){
              node[6]=='鉴定';
          }
          var acceptDate=data[i].acceptDate;
          if (IsEmpty(acceptDate)) {
              acceptDate = '';
          } else {
              acceptDate = format(acceptDate);
          }
          if (IsEmpty(finshDate)) {
              finshDate = '';
          } else {
              finshDate = format(finshDate);
          }

          var statisticstr = document.createElement("tr");


          // 携运人
          var td= document.createElement("td");
          td.innerHTML = data[i].carryUser;
          statisticstr.appendChild(td);

          // 申请人
          var td= document.createElement("td");
          td.innerHTML = data[i].appUserName;
          statisticstr.appendChild(td);

          // 类型
          var td= document.createElement("td");
          td.innerHTML = data[i].applyClassName;
          statisticstr.appendChild(td);


          // 状态
          var td= document.createElement("td");
          td.innerHTML = node[applyStatus];
          statisticstr.appendChild(td);

          // 出入境目的
          var td= document.createElement("td");
          td.innerHTML = data[i].CustPurposeName==undefined?"":data[i].CustPurposeName;
          statisticstr.appendChild(td);

          // 受理号
          var td= document.createElement("td");
          td.innerHTML = data[i].acceptNum;
          statisticstr.appendChild(td);

          // 预约时间
          var td= document.createElement("td");
          td.innerHTML = data[i].reserveDate;
          statisticstr.appendChild(td);

          // 受理时间
          var td= document.createElement("td");
          td.innerHTML = data[i].acceptDate;
          statisticstr.appendChild(td);

          // 办结时间
          var td= document.createElement("td");
          td.innerHTML = data[i].finshDate;
          statisticstr.appendChild(td);

          // 申请时间
          var td= document.createElement("td");
          td.innerHTML = format(data[i].applyDate);
          statisticstr.appendChild(td);

          $("#statistics-tbody").append(statisticstr);
      }
}
// 临时进出境许可失效情况统计









// 導出
function Export(num){
    var Durl;
    // 行政审批
    if(num == 1){
       Durl = api_ea + "/business/exportFlowStatis?token=" + getData("token") + "&beginDate=" + $("#administrationStartDate").val() + "&endDate=" + $("#administrationEndDate").val();
    }
    // 博物馆性质和等级分类统计情况
    else if(num == 2){
        Durl = api_dm + "/dmPublicmuseum/exportPublicMuseumStatis?token=" + getData("token");
    }
    // 进出境第一个
    else if(num ==3){
        Durl = api_ea + "/eaStatisticsExport/exportRelicStatis?token=" + getData("token")+"&beginDate="+ $("#startDate").val() +"&endDate=" + $("#endDate").val();
    }
    // 进出境第二个
    else if(num == 4){
         Durl = api_ea + "/eaStatisticsExport/exportApproveNum?token=" + getData("token")+ "&beginDate=" +$("#approvalStartDate").val() + "&endDate=" + $("#approvalEndDate").val();
    }
    // 出入境申请目的
    else if(num == 5){
        Durl = api_ea + "/eaStatisticsExport/exportRelicPurpose?token=" + getData("token") +"&beginDate=" + $("#goalStartDate").val() + "&endDate=" + $("#goalEndDate").val();
    }
    // 进出境文物质地情况统计
    else if(num == 6){
       Durl = api_ea + "/eaStatisticsExport/exportRelicQuality?token=" + getData("token") + "&beginDate=" + $("#characterStartDate").val() + "&endDate=" + $("#characterEndDate").val();
    }
    // 可失效情况统计
    else if(num == 7){
      Durl = api_ea + "/eaStatisticsExport/exportLoseRelicQualityStatis?token=" + getData("token") +"&beginDate=" + $("#loseStartDate").val() + "&endDate=" + $("#loseEndDate").val();

    }
    // 国保单位分布情况
    else if(num == 8){
      Durl = api_dm + "/dmPublicprotectunit/exportPublicprotectunitStatis?token=" + getData("token");

    }
    // 国有馆藏珍贵文物分布情况
    else if(num == 9){
      Durl = api_dm + "/dmPublicrelics/exportDmPublicrelicsStatis?token=" + getData("token");

    }
    // 项目发掘情况
    else if(num == 10){
      Durl = api_ea + "/eaStatisticsExport/exportEaAeAcpNorStatis?token=" + getData("token") + "&year=" +$("#year").val();

    }
    // 文保资质单位信息统计
    else if(num == 11){
      Durl = api_dm + "/dmQualificationsunit/exportQualiUnitStatis?token=" + getData("token");
    }
     // 不可移动
    else if(num == 12){
       Durl = api_ea + "/eaStatisticsExport/exportUnmovableStatis?token=" + getData("token") + "&beginDate=" + $("#mustnotStartDate").val() + "&endDate=" + $("#mustnotEndDate").val();
    }
    // 可移动文物行政申报情况
    else if(num == 13){
       Durl = api_ea + "/eaStatisticsExport/exportMovableStatis?token=" + getData("token") + "&beginDate=" + $("#mustmoveStartDate").val() + "&endDate=" + $("#mustmoveEndDate").val();
    }
    // 行政审批工作情况统计
    else if( num == 14){
       Durl = api_ea + "/eaStatisticsExport/exportSuperviseStatistics?token=" + getData("token");
    }
    // 国局
    else if(num == 15){
       Durl = api_ea + "/eaStatisticsExport/exportCountryProAdvisory?token=" + getData("token")+ "&beginDate=" + $("#guojuStartDate").val() + "&endDate=" + $("#guojuEndDate").val();
    }
    // 省局
    else if(num == 16){
       Durl = api_ea + "/eaStatisticsExport/exportProvinceProAdvisory?token=" + getData("token")+ "&beginDate=" + $("#shengjuStartDate").val() + "&endDate=" + $("#shengjuEndDate").val();
    }
    // 考古领队信息统计
    else if(num == 17){
        Durl = api_aa + "/user/aaArchaeologyleader/exportArchaeologyleader?token=" + getData("token");

    }
    // 后加的国家文物局委托省局行政审批督办情况
    else if(num == 18){
        Durl = api_ea + "/subBusiness/exportProvinceFlowStatis?token=" + getData("token") + "&beginDate=" + $("#entrustStartDate").val() + "&endDate=" + $("#entrustEndDate").val();
    }
    window.open(Durl);
}
// 導出
