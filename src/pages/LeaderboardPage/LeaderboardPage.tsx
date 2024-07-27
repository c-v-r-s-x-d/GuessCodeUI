import React, {useEffect, useState} from "react";
import {Client, LeaderboardPositionDto, UserDto} from "../../api/client";
import config from "../../config.json";
import createAuthenticatedFetch from "../../middlewares/authFetch";
import {useNotification} from "../../components/Notification";

const client = new Client(config.api, { fetch: createAuthenticatedFetch() });

const LeaderboardPage: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardPositionDto[] | undefined>(undefined);
    const { addNotification } = useNotification();
    const getLeaderboard = async () => {
        try {
            const leaderboardInfo = await client.leaderboard();
            setLeaderboard(leaderboardInfo);
        }
        catch (e) {
            addNotification(`Error occured`, 'error');
        }
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <section className="bg-black text-black">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen home">
                <div className="overflow-x-auto w-full mt-10">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-md sm:rounded-lg">
                            <table className="min-w-full">
                                <thead className="bg-white text-black">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xm font-medium uppercase tracking-wider">
                                        Position
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xm font-medium uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xm font-medium uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xm font-medium uppercase tracking-wider">
                                        Rating
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {leaderboard?.map((row, index) => (
                                    <tr key={index}
                                        className={`${index % 2 === 0 ? 'bg-black text-white border-white border-2' : 'bg-gray-800 text-white border-white border-2'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {index+1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {row.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {row.rank}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {row.rating}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaderboardPage;
