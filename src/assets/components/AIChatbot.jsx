import React, { useState } from 'react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI assistant. Ask me anything.", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Endpoint points to your LOCAL BACKEND SERVER
  const LOCAL_BACKEND_ENDPOINT = 'http://localhost:3000/api/chat'; 

  const sendMessage = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { text: input.trim(), sender: 'user' };
    
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Fetch request to the local secure endpoint
      const response = await fetch(LOCAL_BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send only the prompt. The backend adds the secret key.
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Sorry, I couldn't get a response.";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: 'bot' }
      ]);

    } catch (error) {
      console.error("Chat Request Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Error: ${error.message}`, sender: 'bot' }
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

  // Tailwind CSS classes for UI
  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl p-5 shadow-lg">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-blue-600">AI Chatbot</h2>
      
      {/* Message Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-xs sm:max-w-md p-3 rounded-lg text-sm sm:text-base ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-slate-800 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-slate-800 p-3 rounded-lg rounded-tl-none text-sm italic">
              Bot is typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-3 border border-gray-300 rounded-full outline-none focus:border-blue-500"
          placeholder="Ask the AI a question..."
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || input.trim() === ''}
          className="bg-blue-600 text-white w-20 h-12 rounded-full font-medium transition-all hover:bg-blue-700 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;