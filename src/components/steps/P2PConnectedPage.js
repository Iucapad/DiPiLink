import React from 'react';
import Button from '../Button';
import {displayLanguage} from '../../services/clientService';

import {injectIntl,FormattedMessage} from 'react-intl';

const P2PConnectedPage =({intl,confState}) => {
        const isLocalModeAvailable=true;
        return(
            <div className="uiCard">
                <h1><FormattedMessage id={"title.home_1"}/></h1>
                <p><FormattedMessage id={"text.home_1"} values={{rtn:<br/>}}/></p>
                <div id="focusableElements">
                    <Button class="checkHost" confState={confState} text={intl.formatMessage({id:"btn.p2p"})} value="p2pMode" img="direct" ind="1"/>
                    {isLocalModeAvailable && <Button class="checkConfig" confState={confState} text={intl.formatMessage({id:"btn.local"})} value="next" img="network" ind="1"/>}
                </div>
                {!isLocalModeAvailable && 
                <>
                <p><FormattedMessage id={"text.localModeNotAvailable"}/></p>
                <Button onClick={()=>window.open(`https://saison.one/dipihub/${displayLanguage.get()}/#/docs`)} text={intl.formatMessage({id:"btn.oobe"})}></Button>
                </>
                }
            </div>
        );
}
export default injectIntl(P2PConnectedPage);