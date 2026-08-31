import { useRef, useState } from "react";
import { Code2, Target, Sparkles } from "lucide-react";
import { enterOnScroll, scrub, useScope } from "../animations";

export default function AboutMe() {
  const [imageError, setImageError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useScope(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;
    enterOnScroll(section.querySelectorAll("[data-anim-item]"), {
      scrollTarget: section.querySelector("[data-anim-container]"),
      staggerDelay: 200,
      delay: 100,
      offset: 30,
      duration: 600,
      ease: "outQuad",
    });
    const image = section.querySelector("[data-about-image-parallax]");
    if (image) {
      scrub(
        image,
        { y: [-36, 36] },
        { scrollTarget: section, sync: true },
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col justify-center py-24 bg-zinc-950 text-white relative scroll-mt-20"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div
          data-anim-container
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            <div data-anim-item>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Sobre <span className="text-zinc-500">Mí.</span>
              </h2>
              <div className="w-20 h-1 bg-white rounded-full mb-8"></div>
            </div>

            <p
              data-anim-item
              className="text-zinc-400 text-lg leading-relaxed mb-6 font-light"
            >
              Soy un desarrollador apasionado por crear interfaces dinámicas,
              modernas y sumamente interactivas. Mi objetivo principal es
              transformar diseños complejos en código limpio, accesible y fácil
              de mantener.
            </p>
            <p
              data-anim-item
              className="text-zinc-400 text-lg leading-relaxed mb-8 font-light"
            >
              Me enfoco en los detalles: desde animaciones fluidas que mejoran
              la experiencia del usuario hasta la optimización del rendimiento
              en cada frame. Creo firmemente que un buen diseño debe ir
              acompañado de una ejecución técnica impecable.
            </p>

            <div
              data-anim-item
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
            </div>
          </div>

          {/* Aesthetic Element / Image */}
          <div
            data-anim-item
            className="w-full md:w-1/2 relative aspect-4/5 rounded-3xl overflow-hidden group transform-gpu"
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10"></div>
            {/* Using a sleek placeholder gradient/texture for now, could be replaced with a real aesthetic photo */}
            <div className="absolute inset-0 bg-zinc-900 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
            {!imageError && (
              <div
                data-about-image-parallax
                className="absolute inset-[-8%] transform-gpu"
              >
                <img
                  src="https://i.pinimg.com/736x/e6/a6/cc/e6a6ccf08c38edd428e13fe317f978af.jpg"
                  alt="Workspace setup"
                  loading="lazy"
                  decoding="async"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover grayscale-0 md:grayscale md:group-hover:grayscale-0 transition-[filter,scale] duration-500 ease-out scale-100 md:group-hover:scale-[1.03]"
                />
              </div>
            )}
            {imageError && (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
            )}

            <div className="absolute bottom-8 left-8 right-8 z-20">
              <div className="flex items-center gap-3 text-white backdrop-blur-3xl bg-white/5 w-fit px-6 py-3 rounded-full border border-white/20 shadow-[0_12px_40px_0_rgba(0,0,0,0.6)]">
                <Sparkles size={18} className="text-white animate-pulse" />
                <span className="text-sm font-bold tracking-wider">
                  Impulsado por la creatividad
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
