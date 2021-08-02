import React, {Component} from 'react';
import {carSettings} from '../../../../services/clientService';
import './maxSpeed.css';

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
                        <img draggable="false" src={require(`./${item}.svg`).default} alt="<img>"/>
                    </button>
                ))}
            </span>
        );
    }
}