import React, { useEffect, useState } from 'react';
import { Bell, Zap, Rocket, Trophy } from 'lucide-react';

const iconMap = {
    success: <Zap size={16} className="text-green-400" />,
    levelup: <Rocket size={16} className="text-yellow-400" />,
    invite: <Trophy size={16} className="text-purple-400" />,
    info: <Bell size={16} className="text-blue-400" />
};

export default function ResourceNotification({ notifications }) {
    const [visible, setVisible] = useState([]);

    useEffect(() => {
        setVisible(notifications);
    }, [notifications]);

    return (
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
            {visible.map(notif => (
                <div
                    key={notif.id}
                    className="glass-effect rounded-xl p-3 border-l-4 border-yellow-500 animate-in slide-in-from-right-5 duration-300 max-w-sm"
                >
                    <div className="flex items-center gap-3">
                        {iconMap[notif.type] || iconMap.info}
                        <span className="text-white text-sm">{notif.text}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}