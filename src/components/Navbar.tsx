import React from 'react';
import { ShoppingBag, Compass } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSizeGuide: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSizeGuide,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0c0e]/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Strict single-line text mark) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-black tracking-tighter text-white uppercase hover:text-rose-500 transition-colors whitespace-nowrap shrink-0 font-display"
        >
          ALPHA MOVE
        </a>

        {/* Zone 2: 4 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-neutral-400">
          <button
            onClick={() => onNavigateSection('catalog')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Каталог
          </button>
          <button
            onClick={onOpenSizeGuide}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-neutral-400" />
            Таблица размеров
          </button>
          <button
            onClick={() => onNavigateSection('craftsmanship')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Материалы
          </button>
          <button
            onClick={() => onNavigateSection('reviews')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Отзывы
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Cart Drawer trigger with count) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label={`Корзина товаров: ${cartCount}`}
            className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700/80 hover:border-neutral-500 hover:bg-neutral-850 text-white text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-neutral-300 group-hover:text-rose-400 transition-colors" />
            <span className="hidden sm:inline">Корзина</span>
            <span className="px-1.5 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
