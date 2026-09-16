import React from 'react';

export default function LegalDisclaimer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-[#09090b] py-6 px-4 text-zinc-500">
      <div className="max-w-7xl mx-auto space-y-2 text-[11px] leading-relaxed">
        <p className="font-semibold uppercase tracking-wider text-zinc-400">
          Aviso Legal y de Responsabilidad Financiera
        </p>
        <p>
          La información, cotizaciones, tasas y herramientas interactivas exhibidas en este sitio tienen carácter estrictamente informativo y pedagógico. Ningún contenido aquí expuesto constituye una oferta, recomendación, invitación o asesoramiento financiero, impositivo o legal para la compra, venta o mantenimiento de instrumentos o activos financieros.
        </p>
        <p>
          Los cálculos proyectados (TNA, rendimientos reales y brechas cambiarias) son estimaciones teóricas que no garantizan resultados futuros. Los datos de mercado provienen de fuentes de terceros y pueden presentar demoras temporales o interrupciones. Cada usuario es exclusivamente responsable de sus decisiones de inversión.
        </p>
      </div>
    </footer>
  );
}
