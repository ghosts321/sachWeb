/*
* @Author: Marte
* @Date:   2018-04-18 14:14:33
* @Last Modified by:   Marte
* @Last Modified time: 2018-07-13 11:10:12
*/
// 进出境1 审核管理文物情况统
// 公共
var pageNumber = 1,pageSize = 10;
// 公共
var condition = true;
// 遮罩

$("#strike").click(function(){
    if (condition == true) {

        setTimeout("getPassIn()",500);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;

        if(p!=0){

            $('#passin-one-pie'+(p)).before('<div id="passin-one-pie0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#passin-one-pie"+(p)).remove();
            p = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;

    }
})
function getPassIn(){
    // 获取时间的数据
    $(".passInbody").text(" ");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/relicStatistics/queryRelicStatis',
            // url: api_dm + '/dmPublicprotectunit/queryPublicprotectunitStatis ',

            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#startDate").val(),
              endDate:$("#endDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {//prevModelData为返回的数据 send.go往下走 abort退出

            if (!IsNull(prevModelData) && prevModelData.state == '200' ) {
                var data = prevModelData.data;
                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly7=0,totaly8=0;
                var totalyAll=0;
                var totaly8All=0;
                var sums = [];


                for(var i=0; i<len;i++){
                    num++;
                    // 城市名称
                    var passIntr=document.createElement("tr");
                    passIntr.className="passIntr"+num;
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    $(".passInbody").append(passIntr);
                    // 文物出境
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].relicExit;
                    passIntr.appendChild(relicExittd);
                    totaly1+=parseInt(data[i].relicExit);
                    // 文物禁止出境
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].relicBanExit;
                    passIntr.appendChild(relicBanExittd);
                    totaly2+=parseInt(data[i].relicBanExit);
                    // 文物复仿制品出境
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].relicRepExit;
                    passIntr.appendChild(relicRepExittd);
                    totaly3+=parseInt(data[i].relicRepExit);
                    // 文物临时进境
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].relicTempEnter;
                    passIntr.appendChild(relicTempEntertd);
                    totaly4+=parseInt(data[i].relicTempEnter);

                    // 文物临时进境复出境
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].relicTempEnterRepExit;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly5+=parseInt(data[i].relicTempEnterRepExit);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].relicTempExit;
                    passIntr.appendChild(relicTempExittd);
                    totaly6+=parseInt(data[i].relicTempExit);
                    // 文物临时出境进境
                    var relicTempExitRepEntertd=document.createElement("td");
                    relicTempExitRepEntertd.innerHTML=data[i].relicTempExitRepEnter;
                    passIntr.appendChild(relicTempExitRepEntertd);
                    totaly7+=parseInt(data[i].relicTempExitRepEnter);
                    totaly8 = parseInt(data[i].relicExit)+parseInt(data[i].relicBanExit)+parseInt(data[i].relicRepExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);
                    //横着总计
                    var sum=document.createElement("td");
                    sum.className="sum";
                    passIntr.appendChild(sum);
                    sum.innerHTML=totaly8;
                    sums.push(totaly8);


                }

                // 计算出最大值
                var sumsobj = {};
                sumsobj.i = 0;
                var max = sums[0];
                for (var i=0; i<sums.length; i++) {
                   if( parseInt(max) < parseInt(sums[i])){
                        max = sums[i];
                        sumsobj.i=i
                   }
                };
                var dataMax = data[sumsobj.i];

                // 总的总计

                var totaly8Al=totaly1+totaly2+totaly3+totaly4+totaly5+totaly6+totaly7;

                // 竖着总计

                $(".passInfoot th").eq(1).html(totaly1);
                $(".passInfoot th").eq(2).html(totaly2);
                $(".passInfoot th").eq(3).html(totaly3);
                $(".passInfoot th").eq(4).html(totaly4);
                $(".passInfoot th").eq(5).html(totaly5);
                $(".passInfoot th").eq(6).html(totaly6);
                $(".passInfoot th").eq(7).html(totaly7);
                $(".passInfoot th").eq(8).html(totaly8Al);

                // 文物进出境地图 1
                passInoneDitu(data);
                passInmoren(dataMax);

            }

           send.go();
    }).start();
};
// 进出境1 审核管理文物情况统

// 进出境2 审核管理处审批数量情况统计
var condition = true;
$("#strike1").click(function(){
    if(condition == true){
         $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        setTimeout("approval()",10);
        condition = false;

        if(q!=0){

            $('#approval-one-bar'+(q)).before('<div id="approval-one-bar0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#approval-one-bar"+(q)).remove();
            q = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})

function approval(){
     $(".approvalbody").text(" ");
     $(".approvalfoot").text(" ");
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/relicStatistics/queryApproveNum',//线上
            // url:"/data/app/approval.json",
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#approvalStartDate").val(),
              endDate:$("#approvalEndDate").val()
            }),
            // type: 'GET'
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {

            if ( prevModelData.state == '200' &&  prevModelData.data != 'null') {
                var totalAll1=0;
                var totalAll2=0;
                var totalAll3=0;
                var totalAll4=0;
                var sum = 0;
                var sums=[];
                var content="";
                var totaly11=0,totaly12=0,totaly13=0,totaly14=0,totaly15=0,totaly16=0,totaly21=0,totaly22=0,totaly23=0,totaly24=0,totaly25=0,totaly26=0,totaly31=0,totaly32=0,totaly33=0,totaly34=0,totaly35=0,totaly36=0;
                // 后加一条
                var wei1=0,wei2=0,wei3=0,wei4=0,wei5=0,wei6=0,wei7=0,wei8=0,wei9=0;
                var data = prevModelData.data;

                // 标题上的字
                var joinString;
                var joinString1;

                if($("#startDate").val() == "" && $("#endDate").val() == ""){

                    $(".passInhead tr:eq(0) th").html("审核管理处审批数量情况统计");
                    joinString = "审核管理处文物情况统计";
                    joinString1 = "";

                }else if($("#startDate").val() == ""){
                    $(".passInhead tr:eq(0) th").html($("#endDate").val()+" 之前审核管理处审批数量情况统计");
                    joinString = $("#endDate").val()+" 之前审核管理处文物情况统计";
                    joinString1 = $("#endDate").val();
                }else if($("#endDate").val() == ""){
                    $(".passInhead tr:eq(0) th").html($("#startDate").val()+" 至今审核管理处审批数量情况统计");
                    joinString = $("#startDate").val()+" 至今审核管理处文物情况统计";
                    joinString1 = $("#startDate").val();
                }else{
                    $(".passInhead tr:eq(0) th").html($("#startDate").val() +" 至 "+$("#endDate").val()+" 审核管理处审批数量情况统计");
                    joinString = $("#startDate").val() +" 至 "+$("#endDate").val()+" 审核管理处文物情况统计";
                    joinString1 = $("#startDate").val() +" 至 "+$("#endDate").val();
                };

                var count = 0;
                for(var i=0,len=data.length;i<len;i++){
                    var tr = document.createElement("tr");
                    if(count%2!=0){
                        tr.style.backgroundColor = "#f9fbfc";
                    }
                    if(i%4==0){
                        totaly11+=data[i].relicExit;
                        totaly12+=data[i].relicTempEnter;
                        totaly13+=data[i].relicTempEnterRepExit;
                        totaly14+=data[i].relicTempExit;
                        totaly15+=data[i].relicTempExitRepEnter;
                        totaly16 = parseInt(data[i].relicExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);
                        content = '<td rowspan="4" style="vertical-align:middle;">'+data[i].provincesFullName+'</td><td>受理件数</td><td>'+data[i].relicExit+'</td>'+'<td>'+data[i].relicTempEnter+'</td>'+'<td>'+data[i].relicTempEnterRepExit+'</td>'+'<td>'+data[i].relicTempExit+'</td>'+'<td>'+data[i].relicTempExitRepEnter+'</td>'+'<td>'+totaly16+'</td>';
                        totalAll1+=parseInt(totaly16);
                        sums.push(totaly16);
                    }else if(i%4==1){
                        totaly21+=data[i].relicExit;
                        totaly22+=data[i].relicTempEnter;
                        totaly23+=data[i].relicTempEnterRepExit;
                        totaly24+=data[i].relicTempExit;
                        totaly25+=data[i].relicTempExitRepEnter;
                        totaly26 = parseInt(data[i].relicExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);
                        content = '<td>时限内办结</td><td>'+data[i].relicExit+'</td></td>'+'<td>'+data[i].relicTempEnter+'</td>'+'<td>'+data[i].relicTempEnterRepExit+'</td>'+'<td>'+data[i].relicTempExit+'</td>'+'<td>'+data[i].relicTempExitRepEnter+'</td>'+'<td>'+totaly26+'</td>';
                        totalAll2+=parseInt(totaly26);

                    }else if(i%4==2){
                        totaly31+=data[i].relicExit;
                        totaly32+=data[i].relicTempEnter;
                        totaly33+=data[i].relicTempEnterRepExit;
                        totaly34+=data[i].relicTempExit;
                        totaly35+=data[i].relicTempExitRepEnter;
                        totaly36 = parseInt(data[i].relicExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);
                        content = '<td>逾期办理件数</td><td>'+data[i].relicExit+'</td></td>'+'<td>'+data[i].relicTempEnter+'</td>'+'<td>'+data[i].relicTempEnterRepExit+'</td>'+'<td>'+data[i].relicTempExit+'</td>'+'<td>'+data[i].relicTempExitRepEnter+'</td>'+'<td>'+totaly36+'</td>';
                        totalAll3+=parseInt(totaly36);
                    }else if(i%4 == 3){

                        count++;

                        wei1+=data[i].relicExit;
                        wei2+=data[i].relicTempEnter;
                        wei3+=data[i].relicTempEnterRepExit;
                        wei4+=data[i].relicTempExit;
                        wei5+=data[i].relicTempExitRepEnter;
                        wei6 = parseInt(data[i].relicExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);

                        content = '<td>未逾期未办理件数</td><td>'+data[i].relicExit+'</td></td>'+'<td>'+data[i].relicTempEnter+'</td>'+'<td>'+data[i].relicTempEnterRepExit+'</td>'+'<td>'+data[i].relicTempExit+'</td>'+'<td>'+data[i].relicTempExitRepEnter+'</td>'+'<td>'+wei6+'</td>';
                        totalAll4+=parseInt(wei6);
                   }

                    tr.innerHTML = content;
                    $(".approvalbody").append(tr);



                }


                // 竖着总计

                // 受理件数
                trshou = document.createElement("tr");
                trshou.innerHTML = '<td colspan="2">受理件数</td><td>'+totaly11+'</td><td>'+totaly12+'</td><td>'+totaly13+'</td><td>'+totaly14+'</td><td>'+totaly15+'</td><td>'+totalAll1+'</td>';

                $(".approvalfoot").append(trshou);
                // 时限内办结
                trshou = document.createElement("tr");
                trshou.innerHTML = '<td colspan="2">时限内办结</td><td>'+totaly21+'</td><td>'+totaly22+'</td><td>'+totaly23+'</td><td>'+totaly24+'</td><td>'+totaly25+'</td><td>'+totalAll2+'</td>';

                $(".approvalfoot").append(trshou);

                // 逾期办理件数
                trshou = document.createElement("tr");
                trshou.innerHTML = '<td colspan="2">逾期办理件数</td><td>'+totaly31+'</td><td>'+totaly32+'</td><td>'+totaly33+'</td><td>'+totaly34+'</td><td>'+totaly35+'</td><td>'+totalAll3+'</td>';

                $(".approvalfoot").append(trshou);

                // 未逾期未办结件数
                trshou = document.createElement("tr");
                trshou.innerHTML = '<td colspan="2">未逾期未办结件数</td><td>'+wei1+'</td><td>'+wei2+'</td><td>'+wei3+'</td><td>'+wei4+'</td><td>'+wei5+'</td><td>'+totalAll4+'</td>';

                $(".approvalfoot").append(trshou);


                // 文物进出境地图 2
                approvalDitu(data);
                var provincedata = approvalTotal(data);
                passInMax(data,provincedata)
                // approvalmoren(maxArr);

            }

           send.go();
     }).start();
}
// 进出境2 审核管理处审批数量情况统计

// 进出境3 进出境文物质地情况统计
var condition = true;

