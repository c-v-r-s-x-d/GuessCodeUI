// NotificationContext.tsx
import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import "./css/Notification.css"

type NotificationType = 'info' | 'success' | 'warning' | 'error';

type Notification = {
    message: string;
    type: NotificationType;
};

type NotificationContextType = {
    addNotification: (message: string, type: NotificationType) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const addNotification = (message: string, type: NotificationType) => {
        setNotifications((prev) => [...prev, { message, type }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((_, i) => i !== 0)); // Удаляем первое уведомление через 3 секунды
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <div className="notification-container">
                {notifications.map((notif, index) => (
                    <Notification key={index} message={notif.message} type={notif.type} />
                ))}
            </div>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

const Notification: FC<Notification> = ({ message, type }) => {
    return (
        <div className={`notification ${type}`}>
            <div className="notification-content">{message}</div>
        </div>
    );
};
