function predict(pd){
    var proname=pd;
    if(proname==="湖南省"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_changsha.csv";
    }else if(proname==="四川省"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_chengdu.csv";
    }else if(proname==="黑龙江省"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_haerbin.csv";
    }else if(proname==="浙江省"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_hangzhou.csv";
    }else if(proname==="山东省"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_jinan.csv";
    }else if(proname==="河南省"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_zhengzhou.csv";
    }else if(proname==="内蒙古自治区"){
        var cityfilename="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_for_pre/re_wulumuqi.csv";
    }
    var a = Promise.resolve(d3.csv(cityfilename));
    a.then(function (result) {
        console.log(result);
        console.log(result.length);
        var data = [];
        for (var i = 0; i < result.length; i++) {
            data.push([i+1, result[i]["AQI"]]);
        }
        console.log(data);
        var myChart = echarts.init(document.getElementById("main"),'dark');
        myChart.setOption(
            (option = {
                title: {
                    text: proname+" AQI",
                    left: "1%",
                },
                tooltip: {
                    trigger: "axis",
                },
                grid: {
                    left: "5%",
                    right: "15%",
                    bottom: "10%",
                },
                xAxis: {
                    data: data.map(function (item) {
                        return item[0];
                    }),
                },
                yAxis: {},
                toolbox: {
                    right: 10,
                    feature: {
                        dataZoom: {
                            yAxisIndex: "none",
                        },
                        restore: {},
                        saveAsImage: {},
                    },
                },
                dataZoom: [
                    {
                        startValue: "1",
                    },
                    {
                        type: "inside",
                    },
                ],
                visualMap: {
                    top: 50,
                    right: 10,
                    pieces: [
                        {
                            gt: 0,
                            lte: 50,
                            color: "#93CE07",
                        },
                        {
                            gt: 50,
                            lte: 100,
                            color: "#FBDB0F",
                        },
                        {
                            gt: 100,
                            lte: 150,
                            color: "#FC7D02",
                        },
                        {
                            gt: 150,
                            lte: 200,
                            color: "#FD0100",
                        },
                        {
                            gt: 200,
                            lte: 300,
                            color: "#AA069F",
                        },
                        {
                            gt: 300,
                            color: "#AC3B2A",
                        },
                    ],
                    outOfRange: {
                        color: "#999",
                    },
                },
                series: {
                    name: proname+" AQI",
                    type: "line",
                    data: data.map(function (item) {
                        return item[1];
                    }),
                    markLine: {
                        silent: true,
                        lineStyle: {
                            color: "#333",
                        },
                        data: [
                            {
                                yAxis: 50,
                            },
                            {
                                yAxis: 100,
                            },
                            {
                                yAxis: 150,
                            },
                            {
                                yAxis: 200,
                            },
                            {
                                yAxis: 300,
                            },
                        ],
                    },
                },
            })
        );
    });
}