$("#strike2").click(function(){
    if(condition == true){

        setTimeout("character()",10);
         $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function character(){
    $(".characterbody").text(" ");
    // $(".characterfoot th:gt(1)").html("0"); 待定
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/relicStatistics/queryRelicQuality',//线上
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#characterStartDate").val(),
              endDate:$("#characterEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            var data = prevModelData.data;

            if (prevModelData.state == '200'  && prevModelData.data != 'null') {
                var sums=[];
                var content="";

                var totalVertical1=0,totalVertical2=0,totalVertical3=0,totalVertical4=0,totalVertical5=0,totalVertical6=0,totalVertical7=0,totalVertical8=0,totalVertical9=0,totalVertical10=0,totalVertical11=0,totalVertical12=0,totalVertical13=0,totalVertical14=0,totalVertical15=0,totalVertical16=0,totalVertical17=0;


                var jinT=0,jinT1=0,jinT2=0,jinT3=0,jinT4=0,jinT5=0,jinT6=0,jinT7=0,jinT8=0,jinT9=0,jinT10=0,jinT11=0,jinT12=0,jinT13=0,jinT14=0,jinT15=0,jinT16=0,jinAll=0;


                var titleArr = [" ","文物出境（不含复出境）","文物临时进境","文物临时进境复出境","文物临时出境","文物临时出境复进境","文物禁止出境"];
                var fufangzhi = [];
                var wenwu=[];
                // all_total为一个数组  存放每个总计数字 数组下标对应数据中的dataCode
                var all_total=[];

                for(var i=0,len=data.length;i<len;i++){
                    var tr = document.createElement("tr");
                    // 判断是文物禁止出境 文物
                    if(data[i].dataCode == 1){

                        if(i%2==0){
                            totaly17 = parseInt(data[i].taoqi)+parseInt(data[i].ciqi)+parseInt(data[i].boli)+parseInt(data[i].tongqi)+parseInt(data[i].shiqi)+parseInt(data[i].yuqi)+parseInt(data[i].zhuanwa)+parseInt(data[i].zhumu)+parseInt(data[i].sizhi)+parseInt(data[i].qiqi)+parseInt(data[i].guyajiao)+parseInt(data[i].tieqi)+parseInt(data[i].jinqi)+parseInt(data[i].yinqi)+parseInt(data[i].pige)+parseInt(data[i].zhizhi)+parseInt(data[i].qita);

                            content = '<td rowspan="2" style="vertical-align:middle;">'+titleArr[data[i].dataCode]+'</td>'+'<td>'+data[i].dealStatus+'</td>'+'<td>'+data[i].taoqi+'</td>'+'<td>'+data[i].ciqi+'</td>'+'<td>'+data[i].boli+'</td>'+'<td>'+data[i].tongqi+'</td>'+'<td>'+data[i].shiqi+'</td>'+'<td>'+data[i].yuqi+'</td>'+'<td>'+data[i].zhuanwa+'</td>'+'<td>'+data[i].zhumu+'</td>'+'<td>'+data[i].sizhi+'</td>'+'<td>'+data[i].qiqi+'</td>'+'<td>'+data[i].guyajiao+'</td>'+'<td>'+data[i].tieqi+'</td>'+'<td>'+data[i].jinqi+'</td>'+'<td>'+data[i].yinqi+'</td>'+'<td>'+data[i].pige+'</td>'+'<td>'+data[i].zhizhi+'</td>'+'<td>'+data[i].qita+'</td>'+'<td>'+totaly17+'</td>'+'<td rowspan="2" style="vertical-align:middle;" id="total_'+data[i].dataCode+'"></td>';

                            if (typeof(all_total[data[i].dataCode]) != 'number'){
                                all_total[data[i].dataCode] = 0;
                            }
                            all_total[data[i].dataCode] += totaly17;
                            fufangzhi.push(totaly17);


                        }else if(i%2==1){

                            totaly37 = parseInt(data[i].taoqi)+parseInt(data[i].ciqi)+parseInt(data[i].boli)+parseInt(data[i].tongqi)+parseInt(data[i].shiqi)+parseInt(data[i].yuqi)+parseInt(data[i].zhuanwa)+parseInt(data[i].zhumu)+parseInt(data[i].sizhi)+parseInt(data[i].qiqi)+parseInt(data[i].guyajiao)+parseInt(data[i].tieqi)+parseInt(data[i].jinqi)+parseInt(data[i].yinqi)+parseInt(data[i].pige)+parseInt(data[i].zhizhi)+parseInt(data[i].qita);

                            content = '<td>'+data[i].dealStatus+'</td>'+'<td>'+data[i].taoqi+'</td>'+'<td>'+data[i].ciqi+'</td>'+'<td>'+data[i].boli+'</td>'+'<td>'+data[i].tongqi+'</td>'+'<td>'+data[i].shiqi+'</td>'+'<td>'+data[i].yuqi+'</td>'+'<td>'+data[i].zhuanwa+'</td>'+'<td>'+data[i].zhumu+'</td>'+'<td>'+data[i].sizhi+'</td>'+'<td>'+data[i].qiqi+'</td>'+'<td>'+data[i].guyajiao+'</td>'+'<td>'+data[i].tieqi+'</td>'+'<td>'+data[i].jinqi+'</td>'+'<td>'+data[i].yinqi+'</td>'+'<td>'+data[i].pige+'</td>'+'<td>'+data[i].zhizhi+'</td>'+'<td>'+data[i].qita+'</td>'+'<td>'+totaly37+'</td>';

                           if (typeof(all_total[data[i].dataCode]) != 'number'){
                                all_total[data[i].dataCode] = 0;
                            }

                            all_total[data[i].dataCode] += totaly37;
                            wenwu.push(totaly37);



                        };

                    }

                    else {
                         // 横着总计
                        jinAll=parseInt(data[i].taoqi)+parseInt(data[i].ciqi)+parseInt(data[i].boli)+parseInt(data[i].tongqi)+parseInt(data[i].shiqi)+parseInt(data[i].yuqi)+parseInt(data[i].zhuanwa)+parseInt(data[i].zhumu)+parseInt(data[i].sizhi)+parseInt(data[i].qiqi)+parseInt(data[i].guyajiao)+parseInt(data[i].tieqi)+parseInt(data[i].jinqi)+parseInt(data[i].yinqi)+parseInt(data[i].pige)+parseInt(data[i].zhizhi)+parseInt(data[i].qita);

                        content = '<td style="vertical-align:middle;" colspan="2">'+titleArr[data[i].dataCode]+'</td>'+'<td>'+data[i].taoqi+'</td>'+'<td>'+data[i].ciqi+'</td>'+'<td>'+data[i].boli+'</td>'+'<td>'+data[i].tongqi+'</td>'+'<td>'+data[i].shiqi+'</td>'+'<td>'+data[i].yuqi+'</td>'+'<td>'+data[i].zhuanwa+'</td>'+'<td>'+data[i].zhumu+'</td>'+'<td>'+data[i].sizhi+'</td>'+'<td>'+data[i].qiqi+'</td>'+'<td>'+data[i].guyajiao+'</td>'+'<td>'+data[i].tieqi+'</td>'+'<td>'+data[i].jinqi+'</td>'+'<td>'+data[i].yinqi+'</td>'+'<td>'+data[i].pige+'</td>'+'<td>'+data[i].zhizhi+'</td>'+'<td>'+data[i].qita+'</td>'+'<td>'+jinAll+'</td>'+"<td>"+jinAll+"</td>";

                            if (typeof(all_total[data[i].dataCode]) != 'number'){
                                all_total[data[i].dataCode] = 0;
                            }
                            all_total[data[i].dataCode] += jinAll;

                    }

                    tr.innerHTML = content;
                    $(".characterbody").append(tr);

                    // 将计算出的数据添加到html中

                    if (data[i].dataCode == 1){
                        var totalId = document.getElementById('total_'+ data[i].dataCode);
                         totalId.innerHTML = all_total[data[i].dataCode];
                    }
                    var tr1 = document.createElement("tr");
                    totalVertical1 += parseInt(data[i].taoqi);
                    totalVertical2 += parseInt(data[i].ciqi);
                    totalVertical3 += parseInt(data[i].boli);
                    totalVertical4 += parseInt(data[i].tongqi);
                    totalVertical5 += parseInt(data[i].shiqi);
                    totalVertical6 += parseInt(data[i].yuqi);
                    totalVertical7 += parseInt(data[i].zhuanwa);
                    totalVertical8 += parseInt(data[i].zhumu);
                    totalVertical9 += parseInt(data[i].sizhi);
                    totalVertical10 += parseInt(data[i].qiqi);
                    totalVertical11 += parseInt(data[i].guyajiao);
                    totalVertical12 += parseInt(data[i].tieqi);
                    totalVertical13 += parseInt(data[i].jinqi);
                    totalVertical14 += parseInt(data[i].yinqi);
                    totalVertical15 += parseInt(data[i].pige);
                    totalVertical16 += parseInt(data[i].zhizhi);
                    totalVertical17 += parseInt(data[i].qita);

                }
                var quanbu = totalVertical1+totalVertical2+totalVertical3+totalVertical4+totalVertical5+totalVertical6+totalVertical7+totalVertical8+totalVertical9+totalVertical10+totalVertical11+totalVertical12+totalVertical13+totalVertical14+totalVertical15+totalVertical16+totalVertical17;

                tr1.innerHTML = '<td colspan="2">合计</td><td>'+totalVertical1+'</td><td>'+totalVertical2+'</td><td>'+totalVertical3+'</td><td>'+totalVertical4+'</td><td>'+totalVertical5+'</td><td>'+totalVertical6+'</td><td>'+totalVertical7+'</td><td>'+totalVertical8+'</td><td>'+totalVertical9+'</td><td>'+totalVertical10+'</td><td>'+totalVertical11+'</td><td>'+totalVertical12+'</td><td>'+totalVertical13+'</td><td>'+totalVertical14+'</td><td>'+totalVertical15+'</td><td>'+totalVertical16+'</td><td>'+totalVertical17+'</td><td>'+" "+"</td><td>"+quanbu+"</td>";
                    $(".characterbody").append(tr1);

                wenwu.push(jinAll);//把只有一个文物那个项加上
                // 文物进出境2个饼图 3
                // characterPie(fufangzhi);
                // characterPie1(wenwu);


            }

           send.go();
     }).start();
}
// 进出境3 进出境文物质地情况统计


// 进出境4 临时进出境许可失效文物材质情况统计
var condition = true;

$("#strike3").click(function(){
    if(condition == true){

        setTimeout("lose()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;

        if(r!=0){

            $('#lose-one-pie'+(r)).before('<div id="lose-one-pie0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#lose-one-pie"+(r)).remove();
            r = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function lose(){
    $(".losebody").text(" ");
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/relicStatistics/queryLoseRelicQualityStatis',//线上
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#loseStartDate").val(),
              endDate:$("#loseEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
             if ( prevModelData.state == '200' && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly8=0,totaly9=0,totaly10=0,totaly11=0,totaly12=0,totaly13=0,totaly14=0,totaly15=0,totaly16=0,totaly17=0,totaly18=0;
                var totalyAll=0;
                var totaly8All=0;
                var sums = [];
                for(var i=0; i<len;i++){
                    num++;
                    // 城市名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    $(".losebody").append(passIntr);
                    // 文物出境
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].taoqi;
                    passIntr.appendChild(relicExittd);
                    totaly1+=parseInt(data[i].taoqi);
                    // 文物禁止出境
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].ciqi;
                    passIntr.appendChild(relicBanExittd);
                    totaly2+=parseInt(data[i].ciqi);
                    // 文物复仿制品出境
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].boli;
                    passIntr.appendChild(relicRepExittd);
                    totaly3+=parseInt(data[i].boli);
                    // 文物临时进境
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].tongqi;
                    passIntr.appendChild(relicTempEntertd);
                    totaly4+=parseInt(data[i].tongqi);

                    // 文物临时进境复出境
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].shiqi;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly5+=parseInt(data[i].shiqi);
                    // 文物临时进境复出境
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].yuqi;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly6+=parseInt(data[i].yuqi);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].zhuanwa;
                    passIntr.appendChild(relicTempExittd);
                    totaly7+=parseInt(data[i].zhuanwa);
                            // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].zhumu;
                    passIntr.appendChild(relicTempExittd);
                    totaly8+=parseInt(data[i].zhumu);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].sizhi;
                    passIntr.appendChild(relicTempExittd);
                    totaly9+=parseInt(data[i].sizhi);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].qiqi;
                    passIntr.appendChild(relicTempExittd);
                    totaly10+=parseInt(data[i].qiqi);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].guyajiao;
                    passIntr.appendChild(relicTempExittd);
                    totaly11+=parseInt(data[i].guyajiao);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].tieqi;
                    passIntr.appendChild(relicTempExittd);
                    totaly12+=parseInt(data[i].tieqi);
                   // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].jinqi;
                    passIntr.appendChild(relicTempExittd);
                    totaly13+=parseInt(data[i].jinqi);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].yinqi;
                    passIntr.appendChild(relicTempExittd);
                    totaly14+=parseInt(data[i].yinqi);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].pige;
                    passIntr.appendChild(relicTempExittd);
                    totaly15+=parseInt(data[i].pige);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].zhizhi;
                    passIntr.appendChild(relicTempExittd);
                    totaly16+=parseInt(data[i].zhizhi);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].qita;
                    passIntr.appendChild(relicTempExittd);
                    totaly17+=parseInt(data[i].qita);
                    // 文物临时出境进境
                    totaly18 = parseInt(data[i].taoqi)+parseInt(data[i].ciqi)+parseInt(data[i].boli)+parseInt(data[i].tongqi)+parseInt(data[i].shiqi)+parseInt(data[i].yuqi)+parseInt(data[i].zhuanwa)+parseInt(data[i].zhumu)+parseInt(data[i].sizhi)+parseInt(data[i].qiqi)+parseInt(data[i].guyajiao)+parseInt(data[i].tieqi)+parseInt(data[i].jinqi)+parseInt(data[i].yinqi)+parseInt(data[i].pige)+parseInt(data[i].zhizhi)+parseInt(data[i].qita);
                    //横着总计
                    var sum=document.createElement("td");
                    passIntr.appendChild(sum);
                    sum.innerHTML=totaly18;
                    sum.style.color = '#62a8ea',
                    sum.style.textDecoration = 'underline';
                    sum.style.cursor = 'pointer';
                    sums.push(totaly18);

                    var instId = data[i].instId;
                    var sumsClick ="popping('"+instId+"',this)";
                    sum.setAttribute("onclick",sumsClick);

                }

                // 计算出最大值
                var sumsobj = {};
                sumsobj.i = 0;
                var max = sums[0];
                for (var i=0; i<sums.length; i++) {
                   if( parseInt(max) < parseInt(sums[i])){
                        max = sums[i];
                        sumsobj.i=i
                   }
                };
                var dataMax = data[sumsobj.i];
                // console.log(dataMax);

                // 总的总计

                var totalyAll=totaly1+totaly2+totaly3+totaly4+totaly5+totaly6+totaly7+totaly8+totaly9+totaly10+totaly11+totaly12+totaly13+totaly14+totaly15+totaly16+totaly17;

                // 竖着总计

                $(".losefoot th").eq(1).html(totaly1);
                $(".losefoot th").eq(2).html(totaly2);
                $(".losefoot th").eq(3).html(totaly3);
                $(".losefoot th").eq(4).html(totaly4);
                $(".losefoot th").eq(5).html(totaly5);
                $(".losefoot th").eq(6).html(totaly6);
                $(".losefoot th").eq(7).html(totaly7);
                $(".losefoot th").eq(8).html(totaly8);
                $(".losefoot th").eq(9).html(totaly9);
                $(".losefoot th").eq(10).html(totaly10);
                $(".losefoot th").eq(11).html(totaly11);
                $(".losefoot th").eq(12).html(totaly12);
                $(".losefoot th").eq(13).html(totaly13);
                $(".losefoot th").eq(14).html(totaly14);
                $(".losefoot th").eq(15).html(totaly15);
                $(".losefoot th").eq(16).html(totaly16);
                $(".losefoot th").eq(17).html(totaly17);

                $(".losefoot th").eq(18).html(totalyAll);
                $(".losefoot th").eq(18).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline',
                    "cursor":"pointer"
                });
                $(".losefoot th").eq(18).click(function(){
                    popping('',this);
                });

                // 文物进出境地图 1
                loseDitu(data);
                losemoren(dataMax);


            }else{
                $(".losefoot th:gt(0)").html(" ");
            }

           send.go();
     }).start();
}

