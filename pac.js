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

browser.runtime.sendMessage("noturno: PAC script initialized");

browser.runtime.onMessage.addListener((message) => {
  proxyOn = message.proxyOn;
  if(proxyOn) {
    browser.runtime.sendMessage("noturno: Setting proxy to " + message.proxy);
    proxy = message.proxy;
  } else {
    browser.runtime.sendMessage("noturno: Proxy off");
    proxy = noProxy;
  }
});

function FindProxyForURL(url, host) {
  return proxy;
}

