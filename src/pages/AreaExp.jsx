import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const SkillsCircle = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const mainControls = useAnimation();
  const circleControls = useAnimation();
  const labelControls = useAnimation();

  // Start animations when the component comes into view
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      circleControls.start("visible");
      labelControls.start("visible");
    } else {
      mainControls.start("hidden");
      circleControls.start("hidden");
      labelControls.start("hidden");
    }
  }, [isInView, mainControls, circleControls, labelControls]);

  // Skills data organized by category
  const skillsData = {
    frontend: [
      { name: "HTML", icon: "html.svg" },
      { name: "CSS", icon: "css.svg" },
      { name: "Tailwind", icon: "tailwind.svg" },
      { name: "GSAP", icon: "gsap.svg" },
      { name: "SCSS", icon: "scss.svg" },
      { name: "JavaScript", icon: "js.svg" },
      { name: "React", icon: "react.svg" },
      { name: "Figma", icon: "figma.svg" }
    ],
    backend: [
      { name: "MongoDB", icon: "mango.svg" },
      { name: "Node.js", icon: "node.svg" },
      { name: "Mongoose", icon: "mongooes.svg" },
      { name: "Express", icon: "mango.svg" } // Assuming this is Express, fix the icon path
    ]
  };

  // Combined skills for the outer circle
  const allSkills = [...skillsData.frontend, ...skillsData.backend];

  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const calculatePosition = (index, total, radius, centerX, centerY) => {
    const angle = (index / total) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle - Math.PI/2);
    const y = centerY + radius * Math.sin(angle - Math.PI/2);
    return { x, y };
  };

  return (
    <div
      style={{
        fontFamily: "var(--font-family3)"
      }}
      className="w-full min-h-[100vh] bg-gradient-to-b from-blue-50 to-indigo-50 py-16 overflow-hidden "
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
        }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">My Skills</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A comprehensive showcase of my technical expertise in web development
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto h-[70vh] flex items-center justify-center" ref={containerRef}>
        {/* Center circle with profile */}
        <motion.div 
          className="absolute z-20 bg-white rounded-full shadow-xl w-40 h-40 flex items-center justify-center"
          variants={circleVariants}
          initial="hidden"
          animate={circleControls}
          custom={0}
        >
          <div className="text-center">
            <div className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 w-24 h-24 mx-auto mb-2 flex items-center justify-center text-white text-xl font-bold">
              WEB
            </div>
            <p className="font-semibold text-gray-800">Developer</p>
          </div>
        </motion.div>

        {/* Middle circle - Frontend */}
        <motion.div 
          className="absolute z-[10] rounded-full border-2 border-indigo-200 w-96 h-96"
          variants={circleVariants}
          initial="hidden"
          animate={circleControls}
          custom={1}
          transition={{ delay: 0.2 }}
        >
          {skillsData.frontend.map((skill, index) => {
            const position = calculatePosition(
              index, 
              skillsData.frontend.length, 
              170, 
              0, 
              0
            );
            
            return (
              <motion.div 
                key={`front-${index}`}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute z-[10] rounded-full bg-white shadow-md w-16 h-16 flex items-center justify-center transform -translate-x-8 -translate-y-8 hover:scale-110 transition-transform duration-300"
                style={{ 
                  left: `calc(50% + ${position.x}px)`, 
                  top: `calc(50% + ${position.y}px)` 
                }}
              >
                <div className="text-center">
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8 mx-auto" />
                  <p className="text-xs mt-1 font-medium text-gray-700">{skill.name}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Outer circle - Backend */}
        <motion.div 
          className="absolute z-[10] rounded-full border-2 border-indigo-100 w-[32rem] h-[32rem]"
          variants={circleVariants}
          initial="hidden"
          animate={circleControls}
          custom={2}
          transition={{ delay: 0.4 }}
        >
          {skillsData.backend.map((skill, index) => {
            const position = calculatePosition(
              index, 
              skillsData.backend.length, 
              250, 
              0, 
              0
            );
            
            return (
              <motion.div 
                key={`back-${index}`}
                custom={index + skillsData.frontend.length}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="absolute rounded-full bg-white shadow-md w-16 h-16 flex items-center justify-center transform -translate-x-8 -translate-y-8 hover:scale-110 transition-transform duration-300"
                style={{ 
                  left: `calc(50% + ${position.x}px)`, 
                  top: `calc(50% + ${position.y}px)` 
                }}
              >
                <div className="text-center">
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8 mx-auto" />
                  <p className="text-xs mt-1 font-medium text-gray-700">{skill.name}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category labels */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={labelControls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 1, duration: 0.5 } }
          }}
          className="absolute top-4 left-4 bg-indigo-100 px-4 py-2 rounded-full text-sm font-medium text-indigo-800"
        >
          Frontend
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={labelControls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 1.2, duration: 0.5 } }
          }}
          className="absolute bottom-4 right-4 bg-indigo-100 px-4 py-2 rounded-full text-sm font-medium text-indigo-800"
        >
          Backend
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsCircle;