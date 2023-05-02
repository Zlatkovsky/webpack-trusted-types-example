const path = require("path");
const { spawn } = require("child_process");

console.log(
  [
    "Note: this script will only work on Windows, though it shouldn't be hard to modify the setup for other operating systems.",
    "",
    "If you haven't already, please install IIS Express from",
    "    https://www.microsoft.com/en-us/download/details.aspx?id=48264",
    "",
    "Please also run `yarn install` first.",
    "",
  ].join("\n")
);

const distPath = path.normalize(path.join(__dirname, "../dist"));
const command = `"C:\\Program Files\\IIS Express\\iisexpress.exe" /path:"${distPath}"`;

console.log([
    "Starting IIS express using command:",
    `    ${command}`,
    "",
    "////////////////////////////////////////////////////",
    ""
].join("\n"));


const spawnedCommand = spawn(command, {shell: true});
spawnedCommand.stdout.on("data", data => console.log(data.toString()))
spawnedCommand.stderr.on("data", data => console.error(data.toString()))
spawnedCommand.on('error', (error) => console.log(error.message));
spawnedCommand.on("close", code => {
    console.log(`child process exited with code ${code}`);
});