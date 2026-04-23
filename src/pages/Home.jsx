import React from 'react';
import Card from '../components/Card';
import PetAstronaut from '../components/PetAstronaut';

export default function Home({ onNavigate }) {
    return (
        <div>
            {/* Приветствие */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Привет, Алексей!</h1>
                <p className="text-gray-400 text-sm mt-1">Готов к новым достижениям? 🚀</p>
            </div>

            {/* Финансовое здоровье */}
            <Card className="mb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-400 text-sm mb-1">Финансовое здоровье</h3>
                        <p className="text-white text-3xl font-bold">87%</p>
                        <p className="text-[#35D07F] text-xs mt-1">Отлично! Так держать</p>
                    </div>
                    <div className="relative w-16 h-16">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#1e293b" strokeWidth="6" />
                            <circle cx="32" cy="32" r="28" fill="none" stroke="#35D07F" strokeWidth="6" strokeDasharray="176" strokeDashoffset="23" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">87%</span>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Баланс */}
            <Card className="mb-4" glow>
                <div className="text-center">
                    <p className="text-gray-400 text-sm mb-1">Текущий баланс</p>
                    <p className="text-4xl font-bold text-white">945,76 BYN</p>
                    <div className="flex justify-center gap-6 mt-3">
                        <div><p className="text-[#35D07F] text-xs">Доход</p><p className="text-white font-semibold">1200,11 BYN</p></div>
                        <div><p className="text-red-400 text-xs">Расход</p><p className="text-white font-semibold">-254,35 BYN</p></div>
                    </div>
                </div>
            </Card>

            {/* Быстрые действия */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                    { id: 'goals', icon: '💰', title: 'Копилка', desc: 'Накопления', color: 'from-yellow-500 to-orange-500' },
                    { id: 'analytics', icon: '📊', title: 'Аналитика', desc: 'Расходы', color: 'from-blue-500 to-cyan-500' },
                    { id: 'education', icon: '📚', title: 'Знания', desc: 'Обучение', color: 'from-purple-500 to-pink-500' },
                    { id: 'friends', icon: '👥', title: 'Друзья', desc: 'Рейтинг', color: 'from-green-500 to-emerald-500' }
                ].map(action => (
                    <Card key={action.id} onClick={() => onNavigate(action.id)} className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-xl`}>
                                {action.icon}
                            </div>
                            <div><p className="text-white font-semibold text-sm">{action.title}</p><p className="text-gray-400 text-xs">{action.desc}</p></div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Кнопка перехода во вселенную */}
            <button
                onClick={() => onNavigate('universe')}
                className="w-full bg-gradient-to-r from-[#2F6BFF] to-[#35D07F] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-98"
            >
                <span className="text-xl">🌌</span>
                <span>Открыть финансовую вселенную</span>
                <span className="text-xl">→</span>
            </button>
        </div>
    );
}