// 进出境4 临时进出境许可失效文物材质情况统计

// 进出境第五个图表 出入境申请目的
var condition = true;

$("#strike4").click(function(){
    if(condition == true){

        setTimeout("goal()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;

         if(s!=0){

            $('#goal-one-radar'+(s)).before('<div id="goal-one-radar0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#goal-one-radar"+(s)).remove();
            s = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function goal(){
     $(".goalbody").text(" ");
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/relicStatistics/queryRelicPurpose',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#goalStartDate").val(),
              endDate:$("#goalEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
             if ( prevModelData.state == '200'  && prevModelData.data != 'null') {
                var data = prevModelData.data;

                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly8=0,totaly9=0,totaly10=0,totaly11=0,totaly12=0;
                var totalyAll=0;
                var totaly8All=0;
                var sums = [];
                for(var i=0; i<len;i++){
                    num++;
                // 城市名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    // passIntd.style.width = "25rem";
                    $(".goalbody").append(passIntr);
                // 文物出境
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].exitPerson;
                    passIntr.appendChild(relicExittd);
                    totaly1+=parseInt(data[i].exitPerson);
                // 文物禁止出境
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].tempExitExhi;
                    passIntr.appendChild(relicBanExittd);
                    totaly2+=parseInt(data[i].tempExitExhi);
                // 文物复仿制品出境
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].tempEnterExhi;
                    passIntr.appendChild(relicRepExittd);
                    totaly3+=parseInt(data[i].tempEnterExhi);
                // 文物临时进境
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].sc;
                    passIntr.appendChild(relicTempEntertd);
                    totaly4+=parseInt(data[i].sc);

                // 文物临时进境复出境
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].jy;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly5+=parseInt(data[i].jy);
                // 文物临时进境复出境
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].xs;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly6+=parseInt(data[i].xs);
                // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].xf;
                    passIntr.appendChild(relicTempExittd);
                    totaly7+=parseInt(data[i].xf);
                  // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].ky;
                    passIntr.appendChild(relicTempExittd);
                    totaly8+=parseInt(data[i].ky);

                     // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].zl;
                    passIntr.appendChild(relicTempExittd);
                    totaly9+=parseInt(data[i].zl);
                    // 文物临时出境
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].qt;
                    passIntr.appendChild(relicTempExittd);
                    totaly10+=parseInt(data[i].qt);
                // 文物临时出境进境
                    totaly11 = parseInt(data[i].exitPerson)+parseInt(data[i].tempExitExhi)+parseInt(data[i].tempEnterExhi)+parseInt(data[i].sc)+parseInt(data[i].jy)+parseInt(data[i].xs)+parseInt(data[i].xf)+parseInt(data[i].ky)+parseInt(data[i].zl)+parseInt(data[i].qt);
                //横着总计
                    var sum=document.createElement("td");
                    passIntr.appendChild(sum);
                    sum.innerHTML=totaly11;
                    sums.push(totaly11);

                }

                // 计算出最大值
                var sumsobj = {};
                sumsobj.i = 0;
                var max = sums[0];
                for (var i=0; i<sums.length; i++) {
                   if( parseInt(max) < parseInt(sums[i])){
                        max = sums[i];
                        sumsobj.i=i
                   }
                };
                var dataMax = data[sumsobj.i];

                // 总的总计

                var totalyAll=totaly1+totaly2+totaly3+totaly4+totaly5+totaly6+totaly7+totaly8+totaly9+totaly10;

                // 竖着总计

                $(".goalfoot th").eq(1).html(totaly1);
                $(".goalfoot th").eq(2).html(totaly2);
                $(".goalfoot th").eq(3).html(totaly3);
                $(".goalfoot th").eq(4).html(totaly4);
                $(".goalfoot th").eq(5).html(totaly5);
                $(".goalfoot th").eq(6).html(totaly6);
                $(".goalfoot th").eq(7).html(totaly7);
                $(".goalfoot th").eq(8).html(totaly8);
                $(".goalfoot th").eq(9).html(totaly9);
                $(".goalfoot th").eq(10).html(totaly10);
                $(".goalfoot th").eq(11).html(totalyAll);

                // // 标题文字
                // $(".aimTextspan").html(totaly1) ;
                // $(".aimTextspan1").html(totaly2) ;
//
                // 文物进出境地图 1
                goalDitu(data);
                goalmoren(dataMax);


            }else{
                $(".goalfoot th:gt(0)").html(" ");
            }

           send.go();
     }).start();
}
// 进出境第五个图表 出入境申请目的

// 文物本体 国保单位分布情况
var condition = true;
$("#strike5").click(function(){
     if (condition == true) {

        setTimeout("national()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
         if(u!=0){

            $('#national-one-pie'+(u)).before('<div id="national-one-pie0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#national-one-pie"+(u)).remove();
            u = 0;
        }
     }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
     }
})
function national(){
    $(".nationalbody").text(" ");
    new cmx.process()
    .turn('callajax', {
        url: api_dm + '/dmPublicprotectunit/queryPublicprotectunitStatis',
        async: false,
        header: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        data: JSON.stringify({
          token: getData('token'),
        }),
        type: 'POST'
    })
    .turn(function (prevModelData, send, abort) {//prevModelData为返回的数据 send.go往下走 abort退出

        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;
            var len=data.length;
            var num=0
            var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly7=0;
            var totalyAll=0;
            var totaly8All=0;
            var sums = [];
            for(var i=0; i<len;i++){
                num++;
            // 城市名称
                var passIntr=document.createElement("tr");
                passIntr.className="passIntr"+num;
                var passIntd=document.createElement("td");
                passIntr.appendChild(passIntd);
                passIntd.innerHTML=data[i].provincesFullName;
                // passIntd.style.width = "12%";
                $(".nationalbody").append(passIntr);
            // 古遗址
                var gyztd=document.createElement("td");
                gyztd.innerHTML=data[i].gyz;
                passIntr.appendChild(gyztd);
                totaly1+=parseInt(data[i].gyz);
            // 古墓葬
                var gmztd=document.createElement("td");
                gmztd.innerHTML=data[i].gmz;
                passIntr.appendChild(gmztd);
                totaly2+=parseInt(data[i].gmz);
            // 石窟寺及石刻
                var gjztd=document.createElement("td");
                gjztd.innerHTML=data[i].gjz;
                passIntr.appendChild(gjztd);
                totaly3+=parseInt(data[i].gjz);
            // 文物临时进境
                var skstd=document.createElement("td");
                skstd.innerHTML=data[i].sks;
                passIntr.appendChild(skstd);
                totaly4+=parseInt(data[i].sks);

            // 近现代重要史迹及代表性建筑
                var jxdtd=document.createElement("td");
                jxdtd.innerHTML=data[i].jxd;
                passIntr.appendChild(jxdtd);
                totaly5+=parseInt(data[i].jxd);
            // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].other;
                passIntr.appendChild(othertd);
                totaly6+=parseInt(data[i].other);
            // 总计
                var total=document.createElement("td");
                total.innerHTML=data[i].total;
                passIntr.appendChild(total);
                totaly7+=parseInt(data[i].total);
                sums.push(data[i].total);

            }

            // 总的总计


            // 竖着总计
            $(".nationalfoot th").eq(1).html(totaly1);
            $(".nationalfoot th").eq(2).html(totaly2);
            $(".nationalfoot th").eq(3).html(totaly3);
            $(".nationalfoot th").eq(4).html(totaly4);
            $(".nationalfoot th").eq(5).html(totaly5);
            $(".nationalfoot th").eq(6).html(totaly6);
            $(".nationalfoot th").eq(7).html(totaly7);//所有加一起

            // 国保单位
            datasMax(sums,data,nationalmoren);
            nationalDitu(data);

        }
           send.go();
    }).start();
};

