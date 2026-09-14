import readline from "readline";
import { exec } from "child_process";

function myCustomFunction(input) {
  const command = `node search_sdk.js "${input}"`;

  console.log("");
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      rl.prompt();
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }

    console.log(stdout.trim());
    console.log("");
    rl.prompt();
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  historySize: 30,
});

async function main() {
  console.log("\nPress Ctrl + C to Close\n");
  rl.setPrompt("Affinity MCP > ");
  rl.prompt();

  rl.on("line", (userInput) => {
    const trimmedInput = userInput.trim();

    if (trimmedInput) {
      myCustomFunction(trimmedInput);
    } else {
      rl.prompt();
    }
  });

  rl.on("close", () => {
    process.exit(0);
  });
}

main();
