import React from 'react';
import { ArrowDown, Truck, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/flowers.ts';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#faf9f6] border-b border-[#e8dfd5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Editorial CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#415d43]">
              <span className="w-2 h-2 rounded-full bg-[#415d43]" />
              <span>Autumn & Winter Atelier Release</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1c241f] leading-[1.12] tracking-tight [text-wrap:balance]">
              Fresh seasonal blooms, hand-tied with quiet botanical grace.
            </h1>

            <p className="text-base sm:text-lg text-[#556358] leading-relaxed max-w-xl">
              Harvested fresh at sunrise from sustainable growers. Every arrangement is hand-crafted by our floral artisans, finished with a wax-sealed handwritten note, and hand-delivered in climate-controlled couriers.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopClick}
                className="px-8 py-4 rounded-full bg-[#243328] hover:bg-[#162119] text-[#f7f5f0] text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 group active:scale-[0.98]"
              >
                <span>Shop Fresh Arrangements</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="#delivery"
                className="px-6 py-4 rounded-full border border-[#cfc5b6] hover:border-[#1c241f] text-[#243328] text-sm font-medium transition-colors text-center"
              >
                Same-Day Delivery Times
              </a>
            </div>

            {/* Proof Points / Trust Pillars (Clean, unboxed typography) */}
            <div className="pt-8 border-t border-[#ebe4d8] grid grid-cols-3 gap-4 text-xs text-[#556358]">
              <div>
                <span className="block font-semibold text-[#1c241f] text-sm mb-0.5">3-Hour Delivery</span>
                <span>Order by 2 PM for same-day delivery</span>
              </div>
              <div>
                <span className="block font-semibold text-[#1c241f] text-sm mb-0.5">7-Day Guarantee</span>
                <span>Guaranteed vase longevity</span>
              </div>
              <div>
                <span className="block font-semibold text-[#1c241f] text-sm mb-0.5">Custom Note</span>
                <span>Complimentary handwritten card</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Studio Shot */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#ded5c7] bg-[#f0eae0] aspect-16/10 sm:aspect-16/11">
              <img
                src={HERO_IMAGE}
                alt="Artisan floral designer composing fresh blush peonies, garden roses and fragrant eucalyptus in our sunlit botanical studio"
                className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white text-xs flex items-center justify-between pointer-events-none">
                <span className="font-serif italic text-sm sm:text-base text-white/95">
                  Studio Atelier, Hand-Gathered Daily
                </span>
                <span className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-medium">
                  100% Biodegradable Wrap
                </span>
              </div>
            </div>

            {/* Decorative subtle floating accent card */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#faf9f6] border border-[#d8cfc0] rounded-xl p-4 shadow-xl max-w-xs items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#e8f1e9] flex items-center justify-center text-[#2d4933] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-semibold text-[#1c241f]">Zero Plastic Packaging</p>
                <p className="text-[#657367]">Recyclable glass & water-activated organic twine</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
