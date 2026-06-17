import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const validateField = (
    name: FieldName,
    value: string,
  ): string | undefined => {
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
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = e.target.name as FieldName;
    const error = validateField(name, e.target.value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    setStatus("submitting");
    formData.append("access_key", "577dba99-a48a-4dc9-ae34-22d7743d9008");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const inputClass = (hasError: boolean) =>
    `bg-white/5 backdrop-blur-md border rounded-2xl px-4 py-2.5 md:px-5 md:py-3 text-white focus:outline-none focus:ring-2 transition-all text-sm md:text-base ${
      hasError
        ? "border-red-500/70 focus:ring-red-500/30 focus:border-red-500 focus:bg-red-500/5"
        : "border-white/10 focus:ring-white/30 focus:border-white focus:bg-white/10"
    }`;

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center py-16 md:py-24 bg-zinc-950 text-white relative scroll-mt-20"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
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
          </motion.div>

          {/* Minimal Contact Form */}
          <motion.form
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-8 rounded-3xl flex flex-col gap-2 md:gap-4 transform-gpu"
            onSubmit={handleSubmit}
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1 md:gap-2"
            >
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
              <AnimatePresence>
                {errors.name && (
                  <motion.span
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-xs text-red-400 ml-2 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={12} /> {errors.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1 md:gap-2"
            >
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
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-xs text-red-400 ml-2 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={12} /> {errors.email}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-1 md:gap-2 grow"
            >
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
              <AnimatePresence>
                {errors.message && (
                  <motion.span
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="text-xs text-red-400 ml-2 flex items-center gap-1"
                    role="alert"
                  >
                    <AlertCircle size={12} /> {errors.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileTap={status !== "submitting" ? { scale: 0.98 } : undefined}
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="mt-2 md:mt-4 w-full group py-3 md:py-4 px-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 hover:border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
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
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
