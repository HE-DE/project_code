var first = "2013.csv";
var second = "2014.csv";
var third = "2015.csv";
var fourth = "2016.csv";
var fifth = "2017.csv";
var sixth = "2018.csv";

var width = 1200,
  height = 1000,
  start = 0,
  end = 2.25,
  numSpirals = 2
margin = { top: 50, bottom: 50, left: 0, right: 0 };

var theta = function (r) {
  return numSpirals * Math.PI * r;
};

// used to assign nodes color by group


var r = d3.min([width, height]) / 2.2;

var radius = d3.scaleLinear()
  .domain([start, end])
  .range([240, r]);
//半径
var projection = d3.geoMercator()
  .center([107, 31]) //地图中心位置,107是经度，31是纬度
  .scale(460) //设置缩放量
  .translate([500, 560]); // 设置平移量
// Define path generator
var path1 = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
  .projection(projection);  // tell path generator to use albersUsa projection

var color1 = d3.scaleLinear()
  .domain([0, 400])
  .range(["#fef0d9", "#990000"]);

//Create SVG element and append map to the SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.left + margin.right)
  .append("g");

// var svg = d3.select("#chart").append("svg")
//   .attr("width", width + margin.right + margin.left)
//   .attr("height", height + margin.left + margin.right)
//   .append("g")
//   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var points = d3.range(start, end + 0.001, (end - start) / 1000);

var spiral = d3.radialLine()
  .curve(d3.curveCardinal)
  .angle(theta)
  .radius(radius);

var path = svg.append("path")
  .datum(points)
  .attr("id", "spiral")
  .attr("d", spiral)
  .attr("transform", "translate(510,500)")
  .style("fill", "none")
  .style("stroke", "steelblue")

var spiralLength = path.node().getTotalLength(),
  N = 365,
  barWidth = (spiralLength / N) - 1;

