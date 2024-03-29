# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

## [Unreleased]
### Changed
- Use manifest.json v3 format
- Extension now requests host permissions for all sites before first use

### Removed
- Support for Firefox < 101

## [2.1.1] 05-10-2020
### Fixed
- Use safe loads when injecting HTML content

## [2.1.0] 05-10-2020
### Fixed
- Respect browser and system proxy settings when noturno is off

### Changed
- New UI

### Removed
- Removed reset button

## [2.0.0] 05-01-2020
### Added
- Support for Firefox >= 60

### Changed
- Move from deprecated proxy.registerProxyScript to proxy.onRequest

### Removed
- Support for Firefox < 60

## [1.2] 11-16-2017
### Added
- Add option to toggle proxy on/off with one click (activated in the right-click menu).
### Changed
- Proxy DNS queries when using SOCKS.
### Fixed
- Apply proxy changes without the need to toggle off/on when changing configurations while proxy is on.

## [1.1.1] 09-18-2017
### Fixed
- Fix SOCKS5 support.

## [1.1] 09-18-2017
### Added
- Support different protocols like HTTPS and SOCKS.

## [1.0.1] 09-16-2017
### Changed
- Set minimum Firefox version to 55.0. This is the first one to accept WebExtensions proxy API.

## [1.0.0] 09-15-2017
### Added
- Add a menu to the addon.
- Save status (on/off).
- Save last proxy.
- Changed default hotkey to Alt+Shift+X

### Changed
- Port addon to WebExtensions.
- Use addon proxy data instead of Firefox proxy configurations.
