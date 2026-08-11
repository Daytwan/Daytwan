# Cobalt Signal

The canonical production direction for Daytwan Shirley's single-viewport,
mode-driven Living Poster.

## Visual thesis

A saturated cobalt field carries warm-bone typography and hot-coral signals,
giving the poster the crisp energy of a modern cultural broadside. The
oversized identity remains the architecture rather than becoming a conventional
hero.

## Content plan

- About reduces to the single statement `Mile-High AI Automation.`
- Code centers Codex, GPT-5.6-Sol, and the 5b+ token milestone.
- History presents Professional Experience and the roles behind it.
- Contact combines direct phone and email actions with education.
- Resume, GitHub, and email remain available in every mode.

## Interaction thesis

The poster recomposes in place when a visible mode control or number key 1–4 is
used. Content enters with a short typographic settle, the coral mode state
provides an immediate directional cue, and link hovers echo that same signal.
Reduced-motion users see an instant state change. On compact screens, the same
poster becomes a full-screen composition with persistent bottom actions rather
than a long landing page. Short landscape screens use a dedicated side-control
composition so the active panel keeps the full available height.

## Implementation notes

- Palette is translated from
  `data/living-poster-color-studies/living-poster-color-study-01.png`.
- Warm bone `#f3efe2` is the field, cobalt `#052a9e` is the primary type, and
  hot coral `#ff5d62` carries display accents and rules. Readable coral
  `#ff7d80` gives small accent text and compact controls at least 4.5:1
  contrast against cobalt.
- Nimbus Sans Narrow remains the bundled display face. Supporting text uses
  the system Arial/sans-serif stack, avoiding an 826KB initial font transfer.
- Compact utility actions retain 44px minimum touch targets, the complete name
  lockup has a deliberate optical top margin, and persistent links use
  restrained, reduced-motion-safe hover feedback.
- The responsive system now has three intentional regimes: the full editorial
  rail where both width and height support it, a compact bottom-control layout
  for tablets and phones, and a short-landscape side rail. A fourth narrow,
  very-short reflow lets high-zoom users scroll every Contact detail and
  action. The old 900/901px topology cliff has been removed.
- Shared fluid edge, body, and micro-type tokens keep supporting copy at a
  professional reading size. Display type still scales strongly, but is
  constrained by both viewport axes where height is the limiting dimension.
- The masthead is a semantic two-word heading set in the real bundled 700 face.
  Its word-specific optical tracking, measured gap, and width-aware scale keep
  `DAYTWAN SHIRLEY` deliberate and fully separated from the identity block
  across desktop, compact, mobile, and short-landscape regimes.
- The About statement is the sole primary message in that mode and now uses a
  confident 24–40px responsive scale with a wide editorial measure. Location
  and Focus metadata were removed so the statement stands alone.
- Contact keeps the exact `Reach out Today!` wording in warm bone. At narrow
  mobile sizes, semantic Phone and Email rows preserve stronger 14–16px blue
  labels, readable-coral values, 44px targets, and clear the persistent utility
  rail.
- Initial masthead and About-statement reveals are short and non-looping. Mode
  changes prepare their entering state before the panel becomes visible,
  supporting copy primarily fades, and the masthead remains geometrically fixed
  through every mode change. Compact screens use less panel travel;
  reduced-motion presentation is instantaneous and transform-free.
- The visible Code and History modes retain the stable internal `#proof` and
  `#practice` hashes so existing links and browser history remain compatible.
- The redundant keyboard cue remains removed. Denver coordinates now occupy a
  quiet readable-coral vertical rail on supported desktop canvases and disappear
  below 1200px to keep compact layouts uncluttered. Mode buttons ship natively
  disabled and are enabled only after JavaScript installs their
  interaction handlers and initializes the active mode, so a failed script
  cannot leave false interactive affordances.
- The skip link targets the content stage without resetting a deep-linked
  mode, and the static HTML remains readable if the enhancement script fails.
- Contact uses explicit title/copy and links/education rows so phone and email
  remain visible without pushing education beyond the poster.
- Active mode controls use an uninterrupted coral field with blue text; the
  former white inset stripe was removed. Keyboard focus remains visible through
  palette-native coral/blue outlines.
- Destinations, four-mode behavior, responsive layout, and reduced-motion
  handling are inherited from the verified Living Poster baseline. The
  no-JavaScript fallback mirrors the current visible mode content.
- The decorative and active identity lockups retain the baseline's complete,
  responsive `DAYTWAN SHIRLEY` fit.

## Local preview

From the repository root:

```bash
python3 -m http.server 4173
```

Open `/showcase/personal-website-living-poster-set/cobalt-signal/`.

No package install or build step is required.

## Production preparation

- Run `python3 tools/build-cobalt-release.py` from the repository root to create
  the allowlisted public artifact at `dist/cobalt-signal/`. Publish that
  generated directory, not the source directory.
- `release-manifest.txt` is the audited public-file contract. The staging tool
  rejects missing, unsafe, duplicate, or non-allowlisted paths; refuses an
  existing output directory; and emits sorted hashes in `SHA256SUMS`.
- The 1200×630 release image is captured from the settled About view at
  `assets/social-preview.png`. Add its absolute Open Graph and Twitter URL only
  after the production domain is known.
- [`DEPLOYMENT.md`](DEPLOYMENT.md) defines the generated publish artifact,
  strict-CSP baseline, verification commands, and provider-neutral launch
  checklist.
- [`THREE_EFFECTS_PLAN.md`](THREE_EFFECTS_PLAN.md) defines the future
  `Signal Loom` Three.js effect, quality tiers, lifecycle, and static fallback.
- [`assets/FONT-LICENSES.md`](assets/FONT-LICENSES.md) records the current
  bundled font hashes, verified upstream sources, included official notice
  files, and the owner/legal license acceptance still required before a public
  release.

No Three.js runtime, dependency, hosting provider, domain, or deployment is
configured in the current milestone.
