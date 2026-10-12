import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#0c0c0e] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-500 mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Реальный опыт покупателей</span>
              <span>·</span>
              <span>100% подтвержденные покупки</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-display">
              ОТЗЫВЫ & ПОСАДКА ПО РОСТУ
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white tabular-nums">4.9 / 5.0</span>
            <span>(на основе отзывов с первой закрытой волны)</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                {/* Author Info & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                      <span>{review.author}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      г. {review.city} · {review.date}
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Purchased Item & Fit Details */}
                <div className="mb-4 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs">
                  <div className="text-rose-400 font-semibold mb-0.5">{review.itemPurchased}</div>
                  <div className="text-neutral-400 text-[11px]">{review.fitFeedback}</div>
                </div>

                {/* Comment Body */}
                <p className="text-xs text-neutral-300 leading-relaxed">
                  «{review.comment}»
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
