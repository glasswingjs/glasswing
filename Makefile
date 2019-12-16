include Makefile.template

GIT_REPO = https://github.com/glasswingjs

init: ## Init & Download all sub projects
	[ -d ../application ] || git clone $(GIT_REPO)/application ../application
	cd ../application && git pull

	[ -d ../controller ] || git clone $(GIT_REPO)/controller ../controller
	cd ../controller && git pull

	[ -d ../config ] || git clone $(GIT_REPO)/config ../config
	cd ../config && git pull

	[ -d ../http ] || git clone $(GIT_REPO)/http ../http
	cd ../http && git pull

	[ -d ../router ] || git clone $(GIT_REPO)/router ../router
	cd ../router && git pull

	[ -d ../template ] || git clone $(GIT_REPO)/template ../template
	cd ../template && git pull

s: s-template s-config s-common s-http s-router s-controller s-application ## Status packages

s-application:
	cd ../application && pwd && git status

s-controller:
	cd ../controller && pwd && git status

s-common:
	cd ../common && pwd && git status

s-config:
	cd ../config && pwd && git status

s-http:
	cd ../http && pwd && git status

s-router:
	cd ../router && pwd && git status

s-template:
	cd ../template && pwd && git status


b: b-common b-config b-controller b-http b-router b-application b-template ## Build packages

b-application:
	cd ../application && npm run build

b-controller:
	cd ../controller && npm run build

b-common:
	cd ../common && npm run build

b-config:
	cd ../config && npm run build

b-http:
	cd ../http && npm run build

b-router:
	cd ../router && npm run build

b-template:
	cd ../template && npm run build


i: i-glasswing i-application i-common i-config i-controller i-http i-router ## Install packages

i-glasswing:
	npm i

i-application:
	cd ../application && npm i

i-controller:
	cd ../controller && npm i

i-common:
	cd ../common && npm i

i-config:
	cd ../config && npm i

i-http:
	cd ../http && npm i

i-router:
	cd ../router && npm i

i-template:
	cd ../template && npm i


TEST_MODE =

t: t-application t-common t-config t-controller t-http t-router ## Test packages

t-glasswing:
	npm run test$(TEST_MODE)

t-application:
	cd ../application && npm run test$(TEST_MODE)

t-controller:
	cd ../controller && npm run test$(TEST_MODE)

t-common:
	cd ../common && npm run test$(TEST_MODE)

t-config:
	cd ../config && npm run test$(TEST_MODE)

t-http:
	cd ../http && npm run test$(TEST_MODE)

t-router:
	cd ../router && npm run test$(TEST_MODE)

t-template:
	cd ../template && npm run test$(TEST_MODE)


th: th-application th-common th-config th-controller th-http th-router ## Run tests (with HTML coverage)

th-glasswing:
	make t-glasswing TEST_MODE=:html

th-application:
	make t-application TEST_MODE=:html

th-controller:
	make t-controller TEST_MODE=:html

th-common:
	make t-common TEST_MODE=:html

th-config:
	make t-config TEST_MODE=:html

th-http:
	make t-http TEST_MODE=:html

th-router:
	make t-router TEST_MODE=:html

th-template:
	make t-template TEST_MODE=:html


tw-glasswing:
	make t-glasswing TEST_MODE=:watch

tw-application:
	make t-application TEST_MODE=:watch

tw-controller:
	make t-controller TEST_MODE=:watch

tw-common:
	make t-common TEST_MODE=:watch

tw-config:
	make t-config TEST_MODE=:watch

tw-http:
	make t-http TEST_MODE=:watch

tw-router:
	make t-router TEST_MODE=:watch

tw-template:
	make t-template TEST_MODE=:watch
