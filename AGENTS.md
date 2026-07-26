# Repository instructions

This is a teaching repository for maintainable Playwright tests. Keep examples
small, public-safe, and runnable against `https://alexusadays.com`.

## Architecture

- Put selectors and browser actions in `pages/`.
- Access page objects through the lazy `pm` fixture in `fixtures/pom.ts`.
- Keep assertions about page behavior in page objects when they describe a
  reusable page contract; keep scenario outcomes in tests.
- Never instantiate page objects directly in a test.

## Locator contract

Use the most user-facing stable locator available:

1. `getByRole` with an accessible name.
2. `getByLabel` for labelled form fields.
3. `getByTestId` for explicit automation contracts or ambiguous controls.

Do not use XPath, CSS classes, `nth-child`, or long text selectors. A locator
must explain what the element means, not how the current DOM happens to look.

## Test rules

- Import `test` and `expect` from `fixtures/pom`.
- Apply `skills/name-playwright-test/SKILL.md` to every new or renamed scenario.
- Keep the same stable test case ID in the spec, file name, and test title.
- Use web-first assertions.
- Never use `waitForTimeout`.
- Keep tests independent and safe to run in parallel.
- Do not add secrets, real customer data, or private URLs.
- Run `npm run check` before committing.
- Follow `docs/FIXME.md`; never use `test.fixme()` solely to make the gate pass.

## AI workflow

For a new flow, write or update a short specification in `specs/`, then use the
`skills/add-playwright-test` skill. Treat AI output as a draft that must pass the
same architecture and validation gates as human code.

The official Playwright planner, generator, and healer definitions are in
`.codex/agents/`. Use `tests/seed.spec.ts` as their environment seed. Generated
test code must still follow this file's POM and locator contracts.
