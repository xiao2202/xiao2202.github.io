/*
A Web Bluetooth connection and write example

Uses the Web Bluetooth API to make Bluetooth connections 
to a plain JavaScript page. 

This script works with the ArduinoBLE library example called LED: 
https://github.com/arduino-libraries/ArduinoBLE/tree/master/examples/Peripheral/LED

Library documentation:
https://www.arduino.cc/en/Reference/ArduinoBLE

created 26 Feb 2021 
by Tom Igoe
*/

// advertised service UUID of the  to search for:
const serviceUuid = '19b10000-e8f2-537e-4f6c-d104768a1214';
// DOM elements to interact with:
let connectButton;
let dataDiv;
let deviceDiv;
let ledButton;
// TODO these could be one JSON object representing the device
// and its services and characteristics:
let myDevice;
let myCharacteristic;


// this function is called when the page is loaded. 
// event listener functions are initialized here:
function setup() {
  // put the DOM elements into global variables:
  connectButton = document.getElementById('connect');
  connectButton.addEventListener('click', connectToBle);
  ledButton = document.getElementById('writeButton');
  ledButton.addEventListener('click', writeToCharacteristic);
  deviceDiv = document.getElementById('device');
  dataDiv = document.getElementById('data');
}

// connect to the peripheral:
function connectToBle() {
  // options let you filter for a peripheral 
  // with a particular service UUID:
  let options = {
    filters: [{
      services: [serviceUuid]
    }]
  };
  // start scanning:
  navigator.bluetooth.requestDevice(options)
    // when you get a device:
    .then(device => {
      myDevice = device;
      deviceDiv.innerHTML = "Device name: " + device.name;
      deviceDiv.innerHTML += "<br>Service UUID: " + serviceUuid;
      return device.gatt.connect();
    })
    // get the primary service:
    .then(server => server.getPrimaryService(serviceUuid))
    .then(service => service.getCharacteristics())
    // get the characteristics of the service:
    .then(characteristics => readCharacteristics(characteristics))
    // if there's an error:
    .catch(error => console.log('Connection failed!', error));

  function readCharacteristics(characteristics) {
    // add the characterisitic UUID to the device div:
    deviceDiv.innerHTML += "<br>characteristic UUID: " + characteristics[0].uuid;
    myCharacteristic = characteristics[0];
    // Get the initial value:
    characteristics[0].readValue()
      .then(data => {
        let ledState = data.getUint8(0);
        ledButton.checked = ledState;
      });
  }
}

//floor round a number down to an integer
//math.random gives a random number between 0 and 1


function getRandomInt(max) {
  return Math.floor(Math.random() * max);

}


// write to a characteristic:
function writeToCharacteristic(event) {
  // LED state is whether or not the button is checked:
  //let ledState = event.target.checked;

  //changed checked to value
  let ledState = event.target.value;

  //set the textField to empty after press the button
  document.getElementById("textField").value = "";
  // store what user type in the textField into a variable
  var textInput = document.getElementById("textField").value
  //reply a message after press the button
  var div = document.getElementById("reply");
  //set reply field to empty after press the button (NOT WORKING)
  //document.getElementById("reply").value = "";

  //div.innerHTML += "<br>" +  textInput;
  //console.log(textInput);

  var delayInMilliseconds = 21000; //22 second

  let response = ["Hello from Earth!",
                  "Wanna get Starbucks later?",
                  "Sending you a virtual hug. I hope you can feel it.",
                  "Our song just came on the radio. Miss you!",
                  "Just wanted to say hello.",
                  "I wish you were here. Everybody else sucks.",
                  "Reading your text just made my day.",
                  "You are the best.",
                  "You are the best friend I’ve ever had.", 
                  "I will see you tonight at eight.",
                  "It is not so easy as you think.",
                  "We have got bigger problems to deal with.",
                  "I am crying.",
                  "Toothpaste will help keep your teeth clean.",
                  "I like veggies too.",
                  "I do love my new pets.",
                  "Spring is the prettiest season.",
                  "They do not go to school tomorrow.",
                  "Come on down!",
                  "Remember to eat on time!",
                  "How is your life out there?",
                  "I have been waiting for you for really long time!",
                  "You are not alone!",
                  "What is your name??",
                  "Do you see the stars?",
                  "I heard you graduated. Congrats!",
                  "Hey! Just wondering what your life is like these days. I’d love to catch up.",
                  "How has it been three months already!?",
                  "Things are looking stressful back at home. Just wanted to make sure you're OK.",
                  "I totally ghosted you and I’m sorry for that... ",
                  "An alien abducted me but now I'm back. How are you?",
                  "Could we talk or catch up soon?",
                  "Remember when we pulled that all-nighter in college?",
                  "Ugh, I'm so bad at responding",
                  "Happy birthday! Let's not let another year go by without talking.",
                  "“Want to meet up for my birthday this weekend?",
                  "Can you believe it’s been 10 years since we landed at Proxima Centauri b?",
                  "Wow, things are overwhelming right now, how’s your stress level these days?",

                 ];

  //delay the message that the user sent
  setTimeout(function() {
  //+= append message next to each other
    div.innerHTML += "<br>"+ response[getRandomInt(response.length)] + "<br>";
  }, delayInMilliseconds);
  
  // if you're connected, write to the peripheral:
  if (myDevice && myDevice.gatt.connected) {
    // convert to an ArrayBufferView:
    let valueToSend = Uint8Array.of(ledState);
    // write to characteristic now:
    myCharacteristic.writeValue(valueToSend);
  }
}

// This is a listener for the page to load.
// This is the command that actually starts the script:
window.addEventListener('DOMContentLoaded', setup);
