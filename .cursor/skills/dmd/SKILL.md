---
name: dmd
description: Browse and apply curated DESIGN.md style guides from the awesome-design-md collection. Use when the user asks for a specific brand/style (e.g., Apple, Stripe, Cursor), wants a DESIGN.md generated in that style, or asks to reference/design from the awesome-design-md library.
---

# DMD

Use this skill to quickly pick a style from the local awesome-design-md collection and apply it to the user’s requested output.

## Workflow

1. List available styles under `assets/design-md/`.
2. If the user names a brand/style directly, open that folder’s `DESIGN.md`.
3. If the user does not name one, suggest 3-5 close options and ask which one to use.
4. Generate or rewrite the requested content in that selected style.
5. Keep the output concise unless the user asks for a long form.

## Notes

- Source collection is copied from `VoltAgent/awesome-design-md`.
- Each style folder usually contains `DESIGN.md`, `README.md`, and previews.
- Prefer `DESIGN.md` as the primary reference.
