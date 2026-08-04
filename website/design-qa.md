# Cobalt Signal — Name and Motion Final QA

Date: 2026-07-28  
Release candidate: `showcase/personal-website-living-poster-set/cobalt-signal/`  
Browser: Chromium  
Device scale factor: 1  
Verdict: no actionable P0, P1, or P2 finding remains

## Visual source comparison

- Selected design source:
  `data/living-poster-color-studies/living-poster-color-study-01.png`
- Source pixels: 1586 × 992
- Normalized source:
  `output/playwright/cobalt-name-motion/final/source-normalized-1440x900.png`
- Final Chromium About render:
  `output/playwright/cobalt-name-motion/final/1440x900-about.png`
- Equal-size combined comparison:
  `output/playwright/cobalt-name-motion/final/comparison-source-final-about-2880x900.png`

The source was resized directly to 1440 × 900. Its aspect ratio differs from
the target by less than 0.1%, so normalization does not materially distort the
composition. The source and final render were inspected together as equal
1440 × 900 panels.

The final render retains the selected source's cobalt field, warm-bone
monumental typography, coral active state and rules, asymmetric mode stage,
vertical note, metadata baseline, coordinates, and persistent utility rail.
The refined About lockup remains faithful while improving its line rhythm and
tracking. No copy, destination, color, mode, or architectural drift was found.

## Responsive matrix

Evidence root:
`output/playwright/cobalt-name-motion/final/`

All four modes — About, Code (`#proof`), History (`#practice`), and Contact —
were captured and inspected at:

- 1440 × 900
- 390 × 844
- 320 × 568
- 844 × 390

Responsive contact sheets:

- `contact-sheet-1440x900.png`
- `contact-sheet-390x844.png`
- `contact-sheet-320x568.png`
- `contact-sheet-844x390.png`

All 16 mode/viewport combinations passed:

- requested and active modes match
- document and body dimensions match the viewport
- no horizontal or document overflow
- both masthead words remain fully inside the viewport
- all active text and persistent controls remain inside the viewport
- no content collision with the mode or utility rails
- no persistent-control collision
- compact controls retain at least 44px height
- exactly one tab is selected and one tab is tabbable
- settled states have no running animation
- local Nimbus Sans Narrow and Liberation Sans faces report loaded
- visible `Resume` is unaccented

## Name geometry

The complete masthead has positive optical margins in every tested viewport:

| Viewport | Top | Left | Right |
| --- | ---: | ---: | ---: |
| 1440 × 900 | 28.8px | 20.16px | 353.47px |
| 390 × 844 | 20px | 12px | 12px |
| 320 × 568 | 20px | 12px | 12px |
| 844 × 390 | 28px | 12px | 12px |

At 320 × 568 the masthead ends at 52.8px and the identity begins at 60px,
leaving a visible 7.2px vertical separation with no glyph overlap. At
844 × 390 the masthead glyphs end at x=607.48 while the identity begins at
x=749.66. The masthead ends at y=98.17 and the first main-name line begins at
y=114, leaving 15.83px between their line boxes. The broad masthead container
extends behind the reserved right column, but its rendered word boxes do not
intersect the identity.

The main About name uses two explicit word lines with one accessible heading
name. Its settled display face is Nimbus Sans Narrow in every viewport. The
desktop tracking is -5.2812px with 93.888px leading; responsive tracking and
leading reduce proportionally to:

- 390 × 844: -2.964px / 59.28px
- 320 × 568: -1.92px / 38.4px
- 844 × 390: -1.764px / 40.32px

The adjoining line boxes, consistent optical tracking, and responsive scale
produce coherent word spacing without clipping or top-name collision.

## Motion verification

Motion evidence:

- Desktop load:
  `desktop-motion-initial.png`, `desktop-motion-mid.png`,
  `desktop-motion-final.png`, and `desktop-motion-sequence.png`
- Mobile load:
  `mobile-motion-initial.png`, `mobile-motion-mid.png`,
  `mobile-motion-final.png`, and `mobile-motion-sequence.png`
