import React from 'react';
import { Scissors, Droplets, Sun, Sparkles } from 'lucide-react';

export const CareGuideSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Scissors,
      title: 'Diagonal 45° Stem Trim',
      desc: 'Snip 1 inch off the stem base at an angle under cool water. This maximizes surface area for capillary hydration and prevents stem clogging.',
    },
    {
      num: '02',
      icon: Droplets,
      title: 'Fresh Cold Water Replenishment',
      desc: 'Empty and rinse your vase every 48 hours. Fill with clean cold water and dissolve half a packet of the included botanical nutrient preservative.',
    },
    {
      num: '03',
      icon: Sun,
      title: 'Indirect Ambient Light',
      desc: 'Position your bouquet in bright, filtered light. Keep away from direct radiators, drafty air conditioning vents, and ethylene gas from ripening fruit.',
    },
    {
      num: '04',
      icon: Sparkles,
      title: 'Remove Submerged Leaves',
      desc: 'Gently pluck any leaves falling below the waterline. This keeps your vase crystal clear and prevents bacterial build-up for up to 10 days of vase life.',
    },
  ];

  return (
    <section id="care" className="py-16 sm:py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#415d43] font-semibold">
            Botanical Longevity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c241f] font-medium mt-1">
            How to make your blooms flourish for 7–10 days.
          </h2>
          <p className="text-sm text-[#5c6b5e] mt-2">
            Every arrangement arrives with our signature botanical nourishment pack and simple care rituals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => (
            <div 
              key={step.num}
              className="bg-white p-6 rounded-xl border border-[#ebe4d8] shadow-xs hover:border-[#cfc5b4] transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#8a998d]">
                  {step.num}
                </span>
                <step.icon className="w-5 h-5 text-[#38553d]" />
              </div>

              <h3 className="font-serif text-base font-medium text-[#1c241f]">
                {step.title}
              </h3>

              <p className="text-xs text-[#556358] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
