import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollState } from "../hooks/useScrollState";

export default function ScrollToTop() {
  const { isScrollPastThreshold } = useScrollState();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isScrollPastThreshold && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Volver arriba"
          className="fixed bottom-6 right-6 z-40 p-3 md:p-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:bg-white/20 hover:border-white/40 transition-colors"
        >
          <ArrowUp size={20} className="md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
