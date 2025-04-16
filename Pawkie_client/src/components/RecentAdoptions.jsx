// src/components/RecentAdoptions.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RecentAdoptions = () => {
  const [recentPets, setRecentPets] = useState([]);

  useEffect(() => {
    const fetchRecentPets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/adopt");
        const data = await res.json();

        // Sort by createdAt descending and take 3
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ).slice(0, 3);

        setRecentPets(sorted);
      } catch (error) {
        console.error("Failed to fetch recent pets:", error);
      }
    };

    fetchRecentPets();
  }, []);

  if (recentPets.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center text-[#840B36] mb-10">
      <img 
            src="src/assets/paw2.png" 
            alt="Paw" 
            className="h-12 md:h-15 inline-block -mt-2 md:-mt-8 mr-5"
        />
        Recently Added for Adoption
        <img 
            src="src/assets/paw.png" 
            alt="Paw" 
            className="h-12 md:h-15 inline-block -mt-2 md:-mt-8 ml-5"
        />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {recentPets.map((pet) => (
          <div
            key={pet._id}
            className="bg-gradient-to-r from-[#FFF0F4] via-[#FFDCE4] to-[#FFF0F4] rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col justify-between hover:shadow-xl"
          >
            {/* 🖼️ Dynamic Image Layout */}
            {pet.images?.length > 1 ? (
              <div className="flex h-60 w-full">
                <img
                  src={`http://localhost:5000${pet.images[0]}`}
                  alt="Main"
                  className="h-full w-3/5 object-cover cursor-pointer"
                  onClick={() => setZoomedImage(`http://localhost:5000${pet.images[0]}`)}
                />
                <div className="flex flex-col w-2/5 p-1 gap-1">
                  {pet.images.slice(1, 4).map((img, index, arr) => (
                    <img
                      key={index}
                      src={`http://localhost:5000${img}`}
                      alt={`Side ${index}`}
                      className="w-full object-cover cursor-pointer rounded flex-1"
                      style={{ minHeight: `calc(100% / ${arr.length})` }}
                      onClick={() => setZoomedImage(`http://localhost:5000${img}`)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-60 w-full">
                <img
                  src={`http://localhost:5000${pet.images[0]}`}
                  alt="Full"
                  className="h-full w-full object-cover cursor-pointer"
                  onClick={() => setZoomedImage(`http://localhost:5000${pet.images[0]}`)}
                />
              </div>
            )}
            <div className="p-5 text-[#840B36] flex-1">
              <h2 className="text-xl font-bold mb-1">{pet.petName}</h2>
              <p><strong>Breed:</strong> {pet.petBreed}</p>
              <p><strong>Color:</strong> {pet.petColor}</p>
              <p><strong>Age:</strong> {pet.petAge}</p>
            </div>
            <div className="p-5 pt-0 flex justify-between items-center">
              <Link to="/adoption">
                <button className="bg-[#BA6C7D] text-white px-4 py-2 rounded hover:bg-[#840B36] transition">
                  View All
                </button>
              </Link>
              <span className="text-sm text-[#840B36]">
                {new Date(pet.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAdoptions;