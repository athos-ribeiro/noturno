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

const proxyOnLabel = "Proxy is On - press Alt+Shift+X to turn off";
const proxyOffLabel = "Proxy is Off - press Alt+Shift+X to turn on";

var proxy = {
  enabled: false,
  protocol: 'HTTP',
  host: '',
  port: ''
}
var oneClickToggle = false

function init() {
  browser.storage.local.get()
    .then((storedSettings) => {
      if(("enabled" in storedSettings) && ("port" in storedSettings) && ("host" in storedSettings) && ("protocol" in storedSettings)) {
        proxy.enabled = storedSettings.enabled;
        proxy.host = storedSettings.host;
        proxy.port = storedSettings.port;
        proxy.protocol = storedSettings.protocol;
        if(proxy.enabled) {
          browser.browserAction.setIcon({path: proxyOnIcon});
          browser.browserAction.setTitle({title: proxyOnLabel});
        }
      } else if(!("enabled" in storedSettings) && !("port" in storedSettings) && !("host" in storedSettings) && !("protocol" in storedSettings)) {
        saveProxyConfig();
      }
      browser.runtime.sendMessage(proxy, {toProxyScript: true});
      if("oneClickToggle" in storedSettings) {
        oneClickToggle = storedSettings.oneClickToggle
        toggleOneClickToggle(oneClickToggle)
      }
    });
}

function getProxyConfig() {
  browser.storage.local.get()
    .then((storedSettings) => {
      proxy.enabled = storedSettings.enabled;
      proxy.host = storedSettings.host;
      proxy.port = storedSettings.port;
      proxy.protocol = storedSettings.protocol;
      browser.runtime.sendMessage(proxy, {toProxyScript: true});
    });
}

function saveProxyConfig() {
    browser.storage.local.set(proxy);
    browser.runtime.sendMessage(proxy, {toProxyScript: true});
}

function toggleProxyConfig() {
  proxy.enabled = !proxy.enabled;
  if(proxy.enabled) {
    browser.browserAction.setIcon({path: proxyOnIcon});
    browser.browserAction.setTitle({title: proxyOnLabel});
  }
  else {
    browser.browserAction.setIcon({path: proxyOffIcon});
    browser.browserAction.setTitle({title: proxyOffLabel});
  }
  saveProxyConfig();
}

function handleMessage(message, sender) {
  // only handle messages from the proxy script
  if (sender.url !=  browser.extension.getURL(proxyScriptURL)) {
    return;
  }

  console.log(message);
}

function toggleOneClickToggle(checked) {
  if(checked){
    browser.browserAction.setPopup({popup: ""})
    browser.browserAction.onClicked.addListener(toggleProxyConfig)
  } else {
    browser.browserAction.setPopup({popup: "menu/menu.html"})
  }
  oneClickToggle = checked
  browser.storage.local.set({oneClickToggle: checked});
}

init();

browser.commands.onCommand.addListener(function(command) {
  if (command == "toggle-status") {
    // This message makes the popup toggle the switch when open
    browser.runtime.sendMessage('toggle-switch');
    toggleProxyConfig();
  }
});

browser.menus.create({
  id: "oneClickToggle",
  type: "checkbox",
  title: "One click toggle",
  contexts: ["browser_action"],
  checked: oneClickToggle
});

browser.menus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "oneClickToggle") {
    toggleOneClickToggle(info.checked)
  }
});

browser.runtime.onMessage.addListener(handleMessage);
