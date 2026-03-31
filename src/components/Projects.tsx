import { motion } from "framer-motion";
import { ExternalLink, Github, MousePointerClick } from "lucide-react";

const projects = [
  {
    title: "Sistema Integral de Gestión - SMyT",
    description:
      "Plataforma integral diseñada para la Secretaría de Movilidad y Transporte (SMyT) destinada a la digitalización, control y auditoría de depósitos vehiculares.",
    image: "/SMyT.png", // Placeholder
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    live: "https://s-my-t.vercel.app/",
  },
  {
    title: "Landing page - Aetherys",
    description:
      "Landing page para un emprendimiento en el área de desarrollo de software, con un diseño moderno y atractivo.",
    image: "/Aetherys2.png", // Placeholder
    tags: ["HTML5", "TailwindCSS", "JS"],
    github: "https://github.com/Galapan/Portafolio",
    live: "https://portafolio-fawn-three-79.vercel.app/",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-black text-white relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Proyectos <span className="text-zinc-500">realizados.</span>
            </h2>
            <div className="w-20 h-1 bg-white rounded-full"></div>
          </div>
          <p className="text-zinc-400 max-w-md text-lg">
            Una colección de los proyectos que he realizado, o en los que he
            participado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col will-change-transform will-change-opacity transform-gpu backface-hidden"
            >
              {/* Image Container */}
              <div
                className="relative aspect-4/3 overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 mb-6 group/image focus:outline-none cursor-pointer lg:cursor-default transform-gpu backface-hidden"
                tabIndex={0}
              >
                <div className="absolute inset-0 bg-black/20 group-hover/image:bg-transparent group-focus/image:bg-transparent focus-within:bg-transparent transition-colors duration-500 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="object-cover w-full h-full transform group-hover/image:scale-105 group-focus/image:scale-105 focus-within:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-80 group-hover/image:opacity-100 group-focus/image:opacity-100 focus-within:opacity-100 will-change-transform"
                />

                {/* Mobile Tap Indicator */}
                <div className="absolute top-4 right-4 md:hidden bg-black/40 backdrop-blur-md p-2 rounded-full z-10 pointer-events-none opacity-80">
                  <MousePointerClick
                    size={16}
                    className="text-white animate-pulse"
                  />
                </div>

                {/* Hover Action Links */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 group-focus/image:opacity-100 focus-within:opacity-100 transition-opacity duration-500 z-20 bg-black/40 backdrop-blur-md gap-4">
                  <>
                    {project.live && (
                      <a
                        href={project.live}
                        className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                        aria-label="View Live Project"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="p-3 bg-zinc-900 text-white rounded-full hover:scale-110 transition-transform border border-zinc-700 hover:border-zinc-500"
                        aria-label="View Source Code"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col grow">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-semibold mb-2 transform group-hover:translate-x-1 transition-transform duration-300">
                  {project.title}
                </h3>
                <p className="text-zinc-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
