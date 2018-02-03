// timeline geometry

var timelineGeometry = {
  // The height of the timeflow pane is determined by the value of
  // - timeFlow.maxTracks this sets the maximum number of tracks that can be
  //                      viewed simultaneously on the timeflow pane.
  maxWidth: 960,    // Maximum width of the timeflow and all other panes
  infoFlowHeight: 200,    // Height of infoflow pane - width is based on timeflow pane
  // margin surrounding the three *flow panes
  margin: {top: 20 , right: 20, bottom: 20, left: 20},
  // axis geometry includes a top and bottom margin used to set off from
  // elements above and below
  axis: {labelHeight: 10, tickHeight: 6, lineStroke: 1,
    margin: {top: 1, bottom: 3}},
  // *flow geometries include a margin to set off the flow from elements above and
  // below; this is redundant for all except the birdView which needs an independent
  // margin to afford space for the brush.
  //  - maxTracks this parameter sets the limit on the number of timeline tracks
  //              that can be viewed in the pane; this is not a limit on the total
  //              tracks allowed in a session which can be greater. The value for
  //              birdView.maxTracks should always be equal or gt
  //              timeFlow.maxTracks or vertical scrolling will fail.
  // - track.height sets the height of the timeline track for the given flow.
  // - track.space sets the verticle space between adjacent timeline tracks.
  infoFlow: {maxTracks: 17, minTracks: 3, maxHeight: 2880,
    margin: {top: 0, bottom: 0},
    track: {maxHeight: 160, height: 160, space: 0}},
  timeFlow: {maxTracks: 17, minTracks: 3, maxHeight: 292,
    margin: {top: 3, bottom: 3},
    track: {maxHeight: 14, height: 14, space: 3}},
  birdView: {maxTracks: 17, minTracks: 17, maxHeight: 17,
    margin: {top: 1, bottom: 1},
    track: {maxHeight: 1, height: 1, space: 0}},
  // - totalTracks is reset after processing the data.
  vScroll: {margin: {left: 2, right: 2}},
  totalTracks: 0,
  fitToScale: 0.05, // The percent of full scale to use as a target for ensuring
                    // all timeline track labels are legible (w/o overlap). this
                    // value is also used to set the pad amount for the start and
                    // end of the timeline.
  instantRadius: 5,
  brushExtent: [],

// flowHeight - determines the height in pixels of the named flow where flowName
// is one of ["timeFlow", "birdView"].
//  - visible is boolean that returns the height of the flow that is inside the
//            region when true and, when false, returns the height of the total flow.

  flowHeight: function(flowName, visible) {
    return this[flowName].margin.top +
      (this[flowName].track.height + this[flowName].track.space) * ((visible) ?
        Math.max(Math.min(this.totalTracks, this.timeFlow.maxTracks),
        this[flowName].minTracks) : Math.max(this.totalTracks, this[flowName].minTracks)) -
        this[flowName].track.space + this[flowName].margin.bottom;
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
var spatioFlow = true;

function isString (obj) {
 return (Object.prototype.toString.call(obj) === '[object String]');
}

// fcn to return the width (in pixels) of a string to be rendered on canvas.
// This fcn is used to help provide "pretty" tracks with fully readable labels
// at some prescribed zoom level.

function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return Math.floor(metrics.width+1);
};
