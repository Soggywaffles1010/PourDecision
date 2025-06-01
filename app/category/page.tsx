import Header from '../components/header';
import CategoryPage from './main';

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <div>
      <Header />
      <div className="mt-30">
        <CategoryPage initialType={searchParams?.type as string} />
      </div>
    </div>
  );
}
