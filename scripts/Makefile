.PHONY: scrape
scrape: scrape.js
	node scrape.js

scrape.js: scrape.ts
	esbuild $< --outfile=$@
