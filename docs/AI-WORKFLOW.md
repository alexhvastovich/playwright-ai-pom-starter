# Playwright with an AI coding agent

The AI layer should orchestrate the test architecture, not replace it.

```text
Specification
    ↓
Repository instructions + skill
    ↓
Page Object + lazy fixture + test
    ↓
Typecheck and Playwright execution
    ↓
Trace, screenshot, root-cause analysis
```

## Why the layers matter

- `AGENTS.md` states repository-wide invariants.
- `skills/add-playwright-test/SKILL.md` gives the agent a repeatable workflow.
- `specs/` records intent before implementation.
- `pages/` owns locators and browser mechanics.
- `pages/ManagePage.ts` owns lazy Page Object construction.
- `fixtures/pom.fixture.ts` injects only the unified manager.
- `test-data/` is imported directly by scenarios that need it.
- `tests/` remain short and describe behavior.
- `npm run check` is the gate. AI code does not bypass it.

The result is not “AI writes selectors.” The result is an agent that can inspect
the product, respect the same design constraints as the team, run the suite,
and revise its work from evidence.

