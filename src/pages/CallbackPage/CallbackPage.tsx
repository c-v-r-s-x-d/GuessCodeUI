import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../contexts/useAuth";

interface GitHubAuthResponse {
    token: string;
}

const GitHubCallback: React.FC = () => {
    const { loginUserGitHub } = useAuth();
    const navigate = useNavigate();

    const authGitHub = async (code: string | null) => {
        loginUserGitHub(code);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        authGitHub(code);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Please wait...</h1>
            <p className="text-xl">Authorization...</p>
        </div>
    );
};

export default GitHubCallback;
