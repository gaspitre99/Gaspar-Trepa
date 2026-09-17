import { cn } from "@/lib/utils"
import { eyebrow, hairline } from "@/lib/design-tokens"

interface PageHeaderProps {
    label?: string
    title: string
    action?: React.ReactNode
    className?: string
}

export function PageHeader({ label, title, action, className }: PageHeaderProps) {
    return (
        <div className={cn("flex items-end justify-between pb-6 border-b", hairline, className)}>
            <div className="space-y-1">
                {label && <p className={eyebrow}>{label}</p>}
                <h1 className="text-3xl font-serif text-slate-900 dark:text-slate-100">{title}</h1>
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}
