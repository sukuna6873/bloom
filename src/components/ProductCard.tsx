import React from 'react';
import { ShoppingBag, Eye, Heart, Star, Sparkles } from 'lucide-react';
import { FlowerProduct } from '../types.ts';
import { useCart } from '../context/CartContext.tsx';
import { VASE_OPTIONS } from '../data/flowers.ts';

interface ProductCardProps {
  product: FlowerProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProductForDetail, addToCart, wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default quick add: standard size, default kraft wrap, no add-ons, quantity 1
    addToCart(product, 'standard', VASE_OPTIONS[0], undefined, [], 1);
  };

  return (
    <div 
      onClick={() => setSelectedProductForDetail(product)}
      className="group relative bg-[#ffffff] rounded-xl border border-[#ebe4d8] hover:border-[#cfc3b0] transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Visual Image Container (4:3 ratio) */}
      <div className="relative aspect-4/3 w-full bg-[#f4f1ea] overflow-hidden">
        <img
          src={product.image}
          alt={product.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#465349] hover:text-[#b85d43] hover:bg-white shadow-xs transition-colors"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#b85d43] text-[#b85d43]' : ''}`} />
        </button>

        {/* Quick View Hover Overlay Button */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForDetail(product);
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-white/95 backdrop-blur-xs hover:bg-white text-xs font-semibold text-[#1c241f] shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 px-3 rounded-lg bg-[#243328] hover:bg-[#162119] text-xs font-semibold text-white shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#e0a96d]" />
            <span>Quick Bag</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Clean Unboxed Metadata with · separator */}
          <div className="flex items-center gap-1.5 text-xs text-[#6e7d71] mb-1.5">
            <span>{product.stemCount} Fresh Stems</span>
            <span aria-hidden="true">·</span>
            <span>{product.fragrance} Fragrance</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg text-[#1c241f] font-medium leading-snug group-hover:text-[#38553d] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#556358] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Bottom Baseline: Price & Mobile Action */}
        <div className="pt-2 border-t border-[#f2ede4] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-[#7d8b80]">From</span>
              <span className="text-base font-semibold text-[#1c241f] tabular-nums tracking-tight">
                ${product.price}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#7d8b80] mt-0.5">
              <Star className="w-3 h-3 fill-[#eab308] text-[#eab308]" />
              <span className="font-medium text-[#2d3a30]">{product.rating}</span>
              <span>({product.reviewCount})</span>
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            className="sm:hidden px-3 py-1.5 bg-[#243328] text-white text-xs font-medium rounded-md active:scale-95 flex items-center gap-1"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
