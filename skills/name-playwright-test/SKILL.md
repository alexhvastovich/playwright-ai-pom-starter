---
name: name-playwright-test
description: Assign or review stable Playwright test case IDs, spec headings, file names, describe blocks, and test titles in this repository. Use when adding, renaming, generating, or reviewing a scenario, or when a request mentions test IDs, naming conventions, traceability, file naming, or duplicate test identity.
---

# Name a Playwright test

Create one durable identity before generating test code.

## Build the ID

Use `<AREA>-<FLOW>-<NNN>`:

- `AREA`: product domain, such as `AUTH`, `CART`, or `PROFILE`;
- `FLOW`: specific capability, such as `LOGIN`, `LOGOUT`, or `CHECKOUT`;
- `NNN`: three-digit sequence within the area and flow.

Use uppercase ASCII letters and digits. Keep an existing ID when wording,
selectors, or file location changes. Assign a new ID only for a distinct
behavioral contract.

Check `specs/` and `tests/` for duplicates before assigning the next sequence.

## Apply the identity

For `AUTH-LOGIN-001`:

```text
Spec heading:  AUTH-LOGIN-001 Valid credentials
File:          tests/login/auth-login-001-valid-credentials.spec.ts
Describe:      Authentication / Login
Test title:    AUTH-LOGIN-001 accepts documented demo credentials
```

Rules:

- Start the test title with the exact ID.
- Use a present-tense behavioral outcome after the ID.
- Use lowercase kebab-case for the file.
- Keep the exact ID in the plan, file name, and test title.
- Keep environment, browser, and implementation details out of the title.
- Do not encode priority, assignee, date, or execution status in the ID.

## Validate

Search for the ID and confirm it represents one scenario:

```bash
rg -n "AUTH-LOGIN-001" specs tests
npx playwright test --list
```

Reject ambiguous titles such as `works`, `login test`, or `test 1`.
