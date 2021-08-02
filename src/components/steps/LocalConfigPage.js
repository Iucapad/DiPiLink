import React, {useState} from 'react';
import Listrow from '../Listrow';
import SwitchNetwork from './switchNetwork/SwitchNetwork';
import {api} from '../../services/clientService';
import {injectIntl,FormattedMessage,useIntl} from 'react-intl';
import { withGlobalState } from 'react-globally';

const sendConfig = (config, hostname, setStep) => {
    api.request("/network","POST",config);
    if (hostname) api.request("/","PUT",hostname);
    return setStep(4);
}

const LocalConnection = ({setSwitchSuggest, checkState}) =>{
    const [connected,setConnected]=useState(false);
    const [network,setNetwork]=useState("");

    const lookUp = () => {
        api.request("/network/ip/client","GET").then(res=>
            res.json()
        ).then(data=>
        {
            setConnected(true);
            setNetwork(data.connectedTo.ssid);
            api.set(data.inet4.local);
            setSwitchSuggest();
        }).catch(
            ()=>setTimeout(()=>lookUp(),5000)
        );
    }
    if (!connected) lookUp();

    return (
        <>
        {connected?
        <div key="1" className="height-anim">
            <p><FormattedMessage id={"text.home_6.5"} values={{rtn:<br/>}}/></p>
            <p style={{textAlign: 'center',fontWeight: 300}}><FormattedMessage id={"message.connectedTo"} values={{net:network}}/></p>
            <div id="focusableElements">
                <button className="slideViewBtn" onClick={()=>checkState()}><FormattedMessage id={"btn.continue"}/></button>
            </div>
        </div>
        :
        <div key="2" className="height-anim">
            <p><FormattedMessage id={"text.home_6"} values={{rtn:<br/>}}/></p>
            <p style={{textAlign: 'center',fontWeight: 300}}><FormattedMessage id={"message.pleaseWait"}/></p>
        </div>
        }
        </>
    );
}

const NetworkList = ({setSsid,wpa,setWpa,focus,setFocus})=>{
    const [networks,setNetworks] = useState(undefined);

    const scanNet = () => {
        api.request("/network/scan","GET").then(res=>
            res.json()
        ).then(data=>{
            setNetworks(data);
        }).catch(()=>setTimeout(()=>scanNet(),5000));
    }

    if (networks === undefined) {
        scanNet();
        return <p style={{textAlign: 'center',fontWeight: 300}}><FormattedMessage id={"text.networkLookup"}/></p>;
    }
        if (networks.length){
        return(
            <>
                <h2><FormattedMessage id={"title.networksAvailable"}/></h2>
                    <div className="scrollList">
                    <table className="settingsList">
                   <tbody>
                   {networks.map((item, i)=>(<Listrow key={i} focus={focus===i+1} title={item.ssid} onClick={()=>{setFocus(i+1);setSsid(item.ssid);}}/>))}
                    </tbody>
                    </table>
                    </div>
                    <label style={focus?undefined:{opacity:0.5}}><span><FormattedMessage id={"text.password"}/></span><input type="password" onChange={e=>setWpa(e.target.value)} autoComplete="current-password" name="wpa" defaultValue={wpa} disabled={!focus}/></label>
                    <br/><br/>
            </>
        );
    }
    return <p style={{textAlign: 'center',fontWeight: 300}}><FormattedMessage id={"text.networkEmpty"}/></p>;
}

