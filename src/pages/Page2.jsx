import React, { useState } from "react";
import { motion } from "framer-motion";
import data from "../assets/data.json";

const Page2 = () => {
  const [heading, setHeading] = useState(data);
  console.log(heading);
  return (
    <div className="w-full  lg:mt-5  px-4">
      <h1
        style={{
          fontFamily: "var(--font-family2)",
        }}
        className="lg:text-[4rem]  text-[1rem] text-center  "
      >
        WORKS
      </h1>
      <div className="w-full flex  items-center justify-center flex-col  gap-1">
        {heading.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            key={index}
            className="w-full lg:h-[18vh] h-[10vh] cursor-pointer  border-b-1 border-black  flex items-center gap-4"
          >
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <div className="w-[10vh] h-[10vh] rounded-2xl overflow-hidden">
                <img src={item.src} className="w-full h-full object-cover" />
              </div>
            </a>
            <a
              href={item.link}
              target="_blank"
              className="text-[1rem] font-bold  cursor-pointer lg:text-[2rem] capitalize"
            >
              {item.name}
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page2;
