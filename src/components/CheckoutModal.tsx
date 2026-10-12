import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Truck,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Receipt,
  RotateCcw,
  Send,
  Copy,
  Check,
  MessageCircle,
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types/store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  promoDiscount: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  promoDiscount,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegramHandle, setTelegramHandle] = useState('');
  const [city, setCity] = useState('Москва');
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'cdek_pvz' | 'cdek_courier' | 'post'>('cdek_pvz');
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card' | 'split' | 'cod'>('sbp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const subtotal = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  const isFreeDelivery = subtotal >= 7000;

  const deliveryCost = isFreeDelivery
    ? 0
    : deliveryMethod === 'cdek_pvz'
    ? 350
    : deliveryMethod === 'cdek_courier'
    ? 550
    : 400;

  const total = Math.max(0, subtotal - promoDiscount + deliveryCost);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Пожалуйста, заполните контактные данные и адрес доставки');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = `AM-${Math.floor(10000 + Math.random() * 90000)}`;
      const randomTrack = `RU${Math.floor(100000000 + Math.random() * 900000000)}CD`;
      const deliveryNames: Record<string, string> = {
        cdek_pvz: 'СДЭК — Пункт выдачи (ПВЗ)',
        cdek_courier: 'СДЭК — Курьерская доставка до двери',
        post: 'Почта России — Экспресс отправление',
      };
      const paymentNames: Record<string, string> = {
        sbp: 'СБП (Система быстрых платежей)',
        card: 'Банковская карта (МИР / Visa / Mastercard)',
        split: 'Оплата частями (Яндекс Сплит / Долями)',
        cod: 'Оплата при получении (после примерки)',
      };

      const order: OrderDetails = {
        orderId: randomId,
        date: new Date().toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        customerName: fullName,
        phone,
        email: email || 'Не указан',
        city,
        address,
        deliveryMethod: deliveryNames[deliveryMethod] || deliveryMethod,
        paymentMethod: paymentNames[paymentMethod] || paymentMethod,
        items: [...items],
        subtotal,
        discount: promoDiscount,
        deliveryCost,
        total,
        trackingNumber: randomTrack,
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  const buildTelegramMessage = (order: OrderDetails) => {
    const itemsText = order.items
      .map(
        (it) =>
          `• ${it.product.name} (Размер: ${it.size}) x${it.quantity} — ${(
            it.product.price * it.quantity
          ).toLocaleString('ru-RU')} ₽`
      )
      .join('\n');

    return `Здравствуйте! Я оформил заказ #${order.orderId} на сайте ALPHA MOVE.

Товары:
${itemsText}

Итоговая сумма: ${order.total.toLocaleString('ru-RU')} ₽
Доставка: ${order.deliveryMethod}
Адрес: г. ${order.city}, ${order.address}
Получатель: ${order.customerName}
Телефон: ${order.phone}${telegramHandle ? `\nTelegram покупателя: ${telegramHandle}` : ''}
Трек-номер: ${order.trackingNumber}`;
  };

  const handleCopyOrder = (order: OrderDetails) => {
    const text = buildTelegramMessage(order);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!completedOrder) onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tight font-display">
              {completedOrder ? 'Заказ успешно оформлен' : 'Оформление заказа Alpha Move'}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {completedOrder
                ? `Номер вашего заказа: #${completedOrder.orderId}`
                : 'Заполните данные для быстрой отправки дропа'}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase font-display mb-1">
                СПАСИБО ЗА ЗАКАЗ!
              </h3>
              <p className="text-xs text-neutral-300 max-w-md mx-auto">
                Вещи забронированы на складе дропа. Свяжитесь с менеджером в Telegram для подтверждения и быстрой отправки.
              </p>
            </div>

            {/* Direct Telegram Feedback Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-sky-950/30 border border-sky-600/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Обратная связь в Telegram</span>
                </div>
                <span className="text-[11px] font-mono text-neutral-300 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700">
                  @alphamove_manager
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Нажмите кнопку ниже, чтобы отправить детали заказа менеджеру в Telegram. Текст с составом заказа и адресом уже сформирован автоматически.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={`https://t.me/alphamove_manager?text=${encodeURIComponent(buildTelegramMessage(completedOrder))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#229ED9] hover:bg-[#1E88E5] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-950/50"
                >
                  <Send className="w-4 h-4" />
                  <span>Написать менеджеру @alphamove_manager</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyOrder(completedOrder)}
                  className="py-3 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                  <span>{isCopied ? 'Скопировано!' : 'Скопировать заказ'}</span>
                </button>
              </div>
            </div>

            {/* Order Tracking Information */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">Трек-номер отправления:</span>
                <span className="font-mono font-bold text-rose-400 tracking-wider">
                  {completedOrder.trackingNumber}
                </span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">Способ доставки:</span>
                <span className="font-semibold text-white">{completedOrder.deliveryMethod}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">Адрес получателя:</span>
                <span className="text-white font-medium">г. {completedOrder.city}, {completedOrder.address}</span>
              </div>
              <div className="flex justify-between items-center text-neutral-300">
                <span className="text-neutral-400">Способ оплаты:</span>
                <span className="font-semibold text-white">{completedOrder.paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Итого к оплате:</span>
                <span className="text-base text-rose-400 tabular-nums font-mono">
                  {completedOrder.total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Ordered items preview */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Состав заказа ({completedOrder.items.length} поз.):
              </div>
              <div className="space-y-2">
                {completedOrder.items.map((it) => (
                  <div
                    key={`${it.product.id}-${it.size}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={it.product.images[0]}
                        alt={it.product.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-bold text-white">{it.product.name}</div>
                        <div className="text-[11px] text-neutral-400">
                          Размер: {it.size} · {it.quantity} шт.
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-white tabular-nums">
                      {(it.product.price * it.quantity).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Вернуться к покупкам
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Contacts */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                <span>01. Контактные данные получателя</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                    ФИО *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Иванов Михаил Александрович"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                    Телефон для связи *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                    Email для чека
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                    Ваш Telegram (для быстрой связи)
                  </label>
                  <input
                    type="text"
                    value={telegramHandle}
                    onChange={(e) => setTelegramHandle(e.target.value)}
                    placeholder="@ваш_юзернейм"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>
              <div className="mt-2 text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Менеджер заказов в Telegram: <strong className="text-white">@alphamove_manager</strong></span>
              </div>
            </div>

            {/* Step 2: Delivery */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                <span>02. Способ доставки</span>
              </h3>
              <div className="space-y-2 mb-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('cdek_pvz')}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    deliveryMethod === 'cdek_pvz'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-bold text-white">СДЭК — Пункт выдачи (ПВЗ)</div>
                      <div className="text-[11px] text-neutral-400">2–3 рабочих дня · Примерка перед забором</div>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums">
                    {isFreeDelivery ? 'Бесплатно' : '350 ₽'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('cdek_courier')}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    deliveryMethod === 'cdek_courier'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-bold text-white">СДЭК — Курьер до двери</div>
                      <div className="text-[11px] text-neutral-400">1–3 дня · 15 минут на примерку</div>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums">
                    {isFreeDelivery ? 'Бесплатно' : '550 ₽'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('post')}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                    deliveryMethod === 'post'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-rose-400" />
                    <div>
                      <div className="font-bold text-white">Почта России / EMS</div>
                      <div className="text-[11px] text-neutral-400">3–5 дней в любой регион страны</div>
                    </div>
                  </div>
                  <span className="font-bold tabular-nums">
                    {isFreeDelivery ? 'Бесплатно' : '400 ₽'}
                  </span>
                </button>
              </div>

              {/* Address inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                    Город *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Москва"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] uppercase font-bold text-neutral-400 block mb-1">
                    Адрес (или адрес удобного ПВЗ СДЭК) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="ул. Арбат, дом 10, кв 45"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
                <span>03. Способ оплаты</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('sbp')}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    paymentMethod === 'sbp'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">СБП (Быстрый платеж 0%)</div>
                  <div className="text-[11px] text-neutral-400">По QR-коду через любое банковское приложение</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">Банковская карта</div>
                  <div className="text-[11px] text-neutral-400">МИР, Visa, Mastercard любого банка РФ</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('split')}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    paymentMethod === 'split'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">Долями / Яндекс Сплит</div>
                  <div className="text-[11px] text-neutral-400">4 платежа по {(total / 4).toFixed(0)} ₽ без переплат</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-rose-950/20 border-rose-500 text-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-bold text-white mb-0.5">При получении (C.O.D.)</div>
                  <div className="text-[11px] text-neutral-400">Оплата курьеру или в ПВЗ после примерки</div>
                </button>
              </div>
            </div>

            {/* Total Summary */}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-xs uppercase text-neutral-400 block">Итого к оплате:</span>
                  <span className="text-2xl font-black text-white tabular-nums tracking-tight font-display">
                    {total.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
                <div className="text-right text-xs text-neutral-400">
                  {deliveryCost === 0 ? 'Бесплатная доставка' : `Доставка: ${deliveryCost} ₽`}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Резервируем вещи на складе...</span>
                ) : (
                  <>
                    <span>Подтвердить и заказать ({total.toLocaleString('ru-RU')} ₽)</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
