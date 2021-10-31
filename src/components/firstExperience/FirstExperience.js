import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {appSettings} from '../../services/clientService';
import LicenseStatus from '../statistics/licenseStatus/licenseStatus';
import './firstExperience.css';

const asset = require("./asset.svg").default;
const asset2 = require("./asset2.svg").default;
const asset3 = require("./asset3.svg").default;
const license = require("./license.svg").default;
const gamepad = require("./gamepad.svg").default;
const touch = require("./touch.svg").default;
const dflt = require("./default.svg").default;
const controls = appSettings.getAppValue("kbLayout");

export default class FirstExperience extends Component{
    constructor(props){
        super(props);
        this.state={
            filter: false,
            car: [0,0],
            stats: [0,0],
            conf: [0,0],
            nav: [0,0],
            edge: 1,
            step: 0
        };
    }
    positionElements() {
        const main = document.getElementById("maintab");
        const car=main.childNodes[1].getBoundingClientRect();
        const stats=main.childNodes[2].getBoundingClientRect();
        const conf=main.childNodes[3].getBoundingClientRect();
        if (main.classList.contains("edge")){
            if (main.classList.contains("open")) {
                this.setState({
                    filter:true,
                    edge:3,
                    car:[car.left+90,car.top+10],
                    stats:[stats.left+90,stats.top+10],
                    conf:[conf.left+90,conf.top+10]
                });
            }
            else {
                this.setState({
                    filter:false,
                    nav:[0,parseInt(getComputedStyle(document.documentElement).getPropertyValue("--offsetTop"), 10)],
                    edge:1
                });
            }
        }else{
            this.setState({
                filter:false,
                edge:2,
                car:[car.left,car.top-10],
                stats:[stats.left,stats.top-10],
                conf:[conf.left,conf.top-10]
            });
        }
    }
    shouldComponentUpdate(nProps, nState) {
        return !(JSON.stringify(nState) === JSON.stringify(this.state) && this.props.inputType === nProps.inputType);
    }
    componentDidMount() {
        setInterval(()=>this.positionElements(),350);
    }
    getTips() {
        switch (this.state.step){
            case 1:
                return(
                    (this.state.edge===1)?
                    <>
                        <div className="line" style={{zIndex:950,left:this.state.nav[0]+20,top:this.state.nav[1]+60,width:'100px',height:'100px'}}/>
                        <p className="tip" style={{zIndex:950,left:this.state.nav[0]+110,top:this.state.nav[1]+170}}><FormattedMessage id={"tip.nav"}/></p>
                    </>
                        :
                            (this.state.edge===2)?
                            <>
                                <div className="line" style={{zIndex:990,left:this.state.car[0]+20,top:this.state.car[1]+60,width:'10px',height:'130px'}}/>
                                <p className="tip" style={{zIndex:990,left:this.state.car[0],top:this.state.car[1]+200}}><FormattedMessage id={"tip.car"}/></p>
                                <div className="line" style={{zIndex:950,left:this.state.stats[0]+20,top:this.state.stats[1]+60,width:'100px',height:'100px'}}/>
                                <p className="tip" style={{zIndex:950,left:this.state.stats[0]+120,top:this.state.stats[1]+170}}><FormattedMessage id={"tip.stats"}/></p>
                                <div className="line" style={{zIndex:950,left:this.state.conf[0]+30,top:this.state.conf[1]+60,width:'30px',height:'20px'}}/>
                                <p className="tip" style={{zIndex:950,left:this.state.conf[0]+60,top:this.state.conf[1]+85}}><FormattedMessage id={"tip.conf"}/></p>
                            </>
                            :
                            <>
                                <div className="line" style={{zIndex:950,left:this.state.car[0],top:this.state.car[1]+20,width:'170px',height:'10px'}}/>
                                <p className="tip" style={{zIndex:950,left:this.state.car[0]+165,top:this.state.car[1]+40}}><FormattedMessage id={"tip.car"}/></p>
                                <div className="line" style={{zIndex:950,left:this.state.stats[0],top:this.state.stats[1]+20,width:'170px',height:'110px'}}/>
                                <p className="tip" style={{zIndex:950,left:this.state.stats[0]+165,top:this.state.stats[1]+140}}><FormattedMessage id={"tip.stats"}/></p>
                                <div className="line" style={{zIndex:950,left:this.state.conf[0],top:this.state.conf[1]+20,width:'170px',height:'210px'}}/>
                                <p className="tip" style={{zIndex:950,left:this.state.conf[0]+165,top:this.state.conf[1]+240}}><FormattedMessage id={"tip.conf"}/></p>
                            </>
                );
            case 2:
                return(
                    this.state.edge === 2 &&
                    <>
                    <div className="line" style={{zIndex:990,left:this.state.car[0]+40,top:this.state.car[1]+60,width:'20px',height:'60px'}}/>
                    <p className="tip" style={{zIndex:990,left:this.state.car[0]+30,top:this.state.car[1]+130}}><FormattedMessage id={"tip.controls"}/></p>
                    </>
                )
            case 3:
                return(
                    this.state.edge === 2 ?
                    <>
                    <div className="line" style={{zIndex:990,left:this.state.stats[0]+40,top:this.state.stats[1]+60,width:'20px',height:'40px'}}/>
                    <p className="tip" style={{zIndex:990,left:this.state.stats[0]+30,top:this.state.stats[1]+110}}><FormattedMessage id={"tip.statshere"}/></p>
                    </>
                    :
                    this.state.edge === 1 ?
                    <>
                        <div className="line" style={{zIndex:950,left:this.state.nav[0]+20,top:this.state.nav[1]+60,width:'70px',height:'50px'}}/>
                        <p className="tip" style={{zIndex:950,left:this.state.nav[0]+80,top:this.state.nav[1]+120}}><FormattedMessage id={"tip.navhere"}/></p>
                    </>
                    :
                    <>
                    <div className="line" style={{zIndex:990,left:this.state.stats[0],top:this.state.stats[1]+20,width:'170px',height:'60px'}}/>
                    <p className="tip" style={{zIndex:950,left:this.state.stats[0]+165,top:this.state.stats[1]+90}}><FormattedMessage id={"tip.statshere"}/></p>
                    </>
                )
            case 4:
                return(
                    this.state.edge === 2 ?
                    <>
                        <div className="line" style={{zIndex:950,left:this.state.conf[0]+30,top:this.state.conf[1]+60,width:'30px',height:'20px'}}/>
                        <p className="tip" style={{zIndex:950,left:this.state.conf[0]+60,top:this.state.conf[1]+85}}><FormattedMessage id={"tip.here"}/></p>
                    </>
                    :
                    this.state.edge === 1 ?
                    <>
                        <div className="line" style={{zIndex:950,left:this.state.nav[0]+20,top:this.state.nav[1]+60,width:'70px',height:'50px'}}/>
                        <p className="tip" style={{zIndex:950,left:this.state.nav[0]+80,top:this.state.nav[1]+120}}><FormattedMessage id={"tip.navhere"}/></p>
                    </>
                    :
                    <>
                        <div className="line" style={{zIndex:950,left:this.state.conf[0],top:this.state.conf[1]+20,width:'170px',height:'60px'}}/>
                        <p className="tip" style={{zIndex:950,left:this.state.conf[0]+165,top:this.state.conf[1]+90}}><FormattedMessage id={"tip.here"}/></p>
                    </>     
                )
            default: break;
        }
    }
    getControls(){
        switch(this.props.inputType){
            case "gamepad":
                return(
                    <ol id="controls-gpd">
                        <li><FormattedMessage id={"controls.prev"}/></li>
                        <li><FormattedMessage id={"controls.next"}/></li>
                        <li><FormattedMessage id={"controls.back"}/></li>
                        <li><FormattedMessage id={"controls.fwd"}/></li>
                        <li><FormattedMessage id={"controls.direct"}/></li>
                    </ol>
                );
            case "touch":
                return(
                <ol id="controls-gpd">
                    <li><FormattedMessage id={"controls.direct"}/></li>
                    <li><FormattedMessage id={"controls.adjust"}/></li>
                    <span><FormattedMessage id={"controls.tiptouch"}/></span>
                </ol>
                );
            default:
                return(
                <ul id="controls-gpd">
                    <li>{controls['up'].code} - <FormattedMessage id={"controls.up"}/></li>
                    <li>{controls['down'].code} - <FormattedMessage id={"controls.down"}/></li>
                    <li>{controls['right'].code} - <FormattedMessage id={"controls.right"}/></li>
                    <li>{controls['left'].code} - <FormattedMessage id={"controls.left"}/></li>
                    <span><FormattedMessage id={"controls.tipkb"}/></span>
                </ul>
                );
        }
    }
    getContent(){
        switch (this.state.step){
            case 0:
                return(
                    <>
                        <div key="01" id="img-container" style={this.state.filter?{filter:"blur(1px) opacity(0.5)"}:null}><img draggable="false" src={asset} alt=""/></div>
                        <div key="0" className="height-anim content-step" style={{padding:(this.state.edge===3)?'10px':'0px 3vmin 8vmin 0px'}}>
                            <h1 style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.welcome"}/></h1>
                            <p style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.ini"}/></p>
                            <div id="focusableElements">
                                <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={this.props.endExp}><FormattedMessage id={"btn.ignore"}/></button>
                                <button onClick={()=>this.setState({step:1})}><FormattedMessage id={"btn.next"}/></button>
                            </div>
                        </div>
                    </>
                );
            case 1:
                return(
                    <>
                        <div key="01" id="img-container" style={this.state.filter?{filter:"blur(1px) opacity(0.5)"}:null}><img draggable="false" src={asset} alt=""/></div>
                        <div key="1" className="height-anim content-step" style={{padding:(this.state.edge===3)?'10px':'0px 3vmin 8vmin 0px'}}>
                            <h1 style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.a1"}/></h1>
                            <p style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.b1"}/></p>
                            <div id="focusableElements">
                                <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={()=>this.setState({step:0})}><FormattedMessage id={"btn.back"}/></button>
                                <button onClick={()=>this.setState({step:2})}><FormattedMessage id={"btn.next"}/></button>
                            </div>
                        </div>
                    </>
                );
            case 2:
                return(
                    <>
                        <div id="img-gpd"><img draggable="false" src={this.props.inputType==="gamepad"?gamepad:this.props.inputType==="touch"?touch:dflt} alt=""/></div>
                        {this.getControls()}
                        <div key="2" className="height-anim content-step" style={{transition:'all 0.4s',position:'fixed',bottom:0,right:0,maxWidth:'40vw',textAlign:'center',padding:(this.state.edge===3)?'10px':'0 3vmin 8vmin 0'}}>
                            <h1 style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.a2"}/></h1>
                            <p style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.b2"}/></p>
                            <div id="focusableElements">
                                <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={()=>this.setState({step:1})}><FormattedMessage id={"btn.back"}/></button>
                                <button onClick={()=>this.setState({step:3})}><FormattedMessage id={"btn.next"}/></button>
                            </div>
                        </div>
                    </>
                );
            case 3:
            return(
                <>
                    <div key="03" id="img-container" style={this.state.filter?{filter:"blur(1px) opacity(0.5)"}:null}><img draggable="false" src={license} alt=""/><LicenseStatus/></div>
                    <div key="3" className="height-anim content-step" style={{padding:(this.state.edge===3)?'10px':'0px 3vmin 8vmin 0px'}}>
                        <h1 style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.a3"}/></h1>
                        <p style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.b3"}/></p>
                        <div id="focusableElements">
                            <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={()=>this.setState({step:2})}><FormattedMessage id={"btn.back"}/></button>
                            <button onClick={()=>this.setState({step:4})}><FormattedMessage id={"btn.next"}/></button>
                        </div>
                    </div>
                </>
            );
            case 4:
            return(
                <>
                    <div key="04" id="img-container" style={this.state.filter?{filter:"blur(1px) opacity(0.5)"}:null}><img draggable="false" src={asset2} alt=""/></div>
                    <div key="4" className="height-anim content-step" style={{padding:(this.state.edge===3)?'10px':'0px 3vmin 8vmin 0px'}}>
                        <h1 style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.a4"}/></h1>
                        <p style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.b4"}/></p>
                        <div id="focusableElements">
                            <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={()=>this.setState({step:3})}><FormattedMessage id={"btn.back"}/></button>
                            <button onClick={()=>this.setState({step:5})}><FormattedMessage id={"btn.next"}/></button>
                        </div>
                    </div>
                </>
            );
            case 5:
                return(
                    <>
                        <div key="05" id="img-container" style={this.state.filter?{filter:"blur(1px) opacity(0.5)"}:null}><img draggable="false" src={asset3} alt=""/></div>
                        <div key="5" className="height-anim content-step" style={{padding:(this.state.edge===3)?'10px':'0px 3vmin 8vmin 0px'}}>
                            <h1 style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.a5"}/></h1>
                            <p style={{display:(this.state.edge===3)?'none':null}}><FormattedMessage id={"exp.b5"}/></p>
                            <div id="focusableElements">
                                <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={()=>this.setState({step:4})}><FormattedMessage id={"btn.back"}/></button>
                                <button onClick={this.props.endExp}><FormattedMessage id={"btn.next"}/></button>
                            </div>
                        </div>
                    </>
                );

            default:
                return(
                    <div key="d" className="height-anim content-step" style={{padding:(this.state.edge===3)?'10px':'0 10vw 20vh 0'}}>
                        <button onClick={()=>this.setState({step:0})}><FormattedMessage id={"btn.reset"}/></button>
                    </div>
                );
        }
    }
    render(){
        return(
            <div id="exp" style={{paddingTop:'10vmin'}}>
                {this.getTips()}
                <div className="cover" style={this.state.filter?{filter:"saturate(0.8) brightness(0.9)"}:null}>
                {this.getContent()}
                </div>
                <div id="img-loader">
                    <img src={asset} alt=""/>
                    <img src={asset2} alt=""/>
                    <img src={asset3} alt=""/>
                    <img src={license} alt=""/>
                    <img src={gamepad} alt=""/>
                    <img src={touch} alt=""/>
                    <img src={dflt} alt=""/>
                </div>
            </div>
        );
    }
};