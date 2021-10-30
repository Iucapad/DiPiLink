var inputType = "default";

export const setInput = type => {
    inputType !== type && (inputType = type);
}
export const getInput = () => inputType;
export function keyPressed(code){
    if(["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Enter"].includes(code)){
        if (code==="ArrowUp"){
            Up(document.activeElement);
        }
        else if (code==="ArrowDown"){
            Down(document.activeElement);
        }
        else if (code==="ArrowLeft"){
            Left(document.activeElement);
        }
        else if (code==="ArrowRight"){
            Right(document.activeElement);
        }
        else if (code==="Enter"){
            clickPress(document.activeElement);
        }
    }
}
function clickPress(elem) {
    const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });
    elem.dispatchEvent(evt);
};
function Up(src){
    console.log(src);
}
function Down(src){
    console.log(src);
}
function Left(src){
    console.log(src);
}
function Right(src){
    console.log(src);
}
