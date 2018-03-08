# chronsemble

Installation:

1. Clone repository
2. Install js dependencies
   * cd to top project directory with the index.html and package.json file
   * npm install
3. Install a light weight webserver (e.g. [browsersync](https://browsersync.io))
4. Compile d3-geomap sass file to css
   * Install a Sass compiler (see [Sass](https://sass-lang.com/guide))
   * cd to "node_modules/d3-geomap/src/sass"
   * sass geomap.sass geomap.css
5. Start your webserver from top level directory where index.html resides (uses chrome):
   * /usr/local/bin/browser-sync start --server --browser "Google Chrome" --files "*.html, styles/*.css, scripts/*.js"
