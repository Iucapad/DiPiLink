import React, { Component } from 'react';
import sessionTime from "./session_time.svg";
import { statsService } from '../../services/statsService';
import LicenseStatus from './licenseStatus/licenseStatus';
import { withGlobalState } from 'react-globally';
import { injectIntl, FormattedMessage } from 'react-intl';
import './statistics.css';

import input_default from "./input_default.svg";
import input_gamepad from "./input_gamepad.svg";
import input_touch from "./input_touch.svg";
const img = { input_default, input_gamepad, input_touch };

class StatisticsView extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    componentDidMount(){
        this.setState({
            id:this.props.globalState.currentUser.id,
            name:this.props.globalState.currentUser.name
        });
    }
    getTime = (time) => {
        const h = Math.floor(time/60);
        const m = time%60;
        return h>0 ? <FormattedMessage id={"date.h_m"} values={{h:h,m:Math.floor(m)}}/> : <FormattedMessage id={"date.m"} values={{m:parseInt(m) ? m : m.toPrecision(1)}}/>;
    }
    getHour = () => {
        const h = new Date(statsService.getStat("clientStats").connection).getHours();
        const m = new Date(statsService.getStat("clientStats").connection).getMinutes();
        return `${(h>9)?`${h}`:`0${h}`}:${(m>9)?`${m}`:`0${m}`}`;
    }
    getPrefered = () => {
        const st = statsService.getStat("clientStats").inputTime;
        return Object.keys(st).map((key) => [key, st[key]]).reduce((acc, v) => v[1] > acc[1] ? v : acc)[0];
    }
    render(){
        return(
            <div id="statsView" style={this.props.visible}>
                <div className="uiCard">
                    <div id="id-container">
                        <div id="identity">
                            <div className="usertag">
                                <span>{this.props.globalState.currentUser.name.slice(0,1)}</span>
                            </div>
                            <div id="top-content">
                                <h1>{this.state.name}</h1>
                            </div>
                        </div>
                        <div id="details-content">
                            <h3><FormattedMessage id={"stat.license"}/></h3>
                            <h2><FormattedMessage id={"stat.details"}/></h2>
                            <p className="stat-title"><FormattedMessage id={"stat.id"}/><span className="val">{this.state.id}</span></p>
                            <p className="stat-title"><FormattedMessage id={"stat.gametime"}/><span className="val">{this.getTime(statsService.getTimer(false))}</span></p>
                        </div>
                        <LicenseStatus level={statsService.getTimer(false)}/>
                    </div>
                    <div className="other">
                        <p className="stat-title"><FormattedMessage id={"stat.connection"}/><span className="val">{this.getHour()}</span></p>
                        <p className="stat-title"><FormattedMessage id={"stat.session"}/><span className="val">{this.getTime(statsService.getTimer(true))}<img className="val themed-img" alt="" width="35" height="35" src={sessionTime}/></span></p>
                        <p className="stat-title"><FormattedMessage id={"stat.input"}/><span className="val"><img className="val themed-img" alt="" width="35" height="35" src={ img[this.getPrefered()] }/></span></p>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(withGlobalState(StatisticsView));