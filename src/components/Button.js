import React, {Component} from 'react';
import {api,settingsClear} from '../services/clientService';

import { withGlobalState } from 'react-globally';
import {injectIntl} from 'react-intl';

class Button extends Component {
    render(){
        return(
            <button id={this.props.id} className={this.props.class} value={this.props.value} disabled={this.props.disabled} data-ind={this.props.ind} onClick={() => this.clickEvent(this.props)}>
                {this.getImg()}{this.props.text}
            </button>
        );
    }
    getImg(){
        return this.props.img ? <img draggable="false" width="50" height="50" src={require(`../assets/${this.props.img}`).default} alt="<img>"/> : null;
    }
    clickEvent(props){
        const {intl}=props;
        if (!this.props.class) {
            this.props.onClick();
            return;
        }
        if (this.props.class.includes("slideViewBtn")){
            this.props.confState(props.value);
        }
        if (this.props.class.includes("stepAction")){
            this.props.confState("next");
        }
        else if (this.props.class.includes("resetSettings")){
            settingsClear();
        }
        if (this.props.class.includes("checkHost")){
            api.request(`/`,"GET").then((res) =>{
                if (res.status===200){
                    this.props.confState(props.value);
                }
            }).catch(()=>{
                this.props.setGlobalState({error:intl.formatMessage({id:"error.nolink"})})
            });
        }
        if (this.props.class.includes("checkConfig")){
            this.props.confState(props.value);
        }
    }
}

export default injectIntl(withGlobalState(Button));