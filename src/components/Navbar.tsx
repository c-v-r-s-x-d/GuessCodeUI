import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../contexts/useAuth";

const Navbar = () => {
    const {isLoggedIn, logout} = useAuth();

    return (
        <nav className="fixed z-10 w-full bg-opacity-80 bg-black text-white font-mono py-1 ">
            <div className="flex items-center justify-between h-full">
                <div className="flex items-center space-x-20">
                    <Link to="/home">
                        <img className="px-5 object-fill h-10 w-15" src="social.png"/>
                    </Link>
                    <div className="hidden font-bold lg:flex">
                        <Link to="/faq" className="hover:opacity-70">
                            FAQ
                        </Link>
                    </div>
                    <div className="hidden font-bold lg:flex">
                        <Link to="/leaderboard" className="hover:opacity-70">
                            Leaderboard
                        </Link>
                    </div>
                    {
                        isLoggedIn() ? (
                            <div className="space-x-20 flex">
                                <div className="hidden font-bold lg:flex">
                                    <Link to="/tasks" className="hover:opacity-70">
                                        Practice
                                    </Link>
                                </div>
                                <div className="hidden font-bold lg:flex">
                                    <Link to="/authorship" className="hover:opacity-70">
                                        New kata
                                    </Link>
                                </div>
                            </div>

                        ) : (
                            <div>

                            </div>
                        )
                    }
                </div>
                {isLoggedIn() ? (
                    <div className="mr-3 hidden lg:flex items-center space-x-6 text-back">
                        <div className="hidden font-bold lg:flex">
                            <Link to="/me" className="button-black">
                                My Profile
                            </Link>
                        </div>
                        <a
                            onClick={logout}
                            className="button-black"
                        >
                            Log out
                        </a>
                    </div>
                ) : (
                    <div className="mr-3 hidden lg:flex items-center space-x-4 text-back">
                        <Link to="/login" className="px-8 py-2 font-bold rounded border-2 border-white button-black">
                            Log in
                        </Link>
                        <Link
                            to="/register"
                            className="px-8 py-2 font-bold rounded border-2 border-white button-black"
                        >
                            Join
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
