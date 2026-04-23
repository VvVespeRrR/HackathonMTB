import React from 'react';
import PlanetCard from './PlanetCard';

export default function PlanetGrid({ planets, onBoost, onQuizComplete }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(planets).map(([id, planet]) => (
                <PlanetCard
                    key={id}
                    planet={planet}
                    onBoost={() => onBoost(id)}
                    onQuizComplete={(correct) => onQuizComplete(id, correct)}
                />
            ))}
        </div>
    );
}