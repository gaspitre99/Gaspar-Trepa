import React from 'react';

export default function LegalDisclaimer() {
  return (
    <footer className="w-full bg-black border-t border-neutral-900 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="space-y-2.5 mb-6">
          <p className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-medium">
            Aviso Legal y de Responsabilidad Financiera
          </p>
          <p className="text-[11px] leading-relaxed text-neutral-500">
            La información, cotizaciones, tasas y herramientas interactivas exhibidas en este sitio tienen carácter estrictamente informativo y pedagógico. Ningún contenido aquí expuesto constituye una oferta, recomendación, invitación o asesoramiento financiero, impositivo o legal para la compra, venta o mantenimiento de activos o instrumentos financieros.
          </p>
          <p className="text-[11px] leading-relaxed text-neutral-500">
            Los cálculos proyectados (TNA, rendimientos reales y brechas cambiarias) son estimaciones teóricas que no garantizan resultados futuros. Los datos de mercado provienen de fuentes de terceros y pueden presentar demoras temporales o interrupciones. Cada usuario es exclusivamente responsable de sus decisiones de inversión.
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-600 gap-2">
          <p>© {new Date().getFullYear()} Hablemos de Economía. Todos los derechos reservados.</p>
          <p className="font-mono text-[10px] text-neutral-600">Fines pedagógicos y de simulación</p>
        </div>
      </div>
    </footer>
  );
}
