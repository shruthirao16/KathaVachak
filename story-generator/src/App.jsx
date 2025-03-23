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

const BACKEND_URL = "https://4258-34-169-58-167.ngrok-free.app";

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [story, setStory] = useState("");
    const [scenes, setScenes] = useState([]);
    const [error, setError] = useState("");

    const generateStory = async () => {
        setError("");  // Reset error state
        setStory("");  // Clear previous story
        setScenes([]); // Clear previous scenes

        try {
            const response = await axios.post(`${BACKEND_URL}/generate-story-scenes`, 
                { prompt },
                { headers: { "Content-Type": "application/json" } }
            );
            
            if (response.data.story) {
                // setStory(response.data.story);
                setScenes(response.data.scenes);
            } else {
                setError("Unexpected response from the server.");
            }
        } catch (err) {
            setError("Error generating story. Please try again.");
            console.error("Error generating story:", err);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>KathaVachak</h1>
            
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter story prompt" 
                style={{ padding: "8px", width: "300px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={generateStory} style={{ padding: "10px 20px", cursor: "pointer" }}>
                Generate Story
            </button>
            <br /><br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {/* {story && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", width: "400px", margin: "auto" }}>
                    <h3>Generated Story:</h3>
                    <p>{story}</p>
                </div>
            )} */}
            {scenes.length > 0 && (
                <div>
                    <h2>Story Scenes</h2>
                    {scenes.map((scene, index) => (
                        <div key={index} style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
                            <h4>{scene.scene}</h4>
                            <img src={scene.image_url} alt={`Scene ${index + 1}`} style={{ width: "300px" }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
