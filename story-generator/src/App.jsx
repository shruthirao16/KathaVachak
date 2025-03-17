// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState(null);
  
//   // Replace with your ngrok URL from Colab
//   const BACKEND_URL = "https://3e31-34-125-251-155.ngrok-free.app";

//   const generateStory = async () => {
//     console.log("Generate button clicked!"); 
//     try {
//       const res = await axios.post(`${BACKEND_URL}/generate-story-scenes`, { prompt });
//       setResponse(res.data);
//     } catch (error) {
//       console.error("Error generating story:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Story Generator</h1>
//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         placeholder="Enter a story prompt"
//       />
//       <button onClick={generateStory}>Generate</button>
      
//       {response && (
//         <pre>{JSON.stringify(response, null, 2)}</pre>
//       )}
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import axios from "axios";

const BACKEND_URL = "https://8608-34-13-139-96.ngrok-free.app";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  window.generateStory = async () => { // 👈 Make it globally accessible
    console.log("Generate button clicked!");  // ✅ Debugging line

    try {
      const res = await axios.post(`${BACKEND_URL}/generate-story-scenes`, { prompt });
      console.log("Response received:", res.data);  // ✅ Debugging line
      setResponse(res.data);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  return (
    <div>
      <h1>Story Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a story prompt"
      />
      <button onClick={window.generateStory}>Generate</button> {/* Updated */}
      
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
