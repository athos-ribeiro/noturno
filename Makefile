FILES = manifest.json background.js pac.js menu data/off_* data/on_*
DOCS = README.md AUTHORS LICENSE CHANGELOG.md
VERSION = `sed -n 's/.*"version": "\([^"]\+\)".*/\1/p' manifest.json`

release: manifest.json
	zip -r noturno-$(VERSION).xpi $(FILES) $(DOCS)
