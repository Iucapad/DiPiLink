import React from 'react';
import './switchNetwork.css';

const SwitchNetwork = () => {
        return(
            <img id="switch" draggable="false" src={require("./switch.svg").default} alt=""/>
        );
}
export default SwitchNetwork;