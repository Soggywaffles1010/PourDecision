import React from 'react'
 import ContactPageWithProduct from '../main-with-product'
import Header from '../../components/header'
import { notFound } from 'next/navigation'
import { coffeeData } from '@/lib/coffeedata'

interface PageProps {
  params: Promise<{
    productId: string;
  }>;
}

const CheckoutWithProductPage = async ({ params }: PageProps) => {
  const { productId } = await params;

  // Verify the product exists
  const allProducts = [
    ...coffeeData.hotDrinks, 
    ...coffeeData.coldDrinks, 
    ...coffeeData.frappe,
    ...coffeeData.soda
  ];
  
  const product = allProducts.find(p => p.id === productId);
  
  if (!product) {
    notFound();
  }

  return (
    <div>
    
      <ContactPageWithProduct initialProductId={productId} />
    </div>
  )
}

export default CheckoutWithProductPage