import React from 'react';
import { TrendingUp, DollarSign, Target, Award, Star } from 'lucide-react';

export default function StarAnalytics({ userData }) {
    const progressToGoal = (userData.savings / userData.savingsGoal) * 100;

    return (
        <div className="relative mb-8">
            {/* Анимированное свечение */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 rounded-3xl blur-2xl" />

            <div className="relative glass-effect rounded-3xl p-6 border border-yellow-500/30">
                <div className="flex items-center gap-3 mb-6">
                    <div className="text-5xl animate-pulse-slow">⭐</div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Центральная звезда</h2>
                        <p className="text-yellow-400/80 text-sm">Твоя финансовая аналитика</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-black/40 rounded-2xl p-4 hover:bg-black/50 transition">
                        <div className="flex items-center gap-2 text-green-400 mb-2">
                            <DollarSign size={18} />
                            <span className="text-sm font-medium">Доход</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{userData.totalIncome.toLocaleString()} ₽</div>
                        <div className="text-green-400/70 text-xs mt-1">+8% к прошлому месяцу</div>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 hover:bg-black/50 transition">
                        <div className="flex items-center gap-2 text-red-400 mb-2">
                            <TrendingUp size={18} />
                            <span className="text-sm font-medium">Расход</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{userData.totalExpenses.toLocaleString()} ₽</div>
                        <div className="text-red-400/70 text-xs mt-1">60% от дохода</div>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 hover:bg-black/50 transition">
                        <div className="flex items-center gap-2 text-blue-400 mb-2">
                            <Target size={18} />
                            <span className="text-sm font-medium">Накопления</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{userData.savings.toLocaleString()} ₽</div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                            <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${progressToGoal}%` }} />
                        </div>
                        <div className="text-blue-400/70 text-xs mt-1">Цель: {userData.savingsGoal.toLocaleString()} ₽</div>
                    </div>

                    <div className="bg-black/40 rounded-2xl p-4 hover:bg-black/50 transition">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                            <Award size={18} />
                            <span className="text-sm font-medium">Кэшбэк в игре</span>
                        </div>
                        <div className="text-2xl font-bold text-white">{userData.monthlyCashback} ₽</div>
                        <div className="text-yellow-400/70 text-xs mt-1">за этот месяц</div>
                    </div>
                </div>

                {/* Категории расходов */}
                <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                        <Star size={14} />
                        <span>Топ категории расходов</span>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <span className="text-orange-400">🍽️ Гастрон 40%</span>
                        <span className="text-pink-400">🛍️ Шоппинг 25%</span>
                        <span className="text-purple-400">🎭 Культура 15%</span>
                        <span className="text-cyan-400">✈️ Путешествия 12%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}