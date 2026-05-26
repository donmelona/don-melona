import { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, isVisible, onClose }: ToastProps) {

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 z-[200] px-4 w-full max-w-sm animate-in slide-in-from-bottom-8 fade-in duration-300">
      <div className="bg-gray-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl shadow-black/20 flex items-center justify-between gap-3 border border-gray-800">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-brand-primary" />
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors active:scale-90 p-1"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}