//文体文物 国有馆藏珍贵文物分布情况
var condition = true;
$("#strike6").click(function(){
    if (condition == true) {

        setTimeout("state()",10);
         $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
        if(v!=0){

            $('#state-one-pie'+(v)).before('<div id="state-one-pie0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#state-one-pie"+(v)).remove();
            v = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function state(){
    $(".statebody1").text(" ");
    $(".statebody").text(" ");
    new cmx.process()
    .turn('callajax', {
        url: api_dm + '/dmPublicrelics/queryDmPublicrelicsStatis',
        async: false,
        header: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        data: JSON.stringify({
          token: getData('token'),
        }),
        type: 'POST'
    })
    .turn(function (prevModelData, send, abort) {//prevModelData为返回的数据 send.go往下走 abort退出

        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {

            var data = prevModelData.data;
            var len=data.length;
            var num=0
            var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly8=0,totaly9=0,totaly10=0,totaly11=0,totaly12=0,totaly13=0,totaly14=0,totaly15=0,totaly16=0,totaly17=0,totaly18=0,totaly19=0,totaly20=0,totaly21=0,totaly22=0,totaly23=0,totaly24=0,totaly25=0,totaly26=0,totaly27=0,totaly28=0,totaly29=0,totaly30=0,totaly31=0,totaly32=0,totaly33=0,totaly34=0,totaly35=0,totaly36=0;
            var totalyAll=0;
            var totaly8All=0;
            var sums = [];

             // 第二个tabel
                var passIntr0=document.createElement("tr");
                $(".statebody1").append(passIntr0);
                var passIntd0=document.createElement("td");
                passIntr0.appendChild(passIntd0);


                var statehead = $(".statehead").height();
                console.log(statehead);
                passIntd0.innerHTML=" ";
                passIntr0.setAttribute("style","height:"+166+"px");

            for(var i=0; i<len;i++){
                num++;
            // 城市名称
                var passIntr=document.createElement("tr");
                $(".statebody").append(passIntr);
            // 第二个tabel
                var passIntr1=document.createElement("tr");
                $(".statebody1").append(passIntr1);
                var passIntd=document.createElement("td");
                passIntr1.appendChild(passIntd);
                passIntd.innerHTML=data[i].provincesFullName;
            // 古遗址
                var gyztd=document.createElement("td");
                gyztd.innerHTML=data[i].yushiqi;
                passIntr.appendChild(gyztd);
                totaly1+=parseInt(data[i].yushiqi);
            // 古墓葬
                var gmztd=document.createElement("td");
                gmztd.innerHTML=data[i].taoqi;
                passIntr.appendChild(gmztd);
                totaly2+=parseInt(data[i].taoqi);
            // 石窟寺及石刻
                var gjztd=document.createElement("td");
                gjztd.innerHTML=data[i].ciqi;
                passIntr.appendChild(gjztd);
                totaly3+=parseInt(data[i].ciqi);
            // 文物临时进境
                var skstd=document.createElement("td");
                skstd.innerHTML=data[i].tongqi;
                passIntr.appendChild(skstd);
                totaly4+=parseInt(data[i].tongqi);
            //金银器
                var skstd=document.createElement("td");
                skstd.innerHTML=data[i].jinyinqi;
                passIntr.appendChild(skstd);
                totaly5+=parseInt(data[i].jinyinqi);

                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].tieqi;
                passIntr.appendChild(othertd);
                totaly6+=parseInt(data[i].tieqi);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].qiqi;
                passIntr.appendChild(othertd);
                totaly7+=parseInt(data[i].qiqi);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].diaosu;
                passIntr.appendChild(othertd);
                totaly8+=parseInt(data[i].diaosu);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].shiqi;
                passIntr.appendChild(othertd);
                totaly9+=parseInt(data[i].shiqi);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].shufa;
                passIntr.appendChild(othertd);
                totaly10+=parseInt(data[i].shufa);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].wenju;
                passIntr.appendChild(othertd);
                totaly11+=parseInt(data[i].wenju);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].jiagu;
                passIntr.appendChild(othertd);
                totaly12+=parseInt(data[i].jiagu);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].xiyinfupai;
                passIntr.appendChild(othertd);
                totaly13+=parseInt(data[i].xiyinfupai);
                      // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].qianbi;
                passIntr.appendChild(othertd);
                totaly14+=parseInt(data[i].qianbi);
                      // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].yagujiaoqi;
                passIntr.appendChild(othertd);
                totaly15+=parseInt(data[i].yagujiaoqi);
                      // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].zhumudiao;
                passIntr.appendChild(othertd);
                totaly16+=parseInt(data[i].zhumudiao);
                      // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].jiaju;
                passIntr.appendChild(othertd);
                totaly17+=parseInt(data[i].jiaju);
                      // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].falangqi;
                passIntr.appendChild(othertd);
                totaly18+=parseInt(data[i].falangqi);
                    // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].zhixiu;
                passIntr.appendChild(othertd);
                totaly19+=parseInt(data[i].zhixiu);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].gujitushu;
                passIntr.appendChild(othertd);
                totaly20+=parseInt(data[i].gujitushu);
                    // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].beitie;
                passIntr.appendChild(othertd);
                totaly21+=parseInt(data[i].beitie);
                    // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].wuqi;
                passIntr.appendChild(othertd);
                totaly22+=parseInt(data[i].wuqi);
                       // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].youpin;
                passIntr.appendChild(othertd);
                totaly23+=parseInt(data[i].youpin);
                    // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].wenjian;
                passIntr.appendChild(othertd);
                totaly24+=parseInt(data[i].wenjian);
                    // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].dangan;
                passIntr.appendChild(othertd);
                totaly25+=parseInt(data[i].dangan);
                    // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].mingrenyiwu;
                passIntr.appendChild(othertd);
                totaly26+=parseInt(data[i].mingrenyiwu);
                // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].boliqi;
                passIntr.appendChild(othertd);
                totaly27+=parseInt(data[i].boliqi);
                  // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].yuefaqi;
                passIntr.appendChild(othertd);
                totaly28+=parseInt(data[i].yuefaqi);
                  // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].pige;
                passIntr.appendChild(othertd);
                totaly29+=parseInt(data[i].pige);
                  // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].yinxiang;
                passIntr.appendChild(othertd);
                totaly30+=parseInt(data[i].yinxiang);
                  // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].piaoju;
                passIntr.appendChild(othertd);
                totaly31+=parseInt(data[i].piaoju);
                       // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].jiaotong;
                passIntr.appendChild(othertd);
                totaly32+=parseInt(data[i].jiaotong);
                       // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].duliang;
                passIntr.appendChild(othertd);
                totaly33+=parseInt(data[i].duliang);
                       // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].biaoben;
                passIntr.appendChild(othertd);
                totaly34+=parseInt(data[i].biaoben);
                       // 其他
                var othertd=document.createElement("td");
                othertd.innerHTML=data[i].qita;
                passIntr.appendChild(othertd);
                totaly35+=parseInt(data[i].qita);
            // 横着总计
                var total=document.createElement("td");
                total.innerHTML=data[i].total;
                passIntr.appendChild(total);
                totaly36+=parseInt(data[i].total);
                sums.push(data[i].total);

            }
            var passIntr2=document.createElement("tr");
            $(".statebody1").append(passIntr2);
            var passIntd=document.createElement("td");
            passIntr2.appendChild(passIntd);
            passIntd.innerHTML="总计";

            // 竖着总计
            $(".statefoot th").eq(0).html(totaly1);
            $(".statefoot th").eq(1).html(totaly2);
            $(".statefoot th").eq(2).html(totaly3);
            $(".statefoot th").eq(3).html(totaly4);
            $(".statefoot th").eq(4).html(totaly5);
            $(".statefoot th").eq(5).html(totaly6);
            $(".statefoot th").eq(6).html(totaly7);
            $(".statefoot th").eq(7).html(totaly8);
            $(".statefoot th").eq(8).html(totaly9);
            $(".statefoot th").eq(9).html(totaly10);
            $(".statefoot th").eq(10).html(totaly11);
            $(".statefoot th").eq(11).html(totaly12);
            $(".statefoot th").eq(12).html(totaly13);
            $(".statefoot th").eq(13).html(totaly14);
            $(".statefoot th").eq(14).html(totaly15);
            $(".statefoot th").eq(15).html(totaly16);
            $(".statefoot th").eq(16).html(totaly17);
            $(".statefoot th").eq(17).html(totaly18);
            $(".statefoot th").eq(18).html(totaly19);
            $(".statefoot th").eq(19).html(totaly20);
            $(".statefoot th").eq(20).html(totaly21);
            $(".statefoot th").eq(21).html(totaly22);
            $(".statefoot th").eq(22).html(totaly23);
            $(".statefoot th").eq(23).html(totaly24);
            $(".statefoot th").eq(24).html(totaly25);
            $(".statefoot th").eq(25).html(totaly26);
            $(".statefoot th").eq(26).html(totaly27);
            $(".statefoot th").eq(27).html(totaly28);
            $(".statefoot th").eq(28).html(totaly29);
            $(".statefoot th").eq(29).html(totaly30);
            $(".statefoot th").eq(30).html(totaly31);
            $(".statefoot th").eq(31).html(totaly32);
            $(".statefoot th").eq(32).html(totaly33);
            $(".statefoot th").eq(33).html(totaly34);
            $(".statefoot th").eq(34).html(totaly35);
            $(".statefoot th").eq(35).html(totaly36);

            // 文物进出境地图 1
            datasMax(sums,data,statemoren);
            stateDitu(data);

        }

           send.go();
    }).start();
}
// 文物本体-国家博物馆性质和等级分类
var condition = true;
$("#strike7").click(function(){
     if (condition == true) {

        setTimeout("museum()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
        if(w!=0){

            $('#museum-one-radar'+(w)).before('<div id="museum-one-radar0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#museum-one-radar"+(w)).remove();
            w = 0;
        }
     }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
     }
})
function museum(){
    $(".museumbody").text(" ");
    new cmx.process()
        .turn('callajax', {
            // 测试服务器
            url: api_dm + '/dmPublicmuseum/queryPublicMuseumStatis',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {//prevModelData为返回的数据 send.go往下走 abort退出

            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {

                var data = prevModelData.data;

                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly8=0,totaly9=0;
                var sums = [];
                for(var i=0; i<len;i++){
                    num++;
                // 城市名称
                    var passIntr=document.createElement("tr");
                    passIntr.className="passIntr"+num;
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    $(".museumbody").append(passIntr);
                // 古遗址
                    var gyztd=document.createElement("td");
                    gyztd.innerHTML=data[i].wenwu;
                    passIntr.appendChild(gyztd);
                    totaly1+=parseInt(data[i].wenwu);
                // 古墓葬
                    var gmztd=document.createElement("td");
                    gmztd.innerHTML=data[i].hangye;
                    passIntr.appendChild(gmztd);
                    totaly2+=parseInt(data[i].hangye);
                // 石窟寺及石刻
                    var gjztd=document.createElement("td");
                    gjztd.innerHTML=data[i].feiguoyou;
                    passIntr.appendChild(gjztd);
                    totaly3+=parseInt(data[i].feiguoyou);
                // 文物临时进境
                    var skstd=document.createElement("td");
                    skstd.innerHTML=data[i].qita;
                    passIntr.appendChild(skstd);
                    totaly4+=parseInt(data[i].qita);

                // 近现代重要史迹及代表性建筑
                    var jxdtd=document.createElement("td");
                    jxdtd.innerHTML=data[i].oneLevel;
                    passIntr.appendChild(jxdtd);
                    totaly5+=parseInt(data[i].oneLevel);
                // 其他
                    var othertd=document.createElement("td");
                    othertd.innerHTML=data[i].twoLevel;
                    passIntr.appendChild(othertd);
                    totaly6+=parseInt(data[i].twoLevel);
                // 其他
                    var othertd=document.createElement("td");
                    othertd.innerHTML=data[i].threeLevel;
                    passIntr.appendChild(othertd);
                    totaly7+=parseInt(data[i].threeLevel);
                   //其他
                    var othertd=document.createElement("td");
                    othertd.innerHTML=data[i].fourLevel;
                    passIntr.appendChild(othertd);
                    totaly8+=parseInt(data[i].fourLevel);
                // 总计
                    var total=document.createElement("td");
                    total.innerHTML=data[i].total;
                    passIntr.appendChild(total);
                    totaly9+=parseInt(data[i].total);
                    sums.push(data[i].total);

                }

                // 总的总计


                // 竖着总计
                $(".museumfoot th").eq(1).html(totaly1);
                $(".museumfoot th").eq(2).html(totaly2);
                $(".museumfoot th").eq(3).html(totaly3);
                $(".museumfoot th").eq(4).html(totaly4);
                $(".museumfoot th").eq(5).html(totaly5);
                $(".museumfoot th").eq(6).html(totaly6);
                $(".museumfoot th").eq(7).html(totaly7);
                $(".museumfoot th").eq(8).html(totaly8);
                $(".museumfoot th").eq(9).html(totaly9);

                // 国家博物馆性质和等级分类
                datasMax(sums,data,museummoren);
                museumDitu(data);

            }
               send.go();
        }).start();
}

// 文保资质单位统计信息
var condition = true;
$("#strike8").click(function(){
    if(condition == true){

        setTimeout("aptitude()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
        if(t!=0){

            $('#aptitude-one-radar'+(t)).before('<div id="aptitude-one-radar0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#aptitude-one-radar"+(t)).remove();
            t = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function aptitude(){
    $(".aptitudebody").text(" ");
     new cmx.process()
        .turn('callajax', {
            url: api_dm + '/dmQualificationsunit/queryQualiUnitStatis',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {//prevModelData为返回的数据 send.go往下走 abort退出

            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {

                var data = prevModelData.data;
                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0;
                var sums = [];
                for(var i=0; i<len;i++){
                    num++;
                // 城市名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    $(".aptitudebody").append(passIntr);
                // 古遗址
                    var gyztd=document.createElement("td");
                    gyztd.innerHTML=data[i].unitQualiDesignCount;
                    passIntr.appendChild(gyztd);
                    totaly1+=parseInt(data[i].unitQualiDesignCount);
                // 古墓葬
                    var gmztd=document.createElement("td");
                    gmztd.innerHTML=data[i].unitQualiBuildCount;
                    passIntr.appendChild(gmztd);
                    totaly2+=parseInt(data[i].unitQualiBuildCount);
                // 石窟寺及石刻
                    var gjztd=document.createElement("td");
                    gjztd.innerHTML=data[i].unitQualiWatchCount;
                    passIntr.appendChild(gjztd);
                    totaly3+=parseInt(data[i].unitQualiWatchCount);
                // 文物临时进境
                    var skstd=document.createElement("td");
                    skstd.innerHTML=data[i].qualiCount;
                    passIntr.appendChild(skstd);
                    totaly4+=parseInt(data[i].qualiCount);

                // 近现代重要史迹及代表性建筑
                    var jxdtd=document.createElement("td");
                    jxdtd.innerHTML=data[i].qualiUnitCount;
                    passIntr.appendChild(jxdtd);
                    totaly5+=parseInt(data[i].qualiUnitCount);

                // 总计
                    totall = parseInt(data[i].unitQualiDesignCount)+parseInt(data[i].unitQualiBuildCount)+parseInt(data[i].unitQualiWatchCount)+parseInt(data[i].qualiCount)+parseInt(data[i].qualiUnitCount);
                //横着总计
                    var sum=document.createElement("td");
                    passIntr.appendChild(sum);
                    sum.innerHTML=totall;
                    sums.push(totall);

                }
                // 总得总计
                totaly6 = parseInt(totaly1)+parseInt(totaly2)+parseInt(totaly3)+parseInt(totaly4)+parseInt(totaly5);
                // 计算出最大值
                var sumsobj = {};
                sumsobj.i = 0;
                var max = sums[0];
                for (var i=0; i<sums.length; i++) {
                   if( parseInt(max) < parseInt(sums[i])){
                        max = sums[i];
                        sumsobj.i=i
                   }
                };
                var dataMax = data[sumsobj.i];


                // 竖着总计
                $(".aptitudefoot th").eq(1).html(totaly1);
                $(".aptitudefoot th").eq(2).html(totaly2);
                $(".aptitudefoot th").eq(3).html(totaly3);
                $(".aptitudefoot th").eq(4).html(totaly4);
                $(".aptitudefoot th").eq(5).html(totaly5);
                $(".aptitudefoot th").eq(6).html(totaly6);

                // datasMax(sums,data,museummoren);
                aptitudeDitu(data);
                aptitudemoren(dataMax);

            }

               send.go();
        }).start();
}
// 文保资质单位统计信息


// 考古发掘统计
// 考古领队信息统计
// 调ajax
var condition = true;

$("#strike9").click(function(){
    if(condition == true){

        setTimeout("lingdui()",10);
        setTimeout("ageDistribution()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function leader(pageNum,pageSize){
    var loadData = false;
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/user/aaArchaeologyleader/getPageDataByParam?pageNumber='+pageNum+"&pageSize="+pageSize,
            type: 'GET',
            async: false,
            data: {
                token: getData('token'),
            },
        })
        .turn(function (prevModelData, send, abort) {

            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {

                loadData = prevModelData;
            }

        }).start();

        return loadData;
}

// 铺页面
function pullPage(data){
    $(".leaderbody").text(" ");
    if(!data){
        return false;
    }
    var num=0;
    var data = data.data.dataList;
        var len=data.length;
        var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0;
        var sums = [];
        var j=1;

        for(var i=0; i<len;i++){
            num++;
            var passIntr=document.createElement("tr");
            $(".leaderbody").append(passIntr);
        // 项目负责人编号 不
            var gmztd=document.createElement("td");
            gmztd.innerHTML=data[i].leaderId;
            passIntr.appendChild(gmztd);

        // 姓名
            var gjztd=document.createElement("td");
            gjztd.innerHTML=data[i].userName;
            passIntr.appendChild(gjztd);

        // 性别
            var skstd=document.createElement("td");
            skstd.innerHTML=data[i].sexName;
            passIntr.appendChild(skstd);


        // 出生年月（年龄）
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].birthdate+"（"+data[i].age+"）";
            passIntr.appendChild(jxdtd);

        // 省份
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].provinceName;
            passIntr.appendChild(jxdtd);

            // 单位
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].unitName;
            passIntr.appendChild(jxdtd);

            // 职称 不
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].mainPositionName;
            passIntr.appendChild(jxdtd);

            // 毕业院校
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].graInstitutions;
            passIntr.appendChild(jxdtd);

            // 学术专长
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].learnProfess;
            passIntr.appendChild(jxdtd);

            // 联系电话
            var jxdtd=document.createElement("td");
            jxdtd.innerHTML=data[i].phoneNo;
            passIntr.appendChild(jxdtd);


        }

}

// 点击调用
function lingdui(){
    var pagesize = 10;
    var loadData = leader(1,pagesize);

    pullPage(loadData);//铺第一页 默认

    if (loadData.data.pages!=0) {
        window.pagObj = $('#pagination').twbsPagination({
            totalPages: loadData.data.pages,//总共页数
            visiblePages: 5,//页码几条
            first: '首页',
            prev: '前一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                var loadToData = leader(page,pagesize);
                pullPage(loadToData);
                // console.info(page + ' (from options)');
                // console.log(loadToData);
            }
        }).on('page', function (event, page) {
            var loadToData = leader(page,pagesize);
                pullPage(loadToData);
                // console.info(page + ' (from event listening)');
        });
    }

}

// 考古领队信息的柱状图 调用ajax
function ageDistribution(){
    new cmx.process()
        .turn('callajax', {
            url: api_aa + '/user/aaArchaeologyleader/queryArchLeaderAgeStatis',
            type: "GET",
            async: false,
            data: {
                token: getData('token'),
            },
        })
        .turn(function (prevModelData, send, abort) {//prevModelData为返回的数据 send.go往下走 abort退出

            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {

                var data = prevModelData.data;
                // 考古领队信息 柱状图
                leaderBar(data);

            }
               send.go();
        }).start();
};
// 考古领队信息的柱状图 调用ajax

// 考古领队信息统计

// 考古发掘项目情况统计
// 下拉的年份
var condition = true;

$("#strike10").click(function(){
    if(condition == true){

        setTimeout("dropYear()",10);
        setTimeout("dig()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function dropYear(){
    $("#year").html(" ");
     new cmx.process()
        .turn('callajax', {
            url: api_dm + '/dmArchdigproject/queryDataLicenseDate',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var year=document.getElementById('year')
                for(var i=0;i<data.length;i++){
                    var yearOpt = document.createElement('option')
                    yearOpt.value = data[i].licenseDate;
                    yearOpt.innerHTML = data[i].licenseDate;
                    year.appendChild(yearOpt);
                }

            }

           send.go();
     }).start();
};
// 获取数据
function dig(){
    // console.log($("#year option:selected").text());
    $(".digbody").text(" ");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaAeAcpNorApply/queryEaAeAcpNorStatisByYear',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              year:$("#year").val(),
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly7=0,totaly8=0,totaly9=0;
                var totalyAll=0;
                var totaly8All=0;
                var sums = [];
                for(var i=0; i<len;i++){
                    num++;

                // 城市名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=num;
                    $(".digbody").append(passIntr);

                // // 年度
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=$("#year").val();
                    passIntr.appendChild(relicBanExittd);

                // 省市
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].provincesFullName;
                    passIntr.appendChild(relicExittd);
                // 总项目数
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].projectTotal;
                    // 判断如果是空值
                    if (data[i].projectTotal==''){
                        data[i].projectTotal=0;
                    }else {
                        relicRepExittd.innerHTML=data[i].projectTotal;
                    }
                    passIntr.appendChild(relicRepExittd);
                    totaly2+=parseInt(data[i].projectTotal);
                    sums.push(data[i].projectTotal);
                // 主动项目数
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].initProjectTotal;
                    // 判断如果是空值
                    if (data[i].initProjectTotal==''){
                        data[i].initProjectTotal=0;
                    }else {
                        relicTempEntertd.innerHTML=data[i].initProjectTotal;
                    };
                    passIntr.appendChild(relicTempEntertd);
                    totaly3+=parseInt(data[i].initProjectTotal);

                // 项目面积
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].areaTotal;
                // 判断如果是空值
                    if (data[i].areaTotal==''){
                        data[i].areaTotal=0;
                    }else {
                        relicTempEnterRepExittd.innerHTML=data[i].areaTotal;
                    };
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly4+=parseInt(data[i].areaTotal);
                // 主动项目面积
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].initAreaTotal;
                // 判断如果是空值
                    if (data[i].initAreaTotal==''){
                        data[i].initAreaTotal=0;
                    }else {
                        relicTempExittd.innerHTML=data[i].initAreaTotal;
                    };
                    passIntr.appendChild(relicTempExittd);
                    totaly5+=parseInt(data[i].initAreaTotal);
                // 总葬幕
                    var relicTempExitRepEntertd=document.createElement("td");
                    relicTempExitRepEntertd.innerHTML=data[i].tombsTotal;
                    // 判断如果是空值
                    if (data[i].tombsTotal==''){
                        data[i].tombsTotal=0;
                    }else {
                        relicTempExitRepEntertd.innerHTML=data[i].tombsTotal;
                    };
                    passIntr.appendChild(relicTempExitRepEntertd);
                    totaly6+=parseInt(data[i].tombsTotal);
                 // 主动项目葬数
                    var initTombsTotaltd=document.createElement("td");
                    initTombsTotaltd.innerHTML=data[i].initTombsTotal;
                    // 判断如果是空值
                    if (data[i].initTombsTotal==''){
                        data[i].initTombsTotal=0;
                    }else {
                        initTombsTotaltd.innerHTML=data[i].initTombsTotal;
                    };
                    passIntr.appendChild(initTombsTotaltd);
                    totaly7+=parseInt(data[i].initTombsTotal);

                }

                // 计算出最大值
                var sumsobj = {};
                sumsobj.i = 0;
                var max = sums[0];
                for (var i=0; i<sums.length; i++) {
                   if( parseInt(max) < parseInt(sums[i])){
                        max = sums[i];
                        sumsobj.i=i
                   }
                };
                var dataMax = data[sumsobj.i];

                // 总的总计

                var totaly8Al=totaly1+totaly2+totaly3+totaly4+totaly5+totaly6+totaly7;

                // 竖着总计

                $(".digfoot th").eq(3).html(totaly2);
                $(".digfoot th").eq(4).html(totaly3);
                $(".digfoot th").eq(5).html(totaly4);
                $(".digfoot th").eq(6).html(totaly5);
                $(".digfoot th").eq(7).html(totaly6);
                $(".digfoot th").eq(8).html(totaly7);
                // $(".digfoot th").eq(9).html(totaly8Al);

                // 考古发掘项目情况统计
                digDitu(data);
                // digmoren(dataMax);

            }else{
                    $(".digfoot th:gt(2)").html(" ");
                }


           send.go();
    }).start();
};
// 考古发掘项目情况统计