- About return:
  `about-return-initial.png`, `about-return-mid.png`,
  `about-return-final.png`, and `about-return-sequence.png`
- Machine-readable timing and state evidence:
  `results.json` and `mobile-motion-results.json`

### Cold load

Before JavaScript readiness, the masthead, identity, modes, and About lead
resolve at opacity 0. This proves the final state does not flash before the
entrance begins. The persistent utility/navigation layer remains usable while
the composition prepares.

At the captured desktop mid-state, masthead, identity, mode rail, and the two
About words all have intermediate opacity and non-final transforms. Their
animations are finite, use one iteration, and have durations from 280ms to
520ms. The final state has opacity 1, zero translation, and no running
animation.

The mobile sequence uses the shorter mobile definitions: the masthead is
360ms, identity is 300ms, mode rail is 280ms, and main-name words are 330ms.
The controlled halfway capture records intermediate opacity and sub-pixel
translation; the final state is fully opaque, transform-free, and has zero
running animations. No continuous loop exists.

### Mode changes and About return

For Code, History, Contact, and About, the newly revealed primary content is
already the active visible panel at the immediate post-switch sample, but its
entry starts at opacity 0 with the intended 12px desktop translation. This
prevents a final-frame flash before the transition.

Returning from Contact to About starts only finite, one-iteration entry and
settle work. The masthead words use `masthead-settle-left` and
`masthead-settle-right`; the About words use the expected word-level arrival.
At the mid-state both effects are visibly in progress. After 600ms the return
class is removed, masthead transforms are `none`, About words are fully opaque
and settled, and no animation remains running.

### Reduced motion

With `prefers-reduced-motion: reduce`:

- the poster becomes ready without the intro class
- mode panels do not receive the entry class
- About return does not receive the return-settle class
- all entry targets compute to opacity 1, transform `none`, animation `none`,
  and transition duration 0s
- no geometric or transform motion occurs

The browser may expose two 0.01ms color-transition records on descendant mode
labels in the same event task because of the global reduced-motion safety rule;
they are not entry or transform motion, have one iteration, and are absent by
the next rendered frame. This is visually instantaneous and does not alter the
selected state or layout.

## Interaction, fallback, and assets

- Pointer selection passed for all four modes.
- Number keys 1–4 select and focus the expected mode.
- ArrowLeft, ArrowRight, Home, and End preserve tab semantics and move focus.
- Valid hashes select the requested state; an invalid hash safely displays
  About.
- Back and forward navigation restore the expected modes.
- Resume, GitHub, and Email destinations are exactly:
  `assets/Daytwan_Shirley_Resume.pdf`, `https://github.com/daytwan`, and
  `mailto:daytwan@daytwan.com`.
- CSS, JavaScript, mark SVG, Resume PDF, and all four local font assets return
  HTTP 200.
- The no-JavaScript fallback is readable at 390 × 844, has no overflow, keeps
  all three destinations, and displays unaccented `Resume`. Evidence:
  `no-js-390x844.png`.
- Chromium reported zero console warnings/errors, zero page errors, and zero
  failed requests.

## Post-QA user-content hardening

After the responsive matrix, user-authored copy changed the visible second and
third modes to Code and History. The production hardening pass preserved those
changes and corrected only consistency defects:

- the Code panel index now matches its tab,
- the History panel index now matches its tab,
- the display number renders exactly `5b+`, without the inherited duplicate
  plus,
- the no-JavaScript fallback mirrors the current Code and History content,
- the Code tools list has a current accessible label,
- the bundled display font is preloaded, and production-safe Open Graph and
  Twitter summary metadata are present without inventing a canonical URL or
  social image.

A narrow post-change Chromium check at 1440 × 900 confirmed one selected Code
tab, the sole visible Code panel, exact `02 / Code` and `5b+` text, the
`Code tools` accessible label, HTTP 200 for the preloaded font, and zero
console, page, request, or HTTP errors. Evidence:
`output/playwright/cobalt-production-hardening/final/1440x900-code.png`.

## Source integrity and release decision

`node --check` passes for `script.js`; CSS braces balance to zero; no continuous
loop primitive or infinite animation is present; and no `Résumé`/`résumé`
source match exists.

