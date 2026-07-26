# Locator strategy

Locators are an interface between the product and the test suite.

| Priority | Locator | Use |
| --- | --- | --- |
| 1 | `getByRole()` | Buttons, links, headings, dialogs, and other semantics |
| 2 | `getByLabel()` | Properly labelled form controls |
| 3 | `getByTestId()` | Explicit automation contracts and ambiguous controls |

This project deliberately avoids CSS classes and XPath. Visual styling changes
often; user-facing meaning should change much less frequently.

The login page demonstrates both sides of the contract:

```ts
this.page.getByLabel('Username');
this.page.getByRole('alert');
this.page.getByTestId('btn-login');
```

The error uses its ARIA alert role, verifying the message is announced as an
error. The Login button earns a test ID because its accessible name changes to
“Logging in...” during submission; a role-and-name locator would not remain
stable across that action.

The test never sees either locator. It asks the page object to perform a
business action:

```ts
await pm.login.login('BestStudent', 'Password123!');
```
