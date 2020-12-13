const express = require('express');
const app = express();
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

// Set static path 
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidkey = 'BCZko7ex-cwqlhS20tb6x5hTVNwjTvTVigpdsV6hQiKj59pi7fQNUzhQVRhD8_4HVwbOaKsZZaqNpULcnYqcjaU';
const privateVapidKey = 'sXdZZzyHCu6yQ2HxA4pC-PHMicnoDKj-uAbylqxju90';

webpush.setVapidDetails(
    'mailto:ranjabharat54@gmail.com',
    publicVapidkey,
    privateVapidKey,
  );

  // Subscribe Route

  app.post('/subscribe', (req, res) => {
    //Get pussSubscription object
    const subscription = req.body;

    // Send 201 - resource created 
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test'});

    // Push object into sendNotification 
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
  });


  const PORT = 3000;

  app.listen(PORT, () => {
      console.log(`server has started on PORT: ${PORT}`);
  });