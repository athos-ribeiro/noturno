const proxyScriptURL = "pac.js";

browser.proxy.registerProxyScript(proxyScriptURL);

// Log errors from proxy script
browser.proxy.onProxyError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

const proxyOnIcon = {
  "16": "data/on_16.png",
  "32": "data/on_32.png",
  "64": "data/on_64.png"
};

const proxyOffIcon = {
  "16": "data/off_16.png",
  "32": "data/off_32.png",
  "64": "data/off_64.png"
};

const proxyOnLabel = "Proxy is On - press ctrl+shift+X to turn off";
const proxyOffLabel = "Proxy is Off - press ctrl+shift+X to turn on";

var initialIcon = proxyOnIcon;
var initialLabel = proxyOnLabel;

var messageToProxy = {
  proxyOn: false,
  proxy: "PROXY athoscr.me:3128"
};

var proxyOn = false;

function toggleProxyConfig() {
  if(!proxyOn) {
    proxyOn = true;
    messageToProxy.proxyOn = true
    browser.runtime.sendMessage(messageToProxy, {toProxyScript: true});
    browser.browserAction.setIcon({path: proxyOnIcon});
    browser.browserAction.setTitle({title: proxyOnLabel});
  }
  else {
    proxyOn = false;
    messageToProxy.proxyOn = false
    browser.runtime.sendMessage(messageToProxy, {toProxyScript: true});
    browser.browserAction.setIcon({path: proxyOffIcon});
    browser.browserAction.setTitle({title: proxyOffLabel});
  }
}

// turns on/off
// the onClicked listener was deactivvated since we now have a menu
// chrome.browserAction.onClicked.addListener(toggleProxyConfig);
browser.commands.onCommand.addListener(function(command) {
  if (command == "toggle-status") {
    toggleProxyConfig();
  }
});

function handleMessage(message, sender) {
  // only handle messages from the proxy script
  if (sender.url !=  browser.extension.getURL(proxyScriptURL)) {
    return;
  }

  console.log(message);
}

browser.runtime.onMessage.addListener(handleMessage);
