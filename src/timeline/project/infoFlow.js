function infoFlow(domElement) {

  //--------------------------------------------------------------------------
  //
  // chart
  //

  // chart geometry
  //var margin = {top: 20, right: 20, bottom: 20, left: 20},
  //    outerWidth = 960,
  //    outerHeight = 200,
  //    width = outerWidth - margin.left - margin.right,
  //    height = outerHeight - margin.top - margin.bottom;

  var infoFlowHeight = 200,
      height = infoFlowHeight - margin.top - margin.bottom;

  // global timeline variables

  // Create svg element
  var svg = d3.select(domElement).append("svg")
      .attr("class", "svg")
      .attr("id", "svgInfoFlow")
      .attr("width", outerWidth)
      .attr("height", infoFlowHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +  ")");

  svg.append("clipPath")
      .attr("id", "flow-area")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

  var flow = svg.append("g")
      .attr("class", "band")
      .attr("clip-path", "url(#flow-area)" )
      .append("rect")
      .attr("width", width)
      .attr("height", height);
//      .append("text","Info-Flow");

  var textLabel = svg.select(".band")
      .append("svg")
      .append("g")
//    .append("div")
//    .attr("class", "infoFlowCard")
//    .attr("transform", "translate(40, 40)")
    .append("text")
    .attr("id", "label");

    var textBegin = svg.select(".band")
        .selectAll("g")
        .append("text")
        .attr("id", "begin");

    var textEnd = svg.select(".band")
        .selectAll("g")
        .append("text")
        .attr("id", "end");

    var textEnd = svg.select(".band")
        .selectAll("g")
        .append("text")
        .attr("id", "loc");

//      .data(" ")
//      .enter();

}
