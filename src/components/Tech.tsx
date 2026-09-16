import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, m as motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Monitor, Server, Layers, Wrench } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
  SiFirebase,
  SiSupabase,
  SiFramer,
  SiElectron,
  SiPrettier,
  SiVercel,
  SiVite,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { cn } from "../utils";
import {
  expoOut, reveal, revealViewport, useParallax, usePop,
} from "../animations";

const techCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Monitor,
    skills: [
      { name: "React", Icon: FaReact },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "HTML5", Icon: SiHtml5 },
      { name: "CSS3", Icon: SiCss3 },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express.js", Icon: SiExpress },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "Prisma", Icon: SiPrisma },
      { name: "REST APIs", Icon: TbApi },
      { name: "Docker", Icon: FaDocker },
      { name: "Firebase", Icon: SiFirebase },
      { name: "Supabase", Icon: SiSupabase },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    icon: Layers,
    skills: [
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "Framer Motion", Icon: SiFramer },
      { name: "React native", Icon: FaReact },
      { name: "Bootstrap", Icon: FaBootstrap },
      { name: "Electron", Icon: SiElectron },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", Icon: FaGitAlt },
      { name: "GitHub", Icon: FaGithub },
      { name: "Figma", Icon: FaFigma },
      { name: "VS Code", Icon: VscVscode },
      { name: "Prettier", Icon: SiPrettier },
      { name: "Vercel", Icon: SiVercel },
      { name: "Vite", Icon: SiVite },
    ],
  },
];

export default function Tech() {
  const [activeTab, setActiveTab] = useState(techCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const watermarkY = useParallax(sectionRef, -24, 24);
  const cardPop = usePop(1.03, -4);
  const iconPop = usePop(1.15);

  const displayedCategory =
    techCategories.find((c) => c.id === activeTab) || techCategories[0];

  const maxSkills = Math.max(...techCategories.map((c) => c.skills.length));
  const rowsForColumns = (cols: number) => Math.ceil(maxSkills / cols);
  const rowHeightRem = 5.5;
  const rowGapRem = 1;
  const mobileHeight = `${rowsForColumns(2) * rowHeightRem + Math.max(rowsForColumns(2) - 1, 0) * rowGapRem}rem`;
  const desktopHeight = `${rowsForColumns(3) * rowHeightRem + Math.max(rowsForColumns(3) - 1, 0) * rowGapRem}rem`;

  const cards: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reduced ? 0 : 0.03, staggerChildren: reduced ? 0 : 0.05 } },
    exit: { transition: { staggerChildren: reduced ? 0 : 0.015, staggerDirection: -1 } },
  };
  const card: Variants = {
    hidden: {
      opacity: reduced ? 1 : 0,
      scale: reduced ? 1 : 0.96,
      y: reduced ? 0 : 24,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : {
            duration: 0.3,
            ease: expoOut,
            opacity: { duration: 0.25, ease: "easeOut" },
          },
    },
    exit: { opacity: 0, scale: reduced ? 1 : 0.95, transition: { duration: reduced ? 0 : 0.15, ease: "easeIn" } },
  };

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="min-h-screen flex flex-col justify-center py-24 text-white relative overflow-hidden scroll-mt-20"
    >
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div data-ambient-glow="tech" className="ambient-fallback w-full max-w-4xl h-96" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <motion.div
          initial="hidden" whileInView="visible" viewport={revealViewport}
          variants={reveal(50, 0.8, "y", reduced)}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Habilidades{" "}
            <span className="text-zinc-500">y Tecnologías.</span>
          </h2>
          <div className="w-20 h-1 bg-white rounded-full" />
        </motion.div>

        <LayoutGroup id="tech-tabs">
        <motion.div
          initial="hidden" whileInView="visible" viewport={revealViewport}
          variants={reveal(30, 0.6, "y", reduced)}
          className="relative flex flex-wrap justify-center gap-3 mb-8"
        >
          {techCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;

            return (
              <button
                key={category.id}
                aria-pressed={isActive}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 border cursor-pointer",
                  isActive
                    ? "border-transparent text-black"
                    : "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800",
                )}
              >
                {isActive && <motion.span
                  layoutId="active-pill"
                  transition={{ duration: reduced ? 0 : 0.3, ease: expoOut }}
                  className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] pointer-events-none"
                />}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon
                    size={16}
                    className={isActive ? "text-black" : "text-zinc-500"}
                  />
                  {category.title}
                </span>
              </button>
            );
          })}
        </motion.div>
        </LayoutGroup>

        <div
          data-tech-grid
          className="relative flex flex-col justify-start"
          style={{ minHeight: mobileHeight }}
        >
          <style>{`@media (min-width: 768px) { [data-tech-grid] { min-height: ${desktopHeight} !important; } }`}</style>
          <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={cards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            exit="exit"
          >
          <motion.div
            style={{ y: watermarkY }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transform-gpu"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, scale: reduced ? 1 : 0.72, rotate: reduced ? 0 : -14 }, visible: { opacity: 0.02, scale: 1, rotate: 0 }, exit: { opacity: 0 } }}
              transition={{ duration: reduced ? 0 : 0.5, ease: expoOut }}
              className="flex items-center justify-center"
            >
              {(() => {
                const Icon = displayedCategory.icon;
                return (
                  <Icon
                    className="w-48 h-48 md:w-64 md:h-64 text-white"
                    strokeWidth={0.5}
                  />
                );
              })()}
            </motion.div>
          </motion.div>

          <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayedCategory.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={card}
              >
                <motion.div {...cardPop} className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-6 h-full bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-zinc-600 hover:bg-zinc-800/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-[color,background-color,border-color,box-shadow] duration-200 cursor-default">
                <motion.span {...iconPop} className="flex-shrink-0">
                  <skill.Icon className="text-xl sm:text-2xl text-zinc-300 group-hover:text-white transition-colors" />
                </motion.span>
                <span className="text-xs sm:text-base text-zinc-200 font-medium text-center tracking-wide drop-shadow-md">
                  {skill.name}
                </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
          </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
