import { cn } from "@/lib/utils"
import { eyebrow, surface } from "@/lib/design-tokens"

interface EmptyStateProps {
    title: string
    description?: string
    action?: React.ReactNode
    className?: string
    eyebrowText?: string
}

export function EmptyState({ title, description, action, className, eyebrowText = "Empty" }: EmptyStateProps) {
    return (
        <div className={cn(
            surface,
            "p-5 border-dashed rounded-md flex flex-col items-start gap-3",
            className
        )}>
            <div className="flex flex-col gap-1">
                <span className={eyebrow}>{eyebrowText}</span>
                <h3 className="font-serif text-lg text-zinc-900 dark:text-zinc-100">{title}</h3>
                {description && (
                    <p className="text-sm text-zinc-500 font-sans">{description}</p>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}
