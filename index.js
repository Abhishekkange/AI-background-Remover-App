const https = require('https');
const fs = require('fs');
require('dotenv').config;

const options = {
  hostname: 'beta-sdk.photoroom.com',
  port: 443,
  path: '/v2/edit?background.color=transparent&background.scaling=fill&outputSize=1000x1000&padding=0.1&imageUrl=IMG_URL_HERE',
  method: 'GET',
  headers: {
    'x-api-key': 'API_KEY_HERE'
  }
};

const req = https.request(options, res => {
  if (res.statusCode === 200) {
    const fileStream = fs.createWriteStream('image.jpg');
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Download completed.');
    });
  } else {
    console.log("Request failed with status code", res.statusCode);
  }
});

req.on('error', error => {
  console.error(error);
});

req.end();