function mouseclick2(event, d) {
  d3.select("#svg2").remove();
  var dddata = [];
  var jst = {};
  jst = {
    group: "CO(毫克每立方米)",
    value: d["CO(毫克每立方米)"],
  };
  var major = d["Major pollutants"] + "(毫克每立方米)";
  dddata.push(jst);
  const margin = { top: 20, right: 30, bottom: 40, left: 90 },
    width = 350 - margin.left - margin.right,
    height = 80 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg2 = d3
    .select("#CO")
    .append("svg")
    .attr("id", "svg2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  const x = d3.scaleLinear().domain([0, 10]).range([0, width]);
  svg2
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Y axis
  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(dddata.map((d) => d.group))
    .padding(0.1);
  svg2.append("g").call(d3.axisLeft(y));

  //Bars
  svg2
    .selectAll("myRect")
    .data(dddata)
    .join("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.group))
    .transition()
    .duration(800)
    .attr("width", (d) => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", function (d) {
      if (d.group == major) {
        return "#ffa500";
      } else {
        return "#69b3a2";
      }
    });
}
