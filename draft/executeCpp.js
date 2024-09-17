const {exec} = require("child_process");
const fs = require('fs');
const path = require('path'); 

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}
 
const executeCpp = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
  
    return new Promise((resolve, reject) => {
      const command = `g++ ${filepath} -o ${outPath} && ${
        process.platform === "win32" ? `${outPath}` : `cd ${outputPath} && ./${jobId}.exe`
      }`;
  
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject({ error, stderr });
        }
        if (stderr) {
          console.warn("Warnings:", stderr); // Warnings don't stop execution
        }
        resolve(stdout);
      });
    });
  };
  
module.exports = {
    executeCpp
}