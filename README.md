# 🚀 Mi Portafolio Profesional

¡Bienvenido al repositorio de mi portafolio personal! Este proyecto muestra mi trabajo, habilidades y experiencia como desarrollador, construido con tecnologías web modernas enfocadas en el rendimiento, la accesibilidad y el diseño.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes herramientas:

- **[React 19](https://react.dev/)** - Biblioteca principal para la interfaz de usuario.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para un código más robusto y mantenible.
- **[Vite](https://vitejs.dev/)** - Entorno de desarrollo ultrarrápido y empaquetador eficiente.
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS de utilidad para un diseño ágil, moderno y responsivo.
- **[Framer Motion](https://www.framer.com/motion/)** - Biblioteca de animaciones para crear transiciones fluidas e interacciones dinámicas.

## ✨ Características Principales

- **Diseño Responsivo:** Completamente adaptable a cualquier tamaño de pantalla (móvil, tablet, escritorio).
- **Animaciones Suaves:** Transiciones de página y micro-interacciones utilizando Framer Motion para una experiencia premium.
- **Rendimiento Optimizado:** Uso de Vite y React 19 para asegurar tiempos de carga rápidos.
- **Modo Oscuro/Claro:** (Si aplica) Soporte para temas según la preferencia del usuario.
- **Secciones Detalladas:**
  - **Inicio (Hero):** Presentación impactante y clara.
  - **Sobre Mí:** Detalles sobre mi trayectoria y enfoque profesional.
  - **Proyectos:** Galería de trabajos recientes con demostraciones en vivo y código fuente.
  - **Habilidades:** Conocimientos técnicos y herramientas que domino.
  - **Contacto:** Formulario y enlaces a mis redes profesionales (LinkedIn, GitHub, etc.).

## 🚀 Instalación y Uso Local

Si deseas clonar y ejecutar este proyecto de forma local, sigue estos pasos:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. **Navegar al directorio del proyecto:**

   ```bash
   cd Portfolio-project
   ```

3. **Instalar las dependencias:**

   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   Visita `http://localhost:5173` para ver el portafolio en acción.

## 🏗️ Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación optimizada para producción.
- `npm run preview`: Sirve localmente la carpeta `dist` para probar la versión de producción.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y asegurar el estilo.

## 📬 Contacto

Si te ha interesado mi trabajo o tienes alguna pregunta, no dudes en conectar conmigo:

- **LinkedIn:** [Tu Perfil de LinkedIn](#)
- **Email:** [tu-correo@ejemplo.com](mailto:tu-correo@ejemplo.com)

---

## Renderizado de efectos y rendimiento

React mantiene el contenido y la navegación en HTML; Three.js renderiza los halos
decorativos de Inicio y Tecnologías en un único lienzo WebGL2. Se carga en un
fragmento separado después de la entrada inicial. No reemplaza el renderizado del
formulario ni de los textos. Three.js añade aproximadamente 129 kB comprimidos (gzip)
a esa descarga diferida; es un coste adicional de usar WebGL para estos efectos.

- Renderizado bajo demanda: scroll, cambios de tamaño o carga de imágenes.
- Sin bucle de dibujo permanente; pausa cuando la pestaña está oculta.
- Máximo de un millón de píxeles y escala adaptativa si se acumulan frames lentos.
- Fondo CSS con movimiento reducido, sin WebGL2 o durante una pérdida de contexto.
- Liberación de geometría, materiales, contexto, eventos y observadores al desmontar.
- El navbar solo recibe cambios de sección/umbral, no cada píxel del scroll.
- El menú anima opacidad y transformaciones; el desenfoque mantiene un radio fijo.

### Medir en el dispositivo objetivo

Con `npm run dev`, abrir `http://localhost:5173/?perf`. Los botones **Medir scroll**
y **Medir menu** (este último en tamaño móvil) registran durante ocho segundos la
cadencia de `requestAnimationFrame`, el percentil 95 y los intervalos mayores de
25 ms. El panel solo existe en desarrollo; no se incluye en producción. Mantener
la pestaña visible y esperar la carga inicial antes de medir. **Simular pérdida
WebGL** permite comprobar el fondo CSS y restaura el contexto cinco segundos después.

Es una comprobación de cadencia del navegador, no una medición del tiempo de GPU
ni una garantía de 60 FPS. Para validar la entrega, repetir en la compilación de
producción con Performance de DevTools, en móviles reales y equipos de gama
baja. La meta es acercarse a 16,7 ms por frame durante las interacciones en una
pantalla de 60 Hz; hardware, batería, carga y frecuencia de pantalla influyen.

Comprobación local (2026-09-15, navegador integrado, viewport 390 × 844,
servidor de desarrollo, sin limitación de CPU): scroll con p95 de 5,7 ms y
0/1396 intervalos mayores de 25 ms; menú con p95 de 5,7 ms y 0/1365 intervalos
mayores de 25 ms. Se verificó también la pérdida/restauración de WebGL y la
activación del fondo CSS. Estas cifras describen esa ejecución local, no el
rendimiento de un teléfono ni una comparación con la versión anterior.
