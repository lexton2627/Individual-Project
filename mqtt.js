const mqtt = require('mqtt');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://LachlanJE:Echole123@cluster0.ico6z.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });
const randomCoordinates = require('random-coordinates');
const Device = require('./models/device');
const app = express();

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const arudinoport = new SerialPort('/dev/cu.usbmodem14401', { baudRate: 9600 });
const parser = arudinoport.pipe(new Readline({ delimiter: '\n' }));

app.use(express.static('public'));
//
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 5001;
arudinoport.on("open", () => {
    console.log('serial port open');
});

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
    extended: true
}));

const client = mqtt.connect("mqtt://broker.hivemq.com:1883");
//shwoing the user that MQTT is connected in the terminal window 
client.on('connect', () => { 
    client.subscribe('/sensorData');
    console.log('mqtt connected');
});
/*
client.on('data', (topic, device) => {
    if (topic == '//219222529/lexton/') {
      const data = JSON.parse(data);
    
        const { temperature } = device;
        device.temperature = temperature;
        device.save(err => {
          if (err) {
            console.log(err)
          }
        });
      };
});
*/

client.on('message', (topic, message) => {
    if (topic == '//219222529/lexton/') {
        const data = JSON.parse(message);
        device.temperature = temperature;
        console.log('Measuring the temperature in MongoDB');
        console.log(temperature);
        
        device.save(err => {
            if (err) {
                console.log(err)
            }
        });
    };
});

parser.on('data', data =>{
    console.log('got word from arduino:', data);
    const topic = `/219222529/lexton/`;
    const stringdata = data;
    client.publish(topic, stringdata, () => {
        console.log('published new message');
      });
  });



app.listen(port, () => { 
    console.log(`listening on port ${port}`);
});