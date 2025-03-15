import React, { useEffect, useRef } from "react"; 
import gsap from "gsap";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
// Import Components
import Hero from "./pages/Hero";
import Page2 from "./pages/Page2";
import AreaExp from "./pages/AreaExp";
import Loader from "./components/Loader";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";  // Import the Navbar

const App = () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenisRef = useRef();
  
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);
  
  useGSAP(() => {
    window.addEventListener("mousemove", (e) => {
      gsap.to(".cirlce", {
        x: e.clientX,
        y: e.clientY,
      });
    });
  });
  
  return (
     <>
        <Loader />
        <div className="cirlce w-4 h-4 bg-orange-500 z-[100] fixed rounded-full top-0 left-0"></div>
        <div className="w-full bg-[#fff] main z-[10]  relative">
          <Navbar />
          <Hero />
          {/* <About /> */}
          <AreaExp />
          <Page2 />
          <Contact />
        </div>
        </>
  );
};

export default App;