The production Resume PDF matches the original Living Poster asset:

`dae2a2b9233fbaa6e75672fe71276411a9bae799352444a4d60516f4723e83a3`

No implementation correction was required during this independent gate. The
candidate is visually faithful, responsive, finite in motion,
reduced-motion-safe, keyboard-operable, asset-complete, and free of observable
P0/P1/P2 defects in the required Chromium scope. Remaining material risk: none
within the tested browser, viewports, content, assets, and interactions.

## Amendment 10 — Identity and Copy Revision

### Responsive visual gate

Chromium passed all four settled modes at 1440 × 900, 320 × 568, and
844 × 390. Equal-size before/final comparisons were inspected at:

- `output/playwright/cobalt-identity-copy/final/comparison-desktop-before-final.png`
- `output/playwright/cobalt-identity-copy/final/comparison-mobile-before-final.png`
- `output/playwright/cobalt-identity-copy/final/comparison-landscape-before-final.png`

The first implementation exposed a P1 About overflow at 1440 × 900: the full
new statement inherited the removed name lockup's narrow 12ch, 5.1rem
treatment and extended below the viewport. QA made the authorized narrow CSS
correction by widening the statement measure and scaling its type responsively.
The corrected statement now remains complete and unclipped in all three
viewports while preserving the Cobalt composition and the user's exact copy.

The top-name word gap measures 34.203px desktop, 13.594px narrow mobile, and
29.094px short landscape, each visibly larger than its audited baseline. Both
name words remain fully in frame. `AI Engineer` computes to the coral accent;
`Denver Colorado` computes to white and a smaller font size at every tested
viewport.

The About mode contains neither the duplicate name nor an About-local title.
Code contains `Codex`, `GPT-5.6-Sol`, and `5b+ Tokens Spent!`, with no
`DataFest` or Code-local `2026`. History contains the controlled
`Professional Experience` title and no `Precision travels.` Contact contains
`Reach out Today!`, the email address, and the visible phone number. The phone
is keyboard-focusable and points exactly to `tel:+14157208492`.

### Interaction, fallback, motion, and runtime

- Each state has exactly one visible panel, one selected tab, and one tabbable
  tab.
- Pointer selection, keys 1–4, arrow keys, Home, End, valid/invalid hashes,
  and back/forward history passed.
- Resume, GitHub, email, and phone destinations are exact; visible `Resume`
  remains unaccented.
- The no-JavaScript fallback mirrors the revised About, Code, History, and
  Contact content, exposes the phone link, and has no horizontal overflow at
  320 × 568.
- Reduced motion is transform-free immediately after a mode change and settles
  with zero running animation, `animation-name: none`, and zero transition
  duration.
- CSS, JavaScript, mark SVG, Resume PDF, and all four local fonts returned
  HTTP 200.
- Chromium reported zero console errors or warnings, zero page errors, zero
  failed requests, and zero HTTP error responses.

Detailed measurements and assertions are recorded in
`output/playwright/cobalt-identity-copy/final/results.json`. `node --check`
passes for both production JavaScript and the QA harness; CSS braces balance;
the removed phrases and accented Resume spellings are absent from source.

No P0, P1, or P2 defect remains within the requested Chromium matrix.
Remaining material risk: none within the tested browser, viewports, content,
assets, interactions, reduced-motion setting, and no-JavaScript fallback.

final result: passed

## Amendment 11 — Fluid Responsive Foundation

Date: 2026-07-30

The responsive layout was refactored after a continuous-width Chromium audit
identified the former 900/901px switch as the load-bearing defect. The
replacement uses a supported desktop rail, a compact bottom-control
composition, and a dedicated short-landscape arrangement. Width-only and
height-only compact rules no longer compete at the old boundary.

Typography now uses shared body and micro-size tokens. Supporting labels and
tested control text remain at least 12px, body copy uses a 14–16px fluid range,
and the email and phone links retain 44px minimum target height. Display sizes
remain intentionally editorial while responding to both width and height.

Fresh Chromium evidence is under:

