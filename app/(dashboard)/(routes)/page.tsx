import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="text-xl text-emerald-600">Panel</h1>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
