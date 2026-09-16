import { cn } from "@/lib/utils"
import { surface } from "@/lib/design-tokens"

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: "div" | "article" | "section"
}

export function Surface({ className, as: Component = "div", ...props }: SurfaceProps) {
    return (
        <Component
            className={cn(surface, "rounded-md", className)}
            {...props}
        />
    )
}
