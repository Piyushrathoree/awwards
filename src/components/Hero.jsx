import React, { use, useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);

    const [videoLoading, setVideoLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);
    // const mainVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setVideoLoading(false);
    };
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = () => {
        setHasClicked(true);
    };
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });

                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power2.inOut",
                    onStart: () => nextVideoRef.current.play(),
                    onComplete: () => {
                        setCurrentIndex(
                            (prevIndex) => (prevIndex % totalVideos) + 1
                        );
                        setHasClicked(false);
                    },
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 2,
                    ease: "power2.inOut",
                });
            }
        },
        {
            dependencies: [hasClicked],
            revertOnUpdate: true,
        }
    );
    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "6%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0px",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
        
    });
    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className="relative h-screen w-screen">
            {videoLoading && (
                <div className="absolute-center z-[100] absolute">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}
            <div
                className="relative z-10 h-screen w-screen rounded-[40px] bg-blue-75 overflow-hidden"
                id="video-frame"
            >
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-54 cursor-pointer overflow-hidden rounded-lg">
                        <div
                            onClick={handleMiniVdClick}
                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                        >
                            {/* mini video player used for next video for background */}
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                            />
                        </div>
                    </div>
                    {/* invisible video player used for next video for background */}
                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        autoPlay
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                    />
                    {/* video player used for current video in the background */}
                    <video
                        // ref={mainVideoRef}
                        src={getVideoSrc(currentIndex == totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 w-full h-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">
                    G<b>a</b>ming
                </h1>

                <div className="absolute z-30 left-0 top-0 w-full h-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            redifi<b>n</b>e
                        </h1>
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play
                            Economy
                        </p>

                        <Button
                            id="watch-trailer "
                            title="Watch Trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>
            <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black">
                G<b>a</b>ming
            </h1>
        </div>
    );
};

export default Hero;
