import React, {Component} from 'react';
import AnimatedDot from './AnimatedDot';
import {appSettings} from '../../services/clientService';
import './background.css';

const devCapable = appSettings.getAppValue("devCapable");

export default class AnimatedBackground extends Component {
    shouldComponentUpdate(p){
        return (p.tab==="carTab"||this.props.tab==="carTab");
    }
    render(){ 
        const dots=[];
        const c=devCapable?1:0.5;
        if (this.props.tab==="carTab"){
            for (let i=0;i<30*c;i++) {
                const random = (i/c)+5;
                const random2 = Math.floor(Math.random()*20);
                let length = Math.abs((Math.random()*52)-random);
                if (length<=7) length+=8;
                const dot=["var(--gradient-80)","var(--gradient-30)","var(--gradient-10)"][Math.floor(Math.random()*3)];
                dots.push(<AnimatedDot key={i} style={{background:dot,transition: devCapable && `left ${parseInt(length/20)+1}s, bottom ${parseInt(length/20)+1}s`,animation:`animate ${length}s linear infinite`,'--translate-x':50-random+'px','--translate-y':2*((Math.random()*11)-5)+'px',left:'50vw',opacity:random2%100,bottom:'30vh',filter:"blur("+parseInt(length/10)+'px)'}}/>);
            }
        }else{
            for (let i=0;i<30*c;i++) {
                const random=((i/c)*3)+5;
                const random2=Math.floor(Math.random()*20);
                let length = Math.abs((Math.random()*52)-random)+8;
                if (length<=7) length+=8;
                const dot=["var(--gradient-80)","var(--gradient-30)","var(--gradient-10)"][Math.floor(Math.random()*3)];
                dots.push(<AnimatedDot key={i} style={{background:dot,transition:devCapable && `left ${parseInt(length/20)+1}s, bottom ${parseInt(length/20)+1}s`,animation:`animate ${length}s linear infinite`,'--translate-x':50-random+'px','--translate-y':2*((Math.random()*11)-5)+'px',left:random+'vw',opacity:random2%100,bottom:1.5*i+(random2+Math.sin(random/10)*3)+'vmin',filter:"blur("+parseInt(length/10)+'px)'}}/>);
            }
        }
        return (
            <div className="animatedBackground">
                {dots}
            </div>
        );
    }
}