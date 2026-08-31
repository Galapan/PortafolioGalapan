import { useLayoutEffect, useRef, useState } from "react";
import { animate } from "animejs";
import {
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { enterOnScroll, prefersReducedMotion, useScope } from "../animations";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function validateField(name: FieldName, value: string): string | undefined {
  if (!value.trim()) {
    return "Este campo es obligatorio";
  }
  if (name === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Email no válido";
    }
  }
  if (name === "message" && value.trim().length < 10) {
    return "Mínimo 10 caracteres";
  }
  return undefined;
}

function inputClass(hasError: boolean) {
  return `bg-white/5 backdrop-blur-md border rounded-2xl px-4 py-2.5 md:px-5 md:py-3 text-white focus:outline-none focus:ring-2 transition-[background-color,border-color,box-shadow] text-sm md:text-base ${
    hasError
      ? "border-red-500/70 focus:ring-red-500/30 focus:border-red-500 focus:bg-red-500/5"
      : "border-white/10 focus:ring-white/30 focus:border-white focus:bg-white/10"
  }`;
}

function FieldError({ error }: { error?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const animation = error
      ? animate(el, {
          opacity: 1,
          y: 0,
          height: `${el.scrollHeight}px`,
          duration: prefersReducedMotion() ? 0 : 250,
          ease: "outQuad",
        })
      : animate(el, {
          opacity: 0,
          y: -4,
          height: 0,
          duration: prefersReducedMotion() ? 0 : 200,
          ease: "outQuad",
        });
    return () => {
      animation.revert();
    };
  }, [error]);

  return (
    <span
      ref={ref}
      className="flex h-0 overflow-hidden items-center gap-1 text-xs text-red-400 ml-2 opacity-0"
      role={error ? "alert" : undefined}
      aria-hidden={!error}
    >
      <AlertCircle size={12} /> {error}
    </span>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const submittingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  useScope(sectionRef, () => {
    const section = sectionRef.current;
    if (!section) return;
    enterOnScroll(section.querySelector("[data-anim-panel]"), {
      axis: "x",
      offset: -50,
      duration: 500,
    });
    enterOnScroll(section.querySelectorAll("[data-anim-item]"), {
      scrollTarget: section.querySelector("[data-anim-form]"),
      staggerDelay: 50,
      offset: 20,
      duration: 400,
    });
  });

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as FieldName;
    const error = validateField(name, e.target.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      submittingRef.current ||
      status === "submitting" ||
      status === "success"
    ) {
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newErrors: FieldErrors = {};
    (["name", "email", "message"] as FieldName[]).forEach((field) => {
      const value = (formData.get(field) as string) ?? "";
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    submittingRef.current = true;
    setStatus("submitting");
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        console.error("Web3Forms error:", data.message);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-zinc-950 text-white relative scroll-mt-20"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div
            data-anim-panel
            className="flex flex-col h-full justify-center transform-gpu"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 md:mb-6">
                Deja tu<span className="text-zinc-500"> mensaje.</span>
              </h2>
              <div className="w-16 md:w-20 h-1 bg-white rounded-full mb-4 md:mb-8"></div>
              <p className="text-base md:text-xl text-zinc-400 mb-6 md:mb-12 max-w-md font-light leading-relaxed">
                Estoy disponible para nuevos proyectos y oportunidades.
              </p>
            </div>

            <div className="mt-2 md:mt-auto flex flex-col gap-6 mb-6 lg:mb-0">
              <a
                href="mailto:bastian4le@gmail.com"
                className="group flex flex-col items-start hover:text-white transition-colors text-zinc-400"
              >
                <span className="text-sm uppercase tracking-widest font-semibold mb-1 md:mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email
                </span>
                <span className="text-base md:text-xl lg:text-2xl font-medium border-b border-transparent group-hover:border-white transition-colors pb-1">
                  bastian4le@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Minimal Contact Form */}
          <form
            data-anim-form
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-3xl flex flex-col gap-2 md:gap-4 transform-gpu"
            onSubmit={handleSubmit}
          >
            <div data-anim-item className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="name"
                className="text-xs md:text-sm font-medium text-zinc-400 ml-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                onBlur={handleBlur}
                aria-invalid={!!errors.name}
                className={inputClass(!!errors.name)}
                placeholder="Nombre..."
              />
              <FieldError error={errors.name} />
            </div>

            <div data-anim-item className="flex flex-col gap-1 md:gap-2">
              <label
                htmlFor="email"
                className="text-xs md:text-sm font-medium text-zinc-400 ml-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                className={inputClass(!!errors.email)}
                placeholder="correo@ejemplo.com"
              />
              <FieldError error={errors.email} />
            </div>

            <div data-anim-item className="flex flex-col gap-1 md:gap-2 grow">
              <label
                htmlFor="message"
                className="text-xs md:text-sm font-medium text-zinc-400 ml-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={1000}
                rows={3}
                onBlur={handleBlur}
                aria-invalid={!!errors.message}
                className={`${inputClass(!!errors.message)} resize-none`}
                placeholder="Hola..."
              ></textarea>
              <FieldError error={errors.message} />
            </div>

            <button
              data-anim-item
              type="submit"
              disabled={status === "submitting" || status === "success"}
            className="mt-2 md:mt-4 w-full group py-3 md:py-4 px-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 hover:border-white/40 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] transition-[background-color,border-color,box-shadow,opacity,transform] disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={18} className="text-green-600" />
                  <span>¡Enviado!</span>
                </>
              ) : status === "error" ? (
                <span>Hubo un error, reintentar</span>
              ) : (
                <>
                  <span>Enviar</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
