import { memo, useEffect, useRef, useState } from 'react';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';

const ADD_HIGHLIGHT_MS = 250;

const CATEGORY_ICONS: Record<string, string> = {
  PICADAS: '🥗',
  CARNES: '🥩',
  BURROS: '🌯',
  HAMBURGUESAS: '🍔',
  PAPAS: '🍟',
  PERROS: '🌭',
  BEBIDAS: '🥤',
  OTRO: '🍽️'
};

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const { items } = useCart();
  const cartQuantity = items.find(i => i.cartItemId === product.id)?.quantity ?? 0;
  const inCart = cartQuantity > 0;

  const [imgError, setImgError] = useState(false);
  const [isAddHighlighted, setIsAddHighlighted] = useState(false);
  const highlightTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => {
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
  }, []);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddHighlighted(true);
    onAddToCart(product);
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);
    highlightTimeoutRef.current = setTimeout(() => setIsAddHighlighted(false), ADD_HIGHLIGHT_MS);
  };
  
  const hasPromo = product.promoPrice && product.promoPrice > 0;
  const displayPrice = hasPromo ? product.promoPrice! : product.price;
  const priceFormatted = displayPrice ? displayPrice.toLocaleString() : '0';
  const originalPriceFormatted = product.price ? product.price.toLocaleString() : '0';
  const isImageUrl = product.image?.startsWith('http://') || product.image?.startsWith('https://');
  const fallbackIcon = CATEGORY_ICONS[product.category] || CATEGORY_ICONS.OTRO;

  return (
    <div 
      onClick={() => onSelect(product)}
      className="bg-white p-4 rounded-2xl shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center gap-4 active:scale-[0.98] hover:shadow-md transition-[transform,box-shadow] cursor-pointer"
    >
      <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-gray-100 overflow-hidden flex-shrink-0 relative">
        {inCart && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-primary text-white text-[10px] font-black flex items-center justify-center shadow-sm border border-white z-10">
            {cartQuantity}
          </span>
        )}
        {isImageUrl && !imgError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <span role="img" aria-label={product.category} className="opacity-80">
            {fallbackIcon}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-black text-brand-text text-lg leading-tight truncate">
          {product.name}
        </h3>
        <p className="text-xs text-brand-text/50 mt-1 line-clamp-2 font-medium">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            {hasPromo && (
              <span className="text-sm text-brand-text/40 line-through font-black">
                ${originalPriceFormatted}
              </span>
            )}
            <span className="font-black text-brand-primary text-lg">
              ${priceFormatted}
            </span>
          </span>
          <button 
            onClick={handleAddClick}
            className={`min-w-[4.5rem] text-xs font-black px-4 py-2 rounded-lg transition-all shadow-sm active:scale-95 ${
              isAddHighlighted || inCart
                ? 'bg-brand-primary text-white shadow-md shadow-orange-200/60'
                : 'bg-gray-100 text-brand-text active:bg-brand-primary active:text-white hover:bg-brand-primary hover:text-white'
            }`}
          >
            {inCart ? `×${cartQuantity}` : 'Añadir'}
          </button>
        </div>
      </div>
    </div>
  );
});