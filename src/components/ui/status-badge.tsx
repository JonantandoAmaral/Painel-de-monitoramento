import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-smooth",
  {
    variants: {
      variant: {
        normal: "bg-status-normal text-status-normal-foreground",
        warning: "bg-status-warning text-status-warning-foreground",
        danger: "bg-status-danger text-status-danger-foreground",
      },
    },
    defaultVariants: {
      variant: "normal",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {
  children: React.ReactNode;
}

const StatusBadge = ({ className, variant, children, ...props }: StatusBadgeProps) => {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {children}
    </div>
  );
};

export { StatusBadge, statusBadgeVariants };