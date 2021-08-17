import {api, appSettings} from './clientService';

const defaultValues = {
    connection:0,
    lastConnection:Date.now(),
    gameTime:0,
    inputTime:{
        default:0,
        touch:0,
        gamepad:0
        }
    };

class StatsService {
    constructor() {
        this.currentStats = {...defaultValues};
        this.updateEvent = undefined;
        this.pushTimeout = undefined;
        this.inputType = undefined;
        this.time = {play: 0, total: 0};
    }
    updateTimer = () => {
        this.time.play++;
        this.updateEvent = setTimeout(this.updateTimer,10000);
    }

    updateInput = nInput => this.inputType = nInput;

    setConnection = () => {
        this.fetchStats();
        this.currentStats.connection = Date.now();
        this.pushTimeout = setTimeout(this.loop,60000);
    }

    getTimer = (play) => play ? this.time.play/10 : this.time.total+this.time.play/10;

    startTimer = () => setTimeout(this.updateTimer,10000);

    pauseTimer = () => clearTimeout(this.updateEvent);

    getStat = key =>  this.currentStats ? this.currentStats[key] : this.defaultStats[key];
    
    fetchStats = () => {
        api.request(`/stats/${appSettings.id}`,"GET").then((res) =>{
            return res.json();
        }).then(data=>
            {
                this.time.total = data.gameTime;
                this.currentStats = {...this.currentStats, ...data};
            }
        )
    }

    pushStats = () => {
        if (this.currentStats){
            api.request(`/stats/${appSettings.id}`,"PUT",this.currentStats).then(() =>{
                console.log("stats sent");
            }).catch(e=>{
                console.log(e)
            });
        }
    }

    loop = () => {
        this.pushTimeout = setTimeout(this.loop,60000);
    }
    get defaultStats(){return defaultValues}
}
export const statsService = new StatsService();