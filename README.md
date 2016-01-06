physical-web-scan
=================

Node.js app to scan for [Physical Web](http://github.com/google/physical-web) beacons from your computer. Updated to scan for [Eddystone](https://github.com/google/eddystone) URL's. See history to use with UriBeacon format.

**Note: There's also the option of using this desktop app version for OSX found here: [electron-physical-web-scan](https://github.com/dermike/electron-physical-web-scan).**

Requires [Noble](https://github.com/sandeepmistry/noble) (Mac OS X and Linux are currently the only supported OSes)

Found beacons are displayed both in the terminal and as an alert in notification center.

![Scan notifications](https://raw.githubusercontent.com/dermike/physical-web-scan/master/screenshots/notifications.jpg)

## Install

Needs [Node.js](https://nodejs.org/) to run plus [Xcode](https://developer.apple.com/xcode/download/) and its `Command Line Tools` to build dependencies. You can find this under the menu `Xcode -> Preferences -> Downloads`.

After cloning or downloading this repo, install the dependencies listed in `package.json`:

```sh
npm install
```

Start scanning for Physical Web beacons by running `index.js`:

```sh
node index.js
```