// 不可移动文物行政申报情况
var condition = true;

$("#strike11").click(function(){
    if(condition == true){

        setTimeout("mustnot()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;

        if(x!=0){

            $('#mustnot-one-bar'+(x)).before('<div id="mustnot-one-bar0" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
            $("#mustnot-one-bar"+(x)).remove();
            x = 0;
        }

    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function mustnot(){
    $(".mustnotbody").remove();
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/queryUnmovableStatisList',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#mustnotStartDate").val(),
              endDate:$("#mustnotEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {

            if ( prevModelData.state == '200' && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly8=0,totaly9=0,totaly10=0,totaly11=0,totaly12=0,totaly13=0;
                var totalyAll=0;
                var sums = [];
                var shen=0;

                var mustnottable = $(".mustnottable");
                var mustnothead = $(".mustnothead");
                var mustnotbody = document.createElement("tbody");
                mustnotbody.className = "mustnotbody";
                for(var i=0; i<len;i++){
                    num++;
                    // 城市名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    mustnotbody.appendChild(passIntr);
                    // 文物出境
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].protectUnitName;
                    passIntr.appendChild(relicExittd);
                    // 56004
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].fiveSixFourApply;
                    passIntr.appendChild(relicBanExittd);
                    totaly1+=parseInt(data[i].fiveSixFourApply);

                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].fiveSixFourApprove;
                    passIntr.appendChild(relicBanExittd);
                    totaly2+=parseInt(data[i].fiveSixFourApprove);
                    // 56005
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].fiveSixFiveApply;
                    passIntr.appendChild(relicRepExittd);
                    totaly3+=parseInt(data[i].fiveSixFiveApply);

                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].fiveSixFiveApprove;
                    passIntr.appendChild(relicRepExittd);
                    totaly4+=parseInt(data[i].fiveSixFiveApprove);
                    // 56010
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].fiveSixTenApply;
                    passIntr.appendChild(relicTempEntertd);
                    totaly5+=parseInt(data[i].fiveSixTenApply);

                     var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].fiveSixTenApprove;
                    passIntr.appendChild(relicTempEntertd);
                    totaly6+=parseInt(data[i].fiveSixTenApprove);

                    // 56012
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].fiveSixTwelveApply;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly7+=parseInt(data[i].fiveSixTwelveApply);

                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].fiveSixTwelveApprove;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly8+=parseInt(data[i].fiveSixTwelveApprove);
                    // 56014
                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].fiveSixFourTeenApply;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly9+=parseInt(data[i].fiveSixFourTeenApply);

                    var relicTempEnterRepExittd=document.createElement("td");
                    relicTempEnterRepExittd.innerHTML=data[i].fiveSixFourTeenApprove;
                    passIntr.appendChild(relicTempEnterRepExittd);
                    totaly10+=parseInt(data[i].fiveSixFourTeenApprove);
                    // 56022
                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].fiveSixTwentyTwoApply;
                    passIntr.appendChild(relicTempExittd);
                    totaly11+=parseInt(data[i].fiveSixTwentyTwoApply);

                    var relicTempExittd=document.createElement("td");
                    relicTempExittd.innerHTML=data[i].fiveSixTwentyTwoApprove;
                    passIntr.appendChild(relicTempExittd);
                    totaly12+=parseInt(data[i].fiveSixTwentyTwoApprove);

                    //横着总计
                    totaly13 = parseInt(data[i].fiveSixFourApply)+parseInt(data[i].fiveSixFiveApply)+parseInt(data[i].fiveSixTenApply)+parseInt(data[i].fiveSixTwelveApply)+parseInt(data[i].fiveSixFourTeenApply)+parseInt(data[i].fiveSixTwentyTwoApply);
                    var sum=document.createElement("td");
                    passIntr.appendChild(sum);
                    sum.innerHTML=totaly13;
                    sums.push(totaly13);
                    shen+=totaly13;

                    mustnottable.append(mustnotbody);

                }



                    // 竖着总计
                    $(".mustnotfoot th").eq(1).html(totaly1);
                    $(".mustnotfoot th").eq(2).html(totaly2);
                    $(".mustnotfoot th").eq(3).html(totaly3);
                    $(".mustnotfoot th").eq(4).html(totaly4);
                    $(".mustnotfoot th").eq(5).html(totaly5);
                    $(".mustnotfoot th").eq(6).html(totaly6);
                    $(".mustnotfoot th").eq(7).html(totaly7);
                    $(".mustnotfoot th").eq(8).html(totaly8);
                    $(".mustnotfoot th").eq(9).html(totaly9);
                    $(".mustnotfoot th").eq(10).html(totaly10);
                    $(".mustnotfoot th").eq(11).html(totaly11);
                    $(".mustnotfoot th").eq(12).html(totaly12);
                    $(".mustnotfoot th").eq(13).html(shen);


                // 不可移动的调用算总数

                mustnotDataArrange(data);
                // mustnotmoren(dataMax);

            }
                    // 如果是空 总数为0
            if(IsEmpty(data)){
                $(".mustnotbody").remove();
                $(".mustnotfoot").css({"border":"1px solid rgb(228, 234, 236)"});
                $(".mustnotfoot th:gt(0)").html("0");
            }

           send.go();
      }).start();
};
// 不可移动文物行政申报情况

// 可移动文物行政申报情况
var condition = true;

