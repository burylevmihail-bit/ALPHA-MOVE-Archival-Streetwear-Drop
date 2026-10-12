import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Ruler, Truck, RefreshCw } from 'lucide-react';
import { Product, Size } from '../types/store';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: Size) => void;
  onQuickCheckout: (product: Product, size: Size) => void;
  onOpenSizeGuide: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickCheckout,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<Size>('L');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const currentStock = product.availableSizes.find((s) => s.size === selectedSize)?.stock || 0;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleBuyNow = () => {
    onQuickCheckout(product, selectedSize);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-950/70 text-neutral-400 hover:text-white border border-neutral-700/60 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-neutral-950 flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-neutral-800">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80 mb-4">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-neutral-900/90 text-[11px] font-bold uppercase tracking-wider text-rose-400 border border-neutral-700">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail switcher if multiple images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all ${
                      activeImageIdx === idx
                        ? 'border-rose-500 scale-105'
                        : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Material Fact */}
            <div className="mt-4 p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300">
              <div className="font-semibold text-white mb-0.5">Окрашивание Acid Wash</div>
              <p className="text-neutral-400 leading-relaxed text-[11px]">
                Винтажный вываренный эффект достигается благодаря энзимной обработке минеральными солями.
              </p>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Unboxed Metadata Header */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-2">
                <span className="text-rose-500">ALPHA MOVE ARCHIVE</span>
                <span>·</span>
                <span>{product.colorName}</span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-1 font-display">
                {product.name}
              </h2>
              <p className="text-xs text-neutral-400 mb-4">{product.subtitle}</p>

              {/* Price Baseline */}
              <div className="flex items-baseline gap-3 mb-6 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <span className="text-2xl font-black text-white tabular-nums tracking-tight">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through tabular-nums">
                    {product.originalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-auto text-xs font-bold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-800/60">
                    Экономия {(product.originalPrice - product.price).toLocaleString('ru-RU')} ₽
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Size Selector with Guide Button */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                    Выберите размер:
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Таблица размеров</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.availableSizes.map((item) => {
                    const isSelected = selectedSize === item.size;
                    const isOutOfStock = item.stock === 0;

                    return (
                      <button
                        key={item.size}
                        disabled={isOutOfStock}
                        onClick={() => setSelectedSize(item.size)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/30'
                            : isOutOfStock
                            ? 'bg-neutral-800/30 border-neutral-800 text-neutral-600 line-through cursor-not-allowed'
                            : 'bg-neutral-800 border-neutral-700/80 text-neutral-200 hover:border-neutral-500 hover:bg-neutral-750'
                        }`}
                      >
                        {item.size}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-2 text-[11px] text-neutral-400 flex items-center justify-between">
                  <span>
                    Наличие: <strong className="text-white tabular-nums">{currentStock} шт.</strong> на складе
                  </span>
                  <span className="text-neutral-500">Посадка: {product.fabricSpecs.fitType}</span>
                </div>
              </div>

              {/* Fabric Specs Breakdown */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Плотность:</span>
                  <span className="font-semibold text-white">{product.fabricSpecs.density}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Состав:</span>
                  <span className="font-semibold text-white">{product.fabricSpecs.composition}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Варка:</span>
                  <span className="font-semibold text-white">{product.fabricSpecs.washType}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span className="text-neutral-400">Фурнитура:</span>
                  <span className="font-semibold text-white">{product.fabricSpecs.hardware}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-neutral-800/80 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  disabled={currentStock === 0}
                  className={`py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAddedRecently
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-neutral-200 text-neutral-950 active:scale-[0.98]'
                  }`}
                >
                  {isAddedRecently ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>В корзине!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>В корзину ({selectedSize})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={currentStock === 0}
                  className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-rose-900/40"
                >
                  Купить в 1 клик
                </button>
              </div>

              {/* Trust Notes */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-neutral-400" />
                  СДЭК 2–3 дня
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-neutral-400" />
                  Примерка перед оплатой
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                  100% оригинал дропа
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
