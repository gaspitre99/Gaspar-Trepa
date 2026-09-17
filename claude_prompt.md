# Prompt para Claude Opus

**Instrucciones para el usuario:** Copia el siguiente texto y envíaselo a Claude Opus para obtener su feedback.

***

**Contexto del Proyecto:**
Estoy desarrollando una plataforma de gestión de aprendizaje (LMS) utilizando el siguiente stack tecnológico:
- Next.js 13 (App Router)
- Tailwind CSS para los estilos
- Prisma ORM
- Clerk para autenticación
- Radix UI para componentes accesibles

**Nuestro Sistema de Diseño Actual:**
- **Tipografía:** Utilizamos un estilo de "Prensa Financiera". 'Newsreader' para encabezados con serif, 'Inter' para el texto general sans-serif, y 'JetBrains_Mono' con 'tabular-nums' para todos los números, precios y porcentajes.
- **Paleta de Colores y Formas:** Fondos neutros (white / slate-900) con bordes definidos (rounded-sm o rounded-md). Los colores verde o rojo se reservan exclusivamente para variaciones numéricas (ej. ganancias/pérdidas).
- **Micro-etiquetas:** Utilizamos la clase utilitaria de Tailwind: `text-[11px] font-bold uppercase tracking-widest text-slate-500`.

**El Objetivo:**
Quiero dar un salto de calidad en la interfaz para que se vea **extremadamente profesional, limpia y minimalista**. Busco mejorar la "integridad visual" del sitio, lo que significa:
1. Eliminar cualquier inconsistencia de diseño o "bug visual" entre diferentes páginas.
2. Añadir y pulir **microinteracciones y animaciones sutiles** (usando Tailwind o Framer Motion si lo sugieres) que mejoren la experiencia del usuario sin sobrecargar visualmente.
3. Mantener una estética seria, elegante y de alta fidelidad, puliendo nuestras fortalezas actuales.

**Tu Tarea (Claude):**
1. **Lluvia de Ideas y Auditoría:** Basado en tu experiencia, ¿qué áreas críticas de un LMS (ej. Dashboard de estudiante, reproductor del curso, navegación, estado vacío, tarjetas de cursos) suelen carecer de consistencia o atención al detalle? ¿Qué propones mejorar?
2. **Propuestas Concretas:** Dame sugerencias específicas de UI/UX para elevar el profesionalismo de la plataforma respetando nuestras reglas de diseño (colores neutros, tipografías específicas, etc.).
3. **Microinteracciones:** Sugiéreme 3 o 4 microinteracciones clave (ej. hover states, transiciones de página, carga de componentes) junto con el código Tailwind o la lógica en React para implementarlas.
4. **Plan de Acción:** Enumera los pasos concretos que debería seguir un desarrollador (yo) para implementar estas mejoras de integridad visual y estética en el código.

Quiero que seas crítico y propongas ideas que realmente hagan que este LMS se destaque por su solidez y diseño exquisito.
