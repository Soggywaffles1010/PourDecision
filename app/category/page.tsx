// app/category/page.tsx
import React from 'react';
import CategoryPage from './main';
import Header from '../components/header';

interface PageProps {
  searchParams: {
    type?: string;
  };
}

const Page = ({ searchParams }: PageProps) => {
  return (
    <div className="">
      <Header />
      <div className="mt-30">
        <CategoryPage initialType={searchParams.type} />
      </div>
    </div>
  );
};

export default Page;
