import React, { useState } from 'react';
import { Mail, ArrowRight, Heart, Sparkles, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1f2923] text-[#e8dfd5] pt-16 pb-12 border-t border-[#2e3b32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2e3b32]">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-medium tracking-tight text-[#f7f5f0]">
              Bloom & Bower
            </span>
            <p className="text-xs text-[#a3b1a8] leading-relaxed max-w-sm">
              An independent floral atelier dedicated to slow botanicals, seasonal British & Dutch blooms, and conscientious doorstep hand-delivery.
            </p>
            <div className="pt-2 text-xs text-[#cad5ce] space-y-1">
              <p>Atelier: 244 Mercer Street, Manhattan, NY 10012</p>
              <p>Studio Phone: (212) 555-0198 · Hours: Daily 7:30 AM – 7:00 PM</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f7f5f0] font-semibold">
              Boutique Services
            </h4>
            <ul className="text-xs text-[#a3b1a8] space-y-2">
              <li><a href="#collection" className="hover:text-white transition-colors">Seasonal Bouquets</a></li>
              <li><a href="#occasions" className="hover:text-white transition-colors">Sympathy & Grace</a></li>
              <li><a href="#occasions" className="hover:text-white transition-colors">Wedding & Event Florals</a></li>
              <li><a href="#delivery" className="hover:text-white transition-colors">Same-Day Delivery Radius</a></li>
              <li><a href="#care" className="hover:text-white transition-colors">Flower Care & Vase Life</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f7f5f0] font-semibold">
              The Seasonal Bloom Dispatch
            </h4>
            <p className="text-xs text-[#a3b1a8]">
              Receive private previews of limited-run flower harvests, floral styling rituals, and 10% off your first delivery.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#293d2f] border border-[#3b5543] text-xs text-[#a3e6b2] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are subscribed to our seasonal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 text-xs px-3.5 py-2.5 rounded-lg bg-[#27342b] border border-[#36493d] text-white placeholder-[#7f9486] focus:outline-none focus:ring-1 focus:ring-[#e0a96d]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#e0a96d] hover:bg-[#caa762] text-[#1c241f] text-xs font-semibold tracking-wide transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Clean copyright & integrity */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#809185] gap-4">
          <p>© {new Date().getFullYear()} Bloom & Bower Florist Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer">Eco Packaging Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
