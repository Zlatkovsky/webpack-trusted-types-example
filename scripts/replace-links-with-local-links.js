/** @ts-check */

const fs = require("fs-extra");
const path = require("path");

const rootDirPath = path.normalize(path.join(__dirname, ".."));
const distPath = path.join(rootDirPath, "dist");

const indexHtmlContents = fs
  .readFileSync(path.join(distPath, "index.html"))
  .toString();
const replacedIndexHtmlContents = indexHtmlContents.replaceAll(
  "https://webpack-trusted-types-example.azurewebsites.net",
  "http://localhost:8080"
);
fs.writeFileSync(path.join(distPath, "index.html"), replacedIndexHtmlContents);
