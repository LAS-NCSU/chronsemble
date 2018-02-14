function infoFlow(domElement) {

  //--------------------------------------------------------------------------
  //
  // Area Definition
  //

  // Create svg element
  var svg = d3.select(domElement).append("svg")
      .attr("class", "svg")
      .attr("id", "svgInfoFlow")
      .attr("width", timelineGeometry.maxWidth)
      .attr("height", timelineGeometry.infoFlowHeight)
      .append("g")
      .attr("transform", "translate(" + timelineGeometry.margin.left + "," + timelineGeometry.margin.top +  ")");

  svg.append("clipPath")
      .attr("id", "flow-area")
      .append("rect")
      .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
        timelineGeometry.margin.right)
      .attr("height", timelineGeometry.infoFlowHeight - timelineGeometry.margin.top -
        timelineGeometry.margin.bottom);

  var flow = svg.append("g")
      .attr("class", "band")
      .attr("clip-path", "url(#flow-area)" );
/*
      .append("rect")
      .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
        timelineGeometry.margin.right)
      .attr("height", timelineGeometry.infoFlowHeight - timelineGeometry.margin.top -
        timelineGeometry.margin.bottom);
//      .append("text","Info-Flow");
*/
  var textLabel = svg.select(".band")
      .append("svg")
      .append("g")
//    .append("div")
//    .attr("class", "infoFlowCard")
//    .attr("transform", "translate(40, 40)")
/*
var infoFlowFieldTemplate = svg.select(".band")
    .selectAll("g")
    .append("table")
    .attr("id", "table")
    .attr("class", "infoFlowCard")
    .attr("transform", "translate(2, 10)")
    .append("script")
    .attr("id", "template-table-item")
    .attr("type", "text/template")
    .append("tr")
    .append("td")
    .text("{{field}}");

var infoFlowValueTemplate = svg.select(".band")
    .selectAll("tr")
    .append("td")
    .text("{{value}}");
*/


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

    var textLoc = svg.select(".band")
        .selectAll("g")
        .append("text")
        .attr("id", "loc");

//      .data(" ")
//      .enter();

}
