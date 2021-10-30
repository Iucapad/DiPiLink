
import { socket, carSettings } from './clientService';

export class ControlsConnector {
  constructor() {
    this.active = false;
    this.socket = undefined;
    this.timeout = undefined;
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.max = carSettings.getMaxSpeed();
    this.clock = 5000;
  };
  get isActive() { return this.active };
  setActive = b => this.active = b;
  updateSettings = () => {
    this.max = carSettings.getMaxSpeed();
  };
  loop = () => {
    this.clock === 5000 && ( this.clock = 150 );
    this.sendData();
    this.timeout = setTimeout(this.loop, this.clock);
  };
  sendData = () => {
      try {
        this.socket.send( JSON.stringify({ x: this.x, y: this.y, speed: this.speed * this.max }) );
      } catch {
        !this.socket && ( this.socket = socket.get() );
      };
  };
  updateCommand = ((x, y, speed) => {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.clock === 5000 && this.loop();
  });
  reset = () => {
    try {
      this.angle = 0;
      this.speed = 0;
      this.clock = 5000;
      clearTimeout(this.timeout);
      this.socket.send( JSON.stringify({ x: 0, y: 0, speed: 0}) );
    } catch {
      !this.socket && ( this.socket = socket.get() );
    };
  };
};

export const controls = new ControlsConnector();