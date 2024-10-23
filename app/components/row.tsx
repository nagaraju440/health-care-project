import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

const Row = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-row", className)} {...props}>
      {children}
    </div>
  )
);
Row.displayName = "Row";

export { Row };
