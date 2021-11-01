import React from 'react';

const icons = {
    "pivot": require("./assets/cv_pivot.svg").default,
    "go": require("./assets/cv_go.svg").default,
}

const Action = ({ action }) => {
    return (
        <div>
            <img draggable="false" width="50" height="50" src={ icons[action.command] } alt=""/>
            {action.option} {action.length}
        </div>
    );
}

export default Action;