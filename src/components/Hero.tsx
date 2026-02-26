import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, Github, Linkedin, Instagram } from "lucide-react";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-black text-white px-6 w-full pt-20"
    >
      {/* Background with subtle grid and glow (Dark Theme adaptation of the light reference) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      ></div>

      <div className="container mx-auto max-w-5xl z-10 w-full mt-10 md:mt-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Left Column: Avatar Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] flex-shrink-0 will-change-transform will-change-opacity"
          >
            {/* Glowing Orbs behind the avatar (grayscale) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-zinc-700/20 rounded-full blur-[60px] md:blur-[80px] -z-10"></div>

            <div className="relative aspect-square rounded-full p-2 border border-white/10 bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/50 group">
              <img
                src="../public/Profile.jpeg"
                alt="Bastian Alessandro"
                className="w-full h-full object-cover rounded-full filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105 will-change-transform"
              />
              {/* Inner subtle glow ring */}
              <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center md:items-start text-center md:text-left w-full will-change-transform will-change-opacity"
          >
            {/* Overline / Welcome Text */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-xs md:text-sm tracking-[0.2em] font-medium text-zinc-400 uppercase">
                Bienvenido a mi portafolio
              </span>
            </motion.div>

            {/* Main Name Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-white"
            >
              Bastian Alessandro.
            </motion.h1>

            {/* Role Heading with Gradient */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-linear-to-r from-zinc-300 via-zinc-400 to-zinc-600"
            >
              Desarrollador Frontend
            </motion.h2>

            {/* Brief Bio */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-zinc-400 mb-6 max-w-lg font-light leading-relaxed"
            >
              Especializado en React, TypeScript y Tailwind CSS. Construyo
              interfaces modernas, accesibles y de alto rendimiento.
            </motion.p>

            {/* Location & Availability */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-8 text-sm text-zinc-500 font-medium"
            >
              <div className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
              </div>
              <MapPin size={16} className="text-zinc-600 hidden" />
              <span>México · Disponible para trabajo remoto</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8"
            >
              <a
                href="#projects"
                className="group px-8 py-3 bg-white text-black rounded-xl font-medium inline-flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all duration-300 shadow-lg shadow-white/5 w-full sm:w-auto"
              >
                Ver Proyectos
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-transparent text-zinc-300 border border-zinc-700 rounded-xl font-medium hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-all duration-300 w-full sm:w-auto justify-center text-center"
              >
                Contactar
              </a>
            </motion.div>

            {/* Social Icons (Animated) */}
            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                {
                  icon: Github,
                  href: "https://github.com/Galapan",
                  label: "GitHub",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/g4lapan/",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/bastian-alessandro-s%C3%A1nchez-gallegos-882985282/",
                  label: "LinkedIn",
                },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    whileHover={{ y: -5 }}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-zinc-900 text-white border border-zinc-800 rounded-full hover:bg-white hover:text-black transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