- `output/playwright/cobalt-fluid-responsive/after/`
- `output/playwright/cobalt-fluid-responsive/final/`

### Independent release gate

An independent final Chromium pass verified all four modes across the required
desktop, breakpoint, tablet, phone, and short-landscape matrix, plus live resize
probes at 359/360/361, 899/900/901, 1199/1200/1201, 640/641px heights, and
720/721px heights.

- no horizontal or vertical document overflow
- no clipped or out-of-bounds identity, content, navigation, or utility action
- exactly one active, selected, and tabbable mode
- working pointer, touch, arrow, Home/End, 1–4, hash, and history behavior
- exact Resume, GitHub, email, and phone destinations
- 44px email and phone targets at 390 × 844
- reduced-motion and no-JavaScript fallbacks passed
- zero console errors, warnings, failed requests, or asset failures
- no Three.js, WebGL, canvas, CDN, or effects runtime added

Visual evidence:
`output/playwright/cobalt-final-release/contact-sheet.png`.

Remaining public-release blockers are operational rather than responsive:
verified bundled-font provenance/license texts, hosting and domain selection,
production metadata/security headers, and a production-URL smoke test.

final result: passed

- `output/playwright/cobalt-fluid-responsive/mobile-final/`

The full four-mode matrix covered 1600×1000, 1440×900, 1280×720, 1024×768,
901×700, 900×700, 768×1024, 600×900, 480×800, 390×844, 360×800, 320×568, and
844×390, followed by a continuous 320–1600px probe. That pass found two narrow
geometry issues in the first iteration: touching compact control rails and a
560px masthead/identity overlap. The final focused rerun covered all four modes
at 560×900, 480×800, 390×844, and 320×568 after correction.

Across the combined final evidence:

- document overflow is absent;
- active panel text and persistent controls stay inside the poster;
- the masthead and identity remain separated;
- mode and utility controls no longer touch or overlap;
- exactly one mode is selected and tabbable;
- supporting/control typography has no measured size below 12px;
- Chromium reported zero console errors and zero page errors.

The production JavaScript was not changed by this refactor and continues to use
the previously verified keyboard, hash/history, reduced-motion, and
no-JavaScript behavior.

## Amendment 12 — Masthead and Editorial Precision

Date: 2026-07-30

Fresh settled Chromium captures cover all four modes at 1440×900, 1200×721,
1199×721, 1024×768, 768×1024, 561×800, 560×800, 390×844, 320×568, and
844×390. Raw renders and equal-size contact sheets are under
`output/playwright/cobalt-amendment12/implementation/`.

### Requested content and hierarchy

- The masthead is now a semantic `H1` with two word spans, the bundled 700
  face, `-0.045em` tracking, and a responsive 0.34–0.38em optical word gap.
- Measured word gaps range from 14.6px at 320×568 to 51.9px at 1440×900.
- Identity clearance measures 48.7px at 1440×900, 40.6px at 1200×721, and
  24.9px at the compact 561px threshold. Mobile left/right viewport clearance
  remains at least 12px.
- About measures 43.2px at 1440×900, 39px at 1199×721, 30px at tablet widths,
  26px at 390×844, 24px at 320×568, and 26.2px at 844×390.
- About Focus is exactly `AI Automation` in readable coral `#ff7d80`.
- Contact is exactly `Reach out Today!` in coral `#ff5d62`.
- The desktop side note is exactly `AI Automation` in warm bone.

### Layout and runtime checks

- Forty settled state checks found exactly one visible panel, selected tab, and
  tabbable tab in every viewport/mode combination.
- No tested visible state has horizontal or vertical document overflow.
- At 320×568, education clears the persistent utility rail by 25.6px and both
  email and phone targets measure 44px high.
- Chromium reported zero console warnings/errors, page errors, failed requests,
  or HTTP error responses during the matrix.
- The no-JavaScript render includes `Focus: AI Automation`, the revised Contact
  heading, and no horizontal overflow at 320×568.

The final correction narrowed only the compact masthead fit formula after the
first measurement found 8.3px clearance at exactly 561px. The settled
measurement is 24.9px. Production JavaScript and unrelated content were not
changed.

