import "./HomePage.css";
import {Link} from "react-router-dom";
import React from "react";
import {useAuth} from "../../contexts/useAuth";

const HomePage = () => {
    const {isLoggedIn} = useAuth();

    return (
        <section
            className="flex flex-col font-mono text-green-100 justify-center gap-12 items-center h-screen bg-gray-200 home">
            <div className="text-9xl font-bold">
                GuessCode
            </div>
            <div className="text-6xl mb-32">
                Achieve mastery through training
            </div>
            {isLoggedIn() ? (
                <Link to="/tasks" className="bg-white text-black text-2xl rounded p-3 button-white">
                    Train kata
                </Link>
            ) : (
                <Link to="/register" className="bg-white text-black text-2xl rounded p-3 button-white">
                    Get started
                </Link>
            )}
        </section>
    );
};

export default HomePage;
