const input = document.querySelector("#date");
input.addEventListener("input", change);
var date = document.querySelector("input[type='date']");
var ymd = "2013-01-01";
var year = "2013";
var month = "01";
var day = "01";
year = window.localStorage.year;
month = window.localStorage.mon;
day = window.localStorage.day;
date.value = year + "-" + month + "-" + day;
var proname = get_proname();
var pproname = Array.from(window.localStorage.name.split(","));

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

function drawgeo() {
  var psn = proname.split(".");
  var pst = psn[0];
  var path_file_data =
    "https://raw.githubusercontent.com/HE-DE/DATA_FOR_PROJECT/main/city/" +
    pst +
    "/" +
    year +
    month +
    "/CN-Reanalysis-daily-" +
    year +
    month +
    day +
    "00.csv";
  console.log(path_file_data);
  var sip = 13.9;
  var par = get_par(proname);
  var cen = par[0];
  var tra = par[1];
  var sca = par[2];

  d3.json("./geo_pro_json/" + proname).then(function (data) {
    //读取地图数据
    console.log(data);
    var projection = d3
      .geoMercator() //投影
      .center(cen)
      .translate(tra)
      .scale(sca);

    var geopath = d3
      .geoPath() //生成地图path
      .projection(projection);
    d3.select("svg").remove();
    var svg = d3
      .select("#geo") //画一个svg画布
      .append("svg")
      .attr("width", "1000")
      .attr("height", "1000");
    svg.append("g").attr("id", "g"); //画出地图
    svg
      .select("#g")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "storke")
      .style("fill", "White")
      .style("fill-opacity", "1.0")
      .attr("d", geopath);
    svg
      .select("#g")
      .append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("font-size", 30)
      .text(pproname)
      .on("click", function () {
        window.localStorage.proname = pproname;
        window.open("./predict.html");
      });
    var texts = svg
      .selectAll(".texts")
      .data(data.features)
      .enter()
      .append("text")
      .attr("class", "texts")
      .text(function (d, i) {
        if (i == 0) {
          return d.properties.name;
        }
      })
      .attr("transform", function (d) {
        var centroid = geopath.centroid(d),
          x = centroid[0],
          y = centroid[1];
        return "translate(" + x + ", " + y + ")";
      })
      .attr("fill", "black")
      .attr("font-size", "15px")
      .on("click.1", mouseclick3);

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

      // location
      //   .append("rect") //在g元素中加一个rect，调整合适的角度位置
      //   .attr("width", sip)
      //   .attr("height", sip)
      //   .attr("transform", `rotate(${8}) translate(-7,-7)`);
      //.attr("transform", "translate(, 20)")

      //手动切换测试 下一行是AQI变化  下第二行是即时AQI  //为rect上色
      // var rect = d3.selectAll("rect").attr("fill", d => colordiff(d["AQI-Difference"]))
      // var rect = d3
      //   .selectAll(".location")
      //   .select("rect")
      //   .attr("fill", (d) => color(d["AQI"]));
      location
        .append("circle")
        .attr("transform", `rotate(${8}) translate(0,0)`)
        .attr("r", 5);
      var rect = d3
        .selectAll(".location")
        .select("circle")
        .attr("fill", (d) => color(d["AQI"]));
      var valuetoshow = [0, 50, 100, 150, 200, 300, 501];
      svg
        .selectAll("#g")
        .append("rect")
        .attr("class", "legend")
        .attr("x", 10)
        .attr("y", 700)
        .attr("width", 50)
        .attr("height", 15)
        .attr("fill", "#33FF00");
      svg
        .selectAll("#g")
        .append("line")
        .attr("class", "legend")
        .attr("x1", 10)
        .attr("y1", 700)
        .attr("x2", 10)
        .attr("y2", 730)
        .attr("stroke", "black")
        .attr("stroke-width", "2px");
      svg
        .selectAll("#g")
        .append("text")
        .attr("class", "legend")
        .attr("x", 5)
        .attr("y", 745)
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
        .attr("y", 700)
        .attr("width", 50)
        .attr("height", 15)
        .attr("fill", (d) => color(d));
      svg
        .selectAll("#g")
        .data(valuetoshow)
        .enter()
        .append("line")
        .attr("class", "legend")
        .attr("x1", function (d, i) {
          return 10 + i * 50;
        })
        .attr("y1", 730)
        .attr("x2", function (d, i) {
          return 10 + i * 50;
        })
        .attr("y2", 700)
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
        .attr("y", 745)
        .attr("font-size", 15)
        .text(function (d) {
          return d;
        });

      var tip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d, i) {
          console.log(d.target.__data__);
          return (
            "<strong>id: </strong><span ><font color='black'>" +
            i["id"] +
            "<br></font></span>" +
            "<strong>AQI: </strong><span ><font color='black'>" +
            i["AQI"] +
            "<br></font></span>" +
            "<strong>Major pollutants: </strong><span><font color='black'>" +
            i["Major pollutants"] +
            "<br></font></span>"
          );
        });
      //添加tips
      location.on("mouseover", tip.show).on("mouseout", tip.hide);

      location.call(tip);
      location.on("click.1", mouseclick);
      location.on("click.2", mouseclick2);
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
      svg.transition().duration(30).attr("transform", transform);
    }
  });
}

function change(event) {
  //获取日期
  var date = document.querySelector("input[type='date']");
  ymd = date.value;
  year = ymd[0] + ymd[1] + ymd[2] + ymd[3];
  month = ymd[5] + ymd[6];
  day = ymd[8] + ymd[9];
  d3.select("#svg").remove();
  d3.select("#svg1").remove();
  d3.select("#svg2").remove();
  d3.select("#svg3").remove();
  drawgeo();
}

drawgeo();
