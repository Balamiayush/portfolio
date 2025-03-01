import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const headings = ["Frontend Magic.", "Smooth Animations.", "Backend."];
  const headingRef = useRef(null);
  const charRefs = useRef([]);

  const renderCharacters = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        ref={(el) => (charRefs.current[index] = el)}
        className="inline-block"
      >
        {char}
      </motion.span>
    ));
  };

  useGSAP(() => {
    if (!headingRef.current) return;

    gsap.killTweensOf(charRefs.current);

    gsap.set(charRefs.current, {
      y: 50,
      opacity: 0,
    });

    gsap.to(charRefs.current, {
      duration: 0.6,
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: "back.out(1.7)",
      delay: 0.2,
    });
  }, [currentHeadingIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadingIndex((prev) => (prev + 1) % headings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen px-4 bg-[#fff]">
      <Navbar />
      <div className="hero-content    lg:mt-5   w-1/2 h-1/2   items-center lg:justify-between flex">
        <h1

          className=" font-bold text-[3rem] leading-none  flex flex-col items-center justify-center text-center  heroh1 lg:text-[2rem]  gap-2"
        >
          <div

            className=" px-8  rounded-2xl  "
          >
            👋 Hi, I'm Aayush
          </div>
          <div
            className=" px-8  rounded-2xl  "
          >
            I build immersive, interactive, and visually stunning web experiences.
          </div>
          <motion.span
            ref={headingRef}
            className="rounded-2xl p-2 inline-block  overflow-hidden heroh1"
          >
            {renderCharacters(headings[currentHeadingIndex])}
          </motion.span>
        </h1>
      </div>
    </div>
  );
};

export default Hero;
