'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiX } from 'react-icons/fi';
 import { coffeeData } from '@/lib/coffeedata';

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

const ContactPage = () => {
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
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState<{ product: Product; quantity: number }[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const productList = selectedCategory
    ? coffeeData[selectedCategory as keyof typeof coffeeData] || []
    : [];

  const isFormDirty = Object.values(formData).some((val) => typeof val === 'string' && val.trim() !== '');

  useEffect(() => {
    if (!productId) return;
    const allProducts: Product[] = [...coffeeData.hotDrinks, ...coffeeData.coldDrinks, ...coffeeData.frappe];
    const found = allProducts.find((p) => p.id === productId);
    if (found) {
  setOrders(prev => [...prev, { product: found, quantity: 1 }]);
  setSelectedCategory(null);
  setShowCategorySelector(false);
}

  }, [productId]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Placing order...');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email || 'arusman1987@gmail.com');
    formDataToSend.append('subject', 'Customer Order');
     const grandTotal = orders.reduce(
  (sum, o) => sum + parseFloat(o.product.price.replace(/[^\d.]/g, '')) * o.quantity,
  0
);

formDataToSend.append('message', `
  Name: ${formData.name}
  Location: ${formData.location}
  Phone: ${formData.phone}
  Notes: ${formData.notes}
  Payment Method: ${formData.paymentMethod}

  Order Details:
${orders.map(o => `${o.product.title} x${o.quantity} = ₱${(parseFloat(o.product.price.replace(/[^\d.]/g, '')) * o.quantity).toFixed(2)}`).join('\n')}

  Grand Total: ₱${grandTotal.toFixed(2)}
`);


    if (formData.paymentMethod === 'GCash' && formData.receipt) {
      formDataToSend.append('receipt', formData.receipt);
    }

    const res = await fetch('/api/send', {
      method: 'POST',
      body: formDataToSend,
    });

    if (res.ok) {
      setStatus('Order placed!');
      setTimeout(() => router.push('/'), 1500);
    } else {
      setStatus('Failed to place order.');
    }
  };

  const handleExitClick = (e: React.MouseEvent) => {
    e.preventDefault();
    isFormDirty ? setShowModal(true) : router.push('/');
  };

  return (
   <div className="min-h-screen flex flex-col items-center justify-center  py-10 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg mt-30">
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-600">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Shipping Information</h2>
            <button onClick={handleExitClick} className="text-gray-600 hover:text-red-500 text-xl"><FiX /></button>
          </div>

          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name of receiver" required className="w-full px-4 py-2 rounded-lg border " />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" className="w-full px-4 py-2 rounded-lg border" />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City / Address / Pin Location / Google maps" required className="w-full px-4 py-2 rounded-lg border" />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required className="w-full px-4 py-2 rounded-lg border" />
          <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Additional Notes" rows={3} className="w-full px-4 py-2 rounded-lg border" />

          <div>
            <p className="mb-1 font-medium">Choose Payment Method:</p>
            <div className="flex gap-4">
              <button type="button" onClick={() => handlePaymentSelect('GCash')} className={`px-4 py-2 rounded-lg border ${formData.paymentMethod === 'GCash' ? 'bg-green-500 text-white' : ''}`}>GCash</button>
              <button type="button" onClick={() => handlePaymentSelect('COD')} className={`px-4 py-2 rounded-lg border ${formData.paymentMethod === 'COD' ? 'bg-blue-500 text-white' : ''}`}>Cash on Delivery</button>
            </div>
          </div>

          {formData.paymentMethod === 'GCash' && (
            <div className="mt-4 space-y-2">
              <img src="/images/2.png" alt="GCash QR" className="w-32 rounded border" />
              <p><strong>Name:</strong> Vanessa Tandoy</p>
              <p><strong>Number:</strong> 09451270867</p>

             <label className="mt-2 cursor-pointer inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Upload Receipt
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {formData.receipt && <p className="text-sm text-gray-600 mt-1">{formData.receipt.name}</p>}
           
            </div>
          )}

          {placeOrderVisible && (
            <button type="submit" className="w-full py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Place Order</button>
          )}

          {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
        </form>

         
        {/* CART SECTION with two-column layout */}
          <div className="bg-gray-50 p-6 rounded-lg border text-gray-600">
  <h3 className="text-lg font-semibold mb-4">Review your cart</h3>
  {orders.length === 0 ? (
    <p className="text-gray-500">No orders yet.</p>
  ) : (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <div key={order.product.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white p-4 rounded shadow">
          {/* Left Column */}
          <div className="flex gap-4 items-center">
            <img src={order.product.media} alt={order.product.title} className="w-24 h-24 object-cover rounded-md" />
            <div>
              <p className="font-semibold text-lg">{order.product.title}</p>
              <p className="text-sm text-gray-500">{order.product.author}</p>
              <p className="text-sm mt-1">₱{order.product.price}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <button onClick={() => {
                const updated = [...orders];
                updated[index].quantity = Math.max(1, updated[index].quantity - 1);
                setOrders(updated);
              }} className="px-3 py-1 bg-gray-300 rounded">−</button>

              <span className="text-lg font-semibold">{order.quantity}</span>

              <button onClick={() => {
                const updated = [...orders];
                updated[index].quantity += 1;
                setOrders(updated);
              }} className="px-3 py-1 bg-gray-300 rounded">+</button>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold">Total:</p>
              <p className="text-lg font-bold">
                ₱{(parseFloat(order.product.price.replace(/[^\d.]/g, '')) * order.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => {
                const updated = [...orders];
                updated.splice(index, 1);
                setOrders(updated);
              }}
              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
            >
              <FiX className="text-base" /> Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
  <div className="mt-4 text-right font-bold text-lg ">
  Grand Total: ₱{orders.reduce((sum, o) => sum + parseFloat(o.product.price.replace(/[^\d.]/g, '')) * o.quantity, 0).toFixed(2)}
</div>


  {/* Add Orders Button */}
  <div className="mt-6">
    <button
      type="button"
      onClick={() => setShowCategorySelector(true)}
      className="w-full py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
    >
      + Add Orders
    </button>
  </div>
</div>

      
      </div>

       {/* Modal: Choose Category */}
      {showCategorySelector && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            {!selectedCategory ? (
              <>
                <h4 className="text-lg font-bold mb-4">Choose a category:</h4>
                <div className="grid gap-2">
                  {['hotDrinks', 'coldDrinks', 'frappe'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    >
                      {cat.replace(/([A-Z])/g, ' $1')}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-indigo-500 mb-2 hover:underline"
                >
                  ← Back to categories
                </button>
                <h4 className="text-lg font-bold mb-2 capitalize">{selectedCategory.replace(/([A-Z])/g, ' $1')}</h4>
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {productList.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        router.push(`?productId=${item.id}`);
                        setShowCategorySelector(false);
                      }}
                      className="text-left border px-3 py-2 rounded hover:bg-gray-100"
                    >
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">₱{item.price}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              onClick={() => setShowCategorySelector(false)}
              className="mt-4 text-red-500 hover:underline text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}


      {showModal && <ExitConfirmModal onConfirm={() => router.push('/')} onCancel={() => setShowModal(false)} />}
    </div>
  );
};

export default ContactPage;
