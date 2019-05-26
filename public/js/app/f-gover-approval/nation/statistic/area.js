/*
* @Author: Marte
* @Date:   2018-05-04 11:44:41
* @Last Modified by:   Marte
* @Last Modified time: 2018-07-12 16:28:18
*/

// 进出境2 地图 审核管理处审批数量情况统计
// 算出三个城市为一组的 name value 值 显示的地图和比较最大值的时候都用到
var q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=0,z=0;
function approvalTotal(data){
    if(!IsEmpty(data)){

        var province = [];
        var provincedata = [];

        var total=0,totaly11=0,totaly21=0,totaly31=0,totaly41=0,totaly51=0;

        for(var i=0;i<data.length;i+=4){
            province.push(data.slice(i,i+4));
        }
        for(var i=0,len=province.length;i<len;i++){

             totaly11 = parseInt(province[i][0].relicExit)+parseInt(province[i][0].relicTempEnter)+parseInt(province[i][0].relicTempEnterRepExit)+parseInt(province[i][0].relicTempExit)+parseInt(province[i][0].relicTempExitRepEnter);

             totaly21 = parseInt(province[i][1].relicExit)+parseInt(province[i][1].relicTempEnter)+parseInt(province[i][1].relicTempEnterRepExit)+parseInt(province[i][1].relicTempExit)+parseInt(province[i][1].relicTempExitRepEnter);

             totaly31 = parseInt(province[i][2].relicExit)+parseInt(province[i][2].relicTempEnter)+parseInt(province[i][2].relicTempEnterRepExit)+parseInt(province[i][2].relicTempExit)+parseInt(province[i][2].relicTempExitRepEnter);

            totaly41 = parseInt(province[i][3].relicExit)+parseInt(province[i][3].relicTempEnter)+parseInt(province[i][3].relicTempEnterRepExit)+parseInt(province[i][3].relicTempExit)+parseInt(province[i][3].relicTempExitRepEnter);

             // 计算出没个城市三个的和
            total=parseInt(totaly11)+parseInt(totaly21)+parseInt(totaly31)+parseInt(totaly41);
        // 找对应的name
            var obj = {};
            obj.name = province[i][0].provincesName;
            obj.value = total;
            provincedata.push(obj);


        }

        return provincedata;
    }

}
function approvalDitu(data){

    // 标题上的字
    var joinString;

    if($("#approvalStartDate").val() == "" && $("#approvalEndDate").val() == ""){

        $(".approvalhead tr:eq(0) th").html("国家文物进出境审核管理处审批事项情况统计");

        joinString = "国家文物进出境审核管理处审批事项情况统计";


    }else if($("#approvalStartDate").val() == ""){
        $(".approvalhead tr:eq(0) th").html( "国家文物进出境审核管理处"+$("#approvalEndDate").val()+"之前文物情况统计");

        joinString = "国家文物进出境审核管理处"+$("#approvalEndDate").val()+"之前审批事项情况统计";


    }else if($("#approvalEndDate").val() == ""){
        $(".approvalhead tr:eq(0) th").html("国家文物进出境审核管理处"+$("#approvalStartDate").val()+"至今审批事项情况统计");

        joinString = " 国家文物进出境审核管理处"+$("#approvalStartDate").val()+"至今审批事项情况统计";

    }else{
        $(".approvalhead tr:eq(0) th").html(" 国家文物进出境审核管理处"+$("#approvalStartDate").val() +" 至 "+$("#approvalEndDate").val()+"审批事项情况统计");

        joinString = " 国家文物进出境审核管理处"+$("#approvalStartDate").val() +" 至 "+$("#approvalEndDate").val()+"\n审批事项情况统计";

    };
   // 调用省份列 name value的形式 去显示地图
    var provincedata = approvalTotal(data);
    var splitListArr=[];
    for(var i=0;i<provincedata.length;i++){
        splitListArr.push(provincedata[i].value);
    }
    // 计算出4个维度
    var max = 0,min = 0,amount = 0;fristData=false;
    // 判断是否为一个省份
    var splitList;
    if(!IsEmpty(splitListArr)){

        var maxMin={max:splitListArr[0],min:splitListArr[0]};

        for(i = 0;i < splitListArr.length;i++){

            if(splitListArr[i] != 0){
                if (!fristData){

                    var maxMin={max:splitListArr[i],min:splitListArr[i]};
                    fristData = true;
                }

                if(splitListArr[i] > maxMin.max){
                    maxMin.max = splitListArr[i];
                } else if(maxMin.min > splitListArr[i]){
                    maxMin.min = splitListArr[i];
                }
            }
        }

         max = maxMin.max;//最大值
         min = maxMin.min;//最小值
         amount = parseInt(parseInt(parseInt(max)-parseInt(min))/5);

        if(max == min){
            if(min<1){

                    splitList = [
                        {start: 0, end: max,color:"#fff"},

                    ]
                }else{

                    splitList = [
                        {start: 1, end: max,color:"#f4e7a3"},

                    ]
                }
         }else{
             splitList =  [
                {start: min, end: amount,color:"#f4e7a3"},
                {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                {start: (amount * 4) + 1, end: max,color:"#c1484e"}

            ]

         }
    };


    // 后加的
    $("#passin-tu1").html('');
    $("#passin-tu1").append($('<div id="approval-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

    var approvalDitu = echarts.init(document.getElementById("approval-one-ditu"));
    // 后加的
    var option = {
            title: {
                text: joinString,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
            },
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: splitList,
            },
            visualMap: {
                min: 0,
                max: 5000,
                left: 'left',
                top: 'bottom',
                text: ['数据最高值','数据最低值'],
                calculable: true
            },

            series: [
                {
                    name: '合计',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true,
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:provincedata,

                },
            ]
        };

        approvalDitu.clear();
        approvalDitu.setOption(option);


        approvalDitu.on("click",function(ele){

         var workDate = data;

        // 调用我的饼图
        approvalBar(workDate,ele);

    })
}

// 进出境2 显示柱状图 审核管理处审批数量情况统计
function approvalEcharts(data){
    if(!IsEmpty(data)){

        var approvaldata=[];
        var approvaldata1=[];
        var approvaldata2=[];
        var approvaldata3=[];
        var approvaldata4=[];
        var total=0;
        for(var i=0;i<data.length;i++){
            approvaldata.push(data[i].relicExit);
            approvaldata1.push(data[i].relicTempEnter);
            approvaldata2.push(data[i].relicTempEnterRepExit);
            approvaldata3.push(data[i].relicTempExit);
            approvaldata4.push(data[i].relicTempExitRepEnter);
        };
    }

       // 标题上的子
    var joinString1;

    if($("#approvalStartDate").val() == "" && $("#approvalEndDate").val() == ""){


        joinString1 = "国家文物进出境审核"+ data[0].provincesName+"管理处审批事项情况统计";



    }else if($("#approvalStartDate").val() == ""){


        joinString1 = "国家文物进出境审核"+ data[0].provincesName+"管理处"+$("#approvalEndDate").val()+"之前审批事项情况统计";



    }else if($("#approvalEndDate").val() == ""){

        joinString1 = " 国家文物进出境审核"+ data[0].provincesName+"管理处"+$("#approvalStartDate").val()+"至今审批事项情况统计";


    }else{


        joinString1 = " 国家文物进出境审核"+ data[0].provincesName+"管理处"+$("#approvalStartDate").val() +" 至 "+$("#approvalEndDate").val()+"\n审批事项情况统计";
    };

    $('#approval-one-bar'+q).before('<div id="approval-one-bar'+(++q)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');

    if(q>0){
        $("#approval-one-bar"+(q-1)).remove();
    }

    var approvalEcharts = echarts.init(document.getElementById("approval-one-bar"+q));


    var option = {
        title : {
            text: joinString1,
            x:'center',
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['文物出境(不含复出境)', '文物临时进境','文物临时进境复出境','文物临时出境','文物临时出境复进境'],
            top:50
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top:"30%",
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['受理件数','时限内办结','逾期办理件数',"未逾期未办结件数"]
        },
        series: [
            {
                name: '文物出境(不含复出境)',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideLeft',
                        formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        } else {
                            return '';
                            }
                        }
                    }
                },
                data: approvaldata
            },
            {
                name: '文物临时进境',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideLeft',
                        formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        } else {
                            return '';
                            }
                        }
                    }
                },
                data: approvaldata1
            },
            {
                name: '文物临时进境复出境',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideLeft',
                        formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        } else {
                            return '';
                            }
                        }

                    }
                },
                data: approvaldata2
            },
            {
                name: '文物临时出境',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideLeft',
                        formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        } else {
                            return '';
                            }
                        }
                    }
                },
                data: approvaldata3
            },
            {
                name: '文物临时出境复进境',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideLeft',
                        formatter: function(params) {
                        if (params.value > 0) {
                            return params.value;
                        } else {
                            return '';
                            }
                        }
                    }
                },
                data: approvaldata4
            }
        ]
    };

    approvalEcharts.setOption(option);

}
// 进出境2 获取柱状图的数据 审核管理处审批数量情况统计
//去显示城市的三个数据 例如河北的三个数据
function approvalBar(workDate,ele){

    if(!IsEmpty(workDate)){

        if(typeof(ele.data) != "undefined"){
          ele = ele.data.name;
        }
        // 对应点击的城市显示柱状图
        var passInobj = {};
        passInobj.i = false;
        for(var i=0; i<workDate.length; i++){
            if(typeof(ele) != "undefined"){
                 if(workDate[i].provincesName == ele){
                     passInobj.i = i;
                }
            }

        }
        if (passInobj.i === false) {
         //排除0
            showAlert({
                 type: 'info',
                 content: '此省份暂无数据'
             });
            return false;
        };

        var shouli=workDate[passInobj.i-3];
        var shixian=workDate[passInobj.i-2];
        var yuqi=workDate[passInobj.i-1];
        var weiyuqi = workDate[passInobj.i];
        var data=[shouli,shixian,yuqi,weiyuqi];
        // 调用显示柱状图的echarts
        approvalEcharts(data);
    }

}

