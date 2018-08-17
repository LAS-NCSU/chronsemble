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
var infoCardLayout = {};
var selectionOrder = [];  // FIFO that temporarily holds only the ordinal index
                          // of rows that have not previously been added to
                          // infoCardLayout layout list. These are added in the
                          // order that they are selected as they are selected.
                          // Once the user clicks the "+ Info Card" button, the
                          // values are transfered to the infoCardLayout
                          // structure. Ordinal indices represent the column/heading
                          // order in a typical csv file with the first column/heading
                          // assigned to ordinal 0, second column/heading assigned
                          // to ordinal 1, and so forth.
var tableRows = [];

/*==============================================================================

 ######  #    #  ######  #    #   #####    ##     ####    ####   #    #
 #       #    #  #       ##   #     #     #  #   #       #    #  ##   #
 #####   #    #  #####   # #  #     #    #    #   ####   #       # #  #
 #       #    #  #       #  # #     #    ######       #  #  ###  #  # #
 #        #  #   #       #   ##     #    #    #  #    #  #    #  #   ##
 ######    ##    ######  #    #     #    #    #   ####    ####   #    #

==============================================================================*/

function handleEventAssignment(event) {
  var row = event.path[5]._DT_RowIndex;
  var assignment = event.path[0].innerText;
  console.log("event selected:", event);
  console.log("event selected:", event.path[0].id, "row:", event.path[5].rowIndex, "DT row:", event.path[5]._DT_RowIndex);
  console.log(table2.cell(row, "buttonAssignment:name").render("display"));
  //table2.cell(row, "buttonAssignment:name").data('<span class="i fa pficon-close"></span> test').draw();
  table2.cell(row, "buttonAssignment:name").data(assignment).draw();
}

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
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = 'Data Field';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB6';
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
//      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
//      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
//      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
//      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB5';
//      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = 'Hidden Rows';
      settingsTBarGroupLabelDivDivBtnUlLi = settingsTBarGroupLabelDivDivBtnUl.appendChild(document.createElement("li"));
      settingsTBarGroupLabelDivDivBtnUlLiA = settingsTBarGroupLabelDivDivBtnUlLi.appendChild(document.createElement("a"));
      settingsTBarGroupLabelDivDivBtnUlLiA.href = '#';
      settingsTBarGroupLabelDivDivBtnUlLiA.id = 'filterB2';
      settingsTBarGroupLabelDivDivBtnUlLiA.innerHTML = '+ Info Card';
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
/*
      settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
      settingsTBarGroup.className = 'form-group';
      var settingsTBarGroupBtn1 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn1.type = 'button';
      settingsTBarGroupBtn1.className = 'btn btn-default';
      settingsTBarGroupBtn1.id = 'hideRowsB';
      settingsTBarGroupBtn1.innerHTML = 'Hide';
      settingsTBarGroupBtn1.setAttribute('disabled','true');
      settingsTBarGroupBtn1 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn1.type = 'button';
      settingsTBarGroupBtn1.className = 'btn btn-default';
      settingsTBarGroupBtn1.id = 'unhideRowsB';
      settingsTBarGroupBtn1.innerHTML = 'Unhide';
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
*/

/*==============================================================================

#    #    #  ######   ####   #####    #####  #    #   ####
#    ##   #  #       #    #  #    #     #    ##   #  #
#    # #  #  #####   #    #  #####      #    # #  #   ####
#    #  # #  #       #    #  #    #     #    #  # #       #
#    #   ##  #       #    #  #    #     #    #   ##  #    #
#    #    #  #        ####   #####      #    #    #   ####

==============================================================================*/

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

  //    settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
  //    settingsTBarGroup.className = 'form-group';
      settingsTBarGroupBtn2 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn2.type = 'button';
      settingsTBarGroupBtn2.className = 'btn btn-default';
      settingsTBarGroupBtn2.id = 'shiftUp';
      settingsTBarGroupBtn2.innerHTML = '<span class="i glyphicon glyphicon-arrow-up"></span>';
      settingsTBarGroupBtn2.setAttribute('disabled','true');

    //  settingsTBarGroupBtn1.onclick = 'addToInfocard()';
    //  settingsTBarGroupBtn1.setAttribute('onclick','addToInfocard()');
      settingsTBarGroupBtn2 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn2.type = 'button';
      settingsTBarGroupBtn2.className = 'btn btn-default';
      settingsTBarGroupBtn2.id = 'shiftDown';
      settingsTBarGroupBtn2.innerHTML = '<span class="i glyphicon glyphicon-arrow-down"></span>';
      settingsTBarGroupBtn2.setAttribute('disabled','true');

