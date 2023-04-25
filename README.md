# Trusted Types: why do we need a `onPolicyCreationFailure: "continue"` option in Webpack?

Welcome to a test app that exemplifies why we need to introduce `onPolicyCreationFailure: "continue"` option to Webpack.

## Example of where it matters
The place where it truly makes a difference is for a page that specifies trusted types policy names, but does NOT enforce `require-trusted-types-for 'script'` (e.g., maybe it's under `Content-Security-Policy-Report-Only`).

In such a scenario, *without* the new `onPolicyCreationFailure` option:
* If the webpacked code that doesn't specify *any* [output.trustedTypes](https://webpack.js.org/configuration/output/#outputtrustedtypes) options, it will do just fine. The browser will report a warning on the console, but the code will load.
* However, webpacked code specifying `output.trustedTypes: { policyName: 'something' }` will suddenly fail to load.

The new `onPolicyCreationFailure: "continue"` option wraps the policy-creation code inside a `try/catch` block. This is a generally-accepted practice; for example, DOMPurify, a wildly popular trusted-types packages, does the same try-catch logic in line 68 of [this file](https://github.com/cure53/DOMPurify/blob/1c63c4b5a7da8c036dfc32e148f1042d4a77c18e/src/purify.js#L68).

Click **[THIS EXAMPLE PAGE, running in REPORT-ONLY-MODE](http://example.com/report-only-csp)** to see all three permutations in actions. This page is served with the following headers:

```
Content-Security-Policy: trusted-types host-app-policy
Content-Security-Policy-Report-Only: require-trusted-types-for 'script';
```

## What about when trusted types are strictly required?

If trusted types are **strictly** required and the policy is **NOT** on the allow-list, any "unsafe" APIs will still fail as soon as they invoked. In that case, having a `try/catch` around a policy will act the same as having no policy specified at all. E.g.,:

```
FIXME
```
Click **[THIS EXAMPLE PAGE, running in strict mode](http://example.com/strict-csp)** to visit an example of such page and to try out all three permutations. That page is served with the following header:

```
Content-Security-Policy: trusted-types host-app-policy; require-trusted-types-for 'script';
```
