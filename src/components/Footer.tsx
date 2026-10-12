import React from 'react';
import { Send, ShieldCheck, RefreshCw, Mail } from 'lucide-react';

interface FooterProps {
  onOpenSizeGuide: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSizeGuide,
  onNavigateSection,
}) => {
  return (
    <footer className="bg-[#08080a] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xl font-black text-white uppercase tracking-tighter font-display block">
              ALPHA MOVE
            </span>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Лимитированный стритвир с акцентом на тяжелые ткани высокой плотности (460 GSM Terry / 14.5 oz Denim), авторские лекала и ручную кислотную минеральную стирку.
            </p>
            <div className="pt-2 flex items-center gap-4 text-neutral-400">
              <a
                href="https://t.me/alphamove_manager"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Менеджер @alphamove_manager</span>
              </a>
              <span>·</span>
              <span className="text-neutral-500">Отвечаем быстро</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Навигация по дропу
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('catalog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Каталог дропа
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Таблица размеров и мерки
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('craftsmanship')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  О технологии Acid Wash
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Отзывы покупателей
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Доставка & Сервис
            </h4>
            <div className="space-y-2.5 text-neutral-400 text-xs">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>Доставка СДЭК и Почтой России по всей РФ и СНГ</span>
              </p>
              <p className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>Примерка перед покупкой и возврат 14 дней</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-300 shrink-0" />
                <span>order@alphamove-archive.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} ALPHA MOVE. Все права защищены. Лимитированная серия.
          </div>
          <div className="flex items-center gap-4">
            <span>Правила ухода: деликатная стирка 30°C</span>
            <span>·</span>
            <span>Политика конфиденциальности</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
