import React, { useState } from 'react';
import Banner from './Banner/Banner';
import RecentAdoptions from '../../components/RecentAdoptions';
import { Link } from 'react-router-dom';
import ChatBotButton from '../../Pages/ChatBot/ChatBotButton';
import ChatWindow from '../../Pages/ChatBot/ChatWindow';

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <div className='bg-white relative'>
      <Banner />
      <RecentAdoptions />

      {/* View More Button */}
      <div className="flex justify-center my-10">
        <Link to="/adoption">
          <button className="bg-[#840B36] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A24C60] transition">
            View More
          </button>
        </Link>
      </div>

      {/* Chatbot */}
      <ChatBotButton toggleChat={toggleChat} />
      {isChatOpen && <ChatWindow closeChat={toggleChat} />}
    </div>
  );
};

export default Home;
