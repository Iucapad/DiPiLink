import React from 'react';

const Action = ({ action }) => {
    return (
        <div>
            {action.command} {action.option} {action.length}
        </div>
    );
}

export default Action;