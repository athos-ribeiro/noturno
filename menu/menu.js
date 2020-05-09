var toggle_switch = document.getElementById('toggle-switch');
var icon = document.getElementById('icon');
var host = document.getElementById('host');
var port = document.getElementById('port');
var type = document.getElementById('type');
var form = document.getElementById('settings-form');
var typeErr = document.getElementById("error-type")
var hostErr = document.getElementById("error-host")
var portErr = document.getElementById("error-port")

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

host.oninput = function() {
  hostErr.setAttribute("class", "text-error")
  host.setCustomValidity("");
}

port.oninput = function() {
  portErr.setAttribute("class", "text-error")
  port.setCustomValidity("");
}

type.onchange = function() {
  typeErr.setAttribute("class", "text-error")
  type.setCustomValidity("");
}

form.onsubmit = function() {
  var valid = true
  if(!port.value) {
    var errMsg = "Port should not be blank"
    port.setCustomValidity(errMsg);
    portErr.innerHTML = errMsg
    portErr.setAttribute("class", "text-error display-block")
    valid = false
  }
  if(!host.value) {
    var errMsg = "Host should not be blank"
    host.setCustomValidity(errMsg);
    hostErr.innerHTML = errMsg
    hostErr.setAttribute("class", "text-error display-block")
    valid = false
  }
  if(!type.value) {
    var errMsg = "Select a protocol"
    type.setCustomValidity(errMsg);
    typeErr.innerHTML = errMsg
    typeErr.setAttribute("class", "text-error display-block")
    valid = false
  }
  if(!valid) {
    return false
  }
  get_background.then(save, onError);
  return true
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
