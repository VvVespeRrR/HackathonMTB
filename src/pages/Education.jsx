import React, { useState } from 'react';
import Card from '../components/Card';

const LESSONS = [
    { id: 1, title: 'Основы бюджетирования', duration: '15 мин', icon: '📊', completed: false },
    { id: 2, title: 'Куда инвестировать первые 100 BYN', duration: '20 мин', icon: '💰', completed: true },
    { id: 3, title: 'Кредиты: как не переплатить', duration: '12 мин', icon: '💳', completed: false },
    { id: 4, title: 'Накопления на мечту', duration: '18 мин', icon: '🎯', completed: false },
];

const TESTS = [
    { id: 1, title: 'Тест: Финансовая грамотность', questions: 10, icon: '📝', completed: false },
    { id: 2, title: 'Тест: Инвестиции для начинающих', questions: 8, icon: '📈', completed: false },
    { id: 3, title: 'Тест: Кредитная грамотность', questions: 12, icon: '🏦', completed: false },
];

export default function Education() {
    const [activeTab, setActiveTab] = useState('lessons');
    const continueLesson = LESSONS.find(l => !l.completed);

    return (
        <div className="pb-24">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">📚 Знания</h1>
                <p className="text-gray-400 text-sm">Повышай финансовую грамотность</p>
            </div>

            {/* Вкладки */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setActiveTab('lessons')}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                        activeTab === 'lessons' ? 'bg-[#2F6BFF] text-white' : 'bg-white/10 text-gray-400'
                    }`}
                >
                    Уроки
                </button>
                <button
                    onClick={() => setActiveTab('tests')}
                    className={`flex-1 py-2 rounded-xl transition-all ${
                        activeTab === 'tests' ? 'bg-[#2F6BFF] text-white' : 'bg-white/10 text-gray-400'
                    }`}
                >
                    Тесты
                </button>
            </div>

            {/* Продолжи обучение */}
            {activeTab === 'lessons' && continueLesson && (
                <Card className="mb-4" glow>
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl">
                            📚
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-400 text-xs mb-1">Продолжи обучение</p>
                            <h3 className="text-white font-semibold">{continueLesson.title}</h3>
                            <p className="text-gray-400 text-sm">{continueLesson.duration}</p>
                        </div>
                        <button className="bg-[#35D07F] text-white px-4 py-2 rounded-xl text-sm">
                            Смотреть
                        </button>
                    </div>
                </Card>
            )}

            {/* Список уроков/тестов */}
            <h3 className="text-white font-semibold mb-3">
                {activeTab === 'lessons' ? 'Все уроки' : 'Все тесты'}
            </h3>
            <div className="space-y-3">
                {(activeTab === 'lessons' ? LESSONS : TESTS).map(item => (
                    <Card key={item.id}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{item.title}</p>
                                <p className="text-gray-400 text-xs">
                                    {activeTab === 'lessons' ? item.duration : `${item.questions} вопросов`}
                                </p>
                            </div>
                            {item.completed ? (
                                <span className="text-[#35D07F] text-xl">✓</span>
                            ) : (
                                <button className="text-[#2F6BFF] text-sm">Начать</button>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}