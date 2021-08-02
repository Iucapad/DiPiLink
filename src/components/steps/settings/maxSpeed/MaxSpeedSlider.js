import React, {Component} from 'react';
import {carSettings} from '../../../../services/clientService';
import {controls} from '../../../../services/controlsConnector';
import './maxSpeed.css';

import {injectIntl,FormattedMessage} from 'react-intl';

class MaxSpeedSlider extends Component {
    handleClick(i){
        carSettings.setMaxSpeed(i);
        this.forceUpdate();
    }
    setValue = (e) => {
        carSettings.setMaxSpeed(e.target.value);
        controls.updateSettings();
    }
    render(){
        const current = carSettings.getMaxSpeed();
        return(
            <div id="speed-container">
                <div><FormattedMessage id={"title.maxSpeed"}/></div>
                <input type="range" defaultValue={current} min="0.6" max="1" step="0.2" className="maxSpeedSlider" onChange={this.setValue}/>
                <datalist className="range__list" id="number">
                    <option className="range__opt opt0">100</option>
                    <option className="range__opt">150</option> 
                    <option className="range__opt">200</option> 
                </datalist>
            </div>
        );
    }
}
export default injectIntl(MaxSpeedSlider);