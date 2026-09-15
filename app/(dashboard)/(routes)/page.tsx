export const dynamic = "force-dynamic";
import { UserButton } from "@clerk/nextjs";
import CalculadoraInflacion from "@/components/calculadora-inflacion";
import PortfolioRoulette from "@/components/portfolio-roulette";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Panel</h1>
        <UserButton afterSignOutUrl="/"/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <PortfolioRoulette />
        <CalculadoraInflacion />
      </div>
    </div>
  )
}
