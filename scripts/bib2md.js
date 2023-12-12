import { JSDOM } from 'jsdom';
import process from 'process';
import request from 'request';
import fs from 'fs';

const mdtype = process.argv[2];
const slug = process.argv[3];

const get = (url) => {
    return new Promise((resolve, reject) => {
        request.get({
            uri: url,
            headers: { 'Content-type': 'text/html;' },
        }, function (err, req, data) {
            resolve(data);
        });
    });
}

const url = `https://www.hpcs.cs.tsukuba.ac.jp/wp-publications/${slug}/`;

const html = await get(url);

const doc = new JSDOM(html).window.document;

const title = doc.querySelector('.entry-title').innerHTML;

const by = doc.querySelector('.bibentry-by').innerHTML;

const ref = doc.querySelector('.bibentry-reference').innerHTML;

const bib = doc.querySelector('.purebibtex').innerHTML;

const text = 
`---
title: '${title}'
ref: '${ref}'
type: '${mdtype}'
slug: '${slug}'
---

*${by}*

Reference:
\`\`\`
${ref}
\`\`\`

Bibtex Entry:
\`\`\`
${bib}
\`\`\`
`;

fs.writeFile(`${slug}.md`, text, err => {
    if (err) {
      console.error(err);
    }
});