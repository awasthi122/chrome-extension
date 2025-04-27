import { useState } from 'react';
import './App.css';

function App() {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';
    const RAPIDAPI_KEY = 'cadd832d6amsh8738bb17654f2e2p1e976cjsn367653dcb34f'; // Your RapidAPI key

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: input }
          ],
          model: 'gpt-4o', 
          max_tokens: 100,
          temperature: 0.7,
        }),
      })
      
      const data = await response.json();
      setResult(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className='bg-slate-900 p-4 flex flex-col shadow-sm w-[22rem]'>
      <h1 className='text-2xl text-white font-bold mb-2'>Perception AI </h1>
      <h2 className='text-lg text-white mb-2'>Enter your Doubt/Query</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input
          type="text"
          onChange={handleInput}
          value={input}
          className='border-2 border-slate-300 rounded-md p-2 focus:outline-none focus:border-slate-400 mb-2'
          placeholder="Ask me anything..."
        />
        <p className='text-md text-white mb-2'>{result}</p>
        <button
          type="submit"
          className='bg-white text-slate-900 rounded-md py-2 hover:bg-slate-100 font-bold'
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
