#define SENSOR_PIN 18 // ESP32 pin GPIO18 connected to OUT pin of IR obstacle avoidance sensor
#include <WiFi.h>
 
const char* ssid = "Laxmipg4";
const char* password =  "123456789";
 
const uint16_t port = 8090;
const char * host = "192.168.0.104";

void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(115200);
  // initialize the Arduino's pin as aninput
  pinMode(SENSOR_PIN, INPUT);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("...");
  }
 
  Serial.print("WiFi connected with IP: ");
  Serial.println(WiFi.localIP());
 
}

void loop() 
{
  WiFiClient client;

  if (!client.connect(host, port)) {
 
        Serial.println("Connection to host failed");
 
        delay(1000);
        return;
    }

  Serial.println("Connected to server successful!");
  
  // read the state of the the input pin:
  int state = digitalRead(SENSOR_PIN);

  if (state == HIGH)
  {
    Serial.println("The obstacle is present");
    client.print("1");
  }
  
  else
  {
    Serial.println("The obstacle is NOT present");
    client.print("0");
  }

  delay(100);
}
