import React from 'react';
import Button from '../Button';
import { displayLanguage } from '../../services/clientService';
import { injectIntl, FormattedMessage } from 'react-intl';

import hubOobe from "../../assets/huboobe.png";
import hubImg from "../../assets/dipihub.png";

const HowToPage = ({intl}) => {
    return(
        <div className="uiCard" style={{border:"3px solid #f07332",textAlign:"center"}}>
            {
                (localStorage.getItem("dpl_appSettings") === null ?
                    <>
                    <p><FormattedMessage id={"text.oobe"}/></p>
                    <div id="focusableElements">
                    <img className="about-img" src={ hubOobe } alt="<img>"/>
                    <Button onClick={() => window.open(`https://saison.one/dipihub/${displayLanguage.get()}`)} text={intl.formatMessage({id:"btn.oobe"})} img="baseIcon"></Button>
                    </div>
                    </>
                    :
                    <>
                    <p><FormattedMessage id={"text.firstboot"}/></p>
                    <div id="focusableElements">
                        <Button onClick={()=>window.open(`https://saison.one/dipihub/${displayLanguage.get()}`)} text={intl.formatMessage({id:"btn.firstboot"})} img="baseIcon"></Button>
                        <img className="about-img" src={ hubImg } alt="<img>"/>
                    </div>
                    </>
                    )
            }
            
        </div>
    );
}
export default injectIntl(HowToPage);