import eventEmitter from "./event-emitter";
function loading(mode) {
  eventEmitter.emit("loading", mode);
}
function snackbarMsg(msg = undefined) {
  eventEmitter.emit("snackbar", msg);
}

function generateRandomColor(){
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.random() * maxVal; 
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);   
  return `#${randColor.toUpperCase()}`
}
function addOpacityToHexColor(color, opacity) {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
export { loading, snackbarMsg, generateRandomColor, addOpacityToHexColor };
