import React, { useState } from 'react';
import { X, Check, ShoppingBag, Heart, Droplets, Sun, Sparkles, Plus, Minus, Gift } from 'lucide-react';
import { FlowerProduct, FlowerSize, VaseOption, AddOnItem, GiftMessage } from '../types.ts';
import { useCart } from '../context/CartContext.tsx';
import { VASE_OPTIONS, ADD_ON_ITEMS } from '../data/flowers.ts';

export const ProductModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, addToCart, wishlist, toggleWishlist } = useCart();
  
  if (!selectedProductForDetail) return null;
  const product = selectedProductForDetail;

  const [selectedSize, setSelectedSize] = useState<FlowerSize>('standard');
  const [selectedVase, setSelectedVase] = useState<VaseOption>(VASE_OPTIONS[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [includeGiftCard, setIncludeGiftCard] = useState(false);
  const [giftTo, setGiftTo] = useState('');
  const [giftFrom, setGiftFrom] = useState('');
  const [giftOccasion, setGiftOccasion] = useState('Thinking of you');
  const [giftMessageText, setGiftMessageText] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'care'>('details');

  const sizePriceAdjust = selectedSize === 'deluxe' ? 18 : selectedSize === 'grandeur' ? 35 : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = product.price + sizePriceAdjust + selectedVase.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (item: AddOnItem) => {
    setSelectedAddOns(prev => 
      prev.some(a => a.id === item.id) 
        ? prev.filter(a => a.id !== item.id)
        : [...prev, item]
    );
  };

  const handleAddToCart = () => {
    const giftMessage: GiftMessage | undefined = includeGiftCard ? {
      to: giftTo || 'Dear Someone Special',
      from: giftFrom || 'With Warmth',
      occasion: giftOccasion,
      message: giftMessageText || 'Thinking of you with love and flowers.',
    } : undefined;

    addToCart(product, selectedSize, selectedVase, giftMessage, selectedAddOns, quantity);
    setSelectedProductForDetail(null);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#faf9f6] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#e2d8cb] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForDetail(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#243328] shadow-md transition-all active:scale-95"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visual Product Media */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#f4f1ea] border border-[#e8dfd5] shadow-xs">
                <img
                  src={product.image}
                  alt={product.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/95 shadow-sm text-[#465349] hover:text-[#b85d43] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#b85d43] text-[#b85d43]' : ''}`} />
                </button>
              </div>

              {/* Composition Badges */}
              <div className="bg-[#f2eee7] p-4 rounded-xl space-y-2 border border-[#e4dcce] text-xs">
                <p className="font-semibold text-[#1c241f]">Botanical Composition</p>
                <p className="text-[#556358] leading-relaxed">{product.stems}</p>
                <div className="pt-2 flex items-center gap-4 text-[#657367]">
                  <span>{product.stemCount} cut stems</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.fragrance} floral fragrance</span>
                </div>
              </div>

              {/* Tabs for Details vs Care */}
              <div className="pt-2">
                <div className="flex border-b border-[#e2d8cb] text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 transition-colors ${activeTab === 'details' ? 'border-b-2 border-[#243328] text-[#1c241f]' : 'text-[#7d8b80] hover:text-[#1c241f]'}`}
                  >
                    Atelier Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors ${activeTab === 'care' ? 'border-b-2 border-[#243328] text-[#1c241f]' : 'text-[#7d8b80] hover:text-[#1c241f]'}`}
                  >
                    Care & Longevity
                  </button>
                </div>

                <div className="pt-3 text-xs text-[#556358] leading-relaxed">
                  {activeTab === 'details' ? (
                    <p>{product.description}</p>
                  ) : (
                    <div className="space-y-1.5">
                      <p className="font-medium text-[#1c241f]">How to preserve these blooms:</p>
                      <p>{product.careNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#415d43] font-semibold">
                  {product.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1c241f] font-medium mt-0.5">
                  {product.name}
                </h2>
                <p className="text-xs text-[#6e7d71] mt-1">{product.subtitle}</p>
                
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-semibold text-[#1c241f] tabular-nums">
                    ${unitPrice}
                  </span>
                  {sizePriceAdjust > 0 && (
                    <span className="text-xs text-[#7d8b80]">
                      (${product.price} base + ${sizePriceAdjust} size upgrade)
                    </span>
                  )}
                </div>
              </div>

              {/* 1. Size Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40] mb-2">
                  1. Choose Arrangement Size
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: 'standard' as FlowerSize, label: 'Standard', desc: `${product.stemCount} stems`, add: 0 },
                    { id: 'deluxe' as FlowerSize, label: 'Deluxe', desc: `+40% stems`, add: 18 },
                    { id: 'grandeur' as FlowerSize, label: 'Grandeur', desc: `Double stems`, add: 35 },
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSize(s.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        selectedSize === s.id
                          ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                          : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#1c241f]">{s.label}</div>
                      <div className="text-[11px] text-[#6e7d71]">{s.desc}</div>
                      <div className="text-[11px] font-medium text-[#243328] mt-1">
                        {s.add === 0 ? 'Included' : `+$${s.add}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Vase Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40] mb-2">
                  2. Presentation & Vase
                </label>
                <div className="space-y-2">
                  {VASE_OPTIONS.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVase(v)}
                      className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                        selectedVase.id === v.id
                          ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                          : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-medium text-[#1c241f]">{v.name}</div>
                        <div className="text-[11px] text-[#6e7d71] line-clamp-1">{v.description}</div>
                      </div>
                      <div className="text-xs font-semibold text-[#243328] shrink-0 pl-3">
                        {v.price === 0 ? 'Free' : `+$${v.price}`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Complimentary Handwritten Note Card */}
              <div className="border border-[#dfd6c8] rounded-xl p-3.5 bg-[#fbf9f5]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#415d43]" />
                    <span className="text-xs font-semibold text-[#1c241f]">
                      Complimentary Handwritten Gift Card
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeGiftCard(!includeGiftCard)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                      includeGiftCard 
                        ? 'bg-[#243328] text-white' 
                        : 'bg-[#ede7dc] text-[#334237] hover:bg-[#e2d8ca]'
                    }`}
                  >
                    {includeGiftCard ? 'Card Added' : '+ Add Note'}
                  </button>
                </div>

                {includeGiftCard && (
                  <div className="mt-3 space-y-2.5 pt-3 border-t border-[#ebe3d5] animate-in fade-in duration-150">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-[#5c695e]">To (Recipient)</label>
                        <input
                          type="text"
                          value={giftTo}
                          onChange={(e) => setGiftTo(e.target.value)}
                          placeholder="e.g. Dearest Sarah"
                          className="w-full text-xs p-2 rounded border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#5c695e]">From</label>
                        <input
                          type="text"
                          value={giftFrom}
                          onChange={(e) => setGiftFrom(e.target.value)}
                          placeholder="e.g. Liam"
                          className="w-full text-xs p-2 rounded border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#5c695e]">Occasion</label>
                      <select
                        value={giftOccasion}
                        onChange={(e) => setGiftOccasion(e.target.value)}
                        className="w-full text-xs p-2 rounded border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                      >
                        <option>Thinking of you</option>
                        <option>Happy Birthday</option>
                        <option>Happy Anniversary</option>
                        <option>With Deepest Sympathy</option>
                        <option>Congratulations</option>
                        <option>Thank You</option>
                        <option>Just Because</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#5c695e]">Personal Message</label>
                      <textarea
                        rows={2}
                        value={giftMessageText}
                        onChange={(e) => setGiftMessageText(e.target.value)}
                        placeholder="Write your sentiments here... Our calligrapher writes each card by hand."
                        className="w-full text-xs p-2 rounded border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        maxLength={240}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Curated Add-ons */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40] mb-2">
                  4. Curated Finishing Touches (Optional)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ADD_ON_ITEMS.map(item => {
                    const isSelected = selectedAddOns.some(a => a.id === item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleAddOn(item)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                            : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-medium text-[#1c241f]">
                          <span className="line-clamp-1">{item.name}</span>
                          <span className="text-[#243328] font-semibold shrink-0 ml-1">+${item.price}</span>
                        </div>
                        <div className="text-[10px] text-[#718074] mt-0.5 line-clamp-1">{item.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sticky Action Footer inside Modal */}
              <div className="pt-4 border-t border-[#e2d8cb] flex items-center gap-4">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#cfc5b4] rounded-lg bg-white overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-2.5 hover:bg-[#f4efe6] text-[#465349] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-semibold tabular-nums text-[#1c241f]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2.5 hover:bg-[#f4efe6] text-[#465349] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Primary Buy Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-lg bg-[#243328] hover:bg-[#162119] text-white font-medium text-xs tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-between group active:scale-[0.99]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#e0a96d]" />
                    <span>Add to Shopping Bag</span>
                  </span>
                  <span className="font-semibold text-sm tabular-nums">
                    ${totalPrice}
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