/*==============================================================================

                                             #
#####   #    #     #    #       #####       #    ####     ##    #    #  ######
#    #  #    #     #    #       #    #     #    #        #  #   #    #  #
#####   #    #     #    #       #    #    #      ####   #    #  #    #  #####
#    #  #    #     #    #       #    #   #           #  ######  #    #  #
#    #  #    #     #    #       #    #  #       #    #  #    #   #  #   #
#####    ####      #    ######  #####  #         ####   #    #    ##    ######

==============================================================================*/

      settingsTBarGroup = settingsTBarForm.appendChild(document.createElement("div"));
      settingsTBarGroup.className = 'form-group';
      var settingsTBarGroupBtn3 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn3.type = 'button';
      settingsTBarGroupBtn3.className = 'btn btn-default';
      settingsTBarGroupBtn3.id = 'buildViz';
      settingsTBarGroupBtn3.innerHTML = '<span class="i glyphicon glyphicon-refresh"></span>';

    //  settingsTBarGroupBtn1.onclick = 'addToInfocard()';
    //  settingsTBarGroupBtn1.setAttribute('onclick','addToInfocard()');
      settingsTBarGroupBtn3 = settingsTBarGroup.appendChild(document.createElement("button"));
      settingsTBarGroupBtn3.type = 'button';
      settingsTBarGroupBtn3.className = 'btn btn-default';
      settingsTBarGroupBtn3.id = 'saveSettings';
      settingsTBarGroupBtn3.innerHTML = '<span class="i fa pficon-save"></span>';
      settingsTBarGroupBtn3.setAttribute('disabled','true');

/*==============================================================================

      ####   ######    ##    #####    ####   #    #
     #       #        #  #   #    #  #    #  #    #
      ####   #####   #    #  #    #  #       ######
          #  #       ######  #####   #       #    #
     #    #  #       #    #  #   #   #    #  #    #
      ####   ######  #    #  #    #   ####   #    #

==============================================================================*/

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
  tableRows = [];
  this.tableRows = tableRows;
  infoCardLayout.row = [];
  infoCardLayout.fieldName = [];

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
  console.log(fileKeys);
  //this[translationTable.headings[0].key] = d3.keys(fileData[0]);
  //console.log(this[translationTable.headings[0].key][0]);
  //console.log(fileData[1][this[translationTable.headings[0].key][0]]);
  //this[translationTable.headings[1].key] = fileData[1][this[translationTable.headings[0].key][0]];
  //this[translationTable.headings[2].key] = fileData[2][this[translationTable.headings[0].key][0]];
  //this[translationTable.headings[3].key] = '';
  //this[translationTable.headings[4].key] = '';
  var count = 0;
  fileKeys.forEach(function(fileKey){
    configData[count] = {[translationTable.headings[4].key]: "", [translationTable.headings[5].key]: "", eventAssignment: null };
    this.tableRows.push({[translationTable.headings[0].key]: fileKeys[count++],
        [translationTable.headings[1].key]: null,
        [translationTable.headings[2].key]: fileData[1][fileKey],
        [translationTable.headings[3].key]: fileData[2][fileKey],
        [translationTable.headings[4].key]: '',
        [translationTable.headings[5].key]: '',
        buttonAssignment: "..." });
  });

