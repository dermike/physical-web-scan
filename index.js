var noble = require('noble');
var uridecode = require('./uridecode.js');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning(['fed8']);
  } else {
    noble.stopScanning();
  }
});

noble.on('scanStart', function() {
  console.log('Scan started...');
  console.log();
});

noble.on('scanStop', function() {
  console.log('Scan stopped...');  
  console.log();
});

noble.on('discover', function(peripheral) {
  var serviceData = peripheral.advertisement.serviceData;
  if (serviceData && serviceData.length) {
    for (var i in serviceData) {
      console.log(uridecode(serviceData[i].data.toString('hex')));
      // TODO: Get page title of URL and meta description
    }
  }
  console.log();
});