const express = require('express');
const app = express();
const port = 3000;
const base = `${__dirname}/public`;
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(`${base}/Login-page.html`);
  });

app.get('/Login-page', (req, res) => {
    res.sendFile(`${base}/Login-page.html`);
});

app.get('/welcome-page', (req, res) => {
    res.sendFile(`${base}/welcome-page.html`);
});

app.get('/Rooms', (req, res) => {
    res.sendFile(`${base}/Rooms.html`);
});

app.get('/Lighting', (req, res) => {
    res.sendFile(`${base}/Lighting.html`);
});

app.get('/Air-conditioning', (req, res) => {
    res.sendFile(`${base}/Air-conditioning.html`);
});

app.get('/send-command', (req, res) => {
    res.sendFile(`${base}/send-command.html`);
});

app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });

