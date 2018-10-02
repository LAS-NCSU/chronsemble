// timeline geometry

var sortDirection = { unsorted: 0, forward : 1, reverse : 2};
// pwlTrackDomains is the 2D array that holds the piecewise linear temporal values
//  for the events in a timeline row.
// pwlTrackRanges is the 2D array that holds the piecewise linear ranges that
//  map to the correspionding pwlTrackDomains.
var pwlTrackDomains = [];
var pwlTrackRanges = [];
var fileList = [];
var fileData = null;
var configData = [];
var csblLogString = null;
var csblFileKeys = null;

var symbolsUnicode = {
  diamond: '\u2666',
  ballotBox: '\u25A3',
  ballotBox2: '\u2610',
  pushButtonOff: '\u{1F532}',
  pushButtonOn: '\u{1F533}',
  lightVerticle: '\u2502',
  heavyVerticle: '\u2503',
  lightHorizontal: '\u2500',
  heavyHorizontal: '\u2501',
  lightDashedHorizontal: '\u2508',
  heavyDashedHorizontal: '\u2509',
}

var translationTable = {
  headings: [{key: "dataField", title: "Data Field"},
             {key: "infocard", title: '<span class="i fa pficon-info"></span>'},
             //{key: "infocard", title: "+ Info Card"},
             {key: "sampleTyp", title: "Sample A"},
             {key: "sampleATyp", title: "Sample B"},
             {key: "format", title: "Kind"},
             {key: "accuracy", title: "Accuracy"}]
};
var tabSettings = {};
var statusFieldSeparator = " " + symbolsUnicode.lightDashedHorizontal + symbolsUnicode.lightDashedHorizontal + " ";

var timelineGeometry = {
  // The height of the timeflow pane is determined by the value of
  // - timeFlow.maxTracks this sets the maximum number of tracks that can be
  //                      viewed simultaneously on the timeflow pane.
  //maxWidth: 938,    // Maximum width of the timeflow and all other panes
  maxWidth: Math.max(window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth, 767) - 30,
  infoFlowHeight: 200,    // Height of infoflow pane - width is based on timeflow pane
//  infoFlowCardWidth: 182,    // Width of infoflow cards
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
  statusBar: {lines: 1 , height: 20,
    margin: {top: 2, bottom: 2}},
  infoFlow: {maxTracks: 1, minTracks: 1, maxHeight: 2880,
    margin: {top: 0, bottom: 0},
    track: {maxHeight: 160, height: 160, space: 2},
    card: {numberInPane: 4, width: null}},
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
                    // all timeline track labels are legible (w/o overlap). This
                    // value is also used to set the pad amount for the start and
                    // end of the timeline. Typically should not exceed 20%. A
                    // value of 100% will attempt to ensure all labels are legible
                    // at the fully zoomed out level which will likely cause timeline
                    // tracks to grow beyond practical use.
  instantRadius: 5,
  brushExtent: [],
  eventSortDirection: sortDirection.unsorted,
  verticalCursor: {currentTrack: null, previousTrack: null},
//  verticalCursorTrack: null,
  currentReferenceValue: null,

// flowHeight - determines the height in pixels of the named flow where flowName
// is one of ["infoFlow", "timeFlow", "birdView"].
//  - visible is boolean that returns the height of the flow that is inside the
//            visible (non-clipped) region when true and, when false, returns
//            the height of the total flow.

  flowHeight: function(flowName, visible) {
    var visibleTracks = Math.max(Math.min(this.totalTracks, this[flowName].maxTracks),
                            this[flowName].minTracks);

    // in the event that there is only 1 visible track, do not add the "space"
    // between tracks value into the height computation.

//    return this[flowName].margin.top + (this[flowName].track.height +
//      ((visibleTracks > 1) ? this[flowName].track.space : 0)) * ((visible) ?
//        visibleTracks : Math.max(this.totalTracks, this[flowName].minTracks)) -
//        this[flowName].track.space + this[flowName].margin.bottom;
    return this[flowName].margin.top + (this[flowName].track.height +
        this[flowName].track.space) * ((visible) ?
        visibleTracks : Math.max(this.totalTracks, this[flowName].minTracks)) -
        this[flowName].track.space + this[flowName].margin.bottom;

  },

  axisHeight: function( ) {
    return this.axis.labelHeight + this.axis.tickHeight + this.axis.lineStroke +
      this.axis.margin.top + this.axis.margin.bottom;
  }
}