final result: passed

## Amendment 13 — Contact Hierarchy and Stable Masthead

Date: 2026-07-30

Fresh Chromium verification covered all four modes at 1440×900, 1200×721,
1024×768, 390×844, 320×568, and 844×390. Captures and the combined contact
sheet are under
`output/playwright/cobalt-amendment13/implementation/`.
An independent final pass at 1440×900, 390×844, 320×568, and 844×390 is under
`output/playwright/cobalt-amendment13/final-qa/`.

### Requested content and typography

- The About statement preserves its exact copy and now measures 30.96px at
  1440×900, 28px at 1200×721 and 1024×768, 19px at 390×844, 18px at
  320×568, and 18.99px at 844×390.
- The side note remains exactly `AI Automation` and now uses readable coral
  `#ff7d80`.
- Contact is a semantic address with Phone first and Email second. Both labels
  render in warm bone `#f3efe2`; both values render in readable coral
  `#ff7d80`.
- Phone and Email destinations remain `tel:+14157208492` and
  `mailto:daytwan@daytwan.com`.
- Every tested Contact row and value target measured at least 44px high,
  including at 320×568. The 12px supporting-label floor is preserved.
- The no-JavaScript render mirrors the Phone-before-Email order and exact
  labels.

### Stability and runtime checks

- The special About-return masthead animation and its ±5px word transforms were
  removed. The initial masthead reveal and panel entrance motion remain.
- At every tested viewport, 12 bounding-box/transform samples were taken across
  each of four returns to About: Section 2 click, Section 3 number key `1`,
  Section 4 `Home`, and Section 4 `ArrowRight`.
- The masthead box and both word boxes had exactly zero displacement in every
  sample. Word transforms remained `none`.
- All four modes retained exactly one active/visible panel and selected tab.
- No Contact content overlapped the mode or utility controls, and no tested
  viewport had document overflow.
- Chromium reported zero console errors, page errors, failed requests, or HTTP
  error responses.
- `node --check`, CSS brace balance, and `git diff --check` passed.

final result: passed

## Amendment 14 — Quiet About Hierarchy

Date: 2026-07-30

### Requested hierarchy

- The right-side `AI Automation` note and `Reach out Today!` now use the
  established warm-bone `#f3efe2`.
- The About statement preserves its exact copy and uses one authoritative
  responsive rule instead of four competing breakpoint definitions.
- Its final scale is 20.88px at 1440×900 and 16px at 390×844, 320×568, and
  844×390, with a 38ch editorial measure and 1.12 line-height.

### Direct verification

- Fresh Chromium captures for About and Contact at all four viewport families
  are under `output/playwright/cobalt-amendment14/implementation/`.
- The independent visual and interaction gate is recorded at
  `output/playwright/cobalt-amendment14/final-qa/final-qa.md`.
- Both requested colors computed to `rgb(243, 239, 226)`.
- About remained fully inside its content stage with no document overflow.
- Masthead displacement remained exactly zero at 0/60/180/360ms in every
  tested viewport.
- Panels, hashes, keyboard paths, and external destinations passed with zero
  console or page errors.
- JavaScript syntax, CSS brace balance, and scoped diff checks passed.

final result: passed

## Amendment 15 — White Focus and Stronger Contact Labels

Date: 2026-07-30

- About Focus `AI Automation` now computes to warm-bone
  `rgb(243, 239, 226)`.
- `Phone:` and `Email:` use a responsive 14–16px scale, measuring 14px at
  320×568 and 15.84px at 1440×900.
- The compact Contact grid now sizes its label column to content instead of a
  fixed width.
- At 320×568, both labels and values remain on one line, both rows remain 44px
  tall, and document/body dimensions remain exactly 320×568.
- Fresh Chromium screenshots are under
  `output/playwright/cobalt-amendment15/`.
- Chromium reported zero errors or warnings.

final result: passed

## Amendment 16 — Singular About and Clean Mode States

Date: 2026-07-30

- About contains only `Mile High AI Automation ➡️ Pebbles to Peaks.` beneath
  its panel index. The former statement, Based row, and Focus row are absent
  from both the interactive and no-JavaScript presentations.
