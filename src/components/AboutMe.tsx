import { motion, type Variants } from "framer-motion";
import { Code2, Target, Coffee } from "lucide-react";

export default function AboutMe() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 bg-zinc-950 text-white relative">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col will-change-transform will-change-opacity">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Sobre <span className="text-zinc-500">Mí.</span>
              </h2>
              <div className="w-20 h-1 bg-white rounded-full mb-8"></div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-lg leading-relaxed mb-6 font-light"
            >
              Soy un desarrollador apasionado por crear interfaces dinámicas,
              modernas y sumamente interactivas. Mi objetivo principal es
              transformar diseños complejos en código limpio, accesible y fácil
              de mantener.
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-lg leading-relaxed mb-8 font-light"
            >
              Me enfoco en los detalles: desde animaciones fluidas que mejoran
              la experiencia del usuario hasta la optimización del rendimiento
              en cada frame. Creo firmemente que un buen diseño debe ir
              acompañado de una ejecución técnica impecable.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4"
            >
              <div className="flex flex-col gap-2 bg-black/50 p-6 rounded-2xl border border-white/5">
                <Code2 className="text-white mb-2" size={28} />
                <h3 className="text-xl font-semibold">Código Limpio</h3>
                <p className="text-sm text-zinc-500">
                  Arquitectura escalable y componentes reutilizables.
                </p>
              </div>
              <div className="flex flex-col gap-2 bg-black/50 p-6 rounded-2xl border border-white/5">
                <Target className="text-white mb-2" size={28} />
                <h3 className="text-xl font-semibold">Resolución</h3>
                <p className="text-sm text-zinc-500">
                  Enfoque lógico y analítico para problemas complejos.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Aesthetic Element / Image */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/2 relative aspect-4/5 rounded-3xl overflow-hidden group"
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            {/* Using a sleek placeholder gradient/texture for now, could be replaced with a real aesthetic photo */}
            <div className="absolute inset-0 bg-zinc-900 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
            <img
              src="https://i.pinimg.com/736x/e6/a6/cc/e6a6ccf08c38edd428e13fe317f978af.jpg"
              alt="Workspace setup"
              className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
            />

            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex items-center gap-3 text-white/80 backdrop-blur-md bg-black/30 w-fit px-4 py-2 rounded-full border border-white/10">
                <Coffee size={18} />
                <span className="text-sm font-medium">
                  Impulsado por la creatividad
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
