import React from 'react';

const DecorativeWave = () => {
  return (
    <div className="w-full overflow-hidden bg-[#FFFFFF]">
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-32 md:h-40 lg:h-52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#F8C6CF" />
            <stop offset="50%" stopColor="#F9DEE3" />
            <stop offset="100%" stopColor="#F8C6CF" />
          </linearGradient>
          <filter id="waveShadow">
            <feDropShadow dx="0" dy="-2" stdDeviation="4" floodColor="#9C3346" floodOpacity="0.5" />
          </filter>
        </defs>
        <path
          fill="url(#grad1)"
          filter="url(#waveShadow)"
          d="M0,224L48,208C96,192,192,160,288,133C384,107,480,85,576,112C672,139,768,213,864,224C960,235,1056,181,1152,176C1248,171,1344,213,1392,234L1440,256L1440,0L0,0Z"
        />
      </svg>
    </div>
  );
};

export default DecorativeWave;
