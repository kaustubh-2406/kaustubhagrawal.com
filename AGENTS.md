# kaustubhagrawal.com

Kaustubh's personal portfolio (a blog comes later), built with Astro 7 and Tailwind v4. A static site with one dark theme that ships no JavaScript unless a feature needs it.

## Run it

```
pnpm astro dev --background    # then: pnpm astro dev stop | status | logs
pnpm check                     # type-check; pnpm build runs it too
pnpm format                    # Prettier: whitespace, quotes, Tailwind class order
```

**Images:** `pnpm cover` makes on-brand cover images and `pnpm diagram` renders Mermaid diagrams to SVG. Usage is in the header comment of each script in `scripts/`.

**Resume:** the PDF at `public/kaustubh-agrawal-resume.pdf` is printed from `src/data/career.ts` by the `generate-cv` skill (via `src/pages/prototype/cv-print.astro`, which isn't a throwaway prototype). Reprint it when career bullets change.

**Stale servers:** a dev or preview server keeps serving the build it started with, and gives no sign of it. If a change doesn't show up, find the server's PID (`ps aux | grep astro.mjs`), kill that PID, and start a fresh one before you debug the code. A file created while the server runs gets no Tailwind classes until a restart, so after adding a page or component, restart and check that one of its classes is served.

## Done means

- `pnpm check` reports 0 errors and `pnpm format:check` passes.
- You've told Kaustubh what changed, page by page. He checks it in the browser himself; if something looks risky to you, ask him to look at that specific thing.

## Before you decide something

- **How it should look or behave:** `wayfinder/spec.md` is the build reference, and the decision tickets under `wayfinder/` hold the reasoning. Follow them; raise a conflict instead of quietly diverging.
- **A decision made while building:** record it in the build ticket that owns it (`wayfinder/build/tickets/`). Keep decision history there, not in code.
- **Naming something:** use the terms in `CONTEXT.md` (Role, Employer, Project, Glance card…). For a new concept, add the term there first, then name the code after it.
- **Routing, components, content collections or styling:** read the matching Astro guide first: [routing](https://docs.astro.build/en/guides/routing/), [components](https://docs.astro.build/en/basics/astro-components/), [content collections](https://docs.astro.build/en/guides/content-collections/), [styling](https://docs.astro.build/en/guides/styling/).
- **Trying out a new look:** one exploration is one file in `src/pages/prototype/`, with a pill switcher between variants. A new round adds variants to that file and leaves the existing ones as they are. Once he picks and it's applied, move the file to `wayfinder/build/prototype-archive/` (frozen references).
- **Changing copy** (career data, About rows, project text): it's his content. Propose wordings first (the `copy-review` skill, or a proposal file in `wayfinder/build/copy/`) and apply only his picks. Every fact must trace to something he said or wrote.

## Structure

Every pattern has **one home**, so changing it is a one-place edit:

- Markup used by more than one page → a component in `src/components/`.
- A look that Markdown/MDX also needs (`doodle`, `doodle-note`, `bullets`) → an `@utility` in `src/styles/global.css`.
- Derived data (grouping roles, finding the current project) → a function or constant in `src/data/` that returns the result. Pages render it as-is.

Keep modules **deep**: a small interface hiding real work (`<GlanceCard label>`). Apply the deletion test before extracting something: if deleting it would make its logic reappear in several callers, it earns its place. If it only forwards props or a class, inline it. Add a prop or variant once a second caller needs a different value.

**The tag carries meaning, the class carries looks.** Write `<h2 class="doodle">` and let the caller pick the heading level. Side summaries are labelled `<aside>`s.

## Styling

- **Tokens:** `src/styles/global.css` is the single source for colours, type scale, fonts and easing. Use its classes (`bg-surface`, `text-heading`, `font-mono`, `text-meta`), and add a token there when a value is missing. When you change a colour, update the hand-copied palette in both `scripts/generate-*.mjs` too.
- **Tailwind's default scales and named sizes**, rather than arbitrary values.
- **Headings:** page-section headings and `h2` inside writing use `doodle`; `h3` and below are typeset bold (`Prose` applies this to Markdown).
- **Utilities first.** Reach for a scoped `<style>` block only for what utilities can't express cleanly, such as pseudo-elements or gradients driven by CSS variables.

## Code style

- **Prettier owns formatting** (`.prettierrc.json`): tabs, single quotes, 120 columns, Tailwind classes sorted. Run `pnpm format` rather than hand-formatting.
- **One-line comments** that explain _why_, or a non-obvious _what_. Tickets, spec sections and decision history live in `wayfinder/`.
- **Section separators** make long files jumpable: `/* ── Section ───── */` in CSS, `// ── Section ─────` in scripts and frontmatter.

## Working with Kaustubh

- **Commits happen only on his go-ahead**, one page at a time, discussed first. He stages hunks by hand, so leave the index exactly as you found it: edit files, never `git add` or `git rm` unless he asks you to stage.
- `wayfinder/` is git-ignored: decisions and research there are local only and never part of a commit.
- Make small implementation calls yourself and state them in a line. Ask about taste, his own content, or anything hard to reverse, one or two questions at a time.

Add rules here as they come up.
