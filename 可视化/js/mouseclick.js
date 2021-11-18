function mouseclick(event, d) {
  d3.select("#svg1").remove();
  var ddata = [];
  var jst = {};
  var flag = false;
  jst = {
    group: "PM2.5(微克每立方米)",
    value: d["PM2.5(微克每立方米)"],
  };
  ddata.push(jst);
  jst = {
    group: "PM10(微克每立方米)",
    value: d["PM10(微克每立方米)"],
  };
  ddata.push(jst);
  jst = {
    group: "SO2(微克每立方米)",
    value: d["SO2(微克每立方米)"],
  };
  ddata.push(jst);
  jst = {
    group: "NO2(微克每立方米)",
    value: d["NO2(微克每立方米)"],
  };
  ddata.push(jst);
  jst = { group: "O3(微克每立方米)", value: d["O3(微克每立方米)"] };
  ddata.push(jst);
  var major = d["Major pollutants"];
  if (major == "CO") {
    major += "(毫克每立方米)";
  } else {
    major += "(微克每立方米)";
  }
  const margin = { top: 10, right: 30, bottom: 90, left: 40 },
    width = 350 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;
  var svg1 = d3
    .select("#barchart") //画一个svg画布
    .append("svg")
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
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
  let ttop = [];
  for (var i = 0; i < 5; i++) {
    ttop.push(ddata[i].value);
  }
  console.log(ttop);
  var tt = Math.max.apply(null, ttop);
  console.log(tt);
  tt = tt + 100;
  const y = d3.scaleLinear().domain([0, tt]).range([height, 0]);
  svg1.append("g").call(d3.axisLeft(y));
  svg1
    .selectAll("mybar")
    .data(ddata)
    .join("rect")
    .attr("x", (d) => x(d.group))
    .attr("width", x.bandwidth())
    .attr("fill", function (d) {
      if (d.group == major) {
        return "#ffa500";
      } else {
        return "#69b3a2";
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
}
