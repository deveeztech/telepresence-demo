'use strict';

const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
const QUOTE_HOST = process.env.QUOTE_PRODUCER_HOST ?? '';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from quoter');
});

app.get('/quote', (req, res) => {
  if (!QUOTE_HOST) {
    const err = "Error connecting to quote producer";
    console.error(err);
    return res.status(500).send();
  }

  console.log(`Querying quote producer at ${QUOTE_HOST}`)
  fetch(`${QUOTE_HOST}/quote`)
    .then(r => r.json())
    .then(json => res.send(json))
    .catch(e => {
      console.error(e);
      res.status(500).send(e)
    });
});


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
