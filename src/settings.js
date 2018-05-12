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
var table2 = null;
var infoCardLayout = [];
var selectionOrder = [];
var tableRows = [];

function Settings(tabID, fileData) {

  function buildTable(elementID) {

/*==============================================================================

#####   ####    ####   #       #####     ##    #####
  #    #    #  #    #  #       #    #   #  #   #    #
  #    #    #  #    #  #       #####   #    #  #    #
  #    #    #  #    #  #       #    #  ######  #####
  #    #    #  #    #  #       #    #  #    #  #   #
  #     ####    ####   ######  #####   #    #  #    #

==============================================================================*/

    function buildTableToolbar(fragment) {

      var settingsTBar = fragment.appendChild(document.createElement("div"));
      settingsTBar.className = 'row toolbar-pf table-view-pf-toolbar';
      settingsTBar.id = 'toolbar2';
      var settingsTBarCol = settingsTBar.appendChild(document.createElement("div"));
      settingsTBarCol.className = 'col-sm-12';
      var settingsTBarForm = settingsTBarCol.appendChild(document.createElement("form"));
      settingsTBarForm.className = 'toolbar-pf-actions';
      var settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
      settingsTBarGroup.className = 'form-group toolbar-pf-filter';
      var settingsTBarGroupLabel = settingsTBarGroup.appendChild(document.createElement("label"));
      settingsTBarGroupLabel.className = 'sr-only';
      settingsTBarGroupLabel.htmlFor = 'filterB';
      settingsTBarGroupLabel.innerHTML = 'None';
      var settingsTBarGroupLabelDiv = settingsTBarGroup.appendChild(document.createElement("div"));
      settingsTBarGroupLabelDiv.className = 'input-group';
      var settingsTBarGroupLabelDivDiv = settingsTBarGroupLabelDiv.appendChild(document.createElement("div"));
      settingsTBarGroupLabelDivDiv.className = 'input-group-btn';
      var settingsTBarGroupLabelDivDivBtn = settingsTBarGroupLabelDivDiv.appendChild(document.createElement("button"));
      settingsTBarGroupLabelDivDivBtn.type = 'button';
      settingsTBarGroupLabelDivDivBtn.className = 'btn btn-default dropdown-toggle';
      settingsTBarGroupLabelDivDivBtn.id = 'filterB';
      settingsTBarGroupLabelDivDivBtn.innerHTML = '';
      settingsTBarGroupLabelDivDivBtn.setAttribute('data-toggle', 'dropdown');
      settingsTBarGroupLabelDivDivBtn.setAttribute('aria-haspopup', 'true');
      settingsTBarGroupLabelDivDivBtn.setAttribute('aria-expanded', 'false');
      var settingsTBarGroupLabelDivDivBtnSpan = settingsTBarGroupLabelDivDivBtn.appendChild(document.createElement("span"));
      settingsTBarGroupLabelDivDivBtnSpan.className = 'caret';
      var settingsTBarGroupLabelDivDivBtnUl = settingsTBarGroupLabelDivDiv.appendChild(document.createElement("ul"));
      settingsTBarGroupLabelDivDivBtnUl.className = 'dropdown-menu';
      var settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      var settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB1';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = '&nbsp';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB2';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = 'Event Assignments';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB3';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = 'Temporal Data';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB4';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = 'Spatial Data';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB5';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = 'Hidden Rows';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB6';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = '+ InfoCard';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB7';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = '- Info Card';
      var settingsTBarGroupLabelDivInput = settingsTBarGroupLabelDiv.appendChild(document.createElement("input"));
      settingsTBarGroupLabelDivInput.type = 'text';
      settingsTBarGroupLabelDivInput.className = 'form-control';
      settingsTBarGroupLabelDivInput.id = 'filterInputB';
      settingsTBarGroupLabelDivInput.setAttribute('placeholder','Filter By ...');
      settingsTBarGroupLabelDivInput.setAttribute('autocomplete','off');

      settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
      settingsTBarGroup.className = 'form-group';
      var settingsTBarGroupBtn1 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn1.type = 'button';
      settingsTBarGroupBtn1.className = 'btn btn-default';
      settingsTBarGroupBtn1.id = 'hideRowsB';
      settingsTBarGroupBtn1.innerHTML = 'Hide Rows';
      settingsTBarGroupBtn1 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn1.type = 'button';
      settingsTBarGroupBtn1.className = 'btn btn-default';
      settingsTBarGroupBtn1.id = 'unhideRowsB';
      settingsTBarGroupBtn1.innerHTML = 'Unhide Rows';
      settingsTBarGroupBtn1.setAttribute('disabled','true');
      settingsTBarGroupBtn1 = settingsTBarGroup.appendChild(document.createElement("div"));
      settingsTBarGroupBtn1.className = 'dropdown btn-group dropdown-kebab-pf';
      var settingsTBarGroupBtn1KB = settingsTBarGroupBtn1.appendChild(document.createElement("button"));
      settingsTBarGroupBtn1KB.type = 'button';
      settingsTBarGroupBtn1KB.className = 'btn btn-link dropdown-toggle';
      settingsTBarGroupBtn1KB.id = 'dropdownKebabB';
      settingsTBarGroupBtn1KB.setAttribute('data-toggle','dropdown');
      settingsTBarGroupBtn1KB.setAttribute('aria-haspopup','true');
      settingsTBarGroupBtn1KB.setAttribute('aria-expanded','true');
      var settingsTBarGroupBtn1KBSpan = settingsTBarGroupBtn1KB.appendChild(document.createElement("span"));
      settingsTBarGroupBtn1KBSpan.className = 'fa fa-ellipsis-v';
      settingsTBarGroupBtn1KB = settingsTBarGroupBtn1.appendChild(document.createElement("ul"));
      settingsTBarGroupBtn1KB.className = 'dropdown-menu';
      settingsTBarGroupBtn1KB.setAttribute('aria-labelledby','dropdownKebabB');
      var settingsTBarGroupBtn1KBLi = settingsTBarGroupBtn1KB.appendChild(document.createElement("li"));
      var settingsTBarGroupBtn1KBLiA = settingsTBarGroupBtn1KBLi.appendChild(document.createElement("a"));
      settingsTBarGroupBtn1KBLiA.href = '#';
      settingsTBarGroupBtn1KBLiA.innerHTML = 'Action';
      settingsTBarGroupBtn1KBLi = settingsTBarGroupBtn1KB.appendChild(document.createElement("li"));
      settingsTBarGroupBtn1KBLiA = settingsTBarGroupBtn1KBLi.appendChild(document.createElement("a"));
      settingsTBarGroupBtn1KBLiA.href = '#';
      settingsTBarGroupBtn1KBLiA.innerHTML = 'Another Action';
      settingsTBarGroupBtn1KBLi = settingsTBarGroupBtn1KB.appendChild(document.createElement("li"));
      settingsTBarGroupBtn1KBLiA = settingsTBarGroupBtn1KBLi.appendChild(document.createElement("a"));
      settingsTBarGroupBtn1KBLiA.href = '#';
      settingsTBarGroupBtn1KBLiA.innerHTML = 'Something Else Here';
      settingsTBarGroupBtn1KBLi = settingsTBarGroupBtn1KB.appendChild(document.createElement("li"));
      settingsTBarGroupBtn1KBLi.className = 'divider';
      settingsTBarGroupBtn1KBLi.setAttribute('role','separator');
      settingsTBarGroupBtn1KBLi = settingsTBarGroupBtn1KB.appendChild(document.createElement("li"));
      settingsTBarGroupBtn1KBLiA = settingsTBarGroupBtn1KBLi.appendChild(document.createElement("a"));
      settingsTBarGroupBtn1KBLiA.href = '#';
      settingsTBarGroupBtn1KBLiA.innerHTML = 'Separated Link';

      settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
      settingsTBarGroup.className = 'form-group';
      var settingsTBarGroupBtn2 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn2.type = 'button';
      settingsTBarGroupBtn2.className = 'btn btn-default';
      settingsTBarGroupBtn2.id = 'includeInfoData';
      settingsTBarGroupBtn2.innerHTML = '<span class="i fa fa-plus">&nbsp</span>Info Card';
      settingsTBarGroupBtn2.setAttribute('disabled','true');

    //  settingsTBarGroupBtn1.onclick = 'addToInfocard()';
    //  settingsTBarGroupBtn1.setAttribute('onclick','addToInfocard()');
      settingsTBarGroupBtn2 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn2.type = 'button';
      settingsTBarGroupBtn2.className = 'btn btn-default';
      settingsTBarGroupBtn2.id = 'removeInfoData';
      settingsTBarGroupBtn2.innerHTML = '<span class="i fa fa-minus">&nbsp</span>Info Card';
      settingsTBarGroupBtn2.setAttribute('disabled','true');

      settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
      settingsTBarGroup.className = 'toolbar-pf-action-right';
      var settingsTBarGroupFind = settingsTBarGroup.appendChild(document.createElement("div"));
      settingsTBarGroupFind.className = 'form-group toolbar-pf-find';
      var settingsTBarGroupFindBtn = settingsTBarGroupFind.appendChild(document.createElement("button"));
      settingsTBarGroupFindBtn.className = 'btn btn-link btn-find';
      settingsTBarGroupFindBtn.type = 'button';
      var settingsTBarGroupFindBtnSpan = settingsTBarGroupFindBtn.appendChild(document.createElement("span"));
      settingsTBarGroupFindBtnSpan.className = 'fa fa-search';
      var settingsTBarGroupFindCtn = settingsTBarGroupFind.appendChild(document.createElement("div"));
      settingsTBarGroupFindCtn.className = 'find-pf-dropdown-container';
      var settingsTBarGroupFindCtnInput = settingsTBarGroupFindCtn.appendChild(document.createElement("input"));
      settingsTBarGroupFindCtnInput.type = 'text';
      settingsTBarGroupFindCtnInput.className = 'form-control';
      settingsTBarGroupFindCtnInput.id = 'findB';
      settingsTBarGroupFindCtnInput.setAttribute('placeholder','Find By Keyword ...')
      var settingsTBarGroupFindCtnDiv = settingsTBarGroupFindCtn.appendChild(document.createElement("div"));
      settingsTBarGroupFindCtnDiv.className = 'find-pf-buttons';
      var settingsTBarGroupFindCtnDivSpan = settingsTBarGroupFindCtnDiv.appendChild(document.createElement("span"));
      settingsTBarGroupFindCtnDivSpan.className = 'find-pf-nums';
      settingsTBarGroupFindCtnDivSpan.innerHTML = '1 of 3';
      settingsTBarGroupFindCtnDivSpan = settingsTBarGroupFindCtnDiv.appendChild(document.createElement("button"));
      settingsTBarGroupFindCtnDivSpan.className = 'btn btn-link';
      settingsTBarGroupFindCtnDivSpan.type = 'button';
      var settingsTBarGroupFindCtnDivBtnSpan = settingsTBarGroupFindCtnDivSpan.appendChild(document.createElement("span"));
      settingsTBarGroupFindCtnDivBtnSpan.className = 'fa fa-angle-up';
      settingsTBarGroupFindCtnDivSpan = settingsTBarGroupFindCtnDiv.appendChild(document.createElement("button"));
      settingsTBarGroupFindCtnDivSpan.className = 'btn btn-link';
      settingsTBarGroupFindCtnDivSpan.type = 'button';
      settingsTBarGroupFindCtnDivBtnSpan = settingsTBarGroupFindCtnDivSpan.appendChild(document.createElement("span"));
      settingsTBarGroupFindCtnDivBtnSpan.className = 'fa fa-angle-down';
      settingsTBarGroupFindCtnDivSpan = settingsTBarGroupFindCtnDiv.appendChild(document.createElement("button"));
      settingsTBarGroupFindCtnDivSpan.className = 'btn btn-link btn-find-close';
      settingsTBarGroupFindCtnDivSpan.type = 'button';
      settingsTBarGroupFindCtnDivBtnSpan = settingsTBarGroupFindCtnDivSpan.appendChild(document.createElement("span"));
      settingsTBarGroupFindCtnDivBtnSpan.className = 'pficon pficon-close';

      var settingsResults = settingsTBarCol.appendChild(document.createElement("div"));
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

      return fragment;

    //  var settingsTab = document.getElementById(elementID);
    //  settingsTab.appendChild(tmpSettingsTab);
    }

/*==============================================================================

 #####    ####   #####    #   #
 #    #  #    #  #    #    # #
 #####   #    #  #    #     #
 #    #  #    #  #    #     #
 #    #  #    #  #    #     #
 #####    ####   #####      #

==============================================================================*/

    function buildTableBody(fragment) {
    //  var tmpTableBody = document.createDocumentFragment();
      var tableBody = fragment.appendChild(document.createElement("table"));
      tableBody.className = 'table table-striped table-bordered table-hover';
      tableBody.id = 'table2';

      var tableHead = tableBody.appendChild(document.createElement("thead"));
      var tableRow = tableHead.appendChild(document.createElement("tr"));
      tableRow.innerHTML = '<th><label class="sr-only" for="selectAll">Select all rows</label><input type="checkbox" id="selectAll" name="selectAll"></th>' +
      //tableRow.innerHTML = '<th><label class="sr-only" for="selectAll"><input type="checkbox" id="selectAll" name="selectAll">Select all rows</label></th>' +
      '<th>heading1</th>' +
      '<th>heading2</th>' +
      '<th>heading3</th>' +
      '<th>heading4</th>' +
      '<th>heading5</th>' +
      '<th>heading6</th>' +
      '<th colspan="2">Event Assignments</th>';

      return fragment;

  //    var settingsTab = document.getElementById(elementID);
  //    settingsTab.appendChild(tmpTableBody);

    }

/*==============================================================================

 ######   ####    ####    #####  ######  #####
 #       #    #  #    #     #    #       #    #
 #####   #    #  #    #     #    #####   #    #
 #       #    #  #    #     #    #       #####
 #       #    #  #    #     #    #       #   #
 #        ####    ####      #    ######  #    #

==============================================================================*/

    function buildTableFooter(fragment) {
    //  var tmpTableFooter = document.createDocumentFragment();

      var tableFooter = fragment.appendChild(document.createElement("form"));
      tableFooter.className = 'content-view-pf-pagination table-view-pf-pagination clearfix';
      tableFooter.id = 'pagination2';
      var tableFooterGroup = tableFooter.appendChild(document.createElement("div"));
      tableFooterGroup.className = 'form-group';
      var tableFooterGroupSel = tableFooterGroup.appendChild(document.createElement("select"));
      tableFooterGroupSel.className = 'selectpicker pagination-pf-pagesize';
      var tableFooterGroupOpt = tableFooterGroupSel.appendChild(document.createElement("option"));
      tableFooterGroupOpt.value = '5';
      tableFooterGroupOpt.textContent = '5';
      tableFooterGroupOpt = tableFooterGroupSel.appendChild(document.createElement("option"));
      tableFooterGroupOpt.value = '10';
      tableFooterGroupOpt.textContent = '10';
      tableFooterGroupOpt = tableFooterGroupSel.appendChild(document.createElement("option"));
      tableFooterGroupOpt.value = '15';
      tableFooterGroupOpt.textContent = '15';
      tableFooterGroupOpt.setAttribute('selected', 'selected');
      tableFooterGroupOpt = tableFooterGroupSel.appendChild(document.createElement("option"));
      tableFooterGroupOpt.value = '25';
      tableFooterGroupOpt.textContent = '25';
      tableFooterGroupOpt = tableFooterGroupSel.appendChild(document.createElement("option"));
      tableFooterGroupOpt.value = '50';
      tableFooterGroupOpt.textContent = '50';

      var tableFooterGroupSpan = tableFooterGroup.appendChild(document.createElement("span"));
      tableFooterGroupSpan.textContent = 'per page';

      var tableFooterPg = tableFooter.appendChild(document.createElement("div"));
      tableFooterPg.className = 'form-group';
      var tableFooterPgSpan = tableFooterPg.appendChild(document.createElement("span"));
      tableFooterPgSpan.innerHTML = '<span class="pagination-pf-items-current">1-5</span> of <span class="pagination-pf-items-total">M</span>';
      var tableFooterPgUl = tableFooterPg.appendChild(document.createElement("ul"));
      tableFooterPgUl.className = 'pagination pagination-pf-back';
      tableFooterPgUl.innerHTML = '<li class="disabled"><a href="#" title="First Page"><span class="i fa fa-angle-double-left"></span></a></li>' +
                                  '<li class="disabled"><a href="#" title="Previous Page"><span class="i fa fa-angle-left"></span></a></li>';
      var tableFooterPgLabel = tableFooterPg.appendChild(document.createElement("label"));
      tableFooterPgLabel.className = 'sr-only';
      tableFooterPgLabel.setAttribute('for','pagination2-page')
      tableFooterPgLabel.innerHTML = 'Current Page';
      var tableFooterPgInput = tableFooterPg.appendChild(document.createElement("input"));
      tableFooterPgInput.className = 'pagination-pf-page';
      tableFooterPgInput.setAttribute('type','text');
      tableFooterPgInput.setAttribute('value','1');
      tableFooterPgInput.id = 'pagination2-page';
      var tableFooterPgSpan = tableFooterPg.appendChild(document.createElement("span"));
      tableFooterPgSpan.innerHTML = 'of <span class="pagination-pf-pages">5</span>';
      var tableFooterPgUl = tableFooterPg.appendChild(document.createElement("ul"));
      tableFooterPgUl.className = 'pagination pagination-pf-forward';

      //tableFooterPgUl.innerHTML = '<li><a href="#" title="Next Page" id="next" onclick="nextTablePage()"><span class="i fa fa-angle-right"></span></a></li>' +
      //                            '<li><a href="#" title="Last Page"><span class="i fa fa-angle-double-right"></span></a></li>';
      tableFooterPgUl.innerHTML = '<li><a href="#" title="Next Page"><span class="i fa fa-angle-right"></span></a></li>' +
                                  '<li><a href="#" title="Last Page"><span class="i fa fa-angle-double-right"></span></a></li>';

      return fragment;
  //    var settingsTab = document.getElementById(elementID);
  //    settingsTab.appendChild(tmpTableFooter);

}

/*==============================================================================

 #####   #         ##    #    #  #    #
 #    #  #        #  #   ##   #  #   #
 #####   #       #    #  # #  #  ####
 #    #  #       ######  #  # #  #  #
 #    #  #       #    #  #   ##  #   #
 #####   ######  #    #  #    #  #    #

==============================================================================*/
    function buildTableBlank(fragment) {
    //  var tmpTableBlank = document.createDocumentFragment();

      var tableBlank = fragment.appendChild(document.createElement("div"));
      tableBlank.className = 'blank-slate-pf table-view-pf-empty hidden';
      tableBlank.id = 'emptyState2';
      var tableBlankIcon = tableBlank.appendChild(document.createElement("div"));
      tableBlankIcon.className = 'blank-slate-pf-icon';
      var tableBlankSpan = tableBlankIcon.appendChild(document.createElement("span"));
      tableBlankSpan.className = 'pficon pficon pficon-add-circle-o';
      var tableBlankH1 = tableBlank.appendChild(document.createElement("h1"));
      tableBlankH1.innerHTML = 'Empty State Title';
      var tableBlankP = tableBlank.appendChild(document.createElement("p"));
      tableBlankP.innerHTML = 'Lorem ipsum dolor sit amet';

      var tableBlankAct = tableBlank.appendChild(document.createElement("div"));
      tableBlankAct.className = 'blank-slate-pf-main-action';
      var tableBlankBtn = tableBlankAct.appendChild(document.createElement("button"));
      tableBlankBtn.className = 'btn btn-primary btn-lg';
      tableBlankBtn.innerHTML = ' Main Action ';
      tableBlankAct = tableBlank.appendChild(document.createElement("div"));
      tableBlankAct.className = 'blank-slate-pf-secondary-action';
      tableBlankBtn = tableBlankAct.appendChild(document.createElement("button"));
      tableBlankBtn.className = 'btn btn-default';
      tableBlankBtn.innerHTML = ' Secondary Action ';

    //  var settingsTab = document.getElementById(elementID);
    //  settingsTab.appendChild(tmpTableBlank);

      return fragment;

    }

    var tmpFragment = document.createDocumentFragment();

    buildTableToolbar(tmpFragment);
    buildTableBody(tmpFragment);
    buildTableFooter(tmpFragment);
    buildTableBlank(tmpFragment);
    var settingsTab = document.getElementById(elementID);
    settingsTab.appendChild(tmpFragment);
    $('select').selectpicker();

//    table2.fnPageChange('first');
//    $("#pagination2").trigger("create");
//    $('.dropdown-toggle').dropdown();

  }

  //var Settings = {};
  this.tableRows = tableRows;

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
  this[translationTable.headings[5].key] = [];
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
    this.tableRows.push({[translationTable.headings[0].key]: fileKeys[count++],
        [translationTable.headings[1].key]: null,
        [translationTable.headings[2].key]: fileData[1][fileKey],
        [translationTable.headings[3].key]: fileData[2][fileKey],
        [translationTable.headings[4].key]: '',
        [translationTable.headings[5].key]: '' });
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


buildTable(tabID);
//$('.applauncher-pf .dropdown-toggle').eq(0).click();

// Initialize find util
new findTableViewUtil();
// Initialize empty Table View util
new emptyTableViewUtil({
  //data: dataSet,
  data: tabSettings.tableRows,
  deleteRowsSelector: "#deleteRows1",
  restoreRowsSelector: "#restoreRows1",
  tableSelector: "#table1",
  includeInfoDataSelector: '#includeInfoData',
  removeInfoDataSelector: '#removeInfoData'
});

/*
$('#next').on( 'click', function () {
  console.log("next clicked");
    table2.page( 'next' ).draw( 'page' );
} );

$('#previous').on( 'click', function () {
  console.log("previous clicked");
    table2.page( 'previous' ).draw( 'page' );
} );

*/
// DataTable Config
table2 = $("#table2").DataTable({
  select: true,
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
    { data: translationTable.headings[0].key, name: translationTable.headings[0].key,
      title: translationTable.headings[0].title },
    { data: translationTable.headings[1].key, name: translationTable.headings[1].key,
      title: translationTable.headings[1].title },
    { data: translationTable.headings[2].key, name: translationTable.headings[2].key,
      title: translationTable.headings[2].title },
    { data: translationTable.headings[3].key, name: translationTable.headings[3].key,
      title: translationTable.headings[3].title },
    { data: translationTable.headings[4].key, name: translationTable.headings[4].key,
      title: translationTable.headings[4].title },
    { data: translationTable.headings[5].key, name: translationTable.headings[5].key,
      title: translationTable.headings[5].title },
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
  data: this.tableRows,
  dom: "t",
  language: {
    zeroRecords: "No records found"
  },
  order: [[ 1, 'asc' ]],
  pfConfig: {
    emptyStateSelector: "#emptyState2",
    filterCaseInsensitive: true,
    filterCols: [
      null,
      {
        default: true,
        optionSelector: "#filterB1",
        placeholder: '&nbsp'
      }, {
        optionSelector: "#filterB2",
        placeholder: "Event Assignments"
      }, {
        optionSelector: "#filterB3",
        placeholder: "Temporal Data"
      }, {
        optionSelector: "#filterB4",
        placeholder: "Spatial Data"
      }, {
        optionSelector: "#filterB5",
        placeholder: "Hidden Rows"
      }, {
        optionSelector: "#filterB6",
        placeholder: "+ Info Card"
      }, {
        optionSelector: "#filterB7",
        placeholder: "- Info Card"
      }
    ],
    paginationSelector: "#pagination2",
    toolbarSelector: "#toolbar2",
    selectAllSelector: 'th:first-child input[type="checkbox"]',
    colvisMenuSelector: '.table-view-pf-colvis-menu'
  },
  select: {
    selector: 'td:first-child input[type="checkbox"]',
    style: 'multi'
  },
});

console.log("Initialize DataTable");
$('.datatable').dataTable({
//     "paging": true
}
);


table2
    .on( 'select', function ( e, dt, type, indexes ) {
        var rowData = table2.rows( indexes ).data().toArray();
        console.log( '<div><b>'+type+' selection</b> - '+JSON.stringify( rowData )+'</div>' );
        console.log(indexes, rowData);
        if (rowData[0].infocard != null) {
          $('#removeInfoData').removeAttr('disabled');
        } else {
          $('#includeInfoData').removeAttr('disabled');
          selectionOrder.push(indexes[0]);
        }
    } )
    .on( 'deselect', function ( e, dt, type, indexes ) {
      // Cases: 1) the deselected item was a null (able to be included)
      //        2) the deselected item was a number (able to be removed)
      //        3) there are no more selected items
      //        4) there are additional null selections
      //        5) there are additional numbered selections
      
      selectionOrder.splice(selectionOrder.indexOf(indexes[0]), 1);
      if (selectionOrder.indexOf(indexes[0]) === -1) {

      }
        var rowData = table2.rows( indexes ).data().toArray();
        console.log( '<div><b>'+type+' <i>de</i>selection</b> - '+JSON.stringify( rowData )+'</div>' );
        if (selectionOrder.length === 0) {
          $('#includeInfoData').attr('disabled');
          $('#removeInfoData').attr('disabled');
        }
        //if (table2.rows({ selected: true})[0].length === 0) {


    } );

//table2.page( 'first' ).draw( 'page' );

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

//console.log("emptyTableViewUtil");
  this.dt = $(config.tableSelector).DataTable(); // DataTable
  this.deleteRows = $(config.deleteRowsSelector); // Delete rows control
  this.restoreRows = $(config.restoreRowsSelector); // Restore rows control
  this.includeInfoData = $(config.includeInfoDataSelector);
  this.removeInfoData = $(config.removeInfoDataSelector);

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

  this.includeInfoData.on('click', function() {
  //  console.log("includeInfoData");
  //  console.log(table2.rows({ selected: true})[0]);
    //console.log(table2.rows({ selected: true}).data());
//    table2.rows({ selected: true})[0].forEach(function(row){
    selectionOrder.forEach(function(row){
      //if (infoCardLayout.indexOf(table2.rows({ selected: true})[0][infoCardLayout.length]) === -1) {
      if (infoCardLayout.indexOf(row) === -1) {
        infoCardLayout.push(row);
        table2.cell(row, translationTable.headings[1].key + ":name").data(infoCardLayout.length);
      }
      table2.row(row).deselect().draw();
  //    console.log(table2.cell(row, translationTable.headings[1].key + ":name").data());
    })
    $('#includeInfoData').attr('disabled','true');
    $('#removeInfoData').attr('disabled','true');
    selectionOrder = [];
    console.log(infoCardLayout);
  });

  this.removeInfoData.on('click', function() {
    console.log("includeInfoData");
  });

  // Initialize restore rows
  if (this.dt.data().length === 0) {
    $(this.restoreRows).prop("disabled", false);
  }
};

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

function closeSettings(){
  var elem = document.getElementById("emptyState2");
  elem.parentNode.removeChild(elem);
  elem = document.getElementById("pagination2");
  elem.parentNode.removeChild(elem);
  elem = document.getElementById("table2");
  elem.parentNode.removeChild(elem);
  elem = document.getElementById("toolbar2");
  elem.parentNode.removeChild(elem);
}

// pagination
/*
function nextTablePage(){
  console.log("next clicked", table2.page.info());
  table2.page( 'next' ).draw( 'page' );
};
*/

function addToInfocard() {
  console.log("+ Infocard",table2.rows({ selected: true} ));
}
