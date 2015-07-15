var noble = require('noble');
var chalk = require('chalk');
var uridecode = require('./uridecode.js');
var metadata = require('./metadata.js');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(['feaa']);
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
    var objects = [];
    for (var i in serviceData) {
      
      // check if Eddystone-URL 
      if (serviceData[i].data.toString('hex').substr(0,2) === '10') { 
        var url = uridecode(serviceData[i].data.toString('hex'));
        objects.push({url: url});
      }
    }
    if (objects.length) {
      metadata(objects);
    }
  }
});