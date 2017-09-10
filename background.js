const proxyScriptURL = "pac.js";

browser.proxy.registerProxyScript(proxyScriptURL);

var proxyOnIcon = {
  "16": "data/on_16.png",
  "32": "data/on_32.png",
  "64": "data/on_64.png"
};

var proxyOffIcon = {
  "16": "data/off_16.png",
  "32": "data/off_32.png",
  "64": "data/off_64.png"
};

var proxyOnLabel = "Proxy is On - press ctrl+shift+X to turn off";
var proxyOffLabel = "Proxy is Off - press ctrl+shift+X to turn on";

var initialIcon = proxyOnIcon;
var initialLabel = proxyOnLabel;

var proxyOn = false;

function toggleProxyConfig() {
  if(!proxyOn) {
    proxyOn = true;
    browser.browserAction.setIcon({path: proxyOnIcon});
    browser.browserAction.setTitle({title: proxyOnLabel});
  }
  else {
    proxyOn = false;
    browser.browserAction.setIcon({path: proxyOffIcon});
    browser.browserAction.setTitle({title: proxyOffLabel});
  }
}

chrome.browserAction.onClicked.addListener(toggleProxyConfig);
