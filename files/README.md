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

## Résumés

Two PDFs, built from the LaTeX sources kept outside this repository
(`LI_KAI_中文简历/` and `LI_KAI_English_CV/`, both compiled with XeLaTeX):

| Language | File              | `_data/profile.yml` key |
| -------- | ----------------- | ----------------------- |
| English  | `files/cv-en.pdf` | `cv_pdf_en`             |
| Chinese  | `files/cv-zh.pdf` | `cv_pdf_zh`             |

Both are offered on `/cv/` and `/minimal/`; emptying a key hides that button.
After editing a LaTeX source, recompile and copy the resulting `resume.pdf`
over the file above — keep the two language editions in sync.
