import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Sistema Integral de Gestión - SMyT",
    description:
      "Plataforma integral diseñada para la Secretaría de Movilidad y Transporte (SMyT) destinada a la digitalización, control y auditoría de depósitos vehiculares.",
    image: "/SMyT.png", // Placeholder
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    live: "https://s-my-t.vercel.app/",
  },
  {
    id: 2,
    title: "Landing page - Aetherys",
    description:
      "Landing page para un emprendimiento en el área de desarrollo de software, con un diseño moderno y atractivo.",
    image: "/Aetherys2.png", // Placeholder
    tags: ["HTML5", "TailwindCSS", "JS"],
    github: "https://github.com/Galapan/Portafolio",
    live: "https://portafolio-fawn-three-79.vercel.app/",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-24 bg-zinc-950 text-white relative scroll-mt-20">
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group relative flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 mb-6 group/image md:focus-within:outline-none md:cursor-default">
                <div className="absolute inset-0 bg-black/20 md:group-hover/image:bg-transparent md:focus-within:bg-transparent transition-colors duration-500 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="object-cover w-full h-full transform md:group-hover/image:scale-105 md:focus-within:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-80 md:group-hover/image:opacity-100 md:focus-within:opacity-100"
                />

                {/* Desktop Hover Overlay Action Links */}
                <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover/image:opacity-100 group-focus-within/image:opacity-100 transition-opacity duration-500 z-20 bg-black/40 backdrop-blur-md gap-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                      aria-label={`Ver ${project.title} en vivo`}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-zinc-900 text-white rounded-full hover:scale-110 transition-transform border border-zinc-700 hover:border-zinc-500"
                      aria-label={`Ver código fuente de ${project.title}`}
                    >
                      <Github size={20} />
                    </a>
                  )}
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
                <p className="text-zinc-400 mb-4">{project.description}</p>

                {/* Mobile/Tablet Action Links (always visible) */}
                <div className="flex md:hidden gap-3">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
                      aria-label={`Ver ${project.title} en vivo`}
                    >
                      <ExternalLink size={16} />
                      Ver demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white border border-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-800 hover:border-zinc-500 transition-colors"
                      aria-label={`Ver código fuente de ${project.title}`}
                    >
                      <Github size={16} />
                      Código
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
