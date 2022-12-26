// Log errors from proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});

var proxy = {
  enabled: false,
  type: '',
  host: '',
  port: '',
  filters: {urls: ["<all_urls>"]}
}

function proxyListener(requestDetails) {
  proxyInfo = proxy
  console.debug('proxying request: ', requestDetails);
  return proxyInfo
}

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

var oneClickToggle = false

function init() {
  browser.storage.local.get()
    .then((storedSettings) => {
      requiredKeys = ["enabled", "port", "host", "type"]
      hasRequiredKeys = requiredKeys.every(key => Object.keys(storedSettings).includes(key))
      hasNoRequiredKeys = requiredKeys.every(key => !(Object.keys(storedSettings).includes(key)))
      if(hasRequiredKeys) {
        proxy.enabled = storedSettings.enabled;
        proxy.host = storedSettings.host;
        proxy.port = storedSettings.port;
        proxy.type = storedSettings.type;
        if(proxy.enabled) {
          browser.action.setIcon({path: proxyOnIcon});
          browser.action.setTitle({title: proxyOnLabel});
          browser.proxy.onRequest.addListener(proxyListener, proxy.filters);
        }
      } else if(hasNoRequiredKeys) {
        saveProxyConfig();
      }
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
      proxy.type = storedSettings.type;
    });
}

function saveProxyConfig() {
    browser.storage.local.set(proxy);
}

function toggleProxyConfig() {
  proxy.enabled = !proxy.enabled;
  if(proxy.enabled) {
    console.debug("Proxy has been turned ON")
    browser.action.setIcon({path: proxyOnIcon});
    browser.action.setTitle({title: proxyOnLabel});
    browser.proxy.onRequest.addListener(proxyListener, proxy.filters);
  }
  else {
    console.debug("Proxy has been turned OFF")
    browser.action.setIcon({path: proxyOffIcon});
    browser.action.setTitle({title: proxyOffLabel});
    browser.proxy.onRequest.removeListener(proxyListener);
  }
  saveProxyConfig();
}

function toggleOneClickToggle(checked) {
  if(checked){
    browser.action.setPopup({popup: ""})
    browser.action.onClicked.addListener(toggleProxyConfig)
  } else {
    browser.action.setPopup({popup: "menu/menu.html"})
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

function createMenu(details) {
  console.log(details.reason);
  browser.menus.create({
    id: "oneClickToggle",
    type: "checkbox",
    title: "One click toggle",
    contexts: ["browser_action"],
    checked: oneClickToggle
  });
}

browser.runtime.onInstalled.addListener(createMenu);

browser.menus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "oneClickToggle") {
    toggleOneClickToggle(info.checked)
  }
});
