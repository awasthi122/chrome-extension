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
    const RAPIDAPI_KEY = 'cadd832d6amsh8738bb17654f2e2p1e976cjsn367653dcb34f'; // Replace with your actual key

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
      });

      const data = await response.json();
      setResult(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-900 p-4'>
      <div className='bg-slate-800 p-6 rounded-xl shadow-xl w-[22rem]'>
        <h1 className='text-3xl text-white font-bold mb-4'>Perception AI</h1>
        <h2 className='text-md text-slate-200 mb-2'>Ask your doubt or query:</h2>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input
            type="text"
            onChange={handleInput}
            value={input}
            className='border border-slate-600 rounded-md p-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500'
            placeholder="Ask me anything..."
          />
          <button
            type="submit"
            className='bg-white text-slate-900 rounded-md py-2 font-semibold hover:bg-slate-100 transition duration-200'
          >
            Submit
          </button>
        </form>
        {result && (
          <div className='mt-4 bg-slate-700 p-3 rounded-md text-white text-sm whitespace-pre-wrap'>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
