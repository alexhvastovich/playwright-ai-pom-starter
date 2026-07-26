# Playwright Test Agents with Codex

Playwright provides three official Test Agents:

| Agent | Purpose | Output |
| --- | --- | --- |
| `playwright_test_planner` | Explore a flow | Markdown plan in `specs/` |
| `playwright_test_generator` | Implement a planned scenario | Playwright test |
| `playwright_test_healer` | Diagnose and repair a failing test | Evidence-based patch |

Install or regenerate their Codex definitions after upgrading Playwright:

```bash
npx playwright init-agents --loop=codex
```

The generated definitions are in `.codex/agents/`. The environment seed is
`tests/seed.spec.ts`.

## Trigger one agent

Ask Codex by the generated agent name.

Planner:

```text
Use the playwright_test_planner subagent. Start from tests/seed.spec.ts,
explore the logout flow, and save a plan under specs/. Follow AGENTS.md.
```

Generator:

```text
Use the playwright_test_generator subagent to implement the logout scenario
from specs/logout.md. Follow AGENTS.md: put locators and actions in the Page
Object, expose it through pm, and keep the test behavior-focused.
```

Healer:

```text
Use the playwright_test_healer subagent on the failing logout test. Reproduce
the failure, inspect trace and DOM evidence, classify the root cause, change
the smallest responsible layer, and run npm run check.
```

## Run the full agentic loop

```text
Use the official Playwright planner and generator subagents to plan and
implement the logout flow from tests/seed.spec.ts. Validate with npm run check.
If and only if the generated test fails because of test code, invoke the
healer, then rerun the narrow test and full gate.
```

The planner and generator can run independently for unrelated flows. Do not run
multiple agents against the same Page Object or test file concurrently.

## Responsibility boundary

The LLM agent orchestrates and reasons. The Playwright Test Agents contribute
specialized instructions and MCP tools. Playwright Test executes code and
produces deterministic failures, traces, screenshots, and pass results.

Generated and healed code must still obey `AGENTS.md` and
`skills/add-playwright-test/SKILL.md`. A green result is not permission to use
weak selectors, hard waits, duplicated actions, or skipped tests.
