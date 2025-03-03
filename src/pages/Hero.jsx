import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Footer from "../components/Footer";

import { FaGithub } from "react-icons/fa";

import gsap from "gsap";

const Hero = () => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const headings = ["<Frontend Magic/>", "<Smooth Animations/>", "<Backend/>"];
  const marquee = ["Frontend Magic", "Smooth Animations", "Backend"];

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
  
      <div className="w-full    flex flex-col  h-screen relative ">
      <Navbar />
        <div className="hero-content   lg:mt-5   w-full h-[50vh] justify-evenly items-center  lg:justify-center lg:gap-[5rem] flex flex-col lg:flex-row ">
          <h1
            style={{
              fontFamily: "var(--font-family4)",
            }}
            className=" font-[var(--font-family5)] lg:w-[80%] text-[1rem] leading-none  flex flex-col items-center justify-center text-center  heroh1 lg:text-[2rem]  gap-2"
          >
            <div className=" px-8  rounded-2xl  ">👋 Hi, I'm Aayush</div>
            <div className=" px-8  rounded-2xl  ">
              🚀 I craft immersive, interactive, and visually stunning web
              experiences, blending frontend magic, smooth animations, and
              seamless backend logic.
            </div>
            <div className="flex  items-center justify-between  gap-10 ">
              <motion.span
                ref={headingRef}
                className="rounded-full p-2 cursor-pointer bg-gray-400   overflow-hidden heroh1"
              >
                {renderCharacters(headings[currentHeadingIndex])}
              </motion.span>
              <a
                href="#"
                className="bg-orange-600 hover:bg-black transition-all duration-300 px-3 py-2  text-[1rem] lg:text-[1.5rem] text-white rounded-full"
              >
                Contact Me
              </a>
            </div>
            <div
              style={{
                fontFamily: "var(--font-family1)",
              }}
              className="w-full flex items-center justify-center mt-5  gap-5"
            >
              <a
                href="https://www.linkedin.com/in/aayush-balami-539233274/"
                target="_blank"
                className="bg-blue-600 flex  items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-300 px-3 py-2  text-[0.8rem] lg:text-[1rem] text-white rounded-full"
              >
                Linkdin <FaLinkedin />
              </a>
              <a
                href="https://github.com/Balamiayush"
                target="_blank"
                className="bg-gray-600 flex  items-center justify-center gap-2 hover:bg-gray-700 transition-all duration-300 px-3 py-2  text-[0.8rem] lg:text-[1rem] text-white rounded-full"
              >
                Github <FaGithub />
              </a>
              <a
                href="#"
                className="bg-pink-600 flex items-center justify-center gap-2 hover:bg-pink-700 transition-all duration-300 px-3 py-2  text-[0.8rem] lg:text-[1rem] text-white rounded-full"
              >
                Instagram <FaInstagram />
              </a>
            </div>
          </h1>
          <div className="hero-image lg:mt-20 mt-10 w-[60vw] lg:w-[30vw] lg:h-[65vh] grayscale transition-all duration-500 hover:grayscale-0">
            <img
              src="img/heroimg.png"
              alt="hero"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      <Footer/>
      </div>

  );
};

export default Hero;
