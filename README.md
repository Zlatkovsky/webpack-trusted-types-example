# Trusted Types: why do we need a `onPolicyCreationFailure: "continue"` option in Webpack?

Welcome to a test app that exemplifies why we need to introduce `onPolicyCreationFailure: "continue"` option to Webpack, corresponding to PR [PR #16990, Allow specifying "onPolicyCreationFailure" mode for trusted types](https://github.com/webpack/webpack/pull/16990).

This app consist of the "host app" (under [`src/host-app`](https://github.com/Zlatkovsky/webpack-trusted-types-example/tree/main/src/host-app) in the repo, written in plain HTML and JS), and the dynamic webpacked content that is loaded by the host. The latter is under [`src/dynamic-content`](https://github.com/Zlatkovsky/webpack-trusted-types-example/tree/main/src/dynamic-content) in the repo, and is webpacked in three different configurations (no trusted types, standard trusted types config, and a config using the new `onPolicyCreationFailure: "continue"` option). All three configurations are in the same [`webpack.config.js`](https://github.com/Zlatkovsky/webpack-trusted-types-example/blob/main/webpack.config.js) file at the root of the repo.

## Example of where it matters
The place where it truly makes a difference is for a page that specifies trusted types policy names, but does NOT enforce `require-trusted-types-for 'script'` (e.g., maybe it's under `Content-Security-Policy-Report-Only`).

In such a scenario, *without* the new `onPolicyCreationFailure` option:
* If the webpacked code that doesn't specify *any* [output.trustedTypes](https://webpack.js.org/configuration/output/#outputtrustedtypes) options, it will do just fine. The browser will report a warning on the console, but the code will load.
* However, webpacked code specifying `output.trustedTypes: { policyName: 'something' }` will suddenly fail to load. This means that **today, switching trusted types ON in the config may break an older version of the host app, which was working perfectly well otherwise**. 

The new `onPolicyCreationFailure: "continue"` option wraps the policy-creation code inside a `try/catch` block. This is a generally-accepted practice; for example, DOMPurify, a wildly popular trusted-types packages, does the same try-catch logic in line 68 of [this file](https://github.com/cure53/DOMPurify/blob/1c63c4b5a7da8c036dfc32e148f1042d4a77c18e/src/purify.js#L68).

Click **[THIS EXAMPLE PAGE, running in REPORT-ONLY-MODE](https://webpack-trusted-types-example.azurewebsites.net/report-only-csp)** to see all three permutations in actions. By specifying `onPolicyCreationFailure: "continue"`, code that would have worked without the policy, and then starts failing when a policy is specified, is restored to working again.

That page is served with the following headers:
```
Content-Security-Policy: trusted-types host-app-policy
// (Note that the above specifies the name of the **host app policy**,
//  but **NOT** the "DynamicWebpackCode" policy from the webpack config!)
Content-Security-Policy-Report-Only: require-trusted-types-for 'script';
```

## What about when trusted types are strictly required?

If trusted types are **strictly** required and the policy name is **NOT** on the allow-list, any "unsafe" APIs will still fail as soon as they invoked. The `try/catch` around policy-creation will result in the policy not being created and the code attempting to move on, but any access to the unsafe APIs will be blocked by the browser, exactly as it would if no policy is specified.

Click **[THIS EXAMPLE PAGE, running in strict mode](https://webpack-trusted-types-example.azurewebsites.net/strict-csp)** to visit an example of such page and to try out all three permutations. That page is served with the following header:

```
Content-Security-Policy: trusted-types host-app-policy; require-trusted-types-for 'script';
// (Note that the above specifies the name of the **host app policy**,
//  but **NOT** the "DynamicWebpackCode" policy from the webpack config!)
```
