const input = document.querySelector("#date");
input.addEventListener("input", change);
var date = document.querySelector("input[type='date']");
var ymd = "2013-01-01";
var year = "2013";
var month = "01";
var day = "01";
console.log(ymd);
var color = d3
    .scaleLinear() //AQI颜色比例尺
    .domain([4,3,2,1,0])
    .range([
        "#ec8508",
        "#a3f558",
        "#59fcb8",
        "#2a4be7",
        "#d7301f",
    ]);

function drawchinageo() {
    var path_file_data ="https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/cluster/" +
        year +
        month +
        "/" +
        year +
        month +
        day +
        "00.csv";
    d3.json("../lib/data/china.json").then(function (data) {
        //读取地图数据
        var projection = d3
            .geoMercator() //投影
            .center([80, 28])
            .translate([100, 250])
            .scale(400);

        var geopath = d3
            .geoPath() //生成地图path
            .projection(projection);

        d3.select("svg").remove();
        var svg = d3
            .select("body") //画一个svg画布
            .append("svg")
            .attr("width", "750")
            .attr("height", "500");
        var g = svg.append("g").attr("id", "g"); //画出地图

        d3.select('svg').selectAll('geopath').remove();
        svg.selectAll("geopath")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", geopath)
            .on("mouseover",function(d,i){
                d3.select(this)
                    .attr("opacity","0.4");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("opacity","0");
            })
            .on("click",function(n,d){
                window.localStorage.name = d.properties.name;
                window.localStorage.year = year;
                window.localStorage.mon = month;
                window.localStorage.day = day;
            })
            .attr("fill", "rgba(248,244,244)")
            .attr("opacity","0")

        var g1 = svg.select("g");

        d3.csv(path_file_data).then(function (alldata) {
            //获取空气数据
            console.log(alldata);
            var location = g1
                .selectAll(".location") //根据经纬度坐标coor的位置添加g元素
                .data(alldata)
                .enter()
                .append("g")
                .attr("class", "location")
                .attr("transform", function (d) {
                    //计算标注点的位置
                    var coor = projection([d["lon"], d["lat"]]);
                    return "translate(" + coor[0] + "," + coor[1] + ")";
                });
            location
                .append("circle")
                .attr("transform", `rotate(${8}) translate(0,0)`)
                .attr("r", 2);
            var rect = d3
                .selectAll(".location")
                .select("circle")
                .attr("fill", (d) => color(d["cluster"]));
            svg
                .select("#g")
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("class", "storke")
                .style("fill", "White")
                .style("fill-opacity", "0.0")
                .attr("d", geopath);
            svg.call(
                d3
                    .zoom()
                    .extent([
                        [0, 0],
                        [1000, 900],
                    ])
                    .scaleExtent([1, 8])
                    .on("zoom", zoomed)
            );

            function zoomed({transform}) {
                svg.transition().duration(300).attr("transform", transform);
            }
        });
    });
}

function change(event) {
    //获取日期
    var date = document.querySelector("input[type='date']");
    ymd = date.value;
    year = ymd[0] + ymd[1] + ymd[2] + ymd[3];
    month = ymd[5] + ymd[6];
    day = ymd[8] + ymd[9];
    window.localStorage.ymd = ymd;
    drawchinageo();
}

window.addEventListener('storage', event => {
    if (event.key === 'ymd') {
        ymd = event.newValue;
        year = ymd[0] + ymd[1] + ymd[2] + ymd[3];
        month = ymd[5] + ymd[6];
        day = ymd[8] + ymd[9];
        date.value = year + "-" + month + "-" + day;

        d3.select("#svg").remove();
        d3.select("#svg1").remove();
        d3.select("#svg2").remove();
        d3.select("#svg3").remove();
        drawchinageo();
    }
})
drawchinageo();