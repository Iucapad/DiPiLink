import {battery} from './batteryInfos';
import {applyColor} from './colors';
export const VERSION = "0.5.0";

const appDefault = {
    hosts:[{host:"dipi.car",port:8060}],
    ssl:"s",
    devCapable:true,
    kbLayout:{
        up:{code:"ArrowUp"},
        down:{code:"ArrowDown"},
        right:{code:"ArrowRight"},
        left:{code:"ArrowLeft"}
      }
};

const carDefault = {
    maxSpeed:0.8,
    theme:0,
    minimalUi:false
};

class DisplayLanguage {
    constructor(){
        this.displayLanguage = navigator.language.split(/[-_]/)[0];
    }
    set = l => this.displayLanguage=l;
    get = () => this.displayLanguage;
    
}
export const displayLanguage = new DisplayLanguage();

class Api {
    constructor(){
        this.api=undefined;
        setTimeout(()=>this.init(),100);
    }
    init = (s = appSettings.getAppValue("ssl") === "s") => {
        const hosts=appSettings.getAppValue("hosts");
        const timeout = setTimeout(()=>this.init(!s),5000);
        hosts.forEach(
            i=>fetch(`http${s?"s":""}://${i.host}:${i.port}/api`).then(()=>{
                this.api=`${i.host}:${i.port}/api`;
                appSettings.setAppValue("ssl",s?"s":"");
                clearTimeout(timeout);
            })
        );
    }
    request = (target,type,obj) => {
        let req={
            method: type,
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(obj)
        };
        return fetch(`http${appSettings.getAppValue("ssl")}://${this.api+target}`,req).then(res=>res);
      }
    set = v => {
        this.api=`${v}:8060/api`;
        appSettings.setAppValue("hosts",{host:v,port:8060});
    };
    get = (ws=false) => ws?`ws${appSettings.getAppValue("ssl")}://${this.api}`:this.api;
    
}
export const api = new Api();

class Socket {
    constructor(){
        this.socket=undefined;
    }
    set = s => {this.socket=s;}
    get = () => {return this.socket;}
}
export const socket = new Socket();

class AppSettings {
    constructor(){
        this.usObj={id:0,name:"undefined"};
        this.currentSettings=carDefault;
        this.currentStats=undefined;
        this.tempStats=undefined;
        this.appSettings=this.loadSettings();
        if (battery.isLow) this.appSettings['devCapable']=false;
    }
    getAppValue = v => (v) ? (this.appSettings[v]!==undefined) ? this.appSettings[v] : appDefault[v] : this.appSettings;
    setAppValue = (key,value) => {
        if (key==="hosts") this.appSettings["hosts"].push(value);
        else this.appSettings[key]=value;
        this.saveSettings(false);
    }
    setUser = u => {
        this.usObj=u;
        if (u.storage.dpl_settings) this.currentSettings=u.storage.dpl_settings;
        applyColor();
    }
    get user() {return this.usObj.id};
    loadSettings = () =>{
        let o = localStorage.getItem("dpl_appSettings");
            return (o) ? JSON.parse(o) : appDefault;
    }
    saveSettings = (remote) => {
        if (remote){
            api.request(`/store/${this.usObj.id}`,"PUT",{dpl_settings:this.currentSettings}).catch((e)=>{
                console.log(e)
            });
        }
        else localStorage.setItem("dpl_appSettings",JSON.stringify(this.appSettings));
    }
    setValue = (key,value) => {
        this.currentSettings[key]=value;
        this.saveSettings(true);
    }
    getValue = v => (v) ? this.currentSettings[v] : this.currentSettings;
}
export const appSettings = new AppSettings();

class CarSettings {
    constructor(){
        const ms = appSettings.getValue("maxSpeed");
        this.maxSpeed = (ms) ? ms : 0.8;
    }
    getMaxSpeed = () => this.maxSpeed;
    
    setMaxSpeed = v => {
        this.maxSpeed=parseFloat(v);
        appSettings.setValue("maxSpeed",this.maxSpeed);
        return this.maxSpeed;
    }
}
export const carSettings = new CarSettings();
export function settingsClear(){
    localStorage.clear();
    reloadApp();
}
export function reloadApp(){
    document.location.reload();
}