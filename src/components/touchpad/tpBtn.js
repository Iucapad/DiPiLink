import React, {Component} from 'react';
import {controls} from '../../services/controlsConnector';

const maxSize=60;
const maxContainer=2*maxSize;
const maxRadius=Math.sqrt(maxContainer*maxSize);

export default class TPBtn extends Component{
    constructor(props){
        super(props);
        this.element = React.createRef()
        this.state={position:{x:0,y:0}};
    }
    reset = () => {
        this.setState({position:{x:0,y:0}});
        controls.reset();
    }
    press = (e) => {
        let rect = this.element.current.getBoundingClientRect();
        let x=e.touches[0].clientX-rect.left-maxSize;
        let y=e.touches[0].clientY-rect.top-maxSize;
        if (x<-maxSize) x=-maxSize;
        if (x>maxSize) x=maxSize;
        if (y<-maxSize) y=-maxSize;
        if (y>maxSize) y=maxSize;
        controls.updateCommand(x*255/maxSize,y*255/maxSize,this.speedCalc(x,y));
        this.setState({position:{x:x,y:y}});
    }
    angleCalc = (x,y) => {
        let t = Math.atan2(x,-y);
        console.log(t);
        if (t<0) return t += 360;
        return t *= 180 / Math.PI;
    }
    speedCalc = (x,y) => {
        let res = Math.sqrt(x*x+y*y);
        return (res*255/maxRadius);
    }
    render(){
        return(
            <div className="tpBtn" ref={this.element} id={this.props.type} onTouchEnd={this.reset} onTouchStart={this.press} onTouchMove={this.press} style={{width:`${maxContainer}px`,height:`${maxContainer}px`}}>
                <div style={{width:`${maxSize}px`,height:`${maxSize}px`,transform:`translate(-${maxSize/2}px,-${maxSize/2}px) translateX(${this.state.position.x}px) translateY(${this.state.position.y}px)`}}/>
            </div>
        );
    }
};