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

// Put a basic map in the pane - this will typically be overwritten for data
// that includes location events but will remain static in there are no locations
// attached to events.
//  window.location.assign = 'lib/';
  var world = d3.geomap()
    .geofile('node_modules/d3/node_modules/d3-geomap/src/topojson/world/countries.json');
    //.geofile('lib/d3-geomap/topojson/world/countries.json');

  d3.select('#map')
       .call(world.draw, world)
       .select('svg')
       .attr('id', 'base');

  //window.location.href = "./";

}
