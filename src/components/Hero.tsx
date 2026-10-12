import React, { useState } from 'react';
import { ArrowDown, Ruler } from 'lucide-react';
import { GALLERY_SHOTS } from '../data/products';

interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenSizeGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCatalog,
  onOpenSizeGuide,
}) => {
  const [activeShotIdx, setActiveShotIdx] = useState(0);
  const currentShot = GALLERY_SHOTS[activeShotIdx] || GALLERY_SHOTS[0];

  return (
    <section className="relative border-b border-neutral-800 bg-[#0c0c0e]">
      {/* Announcement Bar */}
      <div className="bg-neutral-900 border-b border-neutral-800/80 px-4 py-2 text-center text-xs text-neutral-300 font-medium">
        <span className="text-rose-400 font-semibold mr-2">DROP 01 // ARCHIVAL</span>
        Лимитированный тираж 150 единиц · Бесплатная экспресс-доставка СДЭК от 12 000 ₽
      </div>

      {/* Main Split Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand & Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-rose-500 mb-4">
              <span>Лимитированный релиз</span>
              <span aria-hidden="true">·</span>
              <span>Кислотная минеральная варка</span>
              <span aria-hidden="true">·</span>
              <span>2026</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.08] mb-6 font-display [text-wrap:balance]">
              ALPHA MOVE <br />
              <span className="text-neutral-400 font-extrabold">ARCHIVAL STREETWEAR</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base text-neutral-300 max-w-xl leading-relaxed mb-8">
              Оригинальные zip-худи из сверхплотного 460 GSM хлопка и широкие baggy джинсы 14.5 oz.
              Каждое изделие проходит индивидуальную ручную обработку Acid Mineral Wash и украшено фирменной графикой ALPHA MOVE.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 shadow-lg shadow-white/5"
              >
                <span>Смотреть вещи в каталоге</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSizeGuide}
                className="px-6 py-3.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 text-white font-semibold text-sm tracking-wide transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <Ruler className="w-4 h-4 text-neutral-400" />
                <span>Таблица размеров</span>
              </button>
            </div>

            {/* Trust Points */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800/80 text-xs text-neutral-400">
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">Ткани</p>
                <p className="text-neutral-400">460 GSM / 14.5 oz Denim</p>
              </div>
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">Варка</p>
                <p className="text-neutral-400">Acid wash вручную</p>
              </div>
              <div>
                <p className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">Примерка</p>
                <p className="text-neutral-400">СДЭК с примеркой</p>
              </div>
            </div>
          </div>

          {/* Right Column: Flat Lay Showcase on Concrete */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[540px] rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              <img
                src={currentShot.image}
                alt={currentShot.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    Фото дропа на бетоне
                  </div>
                  <div className="font-bold text-white text-xs sm:text-sm">
                    {currentShot.title}
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono">
                  {activeShotIdx + 1} / {GALLERY_SHOTS.length}
                </span>
              </div>
            </div>

            {/* 5 Thumbnail Switchers corresponding to user's photos */}
            <div className="flex gap-2.5 mt-4 overflow-x-auto max-w-full pb-2">
              {GALLERY_SHOTS.map((shot, idx) => (
                <button
                  key={shot.id}
                  onClick={() => setActiveShotIdx(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                    activeShotIdx === idx
                      ? 'border-rose-500 scale-105 shadow-md shadow-rose-950'
                      : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
                  }`}
                  title={shot.label}
                >
                  <img
                    src={shot.image}
                    alt={shot.label}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width KPI strip below hero */}
      <div className="border-t border-neutral-800 bg-[#0f0f12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white tabular-nums tracking-tight">460 GSM</span>
              <span className="text-xs text-neutral-400 mt-0.5">Плотность французского терри</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white tabular-nums tracking-tight">14.5 OZ</span>
              <span className="text-xs text-neutral-400 mt-0.5">Тяжелый жесткий селвидж-деним</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white tabular-nums tracking-tight">2–3 ДНЯ</span>
              <span className="text-xs text-neutral-400 mt-0.5">Быстрая доставка СДЭК по РФ</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-white tabular-nums tracking-tight">150 ШТ</span>
              <span className="text-xs text-neutral-400 mt-0.5">Строго лимитированный тираж</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
