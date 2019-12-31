.PHONY: build publish test

# Binaries paths
NODE_BIN=../../node_modules/.bin

# Build the documentation site
build:
	node ./build.js
	@# Build documentation pages
	cd ../../ && ./node_modules/@siimple/press/cli.js --config ./packages/docs/config.js
	@# Build assets
	mkdir -p ./www/assets/css 
	#${NODE_BIN}/sass -I ../../node_modules ../press-theme-siimple/styles/index.scss ./www/assets/css/siimple-press.css
	cp ../../node_modules/@siimple/css/dist/siimple.min.css ./www/assets/css/
	@# Copy images 
	#mkdir -p ./www/assets/images && cp ./images/*.svg ./www/assets/images/
	#cp -R ./images ./www/assets/images
	#cp ./header.svg ./www/assets/images/header.svg
	# Building website styles
	${NODE_BIN}/sass -I ../../node_modules ./styles/index.scss ./www/assets/css/style.css

# Serve the documentation site
test:
	${NODE_BIN}/stattic --port 5000 --folder ./www --cors

# Publish the documentation website
publish: 
	#make build
	#gsutil rsync -d -r ./_site gs://siimple-documentation.appspot.com/www