if (timelineGeometry.birdView.maxTracks > timelineGeometry.timeFlow.maxTracks)
  console.warn("WARNING: timeline geometry value out of range: Bird's eye view maxTracks should be less than or equal to timeFlow maxTracks!!!");
/*
var infoFlowCards = 5,      // number of cards visible in info pane.
    cardLateralMargin = 5,  // number of pixels between cards.
    infoFlowCardWidth = (timelineGeometry.maxWidth - timelineGeometry.margin.left -
      timelineGeometry.margin.right - (infoFlowCards - 1) * cardLateralMargin) / infoFlowCards,
    infoFlowCardHeight = 200 - timelineGeometry.margin.top - timelineGeometry.margin.bottom;
*/
var topKeys = d3.set(["label", "SideA", "SideB", "start", "end", "whereFought",
                           "loc", "Initiator", "Outcome", "SideADeaths",
                           "SideBDeaths"]);
var hasSpatioFlow = null;
var hasInfoFlow = null;

function isString (obj) {
 return (Object.prototype.toString.call(obj) === '[object String]');
}



var processFileData = function (dataObject, aFile) {
  var tempSize = 0;
  //console.log(csvObject);
  timelineGeometry.maxWidth = Math.max(window.innerWidth || document.documentElement.clientWidth ||
            document.body.clientWidth, 767) - 30;
  if (aFile.type === 'text/csv') {
    fileData=d3.csv.parse(dataObject);
  } else if (aFile.type === 'text/json' || aFile.type === 'application/json') {
    fileData=JSON.parse(dataObject);
  } else {
    console.warn("ERROR: bad file type: " + aFile.type);
    clearFileInput(document.getElementById("file-read"));
    return;
  }

  //confiData = d3.keys(fileData[0]);
  //console.log(confiData);
  //$('#table1').DataTable().column(1).header().textContent='Hello World';
  //console.log($('#table1').DataTable().column(1).header());

  tabSettings = new Settings('Settings', fileData);
  //console.log(tabSettings[translationTable.headings[0].key]); //dataField
  //console.log(tabSettings[translationTable.headings[1].key]); //sampleA
  //console.log(tabSettings[translationTable.headings[2].key]); //sampleB
  //console.log(tabSettings.tableRows);

//  setElementState(event, 'tabVisualization', 'enabled');
  setElementState(event, 'tabSettings', 'enabled');
  setElementState(event, 'menuItemCloseFile', 'enabled');
/*
  if (fileData[0].loc === undefined) hasSpatioFlow = false;
  else hasSpatioFlow = true;

  //console.log("File: " + aFile.name + " read complete!", fileData);
  timelineStatusBar(domStatusBar, aFile.name);
  if (hasSpatioFlow) spatioFlow(domSpatioFlow);

  timeline(domTimeline, domSpatioFlow, domInfoFlow)
      .data(fileData)
      .defineInfoflowPane( )
      .defineInfoflowArea( )
      .defineTimelinePane( )
      .defineTimeflowArea( )
      .band("timeFlow", false)
      .mainReference("timeFlow")
      .xAxis("timeFlow")
      .tooltips("timeFlow")
      .defineBirdViewArea( )
      .band("birdView", true)
      .xAxis("birdView")
      .labels("timeFlow")
      .labels("birdView")
      .brush("birdView", ["timeFlow", "infoFlow"])
      .band("infoFlow", false)
      .vScroll( )
//            .defineVerticalScrollArea( )
      .redraw();
*/
/* Here might go algorithm to do statistical inference of data to locate
   temporal and spatial features. For now - rely on manual assignment only.

      fileData.forEach(function(fileRow) {
        fileRow.forEach(function(fileColumn){
          tempSize += fileColumn.length;
        })
        console.log(fileRow);
      })

      */
      return fileData;

};

