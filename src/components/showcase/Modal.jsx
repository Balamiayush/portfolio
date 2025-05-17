import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { 
        scale: 1, 
        x: "-50%", 
        y: "-50%", 
        transition: { 
            duration: 0.4, 
            ease: [0.76, 0, 0.24, 1] 
        } 
    },
    closed: { 
        scale: 0, 
        x: "-50%", 
        y: "-50%", 
        transition: { 
            duration: 0.4, 
            ease: [0.32, 0, 0.67, 0] 
        } 
    }
}

export default function Modal({ modal, projects }) {
    const { active, index } = modal;
    const modalContainer = useRef(null);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);

    useEffect(() => {
        // Animation functions
        const xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        const yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
        const xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
        const yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
        const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
        const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            xMoveContainer(clientX);
            yMoveContainer(clientY);
            xMoveCursor(clientX);
            yMoveCursor(clientY);
            xMoveCursorLabel(clientX);
            yMoveCursorLabel(clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <motion.div 
                ref={modalContainer} 
                variants={scaleAnimation} 
                initial="initial" 
                animate={active ? "enter" : "closed"} 
                className='modalContainer'
            >
                <div style={{ top: index * -100 + "%" }}  className='modalSlider'>
                    {projects.map((project, idx) => {
                        const { src, color } = project;
                        return (
                            <div 

                                className='modal'
                                style={{ backgroundColor: color }} 
                                key={`modal_${idx}`}
                            >
                                <img 
                                    src={src}
                                    width={200}
                                    height={0}
                                    alt={`Project ${idx}`}
                                    style={{ height: 'auto' }}
                                />
                            </div>
                        );
                    })}
                </div>
            </motion.div>
            
            <motion.div 
                ref={cursor} 
                className='cursor' 
                variants={scaleAnimation} 
                initial="initial" 
                animate={active ? "enter" : "closed"}
            />
            
            <motion.div 
                ref={cursorLabel} 
                className='cursorLabel'
                variants={scaleAnimation} 
                initial="initial" 
                animate={active ? "enter" : "closed"}
            >
                View
            </motion.div>
        </>
    );
}