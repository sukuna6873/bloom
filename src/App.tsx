import { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductCard } from './components/ProductCard.tsx';
import { ProductModal } from './components/ProductModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { OrderConfirmationModal } from './components/OrderConfirmationModal.tsx';
import { OrderHistoryModal } from './components/OrderHistoryModal.tsx';
import { DeliveryPillars } from './components/DeliveryPillars.tsx';
import { CareGuideSection } from './components/CareGuideSection.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FLOWER_PRODUCTS } from './data/flowers.ts';
import { FlowerCategory, FlowerOccasion } from './types.ts';
import { Search } from 'lucide-react';

function FlowerStore() {
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory>('all');
  const [selectedOccasion, setSelectedOccasion] = useState<FlowerOccasion>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const scrollToSection = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    return FLOWER_PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Occasion filter
      if (selectedOccasion !== 'all' && !product.occasions.includes(selectedOccasion)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(query);
        const matchesStems = product.stems.toLowerCase().includes(query);
        if (!matchesName && !matchesSubtitle && !matchesStems) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedOccasion, searchQuery, sortBy]);

  const categories: { id: FlowerCategory; label: string }[] = [
    { id: 'all', label: 'All Bouquets' },
    { id: 'roses', label: 'Garden Roses' },
    { id: 'wildflowers', label: 'Wildflower Meadow' },
    { id: 'lilies-orchids', label: 'Orchids & Lilies' },
    { id: 'tulips', label: 'French Tulips' },
    { id: 'seasonal', label: 'Seasonal Luxe' },
  ];

  const occasions: { id: FlowerOccasion; label: string }[] = [
    { id: 'all', label: 'Any Occasion' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'love-romance', label: 'Love & Romance' },
    { id: 'congratulations', label: 'Congratulations' },
    { id: 'thank-you', label: 'Thank You' },
    { id: 'sympathy', label: 'Sympathy & Grace' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#242b26]">
      <AnnouncementBar />
      <Navbar onNavigateSection={scrollToSection} />
      
      <main className="flex-1">
        <Hero onShopClick={() => scrollToSection('collection')} />

        {/* Catalog Collection Section */}
        <section id="collection" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Section Title */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#415d43] font-semibold">
                Daily Atelier Harvest
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1c241f] font-medium mt-1">
                Hand-tied seasonal compositions.
              </h2>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#7d8b80] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roses, lilies, tulips..."
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-full border border-[#d6ccbc] bg-white text-[#1c241f] focus:outline-none focus:ring-1 focus:ring-[#243328] placeholder-[#8a998d]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7d8b80] hover:text-[#1c241f]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs (Section 1A DO: interactive button tabs with clean segmented states) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#f0eae0] rounded-xl mb-6">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#1c241f] shadow-xs font-semibold'
                    : 'text-[#556358] hover:text-[#1c241f]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Controls Bar: Occasions Dropdown & Sorting */}
          <div id="occasions" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#e8dfd5] text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[#6e7d71] font-medium whitespace-nowrap">Occasion:</span>
              <div className="flex items-center gap-1">
                {occasions.map(occ => (
                  <button
                    key={occ.id}
                    onClick={() => setSelectedOccasion(occ.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap ${
                      selectedOccasion === occ.id
                        ? 'bg-[#243328] text-white'
                        : 'bg-white border border-[#dfd6c8] text-[#556358] hover:border-[#1c241f]'
                    }`}
                  >
                    {occ.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <span className="text-[#6e7d71] font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs p-1.5 rounded-md border border-[#dfd6c8] bg-white text-[#1c241f] focus:outline-none focus:ring-1 focus:ring-[#243328]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#ebe4d8] space-y-3">
              <p className="font-serif text-xl text-[#1c241f]">No floral arrangements found</p>
              <p className="text-xs text-[#718074]">
                Try adjusting your search keywords or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedOccasion('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2 rounded-full bg-[#243328] text-white text-xs font-medium hover:bg-[#162119] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </section>

        <DeliveryPillars />
        <CareGuideSection />
        <ReviewsSection />
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <OrderHistoryModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <FlowerStore />
    </CartProvider>
  );
}
