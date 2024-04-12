import { useState } from "react"
import "../assets/ChatBot.css"
import axios from "axios"

export default function ChatBot() {
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("Loading...")
  const [error, setError] = useState("");

  const surpriseOptions = [
    "What's the difference between saturated and unsaturated fats?",
    "How can I incorporate more vegetables into my meals?",
    "What are the best sources of plant-based protein?",
    "Can you suggest some low-carb snack options?",
    "What are the benefits of consuming omega-3 fatty acids?",
    "How can I boost my energy levels with nutrition?",
    "What are some quick and nutritious lunch ideas for work?",
    "Can you recommend a healthy alternative to sugary beverages?",
    "How can I reduce my salt intake without sacrificing flavor?",
    "What are the key nutrients needed for muscle recovery after exercise?",
    "Can you suggest some budget-friendly meal prep ideas?",
    "How much protein do I actually need each day?",
    "How can I create balanced meals for weight management?",
    "What are the healthiest cooking oils to use?",
    "Can you recommend some kid-friendly recipes that are also nutritious?",
    "How can I incorporate more fiber into my diet?",
    "What are the benefits of probiotics and prebiotics for gut health?",
    "Can you suggest some heart-healthy recipes?",
    "How can I make nutritious choices when dining out?",
    "What are some ways to add more antioxidants to my diet?",
    "Can you suggest a high-protein vegetarian meal?",
    "How can I satisfy my sweet cravings in a healthy way?",
    "How much water should I be drinking daily?",
    "Can you provide tips for reading and understanding food labels?",
    "How can I ensure I'm getting enough calcium without consuming dairy products?",
    "What are some non-traditional sources of protein?",
    "How can I create balanced meals for a vegan diet?",
    "What are the best foods to support immune health?",
    "Can you suggest some nutrient-dense snacks for post-workout recovery?",
    "How can I make my favorite dishes healthier?"
  ]

  const surprise = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);
  }

  const getReponse = async () => {
    const result = await axios({
      url : "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDjrTf2Cq4a4rtzSm23NslbvU1rf5xIPM0",
      method : "post",
      data : {
        "contents":[
          {
            "parts":[
              {"text":value+" (answers based on India)"}
            ]
          }
        ]
      }
    })
    setAnswer(result['data']['candidates'][0]['content']['parts'][0]['text'])
  }

  const clear = () => {
    setValue("");
    setError("");
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the form from being submitted
      getReponse();
    }
  }
  return (
    <div className="app">
    <p>What do you want to know? Ask NutriCare ❤️✨
    <button className="surprise" onClick={surprise}>Surprise me</button>
    </p>
    <div className="input-container">
      <input 
        value={value}
        placeholder="Type your question here"
        onChange={(e) => setValue(e.target.value)} 
        onKeyDown={handleKeyDown} />

      {!error && <button onClick={getReponse}>Ask Me</button>}
      {error && <button onClick={clear}>Clear</button>}
    </div>
    {error && <p>{error}</p>}
    <div className="search-result">
      <pre>{answer}</pre>
    </div>
</div>
  )
}
