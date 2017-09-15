/*
 * As described in
 * https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/proxy
 * and
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1355198
 * require a parameter to avoid a "Invalid Proxy Rule: DIRECT" error
*/
const noProxy = "DIRECT stub_param";

var proxy = noProxy;
var proxyOn = false;

browser.runtime.sendMessage("PAC script initialized");

browser.runtime.onMessage.addListener((message) => {
  proxyOn = message.enabled;
  if(proxyOn && message.host && message.port) {
    browser.runtime.sendMessage("Setting proxy to " + message.host + ":" + message.port);
    proxy = "PROXY " + message.host + ":" + message.port;
  } else if(proxyOn) {
    browser.runtime.sendMessage("Host or Port missing, setting proxy to DIRECT");
    proxy = noProxy;
  } else {
      browser.runtime.sendMessage("Proxy off");
      proxy = noProxy;
  }
});

function FindProxyForURL(url, host) {
  return proxy;
}

