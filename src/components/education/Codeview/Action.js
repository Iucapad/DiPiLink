import React from 'react';
import pivot from "./assets/cv_pivot.svg";
import go from "./assets/cv_go.svg";
import wait from "./assets/cv_wait.svg";

const icons = {
    pivot: pivot,
    go: go,
    wait: wait,
}

const filters = {
    "left": {transform: "scaleX(-1)"},
    "backward": {transform: "scaleY(-1)"}
}

const isDegree = e => /^[0-9]\d*((\.\d)?)+deg$/.test(e) && {transform: `rotate(${e})`}

const Action = ({ action }) => {
    return (
        <div className="codeview-action align-center">
            <img draggable="false" width="45" height="45" src={ icons[action.command] } style={ filters[action.option] || isDegree(action.option) || null } alt=""/>
            { action.length && <div className="badge align-center">{ action.length }</div> }
        </div>
    );
}

export default Action;