$("#strike12").click(function(){
    if (condition == true) {

        setTimeout("mustmove()",10);
        setTimeout("nationalRanking()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;

        if(y!=0){

            $('#mustmove-one-bar'+(y)).before('<div id="mustmove-one-bar0" class="col-xs-12 col-md-6 col-lg-6 margin-bottom-40" style="height:400px"></div>');
            $("#mustmove-one-bar"+(y)).remove();

            $('#mustmove-two-bar'+(y)).before('<div id="mustmove-two-bar0" class="col-xs-12 col-md-6 col-lg-6 margin-bottom-40" style="height:400px"></div>');
            $("#mustmove-two-bar"+(y)).remove();
            y = 0;
        }

        if(z!=0){

            $('#mustmove-two-bar'+(z)).before('<div id="mustmove-two-bar0" class="col-xs-12 col-md-6 col-lg-6 margin-bottom-40" style="height:400px"></div>');
            $("#mustmove-two-bar"+(z)).remove();
            z = 0;
        }
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function mustmove(){
    $(".mustmovebody").remove();
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/queryMovableStatisList ',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#mustmoveStartDate").val(),
              endDate:$("#mustmoveEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if ( prevModelData.state == '200' && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var num=0
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0,totaly6=0,totaly7=0,totaly8=0,totaly9=0,totaly10=0,totaly11=0,totaly12=0,totaly13=0;
                var totalyAll=0;
                var sums = [];
                var shen=0;

                var mustmovetable = $(".mustmovetable");
                var mustmovehead = $(".mustmovehead");
                var mustmovebody = document.createElement("tbody");
                mustmovebody.className = "mustmovebody";
                for(var i=0; i<len;i++){

                    num++;
                // 城市名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].provincesFullName;
                    mustmovebody.appendChild(passIntr);
                // 博物馆
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].protectUnitName;
                    passIntr.appendChild(relicExittd);
                // 56015
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].fiveSixFifteenApply;
                    passIntr.appendChild(relicBanExittd);
                    totaly1+=parseInt(data[i].fiveSixFifteenApply);

                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].fiveSixFifteenApprove;
                    passIntr.appendChild(relicBanExittd);
                    totaly2+=parseInt(data[i].fiveSixFifteenApprove);
                // 56016
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].fiveSixSixteenApply;
                    passIntr.appendChild(relicRepExittd);
                    totaly3+=parseInt(data[i].fiveSixSixteenApply);

                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].fiveSixSixteenApprove;
                    passIntr.appendChild(relicRepExittd);
                    totaly4+=parseInt(data[i].fiveSixSixteenApprove);
                // 56019
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].fiveSixNineteenApply;
                    passIntr.appendChild(relicTempEntertd);
                    totaly5+=parseInt(data[i].fiveSixNineteenApply);

                     var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].fiveSixNineteenApprove;
                    passIntr.appendChild(relicTempEntertd);
                    totaly6+=parseInt(data[i].fiveSixNineteenApprove);


                //横着总计
                    totaly7 = parseInt(data[i].fiveSixFifteenApply)+parseInt(data[i].fiveSixSixteenApply)+parseInt(data[i].fiveSixNineteenApply);
                    var sum=document.createElement("td");
                    passIntr.appendChild(sum);
                    sum.innerHTML=totaly7;
                    sums.push(totaly7);
                    shen+=totaly7;

                mustmovetable.append(mustmovebody);

                // 竖着总计

                $(".mustmovefoot th").eq(1).html(totaly1);
                $(".mustmovefoot th").eq(2).html(totaly2);
                $(".mustmovefoot th").eq(3).html(totaly3);
                $(".mustmovefoot th").eq(4).html(totaly4);
                $(".mustmovefoot th").eq(5).html(totaly5);
                $(".mustmovefoot th").eq(6).html(totaly6);
                $(".mustmovefoot th").eq(7).html(shen);




            }
            // 可移动文物行政申报情况 调用算总数
            mustmoveDataArrange(data);

            // 如果是空 总数为0
            if(IsEmpty(data)){
                $(".mustmovebody").remove();
                $(".mustmovefoot").css({"border":"1px solid rgb(228, 234, 236)"});
                $(".mustmovefoot th:gt(0)").html("0");
            }
        }

           send.go();
      }).start();
};
// 可移动文物行政申报情况
// 可移动文物行政申报情况 全国前十的文物
function nationalRanking(){
    $(".nationwidthbody").text(" ");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/queryRepairCopyTopTen',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              itemCode:"",
              beginDate:$("#mustmoveStartDate").val(),
              endDate:$("#mustmoveEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var num=0
                for(var i=0; i<len;i++){
                    num++;
                    // 前十的文物表

                    var tr=document.createElement("tr");
                    var td=document.createElement("td");
                    td.innerHTML=num;
                    tr.appendChild(td);
                    $(".nationwidthbody").append(tr);

                    var td=document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=data[i].relicName;

                    var td=document.createElement("td");
                    tr.appendChild(td);
                    td.innerHTML=data[i].number;

                }

            }

           send.go();
      }).start();
};

// 可移动文物行政申报情况 每个省的前十的文物
function provinceRankedTen(dataMaxitemCode){
        var data = {};
        new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/queryRepairCopyTopTen',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              itemCode:dataMaxitemCode,
              beginDate:$("#mustmoveStartDate").val(),
              endDate:$("#mustmoveEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (prevModelData.state == '200' && prevModelData.data != 'null') {

                 data = prevModelData.data;

            }

      }).start();

     return data;
}
// 可移动文物行政申报情况

// 工作汇报常用统计图表

// 国家文物局委托省局行政审批督办情况统计
var condition = true;
var overall;
$("#strikelast").click(function(){
    if (condition == true) {
        overall = 1;
        setTimeout("entrust()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
});

var itemName ="itemName";
function entrust(){
     $(".entrustbody").remove();
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/subBusiness/queryProvinceFlowStatisList' ,
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#entrustStartDate").val(),
              endDate:$("#entrustEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if ( prevModelData.state == '200' && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0;
                var sum=[];

                var entrusttable = $(".entrusttable");
                var entrusthead = $(".entrusthead");
                var entrustbody = document.createElement("tbody");
                entrustbody.className = "entrustbody";
                // 标题上的字

                if($("#entrustStartDate").val() == "" && $("#entrustEndDate").val() == ""){

                    $(".entrusthead tr:eq(0) th").html(" 行政审批督办情况");
                }else if($("#entrustStartDate").val() == ""){
                    $(".entrusthead tr:eq(0) th").html($("#entrustEndDate").val()+" 之前 行政审批督办情况");
                }else if($("#entrustEndDate").val() == ""){
                    $(".entrusthead tr:eq(0) th").html($("#entrustStartDate").val()+" 至今 行政审批督办情况");
                }else{
                    $(".entrusthead tr:eq(0) th").html($("#entrustStartDate").val() +" 至 "+$("#entrustEndDate").val()+"  行政审批督办情况");
                }

                for(var i=0; i<len;i++){
                    // 编号
                    var passIntr=document.createElement("tr");
                    var td1 = document.createElement("td");
                    td1.innerHTML = data[i].itemCode;
                    passIntr.appendChild(td1);
                    entrustbody.appendChild(passIntr);
                    passIntr.style.cursor='pointer';

                    // 项目名称
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].itemName;
                    passIntr.appendChild(relicExittd);


                    // 法定办结时限
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].paramValue;
                    passIntr.appendChild(relicTempEntertd);

                    // 承诺办结时限
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML="15";
                    passIntr.appendChild(relicTempEntertd);

                    // 报送件数
                    var noOverdue=document.createElement("td");
                    noOverdue.innerHTML=data[i].submitNum;

                    passIntr.appendChild(noOverdue);
                    totaly5+=data[i].submitNum;

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\',"+1+",'' ,'', '','', '',"+pageSize+","+pageNumber+",this,\'"+$("#entrustStartDate").val()+"\',\'"+$("#entrustEndDate").val()+"\')";
                    noOverdue.setAttribute("onclick",projectNames);

                    noOverdue.style.color ='#62a8ea';
                    noOverdue.style.textDecoration = 'underline';

                    // 受理件数
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].acceptNum;
                    passIntr.appendChild(relicBanExittd);
                    totaly1+=parseInt(data[i].acceptNum);

                    var itemCode = data[i].itemCode;
                    var projectNames = "modelDetail(\'"+itemCode+"\','' ,"+1+",'' , '', '','',"+pageSize+","+pageNumber+",this,\'"+$("#entrustStartDate").val()+"\',\'"+$("#entrustEndDate").val()+"\')";

                    relicBanExittd.setAttribute("onclick",projectNames);

                    relicBanExittd.style.color ='#62a8ea';
                    relicBanExittd.style.textDecoration = 'underline';

                    // 承诺时限内办结件数
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].dateFinshNum;
                    passIntr.appendChild(relicRepExittd);
                    totaly2+=parseInt(data[i].dateFinshNum);

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\','' ,'' ,"+1+", '', '','',"+pageSize+","+pageNumber+",this,\'"+$("#entrustStartDate").val()+"\',\'"+$("#entrustEndDate").val()+"\')";
                    relicRepExittd.setAttribute("onclick",projectNames);


                    relicRepExittd.style.color ='#62a8ea';
                    relicRepExittd.style.textDecoration = 'underline';


                    // 逾期办理件数
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].overdueNum;
                    passIntr.appendChild(relicTempEntertd);
                    totaly3+=parseInt(data[i].overdueNum);

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\','' ,'' ,'',"+1+",  '','',"+pageSize+","+pageNumber+",this,\'"+$("#entrustStartDate").val()+"\',\'"+$("#entrustEndDate").val()+"\')";
                    relicTempEntertd.setAttribute("onclick",projectNames);

                    relicTempEntertd.style.color ='#62a8ea';
                    relicTempEntertd.style.textDecoration = 'underline';

                    // 备注 未逾期未办结件数
                    var noOverdue=document.createElement("td");
                    noOverdue.innerHTML=data[i].noFinshNum;
                    passIntr.appendChild(noOverdue);
                    totaly4+=data[i].noFinshNum;

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\','' ,'' ,'', '',"+1+", '',"+pageSize+","+pageNumber+",this,\'"+$("#entrustStartDate").val()+"\',\'"+$("#entrustEndDate").val()+"\')";
                    noOverdue.setAttribute("onclick",projectNames);

                    noOverdue.style.color ='#62a8ea';
                    noOverdue.style.textDecoration = 'underline';

                    entrusttable.append(entrustbody);
                }

                // 竖着总计

                $(".entrustfoot th").css({"cursor":"pointer"});
                $(".entrustfoot th").eq(1).html(totaly5);
                $(".entrustfoot th").eq(1).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".entrustfoot th").eq(1).click(function(){
                    modelDetail("",1,"","","","",1,pageSize,pageNumber,this,$("#entrustStartDate").val(),$("#entrustEndDate").val(),"");
                });

                $(".entrustfoot th").eq(2).html(totaly1);
                 $(".entrustfoot th").eq(2).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".entrustfoot th").eq(2).click(function(){
                    modelDetail("","",1,"","","",1,pageSize,pageNumber,this,$("#entrustStartDate").val(),$("#entrustEndDate").val(),"");
                });

                $(".entrustfoot th").eq(3).html(totaly2);
                 $(".entrustfoot th").eq(3).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".entrustfoot th").eq(3).click(function(){
                    modelDetail("","","",1,"","",1,pageSize,pageNumber,this,$("#entrustStartDate").val(),$("#entrustEndDate").val(),"");
                });

                $(".entrustfoot th").eq(4).html(totaly3);
                 $(".entrustfoot th").eq(4).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".entrustfoot th").eq(4).click(function(){
                    modelDetail("","","","",1,"",1,pageSize,pageNumber,this,$("#entrustStartDate").val(),$("#entrustEndDate").val(),"");
                });

                $(".entrustfoot th").eq(5).html(totaly4);
                 $(".entrustfoot th").eq(5).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".entrustfoot th").eq(5).click(function(){
                    modelDetail("","","","","",1,1,pageSize,pageNumber,this,$("#entrustStartDate").val(),$("#entrustEndDate").val(),"");
                });

            };

             // 如果是空 总数为0
            if(IsEmpty(data)){
                $(".entrustbody").remove();
                $(".entrustfoot").css({"border":"1px solid rgb(228, 234, 236)"});
                $(".entrustfoot th:gt(0)").html("0");
            }

           send.go();
      }).start();
}
// 国家文物局委托省局行政审批督办情况统计

