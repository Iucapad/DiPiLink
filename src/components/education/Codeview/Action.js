import React from 'react';

const Action = ({ action }) => {
    return (
        <div>
            {action.name} {action.option} {action.length}
        </div>
    );
}

export default Action;