import { useRef, type MouseEvent } from "react";
import { animate } from "animejs";
import {
  ArrowRight,
  Github,
  Linkedin,
  Instagram,
  Download,
} from "lucide-react";
import {
  fadeUp,
  hoverPop,
  prefersReducedMotion,
  scrub,
  useScope,
} from "../animations";

const socials = [
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
    href: "https://www.linkedin.com/in/bastian4le",
    label: "LinkedIn",
  },
];

function handleScrollToSection(e: MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const targetId = href.replace("#", "");
  const elem = document.getElementById(targetId);
  if (elem) {
    elem.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useScope(sectionRef, () => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const avatar = section.querySelector("[data-hero-avatar]");
    if (avatar) {
      animate(avatar, {
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        ease: "outQuad",
      });
    }

    fadeUp(section.querySelectorAll("[data-anim-item]"), {
      staggerDelay: 150,
      delay: 200,
      offset: 20,
      duration: 600,
    });

    const avatarScroll = section.querySelector("[data-hero-avatar-scroll]");
    if (avatarScroll && isDesktop) {
      scrub(
        avatarScroll,
        { scale: [1, 0.95] },
        { scrollTarget: section, sync: true },
      );
    }

    const ctaCleanup = hoverPop(section.querySelectorAll("[data-hover-cta]"), {
      scale: 1.03,
      y: -2,
    });
    const socialCleanup = hoverPop(
      section.querySelectorAll("[data-hover-social]"),
      { scale: 1.15, y: -4 },
    );
    return () => {
      ctaCleanup();
      socialCleanup();
    };
  });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-zinc-950 text-white px-6 w-full pt-20 pb-12 md:pb-0 scroll-mt-20"
    >
      <div className="container mx-auto max-w-5xl z-10 w-full mt-10 md:mt-0">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
          {/* Left Column: Avatar Showcase */}
          <div
            data-hero-avatar
            className="relative -top-1 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] flex-shrink-0 transform-gpu"
          >
            {/* Glowing Orbs behind the avatar (grayscale) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-zinc-700/20 rounded-full blur-[60px] md:blur-[80px] -z-10"></div>

            <div
              data-hero-avatar-scroll
              className="relative aspect-square rounded-full p-2 border border-white/10 bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/50 group focus:outline-none cursor-default transform-gpu"
            >
              <img
                src="/Profile.jpeg"
                alt="Bastian Alessandro"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover rounded-full grayscale-0 md:grayscale md:group-hover:grayscale-0 md:group-focus:grayscale-0 transition-[filter,scale] duration-500 ease-out md:group-hover:scale-[1.03] md:group-focus:scale-[1.03]"
              />
              {/* Inner subtle glow ring */}
              <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none"></div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
            {/* Overline / Welcome Text */}
            <div data-anim-item className="mb-4">
              <span className="text-xs md:text-sm tracking-[0.2em] font-medium text-zinc-400 uppercase">
                Bienvenido a mi portafolio
              </span>
            </div>

            {/* Main Name Heading */}
            <h1
              data-anim-item
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2 text-white"
            >
              Bastian Alessandro.
            </h1>

            {/* Role Heading with Gradient */}
            <h2
              data-anim-item
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-linear-to-r from-zinc-300 via-zinc-400 to-zinc-600"
            >
              Desarrollador Frontend
            </h2>

            {/* Brief Bio */}
            <p
              data-anim-item
              className="text-base md:text-lg text-zinc-400 mb-6 max-w-lg font-light leading-relaxed"
            >
              Especializado en React, TypeScript y Tailwind CSS. Construyo
              interfaces modernas, accesibles y de alto rendimiento.
            </p>

            {/* Location & Availability */}
            <div
              data-anim-item
              className="flex items-center gap-2 mb-8 text-sm text-zinc-500 font-medium"
            >
              <div className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
              </div>
              <span>México · Disponible para trabajo remoto</span>
            </div>

            {/* CTAs */}
            <div
              data-anim-item
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8 flex-wrap"
            >
              <a
                data-hover-cta
                href="#projects"
                onClick={(e) => handleScrollToSection(e, "#projects")}
                className="group px-8 py-3 bg-white text-black rounded-xl font-medium inline-flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors duration-300 shadow-lg shadow-white/5 w-full sm:w-auto"
              >
                Ver Proyectos
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                data-hover-cta
                href="#contact"
                onClick={(e) => handleScrollToSection(e, "#contact")}
                className="px-6 py-3 bg-transparent text-zinc-300 border border-zinc-700 rounded-xl font-medium hover:text-white hover:border-zinc-500 hover:bg-zinc-800/50 transition-colors duration-300 w-full sm:w-auto justify-center text-center"
              >
                Contactar
              </a>
              <a
                data-hover-cta
                href="/SanchezGallegosBastianAlessandro_CV.pdf"
                download="SanchezGallegosBastianAlessandro_CV.pdf"
                className="group px-6 py-3 bg-zinc-800 text-white border border-zinc-700 rounded-xl font-medium inline-flex items-center justify-center gap-2 hover:bg-zinc-700 hover:border-zinc-500 transition-colors duration-300 w-full sm:w-auto"
              >
                Descargar CV
                <Download
                  size={16}
                  className="group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </div>

            {/* Social Icons (Animated) */}
            <div data-anim-item className="flex gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    data-hover-social
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 bg-zinc-900 text-white border border-zinc-800 rounded-full hover:bg-white hover:text-black transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
