/* 
Javascript code below
Initialization of the main variables, which are necessary for the whole operation of the system.
Initialization of picture variables, which are used for users icons.
*/
var mqtt;
var reconnectTimeout = 2000;
var host = "broker.hivemq.com"
var port = 8000;
var connectButton = 0;
var subscribeTopic = "chat-arduino-web-server";
var publishTopic = "chat-client";
var userID = "";
var serverIDs = new Array();
var serverTime = Date.now();
var randomPicture = 0;
var pictureArray = {
    1: "data:image/png;base64,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",
    2: "data:image/png;base64,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",
    3: "data:image/png;base64,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",
    4: "data:image/png;base64,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"
};
/* 
connectToServer() function is triggering when a user is pressing the button to connect to the broker.
There are three states of the button, which are describing below:
1. Connect state
2. Disconnect state
3. Reconnect state (when the connection status is in error connection mode)
 */
function connectToServer() {
    randomPicture = Math.floor(Math.random() * 5);
    while (randomPicture < 1 || randomPicture > 4) {
        randomPicture = Math.floor(Math.random() * 5);
    }
    if (connectButton == 0) {
        MQTTconnect();
        connectButton++;
    } else if (connectButton == 3) {
        reconnect();
        connectButton = 1;
    } else {
        document.getElementById("username").innerHTML = "";
        document.getElementById("name").disabled = false;
        document.getElementById("b1").disabled = true;
        document.getElementById("message").disabled = true;
        document.getElementById("name").value = "";
        document.getElementById("console").innerHTML = "Disconnected";
        disconnect();
        connectButton = 0;
    }
}
/* 
disconnect() and onFailure() function operate the disconnect of the broker and the second catches fail states.
 */
function disconnect() {
    this.mqtt.disconnect();
}
function onFailure(message) {
    var connection = "Connection Attempt to Host " + host + " failed.";
    document.getElementById("console").innerHTML = connection;
    setTimeout(MQTTconnect, reconnectTimeout);
}
/* 
onMessageArrived() function is handling the arriving messages. It separates username from messages and
then it displays the messages per case (personal messages, other messages).
 */
function onMessageArrived(msg) {
    var date = new Date();
    var time = " at " + date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    var receivedMessage = msg.payloadString;
    var seperation = receivedMessage.split("~");
    if (seperation[0] == "aw") {
        checkServerStates(seperation[1]);
        document.getElementById("arduinoConsole").innerHTML = "Arduino~" + seperation[1] + " " + seperation[2] + " " + time;
    } else {
        if (userID == seperation[0] + "~" + seperation[1]) {
            addPersonalMessage(seperation[0] + "~" + seperation[1], seperation[2], time);
        } else {
            addNewMessage(seperation[0] + "~" + seperation[1], seperation[2], time);
        }
    }
}
/* 
onConnect() function starts the connection with the broker when everything is ready. 
 */
function onConnect() {
    document.getElementById("console").innerHTML = "Connected.";
    mqtt.subscribe(subscribeTopic);
    document.getElementById("b1").disabled = false;
    document.getElementById("message").disabled = false;
    document.getElementById("message").value = "";
}
/* 
publishMessage() function publishes messages to the broker. 
 */
function publishMessage() {
    var date = new Date();
    var publishMessage = userID + "~" + document.getElementById("message").value + "~";
    message = new Paho.MQTT.Message(publishMessage);
    message.destinationName = publishTopic;
    mqtt.send(message);
    document.getElementById("message").value = "";
}
/* 
MQTTconnect() function initializes the MQTT connection.
 */
function MQTTconnect() {
    var connection = "Connecting to " + host + " " + port + ".";
    var randomID = Math.floor(Math.random() * 10000);
    document.getElementById("console").innerHTML = connection;
    userID = document.getElementById("name").value + "~" + randomID;
    document.getElementById("username").innerHTML = userID;
    document.getElementById("name").disabled = true;
    mqtt = new Paho.MQTT.Client(host, port, userID);
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onConnectionLost;
    var options = {
        useSSL: false,
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure
    };
    mqtt.connect(options);
}
/* 
onConnectionLost() function runs when the connection is lost and disable the inputs and buttons.
 */
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        var error = "Connection Lost: " + responseObject.errorMessage;
        document.getElementById("console").innerHTML = error;
        document.getElementById("b1").disabled = true;
        document.getElementById("message").disabled = true;
        document.getElementById("message").value = "";
        connectButton = 3;
    }
}
/* 
reconnect() function reconnects the system with the broker.
 */
