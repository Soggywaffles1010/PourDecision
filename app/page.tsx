import Image from "next/image";
import Hero from "./components/hero";
import Header from "./components/header";
import Category from "./components/category";

export default function Home() {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <div id="category">
        <Category/>
      </div>
      
       
    </div>
  );
}
