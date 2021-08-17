import React, {lazy,Component,Suspense} from 'react';
import {appSettings} from './services/clientService';
import {gpconnector} from './services/gamepadConnector';
import {kbconnector} from './services/keyboardConnector';
import {applyColor} from './services/colors';

import { withGlobalState } from 'react-globally';
import {injectIntl} from 'react-intl';

import Loading from './components/Loading';
import Header from './components/navigation/Header';
import Slideview from './components/Slideview';
import Aboutview from './components/Aboutview';
import AnimatedBackground from './components/background/AnimatedBackground';
import HowToPage from './components/steps/HowToPage';
import { statsService } from './services/statsService';
import {Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';

const CarView = lazy(()=>import('./components/carView/CarView'));
const StatisticsView = lazy(()=>import('./components/statistics/StatisticsView'));
const CapableTheme = lazy(() => import('./capable/Capable'));
const devCapable = appSettings.getAppValue("devCapable");

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentTab:"confTab",
      currentColor:"Surf",
      currentMode:"default",
      inputType:"default"
    };
  }
  getContent(){
    const content={
    default:null,
    bridge:
    <Suspense fallback={<Loading/>}>
      <CarView id="carView" exp={this.state.exp} inputType={this.state.inputType} visible={(this.state.currentTab==="carTab")?{opacity:'var(--opac1)',animation:'carAppear 1s'}:{opacity:0,animation:'disappear 0.9s'}}/>
      <StatisticsView visible={(this.state.currentTab==="statsTab")?{display:'grid',opacity:'var(--opac1)'}:{display:'none',opacity:0}}/>
    </Suspense>
    }
    return content[this.state.currentMode];
  }
  setInput(type){
    if (this.state.inputType!==type) {
      this.setState({inputType:type});
    }
  }
  componentDidUpdate(pProps,pState){
    if (pState.inputType !== this.state.inputType) return statsService.updateInput(this.state.inputType);
    if (this.state.inputType==="default") {gpconnector.active=false;kbconnector.active=true;}
    else if (this.state.inputType==="gamepad") {gpconnector.active=true;kbconnector.active=false;}
    else{gpconnector.active=false;kbconnector.active=false;}
  }
  componentDidMount(){
    applyColor();
    window.addEventListener('touchstart',()=>{
      this.setInput("touch");
    });
    window.addEventListener('keydown',()=>{
      this.setInput("default");
    });
    window.addEventListener("gamepadconnected",()=>{
      this.setInput("gamepad");
    });
    window.addEventListener("gamepaddisconnected",()=>{
      this.setInput("default");
    });
    window.document.addEventListener("gpInput",()=>{
      this.setInput("gamepad");
    });
    
  }
  getError(){
    const {intl} = this.props;
    if (this.props.globalState.error){
      return (
        <Dialog
        fullWidth={true}
        maxWidth = {'xs'}
        open={this.props.globalState.error}
        onClose={null}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{ label: 'ButtonMaterial' }}
      >
        <DialogTitle id="alert-dialog-title">{intl.formatMessage({id:"title.error"})}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.globalState.error}
          </DialogContentText>
        </DialogContent>
        <DialogActions
        classes={{ label: 'ButtonMaterial' }}>
          <Button onClick={()=>this.props.setGlobalState({error:null})} disableRipple={true}
          classes={{ label: 'ButtonMaterial' }}
            >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      )
    }
  }
  render(){
    return (
      <>
      {devCapable?
      <Suspense fallback={null}>
      <><CapableTheme></CapableTheme>
      </>
    </Suspense>:null
    }
      {this.getError()}
      <Header state={this.state} appState={this.setState.bind(this)}/>
      <AnimatedBackground tab={this.state.currentTab}/>      
      {this.getContent()}
      <div className="slideView" id="confView" style={(this.state.currentTab==="confTab")?{display:'grid'}:{display:'none'}}>
        {localStorage.getItem("dpl_appSettings")===null&&<HowToPage/>}
        <Slideview state={this.state} appState={this.setState.bind(this)} onLoad="loadView()"/>
      </div>
      <Aboutview visible={(this.state.currentTab==="aboutTab")?{display:'grid'}:{display:'none'}}/>
      </>
    );
  }
}

export default injectIntl(withGlobalState(App));