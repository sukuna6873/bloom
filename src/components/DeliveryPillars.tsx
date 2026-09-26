import React from 'react';
import { Truck, Clock, ShieldCheck, Flower2, ThermometerSnowflake, Sparkles } from 'lucide-react';

export const DeliveryPillars: React.FC = () => {
  return (
    <section id="delivery" className="py-16 sm:py-20 bg-[#f4f0e6] border-y border-[#e2d8ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#415d43] font-semibold">
            Bespoke Logistics
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c241f] font-medium mt-1">
            Same-day doorstep delivery, gentle as morning dew.
          </h2>
          <p className="text-sm text-[#5c6b5e] mt-2">
            Flowers are living art. We never box or pack stems into standard postal mail. Every stem travels upright in custom hydration pods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#faf9f6] p-6 rounded-xl border border-[#ded4c4] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f1e9] flex items-center justify-center text-[#2d4933]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1c241f]">
              Same-Day Guarantee
            </h3>
            <p className="text-xs text-[#556358] leading-relaxed">
              Order before 2:00 PM Monday through Sunday for same-day delivery across the metropolitan area. We notify you the moment the courier departs our atelier.
            </p>
          </div>

          <div className="bg-[#faf9f6] p-6 rounded-xl border border-[#ded4c4] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f1e9] flex items-center justify-center text-[#2d4933]">
              <ThermometerSnowflake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1c241f]">
              Climate-Controlled Transit
            </h3>
            <p className="text-xs text-[#556358] leading-relaxed">
              Our fleet maintains a strict 55°F environment with hydration reservoirs, preventing blossom wilting and preserving fragile petals during transport.
            </p>
          </div>

          <div className="bg-[#faf9f6] p-6 rounded-xl border border-[#ded4c4] space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8f1e9] flex items-center justify-center text-[#2d4933]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#1c241f]">
              7-Day Freshness Promise
            </h3>
            <p className="text-xs text-[#556358] leading-relaxed">
              If your stems do not remain vibrant for at least seven days following our care instructions, we will replace the arrangement immediately with no questions asked.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
