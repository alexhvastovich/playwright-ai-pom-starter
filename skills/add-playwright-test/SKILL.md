---
name: add-playwright-test
description: Plan, generate, validate, or heal Playwright UI tests in this repository using the official Playwright Test Agents, Page Object Model, lazy page-manager fixture, test-id convention, and evidence-based failure loop. Use for new browser flows, test plans, generated tests, locator changes, failing UI tests, or requests to run the planner, generator, or healer.
---

# Add a Playwright test

Follow the repository architecture. Treat generated code as a draft until it
passes the same checks as human-written code.

## Select the agent

- Use `playwright_test_planner` to explore a flow and save a plan in `specs/`.
- Use `playwright_test_generator` to implement one scenario from that plan.
- Use `playwright_test_healer` only after a reproducible test failure.

For a complete new flow, run planner, then generator, then the validation gate.
Invoke healer only if the gate fails for test-code reasons.

## Complete flow

1. Read `AGENTS.md` and the relevant file in `specs/`.
2. Ask `playwright_test_planner` to explore the flow through
   `seeds/login.seed.spec.ts` and save a precise Markdown plan.
3. Review the plan for intent, independence, data safety, and expected results.
4. Use `$name-playwright-test` to assign the scenario's stable test case ID,
   title, and file name.
5. Ask `playwright_test_generator` to implement one named scenario from the
   plan while obeying the POM and locator contracts below.
6. Move selectors and browser actions into a class in `pages/`.
7. Add its lazy getter to `pages/ManagePage.ts`.
8. Keep fixture wiring in `fixtures/pom.fixture.ts`.
9. Keep the generated test behavior-focused and import from that fixture.
10. Run the narrow test, then `npm test`.
11. If a test fails, inspect the trace, screenshot, DOM, and product behavior.
12. Invoke `playwright_test_healer` only when evidence identifies test code as
    the responsible layer. Re-run the narrow test and full gate afterward.

## Test-id convention

- Use `data-testid` as the product attribute and `getByTestId()` in Playwright.
- Name IDs by stable meaning, not layout: `btn-login`, `input-email`,
  `nav-user-menu`, `error-login`.
- Use lowercase kebab-case with an element-role prefix.
- Do not encode styling, position, generated IDs, or changing copy.
- Do not add a test ID when `getByRole()` or `getByLabel()` is already unique
  and stable.
- Keep every locator in a Page Object. Tests never call `page.locator()`.

Locator priority for this repository:

1. `getByRole()` with an accessible name.
2. `getByLabel()` for labelled form fields.
3. `getByTestId()` for an explicit automation contract or ambiguous control.

## Trigger prompts

Planner:

> Use the `playwright_test_planner` subagent. Start from
> `seeds/login.seed.spec.ts`, explore the logout flow, and save the plan under
> `specs/`. Follow `AGENTS.md`.

Generator:

> Use the `playwright_test_generator` subagent to implement the logout
> scenario from `specs/logout.md`. Keep locators and actions in Page Objects,
> expose them through `pm`, and import the fixture in the test.

Healer:

> Use the `playwright_test_healer` subagent on the failing logout test.
> Reproduce it, inspect trace and DOM evidence, classify the root cause, change
> the smallest responsible layer, then run the narrow test and `npm test`.

Complete flow:

> Use the official Playwright planner and generator subagents to plan and
> implement the logout flow from `seeds/login.seed.spec.ts`. Validate with
> `npm test`. If and only if a generated test fails because of test code,
> use the healer, then re-run the complete gate.

## Non-negotiable rules

- Never put `page.locator`, XPath, CSS classes, or `nth-child` in a test.
- Never use `waitForTimeout`.
- Never instantiate a page object inside a test.
- Never add secrets, private URLs, or real user data.
- Do not weaken an assertion merely to make a failure disappear.
- Do not let the healer skip a test merely to make the gate green. Follow
  `docs/FIXME.md`; a `fixme` requires a confirmed product defect, an issue
  reference, evidence, and a written explanation.

## Failure loop

When a test fails:

1. Reproduce the failure.
2. Classify it as product behavior, test data, environment, or test code.
3. Inspect trace, screenshot, DOM, network, and product evidence as relevant.
4. Classify the responsible layer: product, specification, environment, data,
   Page Object, or test.
5. Change the smallest responsible layer.
6. Re-run the narrow test and the full gate.
