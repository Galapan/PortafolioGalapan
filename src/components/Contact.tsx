import { motion } from "framer-motion";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "577dba99-a48a-4dc9-ae34-22d7743d9008");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="contact"
      className="py-24 bg-zinc-950 text-white relative border-t border-zinc-900"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full will-change-transform will-change-opacity"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Deja tu<span className="text-zinc-500"> mensaje.</span>
              </h2>
              <div className="w-20 h-1 bg-white rounded-full mb-8"></div>
              <p className="text-xl text-zinc-400 mb-12 max-w-md font-light leading-relaxed">
                Estoy disponible para nuevos proyectos y oportunidades.
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-8">
              <a
                href="mailto:hello@example.com"
                className="group flex flex-col items-start hover:text-white transition-colors text-zinc-400"
              >
                <span className="text-sm uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
                  <Mail size={16} /> Email
                </span>
                <span className="text-2xl md:text-3xl font-medium border-b border-transparent group-hover:border-white transition-colors pb-1">
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
            viewport={{ once: true, margin: "-100px" }}
            className="bg-black border border-zinc-800 p-8 md:p-12 rounded-3xl flex flex-col gap-6 will-change-transform will-change-opacity"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-medium mb-6">Envia un mensaje</h3>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-400 ml-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                placeholder="Nombre..."
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-400 ml-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all"
                placeholder="correo@ejemplo.com"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 grow"
            >
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-400 ml-2"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white transition-all resize-none"
                placeholder="Hola..."
              ></textarea>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileTap={status !== "submitting" ? { scale: 0.98 } : undefined}
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className="mt-4 w-full group py-4 px-6 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={20} className="text-green-600" />
                  <span>¡Enviado!</span>
                </>
              ) : status === "error" ? (
                <span>Hubo un error, reintentar</span>
              ) : (
                <>
                  <span>Enviar</span>
                  <ArrowRight
                    size={20}
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
