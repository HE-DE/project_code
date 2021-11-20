var battery = Promise.resolve(d3.csv("https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/data_for_mobile/battery.csv"))
			battery.then(function (raw_data) {
			    var dom = document.getElementById("barChart");
			    var myChart = echarts.init(dom);
			
			    console.log(raw_data);
			
			    var DATA = [];//[日期，电量]
			    //处理raw_data原始数据，取出“日期”和“电量”
			    for (var i = 0; i < raw_data.length; i++) {
			        DATA.push([Number(raw_data[i]["timestamp"]), Number(raw_data[i]["battery_level"])]);
			    }
			
			    var option = {
			        tooltip: {
			            trigger: 'axis',
			            position: function (pt) {
			                return [pt[0], '10%'];
			            }
			        },
			        title: {
			            left: 'center',
			            text: 'battery_level'
			        },
			        toolbox: {
			            feature: {
			                dataZoom: {
			                    yAxisIndex: 'none'
			                },
			                restore: {},
			                saveAsImage: {}
			            }
			        },
			        xAxis: {
			            type: 'time',
			            boundaryGap: false,
			            splitLine: {
			                show: false,
			            }
			        },
			        yAxis: {
			            type: 'value',
			            min: 0,
			            max: 100,
			        },
			        dataZoom: [
			            {
			                type: 'inside',
			                start: 0,
			                end: 100
			            },
			            {
			                start: 0,
			                end: 100
			            }
			        ],
			        series: [
			            {
			                name: 'Fake Data',
			                type: 'line',
			                symbol: 'none',
			                sampling: 'lttb',
			                itemStyle: {
			                    color: 'rgb(255, 70, 131)'
			                },
			                areaStyle: {
			                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
			                        {
			                            offset: 0,
			                            color: 'rgb(255, 158, 68)'
			                        },
			                        {
			                            offset: 1,
			                            color: 'rgb(255, 70, 131)'
			                        }
			                    ])
			                },
			                data: DATA
			            }
			        ]
			    };
			
			    if (option && typeof option === 'object') {
			        myChart.setOption(option);
			    }
			
			})