import React, { useState } from 'react';
import config from "../config.json";
import {Client, UserDto} from "../api/client";
import profile from "./Profile";
import {useNotification} from "./Notification";
import createAuthenticatedFetch from "../middlewares/authFetch";

// Типы пропсов для компонента модального окна
interface EditProfileModalProps {
    show: boolean;
    onClose: () => void;
}

const Property: React.FC<{
    propertyName: string;
    currentValue: string;
    onChange: (value: string) => void;
}> = ({ propertyName, currentValue, onChange }) => {
    return (
        <div className="flex justify-between items-center mt-4 mb-4">
            <p className="w-1/3">{propertyName}</p>
            <input
                type="text"
                value={currentValue}
                onChange={(e) => onChange(e.target.value)}
                className="text-black border rounded px-2 py-1 w-2/3"
            />
        </div>
    );
};

const client = new Client(config.api, { fetch: createAuthenticatedFetch() });

// Компонент модального окна
const EditProfileModal: React.FC<EditProfileModalProps> = ({show, onClose}) => {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("blank@mail.ru");
    const { addNotification } = useNotification();

    const handleSubmit = async () => {
        const dataToUpdate = {
            username,
            password,
            email,
        };

        try {
            //await client.userPUT(new UserDto())
            addNotification("Account updated successfully", "info")
            onClose(); // Close the modal after successful submission
        } catch (error) {
            addNotification(`${error?.toString()}`, "error")
        }
    };

    if (!show) {
        return null;
    }

    return (
        // Задний фон и модальное окно
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col bg-black rounded-lg shadow-lg p-6 w-full border-white border-2 max-w-md">
                <h2 className="text-center text-xl font-semibold mb-4">Here you can edit your account</h2>
                <Property propertyName="Username" currentValue={username} onChange={setUsername} />
                <Property propertyName="Password" currentValue={password} onChange={setPassword} />
                <Property propertyName="Email" currentValue={email} onChange={setEmail} />
                <div className="flex justify-around items-center">
                    <p>Link your GitHub</p>
                    <a href={config.github_auth}>
                        <img src="social.png" className="h-10 w-10" alt="GitHub" />
                    </a>
                </div>
                <div className="flex justify-around">
                    <button
                        className="button-black mt-6"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="button-black mt-6"
                        onClick={handleSubmit}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