function update(tmp) {
  d3.json("../lib/data/chart_data/china.geo.json", function (json) {
    // Loop through each state data value in the .csv file
    d3.csv("../lib/data/chart_data/" + tmp, function (data) {

      var someData = [];
      var pro = 1;
      // L oop through each state data value in the .csv file
      for (var i = 0; i < data.length; i++) {
        // Grab State Name


        // Grab data value 
        var dataTime = data[i].Time;
        var dataState = data[i].Province;
        console.log(data[i].Province)

        // Find the corresponding state inside the GeoJSON
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.name;

          if (dataState == jsonState) {
            // Copy the data value into the JSON
            json.features[j].properties.res = data[i].AQI;
            data[i].Province=jsonState;
            //console.log(data[i].AQI);
            // Stop looking through the JSON
            break;
          }
        }
      }


      d3.select('svg').selectAll('path1').remove();
      // Bind the data to the SVG and create one path per GeoJSON feature
      svg.selectAll("path1")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path1)
        .on("mouseover", function (d, i) {
          d3.select(this)
            .attr("opacity", "0.9");
        })
        .on("mouseout", function (d, i) {
          d3.select(this)
            .transition()
            .duration(300)
            .attr("opacity", "1");
        })
        .on("click", function (n, d) {
          pro = n.properties.name;
          someData = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].Province == pro) {
              var currentdate = new Date(data[i].Time);

              someData.push({
                date: currentdate,
                value: data[i].AQI,
                Pro:data[i].Province,
                group: currentdate.getMonth()
              });
              // console.log(data[i].AQI)
            }

          }

          draw(someData);
        })
        .style("stroke", "#fff")
        .style("stroke-widthrt", "1")
        .style("fill", function (d) {

          // Get data value
          let value = d.properties.res;
          if (value) {
            //If value exists…
            return color1(value);
          } else {
            //If value is undefined…
            return "rgb(213,222,217)";
          }

        });
      console.log(pro)
      for (var i = 0; i < data.length; i++) {

        if (pro == 1) { pro = "安徽" }
        if (data[i].Province == pro) {
          var currentdate = new Date(data[i].Time);

          someData.push({
            date: currentdate,
            value: data[i].AQI,
            Pro:data[i].Province,
            group: currentdate.getMonth()
          });
          // console.log(data[i].AQI)
        }
      }

      function draw(tem) {
        var timeScale = d3.scaleTime()
          .domain(d3.extent(tem, function (d) {
            return d.date;
          }))
          .range([0, spiralLength]);

        let xxx = [];
        for (var i = 0; i < tem.length; i++) {
          xxx.push(tem[i].value);
        }
        var big = Math.max.apply(null, xxx);
        var small = Math.min.apply(null, xxx);
        // yScale for the bar height
        var yScale = d3.scaleLinear()
          .domain([small, big])
          .range([10, ((r - 260) / numSpirals) - 10]);

        console.log((r - 170) / numSpirals);
        console.log(big);
        console.log(small);
        d3.select('svg').selectAll("rect").remove();
        d3.select('svg').selectAll('text').remove();


        svg.selectAll("rect")
          .data(tem)
          .enter()
          .append("rect")
          .attr("transform", "translate(510,500)")
          .attr("x", function (d, i) {
            var linePer = timeScale(d.date),
              posOnLine = path.node().getPointAtLength(linePer),
              angleOnLine = path.node().getPointAtLength(linePer - barWidth);

            d.linePer = linePer; // % distance are on the spiral
            d.x = posOnLine.x; // x postion on the spiral

            d.y = posOnLine.y; // y position on the spiral

            d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position
            return d.x;
          })
          .attr("y", function (d) {
            return d.y;
          })
          .attr("width", function (d) {
            return barWidth;
          })
          .attr("height", function (d) {
            return yScale(d.value);
          })
          .style("fill", function (d) { return color1(d.value); })
          .style("stroke", "none")
          .attr("transform", function (d) {
            return "translate(510,500)rotate(" + d.a + "," + d.x + "," + d.y + ")"; // rotate the bar
          });


        // add date labels
        var tF = d3.timeFormat("%b %Y"),
          firstInMonth = {};



        svg.selectAll("text")
          .data(tem)
          .enter()
          .append("text")
          .attr("dy", 15)
          .style("text-anchor", "start")
          .style("font", "15px arial")
          .append("textPath")
          // only add for the first of each month
          .filter(function (d) {
            var sd = tF(d.date);
            if (!firstInMonth[sd]) {
              firstInMonth[sd] = 1;
              return true;
            }
            return false;
          })
          .text(function (d) {
            return tF(d.date);
          })
          // place text along spiral
          .attr("xlink:href", "#spiral")
          .style("fill", "white")
          .attr("startOffset", function (d) {
            return ((d.linePer / spiralLength) * 100) + "%";
          })


        var tooltip = d3.select("#chart")
          .append('div')
          .attr('class', 'tooltip');

        tooltip.append('div')
          .attr('class', 'date');
        tooltip.append('div')
          .attr('class', 'value');
        tooltip.append('div')
            .attr('class', 'Pro');

        svg.selectAll("rect")
          .on('mouseover', function (d) {
            tooltip.select('.Pro').html(" <b style=\'font-size:15px;color:white;\'>"+"Province:" + d.Pro + "</b>")
            tooltip.select('.date').html(" <b style=\'font-size:15px;color:white;\'>"+"Date:" + d.date.toDateString() + "</b>")
            tooltip.select('.value').html(" <b style=\'font-size:15px;color:white;\'>" + "Value:"+Math.round(d.value * 100) / 100 + "<b>")

            d3.select(this)
              .style("opacity", 0.4)
              .style("stroke", "#000000")
              .style("stroke-width", "2px");

            tooltip.style('display', 'block');
            tooltip.style('opacity', 2);

          })
          .on('mousemove', function (d) {
            tooltip.style('top', '360px')
              .style('left', '550px')
                .style("font", "15px arial")
                .style("fill", "white");
          })
          .on('mouseout', function (d) {
            d3.selectAll("rect")
              .style("opacity", 1 )
              .style("stroke", "none")

            tooltip.style('display', 'none');
            tooltip.style('opacity', 0);
          });
      }
      draw(someData)
    })

  })
}
update(first);
