# Phase 10 — Stone Concierge

## Experience
An optional, full-page consultation at `/concierge`, in the selected dark cinematic direction. An image-led opening leads into three short steps: the piece and setting; style and palette; dimensions, budget and country. Results contain photographic catalogue references, the reason for each visual match, and an explicit studio handoff. Visitors can revise their answers or clear the consultation. No simulated typing or pretend AI conversation.

## Truth and content
Launch in **guided catalogue mode**. Current records are visual studies, not confirmed specifications. Match only category, visible tone and pattern. Dimensions, budget and country inform the brief, not feasibility, pricing or delivery eligibility. Outdoor and wet-area suitability, stone identity, finishes, stock and timing require studio confirmation. Architectural projects use material references rather than fabricated product matches.

## Architecture
Use the existing Next.js application and asynchronous catalogue repository. A bounded, validated same-origin API computes deterministic recommendations. A server-only provider contract accepts a constrained catalogue projection and may rank known IDs; all provider output must pass an allowlist validator. No generated prose, prices or specifications enter the UI. Unavailable, invalid or timed-out providers fall back to guided results. No unused AI SDK or credentials are added. A future AI SDK adapter can implement the contract without replacing UI or content models.

## Privacy and conversion
Preferences are processed by this site for the recommendation and retained in tab memory only. No contact information is requested here. No persistence, external AI, logs of preferences or third-party analytics. The visitor explicitly adds a readable summary to the existing local inquiry, preserving previous notes and configuration. Nothing is sent to SH MARBLES by preparing a brief.

## Verification
Unit tests for input boundaries, empty catalogue, matching, output allowlists and safe fallback. Browser tests for all steps, revising, errors, reset, inquiry handoff and responsive layouts at seven widths. Axe checks, keyboard testing, production build and TypeScript verification. Document live AI and inquiry delivery as remaining integrations.
