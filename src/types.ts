export type FlowerCategory = 
  | 'all'
  | 'roses'
  | 'wildflowers'
  | 'lilies-orchids'
  | 'tulips'
  | 'seasonal';

export type FlowerOccasion =
  | 'all'
  | 'birthday'
  | 'anniversary'
  | 'love-romance'
  | 'sympathy'
  | 'congratulations'
  | 'thank-you';

export type FlowerSize = 'standard' | 'deluxe' | 'grandeur';

export interface FlowerProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: FlowerCategory;
  occasions: FlowerOccasion[];
  image: string;
  alt: string;
  stems: string;
  stemCount: number;
  fragrance: 'Mild' | 'Moderate' | 'Intense' | 'Delicate';
  description: string;
  palette: string[];
  careNotes: string;
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewCount: number;
}

export interface VaseOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'chocolates' | 'candle' | 'tools' | 'treats';
}

export interface GiftMessage {
  to: string;
  from: string;
  occasion: string;
  message: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  product: FlowerProduct;
  size: FlowerSize;
  sizePriceAdjustment: number;
  vase: VaseOption;
  giftMessage?: GiftMessage;
  addOns: AddOnItem[];
  quantity: number;
  unitPrice: number;
}

export interface RecipientInfo {
  recipientName: string;
  recipientPhone: string;
  streetAddress: string;
  suiteApt: string;
  city: string;
  stateZip: string;
  deliveryInstructions: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
}

export interface SenderInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface PaymentDetails {
  method: 'card' | 'apple_pay' | 'cash_on_delivery';
  cardNumber: string;
  cardName: string;
  cardExp: string;
  cardCvc: string;
}

export interface OrderRecord {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  total: number;
  recipient: RecipientInfo;
  sender: SenderInfo;
  deliveryMethod: string;
  status: 'confirmed' | 'arranging' | 'quality_check' | 'out_for_delivery' | 'delivered';
  paymentMethod: string;
}
