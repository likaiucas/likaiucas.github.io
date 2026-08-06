# Paper teaser figures

Drop your method/overview figures here, then point to them from
`_data/publications.yml` (`teaser:` field of each paper).

## Naming convention

| Chapter | Paper       | Expected file                    | `teaser:` value                    |
| ------- | ----------- | -------------------------------- | ---------------------------------- |
| 1       | OBM         | `images/papers/obm.png`          | `/images/papers/obm.png`           |
| 2       | PolyFootNet | `images/papers/polyfootnet.png`  | `/images/papers/polyfootnet.png`   |
| 3       | DragOSM     | `images/papers/dragosm.png`      | `/images/papers/dragosm.png`       |
| 4       | DragRoof    | `images/papers/oblicity.png`     | `/images/papers/oblicity.png`      |
| 5       | LODEOT      | `images/papers/lodeot.png`       | `/images/papers/lodeot.png`        |
| 6       | Scenix      | `images/papers/scenix.png`       | `/images/papers/scenix.png`        |

## Specification

- **Aspect ratio**: 16:9 (the card crops with `object-fit: cover`, so keep the
  important content away from the extreme edges).
- **Width**: ~1600 px is plenty; anything wider only costs bandwidth.
- **Format**: PNG or WebP. Avoid PDF/EPS — browsers cannot render them inline.
- **Background**: a light or transparent background works in both themes;
  pure-white figures look fine because the card adds a subtle top gradient.

## What happens if a figure is missing

Nothing breaks. Two independent fallbacks are in place:

1. If `teaser:` is empty, a branded gradient placeholder showing the paper's
   short name is rendered — **no network request, no 404**.
2. If `teaser:` is set but the file is absent, an `onerror` handler swaps the
   card to that same placeholder at runtime.

So you can publish the site today and add figures one at a time.

## Social card

`images/og-cover.png` (1200×630) is used as the Open Graph / Twitter preview
image. Until you add it, the site automatically falls back to
`images/mybib.jpg`.
