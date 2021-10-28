import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

const Loading = () => {
    return(
        <div className="loadingAnimation">
            <FormattedMessage id={ "message.tryConnect" }/>
        </div>
    );
};

export default injectIntl(Loading);