import React, {createContext, useEffect, useState} from "react";
import {Client, LoginDto, RegisterDto, TokenDto, UserDto} from "../api/client";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import config from '../config.json';
import {useNotification} from "../components/Notification";

type UserContextType = {
    user: UserDto | null;
    token: string | null;
    registerUser: (registerData: RegisterDto) => void;
    loginUser: (loginData: LoginDto) => void;
    loginUserGitHub: (code: string | null) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

const client = new Client(config.api);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [user, setUser] = useState<UserDto | null>(null);
    const [isReady, setIsReady] = useState(false);
    const { addNotification } = useNotification();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (registerData: RegisterDto) => {
        try {
            await client.register(registerData);
            addNotification('Registered successfully', 'info');
            navigate('/login');
        } catch (e) {
        }
    };

    const loginUser = async (loginData: LoginDto) => {
        try {
            const res = await client.login(loginData);
            if (res) {
                localStorage.setItem("token", res.accessToken!);
                localStorage.setItem("userId", res.userId!.toString());
                setToken(res.accessToken!);
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
                navigate("/home");
                window.location.reload();
                addNotification("Login succeeded", 'info');
            }
        } catch (e) {
            addNotification("Login failed", 'error');
        }
    };

    const loginUserGitHub = async (code: string | null) => {
        try {
            const res = /*await client.github(code!);*/ new TokenDto();
            if (res) {
                localStorage.setItem("token", res.accessToken!);
                localStorage.setItem("userId", res.userId!.toString());
                setToken(res.accessToken!);
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.accessToken}`;
                navigate("/home");
                window.location.reload();
                addNotification("Login succeeded", 'info');
            }
        }
        catch (e) {
            addNotification("Login failed", 'error');
        }
    };

    const isLoggedIn = () => {
        return !!token;
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setUser(null);
        setToken(null);
        navigate("/home");
        window.location.reload();
    };

    return (
        <UserContext.Provider value={{ loginUser, loginUserGitHub, user, token, logout, isLoggedIn, registerUser }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);