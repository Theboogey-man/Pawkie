import React, { useState } from 'react';

const AllAdoptions = ({ pets }) => {
  const [selectedPet, setSelectedPet] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (pet) => setSelectedPet(pet);
  const closeModal = () => {
    setSelectedPet(null);
    setZoomedImage(null);
  };

  const filteredPets = pets?.filter((pet) => {
    const term = searchTerm.toLowerCase();
    return (
      pet.petName?.toLowerCase().includes(term) ||
      pet.petBreed?.toLowerCase().includes(term) ||
      pet.petColor?.toLowerCase().includes(term) ||
      pet.petAge?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-5xl font-bold text-center text-[#840B36] mb-10">
      <img 
            src="src/assets/paw2.png" 
            alt="Paw" 
            className="h-12 md:h-15 inline-block -mt-2 md:-mt-8 mr-5"
        />
        All Adoption Posts
        <img 
            src="src/assets/paw.png" 
            alt="Paw" 
            className="h-12 md:h-15 inline-block -mt-2 md:-mt-8 ml-5"
        />
      </h2>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by name, breed, color, age..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#840B36] text-[#840B36] placeholder-[#BA6C7D]"
        />
      </div>

      {/* Pet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPets?.map((pet) => (
          <div
            key={pet._id}
            className="bg-gradient-to-r from-[#FFF0F4] via-[#FFDCE4] to-[#FFF0F4] rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col hover:shadow-xl transition"
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

            {/* 📋 Pet Info */}
            <div className="p-5 text-[#840B36] flex-1">
              <h2 className="text-2xl font-bold mb-2">{pet.petName}</h2>
              <p><strong>Breed:</strong> {pet.petBreed}</p>
              <p><strong>Color:</strong> {pet.petColor}</p>
              <p><strong>Age:</strong> {pet.petAge}</p>
            </div>

            <div className="p-5 pt-0 flex justify-between items-center">
              <button
                className="bg-[#BA6C7D] text-white px-4 py-2 rounded hover:bg-[#840B36] transition"
                onClick={() => openModal(pet)}
              >
                View Details
              </button>
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

      {selectedPet && (
  <div
    className="fixed inset-0 bg-[#000000]/40 backdrop-blur-sm flex justify-center items-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-gradient-to-r from-[#FFF0F4] via-[#FFDCE4] to-[#FFF0F4] rounded-lg shadow-lg p-10 w-full max-w-2xl h-[600px] text-[#840B36] relative overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={closeModal}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-4 border-b pb-2">{selectedPet.petName}</h2>

      {/* Images */}
      <div className="flex flex-wrap gap-3 mb-10 w-full h-auto ">
        {selectedPet.images?.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:5000${img}`}
            alt={`Pet ${i}`}
            className="w-34 h-25 object-cover rounded-md border hover:scale-105 transition cursor-pointer"
            onClick={() => setZoomedImage(`http://localhost:5000${img}`)}
          />
        ))}
      </div>

      {/* Pet Info */}
      <div className="space-y-2 text-[20px]">
        <p><span className="font-semibold">Breed:</span> {selectedPet.petBreed}</p>
        <p><span className="font-semibold">Color:</span> {selectedPet.petColor}</p>
        <p><span className="font-semibold">Age:</span> {selectedPet.petAge}</p>
        <p><span className="font-semibold">Owner:</span> {selectedPet.ownerName}</p>
        <p><span className="font-semibold">Contact:</span> {selectedPet.contact}</p>
        <p><span className="font-semibold">Address:</span> {selectedPet.address}</p>
        <br />
        <p className="text-sm text-gray-500 mt-3">
          🗓️ Posted on: {new Date(selectedPet.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
)}

      {/* 🔍 Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-[#000000]/40 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setZoomedImage(null)}
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            className="max-w-full max-h-[90vh] rounded shadow-lg border-4 border-white"
          />
        </div>
      )}
    </div>
  );
};

export default AllAdoptions;
