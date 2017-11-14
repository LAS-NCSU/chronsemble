function spatioFlow(domElement) {

  //--------------------------------------------------------------------------
  //
  // map
  //

  // map geometry
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      outerWidth = 960,
      outerHeight = 300,
      width = outerWidth - margin.left - margin.right,
      height = outerHeight - margin.top - margin.bottom;

  // global timeline variables

  // Create svg element
  var svg = d3.select(domElement).append("svg")
      .attr("class", "svg")
      .attr("id", "svgSpatioFlow")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top +  ")");

  svg.append("clipPath")
      .attr("id", "map-area")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

  var map = svg.append("g")
      .attr("class", "map")
      .attr("clip-path", "url(#map-area)" );
}
