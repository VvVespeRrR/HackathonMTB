import React from 'react';

const NAV_ITEMS = [
    { id: 'home', icon: '🏠', label: 'Главная' },
    { id: 'universe', icon: '🌌', label: 'Вселенная' },
    { id: 'analytics', icon: '📊', label: 'Аналитика' },
    { id: 'goals', icon: '🎯', label: 'Копилка' },
    { id: 'friends', icon: '👥', label: 'Друзья' },
    { id: 'leaderboard', icon: '🏆', label: 'Лидеры' },  // вместо education
];

export default function BottomNav({ active, onNavigate }) {
    const getActiveId = () => {
        if (active === 'planet') return 'universe';
        return active;
    };

    const activeId = getActiveId();

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#071A3A]/90 backdrop-blur-lg border-t border-[#2F6BFF]/30 py-2 px-4 z-50">
            <div className="flex justify-around items-center max-w-md mx-auto">
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
                            activeId === item.id ? 'scale-105' : ''
                        }`}
                    >
            <span className={`text-xl ${activeId === item.id ? 'text-[#35D07F]' : 'text-gray-400'}`}>
              {item.icon}
            </span>
                        <span className={`text-[9px] font-medium ${
                            activeId === item.id ? 'text-[#35D07F]' : 'text-gray-500'
                        }`}>
              {item.label}
            </span>
                        {activeId === item.id && (
                            <div className="w-1 h-1 bg-[#35D07F] rounded-full mt-0.5" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}