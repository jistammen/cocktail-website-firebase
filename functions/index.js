const { spawn } = require("child_process");
const functions = require("firebase-functions");

exports.pythonApi = functions.https.onRequest((req, res) => {
  console.log("Incoming request to Python API");

  const pythonProcess = spawn("python3", ["main.py"], {
    cwd: __dirname + "/python",
    env: { ...process.env },
    shell: true,
  });

  let output = "";

  pythonProcess.stdout.on("data", (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
    res.status(200).send(output);
  });

  req.on("close", () => {
    console.log("Request closed, killing Python process.");
    pythonProcess.kill();
  });
});

