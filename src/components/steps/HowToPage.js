import React from 'react';
import Button from '../Button';
import {displayLanguage} from '../../services/clientService';

import {injectIntl,FormattedMessage} from 'react-intl';

const HowToPage = ({intl}) => {
    return(
        <div className="uiCard" style={{border:"3px solid #f07332",textAlign:"center"}}>
            {
                (localStorage.getItem("dpl_appSettings")===null?
                    <>
                    <p><FormattedMessage id={"text.oobe"}/></p>
                    <div id="focusableElements">
                    <img className="about-img" src={require(`../../assets/huboobe.png`).default} alt="<img>"/>
                    <Button onClick={()=>window.open(`https://dipihub.netlify.com/${displayLanguage.get()}`)} text={intl.formatMessage({id:"btn.oobe"})} img="baseIcon.png"></Button>
                    </div>
                    </>
                    :
                    <>
                    <p><FormattedMessage id={"text.firstboot"}/></p>
                    <div id="focusableElements">
                        <Button onClick={()=>window.open(`https://dipihub.netlify.com/${displayLanguage.get()}`)} text={intl.formatMessage({id:"btn.firstboot"})} img="baseIcon.png"></Button>
                        <img className="about-img" src={require(`../../assets/dipihub.png`).default} alt="<img>"/>
                    </div>
                    </>
                    )
            }
            
        </div>
    );
}
export default injectIntl(HowToPage);