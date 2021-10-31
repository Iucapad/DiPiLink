import React, {Component} from 'react';
import { api,settingsClear } from '../services/clientService';

import { withGlobalState } from 'react-globally';
import { injectIntl } from 'react-intl';

const Button = ({ className, confState, disabled, id, ind, intl, img, onClick, setGlobalState, text, value }) => {
    const getImg = () => img && <img draggable="false" width="50" height="50" src={require(`../assets/${ img }`).default} alt="<img>"/>;
    
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