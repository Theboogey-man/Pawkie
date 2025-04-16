import React from 'react';

const ChatBotButton = ({ toggleChat }) => {
  return (
    <button 
      onClick={toggleChat}
      className="fixed bottom-6 right-6 bg-[#840B36] hover:bg-[#A24C60] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl transition z-50"
      title="Chat with us"
    >
      💬
    </button>
  );
};

export default ChatBotButton;
