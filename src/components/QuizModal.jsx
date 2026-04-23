import React, { useState } from 'react';
import { X, Brain, CheckCircle, XCircle, Award } from 'lucide-react';

export default function QuizModal({ planet, quiz, onClose, onComplete }) {
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);

    const handleAnswer = (index) => {
        if (answered) return;
        setSelected(index);
        setAnswered(true);
        const isCorrect = index === quiz.correct;
        setTimeout(() => {
            onComplete(isCorrect);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl max-w-md w-full p-6 border-2 border-yellow-500/50 shadow-2xl">
                {/* Декоративные элементы */}
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-yellow-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />

                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Brain className="text-purple-400" size={24} />
                        <h3 className="text-xl font-bold text-white">Финансовый тест</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/10">
                        <X size={24} />
                    </button>
                </div>

                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">{planet.icon}</span>
                        <span className="text-white font-semibold">{planet.name}</span>
                    </div>
                </div>

                <p className="text-white text-lg font-medium mb-6 leading-relaxed">{quiz.question}</p>

                <div className="space-y-3">
                    {quiz.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                                answered && idx === quiz.correct
                                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                                    : answered && idx === selected && idx !== quiz.correct
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                                        : 'bg-slate-700/50 hover:bg-slate-600 text-gray-200 hover:transform hover:scale-[1.02]'
                            }`}
                            disabled={answered}
                        >
                            <span>{opt}</span>
                            {answered && idx === quiz.correct && <CheckCircle size={20} />}
                            {answered && idx === selected && idx !== quiz.correct && <XCircle size={20} />}
                        </button>
                    ))}
                </div>

                {answered && (
                    <div className={`mt-4 p-4 rounded-xl animate-in slide-in-from-bottom-2 duration-300 ${
                        selected === quiz.correct ? 'bg-green-600/20 border border-green-500/50' : 'bg-red-600/20 border border-red-500/50'
                    }`}>
                        <div className="flex items-center gap-2 mb-2">
                            {selected === quiz.correct ? (
                                <>
                                    <CheckCircle size={20} className="text-green-400" />
                                    <span className="text-green-400 font-semibold">Правильно!</span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={20} className="text-red-400" />
                                    <span className="text-red-400 font-semibold">Неправильно</span>
                                </>
                            )}
                        </div>
                        <p className="text-gray-200 text-sm">{quiz.explanation}</p>
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/10">
                            <Award size={16} className="text-yellow-400" />
                            <span className="text-yellow-400 text-sm font-medium">
                {selected === quiz.correct ? '+30 ресурсов и +5% к размеру' : '+15 ресурсов за старание'}
              </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}