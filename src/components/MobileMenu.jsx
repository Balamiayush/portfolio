
import { useEffect, useState } from 'react';
import Nav from './nav';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  return (
    <>
      <div className="fixed right-0 z-10 p-[30px]">
        <motion.div
          onClick={() => { setIsActive(!isActive) }}
          className="w-20 h-20 rounded-full bg-[#455CE9] cursor-pointer flex items-center justify-center"
          animate={isActive ? "open" : "closed"}
        >
          <div className="w-full">
            <motion.div
              className="relative"
              variants={{
                closed: { 
                  rotate: 0,
                  transition: { duration: 0.3 }
                },
                open: { 
                  rotate: 360,
                  transition: { duration: 0.3 }
                }
              }}
            >
              <motion.span
                className="block h-[1px] w-[40%] mx-auto bg-white relative"
                variants={{
                  closed: { 
                    top: "-5px",
                    rotate: 0,
                    transition: { duration: 0.3 }
                  },
                  open: { 
                    top: "-1px",
                    rotate: 45,
                    transition: { duration: 0.3 }
                  }
                }}
              />
              <motion.span
                className="block h-[1px] w-[40%] mx-auto bg-white relative"
                variants={{
                  closed: { 
                    top: "5px",
                    rotate: 0,
                    transition: { duration: 0.3 }
                  },
                  open: { 
                    top: "0px",
                    rotate: -45,
                    transition: { duration: 0.3 }
                  }
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  )
}

export const menuSlide = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
}

export const slide = {
  initial: { x: 80 },
  enter: i => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
  exit: i => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } })
}

export const scale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } }
}