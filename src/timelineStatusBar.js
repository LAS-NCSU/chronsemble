function timelineStatusBar(domElement, dataFilename) {

  //--------------------------------------------------------------------------
  //
  // Area Definition
  //

  // Create svg element
  var svg = d3.select(domElement).append("svg")
      .attr("class", "svg")
      .attr("id", "svgStatusBar")
      .attr("width", timelineGeometry.maxWidth)
      .attr("height", timelineGeometry.statusBar.height)
      .append("g")
      .append("rect")
      .attr("id", "rectTimelineStatus")
      .attr("transform", "translate(" + timelineGeometry.margin.left + "," + timelineGeometry.statusBar.margin.top +  ")")
      .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
        timelineGeometry.margin.right)
      .attr("height", timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.top - timelineGeometry.statusBar.margin.bottom);


  var textLabel = d3.select(domElement)
    .select("g")
    .append("text")
    .attr("transform", "translate(" + timelineGeometry.margin.left + "," + (timelineGeometry.statusBar.height - 5) +  ")")
    .attr("class", "textStatusBar")
    .text("Filename: " + dataFilename + statusFieldSeparator + symbolsUnicode.pushButtonOn + "Spatio flow " + statusFieldSeparator + symbolsUnicode.pushButtonOff + " Node-link");
}
