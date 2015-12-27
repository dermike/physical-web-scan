'use strict';
let noble = require('noble'),
  chalk = require('chalk'),
  urldecode = require('./urldecode.js'),
  metadata = require('./metadata.js');

noble.on('stateChange', state => {
  if (state === 'poweredOn') {
    noble.startScanning(['feaa']);
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStart', () => {
  console.log(chalk.dim('Scan started...'));
  console.log();
});

noble.on('scanStop', () => {
  console.log(chalk.dim('Scan stopped...'));
  console.log();
});

noble.on('discover', peripheral => {
  let serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    let objects = [];
    for (let i in serviceData) {
      // check if Eddystone-URL
      if (serviceData[i].data.toString('hex').substr(0, 2) === '10') {
        let url = urldecode(serviceData[i].data.toString('hex'));
        objects.push({'url': url});
      }
    }
    if (objects.length) {
      metadata(objects);
    }
  }
});
