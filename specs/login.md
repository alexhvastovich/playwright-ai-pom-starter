# Login flow

Target: `https://alexusadays.com/login`

## Contract

- The page exposes labelled Username and Password inputs.
- The login action has the explicit test id `btn-login`.
- The documented demo credentials navigate to `/secure`.
- Invalid credentials expose `login-error` with an explanatory message.

## Scenarios

### AUTH-LOGIN-001 Valid credentials

Submit `BestStudent` / `Password123!` and verify successful navigation.

### AUTH-LOGIN-002 Invalid credentials

Submit an incorrect password and verify “Invalid credentials. Please try
again.”
