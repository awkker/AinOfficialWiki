# Breadcrumb Responsive Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the doc-page breadcrumb align with article content and collapse responsively based on actual container width and orientation.

**Architecture:** Keep breadcrumb generation in the existing theme code, but refactor the collapsing logic into a pure function that accepts a responsive mode. In the Vue component, observe container width and viewport orientation, derive the mode, and render a single-line breadcrumb where the current page takes the remaining width and hidden ancestors stay available through the existing popover.

**Tech Stack:** VitePress theme overrides, Vue 3 with `<script setup lang="ts">`, TypeScript utility functions, CSS, `bun test`, `bun run docs:build`

---

### Task 1: Document the approved design

**Files:**
- Create: `docs/plans/2026-03-18-breadcrumb-responsive-design.md`
- Create: `docs/plans/2026-03-18-breadcrumb-responsive.md`

**Step 1: Save the approved design**

Write the design summary, responsive rules, and validation criteria into the design file.

**Step 2: Save the implementation plan**

Write this implementation plan so future work can reuse the same approach.

### Task 2: Lock the collapse behavior with tests

**Files:**
- Create: `docs/.vitepress/theme/components/ui/breadcrumbs.test.ts`
- Modify: `docs/.vitepress/theme/components/ui/breadcrumbs.ts`

**Step 1: Write the failing test**

Add focused tests for:

- `full` mode keeping all items.
- `tail-2` mode preserving the first item plus the last three visible slots.
- `root-current` mode preserving only the first and current items around an ellipsis.
- Small breadcrumb trails bypassing collapse.

**Step 2: Run test to verify it fails**

Run: `bun test docs/.vitepress/theme/components/ui/breadcrumbs.test.ts`

Expected: FAIL because the new responsive collapse API does not exist yet.

**Step 3: Write minimal implementation**

Refactor `collapseBreadcrumbItems` into a mode-aware utility with a small type for the supported responsive modes.

**Step 4: Run test to verify it passes**

Run: `bun test docs/.vitepress/theme/components/ui/breadcrumbs.test.ts`

Expected: PASS

### Task 3: Make the Vue breadcrumb container mode-aware

**Files:**
- Modify: `docs/.vitepress/theme/components/ui/Breadcrumbs.vue`

**Step 1: Write the failing test**

Skip component-level automation for this repo and use the utility test as the red bar for behavior. The component work should consume the tested utility without changing its contract.

**Step 2: Write minimal implementation**

Add container measurement and orientation detection. Map width and orientation to the collapse modes:

- wide landscape: prefer `tail-2`
- medium landscape: prefer `tail-1`
- portrait or narrow widths: use `root-current`
- short trails: `full`

Keep the current title overflow detection so Popover still appears only when needed.

**Step 3: Verify behavior compiles**

Run: `bun test docs/.vitepress/theme/components/ui/breadcrumbs.test.ts`

Expected: PASS

### Task 4: Fix alignment and single-line truncation styles

**Files:**
- Modify: `docs/.vitepress/theme/style.css`

**Step 1: Write minimal style changes**

Remove the fragile breadcrumb shell translation rules, inherit content width, and enforce:

- single-line breadcrumb layout
- fixed-width non-current items
- flexible current item
- ellipsis-safe labels and links

**Step 2: Build the docs**

Run: `bun run docs:build`

Expected: build succeeds with no theme compile errors.

### Task 5: Update breadcrumb component docs

**Files:**
- Modify: `docs/resource/project-components/breadcrumbs.md`

**Step 1: Document the new responsive behavior**

Mention that long paths now collapse according to container width and orientation, while the current page title truncates automatically and remains fully visible in Popover.

**Step 2: Verify final build**

Run: `bun run docs:build`

Expected: PASS
