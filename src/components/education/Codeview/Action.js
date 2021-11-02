import React from 'react';

const icons = {
    "pivot": require("./assets/cv_pivot.svg").default,
    "go": require("./assets/cv_go.svg").default,
    "wait": require("./assets/cv_wait.svg").default,
}

const filters = {
    "left": {transform: "scaleX(-1)"}
}

const Action = ({ action }) => {
    return (
        <div className="codeview-action">
            <img draggable="false" width="45" height="45" src={ icons[action.command] } style={ filters[action.option] || null } alt=""/>
            
        </div>
    );
}

export default Action;