- Description, Open Graph, and Twitter metadata mirror the current statement.
- All four mode buttons compute to `box-shadow: none`; the active state remains
  coral `rgb(255, 125, 128)` with cobalt text and no white inset stripe.
- Compact About uses explicit grid rows so its index and statement remain
  together at the top of the content stage.
- The masthead was moved from a negative stacking layer to the poster base
  layer after Chromium reproduced an intermittent post-reload disappearance.
- Settled desktop and 320×568 evidence is under
  `output/playwright/cobalt-amendment16/`.
- Desktop document dimensions remained exactly 1440×900 and Chromium reported
  zero errors or warnings.

final result: passed

## Amendment 17 — Same-Day Release Candidate

Date: 2026-08-02

- Preserved the exact current visible copy: `Mile-High AI Automation.`,
  `Automation · Consulting · Robotics`, and `Automating [REDACTED]`.
- Synchronized description/social metadata and the no-JavaScript presentation;
  corrected the fallback History typo and added the Contact support line.
- Made the initial HTML readable when JavaScript fails, moved no-JavaScript
  hiding rules out of inline markup, and made the skip link mode-safe.
- Raised supporting microtype to 14px, moved the mobile role to readable coral,
  and retained 44px link/control targets.
- Corrected the 844×390 History title clipping with a short-landscape-only
  scale adjustment.
- Added a narrow, very-short reflow so the 320×225 high-zoom-equivalent Contact
  state scrolls from the full masthead and mode controls through phone, email,
  education, and all utility links.
- Stopped loading 826KB of Liberation font files; Nimbus remains the branded
  display face while supporting type uses the system sans stack.
- Root Chromium acceptance captures are under
  `output/playwright/cobalt-amendment17/root-qa/`.
- Final syntax and scoped-diff checks passed. Root Chromium acceptance covered
  desktop, mobile, short landscape, and 320×225 high-zoom reflow; earlier
  independent audits covered no-JavaScript, failed-script, reduced-motion,
  overflow, target size, and the full mode matrix.
- The independent final pass confirmed the corrected 844×390 History state,
  stable mode/hash behavior, no source corruption, and zero console errors.
- Public launch remains operationally blocked on accepted Nimbus licensing,
  hosting/domain configuration, production headers, and a deployed-URL smoke
  test.

final result: local release candidate passed; public deployment not authorized

## Amendment 18 — Deterministic Public Artifact

Date: 2026-08-02

- Preserved the approved Cobalt Signal composition, exact visible copy,
  destinations, four-mode interaction, and motion system.
- Kept `DAYTWAN SHIRLEY` as the single interactive-page H1 and changed the
  Code, History, and Contact display headings to semantic H2 elements without
  changing their rendered geometry.
- Replaced the CSS-generated Code label with real `Tools used` markup hidden
  from assistive technology; the tool list retains the non-duplicative
  accessible name `Code tools`.
- Corrected the 1200px short-desktop media-query overlap that stretched the
  mode rail at 1200×630. Both 1200×630 and the adjacent 1199×630 regime retain
  readable, reachable four-mode layouts.
- Captured the actual settled 1200×630 About view as
  `assets/social-preview.png`. Absolute social metadata remains deferred until
  the production domain exists.
- Added the official upstream Nimbus `LICENSE` notice and `COPYING` AGPL text
  to the release surface without representing their inclusion as legal
  approval.
- Added `tools/build-cobalt-release.py` and `release-manifest.txt`. The tool
  validates a fixed allowlist, rejects unsafe/missing paths and existing output,
  copies only reviewed public assets, and emits sorted `SHA256SUMS` in the
  ignored `dist/cobalt-signal/` artifact.
- The generated artifact excludes all internal Markdown, planning/evidence
  files, the build tool and manifest, and both unused Liberation TTFs.
- Release verification covers manifest parity, checksum validation, HTTP/MIME
  checks for included assets, 404s for excluded paths, all four Chromium modes,
  social-image dimensions, heading/ARIA structure, JavaScript syntax, HTML
  parsing, CSS balance, and scoped diff checks.

