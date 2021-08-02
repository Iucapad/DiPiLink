import {controls} from './controlsConnector';

class GamepadConnector {
    constructor(){
      this.isActive=false;
      this.timeout=undefined;
      this.clock=2000;
    }
    
    set active(b){
      this.isActive = b;
      this.index = undefined;
      if (b){
        const gp = this.gp.find(e=>e!==null && e.mapping==="standard");
        if (gp) this.index = gp.index;
      }
      this.loop();
      this.clock=2000;
      controls.reset();
    }

    get gp(){return navigator.getGamepads ? Object.values(navigator.getGamepads()) : [];}
    loop = () => {
      const lg=this.gp;
      //console.log('loop1',lg[0],lg[1],lg[2],lg[3])
      //DEBUG
      const gp = lg[this.index]
;      if (!gp) this.clock=2000;
      else {
        if (controls.isActive) this.readData(gp);
        this.setEvent(gp);
      }
      this.timeout=setTimeout(this.loop,this.clock);
    }
    readData = gp => {
      if (this.clock===2000) this.clock=125;
      try{
        const coef = gp.buttons[7].value-gp.buttons[6].value;
        const x = gp.axes[0].toFixed(1)*255;
        const y = Math.abs(gp.axes[1]).toFixed(1)*255;
        controls.updateCommand(x,(y>0)?-coef*y:-coef*255,Math.abs(coef)*255);
      }
      catch{
        
      }
    }
    setEvent = gp => {
      const keys = [0,4,5];
      keys.forEach((i)=>{
        if (gp.buttons[i].pressed){
          this.clock=200;
          document.dispatchEvent(new CustomEvent('gpInput',{detail:i}));
        }
      });
    }
  }
export const gpconnector = new GamepadConnector();