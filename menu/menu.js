var toggle_switch = document.getElementById('toggle-switch');
var icon = document.getElementById('icon');
var host = document.getElementById('host');
var port = document.getElementById('port');
var type = document.getElementById('type');
var form = document.getElementById('settings-form');

function init(page) {
  page.getProxyConfig();
  host.value = page.proxy.host;
  port.value = page.proxy.port;
  type.value = page.proxy.type;
  toggle_switch.checked = page.proxy.enabled;
}

function toggle(page) {
  page.toggleProxyConfig();
}

function save(page) {
  page.proxy.host = host.value;
  page.proxy.port = port.value;
  page.proxy.type = type.value;
  page.saveProxyConfig();
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var get_background = browser.runtime.getBackgroundPage();

/* initialize values */
get_background.then(init, onError);

form.onsubmit = function() {
  get_background.then(save, onError);
}

toggle_switch.onclick = function() {
  get_background.then(toggle, onError);
}

// Toggle the switch when hotkey is activated
function handleMessage(message, sender) {
  if(message == "toggle-switch") {
    toggle_switch.checked = !(toggle_switch.checked);
  }
}

browser.runtime.onMessage.addListener(handleMessage);
