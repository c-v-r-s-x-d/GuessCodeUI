import React, {useEffect, useState} from "react";
import {Client, KataDto, UserDto} from "../../api/client";
import config from "../../config.json";
import createAuthenticatedFetch from "../../middlewares/authFetch";


const client = new Client(config.api, { fetch: createAuthenticatedFetch() });
const TaskPage = () => {
    const [kataPreview, setKataPreview] = useState<KataDto | undefined>(undefined);

    useEffect(() => {
        fillKataPreview();
    }, []);

    const fillKataPreview = async () => {
        const result = await client.kataSearchAll(undefined, undefined, undefined);
        setKataPreview(result[0]);
    }

    return (
        <section className="bg-black flex font-mono text-white justify-center items-center h-screen home">
                <div className="w-full h-full flex items-center justify-center px-6 py-8 mx-auto">
                    <div
                        className="w-full flex h-2/3 bg-black rounded-lg border">
                        <div className="flex flex-col ml-5 gap-5 justify-evenly">
                            <p className="text-3xl">Choose your kata</p>
                            <div className="flex gap-5">
                                <p>Training language</p>
                                <select className="text-black">
                                    <option value="none">None</option>
                                    <option value="cpp">C++</option>
                                    <option value="csharp">C#</option>
                                    <option value="golang">Go</option>
                                    <option value="python">Python</option>
                                    <option value="c">C</option>
                                </select>
                            </div>
                            <div className="flex gap-5">
                                <p>Training mode</p>
                                <select className="text-black">
                                    <option value="none">None</option>
                                    <option value="guess_result">Guess Result</option>
                                    <option value="code_review">Code Review</option>
                                    <option value="code_understanding">Understand the code</option>
                                </select>
                            </div>
                            <button className="button-black">Skip</button>
                            <button className="button-black">Train</button>
                        </div>
                        <div className="w-full flex flex-col items-center justify-evenly">
                            <div className="w-full flex items-center justify-evenly">
                                <p className="text-2xl">{kataPreview?.title}</p>
                                <img src="./badges/master.svg" className="w-52 h-52 bg-gray-300 rounded-2xl"/>
                            </div>
                            <div className="border-white border-2 rounded-2xl mx-20 p-5">
                                <p className="line-clamp-3">{kataPreview?.kataRawJsonContent?.kataDescription}</p>
                            </div>
                            <div className="w-full flex items-center justify-evenly">
                                <p>Author: Thienlao</p>
                                <p>Time to sovle: 1 min</p>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
}

export default TaskPage;