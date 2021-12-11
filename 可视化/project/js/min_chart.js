function deal_with_txt(pollution) {
    if (pollution === "PM2.5(μg/m3)") {
        return "log(PM2.5(微克每立方米))";
    } else if (pollution === "CO(mg/m3)") {
        return "log(CO(微克每立方米))";
    } else if (pollution === "PM10(μg/m3)") {
        return "log(PM10(微克每立方米))";
    } else if (pollution === "SO2(μg/m3)") {
        return "log(SO2(微克每立方米))";
    } else if (pollution === "NO2(μg/m3)") {
        return "log(NO2(微克每立方米))";
    } else if (pollution === "O3(μg/m3)") {
        return "log(O3(微克每立方米))";
    }
}
function reback_txt(pollution){
    if (pollution === "log(PM2.5(微克每立方米))") {
        return "PM2.5(μg/m3)";
    } else if (pollution === "log(CO(微克每立方米))") {
        return "CO(mg/m3)";
    } else if (pollution === "log(PM10(微克每立方米))") {
        return "PM10(μg/m3)";
    } else if (pollution === "log(SO2(微克每立方米))") {
        return "SO2(μg/m3)";
    } else if (pollution === "log(NO2(微克每立方米))") {
        return "NO2(μg/m3)";
    } else if (pollution === "log(O3(微克每立方米))") {
        return "O3(μg/m3)";
    }
}


function min_barchart(d, pollution = "PM2.5(μg/m3)") {
    d3.select("#svg1").remove();
    var goal = deal_with_txt(pollution);
    //console.log(goal);
    var ddata = [];
    var jst = {};
    var flag = false;
    jst = {
        group: "log(PM2.5(微克每立方米))",
        value: Math.log(d["PM2.5(微克每立方米)"]),
    };
    ddata.push(jst);
    jst = {
        group: "log(CO(微克每立方米))",
        value: Math.log(d["CO(毫克每立方米)"] * 1000),
    };
    ddata.push(jst);
    jst = {
        group: "log(PM10(微克每立方米))",
        value: Math.log(d["PM10(微克每立方米)"]),
    };
    ddata.push(jst);
    jst = {
        group: "log(SO2(微克每立方米))",
        value: Math.log(d["SO2(微克每立方米)"]),
    };
    ddata.push(jst);
    jst = {
        group: "log(NO2(微克每立方米))",
        value: Math.log(d["NO2(微克每立方米)"]),
    };
    ddata.push(jst);
    jst = {group: "log(O3(微克每立方米))", value: Math.log(d["O3(微克每立方米)"])};
    ddata.push(jst);
    var major = d["Major pollutants"];
    if (major === "CO") {
        major += "(微克每立方米)";
        major = "log(" + major + ")";
    } else {
        major += "(微克每立方米)";
        major = "log(" + major + ")";
    }
    const margin = {top: 10, right: 30, bottom: 100, left: 90},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;
    var svg1 = d3
        .select("#barchart") //画一个svg画布
        .append("svg")
        .attr("height", "300").attr("width", "100%")
        .attr("id", "svg1")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
        .scaleBand()
        .range([0, width])
        .domain(ddata.map((d) => d.group))
        .padding(0.2);
    svg1
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .attr("class","axisRed")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    let ttop = [];
    for (var i = 0; i < 6; i++) {
        ttop.push(ddata[i].value);
    }
    console.log(ttop);
    var tt = Math.max.apply(null, ttop);
    console.log(tt);
    tt = tt + 5;
    const y = d3.scaleLinear().domain([0, tt]).range([height, 0]);
    svg1.append("g").attr("class","axisRed").call(d3.axisLeft(y));
    svg1
        .selectAll("mybar")
        .data(ddata)
        .join("rect")
        .attr("x", (d) => x(d.group))
        .attr("width", x.bandwidth())
        .attr("fill", function (d) {
            if (d.group === major && d.group === goal) {
                return "#8C0410";
            } else if (d.group === major&& d.group !== goal) {
                return "rgba(140,4,16,0.6)"
            } else if(d.group === goal){
                return "#4992F2"
            }else {
                return "rgba(73,146,242,0.6)";
            }
        })
        .attr("height", (d) => height - y(0)) // always equal to 0
        .attr("y", (d) => y(0));
    svg1
        .selectAll("rect")
        .data(ddata)
        .transition()
        .duration(800)
        .attr("y", (d) => y(d.value))
        .attr("height", (d) => height - y(d.value))
        .delay((d, i) => {
            return i * 100;
        });
    svg1.selectAll("rect")
        .data(ddata)
        .append("svg:title")
        .text(function (d) {
            return d["value"];
        })
}

