import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const headings = ["Hello!", "aryanabalami54@gmail.com"];
  const [currentHeading, setCurrentHeading] = useState(headings[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Track active menu item position for the background pill
  const [hoverPosition, setHoverPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Refs for menu items to measure their dimensions
  const itemRefs = useRef([]);

  // Track scroll position for hamburger visibility
  useEffect(() => {
    const handleScroll = () =>
      setShowHamburger(window.scrollY > window.innerHeight * 0.1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Find active menu item on page load and update background position
  useEffect(() => {
    const activeIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      updateBackgroundPosition(activeIndex);
    }
  }, [location.pathname, itemRefs.current]);

  const navRef = useRef(null);
  const headerRef = useRef(null);
  
  const menuItems = [
    { label: "Home.", path: "/" },
    { label: "About.", path: "/about" },
    { label: "Works.", path: "/" },
    { label: "Contact.", path: "/contact" }
  ];

  // Update background pill position based on hovered or active item
  const updateBackgroundPosition = (index) => {
    if (!itemRefs.current[index]) return;
    
    const item = itemRefs.current[index];
    const rect = item.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    
    setHoverPosition({
      left: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
    });
  };

  // Handle mouse enter on menu item
  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    updateBackgroundPosition(index);
  };

  // Handle mouse leave from menu
  const handleMouseLeave = () => {
    setHoveredItem(null);
    
    // When mouse leaves, animate to active item if one exists
    const activeIndex = menuItems.findIndex(item => item.path === location.pathname);
    if (activeIndex !== -1) {
      updateBackgroundPosition(activeIndex);
    } else {
      // If no active item, fade out the background
      setHoverPosition(prev => ({ ...prev, opacity: 0 }));
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  // Toggle between headings on click
  const toggleHeading = () => {
    setCurrentHeading(currentHeading === headings[0] ? headings[1] : headings[0]);
  };

  return (
    <>
      <nav
        style={{
          fontFamily: "var(--font-family1)",
        }}
        className="w-full h-20 flex justify-between items-center transition-all duration-300 z-50 lg:px-4"
      >
        <div className="flex items-center overflow-hidden h-16">
          <motion.div 
            ref={headerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[1rem] lg:text-[1rem] cursor-pointer font-bold"
            onClick={toggleHeading}
          >
            <Link to="/" className="text-white">
              {currentHeading}
            </Link>
          </motion.div>
        </div>

        <div
          ref={navRef}
          className="relative bg-gray-300 hidden items-right lg:flex rounded-full h-10 px-2 z-10"
          onMouseLeave={handleMouseLeave}
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              ref={el => itemRefs.current[index] = el}
              onMouseEnter={() => handleMouseEnter(index)}
              onClick={() => handleNavigation(item.path)}
              className={`text-[0.7rem] lg:text-[1rem] px-3  lg:px-5 cursor-pointer py-2 relative rounded-full transition-all duration-300 ${
                location.pathname === item.path ? "text-white font-semibold" : "text-black"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.label}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              left: hoverPosition.left,
              width: hoverPosition.width,
              opacity: hoverPosition.opacity,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute z-[-1] top-1/2 -translate-y-1/2 h-8 rounded-full bg-blue-600"
          />
        </div>

        {/* Mobile Hamburger Menu */}
        {showHamburger && (
          <motion.div
            className="w-15 h-15 lg:w-15 lg:h-15 fixed bg-blue-800 right-5 flex items-center justify-center rounded-full flex-col gap-1.5 lg:gap-2 cursor-pointer z-100"
            onClick={() => setIsOpen(!isOpen)}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-5 h-[1px] lg:w-10 lg:h-[2px]  bg-white rounded-full"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: (custom) =>
                    custom === 1
                      ? { rotate: 45, y: 10 }
                      : custom === 3
                      ? { rotate: -45, y: -10 }
                      : { opacity: 0 },
                }}
                custom={i}
              />
            ))}
          </motion.div>
        )}
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="shadow-lg z-10 overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
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
            }}
          >
            <motion.div className="flex flex-col fixed right-0 top-0 w-[40%] z-10 h-screen bg-gray-900 py-4 items-center justify-center">
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`menu-item-${index} px-8 py-4 text-[1rem] overflow-hidden border-b border-gray-500 relative flex items-center justify-center  text-white lg:text-[6rem] leading-none`}
                  variants={{
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
                  }}
                  whileHover={{ 
                    scale: 1.1, 
                    color: "#3b82f6", // Blue color on hover
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Existing styles */}
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