const spawnSync = require("child_process").spawnSync;

console.log(
  "Running patch-package to patch Webpack, emulating my PR being merged in"
);

const processResults = spawnSync("yarn", ["patch-package"], { shell: true });
const processError = processResults.stderr.toString().trim();

if (processError.length) {
  console.error(processError);
  process.exit(1);
} else {
  console.log(processResults.stdout.toString().trim());
}

console.log("patch-package completed");
