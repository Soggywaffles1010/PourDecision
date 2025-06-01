// app/page.tsx or app/page.jsx (depending on your setup)
import Image from "next/image";
import Hero from "./components/hero";
import Header from "./components/header";
import Category from "./components/category";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      {/* Add id to scroll target */}
      <div id="category">
        <Category />
      </div>
      <div className="font-bold text-9xl">
        Pour decision
      </div>
    </div>
  );
}
