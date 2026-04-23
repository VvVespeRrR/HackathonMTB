import React from 'react';
import Card from '../components/Card';

const SAVINGS_GOALS = [
    { id: 1, name: 'Япония 🇯🇵', current: 351, target: 1500, icon: '🗾', color: '#f97316' },
    { id: 2, name: 'Новый MacBook 💻', current: 450, target: 3000, icon: '💻', color: '#ec4899' },
    { id: 3, name: 'Подушка безопасности 🛡️', current: 500, target: 2000, icon: '🛡️', color: '#22c55e' },
];

export default function Goals() {
    const mainGoal = SAVINGS_GOALS[0];
    const progress = (mainGoal.current / mainGoal.target) * 100;
    const monthsLeft = Math.ceil((mainGoal.target - mainGoal.current) / 60);

    return (
        <div className="pb-24">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">💰 Копилка</h1>
                <p className="text-gray-400 text-sm">Копи на мечту</p>
            </div>

            {/* Главная цель */}
            <Card className="mb-4" glow>
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-white font-semibold">{mainGoal.name}</h3>
                        <p className="text-gray-400 text-sm">Текущая цель</p>
                    </div>
                    <button className="text-[#2F6BFF] text-sm">✎</button>
                </div>

                <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-3xl font-bold text-white">{mainGoal.current}</span>
                        <span className="text-sm text-gray-400">BYN</span>
                    </div>
                    <p className="text-gray-400 text-sm">из {mainGoal.target} BYN</p>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
                </div>

                <div className="mt-3 p-3 bg-[#35D07F]/10 rounded-xl">
                    <p className="text-[#35D07F] text-sm text-center">📅 Примерно через {monthsLeft} месяцев</p>
                </div>
            </Card>

            {/* Другие цели */}
            <h3 className="text-white font-semibold mb-3">Другие цели</h3>
            <div className="space-y-3">
                {SAVINGS_GOALS.slice(1).map(goal => (
                    <Card key={goal.id}>
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{goal.icon}</div>
                            <div className="flex-1">
                                <p className="text-white font-semibold">{goal.name}</p>
                                <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                                    <div className="h-1.5 rounded-full" style={{ width: `${(goal.current / goal.target) * 100}%`, backgroundColor: goal.color }} />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>{goal.current} BYN</span>
                                    <span>{goal.target} BYN</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}