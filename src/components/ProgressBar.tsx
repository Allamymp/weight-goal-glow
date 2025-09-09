import { cn } from "@/lib/utils";

interface ProgressBarProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  variant?: "default" | "success" | "warning" | "info";
  className?: string;
}

export function ProgressBar({
  title,
  current,
  target,
  unit,
  variant = "default",
  className,
}: ProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isCompleted = current >= target;

  const variantStyles = {
    default: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-sm text-muted-foreground">
          {current.toLocaleString()}/{target.toLocaleString()} {unit}
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-700 ease-out rounded-full",
              variantStyles[variant],
              isCompleted && "animate-pulse"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs">
          <span
            className={cn(
              "font-medium",
              isCompleted ? "text-success" : "text-muted-foreground"
            )}
          >
            {percentage.toFixed(1)}% completo
          </span>
          {isCompleted && (
            <span className="text-success font-medium">✓ Meta atingida!</span>
          )}
        </div>
      </div>
    </div>
  );
}