// 行政审批督办情况
var condition = true;
$("#strike13").click(function(){
    if (condition == true) {
        overall = 2;
        setTimeout("administration()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
});

var itemName ="itemName";
function administration(){

     $(".administrationbody").remove();
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/business/queryFlowStatisList' ,
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              beginDate:$("#administrationStartDate").val(),
              endDate:$("#administrationEndDate").val()
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if ( prevModelData.state == '200' && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0,totaly5=0;
                var sum=[];

                var administrationtable = $(".administrationtable");
                var administrationhead = $(".administrationhead");
                var administrationbody = document.createElement("tbody");
                administrationbody.className = "administrationbody";
                // 标题上的字

                if($("#administrationStartDate").val() == "" && $("#administrationEndDate").val() == ""){

                    $(".administrationhead tr:eq(0) th").html(" 行政审批督办情况");
                }else if($("#administrationStartDate").val() == ""){
                    $(".administrationhead tr:eq(0) th").html($("#administrationEndDate").val()+" 之前 行政审批督办情况");
                }else if($("#administrationEndDate").val() == ""){
                    $(".administrationhead tr:eq(0) th").html($("#administrationStartDate").val()+" 至今 行政审批督办情况");
                }else{
                    $(".administrationhead tr:eq(0) th").html($("#administrationStartDate").val() +" 至 "+$("#administrationEndDate").val()+"  行政审批督办情况");
                }

                for(var i=0; i<len;i++){
                    // 编号
                    var passIntr=document.createElement("tr");
                    var td1 = document.createElement("td");
                    td1.innerHTML = data[i].itemCode;
                    passIntr.appendChild(td1);
                    administrationbody.appendChild(passIntr);
                    passIntr.style.cursor='pointer';

                    // 项目名称
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].itemName;
                    passIntr.appendChild(relicExittd);


                    // 法定办结时限
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].paramValue;
                    passIntr.appendChild(relicTempEntertd);

                    // 承诺办结时限
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML="15";
                    passIntr.appendChild(relicTempEntertd);

                    // 报送件数
                    var noOverdue=document.createElement("td");
                    noOverdue.innerHTML=data[i].submitNum;

                    passIntr.appendChild(noOverdue);
                    totaly5+=data[i].submitNum;

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\',"+1+",'' ,'', '','', '',"+pageSize+","+pageNumber+",this,\'"+$("#administrationStartDate").val()+"\',\'"+$("#administrationEndDate").val()+"\')";
                    noOverdue.setAttribute("onclick",projectNames);

                    noOverdue.style.color ='#62a8ea';
                    noOverdue.style.textDecoration = 'underline';

                    // 受理件数
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].acceptNum;
                    passIntr.appendChild(relicBanExittd);
                    totaly1+=parseInt(data[i].acceptNum);

                    var itemCode = data[i].itemCode;
                    var projectNames = "modelDetail(\'"+itemCode+"\','' ,"+1+",'' , '', '','',"+pageSize+","+pageNumber+",this,\'"+$("#administrationStartDate").val()+"\',\'"+$("#administrationEndDate").val()+"\')";

                    relicBanExittd.setAttribute("onclick",projectNames);

                    relicBanExittd.style.color ='#62a8ea';
                    relicBanExittd.style.textDecoration = 'underline';

                    // 承诺时限内办结件数
                    var relicRepExittd=document.createElement("td");
                    relicRepExittd.innerHTML=data[i].dateFinshNum;
                    passIntr.appendChild(relicRepExittd);
                    totaly2+=parseInt(data[i].dateFinshNum);

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\','' ,'' ,"+1+", '', '','',"+pageSize+","+pageNumber+",this,\'"+$("#administrationStartDate").val()+"\',\'"+$("#administrationEndDate").val()+"\')";
                    relicRepExittd.setAttribute("onclick",projectNames);


                    relicRepExittd.style.color ='#62a8ea';
                    relicRepExittd.style.textDecoration = 'underline';


                    // 逾期办理件数
                    var relicTempEntertd=document.createElement("td");
                    relicTempEntertd.innerHTML=data[i].overdueNum;
                    passIntr.appendChild(relicTempEntertd);
                    totaly3+=parseInt(data[i].overdueNum);

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\','' ,'' ,'',"+1+",  '','',"+pageSize+","+pageNumber+",this,\'"+$("#administrationStartDate").val()+"\',\'"+$("#administrationEndDate").val()+"\')";
                    relicTempEntertd.setAttribute("onclick",projectNames);

                    relicTempEntertd.style.color ='#62a8ea';
                    relicTempEntertd.style.textDecoration = 'underline';

                    // 备注 未逾期未办结件数
                    var noOverdue=document.createElement("td");
                    noOverdue.innerHTML=data[i].noFinshNum;
                    passIntr.appendChild(noOverdue);
                    totaly4+=data[i].noFinshNum;

                    var projectNames = "modelDetail(\'"+data[i].itemCode+"\','' ,'' ,'', '',"+1+", '',"+pageSize+","+pageNumber+",this,\'"+$("#administrationStartDate").val()+"\',\'"+$("#administrationEndDate").val()+"\')";
                    noOverdue.setAttribute("onclick",projectNames);

                    noOverdue.style.color ='#62a8ea';
                    noOverdue.style.textDecoration = 'underline';

                    administrationtable.append(administrationbody);
                }

                // 竖着总计
                $(".administrationfoot th").css({"cursor":"pointer"});
                $(".administrationfoot th").eq(1).html(totaly5);
                $(".administrationfoot th").eq(1).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".administrationfoot th").eq(1).click(function(){
                    modelDetail("",1,"","","","",1,pageSize,pageNumber,this,$("#administrationStartDate").val(),$("#administrationEndDate").val(),"");
                });

                $(".administrationfoot th").eq(2).html(totaly1);
                 $(".administrationfoot th").eq(2).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".administrationfoot th").eq(2).click(function(){
                    modelDetail("","",1,"","","",1,pageSize,pageNumber,this,$("#administrationStartDate").val(),$("#administrationEndDate").val(),"");
                });

                $(".administrationfoot th").eq(3).html(totaly2);
                 $(".administrationfoot th").eq(3).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".administrationfoot th").eq(3).click(function(){
                    modelDetail("","","",1,"","",1,pageSize,pageNumber,this,$("#administrationStartDate").val(),$("#administrationEndDate").val(),"");
                });

                $(".administrationfoot th").eq(4).html(totaly3);
                 $(".administrationfoot th").eq(4).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".administrationfoot th").eq(4).click(function(){
                    modelDetail("","","","",1,"",1,pageSize,pageNumber,this,$("#administrationStartDate").val(),$("#administrationEndDate").val(),"");
                });

                $(".administrationfoot th").eq(5).html(totaly4);
                 $(".administrationfoot th").eq(5).css({
                    "color":'#62a8ea',
                    "textDecoration":'underline'
                })
                $(".administrationfoot th").eq(5).click(function(){
                    modelDetail("","","","","",1,1,pageSize,pageNumber,this,$("#administrationStartDate").val(),$("#administrationEndDate").val(),"");
                });

            };

             // 如果是空 总数为0
            if(IsEmpty(data)){
                $(".administrationbody").remove();
                $(".administrationfoot").css({"border":"1px solid rgb(228, 234, 236)"});
                $(".administrationfoot th:gt(0)").html("0");
            }

           send.go();
      }).start();
};
// 行政审批督办情况



// 项目咨询情况统计
var third = "咨询第三方情况详情";
var expert = "咨询专家情况详情";
var condition = true;

$("#strike14").click(function(){
    if (condition == true) {

        setTimeout("country()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
    }
})
function country(){
    new cmx.process()
    .turn('callajax', {
        url: api_ea + '/eaPubExamopinion/queryCountryProAdvisory',
        async: false,
        header: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        data: JSON.stringify({
          token: getData('token'),
           beginDate:$("#guojuStartDate").val(),
            endDate:$("#guojuEndDate").val()
        }),
        type: 'POST'
    })
    .turn(function (prevModelData, send, abort) {
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;

            var proData = processingData(data);
            if(proData){

                createView(proData);
                // 默认第一页数据
                // paging($("#guojuStartDate").val(),$("#guojuEndDate").val(),pageNumber,pageSize,2,proData[0][0].itemId,third,false," ");


                 // 标题上的字

                if($("#guojuStartDate").val() == "" && $("#guojuEndDate").val() == ""){

                    $(".referhead tr:eq(0) th").html("国家文物局行政审批咨询情况统计");


                }else if($("#guojuStartDate").val() == ""){
                    $(".referhead tr:eq(0) th").html($("#guojuEndDate").val()+" 之前国家文物局行政审批咨询情况统计");

                }else if($("#guojuEndDate").val() == ""){
                    $(".referhead tr:eq(0) th").html($("#guojuStartDate").val()+" 至今国家文物局行政审批咨询情况统计");

                }else{
                    $(".referhead tr:eq(0) th").html($("#guojuStartDate").val() +" 至 "+$("#guojuEndDate").val()+" 国家文物局行政审批咨询情况统计");

                };

            }else{
                return false;
            }

        }
         send.go();
  }).start();

}
// [5,8,3,1]
function processingData(data){
    if(data[0]){
        var resarr = [[data[0]]];
    } else {
        return false;
    }
    var isHas = false;

    for(var i=1;i<data.length;i++){
        isHas = false;
        for(var j=0;j<resarr.length;j++){
            if(resarr[j][0].itemClassName == data[i].itemClassName){
                resarr[j].push(data[i]);
                isHas = true;
                break;
            }
        }
        if (isHas === false){
            resarr.push([data[i]]);
        }
    }
    return resarr;

}

// 铺国局的数据
function createView(resarr){
    $(".referbody").text("");
        var tr,td,td1,td2,td3,row=[];
        for(var i=0;i<resarr.length;i++){
            var arrlen = resarr[i].length;
            for(var j=0;j<arrlen;j++){
                tr = document.createElement("tr");
                if (j == 0){
                    td = document.createElement("td");
                    td.rowSpan=arrlen;
                    td.innerHTML = resarr[i][j].itemClassName;
                    td.style.verticalAlign = "middle";
                    tr.appendChild(td);
                }
                td1 = document.createElement("td");
                td2 = document.createElement("td");
                td3 = document.createElement("td");

                td2.style.verticalAlign = "middle";
                td3.style.verticalAlign = "middle";

                td1.innerHTML = resarr[i][j].itemName;

                td2.innerHTML = resarr[i][j].advisoryThird;

                td2.style.color = '#62a8ea',
                td2.style.textDecoration = 'underline';
                td2.style.cursor = 'pointer';

                var itemId=resarr[i][j].itemId;

                var td2str = "countrytan(\'"+$('#guojuStartDate').val()+"\',\'"+$('#guojuEndDate').val()+"\',"+pageNumber+","+pageSize+",2,'"+itemId+"','"+third+"',true,this,'')";
                td2.setAttribute("onclick",td2str);
                // if(i == 0 && j == 0){
                //     td2.className = "class_bg";
                // }

                td3.innerHTML = resarr[i][j].advisoryExpert;

                td3.style.color = '#62a8ea',
                td3.style.textDecoration = 'underline';
                td3.style.cursor = 'pointer';

                var td3str = "countrytan(\'"+$('#guojuStartDate').val()+"\',\'"+$('#guojuEndDate').val()+"\',"+pageNumber+","+pageSize+",1,'"+itemId+"','"+expert+"',true,this,'')";
                td3.setAttribute("onclick",td3str);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                $(".referbody").append(tr);
            }
        }
}


// 弹出框
function countrytan(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode){
console.log(examClass);
    // 导出
    countrydao = function (){
    window.open(api_ea + "/eaStatisticsExport/exportAdvisoryList?examClass=" + examClass+"&token="+getData("token")+"&beginDate="+ start + "&endDate="+ end + "&dataCode="+ "" +"&projectNum=" +projectNum);
      }
      var str = "";
      str+='<button type="button" class="btn btn-primary pull-right margin-bottom-10" onclick="countrydao();">'
      str+='导出'
      str+='</button>';

      $("#educe").text("");
      $("#educe").append(str);


      $("#statistics-head").text(" ");
      $("#statistics-tbody").text(" ");
      $('#paging2').remove();
      $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');


        if(ele.innerHTML == 0){

             showAlert({
                 type: 'info',
                 content: '暂无数据'
             });

        }else{

            // 模态框
            $('#modelDetailname').off('shown.bs.modal');
            $('#modelDetailname').on('shown.bs.modal', function () {
                // 获取分页的数据

                paging(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode);


            });
            $('#modelDetailname').modal('show');
        }

};

// 获取数据 分页ajax
function getPaging(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode){

    $("#statistics-head").text(" ");
    $("#statistics-tbody").text(" ");

    var data1 = false;
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubExamopinion/queryAdvisoryList',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              examClass:examClass,//分第三方和专家
              projectNum:projectNum,//项目编号
              pageNumber:pageNumber,//页码
              pageSize:pageSize,//条数
              dataCode:"",//省份
              beginDate:start,
              endDate:end

            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                data1 = prevModelData;

            }
      }).start();

     return data1;

}

// 铺分页
function paging(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode){
    examClass = examClass;
    projectNum = projectNum;

    ele = IsEmpty(ele)?false:ele;
    isremove = IsEmpty(isremove)?true:isremove;
    var Title = title;
    $(".case").html(Title);

    // 第一条数据
    var loadToData = getPaging(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode);
    // pageTable(loadToData);
    $('#paging2').remove();
    if (loadToData.data.pages!=0) {
        $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');
        window.pagObj = $('#paging2').twbsPagination({
            totalPages: loadToData.data.pages,//总共页数
            visiblePages: 5,//页码几条
            first: '首页',
            prev: '前一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                var loadToData = getPaging(start,end,page,pageSize,examClass,projectNum,title,isremove,ele,dataCode);
                pageTable(loadToData,page,examClass);

            }
        });

    };

}

// 铺弹出框页面
function pageTable(loadToData,page,examClass){
        console.log(examClass);
    console.log(1111111111111111);
    console.log(loadToData);
    $("#statistics-head").text(" ");
    $("#statistics-tbody").text(" ");

    if(typeof(loadToData.data.dataList) != "undefined" && loadToData.data.dataList.length >= 0){
        var data = loadToData.data.dataList;

    };

    var tr,td,td1,td2,td3,add;

    // 判断是咨询专家1还是 咨询第三方2
    if (examClass == 1) {
        add = '<th style="width: 165px">专家姓名</th><th style="width: 165px">专家工作单位</th>';
    }else if(examClass == 2){
        add = '<th style="width: 165px">第三方名称</th>';
    };


        var str ="";
        str+='<tr id="th-head">';
        str+='<th style="width: 95px">序号</th>';
        str+='<th style="width: 115px">咨询人</th>';
        str+=add;
        str+='<th style="width: 200px;">咨询日期</th>';
        str+='<th style="width: 165px;">反馈日期</th>';
        str+='<th style="width: 165px;">文件标题</th>';
        str+='<th style="width: 450px">项目类型</th>';
        str+='<th style="width: 165px">文号</th>';
        str+='</tr>';

        $("#statistics-head").append(str);


        for(var i=0;i<data.length;i++){

            var z = i +1;
            tr = document.createElement("tr");
            tdindex = document.createElement("td");
            td = document.createElement("td");
            td1 = document.createElement("td");
            td2 = document.createElement("td");
            td3 = document.createElement("td");
            td4 = document.createElement("td");
            td5 = document.createElement("td");
            td6 = document.createElement("td");
            td7 = document.createElement("td");

            tdindex.innerHTML = pageSize * (page-1) + z;

            td.innerHTML = data[i].userName;

            td1.innerHTML = data[i].expertName;

            td2.innerHTML = data[i].unitName;

            var arriveDate = data[i].arriveDate;
            arriveDate = arriveDate.substring(0,10);
            td3.innerHTML = arriveDate;

            var apprDate = data[i].apprDate;
            apprDate = apprDate.substring(0,10);
            td4.innerHTML = apprDate;

            td5.innerHTML = data[i].proFileTitle;
            td6.innerHTML = data[i].projectTypeName;
            td7.innerHTML = data[i].originalNo;

            tr.appendChild(tdindex);
            tr.appendChild(td);
            tr.appendChild(td1);

            if (examClass == 1) {

                tr.appendChild(td2);

            }else if(examClass == 2){

            };

            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);

            $("#statistics-tbody").append(tr);

        }

}


