import React from "react";
import './Web.css';
import codeviewIcon from "./codeview.svg";

const Web = () =>
    <div className="webLogo align-center">
        <img draggable="false" width="90" height="90" alt="Codeview" src={ codeviewIcon }/>
        <span>Hello world</span>
    </div>
export default Web;