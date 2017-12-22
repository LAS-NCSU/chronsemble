// chart geometry
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    outerWidth = 960,
    outerHeight = 400,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var infoFlowCards = 5,      // number of cards visible in info pane.
    cardLateralMargin = 5,  // number of pixels between cards.
    infoFlowCardWidth = (outerWidth - margin.left - margin.right -
        (infoFlowCards - 1) * cardLateralMargin) / infoFlowCards,
    infoFlowCardHeight = outerHeight - margin.top - margin.bottom;

var topKeys = d3.set(["label", "SideA", "SideB", "start", "end", "whereFought",
                           "loc", "Initiator", "Outcome", "SideADeaths",
                           "SideBDeaths"]);
