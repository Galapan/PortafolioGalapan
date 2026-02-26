import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Server, Layers, Wrench } from "lucide-react";

const techCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Monitor,
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Next.js",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "REST APIs",
      "Docker",
      "Firebase",
      "Supabase",
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    icon: Layers,
    skills: ["Next.js", "Framer Motion", "Remix", "Zustand", "GraphQL"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "Figma",
      "Antigravity",
      "VS Code",
      "Prettier",
      "Vercel",
      "Vite",
    ],
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState(techCategories[0].id);

  const activeCategory =
    techCategories.find((c) => c.id === activeTab) || techCategories[0];

  return (
    <section
      id="about"
      className="py-24 bg-zinc-950 text-white relative border-t border-white/5 overflow-hidden"
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
        <div className="flex flex-wrap justify-center gap-3 mb-8">
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
        </div>

        {/* Skills Grid with Crossfade Animation */}
        <div className="min-h-75 relative flex flex-col justify-center">
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
                  key={`${activeTab}-${skill}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.15, ease: "easeOut" },
                  }}
                  className="flex items-center justify-center p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-colors cursor-default will-change-transform"
                >
                  <span className="text-zinc-200 font-medium text-center tracking-wide drop-shadow-md">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
