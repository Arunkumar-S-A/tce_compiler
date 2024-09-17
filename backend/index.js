console.log("TCE Compiler");

const express = require('express');
const cors = require('cors');
const {generateFile} = require('./generateFile');
const {executeCpp} = require('./executeCpp'); 

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get('/', (req, res) => { 
    return res.json({hello: "world!"});
});

app.post("/run", async (req, res) => {
    try {
      const { language = "cpp", code } = req.body;
      
      if (!code) {
        return res.status(400).json({ success: false, error: "Empty code body!" });
      }
  
      // Generate a C++ file
      const filepath = await generateFile(language, code);
      
      // Run the C++ file and get the output
      const output = await executeCpp(filepath);
      
      return res.json({ filepath, output });
      
    } catch (error) {
      // Handle errors from generateFile or executeCpp
      console.error("Error during code execution:", error);
      return res.status(500).json({ success: false, error: "An error occurred while executing the code." });
    }
  });

app.listen(5000, ()=>{
    console.log('Listening on port 5000!');
});