/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

//// For testing purposes
//var output = document.getElementById("output");
//websocket.onopen = function(evt) { onOpen(evt); };
//
//function writeToScreen(message) {
//    output.innerHTML += message + "<br>";
//}
//
//function onOpen() {
//    writeToScreen("Connected to " + wsUri);
//}
//// End test functions

var wsUri = "ws://" + document.location.host + document.location.pathname + "whiteboardendpoint";
var websocket = new WebSocket(wsUri);

websocket.onerror = function(evt) { onError(evt); };
websocket.binaryType = "arraybuffer";

function onError(evt) {
    logMethodAndTime("javascript: onError");
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

websocket.onmessage = function(evt) { onMessage(evt); };

function sendText(json) {
    logMethodAndTime("javascript: sendText");
    console.log("sending text: " + json);
    websocket.send(json);
}

function onMessage(evt) {
    logMethodAndTime("javascript: onMessage");
    console.log("received: " + evt.data);
    if (typeof evt.data === "string") {
        drawImageText(evt.data);
    } else {
        drawImageBinary(evt.data);
    }
}

function sendBinary(bytes) {
    logMethodAndTime("javascript: sendBinary");
    console.log("sending binary: " + Object.prototype.toString.call(bytes));
    websocket.send(bytes);
}

function logMethodAndTime(methodName){
    logMethodAndTime("javascript: defineImageBinary");
    var current = new Date();
    console.log(
            methodName + " - " +
            current.getHours() + ":" +
            current.getMinutes() + ":" +
            current.getSeconds() + ":" +
            current.getMilliseconds()
            );
}