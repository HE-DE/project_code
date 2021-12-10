function mouseclick3(event, d) {
    var cityname = d.properties.name;
    console.log(d.properties);
    var cityfilename;
    if (cityname == "太原市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/taiyuan.csv";
    } else if (cityname == "哈尔滨市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/haerbin.csv";
    } else if (cityname == "长沙市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/changsha.csv";
    } else if (cityname == "成都市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/chengdu.csv";
    } else if (cityname == "杭州市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/hangzhou.csv";
    } else if (cityname == "济南市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/jinan.csv";
    } else if (cityname == "乌鲁木齐市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/wulumuqi.csv";
    } else if (cityname == "郑州市") {
        cityfilename = "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city_time/zhengzhou.csv";
    }

    function drawchart(pollutant) {
        d3.select("#svg3").remove();
        const margin = {top: 60, right: 230, bottom: 50, left: 50},
            width = 850 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
        const svg3 = d3
            .select("#duibi")
            .append("svg")
            .attr("id", "svg3")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        var class_plu = ["PM2.5(μg/m3)", "PM10(μg/m3)", "SO2(μg/m3)", "NO2(μg/m3)", "CO(mg/m3)", "O3(μg/m3)"];
        var texts = svg3
            .selectAll(".texts")
            .data(class_plu)
            .enter()
            .append("text")
            .attr("class", "texts")
            .text(function (d) {
                return d;
            })
            .attr("transform", function (d, i) {
                var x = i * 80;
                var y = margin.top - 100;
                return "translate(" + x + ", " + y + ")";
            })
            .attr("fill", function (d) {
                if (d === pollutant) {
                    return "red";
                } else {
                    return "black";
                }
            })
            .attr("font-size", "10px")
            .on("click.1", mouseclick4)
            .on("click.2", function (event, d) {
                window.localStorage.pollution = d;
            })
            .call(trans);
        d3.csv(cityfilename, (d) => {
            if (pollutant == "PM2.5(μg/m3)") {
                return {
                    Time: d3.timeParse("%Y-%m-%d")(d.Time),
                    value: d.PM2_5,
                };
            } else if (pollutant == "PM10(μg/m3)") {
                return {
                    Time: d3.timeParse("%Y-%m-%d")(d.Time),
                    value: d.PM10,
                };
            } else if (pollutant == "SO2(μg/m3)") {
                return {
                    Time: d3.timeParse("%Y-%m-%d")(d.Time),
                    value: d.SO2,
                };
            } else if (pollutant == "NO2(μg/m3)") {
                return {
                    Time: d3.timeParse("%Y-%m-%d")(d.Time),
                    value: d.NO2,
                };
            } else if (pollutant == "CO(mg/m3)") {
                return {
                    Time: d3.timeParse("%Y-%m-%d")(d.Time),
                    value: d.CO,
                };
            } else if (pollutant == "O3(μg/m3)") {
                return {
                    Time: d3.timeParse("%Y-%m-%d")(d.Time),
                    value: d.O3,
                };
            }
        }).then(
            // 使用数据集设置X轴
            function (data) {
                const x = d3
                    .scaleTime()
                    .domain(d3.extent(data, (d) => d.Time))
                    .range([0, width]);
                xAxis = svg3
                    .append("g")
                    .attr("transform", `translate(0,  ${height + 5})`)
                    .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

                // 设置Y轴
                const y = d3
                    .scaleLinear()
                    .domain(d3.extent(data, (d) => +d.value))
                    .range([height, 0]);
                svg3
                    .append("g")
                    .attr("transform", "translate(-5,0)")
                    .call(d3.axisLeft(y).tickSizeOuter(0));
                const clip = svg3
                    .append("defs")
                    .append("clipPath")
                    .attr("id", "clip")
                    .append("rect")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("x", 0)
                    .attr("y", 0);

                // 添加动画
                const brush = d3
                    .brushX()
                    .extent([
                        [0, 0],
                        [width, height],
                    ])
                    .on("end", updateChart);


                const area = svg3.append("g").attr("clip-path", "url(#clip)");

                const areaGenerator = d3
                    .area()
                    .x((d) => x(d.Time))
                    .y0(y(0))
                    .y1((d) => y(d.value));

                area
                    .append("path")
                    .datum(data)
                    .attr("class", "myArea")
                    .attr("fill", "#d7301f")
                    .attr("fill-opacity", 0.3)
                    .attr("stroke", "#d7301f")
                    .attr("stroke-width", 1)
                    .attr("d", areaGenerator);


                area.append("g").attr("class", "brush").call(brush);


                let idleTimeout;

                function idled() {
                    idleTimeout = null;
                }


                function updateChart(event) {

                    extent = event.selection;

                    if (!extent) {
                        if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
                        x.domain([4, 8]);
                    } else {
                        x.domain([x.invert(extent[0]), x.invert(extent[1])]);
                        area.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
                    }

                    xAxis.transition().duration(1000).call(d3.axisBottom(x));
                    area
                        .select(".myArea")
                        .transition()
                        .duration(1000)
                        .attr("d", areaGenerator);
                }

                svg3.on("dblclick", function () {
                    x.domain(d3.extent(data, (d) => d.Time));
                    xAxis.transition().call(d3.axisBottom(x));
                    area.select(".myArea").transition().attr("d", areaGenerator);
                });
            }
        );
    }

    function mouseclick4(event, d) {
        var plu = d;
        drawchart(plu);
    }
    function trans(){
        window.addEventListener("storage",event1=>{
            if(event1.key==='pollution1'){
                pollution=reback_txt(event1.newValue);
                drawchart(pollution);
            }
        })
    }
    drawchart("PM2.5(μg/m3)");
}
