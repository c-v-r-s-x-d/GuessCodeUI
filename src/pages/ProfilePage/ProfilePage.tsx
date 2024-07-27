import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Для работы с query параметрами
import { Client, UserDto } from "../../api/client";
import config from "../../config.json";
import createAuthenticatedFetch from "../../middlewares/authFetch";
import Profile from "../../components/Profile";
import { toast } from "react-toastify";

const client = new Client(config.api, { fetch: createAuthenticatedFetch() });

const ProfilePage = () => {
    const [profile, setProfile] = useState<UserDto | undefined>(undefined);
    const location = useLocation(); // Хук для получения query параметров

    // Получаем userId из localStorage или из query параметра
    const getUserIdFromQuery = new URLSearchParams(location.search).get("userId");
    const userId = getUserIdFromQuery
        ? Number(getUserIdFromQuery)
        : Number(localStorage.getItem("userId")); // Берем userId из query параметра или из localStorage

    const getProfile = async (userId: number) => {
        try {
            const profileData = await client.profileInfo(userId);
            setProfile(profileData);
        } catch (err) {
            toast.error("Не удалось загрузить профиль.");
        }
    };

    useEffect(() => {
        if (userId) {
            getProfile(userId);
        }
    }, [userId]); // Запускаем эффект при изменении userId

    return (
        <section className="relative profile">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale profile-background z-0"></div>
            <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Profile profileInfo={profile} />
            </div>
        </section>
    );
};

export default ProfilePage;
