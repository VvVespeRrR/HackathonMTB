import React from 'react';

export default function ProgressBar({ value, max = 100, color = '#35D07F', height = 'h-2', showLabel = false }) {
    const percentage = (value / max) * 100;

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Прогресс</span>
                    <span>{Math.round(percentage)}%</span>
                </div>
            )}
            <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height}`}>
                <div
                    className="rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}