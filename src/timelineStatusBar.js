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
      .attr("id", "StatusBar")
      .attr("transform", "translate(" + timelineGeometry.margin.left + "," + timelineGeometry.statusBar.margin.top +  ")")
      .append("rect")
      .attr("id", "rectTimelineStatus")
      .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
        timelineGeometry.margin.right)
      .attr("height", timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.top - timelineGeometry.statusBar.margin.bottom);


  var textLabel = d3.select(domElement)
    .select("g")
    .append("text")
    .attr("transform", "translate(0," + (timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.bottom - 5) +  ")")
    .attr("class", "textStatusBar")
    .attr("id", "Filename")
//    .text("Filename: " + dataFilename + statusFieldSeparator + symbolsUnicode.pushButtonOn + "Spatio flow " + statusFieldSeparator + symbolsUnicode.pushButtonOff + " Node-link");
    .text("Filename:");

    textLabel = d3.select(domElement).select("g").append("text")
      .attr("transform", "translate(" + timelineGeometry.maxWidth/2 + "," + (timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.bottom - 5) +  ")")
      .attr("class", "textStatusBar")
      .attr("id", "SpatioFlowButton")
//    .text("Filename: " + dataFilename + statusFieldSeparator + symbolsUnicode.pushButtonOn + "Spatio flow " + statusFieldSeparator + symbolsUnicode.pushButtonOff + " Node-link");
      .text(statusFieldSeparator + symbolsUnicode.pushButtonOn);

    textLabel = d3.select(domElement).select("g").append("text")
      .attr("transform", "translate(" + (timelineGeometry.maxWidth/2 + 40) + "," + (timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.bottom - 5) +  ")")
      .attr("class", "textStatusBar")
      .attr("id", "SpatioFlowButtonLabel")
//    .text("Filename: " + dataFilename + statusFieldSeparator + symbolsUnicode.pushButtonOn + "Spatio flow " + statusFieldSeparator + symbolsUnicode.pushButtonOff + " Node-link");
      .text("Spatio flow");

    textLabel = d3.select(domElement).select("g").append("text")
      .attr("transform", "translate(" + (timelineGeometry.maxWidth/2 + 110) + "," + (timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.bottom - 5) +  ")")
      .attr("class", "textStatusBar")
      .attr("id", "NodeLinkButton")
//    .text("Filename: " + dataFilename + statusFieldSeparator + symbolsUnicode.pushButtonOn + "Spatio flow " + statusFieldSeparator + symbolsUnicode.pushButtonOff + " Node-link");
      .text(statusFieldSeparator + symbolsUnicode.pushButtonOff);

    textLabel = d3.select(domElement).select("g").append("text")
      .attr("transform", "translate(" + (timelineGeometry.maxWidth/2 + 150) + "," + (timelineGeometry.statusBar.height - timelineGeometry.statusBar.margin.bottom - 5) +  ")")
      .attr("class", "textStatusBar")
      .attr("id", "NodeLinkButtonLabel")
//    .text("Filename: " + dataFilename + statusFieldSeparator + symbolsUnicode.pushButtonOn + "Spatio flow " + statusFieldSeparator + symbolsUnicode.pushButtonOff + " Node-link");
      .text("Node-link");

}