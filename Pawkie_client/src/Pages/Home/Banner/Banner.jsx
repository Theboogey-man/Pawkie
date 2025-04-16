import React from 'react';
import { Link } from 'react-router-dom';
import SparkleEffect from "../../../components/SparkleEffect";

const Banner = () => {
  return (
    <div className="relative overflow-hidden">

      {/* Sparkle Effect */}
      <SparkleEffect count={30} />

      {/* Banner content */}
      <div className="bg-gradient-to-r from-[#FFDDE1] via-[#FEE3EC] to-[#F6C7CF] py-30 px-6 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between">

        {/* LEFT: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-sm flex items-center gap-3 bg-gradient-to-r from-[#5F040D] via-[#FF6193] to-[#FFFFFF] bg-clip-text text-transparent">
            Welcome to
            <img 
              src="src/assets/logo_2.png" 
              alt="Logo" 
              className="h-12 md:h-25 inline-block -mt-2 md:-mt-8"
            />
          </h1>

          <br /><br />

          <h1 className="text-5xl md:text-4xl font-bold text-[#99475C] leading-tight mb-4">
            Give a Paw-sitive Start to a New Friend
            <img 
              src="src/assets/paw.png" 
              alt="Paw" 
              className="h-12 md:h-15 inline-block -mt-2 md:-mt-8"
            />
          </h1>

          <p className="text-lg md:text-xl text-[#99475C] mb-6">
            Adopt, Rescue, Support, and Celebrate Pets with Pawkie! <br />
            We connect loving homes with furry friends and offer everything from medical aid to daycare.
          </p>
        </div>

        {/* RIGHT: Cute Pet Image */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0 animate-bounce-slow">
          <img
            src="src/assets/cute-pet-banner.png"
            alt="Happy pet illustration"
            className="w-72 md:w-[600px] drop-shadow-xl rounded-2xl"
          />
        </div>

        {/* Decorative floating paw prints */}
        <div className="absolute top-10 left-10 w-10 h-10 bg-pink-200 rounded-full blur-xl opacity-70 animate-float delay-100"></div>
        <div className="absolute bottom-10 right-20 w-14 h-14 bg-pink-300 rounded-full blur-2xl opacity-50 animate-float delay-500"></div>
      </div>
    </div>
  );
};

export default Banner;
