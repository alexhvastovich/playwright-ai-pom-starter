# Playwright AI + Page Object Model Starter

A small public project showing how an AI coding agent can work inside a
maintainable Playwright architecture instead of generating disposable scripts.
It accompanies the [Alex U.S.A. Days YouTube channel](https://www.youtube.com/@alexusadays)
and runs against the public
[Alex U.S.A. Days login practice page](https://alexusadays.com/login).

Use it to see the complete path from a human-readable specification to a
Page Object-based Playwright test, including official Playwright subagents,
repository skills, stable test naming, validation, and evidence-based healing.

## Start here

1. Read [the architecture](docs/ARCHITECTURE.md).
2. Install the project and run `npm run check`.
3. Read the two repository skills:
   - [`$add-playwright-test`](skills/add-playwright-test/SKILL.md) plans,
     generates, validates, and heals a flow.
   - [`$name-playwright-test`](skills/name-playwright-test/SKILL.md) assigns
     stable test case IDs, titles, and file names.
4. Read [the official-agent prompts](docs/PLAYWRIGHT-AGENTS.md).
5. Read [the guarded `test.fixme()` flow](docs/FIXME.md) before skipping any
   scenario.

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
For directory responsibilities and dependency rules, see
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

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

This project includes Playwright's official Codex subagent definitions,
generated from the installed Playwright version:

- `playwright_test_planner` explores the application and saves a Markdown plan.
- `playwright_test_generator` turns a plan into executable Playwright tests.
- `playwright_test_healer` runs and repairs failing tests from browser evidence.

The definitions live in `.codex/agents/` and use `tests/seed.spec.ts` to enter
the public login flow through this repository's Page Object fixture.

Regenerate them after upgrading Playwright:

```bash
npx playwright init-agents --loop=codex
```

This follows the
[official Playwright Test Agents documentation](https://playwright.dev/docs/test-agents):
planner starts from a seed test, generator consumes the saved Markdown plan,
and healer works from a reproducible failing test.

The generated agents are the Playwright integration. `AGENTS.md` supplies this
repository's architectural constraints, while `skills/add-playwright-test/`
documents the local POM workflow and validation rules.

See [docs/PLAYWRIGHT-AGENTS.md](docs/PLAYWRIGHT-AGENTS.md) for exact prompts
that trigger planner, generator, healer, and the complete agentic loop.

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

[`skills/name-playwright-test/SKILL.md`](skills/name-playwright-test/SKILL.md)
defines the test identity convention:

```text
AUTH-LOGIN-001
tests/login/auth-login-001-valid-credentials.spec.ts
test('AUTH-LOGIN-001 accepts documented demo credentials', ...)
```

A useful prompt is:

> Use `$add-playwright-test` to add a logout test. Inspect the page first, keep
> locators in the POM, and run the validation gate.

See [docs/AI-WORKFLOW.md](docs/AI-WORKFLOW.md) for the complete loop.

## When a product defect blocks a test

`test.fixme()` is a visible product-defect marker, not a way to make CI green.
Reproduce the problem, capture evidence, confirm the test and specification are
correct, add the issue reference and observed behavior, and keep unaffected
assertions running. Follow [docs/FIXME.md](docs/FIXME.md).

## Related links

- [Alex U.S.A. Days on YouTube](https://www.youtube.com/@alexusadays)
- [QA practice site](https://alexusadays.com)
- [Login practice page used by this repository](https://alexusadays.com/login)
- [Playwright documentation](https://playwright.dev/docs/intro)
- [Playwright Test Agents](https://playwright.dev/docs/test-agents)

## Inspiration and further reading

This repository is an original, deliberately small teaching implementation.
The architectural framing was informed by:

- [Playwright Test Agents](https://playwright.dev/docs/test-agents) for the
  official planner, generator, and healer agent loop.
- [Ivan Davidov's public AI-Native Playwright Scaffold](https://github.com/idavidov13/Playwright-Scaffold-AI-Assisted-Development-Public)
  and [ArchQA writing](https://idavidov.eu/) for the separation between a
  deterministic Playwright scaffold and an agent orchestration layer.
- [Debbie O'Brien](https://debbie.codes/) for practical work on Playwright,
  agent skills, MCP-based workflows, and code-driven educational content.

Their projects are references, not source dependencies; this repository's code,
tests, documentation, and public demo target are its own.

## What was intentionally excluded

This teaching repository contains no copied application code, private URLs,
credentials, customer data, screenshots, or product-specific test cases from
the architecture that inspired it. The implementation and documentation are
original and target Alex’s public test-practice site.

## License

MIT
