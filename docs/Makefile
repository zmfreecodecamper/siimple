# Binaries paths
NODE_BIN=../node_modules/.bin

# Build the documentation site
.PHONY: build
build:
	#${NODE_BIN}/webpack --config webpack.config.js
	#cp ./src/index.html ./www/
	#rm -rf ./www && mkdir -p ./www
	node ./scripts/build.js
	cp ../packages/siimple-css/dist/siimple.min.css ./www/assets/

# Serve the documentation site
.PHONY: test
test:
	${NODE_BIN}/stattic --port 5000 --folder ./www --cors
	#node ../scripts/serve.js --port 5000

# Publish the documentation website
.PHONY: publish
publish: 
	#make build
	#gsutil rsync -d -r ./_site gs://siimple-documentation.appspot.com/www

