$('#navbar').load('navbar.html');

const devices = JSON.parse(localStorage.getItem('devices')) || [];
const MQTT_URL = 'http://localhost:5001/send-command';
const API_URL = 'http://localhost:5000/api';

  $.get(`${API_URL}/devices`  )
  .then(response => { 
    response.forEach(device => {
      console.log(device.floor);
      $('#devices tbody').append(`
        <tr>
          <td>${device.floor}</td>
          <td>${device.name}</td>
        </tr>`
      );
    });
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
  
$('#send-command').on('click', function() {
  const deviceId = $('#deviceId').val();
  const command = $('#command').val();
  $.post(MQTT_URL, { deviceId, command })
  .then(response => {
  location.href = '/';
    })
  });
    
$('#add-device').on('click', () => {
  const name = $('#name').val();
  const floor = $('#floor').val();
  const sensorData = [];

  const body = {
    name,
    floor,
    sensorData
  };


  $.post(`${API_URL}/devices`, body)
  .then(response => {
    location.href = '/Lighting';
  })
  .catch(error => {
    console.error(`Error: ${error}`);
  });
});



