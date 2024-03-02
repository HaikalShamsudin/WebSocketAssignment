var ws, ws2; //this declare the variable for websocket 1 and websocket 2. (user 1 and user 2)

function setConnected (connected) { //this function is for user 1
    document.getElementById('connect').disabled = connected;
    document.getElementById('disconnect').disabled = !connected;
    document.getElementById('send').disabled = !connected;
}

function connect() { //this function also for user 1. 
    var username = document.getElementById("username").value;
    var host = document.location.host;
    ws = new WebSocket("ws://" + host + "/chat/" + username);

    //this function, using in connect function only. Because we only passing the string name.

    //OnOpen function in websocket EndPoint
    ws.onopen = function () { //This line assigns an anonymous function to the onopen event of the WebSocket (ws). The function will be executed when the WebSocket connection is successfully opened.
        setConnected(true); //Calls the setConnected function with true as an argument. This function presumably updates the UI to indicate that the WebSocket connection is established.
        log.innerHTML += "You are online" + "\n"; //Modifies the content of the log textarea by appending the string "You are online" followed by a newline character ("\n"). This line informs the user that they are online and the message is displayed in the log.
        log2.innerHTML += username + " is online" + "\n"; //Modifies the content of the log2 textarea by appending a message indicating that the specified username is online. This is presumably intended for a second user's log.
        autoScroll();//Calls the autoScroll function (not provided in the code snippet). This function likely ensures that the chat log textareas automatically scroll to the bottom to display the most recent messages.
    }

    ws.onmessage = function (event) {
        console.log(event);
        var message = event.data;
        log.innerHTML += message + "\n";
        log2.innerHTML += message + "\n";
        autoScroll();
    }

    ws.onclose = function () {
        setConnected(false);
        log.innerHTML += "You are offline" + "\n";
        log2.innerHTML += username + " is offline" + "\n";
        autoScroll();
    };
}

function disconnect() {
    if (ws != null) {
        ws.close();
        ws = null;
    }
    setConnected(false);
}

function send() {
    if (ws != null) {
        var content = document.getElementById("msg").value;
        ws.send(content);
    } else {
        alert('WebSocket connection not established, please connect.');
    }
}

function setConnected2(connected) {  //this is for 2nd user
    document.getElementById('connect2').disabled = connected;
    document.getElementById('disconnect2').disabled = !connected;
    document.getElementById('send2').disabled = !connected;
}

function connect2() { 
    var username = document.getElementById("username2").value;
    var host = document.location.host;
    ws2 = new WebSocket("ws://" + host + "/chat/" + username);

    ws2.onopen = function () {
        setConnected2(true);
        log2.innerHTML += "You are online" + "\n";
        log.innerHTML += username + " is online" + "\n";
        autoScroll();
    };
    ws2.onmessage = function (event) {
        console.log(event);
        var message = event.data;
        log.innerHTML += message + "\n";
        log2.innerHTML += message + "\n";
        autoScroll();
    }
    ws2.onclose = function () {
        setConnected2(false);
        log2.innerHTML += "You are offline" + "\n";
        log.innerHTML += username + " is offline" + "\n";
        autoScroll();
    };
}

function disconnect2() {
    if (ws2 != null) {
        ws2.close();
        ws2 = null;
    }
    setConnected2(false);
}

function send2() {
    if (ws2 != null) {
        var content = document.getElementById("msg2").value;
        ws2.send(content);
    } else {
        alert('WebSocket connection not established, please connect.');
    }
}

// Get the textarea element
var textarea = document.getElementById('log');
var textarea2 = document.getElementById('log2');

// Function to auto-scroll the textarea
function autoScroll() {
  // Set the scrollTop property to the maximum height to auto-scroll
  textarea.scrollTop = textarea.scrollHeight;
  textarea2.scrollTop = textarea2.scrollHeight;
}