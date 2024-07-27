import React, { useState } from "react";
import {ProfileInfoDto, UserDto} from "../api/client";
import EditProfileModal from "./EditProfileModal";
// Определите интерфейс для пропсов
interface ProfileProps {
    profileInfo?: ProfileInfoDto;
}

const Profile: React.FC<ProfileProps> = ({ profileInfo }) => {
    const [activeTab, setActiveTab] = useState('about');
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <section className="flex flex-col font-mono text-white justify-center items-center w-full">
            <div className="flex items-center justify-center px-6 py-8 mx-auto w-full">
                <div className="w-full bg-black rounded-lg border px-10 py-14">
                    <div className="flex flex-wrap mb-6">
                        <div className="mb-5 mr-5">
                            <div className="relative inline-block shrink-0 rounded-2xl">
                                <label className="relative inline-block cursor-pointer group">
                                    <img
                                        className="inline-block shrink-0 rounded-2xl w-[80px] h-[80px] lg:w-[160px] lg:h-[160px] transition duration-300 group-hover:opacity-50"
                                        src={profileInfo?.avatarUrl}
                                        alt="avatar"
                                    />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-white text-sm lg:text-lg font-mono opacity-0 group-hover:opacity-100 transition duration-300">
                    Click to change
                  </span>
                                </label>
                                <div className="group/tooltip relative">
                  <span
                      className={`w-[15px] h-[15px] absolute bg-success rounded-full bottom-0 end-0 -mb-1 -mr-2  border border-white ${profileInfo?.activityStatus === 3 ? 'bg-green-700' : 'bg-gray-500'}`}></span>
                                    <span
                                        className={`text-xs absolute z-10 transition-opacity duration-300 ease-in-out px-3 py-2 whitespace-nowrap text-center transform rounded-2xl shadow-sm bottom-0 -mb-6 start-full ml-4 font-medium bg-black border-white border-2 text-white group-hover/tooltip:opacity-100 opacity-0`}
                                    >
                                        {profileInfo?.activityStatus === 3 ? "Online" : "Offline"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grow">
                            <div className="flex flex-wrap items-start justify-between mb-2">
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <a className="text-secondary-inverse hover:text-primary transition-colors duration-200 ease-in-out font-semibold text-[1.5rem] mr-1"
                                           href="javascript:void(0)"> {profileInfo?.username} </a>
                                    </div>
                                    <div className="flex flex-wrap pr-2 mb-4 font-medium">
                                        <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                                           href="javascript:void(0)">
                      <span className="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-5 h-5">
                          <path fillRule="evenodd"
                                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                clipRule="evenodd"/>
                        </svg>
                      </span> Izhevsk, Russia </a>
                                        <a className="flex items-center mb-2 mr-5 text-secondary-dark hover:text-primary"
                                           href="javascript:void(0)">
                      <span className="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="w-5 h-5">
                          <path
                              d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                          <path
                              d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                        </svg>
                      </span> {profileInfo?.username} </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between text-black">
                                <div className="flex flex-wrap items-center">
                                    <a href="javascript:void(0)"
                                       className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                                        Overall rank: {profileInfo?.username} </a>
                                    <a href="javascript:void(0)"
                                       className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                                        C#: Jyudan - 10th Dan </a>
                                    <a href="javascript:void(0)"
                                       className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                                        C++: Rokudan - 6th Dan </a>
                                    <a href="javascript:void(0)"
                                       className="mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-3 py-1 text-sm font-medium leading-normal">
                                        Python: 6 kyu </a>
                                </div>
                            </div>
                        </div>
                        <button onClick={openModal} className="self-start">
                            <img src="edit.png" className="h-10 w-10 grayscale hover:opacity-50"></img>
                        </button>
                        <EditProfileModal show={isModalOpen} onClose={closeModal}></EditProfileModal>
                    </div>
                    <hr className="w-full h-px border-neutral-200"/>
                    <ul className="group flex flex-wrap justify-start text-[1.15rem] font-semibold list-none border-white">
                        <li className="flex -mb-[2px]">
                        <a
                                aria-controls="about"
                                className={`flex items-center justify-center rounded-b-2xl border border-gray-300 ${activeTab === 'about' ? 'bg-white text-black px-5 border-primary text-primary scale-95' : 'button-black text-muted hover:scale-95'}`}
                                href="javascript:void(0)"
                                onClick={() => setActiveTab('about')}
                            >
                                About me
                            </a>
                        </li>
                        <li className="flex -mb-[2px]">
                            <a
                                aria-controls="about"
                                className={`flex items-center justify-center rounded-b-2xl border border-gray-300 ${activeTab === 'kata' ? 'bg-white text-black px-5 border-primary text-primary scale-95' : 'button-black text-muted hover:scale-95'}`}
                                href="javascript:void(0)"
                                onClick={() => setActiveTab('kata')}
                            >
                                My Kata
                            </a>
                        </li>
                        <li className="flex -mb-[2px]">
                            <a
                                aria-controls="about"
                                className={`flex items-center justify-center rounded-b-2xl border border-gray-300 ${activeTab === 'history' ? 'bg-white text-black px-5 border-primary text-primary scale-95' : 'button-black text-muted hover:scale-95'}`}
                                href="javascript:void(0)"
                                onClick={() => setActiveTab('history')}
                            >
                                History
                            </a>
                        </li>
                    </ul>
                    <div className="p-4">
                        {activeTab === 'about' && (<div id="about">
                            <p>{profileInfo?.userId}</p>
                        </div>)}
                        {activeTab === 'participation' && (<div id="participation">
                            <h2>Участие в турнирах</h2>
                            <p>Контент для вкладки "Участие в турнирах".</p>
                        </div>)}
                        {activeTab === 'owning' && (<div id="owning">
                            <h2>Мои турниры</h2>
                            <p>Контент для вкладки "Мои турниры".</p>
                        </div>)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;
