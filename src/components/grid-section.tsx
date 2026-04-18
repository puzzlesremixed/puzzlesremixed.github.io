import { cn } from "@/lib/utils";

export function GridSection({children, className}: { children?: React.ReactNode, className?: string }) {
  return (
    <section className={cn("py-4 px-8 border-b", className)}>
      {children}
    </section>)
}
