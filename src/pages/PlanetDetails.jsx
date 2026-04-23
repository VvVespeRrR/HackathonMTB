import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

// Картинки для детального просмотра
const planetDetailImages = {
    1: '/images/planets/gastron.png',
    2: '/images/planets/shopping.png',
    3: '/images/planets/travel.png',
    4: '/images/planets/economy.png',
    5: '/images/planets/home.png',
    6: '/images/planets/culture.png',
    7: '/images/planets/zdorovie.png',
    8: '/images/planets/obrazovanie.png',
};

const planetNames = {
    1: 'Гастрон', 2: 'Шоппинг', 3: 'Путешествия', 4: 'Экономика',
    5: 'Дом', 6: 'Культура', 7: 'Здоровье', 8: 'Развитие',
};

// ЗАДАНИЯ ОТ ПАРТНЁРОВ
const PARTNER_QUESTS = {
    1: { // Гастрон
        partner: '🍕 Додо Пицца',
        quest: 'Сделай заказ от 25 BYN',
        reward: 80,
        discount: '10% на первый заказ',
        link: 'https://dodopizza.by'
    },
    2: { // Шоппинг
        partner: '👗 Lamoda',
        quest: 'Соверши покупку от 100 BYN',
        reward: 100,
        discount: '15% на первую покупку',
        link: 'https://lamoda.by'
    },
    3: { // Путешествия
        partner: '✈️ Авиасейлс',
        quest: 'Забронируй отель или авиабилет',
        reward: 150,
        discount: 'Скидка 5% по промокоду COSMO',
        link: 'https://aviasales.by'
    },
    4: { // Экономика
        partner: '🏦 МТБанк',
        quest: 'Открой накопительный счёт',
        reward: 200,
        discount: 'Повышенная ставка +1%',
        link: 'https://mtbank.by'
    },
    5: { // Дом
        partner: '🛋️ 21vek',
        quest: 'Купи товары для дома от 150 BYN',
        reward: 120,
        discount: 'Бесплатная доставка',
        link: 'https://21vek.by'
    },
    6: { // Культура
        partner: '🎬 КиноПоиск',
        quest: 'Оформи подписку на месяц',
        reward: 60,
        discount: 'Первый месяц за 1 BYN',
        link: 'https://kinopoisk.ru'
    },
    7: { // Здоровье
        partner: '💪 Фитнес-клуб WorldClass',
        quest: 'Купи абонемент на месяц',
        reward: 150,
        discount: 'Пробное занятие бесплатно',
        link: 'https://worldclass.by'
    },
    8: { // Развитие
        partner: '📚 Stepik',
        quest: 'Пройди любой курс',
        reward: 100,
        discount: 'Скидка 20% по промокоду COSMO20',
        link: 'https://stepik.org'
    },
};

// Стоимость улучшений
const UPGRADE_COSTS = {
    infrastructure: [10, 25, 50, 100, 200, 350, 500, 700, 1000],
    housing: [15, 30, 60, 120, 240, 400, 600, 850, 1200],
    leisure: [12, 28, 55, 110, 220, 380, 550, 800, 1100],
};

