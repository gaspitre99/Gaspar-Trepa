import { cn } from "@/lib/utils"

interface ProgressBarProps {
    value: number
    className?: string
}

export function ProgressBar({ value, className }: ProgressBarProps) {
    return (
        <div className={cn("h-1 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden rounded-sm", className)}>
            <div
                style={{ transform: `scaleX(${value / 100})` }}
                className="h-full origin-left animate-fill bg-zinc-400 dark:bg-zinc-600 transition-colors duration-200 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100"
            />
        </div>
    )
}
