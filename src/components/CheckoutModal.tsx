import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Lock, 
  Truck, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Gift, 
  Phone, 
  Mail, 
  User 
} from 'lucide-react';
import { useCart } from '../context/CartContext.tsx';
import { RecipientInfo, SenderInfo, PaymentDetails } from '../types.ts';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    subtotal, 
    shippingFee, 
    estimatedTax, 
    promoDiscount, 
    total, 
    createOrder 
  } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Recipient & Delivery Schedule
  const [recipientName, setRecipientName] = useState('Sarah Jenkins');
  const [recipientPhone, setRecipientPhone] = useState('(555) 234-5678');
  const [streetAddress, setStreetAddress] = useState('742 Evergreen Terrace');
  const [suiteApt, setSuiteApt] = useState('Apt 4B');
  const [city, setCity] = useState('New York');
  const [stateZip, setStateZip] = useState('NY 10014');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Please leave with front desk or ring bell.');
  const [deliveryDateType, setDeliveryDateType] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState('2026-09-28');
  const [timeSlot, setTimeSlot] = useState('Afternoon: 1:00 PM – 5:00 PM');

  // Step 2: Courier & Sender Contact
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'eco' | 'priority'>('standard');
  const [senderName, setSenderName] = useState('Alex Morgan');
  const [senderEmail, setSenderEmail] = useState('alex.morgan@example.com');
  const [senderPhone, setSenderPhone] = useState('(555) 987-6543');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash_on_delivery'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 1042');
  const [cardName, setCardName] = useState('Alex Morgan');
  const [cardExp, setCardExp] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('839');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handleCardNumberChange = (val: string) => {
    // Basic formatting
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const parts = raw.match(/[\s\S]{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  const validateStep1 = () => {
    if (!recipientName.trim()) return 'Please provide recipient full name.';
    if (!recipientPhone.trim()) return 'Please provide a recipient contact phone number for hand delivery.';
    if (!streetAddress.trim()) return 'Please provide street address for delivery.';
    if (!city.trim() || !stateZip.trim()) return 'Please provide city and postal code.';
    return null;
  };

  const validateStep2 = () => {
    if (!senderName.trim()) return 'Please provide your full name as sender.';
    if (!senderEmail.trim() || !senderEmail.includes('@')) return 'Please provide a valid sender email for receipt and live delivery tracking.';
    return null;
  };

  const handleNextStep = () => {
    setFormError(null);
    if (currentStep === 1) {
      const err = validateStep1();
      if (err) {
        setFormError(err);
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const err = validateStep2();
      if (err) {
        setFormError(err);
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePlaceOrder = () => {
    setFormError(null);
    if (paymentMethod === 'card') {
      if (!cardName.trim() || !cardExp.trim() || !cardCvc.trim()) {
        setFormError('Please fill out cardholder name, expiry, and CVC.');
        return;
      }
    }

    setIsSubmitting(true);

    const recipient: RecipientInfo = {
      recipientName,
      recipientPhone,
      streetAddress,
      suiteApt,
      city,
      stateZip,
      deliveryInstructions,
      deliveryDate: deliveryDateType === 'today' ? 'Today (Same-Day)' : deliveryDateType === 'tomorrow' ? 'Tomorrow' : customDate,
      deliveryTimeSlot: timeSlot,
    };

    const sender: SenderInfo = {
      fullName: senderName,
      email: senderEmail,
      phone: senderPhone,
    };

    const payment: PaymentDetails = {
      method: paymentMethod,
      cardNumber,
      cardName,
      cardExp,
      cardCvc,
    };

    const methodLabels = {
      standard: 'Standard Hand Delivery',
      eco: 'Zero-Emission Bicycle Courier',
      priority: 'Priority Rush Climate Courier',
    };

    setTimeout(() => {
      createOrder(recipient, sender, payment, methodLabels[deliveryMethod]);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#faf9f6] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#ded5c7] overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Step Tracker */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#e8dfd5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-medium text-[#1c241f]">
                Seamless Floral Checkout
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#415d43] bg-[#edf4ee] px-2.5 py-0.5 rounded-full">
                <Lock className="w-3 h-3" />
                256-Bit SSL Encrypted
              </span>
            </div>
            <p className="text-xs text-[#6e7d71] mt-0.5">
              Same-day hand delivery guaranteed directly to recipient's doorstep.
            </p>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-2 text-xs">
            {[
              { num: 1, label: 'Recipient' },
              { num: 2, label: 'Delivery' },
              { num: 3, label: 'Payment' },
            ].map(s => (
              <div key={s.num} className="flex items-center gap-2">
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    currentStep === s.num
                      ? 'bg-[#243328] text-white'
                      : currentStep > s.num
                      ? 'bg-[#415d43] text-white'
                      : 'bg-[#e8dfd5] text-[#7d8b80]'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`hidden sm:inline font-medium ${currentStep === s.num ? 'text-[#1c241f]' : 'text-[#7d8b80]'}`}>
                  {s.label}
                </span>
                {s.num < 3 && <div className="w-4 h-px bg-[#dcd2c4]" />}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-5 right-5 p-2 text-[#7d8b80] hover:text-[#1c241f] rounded-full hover:bg-[#f0eae0] transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Active Step Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {formError && (
                <div className="p-3 bg-[#fdf2f2] border border-[#f8b4b4] rounded-lg text-xs text-[#991b1b]">
                  {formError}
                </div>
              )}

              {/* STEP 1: Recipient & Delivery Schedule */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#e8dfd5] pb-3">
                    <h3 className="font-serif text-lg font-medium text-[#1c241f] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#415d43]" />
                      <span>1. Recipient & Delivery Details</span>
                    </h3>
                    <p className="text-xs text-[#6e7d71]">Where and when should we deliver this botanical gift?</p>
                  </div>

                  {/* Delivery Date Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40] mb-2">
                      Preferred Delivery Date
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setDeliveryDateType('today')}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          deliveryDateType === 'today'
                            ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                            : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#1c241f]">Today</div>
                        <div className="text-[11px] text-[#415d43] font-medium mt-0.5">Same-Day Rush</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryDateType('tomorrow')}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          deliveryDateType === 'tomorrow'
                            ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                            : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#1c241f]">Tomorrow</div>
                        <div className="text-[11px] text-[#6e7d71] mt-0.5">Early Morning Fresh</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryDateType('custom')}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          deliveryDateType === 'custom'
                            ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                            : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#1c241f]">Choose Date</div>
                        <div className="text-[11px] text-[#6e7d71] mt-0.5">Future Event</div>
                      </button>
                    </div>

                    {deliveryDateType === 'custom' && (
                      <div className="mt-2">
                        <input
                          type="date"
                          value={customDate}
                          onChange={(e) => setCustomDate(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Delivery Window */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40] mb-2">
                      Arrival Time Slot
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                    >
                      <option>Morning: 9:00 AM – 1:00 PM</option>
                      <option>Afternoon: 1:00 PM – 5:00 PM</option>
                      <option>Evening: 5:00 PM – 8:00 PM</option>
                    </select>
                  </div>

                  {/* Recipient Contact & Address Fields */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Recipient Full Name *
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Recipient Phone (for driver drop-off) *
                        </label>
                        <input
                          type="tel"
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder="123 Blossom Avenue"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Apt / Suite / Floor
                        </label>
                        <input
                          type="text"
                          value={suiteApt}
                          onChange={(e) => setSuiteApt(e.target.value)}
                          placeholder="Apt 4B"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="New York"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          State & Postal Code *
                        </label>
                        <input
                          type="text"
                          value={stateZip}
                          onChange={(e) => setStateZip(e.target.value)}
                          placeholder="NY 10014"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#465349] mb-1">
                        Driver Delivery Instructions (Optional)
                      </label>
                      <input
                        type="text"
                        value={deliveryInstructions}
                        onChange={(e) => setDeliveryInstructions(e.target.value)}
                        placeholder="e.g. Ring doorbell, leave on covered porch if unattended"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Courier & Sender Details */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#e8dfd5] pb-3">
                    <h3 className="font-serif text-lg font-medium text-[#1c241f] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#415d43]" />
                      <span>2. Delivery Speed & Sender Contact</span>
                    </h3>
                    <p className="text-xs text-[#6e7d71]">Select courier handling and provide your receipt email.</p>
                  </div>

                  {/* Courier Methods */}
                  <div className="space-y-2.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40]">
                      Select Courier Handling
                    </label>

                    {[
                      {
                        id: 'standard' as const,
                        name: 'Standard Metropolitan Hand Delivery',
                        desc: 'Climate-controlled van, delicate floral positioning',
                        price: shippingFee === 0 ? 'FREE (Orders > $75)' : '$9.99',
                      },
                      {
                        id: 'eco' as const,
                        name: 'Zero-Emission Bicycle Messenger',
                        desc: 'Eco-insulated cargo box, prompt central delivery',
                        price: shippingFee === 0 ? 'FREE' : '$7.99',
                      },
                      {
                        id: 'priority' as const,
                        name: 'Priority White-Glove Direct Courier',
                        desc: 'Dedicated single-delivery courier directly from studio',
                        price: '+$14.99',
                      },
                    ].map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setDeliveryMethod(m.id)}
                        className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                          deliveryMethod === m.id
                            ? 'border-[#243328] bg-[#f0eae0] ring-1 ring-[#243328]'
                            : 'border-[#dfd6c8] bg-white hover:border-[#b8ad9c]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#1c241f]">{m.name}</div>
                          <div className="text-[11px] text-[#6e7d71]">{m.desc}</div>
                        </div>
                        <span className="text-xs font-bold text-[#243328] shrink-0 pl-2">
                          {m.price}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Sender Contact Information */}
                  <div className="pt-3 border-t border-[#e8dfd5] space-y-3">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3d4c40]">
                      Your Information (The Sender)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Your Email (For tracking & receipt) *
                        </label>
                        <input
                          type="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="alex@example.com"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#465349] mb-1">
                        Your Phone Number
                      </label>
                      <input
                        type="tel"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="(555) 987-6543"
                        className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-white focus:outline-none focus:ring-1 focus:ring-[#243328]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Payment & Confirmation */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-[#e8dfd5] pb-3">
                    <h3 className="font-serif text-lg font-medium text-[#1c241f] flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#415d43]" />
                      <span>3. Secure Payment Method</span>
                    </h3>
                    <p className="text-xs text-[#6e7d71]">Select payment option. All transactions are securely processed.</p>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card' as const, label: 'Credit / Debit' },
                      { id: 'apple_pay' as const, label: 'Apple / Google Pay' },
                      { id: 'cash_on_delivery' as const, label: 'Pay on Delivery' },
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          paymentMethod === p.id
                            ? 'border-[#243328] bg-[#243328] text-white font-semibold'
                            : 'border-[#dfd6c8] bg-white text-[#465349] hover:border-[#b8ad9c]'
                        }`}
                      >
                        <span className="text-xs">{p.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="p-4 rounded-xl bg-white border border-[#dfd6c8] space-y-3 shadow-xs">
                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="w-full text-xs font-mono p-2.5 rounded-lg border border-[#d6ccbc] bg-[#faf9f6] focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#465349] mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full text-xs p-2.5 rounded-lg border border-[#d6ccbc] bg-[#faf9f6] focus:outline-none focus:ring-1 focus:ring-[#243328]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#465349] mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            placeholder="12/28"
                            className="w-full text-xs font-mono p-2.5 rounded-lg border border-[#d6ccbc] bg-[#faf9f6] focus:outline-none focus:ring-1 focus:ring-[#243328]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#465349] mb-1">
                            CVC Security Code
                          </label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="839"
                            maxLength={4}
                            className="w-full text-xs font-mono p-2.5 rounded-lg border border-[#d6ccbc] bg-[#faf9f6] focus:outline-none focus:ring-1 focus:ring-[#243328]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_pay' && (
                    <div className="p-6 rounded-xl bg-white border border-[#dfd6c8] text-center space-y-2">
                      <p className="text-xs font-semibold text-[#1c241f]">Digital Wallet Express</p>
                      <p className="text-xs text-[#6e7d71]">
                        Touch ID / Face ID authentication will be prompted when you confirm the order.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'cash_on_delivery' && (
                    <div className="p-4 rounded-xl bg-[#f5f8f5] border border-[#cfdfd1] text-xs space-y-1.5 text-[#2d4933]">
                      <p className="font-semibold">Cash On Hand Delivery</p>
                      <p className="text-[#46634c]">
                        Exact amount of <strong>${total.toFixed(2)}</strong> payable to our certified floral courier upon hand-off. A printed receipt will be issued.
                      </p>
                    </div>
                  )}

                  {/* Summary of Recipient */}
                  <div className="bg-[#f0eae0] p-3 rounded-lg text-xs space-y-1 text-[#465349]">
                    <div className="font-semibold text-[#1c241f]">Delivery Summary:</div>
                    <div>Recipient: <strong>{recipientName}</strong> ({recipientPhone})</div>
                    <div>Address: {streetAddress}, {suiteApt ? `${suiteApt}, ` : ''}{city}, {stateZip}</div>
                    <div>Scheduled for: <strong>{deliveryDateType === 'today' ? 'Today' : deliveryDateType === 'tomorrow' ? 'Tomorrow' : customDate}</strong> ({timeSlot})</div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-[#e8dfd5] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => { setFormError(null); setCurrentStep((s) => (s - 1) as any); }}
                    className="px-4 py-2.5 text-xs font-semibold text-[#465349] hover:text-[#1c241f] flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-lg bg-[#243328] hover:bg-[#162119] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <span>Continue to {currentStep === 1 ? 'Delivery' : 'Payment'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="px-8 py-3.5 rounded-lg bg-[#243328] hover:bg-[#162119] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 text-[#e0a96d]" />
                        <span>Confirm & Place Order (${total.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>

            {/* Right 5 Columns: Order Summary Card */}
            <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#e2d8cb] shadow-xs space-y-4">
              <h4 className="font-serif text-base font-medium text-[#1c241f] pb-2 border-b border-[#f0eae0]">
                Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h4>

              {/* Mini Item List */}
              <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-[#f4efe6] pr-1">
                {cart.map(item => (
                  <div key={item.cartItemId} className="pt-2.5 first:pt-0 flex gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded object-cover shrink-0 bg-[#f4f1ea]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1c241f] truncate">{item.product.name}</p>
                      <p className="text-[11px] text-[#7d8b80] capitalize">
                        {item.size} · {item.quantity}x
                      </p>
                      {item.giftMessage && (
                        <p className="text-[10px] text-[#415d43]">Note: "{item.giftMessage.message.slice(0, 30)}..."</p>
                      )}
                    </div>
                    <span className="font-semibold tabular-nums text-[#1c241f]">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#f0eae0] space-y-1.5 text-xs text-[#556358]">
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
                    {shippingFee === 0 ? <strong className="text-[#2e5d37]">FREE</strong> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="tabular-nums font-medium text-[#1c241f]">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#f0eae0] flex justify-between text-base font-semibold text-[#1c241f]">
                  <span>Total Due</span>
                  <span className="font-serif text-lg tabular-nums text-[#1c241f]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-[#f0eae0] flex items-center justify-between text-[11px] text-[#7d8b80]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#415d43]" />
                  <span>7-Day Vase Freshness</span>
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#415d43]" />
                  <span>Doorstep Hand-Off</span>
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
