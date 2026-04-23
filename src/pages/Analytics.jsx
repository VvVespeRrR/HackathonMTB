import React, { useState } from 'react';
import Card from '../components/Card';

// Данные для графиков по категориям
const CATEGORY_DATA = [
    { name: 'Гастрон', amount: 12450, color: '#f97316', percentage: 28, icon: '🍽️' },
    { name: 'Дом', amount: 15700, color: '#eab308', percentage: 35, icon: '🏠' },
    { name: 'Шоппинг', amount: 8900, color: '#ec4899', percentage: 20, icon: '🛍️' },
    { name: 'Путешествия', amount: 3210, color: '#06b6d4', percentage: 7, icon: '✈️' },
    { name: 'Здоровье', amount: 2100, color: '#22c55e', percentage: 5, icon: '🏋️' },
    { name: 'Культура', amount: 1800, color: '#a855f7', percentage: 4, icon: '🎭' },
    { name: 'Развитие', amount: 1500, color: '#3b82f6', percentage: 1, icon: '📚' },
];

// Данные для тренда по месяцам (оставляем для второй вкладки)
const MONTHLY_TREND = [
    { month: 'Янв', amount: 42000, color: '#f97316' },
    { month: 'Фев', amount: 58000, color: '#ec4899' },
    { month: 'Мар', amount: 35000, color: '#06b6d4' },
    { month: 'Апр', amount: 72000, color: '#22c55e' },
    { month: 'Май', amount: 89000, color: '#eab308' },
    { month: 'Июн', amount: 110000, color: '#a855f7' },
    { month: 'Июл', amount: 135000, color: '#3b82f6' },
    { month: 'Авг', amount: 142000, color: '#f97316' },
    { month: 'Сен', amount: 98000, color: '#ec4899' },
    { month: 'Окт', amount: 75000, color: '#06b6d4' },
    { month: 'Ноя', amount: 83000, color: '#22c55e' },
    { month: 'Дек', amount: 210000, color: '#eab308' },
];

export default function Analytics() {
    const [chartType, setChartType] = useState('categories'); // 'categories' или 'trend'
    const [selectedBar, setSelectedBar] = useState(null);

    const currentData = chartType === 'categories' ? CATEGORY_DATA : MONTHLY_TREND;
    const maxAmount = Math.max(...currentData.map(d => d.amount));
    const minAmount = Math.min(...currentData.map(d => d.amount));
    const totalSpent = CATEGORY_DATA.reduce((sum, c) => sum + c.amount, 0);
    const avgDaily = Math.floor(totalSpent / 30);

    const getBarHeight = (amount) => {
        const maxHeight = 160;
        return (amount / maxAmount) * maxHeight;
    };

    const formatAmount = (amount) => {
        if (amount >= 1000) {
            return (amount / 1000).toFixed(1) + 'k';
        }
        return amount.toString();
    };

    return (
        <div className="pb-24">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">📊 Финансовая аналитика</h1>
                <p className="text-gray-400 text-sm">Контролируй свои расходы</p>
            </div>

            {/* Общая статистика */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <Card className="p-4">
                    <p className="text-gray-400 text-xs mb-1 text-center">Всего расходов</p>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold text-white">{formatAmount(totalSpent)}</span>
                        <span className="text-xs text-gray-400">BYN</span>
                    </div>
                    <p className="text-[#35D07F] text-xs mt-1 text-center">за месяц</p>
                </Card>
                <Card className="p-4">
                    <p className="text-gray-400 text-xs mb-1 text-center">Средний чек</p>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-2xl font-bold text-white">{formatAmount(avgDaily)}</span>
                        <span className="text-xs text-gray-400">BYN</span>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 text-center">в день</p>
                </Card>
            </div>

            {/* Переключение типа графика */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setChartType('categories')}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                        chartType === 'categories'
                            ? 'bg-gradient-to-r from-[#2F6BFF] to-[#35D07F] text-white shadow-lg'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                    📊 По категориям
                </button>
                <button
                    onClick={() => setChartType('trend')}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                        chartType === 'trend'
                            ? 'bg-gradient-to-r from-[#2F6BFF] to-[#35D07F] text-white shadow-lg'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                    📈 Тренд по месяцам
                </button>
            </div>

            {/* Гистограмма */}
            <Card className="mb-4" glow>
                <h3 className="text-white font-semibold mb-3 text-center">
                    {chartType === 'categories' ? '🥧 Расходы по категориям' : '📈 Динамика расходов по месяцам'}
                </h3>

                <div className="flex justify-between text-[10px] text-gray-500 mb-2 px-1">
                    <span>📉 мин: {formatAmount(minAmount)} BYN</span>
                    <span>📈 макс: {formatAmount(maxAmount)} BYN</span>
                </div>

                <div className="relative">
                    <div className="flex justify-between items-end h-48 gap-1">
                        {currentData.map((item, idx) => {
                            const barHeight = getBarHeight(item.amount);
                            const isSelected = selectedBar === idx;
                            const barColor = item.color || '#2F6BFF';

                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                                    <div className="relative w-full flex justify-center">
                                        <div
                                            className="rounded-t-lg transition-all duration-300 cursor-pointer"
                                            style={{
                                                height: `${Math.max(barHeight, 8)}px`,
                                                width: '40px',
                                                background: `linear-gradient(180deg, ${barColor}, ${barColor}cc)`,
                                                boxShadow: isSelected ? `0 0 15px ${barColor}` : 'none',
                                            }}
                                            onMouseEnter={() => setSelectedBar(idx)}
                                            onMouseLeave={() => setSelectedBar(null)}
                                        />

                                        {isSelected && (
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 border border-white/20 shadow-lg">
                                                {item.amount.toLocaleString()} BYN
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center mt-1">
                                        <p className="text-gray-400 text-[9px] sm:text-[10px] font-medium">
                                            {chartType === 'categories' ? item.name : item.month}
                                        </p>
                                        <p className="text-white text-[8px] sm:text-[9px] font-medium">
                                            {formatAmount(item.amount)} BYN
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-4 text-center text-gray-500 text-[10px]">
                    💡 Наведи на столбец для просмотра точной суммы
                </div>
            </Card>

            {/* Детализация по категориям (только когда выбран режим категорий) */}
            {chartType === 'categories' && (
                <Card className="mb-4">
                    <h3 className="text-white font-semibold mb-4 text-center">📋 Детализация по категориям</h3>
                    <div className="space-y-3">
                        {CATEGORY_DATA.map(cat => (
                            <div key={cat.name}>
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{cat.icon}</span>
                                        <span className="text-gray-300">{cat.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-white font-medium">{cat.amount.toLocaleString()}</span>
                                        <span className="text-xs text-gray-400">BYN</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {CATEGORY_DATA.map(cat => (
                                <div key={cat.name} className="flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                                    <span className="text-gray-400 text-[10px]">{cat.name}</span>
                                    <span className="text-white text-[10px] font-medium">{cat.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Советы по экономии */}
            <Card glow>
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-xl">💡</div>
                    <div>
                        <p className="text-white font-semibold text-sm">Совет по экономии</p>
                        <p className="text-gray-400 text-xs mt-1">
                            Ваши самые большие траты — на <span className="text-yellow-400">Дом</span> ({CATEGORY_DATA[1].amount.toLocaleString()} BYN).
                            Попробуйте пересмотреть коммунальные платежи и аренду.
                        </p>
                        <button className="mt-2 text-[#35D07F] text-xs font-medium hover:underline">
                            Как сэкономить →
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
}