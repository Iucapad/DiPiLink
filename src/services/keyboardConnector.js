import { controls } from './controlsConnector';
import { appSettings } from './clientService';

const direction = {
  up: [0, 255],
  down: [0, -255],
  right: [255, 0],
  left: [-255, 0]
}
const state = {
  up: [0, 0],
  down: [0, 0],
  right: [0, 0],
  left: [0, 0]
}
const keys = appSettings.getAppValue("kbLayout");
function getKeyByValue(object, value){
  return Object.keys(object).find(key => object[key].code === value);
}

class KeyboardConnector {
    constructor(){
      this.isActive = false;
      this.initialize();
    }

    set active(b) {
      b ? this.initialize() : this.removeEvents();
      this.isActive = b;
    }
    initialize = () => {
      window.addEventListener("keydown", this.kbEventDown, { capture: true });
      window.addEventListener("keyup", this.kbEventUp, { capture: true });
    }
    removeEvents = () => {
      window.removeEventListener("keydown", this.kbEventDown, { capture:true });
      window.removeEventListener("keyup", this.kbEventUp, { capture:true });
    }
    kbEventDown = e => {
      const k = getKeyByValue(keys, e.code);
      if (!keys[k]) return;
      e.preventDefault();
      if (controls.isActive) {
        state[k] = direction[k];
        return this.readData();
      }
    }
    kbEventUp = e => {
      const k = getKeyByValue(keys,e.code);
      if (!keys[k]) return;
      state[k] = [0, 0];
      e.preventDefault();
      if (controls.isActive) {
        state[k] = [0, 0];
        return this.readData();
      }
    }
    readData = () => {
      const x = state.right[0] + state.left[0];
      const y = state.up[1] + state.down[1];
      try {
        controls.updateCommand(x, -y, 255);
      } catch {
        
      }
    }
    setEvent = gp => {
      /*
      TODO NAVIGATION EVENTS
      */
    }
  }
export const kbconnector = new KeyboardConnector();