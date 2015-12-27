'use strict';
let http = require('http'),
  chalk = require('chalk'),
  notifier = require('node-notifier');

module.exports = urldata => {
  let urls = JSON.stringify({'objects': urldata}),
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': urls.length
    },
    options = {
      'host': 'url-caster.appspot.com',
      'port': 80,
      'path': '/resolve-scan',
      'method': 'POST',
      'headers': headers
    },
    urlOnly = () => {
      let data = JSON.parse(urls);
      for (let i in data.objects) {
        if (data.objects.hasOwnProperty(i)) {
          console.log(chalk.underline.bgBlue(' ' + data.objects[i].url + ' '));
          console.log(data.objects[i].url);

          notifier.notify({
            'title': data.objects[i].url,
            'message': data.objects[i].url,
            'icon': './physicalweb.jpg',
            'sound': true,
            'wait': true,
            'open': data.objects[i].url
          });
        }
      }
    },
    req = http.request(options, res => {
      res.setEncoding('utf-8');

      let responseString = '';

      res.on('data', data => {
        responseString += data;
      });

      res.on('end', () => {
        try {
          let response = JSON.parse(responseString);
          for (let i in response.metadata) {
            if (response.metadata.hasOwnProperty(i)) {
              let data = response.metadata[i];
              console.log(chalk.underline.bgBlue(' ' + data.title + ' '));
              console.log(chalk.gray(data.description));
              console.log(data.displayUrl);
              console.log();

              notifier.notify({
                'title': data.title,
                'subtitle': data.displayUrl,
                'message': data.description,
                'icon': './physicalweb.jpg',
                'contentImage': data.icon,
                'sound': true,
                'wait': true,
                'open': data.url
              });
            }
          }
        } catch (e) {
          console.log(e);
          console.log();
          urlOnly();
        }
      });
    });

  req.on('error', e => {
    console.log(e);
    console.log();
    urlOnly();
  });

  req.write(urls);
  req.end();
};
