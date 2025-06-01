

import CategoryPage from './main';
import Header from '../components/header';

export default function Page({
  searchParams,
}: {
  searchParams?: { type?: string };
}) {
  return (
    <div>
      <Header />
      <div className="mt-30">
        <CategoryPage initialType={searchParams?.type} />
      </div>
    </div>
  );
}
