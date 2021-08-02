import React, {Component} from 'react';
import {injectIntl,FormattedMessage} from 'react-intl';

class Loading extends Component {
    render(){
        return(
            <div className="loadingAnimation">
                <FormattedMessage id={"message.tryConnect"}/>
            </div>
        );
    }
}
export default injectIntl(Loading);