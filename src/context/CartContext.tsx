import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CartItem, 
  FlowerProduct, 
  FlowerSize, 
  VaseOption, 
  GiftMessage, 
  AddOnItem, 
  RecipientInfo, 
  SenderInfo, 
  PaymentDetails, 
  OrderRecord 
} from '../types.ts';

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    product: FlowerProduct, 
    size: FlowerSize, 
    vase: VaseOption, 
    giftMessage: GiftMessage | undefined, 
    addOns: AddOnItem[], 
    quantity: number
  ) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  
  // Quick View / Modal
  selectedProductForDetail: FlowerProduct | null;
  setSelectedProductForDetail: (product: FlowerProduct | null) => void;

  // Pricing & Promo
  promoCode: string;
  promoDiscount: number;
  promoError: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  subtotal: number;
  shippingFee: number;
  estimatedTax: number;
  total: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;

  // Order Records
  orders: OrderRecord[];
  activeConfirmedOrder: OrderRecord | null;
  setActiveConfirmedOrder: (order: OrderRecord | null) => void;
  createOrder: (
    recipient: RecipientInfo, 
    sender: SenderInfo, 
    payment: PaymentDetails, 
    deliveryMethod: string
  ) => OrderRecord;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'bloom_bower_cart_v1';
const ORDERS_STORAGE_KEY = 'bloom_bower_orders_v1';
const WISHLIST_STORAGE_KEY = 'bloom_bower_wishlist_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<FlowerProduct | null>(null);
  const [activeConfirmedOrder, setActiveConfirmedOrder] = useState<OrderRecord | null>(null);

  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const getSizePriceMultiplier = (size: FlowerSize): number => {
    if (size === 'deluxe') return 18;
    if (size === 'grandeur') return 35;
    return 0;
  };

  const addToCart = (
    product: FlowerProduct,
    size: FlowerSize,
    vase: VaseOption,
    giftMessage: GiftMessage | undefined,
    addOns: AddOnItem[],
    quantity: number
  ) => {
    const sizeAdj = getSizePriceMultiplier(size);
    const addOnsTotal = addOns.reduce((sum, item) => sum + item.price, 0);
    const unitPrice = product.price + sizeAdj + vase.price + addOnsTotal;

    const cartItemId = `${product.id}-${size}-${vase.id}-${Date.now()}`;

    const newItem: CartItem = {
      cartItemId,
      productId: product.id,
      product,
      size,
      sizePriceAdjustment: sizeAdj,
      vase,
      giftMessage,
      addOns,
      quantity,
      unitPrice,
    };

    setCart(prev => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setPromoError('Please enter a promo code');
      return false;
    }
    if (clean === 'BLOOM10' || clean === 'WELCOME10') {
      const discount = Math.round(subtotal * 0.1);
      setPromoCode(clean);
      setPromoDiscount(discount);
      setPromoError(null);
      return true;
    } else if (clean === 'PETAL15') {
      const discount = Math.round(subtotal * 0.15);
      setPromoCode(clean);
      setPromoDiscount(discount);
      setPromoError(null);
      return true;
    } else {
      setPromoError('Invalid coupon code. Try BLOOM10 for 10% off');
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoError(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 75;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 9.99;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const estimatedTax = Math.round((subtotal - promoDiscount) * 0.0825 * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - promoDiscount + shippingFee + (subtotal > 0 ? estimatedTax : 0)) * 100) / 100);

  const createOrder = (
    recipient: RecipientInfo,
    sender: SenderInfo,
    payment: PaymentDetails,
    deliveryMethod: string
  ): OrderRecord => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `BB-${randomSuffix}`;
    const newOrder: OrderRecord = {
      orderId: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...cart],
      subtotal,
      shippingFee,
      discount: promoDiscount,
      tax: estimatedTax,
      total,
      recipient,
      sender,
      deliveryMethod,
      status: 'confirmed',
      paymentMethod: payment.method === 'card' 
        ? `Card ending in ${payment.cardNumber.slice(-4) || '4242'}`
        : payment.method === 'apple_pay' 
        ? 'Apple Pay / Digital Wallet' 
        : 'Cash on Hand Delivery',
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveConfirmedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        promoCode,
        promoDiscount,
        promoError,
        applyPromoCode,
        removePromoCode,
        subtotal,
        shippingFee,
        estimatedTax,
        total,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        orders,
        activeConfirmedOrder,
        setActiveConfirmedOrder,
        createOrder,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
