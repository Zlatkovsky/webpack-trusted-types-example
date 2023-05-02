/** @ts-check */

const fs = require("fs-extra");
const path = require("path");
const marked = require("marked");

const rootDirPath = path.normalize(path.join(__dirname, ".."));
const distPath = path.join(rootDirPath, "dist");

////////////////////////////////////////////////////////////
// First part: empty out the "dist" directory if it exists
////////////////////////////////////////////////////////////
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true });
}
fs.mkdirSync(distPath);

////////////////////////////////////////////////////////////
// Second part: generate the root index.html page:
////////////////////////////////////////////////////////////

const readmeContentsMd = fs
  .readFileSync(path.join(rootDirPath, "README.md"))
  .toString();
/** @type {string} */
const readmeContentsHtml = marked.parse(readmeContentsMd);
const html = `
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="./common.css" />
</head>
<body>
${readmeContentsHtml}
</body>
</html>
`;

fs.writeFileSync(path.join(distPath, "index.html"), html);

////////////////////////////////////////////////////////////
// Finally: copy the rest of the host-app folder
////////////////////////////////////////////////////////////

fs.copySync(path.join(rootDirPath, "src/host-app"), distPath);
