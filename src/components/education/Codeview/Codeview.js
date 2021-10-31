import React from 'react';

const UiCodeview = ({ visible }) => {
    return(
        <div id="aboutView" style={ visible }>
            <div className="uiCard">
                <h1>Code View</h1>
                <p>Here you'll start coding your own moves.</p>
            </div>
        </div>
    );
};