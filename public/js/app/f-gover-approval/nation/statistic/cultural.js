/*
* @Author: Marte
* @Date:   2018-04-17 22:19:29
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-26 17:32:59
*/

// 文物进出境地图 1
function passInoneDitu(data){
        var servicedata=[];
        var total=0;

        for(var i=0;i<data.length;i++){
            total=parseInt(data[i].relicExit)+parseInt(data[i].relicBanExit)+parseInt(data[i].relicRepExit)+parseInt(data[i].relicTempEnter)+parseInt(data[i].relicTempEnterRepExit)+parseInt(data[i].relicTempExit)+parseInt(data[i].relicTempExitRepEnter);
            var obj = new Object();
            obj.name = data[i].city;
            obj.value = total;
            servicedata[i] = obj;

        }
        console.log(servicedata)
        //
        var passInoneDitu=echarts.init(document.getElementById("passin-one-ditu"));
        option = {
            title: {
                text: '地图展示',
                subtext: '审核管理文物情况统计',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
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
                    dataView: {readOnly: false},
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
                    data:servicedata,
                },
            ]
        };
    passInoneDitu.setOption(option);
    // passInoneDitu.on("click",function(params){
    //     alert(1)
    //     var city=params.name;
    // })
}

// 文物进出境柱状图 1
function passInoneBar(data){
    var city=[];
    var database=[];

    var relicExit=[];
    var relicBanExit=[];
    var relicRepExit=[];
    var relicTempEnter=[];
    var relicTempEnterRepExit=[];
    var relicTempExit=[];
    var relicTempExitRepEnter=[];

    for (var i=0,len=data.length;i<data.length;i++) {
        city.push(data[i].city);
        database.push(data[i]);

        relicExit.push(database[i].relicExit);
        relicBanExit.push(database[i].relicBanExit);
        relicRepExit.push(database[i].relicRepExit);
        relicTempEnter.push(database[i].relicTempEnter);
        relicTempEnterRepExit.push(database[i].relicTempEnterRepExit);
        relicTempExit.push(database[i].relicTempExit);
        relicTempExitRepEnter.push(database[i].relicTempExitRepEnter);

    };
    // console.log(relicExit)

    var passInoneBar=echarts.init(document.getElementById("passin-one-bar"));

        option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['文物禁止出境(不含复出境)', '文物禁止出境','文物复仿制品出境','文物临时进境','文物临时进境复出境','文物临时出境','文物临时出境复出境'],

                padding:0

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data:city,
            },
            series: [
                {
                    name: '文物禁止出境(不含复出境)',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicExit
                },
                {
                    name: '文物禁止出境',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicBanExit
                },
                {
                    name: '文物复仿制品出境',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicRepExit
                },
                {
                    name: '文物临时进境',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicTempEnter
                },
                {
                    name: '文物临时进境复出境',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicTempEnterRepExit
                },
                {
                    name: '文物临时出境',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicTempExit
                },
                {
                    name: '文物临时出境复出境',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: relicTempExitRepEnter
                }
            ]
        };

          passInoneBar.setOption(option);
}

