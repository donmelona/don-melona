import React from 'react';
import { useCart } from '../context/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Utensils, ShoppingCart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalItems } = useCart();

  const isMenu = location.pathname === '/' || location.pathname === '/builder';
  const isCart = location.pathname === '/cart';

  return (
    <div className="mx-auto min-h-screen w-full md:max-w-md bg-brand-bg flex flex-col relative md:shadow-2xl md:border-x md:border-gray-200">
      
      <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-md p-4 border-b border-gray-100 flex items-center justify-between shadow-sm">
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="Don Melona Logo" 
            className="h-15 w-auto object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="leading-tight">
            <h1 className="text-xl font-black tracking-tight text-brand-primary uppercase">
              Don Melona
            </h1>
            <p className="text-[10px] text-brand-text/50 font-bold uppercase tracking-wider">
              Donde el chef eres tú
            </p>
          </div>
        </div>
        <div className="bg-brand-accent/10 text-brand-accent text-xs font-bold px-3 py-1 rounded-full animate-pulse border border-brand-accent/20">
          Abierto
        </div>
      </header>

      <main className="flex-1 p-4 pb-28">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full md:max-w-md bg-white/90 backdrop-blur-md h-16 flex items-center justify-around z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-gray-100">

        <button 
          onClick={() => navigate('/')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-all duration-200 active:scale-95
            ${isMenu 
              ? 'text-brand-primary font-black' 
              : 'text-gray-400 hover:text-brand-text font-medium'
            }`}
        >
          <Utensils 
            size={20} 
            strokeWidth={isMenu ? 3 : 2} 
            className={`transition-transform ${isMenu ? 'scale-110' : ''}`}
          />
          <span className="text-[11px] tracking-tight">Menú</span>
        </button>
        
        <div className="w-px h-6 bg-gray-200/60"></div>
        
        <button 
          onClick={() => navigate('/cart')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full relative transition-all duration-200 active:scale-95
            ${isCart 
              ? 'text-brand-primary font-black' 
              : 'text-gray-400 hover:text-brand-text font-medium'
            }`}
        >
          {totalItems >= 0 && (
            <div className={`absolute top-1.5 right-[33%] text-[10px] font-black h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center shadow-sm border transition-all duration-300
              ${totalItems > 0 
                ? 'bg-brand-primary text-white border-brand-primary animate-bounce' 
                : 'bg-gray-100 text-gray-400 border-gray-200'
              }`}
          >
            {totalItems}
          </div>
          )}

          <ShoppingCart 
            size={20} 
            strokeWidth={isCart ? 3 : 2} 
            className={`transition-transform ${isCart ? 'scale-110' : ''}`}
          />
          <span className="text-[11px] tracking-tight">Carrito</span>
        </button>

      </nav>
    </div>
  );
}