function mouseclick3(event, d) {
  var cityname = d.properties.name;
  console.log(d.properties);
  var cityfilename;
  if (cityname == "太原市") {
    cityfilename = "./city_time/taiyuan.csv";
  } else if (cityname == "哈尔滨市") {
    cityfilename = "./city_time/haerbin.csv";
  } else if (cityname == "长沙市") {
    cityfilename = "./city_time/changsha.csv";
  } else if (cityname == "成都市") {
    cityfilename = "./city_time/chengdu.csv";
  } else if (cityname == "杭州市") {
    cityfilename = "./city_time/hangzhou.csv";
  } else if (cityname == "济南市") {
    cityfilename = "./city_time/jinan.csv";
  } else if (cityname == "乌鲁木齐市") {
    cityfilename = "./city_time/wulumuqi.csv";
  }else if (cityname == "郑州市") {
    cityfilename = "./city_time/zhengzhou.csv";
  }
  function drawchart(pollutant) {
    d3.select("#svg3").remove();
    const margin = { top: 60, right: 230, bottom: 50, left: 50 },
      width = 1100 - margin.left - margin.right,
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
        var x = i * 180;
        var y = margin.top - 100;
        return "translate(" + x + ", " + y + ")";
      })
      .attr("fill", function (d) {
        if (d == pollutant) {
          return "red";
        } else {
          return "black";
        }
      })
      .attr("font-size", "20px")
      .on("click", mouseclick4);
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
      // Now I can use this dataset:
      function (data) {
        const x = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => d.Time))
          .range([0, width]);
        xAxis = svg3
          .append("g")
          .attr("transform", `translate(0,  ${height + 5})`)
          .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0));

        // Add Y axis
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

        // Add brushing
        const brush = d3
          .brushX() // Add the brush feature using the d3.brush function
          .extent([
            [0, 0],
            [width, height],
          ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
          .on("end", updateChart); // Each time the brush selection changes, trigger the 'updateChart' function

        // Create the area variable: where both the area and the brush take place
        const area = svg3.append("g").attr("clip-path", "url(#clip)");

        // Create an area generator
        const areaGenerator = d3
          .area()
          .x((d) => x(d.Time))
          .y0(y(0))
          .y1((d) => y(d.value));

        // Add the area
        area
          .append("path")
          .datum(data)
          .attr("class", "myArea") // I add the class myArea to be able to modify it later on.
          .attr("fill", "#69b3a2")
          .attr("fill-opacity", 0.3)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr("d", areaGenerator);

        // Add the brushing
        area.append("g").attr("class", "brush").call(brush);

        // A function that set idleTimeOut to null
        let idleTimeout;
        function idled() {
          idleTimeout = null;
        }

        // A function that update the chart for given boundaries
        function updateChart(event) {
          // What are the selected boundaries?
          extent = event.selection;

          // If no selection, back to initial coordinate. Otherwise, update X axis domain
          if (!extent) {
            if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
            x.domain([4, 8]);
          } else {
            x.domain([x.invert(extent[0]), x.invert(extent[1])]);
            area.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
          }

          // Update axis and area position
          xAxis.transition().duration(1000).call(d3.axisBottom(x));
          area
            .select(".myArea")
            .transition()
            .duration(1000)
            .attr("d", areaGenerator);
        }

        // If user double click, reinitialize the chart
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
  drawchart("PM2.5(μg/m3)");
}
