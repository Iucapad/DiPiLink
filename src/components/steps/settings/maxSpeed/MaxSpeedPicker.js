import React, {Component} from 'react';
import {carSettings} from '../../../../services/clientService';
import './maxSpeed.css';

import s100 from "./100.svg";
import s150 from "./150.svg";
import s200 from "./200.svg";
const img = { s100, s150, s200 };

export class MaxSpeedPicker extends Component {
    handleClick(i){
        carSettings.setMaxSpeed(i);
        this.forceUpdate();
    }
    render(){
        const current = carSettings.getMaxSpeed();
        return(
            <span>
                {this.props.values.map((item, i) => (
                    <button key={i} className={`maxSpeedItem ${([0.6,0.8,1].indexOf(parseFloat(current))===i)&&"selected"}`} title={item.name} onClick={() => this.handleClick([0.6,0.8,1][i])}>
                        <img draggable="false" src={ img["s" + item]} alt="<img>"/>
                    </button>
                ))}
            </span>
        );
    }
}