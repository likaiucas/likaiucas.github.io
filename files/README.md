# Downloadable files

## Paper PDFs

Name each PDF after the paper's short name and reference it from
`_data/publications.yml` (`links.pdf`).

| Paper       | Expected file           | `links.pdf` value        |
| ----------- | ----------------------- | ------------------------ |
| OBM         | `files/obm.pdf`         | *(still missing)*        |
| PolyFootNet | `files/polyfootnet.pdf` | `/files/polyfootnet.pdf` |
| DragOSM     | `files/dragosm.pdf`     | `/files/dragosm.pdf`     |
| DragRoof    | `files/oblicity.pdf`    | `/files/oblicity.pdf`    |
| LODEOT      | `files/lodeot.pdf`      | `/files/lodeot.pdf`      |
| Scenix      | `files/scenix.pdf`      | `/files/scenix.pdf`      |

Every link field (`pdf`, `arxiv`, `code`, `project`, `doi`) is optional — an
empty value simply hides its button, so there are never dead links on the page.

External URLs are used verbatim; paths starting with `/` are resolved against
the site root.

## Résumé

The CV page's "Download CV (PDF)" button points at `files/cv.pdf`
(configured via `cv_pdf` in `_data/profile.yml`). Drop your résumé there to
activate it.