function getColor(idx) {
    var palette = [
        'rgba(252,141,89,0.56)', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
    return palette[idx % palette.length];
}

function min_radarchart(pdata,pollution="PM2.5(μg/m3)") {
    d3.select("#svg1").remove();
    var goal = deal_with_txt(pollution);
    var width = 600, height = 300;
    // 创建一个分组用来组合要画的图表元素
    var main = d3.select('.container').append('svg')
        .attr("id", "svg1").attr("height", "300").attr("width", "100%").append("g")
        .classed('main', true)
        .attr('transform', "translate(" + width / 2 + ',' + height / 2 + ')');

    var data = {
        fieldNames: ['log(SO2(微克每立方米))', 'log(NO2(微克每立方米))', 'log(O3(微克每立方米))', 'log(PM2.5(微克每立方米))', 'log(PM10(微克每立方米))', 'log(CO(微克每立方米))'],
        values: [
            [Math.log(pdata["SO2(微克每立方米)"]), Math.log(pdata["NO2(微克每立方米)"]), Math.log(pdata["O3(微克每立方米)"]), Math.log(pdata["PM2.5(微克每立方米)"]), Math.log(pdata["PM10(微克每立方米)"]), Math.log(pdata["CO(毫克每立方米)"] * 1000)]
        ]
    };
    // 设定一些方便计算的常量
    var radius = 100,
        // 指标的个数，即fieldNames的长度
        total = 6,
        // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
        level = 8,
        // 网轴的范围，类似坐标轴
        rangeMin = 0,
        rangeMax = data.values[0][5] + 2,
        arc = 2 * Math.PI;
    // 每项指标所在的角度
    var onePiece = arc / total;
    // 计算网轴的正多边形的坐标
    var polygons = {
        webs: [],
        webPoints: []
    };
    for (var k = level; k > 0; k--) {
        var webs = '',
            webPoints = [];
        var r = radius / level * k;
        for (var i = 0; i < total; i++) {
            var x = r * Math.sin(i * onePiece),
                y = r * Math.cos(i * onePiece);
            webs += x + ',' + y + ' ';
            webPoints.push({
                x: x,
                y: y
            });
        }
        polygons.webs.push(webs);
        polygons.webPoints.push(webPoints);
    }
    // 绘制网轴
    var webs = main.append('g')
        .classed('webs', true);
    webs.selectAll('polygon')
        .data(polygons.webs)
        .enter()
        .append('polygon')
        .attr("fill","#3E3C54")
        .attr("opacity","0.4")
        .attr('points', function (d) {
            return d;
        });
    // 添加纵轴
    var lines = main.append('g')
        .classed('lines', true);
    lines.selectAll('line')
        .data(polygons.webPoints[0])
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', function (d) {
            return d.x;
        })
        .attr('y2', function (d) {
            return d.y;
        });
    // 计算雷达图表的坐标
    var areasData = [];
    var values = data.values;
    for (var i = 0; i < values.length; i++) {
        var value = values[i],
            area = '',
            points = [];
        for (var k = 0; k < total; k++) {
            var r = radius * (value[k] - rangeMin) / (rangeMax - rangeMin);
            var x = r * Math.sin(k * onePiece),
                y = r * Math.cos(k * onePiece);
            area += x + ',' + y + ' ';
            points.push({
                x: x,
                y: y
            })
        }
        areasData.push({
            polygon: area,
            points: points
        });
    }
    // 添加g分组包含所有雷达图区域
    var areas = main.append('g')
        .classed('areas', true);
    // 添加g分组用来包含一个雷达图区域下的多边形以及圆点
    areas.selectAll('g')
        .data(areasData)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
            return 'area' + (i + 1);
        });
    for (var i = 0; i < areasData.length; i++) {
        // 依次循环每个雷达图区域
        var area = areas.select('.area' + (i + 1)),
            areaData = areasData[i];
        // 绘制雷达图区域下的多边形
        area.append('polygon')
            .attr('points', areaData.polygon)
            .attr('stroke', function (d, index) {
                return getColor(i);
            })
            .attr('fill', function (d, index) {
                return getColor(i);
            });
        // 绘制雷达图区域下的点
        var circles = area.append('g')
            .classed('circles', true);
        circles.selectAll('circle')
            .data(areaData.points)
            .enter()
            .append('circle')
            .attr("class", "circle")
            .attr('cx', function (d) {
                return d.x;
            })
            .attr('cy', function (d) {
                return d.y;
            })
            .attr('r', 3)
            .attr('stroke', function (d, index) {
                return getColor(i);
            });
    }
    var tipdata = [pdata["SO2(微克每立方米)"], pdata["NO2(微克每立方米)"], pdata["O3(微克每立方米)"], pdata["PM2.5(微克每立方米)"], pdata["PM10(微克每立方米)"], pdata["CO(毫克每立方米)"] * 1000]
    d3.selectAll(".circle")
        .data(tipdata)
        .append("svg:title")
        .text(function (d) {
            return d;
        })
    // 计算文字标签坐标
    var textPoints = [];
    var textRadius = radius + 20;
    for (var i = 0; i < total; i++) {
        var x = textRadius * Math.sin(i * onePiece),
            y = textRadius * Math.cos(i * onePiece);
        textPoints.push({
            x: x,
            y: y
        });
    }

    // 绘制文字标签
    var texts = main.append('g')
        .classed('texts', true);
    texts.selectAll('text')
        .data(textPoints)
        .enter()
        .append('text')
        .attr('x', function (d) {
            return d.x;
        })
        .attr('y', function (d) {
            return d.y;
        })
        .attr("font-size", 10)
        .attr("fill",function (d,i){
            if(data.fieldNames[i]===goal){
                return "#ffffff";
            }else{
                return "#aaa";
            }
        })
        .text(function (d, i) {
            return data.fieldNames[i];
        });
    texts.selectAll('text')
        .data(data.fieldNames)
        .on("click",function (event,d){
            var rtxt=reback_txt(d);
            min_radarchart(pdata,rtxt);
            window.localStorage.pollution1=d;
        })
}

