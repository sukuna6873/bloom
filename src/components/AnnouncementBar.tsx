import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1f2923] text-[#f4f1ea] px-4 py-2 text-xs font-medium tracking-wide flex items-center justify-between border-b border-[#2d3a32]">
      <div className="mx-auto flex items-center gap-2 text-center truncate">
        <Sparkles className="w-3.5 h-3.5 text-[#e0a96d] shrink-0" />
        <span className="truncate">
          Complimentary handwritten gift card & same-day local hand delivery · Use code <strong className="text-[#e0a96d] font-semibold">BLOOM10</strong> for 10% off
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="text-[#a3b1a8] hover:text-white p-0.5 rounded transition-colors shrink-0"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
