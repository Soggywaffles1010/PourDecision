'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { coffeeData } from '@/lib/coffeedata';
import { OrderStatusModal } from './components/orderModal';
import { isVoucherValid } from '@/lib/voucher';
import { generateEmailBody } from '@/lib/email';
import { useCartStore } from '@/store/cartStore';

type Product = {
  id: string;
  title: string;
  media: string;
  author: string;
  price: string;
  sales: number;
  rating: number;
  link: string;
  link2: string;
  splineLink?: string;
};

interface ContactPageWithProductProps {
  initialProductId: string;
}

const ExitConfirmModal = ({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md text-black">
      <h3 className="text-xl font-semibold mb-4">Leave this page?</h3>
      <p className="mb-6">Your changes will not be saved if you close this page.</p>
      <div className="flex justify-end gap-4">
        <button onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Leave Page</button>
      </div>
    </div>
  </div>
);



const ContactPageWithProduct = ({ initialProductId }: ContactPageWithProductProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
    notes: '',
    paymentMethod: '',
    receipt: null as File | null,
    orderDetails: '',
  });
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [placeOrderVisible, setPlaceOrderVisible] = useState(false);
  const [orders, setOrders] = useState<{ product: Product; quantity: number }[]>([]);
  const [orderStatus, setOrderStatus] = useState<'loading' | 'success' | 'error' | null>(null);

  const router = useRouter();
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productList = selectedCategory ? coffeeData[selectedCategory as keyof typeof coffeeData] || [] : [];

  const isFormDirty = Object.values(formData).some((val) => typeof val === 'string' && val.trim() !== '');

  const [voucherInputVisible, setVoucherInputVisible] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [voucherError, setVoucherError] = useState('');

  const [missingFields, setMissingFields] = useState<string[]>([]);

 const cart = useCartStore((state) => state.cart); 
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);


  useEffect(() => {
    if (!initialProductId) return;
    const allProducts: Product[] = [
      ...coffeeData.hotDrinks, 
      ...coffeeData.coldDrinks, 
      ...coffeeData.frappe,
      ...coffeeData.soda,
      ...coffeeData.pastries,
    ];
    const found = allProducts.find((p) => p.id === initialProductId);
    if (found) {
      setOrders(prev => {
        const existing = prev.find(o => o.product.id === found.id);
        if (existing) {
          return prev.map(o => 
            o.product.id === found.id 
              ? { ...o, quantity: o.quantity + 0 }
              : o
          );
        }
        return [...prev, { product: found, quantity: 1 }];
      });
    }
  }, [initialProductId]);

  useEffect(() => {
    const { name, location, phone, paymentMethod, receipt } = formData;
    const isReady = name && location && phone && (paymentMethod === 'COD' || (paymentMethod === 'GCash' && receipt));
    setPlaceOrderVisible(!!isReady);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData(prev => ({ ...prev, receipt: e.target.files![0] }));
    }
  };

  const handlePaymentSelect = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method, receipt: null }));
  };

  const addProductToCart = (product: Product) => {
    setOrders(prev => {
      const existing = prev.find(o => o.product.id === product.id);
      if (existing) {
        return prev.map(o => 
          o.product.id === product.id 
            ? { ...o, quantity: o.quantity + 1 }
            : o
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const baseTotal = orders.reduce(
    (sum, o) => sum + parseFloat(o.product.price.replace(/[^\d.]/g, '')) * o.quantity,
    0
  );
  const discount = isVoucherApplied ? 10 : 0;
  const grandTotal = baseTotal - discount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     const requiredFields = ['name', 'location', 'phone', 'paymentMethod'];
  if (formData.paymentMethod === 'GCash' && !formData.receipt) {
    requiredFields.push('receipt');
  }

  const missing = requiredFields.filter((field) => {
    if (field === 'receipt') return !(formData.receipt instanceof File);
    return !(formData as any)[field] || (formData as any)[field].trim() === '';
  });

  if (missing.length > 0) {
    setMissingFields(missing);
    return;
  }

  setMissingFields([]);
  setOrderStatus('loading');
    setOrderStatus('loading');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email || 'arusman1987@gmail.com');
    formDataToSend.append('subject', 'Customer Order');
    formDataToSend.append('message', generateEmailBody(formData, orders, grandTotal, isVoucherApplied, voucherCode));
    if (formData.paymentMethod === 'GCash' && formData.receipt instanceof File) {
      formDataToSend.append('receipt', formData.receipt);
    }

    const res = await fetch('/api/send', {
      method: 'POST',
      body: formDataToSend,
    });

    if (res.ok) {
      setOrderStatus('success');
      setTimeout(() => {
        setOrderStatus(null);
        router.push('/');
      }, 1500);
    } else {
      setOrderStatus('error');
    }
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isFormDirty ? setShowModal(true) : router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg mt-30">
        {/* Cart Section - now on the left */}
        <div className="bg-gray-50 p-6 rounded-lg border text-gray-600">
          <h3 className="text-lg font-semibold mb-4">Review your cart</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <div key={order.product.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white p-4 rounded shadow">
                  <div className="flex gap-4 items-center">
                    <img src={order.product.media} alt={order.product.title} className="w-24 h-24 object-cover rounded-md" />
                    <div>
                      <p className="font-semibold text-lg">{order.product.title}</p>
                      <p className="text-sm text-gray-500">{order.product.author}</p>
                      <p className="text-sm mt-1">{order.product.price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <button onClick={() => {
                        const updated = [...orders];
                        updated[index].quantity = Math.max(1, updated[index].quantity - 1);
                        setOrders(updated);
                      }} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                      <span>{order.quantity}</span>
                      <button onClick={() => {
                        const updated = [...orders];
                        updated[index].quantity += 1;
                        setOrders(updated);
                      }} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                    </div>
                    <button
                      onClick={() => setOrders(prev => prev.filter((_, i) => i !== index))}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="text-right font-semibold text-lg mt-4">
                Grand Total: ₱{grandTotal.toFixed(2)}
                {isVoucherApplied && (
                  <p className="text-sm text-green-600">Discount applied: -₱{discount.toFixed(2)}</p>
                )}
              </div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => setShowCategorySelector(!showCategorySelector)}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 w-full"
            >
              {showCategorySelector ? 'Close Menu' : 'Add More Products'}
            </button>

            {showCategorySelector && (
              <div className="mt-4 space-y-2">
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(coffeeData).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 border rounded ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
                  {productList.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-3 border rounded bg-white hover:shadow">
                      <img src={product.media} alt={product.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.title}</p>
                        <p className="text-sm text-gray-500">{product.price}</p>
                      </div>
                      {product.badge ? (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded font-semibold cursor-not-allowed">
                          Sold Out
                        </span>
                      ) : (
                        <button
                          onClick={() => addProductToCart(product)}
                          className="px-2 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
           
          </div>
        </div>

        {/* Delivery Form - now on the right */}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Delivery Information</h2>
            <button onClick={handleExitClick} className="text-gray-600 hover:text-red-500 text-xl"><FiX /></button>
          </div>

          <input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder={missingFields.includes('name') ? 'Please enter your name' : 'Name of receiver'}
  className={`w-full px-4 py-2 rounded-lg border ${missingFields.includes('name') ? 'border-red-500' : ''}`}
/>
          
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={missingFields.includes('email') ? 'Please enter your email' : 'Please enter your email'}
          className={`w-full px-4 py-2 rounded-lg border ${missingFields.includes('name') ? 'border-red-500' : ''}`} />

          <input type="text" name="location" value={formData.location} onChange={handleChange} required  placeholder={missingFields.includes('location') ? 'Please enter your location' : 'City / Address / Pin Location / Google maps'}
          className={`w-full px-4 py-2 rounded-lg border ${missingFields.includes('location') ? 'border-red-500' : ''}`} />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange}   required placeholder={missingFields.includes('phone') ? 'Please enter your phone number' : 'Phone number'}
          className={`w-full px-4 py-2 rounded-lg border ${missingFields.includes('phone') ? 'border-red-500' : ''}`}
          />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional Notes" rows={3} className="w-full px-4 py-2 rounded-lg border" />

          <div>
            <p className="mb-1 font-medium">Choose Payment Method:</p>
             <div className="flex gap-4">
  <button
    type="button"
    onClick={() => handlePaymentSelect('GCash')}
    className={`px-4 py-2 rounded-lg border ${formData.paymentMethod === 'GCash' ? 'bg-green-500 text-white' : ''} ${missingFields.includes('paymentMethod') ? 'border-red-500' : ''}`}
  >
    GCash
  </button>
  <button
    type="button"
    onClick={() => handlePaymentSelect('COD')}
    className={`px-4 py-2 rounded-lg border ${formData.paymentMethod === 'COD' ? 'bg-blue-500 text-white' : ''} ${missingFields.includes('paymentMethod') ? 'border-red-500' : ''}`}
  >
    Cash on Delivery
  </button>
</div>

          </div>

          <div className="mt-4">
            {!voucherInputVisible ? (
              <button type="button" className="text-indigo-600 hover:underline" onClick={() => setVoucherInputVisible(true)}>
                Do you have a voucher code?
              </button>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter voucher code"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg ${voucherError ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (isVoucherValid(voucherCode)) {
                      setIsVoucherApplied(true);
                      setVoucherError('');
                    } else {
                      setIsVoucherApplied(false);
                      setVoucherError('Voucher not valid');
                    }
                  }}
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Apply Voucher
                </button>
                {voucherError && <p className="text-red-500 text-sm">{voucherError}</p>}
                {isVoucherApplied && (
                  <p className="text-green-600 text-sm">Voucher applied! You saved  ₱10 OFF.</p>
                )}
              </div>
            )}
          </div>

         {formData.paymentMethod === 'GCash' && (
  <div className="mt-4 space-y-2">
    <img src="/images/2.png" alt="GCash QR" className="w-32 rounded border" />
    <p><strong>Name:</strong> Vanessa Tandoy</p>
    <p><strong>Number:</strong> 09451270867</p>

    <label className={`mt-2 cursor-pointer inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${missingFields.includes('receipt') ? 'border-2 border-red-500' : ''}`}>
      Upload Receipt
      <input type="file" onChange={handleFileChange} className="hidden" />
    </label>
    {formData.receipt && <p className="text-sm text-gray-600 mt-1">{formData.receipt.name}</p>}
  </div>
)}

          
           
                  <button type="submit" className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
  Place Order
</button>

             
        </form>
      </div>

      {showModal && (
        <ExitConfirmModal
          onConfirm={() => router.push('/')}
          onCancel={() => setShowModal(false)}
        />
      )}
      {orderStatus && (
        <OrderStatusModal status={orderStatus} />
      )}
    </div>
  );
};

export default ContactPageWithProduct;
