import React from 'react';

const SparkleEffect = ({ count = 30 }) => {
  return (
    <>
      <style>{`
        .sparkles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        .sparkles span {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 0) 100%);
          border-radius: 50%;
          animation: flicker 2s infinite ease-in-out;
        }
        .sparkles span:nth-child(odd) {
          animation-duration: 3s;
        }
        .sparkles span:nth-child(even) {
          animation-duration: 4s;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.5); }
        }
      `}</style>

      <div className="sparkles">
        {[...Array(count)].map((_, index) => (
          <span
            key={index}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          ></span>
        ))}
      </div>
    </>
  );
};

export default SparkleEffect;