//  国局省局分界线   国局省局分界线 国局省局分界线 国局省局分界线 国局省局分界线 国局省局分界线 国局省局分界线  以下省局 以上是国局
var condition = true;

$("#strike15").click(function(){
    if (condition == true) {

        setTimeout("province()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
     }

})
function province(){
    new cmx.process()
    .turn('callajax', {
        url: api_ea + '/eaPubExamopinion/queryProvinceProAdvisory',
        async: false,
        header: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        },
        data: JSON.stringify({
          token: getData('token'),
          beginDate:$("#shengjuStartDate").val(),
          endDate:$("#shengjuEndDate").val()
        }),
        type: 'POST'
    })
    .turn(function (prevModelData, send, abort) {
        if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
            var data = prevModelData.data;

            var proData = processingData1(data);

            if(proData){

                createView1(proData);
                // 默认第一页数据
                paging1($("#shengjuStartDate").val(),$("#shengjuEndDate").val(),pageNumber,pageSize,2,proData[0][0].itemId,third,false,false,proData[0][0].dataCode);

                // 标题上的字

                if($("#shengjuStartDate").val() == "" && $("#shengjuEndDate").val() == ""){

                    $(".ShengJuhead tr:eq(0) th").html("各省文物局行政审批咨询情况统计");


                }else if($("#shengjuStartDate").val() == ""){
                    $(".ShengJuhead tr:eq(0) th").html($("#shengjuEndDate").val()+" 之前各省文物局行政审批咨询情况统计");

                }else if($("#shengjuEndDate").val() == ""){
                    $(".ShengJuhead tr:eq(0) th").html($("#shengjuStartDate").val()+" 至今各省文物局行政审批咨询情况统计");

                }else{
                    $(".ShengJuhead tr:eq(0) th").html($("#shengjuStartDate").val() +" 至 "+$("#shengjuEndDate").val()+" 各省文物局行政审批咨询情况统计");

                };

            }else{
                return false;
            }

        }
         send.go();
  }).start();

};

// [5,8,3,1]
function processingData1(data){
    if(data[0]){
        var resarr = [[data[0]]];
    } else {
        return false;
    }
    var isHas = false;

    for(var i=1;i<data.length;i++){
        isHas = false;
        for(var j=0;j<resarr.length;j++){
            if(resarr[j][0].dataName == data[i].dataName){
                resarr[j].push(data[i]);
                isHas = true;
                break;
            }
        }
        if (isHas === false){
            resarr.push([data[i]]);
        }
    }
    return resarr;

}

// 铺省局的数据
function createView1(resarr){
    $(".ShengJubody").text("");
      var tr,td,td1,td2,td3,row=[],tdsum,tdsum1;
      var sum=0,sum1=0;
        for(var i=0;i<resarr.length;i++){
            sum=0;
            sum1=0;
            var arrlen = resarr[i].length;
            for(var j=0;j<arrlen;j++){
                tr = document.createElement("tr");
                if (j == 0){
                    td = document.createElement("td");
                    td.rowSpan=arrlen;
                    td.innerHTML = resarr[i][j].dataName;
                    td.style.verticalAlign = "middle";
                    tr.appendChild(td);

                    tdsum = document.createElement("td");
                    tdsum.style.verticalAlign = "middle";
                    tdsum.style.textAlign = "center";
                    tdsum.rowSpan=arrlen;
                    tdsum.id = "tdsum_" + i;


                    tdsum1 = document.createElement("td");
                    tdsum1.style.verticalAlign = "middle";
                    tdsum1.style.textAlign = "center";
                    tdsum1.rowSpan=arrlen;
                    tdsum1.id = "tdsum1_" + i;
                }

                td1 = document.createElement("td");
                td2 = document.createElement("td");
                td3 = document.createElement("td");

                td2.style.borderRight  = "1px solid rgb(228, 234, 236)";
                td3.style.borderRight  = "1px solid rgb(228, 234, 236)";

                sum += parseInt(resarr[i][j].advisoryThird);
                sum1 += parseInt(resarr[i][j].advisoryExpert);
                if(j == resarr[i].length-1){
                    var tdsum = document.getElementById("tdsum_" + i);
                    var tdsum1 = document.getElementById("tdsum1_" + i);
                    tdsum.innerHTML = sum;
                    tdsum1.innerHTML = sum1;
                }


                td1.innerHTML = resarr[i][j].type;
                td2.innerHTML = resarr[i][j].advisoryThird;
                td3.innerHTML = resarr[i][j].advisoryExpert;

                var itemId=resarr[i][j].itemId;
                var dataCode = resarr[i][j].dataCode


                var td2str = "provincetan(\'"+$('#shengjuStartDate').val()+"\',\'"+$('#shengjuEndDate').val()+"\',"+pageNumber+","+pageSize+",2,'"+itemId+"','"+third+"',true,this,"+dataCode+")";
                td2.setAttribute("onclick",td2str);

                td2.style.color = '#62a8ea',
                td2.style.textDecoration = 'underline';
                td2.style.cursor = 'pointer';
                // if(i == 0 && j == 0){
                //     td2.className = "class_bg";
                //     // td2.style.background = "#f3f7f9"
                // }


                var td3str = "provincetan(\'"+$('#shengjuStartDate').val()+"\',\'"+$('#shengjuEndDate').val()+"\',"+pageNumber+","+pageSize+",1,'"+itemId+"','"+expert+"',true,this,"+dataCode+")";
                td3.setAttribute("onclick",td3str);
                td3.style.color = '#62a8ea',
                td3.style.textDecoration = 'underline';
                td3.style.cursor = 'pointer';

                tr.appendChild(td1);
                tr.appendChild(td2);
                if (j == 0) {
                    tr.appendChild(tdsum);
                };

                tr.appendChild(td3);
                if (j == 0) {
                    tr.appendChild(tdsum1);
                };

                $(".ShengJubody").append(tr);

            }

        }
}

// 省局弹框
function provincetan(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode){

    // 导出
    provincedao = function (){

        window.open(api_ea + "/eaStatisticsExport/exportAdvisoryList?examClass=" + examClass+"&token="+getData("token") + "&beginDate="+ start + "&endDate="+ end+"&dataCode="+ dataCode +"&projectNum=" +projectNum);
      }
      var str = "";
      str+='<button type="button" class="btn btn-primary pull-right margin-bottom-10" onclick="provincedao();">'
      str+='导出'
      str+='</button>';

      $("#educe").text("");
      $("#educe").append(str);


      $("#statistics-head").text(" ");
      $("#statistics-tbody").text(" ");
      $('#paging2').remove();
      $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');


        if(ele.innerHTML == 0){

             showAlert({
                 type: 'info',
                 content: '暂无数据'
             });

        }else{

            // 模态框
            $('#modelDetailname').off('shown.bs.modal');
            $('#modelDetailname').on('shown.bs.modal', function () {
                // 获取分页的数据

                paging1(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode);


            });
            $('#modelDetailname').modal('show');
        }

};

// 获取分页的数据 ajax
function getPaging1(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode){

    var data2 = false;
     new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubExamopinion/queryAdvisoryList',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
              examClass:examClass,//分第三方和专家
              projectNum:projectNum,//项目编号
              pageNumber:pageNumber,//页码
              pageSize:pageSize,//条数
              dataCode:dataCode,//省份
              beginDate:start,
              endDate:end

            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                data2 = prevModelData;

            }
      }).start();

     return data2;

}

// 分页
function paging1(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode){
    ele = IsEmpty(ele)?false:ele;
    isremove = IsEmpty(isremove)?true:isremove;
    var Title = title;
    $(".case1").html(Title);

    // 第一条数据
    var loadToData = getPaging1(start,end,pageNumber,pageSize,examClass,projectNum,title,isremove,ele,dataCode);
    pageTable1(loadToData);
    $('#paging2').remove();
    if (loadToData.data.pages!=0) {
        $("#pagination_box2").append('<ul id="paging2" class="pagination"></ul>');
        window.pagObj = $('#paging2').twbsPagination({
            totalPages: loadToData.data.pages,//总共页数
            visiblePages: 5,//页码几条
            first: '首页',
            prev: '前一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                var loadToData = getPaging1(start,end,page,pageSize,examClass,projectNum,title,isremove,ele,dataCode);
                pageTable1(loadToData,page,examClass);

            }
        })

    }
}

// 铺分页页面
function pageTable1(loadToData,page,examClass){
    $("#statistics-head").text(" ");
    $("#statistics-tbody").text(" ");
    console.log(loadToData);
    if(typeof(loadToData.data.dataList) != "undefined" && loadToData.data.dataList.length >= 0){
        var data = loadToData.data.dataList;

    };

    var tr,td,td1,td2,td3,td4,td5,td6,td7,add;
    if (examClass == 1) {
        add = '<th style="width: 165px">专家姓名</th><th style="width: 165px">专家工作单位</th>';
    }else if(examClass == 2){
        add = '<th style="width: 165px">第三方名称</th>';
    };


    var str ="";
    str+='<tr id="th-head">';
    str+='<th style="width: 95px">序号</th>';
    str+='<th style="width: 115px">咨询人</th>';
    str+= add;
    str+='<th style="width: 200px;">咨询日期</th>';
    str+='<th style="width: 165px;">反馈日期</th>';
    str+='<th style="width: 165px;">文件标题</th>';
    str+='<th style="width: 450px">项目类型</th>';
    str+='<th style="width: 165px">文号</th>';
    str+='</tr>';

    $("#statistics-head").append(str);


    for(var i=0;i<data.length;i++){

        var z = i +1;
        tr = document.createElement("tr");
        tdindex = document.createElement("td");
        td = document.createElement("td");
        td1 = document.createElement("td");
        td2 = document.createElement("td");
        td3 = document.createElement("td");
        td4 = document.createElement("td");
        td5 = document.createElement("td");
        td6 = document.createElement("td");
        td7 = document.createElement("td");

        tdindex.innerHTML = pageSize * (page-1) + z;
        td.innerHTML = data[i].userName;
        td1.innerHTML = data[i].expertName;
        td2.innerHTML = data[i].unitName;

        var arriveDate = data[i].arriveDate;
        arriveDate = arriveDate.substring(0,10);
        td3.innerHTML = arriveDate;

        var apprDate = data[i].apprDate;
        apprDate = apprDate.substring(0,10);
        td4.innerHTML = apprDate;

        td5.innerHTML = data[i].proFileTitle;
        td6.innerHTML = data[i].projectTypeName;
        td7.innerHTML = data[i].originalNo;

        tr.appendChild(tdindex);
        tr.appendChild(td);
        tr.appendChild(td1);

        if (examClass == 1) {
            tr.appendChild(td2);

        }else if(examClass == 2){

        };

        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        $("#statistics-tbody").append(tr);

    }

}


// 项目咨询情况统计
// 工作汇报常用统计图表





// 督办情况统计 工作量统计 无弹框
var condition = true;

$("#strike16").click(function(){
    if (condition == true) {

        setTimeout("supervise()",10);
        $("body").css("overflow","hidden");
        $(this).siblings('span').html("退出全屏");
        condition = false;
    }else{
        $("body").css("overflow","auto");
        $(this).siblings('span').html("查看详细");
        condition = true;
     }
})

function supervise(){
    $(".supervisebody").text(" ");
    new cmx.process()
        .turn('callajax', {
            url: api_ea + '/eaPubWorkflow/queyrSuperviseStatistics',
            async: false,
            header: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            },
            data: JSON.stringify({
              token: getData('token'),
            }),
            type: 'POST'
        })
        .turn(function (prevModelData, send, abort) {
            if (!IsNull(prevModelData) && prevModelData.state == '200' && !IsEmpty(prevModelData.data) && prevModelData.data != 'null') {
                var data = prevModelData.data;
                var len=data.length;
                var totalx=0;var totaly1=0,totaly2=0,totaly3=0,totaly4=0;
                var sum=[];
                for(var i=0; i<len;i++){
                // 名称
                    var passIntr=document.createElement("tr");
                    var passIntd=document.createElement("td");
                    passIntr.appendChild(passIntd);
                    passIntd.innerHTML=data[i].instName;
                    $(".supervisebody").append(passIntr);
                // 待办
                    var relicExittd=document.createElement("td");
                    relicExittd.innerHTML=data[i].agenda;
                    passIntr.appendChild(relicExittd);
                // 已办
                    var relicBanExittd=document.createElement("td");
                    relicBanExittd.innerHTML=data[i].haveFinished;
                    passIntr.appendChild(relicBanExittd);

                    // 柱状图

                }
                    superviseBar(data);

            }
             send.go();
      }).start();

}
// 督办情况统计












// 算最大值
// 算国本三个图表的最大值
function datasMax(sums,data,callback){
      // 计算出最大值
        var sumsobj = {};
        sumsobj.i = 0;
        var max = sums[0];
        for (var i=0; i<sums.length; i++) {
           if( parseInt(max) < parseInt(sums[i])){
                max = sums[i];
                sumsobj.i=i
           }
        };
        var dataMax = data[sumsobj.i];

        return callback(dataMax);
}


// 计算进出境第二个图表的最大值的城市(三个) 比如:河北 总数
function passInMax(data,provincedata){
    // console.log(provincedata);
    if(provincedata[0].name){
        var maxName = provincedata[0].name;
        var maxValue = provincedata[0].value;
        var dataLen = provincedata.length;
        for (var i = 0; i < dataLen; i++){
            if (provincedata[i].value > maxValue){
                maxName = provincedata[i].name;
                maxValue =  provincedata[i].value
            }
        }

      approvalBar(data,maxName);
    } else {
        return false;
    }

}


