// app/category/page.tsx
import { redirect } from 'next/navigation';

const CategoryIndexPage = () => {
  // Redirect to the default category (hotDrinks)
  redirect('/category/[type]');
};

export default CategoryIndexPage;