## About "dynamic-content"

This folder represents dynamic content that's being webpacked. It could have been something that's in a separate project and deployed to a separate CDN, though for a demo it's easier to just have it in the same project.

Importantly, the host app adds a script only to the `main.js`. That file, in turn, relies on a dynamically-imported (`import("...")`) file, `helper.js`. The dynamic import is what causes webpack to make use of the trusted-types policy name.