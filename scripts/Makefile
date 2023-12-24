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

.PHONY: alumni
alumni: scrapeAlumni.js
	node $<

scrapeAlumni.js: scrapeAlumni.ts
	esbuild $< --outfile=$@