function buildVisualization(fileData) {
  setElementState(event, 'tabVisualization', 'enabled');
  var targetNames = ['timeFlow'];
  if (fileData[0].loc === undefined) hasSpatioFlow = false;
  else hasSpatioFlow = true;

  if (infoCardLayout.row.length > 0) {
    hasInfoFlow = true;
    targetNames.push('infoFlow');
  } else hasInfoFlow = false;

  //console.log("File: " + aFile.name + " read complete!", fileData);
  timelineStatusBar(domStatusBar, fileList[0].name);
  if (hasSpatioFlow) spatioFlow(domSpatioFlow);

  timeline(domTimeline, domSpatioFlow, domInfoFlow)
      .data(fileData)
      .defineInfoflowPane( )
      .defineInfoflowArea( )
      .defineTimelinePane( )
      .defineTimeflowArea( )
      .band("timeFlow", false)
      .mainReference("timeFlow")
      .xAxis("timeFlow")
      .tooltips("timeFlow")
      .defineBirdViewArea( )
      .band("birdView", true)
      .xAxis("birdView")
      .labels("timeFlow")
      .labels("birdView")
      .brush("birdView", targetNames)
      .band("infoFlow", false)
      .vScroll( )
//            .defineVerticalScrollArea( )
      .redraw();

      return fileData;
}

function openVisualization( ) {
  ConsoleLogHTML.DEFAULTS.log = "sansserifLog";
  ConsoleLogHTML.DEFAULTS.info = "sansserifLog";
  ConsoleLogHTML.DEFAULTS.warn = "sansserifWarn";
  ConsoleLogHTML.connect(document.getElementById("myULLogContainer")); // Redirect log messages
  return;
}

function closeVisualization(event, aFile) {
  //document.getElementsByClassName('tooltip').remove();
  d3.selectAll('.tooltip').remove();
  d3.selectAll('svg').remove();
  fileList=[];
  fileData=null;
  setElementState(event, 'tabVisualization', 'disabled');
  setElementState(event, 'tabSettings', 'disabled');
  setElementState(event, 'menuItemCloseFile', 'disabled');
  console.log("Closing visualization");
  closeTab(event);
  closeSettings( );
  clearFileInput(document.getElementById("file-read"));
  ConsoleLogHTML.disconnect(); // Stop redirecting
}

