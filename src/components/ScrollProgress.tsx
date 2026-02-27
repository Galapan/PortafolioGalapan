import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  // Adding physics (spring) for a smoother bar animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-zinc-700 via-zinc-400 to-white origin-left z-60 rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      style={{ scaleX }}
    />
  );
}
