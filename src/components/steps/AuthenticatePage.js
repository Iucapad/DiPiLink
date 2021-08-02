import React, {useState} from 'react';
import {injectIntl,FormattedMessage} from 'react-intl';
import { withGlobalState } from 'react-globally';

const AuthenticatePage = ({setGlobalState}) => {
    const [ssid, setSsid] = useState("");
    const [wpa, setWpa] = useState("");

    return (
        <>
        <div key="2" className="height-anim">
            <h2>Authentication</h2>
            <p>This devide require authentication. Please enter your credentials.</p>
        <form className="form">
            <label><span><FormattedMessage id={"text.netName"}/></span><input type="text" onChange={e=>setSsid(e.target.value)} defaultValue={ssid} autoComplete="off" name="ssid"/></label>
            <label><span><FormattedMessage id={"text.password"}/></span><input type="password" onChange={e=>setWpa(e.target.value)} defaultValue={wpa} autoComplete="current-password" name="wpa"/></label>
        </form>
        </div>
        <div id="focusableElements">
            <button className="slideViewBtn"><FormattedMessage id={"btn.back"}/></button>
            <button className="slideViewBtn"><FormattedMessage id={"btn.next"}/></button>
        </div>
    </>);
         
}
export default injectIntl(withGlobalState(AuthenticatePage));