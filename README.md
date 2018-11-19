# chronsemble

## Project
### Team Members
* Lead: @johnnyNcsu /jgharkin@ncsu.edu

### Summary
The goal of this project is to design a tool to help investigators discover evidence associated with human trafficking through spatio-temporal analysis.

Our hypothesis is that the trafficking trade applies mechanisms of social, financial, and transportation networks in order to succeed and that the patterns associated with this endeavor may be distinct and observable when looked for.

CHRONSEMBLE is a visulization tool that is designed to allow analysts to interactively examine data in three modes: (1) temporally using timelines, (2) spatially using maps, and (3) contextually by changing the temporal focus by which data is viewed. A mock-up of the temporal visualization is shown in figure 1. In this mock-up, data on the timeline can be viewed with greater detail in info-flow panes.

![Figure 1. Mock-up of the info-flow and timeline visualization mode.](data/img/mockupInfoFlow.png )

** Figure 1. Mock-up of the info-flow and timeline visualization mode.**

## Installation

1. Clone repository
2. Install js dependencies
   * cd to top project directory with the index.html and package.json file
   * npm install
3. Install a light weight webserver (e.g. [browsersync](https://browsersync.io))
4. Start your webserver from top level directory where index.html resides (uses chrome):
   * /usr/local/bin/browser-sync start --server --browser "Google Chrome" --files "\*.html, css/\*.css, src/\*.js"
