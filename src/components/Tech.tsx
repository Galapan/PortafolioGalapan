import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, stagger, utils } from "animejs";
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
  enterOnScroll,
  hoverPop,
  prefersReducedMotion,
  scrub,
  useScope,
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
  const [displayedTab, setDisplayedTab] = useState(techCategories[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const pillPositioned = useRef(false);
  const switching = useRef(false);
  const prevTabRef = useRef(techCategories[0].id);

  const displayedCategory =
    techCategories.find((c) => c.id === displayedTab) || techCategories[0];

  const maxSkills = Math.max(...techCategories.map((c) => c.skills.length));
  const rowsForColumns = (cols: number) => Math.ceil(maxSkills / cols);
  const rowHeightRem = 5.5;
  const rowGapRem = 1;
  const mobileHeight = `${rowsForColumns(2) * rowHeightRem + Math.max(rowsForColumns(2) - 1, 0) * rowGapRem}rem`;
  const desktopHeight = `${rowsForColumns(3) * rowHeightRem + Math.max(rowsForColumns(3) - 1, 0) * rowGapRem}rem`;

  useScope(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;

    enterOnScroll(section.querySelector("[data-anim-heading]"), {
      offset: 50,
      duration: 800,
    });
    enterOnScroll(section.querySelector("[data-anim-tabs]"), {
      offset: 30,
      duration: 600,
      delay: 100,
    });
    enterOnScroll(section.querySelector("[data-anim-grid]"), {
      offset: 30,
      duration: 400,
    });

    const grid = section.querySelector("[data-anim-grid]");
    if (grid) {
      enterOnScroll(section.querySelectorAll("[data-card]"), {
        scrollTarget: grid,
        staggerDelay: 40,
        offset: 24,
        duration: 500,
      });
    }

    const watermarkScroll = section.querySelector(
      "[data-tech-watermark-scroll]",
    );
    if (watermarkScroll) {
      scrub(
        watermarkScroll,
        {
          y: [-24, 24],
        },
        { scrollTarget: section, sync: true },
      );
    }

    const glow = section.querySelector("[data-tech-glow]");
    if (glow) {
      scrub(glow, { y: [-56, 56] }, { scrollTarget: section, sync: true });
    }
  });

  useLayoutEffect(() => {
    const positionPill = (animateIt: boolean) => {
      const tabsEl = tabsRef.current;
      const pillEl = pillRef.current;
      if (!tabsEl || !pillEl) return;
      const btn = tabsEl.querySelector<HTMLElement>(
        `[data-tab="${activeTab}"]`,
      );
      if (!btn) return;
      const pos = {
        left: btn.offsetLeft,
        top: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
      };
      if (animateIt && !prefersReducedMotion()) {
        animate(pillEl, { ...pos, duration: 300, ease: "outExpo" });
      } else {
        utils.set(pillEl, { ...pos, opacity: 1 });
      }
    };

    positionPill(pillPositioned.current);
    pillPositioned.current = true;
    const onResize = () => positionPill(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab]);

  useEffect(() => {
    const wm = watermarkRef.current;
    if (!wm) return;
    if (prefersReducedMotion()) {
      utils.set(wm, { opacity: 0.08, scale: 1, rotate: 0 });
      return;
    }
    animate(wm, {
      opacity: [0, 0.08],
      scale: [0.72, 1],
      rotate: [-14, 0],
      duration: 500,
      ease: "outExpo",
    });
  }, [displayedCategory.icon]);

  useEffect(() => {
    const grid = gridRef.current;
    const cards = grid?.querySelectorAll("[data-card]");
    if (!grid || !cards || cards.length === 0) return;
    const cardCleanup = hoverPop(cards, {
      scale: 1.03,
      y: -4,
    });

    const isInitialRender = prevTabRef.current === displayedTab;
    prevTabRef.current = displayedTab;
    if (isInitialRender) return cardCleanup;

    utils.set(cards, { opacity: 0, scale: 0.95, y: 12 });
    animate(cards, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: prefersReducedMotion() ? 0 : 350,
      ease: "outExpo",
      delay: prefersReducedMotion() ? 0 : stagger(24),
    });
    return cardCleanup;
  }, [displayedTab]);

  useEffect(() => {
    const grid = gridRef.current;
    const icons = grid?.querySelectorAll("[data-card-icon]");
    if (!icons || icons.length === 0) return;
    return hoverPop(icons, { scale: 1.15 });
  }, [displayedTab]);

  const handleTabChange = (id: string) => {
    if (id === activeTab || switching.current) return;
    switching.current = true;
    setActiveTab(id);
    const grid = gridRef.current;
    const cards = grid?.querySelectorAll("[data-card]");
    if (!grid || !cards || cards.length === 0) {
      setDisplayedTab(id);
      switching.current = false;
      return;
    }
    animate(cards, {
      opacity: 0,
      scale: 0.95,
      duration: prefersReducedMotion() ? 0 : 150,
      ease: "inQuad",
      delay: stagger(15, { from: "last" }),
      onComplete: () => {
        setDisplayedTab(id);
        switching.current = false;
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="tech"
      className="min-h-screen flex flex-col justify-center py-24 bg-zinc-950 text-white relative overflow-hidden scroll-mt-20"
    >
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
        <div
          data-tech-glow
          className="w-full max-w-4xl h-96 bg-zinc-900/20 rounded-full blur-[100px] transform-gpu"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div
          data-anim-heading
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Habilidades{" "}
            <span className="text-zinc-500">y Tecnologías.</span>
          </h2>
          <div className="w-20 h-1 bg-white rounded-full" />
        </div>

        <div
          ref={tabsRef}
          data-anim-tabs
          className="relative flex flex-wrap justify-center gap-3 mb-8"
        >
          <span
            ref={pillRef}
            className="absolute left-0 top-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] opacity-0 pointer-events-none"
          />
          {techCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeTab === category.id;

            return (
              <button
                key={category.id}
                data-tab={category.id}
                onClick={() => handleTabChange(category.id)}
                className={cn(
                  "relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 border cursor-pointer",
                  isActive
                    ? "border-transparent text-black"
                    : "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800",
                )}
              >
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
        </div>

        <div
          ref={gridRef}
          data-anim-grid
          className="relative flex flex-col justify-start"
          style={{ minHeight: mobileHeight }}
        >
          <style>{`@media (min-width: 768px) { [data-anim-grid] { min-height: ${desktopHeight} !important; } }`}</style>
          <div
            data-tech-watermark-scroll
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transform-gpu"
          >
            <div
              ref={watermarkRef}
              className="flex items-center justify-center opacity-0"
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
            </div>
          </div>

          <div className="relative z-10 w-full grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayedCategory.skills.map((skill) => (
              <div
                key={skill.name}
                data-card
                className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:border-zinc-600 hover:bg-zinc-800/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-[color,background-color,border-color,box-shadow] duration-200 cursor-default"
              >
                <span className="flex-shrink-0" data-card-icon>
                  <skill.Icon className="text-xl sm:text-2xl text-zinc-300 group-hover:text-white transition-colors" />
                </span>
                <span className="text-xs sm:text-base text-zinc-200 font-medium text-center tracking-wide drop-shadow-md">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
