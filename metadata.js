var jsdom = require('jsdom');
var chalk = require('chalk');
var notifier = require('node-notifier');

module.exports = function(url) {
  var title = '', description = '', favicon = '';
  jsdom.env(url, function (errors, window) {
    if (!errors) {
      if (window.document.getElementsByTagName('title')[0]) {
        title = window.document.getElementsByTagName('title')[0].innerHTML.removeEntities();
      } else {
        title = 'Title not found';
      }

      var metatags = window.document.getElementsByTagName('meta');
      if (metatags) {
        for (var i = 0; i < metatags.length; i++) {
          if (metatags[i].getAttribute('name') == 'description') {
            description += metatags[i].getAttribute('content').removeEntities();
          }
        }
      }

      var metalinks = window.document.getElementsByTagName("link");
      if (metalinks) {
        for (var i = 0; i < metalinks.length; i++) {
          if ((metalinks[i].getAttribute("rel") == "icon") || (metalinks[i].getAttribute("rel") == "shortcut icon")) {
            favicon = metalinks[i].getAttribute("href");
          }
        }
      } else {
        favicon = '';
      }

      if (description == '') {
        description = 'No description';
      }

      window.close();

      console.log(chalk.underline.bgBlue(' ' + title + ' '));
      console.log(chalk.gray(description));
      
      notifier.notify({
        title: title,
        subtitle: url,
        message: description,
        icon: './physicalweb.jpg',
        contentImage: favicon,
        sound: true,
        wait: true,
        open: url
      });
    }
    console.log(url);
  });
}

String.prototype.removeEntities = function() {
  return this.replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "&")
    .replace(/&#039/g, "'");
}