---
name: add-playwright-test
description: Add or repair Playwright UI tests in this repository using its Page Object Model, lazy page-manager fixture, locator contract, and evidence-based validation. Use for new browser flows, regression tests, locator changes, failing UI tests, or requests to let an AI agent generate or heal a Playwright test.
---

# Add a Playwright test

Follow the repository architecture. Treat generated code as a draft until it
passes the same checks as human-written code.

## Workflow

1. Read `AGENTS.md` and the relevant file in `specs/`.
2. Inspect the live page with Playwright before choosing locators.
3. Prefer `getByTestId`, then `getByRole`, then `getByLabel`.
4. Add selectors and browser actions to a class in `pages/`.
5. Add a lazy getter to `fixtures/pom.ts` when introducing a page object.
6. Write a short behavior-focused test that imports from `fixtures/pom`.
7. Run the narrow test, then `npm run check`.
8. Inspect the trace or screenshot before changing a failing locator.

## Non-negotiable rules

- Never put `page.locator`, XPath, CSS classes, or `nth-child` in a test.
- Never use `waitForTimeout`.
- Never instantiate a page object inside a test.
- Never add secrets, private URLs, or real user data.
- Do not weaken an assertion merely to make a failure disappear.

## Failure loop

When a test fails:

1. Reproduce the failure.
2. Classify it as product behavior, test data, environment, or test code.
3. Inspect trace and DOM evidence.
4. Change the smallest responsible layer.
5. Re-run the narrow test and the full gate.

