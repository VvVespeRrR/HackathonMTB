import React, { useState } from 'react';
import Card from '../components/Card';

// Данные лидерборда
const LEADERS = [
    { id: 1, name: 'Алексей', level: 12, points: 2840, avatar: '👨‍🚀', color: '#f97316', badge: '🏆' },
    { id: 2, name: 'Анна', level: 11, points: 2450, avatar: '👩‍🚀', color: '#ec4899', badge: '🥈' },
    { id: 3, name: 'Дмитрий', level: 10, points: 2180, avatar: '👨‍🚀', color: '#06b6d4', badge: '🥉' },
    { id: 4, name: 'Екатерина', level: 9, points: 1950, avatar: '👩‍🚀', color: '#22c55e', badge: '⭐' },
    { id: 5, name: 'Сергей', level: 8, points: 1720, avatar: '👨‍🚀', color: '#a855f7', badge: '⭐' },
    { id: 6, name: 'Мария', level: 7, points: 1580, avatar: '👩‍🚀', color: '#eab308', badge: '⭐' },
    { id: 7, name: 'Иван', level: 6, points: 1340, avatar: '👨‍🚀', color: '#3b82f6', badge: '⭐' },
    { id: 8, name: 'Ольга', level: 5, points: 1120, avatar: '👩‍🚀', color: '#f97316', badge: '⭐' },
];

export default function Leaderboard({ currentUserPoints = 1240 }) {
    const [period, setPeriod] = useState('all');

    // Определяем место текущего пользователя
    const userRank = LEADERS.findIndex(l => l.name === 'Алексей') + 1;

    return (
        <div className="pb-24">
            {/* Заголовок */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">🏆 Лидерборд</h1>
                <p className="text-gray-400 text-sm">Лучшие космические путешественники</p>
            </div>

            {/* Период */}
            <div className="flex gap-2 mb-4">
                {['week', 'month', 'all'].map(p => (
                    <button
                        key={p}
                        onClick={() => setPeriod(p)}
                        className={`flex-1 py-2 rounded-xl transition-all ${
                            period === p
                                ? 'bg-gradient-to-r from-[#2F6BFF] to-[#35D07F] text-white shadow-lg'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                    >
                        {p === 'week' && 'За неделю'}
                        {p === 'month' && 'За месяц'}
                        {p === 'all' && 'За всё время'}
                    </button>
                ))}
            </div>

            {/* Карточка текущего пользователя */}
            <Card className="mb-4" glow>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#2F6BFF] to-[#35D07F] rounded-full flex items-center justify-center text-3xl">
                                👨‍🚀
                            </div>
                            <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                #{userRank}
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-bold text-lg">Алексей</p>
                            <p className="text-gray-400 text-xs">Ваше место</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-yellow-400">{currentUserPoints}</span>
                            <span className="text-xs text-gray-400">очков</span>
                        </div>
                        <p className="text-[#35D07F] text-xs">Уровень 12</p>
                    </div>
                </div>
            </Card>

            {/* Список лидеров */}
            <h3 className="text-white font-semibold mb-3">Топ игроков</h3>
            <div className="space-y-2">
                {LEADERS.map((leader, index) => (
                    <Card key={leader.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 text-center">
                  <span className={`text-lg font-bold ${
                      index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-300' :
                              index === 2 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                  </span>
                                </div>
                                <div className={`w-10 h-10 bg-gradient-to-br from-[${leader.color}] to-[${leader.color}]/70 rounded-full flex items-center justify-center text-xl`}>
                                    {leader.avatar}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{leader.name}</p>
                                    <p className="text-gray-400 text-xs">Уровень {leader.level}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center gap-1">
                                    <span className="text-white font-bold">{leader.points}</span>
                                    <span className="text-xs text-gray-400">очков</span>
                                </div>
                                <p className="text-yellow-400 text-xs">{leader.badge}</p>
                            </div>
                        </div>
                        {/* Прогресс-бар */}
                        <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                            <div
                                className="h-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
                                style={{ width: `${(leader.points / LEADERS[0].points) * 100}%` }}
                            />
                        </div>
                    </Card>
                ))}
            </div>

            {/* Мотивационная карточка */}
            <Card className="mt-4 text-center" glow>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                        <p className="text-white font-semibold">До топ-3 осталось</p>
                        <p className="text-yellow-400 font-bold">{LEADERS[2].points - currentUserPoints} очков</p>
                    </div>
                    <span className="text-2xl">⭐</span>
                </div>
            </Card>
        </div>
    );
}