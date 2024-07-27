import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FAQPage from "./pages/FAQPage/FAQPage";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import TrainingPage from "./pages/TrainingPage/TrainingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import {UserProvider} from "./contexts/useAuth";
import CallbackPage from "./pages/CallbackPage/CallbackPage";
import {NotificationProvider} from "./components/Notification";
import TaskPage from "./pages/TaskPage/TaskPage";
import {UserActivityStatusSignalR} from "./components/UserActivityStatusSignalR";
import AuthorshipPage from "./pages/AutorshipPage/AuthorshipPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <NotificationProvider>
                    <UserActivityStatusSignalR />
                    <UserProvider>
                            <Navbar/>
                            <Routes>
                                <Route path="/" element={<Navigate to="/home"/>}/>
                                <Route path="/home" Component={HomePage}/>
                                <Route path="/register" Component={RegisterPage}/>
                                <Route path="/login" Component={LoginPage}/>
                                <Route path="/faq" Component={FAQPage}/>
                                <Route path="/leaderboard" Component={LeaderboardPage}/>
                                <Route path="/training" Component={TrainingPage}/>
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/me" Component={ProfilePage}/>
                                <Route path="/auth/callback" Component={CallbackPage}/>
                                <Route path="/tasks" Component={TaskPage}/>
                                <Route path="/authorship" Component={AuthorshipPage}/>
                                <Route path="*" Component={NotFoundPage}/>
                            </Routes>
                            <Outlet/>
                    </UserProvider>
                </NotificationProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
