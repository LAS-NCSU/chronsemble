# chronsemble

### Team Members
* Lead: @johnnyNcsu /jgharkin@ncsu.edu

## Summary
The goal of this project is to design a visualization tool to help investigators discover evidence associated with human trafficking through spatio-temporal analysis. While the project has its roots in combating trafficking, the visualization should have application to many analytic problems.

Our hypothesis is that the trafficking trade applies mechanisms of social, financial, and transportation networks in order to succeed and that the patterns associated with this endeavor may be distinct and observable when looked for.

Chronsemble is a visualization tool that is designed to allow analysts to interactively examine data in three modes: (1) temporally using timelines, (2) spatially using maps, and (3) contextually by changing the temporal focus to view the data. A mock-up of the temporal visualization is shown in figure 1. In this mock-up, data on the timeline can be viewed with greater detail in info-flow panes.

![Figure 1. Mock-up of the info-flow and timeline visualization mode.](data/img/mockupInfoFlow.png )

**Figure 1. Mock-up of the info-flow and timeline visualization mode.**

## Goals
Visualization should:
* be a web application for maximum reach;
* expose properties and relationships between entities/events at any point in space and time;
* sequence entities/events in absolute and relative terms (e.g. before, during, after, near, around, inside, outside, etc.);
* expose entity/event relationships by context/ontology/semantics;
* support interactivity with animation;
* support data entry.

## Status as of December 2018
The visualization supports rendering and interacting with a limited number of entities/events as long as the following restrictions are observed:
* Entities/events **must** be temporally tagged.
* Each rendered entity/event must include a *label* and a *start* field.
* For entities/events to be rendered on an interval, the input data must also include an *end* field.
* Entities/events that include only a *start* field will be rendered as instantaneous items.
* Temporal data should be formatted according to a js parsable date format.
* Spatial coordinates are optional.
* Spatial granularity is currently limited to highlighting entities/events by country.
* Spatial coordinates should be labeled with the *loc* field and conform to country code trigraphs defined by [ISO 3166 trigraphs](https://www.iso.org/iso-3166-country-codes.html).
* Input entities/events are rendered in browser memory and should therefore be limited in number to prevent browser crashes.


## Installation

1. Clone repository
2. Install js dependencies
   * cd to top project directory with the index.html and package.json file
   * npm install
3. Install a light weight webserver (e.g. [browsersync](https://browsersync.io))
4. Start your webserver from top level directory where index.html resides (uses chrome):
   * /usr/local/bin/browser-sync start --server --browser "Google Chrome" --files "\*.html, css/\*.css, src/\*.js"

## Operation
To visualize a dataset with Chronsemble, you will need a local data file that conforms to the restrictions noted in the **Status** section of this document. Chronsemble can process csv or json formatted data files.

When you launch the application, you will see the Chronsemble masthead with a pull-down menu labeled *Input Source*. Use this menu to choose and upload your local data file. Once data has been loaded, the *Settings* tab will become active. Choose the *Settings* tab to configure the visualization. Figure 2 shows the components of the *Settings* tab.

![Figure 2. Settings components.](data/img/settingsComponents.png )

**Figure 2. Settings tab components.**

The *Settings* tab is designed to allow you to configure the visualization before rendering. It consists of a menu bar and a configuration table. The intent of the *Settings* tab is threefold: (1) to allow you to choose which metadata to render on info cards, (2) to provide a mechanism to map arbitrary data files to the Chronsemble data schema, and (3) to provide a mechanism to select the context for rendering visualized data. Currently, only the assignment of metadata to info cards is fully operational; there is also a very rudimentary bit of code that supports changing the temporal context from the default context of rendering by entity/event label to rendering by entity/event location. This is at proof-of-concept stage only.

The menu bar contains controls that allow you to filter table data, add/remove data elements to/from info cards, re-order info card data elements, and build/refresh the configured visualization. There is also a control designed to allow saving configured settings but this is not yet implemented.

The configuration table exposes the names of the data fields from your uploaded data file as well as two samples of data from the file. There are also columns in the table to indicate placement of a data field on the info card display, and as yet implemented features to display data kind and accuracy/precision of time and location kinds of data. Finally, there is a mechanism to allow assigning event types and context to data - this as yet implemented feature will provide a means to map arbitrary data files to Chronsemble's data schema. For now, you must manually adjust your field names to match the expected names for valid temporal and location data fields. These are: *label* representing the name of the entity/event, *start* and *end* for the beginning and ending of an entity/event, and *loc* for the country trigraph corresponding to the entity/event location.

The data populating the *Data Fields* column in column 1 of the table are typically the column labels of a csv file. To choose metadata from your file to render on info cards, use the selection boxes to the left of the *Data Fields* column to choose up to sixteen fields to render on an info card. The order (from top to bottom) with which the fields will appear on each card are the same as the order of selection. Assignments are not final until the *+Info Card* button is pressed. The order of placement on cards is shown in the column to the right of the *Data Fields* column. The order of one or more items can be shifted by selecting the desired items to move and using the *up* or *down* arrows in the menu bar to move them in the desired direction. The placement order follows the ordinal value with least to greatest rendering from top to bottom on each card. For an example of how info cards are rendered on the visualization, see the info-flow pane in figure 3.

If no fields are added to the info card, then the visualization will render without an info-flow pane. To render the visualization, click on the *Build/Refresh* button in the menu bar. Once the visualization renders, the *Spatio-temporal Visualization* tab will become active. Select this tab to view and interact with the visualization.

Figure 3 shows a fully rendered data set from the test data supplied with this project.

![Figure 3. Visualization components.](data/img/chronsembleComponents.png)

**Figure 3. Component of the spatio-temporal visualization.**

Once the visualization is selected, the status bar will reveal the name of the uploaded file and which of the three flow panes (info-flow, temporal flow, spatio flow) have been rendered. There will always be a temporal flow pane but the info-flow and spatio flow panes will only render if the uploaded file contains location data and at least one data field was assigned to an info card in the *Settings* tab.

To interact with the visualization, move the cursor to the bird's-eye-view area and drag-click anywhere on the bird's-eye-view. As you drag-click, a scrubber window will be created over the area traversed by the cursor. Once a scrubber window has been created, the temporal flow pane will render the items windowed by the scrubber pane. The scrubber control can be dragged left or right along the bird's-eye-view to move the visualization backward or forward in time.

The visualization consists of the following main components: *Status bar*, *Info-flow*, *Temporal flow*, and *Spatio flow*. Each of the three main components is explained in greater detail.

### Temporal flow pane###
As previously described the temporal flow is the only required visualization pane and is the means by which users interact with rendered data. This pane consists chiefly of a timeline of the entities/events rendered from the input data. : the *reference time marker*, entities/events rendered on the timelin
