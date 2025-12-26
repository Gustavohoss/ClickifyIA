
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commissionValues = ['47,00', '197,00', '97,00', '19,90', '37,90'];
const getRandomCommission = () => commissionValues[Math.floor(Math.random() * commissionValues.length)];

const notificationTypes = [
  {
    icon: 'https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/cmjclddjn000kl204sjzbusjb/blocks/fsaq4r55w8wjex0s3bcg4jp4?v=1766387734197',
    title: 'Venda Realizada',
    description: (commission: string) => `Sua comissão: R$ ${commission}`,
  },
];

const FallingNotificationsSmall = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const initial: any[] = Array.from({ length: 3 }, (_, i) => {
        const type = notificationTypes[0];
        const commission = getRandomCommission();
        return {
            id: i,
            icon: type.icon,
            title: type.title,
            description: type.description(commission),
        };
    }).reverse();
    setNotifications(initial);
    
    let nextId = 3;

    const interval = setInterval(() => {
        setNotifications(prev => {
            const type = notificationTypes[0];
            const commission = getRandomCommission();
            const newNotif = {
                id: nextId++,
                icon: type.icon,
                title: type.title,
                description: type.description(commission),
            };
            const newQueue = [newNotif, ...prev.slice(0, 2)];
            return newQueue;
        });
    }, 2500); 

    return () => clearInterval(interval);
  }, []);
  
  const getDisplayTime = (index: number) => {
    const times = ['agora', '1m', '2m'];
    return times[index] || `${index+1}m`;
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-end items-center space-y-3 pb-4 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-primary/30 to-transparent blur-2xl animate-pulse" />
      <AnimatePresence initial={false}>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="w-full max-w-[200px] z-10"
          >
            <div
              className="relative bg-black/40 p-2 border border-white/20 backdrop-blur-md shadow-md rounded-lg"
            >
              <div className="flex items-start text-left">
                <div className="flex-shrink-0 mr-2">
                  <img
                    src={notification.icon}
                    alt="Ícone"
                    width={28}
                    height={28}
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-[10px] text-white truncate">{notification.title}</p>
                  <p className="text-[9px] text-gray-200 truncate">
                    {notification.description}
                  </p>
                </div>
                <span className="text-[9px] text-gray-400 ml-1.5">{getDisplayTime(index)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FallingNotificationsSmall;
