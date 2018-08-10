/**
 * @summary     pfFilter for DataTables
 * @description A collection of API methods providing simple filter functionality for DataTables. This ensures
 * DataTables meets the Patternfly design pattern with a toolbar.
 *
 * There are two types of filters: (1) search string driven, and (2) immediate with
 * option to refine using search string. Filters of the first type allow the user to
 * choose the column heading from the filter pull-down menu and then enter a string
 * into the filter input field that is used as the search term for that column.
 * Filters of this type are not applied until the user enters a search term in the
 * filter input field.
 *
 * Filters of the second type typically act immediately upon selectionfrom the filter
 * pull-down menu (based on boolean variable 'filterOnSelect'). For an immediate
 * filter, a custom filter function should to be defined in the pfConfig.filtercols
 * array of the .dataTables config object. This custom filter should return a boolean
 * based on whether the table row should be rendered or not for the given filter.
 * Custom filters can be defined over multiple columns and/or over one or more value
 * ranges, etc. In addition, an immediate filter can be further refined by entering
 * a search string in the filter input field. This search term will be applied to the
 * column defined in the pfConfig.filtercols array.
 *
 * After a filter has been applied, the filter results text, active filter
 * controls, and a clear all control are shown.
 *
 * The toolbar and empty state layouts are expected to contain the classes as shown in the example below.
 *
 * Example:
 *
 * <!-- NOTE: Some configuration may be omitted for clarity -->
 * <div class="row toolbar-pf table-view-pf-toolbar" id="toolbar1">
 *   <div class="col-sm-12">
 *     <form class="toolbar-pf-actions">
 *       <div class="form-group toolbar-pf-filter">
 *         <label class="sr-only" for="filter">Rendering Engine</label>
 *         <div class="input-group">
 *           <div class="input-group-btn">
 *             <button type="button" class="btn btn-default dropdown-toggle" id="filter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Rendering Engine <span class="caret"></span></button>
 *             <ul class="dropdown-menu">
 *               <li><a href="#" id="filter1">Rendering Engine</a></li>
 *               <li><a href="#" id="filter2">Browser</a></li>
 *               <li><a href="#" id="filter7">Apple Platforms</a></li>
 *             </ul>
 *           </div>
 *           <input type="text" class="form-control" placeholder="Filter By Rendering Engine..." autocomplete="off" id="filterInput">
 *         </div>
 *       </div>
 *       ...
 *     </form>
 *     <div class="row toolbar-pf-results">
 *       <div class="col-sm-9">
 *         <div class="hidden">
 *           <h5>0 Results</h5>
 *           <p>Active filters:</p>
 *           <ul class="list-inline"></ul>
 *           <p><a href="#">Clear All Filters</a></p>
 *         </div>
 *       </div>
 *       <div class="col-sm-3 table-view-pf-select-results">
 *         <strong>0</strong> of <strong>0</strong> selected
 *       </div>
 *     </div>
 *   </div>
 * </div>
 * <table class="table table-striped table-bordered table-hover" id="table1">
 *   <thead>
 *     <tr>
 *       <th><input type="checkbox" name="selectAll"></th>
 *       <th>Rendering Engine</th>
 *       <th>Browser</th>
 *     </tr>
 *   </thead>
 * </table>
 * ...
 * <script>
 * // NOTE: Some properties may be omitted for clarity
 * $(document).ready(function() {
 *   var dt = $("#table1").DataTable({
 *     columns: [
 *       { data: null, ... },
 *       { data: "engine" },
 *       { data: "browser" }
 *     ],
 *     data: [
 *       { engine: "Gecko", browser: "Firefox" }
 *       { engine: "Trident", browser: "Mozilla" }
 *     ],
 *     dom: "t",
 *     pfConfig: {
 *       ...
 *       filterCaseInsensitive: true,
 *       filterCols: [
 *         null,
 *         { // filter type 1
 *           default: true,
 *           optionSelector: "#filter1",
 *           placeholder: "Filter By Rendering Engine..."
 *         }, { // filter type 1
 *           optionSelector: "#filter2",
 *           placeholder: "Filter By Browser..."
 *         }, ...
 *            { // filter type 2
 *           optionSelector: "#filter7",
 *           placeholder: "Filter By Apple Platforms...",
 *           columnNum: 3,
 *           filterOnSelect: true,
 *           useCustomFilter: function platformTest(dtSettings,searchData,index,rawData,counter){
 *           return (searchData[3].search("OSX") != -1 || searchData[3].search("Mac") != -1 || searchData[3].search("iPod") != -1);}
 *         }
 *       ],
 *       toolbarSelector: "#toolbar1"
 *     }
 *   });
 *   // Optional API to clear filters
 *   dt.table().pfFilter.clearFilters();
 *
 *   // Optional API to add filter
 *   dt.table().pfFilter.addFilter({
 *     column: 2,
 *     name: "Browser",
 *     value: "Firefox"
 *   });
 * });
 * </script>
 *
 * Note: This functionality requires the following Javascript library files to be loaded:
 *
 * https://cdn.datatables.net/select/1.2.0/js/dataTables.select.min.js
 */
