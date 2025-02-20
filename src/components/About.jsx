import React from "react";

const About = () => {
    return (
        <div className="min-h-screen w-screen ">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5 ">
                <h2 className="font-general text-sm uppercase md-text-[10px]">
                    welcome to zentry
                </h2>
                <div className="mt-5 special-font text-center font-extrabold text-4xl uppercase leading-[0.8]  md-text-[6rem]">
                    Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>
                    dventure
                </div>

                <div className="about-subtext text-xl ">
                    <h1 className="">The Metagame begins—your life, now an epic MMORPG</h1>
                    <span></span>
                    <span className="text-gray-500">
                        Zentry is the unified play layer that bridges players,
                        agentic AI, and blockchains, creating a new economic
                        paradigm.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default About;
