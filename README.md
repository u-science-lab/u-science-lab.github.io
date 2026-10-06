# U-Science website

https://u-science-lab.github.io/

A small organization homepage featuring U-FISH and U-Probe. Project summaries
are based on their repository READMEs and official documentation:

- U-FISH: https://github.com/u-science-lab/U-FISH and https://u-fish.readthedocs.io/en/latest/
- U-Probe: https://github.com/u-science-lab/U-Probe and https://www.u-probe.org/

## Edit and preview

Edit `index.html` and `site.css`. Keep descriptions concise and link to the
projects' own sites for detailed documentation. The two homepage illustrations
were generated with GPT Image to explain the projects' ideas, not to present
experimental results. Assets, provenance and generation prompts live in
`assets/projects/`; see `SOURCES.txt` and `illustration-prompts.txt`.

```sh
node build.mjs
node --test tests/site.test.mjs
python3 -m http.server 8090 --directory _site
```

Open http://localhost:8090/. Check desktop and narrow layouts before pushing.
The Pages workflow deploys an explicit list of public files on a push to `main`.
Each stylesheet gets a content-hashed filename, so new markup never depends on
a stale cached stylesheet. Illustrations use compressed WebP files and load
lazily, with descriptive alternative text.
