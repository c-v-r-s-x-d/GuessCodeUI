import React, { useState } from "react";

interface AccordionProps {
    title: string;
    answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, answer }) => {
    const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

    return (
        <div className="m-10 py-2 border-2 rounded-2xl p-6 bg-black border-white text-white">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-between w-full"
            >
                <span>{title}</span>
                <svg
                    className="fill-white shrink-0 ml-8 mt-1 mb-1"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${
                            accordionOpen && "!rotate-180"
                        }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                            accordionOpen && "!rotate-180"
                        }`}
                    />
                </svg>
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-green-100 text-sm ${
                    accordionOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">{answer}</div>
            </div>
        </div>
    );
};

export default Accordion;
