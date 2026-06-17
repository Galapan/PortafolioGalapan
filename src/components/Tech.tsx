import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  SiRemix,
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
  FaGoogle,
} from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { GiBearFace } from "react-icons/gi";
import { cn } from "../utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

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
      { name: "Remix", Icon: SiRemix },
      { name: "Zustand", Icon: GiBearFace },
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
      { name: "Antigravity", Icon: FaGoogle },
      { name: "VS Code", Icon: VscVscode },
      { name: "Prettier", Icon: SiPrettier },
      { name: "Vercel", Icon: SiVercel },
      { name: "Vite", Icon: SiVite },
    ],
  },
];

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const tabsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.1 },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASE,
      delay: 0.05,
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15, ease: EASE },
  },
};

const cardHoverTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
} as const;

export default function Tech() {
  const [activeTab, setActiveTab] = useState(techCategories[0].id);

  const activeCategory =
    techCategories.find((c) => c.id === activeTab) || techCategories[0];

  const maxSkills = Math.max(...techCategories.map((c) => c.skills.length));
  const gridMinHeight = `${Math.ceil(maxSkills / 3) * 5.5 + Math.ceil(maxSkills / 3 - 1) * 1}rem`;

  return (
    <section
      id="tech"
      className="min-h-screen flex flex-col justify-center py-24 bg-zinc-950 text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-zinc-900/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <motion.div
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Habilidades{" "}
            <span className="text-zinc-500">y Tecnologías.</span>
          </h2>
          <div className="w-20 h-1 bg-white rounded-full" />
        </motion.div>

        <motion.div
          variants={tabsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {techCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 border cursor-pointer",
                  isActive
                    ? "border-transparent text-black"
                    : "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
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

        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative flex flex-col justify-center"
          style={{ minHeight: gridMinHeight }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
              animate={{ opacity: 0.08, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex items-center justify-center"
            >
              {(() => {
                const Icon = activeCategory.icon;
                return (
                  <Icon
                    className="w-48 h-48 md:w-64 md:h-64 text-white"
                    strokeWidth={0.5}
                  />
                );
              })()}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {activeCategory.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    scale: 1.03,
                    boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                    transition: cardHoverTransition,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-zinc-600 hover:bg-zinc-800/90 transition-colors duration-200 cursor-default"
                >
                  <motion.span
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.15 }}
                    transition={cardHoverTransition}
                  >
                    <skill.Icon className="text-xl sm:text-2xl text-zinc-300 group-hover:text-white transition-colors" />
                  </motion.span>
                  <span className="text-xs sm:text-base text-zinc-200 font-medium text-center tracking-wide drop-shadow-md">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
