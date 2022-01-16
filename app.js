// Made by Kolowy

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/html/main.html'));
});

app.listen(3000, () => {
    console.log('server started');
});