
build: component.json index.js
	@./node_modules/component/bin/component-build --dev

test: build component.json index.js
	@./node_modules/component-test/bin/component-test phantom

watch: test
	@./node_modules/rewatch/bin/rewatch **/*.js -c "make test"

clean:
	rm -fr build components

.PHONY: clean build test
