import React, { useState } from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, Size } from '../types/store';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: Size) => void;
  onOpenSizeGuide: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const currentSizeStock = product.availableSizes.find((s) => s.size === selectedSize)?.stock || 0;

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="group relative flex flex-col bg-neutral-900/60 rounded-xl border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 overflow-hidden cursor-pointer"
    >
      {/* Product Image Slot (65%-75% visual weight) */}
      <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Measured subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Quiet Badge (Max 1 subtle text tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/60 text-[11px] font-bold uppercase tracking-wider text-neutral-200">
            {product.badge}
          </div>
        )}

        {/* Quick View Floating Hint */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-lg bg-neutral-900/90 text-neutral-300 hover:text-white border border-neutral-700">
          <Eye className="w-4 h-4" />
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-rose-400">ALPHA MOVE</span>
            <span>{product.colorName.split(' ')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Subtitle / Short spec */}
          <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
            {product.subtitle}
          </p>

          {/* Pricing Baseline */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-white tabular-nums tracking-tight">
              {product.price.toLocaleString('ru-RU')} ₽
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-500 line-through tabular-nums">
                {product.originalPrice.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </div>

        {/* Size Selection & Quick Add Action Bar */}
        <div className="pt-3 border-t border-neutral-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider font-medium text-neutral-400">
              Размер:
            </span>
            <span className="text-[11px] text-neutral-500 tabular-nums">
              {currentSizeStock <= 3 ? `Осталось ${currentSizeStock} шт.` : 'В наличии'}
            </span>
          </div>

          {/* Segmented Size Controls */}
          <div className="flex items-center gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
            {product.availableSizes.map((item) => {
              const isSelected = selectedSize === item.size;
              const isOutOfStock = item.stock === 0;

              return (
                <button
                  key={item.size}
                  disabled={isOutOfStock}
                  onClick={() => setSelectedSize(item.size)}
                  className={`flex-1 py-1 text-xs font-semibold rounded transition-colors ${
                    isSelected
                      ? 'bg-rose-600 text-white'
                      : isOutOfStock
                      ? 'bg-neutral-800/40 text-neutral-600 line-through cursor-not-allowed'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {item.size}
                </button>
              );
            })}
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={currentSizeStock === 0}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-neutral-200 text-neutral-950 active:scale-[0.98]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Добавлено ({selectedSize})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>В корзину ({selectedSize})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
