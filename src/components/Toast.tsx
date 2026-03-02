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
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2000] px-6 py-3 rounded-full text-sm font-medium shadow-lg transition-all ${
        type === "error"
          ? "bg-destructive text-destructive-foreground"
          : "bg-foreground/85 text-background"
      }`}
      style={{ animation: "fade-in-up 0.2s ease-out" }}
    >
      {message}
    </div>
  );
};

export default Toast;
