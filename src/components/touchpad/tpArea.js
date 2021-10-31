import React from 'react';
import TPBtn from './tpBtn';
import './touchpad.css';

const TPArea = ({ id }) => 
    <div className="tpArea" id={ id }>
        <TPBtn/>
    </div>

export default TPArea;