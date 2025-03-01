import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import ScrollTrigger from "gsap/ScrollTrigger";
import Hero from "./pages/Hero";
import Page2 from "./pages/Page2";
import Loader from "./components/Loader";
import { useGSAP } from "@gsap/react";
const App = () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenisRef = useRef()
  useEffect(()=>{
 
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); 
});

gsap.ticker.lagSmoothing(0);

  },[])
useGSAP(()=>{
 window.addEventListener('mousemove',(e)=>{
  gsap.to('.cirlce',{
    x: e.clientX,
    y: e.clientY,
    
  })
 })
})
  return (
    <>
    <div className="cirlce w-5 h-5 bg-red-500 z-[100] fixed rounded-full top-0 left-0 "></div>
      <div className="w-full bg-[#fff]  main z-[10]   overflow-x-hidden relative">
      {/* <Loader/> */}
        <Hero/>
        {/* <Page2/> */}
      </div>
    </>
  );
};

export default App;
