//  A timeline component for d3
//  version v0.1

function timeline(domTimelineElement, domSpatioFlowElement, domInfoFlowElement) {

    //--------------------------------------------------------------------------
    //
    // chart
    //

    // global timeline variables
    var timeline = {},   // The timeline
        data = {},       // Container for the data
        components = [], // All the components of the timeline for redrawing
        bandGap = 25,    // Arbitray gap between to consecutive bands
        bands = {},      // Registry for all the bands in the timeline
        bandY = 0,       // Y-Position of the next band
        bandNum = 0,     // Count of bands for ids
        totalTracks = 0,
        itemsPerTrack = [];

    var svg = d3.select(domTimelineElement).append("svg");
    var chart = svg;
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("visibility", "visible");

    //--------------------------------------------------------------------------
    //
    // data
    //

    timeline.data = function(items) {

        var today = new Date(),
            tracks = [],
            yearMillis = 31622400000,
            instantOffset = 100 * yearMillis;

        data.items = items;

        function showItems(n) {
            var count = 0, n = n || 10;
            console.log("\n");
            items.forEach(function (d) {
                count++;
                if (count > n) return;
                //console.log(toYear(d.start) + " - " + toYear(d.end) + ": " + d.label);
                //console.log("Item: " + count + ":" + d.start + " - " + d.end + ": " + d.label);
                console.log("Item: " + count + ": size: ", d3.keys(d).length, ": keys: ", d3.keys(d), "data: ", d);
            })
        }

        function showJsonItems(n) {
            var count = 0, n = n || 10;
            console.log("\n");
            console.log(Object.keys(items));
            /*
            for (var prop in items) {
              if (items.hasOwnProperty(prop)) {
                count++;
                if (count > n) return;
                console.log(prop);
              }
            }
            */
          };

 //showItems();

        function compareAscending(item1, item2) {
            //compareAscending sorts events according to the following:
            // youngest sorts first; longest duration sorts first in event of tie.

            // Every item must have two fields: 'start' and 'end'.
            var result = item1.start - item2.start;
            if (result < 0) { return -1; }  // item1 starts prior to item2 and sorts earlier
            if (result > 0) { return 1; }   // item2 starts prior to item1 and sorts earlier
            // Start times are equal
            // sort longer events earlier
            result = item2.end - item1.end;
            if (result < 0) { return -1; } // item1 ends after item2 and sorts earlier
            if (result > 0) { return 1; }  // item2 ends after item1 and sorts earlier
            // identical start and end times
            return 0;
        }

        function compareDescending(item1, item2) {
            //compareDescending sorts events according to the following:
            // oldest sorts first; shortest duration sorts first in event of tie.

            // Every item must have two fields: 'start' and 'end'.
            var result = item1.start - item2.start;
            // later first
            if (result < 0) { return 1; }  // item1 starts prior to item2 and sorts later
            if (result > 0) { return -1; } // item2 starts prior to item1 and sorts later
            // shorter first
            result = item2.end - item1.end;
            if (result < 0) { return 1; }  // item1 ends after item2 and sorts later
            if (result > 0) { return -1; } // item2 ends after item1 and sorts later
            // identical start and end times
            return 0;
        }

        function calculateTracks(items, sortOrder, timeOrder) {
            var i, track;

            sortOrder = sortOrder || "descending"; // "ascending" or default to "descending"
            timeOrder = timeOrder || "backward";   // "forward" or default to "backward"

            function sortBackward() {
                // older items assigned to early tracks
                tracks[0] = Number.MAX_SAFE_INTEGER;
                items.forEach(function (item) {
                    for (i = 0, track = 0; i < tracks.length; i++, track++) {
                        if (item.end < tracks[i]) { break; }
                    }
                    item.track = track;
                    tracks[track] = item.start;
                });
            }

            function sortForward() {
                // younger items assigned to early tracks
                tracks[0] = Number.MIN_SAFE_INTEGER;
                itemsPerTrack[0] = 0;
                items.forEach(function (item) {
                    for (i = 0, track = 0; i < tracks.length; i++, track++) {
                        if (item.start > tracks[i]) break;
                    }
                    item.track = track;
                    if (track > totalTracks - 1) {
                      totalTracks++;
                      itemsPerTrack[totalTracks] = 0;
                    }
                    itemsPerTrack[track]++;
                    tracks[track] = item.end;
                });
            }

            if (sortOrder === "ascending")
                data.items.sort(compareAscending);
            else
                data.items.sort(compareDescending);

  //          showItems(256);

            if (timeOrder === "forward")
                sortForward();
            else
                sortBackward();
        }

        // Convert yearStrings into dates
        data.items.forEach(function (item){
            item.start = parseDate(item.start);
            if (item.end == "") {
                //console.log("1 item.start: " + item.start);
                //console.log("2 item.end: " + item.end);
                item.end = new Date(item.start.getTime() + instantOffset);
                //console.log("3 item.end: " + item.end);
                item.instant = true;
            } else {
                //console.log("4 item.end: " + item.end);
                item.end = parseDate(item.end);
                item.instant = false;
            }
            // The timeline never reaches into the future.
            // This is an arbitrary decision.
            // Comment out, if dates in the future should be allowed.
            if (item.end > today) { item.end = today};
        });

        //calculateTracks(data.items);
        // Show patterns
        //calculateTracks(data.items, "ascending", "backward");
        //calculateTracks(data.items, "descending", "forward");
        // Show real data
        //calculateTracks(data.items, "descending", "backward");
        calculateTracks(data.items, "ascending", "forward");
        data.nTracks = tracks.length;
        data.minDate = d3.min(data.items, function (d) { return d.start; });
        data.maxDate = d3.max(data.items, function (d) { return d.end; });
  //      console.log(timelineGeometry);

        return timeline;
    };


    timeline.defineTimelineArea = function( ) {
      // Create svg element
        svg.attr("class", "svg")
           .attr("id", "svg")
           .attr("width", timelineGeometry.maxWidth)
           .attr("height", timelineGeometry.margin.top + timelineGeometry.margin.top +
              timelineGeometry.timeFlow.track.margin +
              (timelineGeometry.timeFlow.track.height + timelineGeometry.timeFlow.track.margin) *
                        Math.max(totalTracks, timelineGeometry.timeFlow.minTracks) +
              (timelineGeometry.birdView.track.height + timelineGeometry.birdView.track.margin) *
                        Math.max(totalTracks, timelineGeometry.birdView.minTracks) +
              ((timelineGeometry.axis.labelHeight + timelineGeometry.axis.tickHeight +
              timelineGeometry.axis.lineStroke) * 2) + timelineGeometry.axis.margin)
           .append("g")
    // Translation does not include the margin.top in the Y coordinate to prevent
    // clipping of labels in the top margin.
             .attr("transform", "translate(" + timelineGeometry.margin.left + ", 0)")
             .append("clipPath")
                .attr("id", "chart-area")
                .append("rect")
                .attr("width", timelineGeometry.maxWidth - timelineGeometry.margin.left -
                  timelineGeometry.margin.right)
    // Size of clip path updated to encompass margin.top and margin.bottom to enable
    //  using the top and bottom margins as a label region.
                .attr("height", timelineGeometry.margin.top + timelineGeometry.margin.top +
                  timelineGeometry.timeFlow.track.margin +
                  (timelineGeometry.timeFlow.track.height + timelineGeometry.timeFlow.track.margin) *
                            Math.max(totalTracks, timelineGeometry.timeFlow.minTracks) +
                  (timelineGeometry.birdView.track.height + timelineGeometry.birdView.track.margin) *
                            Math.max(totalTracks, timelineGeometry.birdView.minTracks) +
                  ((timelineGeometry.axis.labelHeight + timelineGeometry.axis.tickHeight +
                  timelineGeometry.axis.lineStroke) * 2) + timelineGeometry.axis.margin);

        chart = chart.select("g").append("g")
            .attr("class", "chart")
            .attr("clip-path", "url(#chart-area)" );

        return timeline;
    }
    //----------------------------------------------------------------------
    //
    // band
    //

    timeline.band = function (bandName) {
//      console.log("Building band:" + bandName, "Geometry:", timelineGeometry[bandName]);
      console.log("Building band:" + bandName);
//      console.log(itemsPerTrack);

        var band = {};
        band.id = "band" + bandNum;
        band.x = 0;
        band.y = bandY;
        band.w = timelineGeometry.maxWidth - timelineGeometry.margin.left -
          timelineGeometry.margin.right;
        band.h = timelineGeometry[bandName].track.margin +
          (timelineGeometry[bandName].track.height + timelineGeometry[bandName].track.margin) *
                    Math.max(totalTracks, timelineGeometry[bandName].minTracks);
        //console.log("band.h", band.h);
        // trackOffset controls distance of first track from band edge and other tracks

        band.trackOffset = timelineGeometry[bandName].track.margin;
        band.itemHeight = timelineGeometry[bandName].track.height;
        band.trackHeight = band.trackOffset + band.itemHeight;
        band.parts = [],
        band.instantWidth = 100; // arbitray value

        band.xScale = d3.time.scale()
            .domain([data.minDate, data.maxDate])
            .range([0, band.w]);

        band.yScale = function (track) {
            return band.trackOffset + track * band.trackHeight;
        };
  // Translating y coordinate by + margin.top here because the margin.top
  // translation was removed from the chart clip area translation to enable
  // using the top margin for label data. This means margin.top must be added
  // to all chart elements separately.

        band.g = chart.append("g")
            .attr("id", band.id)
            .attr("transform", "translate(0," + (band.y + timelineGeometry.margin.top) + ")");

        band.g.append("rect")
            .attr("class", "band")
            .attr("width", band.w)
            .attr("height", band.h);

        if (bandName === "timeFlow") {
          band.g.append("svg")
           .attr("y", "2")
           .attr("height", band.itemHeight + 2)
           .attr("class", "infoRow")
           .attr("id", "infoRow")
           .append("rect")
           .attr("width", band.w)
           .attr("height", band.itemHeight + 2);
        }

        // Items
        var items = band.g.selectAll("g")
            .data(data.items)
            .enter().append("svg")
            .attr("y", function (d) { return band.yScale(d.track); })
            .attr("height", band.itemHeight)
            .attr("class", function (d) { return d.instant ? "part instant" : "part interval";});

        var intervals = d3.select("#band" + bandNum).selectAll(".interval");

        if (bandName === "timeFlow") {
          intervals.append("rect")
            .attr("fill", "#AAFFFF")
            .attr("width", "100%")
            .attr("height", "100%");

          // Apply event labels to timeFlow (not visible on birdView)
          intervals.append("text")
            .attr("class", "intervalLabel")
            .attr("x", 1)
            .attr("y", 10)
            .text(function (d) { return d.label; });
        } else {
          // Draw bird's eye view tracks
          intervals.append("rect")
            .attr("fill", "#808080")
            .attr("width", "100%")
            .attr("height", "100%");
        }

        var instants = d3.select("#band" + bandNum).selectAll(".instant");
        instants.append("circle")
            .attr("cx", band.itemHeight / 2)
            .attr("cy", band.itemHeight / 2)
            .attr("r", 5);

        if (bandName === "timeFlow") {
          // Apply event labels to timeFlow (not visible on birdView)
          instants.append("text")
              .attr("class", "instantLabel")
              .attr("x", 15)
              .attr("y", 10)
              .text(function (d) { return d.label; });
        };

        band.addActions = function(actions) {
            // actions - array: [[trigger, function], ...]
            actions.forEach(function (action) {
                items.on(action[0], action[1]);
            })
        };

        band.redraw = function () {
            items
                .attr("x", function (d) { return band.xScale(d.start);})
                .attr("width", function (d) {
                    return band.xScale(d.end) - band.xScale(d.start); });
            band.parts.forEach(function(part) { part.redraw(); })
//console.log("band.parts[1]:", band.parts[1]);
//scrubberValue(band.parts[1], items);
            if (band.id === "band0") scrubberValue(band);
        };

        bands[bandName] = band;
        components.push(band);
        // Adjust values for next band
        bandY += band.h + bandGap;
        bandNum += 1;

        return timeline;
    };

    //----------------------------------------------------------------------
    //
    // infoFlow
    //

    function scrubberValue(bandRef) {
        var scrubberWindow = [];
        var infoFlowValues = [];
        data.items.forEach(function (value) {
            var arrayObject = new Object();
            arrayObject.start = value.start;
            arrayObject.end = value.end;
            arrayObject.label = value.label;
            arrayObject.loc = value.loc;
            arrayObject.proximity = "0";
            arrayObject.track = value.track;
            infoFlowValues.push(arrayObject);
        });
        bandRef.parts[1].forEach(function (part) {
            scrubberWindow.push(part);
        });
//        var scrubberWindowRange = parseInt(scrubberWindow[0][0].innerHTML);
//        var referenceValue = parseInt(scrubberWindow[0][1].innerHTML);
        var scrubberWindowRange = parseFloat(scrubberWindow[0][0].innerHTML);
        var referenceValue = parseFloat(scrubberWindow[0][1].innerHTML);
        generateInfoFlow(bandRef, infoFlowValues, scrubberWindowRange, referenceValue);
    }

    function generateInfoFlow(band, infoFlowValues, scrubberWindowRange, referenceValue) {
        var maxProximity = scrubberWindowRange / 2;
        var start = referenceValue - maxProximity;
        var end = referenceValue + maxProximity;
        var currentReferenceEventGap = Number.MAX_SAFE_INTEGER;
        var eventsWithinScruber = [];
        var referenceEvent = [];
        var numValue = 1;
        var referenceBoundedByEvent = false;

        infoFlowValues.forEach(function (value) {
//          console.log(numValue, value);
          numValue = numValue + 1;
            var startDateOfEvent = value.start.getUTCFullYear() +
                ((value.start.getUTCMonth() + value.start.getUTCDate()/32)/12);
            var endDateOfEvent = value.end.getUTCFullYear() +
                ((value.end.getUTCMonth() + value.end.getUTCDate()/32)/12);
            if ((startDateOfEvent >= start && endDateOfEvent <= end) ||
               (startDateOfEvent < start && (endDateOfEvent > start)) ||
               (startDateOfEvent >= start && startDateOfEvent < end)) {
                 var eventStartToReferenceGap = referenceValue - startDateOfEvent;
                 var eventStopToReferenceGap = endDateOfEvent - referenceValue;
                // proximity measures distance of event from the reference line;
                // in order to have the closer proximities look darker on the
                // choropleth map, subtract the proximity to center from the
                // total range of the scrubber window. In essence, this assigns
                // larger values to events closest to the reference line.
                if (startDateOfEvent <= referenceValue && referenceValue <= endDateOfEvent) {
                  value.proximity = (maxProximity + 2);
        //          console.log("\nBAM!!!", value.label, value.start, value.end, value.proximity);
                } else {
                  value.proximity = Math.max(Math.max(0, (maxProximity - Math.abs(eventStartToReferenceGap))),
                  (maxProximity - Math.abs(referenceValue - endDateOfEvent)));
//                  value.proximity = Math.max(value.proximity, (scrubberWindowRange -
//                    Math.abs(referenceValue - endDateOfEvent))).toString();
                }
                // Is location unique? If not, do max hold on proximity.
                eventsWithinScruber.forEach(function(eventItem) {
                  if (value.loc === eventItem.loc) {
                    var eventProximity = parseFloat(eventItem.proximity);
                    if (value.proximity > eventProximity) {
        // console.log("\nswapping eventItem:", eventItem.proximity, " for value:", value.proximity);
                      eventItem.proximity = value.proximity.toString();
                    } else {
        // console.log("\nretaining eventItem:", eventItem.proximity, " over value:", value.proximity);
                      value.proximity = eventProximity;
                    }
                  }
                })
                value.proximity = value.proximity.toString();
                eventsWithinScruber.push(value);

// Find the tighest event bounding the reference or, if no bounding event, then
// the event closest to the reference.

                if (eventStartToReferenceGap > 0 && eventStopToReferenceGap > 0) {
                  if (!referenceBoundedByEvent) {
                    referenceBoundedByEvent = true;
                    currentReferenceEventGap = eventStartToReferenceGap + eventStopToReferenceGap;
                    referenceEvent.push(value);
                  } else if (eventStartToReferenceGap + eventStopToReferenceGap < currentReferenceEventGap) {
                    currentReferenceEventGap = eventStartToReferenceGap + eventStopToReferenceGap;
                    referenceEvent.push(value);
                  }
                } else if (!referenceBoundedByEvent && eventStartToReferenceGap < 0) {
                    // reference is in past relative to event
                    if (Math.abs(eventStartToReferenceGap) < currentReferenceEventGap) {
                      currentReferenceEventGap = Math.abs(eventStartToReferenceGap);
                      referenceEvent.push(value);
                    }
                } else if (!referenceBoundedByEvent && eventStopToReferenceGap < 0) {
                    // refence is in the future relative to event
                    if (Math.abs(eventStopToReferenceGap) < currentReferenceEventGap) {
                      currentReferenceEventGap = Math.abs(eventStopToReferenceGap);
                      referenceEvent.push(value);
                    }
                }
            }
        });

        if(referenceEvent.length==0){
            referenceEvent[0] = "";
        }
        // Highlight the timeline row corresponding to the cards in the
        // info-flow band.
        d3.select(".infoRow")
            .attr("y", referenceEvent[referenceEvent.length-1].track * band.trackHeight + band.trackOffset - 1);
            var centre = displayInfoFlow(eventsWithinScruber, referenceEvent[referenceEvent.length-1]);
            var locations = updateSpatioFlow(eventsWithinScruber, maxProximity);


    }

    function updateSpatioFlow(eventLocations, maxProximity) {

      var map = d3.geomap.choropleth()
                  .geofile('/d3-geomap/topojson/world/countries.json')
//                  .colors(['red','green'])
//                  .colors(['rgb(247,251,255)','rgb(222,235,247)','rgb(198,219,239)','rgb(158,202,225)','rgb(107,174,214)','rgb(66,146,198)','rgb(33,113,181)','rgb(8,81,156)','rgb(8,48,107)'])
//                  .colors(['rgb(255,255,255)','rgb(253,229,230)','rgb(251,204,206)',
//                    'rgb(249,178,181)','rgb(247,153,157)','rgb(245,127,132)',
//                    'rgb(243,102,108)','rgb(241,76,83)','rgb(239,51,59)',
//                    'rgb(237,25,34)','rgb(241,76,83)','rgb(235,0,10)'])
                  .domain([0, maxProximity + 2])
//                  .legend(true)
                  .column('proximity')
                  .unitId('loc')
                  .postUpdate(function() {

                  // Remove old maps tagged with the "base" id.

                      d3.selectAll(domSpatioFlow)
                        .select('#base').remove();

// Attach the "base" id to the newly created map - this will be removed AFTER
// the next map is draw. Delaying the removal of the prior map provides
// smooth animatation of the region shading.

                      var spatioFlowTagSvg = d3.selectAll(domSpatioFlow)
                                                .select('#map')
                                                .select('svg')
                                                .attr('id', 'base');});

      //console.log(eventLocation);
      // Map new locations - this will append a new svg section for the map.
      // Old maps are removed in the postUpdate function -
      var spatioFlowAddMap = d3.selectAll(domSpatioFlow)
                               .select('#map')
                               .datum(eventLocations)
                               .call(map.draw, map);

    }

    function displayInfoFlow(eventsWithinScruber, centreDisplayValue) {

    //  console.log(topKeys);
    /*
    // Cache of the template
    var template = document.getElementById("template-table-item");
    // Get the contents of the template
    var templateHtml = template.innerHTML;
    // Final HTML variable as empty string
    var tableHtml = "";

    // Loop through dataObject, replace placeholder tags
    // with actual data, and generate final HTML
    d3.keys(centreDisplayValue).forEach(function (d) {
        //console.log(toYear(d.start) + " - " + toYear(d.end) + ": " + d.label);
        //console.log("Item: " + count + ":" + d.start + " - " + d.end + ": " + d.label);
//        console.log("Item: " + count + ": size: ", d3.keys(d).length, ": keys: ", d3.keys(d), "data: ", d);
        tableHtml += templateHtml.replace(/{{field}}/g, d)
                                .replace(/{{value}}/g, centreDisplayValue[d]);

    })

    // Replace the HTML of #list with final HTML
    document.getElementById("table").innerHTML = tableHtml;
    */
        var infoFlowTextLabel = d3.selectAll(domInfoFlow)
          .select(".band")
          .selectAll("g")
          .select("#label")
          .attr("transform", "translate(2, 10)")
          .text(centreDisplayValue.label);

        var infoFlowTextBegin = d3.selectAll(domInfoFlow)
            .select(".band")
            .selectAll("g")
            .select("#begin")
            .attr("transform", "translate(2, 20)")
            .text(centreDisplayValue.start);

        var infoFlowTextBegin = d3.selectAll(domInfoFlow)
            .select(".band")
            .selectAll("g")
            .select("#end")
            .attr("transform", "translate(2, 30)")
            .text(centreDisplayValue.end);

        var infoFlowTextBegin = d3.selectAll(domInfoFlow)
            .select(".band")
            .selectAll("g")
            .select("#loc")
            .attr("transform", "translate(2, 40)")
            .text(centreDisplayValue.loc);

    }

    //----------------------------------------------------------------------
    //
    // labels
    //

    timeline.labels = function (bandName) {
console.log("Labeling band:" + bandName);
        var band = bands[bandName],
            labelWidth = 46,
            labelHeight = 20,
            labelTop = band.y + band.h - 10,
            y = band.y + band.h + 1,
            yText = 15;
//console.log(labelTop, band.y, band.h);

  // Condition on bandName used to resrict labeling the main band with only the
  // middle label - this is purely for aesthetics as the start and end labels
  // don't necessarily add much to the main band when the scrubber window is
  // active. To add the start and end labels back to the timeFlow, remove the
  // check for bandName along with the false branch.

  // labelDefs[<element id>, <element class>, <rect x position>, <text x position>,
  //           <fcn returning text value>, <tooltip text>, <tooltip x offset>,
  //           <tooltip y offset>]

        var labelDefs = (bandName === "birdView") ? [
            ["start", "bandBoundLabel", 0, labelWidth / 4,
                function(min, max) { return toYear(min); },
                "Beginning of time window", band.x + 80, timelineGeometry.maxWidth + 180],
            ["end", "bandBoundLabel", band.w - labelWidth, band.w - labelWidth / 4,
                function(min, max) { return toYear(max); },
                "Ending of time window", band.x + band.w - 200, timelineGeometry.maxWidth + 180],
            ["range", "bandRangeLabel", (band.w - labelWidth) / 2, band.w / 2 - labelWidth / 4,
                function(min, max) { return max.getUTCFullYear() - min.getUTCFullYear(); },
                "Range of data window", band.x + band.w / 2 + 75, timelineGeometry.maxWidth + 180]] :
            // if bandName = timeFlow then only set the middle label
            [["scrubWindow", "bandRangeLabel", 0, labelWidth / 3,
                function(min, max) { return max.getUTCFullYear() - min.getUTCFullYear(); },
                "Range of scrubber window", timelineGeometry.margin.left + labelWidth + 20, 200],
              ["reference", "bandReferenceLabel", (band.w - labelWidth) / 2,
                 band.w / 2 - labelWidth / 3,
                 function(min, max) {return (((max.getUTCFullYear() + (max.getUTCMonth() + max.getUTCDate()/32)/12) -
                                            (min.getUTCFullYear() + (min.getUTCMonth() + min.getUTCDate()/32)/12))/2 +
                                             min.getUTCFullYear() + (min.getUTCMonth() + min.getUTCDate()/32)/12);},
                 "Reference Instant", timelineGeometry.maxWidth/2 + labelWidth, 200]
            ];

        var bandLabels = chart.append("g")
            .attr("id", bandName + "Labels")

    // Check for timeFlow and if so, don't translate the y coordinate to place
    // timeFlow labels in the top margin (0 translation) and birdView labels in
    // the bottom margin.

            .attr("transform", "translate(0," + ((bandName === "timeFlow") ? "0" :
                    (band.y + band.h + 1 + timelineGeometry.margin.top + timelineGeometry.margin.bottom)) +  ")")
            .selectAll("#" + bandName + "Labels")
            .data(labelDefs)
            .enter().append("g")
            .on("mouseover", function(d) {
                tooltip.html(d[5])
                    .style("top", d[7] + "px")
                    .style("left", d[6] + "px")
                    .style("visibility", "visible");
                })
            .on("mouseout", function(){
                tooltip.style("visibility", "hidden");
            });

        bandLabels.append("rect")
            .attr("class", "bandLabel")
            .attr("x", function(d) { return d[2];})
            .attr("width", labelWidth)
            .attr("height", labelHeight)
            .style("opacity", 1);

        var labels = bandLabels.append("text")
            .attr("class", function(d) { return d[1];})
            .attr("id", function(d) { return d[0];})
            .attr("x", function(d) { return d[3];})
            .attr("y", yText)
            .attr("text-anchor", function(d) { return d[0];});

        labels.redraw = function () {
            var min = band.xScale.domain()[0],
                max = band.xScale.domain()[1];

            labels.text(function (d) { return d[4](min, max).toFixed(1); })

        };

        band.parts.push(labels);
        components.push(labels);

        //console.log("labels d:", bandName);

        return timeline;
    };

    //----------------------------------------------------------------------
    //
    // tooltips
    //

    timeline.tooltips = function (bandName) {

        var band = bands[bandName];

        band.addActions([
            // trigger, function
            ["mouseover", showTooltip],
            ["mouseout", hideTooltip]
        ]);

        function getHtml(element, d) {
            var html;
            if (element.attr("class") == "interval") {
                html = d.label + "<br>" + toYear(d.start) + " - " + toYear(d.end);
            } else {
                html = d.label + "<br>" + toYear(d.start);
            }
            return html;
        }

        function showTooltip (d) {

            var x = event.pageX < band.x + band.w / 2
                    ? event.pageX + 10
                    : event.pageX - 110,
                y = event.pageY < band.y + band.h / 2
                    ? event.pageY + 30
                    : event.pageY - 30;

            tooltip
                .html(getHtml(d3.select(this), d))
                .style("top", y + "px")
                .style("left", x + "px")
                .style("visibility", "visible");
        }

        function hideTooltip () {
            tooltip.style("visibility", "hidden");
        }

        return timeline;
    };

    //----------------------------------------------------------------------
    //
    // xAxis
    //

    timeline.xAxis = function (bandName, orientation) {

        var band = bands[bandName];

        var axis = d3.svg.axis()
            .scale(band.xScale)
            .orient(orientation || "bottom")
            .tickSize(6, 0)
            .tickFormat(function (d) { return toYear(d); });

        var xAxis = chart.append("g")
            .attr("class", "axis")

      // Add margin.top to y coordinate translation to account for top margin.
            .attr("transform", "translate(0," + (band.y + band.h + timelineGeometry.margin.top) + ")");

        xAxis.redraw = function () {
            xAxis.call(axis);
        };

        band.parts.push(xAxis); // for brush.redraw
        components.push(xAxis); // for timeline.redraw

        return timeline;
    };

    //----------------------------------------------------------------------
    //
    // brush
    //

    timeline.brush = function (bandName, targetNames) {

        var band = bands[bandName];

        var brush = d3.svg.brush()
            .x(band.xScale.range([0, band.w]))
            .on("brush", function() {
                var domain = brush.empty()
                    ? band.xScale.domain()
                    : brush.extent();
                targetNames.forEach(function(d) {
                    bands[d].xScale.domain(domain);
                    bands[d].redraw();
    //                console.log("moving: d",d,domain);
                });
            });

        var xBrush = band.g.append("svg")
            .attr("class", "x brush")
            .call(brush);

        xBrush.selectAll("rect")
            .attr("y", 0)
            .attr("height", band.h);

        return timeline;
    };

// mainReference draws the center reference line on the timeline. This is the
// reference point for the center of the infoFlow.

    timeline.mainReference = function(bandName) {
      var band = bands[bandName];

      var mainReference = chart.append("g")
          .attr("class", "referenceline")
          .append("line")
    // Add margin.top to y coordinate translations to leave gap for top margin.
          .attr("x1", band.w/2).attr("y1", timelineGeometry.margin.top).attr("x2", band.w/2).attr("y2", band.h + timelineGeometry.margin.top);
        return timeline;
    };

    //----------------------------------------------------------------------
    //
    // redraw
    //

    timeline.redraw = function () {
        components.forEach(function (component) {
            component.redraw();
        })
    };

    //--------------------------------------------------------------------------
    //
    // Utility functions
    //

    function parseDate(dateString) {
        // 'dateString' must either conform to the ISO date format YYYY-MM-DD
        // or be a full year without month and day.
        // AD years may not contain letters, only digits '0'-'9'!
        // Invalid AD years: '10 AD', '1234 AD', '500 CE', '300 n.Chr.'
        // Valid AD years: '1', '99', '2013'
        // BC years must contain letters or negative numbers!
        // Valid BC years: '1 BC', '-1', '12 BCE', '10 v.Chr.', '-384'
        // A dateString of '0' will be converted to '1 BC'.
        // Because JavaScript can't define AD years between 0..99,
        // these years require a special treatment.

        var format = d3.time.format("%Y-%m-%d"),
            date,
            year;

        date = format.parse(dateString);
        if (date !== null) return date;

        // BC yearStrings are not numbers!
        if (isNaN(dateString)) { // Handle BC year
            // Remove non-digits, convert to negative number
            year = -(dateString.replace(/[^0-9]/g, ""));
        } else { // Handle AD year
            // Convert to positive number
            year = +dateString;
        }
        if (year < 0 || year > 99) { // 'Normal' dates
            date = new Date(year, 6, 1);
        } else if (year == 0) { // Year 0 is '1 BC'
            date = new Date (-1, 6, 1);
        } else { // Create arbitrary year and then set the correct year
            // For full years, I chose to set the date to mid year (1st of July).
            date = new Date(year, 6, 1);
            date.setUTCFullYear(("0000" + year).slice(-4));
        }
        // Finally create the date
        return date;
    }

    function toYear(date, bcString) {
        // bcString is the prefix or postfix for BC dates.
        // If bcString starts with '-' (minus),
        // if will be placed in front of the year.
        bcString = bcString || " BC" // With blank!
        var year = date.getUTCFullYear();
//        if (year > 0) return year.toString();
        if (year > 0) return year;
        if (bcString[0] == '-') return bcString + (-year);
        return (-year) + bcString;
    }

    return timeline;
}
