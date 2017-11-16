noturno
=======

**noturno brought substantial changes in version 1.0.0: the new WebExtensions
API will not let us access the proxy configurations in the browser, as the old
SDK did. This means that now we must get those configurations in noturno,
completely changing the addon core feature. This will also allow us to finally
support other platforms in the future. If you have any questions, please open
an issue or email me: athoscr AT fedoraproject.org**

Firefox Add-On to switch between proxy settings.
----------------------------------------

https://addons.mozilla.org/en-US/firefox/addon/noturno/

When installed, this Add-On will display a button on the tool bar:

* Whenever the button is gray, proxy settings are set to use no proxy at all.
* If otherwise, the button is green, Firefox will use the proxy set on the **noturno** menu.

### Switching between proxy settings

To switch between no proxy and your proxy settings you may either

* **press the Add-On button on the toolbar and toggle the switch on the menu**
* press **Alt-Shift-X**

### One-click toggle

Starting on version 1.2, noturno supports one click toggle for proxy
configurations. To enable this option,

* right-click noturno button,
* check the "One click toggle" box.

Now you can toggle your proxy configurations just by clicking the button on the
top right of your browser. Note that to change the proxy configurations, like
host or port, you need to deactivate the "One click togle" feature.

### Android support

noturno does not support android for now. The calls bellow are not supported on
Android versions of Firefox, which are used by noturno.

* browser.browserAction.setIcon
* browser.commands.onCommand.addListener

### Calls to WebExtensions API

Here is a complete list of all calls to the WEbExtensions API. This may be
useful whenever porting noturno to other platforms. 

* browser.browserAction.setIcon
* browser.browserAction.setTitle
* browser.commands.onCommand.addListener
* browser.extension.getURL
* browser.proxy.onProxyError.addListener
* browser.proxy.registerProxyScript
* browser.runtime.getBackgroundPage
* browser.runtime.onMessage.addListener
* browser.runtime.sendMessage
* browser.storage.local.get
* browser.storage.local.set

### License and Copyright

Copyright 2017 Athos Ribeiro

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

