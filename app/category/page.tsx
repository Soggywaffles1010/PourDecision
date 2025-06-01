// app/category/page.tsx
import { redirect } from 'next/navigation';

const CategoryIndexPage = () => {
  // Redirect to the default category (hotDrinks)
  redirect('/category/hotDrinks');
};

export default CategoryIndexPage;