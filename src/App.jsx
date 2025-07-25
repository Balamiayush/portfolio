import  { useEffect, useRef } from "react"; 
import gsap from "gsap";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import Components
import Hero from "./pages/Hero";
import Page2 from "./pages/Page2";
import AreaExp from "./pages/AreaExp";
import Loader from "./components/Loader";
// import Index from "./components/showcase/Index";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";  // Import the Navbar

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  
  useEffect(() => {
    window.addEventListener("load", () => {
      document.querySelector(".loader").classList.add("hidden");
      document.querySelector(".main").classList.remove("hidden");
      document.querySelector(".main").classList.add("block");
    });
    const lenis = new Lenis({
      autoRaf: true,
    });
    
    lenis.on('scroll', (e) => {
      // console.log(e);
    });
    
    // Clean up function
    return () => {
      lenis.destroy();
    };
  }, []);
  
 useGSAP(() => {
  const circle = document.querySelector(".circle");
  const imgs = document.querySelectorAll("img");

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

  // Update mouse target
  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  // Animation loop using requestAnimationFrame
  function animate() {
    currentX = lerp(currentX, targetX, 0.1);
    currentY = lerp(currentY, targetY, 0.1);

    gsap.set(circle, {
      x: currentX,
      y: currentY
    });

    requestAnimationFrame(animate);
  }

  animate(); // Start animation loop
}, []);

  // Hover effects
 
  
  return (
     <>
        <Loader />
        <div className=" circle w-4 h-4 bg-orange-500 z-[100] fixed rounded-full top-0 left-0"></div>
        <div className="w-full bg-[#fff] main z-[10]  relative">
          <Navbar />
          <Hero />
          {/* <About /> */}
          <AreaExp />
          <Page2 />
          <Contact />
          {/* <Index/> */}
        </div>
        </>
  );
};

export default App;