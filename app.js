const https = require('https');
const cron = require('node-cron');
const express = require('express');
const port = process.env.PORT;
const options = {
  hostname: 'www.careers.hrp.gov.sg',
  path: '/sap/opu/odata/sap/ZGERCGS001_SRV/$metadata?saml2=disabled',
  method: 'GET'
};
var app = express();
cron.schedule('* * * * *', function () {
  validateCG();
});
app.listen(port);


function validateCG() {
  const req = https.request(options, res => {
    console.log(`statusCode1: ${res.statusMessage}`)
    if (`${res.statusCode}` != 200) {
      sendMessage(`${res.statusCode}`, `${res.statusMessage}`);
    }

  })
  req.on('error', error => {
    console.error(error)
  })
  req.end()
}


function sendMessage(resStatusCode, resMessage) {
  console.log("sendMessage invoked");
  const errorMessage = encodeURIComponent('Metadata loading has failed from internet system with status code ' + resStatusCode + '-' + resMessage),
    message = {
      hostname: 'api.telegram.org',
      path: '/bot2029179703:AAHjjDxykIPDyELQ5aLGoukiIYr1YcimKyI/sendMessage?chat_id=-1001584898445&text=' + errorMessage,
      method: 'GET'
    };
  const req2 = https.request(message, res => {
    console.log(`statusCode: ${res.statusCode}`);
  })
  req2.on('error', error => {
    console.error(error);
  })
  req2.end();

}