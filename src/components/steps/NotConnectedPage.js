import React from 'react';
import Button from '../Button';
import {appSettings} from '../../services/clientService';
import {injectIntl,FormattedMessage} from 'react-intl';

const NotConnectedPage = ({intl,confState}) => {
        return(
            <div className="uiCard">
                <h1><FormattedMessage id={"title.home_0"}/></h1>
                <p><FormattedMessage id={appSettings.getAppValue("hosts").length===1 ? "text.notConnectedEmpty" : "text.notConnectedKnown"} values={{rtn:<br/>}}/></p>
                <div id="focusableElements">
                    <Button id="resetCar" class="checkHost" confState={confState} text={intl.formatMessage({id:"btn.confirm"})} value="next" ind="0"></Button>
                </div>
            </div>
        );
}
export default injectIntl(NotConnectedPage);