// tiimeline geometry

var timelineGeometry = {
  maxHeight: 400,   // Maximum height of the timeflow pane
  maxWidth: 960,    // Maximm width of the timeflow pane
  infoFlowHeight: 200,    // Height of infoflow pane - width is based on timeflow pane
  // margin surrounding the three *flow panes
  margin: {top: 20 , right: 20, bottom: 20, left: 20},
  // axis geometry includes a top and bottom margin used to set off from
  // elements above and below
  axis: {labelHeight: 14, tickHeight: 6, lineStroke: 1,
    margin: {top: 0, bottom: 3}},
  // *flow geometries include a margin to set off the flow from elements above and
  // below; this is redundant for all except the birdView which needs an independent
  // margin to afford space for the brush.
  //  - maxTracks this parameter sets the limit on the number of timeline tracks
  //              that can be viewed in the pane; this is not a limit on the total
  //              tracks allowed in a session which can be greater. The value for
  //              birdView.maxTracks should always equal timeFlow.maxTracks. The
  //              track.
  // - track.height sets the height of the timeline track for the given flow.
  // - track.margin setst the verticle space between adjacent timeline tracks.
  infoFlow: {maxTracks: 17, minTracks: 3, maxHeight: 2880,
    margin: {top: 0, bottom: 0},
    track: {maxHeight: 160, height: 160, margin: 0}},
  timeFlow: {maxTracks: 17, minTracks: 3, maxHeight: 292,
    margin: {top: 0, bottom: 1},
    track: {maxHeight: 14, height: 14, margin: 3}},
  birdView: {maxTracks: 17, minTracks: 17, maxHeight: 17,
    margin: {top: 1, bottom: 1},
    track: {maxHeight: 1, height: 1, margin: 0}},
  totalTracks: 0,

  flowHeight: function(flowName) {
    return this[flowName].track.margin +
      (this[flowName].track.height + this[flowName].track.margin) *
        Math.max(Math.min(this.totalTracks, this[flowName].maxTracks),
        this[flowName].minTracks);

  },

  axisHeight: function( ) {
    return this.axis.labelHeight + this.axis.tickHeight + this.axis.lineStroke +
      this.axis.margin.top + this.axis.margin.bottom;
  }

}

var infoFlowCards = 5,      // number of cards visible in info pane.
    cardLateralMargin = 5,  // number of pixels between cards.
    infoFlowCardWidth = (timelineGeometry.maxWidth - timelineGeometry.margin.left -
      timelineGeometry.margin.right - (infoFlowCards - 1) * cardLateralMargin) / infoFlowCards,
    infoFlowCardHeight = 200 - timelineGeometry.margin.top - timelineGeometry.margin.bottom;

var topKeys = d3.set(["label", "SideA", "SideB", "start", "end", "whereFought",
                           "loc", "Initiator", "Outcome", "SideADeaths",
                           "SideBDeaths"]);
