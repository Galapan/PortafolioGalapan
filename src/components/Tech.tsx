import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      { name: "Next.js", Icon: SiNextdotjs },
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

export default function Tech() {
  const [activeTab, setActiveTab] = useState(techCategories[0].id);

  const activeCategory =
    techCategories.find((c) => c.id === activeTab) || techCategories[0];

  return (
    <section
      id="tech"
      className="min-h-screen flex flex-col justify-center py-24 bg-zinc-950 text-white relative border-t border-white/5 overflow-hidden"
    >
      {/* Decorative background element for the active tab area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-zinc-900/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Habilidades <span className="text-zinc-500">y Tecnologías</span>
          </h2>
          <div className="w-20 h-1 bg-white rounded-full"></div>
        </motion.div>

        {/* Tabs Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {techCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                  isActive
                    ? "bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-105"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                <Icon
                  size={16}
                  className={isActive ? "text-black" : "text-zinc-500"}
                />
                {category.title}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid with Crossfade Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="min-h-75 relative flex flex-col justify-center"
        >
          {/* Background Icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.15, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex items-center justify-center will-change-transform will-change-opacity pointer-events-none"
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
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {activeCategory.skills.map((skill, index) => (
                <motion.div
                  key={`${activeTab}-${skill.name}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center gap-3 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-white/30 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] transition-colors duration-200 cursor-default will-change-transform"
                >
                  <skill.Icon className="text-2xl text-zinc-300 group-hover:text-white transition-colors" />
                  <span className="text-zinc-200 font-medium text-center tracking-wide drop-shadow-md">
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
