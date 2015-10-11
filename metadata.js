var http = require('http');
var chalk = require('chalk');
var notifier = require('node-notifier');

module.exports = function(urldata) {
  var urls = JSON.stringify({objects: urldata}),
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
  
  function urlOnly() {
    var data = JSON.parse(urls);
    for (var i in data.objects) {
      console.log(chalk.underline.bgBlue(' ' + data.objects[i].url + ' '));
      console.log(data.objects[i].url);
      
      notifier.notify({
        title: data.objects[i].url,
        message: data.objects[i].url,
        icon: './physicalweb.jpg',
        sound: true,
        wait: true,
        open: data.objects[i].url
      });
    }
  }  

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
      }
      catch(e) {
        console.log(e);
        console.log();
        urlOnly();
      }
    });
  });

  req.on('error', function(e) {
    console.log(e);
    console.log();
    urlOnly();
  });

  req.write(urls);
  req.end();
}