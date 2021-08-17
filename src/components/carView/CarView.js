import React, {Component,Suspense,lazy} from 'react';
import TPArea from '../touchpad/tpArea';
import MaxSpeedSlider from '../steps/settings/maxSpeed/MaxSpeedSlider';
import * as  WSAvcPlayer from 'dipistream/http-live-player';
import {api,socket,appSettings} from '../../services/clientService';
import {statsService} from '../../services/statsService';
import {controls} from '../../services/controlsConnector';

import { withGlobalState } from 'react-globally';
import './carView.css';

const FirstExperience = lazy(()=>import('../firstExperience/FirstExperience.js'));

class CarView extends Component{
    constructor(props){
        super(props);
        this.state = {plr:null, exp:false};
    }
    launchStream = () => {
        try{
            let canvas = document.getElementById("carView").querySelector('canvas');
            const url = api.get(true);
            const player = new WSAvcPlayer(canvas,"webgl",1,35);
            this.setState({plr:player});
            controls.setActive(true);
            statsService.setConnection();
            statsService.startTimer();
            player.connect(url);
            setTimeout(()=>{
            socket.set(player.ws);
            player.playStream();
            },2000)
        }catch(err){
            alert("Impossible de lancer le stream: "+err);
        }
    }
    endExp = () => {
        this.setState({exp:false});
        setTimeout(()=>this.launchStream(),1000);
    }
    componentDidMount(){
        if (!this.props.globalState.exp){
            statsService.setConnection();//this.launchStream();
        }else{
            this.setState({exp:true});
        }
    }
    shouldComponentUpdate(nProps,nState){
        if (this.props.visible.opacity!==nProps.visible.opacity) {
            try{
                if (nProps.visible.opacity===0) {
                    controls.setActive(false);
                    statsService.pauseTimer();
                }
                else {
                    controls.setActive(true);
                    statsService.startTimer();
                }
                controls.updateSettings();
                this.state.plr.pauseStream();
            }finally{
                return true;
            }
        }
        if (this.props.inputType!==nProps.inputType) return true;
        if (this.state.exp!==nState.exp) return true;
        return false;
    }
    render(){
        return(
            <>
                {this.state.exp && this.props.visible.opacity!==0 ?
                <Suspense fallback={null}>
                    <FirstExperience inputType={this.props.inputType} endExp={()=>this.endExp()}/>
                </Suspense>
                :
                <div id={this.props.id} style={this.props.visible}>
                    <canvas/>
                    {this.props.inputType==="touch" ? <div id="gamepad"><TPArea/></div>:null}
                    {!appSettings.getValue("minimalUi") && this.props.inputType!=="gamepad"?<MaxSpeedSlider/>:null}
                </div>
                }
                
            </>);
    }
};
export default withGlobalState(CarView);