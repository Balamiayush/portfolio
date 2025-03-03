import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const headings = ["Hello!", "aryanabalami54@gmail.com"];
  const [currentHeading, setCurrentHeading] = useState(headings[0]);
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Track scroll position for hamburger visibility
  useEffect(() => {
    const handleScroll = () =>
      setShowHamburger(window.scrollY > window.innerHeight * 0.1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navRef = useRef(null);
  const headerRef = useRef(null);
  const animationRef = useRef(null);
  const menuItems = ["About.", "Works.", "Contact."];

  const split = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block char">
        {char}
      </span>
    ));
  };

  const toggleMenu = () =>
    setIsOpen(!isOpen)
      ? useGSAP(() => {
          gsap.to(".span-nav .char", {
            y: 100,
            ease: "power2.inOut",
            duration: 1,
            stagger: 0.05,
          });
        })
      : useGSAP(() => {
          gsap.to(".span-nav .char", {
            y: 0,
            ease: "power2.inOut",
            duration: 1,
            stagger: 0.05,
          });
        });

  // Header text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => {
        const nextIndex = (headings.indexOf(prev) + 1) % headings.length;
        animateHeaderText(headings[nextIndex]);
        return headings[nextIndex];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const animateHeaderText = (newText) => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    if (animationRef.current) animationRef.current.kill();

    const tl = gsap.timeline();
    animationRef.current = tl;

    tl.to(headerElement, {
      duration: 0.4,
      y: -50,
      opacity: 0,
      ease: "power2.in",
      onComplete: () => {
        headerElement.textContent = newText;
        gsap.set(headerElement, { y: 50 });
      },
    }).to(headerElement, {
      duration: 0.4,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = (e) => {
    if (!navRef.current) return;
    const { left, width, height } = e.target.getBoundingClientRect();
    const navLeft = navRef.current.getBoundingClientRect().left;

    setPosition({ left: left - navLeft, width, height, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setPosition({ left: 0, width: 0, height: 0, opacity: 0 });
  };

  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom) =>
      custom === 1
        ? { rotate: 45, y: 10 }
        : custom === 3
        ? { rotate: -45, y: -10 }
        : { opacity: 0 },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, staggerChildren: 0.1, staggerDirection: 1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 100, transition: { duration: 0.2 } },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const handleMenuItemHover = (index) => {
    setHoveredItem(index);
    gsap.to(`.menu-item-${index} .span-nav .char`, {
      y: -1,
      color: "#4F46E5", // Change color on hover
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
      opacity: 1,
      scale: 1.1,
      rotationX: 0,
    });
  };

  const handleMenuItemLeave = (index) => {
    setHoveredItem(null);
    gsap.to(`.menu-item-${index} .span-nav .char`, {
      y: 100, // Move back down out of view
      stagger: 0.02,
      duration: 0.3,
      ease: "power2.in",
      opacity: 0.8,
      scale: 1,
      rotationX: 90,
    });
  };

  // Initialize animation state
  useEffect(() => {
    // Set initial state for all menu items
    menuItems.forEach((_, index) => {
      gsap.set(`.menu-item-${index} .span-nav .char`, {
        y: 100,
        opacity: 0.8,
        rotationX: 90,
      });
    });
  }, [isOpen]);

  return (
    <>
      <nav
        style={{
          fontFamily: "var(--font-family1)",
        }}
        className="w-full h-20 flex justify-between items-center transition-all duration-300 z-50 lg:px-4"
      >
        <div className="flex items-center overflow-hidden h-16">
          <motion.a
            href="/"
            ref={headerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[1rem] lg:text-[1rem] cursor-pointer font-bold"
          >
            {currentHeading}
          </motion.a>
        </div>

        <div
          ref={navRef}
          className="relative  bg-gray-300   hidden items-right lg:flex  rounded-full h-10 px-2 z-10"
        >
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("works-section")?.scrollIntoView({
                  behavior: "smooth",
                  
                });
              }}
              className="text-[0.7rem] lg:text-[1rem] px-3 lg:px-5 py-2 relative rounded-full transition-all duration-300 text-black hover:text-white"
              href="#"
            >
              {item}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={position}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute z-[-1] top-1/2 -translate-y-1/2 rounded-[25px] bg-black"
          />
        </div>

        {showHamburger && (
          <motion.div
            className="w-15 h-15 lg:w-15 lg:h-15  fixed bg-blue-800  right-5 flex items-center justify-center rounded-full flex-col gap-1.5 lg:gap-2 cursor-pointer z-100"
            onClick={toggleMenu}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-[1px] lg:w-10 lg:h-[2px] bg-white rounded-full"
                variants={lineVariants}
                custom={i}
              />
            ))}
          </motion.div>
        )}
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="shadow-lg z-10 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <motion.div className="flex flex-col fixed right-0 top-0 w-[40%]  z-10 h-screen bg-gray-900 py-4 items-center justify-center">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`menu-item-${index} px-8 py-4 text-[1rem] overflow-hidden border-b border-gray-500 relative flex items-center justify-center text-white lg:text-[6rem] leading-none`}
                  variants={itemVariants}
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => handleMenuItemHover(index)}
                  onMouseLeave={() => handleMenuItemLeave(index)}
                >
                  <motion.span className="text-[1rem]   span-nav2   border-b border-gray-900  relative lg:text-[6rem] leading-none">
                    {split(item)}
                  </motion.span>
                  <motion.span className="text-[1rem]  span-nav text-white lg:text-[6rem] leading-none absolute overflow-hidden perspective-900 ">
                    {split(item)}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective-500 {
          perspective: 500px;
        }
        .char {
          display: inline-block;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
    </>
  );
};

export default Navbar;
