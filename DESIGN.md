# LMS Design Rules

Este documento establece las reglas estrictas de UI/UX para mantener la consistencia y el profesionalismo de la plataforma. **Estas reglas deben ser aplicadas rigurosamente en cada nuevo componente o refactorización.**

## 1. Sistema Tipográfico ("Financial Press")
- **Newsreader (Serif):** Exclusivo para encabezados principales.
- **Inter (Sans-Serif):** Para cuerpo de texto y números en prosa (ej. "Tienes 3 lecciones pendientes").
- **JetBrains Mono (Tabular):** Exclusivo para números que se comparan en columna o que cambian en el tiempo: métricas, precios, duraciones, porcentajes, timestamps.

## 2. Paleta de Colores y Formas
- **Fondos/Superficies:** Neutros, usando la escala `slate` (`white` / `slate-900` para componentes, `slate-50` / `slate-950` para fondo global). Las superficies siempre deben tener el token `surface`.
- **Bordes:** En una estética financiera, no usamos sombras para destacar. Usamos líneas finas (`hairline`). Bordes sutiles (`slate-200` light / `slate-800` dark). Excepción: Imágenes Hero pueden usar una sombra sutil (`shadow-sm`).
- **Acento Primario (Azul):** El color azul profundo (`blue-700` light / `blue-600` dark) se usa EXCLUSIVAMENTE para botones primarios, estados activos o el logo.
- **Semántica:** Colores vibrantes (verde/rojo) reservados exclusivamente para variaciones numéricas (ganancias, pérdidas, éxito, error).
- **Links:** Se utiliza jerarquía por peso, no por color. `underline underline-offset-4 decoration-slate-300 hover:decoration-slate-900`.

## 3. Escala de Espaciado (Restringida)
Solo se permiten estos tres niveles de espaciado macro:
- **Contenedor de página:** `px-6 py-8` (Móvil) / `px-10 py-12` (Desktop).
- **Interior de tarjeta (Surface):** `p-5`.
- **Separación de bloques:** `space-y-8`.

## 4. Alineación Numérica
Toda columna de números debe usar `text-right tabular-nums`.

## 5. Estados Vacíos (Empty States)
Anatomía fija:
- `eyebrow` token.
- Frase en `Newsreader`.
- Línea de ayuda (Opcional).
- **Una** acción primaria.
- Borde punteado (`border-dashed`), alineado a la izquierda. NUNCA ilustraciones centradas de "pantalla vacía".

## 6. Animaciones / Microinteracciones
No dependemos de Framer Motion para el layout base, usamos CSS/Tailwind:
- `animate-enter` para entrada en grillas.
- Hover states afilan el borde (contraste), no escalan ni usan sombras (`hover:scale` o `shadow-xl` están prohibidos).
- `animate-fill` para barras de progreso (animando un origin-left).
