# U-Science website

https://u-science-lab.github.io/

A small organization homepage featuring U-FISH and U-Probe. Project summaries
are based on their repository READMEs and official documentation:

- U-FISH: https://github.com/u-science-lab/U-FISH and https://u-fish.readthedocs.io/en/latest/
- U-Probe: https://github.com/u-science-lab/U-Probe and https://www.u-probe.org/

## Edit and preview

Edit `index.html` and `site.css`. Keep descriptions concise and link to the
projects' own sites for detailed documentation. The homepage does not list the
digital twin or private projects.

```sh
python3 -m http.server 8090
```

Open http://localhost:8090/. Check desktop and narrow layouts before pushing.
The Pages workflow deploys an explicit list of public files on a push to `main`.

## Independent demo

The autoFISH demo is deployed by its own repository:
https://github.com/u-science-lab/autofish-digital-twin-demo

This website contains only a compatibility redirect at `autofish-digital-twin/index.html`.
No demo bundle, backend or private collaboration documents are included in the
current website tree. Older Git history retains previous public compiled assets.
Updating the demo no longer requires rebuilding or redeploying this homepage.
