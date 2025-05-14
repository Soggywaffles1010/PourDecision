import Image from "next/image";
import Hero from "./components/hero";
import Header from "./components/header";
import Category from "./components/category";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <Category/>
      <div className="font-bold text-9xl">
       ThemeHead
      </div>
    </div>
  );
}
