import {appSettings} from './clientService';
export const colors = [
  {accent10:"#E4D9F3",accent30:"#B1CEE5",accent80:"#1A7199",accent:"#1E4593",accenttrans:"#1E459370",backdrop:"#EEF5F390",name:"Surf"},
  {accent10:"#B0C7BC",accent30:"#5DD69B",accent80:"#0EA272",accent:"#085D41",accenttrans:"#085D4170",backdrop:"#F8FDE190",name:"Mint"},
  {accent10:"#DD935B",accent30:"#AA764B",accent80:"#765949",accent:"#50382F",accenttrans:"#50382F70",backdrop:"#E0E8EF90",name:"Rust"},
  {accent10:"#EBE1F9",accent30:"#E7CEF1",accent80:"#C38BDF",accent:"#6E4897",accenttrans:"#6E489770",backdrop:"#EEF8F790",name:"Lilac"},
  {accent10:"#90639E",accent30:"#8D7BB0",accent80:"#273473",accent:"#172858",accenttrans:"#17285870",backdrop:"#F7F8E890",name:"Musa"},
  {accent10:"#F77EDB",accent30:"#Ef7AD4",accent80:"#E31677",accent:"#491212",accenttrans:"#49121270",backdrop:"#F9E2E290",name:"Pop"},
  {accent10:"#FAE8A6",accent30:"#F8DE7E",accent80:"#D9C142",accent:"#6F5100",accenttrans:"#6F510070",backdrop:"#FFE1D090",name:"Royal"},
  {accent10:"#2BACBF",accent30:"#E3CE95",accent80:"#EEB159",accent:"#2B586F",accenttrans:"#2B586F70",backdrop:"#EBF8FF90",name:"Dune"},
  {accent10:"#CFC98D",accent30:"#A29970",accent80:"#5D7949",accent:"#44672D",accenttrans:"#44672D70",backdrop:"#E4F7FD90",name:"Caterpillar"},
  {accent10:"#1A7483",accent30:"#228D96",accent80:"#0E3C59",accent:"#0D294D",accenttrans:"#0D294D70",backdrop:"#EDF9FD90",name:"Submarine"}
];
export const setColor = v => {
  appSettings.setValue("theme", v);
  applyColor();
}
export const getColor = () => appSettings.getValue("theme") || 0;
export const applyColor = () => {
  let value = colors[getColor()];
  let root = window.document.documentElement;
  root.style.setProperty('--backdrop',value.backdrop);
  root.style.setProperty('--accent-color', value.accent);
  root.style.setProperty('--accent-trans', value.accenttrans);
  root.style.setProperty('--accent-soft', value.accent80);
  root.style.setProperty('--gradient-80', value.accent);
  root.style.setProperty('--gradient-30', value.accent30);
  root.style.setProperty('--gradient-10', value.accent10);
  }