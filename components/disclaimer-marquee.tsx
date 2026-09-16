import React from 'react';

export default function DisclaimerMarquee() {
  // El texto legal. Agregamos un separador (ej: •) al final para que empalme bien.
  const disclaimer = "La información ha sido obtenida de fuentes consideradas confiables, pero no se garantiza su integridad ni su exactitud. El uso de los datos es estrictamente educativo y no constituye recomendación financiera ni impositiva. Copyright 2026. Todos los derechos reservados. • ";

  return (
    <div className="w-full overflow-hidden bg-white dark:bg-zinc-950 border-t border-b border-zinc-200 dark:border-zinc-800 py-1.5 flex relative z-40">
      {/*
        El contenedor que se anima.
        Se pausa si el usuario le pasa el mouse por encima (opcional pero recomendado)
      */}
      <div className="flex w-max whitespace-nowrap animate-marquee-text hover:[animation-play-state:paused]">

        {/* Bloque 1 */}
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans tracking-wide px-2">
          {disclaimer}
        </span>

        {/* Bloque 2 (Clon exacto para el loop infinito) */}
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans tracking-wide px-2" aria-hidden="true">
          {disclaimer}
        </span>

      </div>
    </div>
  );
}