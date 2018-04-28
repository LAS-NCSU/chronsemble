/*
function SettingsTableHeadings(heading1, heading2, heading3, heading4, heading5) {
  this.heading1 = heading1 || "Data Field";
  this.heading2 = heading2 || "Sample A";
  this.heading3 = heading3 || "Sample B";
  this.heading4 = heading4 || "Type";
  this.heading5 = heading5 || "Accuracy";
}

var translationTable = {
  headings: [{key: "dataField", title: "Data Field"},
             {key: "sampleA", title: "Sample A"},
             {key: "sampleB", title: "Sample B"},
             {key: "dataType", title: "Type"},
             {key: "accuracy", title: "Accuracy"}];
}
*/
var table1 = null;

function Settings(tabSettingsID, fileData) {

  function buildTable(elementID) {

    function buildTableToolbar(elementID) {
      var tmpSettingsTab = document.createDocumentFragment();

      var settingsDiv = tmpSettingsTab.appendChild(document.createElement("div"));
      settingsDiv.className = 'row toolbar-pf table-view-pf-toolbar';
      settingsDiv.id = 'toolbar2';
      var settingsCol = settingsDiv.appendChild(document.createElement("div"));
      settingsCol.className = 'col-sm-12';
      var settingsForm = settingsCol.appendChild(document.createElement("form"));
      settingsForm.className = 'toolbar-pf-actions';
      var settingsFormGroup = settingsForm.appendChild(document.createElement("div"));
      settingsFormGroup.className = 'form-group toolbar-pf-filter';
      var settingsFormGroupLabel = settingsFormGroup.appendChild(document.createElement("label"));
      settingsFormGroupLabel.className = 'sr-only';
      settingsFormGroupLabel.htmlFor = 'filterB';
      settingsFormGroupLabel.innerHTML = 'None';
      var settingsFormGroupLabelDiv = settingsFormGroup.appendChild(document.createElement("div"));
      settingsFormGroupLabelDiv.className = 'input-group';
      var settingsFormGroupLabelDivDiv = settingsFormGroupLabelDiv.appendChild(document.createElement("div"));
      settingsFormGroupLabelDivDiv.className = 'input-group-btn';
      var settingsFormGroupLabelDivDivBtn = settingsFormGroupLabelDivDiv.appendChild(document.createElement("button"));
      settingsFormGroupLabelDivDivBtn.type = 'button';
      settingsFormGroupLabelDivDivBtn.className = 'btn btn-default dropdown-toggle';
      settingsFormGroupLabelDivDivBtn.id = 'filterB';
      settingsFormGroupLabelDivDivBtn.innerHTML = '';
      settingsFormGroupLabelDivDivBtn.setAttribute('data-toggle', 'dropdown');
      settingsFormGroupLabelDivDivBtn.setAttribute('aria-haspopup', 'true');
      settingsFormGroupLabelDivDivBtn.setAttribute('aria-expanded', 'false');
      var settingsFormGroupLabelDivDivBtnSpan = settingsFormGroupLabelDivDivBtn.appendChild(document.createElement("span"));
      settingsFormGroupLabelDivDivBtnSpan.className = 'caret';
      var settingsFormGroupLabelDivDivBtnUl = settingsFormGroupLabelDivDiv.appendChild(document.createElement("ul"));
      settingsFormGroupLabelDivDivBtnUl.className = 'dropdown-menu';
      var settingsFormGroupLabelDivDivBtnUlLi = settingsFormGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      var settingsFormGroupLabelDivDivBtnUlLiA = settingsFormGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsFormGroupLabelDivDivBtnUlLiA.href = '#';
      settingsFormGroupLabelDivDivBtnUlLiA.id = 'filterB1';
      settingsFormGroupLabelDivDivBtnUlLiA.innerHTML = '&nbsp';
      settingsFormGroupLabelDivDivBtnUlLi = settingsFormGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsFormGroupLabelDivDivBtnUlLiA = settingsFormGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsFormGroupLabelDivDivBtnUlLiA.href = '#';
      settingsFormGroupLabelDivDivBtnUlLiA.id = 'filterB2';
      settingsFormGroupLabelDivDivBtnUlLiA.innerHTML = 'Event Assignments';
      settingsFormGroupLabelDivDivBtnUlLi = settingsFormGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsFormGroupLabelDivDivBtnUlLiA = settingsFormGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsFormGroupLabelDivDivBtnUlLiA.href = '#';
      settingsFormGroupLabelDivDivBtnUlLiA.id = 'filterB3';
      settingsFormGroupLabelDivDivBtnUlLiA.innerHTML = 'Temporal Data';
      settingsFormGroupLabelDivDivBtnUlLi = settingsFormGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsFormGroupLabelDivDivBtnUlLiA = settingsFormGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsFormGroupLabelDivDivBtnUlLiA.href = '#';
      settingsFormGroupLabelDivDivBtnUlLiA.id = 'filterB4';
      settingsFormGroupLabelDivDivBtnUlLiA.innerHTML = 'Spatial Data';
      var settingsFormGroupLabelDivInput = settingsFormGroupLabelDiv.appendChild(document.createElement("input"));
      settingsFormGroupLabelDivInput.type = 'text';
      settingsFormGroupLabelDivInput.className = 'form-control';
      settingsFormGroupLabelDivInput.id = 'filterInputB';
      settingsFormGroupLabelDivInput.setAttribute('placeholder','Filter By ...');
      settingsFormGroupLabelDivInput.setAttribute('autocomplete','off');

      settingsFormGroup = settingsForm.appendChild(document.createElement("div"));
      settingsFormGroup.className = 'form-group';
      var settingsFormGroupBtn = settingsFormGroup.appendChild(document.createElement("button"));
      settingsFormGroupBtn.type = 'button';
      settingsFormGroupBtn.className = 'btn btn-default';
      settingsFormGroupBtn.id = 'deleteRowsB';
      settingsFormGroupBtn.innerHTML = 'Delete Rows';
      settingsFormGroupBtn = settingsFormGroup.appendChild(document.createElement("button"));
      settingsFormGroupBtn.type = 'button';
      settingsFormGroupBtn.className = 'btn btn-default';
      settingsFormGroupBtn.id = 'restoreRowsB';
      settingsFormGroupBtn.innerHTML = 'Restore Rows';
      settingsFormGroupBtn.setAttribute('disabled','true');
      settingsFormGroupBtn = settingsFormGroup.appendChild(document.createElement("div"));
      settingsFormGroupBtn.className = 'dropdown btn-group dropdown-kebab-pf';
      var settingsFormGroupBtnKB = settingsFormGroupBtn.appendChild(document.createElement("button"));
      settingsFormGroupBtnKB.type = 'button';
      settingsFormGroupBtnKB.className = 'btn btn-link dropdown-toggle';
      settingsFormGroupBtnKB.id = 'dropdownKebabB';
      settingsFormGroupBtnKB.setAttribute('data-toggle','dropdown');
      settingsFormGroupBtnKB.setAttribute('aria-haspopup','true');
      settingsFormGroupBtnKB.setAttribute('aria-expanded','true');
      var settingsFormGroupBtnKBSpan = settingsFormGroupBtnKB.appendChild(document.createElement("span"));
      settingsFormGroupBtnKBSpan.className = 'fa fa-ellipsis-v';
      settingsFormGroupBtnKB = settingsFormGroupBtn.appendChild(document.createElement("ul"));
      settingsFormGroupBtnKB.className = 'dropdown-menu';
      settingsFormGroupBtnKB.setAttribute('aria-labelledby','dropdownKebabB');
      var settingsFormGroupBtnKBLi = settingsFormGroupBtnKB.appendChild(document.createElement("li"));
      var settingsFormGroupBtnKBLiA = settingsFormGroupBtnKBLi.appendChild(document.createElement("a"));
      settingsFormGroupBtnKBLiA.href = '#';
      settingsFormGroupBtnKBLiA.innerHTML = 'Action';
      settingsFormGroupBtnKBLi = settingsFormGroupBtnKB.appendChild(document.createElement("li"));
      settingsFormGroupBtnKBLiA = settingsFormGroupBtnKBLi.appendChild(document.createElement("a"));
      settingsFormGroupBtnKBLiA.href = '#';
      settingsFormGroupBtnKBLiA.innerHTML = 'Another Action';
      settingsFormGroupBtnKBLi = settingsFormGroupBtnKB.appendChild(document.createElement("li"));
      settingsFormGroupBtnKBLiA = settingsFormGroupBtnKBLi.appendChild(document.createElement("a"));
      settingsFormGroupBtnKBLiA.href = '#';
      settingsFormGroupBtnKBLiA.innerHTML = 'Something Else Here';
      settingsFormGroupBtnKBLi = settingsFormGroupBtnKB.appendChild(document.createElement("li"));
      settingsFormGroupBtnKBLi.className = 'divider';
      settingsFormGroupBtnKBLi.setAttribute('role','separator');
      settingsFormGroupBtnKBLi = settingsFormGroupBtnKB.appendChild(document.createElement("li"));
      settingsFormGroupBtnKBLiA = settingsFormGroupBtnKBLi.appendChild(document.createElement("a"));
      settingsFormGroupBtnKBLiA.href = '#';
      settingsFormGroupBtnKBLiA.innerHTML = 'Separated Link';

      settingsFormGroup = settingsForm.appendChild(document.createElement("div"));
      settingsFormGroup.className = 'toolbar-pf-action-right';
      var settingsFormGroupFind = settingsFormGroup.appendChild(document.createElement("div"));
      settingsFormGroupFind.className = 'form-group toolbar-pf-find';
      var settingsFormGroupFindBtn = settingsFormGroupFind.appendChild(document.createElement("button"));
      settingsFormGroupFindBtn.className = 'btn btn-link btn-find';
      settingsFormGroupFindBtn.type = 'button';
      var settingsFormGroupFindBtnSpan = settingsFormGroupFindBtn.appendChild(document.createElement("span"));
      settingsFormGroupFindBtnSpan.className = 'fa fa-search';
      var settingsFormGroupFindCtn = settingsFormGroupFind.appendChild(document.createElement("div"));
      settingsFormGroupFindCtn.className = 'find-pf-dropdown-container';
      var settingsFormGroupFindCtnInput = settingsFormGroupFindCtn.appendChild(document.createElement("input"));
      settingsFormGroupFindCtnInput.type = 'text';
      settingsFormGroupFindCtnInput.className = 'form-control';
      settingsFormGroupFindCtnInput.id = 'findB';
      settingsFormGroupFindCtnInput.setAttribute('placeholder','Find By Keyword ...')
      var settingsFormGroupFindCtnDiv = settingsFormGroupFindCtn.appendChild(document.createElement("div"));
      settingsFormGroupFindCtnDiv.className = 'find-pf-buttons';
      var settingsFormGroupFindCtnDivSpan = settingsFormGroupFindCtnDiv.appendChild(document.createElement("span"));
      settingsFormGroupFindCtnDivSpan.className = 'find-pf-nums';
      settingsFormGroupFindCtnDivSpan.innerHTML = '1 of 3';
      settingsFormGroupFindCtnDivSpan = settingsFormGroupFindCtnDiv.appendChild(document.createElement("button"));
      settingsFormGroupFindCtnDivSpan.className = 'btn btn-link';
      settingsFormGroupFindCtnDivSpan.type = 'button';
      var settingsFormGroupFindCtnDivBtnSpan = settingsFormGroupFindCtnDivSpan.appendChild(document.createElement("span"));
      settingsFormGroupFindCtnDivBtnSpan.className = 'a fa-angle-up';
      settingsFormGroupFindCtnDivSpan = settingsFormGroupFindCtnDiv.appendChild(document.createElement("button"));
      settingsFormGroupFindCtnDivSpan.className = 'btn btn-link';
      settingsFormGroupFindCtnDivSpan.type = 'button';
      settingsFormGroupFindCtnDivBtnSpan = settingsFormGroupFindCtnDivSpan.appendChild(document.createElement("span"));
      settingsFormGroupFindCtnDivBtnSpan.className = 'a fa-angle-down';
      settingsFormGroupFindCtnDivSpan = settingsFormGroupFindCtnDiv.appendChild(document.createElement("button"));
      settingsFormGroupFindCtnDivSpan.className = 'btn btn-link btn-find-close';
      settingsFormGroupFindCtnDivSpan.type = 'button';
      settingsFormGroupFindCtnDivBtnSpan = settingsFormGroupFindCtnDivSpan.appendChild(document.createElement("span"));
      settingsFormGroupFindCtnDivBtnSpan.className = 'pficon pficon-close';

      var settingsResults = settingsCol.appendChild(document.createElement("div"));
      settingsResults.className = 'row toolbar-pf-results';
      var settingsResultsCol = settingsResults.appendChild(document.createElement("div"));
      settingsResultsCol.className = 'col-sm-9';
      var settingsResultsColHid = settingsResultsCol.appendChild(document.createElement("div"));
      settingsResultsColHid.className = 'hidden';
      var settingsResultsColHidHead = settingsResultsColHid.appendChild(document.createElement("h5"));
      settingsResultsColHidHead.innerHTML = '0 Results';
      var settingsResultsColHidP = settingsResultsColHid.appendChild(document.createElement("p"));
      settingsResultsColHidP.innerHTML = 'Active filters:';
      settingsResultsColHidP = settingsResultsColHid.appendChild(document.createElement("ul"));
      settingsResultsColHidP.className = 'list-inline';
      settingsResultsColHidP = settingsResultsColHid.appendChild(document.createElement("p"));
      var settingsResultsColHidPA = settingsResultsColHidP.appendChild(document.createElement("a"));
      settingsResultsColHidPA.href = '#';
      settingsResultsColHidPA.innerHTML = 'Clear All Filters';

      settingsResultsCol = settingsResults.appendChild(document.createElement("div"));
      settingsResultsCol.className = 'col-sm-3 table-view-pf-select-results';
      settingsResultsCol.innerHTML = '<strong>0</strong> of <strong>0</strong> selected';

      var settingsTab = document.getElementById(elementID);
      settingsTab.appendChild(tmpSettingsTab);
    }


    buildTableToolbar(elementID);

  }

  var tableRows = [];

  /*
  this.heading1 = heading1 || "Data Field";
  this.heading2 = heading2 || "Sample A";
  this.heading3 = heading3 || "Sample B";
  this.heading4 = heading4 || "Type";
  this.heading5 = heading5 || "Accuracy";
*/
  var eEvent = {
    LABEL: 1,
    INSTANT: 2,
    BEGIN: 3,
    END: 4,
    LOCATION: 5,
    ACCURACY_T: 6,
    ACCURACY_S: 7,
    properties: {
      1:{title: "Event Label", validate: {}},
      2:{title: "Event Instant", validate: {}},
      3:{title: "Event Begin", validate: {}},
      4:{title: "Event End", validate: {}},
      5:{title: "Event Location", validate: {}},
      6:{title: "Temporal Accuracy", validate: {}},
      7:{title: "Spatial Accuracy", validate: {}}
    }
  };

  //var data = {};
  this[translationTable.headings[1].key] = [];
  this[translationTable.headings[2].key] = [];
  this[translationTable.headings[3].key] = [];
  this[translationTable.headings[4].key] = [];
  var fileKeys = d3.keys(fileData[0]);
  //this[translationTable.headings[0].key] = d3.keys(fileData[0]);
  //console.log(this[translationTable.headings[0].key][0]);
  //console.log(fileData[1][this[translationTable.headings[0].key][0]]);
  //this[translationTable.headings[1].key] = fileData[1][this[translationTable.headings[0].key][0]];
  //this[translationTable.headings[2].key] = fileData[2][this[translationTable.headings[0].key][0]];
  //this[translationTable.headings[3].key] = '';
  //this[translationTable.headings[4].key] = '';
  var count = 0;
  fileKeys.forEach(function(fileKey){
    tableRows.push({[translationTable.headings[0].key]: fileKeys[count++],
        [translationTable.headings[1].key]: fileData[1][fileKey],
        [translationTable.headings[2].key]: fileData[2][fileKey],
        [translationTable.headings[3].key]: '',
        [translationTable.headings[4].key]: '' });
  });
  /*
  for (var i in fileData[0]) {
    this.tableRow.push(function(i) {
      return {[translationTable.headings[0].key]: fileKeys[count++],
        [translationTable.headings[1].key]: fileData[1][i],
        [translationTable.headings[2].key]: fileData[2][i],
        [translationTable.headings[3].key]: '',
        [translationTable.headings[4].key]: '' }
    });
    */
    /*
    this[translationTable.headings[1].key].push(fileData[1][i]);
    this[translationTable.headings[2].key].push(fileData[2][i]);
    this[translationTable.headings[3].key].push('');
    this[translationTable.headings[4].key].push('');
    */
//  }

  //console.log(this[translationTable.headings[1].key]);
  //console.log(this[translationTable.headings[2].key]);
  //console.log(this[translationTable.headings[3].key]);
  //console.log(this[translationTable.headings[4].key]);
  //this.sampleA = fileData[]

  $('.datatable').dataTable(
    { "paging": true }
  );

  // DataTable Config
  table1 = $("#table1").DataTable({
    columns: [
      { data: null,
        className: "table-view-pf-select",
        render: function (data, type, full, meta) {
          // Select row checkbox renderer
          var id = "select" + meta.row;
          return '<label class="sr-only" for="' + id + '">Select row ' + meta.row +
            '</label><input type="checkbox" id="' + id + '" name="' + id + '">';
        },
        sortable: false
      },
      { data: translationTable.headings[0].key, title: translationTable.headings[0].title },
      { data: translationTable.headings[1].key, title: translationTable.headings[1].title },
      { data: translationTable.headings[2].key, title: translationTable.headings[2].title },
      { data: translationTable.headings[3].key, title: translationTable.headings[3].title },
      { data: translationTable.headings[4].key, title: translationTable.headings[4].title },
      { data: null,
        className: "table-view-pf-actions",
        render: function (data, type, full, meta) {
          // Inline action button renderer
          return '<div class="table-view-pf-btn"><button class="btn btn-default" type="button">Actions</button></div>';
        }
      }, {
        data: null,
        className: "table-view-pf-actions",
        render: function (data, type, full, meta) {
          // Inline action kebab renderer
          return '<div class="dropdown dropdown-kebab-pf">' +
            '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
            '<span class="fa fa-ellipsis-v"></span></button>' +
            '<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownKebabRight">' +
            '<li><a href="#"><i>none</i></a></li>' +
            '<li role="separator" class="divider"></li>' +
            '<li><a href="#">Event Label</a></li>' +
            '<li><a href="#">Event Instant</a></li>' +
            '<li><a href="#">Event Start</a></li>' +
            '<li><a href="#">Event End</a></li>' +
            '<li><a href="#">Event Location</a></li>' +
            '<li><a href="#">Temporal Accuracy</a></li>' +
            '<li><a href="#">Spatial Accuracy</a></li>' +
            '<li role="separator" class="divider"></li>' +
            '<li><a href="#">Temporal Context</a></li></ul></div>';
            //'<li role="separator" class="divider"></li>' +
            //'<li><a href="#">Separated link</a></li></ul></div>';
        }
      }
    ],
    //data: dataSet,
    data: tableRows,
    dom: "t",
    language: {
      zeroRecords: "No records found"
    },
    order: [[ 1, 'asc' ]],
    pfConfig: {
      emptyStateSelector: "#emptyState1",
      filterCaseInsensitive: true,
      filterCols: [
        null,
        {
          default: true,
          optionSelector: "#filter1",
          placeholder: "Filter By Rendering Engine..."
        }, {
          optionSelector: "#filter2",
          placeholder: "Filter By Browser..."
        }, {
          optionSelector: "#filter3",
          placeholder: "Filter By Platform(s)..."
        }, {
          optionSelector: "#filter4",
          placeholder: "Filter By Engine Version..."
        }, {
          optionSelector: "#filter5",
          placeholder: "Filter By CSS Grade..."
        }
      ],
      paginationSelector: "#pagination1",
      toolbarSelector: "#toolbar1",
      selectAllSelector: 'th:first-child input[type="checkbox"]',
      colvisMenuSelector: '.table-view-pf-colvis-menu'
    },
    select: {
      selector: 'td:first-child input[type="checkbox"]',
      style: 'multi'
    },
  });

buildTable(tabSettingsID);
}


