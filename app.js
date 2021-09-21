const cron = require('node-cron');
const express = require('express');
const port = process.env.PORT;

var app = express();
cron.schedule('*/5 * * * *', function() {
    console.log('running a task every 5 mins');
  });
app.listen(port);