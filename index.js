var noble = require('noble');
var jsdom = require('jsdom');
var chalk = require('chalk');
var uridecode = require('./uridecode.js');

function getMetaData(url) {
  jsdom.env(url, function (errors, window) {
    if (!errors) {
      console.log(chalk.underline.bgBlue(' ' + window.document.getElementsByTagName('title')[0].innerHTML + ' '));
      var metatags = window.document.getElementsByTagName('meta');
      for (var i = 0; i < metatags.length; i++) {
        if (metatags[i].getAttribute('name') == 'description') {
          console.log(chalk.gray(metatags[i].getAttribute('content')));
        }
      }
      window.close();
    }
    console.log(url);
  });
}

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
      getMetaData(url);
    }
  }
  console.log();
});