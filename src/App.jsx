import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import PetAstronaut from './components/PetAstronaut';
import Home from './pages/Home';
import Universe from './pages/Universe';
import PlanetDetails from './pages/PlanetDetails';
import Analytics from './pages/Analytics';
import Goals from './pages/Goals';
import Friends from './pages/Friends';
import Leaderboard from './pages/Leaderboard';

// Начальные данные планет (8 штук) с дополнительными полями для механики
// Начальные данные планет (8 штук) с ПОЛНЫМИ полями для механики
const INITIAL_PLANETS = [
    {
        id: 1, name: 'Гастрон', icon: '🍽️', color: '#f97366', colorLight: '#ff9a44', colorDark: '#ea580c',
        level: 3, xp: 1250, category: 'Рестораны и кафе', description: 'Планета вкуса', discount: '-10% в ресторанах',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 2, name: 'Шоппинг', icon: '🛍️', color: '#ec4899', colorLight: '#f472b6', colorDark: '#be185d',
        level: 2, xp: 800, category: 'Покупки', description: 'Галактика стиля', discount: 'Скидки до 15%',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 3, name: 'Путешествия', icon: '✈️', color: '#06b6d4', colorLight: '#22d3ee', colorDark: '#0891b2',
        level: 1, xp: 300, category: 'Авиа и отели', description: 'Странник вселенной', discount: 'Мили',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 4, name: 'Экономика', icon: '💰', color: '#f59e0b', colorLight: '#fbbf24', colorDark: '#d97706',
        level: 2, xp: 450, category: 'Инвестиции', description: 'Планета财富', discount: '+2% ставка',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 5, name: 'Дом', icon: '🏠', color: '#6366f1', colorLight: '#818cf8', colorDark: '#4f46e5',
        level: 4, xp: 3200, category: 'Коммуналка', description: 'Стабильная база', discount: 'Снижение комиссий',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 6, name: 'Культура', icon: '🎭', color: '#a855f7', colorLight: '#c084fc', colorDark: '#7e22ce',
        level: 1, xp: 200, category: 'Кино и театры', description: 'Мир искусства', discount: '-15% на билеты',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 7, name: 'Здоровье', icon: '🏋️', color: '#22c55e', colorLight: '#4ade80', colorDark: '#16a34a',
        level: 1, xp: 150, category: 'Спорт', description: 'Живая планета', discount: 'Фитнес -15%',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
    {
        id: 8, name: 'Развитие', icon: '📚', color: '#3b82f6', colorLight: '#60a5fa', colorDark: '#1d4ed8',
        level: 1, xp: 180, category: 'Образование', description: 'Академия знаний', discount: 'Гранты',
        infrastructure: 1, housing: 1, leisure: 1, points: 0, happiness: 70, lastCollect: Date.now()
    },
];

function App() {
    const [activePage, setActivePage] = useState('home');
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [planets, setPlanets] = useState(INITIAL_PLANETS);
    const [balance, setBalance] = useState(874);
    const [notifications, setNotifications] = useState([]);

    const addNotification = (text, type = 'success') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, text, type }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
    };

    const handleSpend = (planetId, amount) => {
        setBalance(prev => prev - amount);
        setPlanets(prev => prev.map(p => {
            if (p.id === planetId) {
                const xpGained = amount * 2;
                let newXp = p.xp + xpGained;
                let newLevel = p.level;
                while (newXp >= 1000) {
                    newXp -= 1000;
                    newLevel++;
                    addNotification(`🎉 ${p.name} повысился до ${newLevel} уровня!`, 'levelup');
                }
                addNotification(`💳 +${xpGained} XP! Потрачено ${amount} BYN`, 'success');
                return { ...p, xp: newXp, level: newLevel };
            }
            return p;
        }));
    };

    const handleQuizComplete = (planetId, isCorrect, rewardPoints = null) => {
        // Если передан rewardPoints из PlanetDetails, используем его, иначе стандартный
        const reward = rewardPoints || (isCorrect ? 80 : 40);

        setPlanets(prev => prev.map(p => {
            if (p.id === planetId) {
                let newXp = p.xp + reward;
                let newLevel = p.level;
                while (newXp >= 1000) {
                    newXp -= 1000;
                    newLevel++;
                    addNotification(`🎉 ${p.name} повысился до ${newLevel} уровня!`, 'levelup');
                }
                return { ...p, xp: newXp, level: newLevel };
            }
            return p;
        }));

        if (!rewardPoints) {
            addNotification(isCorrect ? '✅ +80 XP! Отличные знания!' : '📚 +40 XP за старание!', isCorrect ? 'success' : 'info');
        }
    };

    const handleCollectPoints = (planetId, points) => {
        addNotification(`🌟 +${points} очков на планете!`, 'success');
    };

    const handleUpgrade = (planetId, type, newLevel) => {
        addNotification(`🏗️ Улучшение "${type}" до ${newLevel} уровня!`, 'success');
    };

    const renderPage = () => {
        if (activePage === 'home') return <Home onNavigate={setActivePage} balance={balance} />;
        if (activePage === 'universe') return <Universe planets={planets} onPlanetClick={(p) => { setSelectedPlanet(p); setActivePage('planet'); }} onBack={() => setActivePage('home')} onCenterClick={() => setActivePage('analytics')} />;
        if (activePage === 'planet') return <PlanetDetails
            planet={selectedPlanet}
            onBack={() => setActivePage('universe')}
            onSpend={handleSpend}
            onQuizComplete={handleQuizComplete}
            onCollectPoints={handleCollectPoints}
            onUpgrade={handleUpgrade}
        />;
        if (activePage === 'analytics') return <Analytics />;
        if (activePage === 'goals') return <Goals />;
        if (activePage === 'friends') return <Friends onInvite={() => addNotification('🎉 Приглашение отправлено!')} />;
        if (activePage === 'leaderboard') return <Leaderboard currentUserPoints={1240} />;
        return <Home onNavigate={setActivePage} balance={balance} />;
    };

    return (
        <div className="min-h-screen relative" style={{
            background: 'radial-gradient(ellipse at 30% 40%, #050510, #000000)',
            backgroundAttachment: 'fixed'
        }}>
            {/* Глубокий космос с туманностями */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[#030308] opacity-90" />
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-slower" />
                <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/15 rounded-full blur-[90px]" />
                <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-pink-900/10 rounded-full blur-[100px] animate-pulse-slower" />
                {[...Array(400)].map((_, i) => (
                    <div key={i} className="absolute rounded-full animate-twinkle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 2 + 0.5}px`,
                        height: `${Math.random() * 2 + 0.5}px`,
                        background: `rgba(255,255,255,${Math.random() * 0.6 + 0.2})`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${Math.random() * 4 + 2}s`,
                    }} />
                ))}
                {[...Array(50)].map((_, i) => (
                    <div key={`big-${i}`} className="absolute rounded-full animate-twinkle" style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 2}px`,
                        height: `${Math.random() * 3 + 2}px`,
                        background: `rgba(255,220,150,${Math.random() * 0.5 + 0.3})`,
                        boxShadow: '0 0 4px rgba(255,200,100,0.5)',
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 3 + 1}s`,
                    }} />
                ))}
                <div className="absolute top-0 left-1/2 w-[200%] h-[300px] bg-white/5 rounded-full blur-[150px] transform -rotate-12 translate-x-[-25%] translate-y-[-30%]" />
                <div className="absolute bottom-0 right-1/2 w-[150%] h-[250px] bg-blue-500/5 rounded-full blur-[120px] transform rotate-25 translate-x-[20%] translate-y-[20%]" />
            </div>

            <div className="relative z-10 max-w-md mx-auto px-4 py-4 pb-24">
                <Header userName="Алексей" petComponent={<PetAstronaut size="sm" />} />
                {renderPage()}
            </div>

            <BottomNav active={activePage === 'planet' ? 'universe' : activePage} onNavigate={setActivePage} />

            <div className="fixed bottom-20 right-4 z-50 space-y-2">
                {notifications.map(n => (
                    <div key={n.id} className="bg-gray-900/95 backdrop-blur rounded-xl p-3 border-l-4 border-[#35D07F] animate-slideRight shadow-xl">
                        <p className="text-white text-sm">{n.text}</p>
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes slideRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.08); }
        }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-slideRight { animation: slideRight 0.3s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 10s ease-in-out infinite; }
      `}</style>
        </div>
    );
}

export default App;