'use strict';

const express = require('express');
const fs = require('fs');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const QUOTE_FILE = './quotes.json'
const MAX_QUOTES = 30;

// change FAIL flag to fix :)
const FAIL = true;

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// App
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from quote-producer!');
});

app.get('/quote', (req, res) => {
  
  if (FAIL) {
    return res.send({author: "me", quote: "won't say a thing"});
  }

  const data = fs.readFileSync(QUOTE_FILE);
  const list = JSON.parse(data);
  const randomIdx = randomInteger(0, MAX_QUOTES - 1);
  res.send(list[randomIdx]);
  
});


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
