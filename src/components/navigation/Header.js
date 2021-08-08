import React, {Component} from 'react';
import Tab from './Tab';
import './Navigation.css';

import { withGlobalState } from 'react-globally';
import {injectIntl} from 'react-intl';

const app = window.document.getElementById("root");

class UiHeader extends Component {
    constructor(props){
        super(props);
        this.tab = React.createRef();
        this.state={tabs:["confTab","aboutTab"]};
    }
    componentDidMount() {
        window.addEventListener("resize", () => this.handleResize());
        this.handleResize();
    }
    componentDidUpdate(prevProps){
        window.document.addEventListener("gpInput",this.handleGP,false);
        if (this.props!==prevProps){
            if (this.props.state.currentMode==="bridge") {
                this.setState({tabs:["carTab","statsTab","confTab","aboutTab"]});
            }
        }
    }
    previous(){
        const current=this.state.tabs.indexOf(document.getElementById("maintab").querySelector(".active").id);
        if (current>0) this.props.appState({currentTab:this.state.tabs[current-1]});
    }
    next(){
        const current=this.state.tabs.indexOf(document.getElementById("maintab").querySelector(".active").id);
        if (current<this.state.tabs.length-1) this.props.appState({currentTab:this.state.tabs[current+1]});
    }
    handleGP = (e) => {
        if (e.detail===4) {
            this.previous();
          } else if (e.detail===5) {
            this.next();
          }
    }
    handleResize(){
        const tab=this.tab.current;
        if (!tab) return;
        if (window.matchMedia("(max-width: 600px)").matches) {
            tab.classList.add('edge');
        }else{
            tab.classList.remove('edge');
            tab.classList.remove('open');
            app.classList.remove('ufc');
            tab.style.height='';
        };
    }
    handleClick(){
        const tab = window.document.getElementById("maintab");
        if(tab.classList.contains("open")){
            tab.classList.remove('open');
            app.classList.remove('ufc');
            setTimeout(() => tab.style.height='50px',200);
        }else{
            tab.classList.add('open');
            app.classList.add('ufc');
            tab.style.height='100vh';
        }
    }
    getMode(current){
        const {intl,globalState}=this.props;
        const modes={
        default:
            <>           
                <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={this.handleClick}/>
                <Tab state={this.props.state.currentTab} id="confTab" text={intl.formatMessage({id:"tab.iniSetTab"})} handleClick={this.handleClick} appState={this.props.appState}></Tab>
                <Tab state={this.props.state.currentTab} id="aboutTab" text={intl.formatMessage({id:"tab.aboutTab"})} handleClick={this.handleClick} appState={this.props.appState}></Tab>
            </>,
        bridge:
            <>            
                <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={this.handleClick}/>
                <Tab state={this.props.state.currentTab} id="carTab" text={(globalState.hostname && globalState.hostname.length<=15 && globalState.hostname!=="raspberrypi")?globalState.hostname:intl.formatMessage({id:"tab.carTab"})} handleClick={()=>this.handleClick} appState={this.props.appState}></Tab>
                <Tab state={this.props.state.currentTab} id="statsTab" text={intl.formatMessage({id:"tab.statsTab"})} handleClick={this.handleClick} appState={this.props.appState}></Tab>
                <Tab state={this.props.state.currentTab} id="confTab" text={intl.formatMessage({id:"tab.setTab"})} handleClick={this.handleClick} appState={this.props.appState}></Tab>
                <Tab state={this.props.state.currentTab} id="aboutTab" text={intl.formatMessage({id:"tab.aboutTab"})} handleClick={this.handleClick} appState={this.props.appState}></Tab>
            </>
        }
        return modes[current];
    }
    render(){
        const {intl} = this.props;
        return(
            <header>
                <div id="safearea"></div>
                <ul className="tab" id="maintab" ref={this.tab}> 
                {this.getMode(this.props.state.currentMode)}
                </ul>
                <p id="hdrTitle">{intl.formatMessage({id:`tab.${this.props.state.currentTab}`})}</p>
            </header>
        );
    }
}
export default injectIntl(withGlobalState(UiHeader));