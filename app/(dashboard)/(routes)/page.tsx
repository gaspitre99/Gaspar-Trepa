import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel Principal",
  description: "Tu panel de control de Hablemos de Economía. Accede a herramientas, calculadoras y análisis de mercado.",
};

export const dynamic = "force-dynamic";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="p-6 min-h-[80vh]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Inicio</h1>
        <UserButton afterSignOutUrl="/"/>
      </div>

      <div className="flex flex-col items-center justify-center mt-20 text-center space-y-4">
        <h2 className="text-2xl font-serif text-slate-700 dark:text-slate-300">Bienvenido a Hablemos de Economía</h2>
        <p className="text-slate-500 max-w-md">Utiliza el menú lateral para acceder a los artículos, herramientas y juegos educativos.</p>
      </div>
    </div>
  )
}
