'use client';
import { IProduct } from '@/interfaces';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

interface BtnBuyOrEditProps {
  product: IProduct;
  currentUserId: string;
}

const DynamicBtnBuyOrEdit: ComponentType<BtnBuyOrEditProps> = dynamic(
  () =>
    import('../products/product-detail/buttons').then(
      (mod) => mod.BtnBuyOrEdit
    ),
  {
    loading: () => (
      <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
    ),
    ssr: false,
  }
);

export default DynamicBtnBuyOrEdit;
