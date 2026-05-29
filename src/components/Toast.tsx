import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, Minus } from 'lucide-react';

export type ToastVariant = 'success' | 'remove';

const EXIT_MS = 280;

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  duration: number;
  elevated?: boolean;
  onClose: () => void;
}

function parseMessage(message: string) {
  const parts = message.split(' — ');
  if (parts.length >= 2) {
    return { title: parts[0], detail: parts.slice(1).join(' — ') };
  }
  return { title: message, detail: null as string | null };
}

export function Toast({ message, variant = 'success', duration, elevated = false, onClose }: ToastProps) {
  const isRemove = variant === 'remove';
  const { title, detail } = parseMessage(message);
  const [visible, setVisible] = useState(false);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const dismiss = useCallback(() => {
    setVisible(false);
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 16);
    const autoDismissTimer = setTimeout(dismiss, duration);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(autoDismissTimer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [duration, dismiss]);

  return (
    <div
      className={`toast-host${elevated ? ' toast-host--elevated' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <button
        type="button"
        onClick={dismiss}
        className={`toast-snackbar toast-snackbar--${variant} ${visible ? 'toast-snackbar--visible' : ''}`}
      >
        <div className="toast-snackbar__accent" aria-hidden="true" />

        <div className={`toast-snackbar__icon ${isRemove ? 'toast-snackbar__icon--remove' : ''}`}>
          {isRemove ? <Minus size={16} strokeWidth={3} /> : <Check size={16} strokeWidth={3} />}
        </div>

        <div className="toast-snackbar__body">
          <span className="toast-snackbar__label">
            {isRemove ? 'Eliminado' : 'Listo'}
          </span>
          <p className="toast-snackbar__title">{title}</p>
          {detail && <p className="toast-snackbar__detail">{detail}</p>}
        </div>

        <div className="toast-snackbar__progress-track" aria-hidden="true">
          <div
            className="toast-snackbar__progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </button>
    </div>
  );
}
