import React, { useState } from "react";

interface Option {
    id: number;
    text: string;
    isCorrect: boolean;
}

const AnswerInput = () => {
    const [options, setOptions] = useState<Option[]>([
        { id: 1, text: "", isCorrect: false },
    ]);

    const addOption = () => {
        setOptions([
            ...options,
            { id: Date.now(), text: "", isCorrect: false },
        ]);
    };

    const updateOptionText = (id: number, newText: string) => {
        setOptions(
            options.map((option) =>
                option.id === id ? { ...option, text: newText } : option
            )
        );
    };

    const markAsCorrect = (id: number) => {
        setOptions(
            options.map((option) => ({
                ...option,
                isCorrect: option.id === id,
            }))
        );
    };

    const removeOption = (id: number) => {
        setOptions(options.filter((option) => option.id !== id));
    };

    return (
        <div className="space-y-4 m-5 flex w-2/3 justify-center">
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-2 w-2/3">
                {options.map((option, index) => (
                    <div
                        key={option.id}
                        className="flex items-center space-x-2"
                    >
                        <input
                            type="text"
                            value={option.text}
                            onChange={(e) => updateOptionText(option.id, e.target.value)}
                            className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block p-2.5 w-2/3"
                            placeholder={`Option ${index + 1}`}
                        />
                        <p className="text-xs truncate">Correct answer</p>
                        <input
                            type="checkbox"
                            checked={option.isCorrect}
                            onChange={() => markAsCorrect(option.id)}
                            className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <button
                            type="button"
                            onClick={() => removeOption(option.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addOption}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 w-1/3"
            >
                + Add Option
            </button>
        </div>
    );
};

export default AnswerInput;
