import React, { useState } from 'react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hey! I'm Goku! Ask me anything! 💪🔥", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const LOCAL_BACKEND_ENDPOINT = 'https://todo-app-1-ru42.onrender.com/api/chat';

  const sendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { text: input.trim(), sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(LOCAL_BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `
You are Goku from Dragon Ball.
Personality:
- Energetic
- Friendly
- Loves fighting and training
- Simple language
- Keep answers short (1-3 sentences max)
- Add excitement sometimes

User: ${userMessage.text}
`
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Huh? I didn't get that!";

      setMessages((prev) => [
        ...prev,
        { text: botReply, sender: 'bot' }
      ]);

    } catch (error) {
      console.error("Chat Request Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: `Oops! Something went wrong!`, sender: 'bot' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl p-5 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-blue-600">
        Goku AI 🔥
      </h2>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs sm:max-w-md p-3 rounded-lg text-sm sm:text-base ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-orange-200 text-slate-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-orange-200 text-slate-800 p-3 rounded-lg rounded-tl-none text-sm italic">
              Goku is powering up...
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 border border-gray-300 rounded-full outline-none focus:border-blue-500"
          placeholder="Ask Goku something..."
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || input.trim() === ''}
          className="bg-orange-500 text-white w-20 h-12 rounded-full font-medium transition-all hover:bg-orange-600 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;