function refreshVisualization( ) {
  //document.getElementsByClassName('tooltip').remove();
  d3.selectAll('.tooltip').remove();
  d3.selectAll('svg').remove();

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

function getViewRange_ms(min, max) {
  return (isString(min)) ? (max.getTime() - min.getTime()) : max - min;
}

function updateCurrentCursorTrack(track) {
  timelineGeometry.verticalCursor.previousTrack = timelineGeometry.verticalCursor.currentTrack;
  timelineGeometry.verticalCursor.currentTrack = track;
  return;
}

function handleFileSelect(evt) {
  //console.log(evt);
  if (evt.target.files.length > 0) {
    fileList=evt.target.files; // FileList object
  } else {
    // event cancelled
    return;
  }

  openVisualization();

  var output = [];

  for (var i = 0, f; f = fileList[i]; i++) {
    output.push('• Filename: ' + escape(f.name) + ' (' + (f.type || 'n/a') + '), ' +
          f.size + ' bytes, last modified: ' +
          (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a'
        ));
  }
//  var statusFilenameElement = document.getElementById('Filename');
//  statusFilenameElement.textContent = output.join('');
  var d = new Date();

  csblLogString = 'Opening file(s):\n' + output.join('\n');
  console.log(csblLogString);

  //document.getElementById('Log').innerHTML = '<span><strong>' + d.toUTCString() + ":</strong>" + ' Open file(s):<br><ul>' + output.join('') + '</ul></span>';
  setElementState(event, 'tabLog', 'enabled');

  var reader = new FileReader();

//  reader.onload = function(event) {
//    fileData=d3.csv.parse(event.target.result);
//    console.log("fileData: ", fileData);
//    return;
//  }

  // Closure to capture the file information.
/*
  reader.onload = (function(theFile) {
    return function(e) {
//      var span = document.createElement('span');
//      var itemsCount = 0;
//      console.log("event: ", e);

      fileData=d3.csv.parse(e.target.result);
      console.log(fileData);
//      fileData.forEach(function(csvObject) {
//        console.log(JSON.stringify(csvObject));
//      });

//        fileData.forEach(function(csvObject){
//          itemsCount++;
//                  span.innerHTML += ['<text>', itemsCount + ": " + JSON.stringify(csvObject),'</text><br>'].join('');
//          span.innerHTML += '<text>' + itemsCount + ": " + JSON.stringify(csvObject) + '</text><br>';
//      });
//        document.getElementById('list').append(span, null);
    };
  })(f);
*/
//reader.onload = processFileData(evt.target.result, fileList[0]);
reader.onload = function(evt) {
  return processFileData(evt.target.result, fileList[0]);
};

  //reader.onloadend = function(event) {
  //  console.log(event, "File read complete!");
  //}

  // Read in the file as text.
  reader.readAsText(fileList[0]);

  return;
};
  // files is a FileList of File objects. List some properties.
  /*
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                f.size, ' bytes, last modified: ',
                f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                '</li>');

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          var span = document.createElement('span');
          var itemsCount = 0;
          fileData=d3.csv.parse(e.target.result);
          fileData.forEach(function(csvObject){
            itemsCount++;
//                  span.innerHTML += ['<text>', itemsCount + ": " + JSON.stringify(csvObject),'</text><br>'].join('');
            span.innerHTML += '<text>' + itemsCount + ": " + JSON.stringify(csvObject) + '</text><br>';
          });
          document.getElementById('list').append(span, null);
        };
      })(f);

      // Read in the file as text.
      reader.readAsText(f);
    }
*/

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].parentElement.className = tablinks[i].parentElement.className.replace("active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
//  console.log(evt.currentTarget.parentElement);
  evt.currentTarget.parentElement.className += "active";

//  if (tabName === 'Settings') {
//  }

}

function closeTab(evt) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].parentElement.className = tablinks[i].parentElement.className.replace("active", "");
  }
}

function setElementState(evt, elementName, elementState) {
  document.getElementById(elementName).disabled=((elementState === "disabled") ? true : false);
}

function getElementState(elementName) {
  var thisElement = document.getElementById(elementName);
  return thisElement.disabled;
}

function saveFile(strData, strFileName, strMimeType) {
var docReference = document,
    elementa = docReference.createElement("a"),
    mimeType = strMimeType || "text/plain";

//build download link:
//elementa.href = "data:" + mimeType + "charset=utf-8," + escape(strData);
elementa.href = "data:" + mimeType + "charset=utf-8," + encodeURIComponent(strData);

if (window.MSBlobBuilder) { // IE10
    var bb = new MSBlobBuilder();
    bb.append(strData);
    return navigator.msSaveBlob(bb, strFileName);
} /* end if(window.MSBlobBuilder) */

if ('download' in elementa) { //FF20, CH19
    elementa.setAttribute("download", strFileName);
    elementa.innerHTML = "downloading...";
    docReference.body.appendChild(elementa);
    setTimeout(function() {
        var eventME = docReference.createEvent("MouseEvents");
        eventME.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        elementa.dispatchEvent(eventME);
        docReference.body.removeChild(elementa);
    }, 66);
    return true;
}; /* end if('download' in a) */

//do iframe dataURL download: (older W3)
var iframeElement = docReference.createElement("iframe");
docReference.body.appendChild(iframeElement);
iframeElement.src = "data:" + (strMimeType ? strMimeType : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
setTimeout(function() {
    docReference.body.removeChild(iframeElement);
}, 333);
return true;
}

function clearFileInput(ctrl) {
  try {
    ctrl.value = null;
  } catch(ex) { }
  if (ctrl.value) {
    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
  }
}
