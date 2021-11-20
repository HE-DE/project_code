setTimeout(function(){
				var screen = Promise.resolve(d3.csv("https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/data_for_mobile/screen.csv"));
				screen.then(function (raw_data) {
				    var dom = document.getElementById("lineChart");
				    var myChart = echarts.init(dom);
				
				
				    var option;
				
				
				    var data = [];
				    var startTime = Number(raw_data[0]["timestamp"]);
				    var categories = ['统计'];
				    var types = [
				        { name: '关', color: '#7b9ce1' },
				        { name: '开', color: '#bd6d6c' },
				    ];
				
				    var baseTime = startTime;//累计起始时间
				    var typeItem = types[0];//向data中压入的状态
				    var current_status = ["0", "2"];
				    if (raw_data[0]["screen_status"] == "1" || raw_data[0]["screen_status"] == "3") {
				        typeItem = types[0];
				        current_status = ["1", "3"];
				    }
				
				    var index = 0;
				    for (var i = 0; i < raw_data.length; i++) {
				        if (current_status[0] != raw_data[i]["screen_status"]
				            && current_status[1] != raw_data[i]["screen_status"])//状态发生改变
				        {
				            //压入改变前的数据
				            data.push({
				                name: typeItem["name"],
				                value: [index, baseTime, Number(raw_data[i]["timestamp"]), Number(raw_data[i]["timestamp"]) - baseTime],
				                itemStyle: {
				                    normal: {
				                        color: typeItem["color"]
				                    }
				                }
				            });
				            //改变起始数据
				            index++;
				            baseTime = Number(raw_data[i]["timestamp"]);
				            if (typeItem == types[0]) {
				                typeItem = types[1];
				                current_status = ["1", "3"];
				            }
				            else {
				                typeItem = types[0];
				                current_status = ["0", "2"];
				            }
				        }
				
				    }
				    console.log(data);
				
				    function renderItem(params, api) {
				        var categoryIndex = api.value(0);
				        var start = api.coord([api.value(1), categoryIndex]);
				        var end = api.coord([api.value(2), categoryIndex]);
				        var height = api.size([0, 1])[1] * 0.6;
				        var rectShape = echarts.graphic.clipRectByRect(
				            {
				                x: start[0],
				                y: start[1] - height / 2,
				                width: end[0] - start[0],
				                height: height
				            },
				            {
				                x: params.coordSys.x,
				                y: params.coordSys.y,
				                width: params.coordSys.width,
				                height: params.coordSys.height
				            }
				        );
				        return (
				            rectShape && {
				                type: 'rect',
				                transition: ['shape'],
				                shape: rectShape,
				                style: api.style()
				            }
				        );
				    }
				
				
				    option = {
				        tooltip: {
				            formatter: function (params) {
				                return params.marker + params.name + ': ' + params.value[3] + ' ms';
				            }
				        },
				        legend: {
				            data: ['开', '关']
				        },
				        dataZoom: [
				            {
				                type: 'slider',
				                filterMode: 'weakFilter',
				                showDataShadow: false,
				                top: 150,
				                labelFormatter: ''
				            },
				            {
				                type: 'inside',
				                filterMode: 'weakFilter'
				            }
				        ],
				        grid: {
				            height: 50
				        },
				        xAxis: {
				            type: "time",
				            min: startTime,
				
				        },
				        yAxis: {
				            data: categories
				        },
				        series: [
				            {
				                type: 'custom',
				                renderItem: renderItem,
				                itemStyle: {
				                    opacity: 0.8
				                },
				                encode: {
				                    x: [1, 2],
				                    y: 0
				                },
				                data: data
				            }
				        ]
				    };
				
				
				    if (option && typeof option === 'object') {
				        myChart.setOption(option);
				    }
				
				
				})
			},1500);
			