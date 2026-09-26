import React from 'react';
import { X, Clock, PackageCheck, Truck, MapPin, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { OrderRecord } from '../types.ts';

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen, orders, setActiveConfirmedOrder } = useCart();

  if (!isOrderHistoryOpen) return null;

  const handleSelectOrder = (order: OrderRecord) => {
    setActiveConfirmedOrder(order);
    setIsOrderHistoryOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#faf9f6] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#ded5c7] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 sm:p-6 bg-white border-b border-[#e8dfd5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#243328]" />
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1c241f]">
              Order History & Deliveries
            </h2>
          </div>

          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="p-2 text-[#7d8b80] hover:text-[#1c241f] rounded-full hover:bg-[#f0eae0] transition-colors"
            aria-label="Close orders"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#f0eae0] mx-auto flex items-center justify-center text-[#7d8b80]">
                <PackageCheck className="w-6 h-6" />
              </div>
              <p className="font-serif text-lg text-[#1c241f]">No orders placed yet</p>
              <p className="text-xs text-[#6e7d71] max-w-xs mx-auto">
                When you order flower arrangements, you can track live delivery status and view receipts here.
              </p>
            </div>
          ) : (
            orders.map(order => (
              <div 
                key={order.orderId}
                onClick={() => handleSelectOrder(order)}
                className="bg-white p-4 rounded-xl border border-[#e2d8cb] hover:border-[#243328] hover:shadow-sm cursor-pointer transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-[#1c241f] text-sm">
                      {order.orderNumber}
                    </span>
                    <span className="text-[#7d8b80]">·</span>
                    <span className="text-[#6e7d71]">
                      {new Date(order.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#eaf4eb] text-[#2d5734] w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d5734] animate-pulse" />
                    <span>In Florist Studio</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#556358]">
                  <div className="flex -space-x-2 overflow-hidden shrink-0">
                    {order.items.slice(0, 3).map((item, idx) => (
                      <img
                        key={idx}
                        src={item.product.image}
                        alt={item.product.name}
                        className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover bg-[#f4f1ea]"
                      />
                    ))}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1c241f] truncate">
                      To: {order.recipient.recipientName} ({order.recipient.city})
                    </p>
                    <p className="text-[11px] text-[#7d8b80]">
                      {order.items.length} {order.items.length === 1 ? 'arrangement' : 'arrangements'} · Delivered {order.recipient.deliveryDate}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-serif text-sm font-semibold tabular-nums text-[#1c241f]">
                      ${order.total.toFixed(2)}
                    </p>
                    <span className="text-[11px] text-[#415d43] font-medium flex items-center justify-end gap-0.5">
                      Receipt <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-white border-t border-[#e8dfd5] text-right">
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="px-5 py-2 rounded-lg bg-[#243328] text-white text-xs font-semibold hover:bg-[#162119] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
