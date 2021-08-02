import React, {Component,useState} from 'react';
import Listrow from '../Listrow';
import {MaxSpeedPicker} from './settings/maxSpeed/MaxSpeedPicker';
import ColorPicker from '../ColorPicker';
import EditPanel from './settings/EditPanel';
import {api,settingsClear,reloadApp,appSettings} from '../../services/clientService';
import {KeyboardControls} from './settings/KeyboardControls';

import { withGlobalState } from 'react-globally';
import {injectIntl,FormattedMessage} from 'react-intl';

const NetworkList = ({setGlobalState})=>{
    const [focus,setFocus] = useState("");
    const [networks,setNetworks] = useState([]);

    const removeNetwork = (item) => {
        api.request(`/network/${item.id}`,"DELETE").then((res)=>{
            if(res.ok){
                setNetworks(networks.filter(e=>e!==item));
            }else{
                setGlobalState({error:"Impossible de supprimer le réseau"});
            } 
        });
    }

    if (networks.length){
        return(
            <div className="scrollList">
                <table className="settingsList">
                <tbody>
                {networks.map((item, i)=>(<Listrow key={i} action="edit" focus={focus===i+1} title={item.ssid} onClick={()=>{setFocus(i+1);}} removeNetwork={(e)=>{removeNetwork(item);}}></Listrow>))}
                </tbody>
                </table>
            </div>
        );
    }
    api.request("/network","GET").then((res)=>{
        return res.json();
    }).then((data)=>
    setNetworks(data)
    );
    return <p style={{textAlign: 'center',fontWeight: 300}}><FormattedMessage id={"text.networkEmptyKnown"}/></p>;
}

class SettingsPage extends Component {
    componentDidMount(){
        api.request("","GET").then((res)=>{
            return res.json();
        }).then((data)=>
        this.props.setGlobalState({hostname:data.hostname})
        );
    }
    
    getProfile(){
        return(
            <>
            <h1><FormattedMessage id={"title.personalize"}/></h1>
            <h2><FormattedMessage id={"title.profile"}/></h2>
                <div className="usertag"><span>{this.props.globalState.currentUser.name.slice(0,1)}</span></div>
                <EditPanel type="user"/>
            </>);
    }
    render(){
        return(
            <div className="uiCard">
                {this.getProfile()}
                <Display setGlobalState={this.props.setGlobalState}/>
                {this.props.state.inputType==="default" && <KeyboardControls/>}
                <h2><FormattedMessage id={"title.colors"}/></h2>
                <ColorPicker state={this.props.state}/>
                <h1><FormattedMessage id={"title.system"}/></h1>
                <h2><FormattedMessage id={"title.maxSpeed"}/></h2>
                <MaxSpeedPicker values={[100,150,200]}/>
                <h2><FormattedMessage id={"title.name"}/></h2>
                <EditPanel type="hostname"/>
                <h2><FormattedMessage id={"title.networks"}/></h2>
                <NetworkList setGlobalState={this.props.setGlobalState}/>
                <h2><FormattedMessage id={"title.reset"}/></h2>
                <button><FormattedMessage id={"btn.clear"}/></button>
                <button onClick={settingsClear}><FormattedMessage id={"btn.resetSet"}/></button>
            </div>
        );
    }
}
export default injectIntl(withGlobalState(SettingsPage));

const Display = ({setGlobalState}) => {
    const setMinimalUi = (e) => {
        appSettings.setValue("minimalUi",e.target.checked);
    }
    const setReduceAnimations = (e) => {
        appSettings.setAppValue("devCapable",!e.target.checked);
        setGlobalState({error:"DiPi Link doit être redémarré"});
        setTimeout(()=>reloadApp(),2000);
    }
    return(
        <>
        <h2><FormattedMessage id={"title.display"}/></h2>
            <div style={{display:"grid",justifyContent:"center",textAlign:"left"}}>
                <label><input type="checkbox" defaultChecked={appSettings.getValue("minimalUi")} onChange={setMinimalUi}></input><FormattedMessage id={"text.minimalUI"}/></label>
                <label><input type="checkbox" defaultChecked={!appSettings.getAppValue("devCapable")} onChange={setReduceAnimations}></input>Réduire les effets visuels</label>
            </div>
        </>
    );
}