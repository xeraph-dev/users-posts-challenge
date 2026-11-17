import { cn } from "cn"
import { Loader2Icon } from "lucide-react"
import { memo } from "react"

export const Spinner = memo(function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon data-slot="spinner" role="status" aria-label="Loading" className={cn("size-4 animate-spin", className)} {...props} />
  )
})
