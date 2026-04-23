import React from 'react';

export default function Card({ children, className = '', glow = false, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
        bg-white/5 backdrop-blur-sm rounded-2xl p-4 
        border border-[#2F6BFF]/20 transition-all duration-300
        ${glow ? 'hover:shadow-[0_0_20px_rgba(47,107,255,0.2)] hover:scale-[1.01]' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}