var noble = require('noble');
var chalk = require('chalk');
var uridecode = require('./uridecode.js');
var metadata = require('./metadata.js');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(['fed8']);
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStart', function() {
  console.log(chalk.dim('Scan started...'));
  console.log();
});

noble.on('scanStop', function() {
  console.log(chalk.dim('Scan stopped...'));
  console.log();
});

noble.on('discover', function(peripheral) {
  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    for (var i in serviceData) {
      var url = uridecode(serviceData[i].data.toString('hex'));
      metadata(url);
    }
  }
  console.log();
});