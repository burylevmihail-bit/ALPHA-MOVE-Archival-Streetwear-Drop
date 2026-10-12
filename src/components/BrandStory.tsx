import React from 'react';
import { Layers, Droplets, Scissors, ShieldAlert, Sparkles } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-[#0a0a0c] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-3">
            <span>Материалы & Технологии</span>
            <span>·</span>
            <span>Alpha Move Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-display">
            АНАТОМИЯ ТЯЖЕЛОГО СТРИТВИРА
          </h2>
          <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
            Мы отказались от тонкого трикотажа масс-маркета. Каждое изделие линейки разработано с нуля: от кастомной вязки полотна до индивидуального ручного состаривания.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-rose-400 mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase mb-2">
                460 GSM French Terry
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Сверхплотный 100% чесаный длинноволокнистый хлопок. Держит архитектурный объем плеч и массивный капюшон без провисания.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
              PRE-SHRUNK // БЕЗ УСАДКИ
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-rose-400 mb-5">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase mb-2">
                Минеральная Acid Wash
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Каждая вещь вываривается вручную в барабанах с энзимами и минеральными кристаллами. Градиент потертости уникален на каждом изделии.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
              HAND CRAFTED WASHING
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-rose-400 mb-5">
                <Scissors className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase mb-2">
                14.5 oz Heavy Denim
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Тяжелый селвидж-деним высокой плотности. Создает благородные брейки и идеальный puddle-эффект поверх массивных кроссовок.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
              WIDE SKATE SILHOUETTE
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-rose-400 mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase mb-2">
                Трафаретная шелкография
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Принт ALPHA MOVE наносится вытравными красками прямо в структуру ткани. Не трескается при стирке и не создает ощущения полимерной пленки.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-500 font-mono">
              PERMANENT SCREENPRINT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
