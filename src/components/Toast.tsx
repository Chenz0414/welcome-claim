import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  type?: "error" | "info";
}

const Toast = ({ message, visible, onHide, type = "info" }: ToastProps) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, 2500);
    return () => clearTimeout(timer);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[2000] flex items-center justify-center pointer-events-none`}
    >
      <div
        className={`px-6 py-3 rounded-full text-sm font-medium shadow-lg pointer-events-auto ${
          type === "error"
            ? "bg-destructive text-destructive-foreground"
            : "bg-foreground/85 text-background"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
