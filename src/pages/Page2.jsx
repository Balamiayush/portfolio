import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import data from "../assets/data.json";

const Page2 = () => {
  const [heading, setHeading] = useState(data);
  const boxesRef = useRef([]);
  const containersRef = useRef([]);

  // Ensure refs array matches the current data length
  useEffect(() => {
    boxesRef.current = boxesRef.current.slice(0, heading.length);
    containersRef.current = containersRef.current.slice(0, heading.length);
  }, [heading]);

  // Improved mouse movement handler with bounds checking
  const handleMouseMove = (e, index) => {
    if (!boxesRef.current[index]) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add bounds checking to keep preview within container
    const box = boxesRef.current[index];
    const container = containersRef.current[index];

    if (!box || !container) return;

    const maxX = container.offsetWidth - box.offsetWidth;
    const maxY = container.offsetHeight - box.offsetHeight;

    const boundedX = Math.max(0, Math.min(maxX, x - box.offsetWidth / 2));
    const boundedY = Math.max(0, Math.min(maxY, y - box.offsetHeight / 2));

    gsap.to(box, {
      x: boundedX,
      y: boundedY,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Container variant for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item variant for smooth entry
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      id="work-section"
      style={{ fontFamily: "var(--font-family1)" }}
      className="w-full lg:mt-5 px-4 overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ fontFamily: "var(--font-family2)" }}
        className="lg:text-[4rem] text-[2rem] text-center mb-8 font-bold"
      >
        WORKS
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex relative items-center justify-center flex-col gap-10 lg:gap-5"
      >
        {heading.map((item, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            ref={(el) => (containersRef.current[index] = el)}
            className="w-full lg:h-[18vh] h-[12vh] cursor-pointer relative border-b border-black flex items-center gap-4 p-2 hover:bg-gray-50 transition-colors duration-300"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => {
              gsap.to(boxesRef.current[index], {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                onComplete: () => {
                  if (boxesRef.current[index]) {
                    gsap.set(boxesRef.current[index], { x: 0, y: 0 });
                  }
                },
              });
            }}
            onMouseEnter={() => {
              gsap.to(boxesRef.current[index], {
                opacity: 1,
                scale: 1,
                duration: 0.3,
              });
            }}
          >
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-[15vh] h-[15vh] rounded-2xl overflow-hidden shadow-md">
                <img
                  src={item.src}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </motion.a>

            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[1rem] font-bold lg:text-[2rem] capitalize hover:text-blue-600 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              {item.name}
            </motion.a>

            <motion.div
              ref={(el) => (boxesRef.current[index] = el)}
              className="box lg:w-[30vh] lg:h-[40vh] w-40 h-40 absolute  rounded-2xl bg-gray-400 opacity-0 overflow-hidden shadow-xl z-10 pointer-events-none origin-center"
              initial={{ scale: 0.8 }}
            >
              <img
                src={item.src}
                alt={item.name}
                href={item.link}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Page2;
