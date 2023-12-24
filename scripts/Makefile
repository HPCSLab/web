.PHONY: scrape
scrape: scrape.js
	node $<

scrape.js: scrape.ts
	esbuild $< --outfile=$@

.PHONY: members
members: scrapeMembers.js
	node $<

scrapeMembers.js: scrapeMembers.ts
	esbuild $< --outfile=$@
