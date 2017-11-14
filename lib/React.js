var React = require('react');
var ReactDOM = require('react-dom');
var Coverflow = require('react-coverflow');

ReactDOM.render(React.createElement(
    Coverflow,
    { width: '960', height: '500',
        displayQuantityOfSide: 2,
        navigation: false,
        enableScroll: true,
        clickable: true,
        active: 0
    },
    React.createElement('img', { src: 'image/path', alt: 'title or description', 'data-action': action }),
    React.createElement('img', { src: 'image/path', alt: 'title or description', 'data-action': 'http://andyyou.github.io/react-coverflow/' }),
    React.createElement('img', { src: 'image/path', alt: 'title or description', 'data-action': 'http://andyyou.github.io/react-coverflow/' })
), document.getElementById('app'));