final result: deterministic local release artifact passed; public deployment not authorized

## Amendment 19 — About Type and Interface Restraint

Date: 2026-08-02

- Enlarged the exact `Mile-High AI Automation.` statement with the accepted
  `clamp(1.5rem, 2.6vw, 2.5rem)` scale while preserving the composition.
- Shortened the visible keyboard cue to `Press 1—4` and changed no other copy.
- Made the four mode controls fail-safe: source markup keeps them disabled
  until JavaScript has installed interaction handlers and initialized the
  active mode. Failed scripts now leave honest, inert controls without hover
  affordances while the About content and utility links remain readable.
- Regenerated the 1200×630 social image from the settled About view and rebuilt
  the deterministic allowlisted artifact.
- Independent final QA passed all four modes at 1440×900, 1200×630, 1199×630,
  844×390, 390×844, 320×568, and the 320×225 reflow. Exact copy, tab state,
  social-image parity, artifact hashes, syntax, HTML/CSS structure, and diff
  checks passed with no material visual defect.

final result: passed; public deployment not authorized

## Amendment 20 — Editorial Label Reduction

Date: 2026-08-03

- Removed the visible `Press 1—4` helper; the numbered mode controls remain
  self-explanatory and retain their keyboard shortcuts.
- Removed the decorative right-edge `AI Automation` label without changing the
  primary About statement.
- Removed the now-unused styling for both labels so the source matches the
  visible composition.
- Chromium inspection passed at 1200×630, 390×844, and 844×390 with no clipped
  content, collision, or new whitespace imbalance. The settled 1200×630 social
  image and deterministic release artifact were regenerated and verified.

final result: passed; public deployment not authorized

## Amendment 21 — Coordinate Rail and Resume Synchronization

Date: 2026-08-03

- Moved the exact Denver coordinates into the former right-edge vertical rail,
  changed them to readable coral, and retained the desktop-only breakpoint.
- Synchronized Contact Education to 2027 in enhanced and no-JavaScript states.
- Rebuilt the public resume from a tracked deterministic generator with the
  approved About Me sentence, `C++, Java` leading Programming & Data, and
  Education 2027. The canonical and website PDFs are byte-identical.
- Rejected the first resume render for tight inter-role spacing and an orphaned
  final word; the corrected render restores deliberate role spacing and a
  balanced two-line About paragraph without changing extracted wording.
- Automated QA passed 7/7 exact-copy, order, one-page Letter, coordinate,
  responsive, asset-parity, and release-parity tests.
- Independent Chromium visual QA passed every requested website state and the
  final full-page resume with no P0, P1, or P2 finding.
- Regenerated the settled 1200×630 social image and deterministic allowlisted
  release; all 11 checksums and public-boundary checks passed.
- Independent final review rejected one generated Python bytecode cache; the
  cache was removed recoverably and the corrected scoped repository state
  passed with no material defect remaining.

final result: passed; public deployment not authorized

## Amendment 22 — Masthead Optical Balance

Date: 2026-08-03

- Confirmed both name words inherited the same font family, 700 weight,
  152.64px desktop size, and cap height; the apparent imbalance came from the
  wider letterforms in `DAYTWAN` and narrower forms in `SHIRLEY`.
- Rebalanced only word-level tracking: `DAYTWAN` uses `-0.06em` and `SHIRLEY`
  uses `-0.015em`, preserving equal font size, cap height, established word
  break, and masthead position.
- Desktop word-width ratio improved from 1.165 to 1.064 while both words remain
  exactly 152.64px tall in type sizing with matching 125.16px boxes. Mobile
  retains the same optical relationship at an equal 44.525px font size.
- Chromium verification passed at 1440×900, 1200×630, 1199×630, 844×390,
  390×844, and 320×568. The masthead remains geometrically identical across
  all four settled modes with no horizontal overflow.
- Regenerated and inspected the settled 1200×630 social image and rebuilt the
  deterministic release; all checksums and the existing seven-check regression
  suite passed.

final result: passed; public deployment not authorized
