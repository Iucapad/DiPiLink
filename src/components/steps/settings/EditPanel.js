
import {React, useState} from 'react';
import {api,reloadApp} from '../../../services/clientService';

import { withGlobalState } from 'react-globally';
import {injectIntl,FormattedMessage} from 'react-intl';

const EditPanel = ({type, globalState, setGlobalState}) => {
    switch (type){
        case "user": return <EditUserPanel globalState={globalState} setGlobalState={setGlobalState}/>
        default : return <EditHostnamePanel globalState={globalState} setGlobalState={setGlobalState}/>
    }
}
export default injectIntl(withGlobalState(EditPanel));

const EditUserPanel = ({globalState, setGlobalState}) => {
    const [edit,setEdit] = useState(false);
    
    const editUser = () => {
        setGlobalState({currentUser:{name:"new"}})
        api.request(`/users/${globalState.currentUser.id}`,"PUT","new").then(res=>{
            if (!res.ok){
                    setGlobalState({error:"Cela n'a pas fonctionné"});
                }
            });
        setEdit(false);
    }

    const deleteUser = () => {
        api.request(`/users/${globalState.currentUser.id}`,"DELETE").then(res=>{
        if (res.ok){
                setGlobalState({error:"DiPi Link doit être redémarré"});
                reloadApp();
            }else{
                setGlobalState({error:"Impossible de supprimer le profil"});
            }
        });
    }

    return (
        edit?
        <>
            <input type="text" defaultValue={globalState.currentUser.name}/>
            <div id="focusableElements">
                <button onClick={()=>editUser()}><FormattedMessage id={"btn.confirm"}/></button>
            </div>
        </>
        :
        <>
        <span style={{fontWeight:"500",fontSize:"22px"}}>{globalState.currentUser.name}</span>
        <div id="focusableElements">
            <button onClick={()=>setEdit(true)}><FormattedMessage id={"btn.edit"}/></button>
            <button onClick={()=>deleteUser()}><FormattedMessage id={"btn.delete"}/></button>
        </div>
        </>
    );
}

const EditHostnamePanel = ({globalState, setGlobalState}) => {
    const [edit,setEdit] = useState(false);
    
    const editHost = () => {
        setGlobalState({hostname:"host"})
        api.request("/","PUT","host").then(res=>{
            if (!res.ok){
                    setGlobalState({error:"Cela n'a pas fonctionné"});
                }
            });
        setEdit(false);
    }

    return (
        edit?
        <>
            <input type="text" defaultValue={globalState.hostname}/>
            <div id="focusableElements">
                <button onClick={()=>editHost()}><FormattedMessage id={"btn.confirm"}/></button>
            </div>
        </>
        :
        <>
        <p style={{textAlign: 'center',fontWeight: 300}}>{(globalState.hostname)?globalState.hostname:<FormattedMessage id={"text.unkownHost"}/>}</p>
        <div id="focusableElements">
            <button onClick={()=>setEdit(true)}><FormattedMessage id={"btn.edit"}/></button>
        </div>
        </>
    );
}