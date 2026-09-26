import React from 'react';
import { CheckCircle2, Clock, MapPin, Truck, Sparkles, X, Gift, Printer, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';

export const OrderConfirmationModal: React.FC = () => {
  const { activeConfirmedOrder, setActiveConfirmedOrder, setIsOrderHistoryOpen } = useCart();

  if (!activeConfirmedOrder) return null;
  const order = activeConfirmedOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#faf9f6] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#ded5c7] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#243328] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <button
            onClick={() => setActiveConfirmedOrder(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#38553d] mx-auto flex items-center justify-center mb-3 text-[#e0a96d]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest text-[#e0a96d] font-semibold">
            Order Confirmed & In Progress
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium mt-1">
            Thank you for sending blooms
          </h2>
          <p className="text-xs text-white/80 mt-1">
            Order Reference: <strong className="font-mono text-white">{order.orderNumber}</strong> · A digital confirmation has been sent to {order.sender.email}
          </p>
        </div>

        {/* Live Delivery Progress Tracker */}
        <div className="bg-[#f0eae0] p-5 border-b border-[#dfd6c8]">
          <p className="text-xs font-semibold text-[#1c241f] mb-3 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#415d43]" />
            <span>Live Florist Studio & Delivery Status</span>
          </p>
          
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-[#243328] rounded-full" />
              <p className="font-semibold text-[#1c241f] text-[11px]">Received</p>
              <p className="text-[10px] text-[#718074]">Confirmed</p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-[#415d43] rounded-full animate-pulse" />
              <p className="font-semibold text-[#415d43] text-[11px]">Arranging</p>
              <p className="text-[10px] text-[#415d43] font-medium">In Atelier Now</p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-[#d0c6b4] rounded-full" />
              <p className="font-medium text-[#718074] text-[11px]">Quality Check</p>
              <p className="text-[10px] text-[#94a197]">Vase hydration</p>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-full bg-[#d0c6b4] rounded-full" />
              <p className="font-medium text-[#718074] text-[11px]">Hand Delivery</p>
              <p className="text-[10px] text-[#94a197]">{order.recipient.deliveryDate}</p>
            </div>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          
          {/* Recipient & Schedule Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-xl border border-[#e2d8cb]">
            <div>
              <p className="font-semibold text-[#1c241f] flex items-center gap-1.5 mb-1 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#415d43]" />
                <span>Recipient Destination</span>
              </p>
              <p className="text-[#3d4c40] font-medium">{order.recipient.recipientName}</p>
              <p className="text-[#6e7d71]">{order.recipient.streetAddress}, {order.recipient.suiteApt}</p>
              <p className="text-[#6e7d71]">{order.recipient.city}, {order.recipient.stateZip}</p>
              <p className="text-[#6e7d71]">Phone: {order.recipient.recipientPhone}</p>
            </div>

            <div>
              <p className="font-semibold text-[#1c241f] flex items-center gap-1.5 mb-1 text-xs">
                <Truck className="w-3.5 h-3.5 text-[#415d43]" />
                <span>Delivery Window</span>
              </p>
              <p className="text-[#3d4c40] font-medium">{order.recipient.deliveryDate}</p>
              <p className="text-[#6e7d71]">{order.recipient.deliveryTimeSlot}</p>
              <p className="text-[#6e7d71]">Courier: {order.deliveryMethod}</p>
              <p className="text-[#6e7d71]">Payment: {order.paymentMethod}</p>
            </div>
          </div>

          {/* Items Ordered */}
          <div>
            <h4 className="font-serif text-base font-medium text-[#1c241f] mb-3">
              Floral Selections
            </h4>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.cartItemId} className="p-3 bg-white rounded-lg border border-[#e8dfd5] flex gap-3 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-md object-cover bg-[#f4f1ea] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1c241f]">{item.product.name}</p>
                    <p className="text-[11px] text-[#6e7d71]">
                      Size: {item.size} · Presentation: {item.vase.name}
                    </p>
                    {item.giftMessage && (
                      <div className="mt-1 p-2 bg-[#faf7f2] rounded border border-[#ebe4d8] text-[11px] italic text-[#556358]">
                        "To: {item.giftMessage.to} — {item.giftMessage.message} — From: {item.giftMessage.from}"
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold tabular-nums text-[#1c241f]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-[11px] text-[#7d8b80]">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="bg-white p-4 rounded-xl border border-[#e2d8cb] space-y-2">
            <div className="flex justify-between text-[#556358]">
              <span>Subtotal</span>
              <span className="tabular-nums font-medium">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#2e5d37]">
                <span>Promo Discount</span>
                <span className="tabular-nums font-medium">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[#556358]">
              <span>Hand Delivery</span>
              <span className="tabular-nums font-medium">
                {order.shippingFee === 0 ? <strong className="text-[#2e5d37]">FREE</strong> : `$${order.shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-[#556358]">
              <span>Estimated Tax</span>
              <span className="tabular-nums font-medium">${order.tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-[#f0eae0] flex justify-between text-base font-semibold text-[#1c241f]">
              <span>Total Paid</span>
              <span className="font-serif text-lg tabular-nums">${order.total.toFixed(2)}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#e8dfd5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#cfc5b4] hover:border-[#1c241f] text-xs font-medium text-[#465349] flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveConfirmedOrder(null);
                setIsOrderHistoryOpen(true);
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#ede7dc] hover:bg-[#dfd7ca] text-xs font-semibold text-[#243328] transition-colors"
            >
              View All Orders
            </button>
            <button
              onClick={() => setActiveConfirmedOrder(null)}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-[#243328] hover:bg-[#162119] text-white text-xs font-semibold transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
