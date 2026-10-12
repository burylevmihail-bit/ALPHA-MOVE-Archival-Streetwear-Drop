import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Truck, Send } from 'lucide-react';
import { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onProceedToCheckout: () => void;
  appliedPromoCode: string | null;
  promoDiscount: number;
  onApplyPromoCode: (code: string) => boolean;
  onRemovePromoCode: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromoCode,
  promoDiscount,
  onApplyPromoCode,
  onRemovePromoCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 7000;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = Math.max(0, subtotal - promoDiscount);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;

    const success = onApplyPromoCode(promoInput.trim());
    if (!success) {
      setPromoError('Промокод не найден или устарел. Попробуйте DROP10');
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="text-lg font-bold text-white uppercase tracking-tight font-display">
                Корзина заказа
              </h2>
              <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 tabular-nums">
                {items.reduce((acc, it) => acc + it.quantity, 0)} шт.
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Закрыть корзину"
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-950 px-6 py-3 border-b border-neutral-800 text-xs">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-rose-400" />
                    До бесплатной доставки СДЭК:
                  </span>
                  <span className="font-bold text-white tabular-nums">
                    {amountToFreeShipping.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-rose-500 h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Truck className="w-4 h-4" />
                <span>Бесплатная экспресс-доставка СДЭК активирована!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center mb-4 text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Корзина пуста</h3>
                <p className="text-xs text-neutral-400 max-w-xs mb-6">
                  Выберите вещь из каталога или соберите комплект со скидкой 15%
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Перейти в каталог
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800/80 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate mb-0.5">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-2">
                      <span>Размер: <strong className="text-white uppercase">{item.size}</strong></span>
                      <span>·</span>
                      <span className="truncate">{item.product.colorName.split(' ')[0]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                          className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line price */}
                      <span className="text-xs font-bold text-white tabular-nums">
                        {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id, item.size)}
                    aria-label="Удалить позицию"
                    className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-[#0e0e11] space-y-4">
              {/* Promo code form */}
              {appliedPromoCode ? (
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Промокод {appliedPromoCode} активен (-{promoDiscount.toLocaleString('ru-RU')} ₽)</span>
                  </div>
                  <button
                    onClick={onRemovePromoCode}
                    className="text-neutral-400 hover:text-white text-xs underline cursor-pointer"
                  >
                    Удалить
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Промокод (напр. DROP10)"
                    className="flex-1 px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Применить
                  </button>
                </form>
              )}

              {promoError && (
                <p className="text-[11px] text-rose-400">{promoError}</p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Сумма товаров:</span>
                  <span className="tabular-nums">{subtotal.toLocaleString('ru-RU')} ₽</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Скидка по промокоду:</span>
                    <span className="tabular-nums">- {promoDiscount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-400">
                  <span>Доставка:</span>
                  <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'Бесплатно' : 'Рассчитается при оформлении'}</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                  <span>Итого к оплате:</span>
                  <span className="text-base text-white tabular-nums tracking-tight">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Оплата СБП, картами МИР или частями (Долями / Сплит)</span>
              </div>

              <div className="pt-2 border-t border-neutral-800/80 text-center">
                <a
                  href="https://t.me/alphamove_manager"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 transition-colors font-medium"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Вопрос по заказу? Написать менеджеру @alphamove_manager</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
