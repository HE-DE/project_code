const input = document.querySelector("#date");
input.addEventListener("input", change);

var ymd = "2013-01-01";
var year = "2013";
var month = "01";
var day = "01";
console.log(ymd);
var color = d3
  .scaleLinear() //AQI颜色比例尺
  .domain([0, 50, 100, 150, 200, 300, 501])
  .range([
    "rgba(0,255,0,0.8)",
    "rgba(255,255,0,0.8)",
    "rgba(255,165,0,0.8)",
    "rgba(255,0,0,0.8)",
    "rgba(160,32,240,0.8)",
    "rgba(139,0,0,0.8)",
    "rgba(28,28,28,0.8)",
  ]);

function drawchinageo() {
  var path_file_data =
    "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/country/" +
    year +
    month +
    "/CN-Reanalysis-daily-" +
    year +
    month +
    day +
    "00.csv";
  d3.json("china.json").then(function (data) {
    //读取地图数据
    var projection = d3
      .geoMercator() //投影
      .center([80, 28])
      .translate([200, 500])
      .scale(800);

    var geopath = d3
      .geoPath() //生成地图path
      .projection(projection);

    d3.select("svg").remove();
    var svg = d3
      .select("body") //画一个svg画布
      .append("svg")
      .attr("width", "1000")
      .attr("height", "900");
    var g = svg.append("g").attr("id", "g"); //画出地图

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
        .append("rect") //在g元素中加一个rect，调整合适的角度位置
        .attr("width", 3.9)
        .attr("height", 3.9)
        .attr("transform", `rotate(${8.585}) translate(0,-3)`);
      var rect = d3
        .selectAll(".location")
        .select("rect")
        .attr("fill", (d) => color(d["AQI"]));
      var valuetoshow = [0, 50, 100, 150, 200, 300, 501];
      svg
        .selectAll("#g")
        .append("rect")
        .attr("class", "legend")
        .attr("x", 10)
        .attr("y", 60)
        .attr("width", 50)
        .attr("height", 15)
        .attr("fill", "#33FF00");
      svg
        .selectAll("#g")
        .append("line")
        .attr("class", "legend")
        .attr("x1", 10)
        .attr("y1", 60)
        .attr("x2", 10)
        .attr("y2", 90)
        .attr("stroke", "black")
        .attr("stroke-width", "2px");
      svg
        .selectAll("#g")
        .append("text")
        .attr("class", "legend")
        .attr("x", 5)
        .attr("y", 105)
        .attr("font-size", 15)
        .text("0");
      svg
        .selectAll("#g")
        .data(valuetoshow)
        .enter()
        .append("rect")
        .attr("class", "legend")
        .attr("x", function (d, i) {
          return 10 + i * 50;
        })
        .attr("y", 60)
        .attr("width", 50)
        .attr("height", 15)
        .attr("fill", (d) => color(d));
      console.log(valuetoshow);
      svg
        .selectAll("#g")
        .data(valuetoshow)
        .enter()
        .append("line")
        .attr("class", "legend")
        .attr("x1", function (d, i) {
          return 10 + i * 50;
        })
        .attr("y1", 90)
        .attr("x2", function (d, i) {
          return 10 + i * 50;
        })
        .attr("y2", 60)
        .attr("stroke", "black")
        .attr("stroke-width", "2px");
      svg
        .selectAll("#g")
        .data(valuetoshow)
        .enter()
        .append("text")
        .attr("class", "legend")
        .attr("x", function (d, i) {
          return 5 + i * 50;
        })
        .attr("y", 105)
        .attr("font-size", 15)
        .text(function (d) {
          return d;
        });
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

      var texts = svg
        .selectAll(".texts")
        .data(data.features)
        .enter()
        .append("text")
        .attr("class", "texts")
        .text(function (d) {
          return d.properties.name;
        })
        .attr("transform", function (d) {
          var centroid = geopath.centroid(d),
            x = centroid[0],
            y = centroid[1];
          return "translate(" + x + ", " + y + ")";
        })
        .attr("fill", "#AAA")
        .attr("font-size", "10px")
        .on("click", function (d, data) {
          window.localStorage.name = data.properties.name;
          window.localStorage.year = year;
          window.localStorage.mon = month;
          window.localStorage.day = day;
          window.open("geo_pro.html");
        });
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

      function zoomed({ transform }) {
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
  drawchinageo();
}
drawchinageo();
