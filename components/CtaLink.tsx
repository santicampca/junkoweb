import Link from "next/link";
import { cx } from "@/lib/utils";

interface CtaLinkProps {
  href: string;
  children: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  className?: string;
}

/**
 * The one place every call-to-action link is built, so the arrow and
 * its hover motion stay consistent everywhere instead of being
 * hand-rolled per section.
 */
export function CtaLink({ href, children, variant = "primary", size = "md", className }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cx(
        variant === "primary" ? "btn-primary" : "btn-outline",
        "group",
        size === "lg" && "px-10 py-4 text-base",
        className
      )}
    >
      <span>{children}</span>
      <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
