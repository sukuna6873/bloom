import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { STORE_REVIEWS } from '../data/flowers.ts';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-20 bg-[#f7f4ed] border-t border-[#e2d8ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#415d43] font-semibold">
              Verified Kind Words
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c241f] font-medium mt-1">
              Loved by flower givers & recipients alike.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex text-[#eab308]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs text-[#465349] font-medium">
              4.92 / 5 average rating from over 1,200 recipients
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_REVIEWS.map(rev => (
            <div 
              key={rev.id}
              className="bg-[#faf9f6] p-6 rounded-xl border border-[#ded4c4] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex text-[#eab308]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#8a998d]">{rev.date}</span>
                </div>

                <p className="text-xs text-[#38453b] italic leading-relaxed">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#ede6da] flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#1c241f]">{rev.author}</p>
                  <p className="text-[11px] text-[#718074]">{rev.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-medium text-[#415d43] flex items-center gap-1 justify-end">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                  <p className="text-[10px] text-[#8a998d] truncate max-w-[120px]">{rev.item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
