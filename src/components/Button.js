import React from "react";
import { api,settingsClear } from '../services/clientService';
import { withGlobalState } from 'react-globally';
import { injectIntl } from 'react-intl';

import baseIcon from "../assets/baseIcon.png";
import dipihub from "../assets/dipihub.png";
import dipilink from "../assets/dipilink.png";
import direct from "../assets/direct.png";
import huboobe from "../assets/huboobe.png";
import network from "../assets/network.png";
const imgMap = {
    baseIcon,
    dipihub,
    dipilink,
    direct ,
    huboobe,
    network
}

const Button = ({ className, confState, disabled, id, ind, intl, img, onClick, setGlobalState, text, value }) => {
    const getImg = () => img && <img draggable="false" width="50" height="50" src={ imgMap[img] } alt="<img>"/>;
    
const clickEvent = () => {
    if (!className) {
        return onClick();
    }
    if (className.includes("slideViewBtn")) {
        confState(value);
    }
    if (className.includes("stepAction")) {
        confState("next");
    }
    else if (className.includes("resetSettings")) {
        settingsClear();
    }
    if (className.includes("checkHost")) {
        api.request(`/`,"GET").then(res => {
            res.status === 200 && confState(value);
        }).catch(() => {
            setGlobalState({error:intl.formatMessage({id:"error.nolink"})})
        });
    }
    if (className.includes("checkConfig")){
        confState(value);
    }
}

    return(
        <button id={ id } className={ className } value={ value } disabled={ disabled } data-ind={ ind } onClick={ clickEvent }>
            { getImg }{ text }
        </button>
    );

}

export default injectIntl(withGlobalState(Button));