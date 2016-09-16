var Wemo = require('wemo-client');
var wemo = new Wemo();

var socketClient;

function discoverDevices() {
  wemo.discover(function(deviceInfo) {
    // Get the client for the found device
    var client = wemo.client(deviceInfo);

    if (deviceInfo.modelName == 'LightSwitch') {
      configureLightSwitch(deviceInfo, client);
    } else {
      socketClient = client;
    }
  });
}

function configureLightSwitch(deviceInfo, client) {
  client.on('binaryState', function(value) {
    if (!socketClient) {
      return;
    }
    socketClient.setBinaryState(value);
  });
}

setInterval(discoverDevices, 1000);