buildTable(tabID);

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
  removeInfoDataSelector: '#removeInfoData',
  buildVizSelector: '#buildViz',
  shiftUpSelector: '#shiftUp',
  shiftDownSelector: '#shiftDown'
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
    { data: "buttonAssignment", name: "buttonAssignment",
      className: "table-view-pf-actions",
      render: function (data, type, full, meta) {
        // Inline action button renderer
        return '<div class="table-view-pf-btn"><button class="btn btn-default" type="button">' + data + '</button></div>';
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
          '<li><button id="menuEventLabel" onclick="handleEventAssignment(event)" enabled>Event Label</button></li>' +
          '<li><button id="menuEventInstant" onclick="handleEventAssignment(event)" enabled>Event Instant</button></li>' +
          '<li><button id="menuEventStart" onclick="handleEventAssignment(event)" enabled>Event Start</button></li>' +
          '<li><button id="menuEventEnd" onclick="handleEventAssignment(event)" enabled>Event End</button></li>' +
          '<li><button id="menuEventLocation" onclick="handleEventAssignment(event)" enabled>Event Location</button></li>' +
          '<li><button id="menuTemporalAccuracy" onclick="handleEventAssignment(event)" enabled>Temporal Accuracy</button></li>' +
          '<li><button id="menuSpatialAccuracy" onclick="handleEventAssignment(event)" enabled>Spatial Accuracy</button></li>' +
          '<li role="separator" class="divider"></li>' +
          '<li><button id="menuTemporalContetxt" onclick="handleEventAssignment(event)" enabled>Temporal Context</button></li></ul></div>';
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
        placeholder: 'Data Field',
        columnNum: 1
      }, {
        optionSelector: "#filterB6",
        placeholder: "Event Assignments",
        columnNum: 7,
        useCustomFilter: function searchEvent(dtSettings,searchData,index,rawData,counter){}
      }, {
        optionSelector: "#filterB3",
        placeholder: "Temporal Data",
        columnNum: 7,
        useCustomFilter: function searchTime(dtSettings,searchData,index,rawData,counter){}
      }, {
        optionSelector: "#filterB4",
        placeholder: "Spatial Data",
        columnNum: 7,
      }, {
        optionSelector: "#filterB2",
        placeholder: "+ Info Card",
        columnNum: 2,
        filterOnSelect: true,
        useCustomFilter: function searchInfo(dtSettings,searchData,index,rawData,counter){
          return (searchData[2] !== "");
        }
        //autoFilter: true
        //placeholder: translationTable.headings[1].title
      }, {
        optionSelector: "#filterB7",
        placeholder: "- Info Card",
        columnNum: 2,
        filterOnSelect: true,
        useCustomFilter: function searchNotInfo(dtSettings,searchData,index,rawData,counter){
          return (searchData[2] === "");
        }
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
      // Must be able to process all indexes passed - for instance if the
      // selectAll box is checked.
        indexes.forEach(function(index) {
          if (table2.cell(index, translationTable.headings[1].key + ":name").data() === null &&
              selectionOrder.indexOf(index) === -1) {
          //  console.log("index:", index, " is null");
          //  $('#includeInfoData').removeAttr('disabled');
          console.log("pushing:", index);
            selectionOrder.push(index);
          } else {
            $('#removeInfoData').removeAttr('disabled');

            if (table2.rows({ selected: true})[0].length === 1) {
    //          console.log("One selected");
              if (infoCardLayout.row[0] !== table2.rows({ selected: true})[0][0]) {
                $('#shiftUp').removeAttr('disabled');
      //          console.log("no more shift up");
              }
              if (table2.rows({ selected: true})[0][0] !== infoCardLayout.row[infoCardLayout.row.length-1]) {
                $('#shiftDown').removeAttr('disabled');
        //        console.log("no more shift down");
              }
            } else {
              $('#shiftUp').removeAttr('disabled');
              $('#shiftDown').removeAttr('disabled');
            }
          }
        });
        if (selectionOrder.length > 0) {
          $('#includeInfoData').removeAttr('disabled');
        }
    //    var rowData = table2.rows( indexes ).data().toArray();
    //    console.log( '<div><b>'+type+' selection</b> - '+JSON.stringify( rowData )+'</div>' );
    } )
    .on( 'deselect', function ( e, dt, type, indexes ) {
      // Cases: 1) the deselected item was a null (able to be included)
      //           a. are there any other selections?
      //              yes: are they all null?
      //                 yes: disable "- Info Card" button
      //                  no: are they all assigned to card?
      //                    yes: disable "+ Info Card" button
      //                     no: continue
      //              no: disable both Info Card buttons
      //        2) the deselected item was a number (able to be removed)
      //           a. are there any other selections?
      //              yes: are they all null?
      //                 yes: disable "- Info Card" button
      //                  no: are they all assigned to card?
      //                    yes: disable "+ Info Card" button
      //                     no: continue
      //              no: disable both Info Card buttons
      if ($('#includeInfoData').attr('value') === 'on' ||
          $('#removeInfoData').attr('value') === 'on') {
        // This is a programmatic deselection due to the user pressing the
        // "+ Info Card" button - do not update data references as a result.
        // FIXME - it would be nice if there were a better way to flag this
        // other than setting the value attribute but didn't see any obvious
        // better solution.
      } else {
        indexes.forEach(function(index) {
        //  if (table2.cell(index, translationTable.headings[1].key + ":name").data() != null) {
        // if this row is in the selectionOrder, remove it.
          if (selectionOrder.indexOf(index) != -1) {
            console.log("splicing:", index);
            selectionOrder.splice(selectionOrder.indexOf(index), 1);
          }
        } )

      //  console.log("e:", e, "dt:", dt, "type:", type, "indexes:", indexes, "------");
        // In order to determine how to update the buttons, we must determine if
        // there are any other selected rows.
        //console.log("selected rows:", table2.rows({ selected: true})[0].length);

        if (table2.rows({ selected: true})[0].length > 0) {
//console.log("selectionOrder.length=",selectionOrder.length);
          // corner cases to deactivate the shift up and down buttons when the
          // only selection is either the first or last line of the info-card
          // respectively.
          if (table2.rows({ selected: true})[0].length === 1) {
  //          console.log("One selected");
            if (infoCardLayout.row[0] === table2.rows({ selected: true})[0][0]) {
              $('#shiftUp').attr('disabled', 'true');
    //          console.log("no more shift up");
            } else if (table2.rows({ selected: true})[0][0] === infoCardLayout.row[infoCardLayout.row.length-1]) {
              $('#shiftDown').attr('disabled', 'true');
      //        console.log("no more shift down");
            }
          }

          if (selectionOrder.length === 0) {
            // rows selected with none that can be added to InfoCard
            $('#includeInfoData').attr('disabled', 'true');
          } else if (selectionOrder.length === table2.rows({ selected: true})[0].length) {
            // rows selected are all able to be added to InfoCard
            $('#removeInfoData').attr('disabled', 'true');
            $('#shiftUp').attr('disabled', 'true');
            $('#shiftDown').attr('disabled', 'true');
          }
        } else {
          // no more rows selected
          $('#includeInfoData').attr('disabled', 'true');
          $('#removeInfoData').attr('disabled', 'true');
          $('#shiftUp').attr('disabled', 'true');
          $('#shiftDown').attr('disabled', 'true');
        }

        table2.rows({ selected: true})[0].forEach(function(row) {
          console.log("still selected:", row);
        });
      }

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
  this.buildViz = $(config.buildVizSelector);
  this.shiftUp = $(config.shiftUpSelector);
  this.shiftDown = $(config.shiftDownSelector);

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

/*==============================================================================

  #        #    #    #  ######   ####    ####     ##    #####   #####
  #        #    ##   #  #       #    #  #    #   #  #   #    #  #    #
#####      #    # #  #  #####   #    #  #       #    #  #    #  #    #
  #        #    #  # #  #       #    #  #       ######  #####   #    #
  #        #    #   ##  #       #    #  #    #  #    #  #   #   #    #
           #    #    #  #        ####    ####   #    #  #    #  #####

==============================================================================*/

  this.includeInfoData.on('click', function() {
    $('#includeInfoData').attr('value', 'on');
  //  console.log("includeInfoData");
  //  console.log(table2.rows({ selected: true})[0]);
  //console.log(table2.rows({ selected: true}).data());
//    table2.rows({ selected: true})[0].forEach(function(row){
    selectionOrder.forEach(function(row) {
      //if (infoCardLayout.indexOf(table2.rows({ selected: true})[0][infoCardLayout.length]) === -1) {
      if (infoCardLayout.row.indexOf(row) === -1) {
        infoCardLayout.row.push(row);
        infoCardLayout.fieldName.push(table2.cell(row, translationTable.headings[0].key + ":name").data());
        table2.cell(row, translationTable.headings[1].key + ":name").data(infoCardLayout.row.length);
        var cardObj = {'field': row, 'string':table2.cell(row, translationTable.headings[0].key + ":name").data()};
        console.log(cardObj);
      }
      table2.row(row).deselect().draw();
  //  console.log(table2.cell(row, translationTable.headings[1].key + ":name").data());
    })
    $('#includeInfoData').attr('disabled','true');
    $('#includeInfoData').attr('value', 'off');
    if (table2.rows({ selected: true})[0].length === 0 ) {
      $('#removeInfoData').attr('disabled','true');
    }
    selectionOrder = [];
    console.log(infoCardLayout);
  });

/*==============================================================================

           #    #    #  ######   ####    ####     ##    #####   #####
           #    ##   #  #       #    #  #    #   #  #   #    #  #    #
#####      #    # #  #  #####   #    #  #       #    #  #    #  #    #
           #    #  # #  #       #    #  #       ######  #####   #    #
           #    #   ##  #       #    #  #    #  #    #  #   #   #    #
           #    #    #  #        ####    ####   #    #  #    #  #####

==============================================================================*/
  this.removeInfoData.on('click', function() {
    $('#removeInfoData').attr('value', 'on');

    table2.rows({ selected: true})[0].forEach(function(row) {
      // only process rows that were previously selected
      var layoutIndex = infoCardLayout.row.indexOf(row);
      if (layoutIndex != -1) {
        console.log("splicing:", row);
        infoCardLayout.row.splice(layoutIndex,1);
        infoCardLayout.fieldName.splice(layoutIndex,1);
        console.log("infoCardLayout:", infoCardLayout);
        table2.cell(row, translationTable.headings[1].key + ":name").data(null);
        table2.row(row).deselect().draw();
      }

      for (var i = 0; i < infoCardLayout.row.length; i++) {
        table2.cell(infoCardLayout.row[i], translationTable.headings[1].key + ":name").data(i+1).draw();
      }
    });

    $('#removeInfoData').attr('value', 'off');
    $('#removeInfoData').attr('disabled','true');

    console.log("removeInfoData");
  });

/*==============================================================================

    ####   #    #     #    ######   #####  #    #  #####
   #       #    #     #    #          #    #    #  #    #
    ####   ######     #    #####      #    #    #  #    #
        #  #    #     #    #          #    #    #  #####
   #    #  #    #     #    #          #    #    #  #
    ####   #    #     #    #          #     ####   #

==============================================================================*/
  this.shiftUp.on('click', function() {
    console.log("shiftUp");
//      $('#shiftUp').attr('value', 'on');
//    var shiftedRows = 0;
//    var layoutIndex = -1;
    var selectedRows = table2.rows({ selected: true})[0];
    var shiftResults = shiftInfoData(selectedRows);
    console.log(shiftResults);
/*
    infoCardLayout.row.forEach(function(row) {
      // only process selected rows
      layoutIndex++;
      if (layoutIndex === 0) return;
      if (selectedRows.indexOf(row) !== -1) {
        shiftedRows++;
        var layoutName = infoCardLayout.fieldName[layoutIndex];
        var swapRow = infoCardLayout.row[layoutIndex-1];
        var swapName = infoCardLayout.fieldName[layoutIndex-1];
        console.log("shiftup:", row, " shiftdn:", swapRow);
        console.log("shiftup:", layoutName, " shiftdn:", swapName);
        infoCardLayout.row[layoutIndex-1] = row;
        infoCardLayout.fieldName[layoutIndex-1] = layoutName;
        infoCardLayout.row[layoutIndex] = swapRow;
        infoCardLayout.fieldName[layoutIndex] = swapName;
        console.log("infoCardLayout:", infoCardLayout);
        table2.cell(row, translationTable.headings[1].key + ":name").data(layoutIndex).draw();
        table2.cell(swapRow, translationTable.headings[1].key + ":name").data(layoutIndex+1).draw();
      }
    });
    */
    if (shiftResults.priorIndex === 1 && shiftResults.shiftedRows === 1) {
      $('#shiftUp').attr('disabled','true');
    }
    $('#shiftDown').removeAttr('disabled');

  });


/*==============================================================================

 ####   #    #     #    ######   #####  #####   #    #
#       #    #     #    #          #    #    #  ##   #
 ####   ######     #    #####      #    #    #  # #  #
     #  #    #     #    #          #    #    #  #  # #
#    #  #    #     #    #          #    #    #  #   ##
 ####   #    #     #    #          #    #####   #    #

==============================================================================*/

  this.shiftDown.on('click', function() {
  // Let sn be the nth selected info-card data field. In order to execute a
  // shift down, we notice that a shift of [s0], [s1],..., [sn] down is equivalent to
  // a shift of [s0+1], [s1+1],..., [sn+1] up.
    console.log("shiftDown");
//      $('#shiftUp').attr('value', 'on');
    var selectedRows = [];
    var i = 1;
    infoCardLayout.row.forEach(function(row) {
      console.log("checking row:", row);
      if (i < infoCardLayout.row.length &&
          table2.rows({ selected: true})[0].indexOf(row) !== -1) {
          selectedRows.push(infoCardLayout.row[i]);
      }
      i++;
    });
    console.log("up shift:", selectedRows);
    var shiftResults = shiftInfoData(selectedRows);
    console.log("shift results:", shiftResults);
    if (selectedRows.length === 1 && selectedRows[0] === infoCardLayout.row[infoCardLayout.row.length-2]) {
      $('#shiftDown').attr('disabled','true');
    }
    $('#shiftUp').removeAttr('disabled');
});


/*==============================================================================

#####   #    #     #    #       #####
#    #  #    #     #    #       #    #
#####   #    #     #    #       #    #
#    #  #    #     #    #       #    #
#    #  #    #     #    #       #    #
#####    ####      #    ######  #####

==============================================================================*/
  this.buildViz.on('click', function() {
    if (!getElementState('tabVisualization')) {
      console.log(getElementState('tabVisualization'), 'close previous session ...');
      refreshVisualization();
    }
    console.log("buildViz");
    buildVisualization(fileData);
  });

  // Initialize restore rows
  if (this.dt.data().length === 0) {
    $(this.restoreRows).prop("disabled", false);
  }
};

function shiftInfoData(selectedRows) {
// All shifts are treated as a shift from position n to position n-1. Therefore
// The selectedRows passed to this fcn are expected to be sorted from smallest
// to largesdt and processed in the sam order.

  var shiftedRows = 0;
  var layoutIndex = -1;
  var priorIndex = null;

  infoCardLayout.row.forEach(function(row) {
    // only process selected rows
    layoutIndex++;
    if (layoutIndex === 0) return;
    if (selectedRows.indexOf(row) !== -1) {
      shiftedRows++;
      priorIndex = layoutIndex;
      var layoutName = infoCardLayout.fieldName[layoutIndex];
      var swapRow = infoCardLayout.row[layoutIndex-1];
      var swapName = infoCardLayout.fieldName[layoutIndex-1];
      console.log("shiftup:", row, " shiftdn:", swapRow);
      console.log("shiftup:", layoutName, " shiftdn:", swapName);
      infoCardLayout.row[layoutIndex-1] = row;
      infoCardLayout.fieldName[layoutIndex-1] = layoutName;
      infoCardLayout.row[layoutIndex] = swapRow;
      infoCardLayout.fieldName[layoutIndex] = swapName;
      console.log("infoCardLayout:", infoCardLayout);
      table2.cell(row, translationTable.headings[1].key + ":name").data(layoutIndex).draw();
      table2.cell(swapRow, translationTable.headings[1].key + ":name").data(layoutIndex+1).draw();
    }
  });
return { priorIndex, shiftedRows };
}

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
  table2.clear();
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
