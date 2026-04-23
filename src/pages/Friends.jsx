import React from 'react';
import Card from '../components/Card';

const FRIENDS = [
    { id: 1, name: 'Анна', level: 12, points: 345, avatar: '👩‍🚀', color: '#f97316' },
    { id: 2, name: 'Дмитрий', level: 9, points: 278, avatar: '👨‍🚀', color: '#ec4899' },
    { id: 3, name: 'Екатерина', level: 8, points: 234, avatar: '👩‍🚀', color: '#06b6d4' },
    { id: 4, name: 'Сергей', level: 6, points: 189, avatar: '👨‍🚀', color: '#22c55e' },
];

export default function Friends({ onInvite }) {
    return (
        <div className="pb-24">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-white">👥 Друзья</h1>
                <p className="text-gray-400 text-sm">Соревнуйся с близкими</p>
            </div>

            {/* Иллюстрация */}
            <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 p-4 bg-white/5 rounded-2xl">
                    <span className="text-4xl">👨‍🚀</span>
                    <span className="text-yellow-400 text-xl">✋</span>
                    <span className="text-4xl">👩‍🚀</span>
                </div>
            </div>

            {/* Вкладки */}
            <div className="flex gap-2 mb-4">
                <button className="flex-1 py-2 bg-[#2F6BFF] text-white rounded-xl">Друзья</button>
                <button className="flex-1 py-2 bg-white/10 text-gray-400 rounded-xl">Топ путешественников</button>
            </div>

            {/* Список друзей */}
            <div className="space-y-3 mb-6">
                {FRIENDS.map(friend => (
                    <Card key={friend.id}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#2F6BFF] to-[#35D07F] rounded-full flex items-center justify-center text-2xl">
                                    {friend.avatar}
                                </div>
                                <div>
                                    <p className="text-white font-semibold">{friend.name}</p>
                                    <p className="text-gray-400 text-xs">Уровень {friend.level}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-yellow-400 font-semibold">{friend.points}</p>
                                    <p className="text-gray-400 text-xs">⭐ очков</p>
                                </div>
                                <button className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm">💬</span>
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Кнопка приглашения */}
            <button
                onClick={onInvite}
                className="w-full bg-gradient-to-r from-[#2F6BFF] to-[#35D07F] text-white font-semibold py-4 rounded-2xl transition-all hover:scale-[1.02]"
            >
                🚀 Пригласить друга
            </button>
        </div>
    );
}