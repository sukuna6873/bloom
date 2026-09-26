import React, { useState } from 'react';
import { ShoppingBag, Clock, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection }) => {
  const { cart, setIsCartOpen, setIsOrderHistoryOpen, orders, wishlist } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e8dfd5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#1c241f] hover:text-[#415d43] transition-colors"
        >
          Bloom
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#465349]">
          <button 
            onClick={() => handleNavClick('collection')} 
            className="hover:text-[#1c241f] transition-colors hover:underline underline-offset-8 decoration-1"
          >
            All Blooms
          </button>
          <button 
            onClick={() => handleNavClick('occasions')} 
            className="hover:text-[#1c241f] transition-colors hover:underline underline-offset-8 decoration-1"
          >
            Occasions
          </button>
          <button 
            onClick={() => handleNavClick('delivery')} 
            className="hover:text-[#1c241f] transition-colors hover:underline underline-offset-8 decoration-1"
          >
            Same-Day Delivery
          </button>
          <button 
            onClick={() => handleNavClick('care')} 
            className="hover:text-[#1c241f] transition-colors hover:underline underline-offset-8 decoration-1"
          >
            Flower Care
          </button>
          <button 
            onClick={() => handleNavClick('reviews')} 
            className="hover:text-[#1c241f] transition-colors hover:underline underline-offset-8 decoration-1"
          >
            Reviews
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Order History */}
          <button
            onClick={() => setIsOrderHistoryOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#465349] hover:text-[#1c241f] px-3 py-2 rounded-md hover:bg-[#ede7dd] transition-colors"
            title="My Orders & Tracking"
          >
            <Clock className="w-4 h-4" />
            <span>Orders {orders.length > 0 && `(${orders.length})`}</span>
          </button>

          {/* Cart Bag Action */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#243328] hover:bg-[#1a251e] text-[#f7f5f0] text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
            aria-label={`Shopping bag with ${totalItemsCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#e0a96d]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#384c3c] text-white text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums">
              {totalItemsCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#243328] hover:bg-[#ede7dd] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-[#e8dfd5] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#2e3b31]">
            <button 
              onClick={() => handleNavClick('collection')} 
              className="text-left py-2 border-b border-[#f0eae0]"
            >
              All Blooms
            </button>
            <button 
              onClick={() => handleNavClick('occasions')} 
              className="text-left py-2 border-b border-[#f0eae0]"
            >
              Shop by Occasion
            </button>
            <button 
              onClick={() => handleNavClick('delivery')} 
              className="text-left py-2 border-b border-[#f0eae0]"
            >
              Same-Day Delivery
            </button>
            <button 
              onClick={() => handleNavClick('care')} 
              className="text-left py-2 border-b border-[#f0eae0]"
            >
              Flower Longevity Guide
            </button>
            <button 
              onClick={() => handleNavClick('reviews')} 
              className="text-left py-2 border-b border-[#f0eae0]"
            >
              Customer Reviews
            </button>
            <button 
              onClick={() => { setIsOrderHistoryOpen(true); setMobileMenuOpen(false); }} 
              className="text-left py-2 text-[#415d43] flex items-center justify-between"
            >
              <span>My Orders & Live Tracking</span>
              <span className="text-xs bg-[#e8dfd5] px-2 py-0.5 rounded text-[#243328] font-bold tabular-nums">
                {orders.length}
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
