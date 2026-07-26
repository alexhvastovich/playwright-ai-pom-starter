# Repository architecture

This repository separates intent, browser mechanics, test orchestration, and
execution evidence so an AI agent has one obvious implementation path.

```text
specs/                         Human-readable intent and stable test case IDs
    |
    v
.codex/agents/                 Official Playwright planner/generator/healer
skills/                        Repository-specific workflows and conventions
    |
    v
pages/                         Locators, navigation, and reusable page contracts
fixtures/pom.ts                Test-scoped lazy Page Object manager
    |
    v
tests/                         Short, behavior-focused scenarios
seeds/                         Agent environment seeds, excluded from npm test
playwright.config.ts           Runner configuration and evidence policy
    |
    v
npm run check                  TypeScript + deterministic Playwright gate
```

## Directory responsibilities

| Path | Owns | Must not own |
| --- | --- | --- |
| `specs/` | Scenarios, IDs, steps, expected results | Selectors or implementation |
| `pages/` | Locators and browser actions | Scenario-specific test data |
| `fixtures/` | Test-scoped object construction | Product behavior |
| `tests/` | Scenario flow and outcomes | Raw selectors or page construction |
| `seeds/` | Planner/generator environment entry points | Product coverage |
| `skills/` | Repeatable agent procedures | Generated agent definitions |
| `.codex/agents/` | Playwright-generated subagents | Repository conventions |

## Dependency direction

Tests import the fixture. The fixture constructs Page Objects. Page Objects use
Playwright. Dependencies do not point back toward tests.

```text
test -> pm fixture -> Page Object -> Playwright Page
```

This keeps a selector change inside one Page Object and prevents generated
tests from inventing competing patterns.

`PageManager` is test-scoped and lazy: each getter constructs its Page Object
on first access with `??=` and reuses that instance for the remainder of the
test. Adding a Page Object requires a matching lazy getter rather than direct
construction inside a scenario.

## AI boundary

The planner records intent, the generator drafts executable tests, and the
healer diagnoses reproducible failures. `AGENTS.md` and repository skills add
local constraints. None of these replace `npm run check`, which remains the
source of pass/fail evidence.
