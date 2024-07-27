import React from "react";
import Task from "../../components/Task";



const TrainingPage: React.FC = () => {
    return (
        <section className="bg-black text-black">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
                <div className="flex w-full justify-center gap-5 font-mono">
                    <h1 className="text-white">Training language</h1>
                    <select>
                        <option value="none">None</option>
                        <option value="cpp">C++</option>
                        <option value="csharp">C#</option>
                        <option value="golang">Go</option>
                        <option value="python">Python</option>
                        <option value="c">C</option>
                    </select>
                </div>
                <Task question={"What will be output to the console?"} codeSnippet={"#include <iostream>\n" +
                    "\n" +
                    "int main() {\n" +
                    "    std::cout << \"Hello World!\";\n" +
                    "    return 0;\n" +
                    "}"} correctAnswer={"1"}/>
            </div>
        </section>
        );
};

export default TrainingPage;