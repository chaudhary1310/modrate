"use client"
import Image from 'next/image';
import React, { useState } from 'react';

function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    { name: 'Realistic', image: '/real.jpg'  },
    { name: 'Cartoon', image: '/car.jpg' },
    { name: 'Comics', image: '/coics.jpg' },
    { name: 'Gaming', image: '/gaming.jpg' },
    { name: 'Historical', image: '/hist.jpg' },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className='mt-7'>
      <h2 className='font-bold text-2xl text-purple-700'>Style</h2>
      <p className='text-gray-500'>Select your video style</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 text-purple-200 gap-5 mt-3'>
        {styleOptions.map((item) => (
          <div
            key={item.name}  
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl
            ${selectedOption === item.name && 'border-4 border-purple-700'}
            `}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              className='justify-between h-48 object-cover rounded-lg w-full'
              onClick={() => {
                setSelectedOption(item.name);
                onUserSelect('imageStyle', item.name);
              }}
            />
            <h2 className='absolute p-1 bg-black text-center rounded-b-lg text-white bottom-0 w-full'>
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
