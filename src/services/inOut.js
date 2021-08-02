var inputType="default";

export function setInput(type){
    if (inputType!==type) inputType=type;
}
export function getInput(){
    return inputType;
}
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
    var evt = new MouseEvent("click", {
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
