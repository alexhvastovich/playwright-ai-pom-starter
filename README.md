# Playwright AI + Page Object Model Starter

A small public project showing how an AI coding agent can work inside a
maintainable Playwright architecture instead of generating disposable scripts.
The examples run against the educational login page at
[alexusadays.com/login](https://alexusadays.com/login).

## The architecture

```text
Playwright scaffold                  AI orchestration layer
───────────────────                  ──────────────────────
specs/          intent      ───────▶  AGENTS.md       constraints
pages/          POM         ───────▶  skill           workflow
fixtures/       lazy PM     ───────▶  agent           implementation
tests/          behavior    ───────▶  npm run check   evidence
```

Playwright remains the deterministic test runner. The AI layer receives
repository context, follows a reusable skill, writes inside established
boundaries, executes the suite, and revises its work from traces and failures.

## Install and run

```bash
npm install
npx playwright install chromium
npm test
```

Run visibly:

```bash
npm run test:headed
```

Override the public target without changing code:

```bash
BASE_URL=https://example.test npm test
```

On PowerShell:

```powershell
$env:BASE_URL = "https://example.test"
npm test
```

## Playwright Test Agents

This project includes Playwright's official Codex agent definitions:

- `playwright_test_planner` explores the application and saves a Markdown plan.
- `playwright_test_generator` turns a plan into executable Playwright tests.
- `playwright_test_healer` runs and repairs failing tests from browser evidence.

The definitions live in `.codex/agents/` and use `tests/seed.spec.ts` to enter
the public login flow through this repository's Page Object fixture.

Regenerate them after upgrading Playwright:

```bash
npx playwright init-agents --loop=codex
```

The generated agents are the Playwright integration. `AGENTS.md` supplies this
repository's architectural constraints, while `skills/add-playwright-test/`
documents the local POM workflow and validation rules.

## Page Object Model

Tests describe behavior:

```ts
await pm.login.open();
await pm.login.login('BestStudent', 'Password123!');
await pm.login.expectLoginSucceeded();
```

The page object owns mechanics:

```ts
private get usernameInput(): Locator {
  return this.page.getByLabel('Username');
}

private get submitButton(): Locator {
  return this.byTestId('btn-login');
}
```

The lazy page manager creates only the page objects a test actually uses and
gives every test one consistent entry point: `pm`.

## Locators

The project uses this order:

1. `getByTestId` for an explicit product/test contract.
2. `getByRole` for accessible interactive semantics.
3. `getByLabel` for labelled form controls.

See [docs/LOCATORS.md](docs/LOCATORS.md).

## AI skills

[`skills/add-playwright-test/SKILL.md`](skills/add-playwright-test/SKILL.md)
teaches an AI agent the repository-specific workflow. `AGENTS.md` defines the
rules; the skill defines the repeatable procedure.

A useful prompt is:

> Use `$add-playwright-test` to add a logout test. Inspect the page first, keep
> locators in the POM, and run the validation gate.

See [docs/AI-WORKFLOW.md](docs/AI-WORKFLOW.md) for the complete loop.

## What was intentionally excluded

This teaching repository contains no copied application code, private URLs,
credentials, customer data, screenshots, or product-specific test cases from
the architecture that inspired it. The implementation and documentation are
original and target Alex’s public test-practice site.

## License

MIT