const LocalConfigPage = ({checkState}) => {
    const [step,setStep] = useState(0);
    const [auto,setAuto] = useState(true);
    const [ssid, setSsid] = useState("");
    const [wpa, setWpa] = useState("");
    const [hostname, setHostname] = useState(undefined);
    const [focus,setFocus] = useState("");
    const [host,setHost]=useState(undefined);
    const [switchSuggest,setSwitchSuggest] = useState(false);
    
    const intl = useIntl();

    if (host===undefined){
        api.request("","GET").then(res =>
            res.json()
        ).then((data)=>{if (data.hostname && data.hostname!=="raspberrypi") setHost(data.hostname);});
    }
    switch(step){
        case 0:
            return (<div key="1" className="uiCard height-anim">
                <h1><FormattedMessage id={"title.home_2"}/></h1>
                <p><FormattedMessage id={"text.home_2"}/></p>
                <div id="focusableElements">
                    <button className="slideViewBtn" onClick={()=>setStep(1)}><FormattedMessage id={"btn.configure"}/></button>
                </div>
            </div>);
        case 1:
            return(<div key="2" className="uiCard height-anim">
                <h1><FormattedMessage id={"title.home_2"}/></h1>
                <p><FormattedMessage id={"text.home_3"}/></p>
                {auto?
                <div key="1" className="height-anim">
                <NetworkList setSsid={setSsid} wpa={wpa} setWpa={setWpa} focus={focus} setFocus={setFocus}></NetworkList>
                <button onClick={()=>setAuto(false)}><FormattedMessage id={"btn.networksManually"}/></button>
                </div>
                :
                <div key="2" className="height-anim">
                <form className="form">
                    <label><span><FormattedMessage id={"text.netName"}/></span><input type="text" onChange={e=>setSsid(e.target.value)} defaultValue={ssid} autoComplete="off" name="ssid"/></label>
                    <label><span><FormattedMessage id={"text.password"}/></span><input type="password" onChange={e=>setWpa(e.target.value)} defaultValue={wpa} autoComplete="current-password" name="wpa"/></label>
                </form>
                <button onClick={()=>setAuto(true)}><FormattedMessage id={"btn.networksAvailable"}/></button>
                </div>
                }
                <div id="focusableElements">
                    <button className="slideViewBtn" onClick={()=>setStep(0)}><FormattedMessage id={"btn.back"}/></button>
                    <button className="slideViewBtn" onClick={()=>setStep(2)}><FormattedMessage id={"btn.next"}/></button>
                </div>
            </div>);
        case 2:
            return(<div key="3" className="uiCard height-anim">
                <h1><FormattedMessage id={"title.home_2"}/></h1>
                {(host===undefined)?
                <>
                    <p><FormattedMessage id={"text.home_4"}/></p>
                    <span className="form">
                        <label><span><FormattedMessage id={"text.deviceName"}/></span><input type="text" onChange={e=>setHostname(e.target.value)} defaultValue={hostname} autoComplete="off" name="name" id="set_carName"/></label>                
                    </span>
                </>
                :
                <>
                    <p><FormattedMessage id={"text.knownHost"} values={{host:host}}/></p>
                </>
                }
                <div id="focusableElements">
                    <button className="slideViewBtn" onClick={()=>setStep(1)}><FormattedMessage id={"btn.back"}/></button>
                    <button className="slideViewBtn" onClick={()=>setStep(3)}><FormattedMessage id={"btn.next"}/></button>
                </div>
            </div>);
        case 3:
            return(<div key="4" className="uiCard height-anim">
                <h1><FormattedMessage id={"title.home_2"}/></h1>
                <p><FormattedMessage id={"text.home_5"}/></p>
                <form className="form">
                <table className="settingsList">
                    <tbody>
                        <Listrow action="resume" id="carName" title={intl.formatMessage({id:"hover.name"})} name="name" value={host?host:hostname}></Listrow>
                        <Listrow action="resume" title={intl.formatMessage({id:"hover.ssid"})} name="ssid" value={ssid}></Listrow>
                        <Listrow action="resume" title={intl.formatMessage({id:"hover.wpa"})} name="wpa" type="password" value={wpa}></Listrow>
                    </tbody>
                </table>
                </form>
                <div id="focusableElements">
                    <button className="slideViewBtn" onClick={()=>setStep(2)}><FormattedMessage id={"btn.back"}/></button>
                    <button className="slideViewBtn" onClick={()=>sendConfig({ssid:ssid,passphrase:wpa},hostname && {hostname:hostname},setStep)} disabled={!(ssid&&wpa)}><FormattedMessage id={"btn.submit"}/></button>
                </div>
            </div>);
        default:
            return(
            <>
                <div key="5" className="uiCard height-anim">
                    <h1><FormattedMessage id={"title.home_2"}/></h1>
                    <LocalConnection checkState={checkState} setSwitchSuggest={() => setSwitchSuggest(true)}/>
                </div>
                {switchSuggest ? <SwitchNetwork/> : null}
            </>);
    } 
}
export default injectIntl(withGlobalState(LocalConfigPage));