# Bundled Font Provenance

Observed metadata and SHA-256 checksums for the unmodified files currently in
this directory:

| File | Observed family/style and version | SHA-256 |
| --- | --- | --- |
| `NimbusSansNarrow-Regular.otf` | Nimbus Sans Narrow Regular, 1.00 | `0111cf7c05377c4f1685d37bfa8b3edd2033278122f69e0a9803a8514e352b99` |
| `NimbusSansNarrow-Bold.otf` | Nimbus Sans Narrow Bold, 1.00 | `6d7cec07f5a9035e208532dab35a51312aef4a7f26eb524dd614c9fcd97c3264` |
| `LiberationSans-Regular.ttf` | Liberation Sans Regular, 2.1.5 | `baccc64becc3eb7d104b7c84d99f5314a0a1f896e2b3ea6c2f22fc08d2003bee` |
| `LiberationSans-Bold.ttf` | Liberation Sans Bold, 2.1.5 | `769673c4355020b1e28a14c366a152da410ab6b16239fe883ebc35b73624835b` |

The two Nimbus hashes exactly match the corresponding files in the official
[Artifex URW Base 35 repository](https://github.com/ArtifexSoftware/urw-base35-fonts).
That repository publishes the fonts under the
[GNU Affero General Public License version 3 with its stated font-embedding
exception](https://github.com/ArtifexSoftware/urw-base35-fonts/blob/master/LICENSE).
Verbatim upstream copies of that repository's `LICENSE` notice and `COPYING`
AGPL text are included at `assets/licenses/LICENSE` and
`assets/licenses/COPYING`; both files are part of the allowlisted public
release artifact.

The Liberation files report the same family version and embedded SIL Open Font
License 1.1 notice documented by the official
[Liberation Fonts repository](https://github.com/liberationfonts/liberation-fonts)
and [license](https://github.com/liberationfonts/liberation-fonts/blob/main/LICENSE).
They remain in the asset directory for provenance continuity but are no longer
loaded by the production stylesheet.

## Public-release decision still required

This provenance record and inclusion of the official notices are not legal
approval. Before public release, the site owner or qualified counsel must
accept the Nimbus AGPL redistribution and notice obligations for this
distribution, including the repository's stated font-embedding exception. If
those terms are not acceptable, replace Nimbus with a webfont whose terms are
accepted and re-run typography and layout QA.
