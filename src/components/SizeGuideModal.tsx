import React, { useState } from 'react';
import { X, Ruler, Sparkles, Check } from 'lucide-react';
import { Size } from '../types/store';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: Size) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'calculator' | 'hoodies' | 'bottoms'>('calculator');
  const [userHeight, setUserHeight] = useState<number>(180);
  const [userWeight, setUserWeight] = useState<number>(75);
  const [fitPreference, setFitPreference] = useState<'standard_oversize' | 'ultra_baggy'>('standard_oversize');

  // Recommendation engine
  const calculateRecommendedSize = (h: number, w: number, pref: string): { size: Size; comment: string } => {
    let base: Size = 'L';
    if (h < 172 || w < 65) base = 'S';
    else if (h < 178 || w < 72) base = 'M';
    else if (h < 185 && w <= 82) base = 'L';
    else if (h < 192 || w <= 95) base = 'XL';
    else base = 'XXL';

    if (pref === 'ultra_baggy') {
      if (base === 'S') base = 'M';
      else if (base === 'M') base = 'L';
      else if (base === 'L') base = 'XL';
      else if (base === 'XL') base = 'XXL';
    }

    const comments: Record<Size, string> = {
      S: 'Сядет с правильным умеренным оверсайзом на рост до 175 см.',
      M: 'Классический оверсайз крой с комфортной драпировкой рукавов.',
      L: 'Фирменный крой Alpha Move со спущенным плечом и глубоким напуском.',
      XL: 'Выразительный объемный силуэт с удлиненным рукавом.',
      XXL: 'Максимальный мешковатый силуэт в духе 90s skate wear.',
    };

    return { size: base, comment: comments[base] };
  };

  const recommendation = calculateRecommendedSize(userHeight, userWeight, fitPreference);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tight font-display">
              Таблица размеров & Калькулятор посадки
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="px-6 pt-4 border-b border-neutral-800/80 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Подбор по росту и весу
          </button>
          <button
            onClick={() => setActiveTab('hoodies')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === 'hoodies'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Мерки Zip-худи (см)
          </button>
          <button
            onClick={() => setActiveTab('bottoms')}
            className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
              activeTab === 'bottoms'
                ? 'border-rose-500 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Мерки Джинсов & Карго (см)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Height Slider */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase text-neutral-300">
                      Ваш рост
                    </label>
                    <span className="text-sm font-bold text-white tabular-nums">
                      {userHeight} см
                    </span>
                  </div>
                  <input
                    type="range"
                    min={160}
                    max={205}
                    value={userHeight}
                    onChange={(e) => setUserHeight(Number(e.target.value))}
                    className="w-full accent-rose-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>160 см</span>
                    <span>180 см</span>
                    <span>205 см</span>
                  </div>
                </div>

                {/* Weight Slider */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase text-neutral-300">
                      Ваш вес
                    </label>
                    <span className="text-sm font-bold text-white tabular-nums">
                      {userWeight} кг
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={120}
                    value={userWeight}
                    onChange={(e) => setUserWeight(Number(e.target.value))}
                    className="w-full accent-rose-600 bg-neutral-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                    <span>50 кг</span>
                    <span>80 кг</span>
                    <span>120 кг</span>
                  </div>
                </div>
              </div>

              {/* Fit Preference */}
              <div>
                <label className="text-xs font-semibold uppercase text-neutral-400 block mb-2">
                  Желаемая посадка
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFitPreference('standard_oversize')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      fitPreference === 'standard_oversize'
                        ? 'bg-rose-950/20 border-rose-500 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-bold text-white mb-0.5">Фирменный Оверсайз</div>
                    <div className="text-[11px] text-neutral-400">Правильный объем и идеальная длина рукава</div>
                  </button>

                  <button
                    onClick={() => setFitPreference('ultra_baggy')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      fitPreference === 'ultra_baggy'
                        ? 'bg-rose-950/20 border-rose-500 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-bold text-white mb-0.5">Ultra Baggy (+1 размер)</div>
                    <div className="text-[11px] text-neutral-400">Максимально объемный мешковатый скейт-фит</div>
                  </button>
                </div>
              </div>

              {/* Recommendation Card */}
              <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-800/60 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Рекомендуемый размер</span>
                  </div>
                  <p className="text-xs text-neutral-200">{recommendation.comment}</p>
                </div>
                <div className="text-center shrink-0">
                  <div className="text-3xl font-black text-white font-display px-4 py-2 rounded-xl bg-rose-600 text-center shadow-lg shadow-rose-900/50">
                    {recommendation.size}
                  </div>
                </div>
              </div>

              {onSelectSize && (
                <button
                  onClick={() => {
                    onSelectSize(recommendation.size);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Применить размер {recommendation.size}
                </button>
              )}
            </div>
          )}

          {activeTab === 'hoodies' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                    <th className="py-2.5 font-bold">Размер</th>
                    <th className="py-2.5 font-bold">Длина изделия</th>
                    <th className="py-2.5 font-bold">Полуобхват груди</th>
                    <th className="py-2.5 font-bold">Рукав от горла</th>
                    <th className="py-2.5 font-bold">Рост (реком.)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 tabular-nums">
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">S</td>
                    <td className="py-3 text-neutral-300">66 см</td>
                    <td className="py-3 text-neutral-300">60 см</td>
                    <td className="py-3 text-neutral-300">76 см</td>
                    <td className="py-3 text-neutral-400">165–173 см</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">M</td>
                    <td className="py-3 text-neutral-300">69 см</td>
                    <td className="py-3 text-neutral-300">63 см</td>
                    <td className="py-3 text-neutral-300">78 см</td>
                    <td className="py-3 text-neutral-400">172–178 см</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50 bg-rose-950/10">
                    <td className="py-3 font-bold text-rose-400">L (Стандарт)</td>
                    <td className="py-3 text-neutral-200 font-semibold">72 см</td>
                    <td className="py-3 text-neutral-200 font-semibold">66 см</td>
                    <td className="py-3 text-neutral-200 font-semibold">81 см</td>
                    <td className="py-3 text-neutral-300">177–185 см</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">XL</td>
                    <td className="py-3 text-neutral-300">75 см</td>
                    <td className="py-3 text-neutral-300">69 см</td>
                    <td className="py-3 text-neutral-300">83 см</td>
                    <td className="py-3 text-neutral-400">184–192 см</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">XXL</td>
                    <td className="py-3 text-neutral-300">77 см</td>
                    <td className="py-3 text-neutral-300">72 см</td>
                    <td className="py-3 text-neutral-300">85 см</td>
                    <td className="py-3 text-neutral-400">190–200 см</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-[11px] text-neutral-400 leading-relaxed">
                * Изделия предварительно постираны и усажены. Параметры могут колебаться в пределах ±1 см из-за ручной минеральной варки.
              </p>
            </div>
          )}

          {activeTab === 'bottoms' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 text-neutral-400 uppercase text-[11px]">
                    <th className="py-2.5 font-bold">Размер</th>
                    <th className="py-2.5 font-bold">Обхват талии</th>
                    <th className="py-2.5 font-bold">Длина по внешнему шву</th>
                    <th className="py-2.5 font-bold">Ширина низа штанины</th>
                    <th className="py-2.5 font-bold">Джинсовый размер</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 tabular-nums">
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">S</td>
                    <td className="py-3 text-neutral-300">76–78 см</td>
                    <td className="py-3 text-neutral-300">106 см</td>
                    <td className="py-3 text-neutral-300">27 см</td>
                    <td className="py-3 text-neutral-400">W28–W30</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">M</td>
                    <td className="py-3 text-neutral-300">80–82 см</td>
                    <td className="py-3 text-neutral-300">108 см</td>
                    <td className="py-3 text-neutral-300">28 см</td>
                    <td className="py-3 text-neutral-400">W30–W32</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50 bg-rose-950/10">
                    <td className="py-3 font-bold text-rose-400">L (Стандарт)</td>
                    <td className="py-3 text-neutral-200 font-semibold">84–86 см</td>
                    <td className="py-3 text-neutral-200 font-semibold">111 см</td>
                    <td className="py-3 text-neutral-200 font-semibold">29 см</td>
                    <td className="py-3 text-neutral-300">W32–W34</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">XL</td>
                    <td className="py-3 text-neutral-300">88–90 см</td>
                    <td className="py-3 text-neutral-300">113 см</td>
                    <td className="py-3 text-neutral-300">30 см</td>
                    <td className="py-3 text-neutral-400">W34–W36</td>
                  </tr>
                  <tr className="hover:bg-neutral-850/50">
                    <td className="py-3 font-bold text-white">XXL</td>
                    <td className="py-3 text-neutral-300">94–96 см</td>
                    <td className="py-3 text-neutral-300">115 см</td>
                    <td className="py-3 text-neutral-300">31 см</td>
                    <td className="py-3 text-neutral-400">W36–W38</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-4 text-[11px] text-neutral-400 leading-relaxed">
                * Крой штанин широкий и прямой от бедра (Baggy Fit), отлично драпируется поверх объемных сникеров.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
