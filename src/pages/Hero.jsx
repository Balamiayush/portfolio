import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {
  const [currentHeadingIndex, setCurrentHeadingIndex] = useState(0);
  const headings = ["WEB_Developer.", 'WEB_Designer.', "WEB_Freelance."];

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
    <div className="w-full px-4 bg-[#000] text-[#fff]">
      <Navbar />
      <div className="hero-content flex lg:mt-5 flex-col justify-center w-full items-center lg:justify-between lg:flex-row">
        <h1
         style={{
            fontFamily: 'var(--font-family2)'
         }}
         className=" font-bold text-[3rem] heroh1 lg:text-[5rem] flex items-center gap-2">
          <span  style={{
            fontFamily: 'var(--font-family3)'
         }} className="text-[#A071FF] px-8 bg-[#dadada] rounded-2xl  ">
            I AM
          </span>
          <motion.span
          style={{
            fontFamily: 'var(--font-family3)'
         }}
            ref={headingRef}
            className="rounded-2xl p-2 inline-block  overflow-hidden heroh1"
          >
            {renderCharacters(headings[currentHeadingIndex])}
          </motion.span>
        </h1>
      </div>
      <div className="img w-full h-[50vh] lg:h-[90vh]">
        <img
          className="w-full h-full object-cover"
          src="public/210000.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
