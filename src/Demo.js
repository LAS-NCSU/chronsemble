import React from 'react';
import CoverFlow from 'coverflow-react';
import './demo.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {atomOneLight} from 'react-syntax-highlighter/dist/styles';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.passPropCheckbox = this.passPropCheckbox.bind(this);
        this.inputRow = this.inputRow.bind(this);
        this.itemRatio = this.itemRatio.bind(this);
        this.code = this.code.bind(this);
        this.state = {
            width: document.body.offsetWidth,
            passWidth: true,
            height: 250,
            passHeight: true,
            itemRatio: {
                x: 8,
                y: 5
            },
            passItemRatio: true,
            background: '#333333',
            passBackground: true,
            passLabels: true,
            direction: 'horizontal'
        };
        window.addEventListener('resize', () => {
            this.setState((prevState) => {
                if (prevState.direction === 'vertical') {
                    return {
                        height: document.body.offsetHeight
                    };
                }
                return {
                    width: document.body.offsetWidth
                }
            });
        });
    }

    render() {
        const imagesArr = [
            'https://static.pexels.com/photos/33109/fall-autumn-red-season.jpg',
            'http://www.wallpaperbackgrounds.org/wp-content/uploads/Images.jpg',
            'https://cdn.pixabay.com/photo/2016/10/27/22/53/heart-1776746_960_720.jpg',
            'https://static.pexels.com/photos/355465/pexels-photo-355465.jpeg',
            'https://static.pexels.com/photos/105244/pexels-photo-105244.jpeg',
            'https://static.pexels.com/photos/410395/pexels-photo-410395.jpeg',
        ];
        let labelsArr = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
        ];
        this.labelsArr = labelsArr;
        let props = {};
        props.imagesArr = imagesArr;
        if (this.state.passLabels) {
            props.labelsArr = labelsArr;
        }
        if (this.state.passWidth) {
            props.width = this.state.width;
        }
        if (this.state.passHeight) {
            props.height = this.state.height;
        }
        if (this.state.passItemRatio) {
            props.itemRatio = `${this.state.itemRatio.x}:${this.state.itemRatio.y}`;
        }
        if (this.state.passBackground) {
            props.background = this.state.background;
        }
        props.direction = this.state.direction;
        let demoStyle = {};
        if (this.state.direction === 'vertical') {
            demoStyle['flexDirection'] = 'row';
        } else {
            demoStyle['flexDirection'] = 'column';
        }
        return (
            <div className="demo" style={demoStyle}>
                <CoverFlow {...props} />
            </div>
        );
    }

    passPropCheckbox(propName) {
        return (<input type="checkbox"
                       checked={this.state[propName]}
                       onChange={(e) => {
                           this.setState((prevState, props) => {
                               let newState = {};
                               newState[propName] = !prevState[propName];
                               return newState;
                           });
                       }}/>);
    }

    inputRow(name, type) {
        let passName = 'pass' + name.charAt(0).toUpperCase() + name.slice(1);
        return (<div>
            {this.passPropCheckbox(passName)}
            <label>Container {name}:</label>
            <input placeholder={name}
                   type={type}
                   min="1"
                   value={this.state[name]}
                   onChange={(e) => {
                       let newState = {};
                       newState[name] = type === 'number' ? parseInt(e.target.value) : e.target.value;
                       this.setState(newState);
                   }}
                   disabled={!this.state[passName]}/>
        </div>);
    }

    itemRatio() {
        const axisInput = (axis) => {
            return (<input placeholder={axis}
                           type="number"
                           min="1"
                           style={{width: '60px'}}
                           value={this.state.itemRatio[axis]}
                           onChange={(e) => {
                               let newState = {
                                   itemRatio: {}
                               };
                               newState.itemRatio[axis] = parseInt(e.target.value);
                               let otherAxis = axis === 'x' ? 'y' : 'x';
                               newState.itemRatio[otherAxis] = this.state.itemRatio[otherAxis];
                               this.setState(newState);
                           }}
                           disabled={!this.state.passItemRatio}/>);
        };
        return (<div>
            {this.passPropCheckbox('passItemRatio')}
            <label>Item Ratio:</label>
            {axisInput('x')}
            {axisInput('y')}
        </div>);
    }

    code() {
        return (<SyntaxHighlighter language='html' style={atomOneLight}>
            {`<CoverFlow imagesArr={imagesArr}
  direction="${this.state.direction}"
  ${this.state.passWidth ? `width="${this.state.width}"` : ''}
  ${this.state.passHeight ? `height="${this.state.height}"` : ''}
  ${this.state.passItemRatio ? `itemRatio="${this.state.itemRatio.x}:${this.state.itemRatio.y}"` : ''}
  ${this.state.passBackground ? `background="${this.state.background}"` : ''}
  ${this.state.passLabels ? `labelsArr={labelsArr}` : ''} />`}
        </SyntaxHighlighter>);
    }
}
export default Demo;