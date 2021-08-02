import {useState} from 'react';
import {appSettings} from '../../../services/clientService';
import {FormattedMessage} from 'react-intl';
import './keyboardControls.css';

export const KeyboardControls = () => {
const [listening,setListening] = useState("");
const [settings,setSettings] = useState(appSettings.getAppValue("kbLayout"));
const controls = ["up","down","right","left"];

function listenToInput(type){
    setListening(type);
    window.addEventListener("keydown",(e)=>{stopListening(type,e)}, { once: true });
}
function stopListening(type,code){
    settings[type]={code:code.code,key:code.key};
    setSettings(settings);
    appSettings.setAppValue("kbLayout",settings);
    setListening("");
}
    return (
        <>
        <h2><FormattedMessage id={"title.keyboardControls"}/></h2>
        {
            controls.map((i)=><KeyboardLine key={i} k={i} t={settings[i].key||settings[i].code} isListening={listening===i} handleClick={listenToInput}><FormattedMessage id={`controls.${i}`}/></KeyboardLine>)
        }
        </>
    );
};

const KeyboardLine = (props) => {
    return (
        <>
        <div id="controls-container" onClick={()=>props.handleClick(props.k)}>
            <p style={props.isListening?{fontWeight:'bold'}:{undefined}}>{props.children}</p>
            <KeyboardKey k={props.k} t={props.t} isListening={props.isListening}/>
        </div>
        </>
    );
};

const KeyboardKey = (props) => {
    return (
        <>
        {props.isListening?
        <div className="key listening">
           <span>?</span>
        </div>:
        <div className="key">
            <span>{props.t.replace("Arrow","")}</span>
        </div>}
        </>
    );
};