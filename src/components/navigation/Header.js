import React, { Component } from 'react';
import Tab from './Tab';
import './Navigation.css';

import { withGlobalState } from 'react-globally';
import { injectIntl } from 'react-intl';

const app = window.document.getElementById("root");

const handleResize = tab => {
    if (!tab) return;
    if (window.matchMedia("(max-width: 600px)").matches) {
        tab.classList.add('edge');
    } else {
        tab.classList.remove('edge');
        this.setState({ open: false });
        app.classList.remove('ufc');
        tab.style.height = '';
    };
};

class UiHeader extends Component {
    constructor(props){
        super(props);
        this.tab = React.createRef();
        this.state = { 
            tabs: ["confTab", "aboutTab"],
            open: false
     };
    }
    componentDidMount() {
        window.addEventListener("resize", () => handleResize(this.tab.current));
        handleResize(this.tab.current);
    }
    componentDidUpdate(prevProps){
        window.document.addEventListener("gpInput", this.handleGP, false);
        if (this.props !== prevProps){
            this.props.state.currentMode === "bridge" && this.setState({tabs: ["carTab","statsTab","confTab","aboutTab"]});
        }
    }
    previous(){
        const current = this.state.tabs.indexOf(document.getElementById("maintab").querySelector(".active").id);
        current > 0 && this.props.appState({currentTab: this.state.tabs[current-1]});
    }
    next(){
        const current = this.state.tabs.indexOf(document.getElementById("maintab").querySelector(".active").id);
        current < this.state.tabs.length-1 && this.props.appState({currentTab: this.state.tabs[current+1]});
    }
    handleGP = e => {
        if (e.detail === 4) {
            this.previous();
        } else if (e.detail === 5) {
            this.next();
        }
    }
    handleClick() {
        const tab = window.document.getElementById("maintab");
        if (this.state.open) {
            this.setState({ open: false });
            app.classList.add('ufc');
            setTimeout(() => tab.style.height='50px', 200);
        } else {
            this.setState({ open: true });
            app.classList.remove('ufc');
            tab.style.height = '100vh';
        }
    }
    getMode(current) {
        const {intl, globalState} = this.props;
        const modes = {
            default:
                <>           
                    <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={ this.handleClick.bind(this) }/>
                    <Tab state={ this.props.state.currentTab } id="confTab" text={ intl.formatMessage({id:"tab.iniSetTab"}) } handleClick={ this.handleClick.bind(this) } appState={ this.props.appState }/>
                    <Tab state={ this.props.state.currentTab } id="aboutTab" text={ intl.formatMessage({id:"tab.aboutTab"}) } handleClick={ this.handleClick.bind(this) } appState={ this.props.appState }/>
                </>,
            bridge:
                <>            
                    <img width="50" height="50" className="tabNavigation" id="tabTarget" alt="" onClick={ this.handleClick }/>
                    <Tab state={ this.props.state.currentTab } id="carTab" text={ (globalState.hostname && globalState.hostname.length <= 15 && globalState.hostname !== "raspberrypi") ? globalState.hostname : intl.formatMessage({id:"tab.carTab"}) } handleClick={ this.handleClick } appState={ this.props.appState }/>
                    <Tab state={ this.props.state.currentTab } id="statsTab" text={ intl.formatMessage({id:"tab.statsTab"}) } handleClick={ this.handleClick.bind(this) } appState={ this.props.appState }/>
                    <Tab state={ this.props.state.currentTab } id="confTab" text={ intl.formatMessage({id:"tab.setTab"}) } handleClick={ this.handleClick.bind(this) } appState={ this.props.appState }/>
                    <Tab state={ this.props.state.currentTab } id="aboutTab" text={ intl.formatMessage({id:"tab.aboutTab"}) } handleClick={ this.handleClick.bind(this) } appState={ this.props.appState }/>
                </>
        }
        return modes[current];
    }
    render(){
        const { intl } = this.props;
        return(
            <header>
                <div id="safearea"/>
                <ul className={ `tab ${ this.state.open ? "open" : "" }` } id="maintab" style={ this.state.open ? { height: "100vh" } : {} } ref={ this.tab }> 
                { this.getMode(this.props.state.currentMode) }
                </ul>
                <p id="hdrTitle">{intl.formatMessage({id:`tab.${this.props.state.currentTab}`})}</p>
            </header>
        );
    }
};

export default injectIntl(withGlobalState(UiHeader));