# Guarded `test.fixme()` flow

`test.fixme()` records a known product defect that prevents a correct test from
running. It is not a generic skip and must not be used to hide flaky or
incorrect test code.

## Required flow

1. Run the narrow test and reproduce the failure.
2. Confirm the specification still describes intended product behavior.
3. Inspect the trace, DOM, console, and network evidence as relevant.
4. Rule out environment, data, locator, timing, and assertion defects.
5. Record the product issue in the team's issue tracker.
6. Add `test.fixme()` with the issue ID and the observed product behavior.
7. Keep the original expectation intact.
8. Run `npm run check` and confirm unrelated scenarios still execute.

## Form

Prefer a conditional annotation inside the test so setup and unaffected logic
remain visible:

```ts
test('AUTH-LOGIN-001 accepts documented demo credentials', async ({ pm }) => {
  test.fixme(
    true,
    'BUG-142: Valid login returns 500; expected the secure page.',
  );

  await pm.loginPage.open();
  await pm.loginPage.login('BestStudent', 'Password123!');
  await pm.securePage.expectLoaded();
});
```

The reason must contain:

- a durable issue ID or URL;
- observed behavior;
- expected behavior.

## Removal

When the product issue is fixed, remove only the annotation, run the narrow
test, then run `npm run check`. Do not rewrite the expectation merely because
the implementation changed.
