import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {appSettings} from '../../services/clientService';
import './firstExperience.css';

const asset = require("./asset.svg").default;
const asset2 = require("./asset2.svg").default;
const asset3 = require("./asset3.svg").default;
const gamepad = require("./gamepad.svg").default;
const touch = require("./touch.svg").default;
const dflt = require("./default.svg").default;
const controls = appSettings.getAppValue("kbLayout");

export default class FirstExperience extends Component{
    constructor(props){
        super(props);
        this.state={filter:false,car:[0,0],stats:[0,0],conf:[0,0],nav:[0,0],edge:true,step:0};
    }
    positionElements(){
        let main = document.getElementById("maintab");
        let car=document.getElementById("maintab").childNodes[1].getBoundingClientRect();
        let stats=document.getElementById("maintab").childNodes[2].getBoundingClientRect();
        let conf=document.getElementById("maintab").childNodes[3].getBoundingClientRect();
        if (main.classList.contains("edge")){
            if (main.classList.contains("open")) {
                this.setState({filter:true});
                this.setState({edge:3});
                this.setState({car:[car.left+90,car.top+10]});
                this.setState({stats:[stats.left+90,stats.top+10]});
                this.setState({conf:[conf.left+90,conf.top+10]});
            }
            else {
                this.setState({filter:false});
                var nav=main.getBoundingClientRect();
                this.setState({nav:[nav.left,nav.top]});
                this.setState({edge:1});
            }
        }else{
            this.setState({filter:false});
            this.setState({edge:2});
            this.setState({car:[car.left,car.top]});
            this.setState({stats:[stats.left,stats.top]});
            this.setState({conf:[conf.left,conf.top]});
        }
    }
    componentDidMount(){
        setInterval(()=>this.positionElements(),300);
        this.positionElements();        
    }
    getTips(){
        switch (this.state.step){
            case 1:
                return(
                    (this.state.edge===1)?
                    <>
                        <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.nav[0]+20,top:this.state.nav[1]+60,width:'100px',height:'100px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                        <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.nav[0]+110,top:this.state.nav[1]+170}}><FormattedMessage id={"tip.nav"}/></p>
                    </>
                        :
                            (this.state.edge===2)?
                            <>
                                <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:990,left:this.state.car[0]+20,top:this.state.car[1]+60,width:'10px',height:'130px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                                <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:990,left:this.state.car[0],top:this.state.car[1]+200}}><FormattedMessage id={"tip.car"}/></p>
                                <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.stats[0]+20,top:this.state.stats[1]+60,width:'100px',height:'100px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                                <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.stats[0]+120,top:this.state.stats[1]+170}}><FormattedMessage id={"tip.stats"}/></p>
                                <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.conf[0]+30,top:this.state.conf[1]+60,width:'30px',height:'20px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                                <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.conf[0]+60,top:this.state.conf[1]+85}}><FormattedMessage id={"tip.conf"}/></p>
                            </>
                            :
                            <>
                                <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.car[0],top:this.state.car[1]+20,width:'170px',height:'10px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                                <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.car[0]+165,top:this.state.car[1]+40}}><FormattedMessage id={"tip.car"}/></p>
                                <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.stats[0],top:this.state.stats[1]+20,width:'170px',height:'110px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                                <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.stats[0]+165,top:this.state.stats[1]+140}}><FormattedMessage id={"tip.stats"}/></p>
                                <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.conf[0],top:this.state.conf[1]+20,width:'170px',height:'210px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                                <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.conf[0]+165,top:this.state.conf[1]+240}}><FormattedMessage id={"tip.conf"}/></p>
                            </>
                );
            case 2:
                return(
                    (this.state.edge===2)?
                    <>
                    <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:990,left:this.state.car[0]+40,top:this.state.car[1]+60,width:'20px',height:'60px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                    <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:990,left:this.state.car[0]+30,top:this.state.car[1]+130}}><FormattedMessage id={"tip.controls"}/></p>
                    </>
                    :null
                )
            case 3:
                return(
                    (this.state.edge===2)?
                    <>
                        <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.conf[0]+30,top:this.state.conf[1]+60,width:'30px',height:'20px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                        <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.conf[0]+60,top:this.state.conf[1]+85}}><FormattedMessage id={"tip.here"}/></p>
                    </>
                    :
                    (this.state.edge===1)?
                    <>
                        <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.nav[0]+20,top:this.state.nav[1]+60,width:'70px',height:'50px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                        <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.nav[0]+80,top:this.state.nav[1]+120}}><FormattedMessage id={"tip.nav"}/></p>
                    </>
                    :
                    <>
                        <div style={{animation:'appear 2s',transition:'top 0.4s, left 0.4s',position:'absolute',zIndex:950,left:this.state.conf[0],top:this.state.conf[1]+20,width:'170px',height:'60px',border:'solid 2px #000',borderColor:'transparent transparent #000 #000',borderRadius: '0 0 0 100%'}}/>
                        <p className="tip" style={{animation:'appear 2s',position:'absolute',zIndex:950,left:this.state.conf[0]+165,top:this.state.conf[1]+90}}><FormattedMessage id={"tip.here"}/></p>
                    </>     
                )
            default:break;
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
                        <div key="01" id="img-container" style={this.state.filter?{filter:"blur(1px)"}:null}><img draggable="false" src={asset} alt=""/></div>
                        <div key="0" className="height-anim" style={{transition:'all 0.4s',position:'absolute',bottom:0,right:0,maxWidth:'50vw',textAlign:'center',padding:(this.state.edge!==3)?'0 5vh 10vh 0':'10px'}}>
                            <h1 style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.welcome"}/></h1>
                            <p style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.ini"}/></p>
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
                        <div key="01" id="img-container" style={this.state.filter?{filter:"blur(1px)"}:null}><img draggable="false" src={asset} alt=""/></div>
                        <div key="1" className="height-anim" style={{transition:'all 0.4s',position:'absolute',bottom:0,right:0,maxWidth:'50vw',textAlign:'center',padding:(this.state.edge!==3)?'0 5vh 10vh 0':'10px'}}>
                            <h1 style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.a1"}/></h1>
                            <p style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.b1"}/></p>
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
                        <div key="2" className="height-anim" style={{transition:'all 0.4s',position:'absolute',bottom:0,right:0,maxWidth:'40vw',textAlign:'center',padding:(this.state.edge!==3)?'0 3vw 10vh 0':'10px'}}>
                            <h1 style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.a2"}/></h1>
                            <p style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.b2"}/></p>
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
                    <div key="03" id="img-container" style={this.state.filter?{filter:"blur(1px)"}:null}><img draggable="false" src={asset2} alt=""/></div>
                    <div key="3" className="height-anim" style={{transition:'all 0.4s',position:'absolute',bottom:0,right:0,maxWidth:'50vw',textAlign:'center',padding:(this.state.edge!==3)?'0 5vh 10vh 0':'10px'}}>
                        <h1 style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.a3"}/></h1>
                        <p style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.b3"}/></p>
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
                        <div key="04" id="img-container" style={this.state.filter?{filter:"blur(1px)"}:null}><img draggable="false" src={asset3} alt=""/></div>
                        <div key="4" className="height-anim" style={{transition:'all 0.4s',position:'absolute',bottom:0,right:0,maxWidth:'50vw',textAlign:'center',padding:(this.state.edge!==3)?'0 5vh 10vh 0':'10px'}}>
                            <h1 style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.a4"}/></h1>
                            <p style={{display:(this.state.edge!==3)?'block':'none'}}><FormattedMessage id={"exp.b4"}/></p>
                            <div id="focusableElements">
                                <button style={{display:(this.state.edge===2)?'inline-grid':(this.state.edge===3)?'none':'inline-grid'}} onClick={()=>this.setState({step:3})}><FormattedMessage id={"btn.back"}/></button>
                                <button onClick={()=>this.setState({step:5})}><FormattedMessage id={"btn.next"}/></button>
                            </div>
                        </div>
                    </>
                );

            default:
                return(
                    <div key="d" className="height-anim" style={{transition:'all 0.4s',position:'absolute',bottom:0,right:0,maxWidth:'50vw',textAlign:'center',padding:(this.state.edge!==3)?'0 10vw 20vh 0':'10px'}}>
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
                    <img src={gamepad} alt=""/>
                    <img src={touch} alt=""/>
                    <img src={dflt} alt=""/>
                </div>
            </div>
        );
    }
};