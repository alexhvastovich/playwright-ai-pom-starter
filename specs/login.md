# Login flow

Target: `https://alexusadays.com/login`

## Contract

- The page exposes labelled Username and Password inputs.
- The login action has the explicit test id `btn-login`.
- The documented demo credentials navigate to `/secure`.
- Invalid credentials expose `login-error` with an explanatory message.

## Scenarios

1. Submit `BestStudent` / `Password123!` and verify successful navigation.
2. Submit an incorrect password and verify “Invalid credentials. Please try
   again.”
