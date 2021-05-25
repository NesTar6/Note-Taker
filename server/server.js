const express = require('express');
const path = require('path');
const app = express();
const port = 3333;

app.use(express.urlencoded());

app.use(express.json());

app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});