import React, { useState, useEffect } from 'react';

// КАРТИНКИ ДЛЯ ВСЕЛЕННОЙ (как были)
const planetImages = {
    1: '/images/planets/gastro.png',
    2: '/images/planets/shopping.png',
    3: '/images/planets/travel.png',
    4: '/images/planets/economy.png',
    5: '/images/planets/home.png',
    6: '/images/planets/culture.png',
    7: '/images/planets/health.png',
    8: '/images/planets/education.png',
};

const GALAXY_A = 180;
const GALAXY_B = 280;

const planetAngles = {
    1: 0, 2: 45, 3: 90, 4: 135, 5: 180, 6: 225, 7: 270, 8: 315,
};

const getFixedPosition = (planet) => {
    const angle = planetAngles[planet.id] * Math.PI / 180;
    return {
        x: Math.cos(angle) * GALAXY_A,
        y: Math.sin(angle) * GALAXY_B
    };
};

export default function Universe({ planets, onPlanetClick, onBack, onCenterClick }) {
    const [hoveredPlanet, setHoveredPlanet] = useState(null);
    const [offsets, setOffsets] = useState({});
    const [imageErrors, setImageErrors] = useState({});

    useEffect(() => {
        let lastTime = performance.now();
        let animProgress = 0;

        const animateMicro = (currentTime) => {
            const delta = Math.min(0.033, (currentTime - lastTime) / 1000);
            lastTime = currentTime;
            animProgress += delta * 1.2;

            setOffsets(prev => {
                const newOffsets = { ...prev };
                planets.forEach(planet => {
                    const t = animProgress;
                    newOffsets[planet.id] = {
                        x: Math.sin(t * 0.5 + planet.id) * 4,
                        y: Math.cos(t * 0.4 + planet.id * 1.3) * 3
                    };
                });
                return newOffsets;
            });

            requestAnimationFrame(animateMicro);
        };

        const animFrame = requestAnimationFrame(animateMicro);
        return () => cancelAnimationFrame(animFrame);
    }, [planets]);

    const getPlanetSize = (level) => {
        return 90 + (level - 1) * 10;
    };

    const handleImageError = (planetId) => {
        setImageErrors(prev => ({ ...prev, [planetId]: true }));
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 mb-4 hover:text-white transition">
                <span>←</span> Назад на главную
            </button>

            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">🌌 Финансовая галактика</h1>
                <p className="text-gray-400 text-sm">8 планет — твои финансовые категории</p>
            </div>

            <div className="relative bg-black/20 rounded-3xl p-4 min-h-[750px] border border-white/5">
                <div className="relative h-[700px]">

                    {/* Эллиптическая орбита */}
                    <div
                        className="absolute rounded-full border border-[#2F6BFF]/10 pointer-events-none"
                        style={{
                            left: '50%', top: '50%',
                            width: GALAXY_A * 2, height: GALAXY_B * 2,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />

                    {/* Солнце - МТБанк */}
                    <div
                        className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105"
                        style={{
                            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                            width: '200px', height: '200px',
                            zIndex: 20,
                            boxShadow: '0 0 80px #2F6BFF, 0 0 40px #2F6BFF'
                        }}
                        onClick={() => {
                            if (onCenterClick) onCenterClick();
                        }}>

                        <div className="absolute inset-0 rounded-full" style={{
                            boxShadow: '0 0 40px #2F6BFF, 0 0 20px #2F6BFF, inset 0 0 20px rgba(47,107,255,0.5)',
                            borderRadius: '50%'
                        }} />

                        <img
                            src="/images/planets/main.png"
                            alt="МТБанк"
                            className="rounded-full shadow-2xl object-cover w-full h-full relative z-10"
                            style={{ boxShadow: 'none' }}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center" style={{ display: 'none' }}>
                            <span className="text-7xl animate-pulse">⭐</span>
                            <span className="text-white font-bold text-sm mt-1">МТБанк</span>
                        </div>

                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                            <div className="bg-black/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white font-medium border border-[#2F6BFF]/50">
                                🌟 МТБанк
                            </div>
                        </div>
                    </div>

                    {/* Планеты */}
                    {planets.map(planet => {
                        const size = getPlanetSize(planet.level);
                        const fixedPos = getFixedPosition(planet);
                        const offset = offsets[planet.id] || { x: 0, y: 0 };
                        const isHovered = hoveredPlanet === planet.id;
                        const imageUrl = planetImages[planet.id];
                        const hasError = imageErrors[planet.id];

                        return (
                            <div key={planet.id}
                                 className="absolute cursor-pointer"
                                 style={{
                                     left: `calc(50% + ${fixedPos.x + offset.x}px)`,
                                     top: `calc(50% + ${fixedPos.y + offset.y}px)`,
                                     transform: 'translate(-50%, -50%)',
                                     zIndex: isHovered ? 20 : 5,
                                 }}
                                 onMouseEnter={() => setHoveredPlanet(planet.id)}
                                 onMouseLeave={() => setHoveredPlanet(null)}
                                 onClick={() => onPlanetClick(planet)}>

                                <div className="relative flex flex-col items-center">
                                    <div
                                        style={{
                                            transform: `scale(${isHovered ? 1.1 : 1})`,
                                            transition: 'transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
                                            width: size,
                                            height: size,
                                            filter: isHovered
                                                ? `drop-shadow(0 0 20px ${planet.color}) drop-shadow(0 0 10px ${planet.color})`
                                                : `drop-shadow(0 0 12px ${planet.color}99)`,
                                        }}
                                    >
                                        {!hasError && imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={planet.name}
                                                className="rounded-full object-cover w-full h-full"
                                                onError={() => handleImageError(planet.id)}
                                            />
                                        ) : (
                                            <div
                                                className="rounded-full flex flex-col items-center justify-center w-full h-full"
                                                style={{
                                                    background: `radial-gradient(circle at 35% 35%, ${planet.colorLight}, ${planet.color}, ${planet.colorDark})`,
                                                }}>
                                                <span className="text-5xl">{planet.icon}</span>
                                                <span className="text-sm text-white/80 mt-1">Lv.{planet.level}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-orange-500 text-black text-base font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white/30 z-10">
                                        {planet.level}
                                    </div>

                                    <div className="mt-3 text-center">
                                        <div className={`bg-black/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white font-medium transition-all duration-300 ${
                                            isHovered ? 'border border-[#35D07F] shadow-lg shadow-[#35D07F]/30 scale-105' : ''
                                        }`}>
                                            {planet.name}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}