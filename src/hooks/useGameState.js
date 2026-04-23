import { useState, useEffect, useCallback } from 'react';
import { getInitialPlanets, USER_DATA } from '../data/mockData.js';

export const useGameState = () => {
    const [planets, setPlanets] = useState(() => getInitialPlanets());
    const [user, setUser] = useState(USER_DATA);
    const [notifications, setNotifications] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    // Пассивная генерация ресурсов каждые 8 секунд
    useEffect(() => {
        const interval = setInterval(() => {
            setPlanets(prev => {
                const updated = { ...prev };
                let changed = false;

                Object.keys(updated).forEach(id => {
                    const generation = 3 + Math.floor(Math.random() * 7);
                    updated[id].resource += generation;

                    // Автоматический рост размера от ресурсов
                    if (updated[id].resource > updated[id].sizePercent * 3 && updated[id].sizePercent < 100) {
                        updated[id].sizePercent = Math.min(100, updated[id].sizePercent + 1);
                        changed = true;
                    }

                    // Повышение уровня
                    const newLevel = Math.floor(updated[id].resource / 150) + 1;
                    if (newLevel > updated[id].level && newLevel <= 5) {
                        updated[id].level = newLevel;
                        addNotification(`${updated[id].name} достиг ${newLevel} уровня! Бонусы увеличены!`, 'levelup');
                        changed = true;
                    }
                });

                return changed ? updated : prev;
            });
            setLastUpdate(Date.now());
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const addNotification = (text, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, text, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    };

    // Буст от трат
    const boostPlanet = useCallback((planetId, amount = 25) => {
        setPlanets(prev => {
            const planet = prev[planetId];
            const newResource = planet.resource + amount;
            const newSizePercent = Math.min(100, planet.sizePercent + 4);
            const newLevel = Math.floor(newResource / 150) + 1;

            addNotification(`💳 Трата в категории "${planet.name}"! +${amount} ресурсов`, 'success');

            return {
                ...prev,
                [planetId]: {
                    ...planet,
                    resource: newResource,
                    sizePercent: newSizePercent,
                    level: Math.min(5, newLevel),
                    totalSpent: planet.totalSpent + 3500
                }
            };
        });

        // Обновляем общую статистику пользователя
        setUser(prev => ({
            ...prev,
            totalExpenses: prev.totalExpenses + 3500,
            savings: prev.savings - 3500
        }));
    }, []);

    // Прохождение теста
    const completeQuiz = useCallback((planetId, isCorrect) => {
        const reward = isCorrect ? 30 : 15;
        setPlanets(prev => {
            const planet = prev[planetId];
            const newResource = planet.resource + reward;
            const newSizePercent = Math.min(100, planet.sizePercent + (isCorrect ? 5 : 2));
            const newLevel = Math.floor(newResource / 150) + 1;

            addNotification(
                isCorrect
                    ? `✅ Правильно! +${reward} ресурсов на ${planet.name}`
                    : `📚 Хорошая попытка! +${reward} ресурсов за старание`,
                isCorrect ? 'success' : 'info'
            );

            return {
                ...prev,
                [planetId]: {
                    ...planet,
                    resource: newResource,
                    sizePercent: newSizePercent,
                    level: Math.min(5, newLevel)
                }
            };
        });
    }, []);

    // Приглашение друга
    const inviteFriend = useCallback(() => {
        setPlanets(prev => {
            const updated = { ...prev };
            Object.keys(updated).forEach(id => {
                updated[id].resource += 50;
                updated[id].sizePercent = Math.min(100, updated[id].sizePercent + 3);
                const newLevel = Math.floor(updated[id].resource / 150) + 1;
                updated[id].level = Math.min(5, newLevel);
            });
            addNotification('🎉 Друг принял приглашение! Все планеты получили +50 ресурсов!', 'success');
            return updated;
        });
    }, []);

    // Получение настроения питомца
    const getPetMood = useCallback(() => {
        const avgLevel = Object.values(planets).reduce((sum, p) => sum + p.level, 0) / Object.keys(planets).length;
        const avgSize = Object.values(planets).reduce((sum, p) => sum + p.sizePercent, 0) / Object.keys(planets).length;

        if (avgLevel >= 3.5 && avgSize >= 50) {
            return { emoji: '🧑‍🚀🌟🐱✨', mood: 'В отличной форме! Кэшбек максимальный!', color: 'text-yellow-400' };
        } else if (avgLevel >= 2.5) {
            return { emoji: '🧑‍🚀😺⭐', mood: 'Хороший прогресс! Продолжай в том же духе', color: 'text-cyan-400' };
        } else if (avgLevel >= 1.5) {
            return { emoji: '🧑‍🚀😐', mood: 'Можно активнее развивать планеты', color: 'text-gray-400' };
        } else {
            return { emoji: '🧑‍🚀😿💔', mood: 'Грустит... Трать больше в разных категориях!', color: 'text-red-400' };
        }
    }, [planets]);

    return {
        planets,
        user,
        notifications,
        boostPlanet,
        completeQuiz,
        inviteFriend,
        getPetMood
    };
};