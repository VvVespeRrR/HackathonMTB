export const USER = {
    name: 'Алексей',
    level: 7,
    xp: 87,
    xpToNext: 100,
    balance: 87400,
    income: 124000,
    expenses: 48300,
    savings: 35100,
    savingsGoal: 150000,
    savingsTarget: 'Путешествие в Японию 🇯🇵',
    healthScore: 87
};

export const CATEGORIES = [
    { id: 'gastro', name: 'Гастрон', icon: '🍽️', color: '#f97316', spent: 12450, level: 7, xp: 65, cashback: '+4%', discount: '-10% в ресторанах', orbit: 180, speed: 0.002 },
    { id: 'culture', name: 'Культура', icon: '🎭', color: '#a855f7', spent: 3450, level: 4, xp: 32, cashback: '+5%', discount: '-15% на билеты', orbit: 240, speed: 0.0017 },
    { id: 'shopping', name: 'Шоппинг', icon: '🛍️', color: '#ec4899', spent: 8900, level: 5, xp: 42, cashback: '+7%', discount: 'Скидки до 15%', orbit: 300, speed: 0.0015 },
    { id: 'travel', name: 'Путешествия', icon: '✈️', color: '#06b6d4', spent: 3210, level: 3, xp: 28, cashback: '+3%', discount: 'Мили', orbit: 360, speed: 0.0013 },
    { id: 'health', name: 'Здоровье', icon: '🏋️', color: '#22c55e', spent: 2100, level: 2, xp: 15, cashback: '+5%', discount: 'Фитнес -15%', orbit: 420, speed: 0.0011 },
    { id: 'transport', name: 'Транспорт', icon: '🚗', color: '#eab308', spent: 4300, level: 4, xp: 38, cashback: '+4%', discount: 'Такси -10%', orbit: 480, speed: 0.001 },
    { id: 'home', name: 'Дом', icon: '🏠', color: '#6366f1', spent: 15700, level: 8, xp: 78, cashback: '+2%', discount: 'Коммуналка', orbit: 540, speed: 0.0009 },
    { id: 'development', name: 'Развитие', icon: '📚', color: '#3b82f6', spent: 5400, level: 4, xp: 45, cashback: '+6%', discount: 'Гранты', orbit: 600, speed: 0.0008 },
    { id: 'investment', name: 'Инвестиции', icon: '💰', color: '#f59e0b', spent: 8900, level: 5, xp: 52, cashback: '+8%', discount: 'Ставки', orbit: 660, speed: 0.0007 }
];

export const FRIENDS = [
    { id: 1, name: 'Анна', level: 12, points: 3450, avatar: '👩‍🚀' },
    { id: 2, name: 'Дмитрий', level: 9, points: 2780, avatar: '👨‍🚀' },
    { id: 3, name: 'Екатерина', level: 8, points: 2340, avatar: '👩‍🚀' },
    { id: 4, name: 'Сергей', level: 6, points: 1890, avatar: '👨‍🚀' }
];

export const LESSONS = [
    { id: 1, title: 'Основы бюджетирования', duration: '15 мин', icon: '📊', completed: false },
    { id: 2, title: 'Куда инвестировать первые 1000$', duration: '20 мин', icon: '💰', completed: true },
    { id: 3, title: 'Кредиты: как не переплатить', duration: '12 мин', icon: '💳', completed: false },
    { id: 4, title: 'Накопления на мечту', duration: '18 мин', icon: '🎯', completed: false }
];

export const SAVINGS_GOALS = [
    { id: 1, name: 'Япония 🇯🇵', current: 35100, target: 150000, icon: '🗾' },
    { id: 2, name: 'Новый MacBook 💻', current: 45000, target: 120000, icon: '💻' },
    { id: 3, name: 'Подушка безопасности 🛡️', current: 50000, target: 200000, icon: '🛡️' }
];

export const WEEKLY_SPENDING = [
    { day: 'Пн', amount: 3400 },
    { day: 'Вт', amount: 2800 },
    { day: 'Ср', amount: 4200 },
    { day: 'Чт', amount: 3100 },
    { day: 'Пт', amount: 5600 },
    { day: 'Сб', amount: 7200 },
    { day: 'Вс', amount: 4300 }
];

export const CATEGORY_SPENDING = [
    { name: 'Гастрон', amount: 12450, color: '#f97316', percentage: 35 },
    { name: 'Дом', amount: 15700, color: '#6366f1', percentage: 32 },
    { name: 'Шоппинг', amount: 8900, color: '#ec4899', percentage: 18 },
    { name: 'Транспорт', amount: 4300, color: '#eab308', percentage: 9 },
    { name: 'Остальное', amount: 6950, color: '#22c55e', percentage: 14 }
];