# Cobalt Signal — Three.js Effects Plan

## Effect concept: Signal Loom

Build a restrained field of cobalt contour ribbons that behaves like a live
technical print: thin depth-layered paths drift through the hero, briefly
aligning into clean signal bands before separating again. Coral appears only as
a short traveling pulse on one or two paths. The effect should reinforce the
site's editorial poster geometry and engineering theme; it must not become a
generic particle cloud, starfield, or full-screen spectacle.

The static composition remains the product. Signal Loom supplies depth and
response behind it.

## Mount and layering contract

- Mount one renderer inside a dedicated, `aria-hidden="true"` effects element
  owned by the hero section.
- Size from that mount element's `clientWidth` and `clientHeight`, never from
  the window alone.
- Keep the canvas below all copy and controls but above the hero's solid
  background. Reserve an explicit effects z-index between those layers.
- Apply `pointer-events: none` to the mount and canvas. The renderer must never
  intercept focus, selection, scrolling, links, or the fixed resume control.
- Clip rendering to the hero. Do not create a document-level fixed canvas.
- The mount may be empty. An empty, unsupported, or failed effects layer must
  leave the complete static site unchanged and usable.

## Responsive quality tiers

| Tier | Target | Rendering budget |
| --- | --- | --- |
| Mobile | below 640 px or low-power mode | One ribbon group, 10–14 segments per path, no post-processing, DPR capped at 1.25, 30 fps target |
| Tablet | 640–1099 px | Two ribbon groups, 16–20 segments per path, minimal additive pulse, DPR capped at 1.5, 45 fps target |
| Desktop | 1100 px and above | Three ribbon groups, 24–32 segments per path, one subtle composer pass if profiling permits, DPR capped at 1.75, 60 fps target |

Quality selection must use the mount size and capability checks, not user-agent
sniffing. Step down one tier after sustained frame-budget misses; do not step
back up during the same session.

## Motion, power, and failure behavior

- `prefers-reduced-motion: reduce`: do not start an animation loop. Render at
  most one quiet frame, or leave the static hero untouched.
- Hidden document: stop the loop immediately. Resume only when visible and the
  mount intersects the viewport.
- Low-power signals (data saver, constrained device memory where available, or
  repeated frame-budget misses): use the mobile tier or disable the effect.
- WebGL initialization, shader compilation, or context restoration failure:
  remove the canvas and keep the static site. Do not show an error to visitors.
- Never make copy legibility depend on the canvas. Maintain existing contrast
  without sampling rendered colors.

## Renderer lifecycle

- Create the renderer, scene, camera, and optional composer only after the mount
  exists and passes visibility/capability checks.
- Use `WebGLRenderer.setAnimationLoop` for animation ownership.
- Observe mount size changes. Update renderer size, camera projection, and
  composer size together; avoid redundant work when dimensions are unchanged.
- Pause for page visibility, reduced motion, and off-screen state.
- On teardown, cancel the animation loop and disconnect media-query,
  visibility, intersection, resize, pointer, and context listeners/observers.
- Dispose every geometry, material, texture, render target, composer pass, and
  renderer allocation. Remove the canvas and release renderer state/context.
- Handle `webglcontextlost` without page failure; attempt at most one controlled
  restoration before falling back to the static hero.

## Implementation sequence

1. Add the inert hero mount and its tested layering/accessibility contract.
2. Introduce Three.js through the project's chosen production dependency
   strategy; record and lock the version before writing effect code.
3. Implement one ribbon group with resize, pause, failure, and teardown paths.
4. Add responsive quality tiers and automatic quality downgrade.
5. Add the coral pulse and optional desktop post-processing only after profiling.
6. Run visual, interaction, accessibility, resize, mobile, and performance QA;
   retain the static fallback as the baseline comparison.

## Acceptance criteria

- All links, text selection, keyboard navigation, scrolling, and the fixed
  resume control behave identically with the effect enabled or disabled.
- No horizontal overflow or canvas stretching from 320 px through 1600 px
  viewport widths, including live resizing and orientation changes.
- At least 55 fps desktop, 40 fps tablet, and 28 fps mobile at the tier DPR caps
  during a 30-second profile on representative hardware; automatic downgrade
  activates after sustained misses.
- The animation stops within one frame when hidden, off-screen, or reduced
  motion becomes active.
- WebGL-disabled and forced-initialization-failure tests show the intact static
  hero with no uncaught exception.
- Mount/unmount repetition leaves no active loop, observer, listener, canvas, or
  growing GPU allocation.
- The effect passes a final editorial review as "Signal Loom," not generic
  ambient particles.