// passInoneDitu();
// passInoneBar();
// 文物本体
// 文物本体地图
function nouMenonDitu(){

    var nouMenonDitu=echarts.init(document.getElementById("nouMenon-ditu"));
        function randomData() {
        return Math.round(Math.random()*1000);
    }
        option = {
            title: {
                text: '文物本体',
                subtext: '总计展示',
                left: 'center',
                textStyle:"14px"
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data:['国保单位分布统计','国家博物馆性质分类','国有馆藏珍贵文物分布情况']
            },
            visualMap: {
                min: 0,
                max: 2500,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '国保单位分布统计',
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
                    data:[
                        {name: '北京',value: randomData() },
                        {name: '天津',value: randomData() },
                        {name: '上海',value: randomData() },
                        {name: '重庆',value: randomData() },
                        {name: '河北',value: randomData() },
                        {name: '河南',value: randomData() },
                        {name: '云南',value: randomData() },
                        {name: '辽宁',value: randomData() },
                        {name: '黑龙江',value: randomData() },
                        {name: '湖南',value: randomData() },
                        {name: '安徽',value: randomData() },
                        {name: '山东',value: randomData() },
                        {name: '新疆',value: randomData() },
                        {name: '江苏',value: randomData() },
                        {name: '浙江',value: randomData() },
                        {name: '江西',value: randomData() },
                        {name: '湖北',value: randomData() },
                        {name: '广西',value: randomData() },
                        {name: '甘肃',value: randomData() },
                        {name: '山西',value: randomData() },
                        {name: '内蒙古',value: randomData() },
                        {name: '陕西',value: randomData() },
                        {name: '吉林',value: randomData() },
                        {name: '福建',value: randomData() },
                        {name: '贵州',value: randomData() },
                        {name: '广东',value: randomData() },
                        {name: '青海',value: randomData() },
                        {name: '西藏',value: randomData() },
                        {name: '四川',value: randomData() },
                        {name: '宁夏',value: randomData() },
                        {name: '海南',value: randomData() },
                        {name: '台湾',value: randomData() },
                        {name: '香港',value: randomData() },
                        {name: '澳门',value: randomData() }
                    ]
                },
                {
                    name: '国家博物馆性质分类',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: randomData() },
                        {name: '天津',value: randomData() },
                        {name: '上海',value: randomData() },
                        {name: '重庆',value: randomData() },
                        {name: '河北',value: randomData() },
                        {name: '安徽',value: randomData() },
                        {name: '新疆',value: randomData() },
                        {name: '浙江',value: randomData() },
                        {name: '江西',value: randomData() },
                        {name: '山西',value: randomData() },
                        {name: '内蒙古',value: randomData() },
                        {name: '吉林',value: randomData() },
                        {name: '福建',value: randomData() },
                        {name: '广东',value: randomData() },
                        {name: '西藏',value: randomData() },
                        {name: '四川',value: randomData() },
                        {name: '宁夏',value: randomData() },
                        {name: '香港',value: randomData() },
                        {name: '澳门',value: randomData() }
                    ]
                },
                {
                    name: '国有馆藏珍贵文物分布情况',
                    type: 'map',
                    mapType: 'china',
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data:[
                        {name: '北京',value: randomData() },
                        {name: '天津',value: randomData() },
                        {name: '上海',value: randomData() },
                        {name: '广东',value: randomData() },
                        {name: '台湾',value: randomData() },
                        {name: '香港',value: randomData() },
                        {name: '澳门',value: randomData() }
                    ]
                }
            ]
        };
    nouMenonDitu.setOption(option);
}
// 文物本体饼图1
function nouMenonPie(){
    var nouMenonPie=echarts.init(document.getElementById("nouMenon-pie"));
    option = {
    title : {
        // text: '国保单位分布情况',
        subtext: '国保单位分布情况',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['古遗址','古墓葬','古建筑','石窟寺及石刻','近现代重要史迹及代表性建筑',"其他"]
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '70%'],
            data:[
                {value:335, name:'古遗址'},
                {value:310, name:'古墓葬'},
                {value:234, name:'古建筑'},
                {value:135, name:'石窟寺及石刻'},
                {value:1548, name:'近现代重要史迹及代表性建筑'},
                {value:125, name:'其他'}
            ],
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
  nouMenonPie.setOption(option);

}
nouMenonDitu();
nouMenonPie();


// 下载按钮
// function download(ele){
//     var url = api_ea + ele;
//     alert(url)
//     var $eleForm = $("<form method='post'></form>");
//     $eleForm.attr("action",url);

//     $(document.body).append($eleForm);

//     //提交表单，实现下载
//     $eleForm.submit();

// }

function download(){
    var url = api_ea + '/relicStatistics/queryRelicStatis';
    window.open(url);
}