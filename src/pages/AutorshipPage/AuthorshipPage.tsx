import React, {useEffect, useState} from "react";
import {Client, IKataDto, ILoginDto, KataDto, LoginDto, UserDto} from "../../api/client";
import config from "../../config.json";
import createAuthenticatedFetch from "../../middlewares/authFetch";
import AnswerInput from "../../components/AnswerOption";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const client = new Client(config.api, { fetch: createAuthenticatedFetch() });
const AuthorshipPage = () => {
    const {
        register,
        handleSubmit,
    } = useForm<IKataDto>();

    const handleCreateKata = async (form: IKataDto) => {
        await client.kataAdministrationPUT(new KataDto(form));
    };

    return (
        <section className="bg-black flex font-mono text-white justify-center items-center h-screen home">
            <div className="w-full h-full flex items-center justify-center px-6 py-8 mx-auto">
                <form
                    className="w-full flex h-2/3 bg-black rounded-lg border"  onSubmit={handleSubmit(handleCreateKata)}>
                    <div className="flex flex-col ml-5 justify-evenly truncate">
                        <p className="text-3xl">Kata Editor</p>
                        <div className="flex gap-5">
                            <p>Your kata training language</p>
                            <select className="text-black" {...register("programmingLanguage")}>
                                <option value={0}>None</option>
                                <option value={1}>C++</option>
                                <option value={2}>C#</option>
                                <option value={3}>Go</option>
                                <option value={4}>Python</option>
                                <option value={5}>C</option>
                            </select>
                        </div>
                        <div className="flex gap-5">
                            <p>Your kata training mode</p>
                            <select className="text-black" {...register("kataType")}>
                                <option value={0}>None</option>
                                <option value={1}>Guess Result</option>
                                <option value={2}>Code Review</option>
                                <option value={3}>Understand the code</option>
                            </select>
                        </div>
                        <div className="flex gap-5">
                            <p>Estimated Rank</p>
                            <select className="text-black" {...register("kataDifficulty")}>
                                <option value={0}>None</option>
                                <option value={1}>6 kyu</option>
                                <option value={2}>5 kyu</option>
                                <option value={3}>4 kyu</option>
                                <option value={4}>3 kyu</option>
                                <option value={5}>2 kyu</option>
                                <option value={6}>1 kyu</option>
                                <option value={7}>1 dan</option>
                                <option value={8}>2 dan</option>
                                <option value={9}>Master</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-full flex flex-col m-5 items-center">
                        <div className="h-full w-1/2 flex justify-evenly items-center">
                            <p>Give your kata a name</p>
                            <input
                                type="text"
                                id="title"
                                className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block p-2.5"
                                placeholder="My awesome kata..."
                                {...register("title")}
                            />
                        </div>
                        <div className="h-full w-full flex justify-evenly items-center">
                            <p>Description</p>
                            <textarea
                                id="kataDescription"
                                rows={5}
                                className="bg-gray-300 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block p-2.5 w-2/3"
                                placeholder="In this kata we are talking about..."
                                {...register("kataRawJsonContent.kataDescription")}
                            ></textarea>
                        </div>
                        <AnswerInput/>
                        <button className="button-black m-5" type="submit">Submit for validation</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default AuthorshipPage;