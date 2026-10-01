# U-Science website

Public website: https://u-science-lab.github.io/

Interactive demo: https://u-science-lab.github.io/autofish-digital-twin/

This repository contains the organization homepage and compiled static demo only.
It does **not** contain the private development repository, Python backend,
credentials, lab configuration or collaborator documents. JavaScript shipped to
a browser is publicly downloadable; compiled assets are not confidential code.

## Structure

- `index.html`, `site.css`: organization homepage and styling.
- `autofish-digital-twin/`: generated, audited browser-only demo. Do not edit its
  hashed assets by hand. `release.json` records the source revision and build time.
- `.github/workflows/pages.yml`: deploys an explicit list of website files on a
  push to `main`; repository documentation is not copied to the website artifact.

## Update the demo

An authorized collaborator builds the private `autofish-digital-twin` project:

```sh
npm ci
npm run build:pages
node scripts/stage-public-demo.mjs /absolute/path/to/u-science-lab.github.io
```

The staging script audits file types, private document links, source maps and
common credential patterns before replacing the generated demo directory. It
does not push anything. Review the diff in this repository, then commit and push
to `main`. No cross-repository access token is stored in this public repository.
Private-project pushes create a build artifact, not an automatic public release.

To preview locally, run `python3 -m http.server 8090` from this directory and open
http://localhost:8090/. Both the homepage and `/autofish-digital-twin/` work there.

## Boundaries

The public demo does not poll localhost, connect to a Python bridge or control
hardware. Its setup, experimental timing, geometry and reagent use are models,
not measured instrument performance. Shared collaboration documents remain
separately access-controlled. The homepage intentionally contains no project listing;
the demo is reached directly by its URL.

GitHub organization membership, repository access and website access are separate:
this website is public, regardless of private development repository membership.
