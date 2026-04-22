---
name: prd-writer
description: Write product requirement documents with clear scope, goals, user flows, interaction details, business rules, edge cases, and test cases. Use when the user asks for requirement docs, product explanations, feature specifications, PRDs, implementation-facing product docs, or wants documentation rewritten into a more standard PRD structure.
---

# PRD Writer

Use this skill to produce product requirement documentation that is structured, implementation-aware, and easy for design, engineering, testing, and product stakeholders to review.

## Core Principle

A good PRD is not just a feature summary. It should define:
- what problem is being solved,
- who it serves,
- what is in scope and out of scope,
- how the interaction works,
- what business rules and constraints apply,
- what edge cases matter,
- and how the feature should be tested.

## Default Output Structure

When writing or rewriting PRD content, prefer this structure unless the user asks for another format:

1. Background / Context
2. Goal / Objective
3. Scope
   - In scope
   - Out of scope
4. User Roles / Target Users
5. Core User Flow
6. Page / Module Information Architecture
7. Interaction Design
8. Business Rules / Constraints
9. Data / Field Definitions
10. State Handling / Edge Cases
11. Acceptance Criteria
12. Test Cases
13. Risks / Open Questions

## Writing Rules

- Be concrete and implementation-facing.
- Avoid vague phrases like “optimize experience” unless followed by measurable or observable behavior.
- Use explicit conditions, triggers, and outcomes.
- Separate UI behavior from business rules.
- Distinguish required fields from optional fields.
- Write edge cases explicitly.
- When documenting an existing implemented feature, describe the current implemented behavior first, then note any known gaps.
- Keep terminology consistent across the whole document.

## When Rewriting Existing Docs

If the project already has requirement text:
1. Preserve the actual implemented behavior.
2. Normalize the wording into a PRD format.
3. Fill missing sections where possible from the code and current interaction.
4. Do not invent backend capabilities that do not exist.
5. Call out assumptions or TBD items clearly.

## For Feature Cards / Requirement Pages

When a user wants a “需求说明” page for a feature card, the page should usually include:
- feature summary,
- implementation approach,
- interaction flow,
- business rules / restrictions,
- acceptance points,
- QA / test cases.

## Style

- Professional, concise, and review-friendly.
- Prefer bullet lists and section blocks over long prose.
- Use headings that engineering, QA, and PM can scan quickly.
- Keep language explicit and operational.
