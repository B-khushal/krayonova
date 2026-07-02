"use client";

import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};

type ToastContextType = {
  toast: (type: ToastType, message: string, duration?: number) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback for components not wrapped in ToastProvider
    return {
      toast: (_type: ToastType, message: string) => alert(message),
      success: (message: string) => alert(message),
      error: (message: string) => alert(message),
      info: (message: string) => alert(message),
      warning: (message: string) => alert(message),
    };
  }
  return context;
}

const icons: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colors: Record<ToastType, string> = {
  success: "border-success/20 bg-success-muted text-success",
  error: "border-danger/20 bg-danger-muted text-danger",
  info: "border-info/20 bg-info-muted text-info",
  warning: "border-warning/20 bg-warning-muted text-warning",
};

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false);
  const Icon = icons[t.type];

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(t.id), 200);
    }, t.duration || 4000);
    return () => clearTimeout(timer);
  }, [t, onDismiss]);

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg transition-all duration-200 ${
        colors[t.type]
      } ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
      style={{ minWidth: "280px", maxWidth: "400px" }}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <p className="text-sm font-medium flex-1">{t.message}</p>
      <button onClick={() => { setVisible(false); setTimeout(() => onDismiss(t.id), 200); }} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, duration = 4000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, type, message, duration }]);
  }, []);

  const value: ToastContextType = {
    toast: addToast,
    success: useCallback((msg: string) => addToast("success", msg), [addToast]),
    error: useCallback((msg: string) => addToast("error", msg), [addToast]),
    info: useCallback((msg: string) => addToast("info", msg), [addToast]),
    warning: useCallback((msg: string) => addToast("warning", msg), [addToast]),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 items-end pointer-events-auto">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
