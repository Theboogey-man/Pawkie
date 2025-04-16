import React from 'react';

const AdoptionCard = ({ item }) => {
    const { name, age, profileImage, breed } = item
    return (
        <div className='flex space-x-2'>
            <img className='w-[100px]' src={profileImage} alt="" />
            <div>
                <h3 className='uppercase'>{name}</h3>
                <p>Age: {age}</p>
            </div>
            <p className='text-[#49312C]'>Breed: {breed}</p>
            




        </div>
    );
};

export default AdoptionCard;