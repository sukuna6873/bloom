import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    shippingFee, 
    estimatedTax, 
    total, 
    freeShippingThreshold, 
    amountNeededForFreeShipping, 
    promoCode, 
    promoDiscount, 
    promoError, 
    applyPromoCode, 
    removePromoCode, 
    setIsCheckoutOpen 
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(inputCoupon)) {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#faf9f6] h-full shadow-2xl flex flex-col justify-between border-l border-[#e4dbcd] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#e8dfd5] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#243328]" />
            <h2 className="font-serif text-xl font-medium text-[#1c241f]">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#718074] font-medium tabular-nums">
              ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#5c695e] hover:text-[#1c241f] rounded-full hover:bg-[#f0eae0] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Notification */}
        <div className="bg-[#f3eee5] px-5 py-3 border-b border-[#e4dcce] text-xs">
          {amountNeededForFreeShipping > 0 ? (
            <div>
              <div className="flex justify-between font-medium text-[#3b493e] mb-1.5">
                <span>Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Delivery</span>
                <span>{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#dfd6c8] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#38553d] transition-all duration-300 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#25522e] font-medium">
              <Sparkles className="w-4 h-4 text-[#e0a96d]" />
              <span>You have unlocked Free Metropolitan Hand Delivery!</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f0eae0] mx-auto flex items-center justify-center text-[#7d8b80]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <p className="font-serif text-lg text-[#1c241f] font-medium">Your bag is empty</p>
                <p className="text-xs text-[#718074] mt-1 max-w-xs mx-auto">
                  Select from our seasonal hand-tied bouquets and artisanal stems to brighten someone's day.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2.5 rounded-full bg-[#243328] text-white text-xs font-medium hover:bg-[#162119] transition-colors"
              >
                Browse Seasonal Blooms
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div 
                key={item.cartItemId}
                className="p-3.5 rounded-xl bg-white border border-[#eae3d5] shadow-xs flex gap-3.5"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f4f1ea] shrink-0 border border-[#e8dfd5]">
                  <img
                    src={item.product.image}
                    alt={item.product.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#1c241f] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#6e7d71] capitalize">
                        Size: {item.size} · {item.vase.name.split(' ')[0]}
                      </p>
                      {item.giftMessage && (
                        <p className="text-[10px] text-[#415d43] font-medium mt-0.5">
                          ✓ Includes Handwritten Note Card
                        </p>
                      )}
                      {item.addOns.length > 0 && (
                        <p className="text-[10px] text-[#657367]">
                          + {item.addOns.map(a => a.name.split(' ')[0]).join(', ')}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[#9ea9a0] hover:text-[#b85d43] p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity Stepper & Subtotal */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#d8cfbf] rounded-md bg-[#faf9f6]">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="px-2 py-0.5 text-[#556358] hover:bg-[#ede6da]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums text-[#1c241f]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="px-2 py-0.5 text-[#556358] hover:bg-[#ede6da]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-[#1c241f] tabular-nums">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#e8dfd5] bg-white space-y-4">
            {/* Promo Code Input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between bg-[#f0f6f1] border border-[#c3dec7] px-3 py-1.5 rounded-lg text-xs">
                  <div className="flex items-center gap-1.5 text-[#25522e]">
                    <Tag className="w-3.5 h-3.5 text-[#415d43]" />
                    <span>Coupon <strong>{promoCode}</strong> applied (-${promoDiscount})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-[#6e7d71] hover:text-[#b85d43]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Promo code (e.g. BLOOM10)"
                    className="flex-1 text-xs px-3 py-2 rounded-lg border border-[#d6ccbc] bg-[#faf9f6] focus:outline-none focus:ring-1 focus:ring-[#243328] uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#ece6dc] hover:bg-[#dfd7ca] text-xs font-semibold text-[#243328] rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <p className="text-[11px] text-[#b85d43] mt-1">{promoError}</p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#556358]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1c241f]">${subtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="flex justify-between text-[#2e5d37]">
                  <span>Discount</span>
                  <span className="tabular-nums font-medium">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Hand Delivery</span>
                <span className="tabular-nums font-medium text-[#1c241f]">
                  {shippingFee === 0 ? (
                    <strong className="text-[#2e5d37] font-semibold">FREE</strong>
                  ) : (
                    `$${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="tabular-nums font-medium text-[#1c241f]">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-[#f0eae0] flex justify-between text-sm font-semibold text-[#1c241f]">
                <span>Total</span>
                <span className="text-base tabular-nums font-serif text-[#1c241f]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-xl bg-[#243328] hover:bg-[#162119] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
