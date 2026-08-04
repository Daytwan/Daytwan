# Cobalt Signal — Deployment Readiness

This is currently a static HTML, CSS, and JavaScript site. There is no package
manifest, build command, hosting provider, Git remote, domain, or deployment
configuration in place.

## Build and publish contract

- Source root: `showcase/personal-website-living-poster-set/cobalt-signal/`
- Build command, run from the repository root:

  ```bash
  python3 tools/build-cobalt-release.py
  ```

- Generated publish root: `dist/cobalt-signal/`
- Entry document: `index.html`
- Public-file contract: `release-manifest.txt` plus generated `SHA256SUMS`

The release tool is dependency-free and fail-closed. It refuses an existing
output directory, rejects unsafe, missing, duplicate, or non-allowlisted
manifest paths, copies only the reviewed public files, and writes sorted SHA-256
checksums. The host must serve `dist/cobalt-signal/` as the site root so relative
assets and the resume link resolve correctly.

Verify the artifact before upload:

```bash
cd dist/cobalt-signal
sha256sum --check SHA256SUMS
```

Preview it from the repository root:

```bash
python3 -m http.server 4173 --directory dist/cobalt-signal
```

The staged artifact intentionally excludes source documentation, planning
files, automation evidence, the release tool and manifest, and unused
Liberation fonts.

## Security-header baseline

Start with this strict Content Security Policy and loosen it only for a
specific, reviewed production requirement:

```text
default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'none'; connect-src 'none'; img-src 'self'; font-src 'self'; style-src 'self'; script-src 'self'; upgrade-insecure-requests
```

Also send `X-Content-Type-Options: nosniff` and a privacy-appropriate
`Referrer-Policy` such as `strict-origin-when-cross-origin`.

## Launch checklist

- [ ] Select a static hosting provider and connect a scoped Git remote or
      equivalent release source.
- [ ] Configure the production domain, HTTPS, certificate renewal, and
      HTTP-to-HTTPS redirect.
- [ ] Add the canonical URL, domain-specific robots/sitemap policy, and absolute
      Open Graph/Twitter image URL. The ready 1200×630 asset is
      `assets/social-preview.png` inside the release.
- [ ] Install and test the strict Content Security Policy above; explicitly
      allow only resources required by any later effects implementation.
- [ ] Add `X-Content-Type-Options: nosniff`, a suitable `Referrer-Policy`, and
      frame protections (`frame-ancestors` in CSP).
- [ ] Cache fingerprinted immutable assets for one year. Cache HTML briefly or
      require revalidation. Until assets are fingerprinted, use revalidation
      rather than long immutable caching for CSS, JavaScript, fonts, and the
      resume PDF.
- [ ] Confirm owner/legal acceptance of the verified Nimbus redistribution
      terms. Official `LICENSE` and `COPYING` notices are included in the
      release; see `assets/FONT-LICENSES.md`.
- [ ] Confirm the public resume PDF is the intended release copy and contains no
      unwanted metadata.
- [ ] Run a production-URL smoke test in Chromium on desktop and mobile:
      initial render, all four modes, hash/history behavior, keyboard focus,
      phone/email/GitHub/resume links, assets, no-JavaScript fallback, reduced
      motion, and no console/network errors.
- [ ] Check Lighthouse accessibility, performance, best-practices, and SEO
      reports; resolve release-blocking regressions rather than targeting a
      score alone.
- [ ] Record the released Git commit and preserve the preceding known-good
      release. Validate the provider's one-command or one-click rollback before
      announcing launch.

## Current release blockers

Public deployment remains blocked on owner/legal acceptance of the Nimbus
terms, confirmation that the resume's public personal information is intended,
and the hosting, domain, security-header, absolute metadata,
production-smoke-test, and rollback items above. No provider, remote, domain,
or deployment is currently configured, and this document does not authorize a
deployment.