function data_min_chart(pst, ymd, type) {
    var mbyear = ymd[0] + ymd[1] + ymd[2] + ymd[3];
    var mbmonth = ymd[5] + ymd[6];
    var mbday = ymd[8] + ymd[9];
    var path_file_data =
        "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city/" +
        pst +
        "/" +
        mbyear +
        mbmonth +
        "/CN-Reanalysis-daily-" +
        mbyear +
        mbmonth +
        mbday +
        "00.csv";
    console.log(path_file_data);
    d3.csv(path_file_data).then(function (data) {
        console.log(data[0])
        var ppdata = {
            "AQI": data[0]["AQI"],
            "CO(毫克每立方米)": data[0]["CO(毫克每立方米)"],
            "SO2(微克每立方米)": data[0]["SO2(微克每立方米)"],
            "Major pollutants": data[0]["Major pollutants"],
            "NO2(微克每立方米)": data[0]["NO2(微克每立方米)"],
            "O3(微克每立方米)": data[0]["O3(微克每立方米)"],
            "PM2.5(微克每立方米)": data[0]["PM2.5(微克每立方米)"],
            "PM10(微克每立方米)": data[0]["PM10(微克每立方米)"]
        };
        console.log(ppdata);
        if (type === 'bar') {
            console.log(23);
            min_barchart(ppdata);
        } else if (type === 'rar') {
            min_radarchart(ppdata);
        }
    })
}

function scatterchart(ymd,pname,poluname_x,poluname_y){
    var mbyear = ymd[0] + ymd[1] + ymd[2] + ymd[3];
    var mbmonth = ymd[5] + ymd[6];
    var mbday = ymd[8] + ymd[9];
    console.log(pname);
    pname=get_pname(pname);
    pname=pname.split(".");
    pname=pname[0];
    console.log(pname);
    console.log(poluname_x);
    console.log(poluname_y);
    var path_file_data =
        "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city/" +
        pname +
        "/" +
        mbyear +
        mbmonth +
        "/CN-Reanalysis-daily-" +
        mbyear +
        mbmonth +
        mbday +
        "00.csv";
    console.log(path_file_data);
    d3.select("#svg1").remove();
    const margin = {top: 10, right: 30, bottom: 20, left: 60},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;
    const svg = d3.select("#scatterchart")
        .append("svg")
        .attr("id","svg1")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    d3.csv(path_file_data).then(function (data){
        var rel_data=[];
        var max_x=0;
        var max_y=0;
        let ttop = [];
        let yyop=[];
        for(var i=0;i<data.length;i++){
           var item_data={"x":data[i][poluname_x],"y":data[i][poluname_y]};
           rel_data.push(item_data);
            ttop.push(data[i][poluname_x]);
            yyop.push(data[i][poluname_y]);
        }
        console.log(ttop);
        max_x = Math.max.apply(null, ttop);
        max_y = Math.max.apply(null, yyop);
        console.log(max_y);
        const x = d3.scaleLinear()
            .domain([0, 0])
            .range([ 0, width]);
        svg.append("g")
            .attr("class", "axisRed")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .attr("opacity", "0")
        const y = d3.scaleLinear()
            .domain([0, max_y+10])
            .range([ height, 0]);
        svg.append("g")
            .attr("class","axisRed")
            .call(d3.axisLeft(y));
        svg.append('g')
            .selectAll("dot")
            .data(rel_data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.x); } )
            .attr("cy", function (d) { return y(d.y); } )
            .attr("r", 3)
            .style("fill", "#3C76D5")
            .style("opacity","0.8")
            .style("stroke-width","1px")
            .style("stroke","rgba(8,38,238,0.9)")
        x.domain([0, max_x+10])
        svg.select(".axisRed")
            .transition()
            .duration(2000)
            .attr("opacity", "1")
            .call(d3.axisBottom(x));

        svg.selectAll("circle")
            .transition()
            .delay(function(d,i){return(i*3)})
            .duration(2000)
            .attr("cx", function (d) { return x(d.x); } )
            .attr("cy", function (d) { return y(d.y); } )
    });
}
