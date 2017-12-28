function spatioFlow(domElement) {

  //--------------------------------------------------------------------------
  //
  // map
  //

  // map geometry is based on timeline width for aesthetics
  var spatioFlowAreaHeight = 440,
      spatioFlowHeight = spatioFlowAreaHeight - timelineGeometry.margin.top -
        timelineGeometry.margin.bottom;

  // global timeline variables

  // Create svg element
  var svg = d3.select(domElement).append("svg")
      .attr("class", "svg")
      .attr("id", "svgSpatioFlow")
      .attr("width", timelineGeometry.maxWidth)
      .attr("height", spatioFlowAreaHeight)
      .append("g")
      .attr("transform", "translate(" + timelineGeometry.margin.left + "," + timelineGeometry.margin.top +  ")");

  svg.append("clipPath")
      .attr("id", "map-area")
      .append("rect")
      .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
        timelineGeometry.margin.right)
      .attr("height", spatioFlowHeight);

  var spatioLayout = svg.append("g")
      .attr("class", "band")
      .attr("id", "map")
      .attr("clip-path", "url(#map-area)" )
      .append("rect")
      .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
        timelineGeometry.margin.right)
      .attr("height", spatioFlowHeight);

}
