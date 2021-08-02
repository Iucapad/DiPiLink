import React, {Component,Suspense,lazy} from 'react';
import TPArea from './touchpad/tpArea';
import MaxSpeedSlider from './steps/settings/maxSpeed/MaxSpeedSlider';
import * as  WSAvcPlayer from 'dipistream/http-live-player';
import {api,socket,appSettings} from '../services/clientService';
import {statsService} from '../services/statsService';
import {controls} from '../services/controlsConnector';

import { withGlobalState } from 'react-globally';
import './carView.css';

const FirstExperience = lazy(()=>import('./firstExperience/FirstExperience.js'));

class CarView extends Component{
    constructor(props){
        super(props);
        this.state={plr:null,exp:false};
        this.playtime=undefined;
        this.timeout=undefined;
    }
    startLoop = () => {
        this.timeout = setInterval(() => {
            this.playtime++;
            statsService.updateStat("playtime",this.playtime);
          }, 60000);
          statsService.startLoop();
    }
    resetLoop = () => {
        clearInterval(this.timeout);
        statsService.resetLoop();
    }
    launchStream(){
        try{
            let canvas = document.getElementById("carView").querySelector('canvas');
            const url = api.get(true);
            const player = new WSAvcPlayer(canvas,"webgl",1,35);
            this.setState({plr:player});
            player.connect(url);
            setTimeout(()=>{
            socket.set(player.ws);
            player.playStream();
            controls.setActive(true);
            },2000)
        }catch(err){
            alert("Impossible de lancer le stream: "+err);
        }
    }
    endExp(){
        this.setState({exp:false});
        setTimeout(()=>{this.launchStream()},1000);
    }
    componentDidMount(){
        if (!this.props.globalState.exp){
            this.launchStream();
            this.playtime=statsService.getStat("playtime");
        }else{
            this.setState({exp:true});
        }
    }
    shouldComponentUpdate(nProps,nState){
        if (this.props.visible.opacity!==nProps.visible.opacity) {
            try{
                if (this.props.visible.opacity===0) {
                    controls.setActive(true);
                    this.startLoop();
                }
                else {
                    controls.setActive(false);
                    this.resetLoop();
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
            {(this.state.exp)&&(this.props.visible.opacity!==0)?
            <Suspense fallback={null}>
                <FirstExperience inputType={this.props.inputType} endExp={()=>this.endExp()}/>
            </Suspense>:
            <div id={this.props.id} style={this.props.visible}>
                <canvas/>
                {this.props.inputType==="touch" && <div id="gamepad"><TPArea></TPArea></div>}
                {(!appSettings.getValue("minimalUi") && this.props.inputType!=="gamepad")&&<MaxSpeedSlider></MaxSpeedSlider>}
            </div>
            }
            
        </>);
    }
};
export default withGlobalState(CarView);