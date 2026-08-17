import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "explore" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark",
  accent:
    "bg-accent text-white hover:bg-accent-dark rounded-xl",
  explore:
    "bg-white text-ink shadow-[0_4px_16px_rgba(20,17,15,0.08)] hover:shadow-[0_6px_20px_rgba(20,17,15,0.12)] transition-all duration-200",
  outline:
    "border border-line bg-white text-ink hover:border-brand/30 hover:bg-brand-tint/50",
  ghost: "text-ink hover:bg-black/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-sm",
  lg: "h-13 gap-2.5 px-7 text-[15px]",
};

const baseStyles =
  "inline-flex shrink-0 items-center justify-center rounded font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.98]";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
