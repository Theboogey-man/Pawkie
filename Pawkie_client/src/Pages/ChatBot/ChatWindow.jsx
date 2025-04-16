import React, { useState } from 'react';
import axios from 'axios';

const ChatWindow = ({ closeChat }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about pets 🐶🐱", fromBot: true }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMessage = { text: input, fromBot: false };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: input
      });
  
      // Debug the response here
      console.log('Bot reply:', response.data.reply);
  
      const botMessage = { text: response.data.reply, fromBot: true };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Sorry, I couldn't respond.", fromBot: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-80 bg-white border shadow-lg rounded-lg z-50 flex flex-col">
      <div className="bg-[#840B36] text-white p-4 font-semibold rounded-t-lg flex justify-between items-center">
        Pet Support Chat
        <button onClick={closeChat} className="text-white text-xl">&times;</button>
      </div>
      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-64">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 rounded-md ${msg.fromBot ? 'bg-[#F1F1F1] text-gray-800 self-start' : 'bg-[#840B36] text-white self-end'} max-w-[75%]`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="bg-[#F1F1F1] text-gray-800 p-2 rounded-md self-start max-w-[75%]">
            Typing...
          </div>
        )}
      </div>
      <div className="flex items-center p-2 border-t">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 py-2 border rounded-lg mr-2"
          placeholder="Type a message..."
        />
        <button 
          onClick={handleSend}
          className="bg-[#840B36] text-white px-4 py-2 rounded-lg hover:bg-[#A24C60]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