export default function PlanetDetails({ planet, onBack, onSpend, onQuizComplete, onCollectPoints, onUpgrade }) {
    const [pendingPoints, setPendingPoints] = useState(0);
    const [questCompleted, setQuestCompleted] = useState(false);

    const quest = PARTNER_QUESTS[planet.id];

    // Локальное состояние планеты с постройками
    const [planetData, setPlanetData] = useState({
        infrastructure: planet.infrastructure || 1,
        housing: planet.housing || 1,
        leisure: planet.leisure || 1,
        points: planet.points || 0,
        happiness: planet.happiness || 70,
        lastCollect: planet.lastCollect || Date.now(),
    });

    // Расчёт текущей генерации в секунду
    const getGenerationRate = () => {
        const infraBonus = planetData.infrastructure * 0.2;
        const housingBonus = planetData.housing * 0.15;
        let happinessBonus = 1;
        if (planetData.happiness >= 70) happinessBonus = 1.2;
        else if (planetData.happiness <= 50) happinessBonus = 0.7;
        const baseRate = 0.5;
        return baseRate * (1 + infraBonus) * (1 + housingBonus) * happinessBonus;
    };

    // Пассивная генерация очков
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const secondsSinceLast = (now - planetData.lastCollect) / 1000;
            const rate = getGenerationRate();
            const generated = Math.floor(secondsSinceLast * rate);

            if (generated > 0) {
                setPendingPoints(prev => prev + generated);
                setPlanetData(prev => ({ ...prev, lastCollect: now }));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [planetData.infrastructure, planetData.housing, planetData.leisure, planetData.happiness, planetData.lastCollect]);

    // Сбор очков
    const handleCollect = () => {
        if (pendingPoints > 0) {
            const newPoints = planetData.points + pendingPoints;
            setPlanetData(prev => ({ ...prev, points: newPoints }));
            setPendingPoints(0);
            onCollectPoints(planet.id, pendingPoints);
        }
    };

    // Улучшение
    const handleUpgradeClick = (type) => {
        const currentLevel = planetData[type];
        const cost = UPGRADE_COSTS[type][currentLevel - 1];

        if (planetData.points >= cost && currentLevel < 9) {
            const newPoints = planetData.points - cost;
            const newLevel = currentLevel + 1;

            const requiredLeisure = (type === 'housing' ? newLevel : planetData.housing) * 3;
            const currentLeisure = type === 'leisure' ? newLevel : planetData.leisure;
            let newHappiness = planetData.happiness;

            if (currentLeisure >= requiredLeisure) {
                newHappiness = Math.min(100, newHappiness + 5);
            } else {
                newHappiness = Math.max(0, newHappiness - 3);
            }

            setPlanetData(prev => ({
                ...prev,
                [type]: newLevel,
                points: newPoints,
                happiness: newHappiness
            }));

            onUpgrade(planet.id, type, newLevel);
        }
    };

    // Выполнение задания
    const handleCompleteQuest = () => {
        if (!questCompleted) {
            const newPoints = planetData.points + quest.reward;
            setPlanetData(prev => ({ ...prev, points: newPoints }));
            setQuestCompleted(true);
            onQuizComplete(planet.id, true, quest.reward); // переиспользуем onQuizComplete как onQuestComplete
        }
    };

    const getUpgradeCost = (type) => {
        const currentLevel = planetData[type];
        if (currentLevel >= 9) return null;
        return UPGRADE_COSTS[type][currentLevel - 1];
    };

    const getPlanetSize = (level) => 140 + (level - 1) * 8;
    const generationRate = getGenerationRate();
    const requiredLeisure = planetData.housing * 3;
    const isHappinessGood = planetData.happiness >= 70;
    const isHappinessBad = planetData.happiness <= 50;

    const planetImage = planetDetailImages[planet.id];
    const planetName = planetNames[planet.id] || planet.name;

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-400 mb-4 hover:text-white transition">
                <span>←</span> Назад ко вселенной
            </button>

            {/* Крупная картинка */}
            <div className="flex flex-col items-center mb-6">
                <div className="relative">
                    <div className="absolute rounded-full blur-xl" style={{ width: getPlanetSize(planet.level) + 50, height: getPlanetSize(planet.level) + 50, left: -25, top: -25, background: `radial-gradient(circle, ${planet.color}60, transparent)` }} />
                    <img src={planetImage} alt={planetName} className="rounded-full shadow-2xl object-cover transition-all duration-500" style={{ width: getPlanetSize(planet.level), height: getPlanetSize(planet.level), boxShadow: `0 0 50px ${planet.color}80` }} />
                    <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-500 to-orange-500 text-black text-base font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white/30 z-10">{planet.level}</div>
                </div>
                <h2 className="text-2xl font-bold text-white mt-4">{planetName}</h2>
                <p className="text-gray-400 text-sm">{planet.description}</p>
            </div>

            {/* Очки и сбор */}
            <Card className="mb-4" glow>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-400 text-xs">Накоплено очков</p>
                        <p className="text-3xl font-bold text-yellow-400">{planetData.points}</p>
                    </div>
                    <button
                        onClick={handleCollect}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${pendingPoints > 0 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white animate-pulse' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                        disabled={pendingPoints === 0}
                    >
                        Собрать {pendingPoints > 0 ? `+${pendingPoints}` : '0'} очков
                    </button>
                </div>
                <p className="text-gray-500 text-xs mt-2">⚡ {generationRate.toFixed(2)} очков/сек</p>
            </Card>

            {/* ЗАДАНИЕ ОТ ПАРТНЁРА */}
            <Card className="mb-4" glow>
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                        🎯
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Задание от партнёра</h3>
                        <p className="text-gray-400 text-xs">{quest.partner}</p>
                    </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 mb-3">
                    <p className="text-white text-sm font-medium">{quest.quest}</p>
                    <p className="text-[#35D07F] text-xs mt-1">🎁 Награда: +{quest.reward} очков</p>
                    <p className="text-yellow-400 text-xs">🏷️ {quest.discount}</p>
                </div>

                {!questCompleted ? (
                    <a
                        href={quest.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCompleteQuest}
                        className="block w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl text-center transition-all hover:scale-[1.02]"
                    >
                        Выполнить задание →
                    </a>
                ) : (
                    <div className="w-full bg-green-500/20 text-green-400 font-semibold py-3 rounded-xl text-center border border-green-500/50">
                        ✅ Задание выполнено! +{quest.reward} очков получено
                    </div>
                )}
            </Card>

            {/* Статус счастья */}
            <Card className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">😊 Уровень счастья</span>
                    <span className={`font-bold ${isHappinessGood ? 'text-green-400' : isHappinessBad ? 'text-red-400' : 'text-yellow-400'}`}>{planetData.happiness}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all ${isHappinessGood ? 'bg-green-500' : isHappinessBad ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${planetData.happiness}%` }} />
                </div>
                <p className="text-gray-500 text-xs mt-2">
                    {isHappinessGood ? '✨ Жители счастливы! Производительность +20%' :
                        isHappinessBad ? '⚠️ Низкое счастье! Производительность -30%' :
                            '👍 Нормальный уровень счастья'}
                </p>
            </Card>

            {/* Улучшения */}
            <h3 className="text-white font-semibold mb-3">🏗️ Улучшения планеты</h3>
            <div className="space-y-3 mb-4">
                <UpgradeCard
                    title="🏭 Инфраструктура"
                    level={planetData.infrastructure}
                    cost={getUpgradeCost('infrastructure')}
                    points={planetData.points}
                    onUpgrade={() => handleUpgradeClick('infrastructure')}
                    description="Увеличивает скорость генерации очков"
                    bonus={`+${planetData.infrastructure * 20}% скорости`}
                />
                <UpgradeCard
                    title="🏘️ Жилье"
                    level={planetData.housing}
                    cost={getUpgradeCost('housing')}
                    points={planetData.points}
                    onUpgrade={() => handleUpgradeClick('housing')}
                    description="Увеличивает количество жителей"
                    bonus={`+${planetData.housing * 15}% генерации`}
                    warning={planetData.leisure < requiredLeisure ? `⚠️ Нужно больше досуга!` : ''}
                />
                <UpgradeCard
                    title="🎭 Досуг"
                    level={planetData.leisure}
                    cost={getUpgradeCost('leisure')}
                    points={planetData.points}
                    onUpgrade={() => handleUpgradeClick('leisure')}
                    description="Повышает счастье жителей"
                    bonus={`Уровень досуга: ${planetData.leisure}`}
                />
            </div>

            {/* Кнопка покупки */}
            <button
                onClick={() => onSpend && onSpend(planet.id, 10)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-4 rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
                💳 Совершить покупку (+20 XP)
            </button>
        </div>
    );
}

// Компонент карточки улучшения
function UpgradeCard({ title, level, cost, points, onUpgrade, description, bonus, warning }) {
    const canUpgrade = cost !== null && points >= cost;

    return (
        <Card className="p-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="text-white font-bold">{title}</h4>
                    <p className="text-gray-400 text-xs">{description}</p>
                </div>
                <div className="text-right">
                    <span className="text-yellow-400 font-bold">Ур. {level}</span>
                </div>
            </div>
            <p className="text-[#35D07F] text-xs mb-2">{bonus}</p>
            {warning && <p className="text-red-400 text-xs mb-2">{warning}</p>}
            {cost !== null ? (
                <button
                    onClick={onUpgrade}
                    disabled={!canUpgrade}
                    className={`w-full py-2 rounded-xl font-semibold transition-all ${canUpgrade ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-[1.02]' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                >
                    Улучшить за {cost} очков
                </button>
            ) : (
                <p className="text-center text-gray-500 text-sm py-2">Максимальный уровень</p>
            )}
        </Card>
    );
}