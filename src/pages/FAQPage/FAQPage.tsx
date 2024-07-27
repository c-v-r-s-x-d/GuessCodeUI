import React from "react";
import Accordion from "../../components/Accordion";

const FAQ: React.FC = () => {
    return (
        <section className="bg-black text-black font-mono">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
                <div className="m-10 p-4 home rounded-lg border-2 border-white">
                    <h1 className="text-center text-white text-7xl">FAQ</h1>
                    <Accordion
                        title="What is GuessCode?"
                        answer="Описание появится позже"
                    />
                    <Accordion
                        title="Which languages are available?"
                        answer="Описание появится позже"
                    />
                    <Accordion
                        title="How can i create my own kata?"
                        answer="Описание появится позже"
                    />
                    <Accordion
                        title="Is there any reward for being in top?"
                        answer="Описание появится позже"
                    />
                    <Accordion
                        title="Are there only tasks?"
                        answer="Описание появится позже"
                    />
                    <Accordion
                        title="I have another question, where could i ask?"
                        answer="yaroslaw683@gmail.com"
                    />
                </div>
            </div>
        </section>
    );
};

export default FAQ;
