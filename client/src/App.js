import axios from "axios";
import "./App.css";
import React, {useState} from 'react';

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const handleSubmit = async() => {
    
    const payload = {
      language: "cpp",
      code
    };
    try{
    const {data} = await axios.post("http://localhost:5000/run", payload);
    setOutput(data.output);
    console.log(output);
    } catch(err){
      console.log(err.response);
    }
  };
  
  
  return (
    <div className="App">
      
      <h1>TCE Online C Compiler</h1>
      
      <textarea
        rows='20' 
        cols="75" 
        value={code} 
        onChange={(e)=>{
          setCode(e.target.value);
          }}>
      </textarea>
      
      <br/>
      
      <button onClick={handleSubmit}>Submit</button>
      <br/>
      <p>{output}</p>
    </div>
  );
}

export default App;
