"use client";

/**
 * Drop-in replacement for a plain `<button type="submit">` inside a
 * server-action `<form>` — blocks the submit with a native confirm()
 * dialog first. Used for destructive actions (delete) across the admin
 * panel so a stray click can't silently remove data.
 */
export function ConfirmSubmitButton({
  confirmMessage,
  className,
  children,
}: {
  confirmMessage: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
