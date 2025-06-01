// app/category/page.tsx (server component by default)

import CategoryPage from './main'; // your client component
import Header from '../components/header';

// This function receives searchParams from Next.js routing
export default function Page({ searchParams }: { searchParams: { type?: string } }) {
  return (
    <div>
      <Header />
      <CategoryPage initialType={searchParams.type} />
    </div>
  );
}
