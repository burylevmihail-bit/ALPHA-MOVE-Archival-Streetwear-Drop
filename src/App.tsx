/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BrandStory } from './components/BrandStory';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, Size, CartItem, Category, OrderDetails } from './types/store';
import { Check, Send } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: Size, quantity: number = 1) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.product.id === product.id && it.size === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    showToast(`«${product.name}» (${size}) добавлен в корзину`);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((it) => !(it.product.id === productId && it.size === size)));
  };

  const handleQuickCheckout = (product: Product, size: Size) => {
    handleAddToCart(product, size, 1);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleApplyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DROP10') {
      const sub = cart.reduce((s, it) => s + it.product.price * it.quantity, 0);
      setAppliedPromoCode('DROP10');
      setPromoDiscount(Math.round(sub * 0.1));
      showToast('Скидка 10% успешно применена!');
      return true;
    }
    if (clean === 'ALPHAMOVE' || clean === 'ALPHA500') {
      setAppliedPromoCode(clean);
      setPromoDiscount(500);
      showToast('Скидка 500 ₽ успешно применена!');
      return true;
    }
    return false;
  };

  const handleRemovePromoCode = () => {
    setAppliedPromoCode(null);
    setPromoDiscount(0);
    showToast('Промокод отменен');
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setCart([]);
    setAppliedPromoCode(null);
    setPromoDiscount(0);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered products list
  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const cartTotalCount = cart.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-neutral-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 shadow-2xl text-xs font-semibold text-white flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Telegram Support Button */}
      <a
        href="https://t.me/alphamove_manager"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-neutral-900/95 hover:bg-neutral-850 border border-neutral-700/80 hover:border-sky-500/60 shadow-xl text-xs font-semibold text-white transition-all backdrop-blur-sm group cursor-pointer"
        title="Связаться с менеджером в Telegram"
      >
        <div className="w-5 h-5 rounded-full bg-[#229ED9] flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
          <Send className="w-3 h-3" />
        </div>
        <span className="text-neutral-300 group-hover:text-white">Менеджер @alphamove_manager</span>
      </a>

      {/* Strict Top Bar Contract Navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Campaign Hero Section with Flat Lay Photos */}
        <Hero
          onScrollToCatalog={() => scrollToSection('catalog')}
          onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        />

        {/* Catalog Section */}
        <section id="catalog" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading & Category Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
                <span>Каталог релиза</span>
                <span>·</span>
                <span>Drop 01 Archival Wash</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-display">
                КАТАЛОГ ALPHA MOVE
              </h2>
            </div>

            {/* Segmented Filter Buttons */}
            <div className="flex items-center flex-wrap gap-1.5 p-1.5 bg-neutral-900/90 border border-neutral-800 rounded-xl">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Все вещи ({PRODUCTS.length})
              </button>
              <button
                onClick={() => setSelectedCategory('hoodies')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'hoodies'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Zip-худи (3 900 ₽)
              </button>
              <button
                onClick={() => setSelectedCategory('denim')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'denim'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Джинсы (3 500 ₽)
              </button>
              <button
                onClick={() => setSelectedCategory('cargos')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === 'cargos'
                    ? 'bg-white text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Карго (3 500 ₽)
              </button>
            </div>
          </div>

          {/* Product Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size)}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              />
            ))}
          </div>
        </section>

        {/* Craftsmanship & Material Provenance */}
        <BrandStory />

        {/* Verified Customer Reviews */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Modals & Slide-out Surfaces */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, size) => handleAddToCart(p, size)}
        onQuickCheckout={handleQuickCheckout}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromoCode={appliedPromoCode}
        promoDiscount={promoDiscount}
        onApplyPromoCode={handleApplyPromoCode}
        onRemovePromoCode={handleRemovePromoCode}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        promoDiscount={promoDiscount}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
}
