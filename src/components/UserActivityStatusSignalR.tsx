import React, { createContext, useEffect, useState, useContext } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import config from "../config.json";

// Создаем контекст для SignalR подключения
export const SignalRContext = createContext<HubConnection | null>(null);

// Переменная для хранения текущего соединения
let connection: HubConnection | null = null;

// Функция для создания соединения с SignalR
const getSignalRConnection = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.warn("No UserId found in localStorage. SignalR connection will not be initiated.");
        return null;
    }

    if (!connection) {
        connection = new HubConnectionBuilder()
            .withUrl(config.api + config.activity_hub + `?userId=${userId}`)
            .withAutomaticReconnect()
            .build();

        connection.start().catch(err => console.error("SignalR Connection Error: ", err));
    }

    return connection;
};

export const UserActivityStatusSignalR: React.FC = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    // Проверка авторизации при монтировании компонента
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            setIsAuthorized(true);
        }
    }, []); // Проверка только один раз при монтировании компонента

    useEffect(() => {
        if (!isAuthorized) return;

        // Подключаем SignalR только если пользователь авторизован
        const connection = getSignalRConnection();

        return () => {
            // Закрытие соединения при демонтировании компонента
            if (connection) {
                connection.stop().catch((err) => console.error("Error stopping connection: ", err));
            }
        };
    }, [isAuthorized]); // Следим за изменением статуса авторизации

    return (
        <SignalRContext.Provider value={isAuthorized ? getSignalRConnection() : null}>
        </SignalRContext.Provider>
    );
};
