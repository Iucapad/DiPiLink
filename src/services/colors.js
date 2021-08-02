import {appSettings} from './clientService';
export const colors = [
  {accent10:"#E4D9F3",accent30:"#B1CEE5",accent80:"#1A7199",accent:"#1E4593",backdrop:"#EEF5F390",name:"Surf"},
  {accent10:"#B0C7BC",accent30:"#5DD69B",accent80:"#0EA272",accent:"#085D41",backdrop:"#F8FDE190",name:"Mint"},
  {accent10:"#DD935B",accent30:"#AA764B",accent80:"#765949",accent:"#50382F",backdrop:"#E0E8EF90",name:"Rust"},
  {accent10:"#EBE1F9",accent30:"#E7CEF1",accent80:"#C38BDF",accent:"#6E4897",backdrop:"#EEF8F790",name:"Lilac"},
  {accent10:"#90639E",accent30:"#8D7BB0",accent80:"#273473",accent:"#172858",backdrop:"#F7F8E890",name:"Musa"},
  {accent10:"#F77EDB",accent30:"#Ef7AD4",accent80:"#E31677",accent:"#491212",backdrop:"#F9E2E290",name:"Pop"},
  {accent10:"#FAE8A6",accent30:"#F8DE7E",accent80:"#D9C142",accent:"#6F5100",backdrop:"#FFE1D090",name:"Royal"},
  {accent10:"#2BACBF",accent30:"#E3CE95",accent80:"#EEB159",accent:"#2B586F",backdrop:"#EBF8FF90",name:"Dune"},
  {accent10:"#CFC98D",accent30:"#A29970",accent80:"#5D7949",accent:"#44672D",backdrop:"#E4F7FD90",name:"Caterpillar"},
  {accent10:"#1A7483",accent30:"#228D96",accent80:"#0E3C59",accent:"#0D294D",backdrop:"#EDF9FD90",name:"Submarine"}
];
export function setColor(v){
  appSettings.setValue("theme",v);
  applyColor();
}
export function getColor(){
    const v = appSettings.getValue("theme");
    return v?v:0;
}
export function applyColor(){
  let value = colors[getColor()];
  let root = window.document.documentElement;
  root.style.setProperty('--backdrop',value.backdrop);
  root.style.setProperty('--accent-color', value.accent);
  root.style.setProperty('--accent-soft', value.accent80);
  root.style.setProperty('--gradient-80', value.accent);
  root.style.setProperty('--gradient-30', value.accent30);
  root.style.setProperty('--gradient-10', value.accent10);
  }