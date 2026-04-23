import React, { useState, useEffect } from 'react';

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

// Адаптивные размеры в зависимости от ширины экрана
const getAdaptiveSizes = () => {
    const width = window.innerWidth;
    if (width < 400) return { galaxyA: 140, galaxyB: 100, sunSize: 100, planetBaseSize: 45, containerHeight: 380 };
    if (width < 500) return { galaxyA: 160, galaxyB: 120, sunSize: 120, planetBaseSize: 50, containerHeight: 420 };
    if (width < 640) return { galaxyA: 180, galaxyB: 140, sunSize: 140, planetBaseSize: 55, containerHeight: 480 };
    return { galaxyA: 200, galaxyB: 160, sunSize: 160, planetBaseSize: 60, containerHeight: 520 };
};

const planetAngles = {
    1: 0, 2: 45, 3: 90, 4: 135, 5: 180, 6: 225, 7: 270, 8: 315,
};

export default function Universe({ planets, onPlanetClick, onBack, onCenterClick }) {
    const [hoveredPlanet, setHoveredPlanet] = useState(null);
    const [offsets, setOffsets] = useState({});
    const [imageErrors, setImageErrors] = useState({});
    const [adaptiveSizes, setAdaptiveSizes] = useState(getAdaptiveSizes());

    // Отслеживаем изменение размера окна
    useEffect(() => {
        const handleResize = () => setAdaptiveSizes(getAdaptiveSizes());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { galaxyA: GALAXY_A, galaxyB: GALAXY_B, sunSize: SUN_SIZE, planetBaseSize: PLANET_BASE_SIZE, containerHeight: CONTAINER_HEIGHT } = adaptiveSizes;

    const getFixedPosition = (planet) => {
        const angle = planetAngles[planet.id] * Math.PI / 180;
        return {
            x: Math.cos(angle) * GALAXY_A,
            y: Math.sin(angle) * GALAXY_B
        };
    };

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
                        x: Math.sin(t * 0.5 + planet.id) * 3,
                        y: Math.cos(t * 0.4 + planet.id * 1.3) * 2
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
        return PLANET_BASE_SIZE + (level - 1) * 4;
    };

    const handleImageError = (planetId) => {
        setImageErrors(prev => ({ ...prev, [planetId]: true }));
    };

    return (
        <div className="px-2">
            <button onClick={onBack} className="flex items-center gap-1 text-gray-400 mb-2 hover:text-white transition text-sm">
                <span>←</span> Назад
            </button>

            <div className="text-center mb-3">
                <h1 className="text-lg sm:text-xl font-bold text-white">🌌 Финансовая галактика</h1>
                <p className="text-gray-400 text-xs">8 планет — твои финансы</p>
            </div>

            <div className="relative bg-black/20 rounded-2xl p-2 border border-white/5">
                <div className="relative" style={{ height: CONTAINER_HEIGHT }}>

                    {/* Орбита */}
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
                        className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95"
                        style={{
                            left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                            width: SUN_SIZE, height: SUN_SIZE,
                            zIndex: 20,
                            boxShadow: '0 0 40px #2F6BFF, 0 0 20px #2F6BFF'
                        }}
                        onClick={() => onCenterClick?.()}>
                        <div className="absolute inset-0 rounded-full" style={{
                            boxShadow: '0 0 20px #2F6BFF, 0 0 10px #2F6BFF, inset 0 0 10px rgba(47,107,255,0.5)',
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
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                            <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-[9px] text-white font-medium border border-[#2F6BFF]/50">
                                МТБанк
                            </div>
                        </div>
                    </div>

                    {/* Планеты */}
                    {planets.map(planet => {
                        const level = Math.floor((planet.infrastructure + planet.housing + planet.leisure) / 3);
                        const size = getPlanetSize(level);
                        const fixedPos = getFixedPosition(planet);
                        const offset = offsets[planet.id] || { x: 0, y: 0 };
                        const isHovered = hoveredPlanet === planet.id;
                        const imageUrl = planetImages[planet.id];
                        const hasError = imageErrors[planet.id];

                        return (
                            <div key={planet.id}
                                 className="absolute cursor-pointer active:scale-95 transition-transform"
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
                                                ? `drop-shadow(0 0 12px ${planet.color})`
                                                : `drop-shadow(0 0 6px ${planet.color}99)`,
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
                                                <span className="text-3xl">{planet.icon}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-500 to-orange-500 text-black text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border border-white/30 z-10">
                                        {level}
                                    </div>

                                    <div className="mt-1.5 text-center">
                                        <div className="bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5 text-[9px] text-white font-medium">
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