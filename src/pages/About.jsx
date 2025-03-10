import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const About = () => {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');
  const location = useLocation();

  // Framer Motion variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100vw',
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 120,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: '100vw',
      transition: {
        duration: 0.3,
      },
    },
  };

  // Tabs content


  // Handle tab change with transition
  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <motion.div
      className="w-full min-h-screen bg-black text-white p-8"
      initial="initial"
      animate="in"
      exit="exit"
      variants={pageVariants}
      key={location.pathname}
    >
      <h1 className="text-4xl font-bold mb-8">About</h1>

    
    </motion.div>
  );
};

export default About;