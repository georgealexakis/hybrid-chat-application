// ESP library and MQTT library
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// Broker URI & gloabl variables
const char* mqtt_server = "broker.hivemq.com";
WiFiClient espClient;
PubSubClient client(espClient);

// Define constant variables
#define WIFI_SSID "DESKTOP-L1LENBR 9276"
#define WIFI_PASSWORD "5m7K05^1"
#define SERVER_NAME "aw~"
#define CONNECT_MESSAGE "~connected~"
#define RUNNING_MESSAGE "~is running~"
#define ERROR_MESSAGE "~full buffer~"

// MQTT name and ID
int serverId;
String clientId = SERVER_NAME;

// MQTT subscribe and publish topics
#define MQTTTopic "chat-client"
#define MQTTOutTopic "chat-arduino-web-server"

// WIFI connection set up
void setupWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  checkNetworkConnection();
}

// WIFI connection inspection
void checkNetworkConnection() {
  while (WiFi.status() != WL_CONNECTED) {
    digitalWrite(LED_BUILTIN, LOW);
    delay(250);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(250);
    digitalWrite(LED_BUILTIN, LOW);
  }
  digitalWrite(LED_BUILTIN, HIGH);
}

// MQTT recconect function after disconnect
void reconnect() {
  while (!client.connected()) {
    if (client.connect(clientId.c_str())) {
      client.subscribe(MQTTTopic);
      String pubMsg = clientId;
      pubMsg.concat(CONNECT_MESSAGE);
      client.publish(MQTTOutTopic, pubMsg.c_str());
      digitalWrite(LED_BUILTIN, HIGH);
    } else {
      digitalWrite(LED_BUILTIN, LOW);
      delay(5000);
    }
  }
}

// MQTT connection inspection
void checkMQTTConnection() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  Serial.begin(115200);
  setupWifi();
  serverId = random(0xffff);
  clientId += String(serverId, HEX);
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

// Initialization of variables
long lastMsg = 0;
long lastState = 0;
long lastArduinoState = 0;
char msg[50];
char msgsTemp[50][50];
int counterHistory = 0;
int counter = 0;
int error = 0;
String currentServer = "";

void loop() {
  checkNetworkConnection();
  checkMQTTConnection();
  syncServer();

  // Microcontroller timer
  long now = millis();

  publishIncomingMessage(now);
  sendRunningMessage(now);
  sendErrorMessage(now);
}

// Publish incoming messages every 500 milliseconds
void publishIncomingMessage(int now) {
  if (now - lastMsg > 500) {
    lastMsg = now;
    if (counter > counterHistory && counterHistory < 50) {
      snprintf (msg, 50, "%s", msgsTemp[counterHistory]);
      Serial.print("Published message: ");
      Serial.print(msg);
      Serial.println();
      client.publish(MQTTOutTopic, msg);
      counterHistory++;
    } else {
      counter = 0;
      counterHistory = 0;
    }
    if (error) {
      String pubMsg = clientId;
      pubMsg.concat(ERROR_MESSAGE);
      client.publish(MQTTOutTopic, pubMsg.c_str());
      error = 0;
    }
    Serial.println("");
  }
}

// Send running message when everything is normal
void sendRunningMessage(int now) {
  if (now - lastState > 15000) {
    lastState = now;
    String pubMsg = clientId;
    pubMsg.concat(RUNNING_MESSAGE);
    client.publish(MQTTOutTopic, pubMsg.c_str());
  }
}

// Send error message when there ia any error
void sendErrorMessage(int now) {
  if (now - lastArduinoState > 7000) {
    lastArduinoState = now;
    String ardSt = String(0xf3, HEX);
    ardSt.concat(String(serverId, HEX));
    client.publish(MQTTTopic, ardSt.c_str());
  }
}

void syncServer() {
  // Staff to do
}

// Handle incoming messages
void callback(char* topic, byte* payload, unsigned int length) {
  if ((char)payload[0] == 'f' && (char)payload[1] == '3') {
    String tempId = "";
    for (int i = 2; i < length; i++) {
      tempId += (char)payload[i];
    }
    if (strcmp(tempId.c_str(), String(serverId, HEX).c_str()) == 0) {
      Serial.println(tempId);
      Serial.println(clientId);
      Serial.println(String(serverId, HEX));
    }
  } else if (counter < 50) {
    for (int i = 0; i < length; i++) {
      msgsTemp[counter][i] = (char)payload[i];
    }
    Serial.print("Received message: ");
    Serial.print(msgsTemp[counter]);
    Serial.println();
    counter++;
  }
  else {
    error = 1;
    Serial.println("Web server has stopped to accept messages due to overload.");
  }
}