(function (factory) {
  "use strict";
  if (typeof define === "function" && define.amd ) {
    // AMD
    define (["jquery", "datatables.net"], function ($) {
      return factory ($, window, document);
    });
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = function (root, $) {
      if (!root) {
        root = window;
      }
      if (!$ || !$.fn.dataTable) {
        $ = require("datatables.net")(root, $).$;
      }
      return factory($, root, root.document);
    };
  } else {
    // Browser
    factory(jQuery, window, document);
  }
}(function ($, window, document, undefined) {
  "use strict";
  var DataTable = $.fn.dataTable;
  var ACTIVE_FILTER_CONTROLS_SELECTOR = ".list-inline"; // Active filter controls
  var CLEAR_FILTERS_SELECTOR = ".toolbar-pf-results a"; // Clear filters control
  var FILTER_SELECTOR = ".toolbar-pf-filter"; // Filter input
  var FILTER_BUTTON_SELECTOR = FILTER_SELECTOR + " button"; // Filter button
  var FILTER_INPUT_SELECTOR = FILTER_SELECTOR + " input"; // Filter input
  var FILTER_LABEL_SELECTOR = FILTER_SELECTOR + " label"; // Filter label
  var RESULTS_SELECTOR = ".toolbar-pf-results"; // Toolbar results row
  var FILTER_RESULTS_SELECTOR = RESULTS_SELECTOR + " h5"; // Toolbar filter results
  var FILTER_INPUT_PLACEHOLDER = null; // document.getElementById("inputFilter").placeholder;
  var FILTER_BUTTON_TEXT = null; // document.getElementById("filter").text;

  DataTable.pfFilter = {};

  /**
   * Initialize
   *
   * @param {DataTable.Api} dt DataTable
   * @private
   */
  DataTable.pfFilter.init = function (dt) {
    var i;
    var ctx = dt.settings()[0];
    var opts = (ctx.oInit.pfConfig) ? ctx.oInit.pfConfig : {};

    ctx._pfFilter = {};
    ctx._pfFilter.filterButton = $(FILTER_BUTTON_SELECTOR, opts.toolbarSelector); // Filter button
    ctx._pfFilter.filterCols = opts.filterCols; // Filter colums config
    ctx._pfFilter.filterLabel = $(FILTER_LABEL_SELECTOR, opts.toolbarSelector); // Filter label
    ctx._pfFilter.filterInput = $(FILTER_INPUT_SELECTOR, opts.toolbarSelector); // Filter input
    ctx._pfFilter.filters = []; // Applied filters array
    ctx._pfFilter.activeFilterControls = $(ACTIVE_FILTER_CONTROLS_SELECTOR, opts.toolbarSelector); // Active filter controls
    ctx._pfFilter.activeFilters = ctx._pfFilter.activeFilterControls.closest("div"); // Active filters container
    ctx._pfFilter.clearFilters = $(CLEAR_FILTERS_SELECTOR, opts.toolbarSelector); // Clear filters control
    ctx._pfFilter.results = $(RESULTS_SELECTOR, opts.toolbarSelector); // Toolbar results row
    ctx._pfFilter.filterCaseInsensitive = opts.filterCaseInsensitive; // Filter filter case insensitive
    ctx._pfFilter.filterResults = $(FILTER_RESULTS_SELECTOR, opts.toolbarSelector); // Toolbar filter results
    ctx._pfFilter.filterOnSelect = false; // Set applying filter behavior
    ctx._pfFilter.filterFunction = null; // Filter function placeholder

    if (ctx._pfFilter.filterCols === undefined) {
      return;
    }

    // Set default filter properties
    for (i = 0; i < ctx._pfFilter.filterCols.length; i++) {
      if (ctx._pfFilter.filterCols[i] === null) {
        continue;
      }
      ctx._pfFilter.filterColumn = i; // Current filter column
      ctx._pfFilter.filterName = $(ctx._pfFilter.filterCols[i].optionSelector).text(); // Name of current filter
      if (ctx._pfFilter.filterCols[i].default === true) {
        break;
      }
    }

    // Handle click on filter menu to set current filter column and name
    for (i = 0; i < ctx._pfFilter.filterCols.length; i++) {
      handleFilterOption(dt, i); // Need to pass value of i as a function
    }

    // Handle actions when enter is pressed within filter input
    handleFilterInput(dt);

    // Handle actions when clear filters control is selected
    handleClearFilters(dt);

    // Simple filter
    $.fn.dataTable.ext.search.push(function (ctx, data, dataIndex) {
      var showThisRow = true;
      // Must match all filters
      if (ctx._pfFilter) {
        $.each(ctx._pfFilter.filters, function (index, filter) {
          if (filter.customFilter) {
            return true;
          }
          if (ctx._pfFilter.filterCaseInsensitive !== undefined && ctx._pfFilter.filterCaseInsensitive === true) {
            if (data[filter.column].toLowerCase().indexOf(filter.value.toLowerCase()) === -1) {
              showThisRow = false;
            }
          } else {
            if (data[filter.column].indexOf(filter.value) === -1) {
              showThisRow = false;
            }
          }
          return showThisRow;
        });
      }
      return showThisRow;
    });
  };

  // Local functions

  /**
   * Add active filter control
   *
   * @param {DataTable.Api} dt DataTable
   * @param {object} filter Properties associated with a new filter
   * @param {string} filter.column - Column associated with DataTable
   * @param {string} filter.name - Name of the filter
   * @param {string} filter.value - Value of the filter
   * @param {boolean} filter.onSelect - true causes filter to take effect when selected in pull-down menu
   * @param {function} filter.customFilter - function for custom filtering
   * @private
   */
  function addActiveFilterControl (dt, filter) {
    var ctx = dt.settings()[0];
    var i;

    // Append active filter control
    ctx._pfFilter.activeFilterControls.append('<li><span class="label label-info">' + filter.name + ((filter.onSelect) ? ' ' : ': ') +
      filter.value + '<a href="#"><span class="pficon pficon-close"/></a></span></li>');

    // Handle click to clear active filter
    $("a", ctx._pfFilter.activeFilterControls).last().on("click", function (e) {
      // Find existing filter and remove
      for (i = 0; i < ctx._pfFilter.filters.length; i++) {
        if (filter.customFilter) {
          if (ctx._pfFilter.filters[i].name === filter.name) {
            ctx._pfFilter.filters.splice(i, 1);
            $.fn.dataTable.ext.search.splice(i + 1, 1);
            $(this).parents("li").remove();
            break;
          }
        } else {
          if (ctx._pfFilter.filters[i].column === filter.column && ctx._pfFilter.filters[i].value === filter.value) {
            ctx._pfFilter.filters.splice(i, 1);
            $(this).parents("li").remove();
            break;
          }
        }
      }
      if (ctx._pfFilter.filters.length === 0) {
        ctx._pfFilter.activeFilters.addClass("hidden"); // Hide
        console.log("restoring placeholder:", FILTER_INPUT_PLACEHOLDER);
        document.getElementById("filterInputB").placeholder = FILTER_INPUT_PLACEHOLDER;
        document.getElementById("filterB").innerHTML = FILTER_BUTTON_TEXT;
      }
      dt.draw();
      updateFilterResults(dt);
    });
    // Show active filters
    ctx._pfFilter.activeFilters.removeClass("hidden");
  }

  /**
   * Add filter
   *
   * @param {DataTable.Api} dt DataTable
   * @param {object} filter Properties associated with a new filter
   * @param {string} filter.column - Column associated with DataTable
   * @param {string} filter.name - Name of the filter
   * @param {string} filter.value - Value of the filter
   * @param {boolean} filter.onSelect - true causes filter to take effect when selected in pull-down menu
   * @param {function} filter.customFilter - function for custom filtering
   * @private
   */
  function addFilter (dt, filter) {
    var ctx = dt.settings()[0];
    var found = false;

    // Find existing entry
    $.grep(ctx._pfFilter.filters, function (f) {
      if (f.customFilter) {
        if (f.name === filter.name && f.value === filter.value) {
          found = true;
        }
      } else if (f.column === filter.column && f.value === filter.value) {
        found = true;
      }
    });

    // Add new filter
    if (!found) {
      console.log("adding filter:", filter);
      ctx._pfFilter.filters.push(filter);
    }

    return !found;
  }

  /**
   * Clear filters
   *
   * @param {DataTable.Api} dt DataTable
   * @private
   */
  function clearFilters (dt) {
    var ctx = dt.settings()[0];
    ctx._pfFilter.filters.length = 0; // Reset filters
    $.fn.dataTable.ext.search.length = 1; // Remove all but simple filter from DataTable
    ctx._pfFilter.activeFilterControls.html(""); // Remove active filter controls
    ctx._pfFilter.activeFilters.addClass("hidden"); // Hide active filters area
    console.log("restoring placeholder:", FILTER_INPUT_PLACEHOLDER);
    document.getElementById("filterInputB").placeholder = FILTER_INPUT_PLACEHOLDER;
    document.getElementById("filterB").innerHTML = FILTER_BUTTON_TEXT;
    dt.draw();
  }

  /**
   * Handle actions when clear filters control is selected
   *
   * @param {DataTable.Api} dt DataTable
   * @private
   */
  function handleClearFilters (dt) {
    var ctx = dt.settings()[0];
    if (ctx._pfFilter.clearFilters === undefined || ctx._pfFilter.clearFilters.length === 0) {
      return;
    }
    ctx._pfFilter.clearFilters.on("click", function (e) {
      clearFilters(dt);
    });
  }

  /**
   * Provide function to prevent configuration errors from hard fail. this
   * function will not filter any rows.
   *
   * @private
   */
  function allPass () {
    // console.warn('WARNING: custom filter function for option: \"', ctx._pfFilter.filterCols[i].placeholder,'\" set to non-function type; using all-pass filter instead.');
    return true;
  }

  /**
   * Handle actions when enter is pressed within filter input
   *
   * @param {DataTable.Api} dt DataTable
   * @private
   */
  function handleFilterInput (dt) {
    var ctx = dt.settings()[0];
    if (ctx._pfFilter.filterInput === undefined || ctx._pfFilter.filterInput.length === 0) {
      return;
    }
    ctx._pfFilter.filterInput.on("keypress", function (e) {
      var keycode = (e.keyCode ? e.keyCode : e.which);
      var newFilter = {
        column: ctx._pfFilter.filterColumn,
        name: ctx._pfFilter.filterName,
        value: this.value,
        onSelect: false,
        // If filterOnSelect is true, the custom filter will have already been
        // added to the filter stack so we set it to null here.
        customFilter: (ctx._pfFilter.filterOnSelect) ? null : ctx._pfFilter.filterFunction
      };

      if (keycode === 13) {
        e.preventDefault();
        if (this.value.trim().length > 0) {
          if (addFilter(dt, newFilter)) {
            if (newFilter.customFilter) {
              $.fn.dataTable.ext.search.push(newFilter.customFilter);
            }
            dt.draw();
            addActiveFilterControl(dt, newFilter);
            updateFilterResults(dt);
          }
          ctx._pfFilter.filterInput.val(""); // Clear input
        }
        return false;
      }
      return true;
    });
  }

  /**
   * Handle actions when filter options are selected
   *
   * @param {DataTable.Api} dt DataTable
   * @param {number} i The column associated with this handler
   * @private
   */
  function handleFilterOption (dt, i) {
    var ctx = dt.settings()[0];

    if (ctx._pfFilter.filterCols[i] === null || ctx._pfFilter.filterCols[i].optionSelector === undefined) {
      return;
    }
    $(ctx._pfFilter.filterCols[i].optionSelector).on("click", function (e) {
      var newFilter = new Object();
      if (FILTER_BUTTON_TEXT === null) {// Save off initial button and Placeholder
                                        // text to restore when filters are cleared.
        FILTER_INPUT_PLACEHOLDER = document.getElementById("filterInputB").placeholder;
        FILTER_BUTTON_TEXT = document.getElementById("filterB").innerHTML;
        console.log("saving placeholder:", FILTER_INPUT_PLACEHOLDER);
        console.log("saving text:", FILTER_BUTTON_TEXT);
      }

      // Set input placeholder
      if (ctx._pfFilter.filterInput !== undefined && ctx._pfFilter.filterInput.length !== 0) {
        ctx._pfFilter.filterInput.get(0).placeholder = ctx._pfFilter.filterCols[i].placeholder;
      }
      // Set filter label
      if (ctx._pfFilter.filterLabel !== undefined && ctx._pfFilter.filterLabel.length !== 0) {
        ctx._pfFilter.filterLabel.html($(this).text());
      }
      // Set filter button
      if (ctx._pfFilter.filterButton !== undefined && ctx._pfFilter.filterButton.length !== 0) {
        ctx._pfFilter.filterButton.html($(this).text() + ' <span class="caret"></span>');
      }
      // Save filter column when applying filter; maintain backwards compatibility
      // with behavior prior to columnNum field.
      ctx._pfFilter.filterColumn =
        (ctx._pfFilter.filterCols[i].columnNum > 0 && ctx._pfFilter.filterCols[i].columnNum < ctx._pfFilter.filterCols.length) ?
        ctx._pfFilter.filterCols[i].columnNum : i; // Save filter column when applying filter
      ctx._pfFilter.filterOnSelect = ctx._pfFilter.filterCols[i].filterOnSelect; // Save applying filter behavior
      // Save custom filter function when applying filter; if problem with function
      // type, define all-pass filter.
      ctx._pfFilter.filterFunction = (ctx._pfFilter.filterCols[i].useCustomFilter) ?
        (($.isFunction(ctx._pfFilter.filterCols[i].useCustomFilter) ?
          ctx._pfFilter.filterCols[i].useCustomFilter : allPass))
        : null;
      ctx._pfFilter.filterName = $(this).text(); // Save filter name for active filter control

      if (ctx._pfFilter.filterOnSelect) {
        newFilter.column = ctx._pfFilter.filterColumn;
        newFilter.name = ctx._pfFilter.filterName;
        newFilter.value = "";
        newFilter.onSelect = true;
        newFilter.customFilter = ctx._pfFilter.filterFunction;

        if (addFilter(dt, newFilter)) {
          if (newFilter.customFilter) {
            $.fn.dataTable.ext.search.push(newFilter.customFilter);
          }
          dt.draw();
          addActiveFilterControl(dt, newFilter);
          updateFilterResults(dt);
        }
      }
      return true;
    });
  }

  /**
   * Update active filter results
   *
   * @param {DataTable.Api} dt DataTable
   * @private
   */
  function updateFilterResults (dt) {
    var ctx = dt.settings()[0];
    var filteredRows = dt.rows({"page": "current", "search": "applied"}).flatten().length;
    if (ctx._pfFilter.filterResults === undefined || ctx._pfFilter.filterResults.length === 0) {
      return;
    }
    ctx._pfFilter.filterResults.html(filteredRows + " Results");
  }

  // DataTables API

  /**
   * Add filter
   *
   * Example: dt.table().pfFilter.addFilter({
   *   column: 2,
   *   name: "Browser",
   *   value: "Firefox"
   * });
   *
   * @param {object} filter Properties associated with a new filter
   * @param {string} filter.column - Column associated with DataTable
   * @param {string} filter.name - Name of the filter
   * @param {string} filter.value - Value of the filter
   * @param {boolean} filter.onSelect - true causes filter to take effect when selected in pull-down menu
   * @param {function} filter.customFilter - function for custom filtering
   */
  DataTable.Api.register("pfFilter.addFilter()", function (filter) {
    return this.iterator("table", function (ctx) {
      addFilter(new DataTable.Api(ctx), filter);
    });
  });

  /**
   * Clear filters
   *
   * Example: dt.table().pfFilter.clearFilters();
   *
   */
  DataTable.Api.register("pfFilter.clearFilters()", function () {
    return this.iterator("table", function (ctx) {
      clearFilters(new DataTable.Api(ctx));
    });
  });

  // DataTables creation
  $(document).on("init.dt", function (e, ctx, json) {
    if (e.namespace !== "dt") {
      return;
    }
    DataTable.pfFilter.init(new DataTable.Api(ctx));
  });
  return DataTable.pfFilter;
}));
