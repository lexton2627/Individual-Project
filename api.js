const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://LachlanJE:Echole123@cluster0.ico6z.mongodb.net/mydb', {useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const Device = require('./models/device'); 
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(`${__dirname}/public/generated-docs`));

const port = 5000;

app.get('/api/test', (req, res) => {
  res.send('The API is working!');
});

/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "6122446ae0e826bd2f70d7e6",
*      "id": "0",
*      "name": "Smart light",
*      "floor": "1",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.get('/api/devices', (req, res) => {
  Device.find({}, (err, devices) => {
    if (err == true) {
      return res.send(err);
    } else {
      return res.send(devices);
    }
  });
});

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});

app.post('/api/devices', (req, res) => {
  const { name, floor, sensorData } = req.body;
  const newDevice = new Device({
    name,
    floor,
    sensorData
  });
  newDevice.save(err => {
    return err
      ? res.send(err)
      : res.send('successfully added device and data');
  });
});


app.post('/api/send-command', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
