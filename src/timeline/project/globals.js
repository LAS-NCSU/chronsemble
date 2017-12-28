// tiimeline geometry

var timelineGeometry = {
  maxHeight: 400,
  maxWidth: 960,
  infoFlowHeight: 200,
  margin: {top: 20 , right: 20, bottom: 20, left: 20 },
  axis: {labelHeight: 14, tickHeight: 6, lineStroke: 1, margin: 5},
  infoFlow: {maxTracks: 17, minTracks: 3, maxHeight: 2880,
    track: {maxHeight: 160, height: 160, margin: 0}},
  // timeFlow: {maxTracks: 16, maxHeight: (timelineGeometry.timeFlowTrack.height + timelineGeometry.timeFlowTrack.margin) * timelineGeometry.timeFlow.maxTracks}
  timeFlow: {maxTracks: 17, minTracks: 3, maxHeight: 292,
    track: {maxHeight: 14, height: 14, margin: 3}},
  birdView: {maxTracks: 17, minTracks: 17, maxHeight: 17,
    track: {maxHeight: 17, height: 1, margin: 0}}
}

var infoFlowCards = 5,      // number of cards visible in info pane.
    cardLateralMargin = 5,  // number of pixels between cards.
    infoFlowCardWidth = (timelineGeometry.maxWidth - timelineGeometry.margin.left -
      timelineGeometry.margin.right - (infoFlowCards - 1) * cardLateralMargin) / infoFlowCards,
    infoFlowCardHeight = 200 - timelineGeometry.margin.top - timelineGeometry.margin.bottom;

var topKeys = d3.set(["label", "SideA", "SideB", "start", "end", "whereFought",
                           "loc", "Initiator", "Outcome", "SideADeaths",
                           "SideBDeaths"]);
