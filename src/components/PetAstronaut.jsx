import React from 'react';

export default function PetAstronaut({ size = 'md' }) {
  const sizes = { sm: 'w-12 h-14', md: 'w-16 h-20', lg: 'w-20 h-24' };
  
  return (
    <div className={`relative ${sizes[size]} cursor-pointer group`}>
      {/* Вместо рисованного маскота используем картинку */}
      <img 
        src="/images/maskotishe.png"
        alt="Маскот"
        className="w-full h-full object-contain rounded-[28px]"
      />
    </div>
  );
}