/**
 * Utility to show empty Table View
 *
 * @param {object} config - Config properties associated with a Table View
 * @param {object} config.data - Data set for DataTable
 * @param {string} config.deleteRowsSelector - Selector for delete rows control
 * @param {string} config.restoreRowsSelector - Selector for restore rows control
 * @param {string} config.tableSelector - Selector for the HTML table
 */
var emptyTableViewUtil = function (config) {
  var self = this;

  this.dt = $(config.tableSelector).DataTable(); // DataTable
  this.deleteRows = $(config.deleteRowsSelector); // Delete rows control
  this.restoreRows = $(config.restoreRowsSelector); // Restore rows control

  // Handle click on delete rows control
  this.deleteRows.on('click', function() {
    self.dt.clear().draw();
    $(self.restoreRows).prop("disabled", false);
  });

  // Handle click on restore rows control
  this.restoreRows.on('click', function() {
    self.dt.rows.add(config.data).draw();
    $(this).prop("disabled", true);
  });

  // Initialize restore rows
  if (this.dt.data().length === 0) {
    $(this.restoreRows).prop("disabled", false);
  }
};

// Initialize empty Table View util
new emptyTableViewUtil({
  //data: dataSet,
  data: tabSettings.tableRows,
  deleteRowsSelector: "#deleteRows1",
  restoreRowsSelector: "#restoreRows1",
  tableSelector: "#table1"
});

/**
 * Utility to find items in Table View
 */
var findTableViewUtil = function (config) {
  // Upon clicking the find button, show the find dropdown content
  $(".btn-find").click(function () {
    $(this).parent().find(".find-pf-dropdown-container").toggle();
  });

  // Upon clicking the find close button, hide the find dropdown content
  $(".btn-find-close").click(function () {
    $(".find-pf-dropdown-container").hide();
  });
};

// Initialize find util
new findTableViewUtil();

// pagination

function nextTablePage(){
  console.log("next clicked");
  table1.page( 'next' ).draw( 'page' );
};

$('#next').on( 'click', function () {
  console.log("next clicked");
    table1.page( 'next' ).draw( 'page' );
} );


$('#previous').on( 'click', function () {
    table1.page( 'previous' ).draw( 'page' );
} );
