/*
* @Author: Marte
* @Date:   2018-04-17 22:19:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-07-11 15:20:50
*/
var p = 0;
// 文物进出境地图 1
function passInoneDitu(data){

    // 标题上的字
    var joinString;

    if($("#startDate").val() == "" && $("#endDate").val() == ""){

        $(".passInhead tr:eq(0) th").html("国家文物进出境审核管理处文物情况统计");

        joinString = "国家文物进出境审核管理处文物情况统计";


    }else if($("#startDate").val() == ""){
        $(".passInhead tr:eq(0) th").html( "国家文物进出境审核管理处"+$("#endDate").val()+"之前文物情况统计");

        joinString = "国家文物进出境审核管理处"+$("#endDate").val()+"之前文物情况统计";


    }else if($("#endDate").val() == ""){
        $(".passInhead tr:eq(0) th").html("国家文物进出境审核管理处"+$("#startDate").val()+"至今文物情况统计");

        joinString = " 国家文物进出境审核管理处"+$("#startDate").val()+"至今文物情况统计";

    }else{
        $(".passInhead tr:eq(0) th").html(" 国家文物进出境审核管理处"+$("#startDate").val() +" 至 "+$("#endDate").val()+"文物情况统计");

        joinString = " 国家文物进出境审核管理处"+$("#startDate").val() +" 至 "+$("#endDate").val()+"文物情况统计";

    };
    // 每个省的合计
        var servicedata=[];
        var total=0;
        var splitListArr=[];
        for(var i=0;i<data.length;i++){
            total=parseInt(data[i].relicExit)+parseInt(data[i].relicBanExit)+parseInt(data[i].relicRepExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = total;
            servicedata[i] = obj;
            splitListArr.push(total);

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

        // 每个省的合计

        $("#passin-tu").html('');
        $("#passin-tu").append($('<div id="passin-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

        var passInoneDitu = echarts.init(document.getElementById("passin-one-ditu"));

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

        setTimeout(passInoneDitu.setOption(option), 1000);

        passInoneDitu.on("click",function(ele){
             var workDate = data;
            // 调用我的饼图
            passInonePie(workDate,ele);

    })


}
// 默认最高值
function passInmoren(data){


      if (!IsEmpty(data)) {

         // 默认出省份的最高值
            var ProvinceData=[
               { name:"文物出境(不含复出境)",value:data.relicExit},
               { name:"文物禁止出境",value:data.relicBanExit},
               { name:"文物复仿制品出境",value:data.relicRepExit},
               { name:"文物临时进境",value:data.relicTempEnter},
               { name:"文物临时进境复出境",value:data.relicTempEnterRepExit},
               { name:"文物临时出境",value:data.relicTempExit},
               { name:"文物临时出境复进境",value:data.relicTempExitRepEnter},
            ];
      }

      // 标题上的子

    var joinString1;

    if($("#startDate").val() == "" && $("#endDate").val() == ""){


        joinString1 = "国家文物进出境审核"+data.provincesName+"管理处文物情况统计";



    }else if($("#startDate").val() == ""){


        joinString1 = "国家文物进出境审核"+data.provincesName+"管理处"+$("#endDate").val()+"之前文物情况统计";



    }else if($("#endDate").val() == ""){

        joinString1 = " 国家文物进出境审核"+data.provincesName+"管理处"+$("#startDate").val()+"至今文物情况统计";


    }else{

        joinString1 = " 国家文物进出境审核"+data.provincesName+"管理处"+$("#startDate").val() +" 至 "+$("#endDate").val()+"文物情况统计";
    };


    $('#passin-one-pie'+p).before('<div id="passin-one-pie'+(++p)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
    if(p>0){
        $("#passin-one-pie"+(p-1)).remove();
    }

    var passInonePie = echarts.init(document.getElementById("passin-one-pie"+p));

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
            // orient: 'vertical',
            top:30,
            left: 'left',
            data: ['文物出境(不含复出境)', '文物禁止出境','文物复仿制品出境','文物临时进境','文物临时进境复出境','文物临时出境','文物临时出境复进境'],
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

    setTimeout(passInonePie.setOption(option,true), 1000);
}

// 文物进出境饼图

function passInonePie(workDate,ele){ //workDate = data  ele click点击传过来的值
    //ele.data.name 点击哪个出现哪个城市的名字

      if (!IsEmpty(workDate)) {

            var passInobj = {};
            passInobj.i = false;
            for(var i=0; i<workDate.length; i++){
                if(typeof(ele.data) != "undefined"){
                     if(workDate[i].provincesName == ele.data.name){
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
        var Province = workDate[passInobj.i];

        passInmoren(Province);
    }
}





// 文物本体 国保单位分布情况 地图
function nationalDitu(data){
        // 每个省的合计
        var nationalData=[];
        var splitListArr=[];

        for(var i=0;i<data.length;i++){
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = data[i].total;
            nationalData[i] = obj;
            splitListArr.push(data[i].total);
        }
        // 计算出4个维度
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
             var splitList;
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
        $("#guobao").html('');
        $("#guobao").append($('<div id="national-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

        var nationalDitu=echarts.init(document.getElementById("national-one-ditu"));

        var option = {
            title: {
                text: '国保单位分布情况',
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
                    data:nationalData,
                },
            ]
        };

        nationalDitu.setOption(option);

        nationalDitu.on("click",function(ele){

             var workDate = data;

            // 调用我的饼图
            nationalPie(workDate,ele);

    })
}
// 文物本体 国保单位分布情况 默认
function nationalmoren(data){

    // 默认出省份的最高值
        var ProvinceData=[
           { name:"古遗址",value:data.gyz},
           { name:"古墓葬",value:data.gmz},
           { name:"古建筑",value:data.gjz},
           { name:"石窟寺及石刻",value:data.sks},
           { name:"近现代重要史迹及代表性建筑",value:data.jxd},
           { name:"其他",value:data.other},
        ];

        $('#national-one-pie'+u).before('<div id="national-one-pie'+(++u)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
        if(u>0){
            $("#national-one-pie"+(u-1)).remove();
        }
        var nationalPie = echarts.init(document.getElementById("national-one-pie"+u));

        var option = {
        title : {
            text: data.provincesName + '国保单位分布情况详细数据',
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            top:30,
            left: 'left',
            data: ['古遗址', '古墓葬','古建筑','石窟寺及石刻','近现代重要史迹及代表性建筑','其他'],
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
    // passInonePie.clear();
    nationalPie.setOption(option,true);

}
// 文物本体 国保单位分布情况 饼图
function nationalPie(workDate,ele){

    var passInobj = {};
    passInobj.i = false;
    for(var i=0; i<workDate.length; i++){
        if(typeof(ele.data) != "undefined"){
             if(workDate[i].provincesName == ele.data.name){
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
    var Province = workDate[passInobj.i];
    nationalmoren(Province);


}

// 文物本体-国有馆藏珍贵文物分布情况 地图
function stateDitu(data){

        // 每个省的合计
        var nationalData=[];
        var splitListArr=[];
        for(var i=0;i<data.length;i++){
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = data[i].total;
            nationalData[i] = obj;
            splitListArr.push(data[i].total);
        }
         // 计算出4个维度

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
        $("#guobao1").html("");
        $("#guobao1").append($('<div id="state-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));

        var stateDitu=echarts.init(document.getElementById("state-one-ditu"));
        var option = {
            title: {
                text: '国有馆藏珍贵文物分布情况',
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
                    // selectedMode : 'multiple', //暂时不要 有逻辑问题
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:nationalData,
                },
            ]
        };

        stateDitu.setOption(option);

        stateDitu.on("click",function(ele){

             var workDate = data;

            // 调用我的饼图
            statePie(workDate,ele);

    })

}
// 文物本体-国有馆藏珍贵文物分布情况 默认
function statemoren(data){
    // 默认出省份的最高值
        var ProvinceData=[
           { name:"玉石器、宝石",value:data.yushiqi},
           { name:"陶器",value:data.taoqi},
           { name:"瓷器",value:data.ciqi},
           { name:"铜器",value:data.tongqi},
           { name:"金银器",value:data.jinyinqi},
           { name:"铁器、其他金属器",value:data.tieqi},
           { name:"漆器",value:data.qiqi},
           { name:"雕塑、造像",value:data.diaosu},
           { name:"石器、石刻、砖瓦",value:data.shiqi},
           { name:"书法、绘画",value:data.shufa},
        ];

        $('#state-one-pie'+v).before('<div id="state-one-pie'+(++v)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
        if(v>0){
            $("#state-one-pie"+(v-1)).remove();
        }
     var nationalPie = echarts.init(document.getElementById("state-one-pie"+v));
        var option = {
        title : {
            text: data.provincesName + '国有馆藏珍贵文物分布情况详细数据(显示前十个珍贵文物)',
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            // orient: 'vertical',
            top:30,
            left: 'left',
            data: ['玉石器、宝石', '陶器','瓷器','铜器','金银器','铁器、其他金属器',"漆器","雕塑、造像","石器、石刻、砖瓦","书法、绘画"],
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
    // passInonePie.clear();
    nationalPie.setOption(option,true);

}
//  文物本体-国有馆藏珍贵文物分布情况 饼图
function statePie(workDate,ele){

    var passInobj = {};
    passInobj.i = false;
    for(var i=0; i<workDate.length; i++){
        if(typeof(ele.data) != "undefined"){
             if(workDate[i].provincesName == ele.data.name){
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
    var Province = workDate[passInobj.i];
    statemoren(Province);

}

//  文物本体-博物馆性质和等级分类统计情况 地图
function museumDitu(data){

        // 每个省的合计
         var nationalData=[];
         var splitListArr=[];
        for(var i=0;i<data.length;i++){
            var obj = new Object();
            obj.name = data[i].provincesName;
            obj.value = data[i].total;
            nationalData[i] = obj;
            splitListArr.push(data[i].total);
        }
        // 计算出4个维度

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
        $("#guobao2").html('');
        $("#guobao2").append($('<div id="museum-one-ditu" class="col-xs-12 col-md-12 col-lg-12 margin-top-50 margin-bottom-40" style="height:400px"></div>'));
        var stateDitu=echarts.init(document.getElementById("museum-one-ditu"));
        var option = {
            title: {
                text: '博物馆性质和等级分类统计情况',
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
                    // selectedMode : 'multiple', //暂时不要 有逻辑问题
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:nationalData,
                },
            ]
        };

        stateDitu.setOption(option);

        stateDitu.on("click",function(ele){

             var workDate = data;

            // 调用我的饼图
            museumRadar(workDate,ele);

    })

}
//  文物本体-博物馆性质和等级分类统计情况 雷达图
function museumRadar(workDate,ele){
    var passInobj = {};
    passInobj.i = false;
    for(var i=0; i<workDate.length; i++){
        if(typeof(ele.data) != "undefined"){
             if(workDate[i].provincesName == ele.data.name){
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
    var Province = workDate[passInobj.i];
    museummoren(Province);

}

// 文物本体-博物馆性质和等级分类统计情况 默认雷达图
function museummoren(data){

    var museumValue=[
        data.wenwu,
        data.hangye,
        data.feiguoyou,
        data.qita,
    ];

    var museumValue2=[
        data.oneLevel,
        data.twoLevel,
        data.threeLevel,
        data.fourLevel,
    ];


    $('#museum-one-radar'+w).before('<div id="museum-one-radar'+(++w)+'" class="col-xs-12 col-md-6 col-lg-6 margin-top-50 margin-bottom-40" style="height:400px"></div>');
        if(w>0){
            $("#museum-one-radar"+(w-1)).remove();
        }

    var museumRadar=echarts.init(document.getElementById("museum-one-radar"+w));

    var option = {
        title: {
            text: data.provincesName + '博物馆性质和等级分类统计情况详细数据',
            left: 'center'
        },
         tooltip : {
            trigger: 'item',
        },
        radar: [
            {
                indicator: [
                    { text: '文物' },
                    { text: '行业' },
                    { text: '非国有' },
                    { text: '其他' }
                ],
                center: ['25%', '50%'],
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
            {
                indicator: [
                    { text: '一级',  },
                    { text: '二级', },
                    { text: '三级',  },
                    { text: '未定级',  },
                ],
                shape: 'circle',
                center: ['75%', '50%'],
                radius: 80
            }
        ],
        series: [
        // 性质分类
            {
                name: '性质',
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
                        name: '性质',
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
        // 等级分类
            {
                name: '等级',
                type: 'radar',
                radarIndex: 1,
                data: [
                    {
                        value:museumValue2,
                        name: '等级',
                        label: {
                            normal: {
                                show: true,
                                formatter:function(params) {
                                    return params.value;
                                }
                            }
                        }
                    },
                ]
            }
        ]
    }
      museumRadar.setOption(option,true);
}


function changeSmall(ele){
    if (zoomNum > 1) {
        zoomNum = 1;
    };
    var optionNew = {
        series:[
            {
            zoom:zoomNum,
            }

        ]
    };
    if(ele == 1){

        var passInoneDitu=echarts.init(document.getElementById("passin-one-ditu"));
        passInoneDitu.setOption(optionNew);

    }
}