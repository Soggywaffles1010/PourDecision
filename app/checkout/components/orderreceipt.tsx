import React from 'react';

interface OrderReceiptEmailProps {
  name: string;
  email?: string;
  location: string;
  phone: string;
  notes?: string;
  paymentMethod: string;
  orders: { title: string; quantity: number; price: number }[];
  discount: number;
  total: number;
  date: string;
  voucherCode?: string;
}

export const OrderReceiptEmail = ({
  name,
  email,
  location,
  phone,
  notes,
  paymentMethod,
  orders,
  discount,
  total,
  date,
  voucherCode,
}: OrderReceiptEmailProps) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', padding: '24px', color: '#333', maxWidth: '600px', margin: '0 auto', border: '1px solid #eee', borderRadius: '8px' }}>
      <h2 style={{ color: '#444' }}>Order Receipt</h2>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Café:</strong> Pour Decision Café</p>
      <p><strong>Barista:</strong> Allen</p>
      <p><strong>Cashier:</strong> Allen</p>

      <hr style={{ margin: '16px 0' }} />

      <h3 style={{ marginBottom: '8px' }}>Customer Information</h3>
      <p><strong>Name:</strong> {name}</p>
      {email && <p><strong>Email:</strong> {email}</p>}
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Phone:</strong> {phone}</p>
      {notes && <p><strong>Notes:</strong> {notes}</p>}

      <h3 style={{ marginTop: '24px' }}>Order Summary</h3>
      <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
        {orders.map((order, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            {order.title} x{order.quantity} = ₱{(order.quantity * order.price).toFixed(2)}
          </li>
        ))}
      </ul>

      {discount > 0 && (
        <p style={{ color: 'green', marginTop: '8px' }}>
          Discount Applied: -₱{discount.toFixed(2)} {voucherCode && `(Voucher: ${voucherCode})`}
        </p>
      )}

      <p style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '12px' }}>
        Grand Total: ₱{total.toFixed(2)}
      </p>

      <p><strong>Payment Method:</strong> {paymentMethod}</p>

      <p style={{ marginTop: '24px', fontSize: '14px', color: '#888' }}>
        Thank you for ordering from Pour Decision Café. Your coffee is on the way!
      </p>
    </div>
  );
};
