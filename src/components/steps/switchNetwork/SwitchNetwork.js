import React from 'react';
import './switchNetwork.css';
import switchIcon from "./switch.svg";

const SwitchNetwork = () => {
        return(
            <img id="switch" draggable="false" src={switchIcon} alt=""/>
        );
}
export default SwitchNetwork;