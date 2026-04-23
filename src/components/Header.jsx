import React from 'react';

export default function Header({ userName, petComponent }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                {/* Логотип МТБанк вместо звезды */}
                <div className="w-10 h-10 bg-gradient-to-r from-[#2F6BFF] to-[#35D07F] rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                        src="/images/mtb_logo.png"
                        alt="МТБанк"
                        className="w-7 h-7 object-contain"
                        onError={(e) => {
                            // Если картинка не загрузилась, показываем ✨
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span class="text-white text-xl">✨</span>';
                        }}
                    />
                </div>
                <div>
                    <span className="text-white font-bold text-lg">МТБанк</span>
                    <p className="text-[#35D07F] text-xs">Космический тариф</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
                    <span className="text-white text-sm">🔔</span>
                </div>
                {petComponent}
            </div>
        </div>
    );
}