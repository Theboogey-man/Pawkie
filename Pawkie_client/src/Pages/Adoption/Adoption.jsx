import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostAdoptionForm from "../../components/PostAdoptionForm";
import AllAdoptions from "../../Pages/AllAdoptions/AllAdoptions";
import SparkleEffect from '../../components/SparkleEffect';
import DecorativeWave from '../../components/DecorativeWave';

const PawPrint = () => <span>🐾</span>;

const Adoption = () => {
  const [pets, setPets] = useState([]);

  const fetchPosts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/adopt");
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    setPets(data);
  } catch (err) {
    console.error("Failed to fetch pets:", err);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* sparkle effect */}
      <div>
        <SparkleEffect count={30} />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#F8C6CF] via-[#F9DEE3] to-[#F6C7CF] flex flex-col lg:flex-row items-start px-6 lg:px-20 space-y-10">

        {/* 🐾 Left: Form with Image Border */}
        <div className="flex-1 flex justify-center items-center relative" data-aos="fade-right" data-aos-duration="1000">
          <div
            className="p-6 md:p-10 bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url('https://i.ibb.co.com/TxQY3QQf/form-pic.png')",
              backgroundSize: "100% 100%",
              width: '100%',
              maxWidth: '600px',
              maxHeight: '700px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Pass callback to form */}
            <div className="w-full px-10 md:px-6 mt-108">
              <PostAdoptionForm onSubmitSuccess={fetchPosts} />
            </div>
          </div>
        </div>

        {/* 🐾 Right: Text Section */}
        <div className="flex-1 text-left lg:pl-20 xl:pl-1 pt-60 max-w-xl" data-aos="fade-left" data-aos-duration="1000">
          <p className="text-2xl text-[#BA6C7D] mb-2 font-medium">Every paw deserves a loving home!</p>
          <h1 className="text-7xl font-extrabold text-[#840B36] leading-tight mb-4">
            FIND YOUR <br className="hidden lg:block" /> COMPANION
          </h1>
          <p className="text-l text-[#99475C] leading-relaxed mb-6">
            Every pet deserves love, care, and a forever home. <br />
            Adopt a furry friend or help one find a new family —<br />
            safe, trusted, and full of love!
          </p>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="w-full overflow-hidden bg-[#FFFFFF]">
        <DecorativeWave />
      </div>

      {/* Show adoption posts */}
      <div className="w-full">
        <AllAdoptions pets={pets} />
      </div>
    </>
  );
};

export default Adoption;
