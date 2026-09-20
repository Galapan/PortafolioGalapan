import type { ReactNode } from "react";
import { m as motion } from "framer-motion";
import AmbientBackground from "../AmbientBackground";
import { expoOut } from "../../animations";
import type { useMobileNavigation } from "../../hooks/useMobileNavigation";
import { menuTiming } from "./config";

type Navigation = ReturnType<typeof useMobileNavigation>;

export default function NavigationScene({ navigation, reduced, gap, header, children }: {
  navigation: Navigation;
  reduced: boolean;
  gap: number;
  header: ReactNode;
  children: ReactNode;
}) {
  const { pageSnapshot, pageRef, isMobileMenuOpen } = navigation;
  const compact = isMobileMenuOpen && !reduced && pageSnapshot;
  return (
      <div style={{ height: pageSnapshot?.documentHeight }}>
        <motion.div
          ref={pageRef}
          initial={false}
          animate={{
            scaleX: compact ? 1 - (gap * 2) / pageSnapshot.width : 1,
            scaleY: compact ? 1 - (gap * 2) / pageSnapshot.height : 1,
            borderRadius: compact ? 4 : 0,
          }}
          transition={{ duration: reduced ? 0 : menuTiming.scene, delay: isMobileMenuOpen || reduced ? 0 : 0.12, ease: expoOut }}
          style={pageSnapshot ? { position: "fixed", inset: 0, height: "100dvh", minHeight: 0, overflow: "hidden" } : undefined}
          className="relative isolate min-h-screen bg-zinc-950"
        >
          <AmbientBackground />
          {header}
          <div style={pageSnapshot ? { width: pageSnapshot.width, transform: `translateY(-${pageSnapshot.scrollY}px)` } : undefined}>
            {children}
          </div>
        </motion.div>
      </div>
  );
}
