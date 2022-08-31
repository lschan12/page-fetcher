const url = process.argv[2];
const localPath = process.argv[3];
const readline = require("readline")
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require("fs");

const request = require('request');
request(url, (error, response, body) => {
  if (fs.existsSync(localPath)){
    rl.question("File already exists. Would you like to overwrrite it?\n-y Yes\n-n No\n", (answer) => {
      if (answer === "n") {
        process.exit();
      } else if (answer === "y") {
        fs.promises.writeFile(localPath, body, "utf8")
        .then(() => {
          stats = fs.statSync(localPath)
          console.log(`Downloaded ${stats.size} bytes to ${localPath}`)
          process.exit();
        })
        .catch(err => {
          console.log(err);
          process.exit();
        })
      }});
  } else {
    fs.promises.writeFile(localPath, body, "utf8")
    .then(() => {
      stats = fs.statSync(localPath)
      console.log(`Downloaded ${stats.size} bytes to ${localPath}`)
      process.exit();
    })
    .catch(err => {
      console.log(err);
      process.exit();
    })
  }
});

