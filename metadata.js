var http = require('http');
var chalk = require('chalk');
var notifier = require('node-notifier');

module.exports = function(urls) {
  var urls = JSON.stringify({objects: urls}),
      headers = {
        'Content-Type': 'application/json',
        'Content-Length': urls.length
      },
      options = {
        host: 'url-caster.appspot.com',
        port: 80,
        path: '/resolve-scan',
        method: 'POST',
        headers: headers
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      try {
        var response = JSON.parse(responseString);
        for (var i in response.metadata) {
          var data = response.metadata[i];
          console.log(chalk.underline.bgBlue(' ' + data.title + ' '));
          console.log(chalk.gray(data.description));
          console.log(data.url);
          console.log();

          notifier.notify({
            title: data.title,
            subtitle: data.url,
            message: data.description,
            icon: './physicalweb.jpg',
            contentImage: data.icon,
            sound: true,
            wait: true,
            open: data.url
          });
        }
      }
      catch(e) {
        console.log(e);
      }
    });
  });

  req.on('error', function(e) {
    console.log(e);
  });

  req.write(urls);
  req.end();
}