.PHONY: install-dependencies build-database boot-startup

boot-startup: install-dependencies build-database
	npm run dev

install-dependencies:
	npm install

build-database:
	npm run prisma:migration:test
	npm run prisma:generate
