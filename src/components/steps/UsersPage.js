import React, {Component} from 'react';
import {api,appSettings} from '../../services/clientService';

import { withGlobalState } from 'react-globally';
import {injectIntl,FormattedMessage} from 'react-intl';

class UsersPage extends Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            selection:null,
            create:false,
            usertag:""
        };
    }
    addUser(){
        const {intl} = this.props;
        let u = {name: this.state.usertag};
        api.request(`/users`,"POST",u).then((res)=>{
        if (res.ok){
                this.props.setGlobalState({exp:true});
                return res.json();
            }else{
                this.props.setGlobalState({error:intl.formatMessage({id:"error.adduser"})});
                return;
            }
        }).then((data)=>
        this.loadView(data)
        );
    }
    componentDidUpdate(pProps,pState){
        if (pState.create!==this.state.create){
            if (this.state.create)
                this.setState({selection:null});
            else
                this.setState({usertag:""});
        }
    }
    componentDidMount(){
        api.request(`/users`,"GET").then((res)=>{
            return res.json();
        }).then((data)=>
        (data.length===0)? this.setState({create:true}):this.setState({users:data})
        );
    }
    btnClick(){
        this.loadView(this.state.selection);
    }
    loadView(u){
        appSettings.setUser(u);
        this.props.setGlobalState({currentUser:u});
        this.props.appState({currentMode:"bridge"});
        this.props.appState({currentTab:"carTab"});
        this.props.confState("load");
    }
    render(){        
        const {intl}=this.props;
        return(
                (this.state.create)?
                <div key="1" className="uiCard height-anim">
                    <h2><FormattedMessage id={"title.newProfile"}/></h2>
                    <div className="usertag"><span>{this.state.usertag?this.state.usertag.slice(0,1):"_"}</span></div>
                    <span className="form">
                        <label><span><FormattedMessage id={"text.userName"}/></span><input className="inputSrc" onChange={event=>this.setState({usertag:event.target.value.charAt(0).toUpperCase()+event.target.value.slice(1)})} type="text" autoComplete="off" name="name" id="set_userName"/></label> 
                    </span>
                    <div id="focusableElements">
                        <button style={this.state.users.length===0 ? {display:'none'}:null} onClick={()=>this.setState({create:false})}>{intl.formatMessage({id:"btn.cancel"})}</button>
                        <button disabled={!this.state.usertag} onClick={()=>this.addUser()}><FormattedMessage id={"btn.addUser"}/></button>
                    </div>
                </div>
                :
                <div key="2" className="uiCard height-anim">
                    <h1><FormattedMessage id={"title.home_3"}/></h1>
                    <p><FormattedMessage id={"text.addUser"}/></p>
                    <div className="gridList" style={this.state.create ? {display:'none'}:null}>
                        {this.state.users.map((item, i) => (
                            <div key={i} className={this.state.selection===item?'selected':null} title={item.name} onClick={()=>this.setState({selection:item})}><p>{item.name}</p></div>
                        ))}
                        <div title={intl.formatMessage({id:"btn.createUser"})} onClick={()=>this.setState({create:true})}><p style={{fontSize:'22px',opacity:'0.8'}}><span style={{fontSize:'18px'}}><FormattedMessage id={"btn.createUser"}/></span> +</p></div>
                    </div>
                    <button onClick={()=>this.btnClick()} disabled={this.state.selection===null && !this.state.create}>{intl.formatMessage({id:"btn.connexion"})}</button> 
                </div>
           
        );
    }
}
export default injectIntl(withGlobalState(UsersPage));