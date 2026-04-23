import React, { useState } from 'react';
import QuizModal from './QuizModal';
import { TrendingUp, Zap, BookOpen, Star } from 'lucide-react';

export default function PlanetCard({ planet, onBoost, onQuizComplete }) {
    const [showQuiz, setShowQuiz] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const getLevelColor = (level) => {
        const colors = {
            1: 'from-gray-500 to-gray-600',
            2: 'from-green-500 to-emerald-500',
            3: 'from-blue-500 to-cyan-500',
            4: 'from-purple-500 to-pink-500',
            5: 'from-yellow-500 to-orange-500'
        };
        return colors[level] || colors[1];
    };

    const getNextLevelResource = () => {
        const nextLevel = planet.level + 1;
        const needed = nextLevel * 150;
        const current = planet.resource;
        return Math.max(0, needed - current);
    };

    return (
        <>
            <div
                className="relative group cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Свечение при наведении */}
                <div
                    className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: planet.bgGlow }}
                />

                <div className="relative glass-effect rounded-2xl p-5 border border-white/10 hover:border-yellow-500/50 transition-all">
                    {/* Заголовок */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-2">
                            <span className="text-5xl drop-shadow-lg">{planet.icon}</span>
                            <span className="text-2xl">{planet.emoji}</span>
                        </div>
                        <div className="text-right">
                            <div className={`bg-gradient-to-r ${getLevelColor(planet.level)} text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg`}>
                                Lv.{planet.level}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                                до Lv.{planet.level + 1}: {getNextLevelResource()}
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">{planet.name}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                        <span>{planet.categoryIcon}</span>
                        <span>{planet.category}</span>
                    </div>

                    {/* Размер планеты */}
                    <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>🌍 Размер планеты</span>
                            <span>{planet.sizePercent}%</span>
                        </div>
                        <div className="bg-gray-700 rounded-full h-2.5 overflow-hidden">
                            <div
                                className={`bg-gradient-to-r ${planet.color} h-full transition-all duration-500 rounded-full`}
                                style={{ width: `${planet.sizePercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Ресурсы */}
                    <div className="bg-black/40 rounded-xl p-3 mb-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{planet.resourceIcon}</span>
                                <span className="text-white font-semibold">{planet.resource}</span>
                                <span className="text-gray-400 text-sm">{planet.resourceName}</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-400 text-xs">
                                <Zap size={12} />
                                <span>+3-7/8с</span>
                            </div>
                        </div>
                    </div>

                    {/* Бонус */}
                    <div className="flex items-center gap-1 text-yellow-400 text-sm mb-4">
                        <Star size={14} />
                        <span>{planet.boostEffect}</span>
                    </div>

                    {/* Кнопки */}
                    <div className="flex gap-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); onBoost(); }}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <TrendingUp size={16} />
                            <span>Буст тратой</span>
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowQuiz(true); }}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <BookOpen size={16} />
                            <span>Тест</span>
                        </button>
                    </div>

                    {/* Дополнительная инфа при наведении */}
                    {isHovered && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                            +{Math.floor(planet.resource / 10)}% кэшбек
                        </div>
                    )}
                </div>
            </div>

            {showQuiz && (
                <QuizModal
                    planet={planet}
                    quiz={planet.quiz}
                    onClose={() => setShowQuiz(false)}
                    onComplete={(isCorrect) => {
                        onQuizComplete(isCorrect);
                        setShowQuiz(false);
                    }}
                />
            )}
        </>
    );
}