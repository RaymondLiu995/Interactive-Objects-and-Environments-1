#define button 4

int button_state = 0;
int light_sensor = A3;
int sound_sensor = A2;
int sensors[3];

void setup() {
   // start serial port at 9600 bps:
   Serial.begin(9600);
   pinMode(button, INPUT);
   // pinMode(potentiometer,INPUT);
   
}
 
void loop() {
 // this example uses sensors with a different ranges
 //use the map() method to convert the range 

    //read the number from the button sensor and put the value 
    //into the first index of the Array, repeat for all indexes of the Array
    
    button_state = digitalRead(button);
    sensors[0] = button_state;
    
    int raw_sound = analogRead(sound_sensor);
    int sound = map(raw_sound, 0, 1023, 0, 100);
    
    sensors[1] = sound;
    
    int raw_light = analogRead(light_sensor);
    int light = map(raw_light, 0, 1023, 0, 100);
    
    sensors[2] = light;

    
    if (button_state == HIGH){
        
      }


    
    for (int thisSensor = 0; thisSensor < 3; thisSensor++) {

        int sensorValue = sensors[thisSensor];
      
      // if you're on the last sensor value, end with a println()
      // otherwise, print a comma
      //The number of sensors needs to be hard coded, in this example 3 sensors are running 0,1,2
      
      Serial.print(sensorValue);
      if (thisSensor == 2) {
         Serial.println();
      } else {
         Serial.print(",");
      }
   }
    delay(100);              
}