// 进出境3 进出境文物质地情况统计 饼图1 复仿制品
//
function characterPie(data){

    if(!IsEmpty(data)){

        var ProvinceData=[
           { name:"文物出境（不含复出境）",value:data[0]},
           { name:"文物临时进境",value:data[1]},
           { name:"文物临时进境复出境",value:data[2]},
           { name:"文物临时出境",value:data[3]},
           { name:"文物临时出境复进境",value:data[4]},
        ];
    }

    var joinString1;

    if($("#characterStartDate").val() == "" && $("#characterEndDate").val() == ""){


        joinString1 = "国家文物进出境审核管理处进出境复仿制品质地情况统计";



    }else if($("#characterStartDate").val() == ""){


        joinString1 = "国家文物进出境审核管理处"+$("#characterEndDate").val()+"之前进出境复仿制品质地情况统计";



    }else if($("#characterEndDate").val() == ""){

        joinString1 = " 国家文物进出境审核管理处"+$("#characterStartDate").val()+"至今进出境复仿制品质地情况统计";


    }else{


        joinString1 = " 国家文物进出境审核管理处"+$("#characterStartDate").val() +" 至 "+$("#characterEndDate").val()+"进出境复仿制品质地情况统计";
    };

    var characterPie = echarts.init(document.getElementById("character-one-pie"));
        var option = {
        title : {
            text: joinString1,
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            left: 'center',
            top:"30",
            data: ['文物出境（不含复出境）','文物临时进境','文物临时进境复出境','文物临时出境','文物临时出境复进境']
        },
        series : [
            {
                name: '详细数据',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:ProvinceData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    characterPie.setOption(option);
}

// 进出境3 进出境文物质地情况统计 文物 饼图2
//
function characterPie1(data){

    if(!IsEmpty(data)){

        var ProvinceData=[
           { name:"文物出境（不含复出境）",value:data[0]},
           { name:"文物临时进境",value:data[1]},
           { name:"文物临时进境复出境",value:data[2]},
           { name:"文物临时出境",value:data[3]},
           { name:"文物临时出境复进境",value:data[4]},
           { name:"文物禁止出境",value:data[5]}
        ];

    }

    var joinString;

    if($("#characterStartDate").val() == "" && $("#characterEndDate").val() == ""){

        $(".characterhead tr:eq(0) th").html("国家文物进出境审核管理处进出境文物质地情况统计");

        joinString = "国家文物进出境审核管理处进出境文物质地情况统计";


    }else if($("#characterStartDate").val() == ""){
        $(".characterhead tr:eq(0) th").html( "国家文物进出境审核管理处"+$("#characterEndDate").val()+"之前进出境文物质地情况统计");

        joinString = "国家文物进出境审核管理处"+$("#characterEndDate").val()+"之前进出境文物质地情况统计";


    }else if($("#characterEndDate").val() == ""){
        $(".characterhead tr:eq(0) th").html("国家文物进出境审核管理处"+$("#characterStartDate").val()+"至今进出境文物质地情况统计");

        joinString = " 国家文物进出境审核管理处"+$("#characterStartDate").val()+"至今进出境文物质地情况统计";

    }else{
        $(".characterhead tr:eq(0) th").html(" 国家文物进出境审核管理处"+$("#characterStartDate").val() +" 至 "+$("#characterEndDate").val()+"进出境文物质地情况统计");

        joinString = " 国家文物进出境审核管理处"+$("#characterStartDate").val() +" 至 "+$("#characterEndDate").val()+"进出境文物质地情况统计";

    };

    var characterPie1 = echarts.init(document.getElementById("character-two-pie"));
        var option = {
        title : {
            text: joinString,
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            left: 'center',
            top:"30",
            data: ['文物出境（不含复出境）','文物临时进境','文物临时进境复出境','文物临时出境','文物临时出境复进境',"文物禁止出境"]
        },
        series : [
            {
                name: '详细数据',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:ProvinceData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    characterPie1.clear();
    characterPie1.setOption(option);
}


// 进出境4 临时进境许可失效情况统计 地图
function loseDitu(data){

    // var loseDitu = echarts.init(document.getElementById("lose-one-ditu"));
    $("#passin-tu2").html('');
    $("#passin-tu2").append($('<div id="lose-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

    var loseDitu = echarts.init(document.getElementById("lose-one-ditu"));
     // 每个省的合计
        var servicedata=[];
        var total=0;
        var splitListArr=[];

        for(var i=0;i<data.length;i++){
            total = parseInt(data[i].taoqi)+parseInt(data[i].ciqi)+parseInt(data[i].boli)+parseInt(data[i].tongqi)+parseInt(data[i].shiqi)+parseInt(data[i].yuqi)+parseInt(data[i].zhuanwa)+parseInt(data[i].zhumu)+parseInt(data[i].sizhi)+parseInt(data[i].qiqi)+parseInt(data[i].guyajiao)+parseInt(data[i].tieqi)+parseInt(data[i].jinqi)+parseInt(data[i].yinqi)+parseInt(data[i].pige)+parseInt(data[i].zhizhi)+parseInt(data[i].qita);
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = total;
            servicedata[i] = obj;
            splitListArr.push(total);

        }
         var max = 0,min = 0,amount = 0;fristData=false;
         var splitList;
        if(!IsEmpty(splitListArr)){

            var maxMin={max:splitListArr[0],min:splitListArr[0]};

            for(i = 0;i < splitListArr.length;i++){

                if(splitListArr[i] != 0){
                    if (!fristData){

                        var maxMin={max:splitListArr[i],min:splitListArr[i]};
                        fristData = true;
                    }

                    if(splitListArr[i] > maxMin.max){
                        maxMin.max = splitListArr[i];
                    } else if(maxMin.min > splitListArr[i]){
                        maxMin.min = splitListArr[i];
                    }
                }
            }

             max = maxMin.max;//最大值
             min = maxMin.min;//最小值
             amount = parseInt(parseInt(parseInt(max)-parseInt(min))/5);
            if(max == min){
                if(min<1){

                    splitList = [
                        {start: 0, end: max,color:"#fff"},

                    ]
                }else{

                    splitList = [
                        {start: 1, end: max,color:"#f4e7a3"},

                    ]
                }
             }else{
                 splitList =  [
                    {start: min, end: amount,color:"#f4e7a3"},
                    {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                    {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                    {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                    {start: (amount * 4) + 1, end: max,color:"#c1484e"}

                ]

             }
        };

        var joinString;

        if($("#loseStartDate").val() == "" && $("#loseEndDate").val() == ""){

            $(".losehead tr:eq(0) th").html("国家文物进出境审核管理处临时进境许可失效情况统计");

            joinString = "国家文物进出境审核管理处临时进境许\n可失效情况统计";


        }else if($("#loseStartDate").val() == ""){
            $(".losehead tr:eq(0) th").html( "国家文物进出境审核管理处"+$("#loseEndDate").val()+"之前临时进境许\n可失效情况统计");

            joinString = "国家文物进出境审核管理处"+$("#loseEndDate").val()+"之前临时进境许\n可失效情况统计";


        }else if($("#loseEndDate").val() == ""){
            $(".losehead tr:eq(0) th").html("国家文物进出境审核管理处"+$("#loseStartDate").val()+"至今临时进境许\n可失效情况统计");

            joinString = " 国家文物进出境审核管理处"+$("#loseStartDate").val()+"至今临时进境许\n可失效情况统计";

        }else{
            $(".losehead tr:eq(0) th").html(" 国家文物进出境审核管理处"+$("#loseStartDate").val() +" 至 "+$("#loseEndDate").val()+"临时进境许\n可失效情况统计");

            joinString = " 国家文物进出境审核管理处"+$("#loseStartDate").val() +" 至 "+$("#loseEndDate").val()+"临时进境许\n可失效情况统计";

        };

    // 每个省的合计

        var option = {
            title: {
                text: joinString,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
            },
            //添加的颜色四个范围
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: splitList,
            },
            visualMap: {
                min: 0,
                max: 100,
                left: 'left',
                top: 'bottom',
                text: ['数据最高值','数据最低值'],           // 文本，默认为数值文本
                calculable: true
            },

            series: [
                {
                    name: '合计',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    // selectedMode : 'multiple', //暂时不要 有逻辑问题
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:servicedata,
                },
            ]
        };

        loseDitu.clear();
        setTimeout(loseDitu.setOption(option),1000);

        loseDitu.on("click",function(ele){

            // 调用我的饼图
            losePie(data,ele);

    })
}

// 进出境4 临时进境许可失效情况统计 地图


// 进出境4 临时进境许可失效情况统计 饼图
function losemoren(data){

    if(!IsEmpty(data)){

        var ProvinceData=[
           { name:"陶器",value:data.taoqi},
           { name:"瓷器",value:data.ciqi},
           { name:"玻璃",value:data.boli},
           { name:"铜器",value:data.tongqi},
           { name:"石器",value:data.shiqi},
           { name:"玉器",value:data.yuqi},
           { name:"砖瓦",value:data.zhuanwa},
           { name:"竹木",value:data.zhumu},
           { name:"丝织",value:data.sizhi},
           { name:"漆器",value:data.qiqi},
           { name:"骨牙角",value:data.guyajiao},
           { name:"铁器",value:data.tieqi},
           { name:"金器",value:data.jinqi},
           { name:"银器",value:data.yinqi},
           { name:"皮革",value:data.pige},
           { name:"纸质",value:data.zhizhi},
           { name:"其他",value:data.qita},
        ];
    }

    var joinString1;

    if($("#loseStartDate").val() == "" && $("#loseEndDate").val() == ""){


        joinString1 = "国家文物进出境审核"+data.provincesName+"管理处临时进境许\n可失效情况统计";



    }else if($("#loseStartDate").val() == ""){


        joinString1 = "国家文物进出境审核"+data.provincesName+"管理处"+$("#loseEndDate").val()+"之前临时进境许\n可失效情况统计";



    }else if($("#loseEndDate").val() == ""){

        joinString1 = " 国家文物进出境审核"+data.provincesName+"管理处"+$("#loseStartDate").val()+"至今临时进境许\n可失效情况统计";


    }else{


        joinString1 = " 国家文物进出境审核"+data.provincesName+"管理处"+$("#loseStartDate").val() +" 至 "+$("#loseEndDate").val()+"临时进境许\n可失效情况统计";
    };

    $('#lose-one-pie'+r).before('<div id="lose-one-pie'+(++r)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
    if(r>0){
        $("#lose-one-pie"+(r-1)).remove();
    }
    var losemoren = echarts.init(document.getElementById("lose-one-pie"+r));

        var option = {
        title : {
            text: joinString1,
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // left: 'center',
            // top:"50",
            orient: 'vertical',
            right: 10,
            top: 50,
            bottom: 20,
            data: ['陶器','瓷器','玻璃','铜器','石器','玉器','砖瓦','竹木','丝织','漆器','骨牙角','铁器','金器','银器','皮革','纸质','其他'],
            selected: {

                    '漆器': false,
                    '骨牙角': false,
                    '铁器': false,
                    '金器': false,
                    '银器': false,
                    '皮革': false,
                    '纸质': false,
                    '其他': false,
                }
        },
        series : [
            {
                name: '详细数据',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:ProvinceData,
                minAngle:15,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    setTimeout(losemoren.setOption(option), 1000);
}
// 进出境4 临时进境许可失效情况统计 饼图

// 进出境4 临时进境许可失效情况统计 点击饼图
function losePie(data,ele){
    // 对应点击的城市显示饼图
    if(!IsEmpty(data)){

        var passInobj = {};
        passInobj.i = false;
        for(var i=0; i<data.length; i++){
            if(typeof(ele.data) != "undefined"){
                 if(data[i].provincesName == ele.data.name){
                     passInobj.i = i;
                }
            }

        }
        if (passInobj.i === false) { //排除0
             showAlert({
                 type: 'info',
                 content: '此省份暂无数据'
             });
            return false;
        };

        var Province = data[passInobj.i];

        // 调用显示柱状图的echarts
        losemoren(Province);
    }
}
// 进出境4 临时进境许可失效情况统计 点击饼图

// 进出境5 出入境申请目的 地图
function goalDitu(data){
    // 标题上的字
    var joinString;

    if($("#goalStartDate").val() == "" && $("#goalEndDate").val() == ""){

        $(".goalhead tr:eq(0) th").html("国家文物进出境审核管理处出入境申请目的统计");

        joinString = "国家文物进出境审核管理处出入境申请目的统计";


    }else if($("#goalStartDate").val() == ""){
        $(".goalhead tr:eq(0) th").html( "国家文物进出境审核管理处"+$("#goalEndDate").val()+"之前出入境申请目的统计");

        joinString = "国家文物进出境审核管理处"+$("#goalEndDate").val()+"之前出入境申请目的统计";


    }else if($("#goalEndDate").val() == ""){
        $(".goalhead tr:eq(0) th").html("国家文物进出境审核管理处"+$("#goalStartDate").val()+"至今出入境申请目的统计");

        joinString = " 国家文物进出境审核管理处"+$("#goalStartDate").val()+"至今出入境申请目的统计";

    }else{
        $(".goalhead tr:eq(0) th").html(" 国家文物进出境审核管理处"+$("#goalStartDate").val() +" 至 "+$("#goalEndDate").val()+"出入境申请目的统计");

        joinString = " 国家文物进出境审核管理处"+$("#goalStartDate").val() +" 至 "+$("#goalEndDate").val()+"\n出入境申请目的统计";

    };

    $("#passin-tu3").html('');
    $("#passin-tu3").append($('<div id="goal-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

    var goalDitu = echarts.init(document.getElementById("goal-one-ditu"));
     // 每个省的合计
        var servicedata=[];
        var total=0;
        var splitListArr=[];

        for(var i=0;i<data.length;i++){
            total = parseInt(data[i].exitPerson)+parseInt(data[i].tempExitExhi)+parseInt(data[i].tempEnterExhi)+parseInt(data[i].sc)+parseInt(data[i].jy)+parseInt(data[i].xs)+parseInt(data[i].xf)+parseInt(data[i].ky)+parseInt(data[i].zl)+parseInt(data[i].qt);
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = total;
            servicedata[i] = obj;
            splitListArr.push(total);

        }
          // 计算出4个维度
        var max = 0,min = 0,amount = 0;fristData=false;
        var splitList;
        if(!IsEmpty(splitListArr)){

            var maxMin={max:splitListArr[0],min:splitListArr[0]};

            for(i = 0;i < splitListArr.length;i++){

                if(splitListArr[i] != 0){
                    if (!fristData){

                        var maxMin={max:splitListArr[i],min:splitListArr[i]};
                        fristData = true;
                    }

                    if(splitListArr[i] > maxMin.max){
                        maxMin.max = splitListArr[i];
                    } else if(maxMin.min > splitListArr[i]){
                        maxMin.min = splitListArr[i];
                    }
                }
            }

             max = maxMin.max;//最大值
             min = maxMin.min;//最小值
             amount = parseInt(parseInt(parseInt(max)-parseInt(min))/5);
            if(max == min){
                if(min<1){

                    splitList = [
                        {start: 0, end: max,color:"#fff"},

                    ]
                }else{

                    splitList = [
                        {start: 1, end: max,color:"#f4e7a3"},

                    ]
                }

             }else{
                 splitList =  [
                    {start: min, end: amount,color:"#f4e7a3"},
                    {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                    {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                    {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                    {start: (amount * 4) + 1, end: max,color:"#c1484e"}

                ]

             }
        };

        // 每个省的合计

        var option = {
            title: {
                text: joinString,
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
            },
            //添加的颜色四个范围
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: splitList,
            },
            visualMap: {
                min: 0,
                max: 100,
                left: 'left',
                top: 'bottom',
                text: ['数据最高值','数据最低值'],           // 文本，默认为数值文本
                calculable: true
            },

            series: [
                {
                    name: '合计',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:servicedata,
                },
            ]
        };

        goalDitu.clear();
        setTimeout(goalDitu.setOption(option),1000);
        // goalDitu.setOption(option);

        goalDitu.on("click",function(ele){

            // 调用我的饼图
            goalPie(data,ele);

    })
}
// 进出境5 出入境申请目的 地图

// 进出境5 出入境申请目的 雷达
function goalmoren(data){
    if(!IsEmpty(data)){

        // 雷达图的数据
        var goalValue=[
            data.tempEnterExhi,
            data.sc,
            data.jy,
            data.xs,
            data.xf,
            data.ky,
            data.zl,
            data.qt,
        ];
    }

    // 标题上的子
    var joinString1;

    if($("#goalStartDate").val() == "" && $("#goalEndDate").val() == ""){


        joinString1 = "国家文物进出境审核"+data.provincesName+"管理处出入境申请目的统计";



    }else if($("#goalStartDate").val() == ""){


        joinString1 = "国家文物进出境审核"+data.provincesName+"管理处"+$("#goalEndDate").val()+"之前出入境申请目的统计";



    }else if($("#goalEndDate").val() == ""){

        joinString1 = " 国家文物进出境审核"+data.provincesName+"管理处"+$("#goalStartDate").val()+"至今出入境申请目的统计";


    }else{


        joinString1 = " 国家文物进出境审核"+data.provincesName+"管理处"+$("#goalStartDate").val() +" 至 "+$("#goalEndDate").val()+"出入境申请目的统计";
    };

    // 出入境标题
    $("#passIntitle").html(joinString1);

    // 文物出境 文物临时出境
    $(".aimTextspan").html(data.exitPerson) ;
    $(".aimTextspan1").html(data.tempExitExhi) ;


     $('#goal-one-radar'+s).before('<div id="goal-one-radar'+(++s)+'" class="col-xs-8 col-md-8 col-lg-8" style="height:400px"></div>');
    if(s>0){
        $("#goal-one-radar"+(s-1)).remove();
    }


    var goalmoren=echarts.init(document.getElementById("goal-one-radar"+s));
    var option = {
        title: {
            // text: joinString1,
            left: 'center'
        },
         tooltip : {
            trigger: 'item',
        },
        radar: [
            {
                indicator: [
                    { text: '展览申请' },
                    { text: '个人携带收藏' },
                    { text: '个人携带拍卖' },
                    { text: '个人携带销售' },
                    { text: '个人携带修复' },
                    { text: '个人携带科研' },
                    { text: '个人携带展览' },
                    { text: '个人携带其他' },
                ],
                center: ['50%', '50%'],
                radius: 80,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter:'【{value}】',
                    textStyle: {
                        color:'#72ACD1'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(114, 172, 209, 0.2)',
                        'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                        'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },
        ],
        series: [
        // 临时出境目的
            {
                name: '文物临时进境',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [
                    {
                        value: goalValue,
                        name: '文物临时进境',
                        symbol: 'rect',
                        // symbolSize: 5,
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        }
                    },
                ]
            },
        ]
    }
    goalmoren.clear();
    setTimeout(goalmoren.setOption(option,true),1000);
}
// 进出境5 出入境申请目的 雷达

// 进出境5 出入境申请目的 点击雷达
function goalPie(data,ele){
    // 对应点击的城市显示雷达图
    if(!IsEmpty(data)){

        var passInobj = {};
        passInobj.i = false;
        for(var i=0; i<data.length; i++){
            if(typeof(ele.data) != "undefined"){
                 if(data[i].provincesName == ele.data.name){
                     passInobj.i = i;
                }
            }else{
                showAlert({
                     type: 'info',
                     content: '此省份暂无数据'
                 });
                return false;
            }

        }
        if (passInobj.i === false) { //排除0
             showAlert({
                 type: 'info',
                 content: '此省份暂无数据'
             });
            return false;
        };

        var Province = data[passInobj.i];
        // 调用显示柱状图的echarts
        goalmoren(Province);
    }
}
// 进出境5 出入境申请目的 点击雷达


// 文保资质单位信息统计 地图
function aptitudeDitu(data){

    $("#passin-tu4").html('');
    $("#passin-tu4").append($('<div id="aptitude-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

    var aptitudeDitu = echarts.init(document.getElementById("aptitude-one-ditu"));

     // 每个省的合计
        var servicedata=[];
        var total=0;
        var splitListArr=[];

        for(var i=0;i<data.length;i++){
            total = parseInt(data[i].unitQualiDesignCount)+parseInt(data[i].unitQualiBuildCount)+parseInt(data[i].unitQualiWatchCount)+parseInt(data[i].qualiCount)+parseInt(data[i].qualiUnitCount);
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = total;
            servicedata[i] = obj;
            splitListArr.push(total);

        }
        var max = 0,min = 0,amount = 0;fristData=false;
        if(!IsEmpty(splitListArr)){

            var maxMin={max:splitListArr[0],min:splitListArr[0]};

            for(i = 0;i < splitListArr.length;i++){

                if(splitListArr[i] != 0){
                    if (!fristData){

                        var maxMin={max:splitListArr[i],min:splitListArr[i]};
                        fristData = true;
                    }

                    if(splitListArr[i] > maxMin.max){
                        maxMin.max = splitListArr[i];
                    } else if(maxMin.min > splitListArr[i]){
                        maxMin.min = splitListArr[i];
                    }
                }
            }

             max = maxMin.max;//最大值
             min = maxMin.min;//最小值
             amount = parseInt(parseInt(parseInt(max)-parseInt(min))/5);
        };

        // 每个省的合计

        var option = {
            title: {
                text: '文保资质单位信息统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
            },
            //添加的颜色四个范围
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: [
                    {start: min, end: amount,color:"#f4e7a3"},
                    {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                    {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                    {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                    {start: (amount * 4) + 1, end: max,color:"#c1484e"}

                ],
            },
            visualMap: {
                min: 0,
                max: 100,
                left: 'left',
                top: 'bottom',
                text: ['数据最高值','数据最低值'],           // 文本，默认为数值文本
                calculable: true
            },

            series: [
                {
                    name: '合计',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:servicedata,
                },
            ]
        };
        aptitudeDitu.clear();
        aptitudeDitu.setOption(option);

        aptitudeDitu.on("click",function(ele){
            // 调用我的雷达图
            aptitudeRadar(data,ele);

    })
}
// 文保资质单位信息统计 地图

// 文保资质单位信息统计 雷达图
function aptitudemoren(data){

    var museumValue=[
        data.unitQualiDesignCount,
        data.unitQualiBuildCount,
        data.unitQualiWatchCount,
        data.qualiCount,
        data.qualiUnitCount,
    ];

    $('#aptitude-one-radar'+t).before('<div id="aptitude-one-radar'+(++t)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
    if(t>0){
        $("#aptitude-one-radar"+(t-1)).remove();
    }
    var aptitudeRadar=echarts.init(document.getElementById("aptitude-one-radar"+t));
    var option = {
        title: {
            text: data.provincesName + '文保资质单位信息统计详细数据',
            left:"center"
        },
        tooltip : {
            trigger: 'item',
        },
        radar: [
            {
                indicator: [
                    { text: '斟察甲级资质' },
                    { text: '施工一级资质' },
                    { text: '监理甲级资质' },
                    { text: '资质数量' },
                    { text: '资质单位数量' }
                ],
                center: ['50%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter:'【{value}】',
                    textStyle: {
                        color:'#72ACD1'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(114, 172, 209, 0.2)',
                        'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                        'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },

        ],
        series: [
            {
                name: '文保资质单位信息统计',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        // color: 各异,
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [
                    {
                        value: museumValue,
                        name: '文保资质单位信息统计',
                        symbol: 'rect',
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        }
                    },
                ]
            },

        ]
    }
    aptitudeRadar.clear();
    aptitudeRadar.setOption(option,true);
}
// 文保资质单位信息统计 雷达图

// 文保资质单位信息统计 点击出现雷达图
function aptitudeRadar(data,ele){
    var passInobj = {};
    passInobj.i = false;
    for(var i=0; i<data.length; i++){
        if(typeof(ele.data) != "undefined"){
             if(data[i].provincesName == ele.data.name){
                 passInobj.i = i;
            }
        }

    }
    if (passInobj.i === false) { //排除0
        showAlert({
                 type: 'info',
                 content: '此省份暂无数据'
             });
        return false;
    };
    var Province = data[passInobj.i];
    // 调用显示柱状图的echarts
    aptitudemoren(Province);
}
// 文保资质单位信息统计 点击出现雷达图

// 考古领队信息统计 柱状图
function leaderBar(data){
    var x = [];
    var y = [];
    for(var i=0;i<data.length;i++){
        x.push(data[i].ageLayer);
        y.push(data[i].peopleNumber);
    }

    var leaderBar=echarts.init(document.getElementById("leader-one-bar"));

    var option = {
        color: ['#3398DB'],
        title:{
            text: "考古领队年龄情况",
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : x,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                barWidth: '60%',
                data:y
            }
        ]
    };
    leaderBar.clear();
    leaderBar.setOption(option);
}
// 考古领队信息统计 柱状图

// 考古发掘项目情况统计 地图
function digDitu(data){

        var digDitu = echarts.init(document.getElementById("dig-one-ditu"));
        // 每个省的合计
        var servicedata=[];
        var total=0;
        var splitListArr=[];

        for(var i=0;i<data.length;i++){
            total = parseInt(data[i].projectTotal);
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = total;
            servicedata[i] = obj;
            splitListArr.push(total);

        }

        // 计算出4个维度
        var max = 0,min = 0,amount = 0;fristData=false;
        var splitList1;
        if(!IsEmpty(splitListArr)){

            var maxMin={max:splitListArr[0],min:splitListArr[0]};

            for(i = 0;i < splitListArr.length;i++){

                if(splitListArr[i] != 0){
                    if (!fristData){

                        var maxMin={max:splitListArr[i],min:splitListArr[i]};
                        fristData = true;
                    }

                    if(splitListArr[i] > maxMin.max){
                        maxMin.max = splitListArr[i];
                    } else if(maxMin.min > splitListArr[i]){
                        maxMin.min = splitListArr[i];
                    }
                }
            }

             max = maxMin.max;//最大值
             min = maxMin.min;//最小值
             amount = parseInt(parseInt(parseInt(max)-parseInt(min))/5);

            if(max == min){
                if(min<1){

                    max == max;
                    splitList1 = [
                        {start: 0, end: max,color:"#f4e7a3"},

                    ]
                }else{
                    max == max;
                    splitList1 = [
                        {start: 1, end: max,color:"#f4e7a3"},

                    ]
                }
             }else{
                 splitList1 =  [
                    {start: min, end: amount,color:"#f4e7a3"},
                    {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                    {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                    {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                    {start: (amount * 4) + 1, end: max,color:"#c1484e"}

                ]


            }
        };

        var joinString;

        if($("#year").val() == "") {

            $(".dighead tr:eq(0) th").html("2016年考古发掘项目情况统计");

            joinString = "考古发掘项目情况统计";


        }else{
            $(".dighead tr:eq(0) th").html($("#year").val() +"年考古发掘项目情况统计");

            joinString = $("#year").val() + "年考古发掘项目情况统计";

        };
        // 每个省的合计

        var option = {
            title: {
                text: joinString,
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params,datas){

                var name = params.name;
                var res='';
                for(var i = 0;i<data.length;i++){
                  var a = data[i].projectTotal==''?"0":data[i].projectTotal;
                  var b = data[i].initProjectTotal==''?"0":data[i].initProjectTotal;
                  var c = data[i].areaTotal==''?"0":data[i].areaTotal;
                  var d = data[i].initAreaTotal==''?"0":data[i].initAreaTotal;
                  var e = data[i].tombsTotal==''?"0":data[i].tombsTotal;
                  var f = data[i].initTombsTotal==''?"0":data[i].initTombsTotal;
                  // console.log(data[i].dataName+"+++"+name+"+++"+(data[i].dataName == name));
                    if(data[i].provincesName == name){
                        res = "详细信息<br>项目总数:"+a+"<br>主动项目数:"+b+"<br>发掘总面积:"+c+"<br>主动发掘项目面积:"+d+"<br>总墓葬数:"+e+"<br>主动项目墓葬数:"+f;//设置自定义数据的模板，这里的模板是图片
                        // console.log(res);
                        break;
                    }
                }
                // console.log(res);
                return res;
            },
            },
            //添加的颜色四个范围
            dataRange: {
                x: 'left',
                y: 'bottom',
                splitList: splitList1,
            },
            visualMap: {
                min: 0,
                max: 100,
                left: 'left',
                top: 'bottom',
                text: ['数据最高值','数据最低值'],           // 文本，默认为数值文本
                calculable: true
            },

            series: [
                {
                    name: '合计',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:servicedata,

                },
            ]
        };
        digDitu.clear();
        digDitu.setOption(option);

}
// 考古发掘项目情况统计 地图

// 文物行政审批情况统计


//不可移动数据整理 no1
function mustnotDataArrange(data){
    // 每个省的合计

        var servicedata=[];

        if(IsEmpty(data)){
            var obj = new Object();
            obj.name = 0;
            obj.value = 0;
            servicedata.push(obj);
        }

        for(var i=0;i<data.length;i++){
            var total=0;
            total = parseInt(data[i].fiveSixFourApply)+parseInt(data[i].fiveSixFiveApply)+parseInt(data[i].fiveSixTenApply)+parseInt(data[i].fiveSixTwelveApply)+parseInt(data[i].fiveSixFourTeenApply)+parseInt(data[i].fiveSixTwentyTwoApply);
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = total;
            // servicedata[i] = obj;

            var splitListLength = servicedata.length;
            var findRes = false;
            for (var j = 0;j < splitListLength; j++){
                if(typeof(servicedata[j]) != 'undefined' && servicedata[j].name == data[i].provincesName){
                    servicedata[j].value += total;
                    findRes = true;
                }
            }
            if (!findRes){
                servicedata.push(obj);
            }

        }

        // 不可移动 调用地图
        mustnotDitu(data,servicedata);
        mustnotmoren(data,servicedata);

}
// 不可移动文物行政申报情况 地图 no2
function mustnotDitu(data,servicedata){

    $("#nomove").html('');
        $("#nomove").append($('<div id="mustnot-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));
    var mustnotDitu = echarts.init(document.getElementById("mustnot-one-ditu"));
    // 计算出4个维度
    // 计算最大值最小值
        var max = 0,min = 0,amount = 0;fristData=false;
        var splitList;
        if(!IsEmpty(servicedata)){

            var maxMin={max:servicedata[0].value,min:servicedata[0].value};

            for(i = 0;i < servicedata.length;i++){

                if(servicedata[i].value!= 0){
                    if (!fristData){

                        var maxMin={max:servicedata[i].value,min:servicedata[i].value};
                        fristData = true;
                    }

                    if(servicedata[i].value > maxMin.max){
                        maxMin.max = servicedata[i].value;
                    } else if(maxMin.min > servicedata[i].value){
                        maxMin.min = servicedata[i].value;
                    }
                }
            }


         max = maxMin.max;//最大值
         min = maxMin.min;//最小值
         amount = Math.ceil(parseInt(parseInt(max)-parseInt(min))/5);
         if(max == min){
             if(min<1){

                    splitList = [
                        {start: 0, end: max,color:"#fff"},

                    ]
                }else{

                    splitList = [
                        {start: 1, end: max,color:"#f4e7a3"},

                    ]
                }
         }else{
             splitList =  [
                {start: min, end: amount,color:"#f4e7a3"},
                {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                {start: (amount * 4) + 1, end: max,color:"#c1484e"}

            ]

         }
        };

        var joinString;

        if($("#mustnotStartDate").val() == "" && $("#mustnotEndDate").val() == ""){

            $(".mustnothead tr:eq(0) th").html("不可移动文物行政审批情况统计");

            joinString = "不可移动文物行政审批情况统计";


        }else if($("#mustnotStartDate").val() == ""){
            $(".mustnothead tr:eq(0) th").html( $("#mustnotEndDate").val()+"之前不可移动文物行政审批情况统计");

            joinString = $("#mustnotEndDate").val()+"之前不可移动文物行政审批情况统计";


        }else if($("#mustnotEndDate").val() == ""){
            $(".mustnothead tr:eq(0) th").html($("#mustnotStartDate").val()+"至今不可移动文物行政审批情况统计");

            joinString = $("#mustnotStartDate").val()+"至今不可移动文物行政审批情况统计";

        }else{
            $(".mustnothead tr:eq(0) th").html($("#mustnotStartDate").val() +" 至 "+$("#mustnotEndDate").val()+"不可移动文物行政审批情况统计");

            joinString = $("#mustnotStartDate").val() +" 至 "+$("#mustnotEndDate").val()+"不可移动文物行政审批情况统计";

        };
    // 每个省的合计
    var option = {
        title: {
            text: joinString,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
        },
        //添加的颜色四个范围
        dataRange: {
            x: 'left',
            y: 'bottom',
            splitList: splitList,
        },
        visualMap: {
            min: 0,
            max: 100,
            left: 'left',
            top: 'bottom',
            text: ['数据最高值','数据最低值'],           // 文本，默认为数值文本
            calculable: true
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: true},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '合计',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                zoom:1.1,
                data:servicedata,
            },
        ]
    };

    mustnotDitu.clear();
    mustnotDitu.setOption(option);

    mustnotDitu.on("click",function(ele){
        // 调用我的雷达图

        mustnotmoren(data,ele,1);
    })
}

//不可移动排序 no3 柱状图调用他
function sortUnmovable(data,provincesName){

    var provincesDataArr = [];
    var dataLen = data.length;
    var res = [];
    for(var i=0;i<data.length;i++){
        if(data[i].provincesName == provincesName){
            data[i].sum = parseInt(data[i].fiveSixFourApply)+parseInt(data[i].fiveSixFiveApply)+parseInt(data[i].fiveSixTenApply)+parseInt(data[i].fiveSixTwelveApply)+parseInt(data[i].fiveSixFourTeenApply)+parseInt(data[i].fiveSixTwentyTwoApply);
            provincesDataArr.push(data[i]);
        }
    }

    var provincesDataArrLen = provincesDataArr.length;
    for(var j = 1;j <  provincesDataArrLen;j++){
        for(var k = 0; k < provincesDataArrLen-j; k++){
            if(provincesDataArr[k].sum < provincesDataArr[k+1].sum){
                var temp = provincesDataArr[k];
                provincesDataArr[k] = provincesDataArr[k+1];
                provincesDataArr[k+1] = temp;
            }
        }
    }

    return provincesDataArr; //排出顺序
}

// 不可移动文物行政申报情况 点击出现的柱状图
// 不可移动文物行政申报情况 柱状图 最后
function mustnotmoren(data,servicedata,type){
    type = IsEmpty(type)?0:type;
    // console.log(servicedata);

    var dataLen = 10;//显示省份数据
    // 没点击之前
    var dataMaxprovinces = '';

    if(!IsEmpty(data)){

        if(type == 0){
            var sumIndex = 0;
            var max = servicedata[0].value;
            for (var i=0; i<servicedata.length; i++) {
               if( parseInt(max) < parseInt(servicedata[i].value)){
                    max = servicedata[i].value;
                    sumIndex=i
               }
            };
                dataMaxprovinces = data[sumIndex].provincesName;//最多国宝单位的省份
        } else { //点击之后
            if(typeof(servicedata.data) != "undefined" && servicedata.data.name){
                dataMaxprovinces = servicedata.data.name;
            } else {
                  showAlert({
                        type: 'info',
                        content: "此省份暂无数据"
                    })
                return false;

            }
        }
    }

    // dataMaxprovinces没有点击之前就是最多的数量的省份 点击之后就是点击的省份
    var data = sortUnmovable(data,dataMaxprovinces);
    if(data.length < dataLen){
        dataLen = data.length;
    }
    var nationalName=[];
    var optionSeries = [];
    var optionData = [];
    var optionName = ['全国重点文物保护单位原址保护措施审批申请数','省级和全国重点文物保护单位保护范围内其他建设工程或者爆破、钻探、挖掘等作业审批申请数',"省级文物保护单位的迁移或拆除审批申请数","全国重点文物保护单位建设控制地带内建设工程设计方案审批申请数","全国重点文物保护单位修缮审批申请数","全国重点文物保护单位保护规划审批申请数"];
    //拼装option中的series
    for(var i=0;i<dataLen;i++){
            for (j = 0; j < optionName.length; j++){
                if(typeof(optionData[j]) == 'undefined'){
                    optionData[j] = [];
                }
                switch(j)
                {
                    case 0:
                    optionData[j].unshift(data[i].fiveSixFourApply);
                    break;
                    case 1:
                    optionData[j].unshift(data[i].fiveSixFiveApply);
                    break;
                    case 2:
                    optionData[j].unshift(data[i].fiveSixTenApply);
                    break;
                    case 3:
                    optionData[j].unshift(data[i].fiveSixTwelveApply);
                    break;
                    case 4:
                    optionData[j].unshift(data[i].fiveSixFourTeenApply);
                    break;
                    case 5:
                    optionData[j].unshift(data[i].fiveSixTwentyTwoApply);
                    break;
                }
            }
              // optionSeries
            nationalName.unshift(data[i].protectUnitName);
    }

    // 把数组倒过来
    // var nationalName = nationalName.sort();
    // console.log(nationalName);
    for (k = 0; k < optionName.length; k++){
        // if (k%2 == 0){
        //     var optionStack = '通过';
        // } else {
        //     var optionStack = '不通过';
        // }
        var optionApply = {
            name: optionName[k],
            type: 'bar',
            stack: "通过",
            label: {
                normal: {
                    show: true,
                    position: 'insideRight',
                    formatter: function(params) {
                    if (params.value > 0) {
                        return params.value;
                    } else {
                        return '';
                        }
                    }
                }
            },
            data: optionData[k]
        };
        optionSeries.push(optionApply);
    }

        var joinString1;

        if($("#mustnotStartDate").val() == "" && $("#mustnotEndDate").val() == ""){



            joinString1 = dataMaxprovinces+"不可移动文物行政审批情况统计";


        }else if($("#mustnotStartDate").val() == ""){


            joinString1 = $("#mustnotEndDate").val()+"之前"+dataMaxprovinces+"不可移动文物行政审批情况统计";


        }else if($("#mustnotEndDate").val() == ""){


            joinString1 = $("#mustnotStartDate").val()+"至今"+dataMaxprovinces+"不可移动文物行政审批情况统计";

        }else{


            joinString1 = $("#mustnotStartDate").val() +" 至 "+$("#mustnotEndDate").val()+""+dataMaxprovinces+"不可移动文物行政审批情况统计";

        };


    $('#mustnot-one-bar'+x).before('<div id="mustnot-one-bar'+(++x)+'" class="col-xs-12 col-md-12 col-lg-12 margin-top-20 margin-bottom-40" style="height:400px"></div>');
    if(x>0){
        $("#mustnot-one-bar"+(x-1)).remove();
    }
    var mustnotmoren = echarts.init(document.getElementById("mustnot-one-bar"+x));
    var option = {
        title: {
            text: joinString1,
            left:"center",
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            top:"25px",
            data: optionName,
        },
        grid: {
            left: '0%',
            right: '4%',
            top: '20%',
            bottom: '8%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: nationalName
        },
        series: optionSeries
    };
    mustnotmoren.setOption(option);
}
// 不可移动文物行政申报情况 柱状图




// 可移动数据整理 每个省份的数相加
function mustmoveDataArrange(data){
    // 每个省的合计
     var servicedata=[];

      if(IsEmpty(data)){
        var obj = new Object();
        obj.name = 0;
        obj.value = 0;
        servicedata.push(obj);
    }
    for(var i=0;i<data.length;i++){
        var total=0;
        total = parseInt(data[i].fiveSixFifteenApply)+parseInt(data[i].fiveSixSixteenApply)+parseInt(data[i].fiveSixNineteenApply);
        var obj = new Object();
        obj.name = data[i].provincesName;
        obj.value = total;
        obj.itemCode =  data[i].itemCode;

        var splitListLength = servicedata.length;
        var findRes = false;
        for (var j = 0;j < splitListLength; j++){
            if(typeof(servicedata[j]) != 'undefined' && servicedata[j].name == data[i].provincesName){
                servicedata[j].value += total;
                findRes = true;
            }
        }
        if (!findRes){
            servicedata.push(obj);
        }

    }
    // 可移动 调用地图

   setTimeout(function(){
        mustmoveDitu2(data,servicedata);
    },500);

    setTimeout(function(){

        mustmovemoren(data,servicedata);


    },500);
    setTimeout(function(){

        Provinceranked(data,servicedata);


    },500);
}
// 可移动数据整理

// 可移动数据整理 数据整理 排序
function sortUnmovable1(data,provincesName){

    var provincesDataArr = [];
    var dataLen = data.length;
    var res = [];
    for(var i=0;i<data.length;i++){
        if(data[i].provincesName == provincesName){
            data[i].sum = parseInt(data[i].fiveSixFifteenApply)+parseInt(data[i].fiveSixSixteenApply)+parseInt(data[i].fiveSixNineteenApply);
            provincesDataArr.push(data[i]);
        }
    }
    var provincesDataArrLen = provincesDataArr.length;
    for(var j = 1;j <  provincesDataArrLen;j++){
        for(var k = 0; k < provincesDataArrLen-j; k++){
            if(provincesDataArr[k].sum < provincesDataArr[k+1].sum){
                var temp = provincesDataArr[k];
                provincesDataArr[k] = provincesDataArr[k+1];
                provincesDataArr[k+1] = temp;
            }
        }
    }

    return provincesDataArr; //排出顺序
}
// 可移动数据整理 数据整理
//var mustmoveDitu;
// 可移动文物行政申报情况 地图
// function mustmoveDitu1(data,servicedata){
//     // 空数据
//     var mustmoveDitu = echarts.init(document.getElementById("mustmove-one-ditu"));
//     function randomData() {
//         return Math.round(Math.random()*1000);
//     }

//     var options = {
//         title: {
//             text: '可移动文物行政审批情况统计',
//             left: 'center'
//         },
//         tooltip: {
//             trigger: 'item'
//         },
//         toolbox: {
//             show: true,
//             orient: 'vertical',
//             left: 'right',
//             top: 'center',
//             feature: {
//                 dataView: {readOnly: false},
//                 restore: {},
//                 saveAsImage: {}
//             }
//         },
//         series: [
//             {
//                 name: '加载中',
//                 type: 'map',
//                 mapType: 'china',
//                 label: {
//                     normal: {
//                         show: true
//                     },
//                     emphasis: {
//                         show: true
//                     }
//                 },
//                 data:[{"name":"北京","value":100,"itemCode":"51"}]
//             }
//         ]
//     };

//     mustmoveDitu.setOption(options);
// }
function mustmoveDitu2(data,servicedata){

    $("#mustmove").html('');
    $("#mustmove").append($('<div id="mustmove-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50" style="height:400px"></div>'));
    var mustmoveDitu = echarts.init(document.getElementById("mustmove-one-ditu"));

    // 计算出4个维度
    // 计算最大值最小值
    var max = 0,min = 0,amount = 0;fristData=false;
    // 判断是否为一个省份
    var splitList;
    if(!IsEmpty(servicedata)){

        var maxMin={max:servicedata[0].value,min:servicedata[0].value};

        for(i = 0;i < servicedata.length;i++){

            if(servicedata[i].value!= 0){
                if (!fristData){

                    var maxMin={max:servicedata[i].value,min:servicedata[i].value};
                    fristData = true;
                }

                if(servicedata[i].value > maxMin.max){
                    maxMin.max = servicedata[i].value;
                } else if(maxMin.min > servicedata[i].value){
                    maxMin.min = servicedata[i].value;
                }
            }
        }

         max = maxMin.max;//最大值
         min = maxMin.min;//最小值
         amount = Math.ceil(parseInt(parseInt(max)-parseInt(min))/5);
         if(max == min){
             if(min<1){

                    splitList = [
                        {start: 0, end: max,color:"#fff"},

                    ]
                }else{

                    splitList = [
                        {start: 1, end: max,color:"#f4e7a3"},

                    ]
                }
         }else{
             splitList =  [
                {start: min, end: amount,color:"#f4e7a3"},
                {start: amount + 1, end: amount * 2,color:"#e6b68b"},
                {start: (amount * 2) + 1, end: amount*3,color:"#dc917a"},
                {start: (amount * 3) + 1, end: amount*4,color:"#cf6c65"},
                {start: (amount * 4) + 1, end: max,color:"#c1484e"}

            ]

         }
    };



    var joinString;

    if($("#mustmoveStartDate").val() == "" && $("#mustmoveEndDate").val() == ""){

        $(".mustmovehead tr:eq(0) th:eq(1)").html("可移动文物行政审批情况统计");
        $(".nationwidthhead tr:eq(0) th").html("全国博物馆修复、复制、拓印前十的文物");

        joinString = "可移动文物行政审批情况统计";


        }else if($("#mustmoveStartDate").val() == ""){
            $(".mustmovehead tr:eq(0) th:eq(1)").html( $("#mustmoveEndDate").val()+"之前可移动文物行政审批情况统计");
            $(".nationwidthhead tr:eq(0) th").html($("#mustmoveEndDate").val()+"之前全国博物馆修复、复制、拓印前十的文物");

            joinString = $("#mustmoveEndDate").val()+"之前可移动文物行政审批情况统计";


        }else if($("#mustmoveEndDate").val() == ""){
            $(".mustmovehead tr:eq(0) th:eq(1)").html($("#mustmoveStartDate").val()+"至今可移动文物行政审批情况统计");
           $(".nationwidthhead tr:eq(0) th").html($("#mustmoveStartDate").val()+"至今全国博物馆修复、复制、拓印前十的文物");

            joinString = $("#mustmoveStartDate").val()+"至今可移动文物行政审批情况统计";

        }else{
            $(".mustmovehead tr:eq(0) th:eq(1)").html($("#mustmoveStartDate").val() +" 至 "+$("#mustmoveEndDate").val()+"可移动文物行政审批情况统计");
            $(".nationwidthhead tr:eq(0) th").html($("#mustmoveStartDate").val()+" 至 "+$("#mustmoveEndDate").val()+"全国博物馆修复、复制、拓印前十的文物");

            joinString = $("#mustmoveStartDate").val() +" 至 "+$("#mustmoveEndDate").val()+"可移动文物行政审批情况统计";

    };
    // var _data = [{"name":"北京","value":9,"itemCode":"51"}];
    // WriteObj(_data[0]);
    // 每个省的合计
    var option1 = {
        title: {
            text: joinString,
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
        },

        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: true},
                restore: {},
                saveAsImage: {}
            }
        },
        //添加的颜色四个范围
        dataRange: {
            x: 'left',
            y: 'bottom',
            splitList: splitList,
        },
        series: [
            {
                name: '合计',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                zoom:1.1,
                data:servicedata,
            },
        ]
    };
    mustmoveDitu.clear();
    mustmoveDitu.setOption(option1);

    mustmoveDitu.on("click",function(ele){
        // 调用我的雷达图
        mustmovemoren(data,ele,1);

        Provinceranked(data,ele,1);
    })
}
// 可移动文物行政申报情况 地图

// 可移动文物行政申报情况 柱状图 最后 第一个
function mustmovemoren(data,servicedata,type){

    type = IsEmpty(type)?0:type;
    var dataLen = 10;//显示省份数据
    // 没点击之前
    var dataMaxprovinces = '';

    if(!IsEmpty(data)){

        if(type == 0){
            var sumIndex = 0;
            var max = servicedata[0].value;
            for (var i=0; i<servicedata.length; i++) {
               if( parseInt(max) < parseInt(servicedata[i].value)){
                    max = servicedata[i].value;
                    sumIndex=i
               }
            };
             dataMaxprovinces = data[sumIndex].provincesName;//最多国宝单位的省份
        } else { //点击之后
            if(typeof(servicedata.data) != "undefined" && servicedata.data.name){
                dataMaxprovinces = servicedata.data.name;
            } else {
                 showAlert({
                     type: 'info',
                     content: '此省份暂无数据'
                 });
                return false;
            }
        }
    }

    // dataMaxprovinces没有点击之前就是最多的数量的省份 点击之后就是点击的省份
    var data = sortUnmovable1(data,dataMaxprovinces);
    if(data.length < dataLen){
        dataLen = data.length;
    }
    var nationalName=[];
    var optionSeries = [];
    var optionData = [];
    var optionName = ['馆藏一级文物的修复、复制、拓印许可','文物出境展览许可',"博物馆一级藏品取样分析许可"];
    //拼装option中的series
    for(var i=0;i<dataLen;i++){
            for (j = 0; j < optionName.length; j++){
                if(typeof(optionData[j]) == 'undefined'){
                    optionData[j] = [];
                }
                switch(j)
                {
                    case 0:
                    optionData[j].unshift(data[i].fiveSixFifteenApply);
                    break;
                    case 1:
                    optionData[j].unshift(data[i].fiveSixSixteenApply);
                    break;
                    case 2:
                    optionData[j].unshift(data[i].fiveSixNineteenApply);
                    break;
                }
            }

            nationalName.unshift(data[i].protectUnitName);
    }

    for (k = 0; k < optionName.length; k++){
         var optionApply = {
            name: optionName[k],
            type: 'bar',
            stack: "first",
            label: {
                normal: {
                    show: true,
                    position: 'insideRight',
                    formatter: function(params) {
                    if (params.value > 0) {
                        return params.value;
                    } else {
                        return '';
                        }
                    }
                }
            },
            data: optionData[k]
        };
        optionSeries.push(optionApply);
    }

     var joinString1;

        if($("#mustmoveStartDate").val() == "" && $("#mustmoveEndDate").val() == ""){



            joinString1 = dataMaxprovinces+"可移动文物行政审批情况统计";


        }else if($("#mustmoveStartDate").val() == ""){


            joinString1 = $("#mustmoveEndDate").val()+"之前"+dataMaxprovinces+"可移动文物行政审批情况统计";


        }else if($("#mustmoveEndDate").val() == ""){


            joinString1 = $("#mustmoveStartDate").val()+"至今"+dataMaxprovinces+"可移动文物行政审批情况统计";

        }else{


            joinString1 = $("#mustmoveStartDate").val() +" 至 "+$("#mustmoveEndDate").val()+""+dataMaxprovinces+"可移动文物行政审批情况统计";

        };


    $('#mustmove-one-bar'+y).before('<div id="mustmove-one-bar'+(++y)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-20 margin-bottom-40" style="height:400px"></div>');
    if(y>0){
        $("#mustmove-one-bar"+(y-1)).remove();
    }

    var mustmovemoren = echarts.init(document.getElementById("mustmove-one-bar"+y));
    var option = {
        title: {
            text: joinString1,
            left:"center",
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            top:"25px",
            data: optionName,
        },
        grid: {
            left: '0%',
            right: '4%',
            top: '20%',
            bottom: '8%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: nationalName
        },
        series: optionSeries
    };
    mustmovemoren.clear();
    mustmovemoren.setOption(option);
}

// 第二个 各省份前十
function Provinceranked(data,servicedata,type){

     type = IsEmpty(type)?0:type;

    // 没点击之前
    var dataMaxprovinces = "";
    if(!IsEmpty(data)){

        if(type == 0){
            var sumIndex = 0;
            var max = servicedata[0].value;
            for (var i=0; i<servicedata.length; i++) {
               if( parseInt(max) < parseInt(servicedata[i].value)){
                    max = servicedata[i].value;
                    sumIndex=i
               }
            };
            var dataMaxprovinces = data[sumIndex].provincesName;
            var dataMaxitemCode = data[sumIndex].itemCode;//最多国宝单位的省份
        } else { //点击之后
            if(typeof(servicedata.data) != "undefined" && servicedata.data.itemCode){
                dataMaxitemCode = servicedata.data.itemCode;
                dataMaxprovinces = servicedata.data.name;
            } else {
                return false;
            }
        }

        var data = provinceRankedTen(dataMaxitemCode);

        var relicName = [];
        var number=[];

        for(var i=0,len=data.length;i<len;i++){
            relicName.unshift(data[i].relicName);
            number.unshift(data[i].number);

        }
    }

     var joinString2;

    if($("#mustmoveStartDate").val() == "" && $("#mustmoveEndDate").val() == ""){



        joinString2 = dataMaxprovinces+"博物馆修复、复制、拓印前十的文物";


    }else if($("#mustmoveStartDate").val() == ""){


        joinString2 = $("#mustmoveEndDate").val()+"之前"+dataMaxprovinces+"博物馆修复、复制、拓印前十的文物";


    }else if($("#mustmoveEndDate").val() == ""){


        joinString2 = $("#mustmoveStartDate").val()+"至今"+dataMaxprovinces+"博物馆修复、复制、拓印前十的文物";

    }else{


        joinString2 = $("#mustmoveStartDate").val() +" 至 "+$("#mustmoveEndDate").val()+""+dataMaxprovinces+"博物馆修复、复制、拓印前十的文物";

    };


    $('#mustmove-two-bar'+z).before('<div id="mustmove-two-bar'+(++z)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-20 margin-bottom-40" style="height:400px"></div>');
    if(z>0){
        $("#mustmove-two-bar"+(z-1)).remove();
    }
    var Provinceranked = echarts.init(document.getElementById("mustmove-two-bar"+z));

    var option = {
        title: {
            text:joinString2,
            left:"center",
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            left: '0%',
            right: '4%',
            top: '20%',
            bottom: '8%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: relicName
        },
        series:  {
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'insideRight'
                }
            },
            data: number
        },

    };

    Provinceranked.setOption(option);
}
// 可移动文物行政申报情况 柱状图

// 行政审批情况
function administrationRadar(administrationValue){


    var administrationRadar=echarts.init(document.getElementById("administration-one-radar"));
      var option = {
        title: {
            text:  '各个审批事项的情况'
        },
        tooltip : {
            trigger: 'item',
        },
        radar: [
            {
                indicator: [
                    { text: '受理件数' },
                    { text: '逾期办理件数' },
                    { text: '期限内办结数' },
                    { text: '期限内未办结数' },
                ],
                center: ['50%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter:'【{value}】',
                    textStyle: {
                        color:'#72ACD1'
                    }
                },
                splitArea: {
                    areaStyle: {
                        color: ['rgba(114, 172, 209, 0.2)',
                        'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                        'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                        shadowColor: 'rgba(0, 0, 0, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }
            },

        ],
        series: [
            {
                name: '行政审批督办情况',
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        // color: 各异,
                        lineStyle: {
                            width: 4
                        }
                    }
                },
                data: [
                    {
                        value: administrationValue,
                        name: '行政审批督办情况',
                        symbol: 'rect',
                        symbolSize: 5,
                        lineStyle: {
                            normal: {
                                type: 'dashed'
                            }
                        }
                    },
                ]
            },

        ]
    }

      if(!IsEmpty(administrationValue)){

        administrationRadar.setOption(option);
    }
}
// 行政审批督办情况

// 督办情况统计 行政审批工作情况统计 柱状图
function superviseBar(data){

    var superviseBar=[];
    var superviseBar1=[];
    var superviseBar2=[];
    for(var i=0;i<data.length;i++){
        superviseBar.push(data[i].instName);
        superviseBar1.push(data[i].agenda);
        superviseBar2.push(data[i].haveFinished);
    };

    var supervise = echarts.init(document.getElementById("supervise-one-bar"));

    var option = {
        title: {
            // text: '督办情况统计',
            subtext: '行政审批工作情况统计柱状图显示',
            left: 'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['待办', '已办',]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'log'
        },
        xAxis: {
            type: 'category',
            data: superviseBar,

            boundaryGap: true,


        },

        series: [
            {
                name: '待办',
                type: 'bar',
                // stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: superviseBar1
            },
            {
                name: '已办',
                type: 'bar',
                // stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    },
                },
                data: superviseBar2
            },
        ],
    };

    supervise.setOption(option);
}