function reconnect() {
    mqtt = new Paho.MQTT.Client(host, port, userID);
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onConnectionLost;
    var newOptions = {
        useSSL: false,
        timeout: 3,
        onSuccess: onConnect,
        onFailure: onFailure
    };
    mqtt.connect(newOptions);
}
/* 
addPersonalMessage(), addNewMessage(), removeMessages() functions add/remove the incoming messages.
 */
function addPersonalMessage(x, y, z) {
    var newpList = document.getElementById("myList");
    newpList.insertAdjacentHTML("beforeend", "<li style='margin-left:-50px!important'><div class='row comments mb-2'><div class='col-md-2 offset-md-2 col-sm-2 offset-sm-2 col-3 offset-1 text-center user-img'><img id='profile-photo' src='" + pictureArray[randomPicture] + "' class='rounded-circle' /></div><div class='col-md-7 col-sm-7 col-8 comment rounded mb-2'><h4 class='m-0'><a href='#'><span>" + x + "</span></a></h4><time class='text-white ml-3'>" + z + "</time><p class='mb-0 text-white'>" + y + "</p></div></div></li>");
}
function addNewMessage(x, y, z) {
    var guestPicture = Math.floor(Math.random() * 5);
    while (guestPicture < 1 || guestPicture > 4) {
        guestPicture = Math.floor(Math.random() * 5);
    }
    var newList = document.getElementById("myList");
    newList.insertAdjacentHTML("beforeend", "<li><div class='row comments mb-2'><div class='col-md-2 offset-md-2 col-sm-2 offset-sm-2 col-3 offset-1 text-center user-img'><img id='profile-photo' src='" + pictureArray[guestPicture] + "' class='rounded-circle' /></div><div class='col-md-7 col-sm-7 col-8 comment rounded mb-2'><h4 class='m-0'><a href='#'>" + x + "</a></h4><time class='text-white ml-3'>" + z + "</time><p class='mb-0 text-white'>" + y + "</p></div></div></li>");
}
function removeMessages() {
    var list = document.getElementById("myList");
    list.removeChild(list.childNodes[0]);
}
/*
Server distribution: This function chooses which server is going to serve the application (Demo only)
*/
window.setInterval(function () {
    var time = Math.floor((Date.now() - serverTime) / 1000);
    if (time > 50) {
        document.getElementById("arduinoConsole").innerHTML = "No server is available.";
        serverIDs = new Array();
    }
}, 1000);
function checkServerStates(id) {
    var exist = false;
    var enabled = false;
    var removedID;
    var counter = -1;
    var time = Math.floor((Date.now() - serverTime) / 1000);
    for (var i = 0; i < Object.keys(serverIDs).length; i++) {
        if (serverIDs[i][0].includes(id)) {
            if (serverIDs[i][1]) {
                serverTime = Date.now();
            } else {
                if (time > 20) {
                    counter = i;
                    serverIDs[i][1] = 1;
                    serverTime = Date.now();
                }
            }
            exist = true;
        }
        if (serverIDs[i][1]) {
            enabled = 1;
        }
    }
    if (time > 20 && exist) {
        for (var i = 0; i < Object.keys(serverIDs).length; i++) {
            if (i != counter) {
                serverIDs[i][1] = 0;
            }
        }
    }
    if (exist == false) {
        if (enabled == true) {
            serverIDs.push({ 0: id, 1: 0 });
        } else {
            serverIDs.push({ 0: id, 1: 1 });
            serverTime = Date.now();
        }
    }
    console.log("Server: " + id + " Time: " + time);
    console.log(serverIDs);
}