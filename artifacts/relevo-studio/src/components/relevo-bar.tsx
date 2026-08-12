import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function RelevoBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const animateLeft = { left: "50%", marginLeft: "-4px" };
  const initialLeft = prefersReducedMotion ? animateLeft : { left: "0%", marginLeft: "0px" };
  
  const animateWidth = { width: "100%" };
  const initialWidth = prefersReducedMotion ? animateWidth : { width: "0%" };

  const animateOpacity = { opacity: 1, y: 0 };
  const initialOpacity = prefersReducedMotion ? animateOpacity : { opacity: 0, y: -4 };

  const transitionDot = prefersReducedMotion ? { duration: 0 } : { duration: 0.9, ease: [0.25, 1, 0.5, 1] };
  const transitionBar = prefersReducedMotion ? { duration: 0 } : { duration: 0.9, delay: 0.9, ease: [0.25, 1, 0.5, 1] };
  const transitionLabel = prefersReducedMotion ? { duration: 0 } : { delay: 0.9, duration: 0.4, ease: "easeOut" };

  return (
    <div ref={ref} className="w-full flex flex-col pt-12 pb-16 overflow-hidden relative">
      <div className="flex justify-between w-full font-mono text-[11px] text-[var(--stone)] tracking-[0.08em] uppercase mb-5">
        <span className="w-1/2 pr-2">LO QUE HOY HACE UNA PERSONA</span>
        <span className="w-1/2 pl-2">LO QUE HACE EL SISTEMA</span>
      </div>

      <div className="relative w-full h-[4px] flex items-center">
        {/* Left static thin line */}
        <div className="w-1/2 h-[1px] bg-[var(--stone)] relative"></div>
        
        {/* Right track (background) */}
        <div className="w-1/2 h-[4px] relative bg-transparent">
          {/* Animated fill */}
          {isInView && (
            <motion.div
              className="absolute left-0 top-0 h-full bg-[var(--brass)]"
              initial={initialWidth}
              animate={animateWidth}
              transition={transitionBar}
            />
          )}
        </div>

        {/* The dot marker */}
        {isInView && (
          <motion.div
            className="absolute w-[8px] h-[8px] rounded-full bg-[var(--brass)] top-1/2 -translate-y-1/2 z-10"
            initial={initialLeft}
            animate={animateLeft}
            transition={transitionDot}
          />
        )}
      </div>

      {/* "El relevo" marker that appears at the junction */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center justify-end h-14 pointer-events-none">
        {isInView && (
          <motion.div
            initial={initialOpacity}
            animate={animateOpacity}
            transition={transitionLabel}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[5px] border-b-[var(--stone)]" />
            <span className="font-mono text-[11px] text-[var(--stone)] tracking-[0.08em] uppercase whitespace-nowrap">el relevo</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}