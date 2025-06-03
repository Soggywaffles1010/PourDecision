'use client';

import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import loadingAnim from '@/public/lottie/placingorder.json';
import successAnim from '@/public/lottie/ordersuccess.json';
import errorAnim from '@/public/lottie/orderfail.json';
import Image from 'next/image';
import bgImage from '@/public/images/1.png'

type OrderStatus = 'loading' | 'success' | 'error';

const animations: Record<OrderStatus, any> = {
  loading: loadingAnim,
  success: successAnim,
  error: errorAnim,
};

const messages: Record<OrderStatus, string> = {
  loading: 'Placing your order...',
  success: 'Order placed successfully!',
  error: 'Failed to place order.',
};

interface OrderStatusModalProps {
  status: OrderStatus;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({ status }) => {
  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        window.location.href = '/';
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (status === 'error') {
      const path = window.location.pathname;
      const match = path.match(/\/checkout\/([^/]+)/);
      const productId = match ? match[1] : null;

      if (productId) {
        const timer = setTimeout(() => {
          window.location.href = `/checkout/${productId}`;
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [status]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* translucent blur layer */}
      <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm -z-0"></div>

      {/* modal box */}
      <div className="relative z-10 bg-white p-6 rounded-2xl w-11/12 max-w-xs flex flex-col items-center gap-4 shadow-xl">
        <div className="w-40 h-40">
          <Lottie animationData={animations[status]} loop={status === 'loading'} />
        </div>
        <p className="text-lg font-medium text-center text-yellow-700">
          {messages[status]}
        </p>

        {status === 'loading' && (
          <p className="text-sm text-gray-500">Please wait...</p>
        )}
      </div>
    </div>
  );
};
