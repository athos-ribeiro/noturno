var index = require("../index");

exports["test checkDefaultType"] = function(assert) {
  assert.equal(5, require("sdk/preferences/service").get("network.proxy.type"), "default config OK");
};

exports["test labels"] = function(assert) {
  assert.equal("Proxy is On - press ctrl+shift+X to turn off", index.proxyOnLabel, "On label OK");
  assert.equal("Proxy is Off - press ctrl+shift+X to turn on", index.proxyOffLabel, "Off label OK");
};

exports["test toggleProxyConfig"] = function(assert) {
  index.toggleProxyConfig();
  assert.equal(1, require("sdk/preferences/service").get("network.proxy.type"), "toggle works");
};

require("sdk/test").run(exports);
