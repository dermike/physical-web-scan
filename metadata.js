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
          console.log(data.displayUrl);
          console.log();

          notifier.notify({
            title: data.title,
            subtitle: data.displayUrl,
            message: data.description,
            icon: './physicalweb.jpg',
            contentImage: data.icon,
            sound: true,
            wait: true,
            open: data.url
          });
        }
        
        // display unresolved url's
        for (var i in response.unresolved) {
          var data = response.unresolved[i];
          console.log(data.id);
          console.log();
          
          notifier.notify({
            title: data.id,
            message: data.id,
            icon: './physicalweb.jpg',
            sound: true,
            wait: true,
            open: data.id
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