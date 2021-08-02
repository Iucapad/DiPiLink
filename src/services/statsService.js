import {api,appSettings} from './clientService';

class StatsService {
    constructor() {
        this.currentStats=undefined;
        this.tempStats=undefined;
        this.pushTimeout=undefined;
    }
    getStat = (key) => {
        if (!this.currentStats) return this.defaultStats[key];
        return this.currentStats[key];
    }
    fetchStats = () => {
        api.request(`/stats/${appSettings.id}`,"GET").then((res) =>{
            return res.json();
        }).then((data)=>
            {
                this.currentStats=data;
            }
        )
    }
    updateStat = (key,value) => {
        if (!this.currentStats) this.fetchStats();
        else this.tempStats[key]=value;
    }
    pushStats = () => {
        if (this.currentStats && this.tempStats){
            this.currentStats=this.tempStats;
            api.request(`/stats/${appSettings.id}`,"PUT",this.tempStats).then(() =>{
                console.log("stats sent");
            }).catch((e)=>{
                console.log(e)
            });
        }
    }
    startLoop = () => {
        if (!this.currentStats) this.fetchStats();
        if (this.tempStats) this.pushStats();
        this.pushTimeout=setTimeout(this.loop,60000);
    }
    resetLoop = () => clearTimeout(this.pushTimeout);
    get defaultStats(){return{firstco:Date.now(),lastco:Date.now(),playtime:0}}
}
export const statsService = new StatsService();