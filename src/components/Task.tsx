import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TaskProps {
    question: string;
    codeSnippet: string;
    correctAnswer: string;
}

const Task: React.FC<TaskProps> = ({ question, codeSnippet, correctAnswer }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmit = () => {
        if (userAnswer.trim() === correctAnswer.trim()) {
            setFeedback('Correct!');
        } else {
            setFeedback('Try again.');
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4 shadow-md rounded-lg bg-gray-400 h-4/6">
            <div className="flex w-full justify-between px-5">
                <h1 className="text-2xl font-bold mb-4">{question}</h1>
                <span className="inline-block px-3 py-1 text-xl font-mono rounded-full bg-green-700 text-white self-center">10th kyu</span>
            </div>
            <div className="flex flex-col h-full justify-evenly">
                <SyntaxHighlighter language="cpp" style={atomDark} className="select-none rounded-lg mb-4">
                    {codeSnippet}
                </SyntaxHighlighter>
                <div className="flex justify-evenly">
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg button-black"
                    >
                        Hello World!
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg button-black"
                    >
                        Exception
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg button-black"
                    >
                        Undefined Behaviour
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg button-black"
                    >
                        0
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;
