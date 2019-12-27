# Hybrid Chat Application

Arduino Distitributed Chat is a web application, that is enabling the communication between users via chat.

## Table of Contents

[Description](#description)

[Technologies](#technologies)

[Getting Started](#getting-started)

[Executing](#executing)

[Screenshots](#screenshots)

[License](#license)

## Description

The whole infrastructure consists of the web application, that every user should have and the web server that is an Arduino based microcontroller. Microcontroller is publishing every message, that it receives. 

Main benefits are involving:
1. Low power consumption
2. Easy meantence of web server
3. Low cost infrastructure

Maximum length of ID is 4 characters: LI
Maximum length of username is 8 characters: LU
Maximum length of message is 35 characters: LM
Seperators(~) ammount is 3 characters: SA
Maximum length of message = LI + LU + LM + SA = 50 characters

## Technologies

1.	MQTT Broker: broker.hivemq.com, Port: 1883
2.	Microcontroller: ESP8266
3.	Web Application: HTML, CSS, Javascript, MQTT Paho Library, Bootstrap Library
4.	Arduino IDE (PubSubClient Library for MQTT connection)

## Getting Started

### Download the Source of Project

Download repository code from:

``` https://github.com/georgealexakis/hybrid-chat-application.git (master branch) ```

Or get a copy of the source from:

``` $ git clone https://github.com/georgealexakis/hybrid-chat-application.git (master branch) ```

Run:

``` npm install ```

to install dependencies.

## Executing

In your browser, open the file:

    /www/index.html

Or

* Build the Hybrid Applications for different devices using Apache Cordova, Adode Phonegab for mobile devices.

### Usage Information

The user opens the application as a web page and does the following steps:

1. Enter the name.
2. Then press the login button (last from right).
3. The status becomes Online.
4. Text input is activated.
5. Enter text and press the send button.
6. The sender also sends the message when the sender has sent it. So he is sure he was sent.

### Future Development

Usage of multiple microcontrollers, which will be synchronized with each other in case one switches off when the next one is ready. Also share tasks and cache user statuses.

## Screenshots

### Communication of 3 Users

![screen1](screenshots/screen1.png)

![screen2](screenshots/screen2.png)

![screen3](screenshots/screen3.png)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


