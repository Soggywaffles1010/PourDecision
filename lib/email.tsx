 
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

type FormDataProps = {
  name: string;
  email: string;
  location: string;
  phone: string;
  notes: string;
  paymentMethod: string;
};

export function generateEmailBody(
  formData: FormDataProps,
  orders: { product: Product; quantity: number }[],
  grandTotal: number,
  isVoucherApplied: boolean,
  voucherCode: string
) {
  const date = new Date().toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const orderDetails = orders
    .map(
      (o) =>
        `<tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${o.product.title}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${o.quantity}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">₱${(
            parseFloat(o.product.price.replace(/[^\d.]/g, '')) * o.quantity
          ).toFixed(2)}</td>
        </tr>`
    )
    .join('');

  return `
  <div style="font-family: Arial, sans-serif; padding: 24px; background: #ffffff; color: #000000;">
    <h1 style="text-align: center;">Pour Decision Cafe</h1>
    <p style="text-align: center; font-style: italic; margin-top: -10px;">Order Receipt</p>
    <hr style="margin: 20px 0;" />

    <p><strong>Barista:</strong> Allen</p>
    <p><strong>Cashier:</strong> Allen</p>
    <p><strong>Date:</strong> ${date}</p>

    <h2>Customer Info</h2>
    <p><strong>Name:</strong> ${formData.name}</p>
    <p><strong>Location:</strong> ${formData.location}</p>
    <p><strong>Phone:</strong> ${formData.phone}</p>
    <p><strong>Notes:</strong> ${formData.notes || 'N/A'}</p>
    <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>

    <h2>Order Details</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
      <thead>
        <tr>
          <th style="text-align: left; padding: 8px; border-bottom: 2px solid #000;">Product</th>
          <th style="text-align: left; padding: 8px; border-bottom: 2px solid #000;">Qty</th>
          <th style="text-align: left; padding: 8px; border-bottom: 2px solid #000;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${orderDetails}
      </tbody>
    </table>

    <p style="font-size: 18px;"><strong>Grand Total:</strong> ₱${grandTotal.toFixed(2)}</p>
    ${
      isVoucherApplied
        ? `<p style="color: green;"><strong>Voucher Applied:</strong> "${voucherCode}" (10% Discount)</p>`
        : ''
    }

    <hr style="margin: 30px 0;" />
    <p style="text-align: center; color: #999;">Thank you for choosing Pour Decision Cafe ☕</p>
  </div>
  `;
}
