
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    // Save the original overflow style
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Restore the original overflow style
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useGSAP(() => {

    if (loaderRef.current) {
      gsap.to(loaderRef.current.children, {
        duration: 1,
        top: "-100%",
        height: "0%",
        stagger: 0.1,
        ease: "power1.inOut",
        onComplete: () => {
          setTimeout(() => setIsLoading(false), 500);       
        },
      });
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={loaderRef}
      className="w-full h-screen fixed top-0 left-0 z-[1000] flex overflow-hidden  "
    >
      {Array.from({ 
        length: 10
         }).map((_, index) => (
        <div key={index} className="h-full bg-slate-500 w-[50%]"></div>
      ))}
    </div>
  );
};

export default Loader;
